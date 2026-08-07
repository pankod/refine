---
title: "useTable Hook | Options, Patterns & Edge Cases in Refine v5: TanStack Table"
display_title: "useTable"
sidebar_label: "useTable"
description: "Explore how to use the useTable hook in Refine v5. Explore best practices for pagination, sorting for real-world React admin panels. Hands-on examples included."
source: /packages/react-table/src/useTable
---

import BasicUsageLivePreview from "../examples/\_partial-basic-usage-live-preview.md";
import PaginationLivePreview from "../examples/\_partial-pagination-live-preview.md";
import SortingLivePreview from "../examples/\_partial-sorting-live-preview.md";
import FilteringLivePreview from "../examples/\_partial-filtering-live-preview.md";
import RelationalLivePreview from "../examples/\_partial-relational-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

Refine offers a [TanStack Table][tanstack-table] adapter with [@refinedev/react-table][refine-react-table] that allows you to use the TanStack Table library with Refine. All features such as sorting, filtering, and pagination come out of the box. Under the hood it uses [`useList`](/core/docs/data/hooks/use-list/) for the fetch. Since it is designed as headless, It expects you to handle the UI.

All of [TanStack Table's][tanstack-table] features are supported and you can use all of the [TanStack Table's][tanstack-table] examples with no changes just copy and paste them into your project.

