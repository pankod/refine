---
title: "useTable Hook | Refine v4"
display_title: "useTable"
sidebar_label: "useTable"
description: "Learn how to build powerful data tables in Refine v4 with sorting, filtering, and pagination using the useTable hook."
source: packages/core/src/hooks/useTable
---

import BasicUsageLivePreview from "./\_partial-basic-usage-live-preview.md";
import PaginationLivePreview from "./\_partial-pagination-live-preview.md";
import SortingLivePreview from "./\_partial-sorting-live-preview.md";
import FilteringLivePreview from "./\_partial-filtering-live-preview.md";
import RelationalDataLivePreview from "./\_partial-relational-data-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

`useTable` allows us to fetch data according to the sorter, filter, and pagination states. Under the hood, it uses [`useList`](/core/docs/data/hooks/use-list) for the fetch. Since it is designed to be headless, it expects you to handle the UI.

:::simple Extended Versions

If you're looking for a complete table library, Refine supports two table libraries out of the box.

- [React Table](https://react-table.tanstack.com/) (for Headless, Chakra UI, Mantine) - [Documentation](/core/docs/packages/list-of-packages) - [Example](/core/docs/examples/table/tanstack-table/basic-tanstack-table/)
- [Ant Design Table](https://ant.design/components/table/#header) - [Documentation](/core/docs/ui-integrations/ant-design/hooks/use-table) - [Example](/core/docs/examples/table/antd/useTable)
- [Material UI Table](https://mui.com/x/react-data-grid/) - [Documentation](/core/docs/ui-integrations/material-ui/hooks/use-data-grid) - [Example](/core/docs/examples/table/mui/useDataGrid)

:::

## Usage

In basic usage, `useTable` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the URL.

<BasicUsageLivePreview />

## Pagination

`useTable` has a pagination feature. The pagination is done by passing the `current` and `pageSize` keys to `pagination` object. The `current` is the current page, and the `pageSize` is the number of records per page.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

By default, the `current` is 1 and the `pageSize` is 10. You can change default values by passing the `pagination.current` and `pagination.pageSize` props to the `useTable` hook.

You can also change the `current` and `pageSize` values by using the `setCurrent` and `setPageSize` functions that are returned by the `useTable` hook. Every change will trigger a new fetch.

By default, pagination happens on the server side. If you want to do pagination handling on the client side, you can pass the pagination.mode property and set it to "client". Also, you can disable the pagination by setting it to "off".

<PaginationLivePreview/>

## Sorting

`useTable` has a sorter feature. The sorter is done by using the `initial` and `permanent` keys to `sorters` object. The `initial` is the initial sorter state, and the `permanent` is the permanent sorter state. These states are a [`CrudSorter`][crudsorting] type that contains the field and the order of the sorter.

You can change the sorters state by using the `setSorters` function. Every change will trigger a new fetch.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<SortingLivePreview/>

## Filtering

`useTable` has a filter feature. The filter is done by using the `initial`, `permanent` and `defaultBehavior` keys to `filters` object. The `initial` is the initial filter state, and the `permanent` is the permanent filter state. These states are a [`CrudFilter`][crudfilters] type that contains the field, the operator, and the value of the filter.

You can change the filters state by using the `setFilters` function. Every change will trigger a new fetch.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

`setFilters` function can work in two different behaviors; `merge` (default) and `replace`. You can set the behavior by passing it as the second parameter. You can change the default behavior with the [`filters.defaultBehavior`](#filtersdefaultbehavior) prop.

:::simple Merge behavior

If you are using `merge` behavior and want to remove one of the filters, you should set the `value` to `undefined` or `null`. For `or` filters, you should set the `value` to an empty array `[]` to remove the filter.

:::

:::simple Finding the filter value

Refine provides the [`getDefaultFilter`](https://github.com/refinedev/refine/blob/716656d9ad3deb169c32685cdebbfd46bac44beb/packages/core/src/definitions/table/index.ts#L166) function, You can use this function to find the filter value for the specific field.

```tsx
import { getDefaultFilter, useTable } from "@refinedev/core";

const MyComponent = () => {
  const { filters } = useTable({
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: "John Doe",
        },
      ],
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

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

When the `useTable` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

## Properties

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

By default, it will try to read the `resource` value from the current URL.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  resource: "categories",
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### dataProviderName

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. It is useful when you want to use a different `dataProvider` for a specific resource.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  dataProviderName: "second-data-provider",
});
```

### pagination.current

Sets the initial value of the page index. Defaults to `1`.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  pagination: {
    current: 2,
  },
});
```

### pagination.pageSize

Sets the initial value of the page size. Defaults to `10`.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  pagination: {
    pageSize: 20,
  },
});
```

### pagination.mode

It can be `"off"`, `"server"` or `"client"`. Defaults to `"server"`.

- **"off":** Pagination is disabled. All records will be fetched.
- **"client":** Pagination is done on the client side. All records will be fetched and then the records will be paginated on the client side.
- **"server":**: Pagination is done on the server side. Records will be fetched by using the `current` and `pageSize` values.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  pagination: {
    mode: "client",
  },
});
```

### sorters.mode

It can be `"off"`, or `"server"`. Defaults to `"server"`.

- **"off":** `sorters` do not get sent to the server. You can use the `sorters` value to sort the records on the client side.
- **"server":**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  sorters: {
    mode: "server",
  },
});
```

### sorters.initial

Sets the initial value of the sorter. The `initial` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `sorters.permanent` prop.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  sorters: {
    initial: [
      {
        field: "name",
        order: "asc",
      },
    ],
  },
});
```

> For more information, refer to the [`CrudSorting` interface&#8594](/core/docs/core/interface-references#crudsorting)

### sorters.permanent

Sets the permanent value of the sorter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `sorters.initial` prop.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  sorters: {
    permanent: [
      {
        field: "name",
        order: "asc",
      },
    ],
  },
});
```

