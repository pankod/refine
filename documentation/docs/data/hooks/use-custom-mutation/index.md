---
title: "useCustomMutation Hook | Best Practices for Usage & Patterns in Refine v5"
display_title: "useCustomMutation"
sidebar_label: "useCustomMutation"
description: "Learn to use the useCustomMutation hook in Refine v5. Explore best practices to scale values for custom APIs and scalable data flows."
source: packages/core/src/data/hooks/useCustomMutation.ts
---

`useCustomMutation` is used when sending custom mutation requests using the TanStack Query advantages. It is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v5/docs/react/reference/useMutation) and not only supports all features of the mutation but also adds some extra features.

It uses the `custom` method as the **mutation function** from the [`dataProvider`](/core/docs/data/data-provider/) which is passed to `<Refine>`.

:::caution Use Cases

`useCustomMutation` should **not** be used when creating, updating, or deleting a resource. Following hooks should be used for these instead: [useCreate](/core/docs/data/hooks/use-create/), [useUpdate](/core/docs/data/hooks/use-update/) or [useDelete](/core/docs/data/hooks/use-delete/).

This is because `useCustomMutation`, unlike other data hooks, does not [invalidate queries](https://tanstack.com/query/latest/docs/react/guides/query-invalidation) and therefore will not update the application state either.

If you need to custom query request, use the [useCustom](/core/docs/data/hooks/use-custom/) hook.

:::

## Basic Usage

The `useCustomMutation` hook returns many useful properties and methods. One of them is the `mutate` method which expects `values`, `method`, and `url` as parameters. These parameters will be passed to the `custom` method from the `dataProvider` as parameters. Additionally, the `mutation` object contains all the TanStack Query's `useMutation` return values.

```tsx
import { useCustomMutation, useApiUrl } from "@refinedev/core";

interface ICategory {
  id: number;
  title: string;
}

const apiUrl = useApiUrl();

const { mutate, mutation } = useCustomMutation<ICategory>();

mutate({
  url: `${API_URL}/categories`,
  method: "post",
  values: {
    title: "New Category",
  },
});

// You can access mutation state through the mutation object:
console.log(mutation.isPending); // mutation loading state
console.log(mutation.data); // mutation response data
console.log(mutation.error); // mutation error
```

## Properties

### mutationOptions

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

> For more information, refer to the [`useMutation` documentation &#8594](https://tanstack.com/query/v5/docs/react/reference/useMutation)

```tsx
useCustomMutation({
  mutationOptions: {
    retry: 3,
  },
});
```

`mutationOptions` does not support `onSuccess` and `onError` props because they override the default `onSuccess` and `onError` functions. If you want to use these props, you can pass them to mutate functions like this:

```tsx
const { mutate, mutation } = useCustomMutation();

mutate(
  {
    url: `${API_URL}/categories`,
    method: "post",
    values: {
      title: "New Category",
    },
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

## Mutation Parameters

### url <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. It is usually used to specify the endpoint of the request.

```tsx
const { mutate, mutation } = useCustomMutation();

mutate({
  url: "www.example.com/api/update-products",
});
```

### method <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. It is usually used to specify the HTTP method of the request.

```tsx
const { mutate, mutation } = useCustomMutation();

mutate({
  method: "post",
});
```

### values <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. The parameter is usually used as the data to be sent with the request.

```tsx
const { mutate, mutation } = useCustomMutation();

mutate({
  values: {
    name: "New Category",
    description: "New Category Description",
  },
});
```

### config.headers

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to specify the headers of the request.

```tsx
const { mutate, mutation } = useCustomMutation();

mutate({
  config: {
    headers: {
      "x-custom-header": "foo-bar",
    },
  },
});
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

This prop allows you to customize the success notification that shows up when the data is fetched successfully and `useCustomMutation` calls the `open` function from `NotificationProvider`:

```tsx
const { mutate, mutation } = useCustomMutation();

mutate({
  successNotification: (data, values) => {
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

After data fetching is failed, `useCustomMutation` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
const { mutate, mutation } = useCustomMutation();

mutate({
  errorNotification: (data, values) => {
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

In the following example, `meta` is passed to the `custom` method from the `dataProvider` as a parameter.

```tsx
const { mutate, mutation } = useCustomMutation();

mutate({
  meta: {
    foo: "bar",
  },
});

const myDataProvider = {
  //...
  custom: async ({
    url,
    method,
    sort,
    filters,
    payload,
    query,
    headers,
    meta,
  }) => {
    const foo = meta?.foo;

    console.log(foo); // "bar"

    //...
  },
  //...
};
```

> For more information, refer to the [`meta` section of the General Concepts documentation&#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

### dataProviderName

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
const { mutate, mutation } = useCustomMutation();

mutate({
  dataProviderName: "second-data-provider",
});
```

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useCustomMutation({
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

## Return Values

Returns an object with TanStack Query's `useMutation` return values.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v5/docs/react/reference/useMutation)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useCustomMutation();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

## API Reference

### Mutation Parameters

| Property                    | Description                                                                                        | Type                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| url <PropTag asterisk />    | URL                                                                                                | string                                                                                      |
| method <PropTag asterisk /> | Method                                                                                             | `post`, `put`, `patch`, `delete`                                                            |
| values <PropTag asterisk /> | Values for mutation function                                                                       | `TVariables`                                                                                |
| config                      | The config of your request. You can send `headers` using this field.                               | { headers?: {}; }                                                                           |
| successNotification         | Successful mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) |
| errorNotification           | Unsuccessful mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) |
| meta                        | Meta data query for `dataProvider`                                                                 | [`MetaDataQuery`](/core/docs/core/interface-references#metaquery)                           |
| dataProviderName            | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                    |

### Type Parameters

| Property | Description                                                                                       | Type                                                            | Default                                                         |
| -------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/docs/core/interface-references#httperror)    | [`HttpError`](/core/docs/core/interface-references#httperror)   | [`HttpError`](/core/docs/core/interface-references#httperror)   |
| TQuery   | Values for query params.                                                                          | `TQuery`                                                        | unknown                                                         |
| TPayload | Values for params.                                                                                | `TPayload`                                                      | unknown                                                         |

### Return value

| Property    | Description                                | Type                                                                                                                                                               |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mutation    | Result of the TanStack Query's useMutation | [`UseMutationResult<{ data: TData }, TError, { resource: string; values: TVariables; }, unknown>`](https://tanstack.com/query/v5/docs/react/reference/useMutation) |
| mutate      | Mutation function                          | `(params?: { url?: string, method?: string, values?: TVariables, ... }) => void`                                                                                   |
| mutateAsync | Async mutation function                    | `(params?: { url?: string, method?: string, values?: TVariables, ... }) => Promise<{ data: TData }>`                                                               |
| overtime    | Overtime loading information               | `{ elapsedTime?: number }`                                                                                                                                         |
