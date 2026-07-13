# @refinedev/core

## 5.1.0

### Minor Changes

- [#7440](https://github.com/refinedev/refine/pull/7440) [`b71dc1fedbfd0bc0196f45d6ef52127e00633790`](https://github.com/refinedev/refine/commit/b71dc1fedbfd0bc0196f45d6ef52127e00633790) Thanks [@pulkitxm](https://github.com/pulkitxm)! - feat: add `updateIdentity` method to auth provider and `useUpdateIdentity` hook

  Added an optional `updateIdentity` method to the `AuthProvider` interface so consumers can natively update the current user's identity (e.g. username and/or email), following the same pattern as `updatePassword`.

  A new `useUpdateIdentity` hook calls the `updateIdentity` method from the `authProvider` under the hood, mirroring `useUpdatePassword`'s behavior for redirects, notifications and error handling.

  ```tsx
  import { useUpdateIdentity } from "@refinedev/core";

  const { mutate: updateIdentity } = useUpdateIdentity();

  updateIdentity({ name: "New Name", email: "new@email.com" });
  ```

  The `updateIdentity` method is optional, so existing auth providers remain fully backwards-compatible.

  [Resolves #6926](https://github.com/refinedev/refine/issues/6926)

### Patch Changes

- [#7426](https://github.com/refinedev/refine/pull/7426) [`f8e4c53f7aa83eff6563d62a9f09fc71d513e0c3`](https://github.com/refinedev/refine/commit/f8e4c53f7aa83eff6563d62a9f09fc71d513e0c3) Thanks [@jwgmeligmeyling](https://github.com/jwgmeligmeyling)! - fix(core): keep query context signal lazy when merging meta

  `prepareQueryContext` was previously spread into new `meta` objects inside core data hooks. Because `signal` is exposed as a getter, object spread eagerly accessed it during merge and marked the query as abortable earlier than intended.

  This keeps `signal` lazy by merging `meta` inside `prepareQueryContext` and preserving the getter on the returned object. The fix is applied across the affected hooks in `@refinedev/core`, and a regression test was added for the lazy `signal` behavior.

  Resolves #7132

## 5.0.12

### Patch Changes

- [#7372](https://github.com/refinedev/refine/pull/7372) [`59c6470ca0ecff0588f749ef4530312e7537bfdd`](https://github.com/refinedev/refine/commit/59c6470ca0ecff0588f749ef4530312e7537bfdd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix(core): preserve custom `getList` response fields in `useList` and `useTable` results.

  We had an edge case where custom fields returned from `getList` were available on `query.data` but dropped from `result`. Now those extra fields are preserved in both `useList` and `useTable`.

## 5.0.11

### Patch Changes

- [#7289](https://github.com/refinedev/refine/pull/7289) [`c040475723d8e2980c0b3ba6d8fae35e05525b09`](https://github.com/refinedev/refine/commit/c040475723d8e2980c0b3ba6d8fae35e05525b09) Thanks [@RonakRahane](https://github.com/RonakRahane)! - fix: useDeleteButton now passes meta params to useButtonCanAccess

  useDeleteButton was not forwarding the `meta` prop to `useButtonCanAccess`, which caused custom access control rules relying on meta to fail for delete buttons.

  Fixes #7285

## 5.0.10

### Patch Changes

- [#7245](https://github.com/refinedev/refine/pull/7245) [`bf3cc65f73a6801a5fd1e42e6162efd2e89406d3`](https://github.com/refinedev/refine/commit/bf3cc65f73a6801a5fd1e42e6162efd2e89406d3) Thanks [@harsha-cpp](https://github.com/harsha-cpp)! - fix: correctly parse deeply nested conditional filters from URL with syncWithLocation

  Increased `qs.parse` depth from default 5 to 10 to support deeply nested conditional filters (e.g., `or -> and -> {field, operator, value}`). Previously, nested filter properties were incorrectly parsed as bracket notation keys (`[field]`, `[operator]`, `[value]`) after page reload when using `syncWithLocation: true`.

## 5.0.9

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-internal@2.0.2

## 5.0.8

### Patch Changes

- [#7143](https://github.com/refinedev/refine/pull/7143) [`72ed290dd671ce0031737b5cfe638b2998d3a048`](https://github.com/refinedev/refine/commit/72ed290dd671ce0031737b5cfe638b2998d3a048) Thanks [@arndom](https://github.com/arndom)! - - Add case sensitive `eq` and `ne` variants

  [Resolves #6984](https://github.com/refinedev/refine/issues/6984)

- [#7124](https://github.com/refinedev/refine/pull/7124) [`dbf5ab844bfe87c0c5b23ca080ab2ef9b64bf070`](https://github.com/refinedev/refine/commit/dbf5ab844bfe87c0c5b23ca080ab2ef9b64bf070) Thanks [@arndom](https://github.com/arndom)! - - Invalidate queries on logout.

  - Resolves cached error state being there after login from forced logout.

  [Resolves #6997](https://github.com/refinedev/refine/issues/6997)

- [#7163](https://github.com/refinedev/refine/pull/7163) [`add2f6f3c16f808d4d13255a120f6785ad21a425`](https://github.com/refinedev/refine/commit/add2f6f3c16f808d4d13255a120f6785ad21a425) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix(core): `useGetToPath` returns `undefined` #7159

  Fixed an issue where `useGetToPath` would return `undefined` when a partial resource object was passed. The hook now always looks up the full resource definition from the resources array to ensure all action routes are available.

  Additionally, added a warning message when an action route cannot be found for a resource, making it easier to debug routing issues.

  Resolves #7159

## 5.0.7

### Patch Changes

- [#7150](https://github.com/refinedev/refine/pull/7150) [`0ceb0f6e5cf57ba50760e55709d7e70c69b13461`](https://github.com/refinedev/refine/commit/0ceb0f6e5cf57ba50760e55709d7e70c69b13461) Thanks [@pcfreak30](https://github.com/pcfreak30)! - feat(core): add option to disable RouteChangeHandler

  Added `disableRouteChangeHandler` option to Refine context and props

  Resolves #7148

## 5.0.6

### Patch Changes

- [#7106](https://github.com/refinedev/refine/pull/7106) [`5a79da5cf4ce38bed776dd63a935dd3102b3d4df`](https://github.com/refinedev/refine/commit/5a79da5cf4ce38bed776dd63a935dd3102b3d4df) Thanks [@angelodirb](https://github.com/angelodirb)! - fix: memoize queryOptions.select in useList to prevent multiple executions

- [#7083](https://github.com/refinedev/refine/pull/7083) [`3ece8335935ff3e8c27f5883cd2f06ef29c2c746`](https://github.com/refinedev/refine/commit/3ece8335935ff3e8c27f5883cd2f06ef29c2c746) Thanks [@a28689604](https://github.com/a28689604)! - fix(core): stabilize autosave debounce and cancel on unmount in useForm

  Fixes #7082

## 5.0.5

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

- Updated dependencies [[`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3)]:
  - @refinedev/devtools-internal@2.0.1

## 5.0.4

### Patch Changes

- [#7031](https://github.com/refinedev/refine/pull/7031) [`99e9cf01546a4707e1d79be2a4e1671e045bf41e`](https://github.com/refinedev/refine/commit/99e9cf01546a4707e1d79be2a4e1671e045bf41e) Thanks [@DipakHalkude](https://github.com/DipakHalkude)! - fix: prevent external queryOptions.enabled from overriding internal ID check in useForm (#7031)

  Fixed a bug where the `useForm` hook allowed external `queryOptions.enabled` to bypass internal ID safety checks, causing API calls with undefined IDs.

  Added comprehensive tests covering create mode, undefined IDs, and various enabled combinations to ensure the fix works correctly.

  Fixes #7031

- [#7035](https://github.com/refinedev/refine/pull/7035) [`6934c008bee0e07eab424f560503fe5a8e541c8a`](https://github.com/refinedev/refine/commit/6934c008bee0e07eab424f560503fe5a8e541c8a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `useInfiniteList` pagination not work #7034

  Now `useInfiniteList` correctly advances server-side pages when loading more results. This bug was caused by [this commit](https://github.com/refinedev/refine/commit/1a02f020fdc2030e7c7a702e3bd9bfddae2fe1c8).

  Resolves #7034

## 5.0.3

### Patch Changes

- [#7020](https://github.com/refinedev/refine/pull/7020) [`32ff2e4200ff888111f03d613e7bb838f505c1b1`](https://github.com/refinedev/refine/commit/32ff2e4200ff888111f03d613e7bb838f505c1b1) Thanks [@samay-rgb](https://github.com/samay-rgb)! - fix: use stable array to prevent memoization issue in useList. #7019

  Fixed an issue where `useList`, `useMany`, `useTable`, and `useCustom` hooks created new empty arrays/objects on every render. This caused `useEffect` and `useMemo` to trigger unnecessarily.

  Now these hooks use stable references for better performance.

  Fixes #7019

## 5.0.2

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

- [#7015](https://github.com/refinedev/refine/pull/7015) [`acb1e96b0d6cfddbd6115818b8f01c73d56934ff`](https://github.com/refinedev/refine/commit/acb1e96b0d6cfddbd6115818b8f01c73d56934ff) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect parseTableParams issue.

  Resolves (#7013)[https://github.com/refinedev/refine/issues/7013]

## 5.0.1

### Patch Changes

- [#6990](https://github.com/refinedev/refine/pull/6990) [`90f3f7a43f71747c8d35e69b9a84a5dee6df9354`](https://github.com/refinedev/refine/commit/90f3f7a43f71747c8d35e69b9a84a5dee6df9354) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix(core): error notification infinite render issue

  useEffect hook in data query hooks that handles the error notification had whole error object in dependency array, which changes with every request, thus causing infinite re-renders. Changed the dependency to just error message string.

  [Resolves #6983](https://github.com/refinedev/refine/issues/6983)

## 5.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade to Refine 5.0 with React 19 and TanStack Query v5

  - Modern React 19 and TanStack Query v5 support with improved performance and developer experience.
  - Removed all deprecated APIs and legacy systems for a cleaner, more maintainable codebase.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Throw an error in `useGetLocale` if it is called without an i18n Provider.

  - This ensures the hook's return type matches that of `i18nProvider.getLocale`.
  - `useTranslation().getLocale` which is from `useGetLocale` now returns a string.

  [Resolves #6812](https://github.com/refinedev/refine/issues/6812)

- Updated dependencies [[`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/devtools-internal@2.0.0

## 4.58.0

### Minor Changes

- [#6880](https://github.com/refinedev/refine/pull/6880) [`2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2`](https://github.com/refinedev/refine/commit/2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2) Thanks [@arndom](https://github.com/arndom)! - - Add `siderItemsAreCollapsed` prop to all `Sider` components to set default expanded/collapsed nested sider items.

  - UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6721](https://github.com/refinedev/refine/issues/6721)

### Patch Changes

- [#6925](https://github.com/refinedev/refine/pull/6925) [`5a3e404de3f655efd8317f8e2eacbc2be8b3fa7a`](https://github.com/refinedev/refine/commit/5a3e404de3f655efd8317f8e2eacbc2be8b3fa7a) Thanks [@pokycookie](https://github.com/pokycookie)! - - Preserve row id in meta for data hooks.

  [Resolves #6906](https://github.com/refinedev/refine/issues/6906)

## 4.57.11

### Patch Changes

- [#6889](https://github.com/refinedev/refine/pull/6889) [`6087f72c2d38977410e401efae61c5583d61425d`](https://github.com/refinedev/refine/commit/6087f72c2d38977410e401efae61c5583d61425d) Thanks [@DoguhanOzgurAkca](https://github.com/DoguhanOzgurAkca)! - [chore: replace outdated and broken `@tanstack/query` links](https://github.com/refinedev/refine/pull/6889)

  Updated broken links to `@tanstack/query` documentation for `useMutation` in TSDoc definitions.

## 4.57.10

### Patch Changes

- [#6826](https://github.com/refinedev/refine/pull/6826) [`9dca95e276fa704911c32599473a54a71a6c5246`](https://github.com/refinedev/refine/commit/9dca95e276fa704911c32599473a54a71a6c5246) Thanks [@devarsh-mavani-19](https://github.com/devarsh-mavani-19)! - fix: pass meta params to useCan hook params #6833

  Now access control provider can receive additional arguments through meta params.

  Resolves [#6833]

## 4.57.9

### Patch Changes

📢 **Refine Community Release** 📢

- fix: wrong JSDoc links in components

## 4.57.8

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6728](https://github.com/refinedev/refine/pull/6728) [`1663501c9c9f37b98434af83afd8d0fc41d27af2`](https://github.com/refinedev/refine/commit/1663501c9c9f37b98434af83afd8d0fc41d27af2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: wrong JSDoc links in components

## 4.57.7

### Patch Changes

📢 **Refine Community Release** 📢

- Move invalidation in `useRegister` to be called only on success.

  [Resolves #6639](https://github.com/refinedev/refine/issues/6639)

📢 **Refine Community Release** 📢

- fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 4.57.6

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6658](https://github.com/refinedev/refine/pull/6658) [`91aaf75f04e6e6434196ece9a52b024c70d29df4`](https://github.com/refinedev/refine/commit/91aaf75f04e6e6434196ece9a52b024c70d29df4) Thanks [@arndom](https://github.com/arndom)! - Move invalidation in `useRegister` to be called only on success.

  [Resolves #6639](https://github.com/refinedev/refine/issues/6639)

⚡ **Refine Enterprise Release** ⚡

- [#6683](https://github.com/refinedev/refine/pull/6683) [`a12a0821e3c573386c2a8eea4ac1582cc46dd26d`](https://github.com/refinedev/refine/commit/a12a0821e3c573386c2a8eea4ac1582cc46dd26d) Thanks [@aliemir](https://github.com/aliemir)! - fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 4.57.5

### Patch Changes

📢 **Refine Community Release** 📢

- feat(core): add `enabled` prop to `useLoadingOvertime` and `overtimeOptions`

  Added missing `enabled` prop to `useLoadingOvertime` and added ability to globally configure through `options.overtime.enabled`.

  Due to the nature of calculating elapsed time, an interval is set by the `interval` prop. This was causing unwanted updates in the return value and there was no way to disable it properly.

📢 **Refine Community Release** 📢

- fixed: `to` query parameter is not working after login. #6582
  From now on, the `to` query parameter will work after login. If the URL includes a `to` query parameter, the user will be redirected to the specified path after logging in.

  Example:

  After logout, Refine will automatically appends `to` query param to URL.

  ```
  http://localhost:3000/login?to=/any-path
  ```

  After login, it will redirect to `http://localhost:3000/any-path`

  Resolves [#6582](https://github.com/refinedev/refine/issues/6582)

📢 **Refine Community Release** 📢

- refactor(core): remove duplicated overtime intervals caused by internally used hooks

  Updated Refine's data hooks and extensions to prevent duplicated overtime intervals from being created. This uses the `enabled` prop to prevent internal hooks from registering the intervals.

  Prior to this change, `useTable` was initializing its own `useLoadingOvertime` hook but also propagated the `elapsedTime` from `useList` hook which is used internally by `useTable`. This caused duplicated intervals and unwanted updates.

  This now ensures a single interval is created and used for the extension hooks.

📢 **Refine Community Release** 📢

- fix(core): add missing checks and warnings for `ids` and `resource` props in `useMany` hook

  Added checks for `ids` and `resource` props to check in runtime if they are valid or not.

  `useMany` will warn if `ids` or `resource` props are missing unless the query is manually enabled through `queryOptions.enabled` prop.

  [Resolves #6617](https://github.com/refinedev/refine/issues/6617)

## 4.57.4

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6626](https://github.com/refinedev/refine/pull/6626) [`087039f0ccd13e9fe5bf4ef904e4f1c2df129d69`](https://github.com/refinedev/refine/commit/087039f0ccd13e9fe5bf4ef904e4f1c2df129d69) Thanks [@aliemir](https://github.com/aliemir)! - feat(core): add `enabled` prop to `useLoadingOvertime` and `overtimeOptions`

  Added missing `enabled` prop to `useLoadingOvertime` and added ability to globally configure through `options.overtime.enabled`.

  Due to the nature of calculating elapsed time, an interval is set by the `interval` prop. This was causing unwanted updates in the return value and there was no way to disable it properly.

⚡ **Refine Enterprise Release** ⚡

- [#6626](https://github.com/refinedev/refine/pull/6626) [`087039f0ccd13e9fe5bf4ef904e4f1c2df129d69`](https://github.com/refinedev/refine/commit/087039f0ccd13e9fe5bf4ef904e4f1c2df129d69) Thanks [@aliemir](https://github.com/aliemir)! - refactor(core): remove duplicated overtime intervals caused by internally used hooks

  Updated Refine's data hooks and extensions to prevent duplicated overtime intervals from being created. This uses the `enabled` prop to prevent internal hooks from registering the intervals.

  Prior to this change, `useTable` was initializing its own `useLoadingOvertime` hook but also propagated the `elapsedTime` from `useList` hook which is used internally by `useTable`. This caused duplicated intervals and unwanted updates.

  This now ensures a single interval is created and used for the extension hooks.

## 4.57.3

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6618](https://github.com/refinedev/refine/pull/6618) [`5377e7d8f7ccb986c5d38352351b9b2d2c414fde`](https://github.com/refinedev/refine/commit/5377e7d8f7ccb986c5d38352351b9b2d2c414fde) Thanks [@aliemir](https://github.com/aliemir)! - fix(core): add missing checks and warnings for `ids` and `resource` props in `useMany` hook

  Added checks for `ids` and `resource` props to check in runtime if they are valid or not.

  `useMany` will warn if `ids` or `resource` props are missing unless the query is manually enabled through `queryOptions.enabled` prop.

  [Resolves #6617](https://github.com/refinedev/refine/issues/6617)

## 4.57.2

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6583](https://github.com/refinedev/refine/pull/6583) [`5ce59d0352ba5402452bb812ac0e506b3c2216df`](https://github.com/refinedev/refine/commit/5ce59d0352ba5402452bb812ac0e506b3c2216df) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `to` query parameter is not working after login. #6582
  From now on, the `to` query parameter will work after login. If the URL includes a `to` query parameter, the user will be redirected to the specified path after logging in.

  Example:

  After logout, Refine will automatically appends `to` query param to URL.

  ```
  http://localhost:3000/login?to=/any-path
  ```

  After login, it will redirect to `http://localhost:3000/any-path`

  Resolves [#6582](https://github.com/refinedev/refine/issues/6582)

## 4.57.1

### Patch Changes

📢 **Refine Community Release** 📢

- This PR fixes an issue where the ListButton component doesn't include a query filter in the navigation URL.

  [Resolves #6528](https://github.com/refinedev/refine/issues/6528)

📢 **Refine Community Release** 📢

- chore: update package descriptions

📢 **Refine Community Release** 📢

- refactor: modified the Authenticated component to receive optional params prop to be passed to the useIsAuthenticated hook.

  Fixes #6309

📢 **Refine Community Release** 📢

- fix: `useUpdate` and `useForm` hooks throws an error when `id` is an empty string. (`id=""`) #6505

  This reverts a breaking change introduced in [PR #6116](https://github.com/refinedev/refine/pull/6116) and restores support for using an empty string as `id`. This enables updates without an `id` field, as allowed before `@refinedev/core@4.54.0`.

  Affected versions with this bug:

  - `@refinedev/core@4.54.0`
  - `@refinedev/core@4.54.1`
  - `@refinedev/core@4.55.0`
  - `@refinedev/core@4.56.0`

  The bug is fixed in:

  - `@refinedev/core@4.56.1`

  Resolves [#6505](https://github.com/refinedev/refine/issues/6505)

- Updated dependencies []:
  - @refinedev/devtools-internal@1.1.16

## 4.57.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6558](https://github.com/refinedev/refine/pull/6558) [`42d730aa2908003cfb0dcf0c57e9b70793c88ddc`](https://github.com/refinedev/refine/commit/42d730aa2908003cfb0dcf0c57e9b70793c88ddc) Thanks [@OmkarBansod02](https://github.com/OmkarBansod02)! - This PR fixes an issue where the ListButton component doesn't include a query filter in the navigation URL.

  [Resolves #6528](https://github.com/refinedev/refine/issues/6528)

⚡ **Refine Enterprise Release** ⚡

- [#6483](https://github.com/refinedev/refine/pull/6483) [`8309c5690e7c49529f07d288e79896636c6ce7c2`](https://github.com/refinedev/refine/commit/8309c5690e7c49529f07d288e79896636c6ce7c2) Thanks [@reedwane](https://github.com/reedwane)! - refactor: modified the Authenticated component to receive optional params prop to be passed to the useIsAuthenticated hook.

  Fixes #6309

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

⚡ **Refine Enterprise Release** ⚡

- [#6514](https://github.com/refinedev/refine/pull/6514) [`f32af58283bdaf7712805520bd9feb8bfd27ba38`](https://github.com/refinedev/refine/commit/f32af58283bdaf7712805520bd9feb8bfd27ba38) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `useUpdate` and `useForm` hooks throws an error when `id` is an empty string. (`id=""`) #6505

  This reverts a breaking change introduced in [PR #6116](https://github.com/refinedev/refine/pull/6116) and restores support for using an empty string as `id`. This enables updates without an `id` field, as allowed before `@refinedev/core@4.54.0`.

  Affected versions with this bug:

  - `@refinedev/core@4.54.0`
  - `@refinedev/core@4.54.1`
  - `@refinedev/core@4.55.0`
  - `@refinedev/core@4.56.0`

  The bug is fixed in:

  - `@refinedev/core@4.56.1`

  Resolves [#6505](https://github.com/refinedev/refine/issues/6505)

- Updated dependencies [[`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53)]:
  - @refinedev/devtools-internal@1.1.15

## 4.56.0

### Minor Changes

- [#6445](https://github.com/refinedev/refine/pull/6445) [`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added new prop called `mutationVariables` to `<AuthPage />`. #6431
  From now on, you can pass additional parameters to the `authProvider` methods using the `mutationVariables` prop of the `<AuthPage />` component.

  ```tsx
  import { AuthPage } from "@refinedev/antd"; // or "@refinedev/chakra-ui", "@refinedev/mantine", "@refinedev/mui"

  const MyLoginPage = () => {
    return (
      <AuthPage
        type="login" // all other types are also supported.
        // highlight-start
        mutationVariables={{
          foo: "bar",
          xyz: "abc",
        }}
        // highlight-end
      />
    );
  };

  // all mutation methods are supported.
  const authProvider = {
    login: async ({ foo, xyz, ...otherProps }) => {
      console.log(foo); // bar
      console.log(xyz); // abc
      // ...
    },
    register: async ({ foo, xyz, ...otherProps }) => {
      console.log(foo); // bar
      console.log(xyz); // abc
      // ...
    },
    // ...
  };
  ```

  [Resolves #6431](https://github.com/refinedev/refine/issues/6431)

- [#6445](https://github.com/refinedev/refine/pull/6445) [`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: exported useInvalidateAuthStore hook from auth hooks

  Now you can invalide the users identity state and force a react query refresh using this hook

  Resolves [#6341](https://github.com/refinedev/refine/issues/6341)

- [#6445](https://github.com/refinedev/refine/pull/6445) [`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: Added `MetaContext` to share data between components, providers, and hooks.

  > 🚨 Designed for internal use only.

### Patch Changes

- [#6445](https://github.com/refinedev/refine/pull/6445) [`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: Added more flexibility to the [`<Link />`](https://refine.dev/docs/routing/components/link/) component's `ref` type by changing it from `HTMLAnchorElement` to `Element`.
  From now on, we can pass any type of `ref` to the [`<Link />`](https://refine.dev/docs/routing/components/link/) component.

  ```tsx
  // Before fix - Only worked with HTMLAnchorElement
  const ref = useRef<HTMLAnchorElement>(null);

  // After fix - Works with any Element type
  const ref = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLSpanElement>(null);
  ```

  Resolves [#6463](https://github.com/refinedev/refine/issues/6463)

- [#6445](https://github.com/refinedev/refine/pull/6445) [`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: Priority logic between `to` and `go` props in [`Link`](https://refine.dev/docs/routing/components/link/) component.
  From now on, the `to` prop has priority over the `go` prop. If both are passed, the `to` prop will be used.

  ```tsx
  // Before fix - go would override to
  <Link to="/posts" go={{ resource: "categories" }} />

  // After fix - to overrides go
  <Link to="/posts" go={{ resource: "categories" }} />
  ```

  Resolves [#6461](https://github.com/refinedev/refine/issues/6461)

## 4.55.0

### Minor Changes

- [#6330](https://github.com/refinedev/refine/pull/6330) [`5a81b35bc1eedbecb4b6c531a2fa5235dd0caf31`](https://github.com/refinedev/refine/commit/5a81b35bc1eedbecb4b6c531a2fa5235dd0caf31) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: add [`<Link />`](https://refine.dev/docs/routing/components/link/) component to navigate to a resource with a specific action. Under the hood, It uses [`useGo`](https://refine.dev/docs/routing/hooks/use-go/) to generate the URL.

  ## Usage

  ```tsx
  import { Link } from "@refinedev/core";

  const MyComponent = () => {
    return (
      <>
        {/* simple usage, navigates to `/posts` */}
        <Link to="/posts">Posts</Link>
        {/* complex usage with more control, navigates to `/posts` with query filters */}
        <Link
          go={{
            query: {
              // `useTable` or `useDataGrid` automatically use this filters to fetch data if `syncWithLocation` is true.
              filters: [
                {
                  operator: "eq",
                  value: "published",
                  field: "status",
                },
              ],
            },
            to: {
              resource: "posts",
              action: "list",
            },
          }}
        >
          Posts
        </Link>
      </>
    );
  };
  ```

  [Fixes #6329](https://github.com/refinedev/refine/issues/6329)

- [#6330](https://github.com/refinedev/refine/pull/6330) [`5a81b35bc1eedbecb4b6c531a2fa5235dd0caf31`](https://github.com/refinedev/refine/commit/5a81b35bc1eedbecb4b6c531a2fa5235dd0caf31) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: From now on, [`useLink`](https://refine.dev/docs/routing/hooks/use-link/) returns [`<Link />`](https://refine.dev/docs/routing/components/link/) component instead of returning [`routerProvider.Link`](https://refine.dev/docs/routing/router-provider/#link).

  Since the `<Link />` component uses `routerProvider.Link` under the hood with leveraging `useGo` hook to generate the URL there is no breaking change. It's recommended to use the `<Link />` component from the `@refinedev/core` package instead of `useLink` hook. This hook is used mostly for internal purposes and is only exposed for customization needs.

  [Fixes #6329](https://github.com/refinedev/refine/issues/6329)

### Patch Changes

- [#6327](https://github.com/refinedev/refine/pull/6327) [`c630b090539082b5166b508053f87274624c794e`](https://github.com/refinedev/refine/commit/c630b090539082b5166b508053f87274624c794e) Thanks [@Anonymous961](https://github.com/Anonymous961)! - fix(core): added ability to return `undefined` to fallback to the default notification config when using the function form in `successNotification` and `errorNotification` props.

  [Resolves #6270](https://github.com/refinedev/refine/issues/6270)

- [#6353](https://github.com/refinedev/refine/pull/6353) [`a0f2d7bbef3093e11c3024bb7fa2a0ffc3ce9e10`](https://github.com/refinedev/refine/commit/a0f2d7bbef3093e11c3024bb7fa2a0ffc3ce9e10) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: The `label` and `route` fields in `useMenu().menuItems` were marked as deprecated, but they are not actually deprecated. This issue was caused by `menuItems` extending from `IResourceItem`, however, `menuItems` populates these fields and handles deprecation of these fields internally. This change removes the deprecation warning for these fields.

  ```tsx
  export const Sider = () => {
    const { menuItems } = useMenu();
    menuItems.map((item) => {
      // these are safe to use
      console.log(item.label);
      console.log(item.route);
      item.children.map((child) => {
        // these are safe to use
        console.log(child.label);
        console.log(child.route);
      });
    });

    return <div>{/* ... */}</div>;
  };
  ```

  [Fixes #6352](https://github.com/refinedev/refine/issues/6352)

- [#6386](https://github.com/refinedev/refine/pull/6386) [`bfe28f0316b3623aaef0b60ae39ebe24939dd0af`](https://github.com/refinedev/refine/commit/bfe28f0316b3623aaef0b60ae39ebe24939dd0af) Thanks [@hugorezende](https://github.com/hugorezende)! - fix(core): wrap `setFilters` and `setSorters` methods with `useCallback` to prevent looping re-renders

  With this we can use the setFilters as dependencies inside useEffects without infinite loop since state changes in the hook won't cause the functions to be re-assigned

  [Fixes #6385](https://github.com/refinedev/refine/issues/6385)

## 4.54.1

### Patch Changes

- [#6260](https://github.com/refinedev/refine/pull/6260) [`05b944a75f3a907c0df7b30591a5c5fbbc3cc3f7`](https://github.com/refinedev/refine/commit/05b944a75f3a907c0df7b30591a5c5fbbc3cc3f7) Thanks [@aliemir](https://github.com/aliemir)! - fix(core): `useResourceParams` not reflecting `id` prop changes immediately

  `useResourceParams` hook was not reflecting the changes in the `id` prop immediately. This was due to the `id` state being set in the `useEffect` hook. This PR fixes the issue by setting the `id` state properly during render rather than after the render is complete.

  [Fixes #6259](https://github.com/refinedev/refine/issues/6259)

- [#6222](https://github.com/refinedev/refine/pull/6222) [`ec24fe0f37aa9b92991bf105719f6f42bb68d63c`](https://github.com/refinedev/refine/commit/ec24fe0f37aa9b92991bf105719f6f42bb68d63c) Thanks [@Sergio16T](https://github.com/Sergio16T)! - feat: added support for meta.gqlVariables to hasura dataProvider. Updated GraphQLQueryOptions to include optional field gqlVariables

  [Feat #5864](https://github.com/refinedev/refine/issues/5864)

## 4.54.0

### Minor Changes

- [#6180](https://github.com/refinedev/refine/pull/6180) [`292cebc5a70f19400793292b79d1400fec114591`](https://github.com/refinedev/refine/commit/292cebc5a70f19400793292b79d1400fec114591) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useSelect`](https://refine.dev/docs/data/hooks/use-select/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

  ```diff
  import { useSelect } from '@refinedev/core';

  - const { queryResult, defaultValueQueryResult } = useSelect();
  + const { query, defaultValueQuery } = useSelect();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

- [#6116](https://github.com/refinedev/refine/pull/6116) [`7e71f12b81954fd3a59678d7fcccd7b557879a94`](https://github.com/refinedev/refine/commit/7e71f12b81954fd3a59678d7fcccd7b557879a94) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [Mutation parameters](https://refine.dev/docs/data/hooks/use-update/#mutation-parameters) should be given as a prop to the `useUpdate` hook. #6102
  From now on, you can pass mutation parameters to the `useUpdate` hook as a prop.

  Old usage of `useUpdate` hook:

  ```tsx
  import { useUpdate } from "@refinedev/core";

  const { mutate } = useUpdate();

  mutate(
    {
      resource: "products",
      id: 1,
      mutationMode: "optimistic",
      successNotification: false,
      values: {
        name: "New Product",
        material: "Wood",
      },
    },
    {
      onSuccess: () => {
        /* do something after mutation success */
      },
    },
  );
  ```

  New usage of `useUpdate` hook:

  ```tsx
  import { useUpdate } from "@refinedev/core";

  const { mutate } = useUpdate({
    resource: "products",
    successNotification: false,
    mutationMode: "optimistic",
    mutationOptions: {
      onSuccess: () => {
        /* do something after mutation success */
      },
    },
  });

  mutate({
    // also you can override the parameters given to the hook
    id: 1,
    values: {
      name: "New Product",
      material: "Wood",
    },
  });
  ```

  You can think of the parameters given to the `useUpdate` hook as default values, while the parameters given to the `mutate` function are the values used for that specific mutation or dynamic values.

  > 🚨 If you pass these parameters to the `mutate` function, it will override the values given to the hook.

- [#6116](https://github.com/refinedev/refine/pull/6116) [`7e71f12b81954fd3a59678d7fcccd7b557879a94`](https://github.com/refinedev/refine/commit/7e71f12b81954fd3a59678d7fcccd7b557879a94) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [Mutation parameters](https://refine.dev/docs/data/hooks/use-create/#mutation-parameters) should be given as a prop to the `useCreate` hook. #6113
  From now on, you can pass mutation parameters to the `useCreate` hook as a prop.

  Old usage of `useCreate` hook:

  ```tsx
  import { useCreate } from "@refinedev/core";

  const { mutate } = useCreate();

  mutate(
    {
      resource: "products",
      values: {
        name: "New Product",
        material: "Wood",
      },
      mutationMode: "optimistic",
      successNotification: false,
    },
    {
      onSuccess: () => {
        /* do something after mutation success */
      },
    },
  );
  ```

  New usage of `useCreate` hook:

  ```tsx
  import { useCreate } from "@refinedev/core";

  const { mutate } = useCreate({
    resource: "products",
    successNotification: false,
    mutationMode: "optimistic",
    mutationOptions: {
      onSuccess: () => {
        /* do something after mutation success */
      },
    },
  });

  mutate({
    // also you can override the parameters given to the hook
    values: {
      name: "New Product",
      material: "Wood",
    },
  });
  ```

  You can think of the parameters given to the `useCreate` hook as default values, while the parameters given to the `mutate` function are the values used for that specific mutation or dynamic values.

  > 🚨 If you pass these parameters to the `mutate` function, it will override the values given to the hook.

- [#6172](https://github.com/refinedev/refine/pull/6172) [`4967a51944c139d102fcfc04ada5a42c725ed7c2`](https://github.com/refinedev/refine/commit/4967a51944c139d102fcfc04ada5a42c725ed7c2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useTable`](https://refine.dev/docs/data/hooks/use-table/)'s `tableQueryResult` is deprecated, use `tableQuery` instead. #6169

  ```diff
  import { useTable } from '@refinedev/core';

  - const { tableQueryResult } = useTable();
  + const { tableQuery } = useTable();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

- [#6164](https://github.com/refinedev/refine/pull/6164) [`8ed027eec66c41c444f168f4f52e6b51057bc498`](https://github.com/refinedev/refine/commit/8ed027eec66c41c444f168f4f52e6b51057bc498) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useForm`](https://refine.dev/docs/data/hooks/use-form/)'s `queryResult` is deprecated, use `query` instead. #6163

  ```diff
  import { useForm } from '@refinedev/core';

  - const { queryResult } = useForm();
  + const { query } = useForm();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

- [#6116](https://github.com/refinedev/refine/pull/6116) [`7e71f12b81954fd3a59678d7fcccd7b557879a94`](https://github.com/refinedev/refine/commit/7e71f12b81954fd3a59678d7fcccd7b557879a94) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [Mutation parameters](https://refine.dev/docs/data/hooks/use-create-many/#mutation-parameters) should be given as a prop to the `useCreateMany` hook. #6114
  From now on, you can pass mutation parameters to the `useCreateMany` hook as a prop.

  Old usage of `useCreateMany` hook:

  ```tsx
  import { useCreateMany } from "@refinedev/core";

  const { mutate } = useCreateMany();

  mutate(
    {
      resource: "products",
      values: [
        {
          name: "Product 1",
          material: "Wood",
        },
        {
          name: "Product 2",
          material: "Metal",
        },
      ],
      mutationMode: "optimistic",
      successNotification: false,
    },
    {
      onSuccess: () => {
        /* do something after mutation success */
      },
    },
  );
  ```

  New usage of `useCreateMany` hook:

  ```tsx
  import { useCreateMany } from "@refinedev/core";

  const { mutate } = useCreateMany({
    resource: "products",
    successNotification: false,
    mutationMode: "optimistic",
    mutationOptions: {
      onSuccess: () => {
        /* do something after mutation success */
      },
    },
  });

  mutate({
    // also you can override the parameters given to the hook
    values: [
      {
        name: "Product 1",
        material: "Wood",
      },
      {
        name: "Product 2",
        material: "Metal",
      },
    ],
  });
  ```

  You can think of the parameters given to the `useCreateMany` hook as default values, while the parameters given to the `mutate` function are the values used for that specific mutation or dynamic values.

  > 🚨 If you pass these parameters to the `mutate` function, it will override the values given to the hook.

- [#6174](https://github.com/refinedev/refine/pull/6174) [`2b73e40b0e18932f008842790065cdd386e9d270`](https://github.com/refinedev/refine/commit/2b73e40b0e18932f008842790065cdd386e9d270) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useShow`](https://refine.dev/docs/data/hooks/use-show/)'s `queryResult` is deprecated, use `query` instead. #6173

  ```diff
  import { useShow } from '@refinedev/core';

  - const { queryResult } = useShow();
  + const { query } = useShow();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

- [#6164](https://github.com/refinedev/refine/pull/6164) [`8ed027eec66c41c444f168f4f52e6b51057bc498`](https://github.com/refinedev/refine/commit/8ed027eec66c41c444f168f4f52e6b51057bc498) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useForm`](https://refine.dev/docs/data/hooks/use-form/)'s `mutationResult` is deprecated, use `mutation` instead. #6163

  ```diff
  import { useForm } from '@refinedev/core';

  - const { mutationResult } = useForm();
  + const { mutation } = useForm();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

- [#6125](https://github.com/refinedev/refine/pull/6125) [`61aa3464df0d95c30839726f455ed43e6854730b`](https://github.com/refinedev/refine/commit/61aa3464df0d95c30839726f455ed43e6854730b) Thanks [@Dominic-Preap](https://github.com/Dominic-Preap)! - fix: update debounce behavior on `onSearch` in `useSelect`

  Now debounce behavior is working correctly on `onSearch` in `useSelect` when using inside `Controller` of react-hook-form.

  Resolves [#6096](https://github.com/refinedev/refine/issues/6096)

- [#6116](https://github.com/refinedev/refine/pull/6116) [`7e71f12b81954fd3a59678d7fcccd7b557879a94`](https://github.com/refinedev/refine/commit/7e71f12b81954fd3a59678d7fcccd7b557879a94) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [Mutation parameters](https://refine.dev/docs/data/hooks/use-update-many/#mutation-parameters) should be given as a prop to the `useUpdateMany` hook. #6115
  From now on, you can pass mutation parameters to the `useUpdateMany` hook as a prop.

  Old usage of `useUpdateMany` hook:

  ```tsx
  import { useUpdateMany } from "@refinedev/core";

  const { mutate } = useUpdateMany();

  mutate(
    {
      resource: "products",
      values: {
        name: "New Product",
        material: "Wood",
      },
      ids: [1, 2, 3],
      mutationMode: "optimistic",
      successNotification: false,
    },
    {
      onSuccess: () => {
        /* do something after mutation success */
      },
    },
  );
  ```

  New usage of `useUpdateMany` hook:

  ```tsx
  import { useUpdateMany } from "@refinedev/core";

  const { mutate } = useUpdateMany({
    resource: "products",
    successNotification: false,
    mutationMode: "optimistic",
    mutationOptions: {
      onSuccess: () => {
        /* do something after mutation success */
      },
    },
  });

  mutate({
    ids: [1, 2, 3],
    values: {
      name: "New Product",
      material: "Wood",
    },
    // also you can override the parameters given to the hook
  });
  ```

  You can think of the parameters given to the `useUpdateMany` hook as default values, while the parameters given to the `mutate` function are the values used for that specific mutation or dynamic values.

  > 🚨 If you pass these parameters to the `mutate` function, it will override the values given to the hook.

### Patch Changes

- [#6185](https://github.com/refinedev/refine/pull/6185) [`603c73eb7d376fc2357a577f5921f844a8f444e4`](https://github.com/refinedev/refine/commit/603c73eb7d376fc2357a577f5921f844a8f444e4) Thanks [@aliemir](https://github.com/aliemir)! - Bump `@refinedev/devtools-internal` dependency to reflect the latest changes in the Refine Devtools.

- [#6224](https://github.com/refinedev/refine/pull/6224) [`81703b62bafeb01a75290b99b3869ef96d04bd94`](https://github.com/refinedev/refine/commit/81703b62bafeb01a75290b99b3869ef96d04bd94) Thanks [@WananiAdib](https://github.com/WananiAdib)! - fix(core): fixed type issue in useSelect. #6223

  Previously, the types would not allow functions to be passed as props. After this change, it will be possible.

  [Resolves #6223](https://github.com/refinedev/refine/issues/6223)

- [#6184](https://github.com/refinedev/refine/pull/6184) [`1f7976bd32da311367945370efccd7d9c9b102a7`](https://github.com/refinedev/refine/commit/1f7976bd32da311367945370efccd7d9c9b102a7) Thanks [@Sarfraz-droid](https://github.com/Sarfraz-droid)! - AuthPage in Next.js generates code with i18n but the folder hooks is not created. imported useTranslate from @hooks to fix the issue

- [#6116](https://github.com/refinedev/refine/pull/6116) [`7e71f12b81954fd3a59678d7fcccd7b557879a94`](https://github.com/refinedev/refine/commit/7e71f12b81954fd3a59678d7fcccd7b557879a94) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `invalidates` prop of `useUpdateMany` doesn't work. #6209

  From now on, the `invalidates` prop of the `useUpdateMany` hook will work as expected.

  ```tsx
  const { mutate } = useUpdateMany({
    resource: "posts",
    invalidates: ["all"], // invalidates all queries of the "posts" resource
  });

  mutate({ ids: [1, 2, 3], values: { title: "new title" } });
  ```

- [#6154](https://github.com/refinedev/refine/pull/6154) [`fa2d7a4554da2d5fb2432a011941f9c157b59aba`](https://github.com/refinedev/refine/commit/fa2d7a4554da2d5fb2432a011941f9c157b59aba) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore(devtools): bump internal devtools dependency

  Bump `@refinedev/devtools-internal` version.

- Updated dependencies [[`ccddff6eba23286d4025a7301de3ebfc24b1b633`](https://github.com/refinedev/refine/commit/ccddff6eba23286d4025a7301de3ebfc24b1b633), [`603c73eb7d376fc2357a577f5921f844a8f444e4`](https://github.com/refinedev/refine/commit/603c73eb7d376fc2357a577f5921f844a8f444e4)]:
  - @refinedev/devtools-internal@1.1.14

## 4.53.0

### Minor Changes

- [#6071](https://github.com/refinedev/refine/pull/6071) [`853bef97ed7baf59e74c98fc54c0ed11624fb491`](https://github.com/refinedev/refine/commit/853bef97ed7baf59e74c98fc54c0ed11624fb491) Thanks [@Dominic-Preap](https://github.com/Dominic-Preap)! - feat: add `selectedOptionsOrder` in `useSelect`

  Now with `selectedOptionsOrder`, you can sort `selectedOptions` at the top of list when use `useSelect` with `defaultValue`.

  Resolves [#6061](https://github.com/refinedev/refine/issues/6061)

### Patch Changes

- [#5989](https://github.com/refinedev/refine/pull/5989) [`b86648f42cd849a506e4c32d740de26b72681f72`](https://github.com/refinedev/refine/commit/b86648f42cd849a506e4c32d740de26b72681f72) Thanks [@lnikitadobrenkol](https://github.com/lnikitadobrenkol)! - chore(core): add missing types of data hooks

  Added missing props and return types of data hooks.

- [#6070](https://github.com/refinedev/refine/pull/6070) [`4265ae2509f79af9dbca8d52daf5c2f1b4a50a51`](https://github.com/refinedev/refine/commit/4265ae2509f79af9dbca8d52daf5c2f1b4a50a51) Thanks [@FatimaSaleem21](https://github.com/FatimaSaleem21)! - fix(core): add unexported types in `index.tsx`

  The `refinedev/core` package has many unexported types that are not accessible for use outside the package. This change aims to address this limitation by exporting those missing types.

  Resolves [#6041](https://github.com/refinedev/refine/issues/6041)

- [#6064](https://github.com/refinedev/refine/pull/6064) [`b516c18b828ba8823561d0fefc4afe02b45ce332`](https://github.com/refinedev/refine/commit/b516c18b828ba8823561d0fefc4afe02b45ce332) Thanks [@aliemir](https://github.com/aliemir)! - fix(auto-save-indicator): replace reserved `key` prop with `translationKey` in <Message /> components

  `<AutoSaveIndicator />` components from UI libraries have been using a `<Message />` component internally that uses a `key` prop. Since `key` is a reserved prop in React, it was causing a warning in the console. This change replaces the `key` prop with `translationKey` to avoid the warning.

  Resolves [#6067](https://github.com/refinedev/refine/issues/6067)

- Updated dependencies []:
  - @refinedev/devtools-internal@1.1.13

## 4.51.0

### Minor Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - Added ina and nina CrudOperators. Added filtering by these operators to Supabase data provider
  #5902

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat(core): ability to pass global app title and icon

  Added ability to pass global app name and icon values through `<Refine />` component's `options` prop.

  Now `<Refine />` component accepts `options.title` prop that can be used to set app icon and app name globally. By default these values will be accessible through `useRefineOptions` hook and will be used in `<ThemedLayoutV2 />` and `<AuthPage />` components of the UI packages.

  ```tsx
  import { Refine } from "@refinedev/core";

  const MyIcon = () => <svg>{/* ... */}</svg>;

  const App = () => {
    return (
      <Refine
        options={{
          title: {
            icon: <MyIcon />,
            text: "Refine App",
          },
        }}
      >
        {/* ... */}
      </Refine>
    );
  };
  ```

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix(core): update default titles

  Previously, default titles included lowercase "refine", which was not correct. This commit updates the default titles to include "Refine" instead.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - refactor: omit `to` parameter if at root when unauthenticated

  If user is not authenticated, `<Authenticated />` redirects to the provided route and appends the current route to the `to` parameter. With this change, if the current route is the root (`/`), the `to` parameter will be omitted.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: `<GitHubBanner />` has `paddingLeft: 200px` by default to make space for the sidebar. This is not needed when the sidebar is not present.

  From on, `<GitHubBanner />` style property can be overridden by passing `containerStyle` prop.

  ```jsx
  <GitHubBanner containerStyle={{ paddingLeft: 0 }} />
  ```

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046)]:
  - @refinedev/devtools-internal@1.1.11

## 4.50.0

### Minor Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`a39f1952554120893ea83db904037917fc293dc6`](https://github.com/refinedev/refine/commit/a39f1952554120893ea83db904037917fc293dc6) Thanks [@aliemir](https://github.com/aliemir)! - Added ina and nina CrudOperators. Added filtering by these operators to Supabase data provider
  #5902

- [#5945](https://github.com/refinedev/refine/pull/5945) [`903ea231538b00ce02ddc9394c72848ec1e90772`](https://github.com/refinedev/refine/commit/903ea231538b00ce02ddc9394c72848ec1e90772) Thanks [@aliemir](https://github.com/aliemir)! - feat(core): ability to pass global app title and icon

  Added ability to pass global app name and icon values through `<Refine />` component's `options` prop.

  Now `<Refine />` component accepts `options.title` prop that can be used to set app icon and app name globally. By default these values will be accessible through `useRefineOptions` hook and will be used in `<ThemedLayoutV2 />` and `<AuthPage />` components of the UI packages.

  ```tsx
  import { Refine } from "@refinedev/core";

  const MyIcon = () => <svg>{/* ... */}</svg>;

  const App = () => {
    return (
      <Refine
        options={{
          title: {
            icon: <MyIcon />,
            text: "Refine App",
          },
        }}
      >
        {/* ... */}
      </Refine>
    );
  };
  ```

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`208f77177f9821ee1860ffe031e6b2a9645d1bb6`](https://github.com/refinedev/refine/commit/208f77177f9821ee1860ffe031e6b2a9645d1bb6) Thanks [@aliemir](https://github.com/aliemir)! - fix(core): update default titles

  Previously, default titles included lowercase "refine", which was not correct. This commit updates the default titles to include "Refine" instead.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`84cac61b84ab872394424ebf358eeb380f40121d`](https://github.com/refinedev/refine/commit/84cac61b84ab872394424ebf358eeb380f40121d) Thanks [@aliemir](https://github.com/aliemir)! - refactor: omit `to` parameter if at root when unauthenticated

  If user is not authenticated, `<Authenticated />` redirects to the provided route and appends the current route to the `to` parameter. With this change, if the current route is the root (`/`), the `to` parameter will be omitted.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`4cc74478cbec8caa3023a50ce62f1d5b2f7158a5`](https://github.com/refinedev/refine/commit/4cc74478cbec8caa3023a50ce62f1d5b2f7158a5) Thanks [@aliemir](https://github.com/aliemir)! - feat: `<GitHubBanner />` has `paddingLeft: 200px` by default to make space for the sidebar. This is not needed when the sidebar is not present.

  From on, `<GitHubBanner />` style property can be overridden by passing `containerStyle` prop.

  ```jsx
  <GitHubBanner containerStyle={{ paddingLeft: 0 }} />
  ```

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`a1e36e6e909a91bc6218478f136b49a8e82a7e32`](https://github.com/refinedev/refine/commit/a1e36e6e909a91bc6218478f136b49a8e82a7e32), [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d)]:
  - @refinedev/devtools-internal@1.1.10

## 4.49.2

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

- Updated dependencies [[`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d)]:
  - @refinedev/devtools-internal@1.1.9

## 4.49.1

### Patch Changes

- [#5875](https://github.com/refinedev/refine/pull/5875) [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf) Thanks [@aliemir](https://github.com/aliemir)! - refactor: add resource name to devtools xray calls

  Added the resource name to the devtools xray calls to allow resource names to be displayed in the devtools even with custom query keys.

- [#5883](https://github.com/refinedev/refine/pull/5883) [`0a76576da0f`](https://github.com/refinedev/refine/commit/0a76576da0f18c6db372e737c610ad462b56ff21) Thanks [@aliemir](https://github.com/aliemir)! - fix: development errors being logged when `useOnError` is called without an auth provider

  When there's no `authProvider` set, the `useOnError` hook will log `"no mutationFn found"` to the console in development because of missing `onError` property. This PR fixes the issue by providing a dummy `onError` function when `authProvider` is not set.

- [#5851](https://github.com/refinedev/refine/pull/5851) [`8d2dd4376f6`](https://github.com/refinedev/refine/commit/8d2dd4376f672786d4722d3dee09e6344f1002e4) Thanks [@aliemir](https://github.com/aliemir)! - refactor: prevented early accessing `signal` from `useQuery` of `@tanstack/react-query`

  In query hooks, `signal` was accessed directly by destructuring which was causing issues in development mode with duplicated requests. This change accesses `queryContext` instead of destructured `signal` properly to prevent `@tanstack/react-query` from setting `abortSignalConsumed` flag unexpectedly.

  Resolves [#5843](https://github.com/refinedev/refine/issues/5843)

- [#5875](https://github.com/refinedev/refine/pull/5875) [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf) Thanks [@aliemir](https://github.com/aliemir)! - fix: exclude internal button hook calls from devtools trace

  Removed internal button hook calls from devtools trace to avoid crowding the trace with unnecessary information.

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- [#5884](https://github.com/refinedev/refine/pull/5884) [`9a0c1c8414a`](https://github.com/refinedev/refine/commit/9a0c1c8414a7b228378c234468396e6288cdb6f0) Thanks [@aliemir](https://github.com/aliemir)! - fix(core): `useMenu` `hideOnMissingParameter` prop default value set to `true`

  There was an error in the `useMenu` hook's `hideOnMissingParameter` prop. Its default value should be `true` but it was missed when props are passed partially. This PR fixes the issue by setting the default value to `true`.

- Updated dependencies [[`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f)]:
  - @refinedev/devtools-internal@1.1.8

## 4.49.0

### Minor Changes

- [#5751](https://github.com/refinedev/refine/pull/5751) [`f32512b9042`](https://github.com/refinedev/refine/commit/f32512b90427cbb97b28e9d5445dcd343067aa7e) Thanks [@aliemir](https://github.com/aliemir)! - Added `useResourceParams` hook. This hook initially works similarly to `useResource` but it correctly handles the `id` and `action` params per active route and explicit parameters. In `@refinedev/core` and other Refine packages there was a common logic of handling the `id` since its inference is dependent on the active resource and route. The same also applies to the `action` parameter of forms. This hook handles these cases and provides a more consistent API to share the same logic without duplicating it.

  - `id` and `action` values returned from `useResource` is deprecated in favor of `useResourceParams`.
  - `useForm` hook is updated to use `useResourceParams` under the hood.
  - `useShow` hook is updated to use `useResourceParams` under the hood.
  - `<CanAccess />` component is updated to use `useResourceParams` under the hood.

### Patch Changes

- [#5737](https://github.com/refinedev/refine/pull/5737) [`4e8188a6652`](https://github.com/refinedev/refine/commit/4e8188a665209b0d0b77aef27c795a29b9513226) Thanks [@aliemir](https://github.com/aliemir)! - chore: updated content of `README.md` to include installation, usage and scaffolding instructions.

- [#5808](https://github.com/refinedev/refine/pull/5808) [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39) Thanks [@aliemir](https://github.com/aliemir)! - chore: improved `useMutationMode` hooks usage by accepting explicit values to be passed for `mutationMode` and `undoableTimeout`, handling the precedence of the values inside the hook rather than outside to avoid repetition

- [#5733](https://github.com/refinedev/refine/pull/5733) [`2b5ac6f5409`](https://github.com/refinedev/refine/commit/2b5ac6f5409b7b175c453793224a531e644f6513) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `useTranslation` hook. It combines `useTranslate`, `useSetLocale` and `useGetLocale` hooks and returns `translate`, `changeLocale` and `getLocale` methods from that hooks for better developer experience.

  It returns all [`i18nProvider`](/docs/i18n/i18n-provider) methods in one hook. It can be used to translate texts, change the locale, and get the current locale in your own components.

  ```tsx
  import { useTranslation } from "@refinedev/core";

  export const MyComponent = () => {
    const { translate, getLocale, changeLocale } = useTranslation();
    const currentLocale = getLocale();

    return (
      <div>
        <h1>{translate("languages")}</h1>
        <button
          onClick={() => changeLocale("en")}
          disabled={currentLocale === "en"}
        >
          English
        </button>
        <button
          onClick={() => changeLocale("de")}
          disabled={currentLocale === "de"}
        >
          German
        </button>
      </div>
    );
  };
  ```

  Example of combining `useTranslation` with `useTranslate`, `useSetLocale` and `useGetLocale` hooks.

  ```diff
  import {
  -  useGetLocale,
  -  useSetLocale,
  -  useTranslate,
  +  useTranslation,
  } from "@refinedev/core";

  export const MyComponent = () => {
  -  const changeLocale = useSetLocale();
  -  const getLocale = useGetLocale();
  -  const translate = useTranslate();

  +  const { translate, getLocale, changeLocale } = useTranslation();

    return <div>{/* ... */}</div>;
  };
  ```

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `lodash-es` imports for ESM builds to access the exports properly.

- [#5755](https://github.com/refinedev/refine/pull/5755) [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: refactor TS typings.

  Type definitions in `src/interfaces` folder moved to their main consumer's folder under `types.ts` files.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - Update `papaparse` imports to fix ESM exports to work properly

- [#5808](https://github.com/refinedev/refine/pull/5808) [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39) Thanks [@aliemir](https://github.com/aliemir)! - feat: added headless button hooks

  We've added a new set of hooks to make it easier to create and manage UI buttons of Refine. There's a hook for each type of button which previously had duplicated logic across the codebase between UI integrations of Refine. Now all these buttons will be powered by the same hooks maintained in the `@refinedev/core` package to ensure consistency and reduce duplication.

  New Hooks:

  - `useListButton`: A navigation button that navigates to the list page of a resource.
  - `useCreateButton`: A navigation button that navigates to the create page of a resource.
  - `useShowButton`: A navigation button that navigates to the show page of a record.
  - `useEditButton`: A navigation button that navigates to the edit page of a record.
  - `useCloneButton`: A navigation button that navigates to the clone page of a record.
  - `useRefreshButton`: A button that triggers an invalidation of the cache of a record.
  - `useDeleteButton`: A button that triggers a delete mutation on a record.
  - `useSaveButton`: A button to be used inside a form to trigger a save mutation.
  - `useExportButton`: A button to be used with `useExport` to trigger an export bulk data of a resource.
  - `useImportButton`: A button to be used with `useImport` to trigger an import bulk data for a resource.

- [#5714](https://github.com/refinedev/refine/pull/5714) [`38f129f40ee`](https://github.com/refinedev/refine/commit/38f129f40eea109c9b89b23a8fd3f217964330c7) Thanks [@aliemir](https://github.com/aliemir)! - Refactored the internal logic of `useForm` to be more efficient and readable, along with few bug fixes and improvements to the `useForm` hook.

  These changes are related to the issue [#5702](https://github.com/refinedev/refine/issues/5702) and resolves [#5460](https://github.com/refinedev/refine/issues/5460).

  - `onFinish` now rejects when; - `values` is not provided, - `resource` is not defined, - `id` is required but not provided.
    previously these cases were silently ignored.
  - Same changes also applies to `onFinishAutoSave`.
  - `onFinishAutoSave` had an issue with returning the appropriate promise after being called. This resulted in unhandled promise rejections and uncontrollable resolved promises. Now it is fixed, `onFinishAutoSave` will resolve and reject based on the response of the mutation.
  - When using auto save, debounced calls will now be cancelled and the respective promises will be rejected with `"cancelled by debounce"` message. These changes might require an update to the code bases that uses `onFinishAutoSave` to handle the rejection of the promise to avoid unhandled promise rejections.
  - Combined the separated submit functions into one for sake of simplicity and consistency. (internal)
  - `onFinish` rejects and resolved regardless of the `onMutationSuccess` and `onMutationError` hooks are provided or not. (Resolves [#5460](https://github.com/refinedev/refine/issues/5460))
  - `meta` values were concatenated multiple times causing confusion and unexpected behavior, now it is fixed. (internal)
  - Moved the `id` determination/inference logic to a separate hook. (internal)
  -

- Updated dependencies [[`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927)]:
  - @refinedev/devtools-internal@1.1.7

## 4.48.0

### Minor Changes

- [#5609](https://github.com/refinedev/refine/pull/5609) [`fd38d9c71a6`](https://github.com/refinedev/refine/commit/fd38d9c71a6e03d87c5ac97f0dcd52c076bc9599) Thanks [@Cavdy](https://github.com/Cavdy)! - feat: ability to pass an argument to usePermissions #5607

  Ability to pass an argument or parameters to usePermissions hook

  ```tsx
  const params = { tenantId: "id" };
  usePermissions({ params });
  ```

  Resolves #5607

- [#5610](https://github.com/refinedev/refine/pull/5610) [`17c39ee2ee0`](https://github.com/refinedev/refine/commit/17c39ee2ee0146e532085761e1e9fcdc60ecb81e) Thanks [@Conqxeror](https://github.com/Conqxeror)! - feat: allow passing function to `optionLabel` and `optionValue` props for `useSelect` hook.

  ```tsx
  const { options } = useSelect({
    optionLabel: (item) => `${item.firstName} ${item.lastName}`,
    optionValue: (item) => item.id,
  });
  ```

  feat: add `searchField` prop to `useSelect` hook.

  Can be used to specify which field will be searched with value given to `onSearch` function.

  ```tsx
  const { onSearch } = useSelect({ searchField: "name" });

  onSearch("John"); // Searchs by `name` field with value John.
  ```

  By default, it uses `optionLabel`'s value, if `optionLabel` is a string. Uses `title` field otherwise.

  ```tsx
  // When `optionLabel` is string.
  const { onSearch } = useSelect({ optionLabel: "name" });

  onSearch("John"); // Searchs by `name` field with value John.

  // When `optionLabel` is function.
  const { onSearch } = useSelect({
    optionLabel: (item) => `${item.id} - ${item.name}`,
  });

  onSearch("John"); // Searchs by `title` field with value John.
  ```

  Resolves #4880

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

- Updated dependencies [[`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f)]:
  - @refinedev/devtools-internal@1.1.6

## 4.47.2

### Patch Changes

- [#5619](https://github.com/refinedev/refine/pull/5619) [`e8a3620233a`](https://github.com/refinedev/refine/commit/e8a3620233ac66b63c28e7adc1ebe65503204932) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update `<WelcomePage />` links.

## 4.47.1

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

- Updated dependencies [[`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563)]:
  - @refinedev/devtools-internal@1.1.5

## 4.47.0

### Minor Changes

- [#5538](https://github.com/refinedev/refine/pull/5538) [`b91de14ac8`](https://github.com/refinedev/refine/commit/b91de14ac86cfd325977d9bf82f41bd171981129) Thanks [@Conqxeror](https://github.com/Conqxeror)! - feat: ability to configure useCan's queryOptions globally and through CanAccess component. #5472

- [#5522](https://github.com/refinedev/refine/pull/5522) [`71148278cb`](https://github.com/refinedev/refine/commit/71148278cbec29650d30208522b7045d4220ded9) Thanks [@Conqxeror](https://github.com/Conqxeror)! - feat(core): add success notification support for auth provider methods #5473

  Updated the core and added successNotification field to AuthActionResponse and Updated relevant hooks to show success notification when successNotification object is provided and added specs.

### Patch Changes

- [#5525](https://github.com/refinedev/refine/pull/5525) [`e2355e4179`](https://github.com/refinedev/refine/commit/e2355e4179bd09e31cb0aeafbd474ffb2189182e) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<WelcomePage />` component to use `RefineContext` to determine if the context is defined or not. It will show an error dialog if the context is not defined. If the error is showing, it means that `<Refine />` component is not mounted or `<WelcomePage />` component is used outside of `<Refine />` component.

- [#5332](https://github.com/refinedev/refine/pull/5332) [`5e65f71ecd`](https://github.com/refinedev/refine/commit/5e65f71ecdc8cb93a8739a5a23fc905c6fb38c8b) Thanks [@vikavorkin](https://github.com/vikavorkin)! - fix: replace export-to-csv-fix-source-map with papaparse #5317

  Replace usage of `export-to-csv-fix-source-map` to `papaparse`, fixing issues with `useExport` hook.

- [#5526](https://github.com/refinedev/refine/pull/5526) [`b094b50c51`](https://github.com/refinedev/refine/commit/b094b50c519191112564a1080f5c2c8a9ae57130) Thanks [@aliemir](https://github.com/aliemir)! - Marked `dataProvider` prop of `<Refine />` component as optional. This will allow users to setup Refine gradually without having to provide a data provider.

- [#5503](https://github.com/refinedev/refine/pull/5503) [`4b4d34208c`](https://github.com/refinedev/refine/commit/4b4d34208c44297c60c651e293765b4ab3b6d30a) Thanks [@BatuhanW](https://github.com/BatuhanW)! - refactor(core): re-export AuthBindings type as AuthProvider for consistency.

## 4.46.2

### Patch Changes

- [#5423](https://github.com/refinedev/refine/pull/5423) [`75bb61dd3b`](https://github.com/refinedev/refine/commit/75bb61dd3b781e69f198f4e928ccffddb997fdc5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `flattenObjectKeys` method to support both nested and non-nested variables when propagating server side errors to form fields. Resolves [#5461](https://github.com/refinedev/refine/issues/5461)

- [#5401](https://github.com/refinedev/refine/pull/5401) [`93e00fd770`](https://github.com/refinedev/refine/commit/93e00fd7701bce9e7201d04a6dd8f1419baeb68d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `queryKey` is not overrideable. To fix this, `useQuery` overloads refactored with single argument objects.

  ```diff
  - useQuery(queryKey, queryFn, options);
  + useQuery({ queryKey, queryFn, ...options });
  ```

  From now on, you can pass `queryKey` as an object property.

  ```tsx
  // all data hooks can be used with this syntax.
  useList({
    queryOptions: {
      queryKey: ["my-query-key"],
    },
  });
  ```

- [#5406](https://github.com/refinedev/refine/pull/5406) [`e5888b6b9c`](https://github.com/refinedev/refine/commit/e5888b6b9c9cc41546152f5b4d9adaf4405aa51c) Thanks [@aliemir](https://github.com/aliemir)! - `useMenu` hook was using outdated `meta` and router `params` due to missing dependency of the callback function. This was causing dynamic menu items to use wrong paths as links. (Resolves [#5432](https://github.com/refinedev/refine/issues/5432))

- [#5452](https://github.com/refinedev/refine/pull/5452) [`b621223bfb`](https://github.com/refinedev/refine/commit/b621223bfbc2bed569e41766f60b9687ddba9013) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass `meta` properties when using `useGo`'s `go` function with `to` as a resource object. This allows you to pass additional path parameters to the path defined in the resources array within the `<Refine />` component. Resolves [#5451](https://github.com/refinedev/refine/issues/5451)

  Assume we have the following resource defined in the `<Refine />` component:

  ```tsx
  {
      name: "posts",
      list: "/posts",
      edit: "/:foo/posts/:id/edit",
  }
  ```

  ```tsx
  import { useGo } from "@refinedev/core";

  const MyButton = () => {
    const go = useGo();

    return (
      <Button
        onClick={() => {
          go({
            to: {
              resource: "posts",
              action: "edit",
              id: "1",
              meta: {
                foo: "bar",
              },
            },
            type: "push",
          });
          // generated path will be "/bar/posts/1/edit"
        }}
      >
        Go Posts
      </Button>
    );
  };
  ```

- [#5381](https://github.com/refinedev/refine/pull/5381) [`19ceffbe9f`](https://github.com/refinedev/refine/commit/19ceffbe9f217fd354207b96610c25e8a7f3dcf3) Thanks [@aberhamm](https://github.com/aberhamm)! - fix: Missing `loginLink` attribute in `AuthPageProps` for `<AuthPage type="register" />`. #5381

## 4.46.1

### Patch Changes

- [#5409](https://github.com/refinedev/refine/pull/5409) [`0026fe34d0`](https://github.com/refinedev/refine/commit/0026fe34d0e46209f42e40834c6942ade22f242f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: exclude `gqlMutation` and `gqlQuery` from building query keys for `useUpdate`, `useUpdateMany`, `useDelete`, and `useDeleteMany` hooks.

- [#5409](https://github.com/refinedev/refine/pull/5409) [`0026fe34d0`](https://github.com/refinedev/refine/commit/0026fe34d0e46209f42e40834c6942ade22f242f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: add optional `gqlQuery` and `gqlMutation` fields to `MetaQuery` type to be used in `data hooks`.

  We plan to utilize these fields on our GraphQL data providers in the future.

  You can build your queries/mutations with `graphql-tag` package and pass it to the `gqlQuery`/`gqlMutation` fields.

  For now, only `@refinedev/nestjs-query` package supports it.

  ```tsx
  import { useList } from "@refinedev/core";
  import gql from "graphql-tag";

  const PRODUCTS_QUERY = gql`
    query ProductsList(
      $paging: OffsetPaging!
      $filter: BlogPostFilter
      $sorting: [BlogPostSort!]!
    ) {
      products(paging: $paging, filter: $filter, sorting: $sorting) {
        nodes {
          id
          name
        }
        totalCount
      }
    }
  `;

  const { data } = useList({
    resource: "products",
    meta: { gqlQuery: PRODUCTS_QUERY },
  });
  ```

## 4.46.0

### Minor Changes

- [#5343](https://github.com/refinedev/refine/pull/5343) [`dd8f1270f6`](https://github.com/refinedev/refine/commit/dd8f1270f692d1eec279973e53fcc5a7e650b983) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `hideForm` should remove all form fields. (submit button, form fields, rememberMe checkbox, forgot password link, etc.) but the `/register` link should be visible.

- [#5307](https://github.com/refinedev/refine/pull/5307) [`f8e407f850`](https://github.com/refinedev/refine/commit/f8e407f85054bccf1e6ff45c84928bc01db7f5eb) Thanks [@jackprogramsjp](https://github.com/jackprogramsjp)! - feat: added `hideForm` props for `LoginPage` and `RegisterPage` for `AuthPage` feature.

  Now with the `hideForm` props feature, you can be able to hide the forms (like email/password)
  to only show the OAuth providers. This avoids having to make your own entire AuthPage.

### Patch Changes

- [#5323](https://github.com/refinedev/refine/pull/5323) [`17aa8c1cd6`](https://github.com/refinedev/refine/commit/17aa8c1cd6858c5a2b0c996c97230047e049bf3b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - ### Breaking changes

  fix: added required `key` prop to `<Authenticated />` component to resolve issues of rendering of the unwanted content and wrongful redirections. #4782

  #### Why is it required?

  Due to the [nature of React](https://react.dev/learn/rendering-lists#why-does-react-need-keys), components are not unmounted and remounted again if props are changed. While this is mostly a good practice for performance, in some cases you'll want your component to re-mount instead of updating; for example, if you don't want to use any of the previous states and effects initiated with the old props.

  The `<Authenticated />` component has this kind of scenario when it's used for page-level authentication checks. If the previous check results were used for the rendering of the content (`fallback` or `children`) this may lead to unexpected behaviors and flashing of the unwanted content.

  To avoid this, a key property must be set with different values for each use of the `<Authenticated />` components. This will make sure that React will unmount and remount the component instead of updating the props.

  ```tsx
  import { Refine, Authenticated, AuthPage } from "@refinedev/core";
  import {
    CatchAllNavigate,
  } from "@refinedev/react-router";
  import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

  const App = () => {
    return (
      <BrowserRouter>
        <Refine {/* ... */}>
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <Outlet />
                </Authenticated>
              }
            >
              <Route index element={<h1>Dashboard Page</h1>} />
            </Route>

            <Route
              element={
                <Authenticated key="unauthenticated-routes" fallback={<Outlet />}>
                   <Navigate to="/" replace />
                </Authenticated>
              }
            >
              <Route path="/login" element={<AuthPage type="login" />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    );
  };
  ```

  In the example above, the `<Authenticated />` is rendered as the wrapper of both the `index` route and `/login` route. Without a `key` property, `<Authenticated />` will not be re-mounted and can result in rendering the content depending on the previous authentication check. This will lead to redirecting to `/login` when trying to access the `index` route instead of rendering the content of the `index` or navigating to `index` route instead of `/login` if the user just logged out.

- [#5339](https://github.com/refinedev/refine/pull/5339) [`4c49ef0a06`](https://github.com/refinedev/refine/commit/4c49ef0a0660c2941c983025a187d45b521aa27c) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `<WelcomePage />` component redesigned.

- [#5316](https://github.com/refinedev/refine/pull/5316) [`3bdb9cb1cb`](https://github.com/refinedev/refine/commit/3bdb9cb1cb4cdcfaf363e7e9938737ed6f8e634e) Thanks [@ksankeerth](https://github.com/ksankeerth)! - fix: Return type is not mentioned correctly in useOne, useSelect, useForm, useMany and useShow hooks

  This fix has improved type safety of return type of useOne, useSelect, useForm, useMany and useShow hooks.

## 4.45.1

### Patch Changes

- [#5289](https://github.com/refinedev/refine/pull/5289) [`0d1e269c0283`](https://github.com/refinedev/refine/commit/0d1e269c02837bea4c1df3f4a56dfad52974bd7a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `<GitHubBanner />` styles updated.

  fix: `<GitHubBanner />` hydration error. #5295

## 4.45.0

### Minor Changes

- [#5259](https://github.com/refinedev/refine/pull/5259) [`eac3df87ffb`](https://github.com/refinedev/refine/commit/eac3df87ffbf61c913a6c8ea584e1d8c61e8d82e) Thanks [@aliemir](https://github.com/aliemir)! - Added `<AutoSaveIndicator />` component and updated the `AutoSaveIndicatorProps` type to allow `elements` to be passed in.

  `elements` prop is an object with `success`, `error`, `loading` and `idle` keys. Each key is a React element that will be rendered when the corresponding state is active.

  By default every state will render a `span` with the translated text of the `autoSave.${state}` key.

### Patch Changes

- [#5257](https://github.com/refinedev/refine/pull/5257) [`c35fdda7c61`](https://github.com/refinedev/refine/commit/c35fdda7c6176d885bdd9302b1cbf4651b4a3327) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: update GitHub support banner text

## 4.44.12

### Patch Changes

- [#5208](https://github.com/refinedev/refine/pull/5208) [`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update commit frequency branch from next to master in README.

## 4.44.11

### Patch Changes

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Exported `BaseOption` type as successor of the deprecated `Option` type. `BaseOption` is `{ label: any; value: any; }`.

  Usage of the deprecated `Option` type was correctly assuming that the `value` property of the option is of type `string`. This assumption was wrong and now the types are changed to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook.

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Reverted the faulty assumption on option values of `useSelect` hook to be of type `string`. Now changed the types and the logic to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook. (Reverted PR #5160)

  By default `TOption` will be equal to `BaseOption` type which is `{ label: any; value: any; }`. If you want to change the type of options, you can do it like this:

  ```tsx
  import { HttpError, useSelect } from "@refinedev/core";

  type MyData = {
    id: number;
    title: string;
    description: string;
    category: { id: string };
  };

  type Option = { label: MyData["title"]; value: MyData["id"] }; // equals to { label: string; value: number; }

  useSelect<MyData, HttpError, MyData, Option>({
    resource: "posts",
  });
  ```

- [#5194](https://github.com/refinedev/refine/pull/5194) [`9df999ca643`](https://github.com/refinedev/refine/commit/9df999ca6431fb0465c294207309fe32e58eb85f) Thanks [@fitrahfm](https://github.com/fitrahfm)! - fix: use relative path instead of path alias to import FlatTreeItem

  Using path alias causes imported types being any during build/compilation process which should be TreeMenuItem[]

- [#5201](https://github.com/refinedev/refine/pull/5201) [`760cfbaaa2a`](https://github.com/refinedev/refine/commit/760cfbaaa2ac8b8c070ade1e174784358cc112b0) Thanks [@aliemir](https://github.com/aliemir)! - Exported the `flattenObjectKeys` and `propertyPathToArray` helpers from `@refinedev/core` package.

## 4.44.10

### Patch Changes

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Exported `BaseOption` type as successor of the deprecated `Option` type. `BaseOption` is `{ label: any; value: any; }`.

  Usage of the deprecated `Option` type was correctly assuming that the `value` property of the option is of type `string`. This assumption was wrong and now the types are changed to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook.

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Reverted the faulty assumption on option values of `useSelect` hook to be of type `string`. Now changed the types and the logic to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook. (Reverted PR #5160)

  By default `TOption` will be equal to `BaseOption` type which is `{ label: any; value: any; }`. If you want to change the type of options, you can do it like this:

  ```tsx
  import { HttpError, useSelect } from "@refinedev/core";

  type MyData = {
    id: number;
    title: string;
    description: string;
    category: { id: string };
  };

  type Option = { label: MyData["title"]; value: MyData["id"] }; // equals to { label: string; value: number; }

  useSelect<MyData, HttpError, MyData, Option>({
    resource: "posts",
  });
  ```

- [#5194](https://github.com/refinedev/refine/pull/5194) [`9df999ca643`](https://github.com/refinedev/refine/commit/9df999ca6431fb0465c294207309fe32e58eb85f) Thanks [@fitrahfm](https://github.com/fitrahfm)! - fix: use relative path instead of path alias to import FlatTreeItem

  Using path alias causes imported types being any during build/compilation process which should be TreeMenuItem[]

- [#5201](https://github.com/refinedev/refine/pull/5201) [`760cfbaaa2a`](https://github.com/refinedev/refine/commit/760cfbaaa2ac8b8c070ade1e174784358cc112b0) Thanks [@aliemir](https://github.com/aliemir)! - Exported the `flattenObjectKeys` and `propertyPathToArray` helpers from `@refinedev/core` package.

## 4.44.9

### Patch Changes

- [#5177](https://github.com/refinedev/refine/pull/5177) [`4e0f6f9a69f`](https://github.com/refinedev/refine/commit/4e0f6f9a69f7613ef9b1b249ae21d2f0dba38f57) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue of `useList` hook requiring an empty object as prop even if there was no parameter passed to it.

- [#5132](https://github.com/refinedev/refine/pull/5132) [`f616d6ffd94`](https://github.com/refinedev/refine/commit/f616d6ffd94e0c38eea56f5850898892551231f6) Thanks [@mlukasik-dev](https://github.com/mlukasik-dev)! - fix: `useSelect`'s `optionLabel` and `optionValue` types are wrong.

- [#5160](https://github.com/refinedev/refine/pull/5160) [`9b9d5032b3a`](https://github.com/refinedev/refine/commit/9b9d5032b3ab1598eabc8e78ab2c70839929b775) Thanks [@an-tran511](https://github.com/an-tran511)! - fix: convert type of an option's `value` to `string`

## 4.44.8

### Patch Changes

- [#5177](https://github.com/refinedev/refine/pull/5177) [`4e0f6f9a69f`](https://github.com/refinedev/refine/commit/4e0f6f9a69f7613ef9b1b249ae21d2f0dba38f57) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue of `useList` hook requiring an empty object as prop even if there was no parameter passed to it.

- [#5132](https://github.com/refinedev/refine/pull/5132) [`f616d6ffd94`](https://github.com/refinedev/refine/commit/f616d6ffd94e0c38eea56f5850898892551231f6) Thanks [@mlukasik-dev](https://github.com/mlukasik-dev)! - fix: `useSelect`'s `optionLabel` and `optionValue` types are wrong.

- [#5160](https://github.com/refinedev/refine/pull/5160) [`9b9d5032b3a`](https://github.com/refinedev/refine/commit/9b9d5032b3ab1598eabc8e78ab2c70839929b775) Thanks [@an-tran511](https://github.com/an-tran511)! - fix: convert type of an option's `value` to `string`

## 4.44.7

### Patch Changes

- [#5138](https://github.com/refinedev/refine/pull/5138) [`0e22d5804b2`](https://github.com/refinedev/refine/commit/0e22d5804b260949c378bea98312c1c13f446642) Thanks [@aliemir](https://github.com/aliemir)! - Prevent `authProvider.getIdentity` to be called in `useLog` if `auditLogProvider` is not defined.

## 4.44.6

### Patch Changes

- [#5138](https://github.com/refinedev/refine/pull/5138) [`0e22d5804b2`](https://github.com/refinedev/refine/commit/0e22d5804b260949c378bea98312c1c13f446642) Thanks [@aliemir](https://github.com/aliemir)! - Prevent `authProvider.getIdentity` to be called in `useLog` if `auditLogProvider` is not defined.

## 4.44.5

### Patch Changes

- [#5087](https://github.com/refinedev/refine/pull/5087) [`88d52d639b9`](https://github.com/refinedev/refine/commit/88d52d639b9e4590d70847812c47d3fb40fc6ebe) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `meta` props added `liveProvider.subscribe` and `liveProvider.publish` methods.
  From now on, you can use `meta` to distinguish between methods by `meta`.

  `meta` type:

  ```ts
  import { QueryFunctionContext } from "@tanstack/react-query";

  type Fields = Array<string | object | NestedField>;

  type VariableOptions =
    | {
        type?: string;
        name?: string;
        value: any;
        list?: boolean;
        required?: boolean;
      }
    | { [k: string]: any };

  type Meta = {
    dataProviderName?: string;
    operation?: string;
    fields?: Fields;
    variables?: VariableOptions;
    queryContext?: QueryFunctionContext;
    [k: string]: any;
  };
  ```

  #### Usage

  ```ts
  import { LiveProvider, LiveEvent } from "@refinedev/core";

  export const liveProvider = (client: any): LiveProvider => {
    return {
      subscribe: ({ channel, types, params, callback, meta }) => {
        console.log({ meta });
      },

      publish: ({ channel, type, payload, date, meta }: LiveEvent) => {
        console.log({ meta });
      },
    };
  };
  ```

## 4.44.4

### Patch Changes

- [#5087](https://github.com/refinedev/refine/pull/5087) [`88d52d639b9`](https://github.com/refinedev/refine/commit/88d52d639b9e4590d70847812c47d3fb40fc6ebe) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `meta` props added `liveProvider.subscribe` and `liveProvider.publish` methods.
  From now on, you can use `meta` to distinguish between methods by `meta`.

  `meta` type:

  ```ts
  import { QueryFunctionContext } from "@tanstack/react-query";

  type Fields = Array<string | object | NestedField>;

  type VariableOptions =
    | {
        type?: string;
        name?: string;
        value: any;
        list?: boolean;
        required?: boolean;
      }
    | { [k: string]: any };

  type Meta = {
    dataProviderName?: string;
    operation?: string;
    fields?: Fields;
    variables?: VariableOptions;
    queryContext?: QueryFunctionContext;
    [k: string]: any;
  };
  ```

  #### Usage

  ```ts
  import { LiveProvider, LiveEvent } from "@refinedev/core";

  export const liveProvider = (client: any): LiveProvider => {
    return {
      subscribe: ({ channel, types, params, callback, meta }) => {
        console.log({ meta });
      },

      publish: ({ channel, type, payload, date, meta }: LiveEvent) => {
        console.log({ meta });
      },
    };
  };
  ```

## 4.44.3

### Patch Changes

- [#5050](https://github.com/refinedev/refine/pull/5050) [`613af0021f6`](https://github.com/refinedev/refine/commit/613af0021f6a48be3e048678102738c912ee981f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: pass `dataProviderName` to `liveProvider.subscribe` method.
  From now on, you can use `dataProviderName` to distinguish between different data providers in live provider.

  [Refer to documentation for more info about multiple data providers ->](https://refine.dev/docs/api-reference/core/providers/data-provider/#multiple-data-providers)

  #### Usage

  ```ts
  import { useForm, useList } from "@refinedev/core";

  useList({
    dataProviderName: "first-data-provider",
  });

  useForm({
    dataProviderName: "second-data-provider",
  });
  ```

  ```ts
  import { LiveProvider } from "@refinedev/core";

  export const liveProvider = (client: any): LiveProvider => {
    return {
      subscribe: ({ channel, types, params, callback, dataProviderName }) => {
        console.log({ dataProviderName }); //  "second-data-provider"
      },
    };
  };
  ```

- [#5053](https://github.com/refinedev/refine/pull/5053) [`857d4020a30`](https://github.com/refinedev/refine/commit/857d4020a30d518178fa4f3bce8eeb509c9bb6d2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: The parameter types of data provider methods have been exported.
  From now on, you can use the parameter types of Data Provider methods.

  ```ts
  import type {
      DataProvider,
      GetListResponse
      // new exported types
      GetListParams,
      GetManyParams,
      GetOneParams,
      CreateParams,
      CreateManyParams,
      UpdateParams,
      UpdateManyParams,
      DeleteOneParams,
      DeleteManyParams,
      CustomParams,
  } from "@refinedev/core";

  const myDataProvider: DataProvider = {
      getList: async (params: GetListParams): Promise<GetListResponse<any>> => {
          return { data: [], total: 0 };
      },
  };
  ```

## 4.44.2

### Patch Changes

- [#5050](https://github.com/refinedev/refine/pull/5050) [`613af0021f6`](https://github.com/refinedev/refine/commit/613af0021f6a48be3e048678102738c912ee981f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: pass `dataProviderName` to `liveProvider.subscribe` method.
  From now on, you can use `dataProviderName` to distinguish between different data providers in live provider.

  [Refer to documentation for more info about multiple data providers ->](https://refine.dev/docs/api-reference/core/providers/data-provider/#multiple-data-providers)

  #### Usage

  ```ts
  import { useForm, useList } from "@refinedev/core";

  useList({
    dataProviderName: "first-data-provider",
  });

  useForm({
    dataProviderName: "second-data-provider",
  });
  ```

  ```ts
  import { LiveProvider } from "@refinedev/core";

  export const liveProvider = (client: any): LiveProvider => {
    return {
      subscribe: ({ channel, types, params, callback, dataProviderName }) => {
        console.log({ dataProviderName }); //  "second-data-provider"
      },
    };
  };
  ```

- [#5053](https://github.com/refinedev/refine/pull/5053) [`857d4020a30`](https://github.com/refinedev/refine/commit/857d4020a30d518178fa4f3bce8eeb509c9bb6d2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: The parameter types of data provider methods have been exported.
  From now on, you can use the parameter types of Data Provider methods.

  ```ts
  import type {
      DataProvider,
      GetListResponse
      // new exported types
      GetListParams,
      GetManyParams,
      GetOneParams,
      CreateParams,
      CreateManyParams,
      UpdateParams,
      UpdateManyParams,
      DeleteOneParams,
      DeleteManyParams,
      CustomParams,
  } from "@refinedev/core";

  const myDataProvider: DataProvider = {
      getList: async (params: GetListParams): Promise<GetListResponse<any>> => {
          return { data: [], total: 0 };
      },
  };
  ```

## 4.44.1

### Patch Changes

- [#5050](https://github.com/refinedev/refine/pull/5050) [`613af0021f6`](https://github.com/refinedev/refine/commit/613af0021f6a48be3e048678102738c912ee981f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: pass `dataProviderName` to `liveProvider.subscribe` method.
  From now on, you can use `dataProviderName` to distinguish between different data providers in live provider.

  [Refer to documentation for more info about multiple data providers ->](https://refine.dev/docs/api-reference/core/providers/data-provider/#multiple-data-providers)

  #### Usage

  ```ts
  import { useForm, useList } from "@refinedev/core";

  useList({
    dataProviderName: "first-data-provider",
  });

  useForm({
    dataProviderName: "second-data-provider",
  });
  ```

  ```ts
  import { LiveProvider } from "@refinedev/core";

  export const liveProvider = (client: any): LiveProvider => {
    return {
      subscribe: ({ channel, types, params, callback, dataProviderName }) => {
        console.log({ dataProviderName }); //  "second-data-provider"
      },
    };
  };
  ```

- [#5053](https://github.com/refinedev/refine/pull/5053) [`857d4020a30`](https://github.com/refinedev/refine/commit/857d4020a30d518178fa4f3bce8eeb509c9bb6d2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: The parameter types of data provider methods have been exported.
  From now on, you can use the parameter types of Data Provider methods.

  ```ts
  import type {
      DataProvider,
      GetListResponse
      // new exported types
      GetListParams,
      GetManyParams,
      GetOneParams,
      CreateParams,
      CreateManyParams,
      UpdateParams,
      UpdateManyParams,
      DeleteOneParams,
      DeleteManyParams,
      CustomParams,
  } from "@refinedev/core";

  const myDataProvider: DataProvider = {
      getList: async (params: GetListParams): Promise<GetListResponse<any>> => {
          return { data: [], total: 0 };
      },
  };
  ```

## 4.44.0

### Minor Changes

- [#5034](https://github.com/refinedev/refine/pull/5034) [`85bcff15d1e`](https://github.com/refinedev/refine/commit/85bcff15d1efe66c915fe50b504c09d625417fb3) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: The `go` function returned by `useGo` now accepts a `resource` object as the `to` parameter.
  From now now, you can provide either a string or a resource object to the `go` function. When a resource object is passed, it will be transformed into the path defined within the resources array of the `<Refine />` component.

  `to` accepts an object with the following shape to navigate to a resource:

  | Name     | Type                                                        | Description                                                 |
  | -------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
  | resource | `string`                                                    | resource name or identifier.                                |
  | id       | [`BaseKey`][basekey]                                        | required when `action` is `"edit"`, `"show"`, or `"clone"`. |
  | action   | `"list"` \| `"create"` \| `"edit"` \| `"show"` \| `"clone"` | action name.                                                |

  ```tsx
  import { useGo } from "@refinedev/core";

  const MyComponent = () => {
      const go = useGo();

      return (
          <Button
              onClick={() => {
                  go({
                      to:  {
                          resource: "posts", // resource name or identifier
                          action: "edit",
                          id: "1",
                      }
                      query: {
                           foo: "bar",
                      },
                      type: "push",
                  });
              }}
          >
              Go Posts With Default Filters
          </Button>
      );
  };
  ```

## 4.43.0

### Minor Changes

- [#5034](https://github.com/refinedev/refine/pull/5034) [`85bcff15d1e`](https://github.com/refinedev/refine/commit/85bcff15d1efe66c915fe50b504c09d625417fb3) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: The `go` function returned by `useGo` now accepts a `resource` object as the `to` parameter.
  From now now, you can provide either a string or a resource object to the `go` function. When a resource object is passed, it will be transformed into the path defined within the resources array of the `<Refine />` component.

  `to` accepts an object with the following shape to navigate to a resource:

  | Name     | Type                                                        | Description                                                 |
  | -------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
  | resource | `string`                                                    | resource name or identifier.                                |
  | id       | [`BaseKey`][basekey]                                        | required when `action` is `"edit"`, `"show"`, or `"clone"`. |
  | action   | `"list"` \| `"create"` \| `"edit"` \| `"show"` \| `"clone"` | action name.                                                |

  ```tsx
  import { useGo } from "@refinedev/core";

  const MyComponent = () => {
      const go = useGo();

      return (
          <Button
              onClick={() => {
                  go({
                      to:  {
                          resource: "posts", // resource name or identifier
                          action: "edit",
                          id: "1",
                      }
                      query: {
                           foo: "bar",
                      },
                      type: "push",
                  });
              }}
          >
              Go Posts With Default Filters
          </Button>
      );
  };
  ```

## 4.42.4

### Patch Changes

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b)]:
  - @refinedev/devtools-internal@1.1.4

## 4.42.3

### Patch Changes

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b)]:
  - @refinedev/devtools-internal@1.1.3

## 4.42.2

### Patch Changes

- [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixing the version of `@refinedev/devtools-internal` dependency to avoid breaking projects in mismatching releases.

- Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
  - @refinedev/devtools-internal@1.1.2

## 4.42.1

### Patch Changes

- [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixing the version of `@refinedev/devtools-internal` dependency to avoid breaking projects in mismatching releases.

- Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
  - @refinedev/devtools-internal@1.1.1

## 4.42.0

### Minor Changes

- [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Added devtools internals and integrated with the core hooks. Now users will be able to track the queries and mutation made by refine through refine devtools.

### Patch Changes

- Updated dependencies [[`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3)]:
  - @refinedev/devtools-internal@1.1.0

## 4.41.0

### Minor Changes

- [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Added devtools internals and integrated with the core hooks. Now users will be able to track the queries and mutation made by refine through refine devtools.

### Patch Changes

- Updated dependencies [[`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3)]:
  - @refinedev/devtools-internal@1.0.0

## 4.40.0

### Minor Changes

- [#4914](https://github.com/refinedev/refine/pull/4914) [`91a4d0da9f1`](https://github.com/refinedev/refine/commit/91a4d0da9f180ae358a448c7d187cee44f8c2299) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) prop to the `useUpdate` and `useUpdateMany` hooks

  `list`, `many` and `detail` are the keys of the `optimisticUpdateMap` object. To automatically update the cache, you should pass `true`. If you don't want to update the cache, you should pass `false`.

  If you wish to customize the cache update, you have the option to provide functions for the `list`, `many`, and `detail` keys. These functions will be invoked with the `previous` data, `values`, and `id` parameters. Your responsibility is to return the updated data within these functions.

  ```tsx
  const { mutate } = useUpdateMany();

  mutate({
    //...
    mutationMode: "optimistic",
    optimisticUpdateMap: {
      list: true,
      many: true,
      detail: (previous, values, id) => {
        if (!previous) {
          return null;
        }

        const data = {
          id,
          ...previous.data,
          ...values,
          foo: "bar",
        };

        return {
          ...previous,
          data,
        };
      },
    },
  });
  ```

  feat: add [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) prop to the `useForm` hook

  ```tsx
  const { formProps, saveButtonProps } = useForm({
    mutationMode: "optimistic",
    optimisticUpdateMap: {
      list: true,
      many: true,
      detail: (previous, values, id) => {
        if (!previous) {
          return null;
        }

        const data = {
          id,
          ...previous.data,
          ...values,
          foo: "bar",
        };

        return {
          ...previous,
          data,
        };
      },
    },
  });
  ```

### Patch Changes

- [#4903](https://github.com/refinedev/refine/pull/4903) [`e327cadc011`](https://github.com/refinedev/refine/commit/e327cadc011ce8696d7149252e1ad308005b1eff) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add [`invalidateOnUnmount`](https://refine.dev/docs/api-reference/core/hooks/useForm/#invalidateonunmount) prop to [`useForm`](https://refine.dev/docs/api-reference/core/hooks/useForm) hook.
  From now on, you can use the [`invalidateOnUnmount`](https://refine.dev/docs/api-reference/core/hooks/useForm/#invalidateonunmount) prop to invalidate queries upon unmount.

## 4.39.0

### Minor Changes

- [#4914](https://github.com/refinedev/refine/pull/4914) [`91a4d0da9f1`](https://github.com/refinedev/refine/commit/91a4d0da9f180ae358a448c7d187cee44f8c2299) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) prop to the `useUpdate` and `useUpdateMany` hooks

  `list`, `many` and `detail` are the keys of the `optimisticUpdateMap` object. To automatically update the cache, you should pass `true`. If you don't want to update the cache, you should pass `false`.

  If you wish to customize the cache update, you have the option to provide functions for the `list`, `many`, and `detail` keys. These functions will be invoked with the `previous` data, `values`, and `id` parameters. Your responsibility is to return the updated data within these functions.

  ```tsx
  const { mutate } = useUpdateMany();

  mutate({
    //...
    mutationMode: "optimistic",
    optimisticUpdateMap: {
      list: true,
      many: true,
      detail: (previous, values, id) => {
        if (!previous) {
          return null;
        }

        const data = {
          id,
          ...previous.data,
          ...values,
          foo: "bar",
        };

        return {
          ...previous,
          data,
        };
      },
    },
  });
  ```

  feat: add [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) prop to the `useForm` hook

  ```tsx
  const { formProps, saveButtonProps } = useForm({
    mutationMode: "optimistic",
    optimisticUpdateMap: {
      list: true,
      many: true,
      detail: (previous, values, id) => {
        if (!previous) {
          return null;
        }

        const data = {
          id,
          ...previous.data,
          ...values,
          foo: "bar",
        };

        return {
          ...previous,
          data,
        };
      },
    },
  });
  ```

### Patch Changes

- [#4903](https://github.com/refinedev/refine/pull/4903) [`e327cadc011`](https://github.com/refinedev/refine/commit/e327cadc011ce8696d7149252e1ad308005b1eff) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add [`invalidateOnUnmount`](https://refine.dev/docs/api-reference/core/hooks/useForm/#invalidateonunmount) prop to [`useForm`](https://refine.dev/docs/api-reference/core/hooks/useForm) hook.
  From now on, you can use the [`invalidateOnUnmount`](https://refine.dev/docs/api-reference/core/hooks/useForm/#invalidateonunmount) prop to invalidate queries upon unmount.

## 4.38.4

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.

## 4.38.3

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.

## 4.38.2

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 4.38.1

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 4.38.0

### Minor Changes

- [#4906](https://github.com/refinedev/refine/pull/4906) [`58d3d605510`](https://github.com/refinedev/refine/commit/58d3d605510954a4355a4db3069d68060a062e59) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `onUnauthorized` callback to `<CanAccess />` component. This callback to be called when [`useCan`](https://refine.dev/docs/api-reference/core/hooks/accessControl/useCan/) returns false.

  ```tsx
  <CanAccess
    onUnauthorized={({ resource, reason, action, params }) =>
      console.log(
        `You cannot access ${resource}-${params.id} resource with ${action} action because ${reason}`,
      )
    }
  >
    <YourComponent />
  </CanAccess>
  ```

### Patch Changes

- [#4926](https://github.com/refinedev/refine/pull/4926) [`053798ae52b`](https://github.com/refinedev/refine/commit/053798ae52b172520aff624a7b518d6dd914ddb7) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: update `useForm` warn condition

## 4.37.0

### Minor Changes

- [#4906](https://github.com/refinedev/refine/pull/4906) [`58d3d605510`](https://github.com/refinedev/refine/commit/58d3d605510954a4355a4db3069d68060a062e59) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `onUnauthorized` callback to `<CanAccess />` component. This callback to be called when [`useCan`](https://refine.dev/docs/api-reference/core/hooks/accessControl/useCan/) returns false.

  ```tsx
  <CanAccess
    onUnauthorized={({ resource, reason, action, params }) =>
      console.log(
        `You cannot access ${resource}-${params.id} resource with ${action} action because ${reason}`,
      )
    }
  >
    <YourComponent />
  </CanAccess>
  ```

### Patch Changes

- [#4926](https://github.com/refinedev/refine/pull/4926) [`053798ae52b`](https://github.com/refinedev/refine/commit/053798ae52b172520aff624a7b518d6dd914ddb7) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: update `useForm` warn condition

## 4.36.2

### Patch Changes

- [#4896](https://github.com/refinedev/refine/pull/4896) [`daabcd666be`](https://github.com/refinedev/refine/commit/daabcd666be13119a482a39874844a94a1e7bd13) Thanks [@aliemir](https://github.com/aliemir)! - `useInvalidate` now returns a promise that resolves when the invalidation is completed.

- [#4896](https://github.com/refinedev/refine/pull/4896) [`daabcd666be`](https://github.com/refinedev/refine/commit/daabcd666be13119a482a39874844a94a1e7bd13) Thanks [@aliemir](https://github.com/aliemir)! - Fine-tuning the invalidation process by setting up additional filters and options for the invalidation.

  Now after a successful mutation, refine will invalidate all the queries in the scope but trigger a refetch only for the active queries. If there are any ongoing queries, they will be kept as they are.

  After receiving a realtime subscription event, refine will invalidate and refetch only the active queries.

## 4.36.1

### Patch Changes

- [#4896](https://github.com/refinedev/refine/pull/4896) [`daabcd666be`](https://github.com/refinedev/refine/commit/daabcd666be13119a482a39874844a94a1e7bd13) Thanks [@aliemir](https://github.com/aliemir)! - `useInvalidate` now returns a promise that resolves when the invalidation is completed.

- [#4896](https://github.com/refinedev/refine/pull/4896) [`daabcd666be`](https://github.com/refinedev/refine/commit/daabcd666be13119a482a39874844a94a1e7bd13) Thanks [@aliemir](https://github.com/aliemir)! - Fine-tuning the invalidation process by setting up additional filters and options for the invalidation.

  Now after a successful mutation, refine will invalidate all the queries in the scope but trigger a refetch only for the active queries. If there are any ongoing queries, they will be kept as they are.

  After receiving a realtime subscription event, refine will invalidate and refetch only the active queries.

## 4.36.0

### Minor Changes

- [#4865](https://github.com/refinedev/refine/pull/4865) [`946e13408e7`](https://github.com/refinedev/refine/commit/946e13408e7e96020187a6e3c384163e8e711f0d) Thanks [@aliemir](https://github.com/aliemir)! - Updated query keys to be more consistent and structured.

  Added mutation keys to the `useMutation` calls with the same structure as the query keys.

  Added `options.useNewQueryKeys` option to the `<Refine>` component for opting into the new query keys.

  Check out the [documentation](https://refine.dev/docs/api-reference/core/components/refine-config/#usenewquerykeys) for more information.

## 4.35.0

### Minor Changes

- [#4865](https://github.com/refinedev/refine/pull/4865) [`946e13408e7`](https://github.com/refinedev/refine/commit/946e13408e7e96020187a6e3c384163e8e711f0d) Thanks [@aliemir](https://github.com/aliemir)! - Updated query keys to be more consistent and structured.

  Added mutation keys to the `useMutation` calls with the same structure as the query keys.

  Added `options.useNewQueryKeys` option to the `<Refine>` component for opting into the new query keys.

  Check out the [documentation](https://refine.dev/docs/api-reference/core/components/refine-config/#usenewquerykeys) for more information.

## 4.34.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `queryKeys` and `pickDataProvider` functions are exported.

  `pickDataProvider`: returns the data provider name based on the provided name or fallbacks to resource definition, or `default`.

  `queryKeys`: returns the query keys used by the data hooks based on the `resource` definition

## 4.33.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `queryKeys` and `pickDataProvider` functions are exported.

  `pickDataProvider`: returns the data provider name based on the provided name or fallbacks to resource definition, or `default`.

  `queryKeys`: returns the query keys used by the data hooks based on the `resource` definition

## 4.32.2

### Patch Changes

- [#4765](https://github.com/refinedev/refine/pull/4765) [`e3e38de4114`](https://github.com/refinedev/refine/commit/e3e38de4114209fe43fe35ac3622d44e355694bd) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - chore: remove `refine cloud` early access message

## 4.32.1

### Patch Changes

- [#4765](https://github.com/refinedev/refine/pull/4765) [`e3e38de4114`](https://github.com/refinedev/refine/commit/e3e38de4114209fe43fe35ac3622d44e355694bd) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - chore: remove `refine cloud` early access message

## 4.32.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 4.31.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 4.30.0

### Minor Changes

- [#4742](https://github.com/refinedev/refine/pull/4742) [`61950c8fe18`](https://github.com/refinedev/refine/commit/61950c8fe18ec0dc428aeda1a045c76cd67026a6) Thanks [@aliemir](https://github.com/aliemir)! - Removed `@tanstack/react-query-devtools` package and its usage from refine's core. This means that you will no longer see the dev tools icon in the bottom right corner of your app by default. If you want to use the dev tools, you can install the package (`@tanstack/react-query-devtools`) and use it in your app.

  `options.reactQuery.devtoolConfig` property has been removed from the `<Refine>` components props. This option will no longer be functional and will be removed in the next major release. If you have any configuration for the dev tools, you can pass it to the `ReactQueryDevtools` component directly.

### Patch Changes

- [#4740](https://github.com/refinedev/refine/pull/4740) [`41018fde9ff`](https://github.com/refinedev/refine/commit/41018fde9ff94407216d82516ad83e1610ce73d0) Thanks [@aliemir](https://github.com/aliemir)! - Use `fetch` for telemetry calls as a fallback for `Image` when it's not available. This fixes an issue where telemetry calls would fail in some environments.

## 4.29.0

### Minor Changes

- [#4742](https://github.com/refinedev/refine/pull/4742) [`61950c8fe18`](https://github.com/refinedev/refine/commit/61950c8fe18ec0dc428aeda1a045c76cd67026a6) Thanks [@aliemir](https://github.com/aliemir)! - Removed `@tanstack/react-query-devtools` package and its usage from refine's core. This means that you will no longer see the dev tools icon in the bottom right corner of your app by default. If you want to use the dev tools, you can install the package (`@tanstack/react-query-devtools`) and use it in your app.

  `options.reactQuery.devtoolConfig` property has been removed from the `<Refine>` components props. This option will no longer be functional and will be removed in the next major release. If you have any configuration for the dev tools, you can pass it to the `ReactQueryDevtools` component directly.

### Patch Changes

- [#4740](https://github.com/refinedev/refine/pull/4740) [`41018fde9ff`](https://github.com/refinedev/refine/commit/41018fde9ff94407216d82516ad83e1610ce73d0) Thanks [@aliemir](https://github.com/aliemir)! - Use `fetch` for telemetry calls as a fallback for `Image` when it's not available. This fixes an issue where telemetry calls would fail in some environments.

## 4.28.2

### Patch Changes

- [#4696](https://github.com/refinedev/refine/pull/4696) [`35a2c695a74`](https://github.com/refinedev/refine/commit/35a2c695a7465492e7aa59c50f3bb80a56aff19b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: add optional projectId field to <Refine /> component options prop. Project ID will be sent with telemetry data if it exists.

## 4.28.1

### Patch Changes

- [#4696](https://github.com/refinedev/refine/pull/4696) [`35a2c695a74`](https://github.com/refinedev/refine/commit/35a2c695a7465492e7aa59c50f3bb80a56aff19b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: add optional projectId field to <Refine /> component options prop. Project ID will be sent with telemetry data if it exists.

## 4.28.0

### Minor Changes

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `errros` field to `HttpError` type.
  From now on, you can pass `errors` field to `HttpError`. This field will be used to update the `useForm`'s error state.

  ```ts
  export interface ValidationErrors {
    [field: string]:
      | string
      | string[]
      | boolean
      | { key: string; message: string };
  }

  export interface HttpError extends Record<string, any> {
    message: string;
    statusCode: number;
    errors?: ValidationErrors;
  }
  ```

  Usage example:

  ```tsx
  import { HttpError } from "@refinedev/core";

  const App = () => {
    return (
      <Refine
        routerProvider={routerProvider}
        dataProvider={{
          // ...
          update: async () => {
            // assume that the server returns the following error
            const error: HttpError = {
              message: "An error occurred while updating the record.",
              statusCode: 400,
              //This field will be used to update the `useForm`'s error state
              errors: {
                title: [
                  "Title is required.",
                  "Title should have at least 5 characters.",
                ],
                "category.id": ["Category is required."],
                status: true,
                content: {
                  key: "form.error.content",
                  message: "Content is required.",
                },
              },
            };

            return Promise.reject(error);
          },
        }}
      >
        {/* ... */}
      </Refine>
    );
  };
  ```

  [Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `disableServerSideValidation` to the refine options for globally disabling server-side validation.

  ```tsx
  import { Refine } from "@refinedev/core";

  <Refine
    options={{
      disableServerSideValidation: true,
    }}
  >
    // ...
  </Refine>;
  ```

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [useForm](https://refine.dev/docs/api-reference/core/hooks/useForm/#autosave) hook now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.
  `autoSaveProps` is an object that contains `data`, `error` and `status` values. `data` is the saved data, `error` is the error object and `status` is the status of the request. `status` can be `loading`, `error`, `idle` and `success`.

  ```
  const { autoSaveProps } = useForm({
      autoSave: {
          enabled: true,
          debounce: 2000, // not required, default is 1000
      },
  });
  ```

### Patch Changes

- [#4659](https://github.com/refinedev/refine/pull/4659) [`3af99896101`](https://github.com/refinedev/refine/commit/3af99896101bd41a4d2878c4a9f671ca1da36a6f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: fix tsdoc description of `onCancel` property on following hooks:

  - `useUpdate`
  - `useUpdateMany`
  - `useDelete`
  - `useDeleteMany`

- [#4665](https://github.com/refinedev/refine/pull/4665) [`3442f4bd00a`](https://github.com/refinedev/refine/commit/3442f4bd00ad4dbb17dcba08931fdeed3c2b1cb0) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `false` return type on `SuccessErrorNotification`

  This issue has been fixed in this PR, where the `successNotification` and `errorNotification` methods can now return `false` when a callback function is given. This allows the conditional notification to be displayed.

  ```
  const { mutate } = useCreate<IPost>({});

  mutate({
      resource: "posts",
      values: {
          title: "Hello World",
          status: "published",
      },
      successNotification: (data) => {
          if (data?.data.status === "published") {
              return {
                  type: "success",
                  message: "Post published",
              };
          }

          return false;
      },
  });
  ```

## 4.27.0

### Minor Changes

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `errros` field to `HttpError` type.
  From now on, you can pass `errors` field to `HttpError`. This field will be used to update the `useForm`'s error state.

  ```ts
  export interface ValidationErrors {
    [field: string]:
      | string
      | string[]
      | boolean
      | { key: string; message: string };
  }

  export interface HttpError extends Record<string, any> {
    message: string;
    statusCode: number;
    errors?: ValidationErrors;
  }
  ```

  Usage example:

  ```tsx
  import { HttpError } from "@refinedev/core";

  const App = () => {
    return (
      <Refine
        routerProvider={routerProvider}
        dataProvider={{
          // ...
          update: async () => {
            // assume that the server returns the following error
            const error: HttpError = {
              message: "An error occurred while updating the record.",
              statusCode: 400,
              //This field will be used to update the `useForm`'s error state
              errors: {
                title: [
                  "Title is required.",
                  "Title should have at least 5 characters.",
                ],
                "category.id": ["Category is required."],
                status: true,
                content: {
                  key: "form.error.content",
                  message: "Content is required.",
                },
              },
            };

            return Promise.reject(error);
          },
        }}
      >
        {/* ... */}
      </Refine>
    );
  };
  ```

  [Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `disableServerSideValidation` to the refine options for globally disabling server-side validation.

  ```tsx
  import { Refine } from "@refinedev/core";

  <Refine
    options={{
      disableServerSideValidation: true,
    }}
  >
    // ...
  </Refine>;
  ```

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [useForm](https://refine.dev/docs/api-reference/core/hooks/useForm/#autosave) hook now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.
  `autoSaveProps` is an object that contains `data`, `error` and `status` values. `data` is the saved data, `error` is the error object and `status` is the status of the request. `status` can be `loading`, `error`, `idle` and `success`.

  ```
  const { autoSaveProps } = useForm({
      autoSave: {
          enabled: true,
          debounce: 2000, // not required, default is 1000
      },
  });
  ```

### Patch Changes

- [#4659](https://github.com/refinedev/refine/pull/4659) [`3af99896101`](https://github.com/refinedev/refine/commit/3af99896101bd41a4d2878c4a9f671ca1da36a6f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: fix tsdoc description of `onCancel` property on following hooks:

  - `useUpdate`
  - `useUpdateMany`
  - `useDelete`
  - `useDeleteMany`

- [#4665](https://github.com/refinedev/refine/pull/4665) [`3442f4bd00a`](https://github.com/refinedev/refine/commit/3442f4bd00ad4dbb17dcba08931fdeed3c2b1cb0) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `false` return type on `SuccessErrorNotification`

  This issue has been fixed in this PR, where the `successNotification` and `errorNotification` methods can now return `false` when a callback function is given. This allows the conditional notification to be displayed.

  ```
  const { mutate } = useCreate<IPost>({});

  mutate({
      resource: "posts",
      values: {
          title: "Hello World",
          status: "published",
      },
      successNotification: (data) => {
          if (data?.data.status === "published") {
              return {
                  type: "success",
                  message: "Post published",
              };
          }

          return false;
      },
  });
  ```

## 4.26.4

### Patch Changes

- [#4626](https://github.com/refinedev/refine/pull/4626) [`03597ed8a9a`](https://github.com/refinedev/refine/commit/03597ed8a9ad1bd2a6d51e6d7181de76b16c38f9) Thanks [@aliemir](https://github.com/aliemir)! - Added `resource` sanitization to the `useCanWithoutCache` hook to avoid cyclic value errors.

## 4.26.3

### Patch Changes

- [#4626](https://github.com/refinedev/refine/pull/4626) [`03597ed8a9a`](https://github.com/refinedev/refine/commit/03597ed8a9ad1bd2a6d51e6d7181de76b16c38f9) Thanks [@aliemir](https://github.com/aliemir)! - Added `resource` sanitization to the `useCanWithoutCache` hook to avoid cyclic value errors.

## 4.26.2

### Patch Changes

- [#4614](https://github.com/refinedev/refine/pull/4614) [`c9fecca3c33`](https://github.com/refinedev/refine/commit/c9fecca3c332671e836bb42d06afc62c3e28d4d2) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: add refine cloud early access message

## 4.26.1

### Patch Changes

- [#4614](https://github.com/refinedev/refine/pull/4614) [`c9fecca3c33`](https://github.com/refinedev/refine/commit/c9fecca3c332671e836bb42d06afc62c3e28d4d2) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: add refine cloud early access message

## 4.26.0

### Minor Changes

- [#4568](https://github.com/refinedev/refine/pull/4568) [`8c2b3be35b0`](https://github.com/refinedev/refine/commit/8c2b3be35b0132fc9a7b79287d281a9f922424d0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: add the `textTransformers` option to `<Refine/>` component

  The `textTransformers` option in **refine** is used to transform the resource name displayed on the user interface (UI). By default, if you define a resource named `posts`, refine will display it as `Posts`. Similarly, when you delete a record, notification messages will be shown as `Post deleted successfully.`.

  You have the flexibility to customize these messages by using the `textTransformers` option. For instance, if you wish to disable any transformation, you can set the `textTransformers` option as shown in the example below:

  ```tsx
  const App: React.FC = () => (
    <Refine
      // ...
      options={{
        textTransformers: {
          humanize: (text) => text,
          plural: (text) => text,
          singular: (text) => text,
        },
      }}
    />
  );
  ```

### Patch Changes

- [#4583](https://github.com/refinedev/refine/pull/4583) [`c3c0deed564`](https://github.com/refinedev/refine/commit/c3c0deed564bdbded58c615357a55e666473923a) Thanks [@aliemir](https://github.com/aliemir)! - Added the missing `resource` property in `params` of the `useCan` call, which was leading to missing resource details in the access control checks in the `can` function.

  The provided `resource` item is sanitized to remove non-serializable properties such as `icon` etc. If you need such items, you should try to access your `resource` item directly from your defitinions.

- [#4599](https://github.com/refinedev/refine/pull/4599) [`5bb6f47a4d4`](https://github.com/refinedev/refine/commit/5bb6f47a4d4e29a7de5426879754fcd78e3fa4d5) Thanks [@aliemir](https://github.com/aliemir)! - Update default document title generation to use the fallback title when `i18n`'s `translate` function returns the `key` value.

## 4.25.1

### Patch Changes

- [#4599](https://github.com/refinedev/refine/pull/4599) [`5bb6f47a4d4`](https://github.com/refinedev/refine/commit/5bb6f47a4d4e29a7de5426879754fcd78e3fa4d5) Thanks [@aliemir](https://github.com/aliemir)! - Update default document title generation to use the fallback title when `i18n`'s `translate` function returns the `key` value.

## 4.25.0

### Minor Changes

- [#4568](https://github.com/refinedev/refine/pull/4568) [`8c2b3be35b0`](https://github.com/refinedev/refine/commit/8c2b3be35b0132fc9a7b79287d281a9f922424d0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: add the `textTransformers` option to `<Refine/>` component

  The `textTransformers` option in **refine** is used to transform the resource name displayed on the user interface (UI). By default, if you define a resource named `posts`, refine will display it as `Posts`. Similarly, when you delete a record, notification messages will be shown as `Post deleted successfully.`.

  You have the flexibility to customize these messages by using the `textTransformers` option. For instance, if you wish to disable any transformation, you can set the `textTransformers` option as shown in the example below:

  ```tsx
  const App: React.FC = () => (
    <Refine
      // ...
      options={{
        textTransformers: {
          humanize: (text) => text,
          plural: (text) => text,
          singular: (text) => text,
        },
      }}
    />
  );
  ```

### Patch Changes

- [#4583](https://github.com/refinedev/refine/pull/4583) [`c3c0deed564`](https://github.com/refinedev/refine/commit/c3c0deed564bdbded58c615357a55e666473923a) Thanks [@aliemir](https://github.com/aliemir)! - Added the missing `resource` property in `params` of the `useCan` call, which was leading to missing resource details in the access control checks in the `can` function.

  The provided `resource` item is sanitized to remove non-serializable properties such as `icon` etc. If you need such items, you should try to access your `resource` item directly from your defitinions.

## 4.24.0

### Minor Changes

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `useLoadingOvertime` hook and implement primitive hooks

  If you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook. It returns the elapsed time in milliseconds.

  ```tsx
  const { elapsedTime } = useLoadingOvertime({
    isLoading,
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log("loading overtime", elapsedInterval);
    },
  });

  console.log(elapsedTime); // 1000, 2000, 3000, ...
  ```

  This hook implements the primitive data hooks:

  - [`useCreate`](https://refine.dev/docs/api-reference/core/hooks/data/useCreate/#overtimeoptions)
  - [`useCreateMany`](https://refine.dev/docs/api-reference/core/hooks/data/useCreateMany/#overtimeoptions)
  - [`useCustom`](https://refine.dev/docs/api-reference/core/hooks/data/useCustom/#overtimeoptions)
  - [`useCustomMutation`](https://refine.dev/docs/api-reference/core/hooks/data/useCustomMutation/#overtimeoptions)
  - [`useDelete`](https://refine.dev/docs/api-reference/core/hooks/data/useDelete/#overtimeoptions)
  - [`useDeleteMany`](https://refine.dev/docs/api-reference/core/hooks/data/useDeleteMany/#overtimeoptions)
  - [`useList`](https://refine.dev/docs/api-reference/core/hooks/data/useList/#overtimeoptions)
  - [`useInfiniteList`](https://refine.dev/docs/api-reference/core/hooks/data/useInfiniteList/#overtimeoptions)
  - [`useMany`](https://refine.dev/docs/api-reference/core/hooks/data/useMany/#overtimeoptions)
  - [`useOne`](https://refine.dev/docs/api-reference/core/hooks/data/useOne/#overtimeoptions)
  - [`useUpdate`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/#overtimeoptions)
  - [`useUpdateMany`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#overtimeoptions)

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: support multiple `resource` usage with the same name via the `identifier`

  Previously, data hooks only worked with resource name. So if you had multiple `resource` usage with the same name, it would cause issues.

  Now the following hooks and its derivatives support `identifier` to distinguish between the resources:

  - `useList`
  - `useInfiniteList`
  - `useOne`
  - `useMany`
  - `useCreate`
  - `useCreateMany`
  - `useUpdate`
  - `useUpdateMany`
  - `useDelete`
  - `useDeleteMany`

  fix: generate correct `queryKey`'s for queries with `identifier`

  Previously, the `queryKey` was generated using `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `queryKey`'s are generated using `identifier` if it's present.

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `useLoadingOvertime` hook

  if you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook. It returns the elapsed time in milliseconds.

  ```tsx
  const { elapsedTime } = useLoadingOvertime({
    isLoading,
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log("loading overtime", elapsedInterval);
    },
  });
  ```

  `interval` and `onInterval` are optional. It can be controlled globally from `<Refine />` options.

  ```tsx
  <Refine
      //...
      options={{
          //...
          overtime: {
              interval: 2000, // default 1000
              onInterval(elapsedInterval) {
                  console.log(
                      "loading overtime",
                      elapsedInterval,
                  );
              },
          },
      }}
  >
  ```

## 4.23.0

### Minor Changes

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `useLoadingOvertime` hook and implement primitive hooks

  If you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook. It returns the elapsed time in milliseconds.

  ```tsx
  const { elapsedTime } = useLoadingOvertime({
    isLoading,
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log("loading overtime", elapsedInterval);
    },
  });

  console.log(elapsedTime); // 1000, 2000, 3000, ...
  ```

  This hook implements the primitive data hooks:

  - [`useCreate`](https://refine.dev/docs/api-reference/core/hooks/data/useCreate/#overtimeoptions)
  - [`useCreateMany`](https://refine.dev/docs/api-reference/core/hooks/data/useCreateMany/#overtimeoptions)
  - [`useCustom`](https://refine.dev/docs/api-reference/core/hooks/data/useCustom/#overtimeoptions)
  - [`useCustomMutation`](https://refine.dev/docs/api-reference/core/hooks/data/useCustomMutation/#overtimeoptions)
  - [`useDelete`](https://refine.dev/docs/api-reference/core/hooks/data/useDelete/#overtimeoptions)
  - [`useDeleteMany`](https://refine.dev/docs/api-reference/core/hooks/data/useDeleteMany/#overtimeoptions)
  - [`useList`](https://refine.dev/docs/api-reference/core/hooks/data/useList/#overtimeoptions)
  - [`useInfiniteList`](https://refine.dev/docs/api-reference/core/hooks/data/useInfiniteList/#overtimeoptions)
  - [`useMany`](https://refine.dev/docs/api-reference/core/hooks/data/useMany/#overtimeoptions)
  - [`useOne`](https://refine.dev/docs/api-reference/core/hooks/data/useOne/#overtimeoptions)
  - [`useUpdate`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/#overtimeoptions)
  - [`useUpdateMany`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#overtimeoptions)

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: support multiple `resource` usage with the same name via the `identifier`

  Previously, data hooks only worked with resource name. So if you had multiple `resource` usage with the same name, it would cause issues.

  Now the following hooks and its derivatives support `identifier` to distinguish between the resources:

  - `useList`
  - `useInfiniteList`
  - `useOne`
  - `useMany`
  - `useCreate`
  - `useCreateMany`
  - `useUpdate`
  - `useUpdateMany`
  - `useDelete`
  - `useDeleteMany`

  fix: generate correct `queryKey`'s for queries with `identifier`

  Previously, the `queryKey` was generated using `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `queryKey`'s are generated using `identifier` if it's present.

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `useLoadingOvertime` hook

  if you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook. It returns the elapsed time in milliseconds.

  ```tsx
  const { elapsedTime } = useLoadingOvertime({
    isLoading,
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log("loading overtime", elapsedInterval);
    },
  });
  ```

  `interval` and `onInterval` are optional. It can be controlled globally from `<Refine />` options.

  ```tsx
  <Refine
      //...
      options={{
          //...
          overtime: {
              interval: 2000, // default 1000
              onInterval(elapsedInterval) {
                  console.log(
                      "loading overtime",
                      elapsedInterval,
                  );
              },
          },
      }}
  >
  ```

## 4.22.0

### Minor Changes

- [#4449](https://github.com/refinedev/refine/pull/4449) [`cc84d61bc5c`](https://github.com/refinedev/refine/commit/cc84d61bc5c8cfc8ac7da391f965471ecad6c445) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: allow access control provider to be configured globally.

  Now `accessControlProvider` accepts `options.buttons` parameter to globally configure UI buttons' behaviour.

  These configuration will be used as a fallback, if no configuration on button prop level is found.

  Default values:

  `options.buttons.enableAccessControl` => `true`
  `options.buttons.hideIfUnauthorized` => `false`

  ```ts
  const accessControlProvider: IAccessControlContext = {
    can: async (params: CanParams): Promise<CanReturnType> => {
      return { can: true };
    },
    options: {
      buttons: {
        enableAccessControl: true,
        hideIfUnauthorized: false,
      },
    },
  };
  ```

### Patch Changes

- [#4521](https://github.com/refinedev/refine/pull/4521) [`a3c8d4f84c7`](https://github.com/refinedev/refine/commit/a3c8d4f84c7b20b6d30f43310f5260b2f57b801a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `useExport`'s `resource` props is not working.
  With this fix, `useExport` will now work with `resource` props.

  ```ts
  useExport({
    resource: "users",
  });
  ```

## 4.21.0

### Minor Changes

- [#4449](https://github.com/refinedev/refine/pull/4449) [`cc84d61bc5c`](https://github.com/refinedev/refine/commit/cc84d61bc5c8cfc8ac7da391f965471ecad6c445) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: allow access control provider to be configured globally.

  Now `accessControlProvider` accepts `options.buttons` parameter to globally configure UI buttons' behaviour.

  These configuration will be used as a fallback, if no configuration on button prop level is found.

  Default values:

  `options.buttons.enableAccessControl` => `true`
  `options.buttons.hideIfUnauthorized` => `false`

  ```ts
  const accessControlProvider: IAccessControlContext = {
    can: async (params: CanParams): Promise<CanReturnType> => {
      return { can: true };
    },
    options: {
      buttons: {
        enableAccessControl: true,
        hideIfUnauthorized: false,
      },
    },
  };
  ```

### Patch Changes

- [#4521](https://github.com/refinedev/refine/pull/4521) [`a3c8d4f84c7`](https://github.com/refinedev/refine/commit/a3c8d4f84c7b20b6d30f43310f5260b2f57b801a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `useExport`'s `resource` props is not working.
  With this fix, `useExport` will now work with `resource` props.

  ```ts
  useExport({
    resource: "users",
  });
  ```

## 4.20.0

### Minor Changes

- [#4448](https://github.com/refinedev/refine/pull/4448) [`c82006f712a`](https://github.com/refinedev/refine/commit/c82006f712a875b1af308fec66e4e1187cdd9c0c) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: useApiUrl hook tries to infer data provider from current resource. If current resource has a different data provider than the default one, it will be inferred without needing to explicitly pass data provider name.

## 4.19.0

### Minor Changes

- [#4448](https://github.com/refinedev/refine/pull/4448) [`c82006f712a`](https://github.com/refinedev/refine/commit/c82006f712a875b1af308fec66e4e1187cdd9c0c) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: useApiUrl hook tries to infer data provider from current resource. If current resource has a different data provider than the default one, it will be inferred without needing to explicitly pass data provider name.

## 4.18.2

### Patch Changes

- [#4446](https://github.com/refinedev/refine/pull/4446) [`5936d9cd4d4`](https://github.com/refinedev/refine/commit/5936d9cd4d451e50c922b0a81d2d48123927594c) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: increase accessibility of auth page components

  add `htmlFor` to `label` elements to associate them with their inputs

## 4.18.1

### Patch Changes

- [#4446](https://github.com/refinedev/refine/pull/4446) [`5936d9cd4d4`](https://github.com/refinedev/refine/commit/5936d9cd4d451e50c922b0a81d2d48123927594c) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: increase accessibility of auth page components

  add `htmlFor` to `label` elements to associate them with their inputs

## 4.18.0

### Minor Changes

- [#4430](https://github.com/refinedev/refine/pull/4430) [`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527) Thanks [@aliemir](https://github.com/aliemir)! - Added `queryMeta` and `mutationMeta` properties to the `useForm` hook. These properties are used to pass specific meta values to the query or mutation. This is useful when you have overlapping values in your data provider's `getOne` and `update` methods. For example, you may want to change the `method` of the mutation to `PATCH` but if you pass it in the `meta` property, you'll end up changing the method of the `getOne` request as well.

  `queryMeta` and `mutationMeta` has precedence over `meta`. This means that if you have the same property in `queryMeta` and `meta`, the value in `queryMeta` will be used.

  **Usage**

  ```tsx
  import { useForm } from "@refinedev/core";

  export const MyEditPage = () => {
    const form = useForm({
      // this is passed both to the mutation and the query requests
      meta: {
        myValue: "myValue",
      },
      // this is only passed to the query request
      queryMeta: {
        propertyOnlyWorksForQuery: "propertyOnlyWorksForQuery",
      },
      // this is only passed to the mutation request
      mutationMeta: {
        propertyOnlyWorksForMutation: "propertyOnlyWorksForMutation",
      },
    });
  };
  ```

### Patch Changes

- [#4430](https://github.com/refinedev/refine/pull/4430) [`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527) Thanks [@aliemir](https://github.com/aliemir)! - Fix missing `meta` values in `useForm` redirects after submission.

- [#4431](https://github.com/refinedev/refine/pull/4431) [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f) Thanks [@aliemir](https://github.com/aliemir)! - Updated the TSDoc comments to fix the broken links in the documentation.

- [#4426](https://github.com/refinedev/refine/pull/4426) [`0602f4cdf1c`](https://github.com/refinedev/refine/commit/0602f4cdf1c38f2b9dea8a293680a1872f4a448d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `resource` parameter in the `legacyResourceTransform` helper is not optional but used as optional

## 4.17.0

### Minor Changes

- [#4430](https://github.com/refinedev/refine/pull/4430) [`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527) Thanks [@aliemir](https://github.com/aliemir)! - Added `queryMeta` and `mutationMeta` properties to the `useForm` hook. These properties are used to pass specific meta values to the query or mutation. This is useful when you have overlapping values in your data provider's `getOne` and `update` methods. For example, you may want to change the `method` of the mutation to `PATCH` but if you pass it in the `meta` property, you'll end up changing the method of the `getOne` request as well.

  `queryMeta` and `mutationMeta` has precedence over `meta`. This means that if you have the same property in `queryMeta` and `meta`, the value in `queryMeta` will be used.

  **Usage**

  ```tsx
  import { useForm } from "@refinedev/core";

  export const MyEditPage = () => {
    const form = useForm({
      // this is passed both to the mutation and the query requests
      meta: {
        myValue: "myValue",
      },
      // this is only passed to the query request
      queryMeta: {
        propertyOnlyWorksForQuery: "propertyOnlyWorksForQuery",
      },
      // this is only passed to the mutation request
      mutationMeta: {
        propertyOnlyWorksForMutation: "propertyOnlyWorksForMutation",
      },
    });
  };
  ```

### Patch Changes

- [#4430](https://github.com/refinedev/refine/pull/4430) [`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527) Thanks [@aliemir](https://github.com/aliemir)! - Fix missing `meta` values in `useForm` redirects after submission.

- [#4431](https://github.com/refinedev/refine/pull/4431) [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f) Thanks [@aliemir](https://github.com/aliemir)! - Updated the TSDoc comments to fix the broken links in the documentation.

- [#4426](https://github.com/refinedev/refine/pull/4426) [`0602f4cdf1c`](https://github.com/refinedev/refine/commit/0602f4cdf1c38f2b9dea8a293680a1872f4a448d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `resource` parameter in the `legacyResourceTransform` helper is not optional but used as optional

## 4.16.4

### Patch Changes

- [#4415](https://github.com/refinedev/refine/pull/4415) [`54837825fcc`](https://github.com/refinedev/refine/commit/54837825fccb180e84c988ea669f0cc595e4ed33) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `queryOptions` not working as expected in `useSelect` hook.

## 4.16.3

### Patch Changes

- [#4415](https://github.com/refinedev/refine/pull/4415) [`54837825fcc`](https://github.com/refinedev/refine/commit/54837825fccb180e84c988ea669f0cc595e4ed33) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `queryOptions` not working as expected in `useSelect` hook.

## 4.16.2

### Patch Changes

- [#4407](https://github.com/refinedev/refine/pull/4407) [`473bbe5b31d`](https://github.com/refinedev/refine/commit/473bbe5b31de91f338733aeb34571dba8e44e389) Thanks [@aliemir](https://github.com/aliemir)! - Added missing `clone` action for document title generation. This fixes the issue of the document title not being generated when the `clone` action is used.

  This change introduces the `documentTitle.{resourceName}.clone` key to the list of `i18n` keys that are used to generate the document title.

  Default title for the `clone` action is `"#{{id}} Clone {{resourceName}} | refine"`.

- [#4407](https://github.com/refinedev/refine/pull/4407) [`473bbe5b31d`](https://github.com/refinedev/refine/commit/473bbe5b31de91f338733aeb34571dba8e44e389) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue of `label` not taken into account with auto generated document titles. `label` will be prioritized over the resource name when generating the document title and the `label` will not be capitalized.

## 4.16.1

### Patch Changes

- [#4407](https://github.com/refinedev/refine/pull/4407) [`473bbe5b31d`](https://github.com/refinedev/refine/commit/473bbe5b31de91f338733aeb34571dba8e44e389) Thanks [@aliemir](https://github.com/aliemir)! - Added missing `clone` action for document title generation. This fixes the issue of the document title not being generated when the `clone` action is used.

  This change introduces the `documentTitle.{resourceName}.clone` key to the list of `i18n` keys that are used to generate the document title.

  Default title for the `clone` action is `"#{{id}} Clone {{resourceName}} | refine"`.

- [#4407](https://github.com/refinedev/refine/pull/4407) [`473bbe5b31d`](https://github.com/refinedev/refine/commit/473bbe5b31de91f338733aeb34571dba8e44e389) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue of `label` not taken into account with auto generated document titles. `label` will be prioritized over the resource name when generating the document title and the `label` will not be capitalized.

## 4.16.0

### Minor Changes

- [#4313](https://github.com/refinedev/refine/pull/4313) [`28fe67047a0`](https://github.com/refinedev/refine/commit/28fe67047a084dff37fbdbee6a132f85f9413657) Thanks [@abdellah711](https://github.com/abdellah711)! - feat: implement `generateDefaultDocumentTitle` function

  This function generates a default document title based on the current route by following these rules (`resource` in this case is "Post"):

  - list -> `Posts | refine`
  - edit -> `#{id} Edit Post | refine`
  - show -> `#{id} Show Post | refine`
  - create -> `Create new Post | refine`
  - default (not a `resource`) -> `refine`

### Patch Changes

- [#4381](https://github.com/refinedev/refine/pull/4381) [`500cf2becc2`](https://github.com/refinedev/refine/commit/500cf2becc242e01d93a5576957f003851190873) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: export `TranslationContext`

## 4.15.0

### Minor Changes

- [#4313](https://github.com/refinedev/refine/pull/4313) [`28fe67047a0`](https://github.com/refinedev/refine/commit/28fe67047a084dff37fbdbee6a132f85f9413657) Thanks [@abdellah711](https://github.com/abdellah711)! - feat: implement `generateDefaultDocumentTitle` function

  This function generates a default document title based on the current route by following these rules (`resource` in this case is "Post"):

  - list -> `Posts | refine`
  - edit -> `#{id} Edit Post | refine`
  - show -> `#{id} Show Post | refine`
  - create -> `Create new Post | refine`
  - default (not a `resource`) -> `refine`

### Patch Changes

- [#4381](https://github.com/refinedev/refine/pull/4381) [`500cf2becc2`](https://github.com/refinedev/refine/commit/500cf2becc242e01d93a5576957f003851190873) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: export `TranslationContext`

## 4.14.3

### Patch Changes

- [#4279](https://github.com/refinedev/refine/pull/4279) [`3e4c977b8d3`](https://github.com/refinedev/refine/commit/3e4c977b8d3cbe17f4f460f22204c3880a40bb13) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: queryKey method params for `useDelete`, `useDeleteMany` and`useUpdate` hooks

## 4.14.2

### Patch Changes

- [#4279](https://github.com/refinedev/refine/pull/4279) [`3e4c977b8d3`](https://github.com/refinedev/refine/commit/3e4c977b8d3cbe17f4f460f22204c3880a40bb13) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: queryKey method params for `useDelete`, `useDeleteMany` and`useUpdate` hooks

## 4.14.1

### Patch Changes

- [#4279](https://github.com/refinedev/refine/pull/4279) [`3e4c977b8d3`](https://github.com/refinedev/refine/commit/3e4c977b8d3cbe17f4f460f22204c3880a40bb13) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: queryKey method params for `useDelete`, `useDeleteMany` and`useUpdate` hooks

## 4.14.0

### Minor Changes

- [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

  ```ts
  import { useForm } from "@refinedev/core";

  useForm<TQueryFnData, TError, TVariables, TData, TResponse, TResponseError>();
  ```

## 4.13.0

### Minor Changes

- [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

  ```ts
  import { useForm } from "@refinedev/core";

  useForm<TQueryFnData, TError, TVariables, TData, TResponse, TResponseError>();
  ```

## 4.12.0

### Minor Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

  - **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
  - **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

  feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

  - **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
  - **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

### Patch Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `filters`, `sorters`, `current`, and, `pageSize` removed from `useMeta` returned object.

## 4.11.0

### Minor Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

  - **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
  - **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

  feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

  - **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
  - **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

### Patch Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `filters`, `sorters`, `current`, and, `pageSize` removed from `useMeta` returned object.

## 4.10.0

### Minor Changes

- [#4135](https://github.com/refinedev/refine/pull/4135) [`e72c0d2b41f`](https://github.com/refinedev/refine/commit/e72c0d2b41ffcd9d5853e0d912a31cb88fab9841) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: Expose the query params to the `meta` and add the ability to pass global `meta` to data provider methods

  - Added the ability to pass `meta` to data provider methods globally for specific resources.

    For example, to pass the `role` property to all data provider methods for the `posts` resource, use the following code:

    ```tsx
    import { Refine } from "@refinedev/core";

    const App: React.FC = () => {
      return (
        <Refine
          resources={[
            {
              name: "posts",
              meta: {
                role: "editor",
              },
            },
          ]}
        />
      );
    };
    ```

    Now, when you call any data hook with the `posts` resource, the `meta` property will be accessible in the data provider methods.

    ```tsx
    const dataProvider = {
      getList: async ({ resource, meta }) => {
        console.log(meta.role); // "editor"
      },
    };
    ```

  - Added the query params to the `meta` property by default.

    For example, if you call the `useList` hook on the `example.com/posts?status=published` URL, the `meta` property will be accessible in the data provider methods as follows:

    ```tsx
    const dataProvider = {
      getList: async ({ resource, meta }) => {
        console.log(meta.status); // "published"
      },
    };
    ```

### Patch Changes

- [#4159](https://github.com/refinedev/refine/pull/4159) [`f7f590589e7`](https://github.com/refinedev/refine/commit/f7f590589e78a255f2ce292311c6bae765b9de8f) Thanks [@aliemir](https://github.com/aliemir)! - fixed: missing resource meta in route compositions

  Added missing resource meta values when composing routes. This fixes the bug where the resource meta values does not included in the route composition.

## 4.9.0

### Minor Changes

- [#4135](https://github.com/refinedev/refine/pull/4135) [`e72c0d2b41f`](https://github.com/refinedev/refine/commit/e72c0d2b41ffcd9d5853e0d912a31cb88fab9841) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: Expose the query params to the `meta` and add the ability to pass global `meta` to data provider methods

  - Added the ability to pass `meta` to data provider methods globally for specific resources.

    For example, to pass the `role` property to all data provider methods for the `posts` resource, use the following code:

    ```tsx
    import { Refine } from "@refinedev/core";

    const App: React.FC = () => {
      return (
        <Refine
          resources={[
            {
              name: "posts",
              meta: {
                role: "editor",
              },
            },
          ]}
        />
      );
    };
    ```

    Now, when you call any data hook with the `posts` resource, the `meta` property will be accessible in the data provider methods.

    ```tsx
    const dataProvider = {
      getList: async ({ resource, meta }) => {
        console.log(meta.role); // "editor"
      },
    };
    ```

  - Added the query params to the `meta` property by default.

    For example, if you call the `useList` hook on the `example.com/posts?status=published` URL, the `meta` property will be accessible in the data provider methods as follows:

    ```tsx
    const dataProvider = {
      getList: async ({ resource, meta }) => {
        console.log(meta.status); // "published"
      },
    };
    ```

### Patch Changes

- [#4159](https://github.com/refinedev/refine/pull/4159) [`f7f590589e7`](https://github.com/refinedev/refine/commit/f7f590589e78a255f2ce292311c6bae765b9de8f) Thanks [@aliemir](https://github.com/aliemir)! - fixed: missing resource meta in route compositions

  Added missing resource meta values when composing routes. This fixes the bug where the resource meta values does not included in the route composition.

## 4.8.5

### Patch Changes

- [#4139](https://github.com/refinedev/refine/pull/4139) [`e4c60056a4d`](https://github.com/refinedev/refine/commit/e4c60056a4d0d43b5e1e6130febcf77e3263669d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: incorrect css syntax on gh-banner

## 4.8.4

### Patch Changes

- [#4139](https://github.com/refinedev/refine/pull/4139) [`e4c60056a4d`](https://github.com/refinedev/refine/commit/e4c60056a4d0d43b5e1e6130febcf77e3263669d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: incorrect css syntax on gh-banner

## 4.8.3

### Patch Changes

- [#4139](https://github.com/refinedev/refine/pull/4139) [`e4c60056a4d`](https://github.com/refinedev/refine/commit/e4c60056a4d0d43b5e1e6130febcf77e3263669d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: incorrect css syntax on gh-banner

## 4.8.2

### Patch Changes

- [#4133](https://github.com/refinedev/refine/pull/4133) [`68f035dc4c0`](https://github.com/refinedev/refine/commit/68f035dc4c0a28848480e088e6e8970ae08c5a55) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: Hide `<GithubBanner />` on mobile.

## 4.8.1

### Patch Changes

- [#4133](https://github.com/refinedev/refine/pull/4133) [`68f035dc4c0`](https://github.com/refinedev/refine/commit/68f035dc4c0a28848480e088e6e8970ae08c5a55) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: Hide `<GithubBanner />` on mobile.

## 4.8.0

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

- [#4129](https://github.com/refinedev/refine/pull/4129) [`e64ffe999b3`](https://github.com/refinedev/refine/commit/e64ffe999b30649bf5161d876a21b7bd2efc0658) Thanks [@aliemir](https://github.com/aliemir)! - Added the missing connection between the data provider's and the `useMany` hook's `meta` property.

- [#4113](https://github.com/refinedev/refine/pull/4113) [`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the generic type name of hooks that use `useQuery` to synchronize generic type names with `tanstack-query`.

## 4.7.2

### Patch Changes

- [#4102](https://github.com/refinedev/refine/pull/4102) [`44e403aa654`](https://github.com/refinedev/refine/commit/44e403aa654b733d2f9210faef5670752e60a3f3) Thanks [@aliemir](https://github.com/aliemir)! - Revert changes in `<GithubBanner />` to promote github stars.

## 4.7.1

### Patch Changes

- [#4102](https://github.com/refinedev/refine/pull/4102) [`44e403aa654`](https://github.com/refinedev/refine/commit/44e403aa654b733d2f9210faef5670752e60a3f3) Thanks [@aliemir](https://github.com/aliemir)! - Revert changes in `<GithubBanner />` to promote github stars.

## 4.7.0

### Minor Changes

- [#4040](https://github.com/refinedev/refine/pull/4040) [`8a1100cf9ed`](https://github.com/refinedev/refine/commit/8a1100cf9ed46228c5f169a013c223d46dc675af) Thanks [@aliemir](https://github.com/aliemir)! - Add a generic type to `useParse` and `useParsed` for type-safe additional params.

### Patch Changes

- [#4089](https://github.com/refinedev/refine/pull/4089) [`65f2a9fa223`](https://github.com/refinedev/refine/commit/65f2a9fa223b0ec66b2c756b10116a1295a595ec) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Update Github banner to Product Hunt banner for temporary.

## 4.6.0

### Minor Changes

- [#4040](https://github.com/refinedev/refine/pull/4040) [`8a1100cf9ed`](https://github.com/refinedev/refine/commit/8a1100cf9ed46228c5f169a013c223d46dc675af) Thanks [@aliemir](https://github.com/aliemir)! - Add a generic type to `useParse` and `useParsed` for type-safe additional params.

### Patch Changes

- [#4089](https://github.com/refinedev/refine/pull/4089) [`65f2a9fa223`](https://github.com/refinedev/refine/commit/65f2a9fa223b0ec66b2c756b10116a1295a595ec) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Update Github banner to Product Hunt banner for temporary.

## 4.5.10

### Patch Changes

- [#4035](https://github.com/refinedev/refine/pull/4035) [`e0c75450f97`](https://github.com/refinedev/refine/commit/e0c75450f970878fea0ace7db63548c7ba1a1688) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add types for notification methods arguments based on given generic types.

- [#4071](https://github.com/refinedev/refine/pull/4071) [`98cd4b0f203`](https://github.com/refinedev/refine/commit/98cd4b0f203460d5c59f0153663b5296ac57612b) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Update `authBindings` error type to provide changeable error messages on notifcations.

  Example for `login` method:

  ```ts
  import { AuthBindings } from "@refinedev/core";

  const authProvider: AuthBindings = {
      login: async ({ email, password }) => {
          ...
          return {
              success: false,
              error: {
                  message: "Login Failed!",
                  name:
                      "The email or password that you've entered doesn't match any account.",
              },
          };
      },
      ...
  };
  ```

## 4.5.9

### Patch Changes

- [#4035](https://github.com/refinedev/refine/pull/4035) [`e0c75450f97`](https://github.com/refinedev/refine/commit/e0c75450f970878fea0ace7db63548c7ba1a1688) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add types for notification methods arguments based on given generic types.

- [#4071](https://github.com/refinedev/refine/pull/4071) [`98cd4b0f203`](https://github.com/refinedev/refine/commit/98cd4b0f203460d5c59f0153663b5296ac57612b) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Update `authBindings` error type to provide changeable error messages on notifcations.

  Example for `login` method:

  ```ts
  import { AuthBindings } from "@refinedev/core";

  const authProvider: AuthBindings = {
      login: async ({ email, password }) => {
          ...
          return {
              success: false,
              error: {
                  message: "Login Failed!",
                  name:
                      "The email or password that you've entered doesn't match any account.",
              },
          };
      },
      ...
  };
  ```

## 4.5.8

### Patch Changes

- [#4014](https://github.com/refinedev/refine/pull/4014) [`3db450fade0`](https://github.com/refinedev/refine/commit/3db450fade0300c3da0e1853bf686778a70603f6) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add console warning for `useForm` and `useShow` hooks when custom resource is provided and `id` prop is not passed.

## 4.5.7

### Patch Changes

- [#4014](https://github.com/refinedev/refine/pull/4014) [`3db450fade0`](https://github.com/refinedev/refine/commit/3db450fade0300c3da0e1853bf686778a70603f6) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add console warning for `useForm` and `useShow` hooks when custom resource is provided and `id` prop is not passed.

## 4.5.6

### Patch Changes

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the design of the `WelcomePage` component.

## 4.5.5

### Patch Changes

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the design of the `WelcomePage` component.

## 4.5.4

### Patch Changes

- [#3987](https://github.com/refinedev/refine/pull/3987) [`d7d68e3ff68`](https://github.com/refinedev/refine/commit/d7d68e3ff686dece9f58e53e02076f0ecbd91010) Thanks [@aliemir](https://github.com/aliemir)! - Watch for `id` changes in `useForm` hook.

## 4.5.3

### Patch Changes

- [#3987](https://github.com/refinedev/refine/pull/3987) [`d7d68e3ff68`](https://github.com/refinedev/refine/commit/d7d68e3ff686dece9f58e53e02076f0ecbd91010) Thanks [@aliemir](https://github.com/aliemir)! - Watch for `id` changes in `useForm` hook.

## 4.5.2

### Patch Changes

- [#3911](https://github.com/refinedev/refine/pull/3911) [`5f9c70ebf2f`](https://github.com/refinedev/refine/commit/5f9c70ebf2faeea21eef97286ae7391bb77abfa9) Thanks [@salihozdemir](https://github.com/salihozdemir)! - In forms that use `useForm`, the `onFinish` was resetting the current `id` to `undefined` when the mutation is successful. Now, the `id` will not be set to `undefined`.

## 4.5.1

### Patch Changes

- [#3911](https://github.com/refinedev/refine/pull/3911) [`5f9c70ebf2f`](https://github.com/refinedev/refine/commit/5f9c70ebf2faeea21eef97286ae7391bb77abfa9) Thanks [@salihozdemir](https://github.com/salihozdemir)! - In forms that use `useForm`, the `onFinish` was resetting the current `id` to `undefined` when the mutation is successful. Now, the `id` will not be set to `undefined`.

## 4.5.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.
  - `title` prop added to `AuthPage` to render a custom title.
    - ⚠️ These features have not been implemented yet. Only types were added. It will be implemented in the next release.

## 4.4.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.
  - `title` prop added to `AuthPage` to render a custom title.
    - ⚠️ These features have not been implemented yet. Only types were added. It will be implemented in the next release.

## 4.3.0

### Minor Changes

- [#3892](https://github.com/refinedev/refine/pull/3892) [`41a4525454c`](https://github.com/refinedev/refine/commit/41a4525454cfa145c02aada1e01217260852b06e) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: make CanAccess component props optional. Now CanAccess component infers resource and action automagically.

## 4.2.0

### Minor Changes

- [#3892](https://github.com/refinedev/refine/pull/3892) [`41a4525454c`](https://github.com/refinedev/refine/commit/41a4525454cfa145c02aada1e01217260852b06e) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: make CanAccess component props optional. Now CanAccess component infers resource and action automagically.

## 4.1.6

### Patch Changes

- [#3890](https://github.com/refinedev/refine/pull/3890) [`db12d60095f`](https://github.com/refinedev/refine/commit/db12d60095fbc200afca511d090f7b327cfc7a65) Thanks [@aliemir](https://github.com/aliemir)! - - Fixed layout flickering on authenticated routes.
  - Fixed repeated navigations issue on routes with `<Authenticated>` component.
  - Fixed conflicting navigation paths with `authProvider` methods and `<Authenticated>` component.

## 4.1.5

### Patch Changes

- [#3890](https://github.com/refinedev/refine/pull/3890) [`db12d60095f`](https://github.com/refinedev/refine/commit/db12d60095fbc200afca511d090f7b327cfc7a65) Thanks [@aliemir](https://github.com/aliemir)! - - Fixed layout flickering on authenticated routes.
  - Fixed repeated navigations issue on routes with `<Authenticated>` component.
  - Fixed conflicting navigation paths with `authProvider` methods and `<Authenticated>` component.

## 4.1.4

### Patch Changes

- [#3884](https://github.com/refinedev/refine/pull/3884) [`c507c10c351`](https://github.com/refinedev/refine/commit/c507c10c351447f8af0ae212a88642bf3d63e8ca) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: resource's icon parameter sanitized on useCan hook

- [#3883](https://github.com/refinedev/refine/pull/3883) [`64b8292c5e8`](https://github.com/refinedev/refine/commit/64b8292c5e81decfb6b849d9a8f69b9d8c9698f8) Thanks [@omeraplak](https://github.com/omeraplak)! - feat: add custom query key support for useCustom hook

## 4.1.3

### Patch Changes

- [#3884](https://github.com/refinedev/refine/pull/3884) [`c507c10c351`](https://github.com/refinedev/refine/commit/c507c10c351447f8af0ae212a88642bf3d63e8ca) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: resource's icon parameter sanitized on useCan hook

- [#3883](https://github.com/refinedev/refine/pull/3883) [`64b8292c5e8`](https://github.com/refinedev/refine/commit/64b8292c5e81decfb6b849d9a8f69b9d8c9698f8) Thanks [@omeraplak](https://github.com/omeraplak)! - feat: add custom query key support for useCustom hook

## 4.1.2

### Patch Changes

- [#3874](https://github.com/refinedev/refine/pull/3874) [`5ed083a8050`](https://github.com/refinedev/refine/commit/5ed083a805082f2c24c3afe0eb285c8f8485e3df) Thanks [@aliemir](https://github.com/aliemir)! - Add fallback option for `label` from `meta` and `options`.

## 4.1.1

### Patch Changes

- [#3874](https://github.com/refinedev/refine/pull/3874) [`5ed083a8050`](https://github.com/refinedev/refine/commit/5ed083a805082f2c24c3afe0eb285c8f8485e3df) Thanks [@aliemir](https://github.com/aliemir)! - Add fallback option for `label` from `meta` and `options`.

## 4.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  ## 🪄 Migrating your project automatically with refine-codemod ✨

  [`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

  Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

  ```sh
  npx @refinedev/codemod@latest refine3-to-refine4
  ```

  And it's done. Now your project uses `refine@4.x.x`.

  ## 📝 Changelog

  We're releasing a new way to connect routers to **refine**. Now the `routerProvider` prop is marked as optional in `<Refine>` component.

  New `routerProvider` property is smaller and more flexible than the previous one which is now can be used with `legacyRouterProvider` property.

  We've redesigned our bindings to the router libraries. Instead of handling the route creation process, now **refine** leaves this to the user and only uses a way to communicate with the router and the routes through the bindings provided to `routerProvider` property.

  The changes in routing system comes with a new way to define resource actions as well. Actions now can be defined as paths, components or both. We're encouraging our users to use paths, which enables our users to use all the optimizations that the router libraries provide without giving up any features of **refine**.

  Router libraries are also comes with components like `RefineRoutes` which can be used to define routes for resources when you pass components to the actions of the resources. Please refer to the documentation for more information.

  ## Changes in `resources`

  Now you can define actions in multiple ways;

  1. As a path

  ```tsx
  <Refine
    resources={[
      {
        name: "posts",
        list: "/posts",
      },
    ]}
  >
    ...
  </Refine>
  ```

  2. As a component

  ```tsx
  import { PostList } from "src/posts";

  <Refine
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  >
    ...
  </Refine>;
  ```

  3. As both

  ```tsx
  import { PostList } from "src/posts";

  <Refine
    resources={[
      {
        name: "posts",
        list: {
          path: "/posts",
          component: PostList,
        },
      },
    ]}
  >
    ...
  </Refine>;
  ```

  This also comes with some additional changes;

  - `options` property is renamed to `meta` for consistency.
  - `parentName` is now defined with `parent` property in `meta` object.
  - `auditLog` is renamed to `audit`.
  - `route` in `options` is now deprecated for the new routing system. If you want to define a custom route for a resource, you can define such routes in action definitions.
  - Parents are not included in the routes by default. If you want to inclue parents in the routes, you need to define action paths explicitly.
  - `identifier` can be passed to the resource definition to distinguish between resources with the same name. This is useful when you have multiple resources with the same name.

  ### Nested routes

  Now, **refine** supports nested routes with parameters. You can define the action paths for a resource with parameters. Parameters will be filled with the current ones in the URL and additional ones can be provided via `meta` properties in hooks and components.

  ```tsx
  <Refine
      resources={[
          {
              name: "posts",
              list: "users/:authorId/posts",
              show: "users/:authorId/posts/:id",
          },
      ]}
  >
  ```

  When you're in the `list` page of the `posts` resource, assuming you already have the `authorId` parameter present in the URL, the `show` action will be rendered with the `authorId` parameter filled with the current one in the URL. If you want to use a different `authorId`, you can pass `meta` properties to the components or hooks, such as `useGetToPath` hook to get the navigation path.

  ```tsx
  const { go } = useGo();
  const getToPath = useGetToPath();

  const to = getToPath({
    resource: "posts",
    action: "show",
    meta: {
      id: 1,
      authorId: 2,
    },
  });
  // "to" will be "/users/2/posts/1"

  go({ to, type: "push" });
  ```

  ## Changes in `routerProvider`

  `routerProvider` is now smaller and more flexible. It only contains the following properties;

  - `Link`: A component that accepts `to` prop and renders a link to the given path.
  - `go`: A function that returns a function that accepts a config object and navigates to the given path.
  - `back`: A function that returns a function that navigates back to the previous page.
  - `parse`: A function that returns a function that returns the `resource`, `id`, `action` and additional `params` from the given path. This is the **refine**'s way to communicate with the router library.

  None of the properties are required. Missing properties may result in some features not working but it won't break **refine**.

  Our users are able to provide different implementations for the router bindings, such as handling the search params in the path with a different way or customizing the navigation process.

  **Note**: Existing `routerProvider` implementation is preserved as `legacyRouterProvider` and will continue working as before. We're planning to remove it in the next major version.

  **Note**: New routing system do not handle the authentication process. You can now wrap your components with `Authenticated` component or handle the authentication check inside your components through `useIsAuthenticated` hook to provide more flexible auth concepts in your app.

  ## Changes in hooks

  We're now providing new hooks for the new routing system. You're free to use them or use the ones provided by your router library.

  - `useGo`
  - `useBack`
  - `useParsed`
  - `useLink`
  - `useGetToPath`

  are provided by **refine** to use the properties of `routerProvider` in a more convenient way.

  - `useResourceWithRoute` is now deprecated and only works with the legacy routing system.
  - `useResource` has changed its definition and now accepts a single argument which is the `resource` name. It returns the `resource` object depending on the current route or the given `resource` name. If `resource` is provided but not found, it will create a temporary one to use with the given `resource` name.
  - `useNavigation`'s functions in its return value are now accepting `meta` object as an argument. This can be used to provide parameters to the target routes. For example, if your path for the `edit` action of a resource is `/:userId/posts/:id/edit`, you can provide `userId` parameter in `meta` object and it will be used in the path.
  - Hooks using routes, redirection etc. are now accepts `meta` property in their arguments. This can be used to provide parameters to the target routes. This change includes `useMenu` and `useBreadcrumb` which are creating paths to the resources for their purposes.
  - `selectedKey` in `useMenu` hook's return type now can be `undefined` if the current route is not found in the menu items.

  ## `warnWhenUnsavedChanges` prop

  In earlier versions, **refine** was handling this feature in `beforeunload` event. This was causing unintended dependencies to the `window` and was not customizable. Now, **refine** is leaving this to the router libraries. Router packages `@refinedev/react-router-v6`, `@refinedev/nextjs-router` and `@refinedev/remix-router` are now exporting a component `UnsavedChangesNotifier` which can be placed under the `<Refine>` component and registers a listener to the necessary events to handle the `warnWhenUnsavedChanges` feature.

  ## Changes in `Authenticated` component.

  `<Authenticated>` component now accepts `redirectOnFail` to override the redirection path on authentication failure. This can be used to redirect to a different page when the user is not authenticated. This property only works if the `fallback` prop is not provided.

  `redirectOnFail` also respects the newly introduced `appendCurrentPathToQuery` prop which can be used to append the current path to the query string of the redirection path. This can be used to redirect the user to the page they were trying to access after they logged in.

  ## Changes in `<Refine>`

  We've removed the long deprecated props from `<Refine />` component and deprecated some more to encourage users to use the new routing system.

  In earlier versions, we've accepted layout related props such as `Layout`, `Sider`, `Header`, `Footer`, `OffLayoutArea` and `Title`. All these props were used in the route creation process while wrapping the components to the `Layout` and others were passed to the `Layout` for configuration. Now, we've deprecated these props and we're encouraging users to use `Layout` prop and its props in the `children` of `<Refine />` component. This will allow users to customize the layout easily and provide custom layouts per route.

  We've also deprecated the route related props such as;

  - `catchAll`, which was used in rendering 404 pages and was unclear to the user when its going to be rendered in the app.
  - `LoginPage`, which was rendered at `/login` path and was not customizable enough.
  - `DashboardPage`, which wass rendered at `/` path and was limiting our users to handle the index page just with a single prop.
  - `ReadyPage`, which was shown when `<Refine>` had no resources defined. Now, we're accepting empty resources array and rendering nothing in this case.

  We're encouraging our users to create their own routes for the above props and give them the flexibility to use the full potential of the router library they're using.

  ## Integration with existing apps

  We've made the changes to the routing system, the resource definitions and some additional changes to make the integration with existing apps possible.

  Now you can migrate your existing apps to **refine** with ease and incrementally adopt **refine**'s features.

  ## Backward compatibility

  We've made all the changes in a backward compatible way. You can continue using the old routing system and the old props of `<Refine />` component. Migrating to the new behaviors are optional but encouraged.

  We're planning to keep the support for the deprecated props and the old behaviors until the next major version.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added [audit log](https://refine.dev/docs/api-reference/core/providers/audit-log-provider/) support for the following hooks:

  - [`useCreateMany`](https://refine.dev/docs/api-reference/core/hooks/data/useCreateMany/)
  - [`useDeleteMany`](<(https://refine.dev/docs/api-reference/core/hooks/data/useDeleteMany/)>)
  - [`useUpdateMany`](<(https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/)>)

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added a helper function to pick not deprecated value. Gives priority according to the order of the arguments.

  ```ts
  const sorter = undefined;
  const sorters = [{ id: 1 }];

  const value = pickNotDeprecated(sorter, sorters) ?? 10; // [{ id: 1 }]
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  ## `useList` hook

  - Added default value for `pagination.current` property. It is set to **1**.
  - Added default value for `pagination.pageSize` property. It is set to **10**.
  - Added `pagination.mode` property. By default, it is "server".
    - When it is "off", all records will be fetched from the API.
    - When it is "client", all records will be fetched from the API and pagination will be handled by the `useList` hook.
    - When it is "server", pagination will be handled by the API using `current` and `pageSize` properties of your `pagination` object.

  ## `useTable` hook

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
    -    hasPagination,
    +    pagination: {
    +        mode: "off" | "server" | "client",
    +    },
    })
    ```

  - `initialSorter` and `permanentSorter` props are now deprecated. Use `sorters.initial` and `sorters.permanent` instead.
  - To ensure backward compatibility, `initialSorter` and `permanentSorter` props will work as before.

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

  - `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are now deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.
  - To ensure backward compatibility, `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props will work as before.

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

  - `sorter` and `setSorter` return values are now deprecated. Use `sorters` and `setSorters` instead.
  - To ensure backward compatibility, `sorter` and `setSorter` return values will work as before.

    ```diff
    const {
    -   sorter,
    +   sorters,
    -   setSorter,
    +   setSorters,
    } = useTable();
    ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  All `@tanstack/react-query` imports re-exported from `@refinedev/core` have been removed. You should import them from `@tanstack/react-query` package directly.

  If the package is not installed, you can install it with your package manager:

  ```bash
  npm install @tanstack/react-query
  # or
  pnpm add @tanstack/react-query
  # or
  yarn add @tanstack/react-query
  ```

  After that, you can import them from `@tanstack/react-query` package directly instead of `@refinedev/core` package.

  ```diff
  - import { QueryClient } from "@refinedev/core";

  + import { QueryClient } from "@tanstack/react-query";
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `options` prop of resource is now deprecated. Use `meta` prop instead.
  - To ensure backward compatibility, `options` prop will be used if `meta` prop is not provided.

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

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `AuthProvider` deprecated and renamed to `LegacyAuthProvider`.
  - `legacyAuthProvider` prop is added to `<Refine>` component for backward compatibility.
  - `legacy` prop added to auth hooks support `AuthProvider` and `LegacyAuthProvider`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `<ReadyPage>` isnow deprecated.
  - Created a `<WelcomePage>` component to welcome users.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `useList` and `useInfiniteList`'s `config` prop is now deprecated. Use `sorters`, `filters`, `pagination` and `hasPagination` props instead.

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
  +    pagination,
  +    hasPagination,
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
  +    pagination,
  +    hasPagination,
  })
  ```

  - `useImport` and `useExport`'s `resourceName` prop is now deprecated. Use `resource` prop instead.

  ```diff
  useImport({
  -    resourceName,
  +    resource,
  })

  useExport({
  -    resourceName,
  +    resource,
  })
  ```

  - `useExport`'s `sorter` prop is now deprecated. Use `sorters` prop instead.

  ```diff
  useExport({
  -    sorter,
  +    sorters,
  })
  ```

  - `useSelect`'s `sort` prop is now deprecated. Use `sorters` prop instead.

  ```diff
  useSelect({
  -    sort,
  +    sorters,
  })
  ```

  - `useSelect`'s `config.sort` prop is now deprecated. Use `config.sorters` prop instead.

  ```diff
  useCustom({
      config: {
  -       sort,
  +       sorters,
      }
  })
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `hasPagination` default value set to `false` on `useSelect`. So all of the records will be fetched by default.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Updated `useSelect` hook to support `optionLabel` and `optionValue` type as `keyof TData` instead of `string`.

  So `optionLabel` and `optionValue` have an interface based on the given `TData` type.

  ```diff
  - optionLabel?: string;
  - optionValue?: string;
  + optionLabel?: keyof TData extends string ? keyof TData : never;
  + optionValue?: keyof TData extends string ? keyof TData : never;
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 3.103.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.102.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.101.2

### Patch Changes

- [#3768](https://github.com/refinedev/refine/pull/3768) [`38eb18ab795`](https://github.com/refinedev/refine/commit/38eb18ab7950d231bce8d25f930f199a35315cfe) Thanks [@BatuhanW](https://github.com/BatuhanW)! - Update URL for GitHubBanner component

## 3.101.1

### Patch Changes

- [#3768](https://github.com/refinedev/refine/pull/3768) [`38eb18ab795`](https://github.com/refinedev/refine/commit/38eb18ab7950d231bce8d25f930f199a35315cfe) Thanks [@BatuhanW](https://github.com/BatuhanW)! - Update URL for GitHubBanner component

## 3.101.0

### Minor Changes

- [#3716](https://github.com/refinedev/refine/pull/3716) [`03177f8aa06`](https://github.com/refinedev/refine/commit/03177f8aa0619f966e06461a273bd24ef89539cf) Thanks [@BatuhanW](https://github.com/BatuhanW)! - Added GitHubBanner component.

## 3.100.0

### Minor Changes

- [#3716](https://github.com/refinedev/refine/pull/3716) [`03177f8aa06`](https://github.com/refinedev/refine/commit/03177f8aa0619f966e06461a273bd24ef89539cf) Thanks [@BatuhanW](https://github.com/BatuhanW)! - Added GitHubBanner component.

## 3.99.6

### Patch Changes

- [#3657](https://github.com/refinedev/refine/pull/3657) [`5868456194f`](https://github.com/refinedev/refine/commit/5868456194f8e4a75dd29bb93aad27d57dc8df32) Thanks [@fuunnx](https://github.com/fuunnx)! - Fix optimistic updates of list's query data following a mutation using `useUpdate`

## 3.99.5

### Patch Changes

- [#3657](https://github.com/refinedev/refine/pull/3657) [`5868456194f`](https://github.com/refinedev/refine/commit/5868456194f8e4a75dd29bb93aad27d57dc8df32) Thanks [@fuunnx](https://github.com/fuunnx)! - Fix optimistic updates of list's query data following a mutation using `useUpdate`

## 3.99.4

### Patch Changes

- [#3548](https://github.com/refinedev/refine/pull/3548) [`8795efb04dd`](https://github.com/refinedev/refine/commit/8795efb04ddc39bf701bf3edb0554eacea15b246) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: wrong `initialCurrent` value on `useTable` jsDoc

  ````diff
     - * @default 10
     + * @default 1
     ```
  ````

## 3.99.3

### Patch Changes

- [#3548](https://github.com/refinedev/refine/pull/3548) [`8795efb04dd`](https://github.com/refinedev/refine/commit/8795efb04ddc39bf701bf3edb0554eacea15b246) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: wrong `initialCurrent` value on `useTable` jsDoc

  ````diff
     - * @default 10
     + * @default 1
     ```
  ````

## 3.99.2

### Patch Changes

- [#3455](https://github.com/refinedev/refine/pull/3455) [`0405eb18e88`](https://github.com/refinedev/refine/commit/0405eb18e88214722a86f2cd0d5321248666e623) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix error translation key on `useInfiniteList` hook.

## 3.99.1

### Patch Changes

- [#3455](https://github.com/refinedev/refine/pull/3455) [`0405eb18e88`](https://github.com/refinedev/refine/commit/0405eb18e88214722a86f2cd0d5321248666e623) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix error translation key on `useInfiniteList` hook.

## 3.99.0

### Minor Changes

- [`0767d7a07a7`](https://github.com/refinedev/refine/commit/0767d7a07a71366946e54486ae3869499337433e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added the `useInfiniteList` hook 🥳. This hook is a modified version of react-query's [`useInfiniteQuery`](https://tanstack.com/query/latest/docs/react/guides/infinite-queries) used for retrieving items from a resource with pagination, sort, and filter configurations.

  [Refer to `useInfiniteList` docs for further information. →](https://refine.dev/docs/api-reference/core/hooks/data/useInfiniteList/)

## 3.98.0

### Minor Changes

- [`0767d7a07a7`](https://github.com/refinedev/refine/commit/0767d7a07a71366946e54486ae3869499337433e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added the `useInfiniteList` hook 🥳. This hook is a modified version of react-query's [`useInfiniteQuery`](https://tanstack.com/query/latest/docs/react/guides/infinite-queries) used for retrieving items from a resource with pagination, sort, and filter configurations.

  [Refer to `useInfiniteList` docs for further information. →](https://refine.dev/docs/api-reference/core/hooks/data/useInfiniteList/)

## 3.97.0

### Minor Changes

- [#3442](https://github.com/refinedev/refine/pull/3442) [`8f2954611fa`](https://github.com/refinedev/refine/commit/8f2954611fa1dd1ebcc7519c416c6ef2554ca395) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added swizzle support for `@pankod/refine-core` package.

  Swizzleable components:

  - `Authenticated`
  - `CanAccess`
  - `ErrorPage`
  - Authentication Pages
    - `Login`
    - `Logout`
    - `Register`
    - `ForgotPassword`
    - `UpdatePassword`

### Patch Changes

- [#3436](https://github.com/refinedev/refine/pull/3436) [`ea74f3a8408`](https://github.com/refinedev/refine/commit/ea74f3a8408bb53097f0e4a6b3b733d515b2a4d3) Thanks [@sevkioruc](https://github.com/sevkioruc)! - Fix useList, useCustom and useCustomMutation hooks i18n issue in the error messages.

- [#3440](https://github.com/refinedev/refine/pull/3440) [`96d93eb2d71`](https://github.com/refinedev/refine/commit/96d93eb2d714d2559faf25c7eab5b4db31f1bf4c) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Made the auth provider's `usePermissions` method optional.

## 3.96.0

### Minor Changes

- [#3442](https://github.com/refinedev/refine/pull/3442) [`8f2954611fa`](https://github.com/refinedev/refine/commit/8f2954611fa1dd1ebcc7519c416c6ef2554ca395) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added swizzle support for `@pankod/refine-core` package.

  Swizzleable components:

  - `Authenticated`
  - `CanAccess`
  - `ErrorPage`
  - Authentication Pages
    - `Login`
    - `Logout`
    - `Register`
    - `ForgotPassword`
    - `UpdatePassword`

### Patch Changes

- [#3436](https://github.com/refinedev/refine/pull/3436) [`ea74f3a8408`](https://github.com/refinedev/refine/commit/ea74f3a8408bb53097f0e4a6b3b733d515b2a4d3) Thanks [@sevkioruc](https://github.com/sevkioruc)! - Fix useList, useCustom and useCustomMutation hooks i18n issue in the error messages.

- [#3440](https://github.com/refinedev/refine/pull/3440) [`96d93eb2d71`](https://github.com/refinedev/refine/commit/96d93eb2d714d2559faf25c7eab5b4db31f1bf4c) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Made the auth provider's `usePermissions` method optional.

## 3.95.3

### Patch Changes

- [#3382](https://github.com/refinedev/refine/pull/3382) [`6604586b030`](https://github.com/refinedev/refine/commit/6604586b030576c4b582a675de97678dc63dbb10) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: The link in the jsDOC of the `liveMode` replaced with the correct link.

  ```diff
  - * @type  [`"auto" | "manual" | "off"`](/docs/api-reference/core/interfaceReferences/#crudsorting)
  + * @type  [`"auto" | "manual" | "off"`](/docs/api-reference/core/providers/live-provider/#livemode)
  ```

## 3.95.2

### Patch Changes

- [#3382](https://github.com/refinedev/refine/pull/3382) [`6604586b030`](https://github.com/refinedev/refine/commit/6604586b030576c4b582a675de97678dc63dbb10) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: The link in the jsDOC of the `liveMode` replaced with the correct link.

  ```diff
  - * @type  [`"auto" | "manual" | "off"`](/docs/api-reference/core/interfaceReferences/#crudsorting)
  + * @type  [`"auto" | "manual" | "off"`](/docs/api-reference/core/providers/live-provider/#livemode)
  ```

## 3.95.1

### Patch Changes

- [#3399](https://github.com/refinedev/refine/pull/3399) [`22b44a857a8`](https://github.com/refinedev/refine/commit/22b44a857a8ede3473965ab6baff70fc8ae31332) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix `useTable` hook error return type.

## 3.95.0

### Minor Changes

- [`22b44a857a8`](https://github.com/refinedev/refine/commit/22b44a857a8ede3473965ab6baff70fc8ae31332) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix `useTable` hook error return type.

## 3.94.2

### Patch Changes

- [#3364](https://github.com/refinedev/refine/pull/3364) [`98a1fbec65a`](https://github.com/refinedev/refine/commit/98a1fbec65abd38da9d6081e04c23b5fe4174acd) Thanks [@aliemir](https://github.com/aliemir)! - Changed `IResourceComponents` from `IResourceContext` to use `React.ComponentType` rather than `React.FunctionComponent` to make it compatible with other types and interfaces.

- [#3356](https://github.com/refinedev/refine/pull/3356) [`310ebd05990`](https://github.com/refinedev/refine/commit/310ebd05990dd629e64d0a2afcd2b371fe42440f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed checkError hook is not called in onError of useCustomMutation

## 3.94.1

### Patch Changes

- [#3364](https://github.com/refinedev/refine/pull/3364) [`98a1fbec65a`](https://github.com/refinedev/refine/commit/98a1fbec65abd38da9d6081e04c23b5fe4174acd) Thanks [@aliemir](https://github.com/aliemir)! - Changed `IResourceComponents` from `IResourceContext` to use `React.ComponentType` rather than `React.FunctionComponent` to make it compatible with other types and interfaces.

- [#3356](https://github.com/refinedev/refine/pull/3356) [`310ebd05990`](https://github.com/refinedev/refine/commit/310ebd05990dd629e64d0a2afcd2b371fe42440f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed checkError hook is not called in onError of useCustomMutation

## 3.94.0

### Minor Changes

- [#3335](https://github.com/refinedev/refine/pull/3335) [`ce6acf2b3d4`](https://github.com/refinedev/refine/commit/ce6acf2b3d4c181a87cbdb6c1264fd6e59a504f5) Thanks [@omeraplak](https://github.com/omeraplak)! - feat: `useResource` hook can now also return the current `action`

## 3.93.0

### Minor Changes

- [#3335](https://github.com/refinedev/refine/pull/3335) [`ce6acf2b3d4`](https://github.com/refinedev/refine/commit/ce6acf2b3d4c181a87cbdb6c1264fd6e59a504f5) Thanks [@omeraplak](https://github.com/omeraplak)! - feat: `useResource` hook can now also return the current `action`

## 3.92.0

### Minor Changes

- [#3324](https://github.com/refinedev/refine/pull/3324) [`9bfb34749bc`](https://github.com/refinedev/refine/commit/9bfb34749bc8ddaaf80ccffbd0ad6d0a4487309b) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass mutation options to `useMutation` hooks in mutation hooks:
  - `useCreate` (data)
  - `useUpdate` (data)
  - `useDelete` (data)
  - `useDeleteMany` (data)
  - `useUpdateMany` (data)
  - `useCreateMany` (data)
  - `useCustomMutation` (data)
  - `useLogin` (auth)
  - `useLogout` (auth)
  - `useRegister` (auth)
  - `useForgotPassword` (auth)
  - `useUpdatePassword` (auth)
  - `useForm` (form)

### Patch Changes

- [`814eb1009da`](https://github.com/refinedev/refine/commit/814eb1009da53505f7e82f5ed49f2f90e260c316) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: re-exported `@tanstack/react-query`

## 3.91.0

### Minor Changes

- [#3324](https://github.com/refinedev/refine/pull/3324) [`9bfb34749bc`](https://github.com/refinedev/refine/commit/9bfb34749bc8ddaaf80ccffbd0ad6d0a4487309b) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass mutation options to `useMutation` hooks in mutation hooks:
  - `useCreate` (data)
  - `useUpdate` (data)
  - `useDelete` (data)
  - `useDeleteMany` (data)
  - `useUpdateMany` (data)
  - `useCreateMany` (data)
  - `useCustomMutation` (data)
  - `useLogin` (auth)
  - `useLogout` (auth)
  - `useRegister` (auth)
  - `useForgotPassword` (auth)
  - `useUpdatePassword` (auth)
  - `useForm` (form)

### Patch Changes

- [`814eb1009da`](https://github.com/refinedev/refine/commit/814eb1009da53505f7e82f5ed49f2f90e260c316) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: re-exported `@tanstack/react-query`

## 3.90.6

### Patch Changes

- [#3224](https://github.com/refinedev/refine/pull/3224) [`a47f17931a8`](https://github.com/refinedev/refine/commit/a47f17931a8cad1466c25aa7ba4f9dce16dea2de) Thanks [@leapful](https://github.com/leapful)! - Restore filter operator after clear it by using filter dropdown

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

## 3.90.5

### Patch Changes

- [#3224](https://github.com/refinedev/refine/pull/3224) [`a47f17931a8`](https://github.com/refinedev/refine/commit/a47f17931a8cad1466c25aa7ba4f9dce16dea2de) Thanks [@leapful](https://github.com/leapful)! - Restore filter operator after clear it by using filter dropdown

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

## 3.90.4

### Patch Changes

- [#3098](https://github.com/refinedev/refine/pull/3098) [`a241ef3c957`](https://github.com/refinedev/refine/commit/a241ef3c95718340544dcf84e8432b53a5dc02be) Thanks [@aliemir](https://github.com/aliemir)! - Update `notificationProvider` prop handling by converting to a custom hook to prevent hook usage errors.

## 3.90.3

### Patch Changes

- [#3098](https://github.com/refinedev/refine/pull/3098) [`a241ef3c957`](https://github.com/refinedev/refine/commit/a241ef3c95718340544dcf84e8432b53a5dc02be) Thanks [@aliemir](https://github.com/aliemir)! - Update `notificationProvider` prop handling by converting to a custom hook to prevent hook usage errors.

## 3.90.2

### Patch Changes

- [#3073](https://github.com/refinedev/refine/pull/3073) [`38dfde0c2ec`](https://github.com/refinedev/refine/commit/38dfde0c2ec698c12f9c743881f351a2774542fa) Thanks [@samelhusseini](https://github.com/samelhusseini)! - Fixed `queryOptions` parameter of `useShow` hook

## 3.90.1

### Patch Changes

- [#3073](https://github.com/refinedev/refine/pull/3073) [`38dfde0c2ec`](https://github.com/refinedev/refine/commit/38dfde0c2ec698c12f9c743881f351a2774542fa) Thanks [@samelhusseini](https://github.com/samelhusseini)! - Fixed `queryOptions` parameter of `useShow` hook

## 3.90.0

### Minor Changes

- [#3030](https://github.com/refinedev/refine/pull/3030) [`d0998d66cd0`](https://github.com/refinedev/refine/commit/d0998d66cd086a046273b7349c6e6cb86aae6472) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add `queryOptions` params on `useShow` hook.

## 3.89.0

### Minor Changes

- [#3030](https://github.com/refinedev/refine/pull/3030) [`d0998d66cd0`](https://github.com/refinedev/refine/commit/d0998d66cd086a046273b7349c6e6cb86aae6472) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add `queryOptions` params on `useShow` hook.

## 3.88.4

### Patch Changes

- [#2975](https://github.com/refinedev/refine/pull/2975) [`249f9521c4`](https://github.com/refinedev/refine/commit/249f9521c4981819c2641be131d1dfb270b1d48b) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `hasPagination` property to `useSelect` hook for disabling pagination.

## 3.88.3

### Patch Changes

- [#2975](https://github.com/refinedev/refine/pull/2975) [`249f9521c4`](https://github.com/refinedev/refine/commit/249f9521c4981819c2641be131d1dfb270b1d48b) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `hasPagination` property to `useSelect` hook for disabling pagination.

## 3.88.2

### Patch Changes

- [#2953](https://github.com/refinedev/refine/pull/2953) [`e3642eafa2`](https://github.com/refinedev/refine/commit/e3642eafa215e354f605c57ec380bc04e1c27812) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fix `useLogout()`'s `onSuccess`behavious according to `AuthProvider` `resolved-rejected` values.

## 3.88.1

### Patch Changes

- [#2953](https://github.com/refinedev/refine/pull/2953) [`e3642eafa2`](https://github.com/refinedev/refine/commit/e3642eafa215e354f605c57ec380bc04e1c27812) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fix `useLogout()`'s `onSuccess`behavious according to `AuthProvider` `resolved-rejected` values.

## 3.88.0

### Minor Changes

- [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

  ## Usage

  ````jsx
  <Refine
      options= {{
          breadcrumb: false, // hide globally
      }}
  />
  or
  ```jsx
  <Refine
      options= {{
          breadcrumb: <MyCustomBreadcrumbComponent /> // custom component
      }}
  />
  ````

## 3.87.0

### Minor Changes

- [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

  ## Usage

  ````jsx
  <Refine
      options= {{
          breadcrumb: false, // hide globally
      }}
  />
  or
  ```jsx
  <Refine
      options= {{
          breadcrumb: <MyCustomBreadcrumbComponent /> // custom component
      }}
  />
  ````

## 3.86.2

### Patch Changes

- [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - `useCan` hook was returning the stale value if same call is made with skipped access control.

## 3.86.1

### Patch Changes

- [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - `useCan` hook was returning the stale value if same call is made with skipped access control.

## 3.86.0

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

## 3.85.0

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

## 3.84.0

### Minor Changes

- Marked `getMany`, `createMany`, `updateMany` and `deleteMany` functions as optional and substituted with `getOne`, `create`, `update` and `deleteOne` respectively. Now users can choose to skip implementing `getMany`, `createMany`, `updateMany` and `deleteMany` functions and use `getOne`, `create`, `update` and `deleteOne` functions instead.

  **Breaking Change**

  - `getMany`, `createMany`, `updateMany` and `deleteMany` functions are now optional and may cause type issues if used outside of the **refine** hooks.

## 3.83.0

### Minor Changes

- [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Marked `getMany`, `createMany`, `updateMany` and `deleteMany` functions as optional and substituted with `getOne`, `create`, `update` and `deleteOne` respectively. Now users can choose to skip implementing `getMany`, `createMany`, `updateMany` and `deleteMany` functions and use `getOne`, `create`, `update` and `deleteOne` functions instead.

  **Breaking Change**

  - `getMany`, `createMany`, `updateMany` and `deleteMany` functions are now optional and may cause type issues if used outside of the **refine** hooks.

## 3.82.0

### Minor Changes

- Added `useSelect()`, setState handler functions are memoized

  Fixed when `queryOptions.enabled = true` on `useSelect()`, fetches all data. #2691

### Patch Changes

- fix: `useSelect()`'s overridden `onSearch` function is not calling when value is empty.

## 3.81.0

### Minor Changes

- [#2704](https://github.com/refinedev/refine/pull/2704) [`e4d78052ef`](https://github.com/refinedev/refine/commit/e4d78052efea85f6cc3097ca05cfa1d6537ac9bc) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added `useSelect()`, setState handler functions are memoized

  Fixed when `queryOptions.enabled = true` on `useSelect()`, fetches all data. #2691

### Patch Changes

- [#2705](https://github.com/refinedev/refine/pull/2705) [`031f67707c`](https://github.com/refinedev/refine/commit/031f67707ce51b57668e61d4f75851b98f8e6b90) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `useSelect()`'s overridden `onSearch` function is not calling when value is empty.

## 3.80.0

### Minor Changes

- Added infinite loading example to antd `useSelect()`
  `useSelect()` `fetchSize` prop is deprecated. From now [`pagination`](https://refine.dev/docs/api-reference/core/interfaceReferences/#pagination) should be used

- Added `dataProviderName` property to resource options. Now you can define default data provider per resource.

  **Usage**

  ```ts
  <Refine
    dataProvider={{
      default: myProvider,
      second: mySecondProvider,
    }}
    resources={[
      {
        name: "posts",
        options: {
          dataProviderName: "second",
        },
      },
    ]}
  />
  ```

### Patch Changes

- Add AuthProps type export

- Mark `default` key as required for multiple data providers in `dataProvider` prop of `<Refine />` component.

## 3.79.0

### Minor Changes

- [#2629](https://github.com/refinedev/refine/pull/2629) [`bc89228e73`](https://github.com/refinedev/refine/commit/bc89228e73dbf373cbbbd0fbf5e6e4721224a7c5) Thanks [@bungambohlah](https://github.com/bungambohlah)! - Added infinite loading example to antd `useSelect()`
  `useSelect()` `fetchSize` prop is deprecated. From now [`pagination`](https://refine.dev/docs/api-reference/core/interfaceReferences/#pagination) should be used

- [#2674](https://github.com/refinedev/refine/pull/2674) [`3bd6196056`](https://github.com/refinedev/refine/commit/3bd61960564a524b5a4d18e1b3aaf0a313e28ca6) Thanks [@aliemir](https://github.com/aliemir)! - Added `dataProviderName` property to resource options. Now you can define default data provider per resource.

  **Usage**

  ```ts
  <Refine
    dataProvider={{
      default: myProvider,
      second: mySecondProvider,
    }}
    resources={[
      {
        name: "posts",
        options: {
          dataProviderName: "second",
        },
      },
    ]}
  />
  ```

### Patch Changes

- [#2666](https://github.com/refinedev/refine/pull/2666) [`8a562d2114`](https://github.com/refinedev/refine/commit/8a562d2114b7145707070e363981a4e31e02547a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add AuthProps type export

- [#2684](https://github.com/refinedev/refine/pull/2684) [`38c3876af5`](https://github.com/refinedev/refine/commit/38c3876af571a10aa58a35fab45ab7340e08ce5f) Thanks [@aliemir](https://github.com/aliemir)! - Mark `default` key as required for multiple data providers in `dataProvider` prop of `<Refine />` component.

## 3.78.0

### Minor Changes

- `clientConfig` property now accepts `QueryClient` instance - #2665

  # Usage

  ```tsx
  import { QueryClient } from "@tanstack/react-query";
  const queryClient = new QueryClient();
  const App: React.FC = () => (
      <Refine
          ...
          options={{
              reactQuery: {
                  clientConfig: queryClient
              },
          }}
      />
  );
  ```

## 3.77.0

### Minor Changes

- [#2670](https://github.com/refinedev/refine/pull/2670) [`f260932051`](https://github.com/refinedev/refine/commit/f2609320513292300903cd71e5e4753ff5fee697) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - `clientConfig` property now accepts `QueryClient` instance - #2665

  # Usage

  ```tsx
  import { QueryClient } from "@tanstack/react-query";
  const queryClient = new QueryClient();
  const App: React.FC = () => (
      <Refine
          ...
          options={{
              reactQuery: {
                  clientConfig: queryClient
              },
          }}
      />
  );
  ```

## 3.76.0

### Minor Changes

- - Added new <AuthPage /> component core and mantine support.
  - Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

### Patch Changes

- fix core data hooks type errors

## 3.75.1

### Patch Changes

- [#2667](https://github.com/refinedev/refine/pull/2667) [`6e6a9e98e5`](https://github.com/refinedev/refine/commit/6e6a9e98e5fab3fd424286496fd1adbc231ea803) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix core data hooks type errors

## 3.75.0

### Minor Changes

- [#2627](https://github.com/refinedev/refine/pull/2627) [`c5fb45d61f`](https://github.com/refinedev/refine/commit/c5fb45d61fa7470a7a34762ad19d17e9f87e4421) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added new <AuthPage /> component core and mantine support.
  - Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.74.8

### Patch Changes

- add props table to useCan documentation

## 3.74.7

### Patch Changes

- [#2615](https://github.com/refinedev/refine/pull/2615) [`ad3947d847`](https://github.com/refinedev/refine/commit/ad3947d847ffa30f8edb4845a88f462ea1c5f5c3) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - add props table to useCan documentation

## 3.74.6

### Patch Changes

- Updated `devtoolConfig` type.

## 3.74.5

### Patch Changes

- [#2505](https://github.com/refinedev/refine/pull/2505) [`a4dbb63c88`](https://github.com/refinedev/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `devtoolConfig` type.

## 3.74.4

### Patch Changes

- Fixed useMenu hook is not reacting to locale change - #2598

## 3.74.3

### Patch Changes

- [#2600](https://github.com/refinedev/refine/pull/2600) [`3ed69bba17`](https://github.com/refinedev/refine/commit/3ed69bba17741be00f513ebede684d1af6932c4e) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed useMenu hook is not reacting to locale change - #2598

## 3.74.2

### Patch Changes

- Removed redundant type inheritance

## 3.74.1

### Patch Changes

- [#2586](https://github.com/refinedev/refine/pull/2586) [`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b) Thanks [@necatiozmen](https://github.com/necatiozmen)! - Removed redundant type inheritance

## 3.74.0

### Minor Changes

- Combine action related types into a single file and derive types from it to avoid future inconsistencies.

  Renamed `RedirectionTypes` type to `RedirectAction`.

  Updated every type definition of actions to use the new `Action` type or derivations of it.

### Patch Changes

- Fixed the issue in resource routes not taking `options.route` of parent resource into account.

- Rename `reset-password` -> `forgot-password` on docs.

## 3.73.0

### Minor Changes

- Combine action related types into a single file and derive types from it to avoid future inconsistencies.

  Renamed `RedirectionTypes` type to `RedirectAction`.

  Updated every type definition of actions to use the new `Action` type or derivations of it.

### Patch Changes

- Fixed the issue in resource routes not taking `options.route` of parent resource into account.

- Rename `reset-password` -> `forgot-password` on docs.

## 3.72.1

### Patch Changes

- [#2568](https://github.com/refinedev/refine/pull/2568) [`efe99f7843`](https://github.com/refinedev/refine/commit/efe99f78433c46433f137fd9581f33f4d75778e0) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Rename `reset-password` -> `forgot-password` on docs.

## 3.72.0

### Minor Changes

- [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Combine action related types into a single file and derive types from it to avoid future inconsistencies.

  Renamed `RedirectionTypes` type to `RedirectAction`.

  Updated every type definition of actions to use the new `Action` type or derivations of it.

### Patch Changes

- [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue in resource routes not taking `options.route` of parent resource into account.

## 3.71.2

### Patch Changes

- Fix `useImport` hook requests with properly invoking requests sequentially and manage progress state.

- Removed `children` property from `useCan`s `params.resource` since it can be in `ITreeMenu` type and `React.ReactNode` breaks the `react-query`s key stringify function.

- Fixed undoable mutation is called many times - #2556

## 3.71.1

### Patch Changes

- [#2560](https://github.com/refinedev/refine/pull/2560) [`373cee23ba`](https://github.com/refinedev/refine/commit/373cee23ba921f86fc4305e170c12e643ceb681b) Thanks [@aliemir](https://github.com/aliemir)! - Fix `useImport` hook requests with properly invoking requests sequentially and manage progress state.

- [#2537](https://github.com/refinedev/refine/pull/2537) [`4407bf8825`](https://github.com/refinedev/refine/commit/4407bf88252475a6d3b41a624fe33570d2a2f674) Thanks [@ozkalai](https://github.com/ozkalai)! - Removed `children` property from `useCan`s `params.resource` since it can be in `ITreeMenu` type and `React.ReactNode` breaks the `react-query`s key stringify function.

- [#2559](https://github.com/refinedev/refine/pull/2559) [`75b699cd6c`](https://github.com/refinedev/refine/commit/75b699cd6c73b6c00c5c62f8f28a79d877d82cbc) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed undoable mutation is called many times - #2556

## 3.71.0

### Minor Changes

- - Renamed `resetPassword` in AuthProvider to `forgotPassword`
  - Renamed `useResetPassword` hook to `useForgotPassword`

## 3.70.0

### Minor Changes

- [#2524](https://github.com/refinedev/refine/pull/2524) [`27bf81bebb`](https://github.com/refinedev/refine/commit/27bf81bebb217d2944e20e79a8f7618eda0e9db7) Thanks [@biskuvit](https://github.com/biskuvit)! - - Renamed `resetPassword` in AuthProvider to `forgotPassword`
  - Renamed `useResetPassword` hook to `useForgotPassword`

## 3.69.9

### Patch Changes

- Add register function to `AuthContextProvider` for invalidate auth store queries.

- Fixed version of react-router to `6.3.0`

## 3.69.8

### Patch Changes

- [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 3.69.7

### Patch Changes

- [#2447](https://github.com/refinedev/refine/pull/2447) [`628a37a675`](https://github.com/refinedev/refine/commit/628a37a6753a778cbec5c29b698981e0157caa42) Thanks [@biskuvit](https://github.com/biskuvit)! - Add register function to `AuthContextProvider` for invalidate auth store queries.

## 3.69.6

### Patch Changes

- Fix import of react-query `DevtoolsOptions` interface

## 3.69.5

### Patch Changes

- [#2481](https://github.com/refinedev/refine/pull/2481) [`7820454ae7`](https://github.com/refinedev/refine/commit/7820454ae71ff56d032a561389e99ff567812851) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix import of react-query `DevtoolsOptions` interface

## 3.69.4

### Patch Changes

- Fixed default login page for headless

## 3.69.3

### Patch Changes

- [#2475](https://github.com/refinedev/refine/pull/2475) [`fc859677d9`](https://github.com/refinedev/refine/commit/fc859677d980bd787c084736fb23552e958d0505) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed default login page for headless

## 3.69.2

### Patch Changes

- Update `useForm` and `useShow` hooks to watch for `id` from `props` and update the query with the new `id` when it changes.

## 3.69.1

### Patch Changes

- [#2467](https://github.com/refinedev/refine/pull/2467) [`21bb649bc7`](https://github.com/refinedev/refine/commit/21bb649bc737a13479254dfdedc91f904e9144b0) Thanks [@aliemir](https://github.com/aliemir)! - Update `useForm` and `useShow` hooks to watch for `id` from `props` and update the query with the new `id` when it changes.

## 3.69.0

### Minor Changes

- Adding more CRUD Filter Operators

* Add `initialData` support to `DashboardPage` for `@pankod/refine-nextjs-router`.

## 3.68.0

### Minor Changes

- [#2456](https://github.com/refinedev/refine/pull/2456) [`f20a0ed621`](https://github.com/refinedev/refine/commit/f20a0ed621f9f038dce762e75a0a99058bcb4edb) Thanks [@workatease](https://github.com/workatease)! - Adding more CRUD Filter Operators

* [#2142](https://github.com/refinedev/refine/pull/2142) [`dd00de215a`](https://github.com/refinedev/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Add `initialData` support to `DashboardPage` for `@pankod/refine-nextjs-router`.

## 3.67.0

### Minor Changes

- Updated the generation of type declarations, moved the declarations from `tsup` to `tsc` for a better experience with `Peek Definition` and `Go to Definition` features. After this change, it's expected to navigate to the source code of the `refine` packages instead of the `dist` directory with combined declarations.

* Removed `jose` dependency.

- Remove `decamelize` dependency from `humanizeString` helper and replace the functionality with regExp.

### Patch Changes

- Fixed the issue with the TS compiler and `useResource` hooks return type.

* Pass `dataProviderName` prop to mutations in `@pankod/refine-core`'s `useImport` hook.

## 3.66.1

### Patch Changes

- [#2448](https://github.com/refinedev/refine/pull/2448) [`f1edb19979`](https://github.com/refinedev/refine/commit/f1edb199793b89dd231d2ab8d1ffed3ee63dce70) Thanks [@aliemir](https://github.com/aliemir)! - Pass `dataProviderName` prop to mutations in `@pankod/refine-core`'s `useImport` hook.

## 3.66.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Updated the generation of type declarations, moved the declarations from `tsup` to `tsc` for a better experience with `Peek Definition` and `Go to Definition` features. After this change, it's expected to navigate to the source code of the `refine` packages instead of the `dist` directory with combined declarations.

* [#2439](https://github.com/refinedev/refine/pull/2439) [`f2faf99f25`](https://github.com/refinedev/refine/commit/f2faf99f25542f73215ee89c74b241311177b327) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Removed `jose` dependency.

- [#2443](https://github.com/refinedev/refine/pull/2443) [`2c428b3105`](https://github.com/refinedev/refine/commit/2c428b31057e3e7c8901fc3da2773bc810235491) Thanks [@ozkalai](https://github.com/ozkalai)! - Remove `decamelize` dependency from `humanizeString` helper and replace the functionality with regExp.

### Patch Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with the TS compiler and `useResource` hooks return type.

## 3.65.3

### Patch Changes

- Fixed, `loginLink` and `registerLink` texts and remove unnecessary props from forms

* Fixed syncWithLocation not tracking when useTable filters were reset

## 3.65.2

### Patch Changes

- [#2435](https://github.com/refinedev/refine/pull/2435) [`bdf32c6cf9`](https://github.com/refinedev/refine/commit/bdf32c6cf935adbe2f7a23d4473978485922d8f0) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed syncWithLocation not tracking when useTable filters were reset

## 3.65.1

### Patch Changes

- [#2433](https://github.com/refinedev/refine/pull/2433) [`3ce29dda52`](https://github.com/refinedev/refine/commit/3ce29dda52772aaacfb38f4a33155fd23c52c833) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed, `loginLink` and `registerLink` texts and remove unnecessary props from forms

## 3.65.0

### Minor Changes

- 🎉 Added `AuthPage` component to the `refine` app. This page is used to login, register, forgot password and update password. Login page is default page and old `LoginPage` component is deprecated.

  # New Auth Hooks

  📌 Added `useRegister` hook. This hook is used to register new user. `useRegister` falls into register function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

  📌 Added `useForgotPassword` hook. This hook is used to forgot password. `useForgotPassword` falls into `forgotPassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

  📌 Added `useUpdatePassword` hook. This hook is used to update password. `useUpdatePassword` falls into `updatePassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

  ```diff
  - <LoginPage>
  + <AuthPage>
  ```

  # New `AuthPage` props:

  ```info
  interface IAuthPageProps extends IAuthCommonProps {
      type?: "login" | "register" | "forgotPassword" | "updatePassword";
  }

  interface IAuthCommonProps {
      submitButton?: React.ReactNode;
      registerLink?: React.ReactNode;
      loginLink?: React.ReactNode;
      forgotPasswordLink?: React.ReactNode;
      updatePasswordLink?: React.ReactNode;
      backLink?: React.ReactNode;
      providers?: IProvider[];
  }

  interface IProvider {
      name: string;
      icon?: React.ReactNode;
      label?: string;
  }
  ```

### Patch Changes

- Fixed `<AuthPage>` by adding missing props to "login" and "register" pages.

  Fixed `<Refine>` component `LoginPage` property.

## 3.64.2

### Patch Changes

- [#2415](https://github.com/refinedev/refine/pull/2415) [`f7c98f0ef9`](https://github.com/refinedev/refine/commit/f7c98f0ef9743fbee2cc44206548cf2da3ceb01c) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed `<AuthPage>` by adding missing props to "login" and "register" pages.

  Fixed `<Refine>` component `LoginPage` property.

## 3.64.1

### Patch Changes

- [#2299](https://github.com/refinedev/refine/pull/2299) [`a02cb9e8ef`](https://github.com/refinedev/refine/commit/a02cb9e8ef20f14194d772720442208930e3aa40) Thanks [@biskuvit](https://github.com/biskuvit)! - 🎉 Added `AuthPage` to the `refine` app. This page is used to login, register, forgot password and update password. Login page is default page and old `LoginPage` component is deprecated.

  # New Auth Hooks

  📌 Added `useRegister` hook. This hook is used to register new user. `useRegister` falls into register function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

  📌 Added `useForgotPassword` hook. This hook is used to forgot password. `useForgotPassword` falls into `forgotPassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

  📌 Added `useUpdatePassword` hook. This hook is used to update password. `useUpdatePassword` falls into `updatePassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

  ```diff
  - <LoginPage>
  + <AuthPage>
  ```

  # New `AuthPage` props:

  ```info
  interface IAuthPageProps extends IAuthCommonProps {
      type?: "login" | "register" | "forgotPassword" | "updatePassword";
  }

  interface IAuthCommonProps {
      registerLink?: React.ReactNode;
      loginLink?: React.ReactNode;
      forgotPasswordLink?: React.ReactNode;
      updatePasswordLink?: React.ReactNode;
      backLink?: React.ReactNode;
      providers?: IProvider[];
  }

  interface IProvider {
      name: string;
      icon?: React.ReactNode;
      label?: string;
  }
  ```

  # Add `AuthPage` as a default page to Routers

  📌 Added `AuthPage` to the `refine-nextjs-router`. Default page is `AuthPage`.

  📌 Added `AuthPage` to the `refine-react-location`. Default page is `AuthPage`.

  📌 Added `AuthPage` to the `refine-react-router-v6`. Default page is `AuthPage`.

  📌 Added `AuthPage` to the `refine-remix-router`. Default page is `AuthPage`.

## 3.64.0

### Minor Changes

- Add an option to hide `resources` from the `Sider` menu

  ```tsx
  <Refine
      ...
      ...
      resources={[
          {
              name: "posts",
              list: PostList,
              options: {
                  hide: true,
              },
          },
      ]}
  />
  ```

* Add object path syntax support for the useSelect hook

  ```tsx
  useSelect({
    resource: "posts",
    optionLabel: "nested.title",
    optionLabel: "nested.id",
  });
  ```

## 3.63.0

### Minor Changes

- [#2391](https://github.com/refinedev/refine/pull/2391) [`e530670c2d`](https://github.com/refinedev/refine/commit/e530670c2d5f6e8a734a37770d1f1c89fb0b81b5) Thanks [@omeraplak](https://github.com/omeraplak)! - Add an option to hide `resources` from the `Sider` menu

  ```tsx
  <Refine
      ...
      ...
      resources={[
          {
              name: "posts",
              list: PostList,
              options: {
                  hide: true,
              },
          },
      ]}
  />
  ```

* [#2395](https://github.com/refinedev/refine/pull/2395) [`3019fae7a0`](https://github.com/refinedev/refine/commit/3019fae7a00c4fe9d3f17639e0129bd336e42aef) Thanks [@omeraplak](https://github.com/omeraplak)! - Add object path syntax support for the useSelect hook

  ```tsx
  useSelect({
    resource: "posts",
    optionLabel: "nested.title",
    optionLabel: "nested.id",
  });
  ```

## 3.62.1

### Patch Changes

- fix redirectPage return value #2377

## 3.62.0

### Minor Changes

- Added a new `<Refine>` component property: `options`.

  Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

  ```diff
      <Refine
  -       mutationMode="undoable"
  -       undoableTimeout={5000}
  -       warnWhenUnsavedChanges
  -       syncWithLocation
  -       liveMode="off"
  -       disableTelemetry={false}
  +       options={{
  +           mutationMode: "undoable",
  +           undoableTimeout: 5000,
  +           warnWhenUnsavedChanges: true,
  +           syncWithLocation: true,
  +           liveMode: "off",
  +           disableTelemetry: false,
  +       }}
      />
  ```

* Added a new redirect feature. It is now possible to set default redirects.

  By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

  ```tsx
  <Refine
      ...
      options={{ redirect: { afterCreate: "show", afterClone: "edit", afterEdit: false }, }}
  />
  ```

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

* - Fixed `lodash-es` usage for ESM builds

## 3.61.1

### Patch Changes

- [#2377](https://github.com/refinedev/refine/pull/2377) [`c62fb114b1`](https://github.com/refinedev/refine/commit/c62fb114b1e0ea3e246e33809bbb64ada1db25b2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix redirectPage return value #2377

## 3.61.0

### Minor Changes

- Added a new `<Refine>` component property: `options`.

  Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

  ```diff
      <Refine
  -       mutationMode="undoable"
  -       undoableTimeout={5000}
  -       warnWhenUnsavedChanges
  -       syncWithLocation
  -       liveMode="off"
  -       disableTelemetry={false}
  +       options={{
  +           mutationMode: "undoable",
  +           undoableTimeout: 5000,
  +           warnWhenUnsavedChanges: true,
  +           syncWithLocation: true,
  +           liveMode: "off",
  +           disableTelemetry: false,
  +       }}
      />
  ```

* Added a new redirect feature. It is now possible to set default redirects.

  By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

  ```tsx
  <Refine
      ...
      options={{ redirect: { afterCreate: "show", afterClone: "edit", afterEdit: false }, }}
  />
  ```

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

* - Fixed `lodash-es` usage for ESM builds

## 3.60.0

### Minor Changes

- Added a new `<Refine>` component property: `options`.

  Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

  ```diff
      <Refine
  -       mutationMode="undoable"
  -       undoableTimeout={5000}
  -       warnWhenUnsavedChanges
  -       syncWithLocation
  -       liveMode="off"
  -       disableTelemetry={false}
  +       options={{
  +           mutationMode: "undoable",
  +           undoableTimeout: 5000,
  +           warnWhenUnsavedChanges: true,
  +           syncWithLocation: true,
  +           liveMode: "off",
  +           disableTelemetry: false,
  +       }}
      />
  ```

* Added a new redirect feature. It is now possible to set default redirects.

  By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

  ```tsx
  <Refine
      ...
      options={{ redirect: { afterCreate: "show", afterClone: "edit", afterEdit: false }, }}
  />
  ```

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

* - Fixed `lodash-es` usage for ESM builds

## 3.59.0

### Minor Changes

- [#2352](https://github.com/refinedev/refine/pull/2352) [`e4d39eff33`](https://github.com/refinedev/refine/commit/e4d39eff339d1c0ac391947843ebaa78d93830d6) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added a new `<Refine>` component property: `options`.

  Previously, the options were passed as a property to the `<Refine>` component. Now, the options are passed to the `<Refine>` via `options` property like this:

  ```diff
      <Refine
  -       mutationMode="undoable"
  -       undoableTimeout={5000}
  -       warnWhenUnsavedChanges
  -       syncWithLocation
  -       liveMode="off"
  -       disableTelemetry={false}
  +       options={{
  +           mutationMode: "undoable",
  +           undoableTimeout: 5000,
  +           warnWhenUnsavedChanges: true,
  +           syncWithLocation: true,
  +           liveMode: "off",
  +           disableTelemetry: false,
  +       }}
      />
  ```

* [#2361](https://github.com/refinedev/refine/pull/2361) [`95e1a17cd1`](https://github.com/refinedev/refine/commit/95e1a17cd1e10d126ce38954d0f01c0e5a39ad6a) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added a new redirect feature. It is now possible to set default redirects.

  By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

  ```tsx
  <Refine
      ...
      options={{ redirect: { afterCreate: "show", afterClone: "edit", afterEdit: false }, }}
  />
  ```

### Patch Changes

- [#2366](https://github.com/refinedev/refine/pull/2366) [`de87f13dad`](https://github.com/refinedev/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - `lodash` moved to "dependencies" for CommonJS builds

* [#2366](https://github.com/refinedev/refine/pull/2366) [`de87f13dad`](https://github.com/refinedev/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - Fixed `lodash-es` usage for ESM builds

## 3.58.5

### Patch Changes

- `lodash` moved to dependencies.

## 3.58.4

### Patch Changes

- [#2350](https://github.com/refinedev/refine/pull/2350) [`f8e5d99598`](https://github.com/refinedev/refine/commit/f8e5d99598265af434f25fde104fafc9b7cac792) Thanks [@ozkalai](https://github.com/ozkalai)! - `lodash` moved to dependencies.

## 3.58.3

### Patch Changes

- Fixed react-query devtools was consuming high CPU

## 3.58.2

### Patch Changes

- [#2333](https://github.com/refinedev/refine/pull/2333) [`2f0255ec95`](https://github.com/refinedev/refine/commit/2f0255ec95b1a1fafedaa05143e02f17d86ddc81) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed react-query devtools was consuming high CPU

## 3.58.1

### Patch Changes

- `AuthProvider`'s `login` method can now return a value for `Remix`'s authentication flow

## 3.58.0

### Minor Changes

- Updated `reactQueryDevtoolConfig` prop type and added `false` option to disable the React Query Devtools.

## 3.57.0

### Minor Changes

- [#2311](https://github.com/refinedev/refine/pull/2311) [`645391a3d9`](https://github.com/refinedev/refine/commit/645391a3d985ab02c5a3d91813f1b4ec48e3a09b) Thanks [@aliemir](https://github.com/aliemir)! - Updated `reactQueryDevtoolConfig` prop type and added `false` option to disable the React Query Devtools.

## 3.56.11

### Patch Changes

- Fixed user-defined URL query parameters being deleted when using `syncWithLocation`

## 3.56.10

### Patch Changes

- Added [QueryFunctionContext](https://tanstack.com/query/v4/docs/guides/query-functions#queryfunctioncontext)'s values to `queryContext` in `metaData`.

## 3.56.9

### Patch Changes

- [#2294](https://github.com/refinedev/refine/pull/2294) [`c67a232861`](https://github.com/refinedev/refine/commit/c67a232861f5946920be18c0e57eee799bc77e23) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added [QueryFunctionContext](https://tanstack.com/query/v4/docs/guides/query-functions#queryfunctioncontext)'s values to `queryContext` in `metaData`.

## 3.56.8

### Patch Changes

- Fixed `@tanstack/react-query-devtools` dependency

## 3.56.7

### Patch Changes

- [`754da29b34`](https://github.com/refinedev/refine/commit/754da29b34558dd51c266c1d9b7e68bf3a954697) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `@tanstack/react-query-devtools` dependency

## 3.56.6

### Patch Changes

- Upgraded `react-query` version to 4.

* Updated the return value of `useGetIdentity`. When the `getUserIdentity` function is not defined, it returns `{}` instead of `undefined`.

## 3.56.5

### Patch Changes

- [#2260](https://github.com/refinedev/refine/pull/2260) [`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgraded `react-query` version to 4.

* [#2260](https://github.com/refinedev/refine/pull/2260) [`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the return value of `useGetIdentity`. When the `getUserIdentity` function is not defined, it returns `{}` instead of `undefined`.

## 3.56.4

### Patch Changes

- Fix **useCan** hook params keys.

  Since `react-query` stringifies the query keys, it will throw an error for a circular dependency if we include `React.ReactNode` elements inside the keys.
  The feature in #2220(https://github.com/refinedev/refine/issues/2220) includes such change and to fix this, we need to remove `icon` property in the `resource`

* Updated `<Refine/>` component with memoization to prevent unwanted effects.

  - Fixed the issue: `react-query`'s `queryClient` was re-initializing on every render which was causing it to reset the query cache.
  - Memoized the `notificationProvider` prop to prevent unnecessary re-renders.
  - Memoized the `resources` prop to prevent unnecessary transform calls on every render.

- - Fixed Browser back navigation is broken with `syncWithLocation` and paginated `useTable` - #2276
  - Updated `push` and `replace` args of `useNavigation`

## 3.56.3

### Patch Changes

- [#2278](https://github.com/refinedev/refine/pull/2278) [`8b11f8a267`](https://github.com/refinedev/refine/commit/8b11f8a2679b403bfea75c448d31de7b6a90f3a9) Thanks [@biskuvit](https://github.com/biskuvit)! - Fix **useCan** hook params keys.

  Since `react-query` stringifies the query keys, it will throw an error for a circular dependency if we include `React.ReactNode` elements inside the keys.
  The feature in #2220(https://github.com/refinedev/refine/issues/2220) includes such change and to fix this, we need to remove `icon` property in the `resource`

* [#2280](https://github.com/refinedev/refine/pull/2280) [`e22cac6d8b`](https://github.com/refinedev/refine/commit/e22cac6d8b3da3188545d9c0a614bb0f01f11f70) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<Refine/>` component with memoization to prevent unwanted effects.

  - Fixed the issue: `react-query`'s `queryClient` was re-initializing on every render which was causing it to reset the query cache.
  - Memoized the `notificationProvider` prop to prevent unnecessary re-renders.
  - Memoized the `resources` prop to prevent unnecessary transform calls on every render.

- [#2279](https://github.com/refinedev/refine/pull/2279) [`786fb08b8b`](https://github.com/refinedev/refine/commit/786fb08b8be18153043f62e5f2cc1fd8ef76e728) Thanks [@omeraplak](https://github.com/omeraplak)! - - Fixed Browser back navigation is broken with `syncWithLocation` and paginated `useTable` - #2276
  - Updated `push` and `replace` args of `useNavigation`

## 3.56.2

### Patch Changes

- Fixed invalidation of authentication caches every time `checkAuth` is run

## 3.56.1

### Patch Changes

- [#2271](https://github.com/refinedev/refine/pull/2271) [`40b84d35a3`](https://github.com/refinedev/refine/commit/40b84d35a37fa2bf7fcb0f59de9745985b21fa6a) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed invalidation of authentication caches every time `checkAuth` is run

## 3.56.0

### Minor Changes

- Add React@18 support 🚀

## 3.55.0

### Minor Changes

- [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 3.54.0

### Minor Changes

- Added config parameter to useCustomMutationHook to send headers.

  ```
  const apiUrl = useApiUrl();

  const { mutate } = useCustomMutation<ICategory>();

  mutate({
      url: `${API_URL}/categories`,
      method: "post",
      values: {
        title: "New Category",
      },
      config: {
        headers: {
            Authorization: "Bearer ****",
        },
      },
  });
  ```

## 3.53.0

### Minor Changes

- [#2245](https://github.com/refinedev/refine/pull/2245) [`e949df7f1c`](https://github.com/refinedev/refine/commit/e949df7f1cd8476c647b6511e0334156097408a0) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added config parameter to useCustomMutationHook to send headers.

  ```
  const apiUrl = useApiUrl();

  const { mutate } = useCustomMutation<ICategory>();

  mutate({
      url: `${API_URL}/categories`,
      method: "post",
      values: {
        title: "New Category",
      },
      config: {
        headers: {
            Authorization: "Bearer ****",
        },
      },
  });
  ```

## 3.52.0

### Minor Changes

- Added `useCustomMutation`hook for custom mutation requests.

  ```tsx
  import { useCustomMutation } from "@pankod/refine-core";
  const { mutation } = useCustomMutation();

  mutation({
    url: "https://api.example.com/users",
    method: "POST",
    values: {
      name: "John Doe",
      email: "johndoe@mail.com",
    },
  });
  ```

## 3.51.0

### Minor Changes

- [#2229](https://github.com/refinedev/refine/pull/2229) [`878e9a105e`](https://github.com/refinedev/refine/commit/878e9a105e582db0a2b0cbcddf4e6e196e94f632) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added `useCustomMutation`hook for custom mutation requests.

  ```tsx
  import { useCustomMutation } from "@pankod/refine-core";
  const { mutation } = useCustomMutation();

  mutation({
    url: "https://api.example.com/users",
    method: "POST",
    values: {
      name: "John Doe",
      email: "johndoe@mail.com",
    },
  });
  ```

## 3.50.0

### Minor Changes

- Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

  ```ts
  const App: React.FC = () => {
    <Refine
      // other providers and props
      accessControlProvider={{
        can: async ({ resource, action, params }) => {
          if (resource === "posts" && action === "edit") {
            return Promise.resolve({
              can: false,
              reason: "Unauthorized",
            });
          }

          // or you can access directly *resource object
          // const resourceName = params?.resource?.name;
          // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
          // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
          //     return Promise.resolve({
          //         can: false,
          //         reason: "Unauthorized",
          //     });
          // }

          return Promise.resolve({ can: true });
        },
      }}
    />;
  };
  ```

## 3.49.0

### Minor Changes

- [#2222](https://github.com/refinedev/refine/pull/2222) [`43e92b9785`](https://github.com/refinedev/refine/commit/43e92b97854a1aea703ba2c04f95dcd5c6f4044d) Thanks [@omeraplak](https://github.com/omeraplak)! - Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

  ```ts
  const App: React.FC = () => {
    <Refine
      // other providers and props
      accessControlProvider={{
        can: async ({ resource, action, params }) => {
          if (resource === "posts" && action === "edit") {
            return Promise.resolve({
              can: false,
              reason: "Unauthorized",
            });
          }

          // or you can access directly *resource object
          // const resourceName = params?.resource?.name;
          // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
          // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
          //     return Promise.resolve({
          //         can: false,
          //         reason: "Unauthorized",
          //     });
          // }

          return Promise.resolve({ can: true });
        },
      }}
    />;
  };
  ```

## 3.48.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

- Fix adding the current path to the `to` parameter when redirecting to the login page after `logout` - #2211

## 3.47.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.46.0

### Minor Changes

- Update notification props in data hooks of `@pankod/refine-core` to cover dynamic notifications.

  Now users will be able to show notifications according to the API response by assigning a function which returns `OpenNotificationParams` instead of an `OpenNotificationParams` object.

  **Example**

  ```tsx
  {
      const { mutate } = useCreate({
          /* ... */
          successNotification: (data, values, resource) => ({
              message: data?.message ?? "Success!",
              type: "success",
              description: data?.description;
          }),
          errorNotification: (error, values, resource) => ({
              message: error?.message ?? error?.code ?? "Error!",
              type: "error",
              description: error?.reason;
          })
          /* ... */
      });
  }
  ```

## 3.45.0

### Minor Changes

- [#2177](https://github.com/refinedev/refine/pull/2177) [`5a805c789a`](https://github.com/refinedev/refine/commit/5a805c789a167ca3bde34aebacad93bd92510611) Thanks [@aliemir](https://github.com/aliemir)! - Update notification props in data hooks of `@pankod/refine-core` to cover dynamic notifications.

  Now users will be able to show notifications according to the API response by assigning a function which returns `OpenNotificationParams` instead of an `OpenNotificationParams` object.

  **Example**

  ```tsx
  {
      const { mutate } = useCreate({
          /* ... */
          successNotification: (data, values, resource) => ({
              message: data?.message ?? "Success!",
              type: "success",
              description: data?.description;
          }),
          errorNotification: (error, values, resource) => ({
              message: error?.message ?? error?.code ?? "Error!",
              type: "error",
              description: error?.reason;
          })
          /* ... */
      });
  }
  ```

## 3.44.0

### Minor Changes

- Added ability to compare `or` filters. This was a missing feature on filters in `useTable` hook. With this feature, we will prevent `or` filter bugs (Resolves #2124) such as re-adding the same filters and being unable to modify `or` filter. To remove `or` filter with `merge` behavior, you should pass an empty object as `value`.

### Patch Changes

- Fix redirection after submit in `useForm`. Both `edit` and `create` will redirect to `list` (it was `edit` previously)

  Resolves #2123

## 3.43.1

### Patch Changes

- [#2172](https://github.com/refinedev/refine/pull/2172) [`c33d13eb15`](https://github.com/refinedev/refine/commit/c33d13eb15b986429d92e4e0e5f2bccd91fd1140) Thanks [@aliemir](https://github.com/aliemir)! - Fix redirection after submit in `useForm`. Both `edit` and `create` will redirect to `list` (it was `edit` previously)

  Resolves #2123

## 3.43.0

### Minor Changes

- [#2164](https://github.com/refinedev/refine/pull/2164) [`4d5f6b25e5`](https://github.com/refinedev/refine/commit/4d5f6b25e51cf773e08a0ce0b93a3680e692564a) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to compare `or` filters. This was a missing feature on filters in `useTable` hook. With this feature, we will prevent `or` filter bugs (Resolves #2124) such as re-adding the same filters and being unable to modify `or` filter. To remove `or` filter with `merge` behavior, you should pass an empty object as `value`.

## 3.42.0

### Minor Changes

- ### `@pankod/refine-core`

  - Added extra params to `useSubscription` and `useResourceSubscription`
  - `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

  ### `@pankod/refine-hasura`

  - Added `liveProvider`.

  To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

  ### `@pankod/refine-nhost`

  - Added `liveProvider`.

  To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

  ### `@pankod/refine-graphql`

  - Added `liveProvider`.

### Patch Changes

- Fixed it to appear in menu items even if `List` is not given in resources #2147

## 3.41.1

### Patch Changes

- [#2151](https://github.com/refinedev/refine/pull/2151) [`d4c7377361`](https://github.com/refinedev/refine/commit/d4c7377361ba347ecfdf4d5a438eb495398c2fab) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed it to appear in menu items even if `List` is not given in resources #2147

## 3.41.0

### Minor Changes

- [#2120](https://github.com/refinedev/refine/pull/2120) [`2aa7aace52`](https://github.com/refinedev/refine/commit/2aa7aace52b3f232327db2b0f41f793a2885e788) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ### `@pankod/refine-core`

  - Added extra params to `useSubscription` and `useResourceSubscription`
  - `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

  ### `@pankod/refine-hasura`

  - Added `liveProvider`.

  To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

  ### `@pankod/refine-nhost`

  - Added `liveProvider`.

  To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

  ### `@pankod/refine-graphql`

  - Added `liveProvider`.

## 3.40.0

### Minor Changes

- Add a simple and transparent telemetry module to collect usage statistics defined within a very limited scope.

  Tracking is completely safe and anonymous. It does not contain any personally identifiable information and does not use cookies. Participation is optional and users can opt out easily.

  For more information, you can check the [documentation](https://refine.dev/docs/guides-and-concepts/telemetry/telemetry/).

## 3.39.0

### Minor Changes

- [#2078](https://github.com/refinedev/refine/pull/2078) [`868bb943ad`](https://github.com/refinedev/refine/commit/868bb943adc42d80a7904e2acbd6397d097ad4e2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add a simple and transparent telemetry module to collect usage statistics defined within a very limited scope.

  Tracking is completely safe and anonymous. It does not contain any personally identifiable information and does not use cookies. Participation is optional and users can opt out easily.

  For more information, you can check the [documentation](https://refine.dev/docs/guides-and-concepts/telemetry/telemetry/).

## 3.38.2

### Patch Changes

- - The redirect method that return from `useForm` updated to be avaiable for passing `id`.

  ```
  const { redirect } = useForm();

  redirect("edit", id);
  ```

  - Returning API response to `onFinish` function for successful mutations

## 3.38.1

### Patch Changes

- [#2089](https://github.com/refinedev/refine/pull/2089) [`ee8e8bbd6c`](https://github.com/refinedev/refine/commit/ee8e8bbd6cf6ff2ab1a87883e4030205dedb16ea) Thanks [@ozkalai](https://github.com/ozkalai)! - - The redirect method that return from `useForm` updated to be avaiable for passing `id`.

  ```
  const { redirect } = useForm();

  redirect("edit", id);
  ```

  - Returning API response to `onFinish` function for successful mutations

## 3.38.0

### Minor Changes

- `useLog` is converted to useQuery mutation.

  ```
  // before
  const { log } = useLog();
  log({
    resource: 'posts',
    action: 'create',
    data: {
        id: 1
    }
  });
  ```

  ```
  // after
  const { log } = useLog();
  const { mutation } = log;
  mutation({
    resource: 'posts',
    action: 'create',
    data: {
        id: 1
    }
  });
  ```

### Patch Changes

- Fixed `useBreadcrumb` hook throws `console.warn` even if i18nProvider is not used - #2103

## 3.37.0

### Minor Changes

- [#2049](https://github.com/refinedev/refine/pull/2049) [`98966b586f`](https://github.com/refinedev/refine/commit/98966b586f6febd8669065b5b453a8e441f76bc1) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - `useLog` is converted to useQuery mutation.

  ```
  // before
  const { log } = useLog();
  log({
    resource: 'posts',
    action: 'create',
    data: {
        id: 1
    }
  });
  ```

  ```
  // after
  const { log } = useLog();
  const { mutation } = log;
  mutation({
    resource: 'posts',
    action: 'create',
    data: {
        id: 1
    }
  });
  ```

### Patch Changes

- [#2104](https://github.com/refinedev/refine/pull/2104) [`9d77c63a92`](https://github.com/refinedev/refine/commit/9d77c63a925dca0133b3e83974dff486a2233017) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `useBreadcrumb` hook throws `console.warn` even if i18nProvider is not used - #2103

## 3.36.0

### Minor Changes

- Ability to disable server-side pagination on `useTable` and `useList` hooks.

  **Implementation**

  Added `hasPagination` property to `useTable` to enable/disable pagination. Updated `useList` config with no pagination option. Set `hasPagination` to `false` to disable pagination. `useTable` hook uses the `useList` hook under the hood and propagates the `hasPagination` property to it. Also setting pagination related return values to `undefined` for better type check on the user side.

  **Use Cases**

  In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

- Added `actions` translate support for CRUD operations (`list`,`create`,`edit`,`show`) in the `useBreadcrumb` [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support) hook.

  #️⃣ First, We need to add the `actions` key to the translation file.

  ```json
      "actions": {
          "list": "List",
          "create": "Create",
          "edit": "Edit",
          "show": "Show"
      },
  ```

  #️⃣ If you don't provide the `actions` key, `useBreadcrumb` will try to find the `buttons` key in the `translation` file for backward compatibility.

  ```json
      "buttons": {
          "list": "List",
          "create": "Create",
          "edit": "Edit",
          "show": "Show"
      },
  ```

  🎉 You can check the code part of this pull request to see how it works [here👇🏼](https://github.com/refinedev/refine/pull/2069)

  ```tsx
  const key = `actions.${action}`;
  const actionLabel = translate(key);
  if (actionLabel === key) {
    console.warn(
      `Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file. For more information, see https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support`,
    );
    breadcrumbs.push({
      label: translate(`buttons.${action}`, humanizeString(action)),
    });
  } else {
    breadcrumbs.push({
      label: translate(key, humanizeString(action)),
    });
  }
  ```

## 3.35.0

### Minor Changes

- [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Ability to disable server-side pagination on `useTable` and `useList` hooks.

  **Implementation**

  Added `hasPagination` property to `useTable` to enable/disable pagination. Updated `useList` config with no pagination option. Set `hasPagination` to `false` to disable pagination. `useTable` hook uses the `useList` hook under the hood and propagates the `hasPagination` property to it. Also setting pagination related return values to `undefined` for better type check on the user side.

  **Use Cases**

  In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

- [#2069](https://github.com/refinedev/refine/pull/2069) [`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651) Thanks [@biskuvit](https://github.com/biskuvit)! - Added `actions` translate support for CRUD operations (`list`,`create`,`edit`,`show`) in the `useBreadcrumb` [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support) hook.

  #️⃣ First, We need to add the `actions` key to the translation file.

  ```json
      "actions": {
          "list": "List",
          "create": "Create",
          "edit": "Edit",
          "show": "Show"
      },
  ```

  #️⃣ If you don't provide the `actions` key, `useBreadcrumb` will try to find the `buttons` key in the `translation` file for backward compatibility.

  ```json
      "buttons": {
          "list": "List",
          "create": "Create",
          "edit": "Edit",
          "show": "Show"
      },
  ```

  🎉 You can check the code part of this pull request to see how it works [here👇🏼](https://github.com/refinedev/refine/pull/2069)

  ```tsx
  const key = `actions.${action}`;
  const actionLabel = translate(key);
  if (actionLabel === key) {
    console.warn(
      `Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file. For more information, see https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support`,
    );
    breadcrumbs.push({
      label: translate(`buttons.${action}`, humanizeString(action)),
    });
  } else {
    breadcrumbs.push({
      label: translate(key, humanizeString(action)),
    });
  }
  ```

## 3.34.2

### Patch Changes

- Fixed `useImport` `onFinish` twice call bug.

## 3.34.1

### Patch Changes

- [#2047](https://github.com/refinedev/refine/pull/2047) [`0338ce9d6b`](https://github.com/refinedev/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `useImport` `onFinish` twice call bug.

## 3.34.0

### Minor Changes

- Added i18n support for resource names on [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/) hook.

* Export `RefineProps` and `ResourceProps` type.

### Patch Changes

- We have fixed texts with translations of default login pages in Material UI and Headless.

## 3.33.0

### Minor Changes

- [#2030](https://github.com/refinedev/refine/pull/2030) [`d96ba1e9c8`](https://github.com/refinedev/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d) Thanks [@biskuvit](https://github.com/biskuvit)! - Added i18n support for resource names on [`useBreadcrumb`](https://refine.dev/docs/core/hooks/useBreadcrumb/) hook.

* [#1922](https://github.com/refinedev/refine/pull/1922) [`12f08ae6a3`](https://github.com/refinedev/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export `RefineProps` and `ResourceProps` type.

### Patch Changes

- [#2029](https://github.com/refinedev/refine/pull/2029) [`b257d87fef`](https://github.com/refinedev/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184) Thanks [@ozkalai](https://github.com/ozkalai)! - We have fixed texts with translations of default login pages in Material UI and Headless.

## 3.32.0

### Minor Changes

- Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

- Add custom route support to `defaultOpenKeys` in `useMenu`

* Handle the `undefined` case at audit-log logger in data hooks.

- Remove dashboard item in `useMenu` hook

## 3.31.0

### Minor Changes

- [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

- [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Add custom route support to `defaultOpenKeys` in `useMenu`

* [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71) Thanks [@omeraplak](https://github.com/omeraplak)! - Handle the `undefined` case at audit-log logger in data hooks.

- [#2009](https://github.com/refinedev/refine/pull/2009) [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Remove dashboard item in `useMenu` hook

## 3.30.0

### Minor Changes

- Add `useMenu` hook to `@pankod/refine-core`

### Patch Changes

- Add custom route support to `defaultOpenKeys` in `useMenu`

* Handle the `undefined` case at audit-log logger in data hooks.

## 3.29.2

### Patch Changes

- Fix hook-inside-hook call in `notificationProvider` setup at `<Refine/>`

## 3.29.1

### Patch Changes

- [#1973](https://github.com/refinedev/refine/pull/1973) [`206540971b`](https://github.com/refinedev/refine/commit/206540971b12f3c63765aecb8aec6d506733a569) Thanks [@aliemir](https://github.com/aliemir)! - Fix hook-inside-hook call in `notificationProvider` setup at `<Refine/>`

## 3.29.0

### Minor Changes

- Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.28.0

### Minor Changes

- Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.27.0

### Minor Changes

- Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.26.0

### Minor Changes

- [#1896](https://github.com/refinedev/refine/pull/1896) [`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746) Thanks [@aliemir](https://github.com/aliemir)! - Updated `notificationProvider` prop in the `Refine` wrapper component to be able to lazily initialized.

## 3.23.2

### Patch Changes

- [#1873](https://github.com/refinedev/refine/pull/1873) [`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc) Thanks [@aliemir](https://github.com/aliemir)! - Removed dummy default values from internal contexts.
  Updated contexts:

  - Auth
  - Access Control
  - Notification
  - Translation (i18n)
  - unsavedWarn

  **BREAKING:** `useGetLocale` hook now can return `undefined` instead of a fallback value of `en` in cases of `i18nProvider` being `undefined`.

## 3.23.1

### Patch Changes

- [`3281378b11`](https://github.com/refinedev/refine/commit/3281378b119c698be3ae4ecb3866b40b883494d8) Thanks [@rassie](https://github.com/rassie)! - Fix: Don't "humanize" labels in breadcrumbs

## 3.23.0

### Minor Changes

- [#1843](https://github.com/refinedev/refine/pull/1843) [`31850119e0`](https://github.com/refinedev/refine/commit/31850119e069b93f0b5146b039a86e736164383e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add `useBreadcrumb` hook and `Breadrumb` component for `@pankod/refine-antd` package
