---
id: useForm
title: useForm
source: packages/react-hook-form/src/useForm/index.ts
---

```tsx live shared
import React from "react";
import { useTable, useNavigation } from "@pankod/refine-core";
import { useForm as ReactHoomFormUseForm } from "@pankod/refine-react-hook-form";

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
}

const Layout: React.FC = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
        background: "white",
      }}
    >
      {children}
    </div>
  );
};

const PostList: React.FC = () => {
  const { tableQueryResult, current, setCurrent, pageSize, pageCount } =
    useTable<IPost>({
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
    });
  const { edit, create, clone } = useNavigation();

  const hasNext = current < pageCount;
  const hasPrev = current > 1;

  return (
    <div>
      <button onClick={() => create("posts")}>Create Post</button>
      <table>
        <thead>
          <td>ID</td>
          <td>Title</td>
          <td>Actions</td>
        </thead>
        <tbody>
          {tableQueryResult.data?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                <button onClick={() => edit("posts", post.id)}>Edit</button>
                <button onClick={() => clone("posts", post.id)}>Clone</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div>
          <button onClick={() => setCurrent(1)} disabled={!hasPrev}>
            First
          </button>
          <button
            onClick={() => setCurrent((prev) => prev - 1)}
            disabled={!hasPrev}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrent((prev) => prev + 1)}
            disabled={!hasNext}
          >
            Next
          </button>
          <button onClick={() => setCurrent(pageCount)} disabled={!hasNext}>
            Last
          </button>
        </div>
        <span>
          Page{" "}
          <strong>
            {current} of {pageCount}
          </strong>
        </span>
        <span>
          Go to page:
          <input
            type="number"
            defaultValue={current}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : 1;
              setCurrent(value);
            }}
          />
        </span>
      </div>
    </div>
  );
};

const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = ReactHoomFormUseForm();

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />
      <label>Status: </label>
      <select {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <label>Content: </label>
      <br />
      <textarea
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span>This field is required</span>}
      <br />
      <br />
      <input type="submit" disabled={formLoading} value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};

const PostCreate: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = ReactHoomFormUseForm();

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />
      <label>Status: </label>
      <select {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <label>Content: </label>
      <br />
      <textarea
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span>This field is required</span>}
      <br />
      <br />
      <input type="submit" disabled={formLoading} value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};
```

