---
title: Refactoring
---

import { Sandpack, RefactorTableInListProducts, AddFiltersInListProducts, RefactorFieldsInShowProduct, RefactorFormInEditProduct, RefactorFormInCreateProduct } from "./sandpack.tsx";

<Sandpack>

Now we're ready to refactor our app to use the `@refinedev/mui`'s `useTable` hook and `@refinedev/react-hook-form`'s `useForm` hook. These hooks will allow us to create forms and tables with ease by providing an interface that is compatible with Material UI's `<Autocomplete />` and `<DataGrid />` components.

We'll also be using the field components provided by `@refinedev/mui` to create product details screen. These components are tailored to work with Material UI's design system and provide an easy way to display various types of data.

## Using `<DataGrid />` and `useDataGrid`

We'll start by refactoring our `<ListProducts />` component to use the `useDataGrid` hook from `@refinedev/mui` and the `<DataGrid />` component from Material UI. This will allow us to create a table to display our products with minimal effort.

`useDataGrid` will give us the same functionality as the core's `useTable` but will also return the `dataGridProps` that we can use to pass to the `<DataGrid />` component with ease.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import React from "react";
import { useMany } from "@refinedev/core";
// highlight-next-line
import { useDataGrid, EditButton, ShowButton } from "@refinedev/mui";

// highlight-next-line
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ListProducts = () => {
  // highlight-start
  const { dataGridProps } = useDataGrid<IProduct>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });
  // highlight-end

  const {
    result: categories,
    query: { isLoading },
  } = useMany<ICategory>({
    resource: "categories",
    // highlight-next-line
    ids: dataGridProps?.rows?.map((product) => product.category?.id) ?? [],
  });

  // highlight-start
  // We're defining the columns for our table according to the `<DataGrid />` component's `columns` prop.
  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
      },
      {
        field: "category.id",
        headerName: "Category",
        minWidth: 250,
        flex: 0.5,
        display: "flex",
        renderCell: function render({ row }) {
          if (isLoading) return "Loading...";

          return categories?.data?.find(
            (category) => category.id == row.category.id,
          )?.title;
        },
      },
      {
        field: "material",
        headerName: "Material",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <div>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </div>
          );
        },
      },
    ],
    [categories, isLoading],
  );
  // highlight-end

  return (
    <div>
      <h1>Products</h1>
      {/* highlight-next-line */}
      <DataGrid {...dataGridProps} columns={columns} />
    </div>
  );
};

interface IProduct {
  id: number;
  name: string;
  material: string;
  price: string;
  category: ICategory;
}

interface ICategory {
  id: number;
  title: string;
}
```

<RefactorTableInListProducts />

Notice that we've get rid of every logic related to managing the data, pagination, filters and sorters because these will be managed by the `tableProps` value. We've also used the `EditButton` and `ShowButton` components to manage navigation easily.

Button components provided by Refine uses the styling from Ant Design and provides many features from built-in access control to i18n and more.

List of available button components:

- [`<CreateButton />`](/core/docs/ui-integrations/material-ui/components/buttons/create-button), renders a button to navigate to the create route.
- [`<EditButton />`](/core/docs/ui-integrations/material-ui/components/buttons/edit-button), renders a button to navigate to the edit route.
- [`<ListButton />`](/core/docs/ui-integrations/material-ui/components/buttons/list-button), renders a button to navigate to the list route.
- [`<ShowButton />`](/core/docs/ui-integrations/material-ui/components/buttons/show-button), renders a button to navigate to the show route.
- [`<CloneButton />`](/core/docs/ui-integrations/material-ui/components/buttons/clone-button), renders a button to navigate to the clone route.
- [`<DeleteButton />`](/core/docs/ui-integrations/material-ui/components/buttons/delete-button), renders a button to delete a record.
- [`<SaveButton />`](/core/docs/ui-integrations/material-ui/components/buttons/save-button), renders a button to trigger the form submission.
- [`<RefreshButton />`](/core/docs/ui-integrations/material-ui/components/buttons/refresh-button), renders a button to refresh/refetch the data.
- [`<ImportButton />`](/core/docs/ui-integrations/material-ui/components/buttons/import-button), renders a button to trigger import bulk data with CSV/Excel files.
- [`<ExportButton />`](/core/docs/ui-integrations/material-ui/components/buttons/export-button), renders a button to trigger export bulk data with CSV format.

### Adding Custom Filters

Material UI's `<DataGrid />` and Refine's `useDataGrid` hook automatically enables sorters and filters for our resource. Except for the `category.id` field we've defined. It still works if we provide the `id` value in filters but let's update our code to provide a single select dropdown for the `Category` column as filter.

To avoid duplicate requests for the same purpose, we'll switch to `useSelect` hook instead of `useMany` hook to fetch the categories. Then, we'll provide the options to the `category.id` field and tell `<DataGrid />` to use a dropdown as the filtering component.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import React from "react";
// highlight-next-line
import { useSelect } from "@refinedev/core";
import { useDataGrid, EditButton, ShowButton } from "@refinedev/mui";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ListProducts = () => {
  const { dataGridProps } = useDataGrid<IProduct>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  // highlight-start
  const {
    options: categories,
    query: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
  });
  // highlight-end

  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
      },
      {
        field: "category.id",
        headerName: "Category",
        minWidth: 250,
        flex: 0.5,
        // highlight-start
        // We're defining the column type as `singleSelect` and providing the options to the `valueOptions` prop.
        type: "singleSelect",
        valueOptions: categories,
        display: "flex",
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          return categories?.find(
            (category) => category.value == row.category.id,
          )?.label;
        },
        // highlight-end
      },
      {
        field: "material",
        headerName: "Material",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <div>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </div>
          );
        },
      },
    ],
    [categories, isLoading],
  );

  return (
    <div>
      <h1>Products</h1>
      <DataGrid {...dataGridProps} columns={columns} />
    </div>
  );
};

interface IProduct {
  id: number;
  name: string;
  material: string;
  price: string;
  category: ICategory;
}

interface ICategory {
  id: number;
  title: string;
}
```

