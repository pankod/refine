---
title: CRUD Components
---

import { Sandpack, ListInListProducts, EditInEditProduct, CreateInCreateProduct, ShowInShowProduct } from "./sandpack.tsx";

<Sandpack>

After refactoring the components, it's time to learn about the CRUD view components provided by Refine's Material UI integration. These components are implemented to provide consistent design with Material UI with additional features such as headers with i18n support, breadcrumbs, navigation buttons, submission buttons, and more.

These components are not required to use Refine, but they are useful for building a consistent user interface without worrying about the common features you need across your application.

## List View

The `<List />` component is a wrapper component for list pages which provides an header with i18n support and navigation to create a new record. You can always provide more features and elements by passing customizing the component.

:::note

Remember that when we've removed the `<Header />` component, we've also removed the navigation link for the `/products/create` route. `<List />` will automatically add a button for this purpose without needing any additional code.

:::

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import React from "react";
import { useSelect } from "@refinedev/core";
// highlight-next-line
import { List, useDataGrid, EditButton, ShowButton } from "@refinedev/mui";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ListProducts = () => {
  const { dataGridProps } = useDataGrid<IProduct>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const {
    options: categories,
    query: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
    pagination: false,
  });

  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
      /* ... */
    ],
    [categories, isLoading],
  );

  return (
    // highlight-next-line
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
      {/* highlight-next-line */}
    </List>
  );
};
```

<ListInListProducts />

## Create View

The `<Create />` component is a wrapper component for create pages. It provides an header with i18n support and navigation to list view, a back button and breadcrumbs. It includes a `<SaveButton />` at the footer that you can pass `saveButtonProps` from the `useForm` hook to submit your forms. You can always provide more features and elements by passing customizing the component.

Update your `src/pages/products/create.tsx` file by adding the following lines:

```tsx title="src/pages/products/create.tsx"
import { useForm } from "@refinedev/react-hook-form";
// highlight-next-line
import { Create, useAutocomplete } from "@refinedev/mui";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";

export const CreateProduct = () => {
  const {
    register,
    control,
    saveButtonProps,
    formState: { errors },
  } = useForm();

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    // highlight-next-line
    <Create saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {/* ... */}
      </Box>
      {/* highlight-next-line */}
    </Create>
  );
};
```

<CreateInCreateProduct />

## Edit View

The `<Edit />` component is a wrapper component for edit pages. The design and the usage is similar to the `<Create />` component. Additionally, it includes the `<RefreshButton />` and `<DeleteButton />` at its header. You can always provide more features and elements by passing customizing the component.

Update your `src/pages/products/edit.tsx` file by adding the following lines:

```tsx title="src/pages/products/edit.tsx"
import { useForm } from "@refinedev/react-hook-form";
// highlight-next-line
import { Edit, useAutocomplete } from "@refinedev/mui";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";

export const EditProduct = () => {
  const {
    register,
    control,
    saveButtonProps,
    refineCore: { query },
    formState: { errors },
  } = useForm();

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: query?.product.category?.id,
  });

  return (
    // highlight-next-line
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
        autoComplete="off"
      >
        {/* ... */}
      </Box>
      {/* highlight-next-line */}
    </Edit>
  );
};
```

<EditInEditProduct />

:::tip

Notice that we've removed the `<SaveButton />` component from the `<EditProduct />` and used the `saveButtonProps` prop to provide the same functionality with the `<Edit />` component.

:::

## Show View

The `<Show />` component is a wrapper component for show pages. It provides a header with i18n support and navigation to the list view, edit the record, a refresh button, a delete button, a back button, and breadcrumbs. You can always provide more features and elements by passing customizing the component.

Update your `src/pages/products/show.tsx` file by adding the following lines:

```tsx title="src/pages/products/show.tsx"
import { useShow, useOne } from "@refinedev/core";
import {
  // highlight-next-line
  Show,
  TextFieldComponent as TextField,
  NumberField,
  MarkdownField,
} from "@refinedev/mui";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const ShowProduct = () => {
  const {
    result: product,
    query: { isLoading },
  } = useShow();

  const {
    data: category,
    query: { isLoading: categoryIsLoading },
  } = useOne({
    resource: "categories",
    id: product?.category.id || "",
    queryOptions: {
      enabled: !!product,
    },
  });

  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    // highlight-next-line
    <Show>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <TextField value={product.id} />

        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={product.name} />

        <Typography variant="body1" fontWeight="bold">
          Description
        </Typography>
        <MarkdownField value={product.description} />

        <Typography variant="body1" fontWeight="bold">
          Material
        </Typography>
        <TextField value={product.material} />

        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>
        <TextField
          value={categoryIsLoading ? "Loading..." : categoryproduct.title}
        />

        <Typography variant="body1" fontWeight="bold">
          Price
        </Typography>
        <NumberField value={product.price} />
      </Stack>
      {/* highlight-next-line */}
    </Show>
  );
};
```

<ShowInShowProduct />

Now our application has a consistent design with many features ready to use without writing a single line of code.

In the next step, we will learn how to handle notifications with Refine and integrate it with Material UI's notification elements and `notistack`.

</Sandpack>
