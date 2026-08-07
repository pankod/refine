---
title: "useSimpleList Hook | Ant Design & Refine v4 Guide"
display_title: "useSimpleList"
sidebar_label: "useSimpleList"
description: "Master Ant Design List components. Documentation on managing pagination and data fetching for simple list views in your Refine v4 application."
source: https://github.com/refinedev/refine/blob/main/packages/antd/src/hooks/list/useSimpleList/useSimpleList.ts
---

import BasicUsageLivePreview from "./\_basic-usage-live-preview.md";
import SortingLivePreview from "./\_sorting-live-preview.md";
import FilteringLivePreview from "./\_filtering-live-preview.md";
import SearchLivePreview from "./\_search-live-preview.md";

By using `useSimpleList`, you can get properties that are compatible with the Ant Design's [`<List>`](https://ant.design/components/list/) component. All features such as sorting, filtering, and pagination come out of the box. `useSimpleList` uses [`useTable`](/core/docs/data/hooks/use-table) under the hood for the fetch.

For all the other features, you can refer to the Ant Design's [`<List>`](https://ant.design/components/list/) documentation.

## Usage

In the following example, we will show how to use `useSimpleList` to list the products.

It returns `listProps` which is compatible with the Ant Design's `<List>` component. By default, it reads the [`resource`](#resource) from the current URL.

<BasicUsageLivePreview />

## Pagination

This feature comes out of the box with the `listProps.pagination`. It generates the pagination links for the `<List>` component instead of react state and overrides `<List>`'s `pagination.itemRender` value.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

If you want to make a change in the pagination of the `<List>`. You should pass the pagination object of the `listProps` to the pagination property of the `<List>` as below. You can override the values of the pagination object as your need.

```tsx
// ...
const { listProps } = useSimpleList<IProduct>();

// ...

return (
  <AntdList
    {...listProps}
    renderItem={renderItem}
    // highlight-start
    pagination={{
      ...listProps.pagination,
      position: "top",
      size: "small",
    }}
    // highlight-end
  />
);
```

:::simple Implementation Tips

By default, pagination happens on the server side. If you want to do pagination handling on the client side, you can pass the pagination.mode property and set it to "client". You can also disable the pagination by setting it to "off".

:::

## Sorting

The `useSimpleList` hook supports the sorting feature. You can pass the `sorters` property to the hook to set the initial and permanent sorting state.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<SortingLivePreview />

## Filtering

The `useSimpleList` hook supports the filtering feature. You can pass the `filters` property to the hook to set the initial and permanent filtering state and you change the filtering state by using the `setFilter` function.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncWithLocation).

<FilteringLivePreview />

## Search

