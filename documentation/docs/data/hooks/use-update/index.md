---
title: "useUpdate Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useUpdate"
sidebar_label: "useUpdate"
description: "Build Use Update in Refine v5. Learn the key steps. Explore best practices to scale REST, GraphQL for custom APIs and scalable data flows."
siderbar_label: useUpdate
source: packages/core/src/data/hooks/useUpdate.ts
---

`useUpdate` is used when you want to update a record. It is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v5/docs/react/reference/useMutation) that supports all of its features and adds some more.

It uses the `update` method as the **mutation function** from the [`dataProvider`](/core/docs/data/data-provider/) which is passed to `<Refine>`.

## Usage

The `useUpdate` hook returns many useful properties and methods. One of them is the `mutate` method which is used to trigger a mutation with the given [parameters](#mutation-parameters). Additionally, the `mutation` object contains all the TanStack Query's `useMutation` return values.

```tsx
import { useUpdate } from "@refinedev/core";

const { mutate, mutation } = useUpdate({
  resource: "products",
});

mutate({
  id: 1,
  values: {
    name: "New Product",
    material: "Wood",
  },
});

// You can access mutation state through the mutation object:
console.log(mutation.isPending); // mutation loading state
console.log(mutation.data); // mutation response data
console.log(mutation.error); // mutation error
```

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider/).

When the `useUpdate` mutation runs successfully, it will call the `publish` method from `liveProvider` with some parameters such as `channel`, `type` etc. It is useful when you want to publish the changes to the subscribers on the client side.

## Invalidating Queries

