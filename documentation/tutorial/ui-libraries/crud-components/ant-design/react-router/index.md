---
title: CRUD Components
---

import { Sandpack, ListInListProducts, EditInEditProduct, CreateInCreateProduct, ShowInShowProduct } from "./sandpack.tsx";

<Sandpack>

After refactoring the components, it's time to learn about the CRUD view components provided by Refine's Ant Design integration. These components are implemented to provide consistent design with Ant Design with additional features such as headers with i18n support, breadcrumbs, navigation buttons, submission buttons, and more.

These components are not required to use Refine, but they are useful for building a consistent user interface without worrying about the common features you need across your application.

## List View

The `<List />` component is a wrapper component for list pages which provides an header with i18n support and navigation to create a new record. You can always provide more features and elements by passing customizing the component.

:::note

Remember that when we've removed the `<Header />` component, we've also removed the navigation link for the `/products/create` route. `<List />` will automatically add a button for this purpose without needing any additional code.

:::

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  // highlight-next-line
  List,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";

export const ListProducts = () => {
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    filters: {
      initial: [
        { field: "name", operator: "contains", value: "" },
        { field: "category.id", operator: "in", value: [1, 2] },
      ],
    },
    syncWithLocation: true,
  });

  const {
    result: categories,
    query: { isLoading },
  } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    // highlight-next-line
    <List>
      <Table {...tableProps} rowKey="id">
        {/* ... */}
      </Table>
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
// highlight-next-line
import { useForm, useSelect, Create } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
  const { formProps, saveButtonProps } = useForm({
    refineCoreProps: {
      redirect: "edit",
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    // highlight-next-line
    <Create saveButtonProps={saveButtonProps}>
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
      </Form>
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
// highlight-next-line
import { useForm, useSelect, Edit } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const EditProduct = () => {
  const { formProps, saveButtonProps, query } = useForm({
    refineCoreProps: {
      redirect: "show",
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: query?.result?.category?.id,
  });

  return (
    // highlight-next-line
    <Edit saveButtonProps={saveButtonProps}>
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
      </Form>
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

The `<Show />` component is a wrapper component for show pages.It provides a header with i18n support and navigation to the list view, edit the record, a refresh button, a delete button, a back button, and breadcrumbs. You can always provide more features and elements by passing customizing the component.

Update your `src/pages/products/show.tsx` file by adding the following lines:

```tsx title="src/pages/products/show.tsx"
import { useShow, useOne } from "@refinedev/core";
// highlight-next-line
import { TextField, NumberField, MarkdownField, Show } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowProduct = () => {
    const { result: product, query: { isLoading } } = useShow();

    const { data: category, query: { isLoading: categoryIsLoading } } =
    useOne({
        resource: "categories",
        id: product?.category.id || "",
        queryOptions: {
            enabled: !!product,
        },
    });

    return (
        {/* highlight-next-line */}
      <Show isLoading={isLoading}>
        <Typography.Title level={5}>Id</Typography.Title>
        <TextField value={product?.id} />

        <Typography.Title level={5}>Name</Typography.Title>
        <TextField value={product?.name} />

        <Typography.Title level={5}>Description</Typography.Title>
        <MarkdownField value={product?.description} />

        <Typography.Title level={5}>Material</Typography.Title>
        <TextField value={product?.material} />

        <Typography.Title level={5}>Category</Typography.Title>
        <TextField
          value={categoryIsLoading ? "Loading..." : categoryresult?.title}
        />

        <Typography.Title level={5}>Price</Typography.Title>
        <NumberField value={product?.price} />
        {/* highlight-next-line */}
      </Show>
    );
};
```

<ShowInShowProduct />

Now our application has a consistent design with many features ready to use without writing a single line of code.

In the next step, we will learn how to handle notifications with Refine and integrate it with Ant Design's notification system.

</Sandpack>
