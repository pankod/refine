---
id: useEditableTable
title: useEditableTable
source: packages/antd/src/hooks/table/useTable
---

import LivePreview from "./\_partial-use-editable-table-live-preview.md";

`useEditeableTable` allows you to implement the edit feature on the [`<Table>`][table] with ease. Return properties that can be used on Ant Desing's [`<Table>`][table] and [`<Form>`][form] components.

:::info
`useEditeableTable` hook is extended from [`useTable`][usetable] hook from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/antd) package. This means that you can use all the features of [`useTable`][usetable] hook.
:::

## Basic Usage

Here is an example of how to use `useEditableTable` hook. We will explain in detail the usage of the hook in the following sections:

<LivePreview/>

### Editing with buttons

Let's say that we want to make the `Post` data where we show the `id` and `title` values a listing page:

This time, to add the edit feature, we have to cover the `<Table>` component with a `<Form>` component and pass the properties coming from `useEditableTable` to the corresponding components:

```tsx title="/pages/posts/list.tsx"
import {
  List,
  Table,
  useEditableTable,
  Form,
  TextField,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  // highlight-next-line
  const { tableProps, formProps } = useEditableTable<IPost>();

  return (
    <List>
      // highlight-start
      <Form {...formProps}>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Title" />
        </Table>
      </Form>
      // highlight-end
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
```

Now lets add a column for edit buttons:

```tsx title="/pages/posts/list.tsx"
import {
  List,
  Table,
  Form,
  // highlight-start
  Space,
  Button,
  SaveButton,
  EditButton,
  // highlight-end
  useEditableTable,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const {
    tableProps,
    formProps,
    isEditing,
    // highlight-start
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    // highlight-end
  } = useEditableTable<IPost>();

  return (
    <List>
      <Form {...formProps}>
        <Table {...tableProps} rowKey="id">
          <Table.Column key="id" dataIndex="id" title="ID" />
          <Table.Column key="title" dataIndex="title" title="Title" />
          <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            key="actions"
            // highlight-start
            render={(_text, record) => {
              if (isEditing(record.id)) {
                return (
                  <Space>
                    <SaveButton {...saveButtonProps} size="small" />
                    <Button {...cancelButtonProps} size="small">
                      Cancel
                    </Button>
                  </Space>
                );
              }
              return (
                <Space>
                  <EditButton {...editButtonProps(record.id)} size="small" />
                </Space>
              );
            }}
            // highlight-end
          />
        </Table>
      </Form>
    </List>
  );
};
```

:::tip
`isEditing` function that returns from `useEditableTable` lets us check whether a line is currently in edit mode or not.
:::

For now, our post is not editable yet. If a post is being edited, we must show editable columns inside a `<Form.Item>` using conditional rendering:

```tsx title="/pages/posts/list.tsx"
import {
  List,
  Table,
  Form,
  Space,
  Button,
  SaveButton,
  EditButton,
  // highlight-start
  Input,
  TextField,
  // highlight-end
  useEditableTable,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const {
    tableProps,
    formProps,
    isEditing,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<IPost>();

  return (
    <List>
      <Form {...formProps}>
        <Table {...tableProps} rowKey="id">
          <Table.Column key="id" dataIndex="id" title="ID" />
          <Table.Column<IPost>
            key="title"
            dataIndex="title"
            title="Title"
            // highlight-start
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="title" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
            // highlight-end
          />
          <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_text, record) => {
              if (isEditing(record.id)) {
                return (
                  <Space>
                    <SaveButton {...saveButtonProps} size="small" />
                    <Button {...cancelButtonProps} size="small">
                      Cancel
                    </Button>
                  </Space>
                );
              }
              return (
                <Space>
                  <EditButton {...editButtonProps(record.id)} size="small" />
                </Space>
              );
            }}
          />
        </Table>
      </Form>
    </List>
  );
};
```

With this, when a user clicks on the edit button, `isEditing(lineId)` will turn `true` for the relevant line. This will also cause `<TextInput>` to show up on the line that's being edited. When the editing is finished, a new value can be saved by clicking `<SaveButton>`.

:::tip
By giving the `<Table.Column>` component a unique `render` property, you can render the value in that column however you want.
Refer to [`<Table.Column>`][table.column] documentation for more information.
:::

### Editing by clicking to row

A line with the `id` value can be put to edit mode programmatically by using the `setId` function that returns from `useEditableTable`.

The `onRow` property of the `<Table>` component can be used to put a line to editing mode when it's clicked on. The function given to the `onRow` property is called every time one of these lines is clicked on, with the information of which line was clicked on.

We can use `setId` to put a line to edit mode whenever it's clicked on.

