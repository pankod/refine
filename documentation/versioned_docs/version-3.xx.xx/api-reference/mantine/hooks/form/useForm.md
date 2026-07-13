---
id: useForm
title: useForm
source: packages/mantine/src/hooks/form/useForm/index.ts
---

```tsx live shared
import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

import {
  Edit as MantineEdit,
  Create as MantineCreate,
  List as MantineList,
  Form as MantineForm,
  Input as MantineInput,
  useTable as useMantineTable,
  EditButton as MantineEditButton,
  CloneButton as MantineCloneButton,
  Box as MantineBox,
  Group as MantineGroup,
  ScrollArea as MantineScrollArea,
  Table as MantineTable,
  Pagination as MantinePagination,
  TextInput as MantineTextInput,
  Text as MantineText,
  Textarea as MantineTextarea,
} from "@pankod/refine-mantine";

interface IPost {
  id: number;
  title: string;
  content: string;
}

const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        meta: {
          filterOperator: "contains",
        },
      },

      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <MantineGroup spacing="xs" noWrap>
              <MantineEditButton hideText recordItemId={getValue() as number} />
              <MantineCloneButton
                hideText
                recordItemId={getValue() as number}
              />
            </MantineGroup>
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
  });

  return (
    <MantineScrollArea>
      <MantineList>
        <MantineTable highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder && (
                        <MantineGroup spacing="xs" noWrap>
                          <MantineBox>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </MantineBox>
                        </MantineGroup>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </MantineTable>
        <br />
        <MantinePagination
          position="right"
          total={pageCount}
          page={current}
          onChange={setCurrent}
        />
      </MantineList>
    </MantineScrollArea>
  );
};

const PostEdit: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) =>
        value.length < 3 && "Title must be at least 3 characters",
      content: (value) =>
        value.length < 10 && "Content must be at least 10 characters",
    },
  });

  return (
    <MantineEdit saveButtonProps={saveButtonProps}>
      <form>
        <MantineTextInput
          mt={8}
          label="Title"
          placeholder="Title"
          withAsterisk
          {...getInputProps("title")}
        />

        <MantineTextarea
          label="Content"
          placeholder="Content"
          minRows={4}
          maxRows={4}
          withAsterisk
          {...getInputProps("content")}
        />
      </form>
    </MantineEdit>
  );
};

const PostCreate: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = mantineUseForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) =>
        value.length < 3 && "Title must be at least 3 characters",
      content: (value) =>
        value.length < 10 && "Content must be at least 10 characters",
    },
  });

  return (
    <MantineCreate saveButtonProps={saveButtonProps}>
      <form>
        <MantineTextInput
          mt={8}
          label="Title"
          placeholder="Title"
          withAsterisk
          {...getInputProps("title")}
        />
        <MantineTextarea
          label="Content"
          placeholder="Content"
          minRows={4}
          maxRows={4}
          withAsterisk
          {...getInputProps("content")}
        />
      </form>
    </MantineCreate>
  );
};
```

`useForm` is used to manage forms. It is based on [`Mantine useForm`][use-form-mantine] and [`refine useForm`][use-form-core] to supports all the features of these packages and adds some additional features.

<GeneralConceptsLink />

## Basic Usage

