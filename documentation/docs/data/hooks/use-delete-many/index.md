---
title: "useDeleteMany Hook | Usage & Patterns in Refine v5"
display_title: "useDeleteMany"
sidebar_label: "useDeleteMany"
description: "Integrate Use Delete Many in Refine v5. Learn best practices. Learn scale mutation and data for custom APIs and scalable data flows."
siderbar_label: useDeleteMany
source: packages/core/src/data/hooks/useDeleteMany.ts
---

`useDeleteMany` is used when you want to delete multiple records at once. It is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v5/docs/react/reference/useMutation) and not only supports all features of the mutation but also adds some extra features.

It uses the `deleteMany` method as the **mutation function** from the [`dataProvider`](/core/docs/data/data-provider/) which is passed to `<Refine>`.

If your data provider does not have a `deleteMany` method, `useDeleteMany` will use the `deleteOne` method instead. This is not recommended since it will make requests one by one for each id.

It is better to implement the `deleteMany` method in the data provider.

## Usage

The `useDeleteMany` hook returns many useful properties and methods. One of them is the `mutate` method which expects `resource` and `ids` as parameters. These parameters will be passed to the `deleteMany` method from the `dataProvider` as parameters. Additionally, the `mutation` object contains all the TanStack Query's `useMutation` return values.

```tsx
import { useDeleteMany } from "@refinedev/core";

const { mutate, mutation } = useDeleteMany();

mutate({
  resource: "products",
  ids: [1, 2, 3],
});

// You can access mutation state through the mutation object:
console.log(mutation.isPending); // mutation loading state
console.log(mutation.data); // mutation response data
console.log(mutation.error); // mutation error
```

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider/).

When the `useDeleteMany` mutation runs successfully, it will call the `publish` method from `liveProvider` with some parameters such as `channel`, `type` etc. This is useful when you want to publish the changes to the subscribers on the client side.

## Invalidating Queries

When the `useDeleteMany` mutation runs successfully, it will invalidate the following queries from the current `resource`: `"list"` and `"many"` by default. Which means that, if you use `useList` or `useMany` hooks on the same page, they will refetch the data after the mutation is completed. You can change this behavior by passing [`invalidates`](#invalidates) prop.

> For more information, refer to the [invalidation documentation &#8594](https://tanstack.com/query/v5/docs/react/guides/query-invalidation)

## Properties

### mutationOptions

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v5/docs/react/reference/useMutation)

```tsx
useDeleteMany({
  mutationOptions: {
    retry: 3,
  },
});
```

`mutationOptions` does not support `onSuccess` and `onError` props because they override the default `onSuccess` and `onError` functions. If you want to use these props, you can pass them to mutate functions like this:

```tsx
const { mutate, mutation } = useDeleteMany();

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

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useDeleteMany({
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

## Mutation Parameters

### resource <PropTag required />

This parameter will be passed to the `deleteMany` method from the `dataProvider` as a parameter. It is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `deleteMany` method.

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  resource: "categories",
});
```

> For more information, refer to the [creating a data provider tutorial &#8594](/core/docs/data/data-provider/)

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### ids <PropTag required />

This parameter will be passed to the `deleteMany` method from the `dataProvider` as a parameter. It is used to determine which records to deleted.

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  ids: [1, 2, 3],
});
```

### mutationMode

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic`, and `undoable`. The default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

> For more information, refer to the [mutation mode documentation &#8594](/core/docs/advanced-tutorials/mutation-mode/)

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  mutationMode: "undoable",
});
```

### undoableTimeout

When `mutationMode` is set to `undoable`, `undoableTimeout` is used to determine the duration to wait before executing the mutation. The default value is `5000` milliseconds.

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  mutationMode: "undoable",
  undoableTimeout: 10000,
});
```

### onCancel

The `onCancel` property can be utilized when the `mutationMode` is set to `"undoable"`. It provides a function that can be used to cancel the ongoing mutation.

By defining `onCancel`, undoable notification will not be shown automatically. This gives you the flexibility to handle the cancellation process in your own way, such as showing a custom notification or implementing any other desired behavior to allow users to cancel the mutation.