```tsx title="/pages/posts/list.tsx"
import {
  List,
  Table,
  Form,
  Input,
  TextField,
  useEditableTable,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  // highlight-start
  const { tableProps, formProps, isEditing, setId } = useEditableTable<IPost>();
  // highlight-end

  return (
    <List>
      <Form {...formProps}>
        <Table
          {...tableProps}
          key="id"
          // highlight-start
          onRow={(record) => ({
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setId && setId(record.id);
              }
            },
          })}
          // highlight-end
        >
          <Table.Column key="id" dataIndex="id" title="ID" />
          <Table.Column<IPost>
            key="title"
            dataIndex="title"
            title="Title"
            render={(value, data: any) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="title" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
          />
        </Table>
      </Form>
    </List>
  );
};
```

## Properties

:::tip

All `useForm` and [`useTable`][usetable] properties are available in `useEditableTable`. You can read the documentation of [`useForm`][useform] and [`useTable`][usetable] for more information.

:::

## Return Values

:::tip

All `useForm` and [`useTable`][usetable] return values are available in `useEditableTable`. You can read the documentation of [`useForm`][useform] and [`useTable`][usetable] for more information.

:::

### `cancelButtonProps`

Returns the props for needed by the `<EditButton>`.

By default, `onClick` function is overridden by `useEditableTable`. When is triggered it will call `useForm's` `setId` function with `undefined`.

```tsx
cancelButtonProps: () => ButtonProps;
```

### `editButtonProps`

Takes `id` as a parameter and returns the props needed by the `<EditButton>`.

By default, `onClick` function is overridden by `useEditableTable`. When is triggered it will call `useForm's` `setId` function with the given `id`.

```tsx
editButtonProps: (id: BaseKey) => ButtonProps;
```

Returns a function that takes an `id` as a parameter and returns the props for the edit button.

### `isEditing`

```tsx
isEditing: (id: BaseKey) => boolean;
```

Takes a `id` as a parameter and returns `true` if the given `BaseKey` is equal to the selected `useForm's` `id`.

## API

### Properties

<PropsTable module="@pankod/refine-antd/useEditableTable"/>

### Type Parameters

| Property         | Desription                                                   | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData            | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables       | Values for params                                            |                            | `{}`                       |
| TSearchVariables | Values for search params                                     |                            | `{}`                       |

### Return values

| Property          | Description                                             | Type                                                                                 |
| ----------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| searchFormProps   | Ant Design [`<Form>`][form] props                       | [`FormProps<TSearchVariables>`][form]                                                |
| tableProps        | Ant Design [`<Table>`][table] props                     | [`TableProps<TData>`][table]                                                         |
| tableQueryResult  | Result of the `react-query`'s `useQuery`                | [` QueryObserverResult<{`` data: TData[];`` total: number; },`` TError> `][usequery] |
| sorter            | Current sorting state                                   | [`CrudSorting`][crudsorting]                                                         |
| filters           | Current filters state                                   | [`CrudFilters`][crudfilters]                                                         |
| form              | Ant Design [`<Form>`][form] instance                    | [`FormInstance`][forminstance]                                                       |
| formProps         | Ant Design [`<Form>`][form] props                       | [`FormProps`][form]                                                                  |
| saveButtonProps   | Props for a submit button                               | `{ disabled: boolean; onClick: () => void; }`                                        |
| cancelButtonProps | Props for a cancel button                               | `{ onClick: () => void; }`                                                           |
| editButtonProps   | Props for an edit button                                | `{ onClick: () => void; }`                                                           |
| queryResult       | Result of the query of a record                         | [`QueryObserverResult<T>`][usequery]                                                 |
| mutationResult    | Result of the mutation triggered by submitting the form | [`UseMutationResult<T>`][usemutation]                                                |
| formLoading       | Loading state of form request                           | `boolean`                                                                            |
| id                | Record id for edit action                               | [`BaseKey`][basekey]                                                                 |
| setId             | `id` setter                                             | `Dispatch<SetStateAction<` [`BaseKey`][basekey] \| `undefined>>`                     |
| isEditing         | Check if is editing                                     | `(id: `[`BaseKey`][basekey]`) => boolean`                                            |

## Example

<CodeSandboxExample path="table-antd-use-editable-table" />

[table]: https://ant.design/components/table/#API
[form]: https://ant.design/components/form/#API
[useform]: /core/docs/3.xx.xx/api-reference/antd/hooks/table/useTable/
[usetable]: /core/docs/3.xx.xx/api-reference/antd/hooks/table/useTable
[usequery]: https://react-query.tanstack.com/reference/useQuery
[usemutation]: https://tanstack.com/query/v4/docs/framework/react/reference/useMutation
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[basekey]: /core/docs/3.xx.xx/api-reference/core/interfaces#basekey
[crudsorting]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudsorting
[crudfilters]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudfilters
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[table search]: /advanced-tutorials/search/table-search.md
[table.column]: https://ant.design/components/table/#Column
[forminstance]: https://ant.design/components/form/#FormInstance
