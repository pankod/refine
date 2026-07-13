---
title: "Introduction Guide | React UI Library in Refine v5"
display_title: "Introduction"
sidebar_label: "Introduction"
description: "Secure Introduction in Refine v5. Learn best practices. Learn integrate React UI library, components for polished admin UIs. Hands-on examples included."
---

Refine provides an integration package for [Mantine](https://mantine.dev) library. This package provides a set of ready to use components and hooks that connects Refine with Mantine components. While Refine's integration offers a set of components and hooks, it is not a replacement for the Mantine UI packages, you will be able to use all the features of Mantine in the same way you would use it in a regular React application. Refine's integration only provides components and hooks for an easier usage of Mantine components in combination with Refine's features and functionalities.

import Example from "./previews/example.tsx";

<Example />

## Installation

Installing the package is as simple as just by running the following command without any additional configuration:

<InstallPackagesCommand args="@refinedev/mantine @refinedev/react-table @mantine/core@5 @mantine/hooks@5 @mantine/form@5 @mantine/notifications@5 @emotion/react@11 @tabler/icons-react @tanstack/react-table"/>

:::info Version Support
Refine's Mantine integration currently uses Mantine v5.
:::

## Usage

We'll wrap our app with the [`<MantineProvider />`](https://v5.mantine.dev/theming/mantine-provider/) to make sure we have the theme available for our app, then we'll use the layout components to wrap them around our routes. Check out the examples below to see how to use Refine's Mantine integration.

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

Mantine offers styled [table primitives](https://v5.mantine.dev/core/table/) but lacks the table management solution. Refine recommends using [`@refinedev/react-table`](/core/docs/packages/list-of-packages/) package which is built on top of Refine's [`useTable`](/core/docs/data/hooks/use-table/) hook and Tanstack Table's [`useTable`](https://tanstack.com/table/v8/docs/adapters/react-table) hook to enable features from pagination to sorting and filtering. Refine's documentations and examples of Mantine uses `@refinedev/react-table` package for table management but you have the option to use any table management solution you want.

```tsx title="pages/products/list.tsx"
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List, ShowButton, EditButton, DeleteButton } from "@refinedev/mantine";

import {
  Box,
  Group,
  ScrollArea,
  Select,
  Table,
  Pagination,
} from "@mantine/core";

const columns = [
  { id: "id", header: "ID", accessorKey: "id" },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    meta: { filterOperator: "contains" },
  },
  { id: "price", header: "Price", accessorKey: "price" },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "id",
    enableColumnFilter: false,
    enableSorting: false,
    cell: function render({ getValue }) {
      return (
        <Group spacing="xs" noWrap>
          <ShowButton hideText recordItemId={getValue() as number} />
          <EditButton hideText recordItemId={getValue() as number} />
          <DeleteButton hideText recordItemId={getValue() as number} />
        </Group>
      );
    },
  },
];

export const ProductList = () => {
  const {
    reactTable: { getHeaderGroups, getRowModel, setOptions },
    refineCore: {
      setCurrentPage,
      pageCount,
      currentPage,
      tableQuery: { data: tableData },
    },
  } = useTable<IProduct>({ columns });

  return (
    <ScrollArea>
      <List>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
        <Pagination
          position="right"
          total={pageCount}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </List>
    </ScrollArea>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

## Forms

Refine provides a seamless integration with the [`useForm`](https://v5.mantine.dev/form/use-form/) hook of `@mantine/form` from validation to submission via the [`useForm`](/core/docs/ui-integrations/mantine/hooks/use-form/) hook exported from the `@refinedev/mantine` package.

```tsx title="pages/products/create.tsx"
import { Create, useForm } from "@refinedev/mantine";
import { TextInput, NumberInput } from "@mantine/core";

export const ProductCreate = () => {
  // highlight-start
  const { saveButtonProps, getInputProps, errors } = useForm({
    initialValues: {
      name: "",
      material: "",
      price: 0,
    },
  });
  // highlight-end

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          id="name"
          label="Name"
          placeholder="Name"
          {...getInputProps("name")}
        />
        <TextInput
          mt={8}
          id="material"
          label="Material"
          placeholder="Material"
          {...getInputProps("material")}
        />
        <NumberInput
          mt={8}
          id="price"
          label="Price"
          placeholder="Price"
          {...getInputProps("price")}
        />
      </form>
    </Create>
  );
};
```

`@refinedev/mantine` also offers hooks to implement different types of forms such as [`useModalForm`](/core/docs/ui-integrations/mantine/hooks/use-modal-form/), [`useDrawerForm`](/core/docs/ui-integrations/mantine/hooks/use-drawer-form/) and [`useStepsForm`](/core/docs/ui-integrations/mantine/hooks/use-steps-form/) hooks. Additionally [`useSelect`](/core/docs/ui-integrations/mantine/hooks/use-select/) hook is also provided to make it easier to implement form fields with relational data. The `useSelect` hook of `@refinedev/mantine` leverage the [`useSelect`](/core/docs/data/hooks/use-select/) hook from the `@refinedev/core` package.

## Notifications

Mantine has its own built-in notification system through [`@mantine/notifications`](https://v5.mantine.dev/others/notifications/) package which works seamlessly with its UI elements. Refine also provides a seamless integration with Mantine's notification system and show notifications for related actions and events. This integration is provided by the `notificationProvider` hook exported from the `@refinedev/mantine` package which can be directly used in the [`notificationProvider`](/core/docs/core/refine-component#notificationprovider) prop of the `<Refine />` component.

```tsx title="app.tsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";

const App = () => {
  return (
    // `@mantine/notifications` also requires a context provider to be used
    <NotificationsProvider position="top-right">
      <Refine notificationProvider={useNotificationProvider}>
        {/* ... */}
      </Refine>
    </NotificationsProvider>
  );
};
```

## Predefined Components and Views

### Layouts, Menus and Breadcrumbs

Refine provides Layout components that can be used to implement a layout for the application. These components are crafted using Mantine's components and includes Refine's features and functionalities such as navigation menus, headers, authentication, authorization and more.

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

[`<ThemedLayout />`](/core/docs/ui-integrations/mantine/components/themed-layout/) component consists of a header, sider and a content area. The sider have a navigation menu items for the defined resources of Refine, if an authentication provider is present, it will also have a functional logout button. The header contains the app logo and name and also information about the current user if an authentication provider is present.

Additionally, Refine also provides a [`<Breadcrumb />`](/core/docs/ui-integrations/mantine/components/breadcrumb/) component that uses the Mantine's component as a base and provide appropriate breadcrumbs for the current route. This component is used in the basic views provided by Refine's Mantine package automatically.

### Buttons

Refine's Mantine integration offers variety of buttons that are built above the [`<Button />`](https://v5.mantine.dev/core/button/) component of Mantine and includes many logical functionalities such as;

- Authorization checks
- Confirmation dialogs
- Loading states
- Invalidation
- Navigation
- Form actions
- Import/Export and more.

You can use buttons such as [`<EditButton />`](/core/docs/ui-integrations/mantine/components/buttons/edit-button/) or [`<ListButton />`](/core/docs/ui-integrations/mantine/components/buttons/list-button/) etc. in your views to provide navigation for the related routes or [`<DeleteButton />`](/core/docs/ui-integrations/mantine/components/buttons/delete-button/) and [`<SaveButton />`](/core/docs/ui-integrations/mantine/components/buttons/save-button/) etc. to perform related actions without having to worry about the authorization checks and other logical functionalities.

An example usage of the `<EditButton />` component is as follows:

```tsx title="pages/products/list.tsx"
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List, EditButton } from "@refinedev/mantine";