```tsx
import { useRef } from "react";
import { useDeleteMany } from "@refinedev/core";

const MyComponent = () => {
  const { mutate, mutation } = useDeleteMany();
  const cancelRef = useRef<(() => void) | null>(null);

  const deleteItems = () => {
    mutate({
      //...
      mutationMode: "undoable",
      onCancel: (cancelMutation) => {
        cancelRef.current = cancelMutation;
      },
    });
  };

  const cancelDelete = () => {
    cancelRef.current?.();
  };

  return (
    <>
      <button onClick={deleteItems}>Delete</button>
      <button onClick={cancelDelete}>Cancel</button>
    </>
  );
};
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

This prop allows you to customize the success notification that shows up when the data is fetched successfully and `useDeleteMany` calls `open` function from `NotificationProvider`:

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  successNotification: (data, ids, resource) => {
    return {
      message: `${data.title} Successfully fetched.`,
      description: "Success with no errors",
      type: "success",
    };
  },
});
```

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

This prop allows you to customize the error notification that shows up when the data fetching fails and the `useDeleteMany` calls `open` function from `NotificationProvider`:

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  errorNotification: (data, ids, resource) => {
    return {
      message: `Something went wrong when getting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `meta` object to the `deleteMany` method. You can pass any properties to specifically handle the data provider methods with similar logic.

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  // highlight-start
  meta: {
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
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
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

> For more information, refer to the [`meta` section of the General Concepts documentation&#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

### dataProviderName

This prop allows you to specify which `dataProvider` if you have more than one. Just pass it like in the example:

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  dataProviderName: "second-data-provider",
});
```

### invalidates

`invalidates` is used to specify which queries should be invalidated after the mutation is completed.

By default, it invalidates the following queries from the current `resource`: `"list"` and `"many"`. That means, if you use `useList` or `useMany` hooks on the same page, they will refetch the data after the mutation is completed.

```tsx
const { mutate, mutation } = useDeleteMany();

mutate({
  invalidates: ["list", "many", "detail"],
});
```

## Return Values

Returns an object with TanStack Query's `useMutation` return values.

> For more information, refer to the [`useMutation` documentation &#8594](https://tanstack.com/query/v5/docs/react/reference/useMutation)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useDeleteMany();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

## API Reference

### Mutation Parameters

| Property                      | Description                                                                                        | Type                                                                                        | Default                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| resource <PropTag asterisk /> | Resource name for API data interactions                                                            | `string`                                                                                    |                                                              |
| ids <PropTag asterisk />      | ids for mutation function                                                                          | [`BaseKey[]`](/core/docs/core/interface-references#basekey)                                 |                                                              |
| mutationMode                  | [Determines when mutations are executed](/core/docs/advanced-tutorials/mutation-mode/)             | ` "pessimistic` \| `"optimistic` \| `"undoable"`                                            | `"pessimistic"`\*                                            |
| undoableTimeout               | Duration to wait before executing the mutation when `mutationMode = "undoable"`                    | `number`                                                                                    | `5000ms`\*                                                   |
| onCancel                      | Provides a function to cancel the mutation when `mutationMode = "undoable"`                        | `(cancelMutation: () => void) => void`                                                      |                                                              |
| successNotification           | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Successfully deleted `resource`"                            |
| errorNotification             | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Error when updating `resource` (status code: `statusCode`)" |
| meta                          | Meta data query for `dataProvider`                                                                 | [`MetaDataQuery`](/core/docs/core/interface-references#metaquery)                           | {}                                                           |
| dataProviderName              | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                    | `default`                                                    |
| invalidates                   | You can use it to manage the invalidations that will occur at the end of the mutation.             | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                                     | `["list", "many"]`                                           |

:::simple Global Configuration

These props have default values in `RefineContext` and can also be set on [`<Refine>`](/core/docs/core/refine-component/) component. `useDeleteMany` will use what is passed to `<Refine>` as default but a local value will override it.

:::

### Type Parameters

| Property   | Description                                                                                          | Type                                                            | Default                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/core/interface-references#httperror)       | [`HttpError`](/core/docs/core/interface-references#httperror)   | [`HttpError`](/core/docs/core/interface-references#httperror)   |
| TVariables | Values for mutation function                                                                         | `{}`                                                            | `{}`                                                            |

### Return value

| Property    | Description                                | Type                                                                                                                                                                   |
| ----------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mutation    | Result of the TanStack Query's useMutation | [`UseMutationResult<{ data: TData }, TError, { resource: string; ids: BaseKey[]; }, DeleteContext>`](https://tanstack.com/query/v5/docs/react/reference/useMutation)\* |
| mutate      | Mutation function                          | `(params?: { resource?: string, ids?: BaseKey[], ... }) => void`                                                                                                       |
| mutateAsync | Async mutation function                    | `(params?: { resource?: string, ids?: BaseKey[], ... }) => Promise<{ data: TData }>`                                                                                   |
| overtime    | Overtime loading information               | `{ elapsedTime?: number }`                                                                                                                                             |