> For more information, refer to the [`CrudSorting` interface &#8594](/core/docs/core/interface-references#crudsorting)

### filters.mode

It can be `"off"` or `"server"`. Defaults to `"server"`.

- **"off":** `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
- **"server":**: Filters are done on the server side. Records will be fetched by using the `filters` value.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  filters: {
    mode: "off",
  },
});
```

### filters.initial

Sets the initial value of the filter. The `initial` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `filters.permanent` prop.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  filters: {
    initial: [
      {
        field: "name",
        operator: "contains",
        value: "Foo",
      },
    ],
  },
});
```

> For more information, refer to the [`CrudFilters` interface &#8594](/core/docs/core/interface-references#crudfilters)

### filters.permanent

Sets the permanent value of the filter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `filters.initial` prop.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  filters: {
    permanent: [
      {
        field: "name",
        operator: "contains",
        value: "Foo",
      },
    ],
  },
});
```

> For more information, refer to the [`CrudFilters` interface &#8594](/core/docs/core/interface-references#crudfilters)

### filters.defaultBehavior

The filtering behavior can be set to either `"merge"` or `"replace"`. Defaults to `"merge"`.

- When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

- When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed, and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  filters: {
    defaultBehavior: "replace",
  },
});
```

### syncWithLocation <GlobalConfigBadge id="core/refine-component/#syncwithlocation" />

When you use the `syncWithLocation` feature, the `useTable`'s state (e.g., sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages, and to allow users to bookmark or share links to specific table views. By default, this feature is disabled.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  syncWithLocation: true,
});
```

### queryOptions

`useTable` uses [`useList`](/core/docs/data/hooks/use-list) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery).