<AddFiltersInListProducts />

Now we've added support for both the filters and sorters to our table with minimal effort.

## Using `useForm` and React Hook Form

Next, we'll refactor our `<EditProduct />` and `<CreateProduct />` components with Material UI elements and the `useForm` hook from `@refinedev/react-hook-form`. This will allow us to create forms with minimal effort.

Since Material UI doesn't provide a solution for managing the form state, we'll be using `@refinedev/react-hook-form` along with the `react-hook-form` to manage the form state and render our form with Material UI components.

Let's start with installing the required packages:

<InstallPackagesCommand args="@refinedev/react-hook-form react-hook-form"/>

:::note Implementation Details

`@refinedev/react-hook-form` also exports an `useForm` hook which is an extension of `useForm` from `@refinedev/core`. Additionally it provides a state management solution for the forms.

:::

Update your `src/pages/products/edit.tsx` file by adding the following lines:

```tsx title="src/pages/products/edit.tsx"
// highlight-start
import { useForm } from "@refinedev/react-hook-form";
import { useAutocomplete, SaveButton } from "@refinedev/mui";
// highlight-end

// highlight-start
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";
// highlight-end

export const EditProduct = () => {
  // highlight-start
  const {
    register,
    control,
    saveButtonProps,
    refineCore: { query },
    formState: { errors },
  } = useForm();
  // highlight-end

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: query?.product.category?.id,
  });

  return (
    // highlight-start
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("description")}
        multiline
        label="Description"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        {...register("material")}
        label="Material"
        error={!!errors.material}
        helperText={errors.material?.message}
      />
      {/* We're using Controller to wrap the Autocomplete component and pass the control from useForm */}
      <Controller
        control={control}
        name="category"
        defaultValue={null}
        render={({ field }) => (
          <Autocomplete
            id="category"
            {...autocompleteProps}
            {...field}
            onChange={(_, value) => field.onChange(value)}
            getOptionLabel={(item) => {
              return (
                autocompleteProps?.options?.find(
                  (option) => option?.id == item?.id,
                )?.title ?? ""
              );
            }}
            isOptionEqualToValue={(option, value) => {
              return value === undefined || option?.id == (value?.id ?? value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="outlined"
                margin="normal"
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            )}
          />
        )}
      />

      <TextField
        {...register("price")}
        label="Price"
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      {/* SaveButton renders a submit button to submit our form */}
      <SaveButton {...saveButtonProps} />
    </Box>
    // highlight-end
  );
};
```

<RefactorFormInEditProduct />

Notice that we've also used the `useAutocomplete` hook with `<Autocomplete />` component to create an autocomplete input for the `category` field. `useAutocomplete` is fully compatible with Material UI's `<Autocomplete />` component and provides an easy way to create select inputs with minimal effort.

Now let's do the same for the `CreateProduct` component. These components will use mostly the same logic except the edit action will provide default values for the fields.

