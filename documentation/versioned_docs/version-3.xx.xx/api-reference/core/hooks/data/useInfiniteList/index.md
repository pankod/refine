---
title: useInfiniteList
siderbar_label: useInfiniteList
source: https://github.com/refinedev/refine/blob/v3/packages/core/src/data/hooks/useInfiniteList.ts
description: useInfiniteList data hook from refine is a modified version of TanStack Query's useInfiniteQuery for retrieving items from a resource with pagination, search, sort, and filter configurations.
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import SortingLivePreview from "./sorting-live-preview.md";
import FilteringLivePreview from "./filtering-live-preview.md";

`useInfiniteList` is an extended version of TanStack Query's [`useInfiniteQuery`](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) used for retrieving items from a `resource` with pagination, sort, and filter configurations. It is ideal for lists where the total number of records is unknown and the user loads the next pages with a button.

- It uses the `getList` method as the query function from the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider) which is passed to `<Refine>`.

- It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

## Basic Usage

Here is a basic example of how to use the `useInfiniteList` hook.

<BasicUsageLivePreview />

## Pagination

`useInfiniteList` hook supports pagination properties just like [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/). To handle pagination, the `useInfiniteList` hook passes the `pagination` property to the `getList` method from the `dataProvider`.

Dynamically changing the `pagination` properties will trigger a new request. Also, the `fetchNextPage` method will increase the `pagination.current` property by one and trigger a new request.

```ts
import { useInfiniteList } from "@pankod/refine-core";

const postListQueryResult = useInfiniteList({
  resource: "posts",
  config: {
    pagination: { current: 3, pageSize: 8 },
  },
});
```

## Sorting

The `useInfiniteList` hook supports the sorting feature. You can pass the `sort` property to enable sorting. To handle sorting, the `useInfiniteList` hook passes the `sort` property to the `getList` method from the `dataProvider`.

Dynamically changing the `sort` property will trigger a new request.

<SortingLivePreview />

## Filtering

The `useInfiniteList` hook supports the filtering feature. You can pass the `filters` property to enable filtering. To handle filtering, the `useInfiniteList` hook passes the `filters` property to the `getList` method from the `dataProvider`.

Dynamically changing the `filters` property will trigger a new request.

<FilteringLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useInfiniteList` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

### `resource` <PropTag required />

It will be passed to the `getList` method from the `dataProvider` as a parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getList` method. See the [creating a data provider](/core/docs/3.xx.xx/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how resources are handled.

```tsx
useInfiniteList({
  resource: "categories",
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useInfiniteList({
  dataProviderName: "second-data-provider",
});
```

### `config.filters`

`filters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send filter query parameters to the API.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudfilters)

```tsx
useInfiniteList({
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
useInfiniteList({
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
useInfiniteList({
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
useInfiniteList({
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
useInfiniteList({
  config: {
    hasPagination: false,
  },
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useInfiniteList({
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
useInfiniteList({
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

After data is fetched successfully, `useInfiniteList` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useInfiniteList({
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

After data fetching is failed, `useInfiniteList` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useInfiniteList({
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
useInfiniteList({
  liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useInfiniteList({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### `liveParams`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) method.

## Return Values

Returns an object with TanStack Query's `useInfiniteQuery` return values.

[Refer to the `useInfiniteQuery` documentation for more information &#8594](https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery)

## FAQ

### How to use cursor-based pagination?

Some APIs use the `cursor-pagination` method for its benefits. This method uses a `cursor` object to determine the next set of data. The cursor can be a number or a string and is passed to the API as a query parameter.

**Preparing the data provider:**

Consumes data from data provider `useInfiniteList` with the `getList` method. First of all, we need to make this method in the data provider convenient for this API. The `cursor` data is kept in `pagination` and should be set to `0` by default.

```ts
getList: async ({ resource, pagination }) => {
    const { current } = pagination;
    const { data } = await axios.get(
        `https://api.fake-rest.refine.dev/${resource}?cursor=${current || 0}`,
    );

    return {
        data: data[resource],
        total: 0,
    };
},
```

:::tip
As the `total` data is only needed in the `offset-pagination` method, define it as `0` here.
:::

After this process, we successfully retrieved the first page of data. Let's fill the `cursor` object for the next page.

```ts
getList: async ({ resource, pagination }) => {
    const { current } = pagination;
    const { data } = await axios.get(
        `https://api.fake-rest.refine.dev/${resource}?cursor=${current || 0}`,
    );

    return {
        data: data[resource],
        total: 0,
        // highlight-start
        cursor: {
            next: data.cursor.next,
            prev: data.cursor.prev,
        },
        // highlight-end
    };
},
```

### How to override the `getNextPageParam` method?

By default, `refine` expects you to return the `cursor` object, but is not required. This is because some APIs don't work that way. To fix this problem you need to override the `getNextPageParam` method and return the next `cursor`.

```tsx
import { useInfiniteList } from "@pankod/refine-core";

const {
  data,
  error,
  hasNextPage,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
} = useInfiniteList({
  resource: "posts",
  // highlight-start
  queryOptions: {
    getNextPageParam: (lastPage, allPages) => {
      // return the last post's id
      const { data } = lastPage;
      const lastPost = data[data.length - 1];
      return lastPost.id;
    },
  },
  // highlight-end
});
```

:::tip
When you override this method, you can access the `lastPage` and `allPages`.
:::

## API

### Properties

<PropsTable module="@pankod/refine-core/useInfiniteList"
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Config Parameters

```ts
interface UseInfiniteListConfig {
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

| Description                                       | Type                                                                                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Result of the TanStack Query's `useInfiniteQuery` | [`InfiniteQueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`](https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery) |

## Example

<CodeSandboxExample path="use-infinite-list" />
