---
title: "useModalForm Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useModalForm"
sidebar_label: "useModalForm"
description: "Explore how to use the useModalForm hook in Refine v5. Learn integrate data for polished admin UIs. Hands-on examples included."
---

The `useModalForm` hook allows you to manage a form within a [`<Modal>`][antd-modal]. It returns Ant Design [`<Form>`][antd-form] and [Modal][antd-modal] components props.

`useModalForm` hook is extended from [`useForm`][antd-use-form] from the [`@refinedev/antd`][@refinedev/antd] package. This means that you can use all the features of [`useForm`][antd-use-form] hook.

## Usage

We'll show three examples, `"create"`, `"edit"` and `"clone"`. Let's see how `useModalForm` is used in all.

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
{label: 'clone', value: 'clone'},
]}>

<TabItem value="create">

In this example, we will show you how to create a record with `useModalForm`.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start

import React from "react";

import { List, useModalForm, useTable } from "@refinedev/antd";
import { Form, Input, Modal, Select, Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  // highlight-start
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<IPost>({
    action: "create",
  });
  // highlight-end

  return (
    <>
      <List
        // createButtonProps allows us to create and manage a button above the table.
        // This code block makes <Modal> appear when you click the button.
        createButtonProps={{
          // highlight-start
          onClick: () => {
            createModalShow();
          },
          // highlight-end
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Title" />
          <Table.Column dataIndex="status" title="Status" />
        </Table>
      </List>
      {/* highlight-start */}
      <Modal {...createModalProps}>
        <Form {...createFormProps} layout="vertical">
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
      </Modal>
      {/* highlight-end */}
    </>
  );
};

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}
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

Let's learn how to add editing capabilities to records that will be opening form in Modal by using the `action` prop.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

import React from "react";

import { EditButton, List, useModalForm, useTable } from "@refinedev/antd";
import { Form, Input, Modal, Select, Space, Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  // highlight-start
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<IPost>({
    action: "edit",
    warnWhenUnsavedChanges: true,
  });
  // highlight-end

  return (
    <>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Title" />
          <Table.Column dataIndex="status" title="Status" />
          <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                {/* highlight-start */}
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => editModalShow(record.id)}
                />
                {/* highlight-end */}
              </Space>
            )}
          />
        </Table>
      </List>
      {/* highlight-start */}
      <Modal {...editModalProps}>
        <Form {...editFormProps} layout="vertical">
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
      </Modal>
      {/* highlight-end */}
    </>
  );
};

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}
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

Refine doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens the edit form in `<Modal>` when clicked.

So, we have to put the `<EditButton/>` on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by the record `id`.

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

<TabItem value="clone">

Let's learn how to add cloning capabilities to records that will be opening form in Modal by using the `action` prop.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

import React from "react";

import { CloneButton, List, useModalForm, useTable } from "@refinedev/antd";
import { Form, Input, Modal, Select, Space, Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  // highlight-start
  const {
    modalProps: cloneModalProps,
    formProps: cloneFormProps,
    show: cloneModalShow,
  } = useModalForm<IPost>({
    action: "clone",
  });
  // highlight-end

  return (
    <>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="title" title="Title" />
          <Table.Column dataIndex="status" title="Status" />
          <Table.Column<IPost>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                {/* highlight-start */}
                <CloneButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => cloneModalShow(record.id)}
                />
                {/* highlight-end */}
              </Space>
            )}
          />
        </Table>
      </List>
      {/* highlight-start */}
      <Modal {...cloneModalProps}>
        <Form {...cloneFormProps} layout="vertical">
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
      </Modal>
      {/* highlight-end */}
    </>
  );
};

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}
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

Refine doesn't automatically add a `<CloneButton/>` to the each record in `<PostList>` which opens clone form in `<Modal>` when clicked.

So, we have to put the `<CloneButton/>` on our list. In that way, `<Clone>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<Table.Column<IPost>
  title="Actions"
  dataIndex="actions"
  key="actions"
  render={(_value, record) => <CloneButton onClick={() => show(record.id)} />}
/>
```

Don't forget to pass the record id to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.

</TabItem>

</Tabs>

## Properties