The [`@pankod/refine-react-hook-form`][refine-react-hook-form] adapter allows you to integrate the [React Hook Form][react-hook-form] library with refine, enabling you to manage your forms in a headless manner. This adapter supports all of the features of both [React Hook Form][react-hook-form] and [refine's useForm][use-form-core] hook, and you can use any of the [React Hook Form][react-hook-form] examples as-is by copying and pasting them into your project."

<GeneralConceptsLink />

## Installation

Install the [`@pankod/refine-react-hook-form`][refine-react-hook-form] library.

<InstallPackagesCommand args="@pankod/refine-react-hook-form"/>

## Basic Usage

> For more detailed usage examples please refer to the [React Hook Form](https://react-hook-form.com/get-started) documentation.

We'll show the basic usage of `useForm` by adding an editing form.

```tsx title="pages/posts/edit.tsx"
import { useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

export const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const { options } = useSelect({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,
  });

  useEffect(() => {
    resetField("category.id");
  }, [options]);

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />
      <label>Status: </label>
      <select {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <label>Category: </label>
      <select
        {...register("category.id", {
          required: true,
        })}
        defaultValue={queryResult?.data?.data.category.id}
      >
        {options?.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {errors.category && <span>This field is required</span>}
      <br />
      <label>Content: </label>
      <br />
      <textarea
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span>This field is required</span>}
      <br />

      {queryResult?.data?.data?.thumbnail && (
        <>
          <br />
          <label>Image: </label>
          <br />

          <img
            src={queryResult?.data?.data?.thumbnail}
            width={200}
            height={200}
          />
          <br />
          <br />
        </>
      )}

      <input type="submit" value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};
```

:::tip
If you want to show a form in a modal or drawer where necessary route params might not be there you can use the [useModalForm](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useModalForm).
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
import { useForm } from "@pankod/refine-react-hook-form";

const PostCreatePage: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />
      <label>Status: </label>
      <select {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <label>Content: </label>
      <br />
      <textarea
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span>This field is required</span>}
      <br />
      <br />
      <input type="submit" disabled={formLoading} value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};
// visible-block-end

setRefineProps({
  Layout: (props) => <Layout {...props} />,
  resources: [
    {
      name: "posts",
      list: PostList,
      create: PostCreatePage,
      edit: PostEdit,
    },
  ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

<TabItem value="edit">

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` with [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it updates the record with [`useUpdate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/).

In the following example, we'll show how to use `useForm` with `action: "edit"`.

```tsx live url=http://localhost:3000/edit/123 previewHeight=420px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { useForm } from "@pankod/refine-react-hook-form";

const PostEditPage: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />
      <label>Content: </label>
      <br />
      <label>Status: </label>
      <select {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <textarea
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span>This field is required</span>}
      <br />
      <input type="submit" value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};
// visible-block-end

setRefineProps({
  Layout: (props) => <Layout {...props} />,
  resources: [
    {
      name: "posts",
      list: PostList,
      create: PostCreate,
      edit: PostEditPage,
    },
  ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

<TabItem value="clone">

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

You can think `action:clone` like save as. It's similar to `action:edit` but it creates a new record instead of updating the existing one.

It fetches the record data according to the `id` with [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it creates a new record with [`useCreate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/).

In the following example, we'll show how to use `useForm` with `action: "clone"`.

```tsx live url=http://localhost:3000/clone/123 previewHeight=420px
setInitialRoutes(["/posts/clone/123"]);

// visible-block-start
import { useForm } from "@pankod/refine-react-hook-form";

const PostCreatePage: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />
      <label>Status: </label>
      <select {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <label>Content: </label>
      <br />
      <textarea
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span>This field is required</span>}
      <br />
      <br />
      <input type="submit" disabled={formLoading} value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};
// visible-block-end

setRefineProps({
  Layout: (props) => <Layout {...props} />,
  resources: [
    {
      name: "posts",
      list: PostList,
      create: PostCreatePage,
      edit: PostEdit,
    },
  ],
});

render(<RefineHeadlessDemo />);
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

It is usefull when you want to `edit` or `clone` a `resource` from a different page.

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
- on `edit` mode: `"list`", `"many"` and `"detail"`

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

After form is submit is failed, `refine` will show a error notification. With this prop, you can customize the error notification.

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

in `edit` or `clone` mode, **refine** uses [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery) options by passing `queryOptions` property.

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

For example you can [change values before sending to the API](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm/#how-can-i-change-the-form-data-before-submitting-it-to-the-api).

### `formLoading`

Loading state of a modal. It's `true` when `useForm` is currently being submitted or data is being fetched for the `"edit"` or `"clone"` mode.

## FAQ

### How can Invalidate other resources?

You can invalidate other resources with help of [`useInvalidate`](/core/docs/3.xx.xx/api-reference/core/hooks/invalidate/useInvalidate/) hook.

It is useful when you want to `invalidate` other resources don't have relation with the current resource.

```tsx
import React from "react";
import { useInvalidate } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

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
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

export const UserCreate: React.FC = () => {
  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
  } = useForm();

  const onFinishHandler = (data: FieldValues) => {
    onFinish({
      fullName: `${data.name} ${data.surname}`,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFinishHandler)}>
      <label>Name: </label>
      <input {...register("name")} />
      <br />

      <label>Surname: </label>
      <input {...register("surname")} />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};
```

## API

### Properties

<PropsTable module="@pankod/refine-react-hook-form/useForm" />

> `*`: These properties have default values in `RefineContext` and can also be set on the **<[Refine](/core/docs/3.xx.xx/api-reference/core/components/refine-config)>** component.

:::tip External Props
It also accepts all props of [useForm](https://react-hook-form.com/api/useform) hook available in the [React Hook Form](https://react-hook-form.com/).
:::

<br/>

> For example, we can define the `refineCoreProps` property in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";

const { ... } = useForm({
    ...,
    refineCoreProps: {
        resource: "posts",
        redirect: false,
        // You can define all properties provided by refine useForm
    },
});
```

### Return values

Returns all the properties returned by [React Hook Form][react-hook-form] of the `useForm` hook. Also, we added the following return values:

`refineCore`: Returns all values returned by [`useForm`][use-form-core]. You can see all of them in [here](/core/docs/3.xx.xx/api-reference/core/hooks/useForm##return-values).

> For example, we can access the `refineCore` return value in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";

const {
    refineCore: { queryResult, ... },
} = useForm({ ... });
```

| Property        | Description               | Type                                                                     |
| --------------- | ------------------------- | ------------------------------------------------------------------------ |
| saveButtonProps | Props for a submit button | `{ disabled: boolean; onClick: (e: React.BaseSyntheticEvent) => void; }` |

### Type Parameters

| Property   | Desription                                                   | Type                       | Default                    |
| ---------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData      | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables | Field Values for mutation function                           | `{}`                       | `{}`                       |
| TContext   | Second generic type of the `useForm` of the React Hook Form. | `{}`                       | `{}`                       |

## Example

<CodeSandboxExample path="form-react-hook-form-use-form" />

[react-hook-form]: https://react-hook-form.com
[refine-react-hook-form]: https://github.com/refinedev/refine/tree/v3/packages/react-hook-form
[use-form-core]: /core/docs/3.xx.xx/api-reference/core/hooks/useForm
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[notification-provider]: /core/docs/3.xx.xx/api-reference/core/providers/notification-provider/
[get-one]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/#getone-
[create]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/#create-
[update]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/#update-
[data-provider]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider
