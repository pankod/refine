---
title: "useList Hook | Refine v4"
display_title: "useList"
sidebar_label: "useList"
description: "Learn how to fetch, filter, sort, and paginate resource lists in Refine v4 using useList with full data provider support."
siderbar_label: useList
source: https://github.com/refinedev/refine/blob/main/packages/core/src/data/hooks/useList.ts
---

import BasicUsageLivePreview from "./\_basic-usage-live-preview.md";
import PaginationLivePreview from "./\_pagination-live-preview.md";
import FilteringLivePreview from "./\_filtering-live-preview.md";
import SortingLivePreview from "./\_sorting-live-preview.md";

`useList` is an extended version of TanStack Query's [`useQuery`](https://tanstack.com/query/v4/docs/react/reference/useQuery) that supports all of its features and also adds some more.

When you need to fetch data according to sort, filter, pagination, etc. from a `resource` , you can use the `useList` hook. It will return the data and some functions to control the query.

- It uses the `getList` method as the **query function** from the [`dataProvider`](/core/docs/data/data-provider) which is passed to `<Refine>`.

- It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

## Usage

Here is a basic example of how to use the `useList` hook.

<BasicUsageLivePreview />

## Pagination

The `useList` hook supports the pagination feature. You can pass the `pagination` property to enable pagination. To handle pagination, the `useList` hook passes the `pagination` property to the `getList` method from the `dataProvider`.

Dynamically changing the `pagination` properties will trigger a new request.

### Retrieving the Total Row Count

When the `useList` hook calls the `getList` method, it expects the response to include the total number of rows (`rowCount`). The way this count is retrieved can vary based on the data provider:

- **REST Providers:** Frequently use the `x-total-count` header to determine the total count.
- **GraphQL Providers:** Typically return the count in specific data fields, such as `pageInfo.total`.
- **Other Providers:** Follow their own conventions for obtaining the total count.

If the backend doesn't provide a specific count, the `getList` method may default to using the length of the returned data array as the `rowCount`.

For further details on how the `getList` method retrieves and returns data, refer to the [`getList` documentation](https://refine.dev/core/docs/data/data-provider/#getlist).

<PaginationLivePreview />

## Sorting

The `useList` hook supports the sorting feature,which you can enable by passing the `sorters` property. `useList` will then pass this property to the `getList` method from the `dataProvider`.

Dynamically changing the `sorters` property will trigger a new request.

<SortingLivePreview />

## Filtering

The `useList` hook supports the filtering feature. You can pass the `filters` property to enable filtering. To handle filtering, the `useList` hook passes the `filters` property to the `getList` method from the `dataProvider`.

Dynamically changing the `filters` property will trigger a new request.

<FilteringLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider).

When the `useList` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

## Properties

### resource <PropTag required />

This parameter will be passed to the `getList` method from the `dataProvider` as a parameter. It is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `getList` method.

```tsx
useList({
  resource: "categories",
});
```

> For more information, refer to the [creating a data provider tutorial &#8594](/core/docs/data/data-provider)

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### dataProviderName

This prop allows you to specify which `dataProvider` if you have more than one. Just pass it like in the example:

```tsx
useList({
  dataProviderName: "second-data-provider",
});
```

### filters

`filters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send filter query parameters to the API.

```tsx
useList({
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
useList({
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
useList({
  pagination: {
    current: 2,
  },
});
```

#### pageSize

You can pass the `pageSize` to the `pagination` property.

```tsx
useList({
  pagination: {
    pageSize: 20,
  },
});
```

#### mode

This property can be `"off"`, `"client"` or `"server"`. It is used to determine whether to use server-side pagination or not.

```tsx
useList({
  pagination: {
    mode: "off",
  },
});
```

### queryOptions

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

```tsx
useList({
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
useList({
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

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

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

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.

```tsx
useList({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useList({
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
const { overtime } = useList({
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

Use `pagination`, `sorters`, and `filters` instead.

### ~~hasPagination~~ <PropTag deprecated />

Use `pagination.mode` instead.

## Return Values

Returns an object with TanStack Query's `useQuery` return values.

> For more information, refer to the [`useQuery` documentation&#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useList();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/useList"
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

| Description                               | Type                                                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's `useQuery` | [`QueryObserverResult<{ data: TData[]; total: number; }, TError>`](https://tanstack.com/query/v4/docs/react/reference/useQuery) |
| overtime                                  | `{ elapsedTime?: number }`                                                                                                      |

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