> For more detailed usage examples please refer to the [Mantine Form](https://mantine.dev/form/use-form/) documentation.

We'll show the basic usage of `useForm` by adding an editing form.

```tsx
import { Edit, Select, TextInput, useForm } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
      title: "",
      status: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          withAsterisk
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
          withAsterisk
          {...getInputProps("status")}
        />
      </form>
    </Edit>
  );
};
```

In the example if you navigate to `/posts/edit/1234` it will manage the data of the post with id of `1234` in an editing context. See [Actions](/core/docs/3.xx.xx/api-reference/core/hooks/useForm/#actions) on how `useForm` determines this is an editing context.

Since this is an edit form it will fill the form with the data of the post with id of `1234` and then the form will be ready to edit further and submit the changes.

Submit functionality is provided by `saveButtonProps` which includes all of the necessary props for a button to submit a form including automatically updating loading states.

:::tip
If you want to show a form in a modal or drawer where necessary route params might not be there you can use the [useModalForm](/core/docs/3.xx.xx/api-reference/mantine/hooks/form/useModalForm/) or the [useDrawerForm](/core/docs/3.xx.xx/api-reference/mantine/hooks/form/useDrawerForm/) hook.
:::

## Properties

### `action`

`useForm` can handle `edit`, `create` and `clone` actions.

:::tip
By default, it determines the `action` from route.

- If the route is `/posts/create` thus the hook will be called with `action: "create"`.
- If the route is `/posts/edit/1`, the hook will be called with `action: "edit"`.
- If the route is `/posts/clone/1`, the hook will be called with `action: "clone"`. To display form, uses `create` component from resource.

It can be overridden by passing the `action` prop where it isn't possible to determine the action from the route (e.g. when using form in a modal or using a custom route).
:::

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
{label: 'clone', value: 'clone'}
]}>
<TabItem value="create">

`action: "create"` is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/) under the hood for mutations on create mode.

In the following example, we'll show how to use `useForm` with `action: "create"`.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import React from "react";

import {
  Create,
  Text,
  TextInput,
  Textarea,
  useForm,
} from "@pankod/refine-mantine";

const PostCreatePage: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) =>
        value.length < 3 && "Title must be at least 3 characters",
      content: (value) =>
        value.length < 10 && "Content must be at least 10 characters",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          withAsterisk
          {...getInputProps("title")}
        />
        <Textarea
          label="Content"
          placeholder="Content"
          minRows={4}
          maxRows={4}
          withAsterisk
          {...getInputProps("content")}
        />
      </form>
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

render(<RefineMantineDemo />);
```

</TabItem>

<TabItem value="edit">

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` with [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it updates the record with [`useUpdate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/).

In the following example, we'll show how to use `useForm` with `action: "edit"`.

```tsx live url=http://localhost:3000/edit/123 previewHeight=420px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";

import {
  Edit,
  Text,
  TextInput,
  Textarea,
  useForm,
} from "@pankod/refine-mantine";

const PostEditPage: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) =>
        value.length < 3 && "Title must be at least 3 characters",
      content: (value) =>
        value.length < 10 && "Content must be at least 10 characters",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          withAsterisk
          {...getInputProps("title")}
        />
        <Textarea
          label="Content"
          placeholder="Content"
          minRows={4}
          maxRows={4}
          withAsterisk
          {...getInputProps("content")}
        />
      </form>
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

render(<RefineMantineDemo />);
```

</TabItem>

<TabItem value="clone">

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

You can think `action:clone` like save as. It's similar to `action:edit` but it creates a new record instead of updating the existing one.

It fetches the record data according to the `id` with [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it creates a new record with [`useCreate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/).

In the following example, we'll show how to use `useForm` with `action: "clone"`. You will see `action:clone` toggle at the top of the page. You can toggle it to set the action to `clone`.

```tsx live url=http://localhost:3000/clone/123 previewHeight=420px
setInitialRoutes(["/posts/clone/123"]);

// visible-block-start
import React from "react";

import {
  Create,
  Text,
  TextInput,
  Textarea,
  useForm,
} from "@pankod/refine-mantine";

const PostCreatePage: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) =>
        value.length < 3 && "Title must be at least 3 characters",
      content: (value) =>
        value.length < 10 && "Content must be at least 10 characters",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          withAsterisk
          {...getInputProps("title")}
        />
        <Textarea
          label="Content"
          placeholder="Content"
          minRows={4}
          maxRows={4}
          withAsterisk
          {...getInputProps("content")}
        />
      </form>
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

render(<RefineMantineDemo />);
```

</TabItem>

</Tabs>

### `resource`

> Default: It reads the `resource` value from the current URL.

