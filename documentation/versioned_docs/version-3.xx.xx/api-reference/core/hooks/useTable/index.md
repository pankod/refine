---
title: useTable
slug: /api-reference/core/hooks/useTable
source: packages/core/src/hooks/useTable
---

import BasicUsageLivePreview from "./\_partial-basic-usage-live-preview.md";
import PaginationLivePreview from "./\_partial-pagination-live-preview.md";
import SortingLivePreview from "./\_partial-sorting-live-preview.md";
import FilteringLivePreview from "./\_partial-filtering-live-preview.md";
import RelationalDataLivePreview from "./\_partial-relational-data-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

`useTable` allows us to fetch data according to the sorter, filter, and pagination states. Under the hood it uses [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) for the fetch. Since it is designed as headless, It expects you to handle the UI.

:::info
If you're looking for a complete table library, Refine supports two table libraries out of the box.

- [React Table](https://react-table.tanstack.com/) (for TanStack Table users) - [Documentation](/core/docs/3.xx.xx/packages/documentation/react-table) - [Example](#)
- [Ant Design Table](https://ant.design/components/table/#header) (for Ant Design users) - [Documentation](/core/docs/3.xx.xx/api-reference/antd/hooks/table/useTable) - [Example](/core/docs/examples/table/antd/useTable)
- [Material UI Table](https://mui.com/x/react-data-grid/) (for Material UI users) - [Documentation](/core/docs/3.xx.xx/api-reference/mui/hooks/useDataGrid) - [Example](/core/docs/examples/table/mui/useDataGrid)

:::

## Basic Usage

In basic usage, `useTable` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the URL.

<BasicUsageLivePreview />

## Pagination

`useTable` has a pagination feature. The pagination is done by using the `current` and `pageSize` props. The `current` is the current page and the `pageSize` is the number of records per page.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

By default, the `current` is 1 and the `pageSize` is 10. You can change default values by passing the `initialCurrent` and `initialPageSize` props to the `useTable` hook.

You can also change the `current` and `pageSize` values by using the `setCurrent` and `setPageSize` functions that are returned by the `useTable` hook. Every change will trigger a new fetch.

If you want to disable pagination, you can use `hasPagination` property in `useTable` config and set it to `false`

:::info
If `hasPagination` is set to `false`, `current`, `setCurrent`, `pageSize`, `setPageSize`, and `pageCount` will return `undefined`
:::

<PaginationLivePreview/>

## Sorting

`useTable` has a sorter feature. The sorter is done by using the `sorter` state. The `sorter` state is a [`CrudSorting`][crudsorting] type that contains the field and the order of the sort. You can change the sorter state by using the `setSorter` function. Every change will trigger a new fetch.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

Also, you can add an initial sorter state by passing the `initialSorter` prop and a permanent sorter state by passing the `permanentSorter` prop to the `useTable` hook. Even if you change the sorter state, the `permanentSorter` will be used together with the sorter state.

<SortingLivePreview/>

## Filtering

`useTable` has a filter feature. The filter is done by using the `filters` state. The `filters` state is a [`CrudFilters`][crudfilters] type that contains the field, the operator, and the value of the filter. You can change the filter state by using the `setFilters` function. Every change will trigger a new fetch.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

Also you can add an initial filter state by passing the `initialFilter` prop and a permanent filter state by passing the `permanentFilter` prop to the `useTable` hook. Even if you change the filter state, the `permanentFilter` will be used together with the filter state.

`setFilters` function can work in two different behaviors; `merge` (default) and `replace`. You can set the behavior by passing it as the 2nd parameter. You can change the default behavior with [`defaultSetFilterBehavior`](#defaultsetfilterbehavior) prop.

You can also call `setFilters` with a setter function.

:::info
If you are using `merge` behavior and want to remove one of the filters; you should set the `value` to `undefined` or `null`. For `or` filters, you should set the `value` to an empty array `[]` to remove the filter.
:::

<FilteringLivePreview/>

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useTable` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

### `resource`

<PropResource
hook={{
    name:"useList",
    URL:"/docs/api-reference/core/hooks/data/useList/"
}}
method={{
    name:"getList",
    URL:"/docs/api-reference/core/providers/data-provider/#getlist"
}}
/>

```tsx
useTable({
  resource: "categories",
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. It is useful when you want to use a different `dataProvider` for a specific resource.

```tsx
useTable({
  dataProviderName: "second-data-provider",
});
```

### `initialCurrent`

> Default: `1`

Sets the initial value of the page index.

```tsx
useTable({
  initialCurrent: 2, // This will cause the table to initially display the data for page 2, rather than the default of page 1
});
```

### `initialPageSize`

> Default: `10`

Sets the initial value of the page size.

```tsx
useTable({
  initialPageSize: 20, // This will cause the table to initially display 20 rows per page, rather than the default of 10
});
```

### `initialSorter`

Sets the initial value of the sorter. The `initialSorter` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `permanentSorter` prop.

```tsx
useTable({
  initialSorter: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

### `permanentSorter`

Sets the permanent value of the sorter. The `permanentSorter` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `initialSorter` prop.

```tsx
useTable({
  permanentSorter: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

### `initialFilter`

> Type: [`CrudFilter[]`][crudfilters]

Sets the initial value of the filter. The `initialFilter` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `permanentFilter` prop.

```tsx
useTable({
  initialFilter: [
    {
      field: "title",
      operator: "contains",
      value: "Foo",
    },
  ],
});
```

### `permanentFilter`

> Type: [`CrudFilter[]`][crudfilters]

Sets the permanent value of the filter. The `permanentFilter` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `initialFilter` prop.

```tsx
useTable({
  permanentFilter: [
    {
      field: "title",
      operator: "contains",
      value: "Foo",
    },
  ],
});
```

### `defaultSetFilterBehavior`

> Default: `merge`

The filtering behavior can be set to either `"merge"` or `"replace"`.

- When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

- When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useTable({
  defaultSetFilterBehavior: "replace",
});
```

### `hasPagination`

> Default: `true`

Determines whether to use server-side pagination or not.

```tsx
useTable({
  hasPagination: false,
});
```

### `syncWithLocation`

> Default: `false`

When you use the syncWithLocation feature, the `useTable`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages, and to allow users to bookmark or share links to specific table views.

Also you can set this value globally on [`<Refine>`][refine swl] component.

```tsx
useTable({
  syncWithLocation: true,
});
```

### `queryOptions`

`useTable` uses [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery).

```tsx
useTable({
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
useTable({
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
    const { data, headers } = await httpClient.get(`${url}`, { headers });

    return {
      data,
    };
  },
  //...
};
```

### `successNotification`

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After data is fetched successfully, `useTable` can call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx
useTable({
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

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After data fetching is failed, `useTable` will call `open` function from [`NotificationProvider`][notification-provider] to show an error notification. With this prop, you can customize the error notification.

```tsx
useTable({
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
useTable({
  liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useTable({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### `liveParams`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) method.

## Return Values

### `tableQueryResult`

Returned values from [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) hook.

### `sorter`

Current [sorter state][crudsorting].

### `setSorter`

```tsx
 (sorter: CrudSorting) => void;
```

A function to set current [sorter state][crudsorting].

### `filters`

Current [filters state][crudfilters].

### `setFilters`

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

A function to set current [filters state][crudfilters].

### `current`

Current page index state. If pagination is disabled, it will be `undefined`.

### `setCurrent`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page index state. If pagination is disabled, it will be `undefined`.

### `pageSize`

Current page size state. If pagination is disabled, it will be `undefined`.

### `setPageSize`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page size state. If pagination is disabled, it will be `undefined`.

### `pageCount`

Total page count state. If pagination is disabled, it will be `undefined`.

### `createLinkForSyncWithLocation`

```tsx
(params: SyncWithLocationParams) => string;
```

A function creates accessible links for `syncWithLocation`. It takes [SyncWithLocationParams][syncwithlocationparams] as parameters.

## FAQ

### How can I handle relational data ?

You can use [`useMany`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/) hook to fetch relational data.

<RelationalDataLivePreview/>

## API

### Properties

<PropsTable module="@pankod/refine-core/useTable"
successNotification-default='"Successfully created `resource`" or "Successfully updated `resource`"'
errorNotification-default='"There was an error creating resource (status code: `statusCode`)" or "Error when updating resource (status code:statusCode)"'      />

### Type Parameters

| Property | Desription                                                   | Type                       | Default                    |
| -------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError   | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |

### Return values

| Property                      | Description                                                                           | Type                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| tableQueryResult              | Result of the `react-query`'s `useQuery`                                              | [` QueryObserverResult<{`` data: TData[];`` total: number; },`` TError> `][usequery]                                                              |
| current                       | Current page index state (returns `undefined` if pagination is disabled)              | `number` \| `undefined`                                                                                                                           |
| pageCount                     | Total page count (returns `undefined` if pagination is disabled)                      | `number` \| `undefined`                                                                                                                           |
| setCurrent                    | A function that changes the current (returns `undefined` if pagination is disabled)   | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| pageSize                      | Current pageSize state (returns `undefined` if pagination is disabled)                | `number` \| `undefined`                                                                                                                           |
| setPageSize                   | A function that changes the pageSize. (returns `undefined` if pagination is disabled) | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| sorter                        | Current sorting state s                                                               | [`CrudSorting`][crudsorting]                                                                                                                      |
| setSorter                     | A function that accepts a new sorter state.                                           | `(sorter: CrudSorting) => void`                                                                                                                   |
| filters                       | Current filters state                                                                 | [`CrudFilters`][crudfilters]                                                                                                                      |
| setFilters                    | A function that accepts a new filter state                                            | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |
| createLinkForSyncWithLocation | A function create accessible links for syncWithLocation                               | `(params: `[SyncWithLocationParams][syncwithlocationparams]`) => string;`                                                                         |

[table]: https://ant.design/components/table/#API
[form]: https://ant.design/components/form/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[crudsorting]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudsorting
[crudfilters]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudfilters
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[table search]: /advanced-tutorials/search/table-search.md
[refine swl]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#syncwithlocation
[live mode]: /core/docs/3.xx.xx/api-reference/core/providers/live-provider#usage-in-a-hook
[live mod props]: /core/docs/3.xx.xx/api-reference/core/interfaces#livemodeprops
[syncwithlocationparams]: /core/docs/3.xx.xx/api-reference/core/interfaces#syncwithlocationparams
[notification-provider]: /core/docs/3.xx.xx/api-reference/core/providers/notification-provider
