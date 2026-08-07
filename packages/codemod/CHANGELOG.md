# @refinedev/codemod

## 4.4.3

### Patch Changes

- [#7016](https://github.com/refinedev/refine/pull/7016) [`97e974547949197ed9ca4a1e02b19ef3fc46b673`](https://github.com/refinedev/refine/commit/97e974547949197ed9ca4a1e02b19ef3fc46b673) Thanks [@DoguhanOzgurAkca](https://github.com/DoguhanOzgurAkca)! - feat: comprehensive deprecated code cleanup for v5

  This release completes the cleanup of deprecated code that remained after the Refine v5 migration, providing a cleaner and more maintainable codebase.

  ## Breaking Changes - Removed Deprecated Components

  **@refinedev/antd:**

  - Removed deprecated `ReadyPage` component (use custom components instead)
  - Removed deprecated `LoginPage` component (use `AuthPage` instead)
  - Removed deprecated `useSiderVisible` hook (use `useThemedLayoutContext` instead)

  **@refinedev/chakra-ui:**

  - Removed deprecated `ReadyPage` component (use custom components instead)
  - Removed deprecated `useSiderVisible` hook (use `useThemedLayoutContext` instead)

  **@refinedev/mantine:**

  - Removed deprecated `useSiderVisible` hook (use `useThemedLayoutContext` instead)

  ## New Features

  **@refinedev/codemod:**

  - Added `welcome-page-import-from-core` codemod transformation
  - Automatically migrates WelcomePage imports from UI libraries to @refinedev/core
  - Run with: `npx @refinedev/codemod@latest welcome-page-import-from-core`

  ## Improvements

  **@refinedev/antd:**

  - Un-deprecated `getDefaultFilter` function - now the preferred import location
  - Updated documentation to import `getDefaultFilter` from `@refinedev/antd` instead of `@refinedev/core`

  **@refinedev/core:**

  - Un-deprecated `warnWhenUnsavedChanges` property in RefineOptions (still valid and actively used)
  - Updated all TanStack Query documentation links from v4 to v5
  - Improved TSDoc comments with current TanStack Query v5 references

  ## Documentation Updates

  - Updated 7 documentation files to use `getDefaultFilter` from `@refinedev/antd`
  - Migrated 22 TanStack Query v4 documentation links to v5
  - All API references now point to current TanStack Query v5 documentation

## 4.4.2

### Patch Changes

- [#6980](https://github.com/refinedev/refine/pull/6980) [`f13d22834da01a8eb32306d19257fecaa70cb1ee`](https://github.com/refinedev/refine/commit/f13d22834da01a8eb32306d19257fecaa70cb1ee) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix(codemod): use correct library name for @refinedev/antd useSimpleList and add useTable from @refinedev/antd.

## 4.4.1

### Patch Changes

- [#6976](https://github.com/refinedev/refine/pull/6976) [`f8a232aa8ef42d22ee7021e9ae3a9b112c88a941`](https://github.com/refinedev/refine/commit/f8a232aa8ef42d22ee7021e9ae3a9b112c88a941) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - fix(codemod): correctly rename isLoading to isPending in mutation hooks

  Codemod previously was expecting mutation hooks to have isPending. Since isPending is introduced with react-query@5 it wasn't correct.

- [#6976](https://github.com/refinedev/refine/pull/6976) [`f8a232aa8ef42d22ee7021e9ae3a9b112c88a941`](https://github.com/refinedev/refine/commit/f8a232aa8ef42d22ee7021e9ae3a9b112c88a941) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - fix: Fix useOne hook transformation in codemod to correctly handle query fields

  Fixed the `use-query-and-result-fields-in-useOne-hook` transformation to properly move all query-related fields (`isLoading`, `refetch`, `error`, `status`, `isSuccess`, `isStale`, `fetchStatus`, `failureCount`) into the `query` object when transforming from v4 to v5 format.

## 4.4.0

### Minor Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: add Refine 4→5 migration utilities

  - New codemod transformations for automated Refine v5 migration including UI library updates.

  Run with: `npx @refinedev/codemod@latest refine4-to-refine5`

  > 🚀 Check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

## 4.3.1

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

📢 **Refine Community Release** 📢

- feat: React Router v6 to v7 codemod added.

  For `@refinedev/react-router-v6` to `@refinedev/react-router`:

  ```bash
  npx @refinedev/codemod@latest refine-react-router-v6-to-refine-react-router
  ```

  ```diff
   import routerProvider, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler }
  - from "@refinedev/react-router-v6";
   import routerProvider, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler }
  + from "@refinedev/react-router";

  ```

  For `react-router-dom` to `react-router`:

  ```bash
  npx @refinedev/codemod@latest react-router-dom-to-react-router"
  ```

  ```diff
  -import { RouterProvider } from "react-router-dom";
  +import { RouterProvider } from "react-router";
  ```

  See the [migration guide React Router v6 to v7](https://refine.dev/docs/routing/integrations/react-router/migration-guide-v6-to-v7) for more information.

## 4.3.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v6 to v7 codemod added.

  For `@refinedev/react-router-v6` to `@refinedev/react-router`:

  ```bash
  npx @refinedev/codemod@latest refine-react-router-v6-to-refine-react-router
  ```

  ```diff
   import routerProvider, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler }
  - from "@refinedev/react-router-v6";
   import routerProvider, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler }
  + from "@refinedev/react-router";

  ```

  For `react-router-dom` to `react-router`:

  ```bash
  npx @refinedev/codemod@latest react-router-dom-to-react-router"
  ```

  ```diff
  -import { RouterProvider } from "react-router-dom";
  +import { RouterProvider } from "react-router";
  ```

  See the [migration guide React Router v6 to v7](https://refine.dev/docs/routing/integrations/react-router/migration-guide-v6-to-v7) for more information.

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

## 4.2.0

### Minor Changes

- [#6161](https://github.com/refinedev/refine/pull/6161) [`ff975374efcc05220be4411218c2daf7c19b8995`](https://github.com/refinedev/refine/commit/ff975374efcc05220be4411218c2daf7c19b8995) Thanks [@ritute](https://github.com/ritute)! - feat(react-hook-form): update version constraint from `^7.30.0` to `^7.43.5`

  Update react-hook-form version to address runtime subscribe error

  [Fixes #6139](https://github.com/refinedev/refine/issues/6139)

- [#6214](https://github.com/refinedev/refine/pull/6214) [`77f2ee8c09f45b4b1d7a6305cb256a6a08a1fb61`](https://github.com/refinedev/refine/commit/77f2ee8c09f45b4b1d7a6305cb256a6a08a1fb61) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `npx @refinedev/codemod@latest rename-query-and-mutation-result` to automatically refactor all deprecated values to their new values on the august release #6154

  Following exameples are the changes that will be made:

  ```diff
  - const { tableQueryResult } = useTable(); // or useDataGrid
  + const { tableQuery } = useTable();
  ```

  ```diff
  - const { queryResult } = useSimpleList();
  + const { query } = useSimpleList()
  ```

  ```diff
  - const { queryResult, mutationResult } = useForm();
  + const { query, mutation } = useForm();
  ```

  ```diff
  - const { queryResult } = useShow();
  + const { query } = useShow();
  ```

  ```diff
  - const { queryResult, defaultValueQueryResult } = useSelect(); // or useAutocomplete, useCheckboxGroup, useRadioGroup
  + const { query, defaultValueQuery } = useSelect();
  ```

## 4.1.10

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 4.1.9

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 4.1.8

### Patch Changes

- [#5807](https://github.com/refinedev/refine/pull/5807) [`b20a18e4dfc`](https://github.com/refinedev/refine/commit/b20a18e4dfc97481be865a2a012ea1c588bd76c6) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update jscodeshift version to 0.15.2

- [#5799](https://github.com/refinedev/refine/pull/5799) [`33a8a80d80f`](https://github.com/refinedev/refine/commit/33a8a80d80f160101907ad3a6e808b9d04b80107) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update semver package version to 7.5.2.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 4.1.7

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 4.1.6

### Patch Changes

- [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - The latest major update in `@refinedev/mui` to support `@mui/x-data-grid@6` has been released. This update introduces some changes to the existing codebases that `refine-v3-to-v4` codemod cannot cover or has no relation to. We've updated the codemod to install the `v4` version of `@refinedev/mui` to avoid any issues.

## 4.1.5

### Patch Changes

- [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - The latest major update in `@refinedev/mui` to support `@mui/x-data-grid@6` has been released. This update introduces some changes to the existing codebases that `refine-v3-to-v4` codemod cannot cover or has no relation to. We've updated the codemod to install the `v4` version of `@refinedev/mui` to avoid any issues.

## 4.1.4

### Patch Changes

- [#4423](https://github.com/refinedev/refine/pull/4423) [`c3b00b20e84`](https://github.com/refinedev/refine/commit/c3b00b20e84d00fb5c9184362ad28e1094f91e5f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: babel transformation error

## 4.1.3

### Patch Changes

- [#4423](https://github.com/refinedev/refine/pull/4423) [`c3b00b20e84`](https://github.com/refinedev/refine/commit/c3b00b20e84d00fb5c9184362ad28e1094f91e5f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: babel transformation error

## 4.1.2

### Patch Changes

- [#3929](https://github.com/refinedev/refine/pull/3929) [`c682cfe5cf8`](https://github.com/refinedev/refine/commit/c682cfe5cf8f056d8773e2f23481d0d6d5488c4b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: LoadingButton is still imported from @refinedev/mui

## 4.1.1

### Patch Changes

- [#3929](https://github.com/refinedev/refine/pull/3929) [`c682cfe5cf8`](https://github.com/refinedev/refine/commit/c682cfe5cf8f056d8773e2f23481d0d6d5488c4b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: LoadingButton is still imported from @refinedev/mui

## 4.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added transform function to change `metaData` to `meta`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added `move-to-new-org` transform to move **refine** packages to their new scope `@refinedev`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `Antd` components exported by `@refinedev/antd` have been removed. This codemode will help you move these components into `antd`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added transform function to change `useMenu` imports to `"@refinedev/core"`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added transform function to change `resourceNameOrRouteName` prop to `resource` in buttons.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - Added transformation function to renamed `AuthProvider` to `LegacyAuthProvider`.

  - Added transformation function to add `v3LegacyAuthProviderCompatible: true` to all auth hooks.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  fix: semver dependency

## 3.31.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.30.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.29.0

### Minor Changes

- [#3169](https://github.com/refinedev/refine/pull/3169) [`76b0e932a60`](https://github.com/refinedev/refine/commit/76b0e932a60fbbade409a26118098ffe85da6ed6) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added Ant design v4 to v5 codemod support.

## 3.28.0

### Minor Changes

- [#3169](https://github.com/refinedev/refine/pull/3169) [`76b0e932a60`](https://github.com/refinedev/refine/commit/76b0e932a60fbbade409a26118098ffe85da6ed6) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added Ant design v4 to v5 codemod support.

## 3.27.2

### Patch Changes

- Fixed `@pankod/refine-codemod` build issue

## 3.27.1

### Patch Changes

- [`031e15e797`](https://github.com/refinedev/refine/commit/031e15e79731c3394623969829e5474b947371c8) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `@pankod/refine-codemod` build issue

## 3.27.0

### Minor Changes

- Add Codemod support for changed `columns` usage of `useDataGrid` hook. [#2072](https://github.com/refinedev/refine/pull/2072).

  ```diff
  export const PostsList: React.FC = () => {
  -    const { dataGridProps } = useDataGrid<IPost>({
  -        columns,
  -    });
  +    const { dataGridProps } = useDataGrid<IPost>();
      return (
          <List>
  -            <DataGrid {...dataGridProps} autoHeight />
  +            <DataGrid {...dataGridProps} columns={columns} autoHeight />
          </List>
      );
  };
  ```

## 3.26.0

### Minor Changes

- [#2072](https://github.com/refinedev/refine/pull/2072) [`bbca622ede`](https://github.com/refinedev/refine/commit/bbca622eded117271350aa178b3e757c890c5bc4) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add Codemod support for changed `columns` usage of `useDataGrid` hook. [#2072](https://github.com/refinedev/refine/pull/2072).

  ```diff
  export const PostsList: React.FC = () => {
  -    const { dataGridProps } = useDataGrid<IPost>({
  -        columns,
  -    });
  +    const { dataGridProps } = useDataGrid<IPost>();
      return (
          <List>
  -            <DataGrid {...dataGridProps} autoHeight />
  +            <DataGrid {...dataGridProps} columns={columns} autoHeight />
          </List>
      );
  };
  ```
