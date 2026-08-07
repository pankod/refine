---
title: React Table
slug: /packages/documentation/react-table
source: /packages/react-table/src/useTable
---

import BasicUsageLivePreview from "./\_partial-basic-usage-live-preview.md";
import PaginationLivePreview from "./\_partial-pagination-live-preview.md";
import SortingLivePreview from "./\_partial-sorting-live-preview.md";
import RelationalLivePreview from "./\_partial-relational-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

**refine** offers a [TanStack Table][tanstack-table] adapter with [@pankod/refine-react-table][refine-react-table] that allows you to use the TanStack Table library with **refine**. All features such as sorting, filtering, and pagination come out of the box. Under the hood it uses [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) for the fetch. Since it is designed as headless, It expects you to handle the UI.

All of [TanStack Table's][tanstack-table] features are supported and you can use all of the [TanStack Table's][tanstack-table] examples with no changes just copy and paste them into your project.

:::info
`useTable` hook is extended from [`useTable`][use-table-core] hook from the [`@pankod/refine-core`](https://github.com/refinedev/refine/tree/v3/packages/core) package. This means that you can use all the features of [`useTable`][use-table-core] hook.
:::

## Installation

Install the [`@pankod/refine-react-table`][refine-react-table] library.

<InstallPackagesCommand args="@pankod/refine-react-table"/>

## Basic Usage

In basic usage, `useTable` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the url.

<BasicUsageLivePreview/>

## Pagination

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the pagination. For example, we can use the `setPageSize` method to set the current `pageSize`. Every change in the `pageSize` and `pageIndex` will trigger a new request to the data provider.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

:::info
`useTable` hook from `@pankod/refine-react-table` sets `manualPagination` to `true` by default to handle the pagination. If you set `hasPagination` to `false` in `refineCoreProps` property in the `useTable` config, it will disable the server-side pagination and it will let you handle the pagination on the client side.
:::

<PaginationLivePreview/>

## Sorting

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the sorting. For example, we can use the `setColumnOrder` method to set the current `sorting` value. Every change in the `sorting` state will trigger a new request to the data provider.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<SortingLivePreview/>

## Filtering

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the filtering. For example, we can use the `setColumnFilters` method to set the current `columnFilters` value. Every change in the `filter` will trigger a new request to the data provider.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

You can specify which field will be filtered with which filter operator with the `filterOperator` property in the `meta` object. `filterOperator` must be a [`CrudOperators`](/core/docs/3.xx.xx/api-reference/core/interfaces#crudoperators) type.

<FilteringLivePreview/>

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useTable` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

:::tip
It also accepts all props of [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#options).
:::

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
  refineCoreProps: {
    dataProviderName: "second-data-provider",
  },
});
```

### `initialCurrent`

> Default: `1`

Sets the initial value of the page index.

```tsx
useTable({
  refineCoreProps: {
    initialCurrent: 2, // This will cause the table to initially display the second page, rather than the default of the first page
  },
});
```

### `initialPageSize`

> Default: `10`

Sets the initial value of the page size.

```tsx
useTable({
  refineCoreProps: {
    initialPageSize: 20, // This will cause the table to initially display 20 rows per page, rather than the default of 10
  },
});
```

### `initialSorter`

Sets the initial value of the sorter. The `initialSorter` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `permanentSorter` prop.

```tsx
useTable({
  refineCoreProps: {
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
  },
});
```

### `permanentSorter`

Sets the permanent value of the sorter. The `permanentSorter` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `initialSorter` prop.

```tsx
useTable({
  refineCoreProps: {
    permanentSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
  },
});
```

### `initialFilter`

Sets the initial value of the filter. The `initialFilter` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `permanentFilter` prop.

```tsx
useTable({
  refineCoreProps: {
    initialFilter: [
      {
        field: "title",
        operator: "contains",
        value: "Foo",
      },
    ],
  },
});
```

### `permanentFilter`

Sets the permanent value of the filter. The `permanentFilter` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `initialFilter` prop.

```tsx
useTable({
  refineCoreProps: {
    permanentFilter: [
      {
        field: "title",
        operator: "contains",
        value: "Foo",
      },
    ],
  },
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
  refineCoreProps: {
    defaultSetFilterBehavior: "replace",
  },
});
```

### `hasPagination`

> Default: `true`

Determines whether to use server-side pagination or not.

```tsx
useTable({
  refineCoreProps: {
    hasPagination: false,
  },
});
```

### `syncWithLocation`

> Default: `false`

When you use the syncWithLocation feature, the `useTable`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages and to allow users to bookmark or share links to specific table views.

Also you can set this value globally on [`<Refine>`][refine swl] component.

```tsx
useTable({
  refineCoreProps: {
    syncWithLocation: true,
  },
});
```

### `queryOptions`

`useTable` uses [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery).

```tsx
useTable({
  refineCoreProps: {
    queryOptions: {
      retry: 3,
    },
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
  refineCoreProps: {
    metaData: {
      headers: { "x-meta-data": "true" },
    },
  },
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
  refineCoreProps: {
    successNotification: (data, values, resource) => {
      return {
        message: `${data.title} Successfully fetched.`,
        description: "Success with no errors",
        type: "success",
      };
    },
  },
});
```

### `errorNotification`

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After data fetching is failed, `useTable` will call `open` function from [`NotificationProvider`][notification-provider] to show an error notification. With this prop, you can customize the error notification.

```tsx
useTable({
  refineCoreProps: {
    errorNotification: (data, values, resource) => {
      return {
        message: `Something went wrong when getting ${data.id}`,
        description: "Error",
        type: "error",
      };
    },
  },
});
```

### `liveMode`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider) is required.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useTable({
  refineCoreProps: {
    liveMode: "auto",
  },
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider) is required.

The callback function is executed when new events from a subscription have arrived.

```tsx
useTable({
  refineCoreProps: {
    onLiveEvent: (event) => {
      console.log(event);
    },
  },
});
```

### `liveParams`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider) is required.

Params to pass to liveProvider's [subscribe](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) method.

## Return Values

:::tip
It also have all return values of [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#options).
:::

### `refineCore`

#### `tableQueryResult`

Returned values from [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) hook.

#### `sorter`

Current [sorter state][crudsorting].

#### `setSorter`

```tsx
 (sorter: CrudSorting) => void;
```

A function to set current [sorter state][crudsorting].

#### `filters`

Current [filters state][crudfilters].

#### `setFilters`

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

A function to set current [filters state][crudfilters].

#### `current`

Current page index state. If pagination is disabled, it will be `undefined`.

#### `setCurrent`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page index state. If pagination is disabled, it will be `undefined`.

#### `pageSize`

Current page size state. If pagination is disabled, it will be `undefined`.

#### `setPageSize`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page size state. If pagination is disabled, it will be `undefined`.

#### `pageCount`

Total page count state. If pagination is disabled, it will be `undefined`.

#### `createLinkForSyncWithLocation`

```tsx
(params: SyncWithLocationParams) => string;
```

A function creates accessible links for `syncWithLocation`. It takes [SyncWithLocationParams][syncwithlocationparams] as parameters.

## FAQ

### How can I handle relational data?

You can use [`useMany`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/) hook to fetch relational data.

<RelationalLivePreview/>

## API Reference

### Properties

<PropsTable module="@pankod/refine-react-table/useTable" />

### Type Parameters

| Property | Desription                                                   | Type                       | Default                    |
| -------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError   | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |

### Return values

| Property                     | Description                                                                                     | Type                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| refineCore                   | The return values of the [`useTable`][use-table-core] in the core                               | [`UseTableReturnValues`](/core/docs/3.xx.xx/api-reference/core/hooks/useTable#return-values) |
| Tanstack Table Return Values | See [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#table-api) documentation |

## Example

<CodeSandboxExample path="table-react-table-basic" />

[tanstack-table]: https://tanstack.com/table/v8
[refine-react-table]: https://github.com/refinedev/refine/tree/v3/packages/react-table
[use-table-core]: /core/docs/3.xx.xx/api-reference/core/hooks/useTable
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[syncwithlocationparams]: /core/docs/3.xx.xx/api-reference/core/interfaces#syncwithlocationparams
[notification-provider]: /core/docs/3.xx.xx/api-reference/core/providers/notification-provider
[crudsorting]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudsorting
[crudfilters]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudfilters
[refine swl]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#syncwithlocation