It will be passed to the [`dataProvider`][data-provider]'s method as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your [`dataProvider`][data-provider]. See the [`creating a data provider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider#creating-a-data-provider) section for an example of how `resource` are handled.

- When `action` is `"create"`, it will be passed to the [`create`][create] method from the [`dataProvider`][data-provider].
- When `action` is `"edit"`, it will be passed to the [`update`][update] and the [`getOne`][get-one] method from the [`dataProvider`][data-provider].
- When `action` is `"clone"`, it will be passed to the [`create`][create] and the [`getOne`][get-one] method from the [`dataProvider`][data-provider].

```tsx
useForm({
  resource: "categories",
});
```

### `id`

`id` is used for determining the record to `edit` or `clone`. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It is useful when you want to `edit` or `clone` a `resource` from a different page.

> Note: `id` is required when `action: "edit"` or `action: "clone"`.

```tsx
useForm({
  refineCoreProps: {
    action: "edit", // or clone
    resource: "categories",
    id: 1, // <BASE_URL_FROM_DATA_PROVIDER>/categories/1
  },
});
```

### `redirect`

`redirect` is used for determining the page to redirect after the form is submitted. By default, it uses the `list`. It can be changed with the `redirect` property.

It can be set to `"show" | "edit" | "list" | "create"` or `false` to prevent the page from redirecting to the list page after the form is submitted.

```tsx
useForm({
  refineCoreProps: {
    redirect: false,
  },
});
```

### `onMutationSuccess`

It's a callback function that will be called after the mutation is successful.

It receives the following parameters:

- `data`: Returned value from [`useCreate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/) or [`useUpdate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/) depending on the `action`.
- `variables`: The variables passed to the mutation.
- `context`: react-query context.

```tsx
useForm({
  refineCoreProps: {
    onMutationSuccess: (data, variables, context) => {
      console.log({ data, variables, context });
    },
  },
});
```

### `onMutationError`

It's a callback function that will be called after the mutation is failed.

It receives the following parameters:

- `data`: Returned value from [`useCreate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/) or [`useUpdate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/) depending on the `action`.
- `variables`: The variables passed to the mutation.
- `context`: react-query context.

```tsx
useForm({
  refineCoreProps: {
    onMutationError: (data, variables, context) => {
      console.log({ data, variables, context });
    },
  },
});
```

### `invalidates`

You can use it to manage the invalidations that will occur at the end of the mutation.

By default it's invalidates following queries from the current `resource`:

- on `create` or `clone` mode: `"list"` and `"many"`
- on `"edit"` mode: `"list"`, `"many"` and `"detail"`

```tsx
useForm({
  refineCoreProps: {
    invalidates: ["list", "many", "detail"],
  },
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
It is useful when you want to use a different `dataProvider` for a specific resource.

:::tip
If you want to use a different `dataProvider` on all resource pages, you can use the [`dataProvider` prop ](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#dataprovidername) of the `<Refine>` component.
:::

```tsx
useForm({
  refineCoreProps: {
    dataProviderName: "second-data-provider",
  },
});
```

### `mutationMode`

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`. Default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

> For more information about mutation modes, please check [Mutation Mode documentation](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode) page.

```tsx
useForm({
  refineCoreProps: {
    mutationMode: "undoable", // "pessimistic" | "optimistic" | "undoable",
  },
});
```