When the `useUpdate` mutation runs successfully, it will invalidate the following queries from the current `resource`: `"list"`, `"many"`, and `"detail"` by default. Which means that, if you use `useList`, `useMany`, or `useOne` hooks on the same page, they will refetch the data after the mutation is completed. You can change this behavior by passing the [`invalidates`](#invalidates) prop.

> For more information, refer to the [query invalidation documentation&#8594](https://tanstack.com/query/v5/docs/react/guides/query-invalidation)

## Audit Logs

> This feature is only available if you use a [Audit Log Provider](/core/docs/audit-logs/audit-log-provider/).

When the `useUpdate` mutation runs successfully, it will call the `log` method from `auditLogProvider` with some parameters such as `resource`, `action`, `data`, `previousData` etc. It is useful when you want to log the changes to the database.

## Properties

### mutationOptions

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

```tsx
const { mutate, mutation } = useUpdate({
  resource: "products",
  id: 1,
  mutationOptions: {
    retry: 3,
    onSuccess: (data, variables, context) => {
      // Let's celebrate!
    },
    onError: (error, variables, context) => {
      // An error occurred!
    },
  },
});

mutate({
  values: {
    name: "New Product",
    material: "Wood",
  },
});

// You can access mutation status through the mutation object
if (mutation.isPending) {
  console.log("Updating product...");
}

if (mutation.isSuccess) {
  console.log("Product updated:", mutation.data);
}
```

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v5/docs/react/reference/useMutation)

## Mutation Parameters

Mutation parameters are passed to the `mutate` function and can also be provided as props to the `useUpdate` hook. Parameters given to the `mutate` function override those from the hook. Think of the hook's parameters as default values, and the `mutate` function's parameters as specific or dynamic values for each mutation.

```tsx
import { useUpdate } from "@refinedev/core";

const { mutate, mutation } = useUpdate({
  /* parameters */
});

mutate({
  /* this will override the parameters given to the useUpdate hook */
});

// Access mutation state
if (mutation.isPending) {
  // Handle loading state
}

if (mutation.isError) {
  // Handle error state
  console.error(mutation.error);
}
```

> 🚨 Parameters marked as required can be provided either as props to the `useUpdate` hook or as parameters to the `mutate` function.

### resource <PropTag required />

This parameter will be passed to the `update` method from the `dataProvider` as a parameter. It is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `update` method.

```tsx
const { mutate, mutation } = useUpdate();

mutate({
  resource: "categories",
});
```

> For more information, refer to the [creating a data provider tutorial &#8594](/core/docs/data/data-provider/)

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### id <PropTag required />

This prop will be passed to the `update` method from the `dataProvider` as a parameter. It is used to determine which record to update.

```tsx
const { mutate, mutation } = useUpdate();

mutate({
  id: 123,
});
```

### values <PropTag required />

This prop will be passed to the `update` method from the `dataProvider` as a parameter. It is usually used as the data to be updated and contains the data that will be sent to the server.

```tsx
const { mutate, mutation } = useUpdate();

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

```tsx
const { mutate, mutation } = useUpdate();

mutate({
  mutationMode: "undoable",
});
```

> For more information, refer to the [mutation mode documentation &#8594](/core/docs/advanced-tutorials/mutation-mode/)

### undoableTimeout

When `mutationMode` is set to `undoable`, `undoableTimeout` is used to determine the duration to wait before executing the mutation. The default value is `5000` milliseconds.

```tsx
const { mutate, mutation } = useUpdate();

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
import { useUpdate } from "@refinedev/core";

const MyComponent = () => {
  const { mutate, mutation } = useUpdate();
  const cancelRef = useRef<(() => void) | null>(null);

  const updateItem = () => {
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
      <button onClick={updateItem}>Update</button>
      <button onClick={cancelUpdate}>Cancel</button>
    </>
  );
};
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

This prop allows you to customize the success notification that shows up when the data is fetched successfully and `useUpdate` can calls `open` function from `NotificationProvider`:

```tsx
const { mutate, mutation } = useUpdate();

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

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

This prop allows you to customize the error notification that shows up when the data fetching fails and the `useUpdate` calls the `open` function from `NotificationProvider`:

```tsx
const { mutate, mutation } = useUpdate();

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

In the following example, we pass the `headers` property in the `meta` object to the `update` method. You can pass any properties to specifically handle the data provider methods with similar logic.

```tsx
const { mutate, mutation } = useUpdate();

mutate({
  // highlight-start
  meta: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  update: async ({
    resource,
    id,
    variables,
    // highlight-next-line
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}/${id}`;

    //...
    //...

    // highlight-next-line
    const { data } = await httpClient.patch(url, variables, { headers });

    return {
      data,
    };
  },
  //...
};
```

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

### dataProviderName

This prop allows you to specify which `dataProvider` if you have more than one. Just pass it like in the example:

```tsx
const { mutate, mutation } = useUpdate();

mutate({
  dataProviderName: "second-data-provider",
});
```

### invalidates

`invalidates` is used to specify which queries should be invalidated after the mutation is completed.

By default, it invalidates the following queries from the current `resource`: `"list"`, `"many"` and `"detail"`. That means, if you use `useList`, `useMany`, or `useOne` hooks on the same page, they will refetch the data after the mutation is completed.

```tsx
const { mutate, mutation } = useUpdate();

mutate({
  invalidates: ["list", "many", "detail"],
});
```

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime, mutation } = useUpdate({
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
  overtime.elapsedTime >= 4000 && (
    <div>this takes a bit longer than expected</div>
  );
}
```

### optimisticUpdateMap

If the mutation mode is defined as `optimistic` or `undoable` the `useUpdate` hook will automatically update the cache without waiting for the response from the server. You may want to disable or customize this behavior. You can do this by passing the `optimisticUpdateMap` prop.

When the mutation mode is set to `optimistic` or `undoable`, the `useUpdate` hook will automatically update the cache without waiting for a server response. If you need to customize update logic, you can achieve it by using the `optimisticUpdateMap` prop.

`list`, `many` and `detail` are the keys of the `optimisticUpdateMap` object. To automatically update the cache, you should pass `true`. If you don't want to update the cache, you should pass `false`.

