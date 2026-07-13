---
title: "useCreateMany Hook | Best Practices for Usage & Patterns in Refine v5"
display_title: "useCreateMany"
sidebar_label: "useCreateMany"
description: "Explore how to use the useCreateMany hook in Refine v5. Learn patterns to scale REST, GraphQL for custom APIs and scalable data flows."
source: packages/core/src/data/hooks/useCreateMany.ts
---

`useCreateMany` is used for creating multiple records. It is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v5/docs/react/reference/useMutation) and not only supports all features of the mutation but also adds some extra features.

It uses the `createMany` method as the **mutation function** from the [`dataProvider`](/core/docs/data/data-provider/) which is passed to `<Refine />`.

If your data provider does not have a `createMany` method, `useCreateMany` will use the `create` method instead. This is not recommended, since it will make requests one by one for each record.

It is better to implement the `createMany` method in the data provider.

## Usage

The `useCreateMany` hook returns many useful properties and methods. One of them is the `mutate` method which is used to trigger a mutation with the given [parameters](#mutation-parameters). Additionally, the `mutation` object contains all the TanStack Query's `useMutation` return values.

```tsx
import { useCreateMany } from "@refinedev/core";

const { mutate, mutation } = useCreateMany({
  resource: "products",
});

mutate({
  values: [
    {
      name: "Product 1",
      material: "Wood",
    },
    {
      name: "Product 2",
      material: "Metal",
    },
  ],
});

// You can access mutation state through the mutation object:
console.log(mutation.isPending); // mutation loading state
console.log(mutation.data); // mutation response data
console.log(mutation.error); // mutation error
```

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider/).

When the `useCreateMany` mutation runs successfully, it will call the `publish` method from `liveProvider` with some parameters such as `channel`, `type` etc. It is useful when you want to publish the changes to the subscribers on the client side.

## Invalidating Queries

When the `useCreateMany` mutation runs successfully, it will invalidate the following queries from the current `resource`: `"list"` and `"many"` by default. Which means that, if you use `useList` or `useMany` hooks in the same page, they will refetch the data after the mutation is completed. You can change this behavior by passing [`invalidates`](#invalidates) prop.

> For more information, refer to the [invalidation documentation &#8594](https://tanstack.com/query/v5/docs/react/guides/query-invalidation)

## Audit Logs

> This feature is only available if you use a [Audit Log Provider](/core/docs/audit-logs/audit-log-provider/).

When the `useCreateMany` mutation runs successfully, it will call the `log` method from `auditLogProvider` with some parameters such as `resource`, `action`, `data` etc. It is useful when you want to log the changes to the database.

## Properties

### mutationOptions

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v5/docs/react/reference/useMutation)

```tsx
useCreateMany({
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
const { overtime } = useCreateMany({
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

Mutation parameters are passed to the `mutate` function and can also be provided as props to the `useCreateMany` hook. Parameters given to the `mutate` function override those from the hook. Think of the hook's parameters as default values, and the `mutate` function's parameters as specific or dynamic values for each mutation.

```tsx
import { useCreateMany } from "@refinedev/core";

const { mutate, mutation } = useCreateMany({
  /* parameters */
});

mutate({
  /* this will override the parameters given to the useCreateMany hook */
});
```

> 🚨 Parameters marked as required can be provided either as props to the `useCreateMany` hook or as parameters to the `mutate` function.

### resource <PropTag required />

This parameter will be passed to the `create` method from the `dataProvider` as a parameter. It is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `create` method.

```tsx
const { mutate, mutation } = useCreateMany();

mutate({
  resource: "categories",
});
```

> For more information, refer to the [creating a data provider tutorial &#8594](/core/docs/data/data-provider/)

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### values <PropTag required />

This prop will be passed to the `create` method from the `dataProvider` as a parameter. It is usually used as the data to be created and contains the data that will be sent to the server.

```tsx
const { mutate, mutation } = useCreateMany();

mutate({
  values: [
    {
      name: "Product 1",
      material: "Wood",
    },
    {
      name: "Product 2",
      material: "Metal",
    },
  ],
});
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

This prop allows you to customize the success notification that shows up when the data is fetched successfully and `useCreateMany` calls the `open` function from `NotificationProvider`:

```tsx
const { mutate, mutation } = useCreateMany();

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

This prop allows you to customize the error notification that shows up when the data fetching fails and the `useCreateMany` calls the `open` function from `NotificationProvider`

```tsx
const { mutate, mutation } = useCreateMany();

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

In the following example, we pass the `headers` property in the `meta` object to the `create` method. You can pass any properties to specifically handle the data provider methods with similar logic,.

```tsx
const { mutate, mutation } = useCreateMany();

mutate({
  // highlight-start
  meta: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  createMany: async ({
    resource,
    variables,
    // highlight-next-line
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}`;

    //...
    //...

    // highlight-next-line
    const { data } = await httpClient.post(url, variables, { headers });

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
const { mutate, mutation } = useCreateMany();

mutate({
  dataProviderName: "second-data-provider",
});
```

### invalidates

`invalidates` is used to specify which queries should be invalidated after the mutation is completed.

By default, it invalidates the following queries from the current `resource`: `"list"` and `"many"`. That means, if you use `useList` or `useMany` hooks on the same page, they will refetch the data after the mutation is completed.

```tsx
const { mutate, mutation } = useCreateMany();

mutate({
  invalidates: ["list", "many"],
});
```

## Return Values

Returns an object with TanStack Query's `useMutation` return values.

> For more information, refer to the [`useMutation` documentation &#8594](https://tanstack.com/query/v5/docs/react/reference/useMutation)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useCreateMany();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

## API Reference

### Mutation Parameters

| Property                      | Description                                                                                        | Type                                                                                        | Default                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| resource <PropTag asterisk /> | Resource name for API data interactions                                                            | `string`                                                                                    |                                                                      |
| values <PropTag asterisk />   | Values for mutation function                                                                       | `TVariables[]`                                                                              | [{}]                                                                 |
| successNotification           | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "Successfully created `resource`s"                                   |
| errorNotification             | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/core/interface-references#successerrornotification) | "There was an error creating `resource` (status code: `statusCode`)" |
| meta                          | Meta data query for `dataProvider`                                                                 | [`MetaDataQuery`](/core/docs/core/interface-references#metaquery)                           | {}                                                                   |
| dataProviderName              | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                    | `default`                                                            |
| invalidates                   | You can use it to manage the invalidations that will occur at the end of the mutation.             | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                                     | `["list", "many"]`                                                   |

### Type Parameters

| Property   | Description                                                                                          | Type                                                            | Default                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) | [`BaseRecord`](/core/docs/core/interface-references#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/core/interface-references#httperror)       | [`HttpError`](/core/docs/core/interface-references#httperror)   | [`HttpError`](/core/docs/core/interface-references#httperror)   |
| TVariables | Values for mutation function                                                                         | `{}`                                                            | `{}`                                                            |

### Return value

| Property    | Description                                | Type                                                                                                                                                                  |
| ----------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mutation    | Result of the TanStack Query's useMutation | [`UseMutationResult<{ data: TData[]}, TError, { resource: string; values: TVariables[]; }, unknown>`](https://tanstack.com/query/v5/docs/react/reference/useMutation) |
| mutate      | Mutation function                          | `(params?: { resource?: string, values?: TVariables[], ... }) => void`                                                                                                |
| mutateAsync | Async mutation function                    | `(params?: { resource?: string, values?: TVariables[], ... }) => Promise<{ data: TData[] }>`                                                                          |
| overtime    | Overtime loading information               | `{ elapsedTime?: number }`                                                                                                                                            |
