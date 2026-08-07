---
title: useCustomMutation
siderbar_label: useCustomMutation
source: packages/core/src/data/hooks/useCustomMutation.ts
---

`useCustomMutation` is an extended version of TanStack Query's [`useMutation`](https://tanstack.com/query/v4/docs/react/reference/useMutation). It supports all the features of `useMutation` and adds some extra features.

- It uses the `custom` method as the **mutation function** from the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider/) which is passed to `<Refine>`.

It is useful when you want to send a custom mutation request using the TanStack Query advantages.

:::danger attention
`useCustomMutation` should **not** be used when creating, updating, or deleting a resource. To do these; [useCreate](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/), [useUpdate](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/) or [useDelete](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) hooks should be used instead.

This is because `useCustomMutation`, unlike other data hooks, does not [invalidate queries](https://tanstack.com/query/latest/docs/react/guides/query-invalidation) and therefore will not update the application state either.

If you need to custom query request, use the [useCustom](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCustomMutation/) hook.
:::

## Basic Usage

The `useCustomMutation` hook returns many useful properties and methods. One of them is the `mutate` method which expects `values`, `method`, and `url` as parameters. These parameters will be passed to the `custom` method from the `dataProvider` as parameters.

```tsx
import { useCustomMutation, useApiUrl } from "@pankod/refine-core";

interface ICategory {
  id: number;
  title: string;
}

const apiUrl = useApiUrl();

const { mutate } = useCustomMutation<ICategory>();

mutate({
  url: `${API_URL}/categories`,
  method: "post",
  values: {
    title: "New Category",
  },
});
```

## Properties

### `mutationOptions`

`mutationOptions` is used to pass options to the `useMutation` hook. It is useful when you want to pass additional options to the `useMutation` hook.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

```tsx
useCustomMutation({
  mutationOptions: {
    retry: 3,
  },
});
```

:::tip

`mutationOptions` does not support `onSuccess` and `onError` props because they override the default `onSuccess` and `onError` functions. If you want to use these props, you can pass them to mutate functions like this:

```tsx
const { mutate } = useCustomMutation();

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

:::

## Mutation Parameters

### `url` <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. It is usually used to specify the endpoint of the request.

```tsx
const { mutate } = useCustomMutation();

mutate({
  url: "www.example.com/api/update-products",
});
```

### `method` <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. It is usually used to specify the HTTP method of the request.

```tsx
const { mutate } = useCustomMutation();

mutate({
  method: "post",
});
```

### `values` <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. The parameter is usually used as the data to be sent with the request.

```tsx
const { mutate } = useCustomMutation();

mutate({
  values: {
    name: "New Category",
    description: "New Category Description",
  },
});
```

### `config.headers`

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to specify the headers of the request.

```tsx
const { mutate } = useCustomMutation();

mutate({
  config: {
    headers: {
      "x-custom-header": "foo-bar",
    },
  },
});
```

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useCustomMutation` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
const { mutate } = useCustomMutation();

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

After data fetching is failed, `useCustomMutation` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
const { mutate } = useCustomMutation();

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

In the following example, `metaData` is passed to the `custom` method from the `dataProvider` as a parameter.

```tsx
const { mutate } = useCustomMutation();

mutate({
  metaData: {
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
    metaData,
  }) => {
    const foo = metaData?.foo;

    console.log(foo); // "bar"

    //...
  },
  //...
};
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
const { mutate } = useCustomMutation();

mutate({
  dataProviderName: "second-data-provider",
});
```

## Return Values

Returns an object with TanStack Query's `useMutation` return values.

[Refer to the `useMutation` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useMutation)

## API

### Mutation Parameters

| Property                                         | Description                                                                                        | Type                                                                                                    |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| url <div className="required">Required</div>     | URL                                                                                                | string                                                                                                  |
| method <div className="required">Required</div>  | Method                                                                                             | `post`, `put`, `patch`, `delete`                                                                        |
| values <div className=" required">Required</div> | Values for mutation function                                                                       | `TVariables`                                                                                            |
| config                                           | The config of your request. You can send `headers` using this field.                               | { headers?: {}; }                                                                                       |
| successNotification                              | Successful mutation notification                                                                   | [`SuccessErrorNotification`](/core/docs/3.xx.xx/api-reference/core/interfaces#successerrornotification) |
| errorNotification                                | Unsuccessful mutation notification                                                                 | [`SuccessErrorNotification`](/core/docs/3.xx.xx/api-reference/core/interfaces#successerrornotification) |
| metaData                                         | Metadata query for `dataProvider`                                                                  | [`MetaDataQuery`](/core/docs/3.xx.xx/api-reference/core/interfaces#metadataquery)                       |
| dataProviderName                                 | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                                                |

### Type Parameters

| Property | Desription                                                                                                    | Type                                                                        | Default                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)    | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   |
| TQuery   | Values for query params.                                                                                      | `TQuery`                                                                    | unknown                                                                     |
| TPayload | Values for params.                                                                                            | `TPayload`                                                                  | unknown                                                                     |

### Return value

| Description                                | Type                                                                                                                                                                                          |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's useMutation | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; values: TVariables; },`<br/>` unknown>`](https://tanstack.com/query/v4/docs/react/reference/useMutation) |
