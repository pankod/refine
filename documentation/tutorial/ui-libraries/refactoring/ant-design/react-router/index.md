---
title: Refactoring
---

import { Sandpack, RefactorTableInListProducts, AddSortersInListProducts, AddFiltersInListProducts, RefactorFieldsInShowProduct, RefactorFormInEditProduct, RefactorFormInCreateProduct } from "./sandpack.tsx";

<Sandpack>

Now we're ready to refactor our app to use the `@refinedev/antd`'s `useForm` and `useTable` hooks. These hooks will allow us to create forms and tables with ease by providing an interface that is compatible with Ant Design's `<Form />` and `<Table />` components.

We'll also be using the field components provided by `@refinedev/antd` to create product details screen. These components are tailored to work with Ant Design's design system and provide an easy way to display various types of data.

## Using `<Table />` and `useTable`

We'll start by refactoring our `<ListProducts />` component to use the `useTable` hook from `@refinedev/antd` and the `<Table />` component from Ant Design. This will allow us to create a table to display our products with minimal effort.

`useTable` will give us the same functionality as the core version but will also return the `tableProps` that we can use to pass to the `<Table />` component with ease.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useMany } from "@refinedev/core";
// highlight-next-line
import { useTable, EditButton, ShowButton } from "@refinedev/antd";

// highlight-next-line
import { Table, Space } from "antd";

export const ListProducts = () => {
  // highlight-start
  // We'll use pass `tableProps` to the `<Table />` component,
  // This will manage the data, pagination, filters and sorters for us.
  const { tableProps } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });
  // highlight-end

  const {
    result: categories,
    query: { isLoading },
  } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  return (
    <div>
      <h1>Products</h1>
      {/* highlight-start */}
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      {/* highlight-end */}
    </div>
  );
};
```

<RefactorTableInListProducts />

Notice that we've get rid of every logic related to managing the data, pagination, filters and sorters because these will be managed by the `tableProps` value. We've also used the `EditButton` and `ShowButton` components to manage navigation easily.

Button components provided by Refine uses the styling from Ant Design and provides many features from built-in access control to i18n and more.

List of available button components:

- [`<CreateButton />`](/core/docs/ui-integrations/ant-design/components/buttons/create-button), renders a button to navigate to the create route.
- [`<EditButton />`](/core/docs/ui-integrations/ant-design/components/buttons/edit-button), renders a button to navigate to the edit route.
- [`<ListButton />`](/core/docs/ui-integrations/ant-design/components/buttons/list-button), renders a button to navigate to the list route.
- [`<ShowButton />`](/core/docs/ui-integrations/ant-design/components/buttons/show-button), renders a button to navigate to the show route.
- [`<CloneButton />`](/core/docs/ui-integrations/ant-design/components/buttons/clone-button), renders a button to navigate to the clone route.
- [`<DeleteButton />`](/core/docs/ui-integrations/ant-design/components/buttons/delete-button), renders a button to delete a record.
- [`<SaveButton />`](/core/docs/ui-integrations/ant-design/components/buttons/save-button), renders a button to trigger the form submission.
- [`<RefreshButton />`](/core/docs/ui-integrations/ant-design/components/buttons/refresh-button), renders a button to refresh/refetch the data.
- [`<ImportButton />`](/core/docs/ui-integrations/ant-design/components/buttons/import-button), renders a button to trigger import bulk data with CSV/Excel files.
- [`<ExportButton />`](/core/docs/ui-integrations/ant-design/components/buttons/export-button), renders a button to trigger export bulk data with CSV format.

### Adding Sorters

Let's integrate the Refine's sorters with the Ant Design's `<Table />` component. While `tableProps` will be transforming the sorters to the Ant Design's format, all we need to do is to enable the sorters for the columns we want and pass the default sorting orders.

We'll add sorting to the `ID` and the `Name` columns.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useMany } from "@refinedev/core";
// highlight-next-line
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
} from "@refinedev/antd";

import { Table, Space } from "antd";

export const ListProducts = () => {
  // highlight-next-line
  const { tableProps, sorters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const {
    result: categories,
    query: { isLoading },
  } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  return (
    <div>
      <h1>Products</h1>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          // highlight-start
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
          // highlight-end
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          // highlight-start
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          // highlight-end
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
```

<AddSortersInListProducts />

Now we've enabled sorters with no additional logic. The `getDefaultSortOrder` function will handle the default sorting orders for us.

### Adding Filters

Let's integrate the Refine's filters with the Ant Design's `<Table />` component. While `tableProps` will be transforming the filters to the Ant Design's format, all we need to do is to provide the elements for the filter dropdowns. We'll use the [`<FilterDropdown />`](/core/docs/ui-integrations/ant-design/components/filter-dropdown) to bind the inputs to the filters.

We'll be using the `<Input />` component to create a text filter for the `Name` column and the `<Select />` component with `useSelect` to create a select filter for the `Category` column.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
// highlight-next-line
import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  // highlight-start
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  // highlight-end
} from "@refinedev/antd";

// highlight-next-line
import { Table, Space, Input, Select } from "antd";

