---
title: "Introduction Guide | Material Design UI in Refine v5"
display_title: "Introduction"
sidebar_label: "Introduction"
description: "Set up Introduction in Refine v5. Learn best practices. Explore customization options for Material Design, components for polished admin UIs."
---

Refine provides an integration package for [Material UI](https://mui.com/material-ui/getting-started/) framework. This package provides a set of ready to use components and hooks that connects Refine with Material UI components. While Refine's integration offers a set of components and hooks, it is not a replacement for the Material UI packages, you will be able to use all the features of Material UI in the same way you would use it in a regular React application. Refine's integration only provides components and hooks for an easier usage of Material UI components in combination with Refine's features and functionalities.

import Example from "./previews/example.tsx";

<Example />

## Installation

Installing the package is as simple as just by running the following command without any additional configuration:

<InstallPackagesCommand args="@refinedev/mui @refinedev/react-hook-form @emotion/react @emotion/styled @mui/lab @mui/material @mui/x-data-grid react-hook-form"/>

## Usage

We'll wrap our app with the [`<ThemeProvider />`](https://mui.com/material-ui/customization/theming/#themeprovider) to make sure we have the theme available for our app, then we'll use the layout components to wrap them around our routes. Check out the examples below to see how to use Refine's Material UI integration.

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

Refine provides a seamless integration with the [`<DataGrid />`](https://mui.com/x/react-data-grid/) component of Material UI from pagination to sorting and filtering via the [`useDataGrid`](/core/docs/ui-integrations/material-ui/hooks/use-data-grid/) hook exported from the `@refinedev/mui` package. This `useDataGrid` hook extends the [`useTable`](/core/docs/data/hooks/use-table/) hook of `@refinedev/core` package and provides a set of additional features and transformations to make it work with Material UI's `<DataGrid />` component without any additional configuration.

```tsx title="pages/products/list.tsx"
// highlight-next-line
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<IProduct>[] = [
  { field: "id", headerName: "ID", type: "number", width: 50 },
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  { field: "price", headerName: "Price", minWidth: 300, flex: 1 },
];

export const ProductList: FC = () => {
  // highlight-next-line
  const { dataGridProps } = useDataGrid<IProduct>();

  return (
    <List>
      {/* highlight-next-line */}
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
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

Material UI offers form elements yet it does not provide a form management solution. To have a complete solution, Refine recommends using [`@refinedev/react-hook-form`](/core/docs/packages/list-of-packages/) package which is built on top of Refine's [`useForm`](/core/docs/data/hooks/use-form/) hook and React Hook Form's [`useForm`](https://react-hook-form.com/docs/useform) hook.

Refine's documentations and examples of Material UI uses `@refinedev/react-hook-form` package for form management but you have the option to use any form management solution you want.

```tsx title="pages/products/create.tsx"
import { useForm } from "@refinedev/react-hook-form";
import { Create } from "@refinedev/mui";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const ProductCreate: FC = () => {
  const {
    saveButtonProps,
    refineCore: { query, autoSaveProps },
    register,
    control,
    formState: { errors },
  } = useForm<IProduct>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          label="Name"
          name="name"
        />
        <TextField
          id="price"
          {...register("price", {
            required: "This field is required",
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          label="Price"
          name="price"
        />
        <TextField
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          label="Description"
          name="description"
        />
      </Box>
    </Create>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

`@refinedev/mui` also provides [`useAutocomplete`](/core/docs/ui-integrations/material-ui/hooks/use-auto-complete/) hook which can be used to implement autocomplete fields with relational data. This hook leverages the [`useSelect`](/core/docs/data/hooks/use-select/) hook from the `@refinedev/core` package.

Additional hooks of `@refinedev/react-hook-form` such as [`useStepsForm`](/core/docs/packages/list-of-packages/) and [`useModalForm`](/core/docs/packages/list-of-packages/) can also be used together with Refine's Material UI integration with ease.

## Notifications

Material UI has its own notification elements but lacks the notification management solution. As [recommended by the Material UI's documentation](https://mui.com/material-ui/react-snackbar/#notistack); Refine's integration provides a notification provider which uses `notistack` package under the hood. This integration is provided by the `notificationProvider` exported from the `@refinedev/mui` package which can be directly used in the [`notificationProvider`](/core/docs/core/refine-component#notificationprovider) prop of the `<Refine />` component.

```tsx title="app.tsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/mui";

const App = () => {
  return (
    <Refine notificationProvider={useNotificationProvider}>{/* ... */}</Refine>
  );
};
```

:::tip
Usage of `<RefineSnackbarProvider />` is required to manage notifications through `notistack`. The component itself is a wrapper of the [`SnackbarProvider`](https://notistack.com/api-reference#snackbarprovider-props) component of `notistack` package.
:::

## Predefined Components and Views

### Layouts, Menus and Breadcrumbs

Refine provides Layout components that can be used to implement a layout for the application. These components are crafted using Material UI's components and includes Refine's features and functionalities such as navigation menus, headers, authentication, authorization and more.

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

[`<ThemedLayout />`](/core/docs/ui-integrations/material-ui/components/themed-layout/) component consists of a header, sider and a content area. The sider have a navigation menu items for the defined resources of Refine, if an authentication provider is present, it will also have a functional logout button. The header contains the app logo and name and also information about the current user if an authentication provider is present.

Additionally, Refine also provides a [`<Breadcrumb />`](/core/docs/ui-integrations/material-ui/components/breadcrumb/) component that uses the Material UI's component as a base and provide appropriate breadcrumbs for the current route. This component is used in the basic views provided by Refine's Material UI package automatically.

### Buttons

Refine's Material UI integration offers variety of buttons that are built above the [`<Button />`](https://mui.com/material-ui/react-button/) component of Material UI and includes many logical functionalities such as;

- Authorization checks
- Confirmation dialogs
- Loading states
- Invalidation
- Navigation
- Form actions
- Import/Export and more.

You can use buttons such as [`<EditButton />`](/core/docs/ui-integrations/material-ui/components/buttons/edit-button/) or [`<ListButton />`](/core/docs/ui-integrations/material-ui/components/buttons/list-button/) etc. in your views to provide navigation for the related routes or [`<DeleteButton />`](/core/docs/ui-integrations/material-ui/components/buttons/delete-button/) and [`<SaveButton />`](/core/docs/ui-integrations/material-ui/components/buttons/save-button/) etc. to perform related actions without having to worry about the authorization checks and other logical functionalities.

An example usage of the `<EditButton />` component is as follows:

```tsx title="pages/products/list.tsx"
import { useDataGrid, EditButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 50 },
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  { field: "price", headerName: "Price", minWidth: 300, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    display: "flex",
    renderCell: function render({ row }) {
        return (
          {/* highlight-next-line */}
          <EditButton hideText recordItemId={row.id} />
        );
    },
  }
]

export const ProductList: FC = () => {
  const { dataGridProps } = useDataGrid();

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns}  />
    </List>
  );
};
```

The list of provided buttons are:

- [`<CreateButton />`](/core/docs/ui-integrations/material-ui/components/buttons/create-button/)
- [`<EditButton />`](/core/docs/ui-integrations/material-ui/components/buttons/edit-button/)
- [`<ListButton />`](/core/docs/ui-integrations/material-ui/components/buttons/list-button/)
- [`<ShowButton />`](/core/docs/ui-integrations/material-ui/components/buttons/show-button/)
- [`<CloneButton />`](/core/docs/ui-integrations/material-ui/components/buttons/clone-button/)
- [`<DeleteButton />`](/core/docs/ui-integrations/material-ui/components/buttons/delete-button/)
- [`<SaveButton />`](/core/docs/ui-integrations/material-ui/components/buttons/save-button/)
- [`<RefreshButton />`](/core/docs/ui-integrations/material-ui/components/buttons/refresh-button/)
- [`<ImportButton />`](/core/docs/ui-integrations/material-ui/components/buttons/import-button/)
- [`<ExportButton />`](/core/docs/ui-integrations/material-ui/components/buttons/export-button/)

Many of these buttons are already used in the views provided by Refine's Material UI integration. If you're using the basic view elements provided by Refine, you will have the appropriate buttons placed in your application out of the box.

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks. Refine's Material UI integration uses components such as [`<Card />`](https://mui.com/material-ui/react-card/) and [`<Box />`](https://mui.com/material-ui/react-box/) to provide these views and provides customization options by passing related props to these components.

The list of provided views are:

- [`<List />`](/core/docs/ui-integrations/material-ui/components/basic-views/create/)
- [`<Show />`](/core/docs/ui-integrations/material-ui/components/basic-views/show/)
- [`<Edit />`](/core/docs/ui-integrations/material-ui/components/basic-views/edit/)
- [`<Create />`](/core/docs/ui-integrations/material-ui/components/basic-views/create/)

import BasicViews from "./previews/basic-views.tsx";

<BasicViews />

### Fields

Refine's Material UI also provides field components to render values with appropriate design and format of Material UI. These components are built on top of respective Material UI components and also provide logic for formatting of the values. While these components might not always be suitable for your use case, they can be combined or extended to provide the desired functionality.

The list of provided field components are:

- [`<BooleanField />`](/core/docs/ui-integrations/material-ui/components/fields/boolean-field/)
- [`<DateField />`](/core/docs/ui-integrations/material-ui/components/fields/date-field/)
- [`<EmailField />`](/core/docs/ui-integrations/material-ui/components/fields/email-field/)
- [`<FileField />`](/core/docs/ui-integrations/material-ui/components/fields/file-field/)
- [`<MarkdownField />`](/core/docs/ui-integrations/material-ui/components/fields/markdown-field/)
- [`<NumberField />`](/core/docs/ui-integrations/material-ui/components/fields/number-field/)
- [`<TagField />`](/core/docs/ui-integrations/material-ui/components/fields/tag-field/)
- [`<TextField />`](/core/docs/ui-integrations/material-ui/components/fields/text-field/)
- [`<UrlField />`](/core/docs/ui-integrations/material-ui/components/fields/url-field/)

```tsx title="pages/products/show.tsx"
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField } from "@refinedev/mui";
import Typography from "@mui/material/Typography";

export const ProductShow = () => {
  const { result: product } = useShow<IProduct>();
  const { data, isLoading } = query;

  return (
    <Show isLoading={isLoading}>
      <Typography variant="body1" fontWeight="bold">
        Id
      </Typography>
      {/* highlight-next-line */}
      <TextField value={product?.id} />

      <Typography variant="body1" fontWeight="bold">
        Title
      </Typography>
      {/* highlight-next-line */}
      <TextField value={product?.title} />

      <Typography variant="body1" fontWeight="bold">
        Title
      </Typography>
      {/* highlight-next-line */}
      <NumberField
        value={product?.price}
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

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine. Auth page components are built on top of basic Material UI components such as [`<TextField />`](https://mui.com/material-ui/react-text-field/) and [`<Card />`](https://mui.com/material-ui/react-card/) etc.

The list of types of auth pages that are available in the UI integrations are:

- `<AuthPage type="login" />`
- `<AuthPage type="register" />`
- `<AuthPage type="forgot-password" />`
- `<AuthPage type="reset-password" />`

An example usage of the [`<AuthPage />`](/core/docs/ui-integrations/material-ui/components/auth-page/) component is as follows:

import AuthPage from "./previews/auth-page.tsx";

<AuthPage />

### Error Components

Refine's Material UI integration also provides an `<ErrorComponent />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

An example usage of the `<ErrorComponent />` component is as follows:

```tsx title="pages/404.tsx"
import { ErrorComponent } from "@refinedev/mui";

const NotFoundPage = () => {
  return <ErrorComponent />;
};
```

## Theming

Since Refine offers application level components such as layout, sidebar and header and page level components for each action, it is important to have it working with the styling of Material UI. All components and providers exported from the `@refinedev/mui` package will use the current theme of Material UI without any additional configuration.

Additionally, Refine also provides a set of carefully crafted themes for Material UI which outputs a nice UI with Refine's components with light and dark theme support. These themes are exported as `RefineThemes` object from the `@refinedev/mui` package and can be used in [`<ThemeProvider />`](https://mui.com/material-ui/customization/theming/#theme-provider) component of Material UI.

import Theming from "./previews/theming.tsx";

<Theming />

To learn more about the theme configuration of Material UI, please refer to the [official documentation](https://mui.com/material-ui/customization/theming/).

## Inferencer

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports the `MuiListInferencer`, `MuiShowInferencer`, `MuiEditInferencer`, `MuiCreateInferencer` components and finally the `MuiInferencer` component, which combines all in one place.

To learn more about Inferencer, please refer to the [Material UI Inferencer](/core/docs/ui-integrations/material-ui/components/inferencer/) docs.