`useTable` hook is extended from [`useTable`][use-table-core] hook from the [`@refinedev/core`](https://github.com/refinedev/refine/tree/main/packages/core) package. This means that you can use all the features of [`useTable`][use-table-core] hook.

## Installation

Install the [`@refinedev/react-table`][refine-react-table] library.

<InstallPackagesCommand args="@refinedev/react-table"/>

## Usage

In basic usage, `useTable` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the url.

<BasicUsageLivePreview/>

## Pagination

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the pagination. For example, we can use the `setPageSize` method to set the current `pageSize`. Every change in the `pageSize` and `pageIndex` will trigger a new request to the data provider.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

By default, pagination happens on the server side. If you want to do pagination handling on the client side, you can pass the pagination.mode property and set it to "client". Also, you can disable the pagination by setting the "off".

<PaginationLivePreview/>

## Sorting

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the sorting. For example, we can use the `setColumnOrder` method to set the current `sorting` value. Every change in the `sorting` state will trigger a new request to the data provider.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<SortingLivePreview/>

## Filtering

[TanStack Table][tanstack-table] provides a bunch of methods that we can use to control the filtering. For example, we can use the `setColumnFilters` method to set the current `columnFilters` value. Every change in the `filter` will trigger a new request to the data provider.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

By default, filter operators are set to "eq" for all fields. You can specify which field will be filtered with which filter operator with the `filterOperator` property in the `meta` object. Just be aware that the `filterOperator` must be a [`CrudOperators`](/core/docs/core/interface-references#crudoperators) type.

If you're going to use [logical filters](/core/docs/core/interface-references#logicalfilter) (`and`, `or`), you can set `filterOperator` to `and` or `or` in the `meta` object. By design, logical filters do not have `field` property, instead they have `key` property to differentiate between filters if there are multiple filters with the same operator.

By default, `id` field of the column is used as the `key` property. If you want to use a different field as the `key`, you can set the `filterKey` property in the `meta` object.

:::simple Finding the filter value

Refine provides the [`getDefaultFilter`](https://github.com/refinedev/refine/blob/716656d9ad3deb169c32685cdebbfd46bac44beb/packages/core/src/definitions/table/index.ts#L166) function, You can use this function to find the filter value for the specific field.

```tsx
import { getDefaultFilter } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";

const MyComponent = () => {
  const {
    refineCore: { filters },
  } = useTable({
    refineCoreProps: {
      filters: {
        initial: [
          {
            field: "name",
            operator: "contains",
            value: "John Doe",
          },
        ],
      },
    },
  });

  const nameFilterValue = getDefaultFilter("name", filters, "contains");
  console.log(nameFilterValue); // "John Doe"

  return {
    /** ... */
  };
};
```

:::

<FilteringLivePreview/>

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider/).

When the `useTable` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

## Properties

It also accepts all props of [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#options).

### resource

<PropResource
hook={{
    name:"useList",
    URL:"/docs/data/hooks/use-list/"
}}
method={{
    name:"getList",
    URL:"/docs/data/data-provider/#getlist"
}}
hasDefault={false}
/>

By default, it reads the resource from the current route.

```tsx
useTable({
  refineCoreProps: {
    resource: "categories",
  },
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### dataProviderName

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. It is useful when you want to use a different `dataProvider` for a specific resource.

```tsx
useTable({
  refineCoreProps: {
    dataProviderName: "second-data-provider",
  },
});
```

### pagination.currentPage

Sets the initial value of the page index. Default value is `1`.

```tsx
useTable({
  refineCoreProps: {
    pagination: {
      currentPage: 2,
    },
  },
});
```

### pagination.pageSize

Sets the initial value of the page size. Default value is `10`.

```tsx
useTable({
  refineCoreProps: {
    pagination: {
      pageSize: 10,
    },
  },
});
```

### pagination.mode

It can be `"off"`, `"server"` or `"client"`. Default value is `"server"`.

- **"off":** Pagination is disabled. All records will be fetched.
- **"client":** Pagination is done on the client side. All records will be fetched and then the records will be paginated on the client side.
- **"server":**: Pagination is done on the server side. Records will be fetched by using the `currentPage` and `pageSize` values.

```tsx
useTable({
  refineCoreProps: {
    pagination: {
      mode: "client",
    },
  },
});
```

### sorters.initial

Sets the initial value of the sorter. The `initial` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `sorters.permanent` prop.

[Refer to the `CrudSorting` interface for more information &#8594](/core/docs/core/interface-references#crudsorting)

```tsx
useTable({
  refineCoreProps: {
    sorters: {
      initial: [
        {
          field: "name",
          order: "asc",
        },
      ],
    },
  },
});
```

### sorters.permanent

Sets the permanent value of the sorter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `sorters.initial` prop.

[Refer to the `CrudSorting` interface for more information &#8594](/core/docs/core/interface-references#crudsorting)

```tsx
useTable({
  refineCoreProps: {
    sorters: {
      permanent: [
        {
          field: "name",
          order: "asc",
        },
      ],
    },
  },
});
```

### sorters.mode

It can be `"off"` or `"server"`. Default value is `"server"`.

- **"off":** Sorting are disabled. All records will be fetched.
- **"server":**: Sorting are done on the server side. Records will be fetched by using the `sorters` value.

```tsx
useTable({
  refineCoreProps: {
    sorters: {
      mode: "off",
    },
  },
});
```

### filters.initial

Sets the initial value of the filter. The `initial` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `filters.permanent` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/core/interface-references#crudfilters)

```tsx
useTable({
  refineCoreProps: {
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: "Foo",
        },
      ],
    },
  },
});
```

### filters.permanent

Sets the permanent value of the filter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `filters.initial` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/core/interface-references#crudfilters)

```tsx
useTable({
  refineCoreProps: {
    filters: {
      permanent: [
        {
          field: "name",
          operator: "contains",
          value: "Foo",
        },
      ],
    },
  },
});
```

### filters.defaultBehavior

The filtering behavior can be set to either `"merge"` or `"replace"`. Default value is `"replace"`.

- When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

- When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useTable({
  refineCoreProps: {
    filters: {
      defaultBehavior: "merge",
    },
  },
});
```

### filters.mode

It can be `"off"` or `"server"`. Default value is `"server"`.

- **"off":** `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
- **"server":**: Filters are done on the server side. Records will be fetched by using the `filters` value.

```tsx
useTable({
  refineCoreProps: {
    filters: {
      mode: "off",
    },
  },
});
```

### syncWithLocation <GlobalConfigBadge id="core/refine-component/#syncwithlocation" />

When you use the syncWithLocation feature, the `useTable`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages and to allow users to bookmark or share links to specific table views.

By default, it reads the `syncWithLocation` from the `<Refine>` component.

```tsx
useTable({
  refineCoreProps: {
    syncWithLocation: true,
  },
});
```

### queryOptions

`useTable` uses [`useList`](/core/docs/data/hooks/use-list/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v5/docs/react/reference/useQuery).

```tsx
useTable({
  refineCoreProps: {
    queryOptions: {
      retry: 3,
    },
  },
});
```

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useTable({
  refineCoreProps: {
    meta: {
      headers: { "x-meta-data": "true" },
    },
  },
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
    const { data, headers } = await httpClient.get(`${url}`, { headers });

    return {
      data,
    };
  },
  //...
};
```

