---
id: useModalForm
title: useModalForm
---

`useModalForm` hook allows you to manage a form within a [`<Modal>`][antd-modal]. It returns Ant Design [`<Form>`][antd-form] and [Modal][antd-modal] components props.

:::info
`useModalForm` hook is extended from [`useForm`][antd-use-form] from the [`@pankod/refine-antd`][@pankod/refine-antd] package. This means that you can use all the features of [`useForm`][antd-use-form] hook.
:::

## Basic Usage

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
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  List,
  Table,
  Form,
  Select,
  Input,
  Modal,
  Space,
  EditButton,
  useTable,
  useModalForm,
} from "@pankod/refine-antd";

const PostList: React.FC<IResourceComponentsProps> = () => {
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

Let's learn how to add editing capabilities to records that will be opening form in Modal by using the `action` prop.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  List,
  Table,
  Form,
  Select,
  Input,
  Modal,
  Space,
  EditButton,
  useTable,
  useModalForm,
} from "@pankod/refine-antd";

const PostList: React.FC<IResourceComponentsProps> = () => {
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
**refine** doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens edit form in `<Modal>` when clicked.

So, we have to put the `<EditButton/>` on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by the record `id`.

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

<TabItem value="clone">

Let's learn how to add cloning capabilities to records that will be opening form in Modal by using the `action` prop.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  List,
  Table,
  Form,
  Select,
  Input,
  Modal,
  Space,
  CloneButton,
  useTable,
  useModalForm,
} from "@pankod/refine-antd";

const PostList: React.FC<IResourceComponentsProps> = () => {
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
**refine** doesn't automatically add a `<CloneButton/>` to the each record in `<PostList>` which opens clone form in `<Modal>` when clicked.

So, we have to put the `<CloneButton/>` on our list. In that way, `<Clone>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<Table.Column<IPost>
  title="Actions"
  dataIndex="actions"
  key="actions"
  render={(_value, record) => <CloneButton onClick={() => show(record.id)} />}
/>
```

:::

:::caution
Don't forget to pass the record id to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.
:::

</TabItem>

</Tabs>

## Properties

:::tip
All [`useForm`][antd-use-form] props also available in `useModalForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#properties) docs.
:::

### `defaultFormValues`

> Only available in `"create"` form.

Default values for the form. Use this to pre-populate the form with data that needs to be displayed.

```tsx
const modalForm = useModalForm({
  defaultFormValues: {
    title: "Hello World",
  },
});
```

### `defaultVisible`

> Default: `false`

When `true`, modal will be visible by default.

```tsx
const modalForm = useModalForm({
  defaultVisible: true,
});
```

### `autoSubmitClose`

> Default: `true`

When `true`, modal will be closed after successful submit.

```tsx
const modalForm = useModalForm({
  autoSubmitClose: false,
});
```

### `autoResetForm`

> Default: `true`

When `true`, form will be reset after successful submit.

```tsx
const modalForm = useModalForm({
  autoResetForm: false,
});
```

### `warnWhenUnsavedChanges`

> Default: `false`

When you have unsaved changes and try to leave the current page, refine shows a confirmation modal box. To activate this feature.

You can also set this value in [`<Refine>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#warnwhenunsavedchanges) component.

```tsx
const modalForm = useModalForm({
  warnWhenUnsavedChanges: true,
});
```

## Return Values

### `formProps`

It's required to manage `<Form>` state and actions. Under the hood the `formProps` came from [`useForm`][antd-use-form].

It contains the props to manage the [Antd `<Form>`](https://ant.design/components/form#api) component such as [_`onValuesChange`, `initialValues`, `onFieldsChange`, `onFinish` etc._](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#return-values)

### `modalProps`

The props needed by the [`<Modal>`][antd-modal] component.

#### `title`

> Default when url is `"/posts/create"`: "Create Post"

Title of the modal. Value is based on resource and action values.

#### `okText`

> Default: `"Save"`

Text of the `"submit"` button within the modal.

#### `cancelText`

> Default: `"Cancel"`

Text of the `"cancel"` button within the modal.

#### `width`

> Default: `1000px`

Width of the `<Modal>`

#### `forceRender`

> Default: `true`

It renders `<Modal>` instead of lazy rendering it.

#### `okButtonProps`

It contains all the props needed by the `"submit"` button within the modal (disabled,loading etc.). When `okButtonProps.onClick` is called, it triggers `form.submit()`. You can manually pass these props to your custom button.

#### `onOk`

A function that can submit the `<Form>` inside `<Modal>`. It's useful when you want to submit the form manually.

#### `onCancel`

> Same as `close`

A function that can close the `<Modal>`. It's useful when you want to close the modal manually.

#### `visible`

> @deprecated. Please use `open` instead.

Current visible state of `<Modal>`. Default value depends on `defaultVisible` prop.

### `open`

Current visible state of `<Modal>`. Default value depends on `defaultVisible` prop.

### `close`

> Same as `onCancel`

A function that can close the modal. It's useful when you want to close the modal manually.

```tsx
const { close, modalProps, formProps, onFinish } = useModalForm();

const onFinishHandler = (values) => {
  onFinish(values);
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

### `submit`

A function that can submit the form. It's useful when you want to submit the form manually.

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

### `show`

A function that can show the modal.

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

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/useModalForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/core/docs/3.xx.xx/api-reference/core/components/refine-config)>** component. `useModalForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends on which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). If `action` is `edit` instead, `redirect`s default value is `list`.

### Return Value

| Key                      | Description                                                                                                             | Type                                                                                                                                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show                     | A function that can open the modal                                                                                      | `(id?: BaseKey) => void`                                                                                                                                                                                |
| formProps                | [Props needed to manage form component](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useModalForm/#formprops)       | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                                                                 |
| modalProps               | [Props for needed to manage modal component](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useModalForm/#modalprops) | [`ModalProps`](https://ant.design/components/modal/#API)                                                                                                                                                |
| formLoading              | Loading status of form                                                                                                  | `boolean`                                                                                                                                                                                               |
| submit                   | Submit method, the parameter is the value of the form fields                                                            | `() => void`                                                                                                                                                                                            |
| open                     | Whether the modal dialog is open or not                                                                                 | `boolean`                                                                                                                                                                                               |
| close                    | Specify a function that can close the modal                                                                             | `() => void`                                                                                                                                                                                            |
| defaultFormValuesLoading | DefaultFormValues loading status of form                                                                                | `boolean`                                                                                                                                                                                               |
| form                     | Ant Design form instance                                                                                                | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)                                                                                                                          |
| id                       | Record id for edit action                                                                                               | [`BaseKey`][basekey] \| `undefined`                                                                                                                                                                     |
| setId                    | `id` setter                                                                                                             | `Dispatch<SetStateAction<` [`BaseKey`][basekey] \| `undefined>>`                                                                                                                                        |
| queryResult              | Result of the query of a record                                                                                         | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery)                                                                                                           |
| mutationResult           | Result of the mutation triggered by submitting the form                                                                 | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; values: TVariables; },`<br/>` unknown>`](https://tanstack.com/query/v4/docs/framework/react/reference/useMutation) |

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]        | [`HttpError`][httperror]   |
| TVariables | Values for params.                                               | `{}`                       |

## Example

   <CodeSandboxExample path="form-antd-use-modal-form" />

[@pankod/refine-antd]: https://github.com/refinedev/refine/tree/v3/packages/antd
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[basekey]: /core/docs/3.xx.xx/api-reference/core/interfaces#basekey
[antd-use-form]: /core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm
[antd-modal]: https://ant.design/components/modal/
[antd-form]: https://ant.design/components/form/

```

```

```

```

```

```
