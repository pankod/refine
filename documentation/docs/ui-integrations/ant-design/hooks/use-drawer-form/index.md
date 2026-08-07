---
title: "useDrawerForm Hook | Best Practices for Usage & Patterns | Refine v5"
display_title: "useDrawerForm"
sidebar_label: "useDrawerForm"
description: "Integrate Use Drawer Form in Refine v5. Learn best practices. Learn integration patterns for value and data for polished admin UIs."
---

The `useDrawerForm` hook allows you to manage a form within a Drawer. It returns the Ant Design [`<Form>`](https://ant.design/components/form/) and [`<Drawer>`](https://ant.design/components/drawer/) components props.

The`useDrawerForm` hook is extended from [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form/) from the [@refinedev/antd](https://github.com/refinedev/refine/tree/main/packages/antd) package. This means that you can use all the features of [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form/) hook with it.

## Usage

We will show two examples, one for creating a post and one for editing it. Let's see how `useDrwaerForm` is used in them.

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
]}>

<TabItem value="create">

In this example, we will show you how to `"create"` a record with `useDrawerForm`:

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { HttpError } from "@refinedev/core";
import React from "react";

import { Create, List, useDrawerForm, useTable } from "@refinedev/antd";
import { Drawer, Form, Input, Select, Table } from "antd";

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}

const PostList: React.FC = () => {
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

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

<TabItem value="edit">

In this example, we will show you how to `"edit"` a record with `useDrawerForm`:

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { HttpError } from "@refinedev/core";
import React from "react";

import {
  Edit,
  EditButton,
  List,
  useDrawerForm,
  useTable,
} from "@refinedev/antd";
import { Drawer, Form, Input, Select, Space, Table } from "antd";

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}