### successNotification

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

### errorNotification

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

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider/) is required.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/core/docs/realtime/live-provider#livemode) page.

```tsx
useTable({
  refineCoreProps: {
    liveMode: "auto",
  },
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider/) is required.

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

### liveParams

> [`LiveProvider`](/core/docs/realtime/live-provider/) is required.

Params to pass to liveProvider's [subscribe](/core/docs/realtime/live-provider#subscribe) method.

## Return Values

It also have all return values of [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#options).

### refineCore

#### tableQuery

Returned values from [`useList`](/core/docs/data/hooks/use-list/) hook.

### sorters

Current [sorters state][crudsorting].

### setSorters

A function to set current [sorters state][crudsorting].

```tsx
 (sorters: CrudSorting) => void;
```

A function to set current [sorters state][crudsorting].

#### filters

Current [filters state][crudfilters].

#### setFilters

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

A function to set current [filters state][crudfilters].

#### currentPage

Current page index state. If pagination is disabled, it will be `undefined`.

#### setCurrentPage

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page index state. If pagination is disabled, it will be `undefined`.

#### pageSize

Current page size state. If pagination is disabled, it will be `undefined`.

#### setPageSize

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page size state. If pagination is disabled, it will be `undefined`.

#### pageCount

Total page count state. If pagination is disabled, it will be `undefined`.

#### createLinkForSyncWithLocation

```tsx
(params: SyncWithLocationParams) => string;
```

A function creates accessible links for `syncWithLocation`. It takes [SyncWithLocationParams][syncwithlocationparams] as parameters.

## FAQ

### How can I handle relational data?

You can use [`useMany`](/core/docs/data/hooks/use-many/) hook to fetch relational data.

<RelationalLivePreview/>

### How can I handle client side filtering?

You can set the [`filters.mode: "off"`](#filtersmode) in order to disable server-side filtering. `useTable` is fully compatible with [`TanStack Table`](https://tanstack.com/table/v8/docs/api/features/filters) filtering feature.

```tsx
useTable({
  refineCoreProps: {
    filters: {
      mode: "off",
    },
  },
});
```

### How can I handle client side sorting?

You can set the [`sorters.mode: "off"`](#sortersmode) in order to disable server-side sorting. `useTable` is fully compatible with [`TanStack Table`](https://tanstack.com/table/v8/docs/api/features/sorting) sorting feature.

```tsx
useTable({
  refineCoreProps: {
    sorters: {
      mode: "off",
    },
  },
});
```

## API Reference

### Properties

<PropsTable module="@refinedev/react-table/useTable" />

### Type Parameters

| Property     | Description                                                                                                                                                | Type                       | Default                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data of the query. Extends [`BaseRecord`][baserecord]                                                                                               | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                  | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data of the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property                     | Description                                                                                     | Type                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| refineCore                   | The return values of the [`useTable`][use-table-core] in the core                               | [`UseTableReturnValues`](/core/docs/data/hooks/use-table#return-values) |
| Tanstack Table Return Values | See [TanStack Table](https://tanstack.com/table/v8/docs/api/core/table#table-api) documentation |

## Example

<CodeSandboxExample path="table-react-table-basic" />

[tanstack-table]: https://tanstack.com/table/v8
[refine-react-table]: https://github.com/refinedev/refine/tree/main/packages/react-table
[use-table-core]: /core/docs/data/hooks/use-table
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
[syncwithlocationparams]: /core/docs/core/interface-references#syncwithlocationparams
[notification-provider]: /core/docs/notification/notification-provider
[crudsorting]: /core/docs/core/interface-references#crudsorting
[crudfilters]: /core/docs/core/interface-references#crudfilters
[Refine swl]: /core/docs/core/refine-component#syncwithlocation