const columns = [
  { id: "id", header: "ID", accessorKey: "id" },
  { id: "name", header: "Name", accessorKey: "name", meta: { filterOperator: "contains" } },
  { id: "price", header: "Price", accessorKey: "price" },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "id",
    cell: function render({ getValue }) {
      // highlight-next-line
      return <EditButton hideText recordItemId={getValue() as number} />;
    },
  },
];

export const ProductList = () => {
  const table = useTable({ columns });

  return ( /* ... */ );
};
```

The list of provided buttons are:

- [`<CreateButton />`](/core/docs/ui-integrations/mantine/components/buttons/create-button/)
- [`<EditButton />`](/core/docs/ui-integrations/mantine/components/buttons/edit-button/)
- [`<ListButton />`](/core/docs/ui-integrations/mantine/components/buttons/list-button/)
- [`<ShowButton />`](/core/docs/ui-integrations/mantine/components/buttons/show-button/)
- [`<CloneButton />`](/core/docs/ui-integrations/mantine/components/buttons/clone-button/)
- [`<DeleteButton />`](/core/docs/ui-integrations/mantine/components/buttons/delete-button/)
- [`<SaveButton />`](/core/docs/ui-integrations/mantine/components/buttons/save-button/)
- [`<RefreshButton />`](/core/docs/ui-integrations/mantine/components/buttons/refresh-button/)
- [`<ImportButton />`](/core/docs/ui-integrations/mantine/components/buttons/import-button/)
- [`<ExportButton />`](/core/docs/ui-integrations/mantine/components/buttons/export-button/)

Many of these buttons are already used in the views provided by Refine's Mantine integration. If you're using the basic view elements provided by Refine, you will have the appropriate buttons placed in your application out of the box.

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks. Refine's Mantine integration uses components such as [`<Box />`](https://v5.mantine.dev/core/box/), [`<Card />`](https://v5.mantine.dev/core/card/) and [`<Group />`](https://v5.mantine.dev/core/group/) to provide these views and provides customization options by passing related props to these components.

The list of provided views are:

- [`<List />`](/core/docs/ui-integrations/mantine/components/basic-views/list/)
- [`<Show />`](/core/docs/ui-integrations/mantine/components/basic-views/show/)
- [`<Edit />`](/core/docs/ui-integrations/mantine/components/basic-views/edit/)
- [`<Create />`](/core/docs/ui-integrations/mantine/components/basic-views/create/)

import BasicViews from "./previews/basic-views.tsx";

<BasicViews />

### Fields

Refine's Mantine also provides field components to render values with appropriate design and format of Mantine. These components are built on top of respective Mantine components and also provide logic for formatting of the values. While these components might not always be suitable for your use case, they can be combined or extended to provide the desired functionality.

The list of provided field components are:

- [`<BooleanField />`](/core/docs/ui-integrations/mantine/components/fields/boolean-field/)
- [`<DateField />`](/core/docs/ui-integrations/mantine/components/fields/date-field/)
- [`<EmailField />`](/core/docs/ui-integrations/mantine/components/fields/email-field/)
- [`<FileField />`](/core/docs/ui-integrations/mantine/components/fields/file-field/)
- [`<MarkdownField />`](/core/docs/ui-integrations/mantine/components/fields/markdown-field/)
- [`<NumberField />`](/core/docs/ui-integrations/mantine/components/fields/number-field/)
- [`<TagField />`](/core/docs/ui-integrations/mantine/components/fields/tag-field/)
- [`<TextField />`](/core/docs/ui-integrations/mantine/components/fields/text-field/)
- [`<UrlField />`](/core/docs/ui-integrations/mantine/components/fields/url-field/)

```tsx title="pages/products/show.tsx"
import { useShow } from "@refinedev/core";
import {
  Show,
  TextField,
  NumberField,
  MarkdownField,
} from "@refinedev/mantine";

