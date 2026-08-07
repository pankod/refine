---
title: "useUpdateMany Hook | Refine v4"
display_title: "useUpdateMany"
sidebar_label: "useUpdateMany"
description: "Learn how to update multiple records in a single mutation request in Refine v4 using useUpdateMany efficiently."
siderbar_label: useUpdateMany
source: packages/core/src/data/hooks/useUpdateMany.ts
---

`useUpdateMany` is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v4/docs/react/reference/useMutation). It supports all the features of `useMutation` and adds some extra features.

- It uses the `updateMany` method as the **mutation function** from the [`dataProvider`](/core/docs/data/data-provider) which is passed to `<Refine />`.

It is useful when you want to update many records at once.

If your data provider does not have a `updateMany` method, `useUpdateMany` will use the `update` method instead. It is not recommended, because it will make requests one by one for each id. It is better to implement the `updateMany` method in the data provider.

## Usage

The `useUpdateMany` hook returns many useful properties and methods. One of them is the `mutate` method which is used to trigger a mutation with the given [parameters](#mutation-parameters).

```tsx
import { useUpdateMany } from "@refinedev/core";

const { mutate } = useUpdateMany({
  resource: "products",
});

mutate({
  ids: [1, 2, 3],
  values: {
    name: "New Product",
    material: "Wood",
  },
});
```

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider).

When the `useUpdateMany` mutation runs successfully, it will call the `publish` method from `liveProvider` with some parameters such as `channel`, `type` etc. It is useful when you want to publish the changes to the subscribers on the client side.

## Invalidating Queries

