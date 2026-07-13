---
title: useCustom
siderbar_label: useCustom
source: packages/core/src/data/hooks/useCustom.ts
---

`useCustom` is an extended version of TanStack Query's [`useQuery`](https://tanstack.com/query/v4/docs/react/reference/useQuery). It supports all the features of `useQuery` and adds some extra features.

- It uses the `custom` method as the **query function** from the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider) which is passed to `<Refine>`.

It is useful when you want to send a custom query request using the TanStack Query advantages.

:::danger attention
`useCustom` should **not** be used when creating, updating, or deleting a resource. To do these; [useCreate](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/), [useUpdate](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/) or [useDelete](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) hooks should be used instead.

This is because `useCustom`, unlike other data hooks, does not [invalidate queries](https://tanstack.com/query/latest/docs/react/guides/query-invalidation) and therefore will not update the application state either.

If you need to custom mutation request, use the [useCustomMutation](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCustomMutation/) hook.
:::

## Basic Usage

The `useCustom` hook expects a `url` and `method` properties. These parameters will be passed to the `custom` method from the `dataProvider` as a parameter.

When properties are changed, the `useCustom` hook will trigger a new request.

```tsx
import { useCustom, useApiUrl } from "@pankod/refine-core";

interface PostUniqueCheckResponse {
  isAvailable: boolean;
}

const apiUrl = useApiUrl();

const { data, isLoading } = useCustom<PostUniqueCheckResponse>({
  url: `${apiUrl}/posts-unique-check`,
  method: "get",
  config: {
    headers: {
      "x-custom-header": "foo-bar",
    },
    query: {
      title: "Foo bar",
    },
  },
});
```

## Properties

### `url` <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. It is usually used to specify the endpoint of the request.

```tsx
useCustom({
  url: "www.example.com/api/get-products",
});
```

### `method` <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. It is usually used to specify the HTTP method of the request.

```tsx
useCustom({
  method: "get",
});
```

### `config.headers`

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to specify the headers of the request.

```tsx
useCustom({
  config: {
    headers: {
      "x-custom-header": "foo-bar",
    },
  },
});
```

### `config.query`

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to specify the query parameters of the request.

```tsx
useCustom({
  config: {
    query: {
      title: "Foo bar",
    },
  },
});
```

### `config.payload`

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to specify the payload of the request.

```tsx
useCustom({
  config: {
    payload: {
      title: "Foo bar",
    },
  },
});
```

### `config.sort`

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to send the sort query parameters of the request.

```tsx
useCustom({
  config: {
    sort: [
      {
        field: "title",
        order: "asc",
      },
    ],
  },
});
```

### `config.filters`

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to send the filter query parameters of the request.

```tsx
useCustom({
  config: {
    filters: [
      {
        field: "title",
        operator: "contains",
        value: "Foo",
      },
    ],
  },
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useCustom({
  queryOptions: {
    retry: 3,
    enabled: false,
  },
});
```

### `metaData`

[`metaData`](/core/docs/3.xx.xx/api-reference/general-concepts/#metadata) is used following two purposes:

- To pass additional information to data provider methods.
- Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/core/docs/3.xx.xx/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, `metaData` is passed to the `custom` method from the `dataProvider` as a parameter.

```tsx
useCustom({
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
useCustom({
  dataProviderName: "second-data-provider",
});
```

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useCustom` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useCustom({
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

After data fetching is failed, `useCustom` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useCustom({
  errorNotification: (data, values, resource) => {
    return {
      message: `Something went wrong when getting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

## API

### Properties

<PropsTable module="@pankod/refine-core/useCustom" />

### Type Parameters

| Property | Desription                                                                                                    | Type                                                                        | Default                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)    | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   |
| TQuery   | Values for query params.                                                                                      | `TQuery`                                                                    | unknown                                                                     |
| TPayload | Values for params.                                                                                            | `TPayload`                                                                  | unknown                                                                     |

### Return value

| Description                             | Type                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's useQuery | [`QueryObserverResult<CustomResponse<TData>, TError>`](https://tanstack.com/query/v4/docs/react/reference/useQuery) |