Update your `src/pages/products/create.tsx` file by adding the following lines:

```tsx title="src/pages/products/create.tsx"
// highlight-start
import { useForm } from "@refinedev/react-hook-form";
import { useAutocomplete, SaveButton } from "@refinedev/mui";
// highlight-end

// highlight-start
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";
// highlight-end

export const CreateProduct = () => {
  // highlight-start
  const {
    register,
    control,
    saveButtonProps,
    formState: { errors },
  } = useForm();
  // highlight-end

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    // highlight-start
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("description")}
        multiline
        label="Description"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        {...register("material")}
        label="Material"
        error={!!errors.material}
        helperText={errors.material?.message}
      />
      {/* We're using Controller to wrap the Autocomplete component and pass the control from useForm */}
      <Controller
        control={control}
        name="category"
        defaultValue={null}
        render={({ field }) => (
          <Autocomplete
            id="category"
            {...autocompleteProps}
            {...field}
            onChange={(_, value) => field.onChange(value)}
            getOptionLabel={(item) => {
              return (
                autocompleteProps?.options?.find(
                  (option) => option?.id == item?.id,
                )?.title ?? ""
              );
            }}
            isOptionEqualToValue={(option, value) => {
              return value === undefined || option?.id == (value?.id ?? value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="outlined"
                margin="normal"
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            )}
          />
        )}
      />

      <TextField
        {...register("price")}
        label="Price"
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      {/* SaveButton renders a submit button to submit our form */}
      <SaveButton {...saveButtonProps} />
    </Box>
    // highlight-end
  );
};
```

<RefactorFormInCreateProduct />

## Refactoring `<ShowProduct />`

Now that we've refactored our list, edit and create components, let's refactor our `<ShowProduct />` component to use the field components from `@refinedev/mui` to represent every field with proper styling and formatting.

List of available field components:

- [`<BooleanField />`](/core/docs/ui-integrations/material-ui/components/fields/boolean-field), displays a checkbox element for boolean values.
- [`<DateField />`](/core/docs/ui-integrations/material-ui/components/fields/date-field), displays a date with customizable formatting.
- [`<EmailField />`](/core/docs/ui-integrations/material-ui/components/fields/email-field), displays an email with a mailto anchor.
- [`<FileField />`](/core/docs/ui-integrations/material-ui/components/fields/file-field), displays a download anchor for file.
- [`<MarkdownField />`](/core/docs/ui-integrations/material-ui/components/fields/markdown-field), displays a GitHub flavored markdown with `react-makrdown` library.
- [`<NumberField />`](/core/docs/ui-integrations/material-ui/components/fields/number-field), displays a number with localized and customizable formatting.
- [`<TagField />`](/core/docs/ui-integrations/material-ui/components/fields/tag-field), displays the value with Material UI's `<Chip />` component.
- [`<TextField />`](/core/docs/ui-integrations/material-ui/components/fields/text-field), displays the value with Material UI's `<Typography />` component.
- [`<UrlField />`](/core/docs/ui-integrations/material-ui/components/fields/url-field), displays the value with a link anchor.

We'll be using the `<TextField />`, `<NumberField />` and `<MarkdownField />` components to represent the fields of the products properly.

Update your `src/pages/products/show.tsx` file by adding the following lines:

```tsx title="src/pages/products/show.tsx"
import { useShow, useOne } from "@refinedev/core";
// highlight-next-line
import {
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
    <Stack gap={1}>
      {/* highlight-start */}
      <Typography variant="body1" fontWeight="bold">
        Id
      </Typography>
      <TextField value={product.id} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography variant="body1" fontWeight="bold">
        Name
      </Typography>
      <TextField value={product.name} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography variant="body1" fontWeight="bold">
        Description
      </Typography>
      <MarkdownField value={product.description} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography variant="body1" fontWeight="bold">
        Material
      </Typography>
      <TextField value={product.material} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography variant="body1" fontWeight="bold">
        Category
      </Typography>
      <TextField
        value={categoryIsLoading ? "Loading..." : categoryproduct.title}
      />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography variant="body1" fontWeight="bold">
        Price
      </Typography>
      <NumberField value={product.price} />
      {/* highlight-end */}
    </Stack>
  );
};
```

<RefactorFieldsInShowProduct />

Now we've updated all our routes to use extended versions of Refine's core hooks and helper components.

In the next step, we'll be learning about the CRUD views provided by `@refinedev/mui`, what they are and why they are useful.

</Sandpack>
