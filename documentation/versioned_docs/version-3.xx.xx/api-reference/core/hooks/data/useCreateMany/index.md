---
title: useCreateMany
siderbar_label: useCreateMany
source: packages/core/src/data/hooks/useCreateMany.ts
---

`useCreateMany` is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v4/docs/react/reference/useMutation). It supports all the features of `useMutation` and adds some extra features.

- It uses the `createMany` method as the **mutation function** from the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider/) which is passed to `<Refine>`.

It is useful when you want to create multiple records.

:::caution
If your data provider does not have a `createMany` method, `useCreateMany` will use the `create` method instead. It is not recommended, because it will make requests one by one for each record. It is better to implement the `createMany` method in the data provider.
:::

## Basic Usage

The `useCreateMany` hook returns many useful properties and methods. One of them is the `mutate` method which expects `values` and `resource` as parameters. These parameters will be passed to the `createMany` method from the `dataProvider` as parameters.

```tsx
import { useCreateMany } from "@pankod/refine-core";

const { mutate } = useCreateMany();

mutate({
  resource: "products",
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

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useCreateMany` mutation runs successfully, it will call the `publish` method from `liveProvider` with some parameters such as `channel`, `type` etc. It is useful when you want to publish the changes to the subscribers on the client side.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Invalidating Queries

When the `useCreateMany` mutation runs successfully, by default it will invalidate the following queries from the current `resource`: `"list"` and `"many"`. That means, if you use `useList` or `useMany` hooks in the same page, they will refetch the data after the mutation is completed. You can change this behavior by passing [`invalidates`](#invalidates) prop.

[Refer to the query invalidation documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/guides/query-invalidation)

## Audit Logs

> This feature is only available if you use a [Audit Log Provider](/core/docs/3.xx.xx/api-reference/core/providers/audit-log-provider/).

When the `useCreateMany` mutation runs successfully, it will call the `log` method from `auditLogProvider` with some parameters such as `resource`, `action`, `data` etc. It is useful when you want to log the changes to the database.

[Refer to the `auditLogProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/audit-log-provider/)

## Properties

### `mutationOptions`

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

```tsx
useCreateMany({
  mutationOptions: {
    retry: 3,
  },
});
```

:::tip

`mutationOptions` does not support `onSuccess` and `onError` props because they override the default `onSuccess` and `onError` functions. If you want to use these props, you can pass them to mutate functions like this:

```tsx
const { mutate } = useCreateMany();

mutate(
  {
    resource: "products",
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

It will be passed to the `create` method from the `dataProvider` as a parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `create` method. See the [creating a data provider](/core/docs/3.xx.xx/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how resources are handled.

```tsx
const { mutate } = useCreateMany();

mutate({
  resource: "categories",
});
```

### `values` <PropTag required />

It will be passed to the `create` method from the `dataProvider` as a parameter. The parameter is usually used as the data to be created. It contains the data that will be sent to the server.

```tsx
const { mutate } = useCreateMany();

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

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useCreateMany` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
const { mutate } = useCreateMany();

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

After data fetching is failed, `useCreateMany` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
const { mutate } = useCreateMany();

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

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
const { mutate } = useCreateMany();

mutate({
  // highlight-start
  metaData: {
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
    metaData,
  }) => {
    // highlight-next-line
    const headers = metaData?.headers ?? {};
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

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
const { mutate } = useCreateMany();

mutate({
  dataProviderName: "second-data-provider",
});
```

### `invalidates`

`invalidates` is used to specify which queries should be invalidated after the mutation is completed.

By default, it invalidates the following queries from the current `resource`: `"list"` and `"many"`. That means, if you use `useList` or `useMany` hooks on the same page, they will refetch the data after the mutation is completed.

```tsx
const { mutate } = useCreateMany();

mutate({
  invalidates: ["list", "many"],
});
```

## Return Values

Returns an object with TanStack Query's `useMutation` return values.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

## API

### Mutation Parameters

| Property                                                                                            | Description                                                                                        | Type                                                                                                    | Default                                                              |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name for API data interactions                                                            | `string`                                                                                                |                                                                      |
| values <div className=" required">Required</div>                                                    | Values for mutation function                                                                       | `TVariables[]`                                                                                          | [{}]                                                                 |
| successNotification                                                                                 | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/3.xx.xx/api-reference/core/interfaces#successerrornotification) | "Successfully created `resource`s"                                   |
| errorNotification                                                                                   | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/3.xx.xx/api-reference/core/interfaces#successerrornotification) | "There was an error creating `resource` (status code: `statusCode`)" |
| metaData                                                                                            | Metadata query for `dataProvider`                                                                  | [`MetaDataQuery`](/core/docs/3.xx.xx/api-reference/core/interfaces#metadataquery)                       | {}                                                                   |
| dataProviderName                                                                                    | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                                | `default`                                                            |
| invalidates                                                                                         | You can use it to manage the invalidations that will occur at the end of the mutation.             | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                                                 | `["list", "many"]`                                                   |

### Type Parameters

| Property   | Desription                                                                                                       | Type                                                                        | Default                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)       | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   |
| TVariables | Values for mutation function                                                                                     | `{}`                                                                        | `{}`                                                                        |

### Return value

| Description                                | Type                                                                                                                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Result of the TanStack Query's useMutation | [`UseMutationResult<`<br/>`{ data: TData[]},`<br/>`TError,`<br/>` { resource: string; values: TVariables[]; },`<br/>` unknown>`](https://tanstack.com/query/v4/docs/react/reference/useMutation) |
