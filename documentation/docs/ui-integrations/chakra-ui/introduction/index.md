---
title: "Introduction Guide | Best Practices in Refine v5: Chakra UI"
display_title: "Introduction"
sidebar_label: "Introduction"
description: "Learn to integrate Introduction in Refine v5. Explore customization options for accessibility, components for polished admin UIs. Hands-on examples included."
---

Refine provides an integration package for [Chakra UI](https://chakra-ui.com/) framework. This package provides a set of ready to use components and hooks that connects Refine with Chakra UI components. While Refine's integration offers a set of components and hooks, it is not a replacement for the Chakra UI package, you will be able to use all the features of Chakra UI in the same way you would use it in a regular React application. Refine's integration only provides components and hooks for an easier usage of Chakra UI components in combination with Refine's features and functionalities.

import Example from "./previews/example.tsx";

<Example />

## Installation

Installing the package is as simple as just by running the following command without any additional configuration:

<InstallPackagesCommand args="@refinedev/chakra-ui @chakra-ui/react @refinedev/react-table @refinedev/react-hook-form @tanstack/react-table react-hook-form @tabler/icons-react"/>

## Usage

We'll wrap our app with the [`<ChakraProvider />`](https://chakra-ui.com/getting-started) to make sure we have the theme available for our app, then we'll use the layout components to wrap them around our routes. Check out the examples below to see how to use Refine's Chakra UI integration.

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

Chakra UI offers styled [table primitives](https://chakra-ui.com/docs/components/table) but lacks the table management solution. Refine recommends using [`@refinedev/react-table`](/core/docs/packages/list-of-packages/) package which is built on top of Refine's [`useTable`](/core/docs/data/hooks/use-table/) hook and Tanstack Table's [`useTable`](https://tanstack.com/table/v8/docs/adapters/react-table) hook to enable features from pagination to sorting and filtering. Refine's documentations and examples of Chakra UI uses `@refinedev/react-table` package for table management but you have the option to use any table management solution you want.

```tsx title="pages/products/list.tsx"
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
  DateField,
} from "@refinedev/chakra-ui";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Text,
} from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";

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
        <HStack>
          <ShowButton hideText size="sm" recordItemId={getValue() as number} />
          <EditButton hideText size="sm" recordItemId={getValue() as number} />
          <DeleteButton
            hideText
            size="sm"
            recordItemId={getValue() as number}
          />
        </HStack>
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
  } = useTable<IProduct>({
    columns,
    refineCoreProps: {
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    <Text>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Text>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
      />
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

`<Pagination />` component is a custom component that is used to render the pagination controls which uses `usePagination` hook from `@refinedev/chakra-ui` package. This hook accepts the pagination values from `useTable` hook and returns the pagination controls and related props.

<details>
<summary>Pagination Component</summary>

```tsx title="components/pagination.tsx"
import React from "react";
import { HStack, Button, Box } from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { usePagination } from "@refinedev/chakra-ui";

import { IconButton } from "@chakra-ui/react";

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  setCurrentPage,
}) => {
  const pagination = usePagination({
    currentPage,
    pageCount,
  });

  return (
    <Box display="flex" justifyContent="flex-end">
      <HStack my="3" spacing="1">
        {pagination?.prev && (
          <IconButton
            aria-label="previous page"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!pagination?.prev}
            variant="outline"
          >
            <IconChevronLeft size="18" />
          </IconButton>
        )}

        {pagination?.items.map((page) => {
          if (typeof page === "string") return <span key={page}>...</span>;

          return (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              variant={page === currentPage ? "solid" : "outline"}
            >
              {page}
            </Button>
          );
        })}
        {pagination?.next && (
          <IconButton
            aria-label="next page"
            onClick={() => setCurrentPage(currentPage + 1)}
            variant="outline"
          >
            <IconChevronRight size="18" />
          </IconButton>
        )}
      </HStack>
    </Box>
  );
};
```

</details>

## Forms

Chakra UI offers [form elements](https://chakra-ui.com/docs/components/input) yet it does not provide a form management solution. To have a complete solution, Refine recommends using [`@refinedev/react-hook-form`](/core/docs/packages/list-of-packages/) package which is built on top of Refine's [`useForm`](/core/docs/data/hooks/use-form/) hook and React Hook Form's [`useForm`](https://react-hook-form.com/docs/useform) hook.

Refine's documentations and examples of Chakra UI uses `@refinedev/react-hook-form` package for form management but you have the option to use any form management solution you want.

```tsx title="pages/products/create.tsx"
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const ProductCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm<IPost>();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                />
                <FormErrorMessage>
                    {`${errors.name?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.material}>
                <FormLabel>Material</FormLabel>
                <Input
                    id="material"
                    type="text"
                    {...register("material", { required: "Material is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.material?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    id="description"
                    {...register("description", {
                        required: "Description is required",
                    })}
                />
                <FormErrorMessage>
                    {\`$\{errors.description?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.price}>
                <FormLabel>Price</FormLabel>
                <Input
                    id="price"
                    type="number"
                    {...register("price", { required: "Price is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.price?.message}\`}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};
```

Additional hooks of `@refinedev/react-hook-form` such as [`useStepsForm`](/core/docs/packages/list-of-packages/) and [`useModalForm`](/core/docs/packages/list-of-packages/) can also be used together with Refine's Chakra UI integration with ease.

## Notifications

Chakra UI has its own [notification system](https://chakra-ui.com/docs/components/toast) which works seamlessly with its UI elements. Refine also provides a seamless integration with Chakra UI's notification system and show notifications for related actions and events. This integration is provided by the `notificationProvider` hook exported from the `@refinedev/chakra-ui` package which can be directly used in the [`notificationProvider`](/core/docs/core/refine-component#notificationprovider) prop of the `<Refine />` component.

```tsx title="app.tsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/chakra-ui";

const App = () => {
  return (
    <Refine
      // ...
      notificationProvider={useNotificationProvider}
    >
      {/* ... */}
    </Refine>
  );
};
```

## Predefined Components and Views

### Layouts, Menus and Breadcrumbs

Refine provides Layout components that can be used to implement a layout for the application. These components are crafted using Chakra UI's components and includes Refine's features and functionalities such as navigation menus, headers, authentication, authorization and more.

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

[`<ThemedLayout />`](/core/docs/ui-integrations/chakra-ui/components/themed-layout/) component consists of a header, sider and a content area. The sider have a navigation menu items for the defined resources of Refine, if an authentication provider is present, it will also have a functional logout button. The header contains the app logo and name and also information about the current user if an authentication provider is present.

Additionally, Refine also provides a [`<Breadcrumb />`](/core/docs/ui-integrations/chakra-ui/components/breadcrumb/) component that uses the Chakra UI's component as a base and provide appropriate breadcrumbs for the current route. This component is used in the basic views provided by Refine's Chakra UI package automatically.

### Buttons

Refine's Chakra UI integration offers variety of buttons that are built above the [`<Button />`](https://chakra-ui.com/docs/components/button) component of Chakra UI and includes many logical functionalities such as;

- Authorization checks
- Confirmation dialogs
- Loading states
- Invalidation
- Navigation
- Form actions
- Import/Export and more.

You can use buttons such as [`<EditButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/edit-button/) or [`<ListButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/list-button/) etc. in your views to provide navigation for the related routes or [`<DeleteButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/delete-button/) and [`<SaveButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/save-button/) etc. to perform related actions without having to worry about the authorization checks and other logical functionalities.

An example usage of the `<EditButton />` component is as follows:

```tsx title="pages/products/list.tsx"
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import { List, EditButton, DateField } from "@refinedev/chakra-ui";

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack, Text } from "@chakra-ui/react";

const columns = [
  { id: "id", header: "ID", accessorKey: "id" },
  { id: "name", header: "Name", accessorKey: "name", meta: { filterOperator: "contains" } },
  { id: "price", header: "Price", accessorKey: "price" },
  {
    id: "actions",
    header: "Actions",
    accessorKey: "id",
    cell: function render({ getValue }) {
      return (
        {/* highlight-next-line */}
        <EditButton hideText size="sm" recordItemId={getValue() as number} />
      );
    },
  },
];

export const ProductList = () => {
  const table = useTable<IProduct>({ columns });

  return ( /* ... */ );
};
```

The list of provided buttons are:

- [`<CreateButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/create-button/)
- [`<EditButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/edit-button/)
- [`<ListButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/list-button/)
- [`<ShowButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/show-button/)
- [`<CloneButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/clone-button/)
- [`<DeleteButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/delete-button/)
- [`<SaveButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/save-button/)
- [`<RefreshButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/refresh-button/)
- [`<ImportButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/import-button/)
- [`<ExportButton />`](/core/docs/ui-integrations/chakra-ui/components/buttons/export-button/)

Many of these buttons are already used in the views provided by Refine's Chakra UI integration. If you're using the basic view elements provided by Refine, you will have the appropriate buttons placed in your application out of the box.

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks. Refine's Chakra UI integration uses components such as [`<Box />`](https://chakra-ui.com/docs/components/box) and [`<Heading />`](https://chakra-ui.com/docs/components/heading) to provide these views and provides customization options by passing related props to these components.

The list of provided views are:

- [`<List />`](/core/docs/ui-integrations/chakra-ui/components/basic-views/list/)
- [`<Show />`](/core/docs/ui-integrations/chakra-ui/components/basic-views/show/)
- [`<Edit />`](/core/docs/ui-integrations/chakra-ui/components/basic-views/edit/)
- [`<Create />`](/core/docs/ui-integrations/chakra-ui/components/basic-views/create/)

import BasicViews from "./previews/basic-views.tsx";

<BasicViews />

### Fields

Refine's Chakra UI also provides field components to render values with appropriate design and format of Chakra UI. These components are built on top of respective Chakra UI components and also provide logic for formatting of the values. While these components might not always be suitable for your use case, they can be combined or extended to provide the desired functionality.

The list of provided field components are:

- [`<BooleanField />`](/core/docs/ui-integrations/chakra-ui/components/fields/boolean-field/)
- [`<DateField />`](/core/docs/ui-integrations/chakra-ui/components/fields/date-field/)
- [`<EmailField />`](/core/docs/ui-integrations/chakra-ui/components/fields/email-field/)
- [`<FileField />`](/core/docs/ui-integrations/chakra-ui/components/fields/file-field/)
- [`<MarkdownField />`](/core/docs/ui-integrations/chakra-ui/components/fields/markdown-field/)
- [`<NumberField />`](/core/docs/ui-integrations/chakra-ui/components/fields/number-field/)
- [`<TagField />`](/core/docs/ui-integrations/chakra-ui/components/fields/tag-field/)
- [`<TextField />`](/core/docs/ui-integrations/chakra-ui/components/fields/text-field/)
- [`<UrlField />`](/core/docs/ui-integrations/chakra-ui/components/fields/url-field/)

```tsx title="pages/products/show.tsx"
import { useShow } from "@refinedev/core";
import {
  Show,
  TextField,
  NumberField,
  MarkdownField,
} from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

export const ProductShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      {/* highlight-next-line */}
      <TextField value={record?.id} />

      <Heading as="h5" size="sm" mt={4}>
        Name
      </Heading>
      {/* highlight-next-line */}
      <TextField value={record?.name} />

      <Heading as="h5" size="sm" mt={4}>
        Material
      </Heading>
      {/* highlight-next-line */}
      <TextField value={record?.material} />

      <Heading as="h5" size="sm" mt={4}>
        Description
      </Heading>
      {/* highlight-next-line */}
      <MarkdownField value={record?.description} />

      <Heading as="h5" size="sm" mt={4}>
        Price
      </Heading>
      {/* highlight-next-line */}
      <NumberField
        value={record?.price}
        options={{ style: "currency", currency: "USD" }}
      />
    </Show>
  );
};
```

### Auth Pages

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine. Auth page components are built on top of basic Chakra UI components such as [`<Input />`](https://chakra-ui.com/docs/components/input) and [`<Card />`](https://chakra-ui.com/docs/components/card) etc.

The list of types of auth pages that are available in the UI integrations are:

- `<AuthPage type="login" />`
- `<AuthPage type="register" />`
- `<AuthPage type="forgot-password" />`
- `<AuthPage type="reset-password" />`

An example usage of the [`<AuthPage />`](/core/docs/ui-integrations/chakra-ui/components/auth-page/) component is as follows:

import AuthPage from "./previews/auth-page.tsx";

<AuthPage />

### Error Components

Refine's Chakra UI integration also provides an `<ErrorComponent />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

An example usage of the `<ErrorComponent />` component is as follows:

```tsx title="pages/404.tsx"
import { ErrorComponent } from "@refinedev/chakra-ui";

const NotFoundPage = () => {
  return <ErrorComponent />;
};
```

## Theming

Since Refine offers application level components such as layout, sidebar and header and page level components for each action, it is important to have it working with the styling of Chakra UI. All components and providers exported from the `@refinedev/chakra-ui` package will use the currentPage theme of Chakra UI without any additional configuration.

Additionally, Refine also provides a set of carefully crafted themes for Chakra UI which outputs a nice UI with Refine's components with light and dark theme support. These themes are exported as `RefineThemes` object from the `@refinedev/chakra-ui` package and can be used in [`<ChakraProvider />`](https://chakra-ui.com/getting-started) component of Chakra UI.

import Theming from "./previews/theming.tsx";

<Theming />

To learn more about the theme configuration of Chakra UI, please refer to the [official documentation](https://chakra-ui.com/docs/styled-system/customize-theme).

## Inferencer

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports the `ChakraListInferencer`, `ChakraShowInferencer`, `ChakraEditInferencer`, `ChakraCreateInferencer` components and finally the `ChakraInferencer` component, which combines all in one place.

To learn more about Inferencer, please refer to the [Chakra UI Inferencer](/core/docs/ui-integrations/chakra-ui/components/inferencer/) docs.
