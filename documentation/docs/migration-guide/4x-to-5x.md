---
title: "4x to 5x Migration Guide | Migration Guide in Refine v5"
display_title: "Migrating from 4.x.x to 5.x.x"
description: "Explore how to migrate 4x To 5x in Refine v5. Explore best practices for affects and changes for real-world React admin panels. See practical code samples."
sidebar_label: 4.x.x to 5.x.x
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

## Motivation Behind the Release

**Refine v5** removes deprecated APIs and legacy systems, upgrades to TanStack Query v5, and adds React 19 support. The result is a cleaner, faster codebase with better developer experience.

:::caution
Before upgrading to Refine 5, make sure that you are using Refine 4.x.x.

If you are using Refine 3.x.x, [refer to the migration guide for details on upgrading from 3.x.x to 4.x.x ](/core/docs/migration-guide/3x-to-4x/)
:::

<h2>Migration Steps </h2>

- **Step 1**: [Upgrade the dependencies](#1-upgrade-all-refine-dependencies-to-v5)
- **Step 2**: [Remove the deprecated APIs](#2-remove-all-deprecated-apis-from-refine-v4)
- **Step 3**: [Update the router provider][router-provider-migration]
- **Step 4**: [Update the auth provider][auth-provider-migration]
- **Step 5**: [Upgrade TanStack Query](#5-upgrade-tanstack-query-to-v5)
- **(Optional) Step 6**: [Optional: Upgrade React](#6-optionally-upgrade-react-to-v19)

## 1. Upgrade All Refine Dependencies to v5

#### Package Version Changes

All Refine packages have been bumped to the next major version as a coordinated release. This ensures maximum stability and compatibility when using packages together - all Refine v5 packages are tested as a complete ecosystem.

| Package                      | v4 Version | v5 Version |
| ---------------------------- | ---------- | ---------- |
| `@refinedev/core`            | 4.x.x      | 5.x.x      |
| `react`                      | 17 or 18   | 18 or 19   |
| `@tanstack/react-query`      | 4.x.x      | 5.x.x      |
| `@refinedev/antd`            | 5.x.x      | 6.x.x      |
| `@refinedev/mui`             | 6.x.x      | 7.x.x      |
| `@refinedev/mantine`         | 2.x.x      | 3.x.x      |
| `@refinedev/chakra-ui`       | 2.x.x      | 3.x.x      |
| `@refinedev/react-hook-form` | 4.x.x      | 5.x.x      |
| `@refinedev/react-table`     | 5.x.x      | 6.x.x      |
| `@refinedev/react-router`    | 1.x.x      | 2.x.x      |
| `@refinedev/nextjs-router`   | 6.x.x      | 7.x.x      |
| `@refinedev/remix-router`    | 3.x.x      | 4.x.x      |
| `@refinedev/inferencer`      | 5.x.x      | 6.x.x      |
| `@refinedev/devtools`        | 1.x.x      | 2.x.x      |

<Tabs
defaultValue="refine-cli"
values={[
{label: 'Update with Refine CLI', value: 'refine-cli'},
{label: 'Manual Update', value: 'manual'},
]}>

<TabItem value="refine-cli">

⚡️ You can easily update Refine packages with the Refine CLI [`update`](/core/docs/packages/cli/#update) command.

```bash
npm run refine update
```

:::caution
**React Query v5 is required for Refine v5**. Make sure to install it when updating:

```bash
npm i @tanstack/react-query@5
```

:::

> [Want to add Refine CLI to an existing project?](/core/docs/packages/cli/#how-to-add-to-an-existing-project)

</TabItem>

<TabItem value="manual">

You need to update all `@refinedev/*` packages to their compatible v5 versions. Use the version table above to find the correct version for each package you're using in your project.

**Core packages (required):**

```bash
npm i @refinedev/core@^5.0.0 @tanstack/react-query@^5.0.0
```

**UI library packages (choose based on what you're using):**

```bash
# If using Ant Design
npm i @refinedev/antd@^6.0.0

# If using Material-UI
npm i @refinedev/mui@^7.0.0

# If using Mantine
npm i @refinedev/mantine@^3.0.0

# If using Chakra UI
npm i @refinedev/chakra-ui@^3.0.0
```

**Router packages (choose based on your router):**

```bash
# If using React Router
npm i @refinedev/react-router@^2.0.0

# If using Next.js
npm i @refinedev/nextjs-router@^7.0.0

# If using Remix
npm i @refinedev/remix-router@^4.0.0
```

**Additional packages (if you're using them):**

```bash
# Form handling
npm i @refinedev/react-hook-form@^5.0.0

# Table handling
npm i @refinedev/react-table@^6.0.0

# Data providers (update the ones you use)
npm i @refinedev/simple-rest@^5.0.0
npm i @refinedev/graphql@^6.0.0
npm i @refinedev/strapi-v4@^5.0.0
npm i @refinedev/supabase@^5.0.0
# ... and others based on your data provider
```

**Example for a complete Ant Design project:**

```bash
npm i @refinedev/core@^5.0.0 @refinedev/antd@^6.0.0 @refinedev/react-router@^2.0.0 @refinedev/simple-rest@^5.0.0 @tanstack/react-query@^5.0.0
```

</TabItem>

</Tabs>

Once dependencies are updated, proceed with the following breaking changes:

---

## 2. Remove All Deprecated APIs from Refine v4

All deprecated APIs marked for removal in v4 have been completely removed in v5.

<Tabs
wrapContent={false}
defaultValue="codemod"
values={[
{label: '✨ Refine Codemod (Recommended)', value: 'codemod'},
{label: 'Manual Update', value: 'manual'},
]}>

<TabItem value="codemod">

<h4>🪄 Migrating your project automatically with refine-codemod ✨ (recommended) </h4>

The [`@refinedev/codemod`][refine-codemod] package handles the breaking changes for your project and automatically migrates it from `4.x.x` to `5.x.x`.

Simply `cd` into the root folder of your project (where the `package.json` is located) and run this command:

```sh
npx @refinedev/codemod@latest refine4-to-refine5
```

> 👉 **Hook Return Type Changes**: The codemod updates most standard cases, but may miss complex destructuring, conditional logic, or custom wrappers. Please review [Data & Mutation Hooks: Return Type Breaking Changes](#data--mutation-hooks-return-type-breaking-changes) if you use these patterns.

<h3>⚠️ Changes not handled by the codemod </h3>

Unfortunately, the codemod cannot cover every case. While it automates most of the migration, some changes still require manual updates. Below is the list of removed or modified APIs that you'll need to adjust yourself.

<h3>useNavigation → useGo</h3>

🚨 <strong>Affects:</strong> Navigation helpers (<code>push</code>, <code>replace</code>, <code>goBack</code>)

The return values from <code>useNavigation</code> have been removed. You should now use <code>useGo</code> for navigation:

```diff
- import { useNavigation } from "@refinedev/core";
+ import { useGo } from "@refinedev/core";

- const { replace, push } = useNavigation();
- replace("/tasks/new");
+ const go = useGo();
+ go({ to: "/tasks/new", type: "replace" });
+ go({ to: "/tasks/new", type: "push" });
```

For backward navigation (<code>goBack</code>), use your router’s native API instead.

```diff
- import { useNavigation } from "@refinedev/core";
+ import { useNavigate } from "react-router";

- const { goBack } = useNavigation();
+ const navigate = useNavigate();
- goBack();
+ navigate(-1);
```

<h3>ITreeMenu → TreeMenuItem & list field changes</h3>

🚨 <strong>Affects:</strong> <code>useMenu</code>, custom sider renderers

- <code>ITreeMenu</code> has been removed → use <code>TreeMenuItem</code> instead (codemod updates this).
- <code>list</code> is now always a string route.  
   <code>list.path</code> is gone and <code>list</code> is no longer a function.

**Why:**  
Previously, you could define a React component in the <code>&lt;Refine /&gt;</code> resource as <code>list</code>. This is no longer supported. Routes/components must be defined in your router. Because of this, <code>list</code> is now just a route string, not a function or object with <code>path</code>.

```diff
- const { menuItems, selectedKey } = useMenu();
- menuItems.map((item: ITreeMenu) => {
-   const { key, list } = item;
-   const route =
-     typeof list === "string"
-       ? list
-       : typeof list !== "function"
-       ? list?.path
-       : key;
- });
+ const { menuItems, selectedKey } = useMenu();
+ menuItems.map((item: TreeMenuItem) => {
+   const { list } = item;
+   const route = list ?? key; // always a string route now
+ });

```

</TabItem>

<TabItem value="manual">

If you’d like to migrate manually, or if the codemod didn’t cover all of your cases, check the [full list of breaking changes](#list-of-all-breaking-changes) with before/after examples.

</TabItem>

</Tabs>

## 3. Refactor Legacy Router Provider to use new Router Provider

If your project is still using the `legacyRouterProvider` provider, you'll need to migrate to the new router system. The new router provider offers greater flexibility and better integration with modern routing patterns.

Please refer these guides to refactor your project:

- [Migrating Router Provider from 3.x.x to 4.x.x][router-provider-migration]
- [React Router v6 to v7](/core/docs/routing/integrations/react-router/migration-guide-v6-to-v7/)

## 4. Refactor Legacy Auth Provider to use new Auth Provider

If your project is still using the legacy auth provider `legacyAuthProvider` or auth hooks with `v3LegacyAuthProviderCompatible: true`, you **must** migrate to the modern auth provider structure because these are completely removed.

For complete migration instructions, please refer to the [Auth Provider Migration Guide][auth-provider-migration].

```diff
useLogin({
-    v3LegacyAuthProviderCompatible: true,
});

<Refine
-    legacyAuthProvider={legacyAuthProvider}
+    authProvider={authProvider}
/>
```

## 5. Upgrade TanStack Query to v5

You'll need to upgrade TanStack Query from v4 to v5. Please refer to the [TanStack Query migration guide](https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5) for detailed instructions on this upgrade.

## 6. Upgrade React to v19 (optional)

Refine v5 supports both React 18 and React 19. If you want to take advantage of the latest React features, you can optionally upgrade to React 19. Please refer to the [React 19 release notes](https://react.dev/blog/2024/04/25/react-19) for more information about the new features and migration considerations.

[refine-codemod]: https://github.com/refinedev/refine/tree/main/packages/codemod
[router-provider-migration]: /core/docs/migration-guide/router-provider/
[auth-provider-migration]: /core/docs/migration-guide/auth-provider/

## Data & Mutation Hooks: Return Type Breaking Changes

🚨 **Affects:** All data and mutation hooks (`useList`, `useTable`, `useInfiniteList`, `useOne`, `useMany`, `useForm`, `useCreate`, `useUpdate`, etc.)

Return types of data and mutation hooks were refactored for clarity and consistency. Query state (`isLoading`, `isError`, `error`, etc.) and mutation state (`isPending`, `isError`, `error`, etc.) are now grouped under `query` and `mutation` objects respectively, while normalized values (`data`, `total`, etc.) are returned under a `result` object.
This change:

- Unifies the shape of return types across all hooks.
- Eliminates nested property access (e.g., `data?.data`).
- Improves type safety and developer experience.
- Groups all TanStack Query APIs (`isLoading`, `isError`, `refetch`, etc.) under the `query` object, making them easier to discover and use consistently.

The following sections show hook-specific breaking changes with before/after usage examples.

### useList

```diff
const {
-   data,
-   isLoading,
-   isError,
} = useList();

- const posts = data.data
- const total = data.total

const {
+   result,
+   query: { isLoading, isError },
} = useList();

+ const posts = result.data;
+ const total = result.total;
```

### useOne, useMany, useShow

All three hooks follow the same `query` and `result` pattern.

```diff
const {
-   data,
-   isLoading,
-   isError,
} = useOne({
    resource: "users",
    id: 1,
});

- const user = data.data;

const {
+   result,
+   query: { isLoading, isError },
} = useOne({
    resource: "users",
    id: 1,
});

+ const user = result;
```

### useTable from @refinedev/react-table

🚨 **Affects:** TanStack Table properties grouping

TanStack Table properties are now grouped under a `reactTable` object for better organization.

```diff
const {
-   getHeaderGroups,
-   getRowModel,
-   setOptions,
-   getState,
-   setPageIndex,
    refineCore: { filters, setCurrentPage, setFilters },
} = useTable({
    columns,
});

const {
+   reactTable: {
+       getHeaderGroups,
+       getRowModel,
+       setOptions,
+       getState,
+       setPageIndex,
+   },
    refineCore: { filters, setCurrentPage, setFilters },
} = useTable({
    columns,
});
```

### useTable from @refinedev/core

✅ There are no breaking changes in `useTable`. However, we introduced a new result property to make data access easier and keep consistency across all hooks.

```diff
const {
    tableQuery,
+   result: {
+       data,
+       total,
+   },
} = useTable();

+ const posts = result.data;
+ const total = result.total;
```

### useTable from @refinedev/antd

✅ There are no breaking changes in `useTable`. However, we introduced a new `result` property to make data access easier and keep consistency across all hooks.

```diff
const {
    tableProps,
+   result: {
+       data,
+       total,
+   },
} = useTable();

+ const posts = result.data;
+ const total = result.total;
```

### useDataGrid from @refinedev/mui

✅ There are no breaking changes in `useDataGrid`. However, we introduced a new `result` property to make data access easier and keep consistency across all hooks.

```diff
const {
    tableQuery,
    dataGridProps,
+   result: {
+       data,
+       total,
+   },
} = useDataGrid();

+ const posts = result.data;
+ const total = result.total;
```

### useSimpleList from @refinedev/antd

✅ There are no breaking changes in `useSimpleList`. However, we introduced a new `result` property to make data access easier and keep consistency across all hooks.

**Migration:**

```diff
const {
    listProps,
    queryResult,
+   query,
+   result: {
+       data,
+       total,
+   },
} = useSimpleList();
```

### useInfiniteList

```diff
const {
-  data,
-  isLoading,
-  isError,
-  fetchNextPage,
-  hasNextPage,
} = useInfiniteList({
  resource: "posts",
});

- const posts = data?.data;

const {
+  result,
+  query: { isLoading, isError, fetchNextPage, hasNextPage },
} = useInfiniteList({ resource: "posts" });

+ const posts = result.data;
```

### Mutation Hooks

🚨 **Affects:** All other mutation hooks (`useUpdate`, `useDelete`, `useCreateMany`, `useUpdateMany`, `useDeleteMany`, `useCustomMutation`)

All remaining mutation hooks follow the same pattern as `useUpdate`.

```diff
const {
-  isPending,
-  isError,
   mutate,
   mutateAsync,
} = useUpdate({ resource: "posts" });

const {
+  mutation: { isPending, isError },
   mutate,
   mutateAsync,
} = useUpdate({ resource: "posts" });
```

## List of All Breaking Changes

### metaData → meta

🚨 Affects: All data hooks, useForm, useTable, useDataGrid, useSelect, etc.

The `metaData` parameter has been renamed to `meta` across all hooks:

```diff
useList({
-    metaData: { foo: "bar" },
+    meta: { foo: "bar" },
})

useOne({
-    metaData: { headers: { "Authorization": "Bearer token" } },
+    meta: { headers: { "Authorization": "Bearer token" } },
})

useCreate({
-    metaData: { endpoint: "custom" },
+    meta: { endpoint: "custom" },
})
```

#### AuthBindings → AuthProvider (Type Imports)

🚨 Affects: Type imports from @refinedev/core

Type interfaces have been renamed in @refinedev/core. When importing these types, you'll need to update the import names while preserving usage with aliases:

```diff
// AuthBindings → AuthProvider
- import { type AuthBindings } from "@refinedev/core";
+ import { type AuthProvider  } from "@refinedev/core";

```

#### RouterBindings → RouterProvider (Type Imports)

🚨 Affects: Type imports from @refinedev/core

Type interfaces have been renamed in @refinedev/core. When importing these types, you'll need to update the import names while preserving usage with aliases:

```diff

- import type { RouterBindings } from "@refinedev/core";
+ import type { RouterProvider  } from "@refinedev/core";
```

#### sorter/sort → sorters

🚨 Affects: useList, useInfiniteList, useTable, useDataGrid, useSelect

The `sorter` and `sort` parameters have been renamed to `sorters`:

```diff
useList({
-    sort: [{ field: "title", order: "asc" }],
+    sorters: [{ field: "title", order: "asc" }],
})

useTable({
-    initialSorter: [{ field: "createdAt", order: "desc" }],
+    sorters: {
+        initial: [{ field: "createdAt", order: "desc" }]
+    },
})
```

### filters Updates

🚨 Affects: useList, useTable, useDataGrid, useSelect

Filter configuration has been simplified and moved out of config objects:

```diff
useList({
-    config: {
-        filters: [{ field: "status", operator: "eq", value: "published" }],
-    },
+    filters: [{ field: "status", operator: "eq", value: "published" }],
})

useTable({
-    initialFilter: [{ field: "category", operator: "eq", value: "tech" }],
-    permanentFilter: [{ field: "status", operator: "eq", value: "active" }],
+    filters: {
+        initial: [{ field: "category", operator: "eq", value: "tech" }],
+        permanent: [{ field: "status", operator: "eq", value: "active" }]
+    },
})
```

### pagination Updates

🚨 Affects: useList, useTable, useDataGrid, useSelect

Pagination configuration has been restructured:

```diff
useList({
-    hasPagination: false,
+    pagination: { mode: "off" },
})

useTable({
-    initialCurrent: 1,
-    initialPageSize: 20,
-    hasPagination: false,
+    pagination: { mode: "off", currentPage: 1, pageSize: 20 },
})
```

### pagination.current -> pagination.currentPage

🚨 Affects: useTable, useDataGrid, useSimpleList, useSubscription, useList, useCheckboxGroup, useSelect

```diff
useTable({
-   pagination: { current: 1 },
+   pagination: { currentPage: 1 },
})
```

### setCurrent -> setCurrentPage

🚨 Affects: useTable, useDataGrid, useSimpleList

The `setCurrent` function has been renamed to `setCurrentPage`:

```diff
const {
-    setCurrent,
-    current,
+    currentPage,
+    setCurrentPage,
} = useTable();
```

### Resource options → meta

🚨 Affects: Resource definitions in `<Refine>` component

Resource `options` have been renamed to `meta`:

```diff
<Refine
    resources={[
        {
            name: "posts",
-            options: { label: "Blog Posts" },
+            meta: { label: "Blog Posts" },
        },
    ]}
/>
```

### resourceName/resourceNameOrRouteName → resource

🚨 Affects: useImport, useExport, All Button components

```diff
useImport({
-    resourceName: "posts",
+    resource: "posts",
})

<CreateButton
-    resourceNameOrRouteName="posts"
+    resource="posts"
/>
```

### config Object Removal

🚨 Affects: useList, useInfiniteList

The config parameter has been flattened in data hooks:

```diff
useList({
-    config: {
-        pagination: { currentPage: 1, pageSize: 10 },
-        sorters: [{ field: "title", order: "asc" }],
-        filters: [{ field: "status", operator: "eq", value: "published" }],
-        hasPagination: false,
-        sort: [{ field: "title", order: "asc" }],
-        metaData: { foo: "bar" },
-    },
+    pagination: { currentPage: 1, pageSize: 10, mode: "off" },
+    sorters: [{ field: "title", order: "asc" }],
+    filters: [{ field: "status", operator: "eq", value: "published" }],
+    meta: { foo: "bar" },
})
```

### useTable Hook Restructuring

🚨 Affects: useTable, useSimpleList, useDataGrid

The `useTable` hook and its UI variants (`useDataGrid` from @refinedev/mui, `useSimpleList`) have been significantly restructured:

```diff
useTable({
-    initialCurrent: 1,
-    initialPageSize: 10,
-    hasPagination: false,
+    pagination: { currentPage: 1, pageSize: 10 , mode: "off" },
-    setCurrent,
+    setCurrentPage,

-    initialSorter: [{ field: "title", order: "asc" }],
-    permanentSorter: [{ field: "status", order: "asc" }],
+    sorters: {
+        initial: [{ field: "title", order: "asc" }],
+        permanent: [{ field: "status", order: "asc" }]
+    },

-    initialFilter: [{ field: "status", operator: "eq", value: "published" }],
-    permanentFilter: [{ field: "category", operator: "eq", value: "tech" }],
-    defaultSetFilterBehavior: "replace",
+    filters: {
+        initial: [{ field: "status", operator: "eq", value: "published" }],
+        permanent: [{ field: "category", operator: "eq", value: "tech" }],
+        defaultBehavior: "replace"
+    },

})

// Return values also changed
const {
-    sorter,
-    setSorter,
-    tableQueryResult,
-    current,
+    currentPage,
+    sorters,
+    setSorters,
+    tableQuery,
} = useTable();
```

### queryResult → query

🚨 Affects: useForm, useSelect, useShow, useSimpleList, useMany

```diff
const {
-    queryResult,
+    query,
} = useShow();

const {
-    queryResult,
+    query,
} = useForm();

```

### defaultValueQueryResult → defaultValueQuery

🚨 Affects: useSelect

```diff
const {
-    defaultValueQueryResult,
+    defaultValueQuery,
} = useSelect();
```

### tableQueryResult → tableQuery

🚨 Affects: useTable, useDataGrid

```diff
const {
-    tableQueryResult,
+    tableQuery,
} = useTable();
```

### mutationResult → mutation

🚨 Affects: useCreate, useUpdate, useDelete, useCreateMany, useUpdateMany, useDeleteMany, useCustomMutation

```diff

const {
-    mutationResult,
+    mutation,
} = useForm();

```

### isLoading → isPending

🚨 Affects: useCreate, useUpdate, useDelete, useCreateMany, useUpdateMany, useDeleteMany, useCustomMutation

For mutation hooks, the loading state property has been updated:

```diff
const { mutate, mutation: { isPending } } = useCreate();

- if (isLoading) return <Spinner />;
+ if (isPending) return <Spinner />;
```

### useNavigation → useGo, useBack

The `useNavigation` hook has been replaced with individual hooks:

```diff
- import { useNavigation } from "@refinedev/core";
+ import { useGo, useBack } from "@refinedev/core";

const MyComponent = () => {
-   const { push, goBack, replace } = useNavigation();
+   const go = useGo();
+   const back = useBack();

-   push("/posts");
+   go({ to: "/posts" });

-   goBack();
+   back();

-   replace("/posts");
+   go({ to: "/posts", type: "replace" });
};
```

#### useResource → useResourceParams

The `useResource` hook has been removed in favor of `useResourceParams`. The new `useResourceParams` hook offers the same functionality as `useResource`, while introducing additional features and a more streamlined API. To reduce confusion and improve consistency, all resource-related logic should now use `useResourceParams` exclusively.

```diff
- import { useResource } from "@refinedev/core";
+ import { useResourceParams } from "@refinedev/core";


- useResource("posts");
+ useResourceParams({ resource: "posts" });
```

#### ignoreAccessControlProvider → accessControl

```diff
<CreateButton
-    ignoreAccessControlProvider
+    accessControl={{ enabled: false }}
-    resourceNameOrRouteName="posts"
+    resource="posts"
/>
```

### Resource options → meta

The `options` prop has been moved to `meta`:

```diff
<Refine
  resources={[
    {
        name: "posts",
-       options: {
-           label: "Blog Posts",
-           icon: <PostIcon />,
-           route: "my-posts",
-           auditLog: {
-               permissions: ["list", "create"],
-           },
-           hide: false,
-           dataProviderName: "default",
-       },
-       canDelete: true,
+       meta: {
+           label: "Blog Posts",
+           icon: <PostIcon />,
+           parent: "categories",
+           canDelete: true,
+           audit: ["list", "create"],
+           hide: false,
+           dataProviderName: "default",
+       },
    },
]}
/>
```

### DataProvider getList and custom Method Updates

```diff
export const dataProvider = {
    getList: ({
        resource,
        pagination: {
+            mode: "off" | "server" | "client",
        },
-        hasPagination,
+        sorters,
-        sort,
        filters,
+        meta,
-        metaData,
    }) => {
        // ...
    },

    custom: ({
        // ...
+        sorters,
-        sort,
    }) => {
        // ...
    },
};
```

### useImport and useExport Hook Updates

The `useImport` and `useExport` hooks have additional parameter updates:

```diff
useImport({
-    resourceName: "posts",
+    resource: "posts",
-    metaData: { foo: "bar" },
+    meta: { foo: "bar" },
    // These are now used as direct props instead of nested config
-    mapData: (item) => item,
-    paparseConfig: {},
-    batchSize: 1000,
+    mapData: (item) => item,
+    paparseConfig: {},
+    batchSize: 1000,
})

useExport({
-    resourceName: "posts",
+    resource: "posts",
-    sorter: [{ field: "title", order: "asc" }],
+    sorters: [{ field: "title", order: "asc" }],
-    metaData: { foo: "bar" },
+    meta: { foo: "bar" },
-    exportOptions: {},
+    unparseConfig: {},
    // These are now used as direct props
-    mapData: (item) => item,
-    maxItemCount: 1000,
-    pageSize: 20,
+    mapData: (item) => item,
+    maxItemCount: 1000,
+    pageSize: 20,
})
```

### queryKeys -> keys

🚨 Affects: Custom implementations using Refine helpers

```diff
// queryKeys helper updates
- import { queryKeys } from "@refinedev/core";
+ import { keys } from "@refinedev/core";

// Usage updates
- queryKeys.data().resource("posts").action("list").get();
+ keys().data().resource("posts").action("list").get();
```

### useNavigation → useGo

🚨 <strong>Affects:</strong> Navigation helpers (<code>push</code>, <code>replace</code>, <code>goBack</code>)

The return values from <code>useNavigation</code> have been removed. You should now use <code>useGo</code> for navigation:

```diff
- import { useNavigation } from "@refinedev/core";
+ import { useGo } from "@refinedev/core";

- const { replace, push } = useNavigation();
- replace("/tasks/new");
+ const go = useGo();
+ go({ to: "/tasks/new", type: "replace" });
+ go({ to: "/tasks/new", type: "push" });
```

For backward navigation (<code>goBack</code>), use your router’s native API instead.

```diff
- import { useNavigation } from "@refinedev/core";
+ import { useNavigate } from "react-router";

- const { goBack } = useNavigation();
+ const navigate = useNavigate();
- goBack();
+ navigate(-1);
```

### ITreeMenu → TreeMenuItem & list field changes

🚨 <strong>Affects:</strong> <code>useMenu</code>, custom sider renderers

- <code>ITreeMenu</code> has been removed → use <code>TreeMenuItem</code> instead (codemod updates this).
- <code>list</code> is now always a string route.  
  <code>list.path</code> is gone and <code>list</code> is no longer a function.

**Why:**  
Previously, you could define a React component in the <code>&lt;Refine /&gt;</code> resource as <code>list</code>. This is no longer supported. Routes/components must be defined in your router. Because of this, <code>list</code> is now just a route string, not a function or object with <code>path</code>.

```diff
- const { menuItems, selectedKey } = useMenu();
- menuItems.map((item: ITreeMenu) => {
-   const { key, list } = item;
-   const route =
-     typeof list === "string"
-       ? list
-       : typeof list !== "function"
-       ? list?.path
-       : key;
- });
+ const { menuItems, selectedKey } = useMenu();
+ menuItems.map((item: TreeMenuItem) => {
+   const { list } = item;
+   const route = list ?? key; // always a string route now
+ });

```

### ThemedLayoutV2 → ThemedLayout

🚨 **Affects:** Layout components across all UI packages

The V2 layout components have been renamed to remove the V2 suffix across all UI packages (`@refinedev/antd`, `@refinedev/mui`, `@refinedev/mantine`, `@refinedev/chakra-ui`).

**Components affected:**

- `ThemedLayoutV2` → `ThemedLayout`
- `ThemedTitleV2` → `ThemedTitle`
- `ThemedSiderV2` → `ThemedSider`
- `ThemedHeaderV2` → `ThemedHeader`

```diff
- import { ThemedLayoutV2, ThemedTitleV2, ThemedSiderV2, ThemedHeaderV2 } from "@refinedev/antd";
+ import { ThemedLayout, ThemedTitle, ThemedSider, ThemedHeader } from "@refinedev/antd";

```