### `successNotification`

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After form is submitted successfully, `useForm` will call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx
useForm({
  refineCoreProps: {
    successNotification: (data, values, resource) => {
      return {
        message: `Post Successfully created with ${data.title}`,
        description: "Success with no errors",
        type: "success",
      };
    },
  },
});
```

### `errorNotification`

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After form is submit is failed, `useForm` will call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx
useForm({
  refineCoreProps: {
    action: "create",
    resource: "post",
    errorNotification: (data, values, resource) => {
      return {
        message: `Something went wrong when deleting ${data.id}`,
        description: "Error",
        type: "error",
      };
    },
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

### `metaData`

[`metaData`](/core/docs/3.xx.xx/api-reference/general-concepts/#metadata) is used following two purposes:

- To pass additional information to data provider methods.
- Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/core/docs/3.xx.xx/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useForm({
  refineCoreProps: {
    metaData: {
      headers: { "x-meta-data": "true" },
    },
  },
});

const myDataProvider = {
  //...
  // highlight-start
  create: async ({ resource, variables, metaData }) => {
    const headers = metaData?.headers ?? {};
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

### `queryOptions`

> Works only in `action: "edit"` or `action: "clone"` mode.

in `edit` or `clone` mode, `refine` uses [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery) options by passing `queryOptions` property.

```tsx
useForm({
  refineCoreProps: {
    queryOptions: {
      retry: 3,
    },
  },
});
```

### `createMutationOptions`

> This option is only available when `action: "create"` or `action: "clone"`.

In `create` or `clone` mode, **refine** uses [`useCreate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/) hook to create data. You can pass [`mutationOptions`](https://tanstack.com/query/v4/docs/react/reference/useMutation) by passing `createMutationOptions` property.

```tsx
useForm({
  refineCoreProps: {
    queryOptions: {
      retry: 3,
    },
  },
});
```

### `updateMutationOptions`

> This option is only available when `action: "edit"`.

In `edit` mode, **refine** uses [`useUpdate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/) hook to update data. You can pass [`mutationOptions`](https://tanstack.com/query/v4/docs/react/reference/useMutation) by passing `updateMutationOptions` property.

```tsx
useForm({
  refineCoreProps: {
    queryOptions: {
      retry: 3,
    },
  },
});
```

### `warnWhenUnsavedChanges`

> Default: `false`

When it's true, Shows a warning when the user tries to leave the page with unsaved changes. It can be used to prevent the user from accidentally leaving the page.

It can be set globally in [`refine config`](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#warnwhenunsavedchanges).

```tsx
useForm({
  refineCoreProps: {
    warnWhenUnsavedChanges: true,
  },
});
```

### `liveMode`

Whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useForm({
  refineCoreProps: {
    liveMode: "auto",
  },
});
```

### `onLiveEvent`

The callback function that is executed when new events from a subscription are arrived.

```tsx
useForm({
  refineCoreProps: {
    onLiveEvent: (event) => {
      console.log(event);
    },
  },
});
```

### `liveParams`

Params to pass to [liveProvider's](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) subscribe method.

## Return Values

:::tip
All [`mantine useForm`][use-form-mantine] and [`core useForm`][use-form-core] return values also available in `useForm`.
:::

### `queryResult`

If the `action` is set to `"edit"` or `"clone"` or if a `resource` with an `id` is provided, `useForm` will call [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) and set the returned values as the `queryResult` property.

```tsx
const {
  refineCore: { queryResult },
} = useForm();

const { data } = queryResult;
```

### `mutationResult`

When in `"create"` or `"clone"` mode, `useForm` will call [`useCreate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/). When in `"edit"` mode, it will call [`useUpdate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/) and set the resulting values as the `mutationResult` property."

```tsx
const {
  refineCore: { mutationResult },
} = useForm();

const { data } = mutationResult;
```

### `setId`

`useForm` determine `id` from the router. If you want to change the `id` dynamically, you can use `setId` function.

```tsx
const {
  refineCore: { id, setId },
} = useForm();

const handleIdChange = (id: string) => {
  setId(id);
};

return (
  <div>
    <input value={id} onChange={(e) => handleIdChange(e.target.value)} />
  </div>
);
```

### `redirect`

"By default, after a successful mutation, `useForm` will `redirect` to the `"list"` page. To redirect to a different page, you can either use the `redirect` function to programmatically specify the destination, or set the redirect [property](/core/docs/3.xx.xx/api-reference/core/hooks/useForm/#redirect) in the hook's options.

In the following example we will redirect to the `"show"` page after a successful mutation.

```tsx
const {
  refineCore: { onFinish, redirect },
} = useForm();

// --

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const data = await onFinish(formValues);
  redirect("show", data?.data?.id);
};

// --
```

### `onFinish`

`onFinish` is a function that is called when the form is submitted. It will call the appropriate mutation based on the `action` property.
You can override the default behavior by passing an `onFinish` function in the hook's options.

For example you can [change values before sending to the API](/core/docs/3.xx.xx/api-reference/mantine/hooks/form/useForm/#how-can-i-change-the-form-data-before-submitting-it-to-the-api).

## FAQ

### How can Invalidate other resources?

You can invalidate other resources with help of [`useInvalidate`](/core/docs/3.xx.xx/api-reference/core/hooks/invalidate/useInvalidate/) hook.

It is useful when you want to `invalidate` other resources don't have relation with the current resource.

```tsx
import React from "react";
import { useInvalidate } from "@pankod/refine-core";
import { Create, Form, Input, useForm } from "@pankod/refine-antd";

const PostEdit = () => {
  const invalidate = useInvalidate();

  useForm({
    refineCoreProps: {
      onMutationSuccess: (data, variables, context) => {
        invalidate({
          resource: "users",
          invalidates: ["resourceAll"],
        });
      },
    },
  });

  // ---
};
```

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="pages/user/create.tsx"
import React from "react";
import { Create, TextInput, useForm } from "@pankod/refine-mantine";

const UserCreate: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
      name: "",
      surname: "",
    },
    // highlight-start
    transformValues: (values) => ({
      fullName: `${values.name} ${values.surname}`,
    }),
    // highlight-end
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Name"
          placeholder="Name"
          {...getInputProps("name")}
        />
        <TextInput
          mt={8}
          label="Surname"
          placeholder="Surname"
          {...getInputProps("surname")}
        />
      </form>
    </Create>
  );
};
```

## API Reference

### Properties

It supports all the features of the [`useForm`][use-form-mantine] hook provided by `@mantine/form`.
Also, we added the following return values.

`refineCoreProps`: You can define all properties provided by [`useForm`][use-form-core] here. You can see all of them in [here](/core/docs/3.xx.xx/api-reference/core/hooks/useForm#properties).

> For example, we can define the `refineCoreProps` property in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-mantine";

const { ... } = useForm({
    ..., // @mantine/form's useForm props
    refineCoreProps: {
        resource: "posts",
        redirect: false,
        //  @pankod/refine-core's useForm props
    },
});
```

### Return values

Returns all the return values of the [`useForm`][use-form-mantine] hook provided by `@mantine/form`. Also, we added the following return values.

`refineCore`: Returns all values returned by [`useForm`][use-form-core]. You can see all of them in [here](/core/docs/3.xx.xx/api-reference/core/hooks/useForm##return-values).

> For example, we can access the `refineCore` return value in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";

const {
    ..., // @mantine/form's useForm return values
    saveButtonProps,
    refineCore: {
        queryResult,
        ...  // @pankod/refine-core's useForm return values
    },
} = useForm({ ... });
```

| Property        | Description               | Type                                                                             |
| --------------- | ------------------------- | -------------------------------------------------------------------------------- |
| saveButtonProps | Props for a submit button | `{ disabled: boolean; onClick: (e: React.FormEvent<HTMLFormElement>) => void; }` |

### Type Parameters

| Property   | Desription                                                   | Type                       | Default                    |
| ---------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData      | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables | Form values for mutation function                            | `{}`                       | `Record<string, unknown>`  |

## Example

<CodeSandboxExample path="form-mantine-use-form" />

[use-form-core]: /core/docs/3.xx.xx/api-reference/core/hooks/useForm
[use-form-mantine]: https://mantine.dev/form/use-form
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[notification-provider]: /core/docs/3.xx.xx/api-reference/core/providers/notification-provider/
[get-one]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/#getone-
[create]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/#create-
[update]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/#update-
[data-provider]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider
