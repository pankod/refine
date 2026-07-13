---
title: "Table Management Concepts | Refine v4 Data Grids"
display_title: "Tables"
sidebar_label: "Tables"
description: "Learn the core principles of high-performance data tables. Concepts behind sorting, filtering, and pagination in Refine v4."
---

import BaseAntdTableExample from "./example/antd.tsx";
import BaseTanStackTable from "./example/tanstack-table";
import BaseCoreExample from "./example/core";
import BaseMaterialUITable from "./example/material-ui";
import BaseMantineTable from "./example/mantine";
import BaseChakraUITable from "./example/chakra-ui";
import SearchAntdTableExample from "./example/search-antd.tsx";
import SearchMaterialUI from "./example/search-material-ui.tsx";
import Relationship from "./example/relationship";
import Pagination from "./example/pagination";
import Filtering from "./example/filtering";
import Sorting from "./example/sorting";

Tables are essential in data-intensive applications, serving as the primary way for organizing and displaying data in a readable format using rows and columns. Their integration, however, is complex due to functionalities like sorting, filtering, and pagination. Refine's **tables** integration aims to make this process as simple as possible while providing as many real world features as possible out of the box. This guide will cover the basics of **tables** in Refine and how to use them.

## Handling Data

[`useTable`][use-table-core] allows us to fetch data according to the sorter, filter, and pagination states. Under the hood, it uses [`useList`][use-list] for the fetch. Its designed to be headless, but Refine offers seamless integration with several popular UI libraries, simplifying the use of their table components.

