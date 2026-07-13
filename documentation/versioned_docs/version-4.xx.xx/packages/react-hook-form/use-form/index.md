---
title: "useForm Hook Guide | Refine v4 & React Hook Form"
display_title: "useForm"
sidebar_label: "useForm"
description: "Master form management in Refine v4. Learn how the React Hook Form integration simplifies data fetching, validation, and submission."
source: packages/react-hook-form/src/useForm/index.ts
---

```tsx live shared
import { useNavigation, useTable } from "@refinedev/core";
import { useForm as ReactHookFormUseForm } from "@refinedev/react-hook-form";
import React from "react";

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
  const { tableQuery, current, setCurrent, pageSize, pageCount } =
    useTable<IPost>({
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
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
          {tableQuery.data?.data.map((post) => (
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
  } = ReactHookFormUseForm();

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
  } = ReactHookFormUseForm();

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

`useForm` is used to manage forms. It returns the necessary properties and methods to control the `<form>` element. It has been developed by using [`useForm`][use-form-core] imported from the [@refinedev/core](https://github.com/refinedev/refine/tree/main/packages/core) package.

<GeneralConceptsLink />

## Installation

Install the [`@refinedev/react-hook-form`][refine-react-hook-form] library.

<InstallPackagesCommand args="@refinedev/react-hook-form"/>

## Usage

> For more detailed usage examples please refer to the [React Hook Form](https://react-hook-form.com/get-started) documentation.

We'll show the basic usage of `useForm` by adding an editing form.

```tsx title="pages/posts/edit.tsx"
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const { options } = useSelect({
    resource: "categories",
    defaultValue: query?.data?.data.category.id,
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
        defaultValue={query?.data?.data.category.id}
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

      {query?.data?.data?.thumbnail && (
        <>
          <br />
          <label>Image: </label>
          <br />

          <img src={query?.data?.data?.thumbnail} width={200} height={200} />
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

If you want to show a form in a modal or drawer where necessary route params might not be there you can use the [useModalForm](/core/docs/packages/list-of-packages).

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

`action: "create"` is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](/core/docs/data/hooks/use-create) under the hood for mutations on create mode.

In the following example, we'll show how to use `useForm` with `action: "create"`.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { useForm } from "@refinedev/react-hook-form";

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

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <Layout>
              <ReactRouter.Outlet />
            </Layout>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
          <ReactRouter.Route path="create" element={<PostCreate />} />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

<TabItem value="edit">

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` with [`useOne`](/core/docs/data/hooks/use-one) and returns the `query` for you to fill the form. After the form is submitted, it updates the record with [`useUpdate`](/core/docs/data/hooks/use-update).

In the following example, we'll show how to use `useForm` with `action: "edit"`.

```tsx live url=http://localhost:3000/edit/123 previewHeight=420px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { useForm } from "@refinedev/react-hook-form";

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

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <Layout>
              <ReactRouter.Outlet />
            </Layout>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
          <ReactRouter.Route path="create" element={<PostCreate />} />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

<TabItem value="clone">

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

You can think `action:clone` like save as. It's similar to `action:edit` but it creates a new record instead of updating the existing one.

It fetches the record data according to the `id` with [`useOne`](/core/docs/data/hooks/use-one) and returns the `query` for you to fill the form. After the form is submitted, it creates a new record with [`useCreate`](/core/docs/data/hooks/use-create).

In the following example, we'll show how to use `useForm` with `action: "clone"`.

```tsx live url=http://localhost:3000/clone/123 previewHeight=420px
setInitialRoutes(["/posts/clone/123"]);

// visible-block-start
import { useForm } from "@refinedev/react-hook-form";

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

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <Layout>
              <ReactRouter.Outlet />
            </Layout>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
          <ReactRouter.Route path="create" element={<PostCreate />} />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

</Tabs>

### resource

It will be passed to the [`dataProvider`][data-provider]'s method as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your [`dataProvider`][data-provider]. See the [`creating a data provider`](/core/docs/data/data-provider#creating-a-data-provider) section for an example of how `resource` are handled.

By default it reads the `resource` value from the current URL.

- When `action` is `"create"`, it will be passed to the [`create`][create] method from the [`dataProvider`][data-provider].
- When `action` is `"edit"`, it will be passed to the [`update`][update] and the [`getOne`][get-one] method from the [`dataProvider`][data-provider].
- When `action` is `"clone"`, it will be passed to the [`create`][create] and the [`getOne`][get-one] method from the [`dataProvider`][data-provider].

```tsx
useForm({
  refineCoreProps: {
    resource: "categories",
  },
});
```

If the `resource` is passed, the `id` from the current URL will be ignored because it may belong to a different resource. To retrieve the `id` value from the current URL, use the `useParsed` hook and pass the `id` value to the `useForm` hook.

```tsx
import { useParsed } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

const { id } = useParsed();

useForm({
  refineCoreProps: {
    resource: "custom-resource",
    id,
  },
});
```

Or you can use the `setId` function to set the `id` value.

```tsx
import { useForm } from "@refinedev/react-hook-form";

const {
  refineCore: { setId },
} = useForm({
  refineCoreProps: {
    resource: "custom-resource",
  },
});

setId("123");
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### id

`id` is used for determining the record to `edit` or `clone`. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It is useful when you want to `edit` or `clone` a `resource` from a different page. Keep in mind that `id` is required when `action: "edit"` or `action: "clone"`.

```tsx
useForm({
  refineCoreProps: {
    action: "edit", // or clone
    resource: "categories",
    id: 1, // <BASE_URL_FROM_DATA_PROVIDER>/categories/1
  },
});
```

### redirect

`redirect` is used for determining the page to redirect after the form is submitted. By default, it uses the `list`. It can be changed with the `redirect` property.

It can be set to `"show" | "edit" | "list" | "create"` or `false` to prevent the page from redirecting to the list page after the form is submitted.

```tsx
useForm({
  refineCoreProps: {
    redirect: false,
  },
});
```

### onMutationSuccess

It's a callback function that will be called after the mutation is successful.

It receives the following parameters:

- `data`: Returned value from [`useCreate`](/core/docs/data/hooks/use-create) or [`useUpdate`](/core/docs/data/hooks/use-update) depending on the `action`.
- `variables`: The variables passed to the mutation.
- `context`: react-query context.
- `isAutoSave`: It's a boolean value that indicates whether the mutation is triggered by the [`autoSave`](#autoSave) feature or not.

```tsx
useForm({
  refineCoreProps: {
    onMutationSuccess: (data, variables, context, isAutoSave) => {
      console.log({ data, variables, context, isAutoSave });
    },
  },
});
```

### onMutationError

It's a callback function that will be called after the mutation is failed.

It receives the following parameters:

- `data`: Returned value from [`useCreate`](/core/docs/data/hooks/use-create) or [`useUpdate`](/core/docs/data/hooks/use-update) depending on the `action`.
- `variables`: The variables passed to the mutation.
- `context`: react-query context.
- `isAutoSave`: It's a boolean value that indicates whether the mutation is triggered by the [`autoSave`](#autoSave) feature or not.

```tsx
useForm({
  refineCoreProps: {
    onMutationError: (data, variables, context, isAutoSave) => {
      console.log({ data, variables, context, isAutoSave });
    },
  },
});
```

### invalidates

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

### dataProviderName

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
It is useful when you want to use a different `dataProvider` for a specific resource.

If you want to use a different `dataProvider` on all resource pages, you can use the [`dataProvider` prop ](/core/docs/core/refine-component#dataprovidername) of the `<Refine>` component.

```tsx
useForm({
  refineCoreProps: {
    dataProviderName: "second-data-provider",
  },
});
```

### mutationMode

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`. Default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

> For more information about mutation modes, please check [Mutation Mode documentation](/core/docs/advanced-tutorials/mutation-mode) page.

```tsx
useForm({
  refineCoreProps: {
    mutationMode: "undoable", // "pessimistic" | "optimistic" | "undoable",
  },
});
```

### successNotification

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

### errorNotification

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After form is submit is failed, `Refine` will show a error notification. With this prop, you can customize the error notification.

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

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).
- Providing additional parameters to the redirection path after the form is submitted.

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useForm({
  refineCoreProps: {
    meta: {
      headers: { "x-meta-data": "true" },
    },
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

> Works only in `action: "edit"` or `action: "clone"` mode.

in `edit` or `clone` mode, Refine uses [`useOne`](/core/docs/data/hooks/use-one) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery) options by passing `queryOptions` property.

```tsx
useForm({
  refineCoreProps: {
    queryOptions: {
      retry: 3,
    },
  },
});
```

### createMutationOptions

> This option is only available when `action: "create"` or `action: "clone"`.

In `create` or `clone` mode, Refine uses [`useCreate`](/core/docs/data/hooks/use-create) hook to create data. You can pass [`mutationOptions`](https://tanstack.com/query/v4/docs/react/reference/useMutation) by passing `createMutationOptions` property.

```tsx
useForm({
  refineCoreProps: {
    queryOptions: {
      retry: 3,
    },
  },
});
```

### updateMutationOptions

> This option is only available when `action: "edit"`.

In `edit` mode, Refine uses [`useUpdate`](/core/docs/data/hooks/use-update) hook to update data. You can pass [`mutationOptions`](https://tanstack.com/query/v4/docs/react/reference/useMutation) by passing `updateMutationOptions` property.

```tsx
useForm({
  refineCoreProps: {
    queryOptions: {
      retry: 3,
    },
  },
});
```

### warnWhenUnsavedChanges

When it's true, Shows a warning when the user tries to leave the page with unsaved changes. It can be used to prevent the user from accidentally leaving the page. Default value is `false`.

It can be set globally in [`Refine config`](/core/docs/core/refine-component#warnwhenunsavedchanges).

```tsx
useForm({
  refineCoreProps: {
    warnWhenUnsavedChanges: true,
  },
});
```

### liveMode

Whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/core/docs/realtime/live-provider#livemode) page.

```tsx
useForm({
  refineCoreProps: {
    liveMode: "auto",
  },
});
```

### onLiveEvent

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

### liveParams

Params to pass to [liveProvider's](/core/docs/realtime/live-provider#subscribe) subscribe method.

### autoSave

If you want to save the form automatically after some delay when user edits the form, you can pass true to `autoSave.enabled` prop.

By default the `autoSave` feature does not invalidate queries. However, you can use the `invalidateOnUnmount` prop to invalidate queries upon unmount.

It also supports [`onMutationSuccess`](#onmutationsuccess) and [`onMutationError`](#onmutationerror) callback functions. You can use `isAutoSave` parameter to determine whether the mutation is triggered by `autoSave` or not.

`autoSave` feature operates exclusively in `edit` mode. Users can take advantage of this feature while editing data, as changes are automatically saved in editing mode. However, when creating new data, manual saving is still required.

`onMutationSuccess` and `onMutationError` callbacks will be called after the mutation is successful or failed.

#### enabled

To enable the `autoSave` feature, set the `enabled` parameter to `true`. By default, it is disabled.

```tsx
useForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
    },
  },
});
```

#### debounce

Set the debounce time for the `autoSave` prop. Default value is `1000` milliseconds.

```tsx
useForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      // highlight-next-line
      debounce: 2000,
    },
  },
});
```

#### onFinish

If you want to modify the data before sending it to the server, you can use `onFinish` callback function.

```tsx
useForm({
  refineCoreProps: {
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
  },
});
```

#### invalidateOnUnmount

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when hook is unmounted. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate.

By default, the `invalidateOnUnmount` prop is set to `false`.

```tsx
useForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      // highlight-next-line
      invalidateOnUnmount: true,
    },
  },
});
```

## Return Values

### query

If the `action` is set to `"edit"` or `"clone"` or if a `resource` with an `id` is provided, `useForm` will call [`useOne`](/core/docs/data/hooks/use-one) and set the returned values as the `query` property.

```tsx
const {
  refineCore: { query },
} = useForm();

const { data } = query;
```

### mutation

When in `"create"` or `"clone"` mode, `useForm` will call [`useCreate`](/core/docs/data/hooks/use-create). When in `"edit"` mode, it will call [`useUpdate`](/core/docs/data/hooks/use-update) and set the resulting values as the `mutation` property."

```tsx
const {
  refineCore: { mutation },
} = useForm();

const { data } = mutation;
```

### setId

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

### redirect

"By default, after a successful mutation, `useForm` will `redirect` to the `"list"` page. To redirect to a different page, you can either use the `redirect` function to programmatically specify the destination, or set the redirect [property](/core/docs/data/hooks/use-form/#redirect) in the hook's options.

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

### onFinish

`onFinish` is a function that is called when the form is submitted. It will call the appropriate mutation based on the `action` property.
You can override the default behavior by passing an `onFinish` function in the hook's options.

For example you can [change values before sending to the API](/core/docs/packages/react-hook-form/use-form/#how-can-i-change-the-form-data-before-submitting-it-to-the-api).

### saveButtonProps

It contains all the props needed by the "submit" button within the form (disabled, onClick etc.). When `saveButtonProps.onClick` is called, it triggers `handleSubmit`function with `onFinish`. You can manually pass these props to your custom button.

### formLoading

Loading state of a modal. It's `true` when `useForm` is currently being submitted or data is being fetched for the `"edit"` or `"clone"` mode.

### autoSaveProps

If `autoSave` is enabled, this hook returns `autoSaveProps` object with `data`, `error`, and `status` properties from mutation.

### ~~mutationResult~~ <PropTag deprecated />

This prop is deprecated and will be removed in the future versions. Use [`mutation`](#mutation) instead.

### ~~queryResult~~ <PropTag deprecated />

This prop is deprecated and will be removed in the future versions. Use [`query`](#query) instead.

## FAQ

### How can Invalidate other resources?

You can invalidate other resources with help of [`useInvalidate`](/core/docs/data/hooks/use-invalidate) hook.

It is useful when you want to `invalidate` other resources don't have relation with the current resource.

```tsx
import { useInvalidate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

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
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import { FieldValues } from "react-hook-form";

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

### How to pass `meta` values only for the mutation or query?

You can use `meta` property to pass common values to the mutation and the query. But in some cases, you may want to pass different values to the mutation and the query. To do this, you can use `mutationMeta` and `queryMeta` properties.

## API

### Properties

<PropsTable module="@refinedev/react-hook-form/useForm" />

> `*`: These properties have default values in `RefineContext` and can also be set on the **<[Refine](/core/docs/core/refine-component)>** component.

:::simple External Props

It also accepts all props of [useForm](https://react-hook-form.com/api/useform) hook available in the [React Hook Form](https://react-hook-form.com/).

:::

> For example, we can define the `refineCoreProps` property in the `useForm` hook as:

```tsx
import { useForm } from "@refinedev/react-hook-form";

const { ... } = useForm({
    ...,
    refineCoreProps: {
        resource: "posts",
        redirect: false,
        // You can define all properties provided by Refine useForm
    },
});
```

### Return values

Returns all the properties returned by [React Hook Form][react-hook-form] of the `useForm` hook. Also, we added the following return values:

`refineCore`: Returns all values returned by [`useForm`][use-form-core]. You can see all of them in [here](/core/docs/data/hooks/use-form/##return-values).

> For example, we can access the `refineCore` return value in the `useForm` hook as:

```tsx
import { useForm } from "@refinedev/react-hook-form";

const {
    refineCore: { query, ... },
} = useForm({ ... });
```

| Property        | Description               | Type                                                                                                                                    |
| --------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| saveButtonProps | Props for a submit button | `{ disabled: boolean; onClick: (e: React.BaseSyntheticEvent) => void; }`                                                                |
| autoSaveProps   | Auto save props           | `{ data: UpdateResponse<TData>` \| `undefined, error: HttpError` \| `null, status: "loading"` \| `"error"` \| `"idle"` \| `"success" }` |

### Type Parameters

| Property       | Description                                                                                                                                                         | Type                       | Default                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData   | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError         | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables     | Field Values for mutation function                                                                                                                                  | `{}`                       | `{}`                       |
| TContext       | Second generic type of the `useForm` of the React Hook Form.                                                                                                        | `{}`                       | `{}`                       |
| TData          | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |
| TResponse      | Result data returned by the mutation function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TData` will be used as the default value.        | [`BaseRecord`][baserecord] | `TData`                    |
| TResponseError | Custom error object that extends [`HttpError`][httperror]. If not specified, the value of `TError` will be used as the default value.                               | [`HttpError`][httperror]   | `TError`                   |

## Example

<CodeSandboxExample path="form-react-hook-form-use-form" />

[react-hook-form]: https://react-hook-form.com
[refine-react-hook-form]: https://github.com/refinedev/refine/tree/main/packages/react-hook-form
[use-form-core]: /core/docs/data/hooks/use-form/
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
[notification-provider]: /core/docs/notification/notification-provider
[get-one]: /core/docs/data/data-provider#getone-
[create]: /core/docs/data/data-provider#create-
[update]: /core/docs/data/data-provider#update-
[data-provider]: /core/docs/data/data-provider
