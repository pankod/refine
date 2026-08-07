---
title: "useForm Hook Guide | Ant Design & Refine v4 Entegration"
display_title: "useForm"
sidebar_label: "useForm"
description: "The ultimate guide to Ant Design forms in Refine v4. Learn how to manage form states, validation, and submissions using the specialized useForm hook."
source: packages/antd/src/hooks/form/useForm.ts
---

```tsx live shared
import {
  CloneButton as AntdCloneButton,
  Create as AntdCreate,
  EditButton as AntdEditButton,
  List as AntdList,
  useForm as useAntdForm,
  useTable as useAntdTable,
} from "@refinedev/antd";
import {
  Edit as AntdEdit,
  Form as AntdForm,
  Input as AntdInput,
  Space as AntdSpace,
  Table as AntdTable,
} from "antd";

interface IPost {
  id: number;
  title: string;
  content: string;
}

const PostList = () => {
  const { tableProps } = useAntdTable();

  return (
    <AntdList>
      <AntdTable {...tableProps} rowKey="id">
        <AntdTable.Column dataIndex="id" title="ID" />
        <AntdTable.Column dataIndex="title" title="Title" />
        <AntdTable.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <AntdSpace>
              <AntdEditButton hideText size="small" recordItemId={record.id} />
              <AntdCloneButton hideText size="small" recordItemId={record.id} />
            </AntdSpace>
          )}
        />
      </AntdTable>
    </AntdList>
  );
};

const PostEdit = () => {
  const { formProps, saveButtonProps } = useAntdForm();

  return (
    <AntdEdit saveButtonProps={saveButtonProps}>
      <AntdForm {...formProps} layout="vertical">
        <AntdForm.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
        <AntdForm.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput.TextArea />
        </AntdForm.Item>
      </AntdForm>
    </AntdEdit>
  );
};

const PostCreate = () => {
  const { formProps, saveButtonProps } = useAntdForm();

  return (
    <AntdCreate saveButtonProps={saveButtonProps}>
      <AntdForm {...formProps} layout="vertical">
        <AntdForm.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
        <AntdForm.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput.TextArea />
        </AntdForm.Item>
      </AntdForm>
    </AntdCreate>
  );
};
```

`useForm` is used to manage forms. It returns the necessary properties and methods to control the [Antd Form](https://ant.design/components/form/). It has been developed by using [`useForm`](/core/docs/data/hooks/use-form/) imported from the [@refinedev/core](https://github.com/refinedev/refine/tree/main/packages/core) package.

<GeneralConceptsLink />

## Usage

We will show the basic usage of `useForm` by adding an editing form.

```tsx title="pages/posts/edit.tsx"
// highlight-next-line
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const PostEdit: React.FC = () => {
  // highlight-next-line
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
    // highlight-next-line
    <Edit saveButtonProps={saveButtonProps}>
      // highlight-next-line
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
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
  );
};

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}
```

`formProps` includes all necessary values to manage Ant Design [Form](https://ant.design/components/form/) components.

In the example if you navigate to `/posts/edit/1234` it will manage the data of the post with id of `1234` in an editing context. See the `action` section below on how `useForm` determines this is an editing context.

Since this is an edit form it will fill the form with the data of the post with the id of `1234` and then the form will be ready to edit further and submit the changes.

Submit functionality is provided by `saveButtonProps` which includes all of the necessary props for a button to submit a form including the automatically updating loading states.

`useForm` accepts type parameters for the record in use and for the response type of the mutation. `IPost` in the example represents the record to edit. It is also used as the default type for mutation response.

If you want to show a form in a modal or drawer where necessary route params might not be there you can use the [useModalForm](/core/docs/ui-integrations/ant-design/hooks/use-modal-form) or the [useDrawerForm](/core/docs/ui-integrations/ant-design/hooks/use-drawer-form) hook.

> For more detailed usage examples, refer to the [Ant Design Form](https://ant.design/components/form/) documentation.

## Properties

### action

`useForm` can handle `edit`, `create` and `clone` actions.

By default, it determines the `action` from route. The action is inferred by matching the resource's action path with the current route.

It can be overridden by passing the `action` prop where it isn't possible to determine the action from the route (e.g. when using form in a modal or using a custom route).

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
{label: 'clone', value: 'clone'}
]}>
<TabItem value="create">

`action: "create"` is used for creating new records. `useForm` uses [`useCreate`](/core/docs/data/hooks/use-create) under the hood for mutations on create mode.

In the following example, we will show how to use `useForm` with `action: "create"`:

```tsx live url=http://localhost:3000/posts/create previewHeight=420px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import React from "react";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

interface IPost {
  id: number;
  title: string;
  content: string;
}

const PostCreatePage: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
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
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Create>
  );
};
// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
      create: PostCreatePage,
      edit: PostEdit,
    },
  ],
});

render(<RefineAntdDemo />);
```

</TabItem>

<TabItem value="edit">

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route but that can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` with [`useOne`](/core/docs/data/hooks/use-one) and returns the `query` for you to fill the form. After the form is submitted, it updates the record with [`useUpdate`](/core/docs/data/hooks/use-update).

In the following example, we will show how to use `useForm` with `action: "edit"`.

```tsx live url=http://localhost:3000/edit/123 previewHeight=420px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

interface IPost {
  id: number;
  title: string;
  content: string;
}

const PostEditPage: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Edit>
  );
};
// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
      create: PostCreate,
      edit: PostEditPage,
    },
  ],
});

render(<RefineAntdDemo />);
```

</TabItem>

<TabItem value="clone">

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route but that can be changed with the `setId` function.

You can think `action:clone` like "save as". It is also similar to `action:edit` but it creates a new record instead of updating the existing one.

It fetches the record data according to the `id` with [`useOne`](/core/docs/data/hooks/use-one) and returns the `query` for you to fill the form. After the form is submitted, it creates a new record with [`useCreate`](/core/docs/data/hooks/use-create).

```tsx live url=http://localhost:3000/clone/123 previewHeight=420px
setInitialRoutes(["/posts/clone/123"]);

// visible-block-start
import React from "react";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

interface IPost {
  id: number;
  title: string;
  content: string;
}

const PostCreatePage: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
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
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Create>
  );
};
// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
      create: PostCreatePage,
      edit: PostEdit,
    },
  ],
});

render(<RefineAntdDemo />);
```

</TabItem>

</Tabs>

### resource

`resource` will be passed to the [`dataProvider`][data-provider]'s method as a params. This parameter is usually used to as a API endpoint path but it all depends on how to handle the `resource` in your [`dataProvider`][data-provider]. By default it uses the inferred resource name from the route.

> For more information on how `resource` is handled, refer to the [`creating a data provider` section](/core/docs/data/data-provider#creating-a-data-provider)

- When `action` is `"create"`, it will be passed to the [`create`][create] method from the [`dataProvider`][data-provider].
- When `action` is `"edit"`, it will be passed to the [`update`][update] and the [`getOne`][get-one] method from the [`dataProvider`][data-provider].
- When `action` is `"clone"`, it will be passed to the [`create`][create] and the [`getOne`][get-one] method from the [`dataProvider`][data-provider].

```tsx
useForm({
  resource: "categories",
});
```

If the `resource` is passed, the `id` from the current URL will be ignored because it may belong to a different resource. To retrieve the `id` value from the current URL, use the `useParsed` hook and pass the `id` value to the `useForm` hook.

```tsx
import { useForm } from "@refinedev/antd";
import { useParsed } from "@refinedev/core";

const { id } = useParsed();

useForm({
  resource: "custom-resource",
  id,
});
```

Or you can use the `setId` function to set the `id` value.

```tsx
import { useForm } from "@refinedev/antd";

const { setId } = useForm({
  resource: "custom-resource",
});

setId("123");
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### id

`id` is used for determining the record to `edit` or `clone`. By default the `id` is determinted from the route. It can be changed with the `setId` function or the `id` property. Keep in mind that `id` is required for `action: "edit"` and `action: "clone"`.

It is useful when you want to `edit` or `clone` a `resource` from a different page.

```tsx
useForm({
  action: "edit", // or clone
  resource: "categories",
  id: 1, // <BASE_URL_FROM_DATA_PROVIDER>/categories/1
});
```

### redirect

`redirect` is used for determining the page to redirect after the form is submitted. By default, it uses the `list`. It can be changed with the `redirect` property.

It can be set to `"show" | "edit" | "list" | "create"` or `false` to prevent the page from redirecting to the list page after the form is submitted.

```tsx
useForm({
  redirect: false,
});
```

### onMutationSuccess

`onMutationSuccess` is a callback function that will be called after a successful mutation.

It receives the following parameters:

- `data`: Returned value from [`useCreate`](/core/docs/data/hooks/use-create) or [`useUpdate`](/core/docs/data/hooks/use-update) depending on the `action`.
- `variables`: The variables passed to the mutation.
- `context`: react-query context.
- `isAutoSave`: It's a boolean value that indicates whether the mutation is triggered by the [`autoSave`](#autoSave) feature or not.

```tsx
useForm({
  onMutationSuccess: (data, variables, context, isAutoSave) => {
    console.log({ data, variables, context, isAutoSave });
  },
});
```

### onMutationError

It's a callback function that will be called after a mutation fails.

It receives the following parameters:

- `data`: Returned value from [`useCreate`](/core/docs/data/hooks/use-create) or [`useUpdate`](/core/docs/data/hooks/use-update) depending on the `action`.
- `variables`: The variables passed to the mutation.
- `context`: react-query context.
- `isAutoSave`: It's a boolean value that indicates whether the mutation is triggered by the [`autoSave`](#autoSave) feature or not.

```tsx
useForm({
  onMutationError: (data, variables, context, isAutoSave) => {
    console.log({ data, variables, context, isAutoSave });
  },
});
```

### invalidates

You can use `invalidates` to manage the invalidations that will occur at the end of the mutation.

By default it's invalidates following queries from the current `resource`:

- on `create` or `clone` mode: `"list"` and `"many"`
- on `edit` mode: `"list"`, `"many"` and `"detail"`

```tsx
useForm({
  invalidates: ["list", "many", "detail"],
});
```

### dataProviderName

If there is more than one `dataProvider`, you should pass the name of the `dataProvider` you are going to use to `dataProviderName`.

If you want to use a different `dataProvider` on all resource pages, you can use the [`dataProvider` prop](/core/docs/core/refine-component#dataprovidername) of the `<Refine>` component.

```tsx
useForm({
  dataProviderName: "second-data-provider",
});
```

### mutationMode

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`. Default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

```tsx
useForm({
  mutationMode: "undoable", // "pessimistic" | "optimistic" | "undoable",
});
```

> For more information about mutation modes, refer to the [Mutation Mode documentation](/core/docs/advanced-tutorials/mutation-mode)

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

`successNotification` allows you to customize the success notification that pops up after the form is submitted, and `useForm` calls the `open` function from [`NotificationProvider`][notification-provider]:

```tsx
useForm({
  successNotification: (data, values, resource) => {
    return {
      message: `Post Successfully created with ${data.title}`,
      description: "Success with no errors",
      type: "success",
    };
  },
});
```

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

`errorNotification` allows you to customize the error notification that pops up after the form submission fails, and `useForm` calls the `open` function from [`NotificationProvider`][notification-provider]:

```tsx
useForm({
  action: "create",
  resource: "post",
  errorNotification: (data, values, resource) => {
    return {
      message: `Something went wrong when deleting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

```json title="Default values"
{
    "message": "Error when updating <resource-name> (status code: ${err.statusCode})" or "Error when creating <resource-name> (status code: ${err.statusCode})",
    "description": "Error",
    "type": "error",
}
```

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).
- Providing additional parameters to the redirection path after the form is submitted.

> For more information, refer to the [`meta` section of the General Concepts documentation &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useForm({
  meta: {
    headers: { "x-meta-data": "true" },
  },
});

const myDataProvider = {
  //...
  // highlight-start
  create: async ({ resource, variables, meta }) => {
    const headers = meta?.headers ?? {};
    // highlight-end
    const url = `${apiUrl}/${resource}`;

    // highlight-next-line
    const { data } = await httpClient.post(url, variables, { headers });

    return {
      data,
    };
  },
  //...
};
```

### queryMeta

In addition to the [`meta`](#meta) property, you can also pass the `queryMeta` property to the `useForm` hook. This property is used to pass additional information to the `useOne` hook that is used to fetch the data in the `edit` and `clone` modes. This is useful when you have to apply different values to the `useOne` hook from the `useCreate` or `useUpdate` hook mutations.

```tsx
useForm({
  queryMeta: {
    querySpecificValue: "someValue",
  },
});
```

If you have overlapping properties in both `meta` and `queryMeta`, the `queryMeta` property will be used.

### mutationMeta

In addition to the [`meta`](#meta) property, you can also pass the `mutationMeta` property to the `useForm` hook. This property is used to pass additional information to the `useCreate` or `useUpdate` hook mutations. This is useful when you have to apply different values to the `useCreate` or `useUpdate` hooks from the `useOne` hook query.

```tsx
useForm({
  mutationMeta: {
    mutationSpecificValue: "someValue",
  },
});
```

If you have overlapping properties in both `meta` and `mutationMeta`, the `mutationMeta` property will be used.

### queryOptions

In the `edit` and `clone` modes, Refine uses [`useOne`](/core/docs/data/hooks/use-one) hook to fetch data. You can pass the [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery) options by passing the `queryOptions` property. This property will only work in the `edit` and `clone` actions.

```tsx
useForm({
  queryOptions: {
    retry: 3,
  },
});
```

### createMutationOptions

In the `create` and `clone` modes, Refine uses the [`useCreate`](/core/docs/data/hooks/use-create) hook to create data. You can pass [`mutationOptions`](https://tanstack.com/query/v4/docs/react/reference/useMutation) by passing the `createMutationOptions` property. This property will only work in the `create` and `clone` actions.

```tsx
useForm({
  createMutationOptions: {
    retry: 3,
  },
});
```

### updateMutationOptions

In the `edit` mode, Refine uses [`useUpdate`](/core/docs/data/hooks/use-update) hook to update data. You can pass [`mutationOptions`](https://tanstack.com/query/v4/docs/react/reference/useMutation) by passing `updateMutationOptions` property. This property will only work in the `edit` action.

```tsx
useForm({
  updateMutationOptions: {
    retry: 3,
  },
});
```

### warnWhenUnsavedChanges

When set to true, `warnWhenUnsavedChanges` shows a warning when the user tries to leave the page with unsaved changes. It is used to prevent the user from accidentally leaving the page. It is `false` by default

It can be set globally in [`Refine config`](/core/docs/core/refine-component#warnwhenunsavedchanges).

```tsx
useForm({
  warnWhenUnsavedChanges: true,
});
```

### submitOnEnter

When it's true, `submitOnEnter` will submit the form when the enter key is pressed. It can be used to prevent the user from accidentally leaving the page. It is `false` by default

```tsx
useForm({
  submitOnEnter: true,
});
```

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

`liveMode` is where you can choose whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in real time throughout your app.

```tsx
useForm({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

`onLiveEvent` is the callback function that is executed when new events from a subscription are arrived.

```tsx
useForm({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### liveParams

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Params to pass to [liveProvider](/core/docs/realtime/live-provider#subscribe)'s subscribe method.

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useForm({
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

By default the `autoSave` feature does not invalidate queries. However, you can use the `invalidateOnUnmount` prop to invalidate queries upon unmount.

It also supports [`onMutationSuccess`](#onmutationsuccess) and [`onMutationError`](#onmutationerror) callback functions. You can use `isAutoSave` parameter to determine whether the mutation is triggered by `autoSave` or not.

`autoSave` feature operates exclusively in `edit` mode. Users can take advantage of this feature while editing data, as changes are automatically saved in editing mode. However, when creating new data, manual saving is still required.

`onMutationSuccess` and `onMutationError` callbacks will be called after the mutation is successful or failed.

#### enabled

To enable the `autoSave` feature, set the `enabled` parameter to `true`. By default, it is `false`.

```tsx
useForm({
  autoSave: {
    enabled: true,
  },
});
```

#### debounce

Set the debounce time for the `autoSave` prop. By default, it is `1000` milliseconds.

```tsx
useForm({
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
useForm({
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
useForm({
  autoSave: {
    enabled: true,
    // highlight-next-line
    invalidateOnUnmount: true,
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

## Return Values

All [`Refine Core's useForm`](/core/docs/data/hooks/use-form/) return values also available in `useForm`.

### form

It's a [`<Form>`](https://ant.design/components/form) instance. You can refer to [Antd `<Form>` documentation](https://ant.design/components/form#api) for more information.

### formProps

It's required to manage [`<Form>`](https://ant.design/components/form) state and actions.

#### onFinish

`onFinish` is called when the form is submitted. It will call the appropriate mutation based on the `action` property.

The only difference between `onFinish` and `formProps.onFinish` is that passing a value to `formProps.onFinish`is mandatory, whereas `onFinish` can automatically retrieve values from the form state.

#### onValuesChange

The `warnWhenUnsavedChanges` feature requires this function to work. If you want to override the form's `onValuesChange`, keep this in mind.

#### onKeyUp

`onKeyUp` is a function that will be called when a key is pressed. By default, it will call `form.submit()` function when the pressed key is `Enter`.

#### initialValues

When `action` is set to `"edit"` or `"clone"`, `initialValues` will be set to the `data` returned from [`useOne`](/core/docs/data/hooks/use-one) hook.

### saveButtonProps

It contains all the props needed by the `"submit"` button within the form (disabled,loading etc.). When `saveButtonProps.onClick` is called, it triggers `form.submit()`. You can manually pass these props to your custom button.

### formLoading

`formLoading` is the loading state of a modal. It's `true` when `useForm` is currently being submitted or data is being fetched for the `"edit"` or `"clone"` mode.

### query

If the `action` is set to `"edit"` or `"clone"` or if a `resource` with an `id` is provided, `useForm` will call [`useOne`](/core/docs/data/hooks/use-one) and set the returned values as the `query` property.

```tsx
const { query } = useForm();

const { data } = query;
```

### mutation

When in `"create"` or `"clone"` mode, `useForm` will call [`useCreate`](/core/docs/data/hooks/use-create). When in `"edit"` mode, it will call [`useUpdate`](/core/docs/data/hooks/use-update) and set the resulting values as the `mutation` property.

```tsx
const { mutation } = useForm();

const { data } = mutation;
```

### setId

`useForm` determine the `id` from the router. If you want to change the `id` dynamically, you can use the `setId` function.

```tsx
const { id, setId } = useForm();

const handleIdChange = (id: string) => {
  setId(id);
};

return (
  <div>
    <input value={id} onChange={(e) => handleIdChange(e.target.value)} />
  </div>
);
```

### redirect

By default, after a successful mutation, `useForm` will redirect to the `"list"` page. To redirect to a different page, you can either use the `redirect` function to programmatically specify the destination, or set the `redirect` [property](/core/docs/data/hooks/use-form/#redirect) in the hook's options.

In the following example, we redirect to the `"show"` page after a successful mutation:

```tsx
const { onFinish, redirect } = useForm();

// --

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const data = await onFinish(formValues);
  redirect("show", data?.data?.id);
};

// --
```

### onFinish

`onFinish` is a function that is called when the form is submitted. It will call the appropriate mutation based on the `action` property.
You can override the default behavior by passing an `onFinish` function in the hook's options.

For example you can [change values before sending to the API](/core/docs/ui-integrations/ant-design/hooks/use-form#how-can-i-change-the-form-data-before-submitting-it-to-the-api).

### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useForm();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

### autoSaveProps

If `autoSave` is enabled, this hook returns `autoSaveProps` object with `data`, `error`, and `status` properties from mutation.

### defaultFormValuesLoading

If [`defaultFormValues`](#defaultformvalues) is an async function, `defaultFormValuesLoading` will be `true` until the function is resolved.

### ~~mutationResult~~ <PropTag deprecated />

This prop is deprecated and will be removed in the future versions. Use [`mutation`](#mutation) instead.

### ~~queryResult~~ <PropTag deprecated />

This prop is deprecated and will be removed in the future versions. Use [`query`](#query) instead.

## FAQ

### How can Invalidate other resources?

You can invalidate other resources with help of [`useInvalidate`](/core/docs/data/hooks/use-invalidate) hook.

It is useful when you want to `invalidate` other resources don't have relation with the current resource.

```tsx
import { useForm } from "@refinedev/antd";

const PostEdit = () => {
  const invalidate = useInvalidate();

  useForm({
    // highlight-start
    onMutationSuccess: (data, variables, context) => {
      invalidate({
        resource: "users",
        invalidates: ["resourceAll"],
      });
    },
    // highlight-end
  });

  // ---
};
```

### How can I change the form data before submitting it to the API?

Here is an example where we modify the form data before submit:

We need to send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="pages/user/create.tsx"
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";

export const UserCreate: React.FC = () => {
  // highlight-next-line
  const { formProps, saveButtonProps, onFinish } = useForm();

  // highlight-start
  const handleOnFinish = (values) => {
    onFinish({
      fullName: `${values.name} ${values.surname}`,
    });
  };
  // highlight-end

  return (
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
  );
};
```

### How to pass `meta` values only for the mutation or query?

You can use the `meta` property to pass common values to the mutation and the query. But in some cases, you may want to pass different values to the mutation and the query. To do this, you can use `mutationMeta` and `queryMeta` properties.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/useForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/core/docs/core/refine-component)>** component. `useForm` will use what is passed to `<Refine>` as default but a local value will override it.

<br/>

### Type Parameters

| Property       | Description                                                                                                                                                         | Type                       | Default                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData   | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError         | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables     | Values for params.                                                                                                                                                  | `{}`                       |                            |
| TData          | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |
| TResponse      | Result data returned by the mutation function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TData` will be used as the default value.        | [`BaseRecord`][baserecord] | `TData`                    |
| TResponseError | Custom error object that extends [`HttpError`][httperror]. If not specified, the value of `TError` will be used as the default value.                               | [`HttpError`][httperror]   | `TError`                   |

### Return values

| Property                 | Description                                             | Type                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onFinish                 | Triggers the mutation                                   | `(values?: TVariables) => Promise<CreateResponse<TData>` \| `UpdateResponse<TData>` \| `void`>                                                                        |
| form                     | Ant Design form instance                                | [`FormInstance`](https://ant.design/components/form/#FormInstance)                                                                                                    |
| formProps                | Ant Design form props                                   | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                               |
| saveButtonProps          | Props for a submit button                               | `{ disabled: boolean; onClick: () => void; loading?:boolean; }`                                                                                                       |
| redirect                 | Redirect function for custom redirections               | `(redirect:` `"list"`\|`"edit"`\|`"show"`\|`"create"`\| `false` ,`idFromFunction?:` [`BaseKey`](/core/docs/core/interface-references#basekey)\|`undefined`) => `data` |
| query                    | Result of the query of a record                         | [`QueryObserverResult<T>`](https://react-query.tanstack.com/reference/useQuery)                                                                                       |
| mutation                 | Result of the mutation triggered by submitting the form | [`UseMutationResult<T>`](https://react-query.tanstack.com/reference/useMutation)                                                                                      |
| formLoading              | Loading state of form request                           | `boolean`                                                                                                                                                             |
| id                       | Record id for `clone` and `create` action               | [`BaseKey`](/core/docs/core/interface-references#basekey)                                                                                                             |
| setId                    | `id` setter                                             | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                                                                                                      |
| overtime                 | Overtime loading props                                  | `{ elapsedTime?: number }`                                                                                                                                            |
| autoSaveProps            | Auto save props                                         | `{ data: UpdateResponse<TData>` \| `undefined, error: HttpError` \| `null, status: "loading"` \| `"error"` \| `"idle"` \| `"success" }`                               |
| defaultFormValuesLoading | DefaultFormValues loading status of form                | `boolean`                                                                                                                                                             |

## Example

<CodeSandboxExample path="form-antd-use-form" />

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
[notification-provider]: /core/docs/notification/notification-provider
[get-one]: /core/docs/data/data-provider#getone-
[create]: /core/docs/data/data-provider#create-
[update]: /core/docs/data/data-provider#update-
[data-provider]: /core/docs/data/data-provider
