---
title: "Ant Design Integration | Getting Started with Refine v4"
display_title: "Introduction"
sidebar_label: "Introduction"
description: "Learn how to set up and use Ant Design in your Refine v4 project. Introduction to official UI components, layouts, and pre-built CRUD views."
---

Refine provides an integration package for [Ant Design](https://ant.design/) framework. This package provides a set of ready to use components and hooks that connects Refine with Ant Design components. While Refine's integration offers a set of components and hooks, it is not a replacement for the Ant Design package, you will be able to use all the features of Ant Design in the same way you would use it in a regular React application. Refine's integration only provides components and hooks for an easier usage of Ant Design components in combination with Refine's features and functionalities.

import Example from "./previews/example.tsx";

<Example />

## Installation

Installing the package is as simple as just by running the following command without any additional configuration:

<InstallPackagesCommand args="@refinedev/antd antd"/>

## Usage

We'll wrap our app with the [`<ConfigProvider />`](https://ant.design/components/config-provider) to make sure we have the theme available for our app, then we'll use the layout components to wrap them around our routes. Check out the examples below to see how to use Refine's Ant Design integration.

<Tabs wrapContent={false}>
<TabItem value="react-router-dom" label="React Router">

import UsageReactRouterDom from "./previews/usage-react-router-dom.tsx";

<UsageReactRouterDom />

</TabItem>
<TabItem value="next-js" label="Next.js">

import UsageNextJs from "./previews/usage-next-js.tsx";

<UsageNextJs />

</TabItem>
<TabItem value="remix" label="Remix">

import UsageRemix from "./previews/usage-remix.tsx";

<UsageRemix />

</TabItem>
</Tabs>

## Tables

Refine provides a seamless integration with the [`<Table />`](https://ant.design/components/table) component of Ant Design from pagination to sorting and filtering via the [`useTable`](/core/docs/ui-integrations/ant-design/hooks/use-table) hook exported from the `@refinedev/antd` package. This hook is an extension of the `@refinedev/core`'s [`useTable`](/core/docs/data/hooks/use-table) and provides a set of additional features and transformations to make it work with Ant Design's `<Table />` component without any additional configuration.

```tsx title="pages/products/list.tsx"
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export const ProductList = () => {
  // highlight-next-line
  const { tableProps } = useTable<IProduct>();
  // `tableProps` contains the necessary props to be passed
  // to the `<Table />` component of Ant Design
  // by transforming the values to fit the Ant Design's API.

  return (
    // highlight-next-line
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="name" title="Name" />
      <Table.Column dataIndex="price" title="Price" />
    </Table>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

`@refinedev/antd` package also provides a [`<FilterDropdown />`](/core/docs/ui-integrations/ant-design/components/filter-dropdown) component to be used in the filter popover of the `<Table />` component. This component makes it easy to apply filters from the Ant Design UI without any additional configuration.

## Forms

Refine provides a seamless integration with the [`<Form />`](https://ant.design/components/form) component of Ant Design from validation to submission via the [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form) hook exported from the `@refinedev/antd` package. This hook is an extension of the `@refinedev/core`'s [`useForm`](/core/docs/data/hooks/use-form/) and provides a set of additional features and transformations to make it work with Ant Design's `<Form />` component.

```tsx title="pages/products/create.tsx"
import { useForm, SaveButton } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";

export const ProductCreate = () => {
    // highlight-next-line
    const { formProps, saveButtonProps } = useForm<IProduct>();
    // `formProps` contains the necessary props to be passed
    // to the `<Form />` component of Ant Design
    // by transforming the values to fit the Ant Design's API.

    return (
        <Form {...formProps} layout="vertical">
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>
            <SaveButton {...saveButtonProps}>
        </Form>
    )
}

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

`@refinedev/antd` also offers hooks to implement different types of forms such as [`useDrawerForm`](/core/docs/ui-integrations/ant-design/hooks/use-drawer-form), [`useModalForm`](/core/docs/ui-integrations/ant-design/hooks/use-modal-form) and [`useStepsForm`](/core/docs/ui-integrations/ant-design/hooks/use-steps-form) hooks. Additionally [`useSelect`](/core/docs/ui-integrations/ant-design/hooks/use-select), [`useCheckboxGroup`](/core/docs/ui-integrations/ant-design/hooks/use-checkbox-group) and [`useRadioGroup`](/core/docs/ui-integrations/ant-design/hooks/use-radio-group) hooks are also provided to make it easier to implement form fields with relational data. These hooks leverage the [`useSelect`](/core/docs/data/hooks/use-select) hook from the `@refinedev/core` package.

## Notifications

Ant Design has its own [notification system](https://ant.design/components/notification) which works seamlessly with its UI elements. Refine also provides a seamless integration with Ant Design's notification system and show notifications for related actions and events. This integration is provided by the `useNotificationProvider` hook exported from the `@refinedev/antd` package which can be directly used in the [`notificationProvider`](/core/docs/core/refine-component#notificationprovider) prop of the `<Refine />` component.

```tsx title="app.tsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import { App as AntdApp } from "antd";

const App = () => {
  return (
    <ConfigProvider theme={RefineThemes.Green}>
      <AntdApp>
        <Refine notificationProvider={useNotificationProvider}>
          {/* ... */}
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
};
```

:::tip
If you have any configurations in the Ant Design's theme, you should wrap your app with the [`<App />`](https://ant.design/components/app) component to make sure the notifications are also receiving the current theme configuration.
:::

## Predefined Components and Views

### Layouts, Menus and Breadcrumbs

Refine provides Layout components that can be used to implement a layout for the application. These components are crafted using Ant Design's components and includes Refine's features and functionalities such as navigation menus, headers, authentication, authorization and more.

<Tabs wrapContent={false}>
<TabItem value="react-router-dom" label="React Router">

import LayoutReactRouterDom from "./previews/layout-react-router-dom.tsx";

<LayoutReactRouterDom />

</TabItem>
<TabItem value="next-js" label="Next.js">

import LayoutNextJs from "./previews/layout-next-js.tsx";

<LayoutNextJs />

</TabItem>
<TabItem value="remix" label="Remix">

import LayoutRemix from "./previews/layout-remix.tsx";

<LayoutRemix />

</TabItem>
</Tabs>

[`<ThemedLayoutV2 />`](/core/docs/ui-integrations/ant-design/components/themed-layout) component consists of a header, sider and a content area. The sider have a navigation menu items for the defined resources of Refine, if an authentication provider is present, it will also have a functional logout button. The header contains the app logo and name and also information about the current user if an authentication provider is present.

Additionally, Refine also provides a [`<Breadcrumb />`](/core/docs/ui-integrations/ant-design/components/breadcrumb) component that uses the Ant Design's component as a base and provide appropriate breadcrumbs for the current route. This component is used in the basic views provided by Refine's Ant Design package automatically.

### Buttons

Refine's Ant Design integration offers variety of buttons that are built above the [`<Button />`](https://ant.design/components/button) component of Ant Design and includes many logical functionalities such as;

- Authorization checks
- Confirmation dialogs
- Loading states
- Invalidation
- Navigation
- Form actions
- Import/Export and more.

You can use buttons such as [`<EditButton />`](/core/docs/ui-integrations/ant-design/components/buttons/edit-button) or [`<ListButton />`](/core/docs/ui-integrations/ant-design/components/buttons/list-button) etc. in your views to provide navigation for the related routes or [`<DeleteButton />`](/core/docs/ui-integrations/ant-design/components/buttons/delete-button) and [`<SaveButton />`](/core/docs/ui-integrations/ant-design/components/buttons/save-button) etc. to perform related actions without having to worry about the authorization checks and other logical functionalities.

An example usage of the `<EditButton />` component is as follows:

```tsx title="pages/products/list.tsx"
import { useTable, EditButton } from "@refinedev/antd";
import { Table } from "antd";

export const ProductList = () => {
  const { tableProps } = useTable<IProduct>();

  return (
    // highlight-next-line
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="name" title="Name" />
      <Table.Column dataIndex="price" title="Price" />
      <Table.Column
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          // highlight-start
          <EditButton hideText size="small" recordItemId={record.id} />
          // highlight-end
        )}
      />
    </Table>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

The list of provided buttons are:

- [`<CreateButton />`](/core/docs/ui-integrations/ant-design/components/buttons/create-button)
- [`<EditButton />`](/core/docs/ui-integrations/ant-design/components/buttons/edit-button)
- [`<ListButton />`](/core/docs/ui-integrations/ant-design/components/buttons/list-button)
- [`<ShowButton />`](/core/docs/ui-integrations/ant-design/components/buttons/show-button)
- [`<CloneButton />`](/core/docs/ui-integrations/ant-design/components/buttons/clone-button)
- [`<DeleteButton />`](/core/docs/ui-integrations/ant-design/components/buttons/delete-button)
- [`<SaveButton />`](/core/docs/ui-integrations/ant-design/components/buttons/save-button)
- [`<RefreshButton />`](/core/docs/ui-integrations/ant-design/components/buttons/refresh-button)
- [`<ImportButton />`](/core/docs/ui-integrations/ant-design/components/buttons/import-button)
- [`<ExportButton />`](/core/docs/ui-integrations/ant-design/components/buttons/export-button)

Many of these buttons are already used in the views provided by Refine's Ant Design integration. If you're using the basic view elements provided by Refine, you will have the appropriate buttons placed in your application out of the box.

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks. Refine's Ant Design integration uses components such as [`<Card />`](https://ant.design/components/card) and [`<Space />`](https://ant.design/components/space) to provide these views and provides customization options by passing related props to these components.

The list of provided views are:

- [`<List />`](/core/docs/ui-integrations/ant-design/components/basic-views/list)
- [`<Show />`](/core/docs/ui-integrations/ant-design/components/basic-views/show)
- [`<Edit />`](/core/docs/ui-integrations/ant-design/components/basic-views/edit)
- [`<Create />`](/core/docs/ui-integrations/ant-design/components/basic-views/create)

import BasicViews from "./previews/basic-views.tsx";

<BasicViews />

### Fields

Refine's Ant Design also provides field components to render values with appropriate design and format of Ant Design. These components are built on top of respective Ant Design components and also provide logic for formatting of the values. While these components might not always be suitable for your use case, they can be combined or extended to provide the desired functionality.

The list of provided field components are:

- [`<BooleanField />`](/core/docs/ui-integrations/ant-design/components/fields/boolean-field)
- [`<DateField />`](/core/docs/ui-integrations/ant-design/components/fields/date-field)
- [`<EmailField />`](/core/docs/ui-integrations/ant-design/components/fields/email-field)
- [`<FileField />`](/core/docs/ui-integrations/ant-design/components/fields/file-field)
- [`<ImageField />`](/core/docs/ui-integrations/ant-design/components/fields/image-field)
- [`<MarkdownField />`](/core/docs/ui-integrations/ant-design/components/fields/markdown-field)
- [`<NumberField />`](/core/docs/ui-integrations/ant-design/components/fields/number-field)
- [`<TagField />`](/core/docs/ui-integrations/ant-design/components/fields/tag-field)
- [`<TextField />`](/core/docs/ui-integrations/ant-design/components/fields/text-field)
- [`<UrlField />`](/core/docs/ui-integrations/ant-design/components/fields/url-field)

```tsx title="pages/products/show.tsx"
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField } from "@refinedev/antd";
import { Typography } from "antd";

export const ProductShow = () => {
  const { queryResult } = useShow<IProduct>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Typography.Title level={5}>Id</Typography.Title>
      {/* highlight-next-line */}
      <TextField value={record?.id} />

      <Typography.Title level={5}>Title</Typography.Title>
      {/* highlight-next-line */}
      <TextField value={record?.title} />

      <Typography.Title level={5}>Price</Typography.Title>
      {/* highlight-next-line */}
      <NumberField
        value={record?.price}
        options={{ style: "currency", currency: "USD" }}
      />
    </Show>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

### Auth Pages

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine. Auth page components are built on top of basic Ant Design components such as [`<Form />`](https://ant.design/components/form) and [`<Card />`](https://ant.design/components/card) etc.

The list of types of auth pages that are available in the UI integrations are:

- `<AuthPage type="login" />`
- `<AuthPage type="register" />`
- `<AuthPage type="forgot-password" />`
- `<AuthPage type="reset-password" />`

An example usage of the [`<AuthPage />`](/core/docs/ui-integrations/ant-design/components/auth-page) component is as follows:

import AuthPage from "./previews/auth-page.tsx";

<AuthPage />

### Error Components

Refine's Ant Design integration also provides an `<ErrorComponent />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

An example usage of the `<ErrorComponent />` component is as follows:

```tsx title="pages/404.tsx"
import { ErrorComponent } from "@refinedev/antd";

const NotFoundPage = () => {
  return <ErrorComponent />;
};
```

## Theming

Since Refine offers application level components such as layout, sidebar and header and page level components for each action, it is important to have it working with the styling of Ant Design. All components and providers exported from the `@refinedev/antd` package will use the current theme of Ant Design without any additional configuration.

Additionally, Refine also provides a set of carefully crafted themes for Ant Design which outputs a nice UI with Refine's components with light and dark theme support. These themes are exported as `RefineThemes` object from the `@refinedev/antd` package and can be used in [`<ConfigProvider />`](https://ant.design/components/config-provider) component of Ant Design.

import Theming from "./previews/theming.tsx";

<Theming />

To learn more about the theme configuration of Ant Design, please refer to the [official documentation](https://ant.design/docs/react/customize-theme).

## Inferencer

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports the `AntdListInferencer`, `AntdShowInferencer`, `AntdEditInferencer`, `AntdCreateInferencer` components and finally the `AntdInferencer` component, which combines all in one place.

To learn more about Inferencer, please refer to the [Ant Design Inferencer](/core/docs/ui-integrations/ant-design/components/inferencer) docs.

## Known Issues

Next.js Pages Router with version 14 and above gives the following error when using `@ant-design` package:

```bash title="Compile errors"
Server Error
SyntaxError: Unexpected token 'export'

This error happened while generating the page. Any console logs will be displayed in the terminal window.
Call Stack
<unknown>
/Users/user/Desktop/refine/node_modules/ (ant-design/icons-svg/es/asn/AccountBookFilled.js (3)
```

You can find issue details from the official Ant Design repository:

- https://github.com/ant-design/ant-design/issues/43510
- https://github.com/ant-design/ant-design/issues/46053