const PostList: React.FC = () => {
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

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Refine doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens the edit form in `<Drawer>` when clicked.

So, we have to put the `<EditButton/>` on our list manually. In that way, `<Edit>` form in `<Drawer>` can fetch data by the record `id`.

```tsx
<Table.Column<IPost>
  title="Actions"
  dataIndex="actions"
  key="actions"
  render={(_value, record) => <EditButton onClick={() => show(record.id)} />}
/>
```

Don't forget to pass the record `"id"` to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.

</TabItem>

</Tabs>

## Properties

All [`useForm`][antd-use-form] props are also available in `useDrawerForm`. You can find descriptions on the [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form#properties) documentation.

### syncWithLocation

When `syncWithLocation` is `true`, the drawers visibility state and the `id` of the record will be synced with the URL. It is `false` by default.

This property can also be set as an object `{ key: string; syncId?: boolean }` to customize the key of the URL query parameter. `id` will be synced with the URL only if `syncId` is `true`.

```tsx
const drawerForm = useDrawerForm({
  syncWithLocation: { key: "my-modal", syncId: true },
});
```

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useDrawerForm({
  //...
  overtimeOptions: {
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log(elapsedInterval);
    },
  },
});

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...

// You can use it like this:
{
  elapsedTime >= 4000 && <div>this takes a bit longer than expected</div>;
}
```

### autoSave

If you want to save the form automatically after some delay when user edits the form, you can pass true to `autoSave.enabled` prop.

By default the `autoSave` feature does not invalidate queries. However, you can use the `invalidateOnUnmount` and `invalidateOnClose` props to invalidate queries upon unmount or close.

It also supports `onMutationSuccess` and `onMutationError` callback functions. You can use `isAutoSave` parameter to determine whether the mutation is triggered by `autoSave` or not.

`autoSave` feature operates exclusively in `edit` mode. Users can take advantage of this feature while editing data, as changes are automatically saved in editing mode. However, when creating new data, manual saving is still required.

`onMutationSuccess` and `onMutationError` callbacks will be called after the mutation is successful or failed.

#### enabled

To enable the `autoSave` feature, set the `enabled` parameter to `true`. Default value is `false`.

```tsx
useDrawerForm({
  autoSave: {
    enabled: true,
  },
});
```

#### debounce

Set the debounce time for the `autoSave` prop. Default value is `1000` milliseconds.

```tsx
useDrawerForm({
  autoSave: {
    enabled: true,
    // highlight-next-line
    debounce: 2000,
  },
});
```

#### onFinish

If you want to modify the data before sending it to the server, you can use `onFinish` callback function.

```tsx
useDrawerForm({
  autoSave: {
    enabled: true,
    // highlight-start
    onFinish: (values) => {
      return {
        foo: "bar",
        ...values,
      };
    },
    // highlight-end
  },
});
```

#### invalidateOnUnmount

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the hook is unmounted. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. Default value is `false`.

```tsx
useDrawerForm({
  autoSave: {
    enabled: true,
    // highlight-next-line
    invalidateOnUnmount: true,
  },
});
```

#### invalidateOnClose

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the drawer is closed. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. Default value is `false`.

```tsx
useDrawerForm({
  autoSave: {
    enabled: true,
    // highlight-next-line
    invalidateOnClose: true,
  },
});
```

### defaultFormValues

Default values for the form. Use this to pre-populate the form with data that needs to be displayed.

```tsx
useForm({
  defaultFormValues: {
    title: "Hello World",
  },
});
```

Also, it can be provided as an async function to fetch the default values. The loading state can be tracked using the [`defaultFormValuesLoading`](#defaultformvaluesloading) state returned from the hook.

> 🚨 When `action` is "edit" or "clone" a race condition with `async defaultFormValues` may occur. In this case, the form values will be the result of the last completed operation.

```tsx
const { defaultFormValuesLoading } = useForm({
  defaultFormValues: async () => {
    const response = await fetch("https://my-api.com/posts/1");
    const data = await response.json();
    return data;
  },
});
```

## Return values

`useDrawerForm` returns the same values from [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form#return-values) and additional values to work with [`<Drawer>`](https://ant.design/components/drawer/) components.

### show

A function that opens the `<Drawer>`. It takes an optional `id` parameter. If `id` is provided, it will fetch the record data and fill the `<Form>` with it.

### close

A function that closes the `<Drawer>`. Same as `[onClose][#onClose]`.

### saveButtonProps

It contains the props needed by the `"submit"` button within the `<Drawer>` (disabled,loading etc.). When `saveButtonProps.onClick` is called, it triggers `form.submit()`. You can manually pass these props to your custom button.

### deleteButtonProps

It contains the props needed by the `"delete"` button within the `<Drawer>` (disabled,loading etc.). When `deleteButtonProps.onSuccess` is called, it triggers it sets `id` to `undefined` and `open` to `false`. You can manually pass these props to your custom button.

### formProps

It's required to manage `<Form>` state and actions. Under the hood the `formProps` came from [`useForm`][antd-use-form].

It contains the props to manage the [Antd `<Form>`](https://ant.design/components/form#api) component such as [_`onValuesChange`, `initialValues`, `onFieldsChange`, `onFinish` etc._](/core/docs/ui-integrations/ant-design/hooks/use-form#return-values)

:::note Difference between `onFinish` and `formProps.onFinish`

`onFinish` method returned directly from `useDrawerForm` is same with the `useForm`'s `onFinish`. When working with drawers, closing the drawer after submission and resetting the fields are necessary and to handle these, `formProps.onFinish` extends the `onFinish` method and handles the closing of the drawer and clearing the fields under the hood.

If you're customizing the data before submitting it to your data provider, it's recommended to use `formProps.onFinish` and let it handle the operations after the submission.

:::

### drawerProps

It's required to manage [`<Drawer>`](https://ant.design/components/drawer/#API) state and actions.

#### width

It's the width of the `<Drawer>`. Default value is `"500px"`.

#### onClose

A function that can close the `<Drawer>`. It's useful when you want to close the `<Drawer>` manually.
When [`warnWhenUnsavedChanges`](/core/docs/ui-integrations/ant-design/hooks/use-form#warnwhenunsavedchanges) is `true`, it will show a confirmation modal before closing the `<Drawer>`. If you override this function, you have to handle this confirmation modal manually.

#### open

Current visible state of `<Drawer>`. Default value is `false`.

#### forceRender

It renders `<Drawer>` instead of lazy rendering it. Default value is `true`.

### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useDrawerForm();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

### autoSaveProps

If `autoSave` is enabled, this hook returns `autoSaveProps` object with `data`, `error`, and `status` properties from mutation.

### defaultFormValuesLoading

If [`defaultFormValues`](#defaultformvalues) is an async function, `defaultFormValuesLoading` will be `true` until the function is resolved.

## FAQ

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="pages/user/create.tsx"
import { Create, Drawer, useDrawerForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";

export const UserCreate: React.FC = () => {
  // highlight-start
  const { formProps, drawerProps, saveButtonProps } = useDrawerForm({
    action: "create",
  });
  // highlight-end

  // highlight-start
  const handleOnFinish = (values) => {
    formProps.onFinish?.({
      fullName: `${values.name} ${values.surname}`,
    });
  };
  // highlight-end

  return (
    <Drawer {...drawerProps}>
      <Create saveButtonProps={saveButtonProps}>
        // highlight-next-line
        <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Surname" name="surname">
            <Input />
          </Form.Item>
        </Form>
      </Create>
    </Drawer>
  );
};
```

## API Parameters

### Properties

<PropsTable module="@refinedev/antd/useDrawerForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/core/docs/core/refine-component/)>** component. `useDrawerForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). Otherwise if `action` is `edit`, `redirect`s default value is `list`.

### Type Parameters

| Property       | Description                                                                                                                                                         | Type                       | Default                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData   | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError         | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables     | Values for params.                                                                                                                                                  | `{}`                       |                            |
| TData          | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |
| TResponse      | Result data returned by the mutation function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TData` will be used as the default value.        | [`BaseRecord`][baserecord] | `TData`                    |
| TResponseError | Custom error object that extends [`HttpError`][httperror]. If not specified, the value of `TError` will be used as the default value.                               | [`HttpError`][httperror]   | `TError`                   |

### Return Value

| resource? | `string` |
| recordItemId? | [`BaseKey`](#basekey) |
| onSuccess? | `<TData = BaseRecord>(value: { data: TData; }) => void;` |
| mutationMode? | [`MutationMode`](#mutationmode) |
| hideText? | `boolean` |

| Key                      | Description                                                  | Type                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| show                     | A function that opens the drawer                             | `(id?: BaseKey) => void`                                                                                                                |
| form                     | Ant Design form instance                                     | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)                                                          |
| formProps                | Ant Design form props                                        | [`FormProps`](/core/docs/ui-integrations/ant-design/hooks/use-form#properties)                                                          |
| drawerProps              | Props for managed drawer                                     | [`DrawerProps`](#drawerprops)                                                                                                           |
| saveButtonProps          | Props for a submit button                                    | `{ disabled: boolean; onClick: () => void; loading: boolean; }`                                                                         |
| deleteButtonProps        | Adds props for delete button                                 | `{ resource?: string; recordItemId?: BaseKey; onSuccess?: (data: TData) => void; mutationMode?: MutationMode; hideText?: boolean; }`    |
| submit                   | Submit method, the parameter is the value of the form fields | `() => void`                                                                                                                            |
| open                     | Whether the drawer is open or not                            | `boolean`                                                                                                                               |
| close                    | Specify a function that can close the drawer                 | `() => void`                                                                                                                            |
| overtime                 | Overtime loading props                                       | `{ elapsedTime?: number }`                                                                                                              |
| autoSaveProps            | Auto save props                                              | `{ data: UpdateResponse<TData>` \| `undefined, error: HttpError` \| `null, status: "loading"` \| `"error"` \| `"idle"` \| `"success" }` |
| defaultFormValuesLoading | DefaultFormValues loading status of form                     | `boolean`                                                                                                                               |

## Example

<CodeSandboxExample path="form-antd-use-drawer-form" />

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
[antd-use-form]: /core/docs/ui-integrations/ant-design/hooks/use-form