All [`useForm`][antd-use-form] props are also available in `useModalForm`. You can find descriptions on the [`useForm` documentation](/core/docs/ui-integrations/ant-design/hooks/use-form#properties).

### syncWithLocation

When `syncWithLocation` is `true`, the drawers visibility state and the `id` of the record will be synced with the URL. It is `false` by default.

This property can also be set as an object `{ key: string; syncId?: boolean }` to customize the key of the URL query parameter. `id` will be synced with the URL only if `syncId` is `true`.

```tsx
const modalForm = useModalForm({
  syncWithLocation: { key: "my-modal", syncId: true },
});
```

### defaultFormValues

Default values for the form. Use this to pre-populate the form with data that needs to be displayed.

```tsx
useModalForm({
  defaultFormValues: {
    title: "Hello World",
  },
});
```

Also, it can be provided as an async function to fetch the default values. The loading state can be tracked using the [`defaultFormValuesLoading`](#defaultformvaluesloading) state returned from the hook.

> 🚨 When `action` is "edit" or "clone" a race condition with `async defaultFormValues` may occur. In this case, the form values will be the result of the last completed operation.

```tsx
const { defaultFormValuesLoading } = useModalForm({
  defaultFormValues: async () => {
    const response = await fetch("https://my-api.com/posts/1");
    const data = await response.json();
    return data;
  },
});
```

### defaultVisible

When `defaultVisible` is `true`, the modal will be visible by default. It is `false` by default.

```tsx
const modalForm = useModalForm({
  defaultVisible: true,
});
```

### autoSubmitClose

`autoSubmitClose` will make the modal close after a successful submit. It is `true` by default.

```tsx
const modalForm = useModalForm({
  autoSubmitClose: false,
});
```

### autoResetForm

`autoResetForm` will reset the form after a successful submit. It is `true` by default.

```tsx
const modalForm = useModalForm({
  autoResetForm: false,
});
```

### autoResetFormWhenClose

`autoResetFormWhenClose` will reset the form when modal closes. It is `true` by default.

```tsx
const modalForm = useModalForm({
  autoResetFormWhenClose: false,
});
```

### warnWhenUnsavedChanges

When set to true, `warnWhenUnsavedChanges` shows a warning when the user tries to leave the page with unsaved changes. It is used to prevent the user from accidentally leaving the page. It is `false` by default

You can also set this value in [`<Refine>`](/core/docs/core/refine-component#warnwhenunsavedchanges) component.

```tsx
const modalForm = useModalForm({
  warnWhenUnsavedChanges: true,
});
```

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useModalForm({
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

To enable the `autoSave` feature, set the `enabled` parameter to `true`. By default, it is `false`.

```tsx
useModalForm({
  autoSave: {
    enabled: true,
  },
});
```

#### debounce

Set the debounce time for the `autoSave` prop. By default, it is `1000` milliseconds.

```tsx
useModalForm({
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
useModalForm({
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

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the hook is unmounted. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. By default, it is `false`.

```tsx
useModalForm({
  autoSave: {
    enabled: true,
    // highlight-next-line
    invalidateOnUnmount: true,
  },
});
```

#### invalidateOnClose

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the modal is closed. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. By default, it is `false`.

```tsx
useModalForm({
  autoSave: {
    enabled: true,
    // highlight-next-line
    invalidateOnClose: true,
  },
});
```

## Return Values

`useModalForm` returns the same values from [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form#return-values) and additional values to work with [`<Modal>`][antd-modal] components.

### formProps

It's required to manage `<Form>` state and actions. Under the hood the `formProps` came from [`useForm`][antd-use-form].

It contains the props to manage the [Antd `<Form>`](https://ant.design/components/form#api) components such as [`onValuesChange`, `initialValues`, `onFieldsChange`, `onFinish` etc.](/core/docs/ui-integrations/ant-design/hooks/use-form#return-values)

:::note Difference between `onFinish` and `formProps.onFinish`

`onFinish` method returned directly from `useModalForm` is same with the `useForm`'s `onFinish`. When working with modals, closing the modal after submission and resetting the fields are necessary and to handle these, `formProps.onFinish` extends the `onFinish` method and handles the closing of the modal and clearing the fields under the hood.

If you're customizing the data before submitting it to your data provider, it's recommended to use `formProps.onFinish` and let it handle the operations after the submission.

:::

### modalProps

The props needed by the [`<Modal>`][antd-modal] component.

#### title

Title of the modal. Value is based on resource and action values.

#### okText

`okText` is the text of the `"submit"` button within the modal. It is "Save" by default.

#### cancelText

`cancelText` is the text of the `"cancel"` button within the modal. It is "Cancel" by default.

#### width

Width of the `<Modal>`. It is `1000px` by default.

#### forceRender

`forceRender` renders the `<Modal>` instead of lazy rendering it. It is `true` by default.

#### okButtonProps

`okButtonProps` contains all the props needed by the `"submit"` button within the modal (disabled,loading etc.). When `okButtonProps.onClick` is called, it triggers `form.submit()`. You can manually pass these props to your custom button.

#### onOk

A function that can submit the `<Form>` inside `<Modal>`. It's useful when you want to submit the form manually.

#### onCancel

> Same as `close`

A function that can close the `<Modal>`. It's useful when you want to close the modal manually.

### open

Current visible state of `<Modal>`. Default value depends on `defaultVisible` prop.

### close

A function that can close the `<Modal>`. It's useful when you want to close the modal manually.

```tsx
const { close, modalProps, formProps, onFinish } = useModalForm();

const onFinishHandler = async (values) => {
  // Awaiting `onFinish` is important for features like unsaved changes notifier, invalidation, redirection etc.
  // If you're using the `onFinish` from `formProps`, it will call the `close` internally.
  await onFinish(values);
  close();
};

// ---

return (
  <Modal {...modalProps}>
    <Form {...formProps} onFinish={onFinishHandler} layout="vertical">
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
    </Form>
  </Modal>
);
```

### submit

`submit` is a function that can submit the form. It's useful when you want to submit the form manually.

```tsx
const { modalProps, formProps, submit } = useModalForm();

// ---

return (
  <Modal
    {...modalProps}
    footer={[
      <Button key="submit" type="primary" onClick={submit}>
        Submit
      </Button>,
    ]}
  >
    <Form {...formProps} layout="vertical">
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
    </Form>
  </Modal>
);
```

### show

`show` is a function that can show the modal.

```tsx
const { modalProps, formProps, show } = useModalForm();

return (
  <>
    <Button type="primary" onClick={() => show()}>
      Show Modal
    </Button>
    <Modal
      {...modalProps}
      footer={[
        <Button key="submit" type="primary" onClick={submit}>
          Submit
        </Button>,
      ]}
    >
      <Form {...formProps} onFinish={onFinishHandler} layout="vertical">
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </>
);
```

```tsx
const { modalProps, formProps } = useModalForm();

// ---

return (
  <Modal
    {...modalProps}
    footer={
      <Button
        onClick={(
          e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
            React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => modalProps.onCancel(e)}
      >
        Cancel
      </Button>
    }
  >
    <Form {...formProps} layout="vertical">
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
    </Form>
  </Modal>
);
```

### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useModalForm();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

### autoSaveProps

If `autoSave` is enabled, this hook returns `autoSaveProps` object with `data`, `error`, and `status` properties from mutation.

### defaultFormValuesLoading

If [`defaultFormValues`](#defaultformvalues) is an async function, `defaultFormValuesLoading` will be `true` until the function is resolved.

## FAQ

### How can I change the form data before submitting it to the API?

Here is an example where we modify the form data before submit:

We need to send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="pages/user/create.tsx"
import { Modal, useModalForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";

export const UserCreate: React.FC = () => {
  // highlight-start
  const { formProps, modalProps } = useModalForm({
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
    <Modal {...modalProps}>
      // highlight-next-line
      <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Surname" name="surname">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/useModalForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/core/docs/core/refine-component/)>** component. `useModalForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends on which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). If `action` is `edit` instead, `redirect`s default value is `list`.

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

| Key                      | Description                                                                                                         | Type                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show                     | A function that can open the modal                                                                                  | `(id?: BaseKey) => void`                                                                                                                                   |
| formProps                | [Props needed to manage form component](/core/docs/ui-integrations/ant-design/hooks/use-modal-form#formprops)       | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                    |
| modalProps               | [Props for needed to manage modal component](/core/docs/ui-integrations/ant-design/hooks/use-modal-form#modalprops) | [`ModalProps`](https://ant.design/components/modal/#API)                                                                                                   |
| formLoading              | Loading status of form                                                                                              | `boolean`                                                                                                                                                  |
| submit                   | Submit method, the parameter is the value of the form fields                                                        | `() => void`                                                                                                                                               |
| open                     | Whether the modal dialog is open or not                                                                             | `boolean`                                                                                                                                                  |
| close                    | Specify a function that can close the modal                                                                         | `() => void`                                                                                                                                               |
| defaultFormValuesLoading | DefaultFormValues loading status of form                                                                            | `boolean`                                                                                                                                                  |
| form                     | Ant Design form instance                                                                                            | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)                                                                             |
| id                       | Record id for edit action                                                                                           | [`BaseKey`][basekey] \| `undefined`                                                                                                                        |
| setId                    | `id` setter                                                                                                         | `Dispatch<SetStateAction<` [`BaseKey`][basekey] \| `undefined>>`                                                                                           |
| query                    | Result of the query of a record                                                                                     | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery)                                                              |
| mutation                 | Result of the mutation triggered by submitting the form                                                             | [`UseMutationResult<{ data: TData }, TError, { resource: string; values: TVariables; }, unknown>`](https://react-query.tanstack.com/reference/useMutation) |
| overtime                 | Overtime loading props                                                                                              | `{ elapsedTime?: number }`                                                                                                                                 |
| autoSaveProps            | Auto save props                                                                                                     | `{ data: UpdateResponse<TData>` \| `undefined, error: HttpError` \| `null, status: "loading"` \| `"error"` \| `"idle"` \| `"success" }`                    |
| defaultFormValuesLoading | DefaultFormValues loading status of form                                                                            | `boolean`                                                                                                                                                  |

## Example

<CodeSandboxExample path="form-antd-use-modal-form" />

[@refinedev/antd]: https://github.com/refinedev/refine/tree/main/packages/antd
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
[basekey]: /core/docs/core/interface-references#basekey
[antd-use-form]: /core/docs/ui-integrations/ant-design/hooks/use-form
[antd-modal]: https://ant.design/components/modal/
[antd-form]: https://ant.design/components/form/
