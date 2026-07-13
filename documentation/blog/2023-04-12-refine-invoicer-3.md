---
title: Adding CRUD Pages
description: We'll be adding CRUD pages for Company, Client and Contact resources in this post.
slug: refine-react-invoice-generator-3
authors: abdullah_numan
category: "How To Build"
tags: [react, refine-week]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-12-refine-invoicer-3/social.png
hide_table_of_contents: false
---

In this post, we build on our existing understanding of `dataProvider` and `authProvider` props of `<Refine />` to implement CRUD operations in our **Pdf Invoice Generator** app that we initialized in the previous post. While doing so, we discuss the roles of `<Refine />` component's `resources` and routing conventions as well.

CRUD actions are supported by the [**Strapi**](https://strapi.io/) data provider we chose for our project and in this post we use them to build pages for **Company**, **Client** and **Contact** resources. We implement appropriate pages and partial components with `list`, `create`, `edit` and `delete` actions. We also add auth features we discussed on Day Two of the [**RefineWeek**](https://refine.dev/core/week-of-refine-strapi/) series.

We're on Day Three and this **RefineWeek** is a five-part tutorial that aims to help developers learn the ins-and-outs of **Refine**'s powerful capabilities and get going with **Refine** within a week.

### RefineWeek ft. Strapi series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-react-invoice-generator-1/)
- Day 2 - [Setting Up the Invoicer App](https://refine.dev/blog/refine-react-invoice-generator-2/)

## Overview

In the last episode, we explored **Refine**'s auth and data providers in significant details. We saw that `<Refine />`'s `dataProvider` and `authProvider` props were set to support **Strapi** thanks to the [`@refinedev/strapi-v4`](https://github.com/refinedev/refine/tree/main/packages/strapi) package.

We mentioned that `dataProvider` methods allow us to communicate with API endpoints and `authProvider` methods help us with authentication and authorization. We are able to access and invoke these methods from consumer components via their corresponding hooks.

In this post, we leverage the **Strapi** `dataProvider` methods to implement CRUD operations for `companies`, `clients` and `contacts` resources. We start by passing them to the `resources` prop on `<Refine />` and we aim to be able to perform `list`, `create`, `show`, `edit` and `delette` actions where appropriate.

We will make use of the **Strapi** auth provider and the `<AuthPage />` component, both of which comes baked with the boilerplate code as we chose to include example pages when we initialized the project. On the way, we will explore a series of convenient **Refine** hooks and components which making CRUD operations implementation a breeze. In particular, we'll focus on `useSimpleList()`, `useModalForm()`, `useDrawerForm`, `useTable()` and `useFrom()`. And components such as **Ant Design** `<List />` imported as `<AntdList />`, `<Modal />`, `<Drawer />` and **refine-Ant Design**'s `<List />` and `<Authpage />` components.
<br />

## Version 4 Housekeeping

Before we start adding our resources, we need to remove the code related to `products` and `categories` resources and then set up access tokens for **Strapi**.

### Cleanup

So, let's cleanslate the `resources` prop and remove the imports and routes for `products` and `categories`.

We'll have to change the name of our app to **Invoicer**. So, let's replace all instances of **Refine Project** to **Invoicer**.

After cleaning up, the `<App />` component should look as below:

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

const { UserAddOutlined, TeamOutlined, InfoCircleOutlined } = Icons;

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

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            resources={
              [
                // resources removed
              ]
            }
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
                // routes removed
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

### Strapi API Tokens

In order for `dataProvider` and `authProvider` to work, we need to create an API token in the **Strapi** backend so that we can use it to access the API endpoints from our **Refine** **Pdf Invoice Generator** app. We can create it from the `Settings >> API Tokens` page of the dashboard of the **Strapi** backend we are running at `http://localhost:1337`.

Please follow [this section](https://docs.strapi.io/user-docs/settings/managing-global-settings#creating-a-new-api-token) of the **Strapi** docs for more details on creating API Tokens.

I have created mine. After creating the token, we have to place it inside `src/constants.ts` file. So, let's update it:

```tsx title="src/constants.ts"
export const API_URL = "http://localhost:1337";
export const TOKEN_KEY =
  "625b118353b2924b459527cd39f7ca792a870cc13619562a3e3f8ee6908519c581bcabb8152cbd10913e72d9adf725e6bd99b8793632b34d1dd952544e3bd883eaba7c3ab169308cd29730267247147d20af102d70a311d515d9b5ab06384e0a2418fe47ecda895d74d87bbcf6bbc74d9b318d5795fcf7be1691ed4524d73621";
```

With these done, now we are one step closer to start adding resourcess with their associated routes, pages and components. -->

### Type Definitions

We'll use the following type definitions for our entities:

<details>
<summary>Show Interfaces</summary>
<p>

```tsx title="src/interfaces/index.d.ts"
export interface ICompany {
  id: string;
  name: string;
  address: string;
  country: string;
  city: string;
  email: string;
  website: string;
  logo?: null | { url: string };
}

export interface IClient {
  id: string;
  name: string;
  contacts: IContact[];
}

export interface IContact {
  id: string;
  first_name: string;
  last_name: string;
  client: IClient;
  email: string;
}

export interface IMission {
  id: string;
  mission: string;
  day: number;
  daily_rate: number;
}

export interface IInvoice {
  id: string;
  name: string;
  date: Date;
  company: ICompany;
  discount: number;
  tax: number;
  custom_id: string;
  comments: string;
  contact: IContact;
  missions: IMission[];
  status: Status;
}

type Status = {
  status: "Paid" | "No Paid";
};
```

</p>
</details>

## Implementing CRUD Operations

`create`, `show`, `edit`, `list`, and `delete` actions in **Refine** are achieved through the collective interactions of methods from several providers, including `dataProvider`, `routerProvider` and others such as the `notificationsProvider` and the `accessControlProvider`. They primarily rely on the `resources` prop for the resource names and path definitions in order to match incoming requests with the appropriate views.

In versions `< v4`, `resources` items used to include view definitions (for example, `list: CompanyList`) such as in the following:

```tsx title="version v3 resource object"
{
    name: "companies",
    meta: { label: "Company" },
    list: CompanyList,
    icon: <InfoCircleOutlined />,
},
```

However, view definitions are not used in `v4` `resources` items. Instead, as we will see below, **path definitions** are specified. Version `v4` allows flexible routing with `<Route />` components, and so view definitions for each `resources` item are now configured inside `<Route />` components.

In the mean time, legacy resource definitions, data and auth providers are still functional in **Refine** `v4`. If you want to use the legacy `resources` convention, you have to use the `legacyRouterProvider` prop instead of `routerProvider` and `legacyAuthProvider` prop instead of the `authProvider` prop of the `<Refine />` component. More on this [here](https://refine.dev/core/docs/api-reference/core/providers/router-provider/#legacy-router-provider).

In this app, we are using the new definitions introduced in `v4`.

Keeping these points in mind, let's now implement CRUD operations for `companies`, `clients` and `contacts`. We'll first add the resource objects and route definitions, at once for all the three resources above. In the later sections, we'll consider the CRUD actions one by one for each resource with related pages and partial components.

### Adding `resources` to `<Refine />`

Under the new type definition in `v4`, the `resources` array for our three resources should look like this:

```tsx title="resources prop array"
[
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
];
```

We can clearly see that instead of specifying the components for each view (for example, `list: CompanyList`), we are now assigning route paths.

### Adding Routes to `<Refine />`

In accordance with the path definitions in a resource object, we have to assign a `<Route />` for each `path` and an `element` to display at that path. The route definitions for our three resources look like this:

```tsx title="Routing in v4"
<Refine>
  <Routes>
    <Route
      element={
        <Authenticated fallback={<CatchAllNavigate to="/login" />}>
          <Layout Header={Header}>
            <Outlet />
          </Layout>
        </Authenticated>
      }
    >
      <Route index element={<NavigateToResource resource="companies" />} />
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
    </Route>
  </Routes>
</Refine>
```

Notice that the parent `<Routes />` component that overarches the routes is placed as a child of the `<Refine />` component, and **not** as its prop. Also notice the nested `<Route />` elements, suggesting deeper levels of nesting are possible due to the flexibility in version `v4`.

## Page Views in Refine

As elaborated on [Day Two](https://refine.dev/blog/refine-react-invoice-generator-2/), in order to display data on a view, the data provider methods have to be accessed from consumer components via corresponding data hooks. In other words, the pages specified in each `<Route />` should invoke appropriate data hooks to fetch data for relevant CRUD actions taking place at that route.

Having this in mind, after importing all relevant page components for each resource route, the `<App />` component now should look like below:

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

const { UserAddOutlined, TeamOutlined, InfoCircleOutlined } = Icons;

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

In the following sections, we explore these pages one by one for each resource along with their partial components and examine the hooks used to fetch and render data from the **Strapi** backend.

## Adding Views for Companies

For the `companies` resource, our app should have `list`, `create`, `edit` and `delete` actions. In the following sections, as we add the necessary components, we also discuss what `dataProvider` methods and data hooks we are using for these actions.

### `list` View for `companies`

The `list` view is the page where a collection of resource item is displayed. It typically invokes the `dataProvider.getList()` method which represents a `GET` request to the backend API. The `dataProvider.getList()` method can be accessed via the `useList()` data hook.

The component rendered at the `list` view at `/companies` is `<CompanyList />`. It looks like this:

```tsx title="src/pages/companies/list.tsx"
import { HttpError } from "@refinedev/core";
import { useSimpleList, List, useModalForm } from "@refinedev/antd";
import { List as AntdList } from "antd";

import { ICompany } from "interfaces";
import { CompanyItem, CreateCompany, EditCompany } from "components/company";

export const CompanyList = () => {
  const { listProps } = useSimpleList<ICompany>({
    meta: { populate: ["logo"] },
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "create",
    meta: { populate: ["logo"] },
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "edit",
    meta: { populate: ["logo"] },
  });

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createShow();
          },
        }}
      >
        <AntdList
          grid={{ gutter: 16 }}
          {...listProps}
          renderItem={(item) => (
            <AntdList.Item>
              <CompanyItem item={item} editShow={editShow} />
            </AntdList.Item>
          )}
        />
      </List>
      <CreateCompany
        modalProps={createModalProps}
        formProps={createFormProps}
      />
      <EditCompany modalProps={editModalProps} formProps={editFormProps} />
    </>
  );
};
here;
```

**`useSimpleList()` Hook in Refine**

We are using the `useSimpleList()` data hook in the `<CompanyList />` component. It is a higher level hook built on top of the `useList()` hook that comes with the `@refinedev/antd` package. `useList()` is a low level **Refine** core hook.

`useSimpleList()` hook is being used to display our `companies` data in a list. More details about the `useSimpleList()` hook is available [here](https://refine.dev/core/docs/api-reference/antd/hooks/list/useSimpleList/).

Basically, the `useSimpleList()` hook gives us access to the `dataProvider.getList` method from inside the `<CompanyList />` component. We are grabbing the `listProps` object and passing it to the `<AntdList />`, which is an **Ant Design** component that displays the items.

Detailed reference of the **Ant Design** `<List />` component (imported as `<AntdList />`) is available [here](https://ant.design/components/list#api).

### Company `create` Action

Take a note of the `<List />` component in the `<CompanyList />` page. And especially the `createButtonProps` prop. `<List />` is an **refine-Ant Design** component that by default places a `<CreateButton />` inside its header. This button's `onClick` props can be customized by setting the `createButtonsProps` prop of `<List />`.

For example, with the below object, we are setting the behavior of the button to show the modal by invoking `createShow()` on the click event:

```tsx
 createButtonProps={{
    onClick: () => {
        createShow();
    },
}}
```

More elaboration about it is available in the [docs section here](https://refine.dev/core/docs/api-reference/antd/components/basic-views/list/#cancreate-and-createbuttonprops).

In the `<CompanyList />` page above, by specifying the value of `createButtonProps` prop for `<List />`, we are activating the `<CreateButton />`. And then we are invoking the `createShow` modal function for the `onClick` event on the button.

<br />

**`useModalForm()` Hook in Refine**

Stepping back to the `<CompanyList />` component, we can see that `useModalForm()` hook is used to invoke the `dataProvider.create` method.

```tsx
const {
  modalProps: createModalProps,
  formProps: createFormProps,
  show: createShow,
} = useModalForm<ICompany, HttpError, ICompany>({
  action: "create",
  meta: { populate: ["logo"] },
});
```

We are picking `modalProps` and `formProps` and passing them to the `<CreateCompany />` modal. To get more comprehensive understanding, please feel free to go over the [`useModalForm()` API reference here](https://refine.dev/core/docs/api-reference/antd/hooks/form/useModalForm/).

**refine-Ant Design `<Modal />` Component**

The modal itself is contained in `<CreateCompany />` and has the following content:

<details>
<summary>Show CreateCompany source code</summary>
<p>

```tsx
import { useApiUrl } from "@refinedev/core";
import { Modal, Form, Input, Grid, ModalProps, FormProps, Upload } from "antd";

import {
  useStrapiUpload,
  getValueProps,
  mediaUploadMapper,
} from "@refinedev/strapi-v4";

import { TOKEN_KEY } from "../../constants";

type CreateCompanyProps = {
  modalProps: ModalProps;
  formProps: FormProps;
};

export const CreateCompany: React.FC<CreateCompanyProps> = ({
  modalProps,
  formProps,
}) => {
  const breakpoint = Grid.useBreakpoint();
  const { ...uploadProps } = useStrapiUpload({
    maxCount: 1,
  });
  const API_URL = useApiUrl();

  return (
    <Modal
      {...modalProps}
      title="Create Company"
      width={breakpoint.sm ? "600px" : "80%"}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
          return formProps.onFinish?.({
            ...mediaUploadMapper(values),
          });
        }}
      >
        <Form.Item
          label="Company Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Company Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Company Country" name="country">
          <Input />
        </Form.Item>
        <Form.Item label="Company City" name="city">
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input />
        </Form.Item>
        <Form.Item label="Company Logo">
          <Form.Item
            name={"logo"}
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger
              name="files"
              action={`${API_URL}/upload`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
              }}
              listType="picture"
              multiple
              {...uploadProps}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};
```

</p>
</details>

There are several things to emphasize around the modal here. First, the `modalProps` prop passed to the `<Modal />` component allows the operation of the modal. Second, the `formProps` is used to manipulate and fetch form data for the `create` action. And third, the use of the `useStrapiUpload()` hook that comes from `@refinedev/strapi-v4` that is used to upload `logo` for a company.

<br />

**Refine `<Form />` Component**

The `formProps` are tailored according to and passed to the **Ant Design** `<Form />` component. If we look closer, the form `values` are passed to the `onFinish` event handler for send a `POST` request. More information on the `<Form />` component is available [here](https://ant.design/components/form#form).

### Company `edit` and `delete` Actions

We are rendering a `<CompanyItem />` component inside the `<CompanyList />` page. Its content looks like this:

```tsx title="src/components/company/item.tsx"
import {
  DeleteButton,
  UrlField,
  EmailField,
  EditButton,
} from "@refinedev/antd";
import { Card, Typography } from "antd";

import { ICompany } from "interfaces";
import { API_URL } from "../../constants";

const { Title, Text } = Typography;

type CompanyItemProps = {
  item: ICompany;
  editShow: (id?: string | undefined) => void;
};

export const CompanyItem: React.FC<CompanyItemProps> = ({ item, editShow }) => {
  const image = item.logo ? API_URL + item.logo.url : "./error.png";

  return (
    <Card
      style={{ width: "300px" }}
      cover={
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{
              width: 220,
              height: 100,
              padding: 24,
            }}
            src={image}
            alt="Company logo"
          />
        </div>
      }
      actions={[
        <EditButton
          key="edit"
          size="small"
          hideText
          onClick={() => editShow(item.id)}
        />,
        <DeleteButton
          key="delete"
          size="small"
          hideText
          recordItemId={item.id}
        />,
      ]}
    >
      <Title level={5}>Company Name:</Title>
      <Text>{item.name}</Text>
      <Title level={5}>Company Address:</Title>
      <Text>{item.address}</Text>
      <Title level={5}>County:</Title>
      <Text>{item.country}</Text>
      <Title level={5}>City:</Title>
      <Text>{item.city}</Text>
      <Title level={5}>Email:</Title>
      <EmailField value={item.email} />
      <Title level={5}>Website:</Title>
      <UrlField value={item.website} />
    </Card>
  );
};
```

In the above code, the [`<EditButton />`](https://refine.dev/core/docs/api-reference/antd/components/buttons/edit-button/) and [`<DeleteButton />`](https://refine.dev/core/docs/api-reference/antd/components/buttons/delete-button/) components are provided by the `@refinedev/antd` package.

The `<EditButton />` opens up the `<EditCompany />` modal when clicked. It uses a separate instance of the `useModalForm()` hook for forwarding editable data to the `edit` action inside `<EditCompany />`:

```tsx
const {
  modalProps: editModalProps,
  formProps: editFormProps,
  show: editShow,
} = useModalForm<ICompany, HttpError, ICompany>({
  action: "edit",
  meta: { populate: ["logo"] },
});
```

The `<DeleteButton />`, on the other hand, implements `delete` action on a `companies` item.

These are pretty much everything we need for the `list`, `create`, `edit` and `delete` actions on `companies` resource.

At this point, let's run the **Refine** server and the **Strapi** server at `http://localhost:1337`. And we should be presented with a login screen at `http://localhost:3000/login`:

<img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-12-refine-invoicer-3/login.png" alt="Invoice app login screen" />

<br />

### Email Authentication with Strapi in Refine

The login in screen is encountered because when we asked the **Refine** **CLI Wizard** to generate example pages at project initialization, the `authProvider` came enabled with them:

```tsx title="src/App.tsx"
<Refine authProvider={authProvider} />
```

The routing and components involved are the following:

```tsx
<Routes>
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
</Routes>
```

<br />

### refine-Ant Design `<AuthPage /` Component

The component being rendered at `/login` is the **refine-Ant Design** `<AuthPage />` component which is provided by the `@refinedev/antd` package. The `<AuthPage />` component is a special component that has variants for `login`, `register`, `forgotPassword` and `updatePassword`, which are generated based on the prop passed. For example in the code snippet above, we are asking for the `login` type of the `<AuthPage />` component at the `/login` route.

More on the `<AuthPage />` component is available [here](https://refine.dev/core/docs/api-reference/antd/components/antd-auth-page/).

At this point, if we attempt to log in to our **Pdf Invoice Generator** app using the default credentials on the form, we should be redirected to the `/companies` route. And we should expect a blank page.

When we create a few companies, they should be displayed in the page:

<img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-12-refine-invoicer-3/compaines.png" alt="Companies list view in the invoice app" />

<br />

We can go about editing company details from a modal and also delete a company.

The app redirects to `/companies`, because **Refine** sets the root route to be `list` path of the first resource item of the array passed to `resources`. If we look back into the `resources` array, we know that it's the `companies` resource.

## Adding Views for `clients`

Now it's time to turn our attention back to CRUD actions. Let's implement views for the `clients` resource.

We already completed the `resource` object and route definitions for `clients` previously. We now need to introduce the page and partial components.

### `list` View for `clients`

In a similar vein to the `<CompanyList />` component, the `<ClientList />` page looks like this:

```tsx title="src/pages/clients/list.tsx"
import { HttpError } from "@refinedev/core";
import {
  useSimpleList,
  List,
  useDrawerForm,
  CreateButton,
} from "@refinedev/antd";
import { List as AntdList } from "antd";

import { IClient } from "interfaces";
import { ClientItem, CreateClient, EditClient } from "components/client";

export const ClientList = () => {
  const { listProps } = useSimpleList<IClient>({
    meta: { populate: ["contacts"] },
  });

  const {
    drawerProps: createDrawerProps,
    formProps: createFormProps,
    saveButtonProps: createSaveButtonProps,
    show: createShow,
  } = useDrawerForm<IClient, HttpError, IClient>({
    action: "create",
    resource: "clients",
    redirect: false,
  });

  const {
    drawerProps: editDrawerProps,
    formProps: editFormProps,
    saveButtonProps: editSaveButtonProps,
    show: editShow,
  } = useDrawerForm<IClient, HttpError, IClient>({
    action: "edit",
    resource: "clients",
    redirect: false,
  });

  return (
    <>
      <List
        headerProps={{
          extra: <CreateButton onClick={() => createShow()} />,
        }}
      >
        <AntdList
          grid={{ gutter: 24, xs: 1 }}
          {...listProps}
          renderItem={(item) => (
            <AntdList.Item>
              <ClientItem item={item} editShow={editShow} />
            </AntdList.Item>
          )}
        />
      </List>
      <CreateClient
        drawerProps={createDrawerProps}
        formProps={createFormProps}
        saveButtonProps={createSaveButtonProps}
      />
      <EditClient
        drawerProps={editDrawerProps}
        formProps={editFormProps}
        saveButtonProps={editSaveButtonProps}
      />
    </>
  );
};
```

Like in the `<CompanyList />` component, we are leveraging `useSimpleList()` to fetch data from the `/clients` **Strapi** endpoint and the received data is tailored to suit to the props of `<AntdList />` component, which renders the client data in a list.

### `create` and `edit` Actions for `clients`

Similar to the `<CompanyList />` page, the `<List />` component in the `<ClientList />` page gets a `<CreateButton />`, this time from its `headerProps` prop. Clicking on the button slides a `<CreateClient />` component which is derived from the **Ant Design** `<Drawer />` component. The `drawerProps` containing fetched data is supplied by **refine-Ant Design**'s `useDrawerForm()` hook:

```tsx
const {
  drawerProps: createDrawerProps,
  formProps: createFormProps,
  saveButtonProps: createSaveButtonProps,
  show: createShow,
} = useDrawerForm<IClient, HttpError, IClient>({
  action: "create",
  resource: "clients",
  redirect: false,
});
```

**refine-Ant Design's `useDrawerForm()` Hook**

In the snippet above, we are picking `drawerProps`, `formProps` and `saveButtonProps` and passing them to the `<CreateClient />` component.

The `<CreateClient />` component looks like this:

<details>
<summary>Show CreateClient code</summary>
<p>

```tsx title="src/components/client/create.tsx"
import { Create, useSelect, useModalForm } from "@refinedev/antd";

import {
  Drawer,
  DrawerProps,
  Form,
  FormProps,
  Input,
  ButtonProps,
  Grid,
  Select,
  Button,
} from "antd";

import { IContact } from "interfaces";
import { CreateContact } from "components/contact";

type CreateClientProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const CreateClient: React.FC<CreateClientProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const breakpoint = Grid.useBreakpoint();

  const { selectProps } = useSelect<IContact>({
    resource: "contacts",
    optionLabel: "first_name",

    pagination: {
      mode: "server",
    },
  });

  const {
    formProps: createContactFormProps,
    modalProps,
    show,
  } = useModalForm({
    resource: "contacts",
    action: "create",
    redirect: false,
  });

  return (
    <>
      <Drawer
        {...drawerProps}
        width={breakpoint.sm ? "500px" : "100%"}
        bodyStyle={{ padding: 0 }}
      >
        <Create saveButtonProps={saveButtonProps}>
          <Form
            {...formProps}
            layout="vertical"
            initialValues={{
              isActive: true,
            }}
          >
            <Form.Item
              label="Client Company Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Select Contact">
              <div style={{ display: "flex" }}>
                <Form.Item name={"contacts"} noStyle>
                  <Select {...selectProps} mode="multiple" />
                </Form.Item>
                <Button type="link" onClick={() => show()}>
                  Create Contact
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Create>
      </Drawer>

      <CreateContact
        modalProps={modalProps}
        formProps={createContactFormProps}
      />
    </>
  );
};
```

</p>
</details>

The `formProps` is tailored to match the props of the **Ant Design** `<Form />` component and by specifying `action: "create"`, we are sending a `POST` request to `/clients` endpoint in our **Strapi** app.

Please feel free to explore the [`useDrawerForm()` documentation](https://refine.dev/core/docs/api-reference/antd/hooks/form/useDrawerForm/) for more details.

Our `edit` action for `clients`, similar to the `create` action, also leverages `useDrawerForm()` hook to manage operations and fetch data for the `<EditClient />` component:

<details>
<summary>Show EditClient code</summary>
<p>

```tsx title="src/components/client/edit.tsx"
import { Edit, useSelect } from "@refinedev/antd";
import {
  Drawer,
  DrawerProps,
  Form,
  FormProps,
  Input,
  ButtonProps,
  Grid,
  Select,
} from "antd";

type EditClientProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const EditClient: React.FC<EditClientProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const breakpoint = Grid.useBreakpoint();

  const { selectProps } = useSelect({
    resource: "contacts",
    optionLabel: "first_name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 0 }}
    >
      <Edit
        saveButtonProps={saveButtonProps}
        title={
          <h4 style={{ padding: "0 24px", fontWeight: "bold" }}>Edit Client</h4>
        }
      >
        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            isActive: true,
            ...formProps.initialValues,
          }}
        >
          <Form.Item
            label="Client Company Name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Select Contact" name="contacts">
            <Select {...selectProps} mode="multiple" />
          </Form.Item>
        </Form>
      </Edit>
    </Drawer>
  );
};
```

</p>
</details>

This is also built on the `<Drawer />` component. Please refer to [**Ant Design** documentation for `<Drawer />`](https://ant.design/components/drawer) for further examination.

### `delete` Action for `clients`

The `delete` action is performed from inside the `<ClientItem />` component. It looks like this:

<details>
<summary>Show ClientItemcode</summary>
<p>

```tsx title="src/components/client/item.tsx"
import { useDelete } from "@refinedev/core";
import { TagField } from "@refinedev/antd";

import * as Icons from "@ant-design/icons";
import { Card, Typography, Dropdown, Menu } from "antd";
import { IClient } from "interfaces";

const { FormOutlined, DeleteOutlined } = Icons;
const { Title, Text } = Typography;

type ClientItemProps = {
  item: IClient;
  editShow: (id?: string | undefined) => void;
};

export const ClientItem: React.FC<ClientItemProps> = ({ item, editShow }) => {
  const { mutate } = useDelete();

  return (
    <Card style={{ width: 300, height: 300, borderColor: "black" }}>
      <div style={{ position: "absolute", top: "10px", right: "5px" }}>
        <Dropdown
          overlay={
            <Menu mode="vertical">
              <Menu.Item
                key="1"
                style={{
                  fontWeight: 500,
                }}
                icon={
                  <FormOutlined
                    style={{
                      color: "green",
                    }}
                  />
                }
                onClick={() => editShow(item.id)}
              >
                Edit Client
              </Menu.Item>
              <Menu.Item
                key="2"
                style={{
                  fontWeight: 500,
                }}
                icon={
                  <DeleteOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
                onClick={() =>
                  mutate({
                    resource: "clients",
                    id: item.id,
                    mutationMode: "undoable",
                    undoableTimeout: 5000,
                  })
                }
              >
                Delete Client
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Icons.MoreOutlined
            style={{
              fontSize: 24,
            }}
          />
        </Dropdown>
      </div>

      <Title level={4}>{item.name}</Title>
      <Title level={5}>Client Id:</Title>
      <Text>{item.id}</Text>
      <Title level={5}>Contacts:</Title>

      {item.contacts.map((item) => {
        return (
          <TagField
            key={item.id}
            style={{ marginTop: 4 }}
            color={"#673ab7"}
            value={`${item.first_name} ${item.last_name}`}
          />
        );
      })}
    </Card>
  );
};
```

</p>
</details>

We are invoking `useDelete()` hook and picking the `mutate()` function for deleting a client. It is bound to the `onClick` event of the `Delete Client` button. The `mutate()` function is used to access and invoke the `dataProvider.delete` method.

With these views completed, now we should be able to create, list, update and delete `clients` records from within our **Refine** app.

<img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-12-refine-invoicer-3/clients.png" alt="Clients list view in the invoice app" />

<br />

## Adding Views for `contacts`

Now it's the turn to add views for `contacts`. As we can see, **Refine** is heavily opinionated about RESTful conventions and CRUD actions can be implemented conveniently with a multitude of hooks that match appropriate **Ant Design**-based components.

The `useTable()` hook, for example, is very useful to create list views with tables.

### `list` View for `contacts`

The `list` view for `contacts` makes use of the `useTable()` hook to present contacts information in a table using the **Ant Design** `<Table />` component. The page looks like below:

<details>
<summary>Show Contact list view code</summary>
<p>

```tsx title="src/pages/contacts/list.tsx"
import {
  List,
  TagField,
  useTable,
  EditButton,
  DeleteButton,
  useModalForm,
  EmailField,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import { IContact } from "interfaces";
import { CreateContact } from "components/contacts";

export const ContactList: React.FC = () => {
  const { tableProps } = useTable<IContact>({
    meta: { populate: ["client"] },
  });

  const {
    formProps: createContactFormProps,
    modalProps,
    show,
  } = useModalForm({
    resource: "contacts",
    action: "create",
    redirect: false,
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
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="first_name" title="First Name" />
          <Table.Column dataIndex="last_name" title="Last Name" />
          <Table.Column dataIndex={["client", "name"]} title="Client Company" />
          <Table.Column dataIndex="phone_number" title="Phone Number" />
          <Table.Column
            dataIndex="email"
            title="Email"
            render={(value: string) => <EmailField value={value} />}
          />
          <Table.Column
            dataIndex="job"
            title="Job"
            render={(value: string) => (
              <TagField color={"blue"} value={value} />
            )}
          />
          <Table.Column<{ id: string }>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
      <CreateContact
        modalProps={modalProps}
        formProps={createContactFormProps}
        hideCompanySelect={false}
      />
    </>
  );
};
```

</p>
</details>

It is important to note that the `meta.populate` property passed to `useTable()` is used to include associated collections in a query:

```tsx
const { tableProps } = useTable<IContact>({
  meta: { populate: ["client"] },
});
```

Here, we are getting the associated `clients` data of each `contacts` record.

### `create` Action for `contacts`

To allow a `create` action, once again, a `<CreateButton />` is placed as a child of the `<List />` component thanks to the `createButtonProps`, which when clicked displays a modal with the `<CreateContact />` component. The `<CreateContact />` content are as below:

<details>
<summary>Show Strapi data provider source code</summary>
<p>

```tsx title="src/components/contacts/CreateContact.tsx"
import { useSelect } from "@refinedev/antd";
import { Form, Modal, Input, ModalProps, FormProps, Select, Grid } from "antd";

type CreateContactProps = {
  modalProps: ModalProps;
  formProps: FormProps;
  hideCompanySelect?: boolean;
};

export const CreateContact: React.FC<CreateContactProps> = ({
  modalProps,
  formProps,
  hideCompanySelect = true,
}) => {
  const breakpoint = Grid.useBreakpoint();
  const { selectProps } = useSelect({
    resource: "clients",
    optionValue: "id",
    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Modal
      {...modalProps}
      title="Create Contact"
      width={breakpoint.sm ? "600px" : "80%"}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Client Company"
          name="client"
          hidden={hideCompanySelect}
        >
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone_number">
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Job" name="job">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
```

</p>
</details>

Again, the `<CreateContact />` component is derived from a `<Modal />` which is fed the `modalProps` and `formProps` received from `useModalForm()` hook invoked inside `<ContactList />`. This should look familiar from [the `list` views for companies section above](#list-view-for-companies).

### `edit` Action for `contacts`

`<ContactList />` has an `<EditButton />` which on click navigates to `/contacts/:id/edit` path. We have specified the resource and routes definitions for this earlier.

The component `/contacts/:id/edit` looks like this:

```tsx title="src/pages/contacts/edit.tsx"
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Select, Input } from "antd";

import { IContact } from "interfaces";

export const EditContact = () => {
  const { formProps, saveButtonProps, query } = useForm<IContact>({
    meta: { populate: ["client"] },
  });

  const defaultClientCompany = query?.data?.data;

  const { selectProps } = useSelect({
    resource: "clients",
    defaultValue: defaultClientCompany?.client?.id,
    optionValue: "id",
    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" wrapperCol={{ md: 18, lg: 16 }}>
        <Form.Item label="First Name" name="first_name">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name">
          <Input />
        </Form.Item>
        <Form.Item label="Client Company" name={["client", "id"]}>
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone_number">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Job" name="job">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

Here, we are using the `useForm()` hook to grab `formProps` to display existing data, and `saveButtonProps` to perform a mutation. Notice we are also using the `useSelect()` hook to fetch and display `selectProps` inside the form.

### `delete` Action for `contacts`

The `delete` action is implemented inside the `<DeleteButton />` for each row in the displayed table:

```tsx title="src/pages/contacts/list.tsx"
<DeleteButton hideText size="small" recordItemId={record.id} />
```

With these completed, we should now be able to create, list, edit and delete `contacts`.

<img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-12-refine-invoicer-3/contacts.png" alt="Contacts list view in the invoice app" />

<br />

## Summary

In this post, made use of `dataProvider` methods and their corresponding hooks to implement CRUD operations on three resources, namely: `companies`, `clients` and `contacts`.

We leveraged some high level hooks such as `useSimpleList`, `useModalForm()` and `useDrawerForm()` to fetch data and manage state in related components, which makes CRUD implementation very convenient. Examples of related components are `<List />`, `<Modal />` and `<Drawer />`.

We also implemented authentication and authorization on the **Strapi** backend side for a user we created on the **Strapi** app and the **refine-Ant Design** `<AuthPage />` component.

In the next episode, we cover the views for two other resources: `missions` and `invoices`.
