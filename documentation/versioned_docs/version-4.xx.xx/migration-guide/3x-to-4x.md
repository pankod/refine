---
title: "Refine v3 to v4 Migration Guide | Upgrade Your App"
display_title: "Migrating from 3.x.x to 4.x.x"
description: "Official guide to migrating your Refine project from v3 to v4. Learn about breaking changes, new features, and the seamless upgrade path."
sidebar_label: 3.x.x to 4.x.x
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

### Motivation behind the release

After a year since the release of v3, we have addressed the most requested and questioned areas by the community. **Refine v4** features better developer experience, and new functionalities to simplify the work of developers.

In **Refine v4**, our goal was to make **Refine** available and accessible on every platform where you can use React and make it easy to use in both new and existing projects. This meant making **Refine** more flexible and a better fit for a wider range of use cases. To achieve this, we needed a more robust, easy-to-integrate and consistent API throughout the project that would boost the DX without limiting our users' options.

Our goal was to make things easier for developers by providing abstractions and techniques to manage some concerns like data, routing, authorization, layouts, etc. without limiting the power of other tools and libraries they want to use. These changes were made to our API to allow you to use **Refine** in every use case and easily adopt it for your existing projects.

## 🪄 Migrating your project automatically with refine-codemod ✨ (recommended)

The [`@refinedev/codemod`][refine-codemod] package handles the breaking changes for your project and automatically migrates it from `3.x.x` to `4.x.x`.

Simply `cd` into the root folder of your project (where the `package.json` is located) and run this command:

```sh
npx @refinedev/codemod@latest refine3-to-refine4
```

And that’s it! You have successfully migrated your project to `refine@4.x.x`.

:::caution Known Issues in refine-codemod

