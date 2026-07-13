---
id: useSimpleList
title: useSimpleList
source: https://github.com/refinedev/refine/blob/v3/packages/antd/src/hooks/list/useSimpleList/useSimpleList.ts
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import SortingLivePreview from "./sorting-live-preview.md";
import FilteringLivePreview from "./filtering-live-preview.md";
import SearchLivePreview from "./search-live-preview.md";

By using `useSimpleList`, you can get properties that are compatible with Ant Design [`<List>`](https://ant.design/components/list/) component. All features such as sorting, filtering, and pagination come out of the box. Under the hood it uses [`useTable`](/core/docs/3.xx.xx/api-reference/core/hooks/useTable/) for the fetch.

For all the other features, you can refer to the Ant Design [`<List>`](https://ant.design/components/list/) documentation.

## Basic Usage

In the following example, we will show how to use `useSimpleList` to list the products.

It returns `listProps` which is compatible with Ant Design `<List>` component. By default, it reads [`resource`](#resource) from the current URL.

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

:::info
To disable pagination, you can set `hasPagination` property to `false` which is `true` by default. If `hasPagination` has been set to `false`, pagination elements will be hidden in the `<List>` and you can handle the pagination on the client-side by overriding the `pagination` property in `listProps`.
:::

## Sorting

The `useSimpleList` hook supports the sorting feature. You can pass the `initialSorter` property to the hook to set the initial sorting state.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<SortingLivePreview />

## Filtering

The `useSimpleList` hook supports the filtering feature. You can pass the `initialFilter` property to the hook to set the initial filtering state and you change the filtering state by using the `setFilter` function.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncWithLocation).

<FilteringLivePreview />

## Search

We can use [`onSearch`](#onsearch) property and [`searchFormProps`](#searchformprops) return value to make a custom filter form. `onSearch` is a function that is called when the form is submitted. `searchFormProps` is a property that is passed to the [`<Form>`](https://ant.design/components/form) component.

<SearchLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useSimpleList` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

### `resource`

The `useSimpleList` passes the `resource` to the `dataProvider` as a param. This parameter is usually used as an API endpoint path. It all depends on how to handle the resources in your `dataProvider`. See the [`creating a data provider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider#creating-a-data-provider) section for an example of how resources are handled.

The `resource` value is inferred from the current route where the component or the hook is used. It can be overridden by passing the `resource` prop.

The use case for overriding the `resource` prop:

- We can list a `category` from the `<ProductList>` page.

```tsx
import React from "react";
import { HttpError } from "@pankod/refine-core";
import { useSimpleList } from "@pankod/refine-antd";

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
  const { tableQueryResult: productsQueryResult } = useSimpleList<
    IProduct,
    HttpError
  >();

  const { tableQueryResult: categoriesQueryResult } = useSimpleList<
    ICategory,
    HttpError
  >({
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

### `initialCurrent`

> Default: `1`

Sets the initial value of the page index.

```tsx
useSimpleList({
  initialCurrent: 2, // This will cause the list to initially display the data for page 2, rather than the default of page 1
});
```

### `initialPageSize`

> Default: `10`

Sets the initial value of the page size. By default, the page size is 10.

```tsx
useSimpleList({
  initialPageSize: 20, // This will cause the list to initially display 20 rows per page, rather than the default of 10
});
```

### `initialSorter`

Sets the initial value of the sorter. The `initialSorter` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `permanentSorter` prop.

[Refer to the `CrudSorting` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudsorting)

```tsx
useSimpleList({
  initialSorter: [
    {
      field: "name",
      order: "asc",
    },
  ],
});
```

### `permanentSorter`

Sets the permanent value of the sorter. The `permanentSorter` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `initialSorter` prop.

[Refer to the `CrudSorting` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudsorting)

```tsx
useSimpleList({
  permanentSorter: [
    {
      field: "name",
      order: "asc",
    },
  ],
});
```

### `initialFilter`

Sets the initial value of the filter. The `initialFilter` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `permanentFilter` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudfilters)

```tsx
useSimpleList({
  initialFilter: [
    {
      field: "name",
      operator: "contains",
      value: "Foo",
    },
  ],
});
```

### `permanentFilter`

Sets the permanent value of the filter. The `permanentFilter` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `initialFilter` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudfilters)

```tsx
useSimpleList({
  permanentFilter: [
    {
      field: "name",
      operator: "contains",
      value: "Foo",
    },
  ],
});
```

### `defaultSetFilterBehavior`

> Default: `merge`

The filter behavior can be set to either `"merge"` or `"replace"`.

- When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

- When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useSimpleList({
  defaultSetFilterBehavior: "replace",
});
```

### `hasPagination`

> Default: `false`

Determines whether to use server-side pagination or not.

```tsx
useSimpleList({
  hasPagination: false,
});
```

### `syncWithLocation`

> Default: `false`

When you use the syncWithLocation feature, the `useSimpleList`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useSimpleList` state is automatically updated to match. This makes it easy to share list states across different routes or pages and allows users to bookmark or share links to specific table views.

Also, you can set this value globally on the [`<Refine>`][refine swl] component.

```tsx
useSimpleList({
  syncWithLocation: true,
});
```

### `queryOptions`

`useSimpleList` uses [`useTable`](/core/docs/3.xx.xx/api-reference/core/hooks/useTable/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery).

```tsx
useSimpleList({
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
useSimpleList({
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

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useSimpleList({
  dataProviderName: "second-data-provider",
});
```

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

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

### `errorNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

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

### `liveMode`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check the [Live / Realtime](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useSimpleList({
  liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useSimpleList({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### `liveParams`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) method.

### `onSearch`

When [`searchFormProps.onFinish`](#searchformprops) is called, the `onSearch` function is called with the values of the form. The `onSearch` function should return [`CrudFilters | Promise<CrudFilters>`][crudfilters]. When the `onSearch` function is called, the current page will be set to 1.

It's useful when you want to filter the data with multiple fields by using the `<Form>` component.

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

## Return Values

### `queryResult`

Returned values from [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) hook.

### `searchFormProps`

It returns [`<Form>`](https://ant.design/components/form/) instance of Ant Design. When `searchFormProps.onFinish` is called, it will trigger [`onSearch`](#onsearch) function.
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

### `listProps`

`listProps` is an object that contains compatible props for Ant Design [`<List>`][antd list] component.

#### `dataSource`

Contains the data to be displayed in the list. Values fetched with [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) hook.

#### `loading`

Indicates whether the data is being fetched.

#### `pagination`

Returns pagination configuration values(pageSize, current, position, etc.).

### `filters`

Current [filters state][crudfilters].

### `setFilters`

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

A function to set current [filters state][crudfilters].

## API

### Properties

<PropsTable module="@pankod/refine-antd/useSimpleList"/>

### Type Parameters

| Property         | Desription                                                      | Type                       | Default                    |
| ---------------- | --------------------------------------------------------------- | -------------------------- | -------------------------- |
| TData            | Result data of the mutation. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]       | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Antd form values                                                | `{}`                       | `{}`                       |

### Return values

| Property        | Description                                | Type                                                                                                                                                    |
| --------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| queryResult     | Result of the query of a record            | [`QueryObserverResult<{ data: TData }>`][usequery]                                                                                                      |
| searchFormProps | Ant design Form props                      | [`Form`][form]                                                                                                                                          |
| listProps       | Ant design List props                      | [`List`][list]                                                                                                                                          |
| filters         | Current filters state                      | [`CrudFilters`][crudfilters]                                                                                                                            |
| setFilters      | A function that accepts a new filter state | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` <br/> - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |

[crudfilters]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudfilters
[crudsorting]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudsorting
[form]: https://ant.design/components/form/#API
[list]: https://ant.design/components/list/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[refine swl]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#syncwithlocation
