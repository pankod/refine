---
title: useDeleteMany
siderbar_label: useDeleteMany
source: packages/core/src/data/hooks/useDeleteMany.ts
---

`useDeleteMany` is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v4/docs/react/reference/useMutation). It supports all the features of `useMutation` and adds some extra features.

- It uses the `deleteMany` method as the **mutation function** from the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider/) which is passed to `<Refine>`.

It is useful when you want to delete multiple records at once.

:::caution
If your data provider does not have a `deleteMany` method, `useDeleteMany` will use the `deleteOne` method instead. It is not recommended, because it will make requests one by one for each id. It is better to implement the `deleteMany` method in the data provider.
:::

## Basic Usage

The `useDeleteMany` hook returns many useful properties and methods. One of them is the `mutate` method which expects `resource` and `ids` as parameters. These parameters will be passed to the `deleteMany` method from the `dataProvider` as parameters.

```tsx
import { useDeleteMany } from "@pankod/refine-core";

const { mutate } = useDeleteMany();

mutate({
  resource: "products",
  ids: [1, 2, 3],
});
```

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useDeleteMany` mutation runs successfully, it will call the `publish` method from `liveProvider` with some parameters such as `channel`, `type` etc. It is useful when you want to publish the changes to the subscribers on the client side.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Invalidating Queries

When the `useDeleteMany` mutation runs successfully, by default it will invalidate the following queries from the current `resource`: `"list"` and `"many"`. That means, if you use `useList` or `useMany` hooks on the same page, they will refetch the data after the mutation is completed. You can change this behavior by passing [`invalidates`](#invalidates) prop.

[Refer to the query invalidation documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/guides/query-invalidation)

## Properties

### `mutationOptions`

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

```tsx
useDeleteMany({
  mutationOptions: {
    retry: 3,
  },
});
```

:::tip

`mutationOptions` does not support `onSuccess` and `onError` props because they override the default `onSuccess` and `onError` functions. If you want to use these props, you can pass them to mutate functions like this:

```tsx
const { mutate } = useDeleteMany();

mutate(
  {
    resource: "products",
    ids: [1, 2, 3],
  },
  {
    onError: (error, variables, context) => {
      // An error occurred!
    },
    onSuccess: (data, variables, context) => {
      // Let's celebrate!
    },
  },
);
```

:::

## Mutation Parameters

### `resource` <PropTag required />

It will be passed to the `deleteMany` method from the `dataProvider` as a parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `deleteMany` method. See the [creating a data provider](/core/docs/3.xx.xx/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how resources are handled.

```tsx
const { mutate } = useDeleteMany();

mutate({
  resource: "categories",
});
```

### `ids` <PropTag required />

It will be passed to the `deleteMany` method from the `dataProvider` as a parameter. It is used to determine which records will be deleted.

```tsx
const { mutate } = useDeleteMany();

mutate({
  ids: [1, 2, 3],
});
```

### `mutationMode`

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic`, and `undoable`. The default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