```tsx
import { useTable } from "@refinedev/core";
useTable({
  queryOptions: {
    retry: 3,
  },
});
```

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
import { useTable } from "@refinedev/core";
useTable({
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
    const { data, headers } = await httpClient.get(`${url}`, { headers });

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

After data is fetched successfully, `useTable` can call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx
import { useTable } from "@refinedev/core";
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

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

After data fetching is failed, `useTable` will call `open` function from [`NotificationProvider`][notification-provider] to show an error notification. With this prop, you can customize the error notification.

```tsx
import { useTable } from "@refinedev/core";
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

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.

```tsx
import { useTable } from "@refinedev/core";
useTable({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
import { useTable } from "@refinedev/core";
useTable({
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
import { useTable } from "@refinedev/core";
const { overtime } = useTable({
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

### ~~initialCurrent~~ <PropTag deprecated />

Use `pagination.current` instead.

### ~~initialPageSize~~ <PropTag deprecated />

Use `pagination.pageSize` instead.

### ~~hasPagination~~ <PropTag deprecated />

Use `pagination.mode` instead.

### ~~initialSorter~~ <PropTag deprecated />

Use `sorters.initial` instead.

### ~~permanentSorter~~ <PropTag deprecated />

Use `sorters.permanent` instead.

### ~~initialFilter~~ <PropTag deprecated />

Use `filters.initial` instead.

### ~~permanentFilter~~ <PropTag deprecated />

Use `filters.permanent` instead.

### ~~defaultSetFilterBehavior~~ <PropTag deprecated />

Use `filters.defaultBehavior` instead.

## Return Values

### tableQuery

Returned values from [`useList`](/core/docs/data/hooks/use-list) hook.

### sorters

Current [sorters state][crudsorting].

### setSorters

A function to set current [sorters state][crudsorting].

```tsx
 (sorters: CrudSorting) => void;
```

### filters

Current [filters state][crudfilters].

### setFilters

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

A function to set current [filters state][crudfilters].

### current

Current page index state. If pagination is disabled, it will be `undefined`.

### setCurrent

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page index state. If pagination is disabled, it will be `undefined`.

### pageSize

Current page size state. If pagination is disabled, it will be `undefined`.

### setPageSize

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page size state. If pagination is disabled, it will be `undefined`.

### pageCount

Total page count state. If pagination is disabled, it will be `undefined`.

### createLinkForSyncWithLocation

```tsx
(params: SyncWithLocationParams) => string;
```

A function creates accessible links for `syncWithLocation`. It takes [SyncWithLocationParams][syncwithlocationparams] as parameters.

### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
import { useTable } from "@refinedev/core";
const { overtime } = useTable();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

### ~~sorter~~ <PropTag deprecated />

Use `sorters` instead.

### ~~setSorter~~ <PropTag deprecated />

Use `setSorters` instead.

### ~~tableQueryResult~~ <PropTag deprecated />

Use [`tableQuery`](#tablequery) instead.

## FAQ

### How can I handle relational data?

You can use [`useMany`](/core/docs/data/hooks/use-many) hook to fetch relational data.

<RelationalDataLivePreview/>

### How can I handle client side filtering?

First, you need to set `filters.mode: "off"`

```tsx
import { useTable } from "@refinedev/core";
const { tableQuery, filters, setFilters } = useTable({
  filters: {
    mode: "off",
  },
});
```

Then, you can use the `filters` state to filter your data.

```tsx
// ...

const List = () => {
  const { tableQuery, filters } = useTable();

  // ...

  const filteredData = useMemo(() => {
    if (filters.length === 0) {
      return tableQuery.data;
    }

    // Filters can be a LogicalFilter or a ConditionalFilter. ConditionalFilter not have field property. So we need to filter them.
    // We use flatMap for better type support.
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : [],
    );

    return tableProps.dataSource.filter((item) => {
      return logicalFilters.some((filter) => {
        if (filter.operator === "eq") {
          return item[filter.field] === filter.value;
        }
      });
    });
  }, [tableQuery.data, filters]);
};

return (
  <div>
    {/* ...  */}
    <table>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id}>{/* ...  */}</tr>
        ))}
      </tbody>
    </table>
  </div>
);
```

### How can I handle client side sorting?

First, you need to set `sorters.mode: "off"`

```tsx
import { useTable } from "@refinedev/core";
const { tableQuery, sorters, setSorters } = useTable({
  sorters: {
    mode: "off",
  },
});
```

Then, you can use the `sorters` state to sort your data.

```tsx
// ...
import { useTable } from "@refinedev/core";
const List = () => {
  const { tableQuery, sorters } = useTable();

  // ...

  const sortedData = useMemo(() => {
    if (sorters.length === 0) {
      return tableQuery.data;
    }

    return tableQuery.data.sort((a, b) => {
      const sorter = sorters[0];

      if (sorter.order === "asc") {
        return a[sorter.field] > b[sorter.field] ? 1 : -1;
      } else {
        return a[sorter.field] < b[sorter.field] ? 1 : -1;
      }
    });
  }, [tableQuery.data, sorters]);

  return (
    <div>
      {/* ...  */}
      <table>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>{/* ...  */}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/useTable"
successNotification-default='"Successfully created `resource`" or "Successfully updated `resource`"'
errorNotification-default='"There was an error creating resource (status code: `statusCode`)" or "Error when updating resource (status code:statusCode)"'      />

### Type Parameters

| Property         | Description                                                                                                                                                         | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData     | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Values for search params                                                                                                                                            |                            | `{}`                       |
| TData            | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property                      | Description                                                                           | Type                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| tableQuery                    | Result of the `react-query`'s `useQuery`                                              | [` QueryObserverResult<{`` data: TData[];`` total: number; },`` TError> `][usequery]                                                              |
| current                       | Current page index state (returns `undefined` if pagination is disabled)              | `number` \| `undefined`                                                                                                                           |
| pageCount                     | Total page count (returns `undefined` if pagination is disabled)                      | `number` \| `undefined`                                                                                                                           |
| setCurrent                    | A function that changes the current (returns `undefined` if pagination is disabled)   | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| pageSize                      | Current pageSize state (returns `undefined` if pagination is disabled)                | `number` \| `undefined`                                                                                                                           |
| setPageSize                   | A function that changes the pageSize. (returns `undefined` if pagination is disabled) | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| sorters                       | Current sorting states                                                                | [`CrudSorting`][crudsorting]                                                                                                                      |
| setSorters                    | A function that accepts a new sorters state.                                          | `(sorters: CrudSorting) => void`                                                                                                                  |
| ~~sorter~~                    | Current sorting states                                                                | [`CrudSorting`][crudsorting]                                                                                                                      |
| ~~setSorter~~                 | A function that accepts a new sorters state.                                          | `(sorters: CrudSorting) => void`                                                                                                                  |
| filters                       | Current filters state                                                                 | [`CrudFilters`][crudfilters]                                                                                                                      |
| setFilters                    | A function that accepts a new filter state                                            | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |
| createLinkForSyncWithLocation | A function create accessible links for syncWithLocation                               | `(params: `[SyncWithLocationParams][syncwithlocationparams]`) => string;`                                                                         |
| overtime                      | Overtime loading props                                                                | `{ elapsedTime?: number }`                                                                                                                        |

[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/docs/core/interface-references#baserecord
[crudsorting]: /core/docs/core/interface-references#crudsorting
[crudfilters]: /core/docs/core/interface-references#crudfilters
[httperror]: /core/docs/core/interface-references#httperror
[Refine swl]: /core/docs/core/refine-component#syncwithlocation
[syncwithlocationparams]: /core/docs/core/interface-references#syncwithlocationparams
[notification-provider]: /core/docs/notification/notification-provider
