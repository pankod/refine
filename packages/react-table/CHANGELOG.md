# @refinedev/react-table

## 6.0.1

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 6.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade React Table integration for Refine 5.0

  - Removed deprecated API usage and updated test infrastructure for Refine 5 compatibility.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 5.6.17

### Patch Changes

📢 **Refine Community Release** 📢

- fix: get always latest `columns` from `table ref` when `columnFilters` or `filters` are changed.

## 5.6.16

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6823](https://github.com/refinedev/refine/pull/6823) [`8a17ea50ce615b3213832bd66d01c946351621ea`](https://github.com/refinedev/refine/commit/8a17ea50ce615b3213832bd66d01c946351621ea) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: get always latest `columns` from `table ref` when `columnFilters` or `filters` are changed.

## 5.6.15

### Patch Changes

📢 **Refine Community Release** 📢

- fix(react-table): add equality checks before setting filters and sorters

  When setting the filters and sorters received from the `useTable` of `@tanstack/react-table` to Refine's table state, it was causing unnecessary updates. Those updates sometimes caused queries to stuck in loading state. Adding deep equality checks before setting the filters and sorters solves the issue.

  [Resolves #6265](https://github.com/refinedev/refine/issues/6265)

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 5.6.14

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6501](https://github.com/refinedev/refine/pull/6501) [`1ba8a85d7c5feaa144260228c890c064834a9d63`](https://github.com/refinedev/refine/commit/1ba8a85d7c5feaa144260228c890c064834a9d63) Thanks [@taiseiiiii](https://github.com/taiseiiiii)! - fix(react-table): add equality checks before setting filters and sorters

  When setting the filters and sorters received from the `useTable` of `@tanstack/react-table` to Refine's table state, it was causing unnecessary updates. Those updates sometimes caused queries to stuck in loading state. Adding deep equality checks before setting the filters and sorters solves the issue.

  [Resolves #6265](https://github.com/refinedev/refine/issues/6265)

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 5.6.13

### Patch Changes

- [#6233](https://github.com/refinedev/refine/pull/6233) [`a93eed09796b780557f6fecee0c2f1e7b4f9e93b`](https://github.com/refinedev/refine/commit/a93eed09796b780557f6fecee0c2f1e7b4f9e93b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: update `@refinedev/core` usage to reflect latest renamings.

  > These changes applied on internal usage of `@refinedev/core` in `@refinedev/react-table` package.

  ```diff
  import { useTable } from '@refinedev/core';

  - const { tableQueryResult} = useTable();
  + const { tableQuery } = useTable();
  ```

## 5.6.12

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 5.6.11

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 5.6.10

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 5.6.9

### Patch Changes

- [#5862](https://github.com/refinedev/refine/pull/5862) [`7c22b8eaca0`](https://github.com/refinedev/refine/commit/7c22b8eaca02ac6d74409b36354c4c269f2c7954) Thanks [@aliemir](https://github.com/aliemir)! - fix: updated column filter transformation logic to handle conditional filters

  `useTable` hook was ignoring the conditional filters with `"and"` and `"or"` operators, causing custom filtering logic inside the table to not work as expected and omitting the filters from the query. This PR enables working with conditionenal filters and fixes the disappearing filters issue.

  To customize the `key` value of the conditional filter, you can use the `filterKey` property in the column's `meta` property. This property will be used as the key for the filter when setting the filter value to the table from `@refinedev/core`'s filter state and when setting the filter value to the filter state from the table.

  ```tsx
  // An example of how to use the `filterKey` property in the column's `meta` property
  const columns: ColumnDef<IPost> = [
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      meta: {
        // This is optional, if not defined column id will be used as the key
        filterKey: "titleFilter",
        // If operator is not `'eq'` or `'in'`, make sure to set the `filterOperator` property
        filterOperator: "and",
      },
    },
  ];
  ```

  Resolves [#5856](https://github.com/refinedev/refine/issues/5856)

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 5.6.8

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- [#5755](https://github.com/refinedev/refine/pull/5755) [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect type imports

## 5.6.7

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 5.6.6

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

## 5.6.5

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 5.6.4

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 5.6.3

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 5.6.2

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 5.6.1

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 5.6.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 5.5.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 5.4.0

### Minor Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

  - **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
  - **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

  feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

  - **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
  - **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

## 5.3.0

### Minor Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

  - **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
  - **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

  feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

  - **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
  - **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

## 5.2.0

### Minor Changes

- [#4113](https://github.com/refinedev/refine/pull/4113) [`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added missing third generic parameter to hooks which are using `useQuery` internally.

  For example:

  ```ts
  import { useOne, HttpError } from "@refinedev/core";

  const { data } = useOne<{ count: string }, HttpError, { count: number }>({
    resource: "product-count",
    queryOptions: {
      select: (rawData) => {
        return {
          data: {
            count: Number(rawData?.data?.count),
          },
        };
      },
    },
  });

  console.log(typeof data?.data.count); // number
  ```

### Patch Changes

- [#4113](https://github.com/refinedev/refine/pull/4113) [`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the generic type name of hooks that use `useQuery` to synchronize generic type names with `tanstack-query`.

## 5.1.4

### Patch Changes

- [#3827](https://github.com/refinedev/refine/pull/3827) [`c3e1a1b1c91`](https://github.com/refinedev/refine/commit/c3e1a1b1c916a55ea9246a559d2b5cb95e89f3a0) Thanks [@thiagotognoli](https://github.com/thiagotognoli)! - Added `operator` field to `columnFilter` state. This allows you to specify the filter operator without using column definition.

## 5.1.3

### Patch Changes

- [#3827](https://github.com/refinedev/refine/pull/3827) [`c3e1a1b1c91`](https://github.com/refinedev/refine/commit/c3e1a1b1c916a55ea9246a559d2b5cb95e89f3a0) Thanks [@thiagotognoli](https://github.com/thiagotognoli)! - Added `operator` field to `columnFilter` state. This allows you to specify the filter operator without using column definition.

## 5.1.2

### Patch Changes

- [#3941](https://github.com/refinedev/refine/pull/3941) [`d202e6ac17c`](https://github.com/refinedev/refine/commit/d202e6ac17c329c921b5a9cd2bd8b3b0ff3986a3) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where `current` was 1 when `filters` and `sorters` were in the URL when `syncWithLocation` was enabled.

## 5.1.1

### Patch Changes

- [#3941](https://github.com/refinedev/refine/pull/3941) [`d202e6ac17c`](https://github.com/refinedev/refine/commit/d202e6ac17c329c921b5a9cd2bd8b3b0ff3986a3) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where `current` was 1 when `filters` and `sorters` were in the URL when `syncWithLocation` was enabled.

## 5.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  All `@tanstack/react-table` imports re-exported from `@refinedev/react-table` have been removed. You should import them from the `@tanstack/react-table` package directly.

  If the package is not installed, you can install it with your package manager:

  ```bash
  npm install @tanstack/react-table
  # or
  pnpm add @tanstack/react-table
  # or
  yarn add @tanstack/react-table
  ```

  After that, you can import them from `@tanstack/react-table` package directly.

  ```diff
  - import { useTable, ColumnDef, flexRender } from "@refinedev/react-table";

  + import { useTable } from "@refinedev/react-table";
  + import { ColumnDef, flexRender } from "@tanstack/react-table";
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `useTable` return values and properties are updated.

  - `initialCurrent` and `initialPageSize` props are now deprecated. Use `pagination` prop instead.
  - To ensure backward compatibility, `initialCurrent` and `initialPageSize` props will work as before.

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

  - `hasPagination` prop is now deprecated. Use `pagination.mode` instead.
  - To ensure backward compatibility, `hasPagination` prop will work as before.

    ```diff
    useTable({
        refineCoreProps: {
    -      hasPagination,
    +       pagination: {
    +           mode: "off" | "server" | "client",
    +       },
        },
    })
    ```

  - `initialSorter` and `permanentSorter` props are now deprecated. Use `sorters.initial` and `sorters.permanent` instead.
  - To ensure backward compatibility, `initialSorter` and `permanentSorter` props will work as before.

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

  - `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are now deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.
  - To ensure backward compatibility, `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props will work as before.

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

  - `sorter` and `setSorter` return values are now deprecated. Use `sorters` and `setSorters` instead.
  - To ensure backward compatibility, `sorter` and `setSorter` return values will work as before.

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

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 4.11.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.10.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.9.1

### Patch Changes

- [#3399](https://github.com/refinedev/refine/pull/3399) [`22b44a857a8`](https://github.com/refinedev/refine/commit/22b44a857a8ede3473965ab6baff70fc8ae31332) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix `useTable` hook error return type.

## 4.9.0

### Minor Changes

- Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

  ```
  {
    operator: "or",
    value: [
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "John Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 30,
          },
        ],
      },
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "JR Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 1,
          },
        ],
      },
    ],
  }
  ```

## 4.8.0

### Minor Changes

- [#2751](https://github.com/refinedev/refine/pull/2751) [`addff64c77`](https://github.com/refinedev/refine/commit/addff64c777e4c9f044a1a109cb05453e6e9f762) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

  ```
  {
    operator: "or",
    value: [
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "John Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 30,
          },
        ],
      },
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "JR Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 1,
          },
        ],
      },
    ],
  }
  ```

## 4.7.8

### Patch Changes

- Fix `@tanstack/react-table` exports

- Removed the old version of `react-table` dependency.

## 4.7.7

### Patch Changes

- [#2746](https://github.com/refinedev/refine/pull/2746) [`f19369d911`](https://github.com/refinedev/refine/commit/f19369d91166cb00b2c042034fb856bb0ba0a8d7) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix `@tanstack/react-table` exports

- [#2740](https://github.com/refinedev/refine/pull/2740) [`8a4a96ac6a`](https://github.com/refinedev/refine/commit/8a4a96ac6acb8d497f78fdd6af5a0ff5b71b6429) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Removed the old version of `react-table` dependency.

## 4.7.6

### Patch Changes

- Update `@tanstack/react-table` exports

- Fixed type exports for `UseTableProps` and `UseTableReturnType`.

- Update `@pankod/refine-react-table` exports

## 4.7.5

### Patch Changes

- [#2648](https://github.com/refinedev/refine/pull/2648) [`61db8c3800`](https://github.com/refinedev/refine/commit/61db8c3800d7ab5c7b8b301457f7e55266246f17) Thanks [@omeraplak](https://github.com/omeraplak)! - Update `@pankod/refine-react-table` exports

## 4.7.4

### Patch Changes

- [#2648](https://github.com/refinedev/refine/pull/2648) [`61db8c3800`](https://github.com/refinedev/refine/commit/61db8c3800d7ab5c7b8b301457f7e55266246f17) Thanks [@omeraplak](https://github.com/omeraplak)! - Update `@tanstack/react-table` exports

## 4.7.3

### Patch Changes

- [#2645](https://github.com/refinedev/refine/pull/2645) [`430c7a3d56`](https://github.com/refinedev/refine/commit/430c7a3d565e7fe9aab981625e7e18f7a1584f75) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed type exports for `UseTableProps` and `UseTableReturnType`.

## 4.7.2

### Patch Changes

- Fixed version of react-router to `6.3.0`

## 4.7.1

### Patch Changes

- [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 4.7.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.6.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.5.0

### Minor Changes

- Add React@18 support 🚀

## 4.4.0

### Minor Changes

- [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 4.3.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.2.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.1.0

### Minor Changes

- Upgrade the package accordingly to Tanstack Table v8.

## 4.0.0

### Major Changes

- [#2160](https://github.com/refinedev/refine/pull/2160) [`d9cac36454`](https://github.com/refinedev/refine/commit/d9cac3645426e92d7579b18f18f39e911f6c41a5) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgrade the package accordingly to Tanstack Table v8.

## 3.27.0

### Minor Changes

- Add `hasPagination` property to `useTable` hook to enable/disable pagination.

  **Implementation**

  Updated the `useTable` hook accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

  **Use Cases**

  In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-core@3.36.0

## 3.26.0

### Minor Changes

- [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Add `hasPagination` property to `useTable` hook to enable/disable pagination.

  **Implementation**

  Updated the `useTable` hook accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

  **Use Cases**

  In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

- Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
  - @pankod/refine-core@3.35.0

## 3.22.2

### Patch Changes

- Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
  - @pankod/refine-core@3.23.2
