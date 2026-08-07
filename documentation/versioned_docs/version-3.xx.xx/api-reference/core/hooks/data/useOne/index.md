---
title: useOne
siderbar_label: useOne
source: packages/core/src/data/hooks/useOne.ts
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";

`useOne` is an extended version of TanStack Query's [`useQuery`](https://tanstack.com/query/v4/docs/react/reference/useQuery). It supports all the features of `useQuery` and adds some extra features.

- It uses the `getOne` method as the **query function** from the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider) which is passed to `<Refine>`.

- It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

It is useful when you want to fetch a single record from the API. It will return the data and some functions to control the query.

## Basic Usage

The `useOne` hook expects a `resource` and `id` property. It will be passed to the `getOne` method from the `dataProvider` as a parameter.

When these properties are changed, the `useOne` hook will trigger a new request.

<BasicUsageLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useOne` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

### `resource` <PropTag required />

It will be passed to the `getOne` method from the `dataProvider` as a parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getOne` method. See the [creating a data provider](/core/docs/3.xx.xx/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how resources are handled.

```tsx
useOne({
  resource: "categories",
});
```

### `id` <PropTag required />

It will be passed to the `getOne` method from the `dataProvider` as a parameter. It is used to determine which record to fetch.

```tsx
useOne({
  id: 123,
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useOne({
  dataProviderName: "second-data-provider",
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useOne({
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

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useOne({
  // highlight-start
  metaData: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  getOne: async ({
    resource,
    id,
    // highlight-next-line
    metaData,
  }) => {
    // highlight-next-line
    const headers = metaData?.headers ?? {};
    const url = `${apiUrl}/${resource}/${id}`;

    //...
    //...

    // highlight-next-line
    const { data } = await httpClient.get(`${url}`, { headers });

    return {
      data,
    };
  },
  //...
};
```

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useOne` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useOne({
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

After data fetching is failed, `useOne` will call the `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useOne({
  errorNotification: (data, values, resource) => {
    return {
      message: `Something went wrong when getting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

### `liveMode`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check the [Live / Realtime](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useOne({
  liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useOne({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### `liveParams`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) method.

## Return Values

Returns an object with TanStack Query's `useQuery` return values.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

## API

### Properties

<PropsTable module="@pankod/refine-core/useOne"
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Type Parameters

| Property | Desription                                                                                                    | Type                                                                        | Default                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)    | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   |

### Return values

| Description                               | Type                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Result of the TanStack Query's `useQuery` | [`QueryObserverResult<{ data: TData; }>`](https://tanstack.com/query/v4/docs/react/reference/useQuery) |