We can use the [`onSearch`](#onsearch) property and the [`searchFormProps`](#searchformprops) return value to make a custom filter form. `onSearch` is a function that is called when the form is submitted. `searchFormProps` is a property that is passed to the [`<Form>`](https://ant.design/components/form) component.

<SearchLivePreview />

## Realtime Updates

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

When the `useSimpleList` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

## Properties

### resource

The `useSimpleList` passes the `resource` to the `dataProvider` as a param. This parameter is usually used as an API endpoint path. It all depends on how to handle the resources in your `dataProvider`.

Refer to the [`creating a data provider`](/core/docs/data/data-provider#creating-a-data-provider) documentation for an example of how resources are handled.

The `resource` value is inferred from the current route where the component or the hook is used. It can be overridden by passing the `resource` prop.

The use case for overriding the `resource` prop:

- We can list a `category` from the `<ProductList>` page.

```tsx
import React from "react";
import { HttpError } from "@refinedev/core";
import { useSimpleList } from "@refinedev/antd";

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface ICategory {
  id: number;
  name: string;
}

export const ProductList: React.FC = () => {
  const { query: productsQuery } = useSimpleList<IProduct, HttpError>();

  const { query: categoriesQuery } = useSimpleList<ICategory, HttpError>({
    resource: "categories",
  });

  return <div>{/* ... */}</div>;
};
```

Also, you can give a URL path to the `resource` prop.

```tsx
useSimpleList({
  resource: "categories/subcategory", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### pagination.current

Sets the initial value of the page index. It is `1` by default.

```tsx
useSimpleList({
  pagination: {
    current: 2,
  },
});
```

### pagination.pageSize

Sets the initial value of the page size. It is `10` by default.

```tsx
useSimpleList({
  pagination: {
    pageSize: 20,
  },
});
```

### pagination.mode

It can be `"off"`, `"server"` or `"client"`. It is `"server"` by default.

- **"off":** Pagination is disabled. All records will be fetched.
- **"client":** Pagination is done on the client side. All records will be fetched and then the records will be paginated on the client side.
- **"server":**: Pagination is done on the server side. Records will be fetched by using the `current` and `pageSize` values.

```tsx
useSimpleList({
  pagination: {
    mode: "client",
  },
});
```

### sorters.initial

Sets the initial value of the sorter. The `initial` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `sorters.permanent` prop.

> For more information, refer to the [`CrudSorting` interface documentation &#8594](/core/docs/core/interface-references#crudsorting)

```tsx
useSimpleList({
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

### sorters.permanent

Sets the permanent value of the sorter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `sorters.initial` prop.

> For more information, refer to the [`CrudSorting` interface documentation &#8594](/core/docs/core/interface-references#crudsorting)

```tsx
useSimpleList({
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

### filters.initial

Sets the initial value of the filter. The `initial` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `filters.permanent` prop.

> For more information, refer to the [`CrudFilters` &#8594](/core/docs/core/interface-references#crudfilters)

```tsx
useSimpleList({
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

### filters.permanent

Sets the permanent value of the filter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `filters.initial` prop.

> For more information, refer to the [`CrudFilters` &#8594](/core/docs/core/interface-references#crudfilters)

```tsx
useSimpleList({
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

### filters.defaultBehavior

The filtering behavior can be set to either `"merge"` or `"replace"`. It is `merge` by default.

- When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

- When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useSimpleList({
  filters: {
    defaultBehavior: "replace",
  },
});
```

### syncWithLocation <GlobalConfigBadge id="core/refine-component/#syncwithlocation" />

When you use the syncWithLocation feature, the `useSimpleList`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useSimpleList` state is automatically updated to match. This makes it easy to share list states across different routes or pages and allows users to bookmark or share links to specific table views. `syncWithLocation` is set to `false` by default.

```tsx
useSimpleList({
  syncWithLocation: true,
});
```

### queryOptions

`useSimpleList` uses the [`useTable`](/core/docs/data/hooks/use-table) hook to fetch data. You can pass the [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery) to it like this:

```tsx
useSimpleList({
  queryOptions: {
    retry: 3,
  },
});
```

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

> For more information, refer to the [`meta` section of the General Concepts documentation for more information &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useSimpleList({
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

### dataProviderName

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. This is useful when you have a different data provider for different resources.

```tsx
useSimpleList({
  dataProviderName: "second-data-provider",
});
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

After data is fetched successfully, `useSimpleList` can call the `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useSimpleList({
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

After data fetching is failed, `useSimpleList` will call the `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useSimpleList({
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

Determines whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. It can be used to update and show data in Realtime throughout your app.

> For more information, refer to the [Live / Realtime documentation &#8594](/core/docs/realtime/live-provider#livemode)

```tsx
useSimpleList({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useSimpleList({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### liveParams

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/realtime/live-provider#subscribe) method.

### onSearch

When [`searchFormProps.onFinish`](#searchformprops) is called, the `onSearch` function is called with the values of the form. The `onSearch` function should return [`CrudFilters | Promise<CrudFilters>`][crudfilters]. When the `onSearch` function is called, the current page will be set to 1.

`onSearch` is useful when you want to filter the data with multiple fields by using the `<Form>` component.

```tsx
// ...

const { searchFormProps, listProps } = useSimpleList({
  onSearch: (values) => {
    return [
      {
        field: "name",
        operator: "contains",
        value: values.name,
      },
      {
        field: "description",
        operator: "contains",
        value: values.description,
      },
    ];
  },
});

// ...

return (
  <div>
    <Form {...searchFormProps} layout="inline">
      <Form.Item name="name">
        <Input placeholder="Search by name" />
      </Form.Item>
      <Form.Item name="description">
        <Input placeholder="Search by description" />
      </Form.Item>
      <Button type="primary" onClick={searchFormProps.form?.submit}>
        Search
      </Button>
    </Form>
    <AntdList {...listProps} renderItem={renderItem} />
  </div>
);
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

### overtimeOptions

If you want the loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful if you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds while `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useSimpleList({
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

## Return Values

### query

`query` is the returned values from [`useList`](/core/docs/data/hooks/use-list) hook.

### searchFormProps

`searchFormProps` returns the [`<Form>`](https://ant.design/components/form/) instance of Ant Design. When `searchFormProps.onFinish` is called, it will trigger [`onSearch`](#onsearch) function.
You can also use `searchFormProps.form.submit` to submit the form manually.

It's useful when you want to create a filter form for your `<List>`.

```tsx
// ...

const { searchFormProps, listProps } = useSimpleList({
  onSearch: (values) => {
    return [
      {
        field: "name",
        operator: "contains",
        value: values.name,
      },
      {
        field: "description",
        operator: "contains",
        value: values.description,
      },
    ];
  },
});

// ...

return (
  <div>
    <Form {...searchFormProps} layout="inline">
      <Form.Item name="name">
        <Input placeholder="Search by name" />
      </Form.Item>
      <Form.Item name="description">
        <Input placeholder="Search by description" />
      </Form.Item>
      <Button type="primary" onClick={searchFormProps.form?.submit}>
        Search
      </Button>
    </Form>
    <AntdList {...listProps} renderItem={renderItem} />
  </div>
);
```

### listProps

`listProps` is an object that contains compatible props for Ant Design [`<List>`][antd list] component.

#### dataSource

`dataSource` contains the data to be displayed in the list. Values are fetched with the [`useList`](/core/docs/data/hooks/use-list) hook.

#### loading

`loading` indicates whether the data is being fetched or not.

#### pagination

`pagination` returns the pagination configuration values(pageSize, current, position, etc.).

### sorters

`sorters` is the current [sorters state][crudsorting].

### setSorters

`setSorters` is a function to set the current[sorters state][crudsorting].

```tsx
 (sorters: CrudSorting) => void;
```

### filters

`filters` is the current [filters state][crudfilters].

### setFilters

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

`setFilters` is a function to set the current [filters state][crudfilters].

### current

`current` is the current page index state. If pagination is disabled, it will be `undefined`.

### setCurrent

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

`setCurrent` is a function to set the current page index state. If pagination is disabled, it will be `undefined`.

### pageSize

`pageSize` is the current page size state. If pagination is disabled, it will be `undefined`.

### setPageSize

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

`setPageSize` is a function to set the current page size state. If pagination is disabled, it will be `undefined`.

### pageCount

`pageCount` is the total page count state. If pagination is disabled, it will be `undefined`.

### createLinkForSyncWithLocation

```tsx
(params: SyncWithLocationParams) => string;
```

`createLinkForSyncWithLocation` is a function that creates accessible links for `syncWithLocation`. It takes an [SyncWithLocationParams][syncwithlocationparams] as parameters.

### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useSimpleList();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

### ~~sorter~~ <PropTag deprecated />

Use `sorters` instead.

### ~~setSorter~~ <PropTag deprecated />

Use `setSorters` instead.

### ~~queryResult~~ <PropTag deprecated />

Use [`query`](#query) instead.

## API

### Properties

<PropsTable module="@refinedev/antd/useSimpleList"/>

### Type Parameters

| Property         | Description                                                                                                                                                         | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData     | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Antd form values                                                                                                                                                    | `{}`                       | `{}`                       |
| TData            | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property        | Description                                                                           | Type                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| query           | Result of the query of a record                                                       | [`QueryObserverResult<{ data: TData }>`][usequery]                                                                                                      |
| searchFormProps | Ant design Form props                                                                 | [`Form`][form]                                                                                                                                          |
| listProps       | Ant design List props                                                                 | [`List`][list]                                                                                                                                          |
| totalPage       | Total page count (returns `undefined` if pagination is disabled)                      | `number` \| `undefined`                                                                                                                                 |
| current         | Current page index state (returns `undefined` if pagination is disabled)              | `number` \| `undefined`                                                                                                                                 |
| setCurrent      | A function that changes the current (returns `undefined` if pagination is disabled)   | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                           |
| pageSize        | Current pageSize state (returns `undefined` if pagination is disabled)                | `number` \| `undefined`                                                                                                                                 |
| setPageSize     | A function that changes the pageSize. (returns `undefined` if pagination is disabled) | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                           |
| sorters         | Current sorting state                                                                 | [`CrudSorting`][crudsorting]                                                                                                                            |
| setSorters      | A function that accepts a new sorters state.                                          | `(sorters: CrudSorting) => void`                                                                                                                        |
| ~~sorter~~      | Current sorting state                                                                 | [`CrudSorting`][crudsorting]                                                                                                                            |
| ~~setSorter~~   | A function that accepts a new sorters state.                                          | `(sorters: CrudSorting) => void`                                                                                                                        |
| filters         | Current filters state                                                                 | [`CrudFilters`][crudfilters]                                                                                                                            |
| setFilters      | A function that accepts a new filter state                                            | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` <br/> - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |
| overtime        | Overtime loading props                                                                | `{ elapsedTime?: number }`                                                                                                                              |

[crudfilters]: /core/docs/core/interface-references#crudfilters
[crudsorting]: /core/docs/core/interface-references#crudsorting
[form]: https://ant.design/components/form/#API
[list]: https://ant.design/components/list/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
[Refine swl]: /core/docs/core/refine-component#syncwithlocation