export const ListProducts = () => {
  // highlight-next-line
  const { result, tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    // highlight-start
    // We're adding default values for our filters
    filters: {
      initial: [{ field: "category.id", operator: "eq", value: 2 }],
    },
    // highlight-end
    syncWithLocation: true,
  });

  const {
    result: categories,
    query: { isLoading },
  } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });

  // highlight-start
  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters, "eq"),
  });
  // highlight-end

  return (
    <div>
      <h1>Products</h1>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          // highlight-start
          // FilterDropdown will map the value to the filter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
          // highlight-end
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
          // highlight-start
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              // We'll store the selected id as number
              mapValue={(selectedKey) => Number(selectedKey)}
            >
              <Select style={{ minWidth: 200 }} {...selectProps} />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "eq")}
          // highlight-end
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
```

<AddFiltersInListProducts />

Now we've added both the filters and sorters to our table without writing any additional logic.

:::note Implementation Details

Remember that we've only implemented the `eq` filter in our data provider. Even though `category.id` field is best to be filtered with `in` operator and `name` field is best to be filtered with `contains` operators. We're keeping it simple for the sake of this tutorial.

:::

## Using `useForm` and `<Form />`

Next, we'll refactor our `<EditProduct />` and `<CreateProduct />` components to use the `useForm` hook from `@refinedev/antd` and the `<Form />` component from Ant Design. This will allow us to create forms with minimal effort.

`useForm` will give us the same functionality as the core version but will also return the `formProps` that we can use to pass to the `<Form />` component with ease.

Update your `src/pages/products/edit.tsx` file by adding the following lines:

```tsx title="src/pages/products/edit.tsx"
// highlight-next-line
import { useForm, useSelect, SaveButton } from "@refinedev/antd";

// highlight-next-line
import { Form, Input, Select, InputNumber } from "antd";

export const EditProduct = () => {
  // highlight-start
  const { formProps, saveButtonProps, query } = useForm({
    redirect: "show",
  });
  // highlight-end

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: query?.product.category?.id,
  });

  return (
    // highlight-start
    <Form {...formProps} layout="vertical">
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Material" name="material">
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={["category", "id"]}>
        <Select {...selectProps} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber step="0.01" stringMode />
      </Form.Item>
      {/* SaveButton renders a submit button to submit our form */}
      <SaveButton {...saveButtonProps} />
    </Form>
    // highlight-end
  );
};
```

<RefactorFormInEditProduct />

Notice that we've also used the `useSelect` hook with `<Select />` component to create a select input for the `category` field. `useSelect` is fully compatible with Ant Design's `<Select />` component and provides an easy way to create select inputs with minimal effort.

Now let's do the same for the `CreateProduct` component. These components will use mostly the same logic except the edit action will provide default values for the fields.

Update your `src/pages/products/create.tsx` file by adding the following lines:

```tsx title="src/pages/products/create.tsx"
// highlight-next-line
import { useForm, useSelect, SaveButton } from "@refinedev/antd";

// highlight-next-line
import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
  // highlight-start
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });
  // highlight-end

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    // highlight-start
    <Form {...formProps} layout="vertical">
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Material" name="material">
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={["category", "id"]}>
        <Select {...selectProps} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber step="0.01" stringMode />
      </Form.Item>
      <SaveButton {...saveButtonProps} />
    </Form>
    // highlight-end
  );
};
```

<RefactorFormInCreateProduct />

## Refactoring `<ShowProduct />`

Now that we've refactored our list, edit and create components, let's refactor our `<ShowProduct />` component to use the field components from `@refinedev/antd` to represent every field with proper styling and formatting.

List of available field components:

- [`<BooleanField />`](/core/docs/ui-integrations/ant-design/components/fields/boolean-field), displays a checkbox element for boolean values.
- [`<DateField />`](/core/docs/ui-integrations/ant-design/components/fields/date-field), displays a date with customizable formatting.
- [`<EmailField />`](/core/docs/ui-integrations/ant-design/components/fields/email-field), displays an email with a mailto anchor.
- [`<FileField />`](/core/docs/ui-integrations/ant-design/components/fields/file-field), displays a download anchor for file.
- [`<ImageField />`](/core/docs/ui-integrations/ant-design/components/fields/image-field), displays an image with Ant Design's `<Image />` component.
- [`<MarkdownField />`](/core/docs/ui-integrations/ant-design/components/fields/markdown-field), displays a GitHub flavored markdown with `react-makrdown` library.
- [`<NumberField />`](/core/docs/ui-integrations/ant-design/components/fields/number-field), displays a number with localized and customizable formatting.
- [`<TagField />`](/core/docs/ui-integrations/ant-design/components/fields/tag-field), displays the value with Ant Design's `<Tag />` component.
- [`<TextField />`](/core/docs/ui-integrations/ant-design/components/fields/text-field), displays the value with Ant Design's `<Typography.Text />` component.
- [`<UrlField />`](/core/docs/ui-integrations/ant-design/components/fields/url-field), displays the value with a link anchor.

We'll be using the `<TextField />`, `<NumberField />` and `<MarkdownField />` components to represent the fields of the products properly.

Update your `src/pages/products/show.tsx` file by adding the following lines:

```tsx title="src/pages/products/show.tsx"
import { useShow, useOne } from "@refinedev/core";
// highlight-next-line
import { TextField, NumberField, MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";

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
    <div>
      {/* highlight-start */}
      <Typography.Title level={5}>Id</Typography.Title>
      <TextField value={product.id} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Name</Typography.Title>
      <TextField value={product.name} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Description</Typography.Title>
      <MarkdownField value={product.description} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Material</Typography.Title>
      <TextField value={product.material} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Category</Typography.Title>
      <TextField
        value={categoryIsLoading ? "Loading..." : categoryproduct.title}
      />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Price</Typography.Title>
      <NumberField value={product.price} />
      {/* highlight-end */}
    </div>
  );
};
```

<RefactorFieldsInShowProduct />

Now we've updated all our routes to use extended versions of Refine's core hooks and helper components.

In the next step, we'll be learning about the CRUD views provided by `@refinedev/antd`, what they are and why they are useful.

</Sandpack>