When the `useUpdateMany` mutation runs successfully, by default it will invalidate the following queries from the current `resource`: `"list"`, `"many"`, and `"detail"`. That means, if you use `useList`, `useMany`, or `useOne` hooks on the same page, they will refetch the data after the mutation is completed. You can change this behavior by passing [`invalidates`](#invalidates) prop.

[Refer to the query invalidation documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/guides/query-invalidation)

## Properties

### mutationOptions

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

```tsx
useUpdateMany({
  mutationOptions: {
    retry: 3,
  },
  onSuccess: (data, variables, context) => {
    // Let's celebrate!
  },
  onError: (error, variables, context) => {
    // An error occurred!
  },
});
```

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useUpdateMany({
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

Mutation parameters are passed to the `mutate` function and can also be provided as props to the `useUpdateMany` hook. Parameters given to the `mutate` function override those from the hook. Think of the hook's parameters as default values, and the `mutate` function's parameters as specific or dynamic values for each mutation.

```tsx
import { useUpdateMany } from "@refinedev/core";

const { mutate } = useUpdateMany({
  /* parameters */
});

mutate({
  /* this will override the parameters given to the useUpdateMany hook */
});
```

> 🚨 Parameters marked as required can be provided either as props to the `useUpdateMany` hook or as parameters to the `mutate` function.

### resource <PropTag required />

It will be passed to the `updateMany` method from the `dataProvider` as a parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `updateMany` method. See the [creating a data provider](/core/docs/data/data-provider) section for an example of how resources are handled.

```tsx
const { mutate } = useUpdateMany();

mutate({
  resource: "categories",
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### ids <PropTag required />

It will be passed to the `updateMany` method from the `dataProvider` as a parameter. It is used to determine which records will be updated.

```tsx
const { mutate } = useUpdateMany();

mutate({
  ids: [1, 2, 3],
});
```

### values <PropTag required />

It will be passed to the `updateMany` method from the `dataProvider` as a parameter. The parameter is usually used as the data to be updated. It contains the new values of the record.

```tsx
const { mutate } = useUpdateMany();

mutate({
  values: {
    name: "New Category",
    description: "New Category Description",
  },
});
```

### mutationMode

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic`, and `undoable`. The default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

[Refer to the mutation mode documentation for more information &#8594](/core/docs/advanced-tutorials/mutation-mode)

```tsx
const { mutate } = useUpdateMany();

mutate({
  mutationMode: "undoable",
});
```

### undoableTimeout

When `mutationMode` is set to `undoable`, `undoableTimeout` is used to determine duration to wait before executing the mutation. Default value is `5000` milliseconds.

```tsx
const { mutate } = useUpdateMany();

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
import { useUpdateMany } from "@refinedev/core";

const MyComponent = () => {
  const { mutate } = useUpdateMany();
  const cancelRef = useRef<(() => void) | null>(null);

  const updateItems = () => {
    mutate({
      //...
      mutationMode: "undoable",
      onCancel: (cancelMutation) => {
        cancelRef.current = cancelMutation;
      },
    });
  };

  const cancelUpdate = () => {
    cancelRef.current?.();
  };

  return (
    <>
      <button onClick={updateItems}>Update</button>
      <button onClick={cancelUpdate}>Cancel</button>
    </>
  );
};
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

After data is fetched successfully, `useUpdateMany` can call the `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
const { mutate } = useUpdateMany();

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

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

After data fetching is failed, `useUpdateMany` will call the `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
const { mutate } = useUpdateMany();

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

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

In the following example, we pass the `headers` property in the `meta` object to the `updateMany` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
const { mutate } = useUpdateMany();

mutate({
  // highlight-start
  meta: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  updateMany: async ({
    resource,
    ids,
    variables,
    // highlight-next-line
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}`;

    //...
    //...

    // highlight-start
    const { data } = await httpClient.patch(
      url,
      { ids, variables },
      { headers },
    );
    // highlight-end

    return {
      data,
    };
  },
  //...
};
```

### dataProviderName

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
const { mutate } = useUpdateMany();

mutate({
  dataProviderName: "second-data-provider",
});
```

### invalidates

`invalidates` is used to specify which queries should be invalidated after the mutation is completed.

By default, it invalidates the following queries from the current `resource`: `"list"`, `"many"` and `"detail"`. That means, if you use `useList`, `useMany`, or `useOne` hooks on the same page, they will refetch the data after the mutation is completed.

```tsx
const { mutate } = useUpdateMany();

mutate({
  invalidates: ["list", "many", "detail"],
});
```

### optimisticUpdateMap

If the mutation mode is defined as `optimistic` or `undoable` the `useUpdate` hook will automatically update the cache without waiting for the response from the server. You may want to disable or customize this behavior. You can do this by passing the `optimisticUpdateMap` prop.

When the mutation mode is set to `optimistic` or `undoable`, the `useUpdate` hook will automatically update the cache without waiting for a server response. If you need to customize update logic, you can achieve it by using the `optimisticUpdateMap` prop.

`list`, `many` and `detail` are the keys of the `optimisticUpdateMap` object. To automatically update the cache, you should pass `true`. If you don't want to update the cache, you should pass `false`.

```tsx
const { mutate } = useUpdateMany();

mutate({
  //...
  mutationMode: "optimistic",
  optimisticUpdateMap: {
    list: true,
    many: true,
    detail: false,
  },
});
```

In the scenario mentioned above, the `list` and `many` queries will receive automatic cache updates, whereas the `detail` query cache will remain unaffected.

If you wish to customize the cache update, you have the option to provide functions for the `list`, `many`, and `detail` keys. These functions will be invoked with the `previous` data, `values`, and `id` parameters. Your responsibility is to return the updated data within these functions.

```tsx
const { mutate } = useUpdateMany();

mutate({
  //...
  mutationMode: "optimistic",
  optimisticUpdateMap: {
    // highlight-start
    optimisticUpdateMap: {
      list: (previous, values, ids) => {
        if (!previous) {
          return null;
        }

        const data = previous.data.map((record) => {
          if (
            record.id !== undefined &&
            ids
              .filter((id) => id !== undefined)
              .map(String)
              .includes(record.id.toString())
          ) {
            return {
              foo: "bar",
              ...record,
              ...values,
            };
          }

          return record;
        });

        return {
          ...previous,
          data,
        };
      },
      many: (previous, values, ids) => {
        if (!previous) {
          return null;
        }

        const data = previous.data.map((record) => {
          if (
            record.id !== undefined &&
            ids
              .filter((id) => id !== undefined)
              .map(String)
              .includes(record.id.toString())
          ) {
            return {
              foo: "bar",
              ...record,
              ...values,
            };
          }
          return record;
        });

        return {
          ...previous,
          data,
        };
      },
      detail: (previous, values, id) => {
        if (!previous) {
          return null;
        }

        const data = {
          id,
          ...previous.data,
          ...values,
          foo: `bar`,
        };

        return {
          ...previous,
          data,
        };
      },
    },
  },
  // highlight-end
});
```

## Return Values

Returns an object with TanStack Query's `useMutation` return values.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useUpdateMany();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

## API Reference

### Mutation Parameters

| Property                      | Description                                                                                        | Type                                                                                        | Default                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| resource <PropTag asterisk /> | Resource name for API data interactions                                                            | `string`                                                                                    |                                                              |
| ids <PropTag asterisk />      | id for mutation function                                                                           | [`BaseKey[]`](/core/docs/core/interface-references#basekey)                                 |                                                              |
| values <PropTag asterisk />   | Values for mutation function                                                                       | `TVariables`                                                                                | {}                                                           |
| mutationMode                  | [Determines when mutations are executed](/core/docs/advanced-tutorials/mutation-mode)              | ` "pessimistic` \| `"optimistic` \| `"undoable"`                                            | `"pessimistic"`\*                                            |
| undoableTimeout               | Duration to wait before executing the mutation when `mutationMode = "undoable"`                    | `number`                                                                                    | `5000ms`\*                                                   |
| onCancel                      | Provides a function to cancel the mutation when `mutationMode = "undoable"`                        | `(cancelMutation: () => void) => void`                                                      |                                                              |
| successNotification           | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Successfully updated `resource`"                            |
| errorNotification             | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Error when updating `resource` (status code: `statusCode`)" |
| meta                          | Meta data query for `dataProvider`                                                                 | [`MetaDataQuery`](/core/docs/core/interface-references#metaquery)                           | {}                                                           |
| dataProviderName              | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                    | `default`                                                    |
| invalidates                   | You can use it to manage the invalidations that will occur at the end of the mutation.             | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                                     | `["list", "many", "detail"]`                                 |

> `*`: These props have default values in `RefineContext` and can also be set on [`<Refine>`](/core/docs/core/refine-component) component. `useUpdateMany` will use what is passed to `<Refine>` as default but a local value will override it.

### Type Parameters

| Property   | Description                                                                                          | Type                                                            | Default                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/core/interface-references#httperror)       | [`HttpError`](/core/docs/core/interface-references#httperror)   | [`HttpError`](/core/docs/core/interface-references#httperror)   |
| TVariables | Values for mutation function                                                                         | `{}`                                                            | `{}`                                                            |

### Return value

| Description                                | Type                                                                                                                                                                                      |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's useMutation | [`UseMutationResult<{ data: TData }, TError, { resource:string; ids: BaseKey[]; values: TVariables; }, UpdateContext>`](https://tanstack.com/query/v4/docs/react/reference/useMutation)\* |
| overtime                                   | `{ elapsedTime?: number }`                                                                                                                                                                |

> `*` `UpdateContext` is an internal type.