```tsx
const { mutate, mutation } = useUpdate();

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
const { mutate, mutation } = useUpdate();

mutate({
  //...
  mutationMode: "optimistic",
  // highlight-start
  optimisticUpdateMap: {
    list: (previous, values, id) => {
      if (!previous) {
        return null;
      }

      const data = previous.data.map((record) => {
        if (record.id === id) {
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
    many: (previous, values, id) => {
      if (!previous) {
        return null;
      }

      const data = previous.data.map((record) => {
        if (record.id === id) {
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
    detail: (previous, values) => {
      if (!previous) {
        return null;
      }

      return {
        ...previous,
        data: {
          foo: "bar",
          ...previous.data,
          ...values,
        },
      };
    },
  },
  // highlight-end
});
```

## Return Values

Returns an object with `mutation`, `mutate`, `mutateAsync`, and `overtime` properties.

The `mutation` property contains all TanStack Query's `useMutation` return values.

> For more information, refer to the [`useMutation` documentation &#8594](https://tanstack.com/query/v5/docs/react/reference/useMutation)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime, mutation } = useUpdate();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...

// Also access mutation state
console.log(mutation.isPending); // true/false
```

## API Reference

### Mutation Parameters

| Property                      | Description                                                                                        | Type                                                                                        | Default                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| resource <PropTag asterisk /> | Resource name for API data interactions                                                            | `string`                                                                                    |                                                              |
| id <PropTag asterisk />       | id for mutation function                                                                           | [`BaseKey`](/core/docs/core/interface-references#basekey)                                   |                                                              |
| values <PropTag asterisk />   | Values for mutation function                                                                       | `TVariables`                                                                                | {}                                                           |
| mutationMode                  | [Determines when mutations are executed](/core/docs/advanced-tutorials/mutation-mode/)             | ` "pessimistic` \| `"optimistic` \| `"undoable"`                                            | `"pessimistic"`\*                                            |
| undoableTimeout               | Duration to wait before executing the mutation when `mutationMode = "undoable"`                    | `number`                                                                                    | `5000ms`\*                                                   |
| onCancel                      | Provides a function to cancel the mutation when `mutationMode = "undoable"`                        | `(cancelMutation: () => void) => void`                                                      |                                                              |
| successNotification           | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Successfully updated `resource`"                            |
| errorNotification             | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Error when updating `resource` (status code: `statusCode`)" |
| meta                          | Meta data query for `dataProvider`                                                                 | [`MetaDataQuery`](/core/docs/core/interface-references#metaquery)                           | {}                                                           |
| dataProviderName              | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                    | `default`                                                    |
| invalidates                   | You can use it to manage the invalidations that will occur at the end of the mutation.             | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                                     | `["list", "many", "detail"]`                                 |

:::simple Global Configuration

These props have default values in `RefineContext` and can also be set on [`<Refine>`](/core/docs/core/refine-component/) component. `useUpdate` will use what's passed to `<Refine>` as default, but a local value will override it.

:::

<br/>

### Type Parameters

| Property   | Description                                                                                          | Type                                                            | Default                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/core/interface-references#httperror)       | [`HttpError`](/core/docs/core/interface-references#httperror)   | [`HttpError`](/core/docs/core/interface-references#httperror)   |
| TVariables | Values for mutation function                                                                         | `{}`                                                            | `{}`                                                            |

### Return value

| Property    | Description                                | Type                                                                                                                                                                                   |
| ----------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mutation    | Result of the TanStack Query's useMutation | [`UseMutationResult<{ data: TData }, TError, { resource:string; id: BaseKey; values: TVariables; }, UpdateContext>`](https://tanstack.com/query/v5/docs/react/reference/useMutation)\* |
| mutate      | Mutation function                          | `(params?: { resource?: string, id?: BaseKey, values?: TVariables, ... }) => void`                                                                                                     |
| mutateAsync | Async mutation function                    | `(params?: { resource?: string, id?: BaseKey, values?: TVariables, ... }) => Promise<{ data: TData }>`                                                                                 |
| overtime    | Overtime loading information               | `{ elapsedTime?: number }`                                                                                                                                                             |

> `*` `UpdateContext` is an internal type.
