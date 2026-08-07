---
id: useDrawerForm
title: useDrawerForm
---

`useDrawerForm` hook allows you to manage a form within a Drawer. It returns Ant Design [`<Form>`](https://ant.design/components/form/) and [`<Drawer>`](https://ant.design/components/drawer/) components props.

:::info
`useDrawerForm` hook is extended from [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) from the [@pankod/refine-antd](https://github.com/refinedev/refine/tree/v3/packages/antd) package. This means that you can use all the features of [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) hook.
:::

## Basic Usage

We'll show two examples, one for creating and one for editing a post. Let's see how `useDrawerForm` is used in both.

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
]}>

<TabItem value="create">

In this example, we will show you how to `"create"` a record with `useDrawerForm`.

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import React, { useState } from "react";
import {
  useShow,
  IResourceComponentsProps,
  HttpError,
} from "@pankod/refine-core";

import {
  List,
  Create,
  Table,
  Form,
  Select,
  Input,
  Drawer,
  useTable,
  useDrawerForm,
} from "@pankod/refine-antd";

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}

const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IPost, HttpError>();

  // highlight-start
  const { formProps, drawerProps, show, saveButtonProps } = useDrawerForm<
    IPost,
    HttpError,
    IPost
  >({
    action: "create",
  });
  // highlight-end

  return (
    <>
      <List
        canCreate
        // highlight-start
        createButtonProps={{
          onClick: () => {
            show();
          },
        }}
        // highlight-end
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Title" />
        </Table>
      </List>
      {/* highlight-start */}
      <Drawer {...drawerProps}>
        <Create saveButtonProps={saveButtonProps}>
          <Form {...formProps} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={[
                  {
                    label: "Published",
                    value: "published",
                  },
                  {
                    label: "Draft",
                    value: "draft",
                  },
                  {
                    label: "Rejected",
                    value: "rejected",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Create>
      </Drawer>
      {/* highlight-end */}
    </>
  );
};

// visible-block-end
setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
    },
  ],
});

render(<RefineAntdDemo />);
```

</TabItem>

<TabItem value="edit">

In this example, we will show you how to `"edit"` a record with `useDrawerForm`.

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import React, { useState } from "react";
import {
  useShow,
  IResourceComponentsProps,
  HttpError,
} from "@pankod/refine-core";

import {
  List,
  Edit,
  EditButton,
  Table,
  Form,
  Select,
  Input,
  Drawer,
  useTable,
  useDrawerForm,
  Space,
} from "@pankod/refine-antd";

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}

const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IPost, HttpError>();

  // highlight-start
  const { formProps, drawerProps, show, saveButtonProps, id } = useDrawerForm<
    IPost,
    HttpError,
    IPost
  >({
    action: "edit",
    warnWhenUnsavedChanges: true,
  });
  // highlight-end

  return (
    <>
      <List
        canCreate
        // highlight-start
        createButtonProps={{
          onClick: () => {
            show();
          },
        }}
        // highlight-end
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Title" />
          <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              // highlight-start
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => show(record.id)}
                />
              </Space>
              // highlight-end
            )}
          />
        </Table>
      </List>
      {/* highlight-start */}
      <Drawer {...drawerProps}>
        <Edit saveButtonProps={saveButtonProps} recordItemId={id}>
          <Form {...formProps} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={[
                  {
                    label: "Published",
                    value: "published",
                  },
                  {
                    label: "Draft",
                    value: "draft",
                  },
                  {
                    label: "Rejected",
                    value: "rejected",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Edit>
      </Drawer>
      {/* highlight-end */}
    </>
  );
};

// visible-block-end
setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
    },
  ],
});

render(<RefineAntdDemo />);
```

:::caution
**refine** doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens edit form in `<Drawer>` when clicked.

So, we have to put the `<EditButton/>` on our list. In that way, `<Edit>` form in `<Drawer>` can fetch data by the record `id`.

```tsx
<Table.Column<IPost>
  title="Actions"
  dataIndex="actions"
  key="actions"
  render={(_value, record) => <EditButton onClick={() => show(record.id)} />}
/>
```

:::

:::caution
Don't forget to pass the record `"id"` to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.
:::

</TabItem>

</Tabs>

## Properties

:::tip
All [`useForm`][antd-use-form] props also available in `useDrawerForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#properties) docs.
:::

## Return values

### `show`

A function that opens the `<Drawer>`. It takes an optional `id` parameter. If `id` is provided, it will fetch the record data and fill the `<Form>` with it.

### `close`

A function that closes the `<Drawer>`. Same as `[onClose][#onClose]`.

### `saveButtonProps`

It contains the props needed by the `"submit"` button within the `<Drawer>` (disabled,loading etc.). When `saveButtonProps.onClick` is called, it triggers `form.submit()`. You can manually pass these props to your custom button.

### `deleteButtonProps`

It contains the props needed by the `"delete"` button within the `<Drawer>` (disabled,loading etc.). When `deleteButtonProps.onSuccess` is called, it triggers it sets `id` to `undefined` and `open` to `false`. You can manually pass these props to your custom button.

### `formProps`

It's required to manage `<Form>` state and actions. Under the hood the `formProps` came from [`useForm`][antd-use-form].

It contains the props to manage the [Antd `<Form>`](https://ant.design/components/form#api) component such as [_`onValuesChange`, `initialValues`, `onFieldsChange`, `onFinish` etc._](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#return-values)

### `drawerProps`

It's required to manage [`<Drawer>`](https://ant.design/components/drawer/#API) state and actions.

#### `width`

> Default: `"500px"`

It's the width of the `<Drawer>`.

#### `onClose`

A function that can close the `<Drawer>`. It's useful when you want to close the `<Drawer>` manually.
When [`warnWhenUnsavedChanges`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#warnwhenunsavedchanges) is `true`, it will show a confirmation modal before closing the `<Drawer>`. If you override this function, you have to handle this confirmation modal manually.

#### `open`

> Default: `false`

Current visible state of `<Drawer>`.

#### `forceRender`

> Default: `true`

It renders `<Drawer>` instead of lazy rendering it.

## API Parameters

### Properties

<PropsTable module="@pankod/refine-antd/useDrawerForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/core/docs/3.xx.xx/api-reference/core/components/refine-config)>** component. `useDrawerForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). Otherwise if `action` is `edit`, `redirect`s default value is `list`.

### Return Value

| Key               | Description                                                  | Type                                                                                        |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| show              | A function that opens the drawer                             | `(id?: BaseKey) => void`                                                                    |
| form              | Ant Design form instance                                     | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)              |
| formProps         | Ant Design form props                                        | [`FormProps`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#properties)         |
| drawerProps       | Props for managed drawer                                     | [`DrawerProps`](#drawerprops)                                                               |
| saveButtonProps   | Props for a submit button                                    | `{ disabled: boolean; onClick: () => void; loading: boolean; }`                             |
| deleteButtonProps | Adds props for delete button                                 | [`DeleteButtonProps`](/core/docs/3.xx.xx/api-reference/core/interfaces#delete-button-props) |
| submit            | Submit method, the parameter is the value of the form fields | `() => void`                                                                                |
| open              | Whether the drawer is open or not                            | `boolean`                                                                                   |
| close             | Specify a function that can close the drawer                 | `() => void`                                                                                |

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]        | [`HttpError`][httperror]   |
| TVariables | Values for params.                                               | `{}`                       |

## Example

<CodeSandboxExample path="form-antd-use-drawer-form" />

[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[antd-use-form]: /core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm
