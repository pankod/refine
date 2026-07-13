---
id: useTable
title: useTable
source: packages/antd/src/hooks/table/useTable
---

import BasicUsageLivePreview from "./\_partial-use-table-basic-usage-live-preview.md";
import SorterLivePreview from "./\_partial-use-table-sorter-live-preview.md";
import FilteringPreview from "./\_partial-use-table-filtering-live-preview.md";
import SearchPreview from "./\_partial-use-table-search-live-preview.md";
import RelationalLivePreview from "./\_partial-use-table-relational-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

By using `useTable`, you can get properties that are compatible with Ant Design [`<Table>`][table] component. All features such as sorting, filtering, and pagination come out of the box. Under the hood it uses [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) for the fetch.

For all the other features, you can refer to the Ant Design [`<Table>`][table] documentation.

:::info
`useTable` hook is extended from [`useTable`][use-table-core] hook from the [`@pankod/refine-core`](https://github.com/refinedev/refine/tree/v3/packages/core) package. This means that you can use all the features of [`useTable`][use-table-core] hook.
:::

## Basic usage

In basic usage, `useTable` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the URL.

<BasicUsageLivePreview />

## Pagination

This feature comes out of the box with the `tableProps.pagination`. It generates the pagination links for the `<Table>` component instead of react state and overrides `<Table>`'s `pagination.itemRender` value. It also syncs the pagination state with the URL.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

If you want to make a change in the pagination of the `<Table>`. You should pass the pagination object of the `tableProps` to the pagination property of the `<Table>` as below. You can override the values of the pagination object as your need.

```tsx
const { tableProps } = useTable<IPost>();

<Table
  {...tableProps}
  rowKey="id"
  // highlight-start
  pagination={{
    ...tableProps.pagination,
    position: ["bottomCenter"],
    size: "small",
  }}
  // highlight-end
>
  // ---
</Table>;
```

:::info
To disable pagination, you can set `hasPagination` property to `false` which is `true` by default. If `hasPagination` has set to `false`, pagination elements will be hidden in the `<Table/>`. If you want to handle the pagination on the client-side you can override the `pagination` property in `tableProps`.
:::

## Sorting

If we want to give a column the sorting property, the corresponding [`<Table.Column>`][table-column] component must be given the [sorter](https://ant.design/components/table/#components-table-demo-head) property.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<SorterLivePreview/>

:::caution

During the sorting process, the `key` property of your `<Column />` component is used as the property name in the API request. If your Column component does not have a `key` value, the `dataIndex` property is used.
It can be used when your DataIndex and your sorting key are different.

:::

:::tip
When using multiple sorting, `multiple` value is required for `sorter` property. Which specifies the priority of the column in sorting.
:::

## Filtering

We can use the `filterDropdown` property from [`<Table.Column>`][table-column] to make filtering based on the column values. In order to do this, we need to put the filtering form inside the [`<FilterDropdown>`][filter-dropdown] component and pass the properties coming to the function to these component's properties.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<FilteringPreview />

## Initial Filter and Sorter

:::caution
If you're using the `initialSorter` or `initialFilter`, don't forget to add `getDefaultSortOrder` or `defaultFilteredValue` to your `<Table.Column>` component. Otherwise, during filter and paging operations, the `initialSorter` might be lost.

```tsx
// ---
const { tableProps, sorter, filters } = useTable({
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
    initialFilter: [
        {
            field: "status",
            operator: "eq",
            value: "published",
        },
    ],
});

// ---
<Table.Column
    dataIndex="title"
    title="Title"
    // highlight-next-line
     defaultSortOrder={getDefaultSortOrder("title", sorter)}
/>
<Table.Column
    dataIndex="status"
    title="Status"
    render={(value) => <TagField value={value} />}
    // highlight-next-line
    defaultFilteredValue={getDefaultFilter("status", filters)}
    filterDropdown={(props) => (
        <FilterDropdown {...props}>
            <Radio.Group>
                <Radio value="published">Published</Radio>
                <Radio value="draft">Draft</Radio>
                <Radio value="rejected">Rejected</Radio>
            </Radio.Group>
        </FilterDropdown>
    )}
/>
// ---
```

:::

## Search

We can use [`onSearch`](#onsearch) and [`searchFormProps`](#searchformprops) properties to make custom filter form. `onSearch` is a function that is called when the form is submitted. `searchFormProps` is a property that is passed to the [`<Form>`](https://ant.design/components/form) component.

<SearchPreview/>

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

### `onSearch`

When [`searchFormProps.onFinish`](#searchformprops) is called, the `onSearch` function is called with the values of the form. The `onSearch` function should return [`CrudFilters | Promise<CrudFilters>`][crudfilters].
Also, `onSearch` will set the current page to 1.

It's useful when you want to filter the data with any query.

```tsx
const { searchFormProps, tableProps } = useTable({
  onSearch: (values) => {
    return [
      {
        field: "title",
        operator: "contains",
        value: values.title,
      },
    ];
  },
});

// --
<List>
  <Form {...searchFormProps}>
    <Space>
      <Form.Item name="title">
        <Input placeholder="Search by title" />
      </Form.Item>
      <SaveButton onClick={searchFormProps.form?.submit} />
    </Space>
  </Form>
  <Table {...tableProps} rowKey="id">
    <Table.Column title="Title" dataIndex="title" />
  </Table>
</List>;
// ---
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

Also, you can set this value globally on [`<Refine>`][refine swl] component.

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

### `tableProps`

The props needed by the [`<Table>`][table] component.

#### `onChange`

The callback function is executed when a user interacts(filter, sort, etc.) with the table.

> 🚨 `useTable` handles sorting, filtering, and pagination with this function. If you override this function, you need to handle these operations manually.

```tsx
const { tableProps } = useTable()

<Table {...tableProps} onChange={tableProps.onChange} rowKey="id">
    <Table.Column title="Title" dataIndex="title" />
</Table>
```

#### `dataSource`

Contains the data to be displayed in the table. Values fetched with [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/) hook.

#### `loading`

Indicates whether the data is being fetched.

#### `pagination`

Returns pagination configuration values(pageSize, current, position, etc.).

#### `scroll`

> Default: `{ x: true }`

Whether the table can be scrollable.

### `searchFormProps`

It returns [`<Form>`](https://ant.design/components/form/) instance of Ant Design. When `searchFormProps.onFinish` is called, it will trigger [`onSearch`](#onsearch) function.
You can also use `searchFormProps.form.submit` to submit the form manually.

It's useful when you want to create a filter form for your `<Table>`.

```tsx
import { IResourceComponentsProps, HttpError } from "@pankod/refine-core";
import {
  List,
  Table,
  useTable,
  Form,
  SaveButton,
  Input,
} from "@pankod/refine-antd";

interface IPost {
  id: number;
  title: string;
}

interface ISearch {
  title: string;
}

const PostList: React.FC<IResourceComponentsProps> = () => {
  const { searchFormProps, tableProps } = useTable<IPost, HttpError, ISearch>({
    onSearch: (values) => {
      return [
        {
          field: "title",
          operator: "contains",
          value: values.title,
        },
      ];
    },
  });

  return (
    <List>
      <Form {...searchFormProps} layout="inline">
        <Form.Item name="title">
          <Input placeholder="Search by title" />
        </Form.Item>
        {/* highlight-next-line */}
        <SaveButton onClick={searchFormProps.form?.submit} />
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column title="Title" dataIndex="title" />
      </Table>
    </List>
  );
};
```

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

A function creates accessible links for `syncWithLocation`. It takes an [SyncWithLocationParams][syncwithlocationparams] as parameters.

## FAQ

### How can I handle relational data?

You can use [`useMany`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/) hook to fetch relational data and filter `<Table>` by categories with help of [`useSelect`](http://localhost:3000/docs/api-reference/antd/hooks/field/useSelect/)

<RelationalLivePreview/>

## API

### Properties

<PropsTable module="@pankod/refine-antd/useTable"/>

### Type Parameters

| Property         | Desription                                                   | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData            | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Values for search params                                     |                            | `{}`                       |

### Return values

| Property         | Description                                                                           | Type                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| searchFormProps  | Ant Design [`<Form>`][form] props                                                     | [`FormProps<TSearchVariables>`][form]                                                                                                             |
| tableProps       | Ant Design [`<Table>`][table] props                                                   | [`TableProps<TData>`][table]                                                                                                                      |
| tableQueryResult | Result of the `react-query`'s `useQuery`                                              | [` QueryObserverResult<{`` data: TData[];`` total: number; },`` TError> `][usequery]                                                              |
| current          | Current page index state (returns `undefined` if pagination is disabled)              | `number` \| `undefined`                                                                                                                           |
| totalPage        | Total page count (returns `undefined` if pagination is disabled)                      | `number` \| `undefined`                                                                                                                           |
| setCurrent       | A function that changes the current (returns `undefined` if pagination is disabled)   | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| pageSize         | Current pageSize state (returns `undefined` if pagination is disabled)                | `number` \| `undefined`                                                                                                                           |
| setPageSize      | A function that changes the pageSize. (returns `undefined` if pagination is disabled) | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| sorter           | Current sorting state                                                                 | [`CrudSorting`][crudsorting]                                                                                                                      |
| filters          | Current filters state                                                                 | [`CrudFilters`][crudfilters]                                                                                                                      |
| setFilters       | A function that accepts a new filter state                                            | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |
| setSorter        | A function that accepts a new sorter state.                                           | `(sorter: CrudSorting) => void`                                                                                                                   |

<br />

## Example

<CodeSandboxExample path="table-antd-use-table" />

[use-table-core]: /core/docs/3.xx.xx/api-reference/core/hooks/useTable/
[table]: https://ant.design/components/table/#API
[table-column]: https://ant.design/components/table#column
[form]: https://ant.design/components/form/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[crudsorting]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudsorting
[crudfilters]: /core/docs/3.xx.xx/api-reference/core/interfaces#crudfilters
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[table search]: /advanced-tutorials/search/table-search.md
[refine swl]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#syncwithlocation
[filter-dropdown]: /core/docs/3.xx.xx/api-reference/antd/components/filter-dropdown/
[syncwithlocationparams]: /core/docs/3.xx.xx/api-reference/core/interfaces#syncwithlocationparams
[notification-provider]: /core/docs/3.xx.xx/api-reference/core/providers/notification-provider
