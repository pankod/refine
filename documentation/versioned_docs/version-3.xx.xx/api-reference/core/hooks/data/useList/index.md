---
title: useList
siderbar_label: useList
source: https://github.com/refinedev/refine/blob/v3/packages/core/src/data/hooks/useList.ts
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import PaginationLivePreview from "./pagination-live-preview.md";
import FilteringLivePreview from "./filtering-live-preview.md";
import SortingLivePreview from "./sorting-live-preview.md";

`useList` is an extended version of TanStack Query's [`useQuery`](https://tanstack.com/query/v4/docs/react/reference/useQuery). It supports all the features of `useQuery` and adds some extra features.

- It uses the `getList` method as the **query function** from the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider) which is passed to `<Refine>`.

- It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

When you need to fetch data according to sort, filter, pagination, etc. from a resource, you can use the `useList` hook. It will return the data and some functions to control the query.

## Basic Usage

Here is a basic example of how to use the `useList` hook.

<BasicUsageLivePreview />

## Pagination

The `useList` hook supports the pagination feature. You can pass the `pagination` property to enable pagination. To handle pagination, the `useList` hook passes the `pagination` property to the `getList` method from the `dataProvider`.

Dynamically changing the `pagination` properties will trigger a new request.

<PaginationLivePreview />

## Sorting

The `useList` hook supports the sorting feature. You can pass the `sort` property to enable sorting. To handle sorting, the `useList` hook passes the `sort` property to the `getList` method from the `dataProvider`.

Dynamically changing the `sort` property will trigger a new request.

<SortingLivePreview />

## Filtering

The `useList` hook supports the filtering feature. You can pass the `filters` property to enable filtering. To handle filtering, the `useList` hook passes the `filters` property to the `getList` method from the `dataProvider`.

Dynamically changing the `filters` property will trigger a new request.

<FilteringLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useList` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

### `resource` <PropTag required />

It will be passed to the `getList` method from the `dataProvider` as a parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getList` method. See the [creating a data provider](/core/docs/3.xx.xx/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how resources are handled.

```tsx
useList({
  resource: "categories",
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useList({
  dataProviderName: "second-data-provider",
});
```

### `config.filters`

`filters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send filter query parameters to the API.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudfilters)

```tsx
useList({
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

### `config.sort`

`sort` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send sort query parameters to the API.

[Refer to the `CrudSorting` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudsorting)

```tsx
useList({
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

### `config.pagination`

`pagination` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send pagination query parameters to the API.

#### `current`

You can pass the `current` page number to the `pagination` property.

```tsx
useList({
  config: {
    pagination: {
      current: 2,
    },
  },
});
```

#### `pageSize`

You can pass the `pageSize` to the `pagination` property.

```tsx
useList({
  config: {
    pagination: {
      pageSize: 20,
    },
  },
});
```

### `config.hasPagination`

`hasPagination` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to determine whether to use server-side pagination or not.

```tsx
useList({
  config: {
    hasPagination: false,
  },
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useList({
  queryOptions: {
    retry: 3,
  },
});
```

### `metaData`

[`metaData`](/core/docs/3.xx.xx/api-reference/general-concepts/#metadata) is used following two purposes:

- To pass additional information to data provider methods.
- Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/core/docs/3.xx.xx/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useList({
  // highlight-start
  metaData: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  getList: async ({
    resource,
    pagination,
    hasPagination,
    sort,
    filters,
    // highlight-next-line
    metaData,
  }) => {
    // highlight-next-line
    const headers = metaData?.headers ?? {};
    const url = `${apiUrl}/${resource}`;

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

After data is fetched successfully, `useList` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useList({
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

After data fetching is failed, `useList` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useList({
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
For more information about live mode, please check [Live / Realtime](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useList({
  liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useList({
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

<PropsTable module="@pankod/refine-core/useList"
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Config Parameters

```ts
interface UseListConfig {
  hasPagination?: boolean;
  pagination?: {
    current?: number;
    pageSize?: number;
  };
  sort?: Array<{
    field: string;
    order: "asc" | "desc";
  }>;
  filters?: Array<{
    field: string;
    operator: CrudOperators;
    value: any;
  }>;
}
```

### Type Parameters

| Property | Desription                                                                                                    | Type                                                                        | Default                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)    | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   |

### Return Values

| Description                               | Type                                                                                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's `useQuery` | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`](https://tanstack.com/query/v4/docs/react/reference/useQuery) |
