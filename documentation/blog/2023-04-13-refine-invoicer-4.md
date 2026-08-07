---
title: Creating Mission and Invoice Pages
description: We add more CRUD views to the Pdf Invoice Generator app we have been building using Refine and Strapi last few days.
slug: refine-react-invoice-generator-4
authors: abdullah_numan
category: "How To Build"
tags: [react, refine-week]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/social.png
hide_table_of_contents: false
---

In this post, we add more CRUD views to the **Pdf Invoice Generator** app we have been building using **Refine** last few days. The resources we cover in this episode are: `missions` and `invoices`. We mainly continue leveraging `dataProvider` methods and adding to the `resources` prop as well as associated route definitions.

We are on Day Four of [**#RefineWeek**](https://refine.dev/core/week-of-refine-strapi/) series which is a five-part tutorial that aims to help developers learn the ins-and-outs of **Refine**'s powerful capabilities and get going with **Refine** within a week.

### RefineWeek ft. Strapi series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-react-invoice-generator-1/)
- Day 2 - [Setting Up the Invoicer App](https://refine.dev/blog/refine-react-invoice-generator-2/)
- Day 3 - [Adding CRUD Actions & Views](https://refine.dev/blog/refine-react-invoice-generator-3/)

## Overview

On [Day 3](https://refine.dev/blog/refine-react-invoice-generator-3/), we implemented CRUD actions for `companies`, `clients` and `contacts`. We saw that core data hooks such as `useCreate()` are invoked to access corresponding `dataProvider` methods (for example, `dataProvider.create`). And more sophisticated hooks like `useSimpleList()` are built on top of low level hooks like `useList()`.

We have used some other higher level hooks as well, like `useModalForm()`, `useDrawerForm()` and `useTable()` - all of which combine data fetching and UI presentation with **Ant Design** components and give us compact and convenient hooks and components to work with.

We covered `useTable()` on [Day 3](https://refine.dev/blog/refine-react-invoice-generator-3/), and in this post we also use it to list `missions` and `invoices`. So, we will be inspecting some low level code to examine how `useTable()` implements data fetching and UI presentation under the hood. We are going to do the same for `useSelect()`. We also spend some time digging deep into the `<DeleteButton />` component in order to witness how it implements the `dataProvider.delete` method.

But before we move into writing code, we have to define the collections for `missions` and `invoices` in our [**Strapi**](https://strapi.io/) app. Let's start with them.

## Strapi Collections for `missions` and `invoices`

Let's revisit the ERD for our **Pdf Invoice Generator** app:

<img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/database.png" alt="Invoice app database schema diagram" />

<br />

We can see from the diagram that `invoices` have an open `one-to-many` relation with `missions` with at least one mission mandatory for an invoice. On the other hand, `contacts` should have a `one-to-many` optional relation with `invoices`.

With this in mind, let's go ahead and create collections in our **Strapi** app.

### Strapi `missions` Collection

We should use the `Content-Type Builder` again to define these collections. The `missions` collection should look like this:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/mission_collection.png"  alt="Missions collection in Airtable" />

<br />

### Strapi `invoices` Collection

The `invoices` collection should look as below:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/invoice_collection.png"  alt="Invoices collection in Airtable" />

<br />

`invoices` has a `has one` association with `companies`:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/invoice_company.png"  alt="Invoice company relation setup" />

<br />

It also has the same `has one` association with `contacts`
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/invoice_hasone.png"  alt="Invoice has-one relationship" />

<br />

It also maintains a `has many` association with `missions`:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/invoice_hasmany.png"  alt="Invoice has-many relationship" />

<br />

With the collections completed, we should now authorize `Authenticated` users to perform CRUD operations on them.

### Strapi Authorization for `Authenticated` Role

Like we did before with the `companies`, `clients` and `contacts` collections, we should set permissions for our `Authenticated` users to access and perform queries and mutations on the `/missions` and `/invoices` endpoints.

We can do this from the following path in our **Strapi** app: `/admin/settings/users-permissions/roles/1`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/authenticated.png"  alt="Authenticated invoicer dashboard" />

<br />

We need to set permissions for both `missions` and `invoices`.

With these done, now we can head back to our **Refine** app and add resources and routes for these entities.

## Adding `resources` and Routes for `missions` and `invoices`

Back in our `App.tsx`, let's quickly add the resource objects and route definitions:

<details>
<summary>Show App.tsx code</summary>
<p>

```tsx title="App.tsx"
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayout,
  useNotificationProvider,
  ThemedTitle,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import * as Icons from "@ant-design/icons";

const {
  UserAddOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  SlidersOutlined,
  FileAddOutlined,
} = Icons;

import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { DataProvider } from "@refinedev/strapi-v4";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CompanyList } from "pages/companies";
import { ClientList } from "pages/clients";
import { ContactList, EditContact } from "pages/contacts";
import { MissionList } from "pages/missions";
import { CreateInvoice, EditInvoice, InvoiceList } from "pages/invoices";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            resources={[
              {
                name: "companies",
                list: "/companies",
                icon: <InfoCircleOutlined />,
              },
              {
                name: "clients",
                list: "/clients",
                icon: <TeamOutlined />,
              },
              {
                name: "contacts",
                list: "/contacts",
                edit: "/contacts/:id/edit",
                icon: <UserAddOutlined />,
              },
              {
                name: "missions",
                list: "/missions",
                icon: <SlidersOutlined />,
              },
              {
                name: "invoices",
                list: "/invoices",
                create: "/invoices/create",
                edit: "invoices/:id/edit",
                icon: <FileAddOutlined />,
              },
            ]}
            authProvider={authProvider}
            dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
            notificationProvider={useNotificationProvider}
            routerProvider={routerProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout
                      Header={Header}
                      Title={({ collapsed }) => (
                        <ThemedTitle collapsed={collapsed} text="Invoicer" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="companies" />}
                />
                <Route path="/companies">
                  <Route index element={<CompanyList />} />
                </Route>
                <Route path="/clients">
                  <Route index element={<ClientList />} />
                </Route>
                <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route path="/contacts/:id/edit" element={<EditContact />} />
                </Route>
                <Route path="/missions">
                  <Route index element={<MissionList />} />
                </Route>
                <Route path="/invoices">
                  <Route index element={<InvoiceList />} />
                  <Route path="/invoices/create" element={<CreateInvoice />} />
                  <Route path="/invoices/:id/edit" element={<EditInvoice />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      title={<ThemedTitle collapsed text="Invoicer" />}
                      formProps={{
                        initialValues: {
                          email: "demo@refine.dev",
                          password: "demodemo",
                        },
                      }}
                    />
                  }
                />
              </Route>
              <Route
                element={
                  <Authenticated>
                    <ThemedLayout
                      Header={Header}
                      Title={({ collapsed }) => (
                        <ThemedTitle collapsed={collapsed} text="Invoicer" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
```

</p>
</details>

## Adding Views for `missions`

We only have a `list` route for `missions` so let's have a look at what the `<MissionList />` component entails.

### Refine `list` View for `missions`

The `<MissionList />` component looks like this:

```tsx title="src/pages/missions/list.tsx"
import {
  List,
  useTable,
  TagField,
  useModalForm,
  EditButton,
} from "@refinedev/antd";
import { Table } from "antd";

import { IMission } from "interfaces";
import { CreateMission, EditMission } from "components/missions";

export const MissionList: React.FC = () => {
  const { tableProps } = useTable<IMission>();

  const { formProps, modalProps, show } = useModalForm({
    resource: "missions",
    action: "create",
  });

  const {
    formProps: editFormProps,
    modalProps: editModalProps,
    show: editShow,
  } = useModalForm({
    resource: "missions",
    action: "edit",
  });

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            show();
          },
        }}
      >
        <Table {...tableProps}>
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="mission" title="Name" />
          <Table.Column
            dataIndex="mission_description"
            title="Mission Description"
          />
          <Table.Column dataIndex="day" title="Day(s)" />
          <Table.Column
            dataIndex="daily_rate"
            title="Daily Rate"
            render={(value) => <TagField value={value} color="red" />}
          />
          <Table.Column<IMission>
            title="Total"
            render={(_, record) => {
              return (
                <TagField
                  value={`${record?.daily_rate * record?.day} $`}
                  color="green"
                />
              );
            }}
          />
          <Table.Column<IMission>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_value, record) => (
              <EditButton
                hideText
                size="small"
                recordItemId={record?.id}
                onClick={() => editShow(record?.id)}
              />
            )}
          />
        </Table>
      </List>
      <CreateMission modalProps={modalProps} formProps={formProps} />
      <EditMission modalProps={editModalProps} formProps={editFormProps} />
    </>
  );
};
```

The `useTable()`and `useModalForm()` hooks are already familiar to us, as we have used them on [Day 3](https://refine.dev/blog/refine-react-invoice-generator-3/). In short, **refine-Ant Design**'s `useTable()` hook produces for us a set of props inside `tableProps` which is tailored to match the props accepted by **Ant Design**'s `<Table />` component. Similarly, we are picking the `formProps` object exposed by `useModalForm()` hook to be passed to the `<Form />` component, and also the `modalProps` to match the props accepted by `<Modal />` component.

Towards the end of this post, we dig into some of these hooks' source code and try to make sense of how **Refine** handles all these for us under the hood.

### Refine `create` View for `missions`

This is also similar to what we did on [Day 3](https://refine.dev/blog/refine-react-invoice-generator-3/). The `create` action for `missions` resource is performed from a `<Form />` inside the `<CreateMission />` view which is basically built on top of a `<Modal />` component.

Thanks to the `createButtonProps` of the `<List />` component, the modal is accessible upon click on a `<CreateButton />`.

The `<CreateMission />` component which accepts and relays `formProps` to `<Form />` and `modalProps` to the `<Modal />` component looks like this:

```tsx title="src/components/mission/create.tsx"
import { Form, Input, ModalProps, FormProps, Modal, InputNumber } from "antd";

type CreateMissionProps = {
  modalProps: ModalProps;
  formProps: FormProps;
};

export const CreateMission: React.FC<CreateMissionProps> = ({
  modalProps,
  formProps,
}) => {
  return (
    <Modal {...modalProps} title="Create Contact">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="mission"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="mission_description">
          <Input />
        </Form.Item>
        <Form.Item label="Day(s)" name="day">
          <InputNumber defaultValue={1} />
        </Form.Item>
        <Form.Item label="Daily Rate" name="daily_rate">
          <InputNumber defaultValue={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
```

### Refine `edit` View for `missions`

The `edit` view is also similar to the `create` view. The `<EditMission />` component looks like this:

```tsx title="src/components/mission/edit.tsx"
import { Form, Input, ModalProps, FormProps, Modal, InputNumber } from "antd";

type EditMissionProps = {
  modalProps: ModalProps;
  formProps: FormProps;
};

export const EditMission: React.FC<EditMissionProps> = ({
  modalProps,
  formProps,
}) => {
  return (
    <Modal {...modalProps} title="Create Contact">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="mission"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="mission_description">
          <Input />
        </Form.Item>
        <Form.Item label="Day(s)" name="day">
          <InputNumber defaultValue={1} />
        </Form.Item>
        <Form.Item label="Daily Rate" name="daily_rate">
          <InputNumber defaultValue={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
```

It's render is triggered by a click on the `<EditButton />` placed inside a `<Table.Column />` element in the `<MissionList />` component.

Ok. With these views completed, we should be able to create, list and show `missions` records from our app.

<img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/edit_view.png" alt="Invoice edit form view" />

<br />

## Adding Views for `invoices`

For the `invoices` resource, we have three routes and each path has its own view. Let's start with again with the `list`.

### Refine `list` View for `invoices`

The `<InvoiceList />` rendered at `/invoices` looks like this:

<details>
<summary>Show InvoiceList code </summary>
<p>

```tsx title="src/pages/invoices/list.tsx"
import { useState } from "react";
import { useModal } from "@refinedev/core";
import {
  List,
  useTable,
  DateField,
  TagField,
  EmailField,
  DeleteButton,
  EditButton,
} from "@refinedev/antd";

// It is recommended to use explicit import as seen below to reduce bundle size.
// import { IconName } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

import { Table, Space, Button, Modal } from "antd";

import { IInvoice, IMission } from "interfaces";
// import { PdfLayout } from "components/pdf";

const { FilePdfOutlined } = Icons;

export const InvoiceList: React.FC = () => {
  const [record, setRecord] = useState<IInvoice>();

  const { tableProps } = useTable<IInvoice>({
    meta: {
      populate: {
        contact: { populate: ["client"] },
        company: { populate: ["logo"] },
        missions: "*",
      },
    },
  });

  const { show, visible, close } = useModal();

  return (
    <>
      <List>
        <Table {...tableProps}>
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column<IInvoice>
            dataIndex="name"
            title="Invoice Name"
            render={(_, record) => {
              return `Invoice_#${record.id}${record?.name}`;
            }}
          />
          <Table.Column<IInvoice>
            dataIndex="date"
            title="Invoice Date"
            render={(value) => <DateField format="LL" value={value} />}
          />
          <Table.Column dataIndex={["company", "name"]} title="Company" />
          <Table.Column
            dataIndex={"missions"}
            title="Missions"
            render={(value) => {
              return value.map((item: IMission) => {
                return (
                  <TagField key={item?.id} color="blue" value={item?.mission} />
                );
              });
            }}
          />
          <Table.Column
            dataIndex="discount"
            title="Discount(%)"
            render={(value) => <TagField color="blue" value={value} />}
          />
          <Table.Column
            dataIndex="tax"
            title="Tax(%)"
            render={(value) => <TagField color="cyan" value={value} />}
          />
          <Table.Column dataIndex="custom_id" title="Custom Invoice ID" />

          <Table.Column
            dataIndex={["contact", "email"]}
            title="Contact"
            render={(value) => <EmailField value={value} />}
          />
          <Table.Column<IInvoice>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => {
              return (
                <Space>
                  <EditButton hideText size="small" recordItemId={record?.id} />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record?.id}
                  />
                </Space>
              );
            }}
          />
        </Table>
      </List>
    </>
  );
};
```

</p>
</details>

We already covered `useTable()` in a couple of more components earlier, but in this instance pay attention to the `meta.populate` property of the object passed to `useTable()` hook. We can nest the `populate` property in order to get deeply associated collections in our query results:

```tsx
const { tableProps } = useTable<IInvoice>({
  meta: {
    populate: {
      contact: { populate: ["client"] },
      company: { populate: ["logo"] },
      missions: "*",
    },
  },
});
```

### Refine `create` View for `invoices`

The `<CreateInvoice />` page for `invoices` is accessible from the `<CreateButton />` component that is placed inside the **refine-Ant Design** `<List />` component by default.

The `<CreateInvoice />` view looks like this:

<details>
<summary>Show CreateInvoice code</summary>
<p>

```tsx title="src/pages/invoices/create.tsx"
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";

import { ICompany, IContact, IMission, IInvoice } from "interfaces";

export const CreateInvoice = () => {
  const { formProps, saveButtonProps } = useForm<IInvoice>();

  const { selectProps: companySelectProps } = useSelect<ICompany>({
    resource: "companies",
    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: contactSelectProps } = useSelect<IContact>({
    resource: "contacts",
    optionLabel: "first_name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: missionSelectProps } = useSelect<IMission>({
    resource: "missions",
    optionLabel: "mission",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" wrapperCol={{ md: 18, lg: 16 }}>
        <Form.Item label="Invoice Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          label="Company"
          name="company"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...companySelectProps} />
        </Form.Item>

        <Form.Item
          label="Missions"
          name="missions"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...missionSelectProps} mode="multiple" />
        </Form.Item>
        <Form.Item label="Discount(%)" name="discount">
          <Input />
        </Form.Item>
        <Form.Item label="Tax(%)" name="tax">
          <Input />
        </Form.Item>
        <Form.Item label="Custom ID" name="custom_id">
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...contactSelectProps} />
        </Form.Item>
        <Form.Item label="Invoice Date" name="date">
          <DatePicker style={{ width: "50%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

</p>
</details>

There are a couple of things important in the code above. First, the use of `<Create />` component, which consumes the `saveButtonProps` object extracted from the `useForm()` hook. And secondly, the use of the `useSelect()` hook. We'll come to `useSelect()` in the next section about `edit` view but notice that multiple `useSelect()` hooks are used to fetch data from the **Strapi** backend, before they can be added to different fields of the form to create a new `invoices` entry.

**Refine `<Create />` Component**

The `<Create />` component by default places a **refine-Ant Design** `<SaveButton />` component as its child and `saveButtonProps` are passed to it. `saveButtonProps` include props for the form action, button loading and disabling states. Here, when the `<SaveButton />` is clicked `formProps.onFinish()` is triggered, which eventually invokes the `dataProvider.create` method via `useCreate()`.

For the details about how the `<SaveButton />` works, feel free to read through the [docs here](https://refine.dev/core/docs/api-reference/antd/components/buttons/save-button/).

### Refine `edit` Views for `invoices`

The `<EditInvoice />` page is more or less the same as the `create` view. Its content looks as below:

<details>
<summary>Show EditInvoice code</summary>
<p>

```tsx title="src/pages/invoices/edit.tsx"
import { useForm, useSelect, Edit } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

import { IInvoice } from "interfaces";

export const EditInvoice = () => {
  const { formProps, saveButtonProps, query } = useForm<IInvoice>({
    meta: { populate: ["company", "contact", "missions"] },
  });

  const defaultValue = query?.data?.data;

  const { selectProps: companySelectProps } = useSelect({
    resource: "companies",
    defaultValue: defaultValue?.company.id,
    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: contactSelectProps } = useSelect({
    resource: "contacts",
    defaultValue: defaultValue?.contact?.id,
    optionLabel: "first_name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: missionSelectProps } = useSelect({
    resource: "missions",
    optionLabel: "mission",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" wrapperCol={{ md: 18, lg: 16 }}>
        <Form.Item label="Invoice Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          label="Company"
          name={["company", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...companySelectProps} />
        </Form.Item>

        <Form.Item
          label="Mission"
          name={["missions"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...missionSelectProps} mode="multiple" />
        </Form.Item>
        <Form.Item label="Discount(%)" name="discount">
          <Input />
        </Form.Item>
        <Form.Item label="Tax(%)" name="tax">
          <Input />
        </Form.Item>
        <Form.Item label="Custom ID" name="custom_id">
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact"
          name={["contact", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...contactSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

</p>
</details>

This time, the `meta.populate` property includes multiple associated resources in the query results.

<br />

**Refine `useSelect()` Hook**

We are using multiple `useSelect()` hooks that allow us fetch `companies`, `missions` and `contacts` data and avail them to `<Form.Item />`s. Under the hood, a `useSelect()` hook counts on the `useList()` data hook to access and invoke the `dataProvider.getList` method for fetching data from our **Strapi** backend. The argument object passed is, therefore, the same as that of `useList()`. For more details, please see [the `useSelect()` API reference here](https://refine.dev/core/docs/api-reference/antd/hooks/field/useSelect/).

With these components added, we should be able to create, list and edit invoices.

<img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-13-refine-invoicer-4/useselect.png" alt="useSelect dropdown in the invoice form" />

<br />

## Low Level Inspection

We have used several high level **refine-Ant Design** hooks so far in this series. Namely, `useSimpleList()`, `useModalForm()`, `useDrawerForm()`, `useTable()` and `useSelect()`. Their internal implementations are pretty sophisticated according to the specific requirements they fulfill, both in terms of data fetching and UI presentation.

In the following sections, we zoom in on the low level implementation of `useTable()`, `useSelect()` hooks and `<CreateButton />` component. This is to shed some light into the tremendous tasks accomplished by **Refine** hooks and components behind the scenes. This should guide us enough to examine other hooks and components mentioned above. They are available inside the `node_modules/@refinedev/antd` directory.

### refine-Ant Design `useTable()` Hook

We mentioned that `useTable()` is built on top of `useList()`, which is indirectly true. This is because **Refine**'s core module also has a `useTable()` hook. We are using **refine-Ant Design**'s `useTable()` hook here, which is actually built on top of the core `useTable()` hook.

Endowed a due patience, we can see this in action among many others in the `@refinedev/antd` folder for `useTable()`:

<details>
<summary>Show useTable source code</summary>
<p>

```tsx title="node_modules/@refinedev/antd/src/hooks/table/useTable/useTable.ts"
const {
  tableQuery,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  filters,
  setFilters,
  sorters,
  setSorters,
  sorter,
  setSorter,
  createLinkForSyncWithLocation,
  pageCount,
} = useTableCore<TData, TError>({
  permanentSorter,
  permanentFilter,
  initialCurrent,
  initialPageSize,
  pagination,
  hasPagination,
  filters: filtersFromProp,
  sorters: sortersFromProp,
  initialSorter,
  initialFilter,
  syncWithLocation,
  resource,
  defaultSetFilterBehavior,
  successNotification,
  errorNotification,
  queryOptions,
  liveMode: liveModeFromProp,
  onLiveEvent,
  liveParams,
  meta: pickNotDeprecated(meta, metaData),
  meta: pickNotDeprecated(meta, metaData),
  dataProviderName,
});
```

</p>
</details>

Then, it's the core `useTable()` hook that is leveraging `useList()` data hook in order to invoke the `dataProvider.getList` method:

<details>
<summary>Inside useTable hook</summary>
<p>

```tsx title="node_modules/@refinedev/core/src/hooks/useTable/index.ts"
const { result, query } = useList<TData, TError>({
  resource: resourceInUse,
  hasPagination,
  pagination: { currentPage, pageSize, mode: pagination?.mode },
  filters: unionFilters(preferredPermanentFilters, filters),
  sorters: unionSorters(preferredPermanentSorters, sorters),
  queryOptions,
  successNotification,
  errorNotification,
  meta: preferredMeta,
  meta: preferredMeta,
  liveMode,
  liveParams,
  onLiveEvent,
  dataProviderName,
});
```

</p>
</details>

Then, among others inside the gigantic returned object, the `tableProps` property conforms to the props that are accepted by the [**Ant Design** `<Table />` component](https://ant.design/components/table#table):

```tsx
return {
  // ...
  tableProps: {
    dataSource: data?.data,
    loading: liveMode === "auto" ? isLoading : !isFetched,
    onChange,
    pagination: antdPagination(),
    scroll: { x: true },
  },
  // ...
};
```

### refine-Ant Design `useSelect()` Hook

The `useList()` hook is also being utilized **for** the `useSelect()` **refine-Ant Design** hook, but inside the core `useSelect()` hook which then plays its role inside the higher level `@refinedev/antd` version.

The source code of `useSelect()` inside `@refinedev/antd` package uses `useSelectCore()` in the following snippet:

```tsx title="node_modules/@refinedev/antd/src/hooks/field/useSelect/index.ts"
const { query, defaultValueQueryResult, onSearch, options } =
  useSelectCore(props);

return {
  selectProps: {
    options,
    onSearch,
    loading: defaultValueQueryResult.isFetching,
    showSearch: true,
    filterOption: false,
  },
  query,
  defaultValueQueryResult,
};
```

Inside the core version, `useList()` is key to fetching data from the backend API:

<details>
<summary>Show useSelect source code</summary>
<p>

```tsx title="node_modules/@refinedev/core/src/hooks/useSelect/index.ts"
const { result, query } = useList<TData, TError>({
  resource,
  sorters: pickNotDeprecated(sorters, sort),
  filters: filters.concat(search),
  pagination: {
    currentPage: pagination?.currentPage,
    pageSize: pagination?.pageSize ?? fetchSize,
    mode: pagination?.mode,
  },
  hasPagination,
  queryOptions: {
    ...queryOptions,
    onSuccess: (data) => {
      defaultQueryOnSuccess(data);
      queryOptions?.onSuccess?.(data);
    },
  },
  successNotification,
  errorNotification,
  meta: pickNotDeprecated(meta, metaData),
  liveMode,
  liveParams,
  onLiveEvent,
  dataProviderName,
});
```

</p>
</details>

The returned object is tailored to match [the props of the **Ant Design** `<Select />` component](https://ant.design/components/select#select-props):

```tsx
return {
  selectProps: {
    options,
    onSearch,
    loading: defaultValueQueryResult.isFetching,
    showSearch: true,
    filterOption: false,
  },
  query,
  defaultValueQueryResult,
};
```

### refine-Ant Design `<DeleteButton />`

The `<DeleteButton />` implements `useDelete` directly. In `@refinedev/antd` `v5.1.2`, it is invoked like so:

```tsx title="node_modules/@refinedev/antd/src/components/buttons/delete/index.tsx"
const {
  mutate,
  mutation: { isLoading, variables },
} = useDelete();
```

And the returned JSX has a `<Popconfirm />` component with an `onConfirm` prop. The delete `mutate` function is passed to `onConfirm` prop, which basically means to invoke `dataProvider.delete` upon confirmation of a delete pop up:

```tsx
return (
    <Popconfirm
        // ...
        onConfirm={(): void => {
            if ((recordItemId ?? id) && resource?.name) {
                mutate(
                    {
                        id: recordItemId ?? id ?? "",
                        resource: resource?.name,
                        mutationMode,
                        successNotification,
                        errorNotification,
                        meta: pickNotDeprecated(meta, metaData),
                        dataProviderName,
                        invalidates,
                    },
                    {
                        onSuccess: (value) => {
                            onSuccess && onSuccess(value);
                        },
                    },
                );
            }
        }}
        // ...
    </Popconfirm>
);
```

As we can see from the above analysis, in the background, **Refine** handles a lot of data heavy tasks, fine-tunes compatibility with popular stable UI components; and in the foreground, it keeps its hooks and elements highly customizable, compact and elegant.

## Summary

In this post, we added CRUD pages for `missions` and `invoices` pages in our **Pdf Invoice Generator** app.

We set off with creating **Strapi** collections for these resources and setting permissions for `authenticated` users to access them. We then added the resource objects and route definitions before we built the pages and their partial components.

We discussed in significant depth how higher level hooks like `useTable()` and `useModalForm()` provide developer convenience by dealing with data fetching and processing behind the scenes. We then inspect the source code of a couple of these hooks and the `<DeleteButton />` to see how the heavy tasks are done.

In the next episode, we add PDF renderer to our app. The PDF renderer will allow users to generate and voew a pdf document for an invoice.
