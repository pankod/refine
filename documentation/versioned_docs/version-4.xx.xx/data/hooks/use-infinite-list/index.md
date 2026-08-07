---
title: "useInfiniteList Hook | Refine v4"
display_title: "useInfiniteList"
sidebar_label: "useInfiniteList"
siderbar_label: useInfiniteList
source: https://github.com/refinedev/refine/blob/main/packages/core/src/data/hooks/useInfiniteList.ts
description: "Learn how infinite scrolling and pagination are handled in Refine v4 using useInfiniteList for large and dynamic datasets."
---

import BasicUsageLivePreview from "./\_basic-usage-live-preview.md";
import SortingLivePreview from "./\_sorting-live-preview.md";
import FilteringLivePreview from "./\_filtering-live-preview.md";

The `useInfiniteList` hook is an extended version of TanStack Query's [`useInfiniteQuery`](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) used for retrieving items from a `resource` with pagination, sort, and filter configurations. It is ideal for lists where the total number of records is unknown and the user loads the next pages with a button.

- It uses the `getList` method as the query function from the [`dataProvider`](/core/docs/data/data-provider) which is passed to `<Refine>`.

- It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

## Usage

Here is a basic example of how to use the `useInfiniteList` hook.

<BasicUsageLivePreview />

## Pagination

The `useInfiniteList` hook supports pagination properties just like [`useList`](/core/docs/data/hooks/use-list). To handle pagination, the `useInfiniteList` hook passes the `pagination` property to the `getList` method from the `dataProvider`.

Dynamically changing the `pagination` properties will trigger a new request. The `fetchNextPage` method will increase the `pagination.current` property by one and trigger a new request as well.

### Retrieving the Total Row Count

When the `getList` method is called via `useInfiniteList`, it should ideally return the total count of rows (`rowCount`). The way this count is obtained depends on the data provider in use:

- **REST Providers:** Commonly obtain the total count from the `x-total-count` header.
- **GraphQL Providers:** Often source the count from specific data fields like `pageInfo.total`.
- **Other Providers:** Follow their own practices for obtaining the total count.

If the data provider doesn't return a specific count, the `getList` method may fall back to using the length of the paginated data array as the `rowCount`.

For more information on how this works, refer to the [`getList` method documentation](https://refine.dev/core/docs/data/data-provider/#getlist).

```ts
import { useInfiniteList } from "@refinedev/core";

const postListQueryResult = useInfiniteList({
  resource: "posts",
  pagination: { current: 3, pageSize: 8 },
});
```

## Sorting

The `useInfiniteList` hook supports the sorting feature, which you can enable by passing the `sorters` property. `useInfiniteList` will then pass this property to the `getList` method from the `dataProvider`.

Dynamically changing the `sorters` property will trigger a new request.

<SortingLivePreview />

## Filtering

The `useInfiniteList` hook supports the filtering feature, which you can enable by passing the `filters` property. `useInfiniteList` will then pass this property to the `getList` method from the `dataProvider`.

Dynamically changing the `filters` property will trigger a new request.

<FilteringLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider).

When the `useInfiniteList` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. This is useful when you want to subscribe to live updates.

## Properties

### resource <PropTag required />

This parameter will be passed to the `getList` method from the `dataProvider` as a parameter. It is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `getList` method.

```tsx
useInfiniteList({
  resource: "categories",
});
```

> For more information, refer to the [creating a data provider tutorial &#8594](/core/docs/data/data-provider)

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### dataProviderName

This prop allows you to specify which `dataProvider` if you have more than one. Just pass it like in the example:

```tsx
useInfiniteList({
  dataProviderName: "second-data-provider",
});
```

### filters

`filters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send filter query parameters to the API.

```tsx
useInfiniteList({
  filters: [
    {
      field: "title",
      operator: "contains",
      value: "Foo",
    },
  ],
});
```

> For more information, refer to the [`CrudFilters` interface &#8594](/core/docs/core/interface-references#crudfilters)

### sorters

`sorters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send sort query parameters to the API.

```tsx
useInfiniteList({
  sorters: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

> For more information, refer to the [`CrudSorting` interface &#8594](/core/docs/core/interface-references#crudsorting)

### pagination

`pagination` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send pagination query parameters to the API.

#### current

You can pass the `current` page number to the `pagination` property.

```tsx
useInfiniteList({
  pagination: {
    current: 2,
  },
});
```

#### pageSize

You can pass the `pageSize` to the `pagination` property.

```tsx
useInfiniteList({
  pagination: {
    pageSize: 20,
  },
});
```

#### mode

This property can be `"off"`, `"client"` or `"server"`. It is used to determine whether to use server-side pagination or not.

```tsx
useInfiniteList({
  pagination: {
    mode: "off",
  },
});
```

### queryOptions

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

```tsx
useInfiniteList({
  queryOptions: {
    retry: 3,
  },
});
```

> For more information, refer to the [`useQuery` documentation&#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useInfiniteList({
  // highlight-start
  meta: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  getList: async ({
    resource,
    pagination,
    sorters,
    filters,
    // highlight-next-line
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}`;
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

> For more information, refer to the [`meta` section of the General Concepts documentation&#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

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

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

After data fetching is failed, `useInfiniteList` will call the `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

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

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.

```tsx
useInfiniteList({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useInfiniteList({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### liveParams

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/realtime/live-provider#subscribe) method.

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useInfiniteList({
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

### ~~config~~ <PropTag deprecated />

Use `pagination`, `hasPagination`, `sorters` and `filters` instead.

### ~~hasPagination~~ <PropTag deprecated />

Use `pagination.mode` instead.

## Return Values

Returns an object with TanStack Query's `useInfiniteQuery` return values.

> For more information, refer to the [`useInfiniteQuery` documentation&#8594](https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useInfiniteList();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

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

By default, `Refine` expects you to return the `cursor` object, but is not required. This is because some APIs don't work that way. To fix this problem you need to override the `getNextPageParam` method and return the next `cursor`.

```tsx
import { useInfiniteList } from "@refinedev/core";

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
    // When you override this method, you can access the `lastPage` and `allPages`.
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

## API Reference

### Properties

<PropsTable module="@refinedev/core/useInfiniteList"
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return Values

| Description                                       | Type                                                                                                                                                |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's `useInfiniteQuery` | [`InfiniteQueryObserverResult<{ data: TData[]; total: number; }, TError>`](https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery) |
| overtime                                          | `{ elapsedTime?: number }`                                                                                                                          |

## Example

<CodeSandboxExample path="use-infinite-list" />

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