- [Instantiation Expressions](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#instantiation-expressions) are not parsed correctly when running the codemod, causing it to fail for files that contain them. If you encounter this issue, you have to manually migrate the affected files.

- [Type declaration files (`.d.ts`)](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#dts-files) are not parsed correctly when running the codemod, causing it to fail for files that contain them. If you encounter this issue, you have to manually migrate the affected files.

- While making changes, the codemod fails to format return statements with React fragments (`<>...</>`). If you encounter this issue, you have to manually format the file after the codemod is complete.

:::

## Migrating your project manually

**Refine v4** will be released under the new `@refinedev` `npm` organization, so you must install the packages with the new organization name.

```bash
npm uninstall @pankod/refine-core @pankod/refine-antd @pankod/..

npm i @refinedev/core @refinedev/antd @refinedev/..
```

:::caution

You must make this change for all packages that start with `@pankod`.

:::

## New NPM organization

**Refine** has recently migrated to a new NPM organization and will be using `@refinedev` as the new NPM organization going forward. As a result of this migration, all of our package names have been updated accordingly.

## **`@pankod/refine-core` changes**

### routerProvider

**Refine v4** includes a new interface for the `routerProvider` prop. It is now smaller and more flexible, as it leaves the control of the routes to the user and only constructs the communication and bindings of the router and **Refine**.

`routerProvider` is now optional because **Refine** can now be used without a router. However, it is still recommended to use a router provider to enable useful features such as inferring the current resource from the URL, redirection and navigation helpers, menus, breadcrumbs and more.

In order to maintain backward compatibility, **Refine** still supports the `routerProvider@v3`. However, this provider has been renamed to `legacyRouterProvider` and will be removed in the next major version. If you wish to continue using `routerProvider@v3`, you can still do so by using it as `legacyRouterProvider` in your project.

```diff
- import routerProvider from "@pankod/refine-react-router-v6";
+ import routerProvider from "@refinedev/react-router-v6/legacy";

const App = () => {
    return (
        <Refine
-           routerProvider={routerProvider}
+           legacyRouterProvider={routerProvider}
        />
    );
};
```

:::caution

While this will allow you to use the old router provider, we do not recommend it. You should use the new `routerProvider` interface to take advantage of new features like nested routes with parameters, custom action routes, and more control over your routes overall.

[Please refer to the Router Provider Migration Guide for more information and guidance. →](/core/docs/migration-guide/router-provider/)

:::

### resources

With the new `routerProvider` interface, we also made changes to the `resources` prop, which now works more like an interaction and connection point between your API and the app rather than a necessity for the router to work. Your router can work without `resources`, in the same way your `resources` can work without a router.

You can now define actions (`list`, `create`, `edit`, `show`, `clone`) as paths rather than components. This will allow you to define custom routes for individual actions and use your router’s full potential without being restricted to the automatically created routes.

Defining custom routes enables nested routes and parameters for your resources, such as:

```tsx
resources={[
    {
        name: "products",
        list: "/:tenantId/products",
        show: "/:tenantId/products/:id",
        edit: "/:tenantId/products/:id/edit",
        create: "/:tenantId/products/create",
    }
]}
```

:::info

This is only a resource definition, which must be handled within your router structure.

:::

In the above example, you can see how the new enterprise-grade routing structure allows for effortless handling of multi-tenant structures. The detail page of a product can have a nested structure and additional parameters, which can be passed along with the `meta` properties in hooks and components. When constructing the navigation path, existing parameters in the URL will also be used.

The existing method for passing components to the actions is still supported, and it uses default paths when an action has a component value. However, the new `routerProvider` does not automatically create routes for it. However, you can use the `RefineRoutes` components from the router packages to create routes automatically. For more information on changes to routing in resources, please refer to the [Router Provider Migration Guide](/core/docs/migration-guide/router-provider/).

We've also made changes in the structure of the resource definition such as the `identifier` property, which lets you define a custom identifier to a resource which can be used to select it in the hooks and components. This is useful when using multiple definitions with different paths and the same name.

The `route` property is now deprecated, replaced with the new routing system that lets users define custom routes per action.

```diff
resources={[
    {
        name: "products",
-       list: ProductList,
+       list: "/my-products",
-       icon: <ProductsIcon />,
-       parentName: "categories",
-       options: {
-           route: "my-products",
-           label: "My Products",
-           auditLog: {
-               permissions: ["list", "create"],
-           },
-           hide: false,
-           dataProviderName: "default",
-       },
-       canDelete: true,
+       meta: {
+           icon: <ProductsIcon />,
+           parent: "categories",
+           label: "My Products",
+           canDelete: true,
+           audit: ["list", "create"],
+           hide: false,
+           dataProviderName: "default",
+       }
    }
]}
```

### authProvider

**Refine** still supports the `authProvider@v3` for backward compatibility. We changed its name to `legacyAuthProvider` and it will be removed in the next major version. If you want to continue using the `authProvider@v3` you can use it as `legacyAuthProvider` in your project.

```diff
- import { AuthProvider } from "@refinedev/core";
+ import { LegacyAuthProvider } from "@refinedev/core";

- const authProvider: AuthProvider = {/* ... */}
+ const authProvider: LegacyAuthProvider = {/* ... */}

const App = () => {
    return (
        <Refine
-           authProvider={authProvider}
+           legacyAuthProvider={authProvider}
        >
            <AppLayout />
        </Refine>
    );
};

```

Additionally, you need to add `v3LegacyAuthProviderCompatible: true` to your auth hooks in order to continue using `authProvider@v3` in your project.

```ts
import { useLogin } from "@refinedev/core";

const login = useLogin({
  // highlight-next-line
  v3LegacyAuthProviderCompatible: true,
});
```

[Please refer to the Auth Provider Migration Guide for more information. →](/core/docs/migration-guide/auth-provider/)

### Import changes

All `@tanstack/react-query` imports re-exported from `@refinedev/core` have been removed. You need to import them from the `@tanstack/react-query` package directly.

If the package is not installed, you can install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @tanstack/react-query
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @tanstack/react-query
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @tanstack/react-query
```

</TabItem>

</Tabs>

After that, you can import them from `@tanstack/react-query` package directly instead of `@refinedev/core` package.

```diff
- import { QueryClient } from "@refinedev/core";

+ import { QueryClient } from "@tanstack/react-query";
```

### Update `getList` parameters of `dataProvider`

The following updates have been made to the `getList` parameters of the `dataProvider`:

- `hasPagination` is deprecated. Use `pagination.mode` instead.
- `sort` is deprecated. Use `sorters` instead.
- `metaData` is deprecated. Use `meta` instead.

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
         ...
     },
 };
```

:::note

Although the `getList` parameters still have the `hasPagination`, `sort`, and `metaData` props in v4, they are now deprecated. We recommend using the `pagination.mode`, `sorters`, and `meta` props instead.

:::

### Update `custom` parameters of `dataProvider`

The `custom` parameters of the `dataProvider` have been updated, and as a result, `sort` is now deprecated. It is still useable with 4v, but we recommend using `sorters` instead.

```diff
 export const dataProvider = {
     custom: ({
         ...
+        sorters,
-        sort,
     }) => {
         ...
     },
 };
```

### `useList` and `useInfiniteList` hooks

The `config` prop is now deprecated. Use `sorters`, `filters`, and `pagination` props instead.

```diff
useList({
-    config: {
-        sort,
-        filters,
-        pagination,
-        hasPagination,
-    },
+    sorters,
+    filters,
+    pagination: {
+        mode: "off" | "server" | "client",
+    },
})

useInfiniteList({
-    config: {
-        sort,
-        filters,
-        pagination,
-        hasPagination,
-    },
+    sorters,
+    filters,
+    pagination: {
+        mode: "off" | "server" | "client",
+    },
})
```

### `useTable` hook

`useTable` return values and properties has been updated.

- The `initialCurrent` and `initialPageSize` props are deprecated. Use the `pagination` prop instead.

  ```diff
  useTable({
  -    initialCurrent,
  -    initialPageSize,
  +    pagination: {
  +        current,
  +        pageSize,
  +    },
  })
  ```

- The `hasPagination` prop is deprecated. Use `pagination.mode` instead.

  ```diff
  useTable({
  -   hasPagination,
      pagination: {
  +        mode: "off" | "server" | "client",
      },
  })
  ```

- The `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

  ```diff
  useTable({
  -    initialSorter,
  -    permanentSorter,
  +    sorters: {
  +        initial,
  +        permanent,
  +    },
  })
  ```

- The `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

  ```diff
  useTable({
  -    initialFilter,
  -    permanentFilter,
  -    defaultSetFilterBehavior,
  +    filters: {
  +        initial,
  +        permanent,
  +        defaultBehavior,
  +    },
  })
  ```

- `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

  ```diff
  const {
  -   sorter,
  +   sorters,
  -   setSorter,
  +   setSorters,
  } = useTable();
  ```

### `useImport` hook

The `resourceName` prop is deprecated. Use the `resource` prop instead.

```diff
useImport({
-    resourceName,
+    resource,
})
```

### `useExport` hook

The `resourceName` and `sorter` props are deprecated. Use the `resource` and `sorters` props instead.

```diff
useExport({
-    resourceName,
+    resource,
-    sorter,
+    sorters,
})
```

### `useSelect` hook

- Pagination is disabled by default. If you want to enable it, set the `pagination.mode` prop to `"server"`.

  ```diff
  useSelect({
  -    hasPagination: false,
  +    pagination: {
  +        mode: "server",
  +    },
  })
  ```

- The `sort` prop is deprecated. Use the `sorters` prop instead.

  ```diff
  useSelect({
  -    sort,
  +    sorters,
  })
  ```

### `useCustom` hook

- The `config.sort` prop is deprecated. Use the `config.sorters` prop instead.

```diff
useCustom({
    config: {
-       sort,
+       sorters,
    },
})
```

### `useResource` hook

Instead of an object with a single property as a parameter, users can now provide a single string parameter as the resource name or identifier when using the `useResource` hook. If the `legacyRouterProvider` is in use, the hook will also check for the `route` prop.

```diff
-   useResource({
-       resourceNameOrRouteName: "products"
-   });
+   useResource("products");
```

### `useResourceWithRoute` hook

This hook is now deprecated and obsolete when using the new `routerProvider` property. Use `useResource` instead.

### `useMenu` hook

Instead of returning an empty `selectedKey` value, the `useMenu` hook now returns `undefined` if there is no matching key with the current route as the `selectedKey`.

In addition to this change, the `useMenu` hook now accepts a meta property, which is an object of parameters to use when additional parameters are present in the resource `list` paths. For example, if you have a resource with a `list` path defined as `/author/:authorId/posts` and want to show this resource in your menu, you can just do:

```tsx
const { menuItems } = useMenu({ meta: { authorId: 123 } });
```

This won't be necessary if there's already an `authorId` parameter present in the current URL. **Refine** will use this parameter by default if there's no override in the `meta` property. If you only want to show the items with defined parameters or no parameters, then you can pass `hideOnMissingParameter: true` to the `useMenu`, and these items will not be returned.

### `useNavigation` hook

This hook was designed to work with the legacy router provider, but it has been updated to work with both router provider versions. Although it's recommended to use the new routing hooks when necessary or the ones available from your router library, **Refine** now exports `useGo`, `useParsed`, `useBack`, `useLink` and `useGetToPath` hooks for the new routing system.

If you still want to use the `useNavigation` hook and its returned functions in the new routing system, their paths that accept props now accept the `meta` prop.

### `useRouterContext` hook

This hook is now deprecated and will only work with the legacy router provider. While it was primarily used internally, you might have used it if you had a custom `<Sider>` component in your layout. If this is the case, you should replace it with the appropriate replacement hooks based on your use case: [`useGo`](/core/docs/routing/hooks/use-go), [`useParsed`](/core/docs/routing/hooks/use-parsed), [`useBack`](/core/docs/routing/hooks/use-back) or [`useLink`](/core/docs/routing/hooks/use-link).

```diff
+ import { useRouterContext } from "@pankod/refine-core";
- import { useLink } from "@refinedev/core";

const MyComponent = () => {
-   const { Link } = useRouterContext();
+   const Link = useLink();
}
```

### metaData to meta

`metaData` is deprecated in all hooks and components. Use `meta` instead.

```diff
useList({
-    metaData,
+    meta,
})

<RefreshButton
-    metaData
+    meta
/>
```

### Resource `options`'s to `meta`

The `options` prop of resource is deprecated. Use the `meta` prop instead.

```diff
<Refine
    resources={[
        {
            name: "posts",
-           options: {},
+           meta: {},
        },
    ]}
/>
```

### `<ReadyPage>` component is deprecated

The `<ReadyPage>` component is deprecated and will be removed in the next major version. Use a custom page of your own instead.

## **`@pankod/refine-antd` changes**

:::caution refine@4 uses version 5 of Ant Design.

Before upgrading your project to refine@4, please upgrade your Ant Design to version 5. Don't worry, we have codemod support for this upgrade 🎉.

[To upgrade now, visit the Migration Guide document >](/core/docs/ui-integrations/ant-design/migration-guide)

:::

### Import changes

All **Ant Design** components re-exported from `@pankod/refine-antd` have been removed. You need import them from the `antd` package directly.

If the package is not installed, you can install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install antd
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add antd
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add antd
```

</TabItem>

</Tabs>

After that, you can import components from the `antd` package directly like below:

```diff
-import { useTable, SaveButton, Button, Form, Input, Select } from "@pankod/refine-antd";

+import { useTable, SaveButton } from "@refinedev/antd";
+import { Button, Form, Input, Select } from "antd";
```

<br />

`Icons` have also been removed from `@pankod/refine-antd`. So you need to import icons from the `@ant-design/icons` package directly.

If the package is not installed, you can install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @ant-design/icons
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @ant-design/icons
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @ant-design/icons
```

</TabItem>

</Tabs>

After that, you can import icons from the `@ant-design/icons` package directly like this:

```diff
-import { Icons } from "@pankod/refine-antd";
-const { EditOutlined } = Icons;

+ import { EditOutlined } from "@ant-design/icons";
```

### `useTable` hook

`useTable` return values and properties have been updated.

- The `initialCurrent` and `initialPageSize` props are deprecated. Use the `pagination` prop instead.

  ```diff
  useTable({
  -    initialCurrent,
  -    initialPageSize,
  +    pagination: {
  +        current,
  +        pageSize,
  +    },
  })
  ```

- The `hasPagination` prop is deprecated. Use `pagination.mode` instead.

  ```diff
  useTable({
  -   hasPagination,
      pagination: {
  +        mode: "off" | "server" | "client",
      },
  })
  ```

- The `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

  ```diff
  useTable({
  -    initialSorter,
  -    permanentSorter,
  +    sorters: {
  +        initial,
  +        permanent,
  +    },
  })
  ```

- The `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

  ```diff
  useTable({
  -    initialFilter,
  -    permanentFilter,
  -    defaultSetFilterBehavior,
  +    filters: {
  +        initial,
  +        permanent,
  +        defaultBehavior,
  +    },
  })
  ```

- `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

  ```diff
  const {
  -   sorter,
  +   sorters,
  -   setSorter,
  +   setSorters,
  } = useTable();
  ```

### `useSimpleList` hook

- The useSimpleList hook no longer accepts all properties of the `<List>` component. Instead, you can now pass the props directly to the `<List>` component

  ```diff
  import { useSimpleList } from "@refinedev/antd";
  import { List } from "antd";

  const { listProps } = useSimpleList({
      resource: "orders",
      pagination: {
          pageSize: 6,
  -       simple: true,
      },
  });

  <List
      {...listProps}
  +   pagination={{
  +     ...listProps.pagination,
  +     simple: true,
  +   }}
      ... // other props
  />
  ```

- The `initialCurrent` and `initialPageSize` props are deprecated. Use the `pagination` prop instead.

  ```diff
  useSimpleList({
  -    initialCurrent,
  -    initialPageSize,
  +    pagination: {
  +        current,
  +        pageSize,
  +    },
  })
  ```

- The `hasPagination` prop is deprecated. Use `pagination.mode` instead.

  ```diff
  useSimpleList({
  -   hasPagination,
      pagination: {
  +        mode: "off" | "server" | "client",
      },
  })
  ```

- The `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

  ```diff
  useSimpleList({
  -    initialSorter,
  -    permanentSorter,
  +    sorters: {
  +        initial,
  +        permanent,
  +    },
  })
  ```

- The `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

  ```diff
  useSimpleList({
  -    initialFilter,
  -    permanentFilter,
  -    defaultSetFilterBehavior,
  +    filters: {
  +        initial,
  +        permanent,
  +        defaultBehavior,
  +    },
  })
  ```

- `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

  ```diff
  const {
  -   sorter,
  +   sorters,
  -   setSorter,
  +   setSorters,
  } = useSimpleList();
  ```

### `useSelect` hook

- Pagination is disabled by default. If you want to enable it, set the `pagination.mode` prop to `"server"`.

  ```diff
  useSelect({
  -    hasPagination: false,
  +    pagination: {
  +        mode: "server",
  +    },
  })
  ```

- The `sort` prop is deprecated. Use the `sorters` prop instead.

  ```diff
  useSelect({
  -    sort,
  +    sorters,
  })
  ```

### `useCheckboxGroup` and `useRadioGroup` hooks

The `sort` prop is deprecated. Use the `sorters` prop instead.

```diff
useCheckboxGroup({
-    sort,
+    sorters,
})

useRadioGroup({
-    sort,
+    sorters,
})
```

### `useImport` hook

The `resourceName` prop is deprecated. Use the `resource` prop instead.

```diff
useImport({
-    resourceName,
+    resource,
})
```

### `useMenu` hook

The `useMenu` hook has been removed. It will be exported from the `@refinedev/core` package.

```diff
-import { useMenu } from "@pankod/refine-antd";
+import { useMenu } from "@refinedev/core";
```

### `useDrawerForm` and `useModalForm` hooks

It is now possible to sync these hooks' visibility state with location by using the syncWithLocation prop. You can either pass `true` or an object with `key` and `syncId` properties. If you pass the `key` property, it will be used in the query params for the visibility state. If you pass `syncId: true`, it will also add the `id` of the form to the query params. This is useful when working in `clone` and `edit` modes.

```tsx
useDrawerForm({
  syncWithLocation: {
    key: "my-drawer",
    syncId: true,
  },
});
```

If `key` is not provided, `${resource.name}-${action}` will be used by default.

### Buttons

The `ignoreAccessControlProvider` prop has been deprecated and removed from all buttons exported from the `@refinedev/antd` package. Use the `accessControl.enabled` prop instead.

```diff
<CreateButton
-   ignoreAccessControlProvider
+   accessControl={{
+       enabled: false,
+   }}
/>
```

The `resourceNameOrRouteName` prop is now deprecated in favor of the `resource` prop. You can pass the name or identifier of the resource while using it. For legacy router users, the `route` prop can also be used.

```diff
<CreateButton
-   resourceNameOrRouteName="posts"
+   resource="posts"
/>
```

### `<ReadyPage>` component is deprecated

The `<ReadyPage>` component is deprecated and will be removed in the next major version. Use a custom page of your own instead.

## **`@pankod/refine-mui` changes**

### Import changes

All **Material UI** components re-exported from `@pankod/refine-mui` have been removed. You need to import them from Material UI packages directly.

If the packages are not installed, you can install them with your package manager:

> There is no need to install all of the packages, only install the packages that you plan to use.

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
```

</TabItem>

</Tabs>

After that, you can import them from related packages directly.

```diff
- import {
-    Box,
-    NumberField,
-    Stack,
-    Typography,
-    ThemeProvider,
-    DataGrid
-    LoadingButton,
- } from "@pankod/refine-mui";

+ import { NumberField } from "@refinedev/mui";
+ import { ThemeProvider } from "@mui/material/styles";
+ import { Box, Stack, Typography } from "@mui/material";
+ import { DataGrid } from "@mui/x-data-grid";
+ import { LoadingButton } from "@mui/lab";
```

### `useDataGrid` hook

`useDataGrid` return values and properties have been updated.

- The `initialCurrent` and `initialPageSize` props are deprecated. Use the `pagination` prop instead.

  ```diff
  useDataGrid({
  -    initialCurrent,
  -    initialPageSize,
  +    pagination: {
  +        current,
  +        pageSize,
  +    },
  })
  ```

- The `hasPagination` prop is deprecated. Use `pagination.mode` instead.

  ```diff
  useDataGrid({
  -   hasPagination,
      pagination: {
  +        mode: "off" | "server" | "client",
      },
  })
  ```

- The `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

  ```diff
  useDataGrid({
  -    initialSorter,
  -    permanentSorter,
  +    sorters: {
  +        initial,
  +        permanent,
  +    },
  })
  ```

- The `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

  ```diff
  useDataGrid({
  -    initialFilter,
  -    permanentFilter,
  -    defaultSetFilterBehavior,
  +    filters: {
  +        initial,
  +        permanent,
  +        defaultBehavior,
  +    },
  })
  ```

- `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

  ```diff
  const {
  -   sorter,
  +   sorters,
  -   setSorter,
  +   setSorters,
  } = useDataGrid();
  ```

### `useAutocomplete` hook

- Pagination is disabled by default. If you want to enable it, set the `pagination.mode` prop to `"server"`.

  ```diff
  useAutocomplete({
  -    hasPagination: false,
  +    pagination: {
  +        mode: "server",
  +    },
  })
  ```

- The `sort` prop is deprecated. Use the `sorters` prop instead.

  ```diff
  useAutocomplete({
  -    sort,
  +    sorters,
  })
  ```

### `useMenu` hook is removed

The useMenu hook has been removed and now needs to be exported from the @refinedev/core package.

```diff
-import { useMenu } from "@pankod/refine-mui";
+import { useMenu } from "@refinedev/core";
```

### Buttons

The `ignoreAccessControlProvider` prop has been deprecated and removed from all buttons exported from the `@refinedev/antd` package. Use the `accessControl.enabled` prop instead.

```diff
<CreateButton
-   ignoreAccessControlProvider
+   accessControl={{
+       enabled: false,
+   }}
/>
```

The `resourceNameOrRouteName` prop has been deprecated in favor of the `resource` prop. You can pass the resource name or identifier to it instead. The `route` prop is also accepted for legacy router users.

```diff
<CreateButton
-   resourceNameOrRouteName="posts"
+   resource="posts"
/>
```

### Basic Views

The following basic view component props has been removed:

- The `cardProps` prop has been removed from all basic views components. Use the `wrapperProps` prop instead.

  ```diff
    <List
  -    cardProps={{}}
  +    wrapperProps={{}}
    />
  ```

- The`cardHeaderProps` prop has been removed from all basic views components. Use the `headerProps` prop instead.

  ```diff
    <Create
  -    cardHeaderProps={{}}
  +    headerProps={{}}
    />
  ```

- The `cardContentProps` prop has been removed from all basic views components. Use the `contentProps` prop instead.

  ```diff
    <Edit
  -    cardContentProps={{}}
  +    contentProps={{}}
    />
  ```

- The `actionButtons` prop has been removed from `<Create>`, `<Edit>`, and `<Show` components. Use the`footerButtons` prop instead.

  ```diff
    <Show
  -    actionButtons={[]}
  +    footerButtons={[]}
    />
  ```

- The `cardActionsProps` prop has been removed from `<Create>`, `<Edit>`, and `<Show` components. Use the `footerButtonProps` prop instead.

  ```diff
    <List
  -    cardActionsProps={{}}
  +    footerButtonProps={{}}
    />
  ```

### `<ReadyPage>` component is deprecated

The `<ReadyPage>` component is deprecated and will be removed in the next major version. Use a custom page of your own instead.

## **`@pankod/refine-mantine` changes**

### Import changes

All **Mantine** components re-exported from `@pankod/refine-mantine` have been removed. You should import them from Mantine packages directly.

If the packages are not installed, you can install them with your package manager:

> There is no need to install all of the packages, only install the packages that you plan to use.

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
```

</TabItem>

</Tabs>

After that, you can import them from related packages directly.

```diff
- import {
-    MantineProvider,
-    NotificationsProvider,
-    TextInput,
-    Select,
-    List,
-    useSelect,
- } from "@pankod/refine-mantine";

+ import { useSelect, List } from "@refinedev/mantine";
+ import { MantineProvider, TextInput, Select } from "@mantine/core";
+ import { NotificationsProvider } from "@mantine/notifications";
```

### `useSelect` hook

- Pagination is disabled by default. If you want to enable it, set the `pagination.mode` prop to `"server"`.

  ```diff
  useSelect({
  -    hasPagination: false,
  +    pagination: {
  +        mode: "server",
  +    },
  })
  ```

- The `sort` prop is deprecated. Use the `sorters` prop instead.

  ```diff
  useSelect({
  -    sort,
  +    sorters,
  })
  ```

### Buttons

The `ignoreAccessControlProvider` prop has been deprecated and removed from all buttons exported from the `@refinedev/antd` package. Use the `accessControl.enabled` prop instead.

```diff
<CreateButton
-   ignoreAccessControlProvider
+   accessControl={{
+       enabled: false,
+   }}
/>
```

The `resourceNameOrRouteName` prop has been deprecated in favor of the `resource` prop. You can pass the resource name or identifier to it instead. The `route` prop is also accepted for legacy router users.

```diff
<CreateButton
-   resourceNameOrRouteName="posts"
+   resource="posts"
/>
```

### `<ReadyPage>` component is deprecated

The `<ReadyPage>` component is deprecated and will be removed in the next major version. Use a custom page of your own instead.

## **`@pankod/refine-chakra-ui` changes**

### Import changes

All **Chakra UI** components re-exported from `@pankod/refine-chakra-ui` have been removed. You should import them from `@chakra-ui/react` package directly.

If the packages are not installed, you can install them with your package manager:

> There is no need to install all of the packages, only install the packages that you plan to use.

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

</TabItem>

</Tabs>

After that, you can import them from related packages directly.

```diff
- import {
-    ChakraProvider,
-    Input,
-    Select,
-    ShowButton,
-    usePagination,
- } from "@pankod/refine-chakra-ui";

+ import { usePagination, ShowButton } from "@refinedev/chakra-ui";
+ import { ChakraProvider, Input, Select } from "@chakra-ui/react";
```

### Buttons

The `ignoreAccessControlProvider` prop has been deprecated and removed from all buttons exported from the `@refinedev/antd` package. Use the `accessControl.enabled` prop instead.

```diff
<CreateButton
-   ignoreAccessControlProvider
+   accessControl={{
+       enabled: false,
+   }}
/>
```

The `resourceNameOrRouteName` prop has been deprecated in favor of the `resource` prop. You can pass the resource name or identifier to it instead. The `route` prop is also accepted for legacy router users.

```diff
<CreateButton
-   resourceNameOrRouteName="posts"
+   resource="posts"
/>
```

### `<ReadyPage>` component is deprecated

The `<ReadyPage>` component is deprecated and will be removed in the next major version. Use a custom page of your own instead.

## **`@pankod/refine-react-table` changes**

### Import changes

All `@tanstack/react-table` imports re-exported from `@pankod/refine-react-table` have been removed. You should import them from the `@tanstack/react-table` package directly.

If the package is not installed, you can install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install @tanstack/react-table
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @tanstack/react-table
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @tanstack/react-table
```

</TabItem>

</Tabs>

After that, you can import them from `@tanstack/react-table` package directly.

```diff
- import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

+ import { useTable } from "@refinedev/react-table";
+ import { ColumnDef, flexRender } from "@tanstack/react-table";
```

### `useTable` hook

`useTable` return values and properties are updated.

- The `initialCurrent` and `initialPageSize` props are deprecated. Use the `pagination` prop instead.

  ```diff
  useTable({
      refineCoreProps: {
  -      initialCurrent,
  -      initialPageSize,
  +      pagination: {
  +          current,
  +          pageSize,
  +      },
      },
  })
  ```

- The `hasPagination` prop is deprecated. Use `pagination.mode` instead.

  ```diff
  useTable({
      refineCoreProps: {
  -      hasPagination,
         pagination: {
  +           mode: "off" | "server" | "client",
         },
      },
  })
  ```

- The `initialSorter` and `permanentSorter` props are deprecated. Use `sorters.initial` and `sorters.permanent` instead.

  ```diff
  useTable({
      refineCoreProps: {
  -      initialSorter,
  -      permanentSorter,
  +      sorters: {
  +          initial,
  +          permanent,
  +      },
      },
  })
  ```

- The `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.

  ```diff
  useTable({
      refineCoreProps: {
  -      initialFilter,
  -      permanentFilter,
  -      defaultSetFilterBehavior,
  +      filters: {
  +          initial,
  +          permanent,
  +          defaultBehavior,
  +      },
      },
  })
  ```

- `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.

  ```diff
  const {
      refineCore: {
  -        sorter,
  -        setSorter,
  +        sorters,
  +        setSorters,
      },
  } = useTable();
  ```

## **`@pankod/refine-react-hook-form` changes**

### Import changes

All `react-hook-form` imports re-exported from `@pankod/refine-react-hook-form` have been removed. You need to import them from the `react-hook-form` package directly.

If the package is not installed, you can install it with your package manager:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm install react-hook-form
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add react-hook-form
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add react-hook-form
```

</TabItem>

</Tabs>

After that, you can import them from `react-hook-form` package directly.

```diff
- import { useForm, Controller } from "@pankod/refine-react-hook-form";

+ import { useForm } from "@refinedev/react-hook-form";
+ import { Controller } from "react-hook-form";
```

[refine-codemod]: https://github.com/refinedev/refine/tree/main/packages/codemod
[Refine]: /core/docs/core/refine-component
[resources]: /core/docs/core/refine-component#resources
[routerprovider]: /core/docs/routing/router-provider
[auth-provider]: /core/docs/authentication/auth-provider