- [TanStack Table](https://react-table.tanstack.com/) (for Headless, Chakra UI, Mantine) - [Documentation](/core/docs/packages/list-of-packages)) - [Example](/core/docs/examples/table/tanstack-table/basic-tanstack-table/)
- [Ant Design Table](https://ant.design/components/table/#header) - [Documentation](/core/docs/ui-integrations/ant-design/hooks/use-table) - [Example](/core/docs/examples/table/antd/useTable)
- [Material UI DataGrid](https://mui.com/x/react-data-grid/) - [Documentation](/core/docs/ui-integrations/material-ui/hooks/use-data-grid) - [Example](/core/docs/examples/table/mui/useDataGrid)

## Basic Usage

The usage of the `useTable` hooks may slightly differ between UI libraries, however, the core functionality of `useTable` hook in [`@refinedev/core`][use-table-core] stays consistent in all implementations. The `useTable` hook in Refine's core is the foundation of all the other `useTable` implementations.

<Tabs wrapContent={false}>

<TabItem value="core" label="Refine's Core">

<BaseCoreExample />

[Check out Refine's `useTable` reference page to learn more about the usage and see it in action.][use-table-core]

</TabItem>

<TabItem value="tanstack-table" label="TanStack Table">

<BaseTanStackTable />

[Check out TanStack Table's `useTable` reference page to learn more about the usage and see it in action.](/core/docs/packages/list-of-packages#installation)

</TabItem>

<TabItem value="ant-design" label="Ant Design">

<BaseAntdTableExample />

[Check out Ant Design's `useTable` reference page to learn more about the usage and see it in action.](/core/docs/ui-integrations/ant-design/hooks/use-table)

</TabItem>

<TabItem value="material-ui" label="Material UI">

<BaseMaterialUITable />

[Check out Material UI's `useDataGrid` reference page to learn more about the usage and see it in action.](/core/docs/ui-integrations/material-ui/hooks/use-data-grid)

</TabItem>

<TabItem value="mantine" label={(<span><span className="block">Mantine</span><small className="block">TanStack Table</small></span>)}>

<BaseMantineTable />

[Check out TanStack Table's `useTable` reference page to learn more about the usage and see it in action.](/core/docs/packages/list-of-packages#installation)

</TabItem>

<TabItem value="chakra-ui" label={(<span><span className="block">Chakra UI</span><small className="block">TanStack Table</small></span>)}>

<BaseChakraUITable />

[Check out TanStack Table's `useTable` reference page to learn more about the usage and see it in action.](/core/docs/packages/list-of-packages#installation)

</TabItem>

</Tabs>

## Pagination <GuideBadge id="guides-concepts/data-fetching/#filters-sorters-and-pagination" />

`useTable` has a pagination feature. The pagination is done by passing the `current`, `pageSize` and, `mode` keys to `pagination` object.

- **current**: The page index.
- **pageSize**: The number of items per page.
- **mode**: Whether to use server side pagination or not.
  - When `server` is selected, the pagination will be handled on the server side.
  - When `client` is selected, the pagination will be handled on the client side. No request will be sent to the server.
  - When `off` is selected, the pagination will be disabled. All data will be fetched from the server.

You can also change the `current` and `pageSize` values by using the `setCurrent` and `setPageSize` functions that are returned by the `useTable` hook. Every change will trigger a new fetch.

<Pagination />

## Filtering <GuideBadge id="guides-concepts/data-fetching/#filters-sorters-and-pagination" />

`useTable` has a filter feature. The filter is done by using the `initial`, `permanent`, `defaultBehavior` and `mode` keys to `filters` object.

These states are a [`CrudFilters`][crudfilters] type for creating complex single or multiple queries.

- **initial**: The initial filter state. It can be changed by the `setFilters` function.
- **permanent**: The default and unchangeable filter state. It can't be changed by the `setFilters` function.
- **defaultBehavior**: The default behavior of the `setFilters` function.
  - When `merge` is selected, the new filters will be merged with the old ones.
  - When `replace` is selected, the new filters will replace the old ones. It means that the old filters will be deleted.
- **mode**: Whether to use server side filter or not.
  - When `server` is selected, the filters will be sent to the server.
  - When `off` is selected, the filters will be applied on the client side.

[`useTable`][use-table-core] will pass these states to [`dataProvider`][data-provider] for making it possible to fetch the data you need. Handling and adapting these states for API requests is the responsibility of the [`dataProvider`][data-provider]

<Filtering />

## Sorting <GuideBadge id="guides-concepts/data-fetching/#filters-sorters-and-pagination" />

[`useTable`][use-table-core] has a sorter feature. The sorter is done by passing the `initial` and `permanent` keys to `sorters` object. These states are a [`CrudSorter`][crudsorting] type for creating single or multiple queries.

- **initial**: The initial sorter state. It can be changed by the `setSorters` function.
- **permanent**: The default and unchangeable sorter state. It can't be changed by the `setSorters` function.

[`useTable`][use-table-core] will pass these states to [`dataProvider`][data-provider] for making it possible to fetch the data you need. Handling and adapting these states for API requests is the responsibility of the [`dataProvider`][data-provider]

You can change the sorters state by using the `setSorters` function. Every change will trigger a new fetch.

<Sorting />

## Search

`useTable` has a search feature with `onSearch`. The search is done by using the `onSearch` function with `searchFormProps`. These feature enables you to easily connect form state to the table filters.

- **onSearch**: function is triggered when the `searchFormProps.onFinish` is called. It receives the form values as the first argument and expects a promise that returns a [`CrudFilters`][crudfilters] type.
- **searchFormProps**: Has necessary props for the `<form>`.

For example we can fetch product with the name that contains the search value.

<Tabs wrapContent={false}>

<TabItem value="ant-design" label="Ant Design">

<SearchAntdTableExample />

[Check out Ant Design's `useTable` reference page to learn more about the usage and see it in action.](/core/docs/ui-integrations/ant-design/hooks/use-table)

</TabItem>

<TabItem value="material-ui" label="Material UI">

<SearchMaterialUI />

[Check out Material UI's `useDataGrid` reference page to learn more about the usage and see it in action.](/core/docs/ui-integrations/material-ui/hooks/use-data-grid)

</TabItem>

</Tabs>

## Integrating with Routers

### Resource <RouterBadge id="guides-concepts/routing/#relationship-between-resources-and-routes-"/>

`useTable` can infer current `resource` from the current route based on your resource definitions. This eliminates the need of passing these parameters to the hooks manually.

```tsx
useTable({
  // When the current route is `/products`, the resource prop can be omitted.
  resource: "products",
});
```

### Sync with Location <RouterBadge id="guides-concepts/routing/#usetable" /> <GlobalConfigBadge id="core/refine-component/#syncwithlocation" />

When you use the [`syncWithLocation`](/core/docs/data/hooks/use-table#syncwithlocation) feature, the `useTable`'s state (e.g., sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages, and to allow users to bookmark or share links to specific table views.

## Relationships <GuideBadge id="guides-concepts/data-fetching/#relationships" />

Refine handles data relations with data hooks(eg: `useOne`, `useMany`, etc.). This compositional design allows you to flexibly and efficiently manage data relationships to suit your specific requirements.

For example imagine each post has a many category. We can fetch the categories of the post by using the `useMany` hook.

 <Relationship />

[use-table-core]: /core/docs/data/hooks/use-table
[use-list]: /core/docs/data/hooks/use-list
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/docs/core/interface-references#baserecord
[crudsorting]: /core/docs/core/interface-references#crudsorting
[crudfilters]: /core/docs/core/interface-references#crudfilters
[httperror]: /core/docs/core/interface-references#httperror
[Refine swl]: /core/docs/core/refine-component#syncwithlocation
[syncwithlocationparams]: /core/docs/core/interface-references#syncwithlocationparams
[notification-provider]: /core/docs/notification/notification-provider
[data-provider]: /core/docs/data/data-provider
