---
title: "useTable Hook | Best Practices for Usage & Patterns | Refine v5"
display_title: "useTable"
sidebar_label: "useTable"
description: "Secure Use Table in Refine v5. Learn best practices. Learn integration patterns for pagination, sorting for polished admin UIs. See practical code samples."
source: packages/antd/src/hooks/table/useTable
---

import BasicUsageLivePreview from "./\_partial-use-table-basic-usage-live-preview.md";
import SorterLivePreview from "./\_partial-use-table-sorter-live-preview.md";
import FilteringPreview from "./\_partial-use-table-filtering-live-preview.md";
import SearchPreview from "./\_partial-use-table-search-live-preview.md";
import RelationalLivePreview from "./\_partial-use-table-relational-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

By using `useTable`, you can get properties that are compatible with Ant Design [`<Table>`][table] component. All features such as sorting, filtering, and pagination come out of the box. Under the hood it uses [`useList`](/core/docs/data/hooks/use-list/) for the fetch.

For all the other features, you can refer to the Ant Design [`<Table>`][table] documentation.

`useTable` hook is extended from [`useTable`][use-table-core] hook from the [`@refinedev/core`](https://github.com/refinedev/refine/tree/main/packages/core) package. This means that you can use all the features of [`useTable`][use-table-core] hook.

## usage

In basic usage, `useTable` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the URL.

<BasicUsageLivePreview />

## Pagination

This feature comes out of the box with the `tableProps.pagination`. It generates the pagination links for the `<Table>` component instead of react state and overrides `<Table>`'s `pagination.itemRender` value.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

If you want to make a change in the pagination of the `<Table>`. You should pass the pagination object of the `tableProps` to the pagination property of the `<Table>` as below. You can override the values of the pagination object depending on your needs.

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

:::simple Implementation Tips

By default, pagination happens on the server side. If you want to do pagination handling on the client side, you can pass the pagination.mode property and set it to "client". Also, you can disable the pagination by setting the "off".

:::

## Sorting

If we want to give a column the sorting property, the corresponding [`<Table.Column>`][table-column] component must be given the [sorter](https://ant.design/components/table/#components-table-demo-head) property.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<SorterLivePreview/>

During the sorting process, the `key` property of your `<Column />` component is used as the property name in the API request. If your Column component does not have a `key` value, the `dataIndex` property is used.
It can be used when your DataIndex and your sorting key are different.

When using multiple sorting, `multiple` value is required for `sorter` property. Which specifies the priority of the column in sorting.

## Filtering

We can use the `filterDropdown` property from [`<Table.Column>`][table-column] to make filtering based on the column values. In order to do this, we need to put the filtering form inside the [`<FilterDropdown>`][filter-dropdown] component and pass the properties coming to the function to these component's properties.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<FilteringPreview />

## Initial Filter and Sorter

If you're using the `initial`, don't forget to add `getDefaultSortOrder` or `defaultFilteredValue` to your `<Table.Column>` component. Otherwise, hook states may not sync with the table.

```tsx
// ---
const { tableProps, sorters, filters } = useTable({
    sorters: {
        initial: [
            {
                field: "title",
                order: "asc",
            },
        ],
    }
    filters: {
        initial: [
            {
                field: "status",
                operator: "eq",
                value: "published",
            },
        ],
    },
});

// ---
<Table.Column
    dataIndex="title"
    title="Title"
    // highlight-next-line
     defaultSortOrder={getDefaultSortOrder("title", sorters)}
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

:::simple Finding the filter value

Refine provides the [`getDefaultFilter`](https://github.com/refinedev/refine/blob/716656d9ad3deb169c32685cdebbfd46bac44beb/packages/core/src/definitions/table/index.ts#L166) function, You can use this function to find the filter value for the specific field.

```tsx
import { getDefaultFilter } from "@refinedev/antd";
import { useTable } from "@refinedev/antd";

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

## Search

We can use the [`onSearch`](#onsearch) and [`searchFormProps`](#searchformprops) properties to make custom filter form. `onSearch` is a function that is called when the form is submitted. `searchFormProps` is a property that is passed to the [`<Form>`](https://ant.design/components/form) component.

<SearchPreview/>

## Realtime Updates

> [`LiveProvider`](/core/docs/realtime/live-provider/) is required for this prop to work.

When the `useTable` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

> For more information, refer to the [`liveProvider` documentation &#8594](/core/docs/realtime/live-provider/)

## Properties

### resource

<PropResource
hook={{
    name:"useList",
    URL:"/docs/data/hooks/use-list"
}}
method={{
    name:"getList",
    URL:"/docs/data/data-provider/#getlist"
}}
hasDefault={false}
/>

By default, it uses the inferred `resource` from the route.

```tsx
useTable({
  resource: "categories",
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### onSearch

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

### dataProviderName

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. It is useful when you want to use a different `dataProvider` for a specific resource.

```tsx
useTable({
  dataProviderName: "second-data-provider",
});
```

### pagination.currentPage

Sets the initial value of the page index. It is set to `1` by default.

```tsx
useTable({
  pagination: {
    currentPage: 2,
  },
});
```

### pagination.pageSize

Sets the initial value of the page size. It is set to `10` by default.

```tsx
useTable({
  pagination: {
    pageSize: 20,
  },
});
```

### pagination.mode

It can be `"off"`, `"server"` or `"client"`. It is set to `"server"` by default.

- **"off":** Pagination is disabled. All records will be fetched.
- **"client":** Pagination is done on the client side. All records will be fetched and then the records will be paginated on the client side.
- **"server":**: Pagination is done on the server side. Records will be fetched by using the `currentPage` and `pageSize` values.

```tsx
useTable({
  pagination: {
    mode: "client",
  },
});
```

### sorters.initial

Sets the initial value of the sorter. The `initial` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `sorters.permanent` prop.

> For more information, refer to the [`CrudSorting` interface documentation &#8594](/core/docs/core/interface-references#crudsorting)

```tsx
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

### sorters.permanent

Sets the permanent value of the sorter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `sorters.initial` prop.

> For more information, refer to the [`CrudSorting` interface documentation &#8594](/core/docs/core/interface-references#crudsorting)

```tsx
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

### sorters.mode

It can be `"off"`, or `"server"`. It is `"server"` by default.

- **"off":** `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
- **"server":**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

```tsx
useTable({
  sorters: {
    mode: "server",
  },
});
```

### filters.initial

Sets the initial value of the filter. The `initial` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `filters.permanent` prop.

> For more information, refer to the [`CrudFilters` interface documentation &#8594](/core/docs/core/interface-references#crudfilters)

```tsx
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

### filters.permanent

Sets the permanent value of the filter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `filters.initial` prop.

> For more information, refer to the [`CrudFilters` interface documentation &#8594](/core/docs/core/interface-references#crudfilters)

```tsx
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

### filters.defaultBehavior

The filtering behavior can be set to either `"merge"` or `"replace"`. By default, it is set to `"merge"`.

- When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

- When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useTable({
  filters: {
    defaultBehavior: "replace",
  },
});
```

### filters.mode

It can be `"off"` or `"server"`. It is `"server"` by default.

- **"off":** `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
- **"server":**: Filters are done on the server side. Records will be fetched by using the `filters` value.

```tsx
useTable({
  filters: {
    mode: "off",
  },
});
```

### syncWithLocation <GlobalConfigBadge id="core/refine-component/#syncwithlocation" />

When you use the `syncWithLocation` feature, the `useTable`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages, and to allow users to bookmark or share links to specific table views. It is set to `false` by default.

```tsx
useTable({
  syncWithLocation: true,
});
```

### queryOptions

`useTable` uses the [`useList`](/core/docs/data/hooks/use-list/) hook to fetch data. You can pass the [`queryOptions`](https://tanstack.com/query/v5/docs/react/reference/useQuery) to it like this:

```tsx
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

> For more information, refer to the [`meta` section of the General Concepts documentation &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
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

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

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

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

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

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider/) is required for this prop to work.

`liveMode` determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.

> For more information, refer to the [Live / Realtime documentation &#8594](/core/docs/realtime/live-provider#livemode)

```tsx
useTable({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useTable({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### liveParams

> [`LiveProvider`](/core/docs/realtime/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/realtime/live-provider#subscribe) method.

### overtimeOptions

If you want the loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.

`interval` is the time interval in milliseconds while `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
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

## Return Values

### tableProps

`tableProps` are the props needed by the [`<Table>`][table] component.

#### onChange

The `onChange` callback function is executed when a user interacts(filter, sort, etc.) with the table.

:::caution

`useTable` handles sorting, filtering, and pagination with this function. If you override this function, you need to handle these operations manually.

:::

```tsx
const { tableProps } = useTable()

<Table {...tableProps} onChange={tableProps.onChange} rowKey="id">
    <Table.Column title="Title" dataIndex="title" />
</Table>
```

#### dataSource

`dataSource` contains the data to be displayed in the table. Values fetched with [`useList`](/core/docs/data/hooks/use-list/) hook.

#### loading

`loading` indicates whether the data is being fetched.

#### pagination

`pagination` returns the pagination configuration values(pageSize, currentPage, position, etc.).

#### scroll

`scroll` is for making the table scrollable or not. It is set to `{ x: true }` by default.

### searchFormProps

`searchFormProps` returns [`<Form>`](https://ant.design/components/form/) instance of Ant Design. When `searchFormProps.onFinish` is called, it will trigger [`onSearch`](#onsearch) function.
You can also use `searchFormProps.form.submit` to submit the form manually.

It's useful when you want to create a filter form for your `<Table>`.

```tsx
import { HttpError } from "@refinedev/core";
import { List, useTable, SaveButton } from "@refinedev/antd";
import { Table, Form, Input } from "antd";

interface IPost {
  id: number;
  title: string;
}

interface ISearch {
  title: string;
}

const PostList: React.FC = () => {
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

### tableQuery

`tableQuery` are the returned values from [`useList`](/core/docs/data/hooks/use-list/) hook.

### sorters

`sorters` is the current [sorters state][crudsorting].

### setSorters

`setSorters` is a function to set current [sorters state][crudsorting].

```tsx
 (sorters: CrudSorting) => void;
```

### filters

`filters` is the current [filters state][crudfilters].

### setFilters

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

`setFilters` is a function to set current [filters state][crudfilters].

### currentPage

`currentPage` is the current page index state. If pagination is disabled, it will be `undefined`.

### setCurrentPage

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

`setCurrentPage` is a function to set the current page index state. If pagination is disabled, it will be `undefined`.

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

`createLinkForSyncWithLocation` is a function creates accessible links for `syncWithLocation`. It takes an [SyncWithLocationParams][syncwithlocationparams] as parameters.

### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useTable();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

## FAQ

### How can I handle relational data?

You can use the [`useMany`](/core/docs/data/hooks/use-many/) hook to fetch relational data and filter `<Table>` by categories with the help of [`useSelect`](/core/docs/ui-integrations/ant-design/hooks/use-select/)

<RelationalLivePreview/>

### How can I handle client side filtering?

You can set the [`filters.mode: "off"`](#filtersmode) in order to disable server-side filtering. `useTable` is fully compatible with [`Ant Design <Table> component's`](https://ant.design/components/table#components-table-demo-head) filtering feature.

```tsx
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

const ListPage = () => {
  const { tableProps } = useTable({
    filters: {
      mode: "off",
    },
  });

  return (
    <Table {...tableProps} rowKey="id">
      {/* ... */}
      <Table.Column
        dataIndex="status"
        title="Status"
        filters={[
          {
            text: "Published",
            value: "published",
          },
          {
            text: "Draft",
            value: "draft",
          },
          {
            text: "Rejected",
            value: "rejected",
          },
        ]}
        onFilter={(value, record) => record.status === value}
      />
    </Table>
  );
};
```

### How can I handle client side sorting?

You can set the [`sorters.mode: "off"`](#sortersmode) in order to disable server-side sorting. `useTable` is fully compatible with [`Ant Design <Table> component's`](https://ant.design/components/table#components-table-demo-head) sorting feature.

```tsx
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

const ListPage = () => {
  const { tableProps } = useTable({
    sorters: {
      mode: "off",
    },
  });

  return (
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" sorter={(a, b) => a.id - b.id} />
      {/* ... */}
    </Table>
  );
};
```

## API

### Properties

<PropsTable module="@refinedev/antd/useTable"/>

### Type Parameters

| Property         | Description                                                                                                                                                         | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData     | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Values for search params                                                                                                                                            |                            | `{}`                       |
| TData            | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property        | Description                                                                              | Type                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| searchFormProps | Ant Design [`<Form>`][form] props                                                        | [`FormProps<TSearchVariables>`][form]                                                                                                             |
| tableProps      | Ant Design [`<Table>`][table] props                                                      | [`TableProps<TData>`][table]                                                                                                                      |
| tableQuery      | Result of the `react-query`'s `useQuery`                                                 | [` QueryObserverResult<{`` data: TData[];`` total: number; },`` TError> `][usequery]                                                              |
| totalPage       | Total page count (returns `undefined` if pagination is disabled)                         | `number` \| `undefined`                                                                                                                           |
| currentPage     | Current page index state (returns `undefined` if pagination is disabled)                 | `number` \| `undefined`                                                                                                                           |
| setCurrentPage  | A function that changes the current page (returns `undefined` if pagination is disabled) | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| pageSize        | Current pageSize state (returns `undefined` if pagination is disabled)                   | `number` \| `undefined`                                                                                                                           |
| setPageSize     | A function that changes the pageSize. (returns `undefined` if pagination is disabled)    | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| sorters         | Current sorting state                                                                    | [`CrudSorting`][crudsorting]                                                                                                                      |
| setSorters      | A function that accepts a new sorters state.                                             | `(sorters: CrudSorting) => void`                                                                                                                  |
| ~~sorter~~      | Current sorting state                                                                    | [`CrudSorting`][crudsorting]                                                                                                                      |
| ~~setSorter~~   | A function that accepts a new sorters state.                                             | `(sorters: CrudSorting) => void`                                                                                                                  |
| filters         | Current filters state                                                                    | [`CrudFilters`][crudfilters]                                                                                                                      |
| setFilters      | A function that accepts a new filter state                                               | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |
| overtime        | Overtime loading props                                                                   | `{ elapsedTime?: number }`                                                                                                                        |

<br />

## Example

<CodeSandboxExample path="table-antd-use-table" />

[use-table-core]: /core/docs/data/hooks/use-table
[table]: https://ant.design/components/table/#API
[table-column]: https://ant.design/components/table#column
[form]: https://ant.design/components/form/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/docs/core/interface-references#baserecord
[crudsorting]: /core/docs/core/interface-references#crudsorting
[crudfilters]: /core/docs/core/interface-references#crudfilters
[httperror]: /core/docs/core/interface-references#httperror
[table search]: /advanced-tutorials/search/table-search.md
[Refine swl]: /core/docs/core/refine-component#syncwithlocation
[filter-dropdown]: /core/docs/ui-integrations/ant-design/components/filter-dropdown
[syncwithlocationparams]: /core/docs/core/interface-references#syncwithlocationparams
[notification-provider]: /core/docs/notification/notification-provider
