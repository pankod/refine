---
title: "useDelete Hook | Refine v4"
display_title: "useDelete"
sidebar_label: "useDelete"
description: "Learn how single record deletion works in Refine v4 using useDelete, including mutation lifecycle, callbacks, and cache updates."
siderbar_label: useDelete
source: packages/core/src/data/hooks/useDelete.ts
---

`useDelete` is used when you want to delete a record. It is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v4/docs/react/reference/useMutation) and not only supports all features of the mutation but also adds some extra features.

It uses the `deleteOne` method as the **mutation function** from the [`dataProvider`](/core/docs/data/data-provider) which is passed to `<Refine>`.

## Usage

The `useDelete` hook returns many useful properties and methods. One of them is the `mutate` method which expects `resource` and `id` as parameters. These parameters will be passed to the `deleteOne` method from the `dataProvider` as parameters.

```tsx
import { useDelete } from "@refinedev/core";

const { mutate } = useDelete();

mutate({
  resource: "products",
  id: 1,
});
```

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider).

When the `useDelete` mutation runs successfully, it will call the `publish` method from `liveProvider` with some parameters such as `channel`, `type` etc. This is useful when you want to publish the changes to the subscribers on the client side.

## Invalidating Queries

When the `useDelete` mutation runs successfully, it will invalidate the following queries from the current `resource`: `"list"` and `"many"` by default. Which means that, if you use `useList` or `useMany` hooks on the same page, they will refetch the data after the mutation is completed. You can change this behavior by passing [`invalidates`](#invalidates) prop.

> For more information, refer to the [invalidation documentation &#8594](https://tanstack.com/query/v4/docs/react/guides/query-invalidation)

## Audit Logs

> This feature is only available if you use a [Audit Log Provider](/core/docs/audit-logs/audit-log-provider).

When the `useDelete` mutation runs successfully, it will call the `log` method from `auditLogProvider` with some parameters such as `resource`, `action`, `data`, `previousData` etc. This is useful when you want to log the changes to the database.

## Properties

### mutationOptions

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

```tsx
useDelete({
  mutationOptions: {
    retry: 3,
  },
});
```

`mutationOptions` does not support `onSuccess` and `onError` props because they override the default `onSuccess` and `onError` functions. If you want to use these props, you can pass them to mutate functions like this:

```tsx
const { mutate } = useDelete();

mutate(
  {
    resource: "products",
    id: 1,
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
const { overtime } = useDelete({
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

This parameter will be passed to the `deleteOne` method from the `dataProvider` as a parameter. It is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `deleteOne` method.

```tsx
const { mutate } = useDelete();

mutate({
  resource: "categories",
});
```

> For more information, refer to the [creating a data provider tutorial &#8594](/core/docs/data/data-provider)

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### id <PropTag required />

This parameter will be passed to the `deleteOne` method from the `dataProvider` as a parameter. It is used to determine which record to delete.

```tsx
const { mutate } = useDelete();

mutate({
  id: 123,
});
```

### mutationMode

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic`, and `undoable`. The default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

> For more information, refer to the [mutation mode documentation &#8594](/core/docs/advanced-tutorials/mutation-mode)

```tsx
const { mutate } = useDelete();

mutate({
  mutationMode: "undoable",
});
```

### undoableTimeout

When `mutationMode` is set to `undoable`, `undoableTimeout` is used to determine the duration to wait before executing the mutation. The default value is `5000` milliseconds.

```tsx
const { mutate } = useDelete();

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
import { useDelete } from "@refinedev/core";

const MyComponent = () => {
  const { mutate } = useDelete();
  const cancelRef = useRef<(() => void) | null>(null);

  const deleteItem = () => {
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
      <button onClick={deleteItem}>Delete</button>
      <button onClick={cancelDelete}>Cancel</button>
    </>
  );
};
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

This prop allows you to customize the success notification that shows up when the data is fetched successfully and `useDelete` calls the `open` function from `NotificationProvider`:

```tsx
const { mutate } = useDelete();

mutate({
  successNotification: (data, id, resource) => {
    return {
      message: `${data.title} Successfully fetched.`,
      description: "Success with no errors",
      type: "success",
    };
  },
});
```

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

This prop allows you to customize the error notification that shows up when the data fetching fails and the `useDelete` calls the `open` function from `NotificationProvider`:

```tsx
const { mutate } = useDelete();

mutate({
  errorNotification: (data, id, resource) => {
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

In the following example, we pass the `headers` property in the `meta` object to the `deleteOne` method. You can pass any properties to specifically handle the data provider methods with similar logic.

```tsx
const { mutate } = useDelete();

mutate({
  // highlight-start
  meta: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  deleteOne: async ({
    resource,
    id,
    // highlight-next-line
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}/${id}`;

    //...
    //...

    // highlight-next-line
    const { data } = await httpClient.delete(url, undefined, { headers });

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
const { mutate } = useDelete();

mutate({
  dataProviderName: "second-data-provider",
});
```

### invalidates

`invalidates` is used to specify which queries should be invalidated after the mutation is completed.

By default, it invalidates the following queries from the current `resource`: `"list"` and `"many"`. That means, if you use `useList` or `useMany` hooks on the same page, they will refetch the data after the mutation is completed.

```tsx
const { mutate } = useDelete();

mutate({
  invalidates: ["list", "many"],
});
```

## Return Values

Returns an object with TanStack Query's `useMutation` return values.

> For more information, refer to the [`useMutation` documentation &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useDelete();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

## API Reference

### Mutation Parameters

| Property                      | Description                                                                                        | Type                                                                                        | Default                             |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------- |
| resource <PropTag asterisk /> | Resource name for API data interactions                                                            | `string`                                                                                    |                                     |
| id <PropTag asterisk />       | id for mutation function                                                                           | [`BaseKey`](/core/docs/core/interface-references#basekey)                                   |                                     |
| mutationMode                  | [Determines when mutations are executed](/core/docs/advanced-tutorials/mutation-mode)              | ` "pessimistic` \| `"optimistic` \| `"undoable"`                                            | `"pessimistic"`\*                   |
| undoableTimeout               | Duration to wait before executing the mutation when `mutationMode = "undoable"`                    | `number`                                                                                    | `5000ms`\*                          |
| onCancel                      | Provides a function to cancel the mutation when `mutationMode = "undoable"`                        | `(cancelMutation: () => void) => void`                                                      |                                     |
| successNotification           | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Successfully deleted a `resource`" |
| errorNotification             | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Error (status code: `status`"      |
| meta                          | Meta data query for `dataProvider`                                                                 | [`MetaDataQuery`](/core/docs/core/interface-references#metaquery)                           | {}                                  |
| dataProviderName              | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                    | `default`                           |
| invalidates                   | You can use it to manage the invalidations that will occur at the end of the mutation.             | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                                     | `["list", "many"]`                  |

:::simple Global Configuration

These props have default values in `RefineContext` and can also be set on [`<Refine>`](/core/docs/core/refine-component) component. `useDelete` will use what is passed to `<Refine>` as default but a local value will override it.

:::

### Type Parameters

| Property   | Description                                                                                          | Type                                                            | Default                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/core/interface-references#httperror)       | [`HttpError`](/core/docs/core/interface-references#httperror)   | [`HttpError`](/core/docs/core/interface-references#httperror)   |
| TVariables | Values for mutation function                                                                         | `{}`                                                            | `{}`                                                            |

### Return value

| Description                                | Type                                                                                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's useMutation | [`UseMutationResult<{ data: TData }, TError, { id: BaseKey; }, DeleteContext>`](https://tanstack.com/query/v4/docs/react/reference/useMutation) |
| overtime                                   | `{ elapsedTime?: number }`                                                                                                                      |