import { Title } from "@mantine/core";

export const ProductShow = () => {
  const { result: product } = useShow();
  const { data, isLoading } = query;

  return (
    <Show isLoading={isLoading}>
      <Title mt="xs" order={5}>
        Name
      </Title>
      {/* highlight-next-line */}
      <TextField value={product?.name} />

      <Title mt="xs" order={5}>
        Description
      </Title>
      {/* highlight-next-line */}
      <MarkdownField value={product?.description} />

      <Title mt="xs" order={5}>
        Price
      </Title>
      {/* highlight-next-line */}
      <NumberField
        value={product?.price}
        options={{ style: "currency", currency: "USD" }}
      />
    </Show>
  );
};
```

### Auth Pages

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine. Auth page components are built on top of basic Mantine components such as [`<TextInput />`](https://v5.mantine.dev/core/text-input/) and [`<Card />`](https://v5.mantine.dev/core/card/) etc.

The list of types of auth pages that are available in the UI integrations are:

- `<AuthPage type="login" />`
- `<AuthPage type="register" />`
- `<AuthPage type="forgot-password" />`
- `<AuthPage type="reset-password" />`

An example usage of the [`<AuthPage />`](/core/docs/ui-integrations/mantine/components/auth-page/) component is as follows:

import AuthPage from "./previews/auth-page.tsx";

<AuthPage />

### Error Components

Refine's Mantine integration also provides an `<ErrorComponent />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

An example usage of the `<ErrorComponent />` component is as follows:

```tsx title="pages/404.tsx"
import { ErrorComponent } from "@refinedev/mantine";

const NotFoundPage = () => {
  return <ErrorComponent />;
};
```

## Theming

Since Refine offers application level components such as layout, sidebar and header and page level components for each action, it is important to have it working with the styling of Mantine. All components and providers exported from the `@refinedev/mantine` package will use the current theme of Mantine without any additional configuration.

Additionally, Refine also provides a set of carefully crafted themes for Mantine which outputs a nice UI with Refine's components with light and dark theme support. These themes are exported as `RefineThemes` object from the `@refinedev/mantine` package and can be used in [`<MantineProvider />`](https://v5.mantine.dev/theming/mantine-provider/) component of Mantine.

import Theming from "./previews/theming.tsx";

<Theming />

To learn more about the theme configuration of Mantine, please refer to the [official documentation](https://v5.mantine.dev/theming/theme-object/).

## Inferencer

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports the `MantineListInferencer`, `MantineShowInferencer`, `MantineEditInferencer`, `MantineCreateInferencer` components and finally the `MantineInferencer` component, which combines all in one place.

To learn more about Inferencer, please refer to the [Mantine Inferencer](/core/docs/ui-integrations/mantine/components/inferencer/) docs.