[Refer to the mutation mode documentation for more information &#8594](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode)

```tsx
const { mutate } = useDeleteMany();

mutate({
  mutationMode: "undoable",
});
```

### `undoableTimeout`

When `mutationMode` is set to `undoable`, `undoableTimeout` is used to determine the duration to wait before executing the mutation. The default value is `5000` milliseconds.

```tsx
const { mutate } = useDeleteMany();

mutate({
  mutationMode: "undoable",
  undoableTimeout: 10000,
});
```

### `onCancel`

When `mutationMode` is set to `undoable`, `onCancel` is used to determine what to do when the user cancels the mutation.

```tsx
const { mutate } = useDeleteMany();

mutate({
  mutationMode: "undoable",
  onCancel: (cancelMutation) => {
    cancelMutation();
    // you can do something else here
  },
});
```

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useDeleteMany` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
const { mutate } = useDeleteMany();

mutate({
  successNotification: (data, values, resource) => {
    return {
      message: `${data.title} Successfully fetched.`,
      description: "Success with no errors",
      type: "success",
    };
  },
});
```

### `errorNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data fetching is failed, `useDeleteMany` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
const { mutate } = useDeleteMany();

mutate({
  errorNotification: (data, values, resource) => {
    return {
      message: `Something went wrong when getting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

### `metaData`

[`metaData`](/core/docs/3.xx.xx/api-reference/general-concepts/#metadata) is used following two purposes:

- To pass additional information to data provider methods.
- Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/core/docs/3.xx.xx/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `deleteMany` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
const { mutate } = useDeleteMany();

mutate({
  // highlight-start
  metaData: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  deleteMany: async ({
    resource,
    ids,
    // highlight-next-line
    metaData,
  }) => {
    // highlight-next-line
    const headers = metaData?.headers ?? {};
    const url = `${apiUrl}/${resource}`;

    //...
    //...

    // highlight-start
    const { data } = await httpClient.delete(url, { ids }, { headers });
    // highlight-end

    return {
      data,
    };
  },
  //...
};
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
const { mutate } = useDeleteMany();

mutate({
  dataProviderName: "second-data-provider",
});
```

### `invalidates`

`invalidates` is used to specify which queries should be invalidated after the mutation is completed.

By default, it invalidates the following queries from the current `resource`: `"list"` and `"many"`. That means, if you use `useList` or `useMany` hooks on the same page, they will refetch the data after the mutation is completed.

```tsx
const { mutate } = useDeleteMany();

mutate({
  invalidates: ["list", "many", "detail"],
});
```

## Return Values

Returns an object with TanStack Query's `useMutation` return values.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

## API

### Mutation Parameters

| Property                                                                                            | Description                                                                                        | Type                                                                                                    | Default                                                      |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name for API data interactions                                                            | `string`                                                                                                |                                                              |
| ids <div className=" required">Required</div>                                                       | ids for mutation function                                                                          | [`BaseKey[]`](/core/docs/3.xx.xx/api-reference/core/interfaces#basekey)                                 |                                                              |
| mutationMode                                                                                        | [Determines when mutations are executed](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode)      | ` "pessimistic` \| `"optimistic` \| `"undoable"`                                                        | `"pessimistic"`\*                                            |
| undoableTimeout                                                                                     | Duration to wait before executing the mutation when `mutationMode = "undoable"`                    | `number`                                                                                                | `5000ms`\*                                                   |
| onCancel                                                                                            | Callback that runs when undo button is clicked on `mutationMode = "undoable"`                      | `(cancelMutation: () => void) => void`                                                                  |                                                              |
| successNotification                                                                                 | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/3.xx.xx/api-reference/core/interfaces#successerrornotification) | "Successfully deleted `resource`"                            |
| errorNotification                                                                                   | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/3.xx.xx/api-reference/core/interfaces#successerrornotification) | "Error when updating `resource` (status code: `statusCode`)" |
| metaData                                                                                            | Metadata query for `dataProvider`                                                                  | [`MetaDataQuery`](/core/docs/3.xx.xx/api-reference/core/interfaces#metadataquery)                       | {}                                                           |
| dataProviderName                                                                                    | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                                | `default`                                                    |
| invalidates                                                                                         | You can use it to manage the invalidations that will occur at the end of the mutation.             | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                                                 | `["list", "many"]`                                           |

> `*`: These props have default values in `RefineContext` and can also be set on [`<Refine>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config) component. `useDeleteMany` will use what is passed to `<Refine>` as default but a local value will override it.

<br/>

### Type Parameters

| Property   | Desription                                                                                                       | Type                                                                        | Default                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)       | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   |
| TVariables | Values for mutation function                                                                                     | `{}`                                                                        | `{}`                                                                        |

### Return value

| Description                                | Type                                                                                                                                                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's useMutation | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; ids: BaseKey[]; },`<br/>` DeleteContext>`](https://tanstack.com/query/v4/docs/react/reference/useMutation)\* |
