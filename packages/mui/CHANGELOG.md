# @refinedev/mui

## 8.0.3

### Patch Changes

- [#7428](https://github.com/refinedev/refine/pull/7428) [`c6c27b57f704e0a3b9cc9f01a996a072a179e47f`](https://github.com/refinedev/refine/commit/c6c27b57f704e0a3b9cc9f01a996a072a179e47f) Thanks [@Will-thom](https://github.com/Will-thom)! - Fix ThemedTitle to avoid rendering nested anchor elements.

## 8.0.2

### Patch Changes

- [#7345](https://github.com/refinedev/refine/pull/7345) [`af721fe26017cbe11ec997574908b40862a51a63`](https://github.com/refinedev/refine/commit/af721fe26017cbe11ec997574908b40862a51a63) Thanks [@tysoncung](https://github.com/tysoncung)! - fix(mui): respect custom `startIcon` when `hideText` is true on all button components

  When `hideText={true}` is used with a custom `startIcon`, all MUI button components (`ShowButton`, `EditButton`, `DeleteButton`, `CloneButton`, `CreateButton`, `ListButton`, `RefreshButton`, `SaveButton`, `ExportButton`, `ImportButton`) ignored the custom icon and always showed the default one. This also caused two icons to appear at the same time.

  Now the custom `startIcon` is used when provided, and the default icon is only used as a fallback.

  Resolves #7343

## 8.0.1

### Patch Changes

- [#7266](https://github.com/refinedev/refine/pull/7266) [`91f0eac72e58fd220add066c12329d39bb38a326`](https://github.com/refinedev/refine/commit/91f0eac72e58fd220add066c12329d39bb38a326) Thanks [@kaigritun](https://github.com/kaigritun)! - fix(mui): prevent nested interactive elements in navigation buttons

## 8.0.0

### Major Changes

- [#7208](https://github.com/refinedev/refine/pull/7208) [`367b4681ae7e336d9cc0397e95c9b9d36186a656`](https://github.com/refinedev/refine/commit/367b4681ae7e336d9cc0397e95c9b9d36186a656) Thanks [@JuicyBenjamin](https://github.com/JuicyBenjamin)! - feat: upgrade `@mui/x-data-grid` from v7 to v8

  Updated the `@mui/x-data-grid` peer dependency from `^7.23.5` to `^8.24.0`.

  This is a major version bump as MUI X v8 includes breaking changes that users should be aware of:

  - Minimum TypeScript version is now v5
  - Package structure updated to use Node.js `exports` field
  - Some removed props: `rowPositionsDebounceMs`, `resetPageOnSortFilter`
  - `showToolbar` prop is now required to display the toolbar

  The `useDataGrid` hook and all DataGrid-related types remain fully compatible with v8.

  Here is the updated version alignment:

  | @refinedev/mui | @mui/x-data-grid | @mui/material |
  | -------------- | ---------------- | ------------- |
  | 6.x.x          | 7.x.x            | 6.x.x         |
  | 7.x.x          | 7.x.x            | 6.x.x         |
  | 8.x.x          | 8.x.x            | 6.x.x         |

  For the full MUI X v8 migration guide, see: https://mui.com/x/migration/migration-data-grid-v7/

### Patch Changes

- [#7217](https://github.com/refinedev/refine/pull/7217) [`adc4c6431252c035caa62acbaf42f79854535548`](https://github.com/refinedev/refine/commit/adc4c6431252c035caa62acbaf42f79854535548) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: prevent server-side filter input from dropping characters in `useDataGrid`

  When typing in the DataGrid filter panel with server mode, the input could lose
  recent characters because the server update resets the filter model mid-typing.
  We now debounce the `setFilters` call inside `useDataGrid` and disable the
  DataGrid's own debounce to keep the input state stable while still triggering
  server queries.

  Resolves #7216

## 7.0.1

### Patch Changes

- [#7105](https://github.com/refinedev/refine/pull/7105) [`fb46cddfb8eb33b2490fc4f05a8bc7caba2b3691`](https://github.com/refinedev/refine/commit/fb46cddfb8eb33b2490fc4f05a8bc7caba2b3691) Thanks [@francoa](https://github.com/francoa)! - fix: Prevent DataGrid Pagination reset. #7099

  Fixed an issue in useDataGrid in which the sortModel sent in response was constantly receiving a new Object, even though the content of it was not changing

  Fixes #7099

- [#7107](https://github.com/refinedev/refine/pull/7107) [`3edacb0832090c5d0cfd36f933cb97a86328ea7c`](https://github.com/refinedev/refine/commit/3edacb0832090c5d0cfd36f933cb97a86328ea7c) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: update TSDoc links in MUI button components

  Fixed Material UI documentation links in button components to point to the correct URL.

- Updated dependencies [[`64625bb337a222ef80727862c758cae86371fa4b`](https://github.com/refinedev/refine/commit/64625bb337a222ef80727862c758cae86371fa4b)]:
  - @refinedev/react-hook-form@5.0.3

## 7.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade Material-UI integration for Refine 5.0

  - Updated Material-UI components with deprecated API cleanup and improved TypeScript support.
  - Removed legacy components and restructured hooks and componetns for better developer experience.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98), [`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/react-hook-form@5.0.0
  - @refinedev/ui-types@2.0.0
  - @refinedev/core@5.0.0

## 6.3.0

### Minor Changes

- [#6880](https://github.com/refinedev/refine/pull/6880) [`2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2`](https://github.com/refinedev/refine/commit/2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2) Thanks [@arndom](https://github.com/arndom)! - - Add `siderItemsAreCollapsed` prop to all `Sider` components to set default expanded/collapsed nested sider items.

  - UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6721](https://github.com/refinedev/refine/issues/6721)

### Patch Changes

- [#6943](https://github.com/refinedev/refine/pull/6943) [`d9efe95994a9f5ce33b80393cfc1fca862fa1e27`](https://github.com/refinedev/refine/commit/d9efe95994a9f5ce33b80393cfc1fca862fa1e27) Thanks [@jwgmeligmeyling](https://github.com/jwgmeligmeyling)! - Add missing string operators

## 6.2.2

### Patch Changes

- [#6834](https://github.com/refinedev/refine/pull/6834) [`5e032d577502cd81593b7396f55269749ccb6e5f`](https://github.com/refinedev/refine/commit/5e032d577502cd81593b7396f55269749ccb6e5f) Thanks [@kdevo](https://github.com/kdevo)! - fix(mui): pass `meta` to `useUpdate` in `useDataGrid` hook for editable data grid. #6833

  ```tsx
  import { useDataGrid } from "@refinedev/mui";

  const { dataGridProps } = useDataGrid({
    resource: "posts",
    editable: true,
    updateMutationOptions: {
      meta: { foo: "bar" },
    },
  });
  ```

  Resolves [#6833]

- [#6859](https://github.com/refinedev/refine/pull/6859) [`d6a9809f354bfd0065cb447f5741116ab3b56682`](https://github.com/refinedev/refine/commit/d6a9809f354bfd0065cb447f5741116ab3b56682) Thanks [@garrylachman](https://github.com/garrylachman)! - fix(mui): on page change, `useDataGrid` resets to first page. #6828 #6798

  Resolves [#6828] [#6798]

- Updated dependencies [[`e78213ff7fdcace9bac455861123299bfdab4452`](https://github.com/refinedev/refine/commit/e78213ff7fdcace9bac455861123299bfdab4452)]:
  - @refinedev/react-hook-form@4.10.2

## 6.2.1

### Patch Changes

📢 **Refine Community Release** 📢

- Add support for unique id to `transformCrudFiltersToFilterModel` when filters have the same field and operator.

  [Resolves #6710](https://github.com/refinedev/refine/issues/6710)

📢 **Refine Community Release** 📢

- chore: update `react-hook-form` to `7.57.0` to support new features like [`subscribe`](https://react-hook-form.com/docs/useform/subscribe).
  for more information, see [React Hook Form release notes](https://github.com/react-hook-form/react-hook-form/releases).
- Updated dependencies []:
  - @refinedev/react-hook-form@4.10.1

## 6.2.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6824](https://github.com/refinedev/refine/pull/6824) [`a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01`](https://github.com/refinedev/refine/commit/a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: update `react-hook-form` to `7.57.0` to support new features like [`subscribe`](https://react-hook-form.com/docs/useform/subscribe).
  for more information, see [React Hook Form release notes](https://github.com/react-hook-form/react-hook-form/releases).

### Patch Changes

- Updated dependencies [[`a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01`](https://github.com/refinedev/refine/commit/a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01)]:
  - @refinedev/react-hook-form@4.10.0

## 6.1.3

### Patch Changes

📢 **Refine Community Release** 📢

- Add support for unique id to `transformCrudFiltersToFilterModel` when filters have the same field and operator.

  [Resolves #6710](https://github.com/refinedev/refine/issues/6710)

## 6.1.2

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6756](https://github.com/refinedev/refine/pull/6756) [`293668873913c246edbd95c74c7593438de4980f`](https://github.com/refinedev/refine/commit/293668873913c246edbd95c74c7593438de4980f) Thanks [@arndom](https://github.com/arndom)! - Add support for unique id to `transformCrudFiltersToFilterModel` when filters have the same field and operator.

  [Resolves #6710](https://github.com/refinedev/refine/issues/6710)

## 6.1.1

### Patch Changes

📢 **Refine Community Release** 📢

- - Add `deleteButtonProps` prop to the `Show` component of UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6692](https://github.com/refinedev/refine/issues/6692)

- Updated dependencies []:
  - @refinedev/ui-types@1.24.2

## 6.1.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6699](https://github.com/refinedev/refine/pull/6699) [`cd938b04cb004b61174d65811467469abaf2db3f`](https://github.com/refinedev/refine/commit/cd938b04cb004b61174d65811467469abaf2db3f) Thanks [@arndom](https://github.com/arndom)! - - Add `deleteButtonProps` prop to the `Show` component of UI packages: AntDesign, Manitine, Charka-UI, Material-UI

  - Add documenation for this addition

  [Resolves #6692](https://github.com/refinedev/refine/issues/6692)

### Patch Changes

- Updated dependencies [[`cd938b04cb004b61174d65811467469abaf2db3f`](https://github.com/refinedev/refine/commit/cd938b04cb004b61174d65811467469abaf2db3f)]:
  - @refinedev/ui-types@1.24.0

## 6.0.3

### Patch Changes

📢 **Refine Community Release** 📢

- fix: `@refinedev/mui` package gives following error: `Cannot find module '@mui/x-internals/forwardRef' from '/node_modules/@mui/x-data-grid/components/GridPagination.js'` #6615

  To fix that, `@mui/x-data-grid` version is updated to `7.23.5`.

  [Resolves #6615](https://github.com/refinedev/refine/issues/6615)

## 6.0.2

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6616](https://github.com/refinedev/refine/pull/6616) [`51b647c5d35b943c3d154a1da128c327576b633d`](https://github.com/refinedev/refine/commit/51b647c5d35b943c3d154a1da128c327576b633d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `@refinedev/mui` package gives following error: `Cannot find module '@mui/x-internals/forwardRef' from '/node_modules/@mui/x-data-grid/components/GridPagination.js'` #6615

  To fix that, `@mui/x-data-grid` version is updated to `7.23.5`.

  [Resolves #6615](https://github.com/refinedev/refine/issues/6615)

## 6.0.1

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

📢 **Refine Community Release** 📢

- fix: UI buttons doesn't respect `hidden` prop.
  From now on, `hidden` prop will work as expected on all [UI buttons](https://refine.dev/docs/guides-concepts/ui-libraries/#buttons).

  UI Buttons:

  - `CreateButton`
  - `ShowButton`
  - `ListButton`
  - `EditButton`
  - `DeleteButton`
  - `CloneButton`

  Resolves [#6513](https://github.com/refinedev/refine/issues/6513)

📢 **Refine Community Release** 📢

- fix: UI buttons doesn't respect `disabled` prop.
  From now on, `disabled` prop will work as expected on all [UI buttons](https://refine.dev/docs/guides-concepts/ui-libraries/#buttons).

  UI Buttons:

  - `CreateButton`
  - `ShowButton`
  - `ListButton`
  - `EditButton`
  - `DeleteButton`
  - `CloneButton`

  Resolves [#6513](https://github.com/refinedev/refine/issues/6513)

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

📢 **Refine Community Release** 📢

- feat: added support for Material UI v6 and X Data Grid v7 #6333

  ```diff
  - "@mui/icons-material": "^5.8.3",
  + "@mui/icons-material": "^6.1.6",
  - "@mui/lab": "^5.0.0-alpha.85",
  + "@mui/lab": "^6.0.0-beta.14",
  - "@mui/material": "^5.14.2",
  + "@mui/material": "^6.1.7",

  - "@mui/x-data-grid": "^6.6.0",
  + "@mui/x-data-grid": "^7.22.2",
  ```

  Here is the updated version alignment:

  | @refinedev/mui | @mui/x-data-grid | @mui/material | @mui/system | @mui/lab | @mui/icons-material | @refinedev/inferencer |
  | -------------- | ---------------- | ------------- | ----------- | -------- | ------------------- | --------------------- |
  | 5.x.x          | 6.x.x            | 5.x.x         | 5.x.x       | 5.x.x    | 5.x.x               | 4.x.x                 |
  | 6.x.x          | 7.x.x            | 6.x.x         | 6.x.x       | 6.x.x    | 6.x.x               | 5.x.x                 |

  Please refer to the [Migration Guide for Material UI v6 and X Data Grid v7](https://refine.dev/docs/ui-integrations/material-ui/migration-guide/material-ui-v5-to-v6) for more information.

  Resolves [#6333](https://github.com/refinedev/refine/issues/6333)

📢 **Refine Community Release** 📢

- Introduced containerBoxProps and childrenBoxProps props to ThemedLayoutV2 to allow for greater control over the layout - including styling.

📢 **Refine Community Release** 📢

- feat: added `minItems` prop to specify the minimum number of items required for rendering breadcrumbs. #6497

  Resolves [#6497](https://github.com/refinedev/refine/issues/6497)

📢 **Refine Community Release** 📢

- Enhanced the ThemedSideV2 component with new functionality to support dynamic onSiderCollapsed handling. This allows better customization of sider collapse/expand events and improved responsiveness for mobile and desktop views. Added additional type definitions and ensured compatibility across all layout contexts. resolves #6508

- Updated dependencies []:
  - @refinedev/ui-types@1.23.1
  - @refinedev/react-hook-form@4.9.3

## 6.0.0

### Major Changes

⚡ **Refine Enterprise Release** ⚡

- [#6518](https://github.com/refinedev/refine/pull/6518) [`afb156d808ee07bfffed20f27b04c92d95cc01d4`](https://github.com/refinedev/refine/commit/afb156d808ee07bfffed20f27b04c92d95cc01d4) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added support for Material UI v6 and X Data Grid v7 #6333

  ```diff
  - "@mui/icons-material": "^5.8.3",
  + "@mui/icons-material": "^6.1.6",
  - "@mui/lab": "^5.0.0-alpha.85",
  + "@mui/lab": "^6.0.0-beta.14",
  - "@mui/material": "^5.14.2",
  + "@mui/material": "^6.1.7",

  - "@mui/x-data-grid": "^6.6.0",
  + "@mui/x-data-grid": "^7.22.2",
  ```

  Here is the updated version alignment:

  | @refinedev/mui | @mui/x-data-grid | @mui/material | @mui/system | @mui/lab | @mui/icons-material | @refinedev/inferencer |
  | -------------- | ---------------- | ------------- | ----------- | -------- | ------------------- | --------------------- |
  | 5.x.x          | 6.x.x            | 5.x.x         | 5.x.x       | 5.x.x    | 5.x.x               | 4.x.x                 |
  | 6.x.x          | 7.x.x            | 6.x.x         | 6.x.x       | 6.x.x    | 6.x.x               | 5.x.x                 |

  Please refer to the [Migration Guide for Material UI v6 and X Data Grid v7](https://refine.dev/docs/ui-integrations/material-ui/migration-guide/material-ui-v5-to-v6) for more information.

  Resolves [#6333](https://github.com/refinedev/refine/issues/6333)

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6518](https://github.com/refinedev/refine/pull/6518) [`d082ce09ff10fd8b3bf2070b163f1608c67d028b`](https://github.com/refinedev/refine/commit/d082ce09ff10fd8b3bf2070b163f1608c67d028b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Introduced containerBoxProps and childrenBoxProps props to ThemedLayoutV2 to allow for greater control over the layout - including styling.

⚡ **Refine Enterprise Release** ⚡

- [#6503](https://github.com/refinedev/refine/pull/6503) [`29d00f8dc49485e0f5c42d208417e158118d11f2`](https://github.com/refinedev/refine/commit/29d00f8dc49485e0f5c42d208417e158118d11f2) Thanks [@aress31](https://github.com/aress31)! - feat: added `minItems` prop to specify the minimum number of items required for rendering breadcrumbs. #6497

  Resolves [#6497](https://github.com/refinedev/refine/issues/6497)

⚡ **Refine Enterprise Release** ⚡

- [#6527](https://github.com/refinedev/refine/pull/6527) [`1d2613381c50f438270d6a3e486595d54496ef92`](https://github.com/refinedev/refine/commit/1d2613381c50f438270d6a3e486595d54496ef92) Thanks [@OmkarBansod02](https://github.com/OmkarBansod02)! - Enhanced the ThemedSideV2 component with new functionality to support dynamic onSiderCollapsed handling. This allows better customization of sider collapse/expand events and improved responsiveness for mobile and desktop views. Added additional type definitions and ensured compatibility across all layout contexts. resolves #6508

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

⚡ **Refine Enterprise Release** ⚡

- [#6515](https://github.com/refinedev/refine/pull/6515) [`2312f4648cf8cae427884163cc025c3f925da988`](https://github.com/refinedev/refine/commit/2312f4648cf8cae427884163cc025c3f925da988) Thanks [@OmkarBansod02](https://github.com/OmkarBansod02)! - fix: UI buttons doesn't respect `hidden` prop.
  From now on, `hidden` prop will work as expected on all [UI buttons](https://refine.dev/docs/guides-concepts/ui-libraries/#buttons).

  UI Buttons:

  - `CreateButton`
  - `ShowButton`
  - `ListButton`
  - `EditButton`
  - `DeleteButton`
  - `CloneButton`

  Resolves [#6513](https://github.com/refinedev/refine/issues/6513)

⚡ **Refine Enterprise Release** ⚡

- [#6515](https://github.com/refinedev/refine/pull/6515) [`2312f4648cf8cae427884163cc025c3f925da988`](https://github.com/refinedev/refine/commit/2312f4648cf8cae427884163cc025c3f925da988) Thanks [@OmkarBansod02](https://github.com/OmkarBansod02)! - fix: UI buttons doesn't respect `disabled` prop.
  From now on, `disabled` prop will work as expected on all [UI buttons](https://refine.dev/docs/guides-concepts/ui-libraries/#buttons).

  UI Buttons:

  - `CreateButton`
  - `ShowButton`
  - `ListButton`
  - `EditButton`
  - `DeleteButton`
  - `CloneButton`

  Resolves [#6513](https://github.com/refinedev/refine/issues/6513)

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

- Updated dependencies [[`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706), [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53), [`29d00f8dc49485e0f5c42d208417e158118d11f2`](https://github.com/refinedev/refine/commit/29d00f8dc49485e0f5c42d208417e158118d11f2), [`1d2613381c50f438270d6a3e486595d54496ef92`](https://github.com/refinedev/refine/commit/1d2613381c50f438270d6a3e486595d54496ef92)]:
  - @refinedev/ui-types@1.23.0
  - @refinedev/react-hook-form@4.9.2

## 5.22.0

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

### Patch Changes

- Updated dependencies [[`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a)]:
  - @refinedev/react-hook-form@4.9.1

## 5.21.0

### Minor Changes

- [#6271](https://github.com/refinedev/refine/pull/6271) [`2b89fbd136b2134f22d38dff8d4a7f24e57e73db`](https://github.com/refinedev/refine/commit/2b89fbd136b2134f22d38dff8d4a7f24e57e73db) Thanks [@Anonymous961](https://github.com/Anonymous961)! - feat(mui): added loading spinner to `<Create />`, `<Edit />` and `<Show />` components

  This change introduces a loading spinner to the `<Create />`, `<Edit />` and `<Show />` components in the `@refinedev/mui` package. The spinner provides a visual indication that data is being loaded, improving the user experience bym giving clear feedback during loading states.

  [Resolves #5668](https://github.com/refinedev/refine/issues/5668)

## 5.20.0

### Minor Changes

- [#6180](https://github.com/refinedev/refine/pull/6180) [`292cebc5a70f19400793292b79d1400fec114591`](https://github.com/refinedev/refine/commit/292cebc5a70f19400793292b79d1400fec114591) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useAutocomplete`](https://refine.dev/docs/ui-integrations/material-ui/hooks/use-auto-complete/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

  ```diff
  import { useAutocomplete } from '@refinedev/mui';

  - const { queryResult, defaultValueQueryResult } = useAutocomplete();
  + const { query, defaultValueQuery } = useAutocomplete();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

- [#6161](https://github.com/refinedev/refine/pull/6161) [`ff975374efcc05220be4411218c2daf7c19b8995`](https://github.com/refinedev/refine/commit/ff975374efcc05220be4411218c2daf7c19b8995) Thanks [@ritute](https://github.com/ritute)! - feat(react-hook-form): update version constraint from `^7.30.0` to `^7.43.5`

  Update react-hook-form version to address runtime subscribe error

  [Fixes #6139](https://github.com/refinedev/refine/issues/6139)

- [#6172](https://github.com/refinedev/refine/pull/6172) [`4967a51944c139d102fcfc04ada5a42c725ed7c2`](https://github.com/refinedev/refine/commit/4967a51944c139d102fcfc04ada5a42c725ed7c2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useDataGrid`](https://refine.dev/docs/ui-integrations/material-ui/hooks/use-data-grid/)'s `tableQueryResult` is deprecated, use `tableQuery` instead. #6169

  ```diff
  import { useDataGrid } from '@refinedev/mui';

  - const { tableQueryResult } = useDataGrid();
  + const { tableQuery } = useDataGrid();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

### Patch Changes

- [#6144](https://github.com/refinedev/refine/pull/6144) [`f3e06e8ea3cd65bfe8a8eb0e347aa45b93015764`](https://github.com/refinedev/refine/commit/f3e06e8ea3cd65bfe8a8eb0e347aa45b93015764) Thanks [@aliemir](https://github.com/aliemir)! - fix(mui): <DataGrid /> horizontal scroll is broken in <ThemedLayoutV2 />

  Due to the changes in CSS rendering in latest Google Chrome updates, `<DataGrid />` components are not properly sized when used inside `<ThemedLayoutV2 />` component. The `overflow: clip` property in the layout content is causing either miscalculations on the data grid width or causing an overflow on the container and overlapping with the sidebar.

  This change replaces the `overflow: clip` property with `min-height` and `min-width` properties to ensure the layout content is properly rendered and responsive to the content inside it.

  [Resolves #6077](https://github.com/refinedev/refine/issues/6077)

- [#6151](https://github.com/refinedev/refine/pull/6151) [`4b842703dbeb5306fef5c804bc5366e52fa830a0`](https://github.com/refinedev/refine/commit/4b842703dbeb5306fef5c804bc5366e52fa830a0) Thanks [@Sergio16T](https://github.com/Sergio16T)! - fix(use-data-grid): incompatible types when using data-grid-pro

  useDataGrid overide DataGridPropsType onFilterModelChange.

  [Fixes #5997](https://github.com/refinedev/refine/issues/5997)

- [#6199](https://github.com/refinedev/refine/pull/6199) [`5a8e94aa4afe0faf3ea1de93a4b00e0b44dd1ece`](https://github.com/refinedev/refine/commit/5a8e94aa4afe0faf3ea1de93a4b00e0b44dd1ece) Thanks [@aliemir](https://github.com/aliemir)! - fix(auth-page): fix wrong translation keys in `type="register"` and `type="forgotPassword"`

  In `type="forgotPassword"`:

  - `"pages.register.buttons.haveAccount"` is replaced with `"pages.forgotPassword.buttons.haveAccount"`
  - `"pages.login.signin"` is replaced with `"pages.forgotPassword.signin"`

  In `type="register"`:

  - `"pages.login.divider"` is replaced with `"pages.register.divider"`
  - `"pages.login.buttons.haveAccount"` is replaced with `"pages.register.buttons.haveAccount"`
  - `"pages.login.signin"` is replaced with `"pages.register.signin"`

  Wrong keys are kept as fallbacks in case the new keys are not found in the translation file. If you are using those keys in your project, make sure to update them accordingly. Fallback keys will be removed in future releases.

  [Resolves #5816](https://github.com/refinedev/refine/issues/5816)

- [#6217](https://github.com/refinedev/refine/pull/6217) [`aefd093cfd85096fdac36cd25073d14dfb12094f`](https://github.com/refinedev/refine/commit/aefd093cfd85096fdac36cd25073d14dfb12094f) Thanks [@webscriptmaster](https://github.com/webscriptmaster)! - fix(date-field): falsy values should render empty string

  Previously, `<DateField value={undefined} />` was rendering the current date. After this change, it will render empty string if a falsy value is provided.

  [Resolves #6216](https://github.com/refinedev/refine/issues/6216)

- Updated dependencies [[`ff975374efcc05220be4411218c2daf7c19b8995`](https://github.com/refinedev/refine/commit/ff975374efcc05220be4411218c2daf7c19b8995), [`a93eed09796b780557f6fecee0c2f1e7b4f9e93b`](https://github.com/refinedev/refine/commit/a93eed09796b780557f6fecee0c2f1e7b4f9e93b)]:
  - @refinedev/react-hook-form@4.9.0

## 5.19.0

### Minor Changes

- [#5989](https://github.com/refinedev/refine/pull/5989) [`b86648f42cd849a506e4c32d740de26b72681f72`](https://github.com/refinedev/refine/commit/b86648f42cd849a506e4c32d740de26b72681f72) Thanks [@lnikitadobrenkol](https://github.com/lnikitadobrenkol)! - feat: editable feature for MUI Data Grid #5656

  It is now possible to make MUI Data Grid editable by
  setting editable property on specific column.

  Resolves #5656

- [#6071](https://github.com/refinedev/refine/pull/6071) [`853bef97ed7baf59e74c98fc54c0ed11624fb491`](https://github.com/refinedev/refine/commit/853bef97ed7baf59e74c98fc54c0ed11624fb491) Thanks [@Dominic-Preap](https://github.com/Dominic-Preap)! - feat: add `selectedOptionsOrder` in `useSelect`

  Now with `selectedOptionsOrder`, you can sort `selectedOptions` at the top of list when use `useSelect` with `defaultValue`.

  Resolves [#6061](https://github.com/refinedev/refine/issues/6061)

### Patch Changes

- [#6021](https://github.com/refinedev/refine/pull/6021) [`55cd0662b1e3ff8f8410eba812e80130afe75d14`](https://github.com/refinedev/refine/commit/55cd0662b1e3ff8f8410eba812e80130afe75d14) Thanks [@JayBhensdadia](https://github.com/JayBhensdadia)! - fix: ensure Sider component handles various resource name formats correctly

  Updated Sider component to correctly handle lowercase and camelcased resource names, enhancing usability and functionality.

  Fixes #6004

- [#6064](https://github.com/refinedev/refine/pull/6064) [`b516c18b828ba8823561d0fefc4afe02b45ce332`](https://github.com/refinedev/refine/commit/b516c18b828ba8823561d0fefc4afe02b45ce332) Thanks [@aliemir](https://github.com/aliemir)! - fix(auto-save-indicator): replace reserved `key` prop with `translationKey` in <Message /> components

  `<AutoSaveIndicator />` components from UI libraries have been using a `<Message />` component internally that uses a `key` prop. Since `key` is a reserved prop in React, it was causing a warning in the console. This change replaces the `key` prop with `translationKey` to avoid the warning.

  Resolves [#6067](https://github.com/refinedev/refine/issues/6067)

## 5.17.0

### Minor Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: use global values by default for app title and app icon

  Now `<Refine />` component accepts `options.title` prop that can be used to set app icon and app name globally. For `<ThemedLayoutV2 />` and `<AuthPage />` components, these values will be used by default. While users can use `options.title` to pass global values for app icon and app name, option to override through `<ThemedTitleV2 />` component is still available for users to override these values in specific use cases.

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

  Then, `<ThemedLayoutV2 />` and `<AuthPage />` components will display `<MyIcon />` and `"Refine App"` as app icon and app name respectively.

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: `transformMuiOperatorToCrudOperator` return type is wrong.

  This PR fixes the return type of `transformMuiOperatorToCrudOperator` function. It has return type `Exclude<CrudOperators, "or">` but it also should exclude `and` operator to satisfy `LogicalFilter` type.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046)]:
  - @refinedev/ui-types@1.22.9
  - @refinedev/react-hook-form@4.8.20

## 5.16.0

### Minor Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`903ea231538b00ce02ddc9394c72848ec1e90772`](https://github.com/refinedev/refine/commit/903ea231538b00ce02ddc9394c72848ec1e90772) Thanks [@aliemir](https://github.com/aliemir)! - feat: use global values by default for app title and app icon

  Now `<Refine />` component accepts `options.title` prop that can be used to set app icon and app name globally. For `<ThemedLayoutV2 />` and `<AuthPage />` components, these values will be used by default. While users can use `options.title` to pass global values for app icon and app name, option to override through `<ThemedTitleV2 />` component is still available for users to override these values in specific use cases.

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

  Then, `<ThemedLayoutV2 />` and `<AuthPage />` components will display `<MyIcon />` and `"Refine App"` as app icon and app name respectively.

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`5b1230b63bf07034e81d0c0116fcc4ab14f7537c`](https://github.com/refinedev/refine/commit/5b1230b63bf07034e81d0c0116fcc4ab14f7537c) Thanks [@aliemir](https://github.com/aliemir)! - fix: `transformMuiOperatorToCrudOperator` return type is wrong.

  This PR fixes the return type of `transformMuiOperatorToCrudOperator` function. It has return type `Exclude<CrudOperators, "or">` but it also should exclude `and` operator to satisfy `LogicalFilter` type.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`903ea231538b00ce02ddc9394c72848ec1e90772`](https://github.com/refinedev/refine/commit/903ea231538b00ce02ddc9394c72848ec1e90772), [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d)]:
  - @refinedev/ui-types@1.22.8
  - @refinedev/react-hook-form@4.8.19

## 5.15.1

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

- Updated dependencies [[`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d)]:
  - @refinedev/react-hook-form@4.8.18
  - @refinedev/ui-types@1.22.7

## 5.15.0

### Minor Changes

- [#5868](https://github.com/refinedev/refine/pull/5868) [`a82ef6afc15`](https://github.com/refinedev/refine/commit/a82ef6afc1512631ca3f7936818d646e4c7d0725) Thanks [@Ac-Srikanth](https://github.com/Ac-Srikanth)! - feat: add message prop for required auth input fields for the above packages.

  Now you can provide custom required messages with translate feature for all auth input fields(Login, register, forget password,update password).

  Resolves #[5855](https://github.com/refinedev/refine/issues/5855)

### Patch Changes

- [#5876](https://github.com/refinedev/refine/pull/5876) [`4940b6106b2`](https://github.com/refinedev/refine/commit/4940b6106b24be29ffa479b88f58ed225c2f7754) Thanks [@Yash-271120](https://github.com/Yash-271120)! - feat: add ability to customize anchor origin from snackbar provider

  Previously, `useNotificationProvider` used hardcoded `anchorOrigin` and `disableWindowBlurListener` values, preventing users to customize these values. This change moves these values to `<RefineSnackbarProvider />` as default props to allow users to customize them when needed.

  Resolves [#5847](https://github.com/refinedev/refine/issues/5847)

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- Updated dependencies [[`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f)]:
  - @refinedev/react-hook-form@4.8.17
  - @refinedev/ui-types@1.22.6

## 5.14.6

### Patch Changes

- [#5737](https://github.com/refinedev/refine/pull/5737) [`4e8188a6652`](https://github.com/refinedev/refine/commit/4e8188a665209b0d0b77aef27c795a29b9513226) Thanks [@aliemir](https://github.com/aliemir)! - chore: updated content of `README.md` to include installation, usage and scaffolding instructions.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: `dayjs` imports in ESM bundles

  dayjs imports in ESM bundles were not being correctly resolved, this has been fixed by adding an esbuild plugin to replace the imports with the correct path for ESM bundles.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `lodash-es` imports for ESM builds to access the exports properly.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

  In context of `@refinedev/mui` these changes may cause unexpected issues due to misconfigured bundlers/compilers in some environments.

  In projects using `react-scripts`, you may have issues with import statements in the `@refinedev/mui`'s ESM bundle, this should be resolved by customizing the webpack configuration of the project by allowing imports without fully specifying the extensions.

  An example configuration with `@craco/craco` is as follows:

  ```js
  // craco.config.js
  module.exports = {
    webpack: {
      configure: {
        module: {
          rules: [
            {
              test: /.m?js$/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      },
    },
  };
  ```

  In Remix projects using `@refinedev/mui` you may encounter issues due to ESM issues from Material UI packages, please refer to this issue if you have any problems related to this: https://github.com/mui/material-ui/issues/39765

  If the error is related with `@refinedev/mui` specifically, setting `serverModuleFormat` to `"cjs"` will help getting rid of the related errors.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: broken eslint plugin for removing test ids from components

  Eslint plugin to remove test ids from components was broken and might miss some test ids to be included in the bundles.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: `@mui/icons-material` imports from ESM builds.

  `@mui/icons-material` imports from ESM builds were not being correctly resolved, this has been fixed by adding an esbuild plugin to replace the imports with the correct path for ESM bundles.

- [#5808](https://github.com/refinedev/refine/pull/5808) [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39) Thanks [@aliemir](https://github.com/aliemir)! - refactor: moved internal logic of buttons to respective hooks from `@refinedev/core`

  We've moved the internal logic of buttons to their respective hooks in the `@refinedev/core` package to ensure consistency and reduce duplication. This change will make it easier to manage and maintain the buttons across different UI integrations of Refine. This will also benefit the users who want to customize the buttons via `swizzle` option or create their own buttons withouth having to duplicate the logic.

- Updated dependencies [[`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927), [`38f129f40ee`](https://github.com/refinedev/refine/commit/38f129f40eea109c9b89b23a8fd3f217964330c7), [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e)]:
  - @refinedev/react-hook-form@4.8.16
  - @refinedev/ui-types@1.22.5

## 5.14.5

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

- [#5725](https://github.com/refinedev/refine/pull/5725) [`b216eb35458`](https://github.com/refinedev/refine/commit/b216eb354581e5146b5b0736077fbb5d6b00edd8) Thanks [@beg1c](https://github.com/beg1c)! - fix: issue with dropdown button on ThemedSiderV2 #5724

  There was unexpected margin on dropdown button at ThemedSiderV2.

  Fixes #5724

- Updated dependencies [[`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f)]:
  - @refinedev/react-hook-form@4.8.15

## 5.14.4

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

- Updated dependencies [[`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563)]:
  - @refinedev/react-hook-form@4.8.14

## 5.14.3

### Patch Changes

- [#5568](https://github.com/refinedev/refine/pull/5568) [`f1244819ad`](https://github.com/refinedev/refine/commit/f1244819adae9761234af697f292b4136da47503) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `notificationProvider` is deprecated due to consistent naming convention between UI libraries. Please use `useNotificationProvider` export as your notification provider. #5567

- [#5564](https://github.com/refinedev/refine/pull/5564) [`1bb7d30888`](https://github.com/refinedev/refine/commit/1bb7d3088837584b19c4faba41a91817d910d493) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`<ThemedTitleV2 />'s`](https://refine.dev/docs/ui-integrations/material-ui/components/themed-layout/) default icon updated.

## 5.14.2

### Patch Changes

- [#5430](https://github.com/refinedev/refine/pull/5430) [`cfe78749ff`](https://github.com/refinedev/refine/commit/cfe78749fff4b969a2fb52d139e66ba064dc57e1) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `useNotification.close("notification-key")` not working. Resolves [#5431](https://github.com/refinedev/refine/issues/5431)

- [#5465](https://github.com/refinedev/refine/pull/5465) [`00e00cbd98`](https://github.com/refinedev/refine/commit/00e00cbd98c34046ab83b299ede83401ae74fec1) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the type issue between `remark-gfm` and `react-markdown`. #5463

## 5.14.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

- Updated dependencies [[`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5)]:
  - @refinedev/react-hook-form@4.8.13
  - @refinedev/ui-types@1.22.4

## 5.14.0

### Minor Changes

- [#5307](https://github.com/refinedev/refine/pull/5307) [`f8e407f850`](https://github.com/refinedev/refine/commit/f8e407f85054bccf1e6ff45c84928bc01db7f5eb) Thanks [@jackprogramsjp](https://github.com/jackprogramsjp)! - feat: added `hideForm` props for `LoginPage` and `RegisterPage` for `AuthPage` feature.

  Now with the `hideForm` props feature, you can be able to hide the forms (like email/password)
  to only show the OAuth providers. This avoids having to make your own entire AuthPage.

### Patch Changes

- [#5325](https://github.com/refinedev/refine/pull/5325) [`7ff54b2060`](https://github.com/refinedev/refine/commit/7ff54b2060b0ce942c4170f744cbdf52d0940434) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `<AuthPage />` styling issues on mobile screens.

  chore: new tests are added to `<AuthPage />`.

## 5.13.18

### Patch Changes

- [#5259](https://github.com/refinedev/refine/pull/5259) [`eac3df87ffb`](https://github.com/refinedev/refine/commit/eac3df87ffbf61c913a6c8ea584e1d8c61e8d82e) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<AutoSaveIndicator />` component to extend the `<AutoSaveIndicator />` from `@refinedev/core` with custom elements and render appropriate element based on the state.

## 5.13.17

### Patch Changes

- [#5117](https://github.com/refinedev/refine/pull/5117) [`0b050f97b55`](https://github.com/refinedev/refine/commit/0b050f97b55eeb4fa5b2c74c3e79fc6b4ef7b0cb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: map missing operators for useDataGrid hook.

  - number field, added `isAnyOf` operator.
  - string field, added `startsWith`, `endsWith` and `isAnyOf` operators.

  fix: `isNull` and `isNotNull` doesn't trigger request.

  When filter has a value `""`, it's ignored and doesn't trigger request.
  Previously `isNull` and `isNotNull` operators weren't handled correctly and had value `""` by default.
  With this change, these operators has `true` value, so they won't be ignored.

## 5.13.16

### Patch Changes

- [#5117](https://github.com/refinedev/refine/pull/5117) [`0b050f97b55`](https://github.com/refinedev/refine/commit/0b050f97b55eeb4fa5b2c74c3e79fc6b4ef7b0cb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: map missing operators for useDataGrid hook.

  - number field, added `isAnyOf` operator.
  - string field, added `startsWith`, `endsWith` and `isAnyOf` operators.

  fix: `isNull` and `isNotNull` doesn't trigger request.

  When filter has a value `""`, it's ignored and doesn't trigger request.
  Previously `isNull` and `isNotNull` operators weren't handled correctly and had value `""` by default.
  With this change, these operators has `true` value, so they won't be ignored.

## 5.13.15

### Patch Changes

- [#5026](https://github.com/refinedev/refine/pull/5026) [`a605e4cd318`](https://github.com/refinedev/refine/commit/a605e4cd318ed5542b46e9e11a86f2c75dbb694b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
  From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

  feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.

- [#4974](https://github.com/refinedev/refine/pull/4974) [`a7b32dbf137`](https://github.com/refinedev/refine/commit/a7b32dbf137c77db28105f1cfdd2db79440faf1f) Thanks [@IkumaTadokoro](https://github.com/IkumaTadokoro)! - fix: add missing DataGrid operator conversion cases

  MUI defines the operator for each column types in [here](https://github.com/mui/mui-x/tree/2d09dbc6e5d03c4e66765d225ef93d3984e300fc/packages/grid/x-data-grid/src/colDef). However, there were not enough conversion cases for the following operators, so this changes added them to the mapping.

  - isAnyof: used in Numeric, SingleSelect, String
  - contains: used in String,
  - startsWith: used in String
  - endsWith: used in String

## 5.13.14

### Patch Changes

- [#4974](https://github.com/refinedev/refine/pull/4974) [`a7b32dbf137`](https://github.com/refinedev/refine/commit/a7b32dbf137c77db28105f1cfdd2db79440faf1f) Thanks [@IkumaTadokoro](https://github.com/IkumaTadokoro)! - fix: add missing DataGrid operator conversion cases

  MUI defines the operator for each column types in [here](https://github.com/mui/mui-x/tree/2d09dbc6e5d03c4e66765d225ef93d3984e300fc/packages/grid/x-data-grid/src/colDef). However, there were not enough conversion cases for the following operators, so this changes added them to the mapping.

  - isAnyof: used in Numeric, SingleSelect, String
  - contains: used in String,
  - startsWith: used in String
  - endsWith: used in String

## 5.13.13

### Patch Changes

- [#5026](https://github.com/refinedev/refine/pull/5026) [`a605e4cd318`](https://github.com/refinedev/refine/commit/a605e4cd318ed5542b46e9e11a86f2c75dbb694b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
  From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

  feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.

## 5.13.12

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b)]:
  - @refinedev/react-hook-form@4.8.10

## 5.13.11

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b)]:
  - @refinedev/react-hook-form@4.8.9

## 5.13.10

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

- Updated dependencies [[`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848)]:
  - @refinedev/react-hook-form@4.8.8

## 5.13.9

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

- Updated dependencies [[`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848)]:
  - @refinedev/react-hook-form@4.8.7

## 5.13.8

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.
- Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
  - @refinedev/ui-types@1.22.2

## 5.13.7

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.
- Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
  - @refinedev/ui-types@1.22.1

## 5.13.6

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

- Updated dependencies [[`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4)]:
  - @refinedev/react-hook-form@4.8.4

## 5.13.5

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

- Updated dependencies [[`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4)]:
  - @refinedev/react-hook-form@4.8.3

## 5.13.4

### Patch Changes

- [#4823](https://github.com/refinedev/refine/pull/4823) [`68592b67357`](https://github.com/refinedev/refine/commit/68592b67357642ec28f7eff64a95374e3cd51083) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: Material UI `<List />`, `<Show />`, `<Edit />`, `<Create />` component's header buttons not being aligned properly. [#4816](https://github.com/refinedev/refine/issues/4816)

## 5.13.3

### Patch Changes

- [#4823](https://github.com/refinedev/refine/pull/4823) [`68592b67357`](https://github.com/refinedev/refine/commit/68592b67357642ec28f7eff64a95374e3cd51083) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: Material UI `<List />`, `<Show />`, `<Edit />`, `<Create />` component's header buttons not being aligned properly. [#4816](https://github.com/refinedev/refine/issues/4816)

## 5.13.2

### Patch Changes

- [#4788](https://github.com/refinedev/refine/pull/4788) [`38680378c7a`](https://github.com/refinedev/refine/commit/38680378c7a7b0e5481ea4136f3958a00ac4ca92) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: render user avatar and name in `<HeaderV2 />` based on user data from `authProvider`.

## 5.13.1

### Patch Changes

- [#4788](https://github.com/refinedev/refine/pull/4788) [`38680378c7a`](https://github.com/refinedev/refine/commit/38680378c7a7b0e5481ea4136f3958a00ac4ca92) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: render user avatar and name in `<HeaderV2 />` based on user data from `authProvider`.

## 5.13.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<RefreshButton />` does not refresh content #4618.
  From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.

### Patch Changes

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/ui-types@1.22.0

## 5.12.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<RefreshButton />` does not refresh content #4618.
  From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.

### Patch Changes

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/ui-types@1.21.0

## 5.11.2

### Patch Changes

- [#4774](https://github.com/refinedev/refine/pull/4774) [`030a9dda75a`](https://github.com/refinedev/refine/commit/030a9dda75a7903e3c9ce3233e3b570b7cbe2dab) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: unlock and upgrade `@mui/material` to `^5.14.2`

- Updated dependencies [[`c757355da60`](https://github.com/refinedev/refine/commit/c757355da6089d0e18609a1bb2d316d928412b16)]:
  - @refinedev/react-hook-form@4.8.2

## 5.11.1

### Patch Changes

- [#4774](https://github.com/refinedev/refine/pull/4774) [`030a9dda75a`](https://github.com/refinedev/refine/commit/030a9dda75a7903e3c9ce3233e3b570b7cbe2dab) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: unlock and upgrade `@mui/material` to `^5.14.2`

- Updated dependencies [[`c757355da60`](https://github.com/refinedev/refine/commit/c757355da6089d0e18609a1bb2d316d928412b16)]:
  - @refinedev/react-hook-form@4.8.1

## 5.11.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

### Patch Changes

- Updated dependencies [[`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1)]:
  - @refinedev/react-hook-form@4.8.0

## 5.10.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

### Patch Changes

- Updated dependencies [[`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1)]:
  - @refinedev/react-hook-form@4.7.0

## 5.9.0

### Minor Changes

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/mui/components/basic-views/edit/#autosaveprops).
  [useForm](https://refine.dev/docs/packages/documentation/react-hook-form/useForm/#autosave), [useDrawerForm](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/#autosave), [useModalForm](https://refine.dev/docs/packages/documentation/react-hook-form/useModalForm/#autosave), [useStepsForm](https://refine.dev/docs/packages/documentation/react-hook-form/useStepsForm/#autosave) hooks now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.

  ```
  const { autoSaveProps } = useForm({
      refineCoreProps: {
          autoSave: {
              enabled: true,
              debounce: 2000, // not required, default is 1000
          },
      }
  });

  return (
      <Edit
          saveButtonProps={saveButtonProps}
          // pass autoSaveProps to Edit component
          autoSaveProps={autoSaveProps}
      >
          // form fields
      </Edit>
  );
  ```

  feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/mui/components/mui-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

  ```
  import { AutoSaveIndicator } from "@refinedev/mui";
  const { autoSaveProps } = useForm({
      refineCoreProps: {
          autoSave: {
              enabled: true,
              debounce: 2000, // not required, default is 1000
          },
      }
  });

  return (
      <div>
          <AutoSaveIndicator {...autoSaveProps}>
      </div>
  );
  ```

### Patch Changes

- Updated dependencies [[`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411), [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/react-hook-form@4.6.0
  - @refinedev/ui-types@1.20.0

## 5.8.0

### Minor Changes

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/mui/components/basic-views/edit/#autosaveprops).
  [useForm](https://refine.dev/docs/packages/documentation/react-hook-form/useForm/#autosave), [useDrawerForm](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/#autosave), [useModalForm](https://refine.dev/docs/packages/documentation/react-hook-form/useModalForm/#autosave), [useStepsForm](https://refine.dev/docs/packages/documentation/react-hook-form/useStepsForm/#autosave) hooks now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.

  ```
  const { autoSaveProps } = useForm({
      refineCoreProps: {
          autoSave: {
              enabled: true,
              debounce: 2000, // not required, default is 1000
          },
      }
  });

  return (
      <Edit
          saveButtonProps={saveButtonProps}
          // pass autoSaveProps to Edit component
          autoSaveProps={autoSaveProps}
      >
          // form fields
      </Edit>
  );
  ```

  feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/mui/components/mui-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

  ```
  import { AutoSaveIndicator } from "@refinedev/mui";
  const { autoSaveProps } = useForm({
      refineCoreProps: {
          autoSave: {
              enabled: true,
              debounce: 2000, // not required, default is 1000
          },
      }
  });

  return (
      <div>
          <AutoSaveIndicator {...autoSaveProps}>
      </div>
  );
  ```

### Patch Changes

- Updated dependencies [[`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411), [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/react-hook-form@4.5.0
  - @refinedev/ui-types@1.19.0

## 5.7.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: ability to tweak active sider items navigation

  Visiting active sider items triggers page reloads due to them being links. We can now provide activeItemDisabled prop to disable such reloads.

### Patch Changes

- [#4607](https://github.com/refinedev/refine/pull/4607) [`fed630dcc3e`](https://github.com/refinedev/refine/commit/fed630dcc3ef291efbfa96ed6f8e5c5448ac16a6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - test: added tests for `<ThemedSiderV2/>`.

- Updated dependencies [[`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/ui-types@1.18.0

## 5.6.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: ability to tweak active sider items navigation

  Visiting active sider items triggers page reloads due to them being links. We can now provide activeItemDisabled prop to disable such reloads.

### Patch Changes

- [#4607](https://github.com/refinedev/refine/pull/4607) [`fed630dcc3e`](https://github.com/refinedev/refine/commit/fed630dcc3ef291efbfa96ed6f8e5c5448ac16a6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - test: added tests for `<ThemedSiderV2/>`.

- Updated dependencies [[`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/ui-types@1.17.0

## 5.5.0

### Minor Changes

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: implement following hooks have `useLoadingOvertime` hook

  - [`useAutocomplete`](https://refine.dev/docs/api-reference/mui/hooks/useAutocomplete/#overtimeoptions)
  - [`useDataGrid`](https://refine.dev/docs/api-reference/mui/hooks/useDataGrid/#overtimeoptions)

### Patch Changes

- [#4557](https://github.com/refinedev/refine/pull/4557) [`781050e56a4`](https://github.com/refinedev/refine/commit/781050e56a459f8c17e0e65c9f7a1cae88811f19) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `Button` text color on [`RefineThemes`](https://refine.dev/docs/api-reference/mui/theming/#predefined-themes)

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { DeleteButton } from "@refinedev/mui";

  <DeleteButton resource="identifier-value" recordItemId="123" />;
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

- Updated dependencies [[`9a895ea39dc`](https://github.com/refinedev/refine/commit/9a895ea39dcbb5ad73904fa29ee9fcfcf25b7ea4), [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42)]:
  - @refinedev/react-hook-form@4.4.2

## 5.4.0

### Minor Changes

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: implement following hooks have `useLoadingOvertime` hook

  - [`useAutocomplete`](https://refine.dev/docs/api-reference/mui/hooks/useAutocomplete/#overtimeoptions)
  - [`useDataGrid`](https://refine.dev/docs/api-reference/mui/hooks/useDataGrid/#overtimeoptions)

### Patch Changes

- [#4557](https://github.com/refinedev/refine/pull/4557) [`781050e56a4`](https://github.com/refinedev/refine/commit/781050e56a459f8c17e0e65c9f7a1cae88811f19) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `Button` text color on [`RefineThemes`](https://refine.dev/docs/api-reference/mui/theming/#predefined-themes)

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { DeleteButton } from "@refinedev/mui";

  <DeleteButton resource="identifier-value" recordItemId="123" />;
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

- Updated dependencies [[`9a895ea39dc`](https://github.com/refinedev/refine/commit/9a895ea39dcbb5ad73904fa29ee9fcfcf25b7ea4), [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42)]:
  - @refinedev/react-hook-form@4.4.1

## 5.3.0

### Minor Changes

- [#4449](https://github.com/refinedev/refine/pull/4449) [`cc84d61bc5c`](https://github.com/refinedev/refine/commit/cc84d61bc5c8cfc8ac7da391f965471ecad6c445) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: updated Create, List, Show, Edit, Delete, Clone buttons to respect new global `accessControlProvider` configuration.

  fix: Delete button's text wasn't rendered as `reason` field of `accessControlProvider`.

  Given the following `can` method:

  ```ts
  const accessControlProvider: IAccessControlContext = {
    can: async (): Promise<CanReturnType> => {
      return { can: false, reason: "Access Denied!" };
    },
  };
  ```

  If user is unauthorized, `Delete` button's text should be `Access Denied!` instead of default `Delete`.

  This is the default behaviour for Create, List, Show, Edit, Delete, Clone buttons already.

## 5.2.0

### Minor Changes

- [#4449](https://github.com/refinedev/refine/pull/4449) [`cc84d61bc5c`](https://github.com/refinedev/refine/commit/cc84d61bc5c8cfc8ac7da391f965471ecad6c445) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: updated Create, List, Show, Edit, Delete, Clone buttons to respect new global `accessControlProvider` configuration.

  fix: Delete button's text wasn't rendered as `reason` field of `accessControlProvider`.

  Given the following `can` method:

  ```ts
  const accessControlProvider: IAccessControlContext = {
    can: async (): Promise<CanReturnType> => {
      return { can: false, reason: "Access Denied!" };
    },
  };
  ```

  If user is unauthorized, `Delete` button's text should be `Access Denied!` instead of default `Delete`.

  This is the default behaviour for Create, List, Show, Edit, Delete, Clone buttons already.

## 5.1.0

### Minor Changes

- [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - Updated the `@mui/x-data-grid` dependency to the latest version (`v6`). This update introduces some changes to the existing codebases which are addressed in Material UI's migration guide for `@mui/x-data-grid` from `v5` to `v6`. We've created a simple migration guide to navigate refine users through the changes that might be required in their codebases. While this guide does not cover all the changes, it will help you get started with the migration process.

  **Breaking Changes**

  `useDataGrid` no longer returns `page`, `pageSize`, `onPageChange` and `onPageSizeChange`. According to the changes in the `DataGrid` API, `useDataGrid` now returns `paginationModel` and `onPaginationModelChange` props which are used to control the pagination state of the `DataGrid` and contains the previous logic of `page`, `pageSize`, `onPageChange` and `onPageSizeChange`.

  With this release, the peer dependency of `@mui/x-data-grid` is updated to `^6.6.0`.

### Patch Changes

- [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - Added missing `@context` alias to the declaration configuration, this was causing buildtime errors when creating declarations for the package.

- [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - Added `overflow: auto` and `overflow: clip` (if supported) properties to the content container of the `ThemedLayoutV2` to make sure the `DataGrid` component doesn't break the layout.

## 5.0.0

### Major Changes

- [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - Updated the `@mui/x-data-grid` dependency to the latest version (`v6`). This update introduces some changes to the existing codebases which are addressed in Material UI's migration guide for `@mui/x-data-grid` from `v5` to `v6`. We've created a simple migration guide to navigate refine users through the changes that might be required in their codebases. While this guide does not cover all the changes, it will help you get started with the migration process.

  **Breaking Changes**

  `useDataGrid` no longer returns `page`, `pageSize`, `onPageChange` and `onPageSizeChange`. According to the changes in the `DataGrid` API, `useDataGrid` now returns `paginationModel` and `onPaginationModelChange` props which are used to control the pagination state of the `DataGrid` and contains the previous logic of `page`, `pageSize`, `onPageChange` and `onPageSizeChange`.

  With this release, the peer dependency of `@mui/x-data-grid` is updated to `^6.6.0`.

### Patch Changes

- [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - Added missing `@context` alias to the declaration configuration, this was causing buildtime errors when creating declarations for the package.

- [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - Added `overflow: auto` and `overflow: clip` (if supported) properties to the content container of the `ThemedLayoutV2` to make sure the `DataGrid` component doesn't break the layout.

## 4.18.2

### Patch Changes

- [#4431](https://github.com/refinedev/refine/pull/4431) [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f) Thanks [@aliemir](https://github.com/aliemir)! - Updated the TSDoc comments to fix the broken links in the documentation.

## 4.18.1

### Patch Changes

- [#4431](https://github.com/refinedev/refine/pull/4431) [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f) Thanks [@aliemir](https://github.com/aliemir)! - Updated the TSDoc comments to fix the broken links in the documentation.

## 4.18.0

### Minor Changes

- [#4404](https://github.com/refinedev/refine/pull/4404) [`f67967e8c87`](https://github.com/refinedev/refine/commit/f67967e8c871b2252b4c1b827de3656bf153d1ee) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: fix name and state inconsistency in `<ThemedLayoutV2>`

  `useSiderVisible` is deprecated, instead we created a new hook `useThemedLayoutContext` for it. `useThemedLayoutContext` similar to `useSiderVisible` but it returns more meaningful state names. However, `useSiderVisible` is still available for backward compatibility.

  Updated `Sider` and `HamburgerMenu` components using `useThemedLayoutContext`.

  ```tsx
  import { useThemedLayoutContext } from "@refinedev/mui";

  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  ```

## 4.17.0

### Minor Changes

- [#4404](https://github.com/refinedev/refine/pull/4404) [`f67967e8c87`](https://github.com/refinedev/refine/commit/f67967e8c871b2252b4c1b827de3656bf153d1ee) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: fix name and state inconsistency in `<ThemedLayoutV2>`

  `useSiderVisible` is deprecated, instead we created a new hook `useThemedLayoutContext` for it. `useThemedLayoutContext` similar to `useSiderVisible` but it returns more meaningful state names. However, `useSiderVisible` is still available for backward compatibility.

  Updated `Sider` and `HamburgerMenu` components using `useThemedLayoutContext`.

  ```tsx
  import { useThemedLayoutContext } from "@refinedev/mui";

  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  ```

## 4.16.4

### Patch Changes

- [#4355](https://github.com/refinedev/refine/pull/4355) [`bf4011f1d00`](https://github.com/refinedev/refine/commit/bf4011f1d00b6b5ce85f9cd67d58afb78fc9c924) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@mui/material` and `@mui/icons-material` imports to use subpath imports.

## 4.16.3

### Patch Changes

- [#4355](https://github.com/refinedev/refine/pull/4355) [`bf4011f1d00`](https://github.com/refinedev/refine/commit/bf4011f1d00b6b5ce85f9cd67d58afb78fc9c924) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@mui/material` and `@mui/icons-material` imports to use subpath imports.

## 4.16.2

### Patch Changes

- [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 4.16.1

### Patch Changes

- [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 4.16.0

### Minor Changes

- [#4303](https://github.com/refinedev/refine/pull/4303) [`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added default button props into the renderer functions `headerButtons` and `footerButtons` in CRUD components.
  Now, customization of the header and footer buttons can be achieved without losing the default functionality.

  ```tsx
  import {
    DeleteButton,
    EditButton,
    ListButton,
    RefreshButton,
    Show,
  } from "@refinedev/mui";

  const PostShow = () => {
    return (
      <Show
        headerButtons={({
          deleteButtonProps,
          editButtonProps,
          listButtonProps,
          refreshButtonProps,
        }) => {
          return (
            <>
              {/* custom components */}
              {listButtonProps && (
                <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
              )}
              {editButtonProps && (
                <EditButton {...editButtonProps} meta={{ foo: "bar" }} />
              )}
              {deleteButtonProps && (
                <DeleteButton {...deleteButtonProps} meta={{ foo: "bar" }} />
              )}
              <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
            </>
          );
        }}
      >
        {/* ... */}
      </Show>
    );
  };
  ```

### Patch Changes

- [#4312](https://github.com/refinedev/refine/pull/4312) [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: added `className` for easier selection of all buttons and titles of CRUD components

- Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
  - @refinedev/ui-types@1.16.0
  - @refinedev/react-hook-form@4.4.0

## 4.15.0

### Minor Changes

- [#4303](https://github.com/refinedev/refine/pull/4303) [`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added default button props into the renderer functions `headerButtons` and `footerButtons` in CRUD components.
  Now, customization of the header and footer buttons can be achieved without losing the default functionality.

  ```tsx
  import {
    DeleteButton,
    EditButton,
    ListButton,
    RefreshButton,
    Show,
  } from "@refinedev/mui";

  const PostShow = () => {
    return (
      <Show
        headerButtons={({
          deleteButtonProps,
          editButtonProps,
          listButtonProps,
          refreshButtonProps,
        }) => {
          return (
            <>
              {/* custom components */}
              {listButtonProps && (
                <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
              )}
              {editButtonProps && (
                <EditButton {...editButtonProps} meta={{ foo: "bar" }} />
              )}
              {deleteButtonProps && (
                <DeleteButton {...deleteButtonProps} meta={{ foo: "bar" }} />
              )}
              <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
            </>
          );
        }}
      >
        {/* ... */}
      </Show>
    );
  };
  ```

### Patch Changes

- [#4312](https://github.com/refinedev/refine/pull/4312) [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: added `className` for easier selection of all buttons and titles of CRUD components

- Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
  - @refinedev/ui-types@1.15.0
  - @refinedev/react-hook-form@4.3.0

## 4.14.7

### Patch Changes

- [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

- Updated dependencies [[`dc62abc890f`](https://github.com/refinedev/refine/commit/dc62abc890f68be161c7035c28c0118216a9e0ec)]:
  - @refinedev/ui-types@1.14.0

## 4.14.6

### Patch Changes

- [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

## 4.14.5

### Patch Changes

- [#4277](https://github.com/refinedev/refine/pull/4277) [`7172c1b42d2`](https://github.com/refinedev/refine/commit/7172c1b42d26ade22780527892ce26ceef15c838) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: renamed the `<ThemedHeaderV2/>` prop `isSticky` to `sticky`

  To provide backwards compatibility, the old prop name is still supported, but it is deprecated and will be removed in the next major version.

  Example:

  ```tsx
  import { Refine } from "@refinedev/core";
  import { ThemedLayoutV2, ThemedHeaderV2 } from "@refinedev/antd"; // or @refinedev/chakra-ui, @refinedev/mui, @refinedev/mantine

  const App: React.FC = () => {
      return (
          <Refine
              ...
          >
              <ThemedLayoutV2
                  Header={() => <ThemedHeaderV2 sticky />}
              >
                  {/* ... */}
              </ThemedLayoutV2>
          </Refine>
      );
  };
  ```

- [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: updated the sider styles to solve issues that occur when there are too many items in the sider

## 4.14.4

### Patch Changes

- [#4277](https://github.com/refinedev/refine/pull/4277) [`7172c1b42d2`](https://github.com/refinedev/refine/commit/7172c1b42d26ade22780527892ce26ceef15c838) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: renamed the `<ThemedHeaderV2/>` prop `isSticky` to `sticky`

  To provide backwards compatibility, the old prop name is still supported, but it is deprecated and will be removed in the next major version.

  Example:

  ```tsx
  import { Refine } from "@refinedev/core";
  import { ThemedLayoutV2, ThemedHeaderV2 } from "@refinedev/antd"; // or @refinedev/chakra-ui, @refinedev/mui, @refinedev/mantine

  const App: React.FC = () => {
      return (
          <Refine
              ...
          >
              <ThemedLayoutV2
                  Header={() => <ThemedHeaderV2 sticky />}
              >
                  {/* ... */}
              </ThemedLayoutV2>
          </Refine>
      );
  };
  ```

- [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: updated the sider styles to solve issues that occur when there are too many items in the sider

## 4.14.3

### Patch Changes

- [#4277](https://github.com/refinedev/refine/pull/4277) [`7172c1b42d2`](https://github.com/refinedev/refine/commit/7172c1b42d26ade22780527892ce26ceef15c838) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: renamed the `<ThemedHeaderV2/>` prop `isSticky` to `sticky`

  To provide backwards compatibility, the old prop name is still supported, but it is deprecated and will be removed in the next major version.

  Example:

  ```tsx
  import { Refine } from "@refinedev/core";
  import { ThemedLayoutV2, ThemedHeaderV2 } from "@refinedev/antd"; // or @refinedev/chakra-ui, @refinedev/mui, @refinedev/mantine

  const App: React.FC = () => {
      return (
          <Refine
              ...
          >
              <ThemedLayoutV2
                  Header={() => <ThemedHeaderV2 sticky />}
              >
                  {/* ... */}
              </ThemedLayoutV2>
          </Refine>
      );
  };
  ```

- [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: updated the sider styles to solve issues that occur when there are too many items in the sider

## 4.14.2

### Patch Changes

- [#4255](https://github.com/refinedev/refine/pull/4255) [`9694245718c`](https://github.com/refinedev/refine/commit/9694245718cea7812c85aefc4880d165bb4d124d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `ThemedLayoutContextProvider` import path in internal usage.

## 4.14.1

### Patch Changes

- [#4255](https://github.com/refinedev/refine/pull/4255) [`9694245718c`](https://github.com/refinedev/refine/commit/9694245718cea7812c85aefc4880d165bb4d124d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `ThemedLayoutContextProvider` import path in internal usage.

## 4.14.0

### Minor Changes

- [#4232](https://github.com/refinedev/refine/pull/4232) [`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `initialSiderCollapsed` added to `RefineThemedLayoutV2Props` to control initial state of `<ThemedSiderV2>`.
  From now on, you can control the initial collapsed state of `<ThemedSiderV2>` by passing the `initialSiderCollapsed` prop to `<ThemedLayoutV2>`.

  ```tsx
  <ThemedLayoutV2
    initialSiderCollapsed={true} // This will make the sider collapsed by default
  >
    {/* .. */}
  </ThemedLayoutV2>
  ```

- [#4209](https://github.com/refinedev/refine/pull/4209) [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `isSticky` prop to `ThemedHeaderV2` component. Default is `true`.

  ```tsx
  import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/mui";

  const CustomHeader = () => <ThemedHeaderV2 isSticky={false} />;

  const App = () => (
    <Refine>
      // ...
      <ThemedLayoutV2 Header={CustomHeader}>
        <Outlet />
      </ThemedLayoutV2>
      // ...
    </Refine>
  );
  ```

### Patch Changes

- Updated dependencies [[`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8), [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2)]:
  - @refinedev/ui-types@1.12.0

## 4.13.0

### Minor Changes

- [#4232](https://github.com/refinedev/refine/pull/4232) [`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `initialSiderCollapsed` added to `RefineThemedLayoutV2Props` to control initial state of `<ThemedSiderV2>`.
  From now on, you can control the initial collapsed state of `<ThemedSiderV2>` by passing the `initialSiderCollapsed` prop to `<ThemedLayoutV2>`.

  ```tsx
  <ThemedLayoutV2
    initialSiderCollapsed={true} // This will make the sider collapsed by default
  >
    {/* .. */}
  </ThemedLayoutV2>
  ```

- [#4209](https://github.com/refinedev/refine/pull/4209) [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `isSticky` prop to `ThemedHeaderV2` component. Default is `true`.

  ```tsx
  import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/mui";

  const CustomHeader = () => <ThemedHeaderV2 isSticky={false} />;

  const App = () => (
    <Refine>
      // ...
      <ThemedLayoutV2 Header={CustomHeader}>
        <Outlet />
      </ThemedLayoutV2>
      // ...
    </Refine>
  );
  ```

### Patch Changes

- Updated dependencies [[`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8), [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2)]:
  - @refinedev/ui-types@1.11.0

## 4.12.0

### Minor Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

  - **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
  - **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

  feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

  - **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
  - **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

### Patch Changes

- Updated dependencies [[`b992e11e338`](https://github.com/refinedev/refine/commit/b992e11e3387464186d552112460aebbc18d3cc5)]:
  - @refinedev/react-hook-form@4.2.2

## 4.11.0

### Minor Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

  - **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
  - **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

  feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

  - **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
  - **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

### Patch Changes

- Updated dependencies [[`b992e11e338`](https://github.com/refinedev/refine/commit/b992e11e3387464186d552112460aebbc18d3cc5)]:
  - @refinedev/react-hook-form@4.2.1

## 4.10.3

### Patch Changes

- [#4198](https://github.com/refinedev/refine/pull/4198) [`6081efbc26b`](https://github.com/refinedev/refine/commit/6081efbc26bad28629d5513d6e7a30c96b0dd080) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: `useAutocomplete` now resets the search value when the option is selected

- Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
  - @refinedev/ui-types@1.10.0

## 4.10.2

### Patch Changes

- [#4198](https://github.com/refinedev/refine/pull/4198) [`6081efbc26b`](https://github.com/refinedev/refine/commit/6081efbc26bad28629d5513d6e7a30c96b0dd080) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: `useAutocomplete` now resets the search value when the option is selected

- Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
  - @refinedev/ui-types@1.9.0

## 4.10.1

### Patch Changes

- [#4198](https://github.com/refinedev/refine/pull/4198) [`6081efbc26b`](https://github.com/refinedev/refine/commit/6081efbc26bad28629d5513d6e7a30c96b0dd080) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: `useAutocomplete` now resets the search value when the option is selected

- Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
  - @refinedev/ui-types@1.8.0

## 4.10.0

### Minor Changes

- [#4153](https://github.com/refinedev/refine/pull/4153) [`8d9c408d089`](https://github.com/refinedev/refine/commit/8d9c408d0893f6592709e688432a3274d0bd0fcb) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` and `HamburgerMenu` component

  `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `<HamburgerMenu />` component, it's easier to collapse/uncollapse the `Sider`.

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

### Patch Changes

- Updated dependencies [[`8d9c408d089`](https://github.com/refinedev/refine/commit/8d9c408d0893f6592709e688432a3274d0bd0fcb)]:
  - @refinedev/ui-types@1.7.0

## 4.9.0

### Minor Changes

- [#4153](https://github.com/refinedev/refine/pull/4153) [`8d9c408d089`](https://github.com/refinedev/refine/commit/8d9c408d0893f6592709e688432a3274d0bd0fcb) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` and `HamburgerMenu` component

  `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `<HamburgerMenu />` component, it's easier to collapse/uncollapse the `Sider`.

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

### Patch Changes

- Updated dependencies [[`8d9c408d089`](https://github.com/refinedev/refine/commit/8d9c408d0893f6592709e688432a3274d0bd0fcb)]:
  - @refinedev/ui-types@1.6.0

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

- [#4113](https://github.com/refinedev/refine/pull/4113) [`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the generic type name of hooks that use `useQuery` to synchronize generic type names with `tanstack-query`.

- Updated dependencies [[`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d)]:
  - @refinedev/react-hook-form@4.2.0

## 4.7.2

### Patch Changes

- [#4115](https://github.com/refinedev/refine/pull/4115) [`1d44ef15575`](https://github.com/refinedev/refine/commit/1d44ef15575e4537684b3f42e4fcf3535b41905e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed <Sider /> icon and list item spacing for Material UI

- Updated dependencies [[`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9)]:
  - @refinedev/react-hook-form@4.1.6

## 4.7.1

### Patch Changes

- [#4115](https://github.com/refinedev/refine/pull/4115) [`1d44ef15575`](https://github.com/refinedev/refine/commit/1d44ef15575e4537684b3f42e4fcf3535b41905e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed <Sider /> icon and list item spacing for Material UI

- Updated dependencies [[`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9)]:
  - @refinedev/react-hook-form@4.1.5

## 4.7.0

### Minor Changes

- [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/mui/components/mui-themed-layout

### Patch Changes

- Updated dependencies [[`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec)]:
  - @refinedev/react-hook-form@4.1.4

## 4.6.0

### Minor Changes

- [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/mui/components/mui-themed-layout

### Patch Changes

- Updated dependencies [[`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec)]:
  - @refinedev/react-hook-form@4.1.3

## 4.5.10

### Patch Changes

- [`222f3baacc6`](https://github.com/refinedev/refine/commit/222f3baacc69f4bbe15e39427f47a07a75685f29) Thanks [@omeraplak](https://github.com/omeraplak)! - fixed 'Sign in' link on the ForgotPassword page

## 4.5.9

### Patch Changes

- [`222f3baacc6`](https://github.com/refinedev/refine/commit/222f3baacc69f4bbe15e39427f47a07a75685f29) Thanks [@omeraplak](https://github.com/omeraplak)! - fixed 'Sign in' link on the ForgotPassword page

## 4.5.8

### Patch Changes

- [#4033](https://github.com/refinedev/refine/pull/4033) [`08955914473`](https://github.com/refinedev/refine/commit/08955914473737b08772c919d8108e053d546341) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: Sider toggle button color - The color of the toggle button in the `<ThemedSider>` and `<ThemedHeader>` does not meet the contrast ratio. This is now fixed.

## 4.5.7

### Patch Changes

- [#4033](https://github.com/refinedev/refine/pull/4033) [`08955914473`](https://github.com/refinedev/refine/commit/08955914473737b08772c919d8108e053d546341) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: Sider toggle button color - The color of the toggle button in the `<ThemedSider>` and `<ThemedHeader>` does not meet the contrast ratio. This is now fixed.

## 4.5.6

### Patch Changes

- [#4024](https://github.com/refinedev/refine/pull/4024) [`dc6d2311eb7`](https://github.com/refinedev/refine/commit/dc6d2311eb76a458f828fb15fe26fae1c75bc95a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Added: default `gap: 8px` to `<ThemedTitle>` component.

## 4.5.5

### Patch Changes

- [#4024](https://github.com/refinedev/refine/pull/4024) [`dc6d2311eb7`](https://github.com/refinedev/refine/commit/dc6d2311eb76a458f828fb15fe26fae1c75bc95a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Added: default `gap: 8px` to `<ThemedTitle>` component.

## 4.5.4

### Patch Changes

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 4.5.3

### Patch Changes

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 4.5.2

### Patch Changes

- [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

  - `<RefineThemes>` colors updated to match the new theme colors.

- Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
  - @refinedev/ui-types@1.5.0

## 4.5.1

### Patch Changes

- [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

  - `<RefineThemes>` colors updated to match the new theme colors.

- Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
  - @refinedev/ui-types@1.4.0

## 4.5.0

### Minor Changes

- [#3949](https://github.com/refinedev/refine/pull/3949) [`836b06a2f67`](https://github.com/refinedev/refine/commit/836b06a2f67ec966247c422e42e11f39e6167288) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the Material UI components.

  ```tsx
  import { Refine } from "@refinedev/core";
  import { RefineThemes } from "@refinedev/mui";
  import { ThemeProvider } from "@mui/material/styles";
  import dataProvider from "@refinedev/simple-rest";

  const App = () => {
      // ---

      return (
        <ThemeProvider theme={RefineThemes.MagentaDark}>
              <Refine dataProvider={dataProvider("YOUR_API_URL")}>
                  {/** your app here */}
              </Refine>
          </ConfigProvider>
      );
  };
  ```

  - default title with icon added to `AuthPage`. It uses `<ThemedTitle>` component from `@refinedev/mui`. You can remove it by setting `title` prop to `false`.

  ```tsx
  import { AuthPage } from "@refinedev/mui";

  const MyAuthPage = () => {
    return <AuthPage title={false} />;
  };
  ```

  - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

  ```tsx
  import { AuthPage } from "@refinedev/mui";

  const MyAuthPage = () => {
    return (
      <AuthPage
        renderContent={(content: React.ReactNode, title: React.ReactNode) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {title}
              <h1 style={{ color: "white" }}>Extra Header</h1>
              {content}
              <h1 style={{ color: "white" }}>Extra Footer</h1>
            </div>
          );
        }}
      />
    );
  };
  ```

  - `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

  - `<AuthPage>` component uses colors from the theme.
  - `<ThemedTitle>` added to `AuthPage`

### Patch Changes

- [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 4.4.0

### Minor Changes

- [#3949](https://github.com/refinedev/refine/pull/3949) [`836b06a2f67`](https://github.com/refinedev/refine/commit/836b06a2f67ec966247c422e42e11f39e6167288) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the Material UI components.

  ```tsx
  import { Refine } from "@refinedev/core";
  import { RefineThemes } from "@refinedev/mui";
  import { ThemeProvider } from "@mui/material/styles";
  import dataProvider from "@refinedev/simple-rest";

  const App = () => {
      // ---

      return (
        <ThemeProvider theme={RefineThemes.MagentaDark}>
              <Refine dataProvider={dataProvider("YOUR_API_URL")}>
                  {/** your app here */}
              </Refine>
          </ConfigProvider>
      );
  };
  ```

  - default title with icon added to `AuthPage`. It uses `<ThemedTitle>` component from `@refinedev/mui`. You can remove it by setting `title` prop to `false`.

  ```tsx
  import { AuthPage } from "@refinedev/mui";

  const MyAuthPage = () => {
    return <AuthPage title={false} />;
  };
  ```

  - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

  ```tsx
  import { AuthPage } from "@refinedev/mui";

  const MyAuthPage = () => {
    return (
      <AuthPage
        renderContent={(content: React.ReactNode, title: React.ReactNode) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {title}
              <h1 style={{ color: "white" }}>Extra Header</h1>
              {content}
              <h1 style={{ color: "white" }}>Extra Footer</h1>
            </div>
          );
        }}
      />
    );
  };
  ```

  - `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

  - `<AuthPage>` component uses colors from the theme.
  - `<ThemedTitle>` added to `AuthPage`

### Patch Changes

- [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 4.3.2

### Patch Changes

- [#3948](https://github.com/refinedev/refine/pull/3948) [`b4950503334`](https://github.com/refinedev/refine/commit/b495050333464224f34851c9c57ffab457a3f120) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

  - The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
  - The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

## 4.3.1

### Patch Changes

- [#3948](https://github.com/refinedev/refine/pull/3948) [`b4950503334`](https://github.com/refinedev/refine/commit/b495050333464224f34851c9c57ffab457a3f120) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

  - The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
  - The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

## 4.3.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.
  - `title` prop added to `AuthPage` to render a custom title.
    - ⚠️ These features have not been implemented yet. Only types were added. It will be implemented in the next release.

### Patch Changes

- Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
  - @refinedev/ui-types@1.3.0

## 4.2.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.
  - `title` prop added to `AuthPage` to render a custom title.
    - ⚠️ These features have not been implemented yet. Only types were added. It will be implemented in the next release.

### Patch Changes

- Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
  - @refinedev/ui-types@1.2.0

## 4.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Updated buttons with `resource` property. `resourceNameOrRouteName` is now deprecated but kept working until next major version.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  ## 🪄 Migrating your project automatically with refine-codemod ✨

  [`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

  Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

  ```sh
  npx @refinedev/codemod@latest refine3-to-refine4
  ```

  And it's done. Now your project uses `refine@4.x.x`.

  ## 📝 Changelog

  Deprecated `useMenu` removed from `@refinedev/mui` package. Use `useMenu` from `@refinedev/core` package instead.

  ```diff
  - import { useMenu } from "@refinedev/mui";
  + import { useMenu } from "@refinedev/core";
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `meta` prop is added. To ensure backward compatibility, `metaData` prop will be used if `meta` prop is not provided.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Updated the components to match the changes in routing system of `@refinedev/core`.

  ## `meta` property in components

  This includes `meta` props in buttons and `Sider` component. `meta` property can be used to pass additional parameters to the navigation paths.

  For a `posts` resource definition like this:

  ```tsx
  <Refine
      resources={[
          {
              name: "posts",
              list: "/posts",
              show: "/:authorId/posts/:id",
          }
      ]}
  >
  ```

  You can pass `authorId` to the `ShowButton` component like this:

  ```tsx
  <ShowButton resource="posts" id="1" meta={{ authorId: 123 }}>
  ```

  This will navigate to `/123/posts/1` path.

  ## Removed props

  - `ignoreAccessControlProvider` prop is removed from buttons.
  - `cardProps`, `cardHeaderProps`, `cardContentProps`, `cardActionsProps` and `actionButtons` props are removed from CRUD component.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  All **Material UI** components re-exported from `@refinedev/mui` have been removed. You should import them from Material UI packages directly.

  If the packages are not installed, you can install them with your package manager:

  > You don't have to install all of these packages below. Only install the packages you use.

  ```bash
  npm install @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
  # or
  pnpm add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
  # or
  yarn add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
  ```

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
  - } from "@refinedev/mui";

  + import { NumberField } from "@refinedev/mui";
  + import { ThemeProvider } from "@mui/material/styles";
  + import { Box, Stack, Typography } from "@mui/material";
  + import { DataGrid } from "@mui/x-data-grid";
  + import { LoadingButton } from "@mui/lab";
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `<ReadyPage>` isnow deprecated.
  - Created a `<WelcomePage>` component to welcome users.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `useAutocomplete`'s sort prop is now deprecated. Use `sorters` prop instead.

  ```diff
  useAutocomplete({
  -    sort,
  +    sorters,
  })
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added legacy auth provider and new auth provider support to all components and hooks.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `useDataGrid` return values and properties are updated.

  - `initialCurrent` and `initialPageSize` props are now deprecated. Use `pagination` prop instead.
  - To ensure backward compatibility, `initialCurrent` and `initialPageSize` props will work as before.

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

  - `hasPagination` prop is now deprecated. Use `pagination.mode` instead.
  - To ensure backward compatibility, `hasPagination` prop will work as before.

    ```diff
    useDataGrid({
    -    hasPagination,
    +    pagination: {
    +        mode: "off" | "server" | "client",
    +    },
    })
    ```

  - `initialSorter` and `permanentSorter` props are now deprecated. Use `sorters.initial` and `sorters.permanent` instead.
  - To ensure backward compatibility, `initialSorter` and `permanentSorter` props will work as before.

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

  - `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are now deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.
  - To ensure backward compatibility, `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props will work as before.

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

  - `sorter` and `setSorter` return values are now deprecated. Use `sorters` and `setSorters` instead.
  - To ensure backward compatibility, `sorter` and `setSorter` return values will work as before.

    ```diff
    const {
    -   sorter,
    +   sorters,
    -   setSorter,
    +   setSorters,
    } = useDataGrid();
    ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 3.63.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-react-hook-form@3.39.0
  - @pankod/refine-ui-types@0.16.0

## 3.62.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-react-hook-form@3.38.0
  - @pankod/refine-ui-types@0.15.0

## 3.61.5

### Patch Changes

- [#3517](https://github.com/refinedev/refine/pull/3517) [`ce6ed28ce3d`](https://github.com/refinedev/refine/commit/ce6ed28ce3d4c6909b6936342738e161af02ed5b) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix multi-level Sider menu. (#3505)

## 3.61.4

### Patch Changes

- [#3517](https://github.com/refinedev/refine/pull/3517) [`ce6ed28ce3d`](https://github.com/refinedev/refine/commit/ce6ed28ce3d4c6909b6936342738e161af02ed5b) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix multi-level Sider menu. (#3505)

## 3.61.3

### Patch Changes

- [#3399](https://github.com/refinedev/refine/pull/3399) [`22b44a857a8`](https://github.com/refinedev/refine/commit/22b44a857a8ede3473965ab6baff70fc8ae31332) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix `useTable` hook error return type.

## 3.61.2

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- [`93a7d7088ae`](https://github.com/refinedev/refine/commit/93a7d7088aee1ec6baad3b33f646fa67b25f4af0) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `experimental_sx` export

- Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-ui-types@0.14.2

## 3.61.1

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- [`93a7d7088ae`](https://github.com/refinedev/refine/commit/93a7d7088aee1ec6baad3b33f646fa67b25f4af0) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `experimental_sx` export

- Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-ui-types@0.14.1

## 3.61.0

### Minor Changes

- [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 3.60.0

### Minor Changes

- [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 3.59.4

### Patch Changes

- [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 3.59.3

### Patch Changes

- [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 3.59.2

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 3.59.1

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 3.59.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.

## 3.58.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.

## 3.57.0

### Minor Changes

- [#3076](https://github.com/refinedev/refine/pull/3076) [`bcd47eabbfc`](https://github.com/refinedev/refine/commit/bcd47eabbfc911ff622d30bf5bbdcc3a9a7d8565) Thanks [@ahhshm](https://github.com/ahhshm)! - exported material-ui localization files

## 3.56.0

### Minor Changes

- [#3076](https://github.com/refinedev/refine/pull/3076) [`bcd47eabbfc`](https://github.com/refinedev/refine/commit/bcd47eabbfc911ff622d30bf5bbdcc3a9a7d8565) Thanks [@ahhshm](https://github.com/ahhshm)! - exported material-ui localization files

## 3.55.2

### Patch Changes

- [#2975](https://github.com/refinedev/refine/pull/2975) [`249f9521c4`](https://github.com/refinedev/refine/commit/249f9521c4981819c2641be131d1dfb270b1d48b) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Prevented server request when empty filter value is provided.

## 3.55.1

### Patch Changes

- [#2975](https://github.com/refinedev/refine/pull/2975) [`249f9521c4`](https://github.com/refinedev/refine/commit/249f9521c4981819c2641be131d1dfb270b1d48b) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Prevented server request when empty filter value is provided.

## 3.55.0

### Minor Changes

- [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

  > **The option set in individual CRUD components takes priority over the global option**

## 3.54.0

### Minor Changes

- [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

  > **The option set in individual CRUD components takes priority over the global option**

## 3.53.0

### Minor Changes

- [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - **Deprecation**

  `ignoreAccessControlProvider` prop on buttons is deprecated. Use `accessContro.enabled` instead.

  **Features**

  `accessControl.enabled` prop is added to buttons to enable/disable access control for buttons.
  `accessControl.hideIfUnauthorized` prop is added to buttons to hide the button if access is denied.

- [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

- [#2838](https://github.com/refinedev/refine/pull/2838) [`f7968fa16f`](https://github.com/refinedev/refine/commit/f7968fa16f9930442e1122fe5294e350252bdd5c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.

- Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516), [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
  - @pankod/refine-ui-types@0.14.0

## 3.52.0

### Minor Changes

- [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

- Updated dependencies [[`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
  - @pankod/refine-ui-types@0.13.0

## 3.51.0

### Minor Changes

- [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - **Deprecation**

  `ignoreAccessControlProvider` prop on buttons is deprecated. Use `accessContro.enabled` instead.

  **Features**

  `accessControl.enabled` prop is added to buttons to enable/disable access control for buttons.
  `accessControl.hideIfUnauthorized` prop is added to buttons to hide the button if access is denied.

### Patch Changes

- [#2838](https://github.com/refinedev/refine/pull/2838) [`f7968fa16f`](https://github.com/refinedev/refine/commit/f7968fa16f9930442e1122fe5294e350252bdd5c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.

- Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516)]:
  - @pankod/refine-ui-types@0.12.0

## 3.50.7

### Patch Changes

- Fix login link alignment on forgot password page.

- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.6

## 3.50.6

### Patch Changes

- [#2787](https://github.com/refinedev/refine/pull/2787) [`eeb7303b8b`](https://github.com/refinedev/refine/commit/eeb7303b8b413f00b74802d08791adc560af5fe2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix login link alignment on forgot password page.

- Updated dependencies [[`19124711a7`](https://github.com/refinedev/refine/commit/19124711a7dc23c0b0e61bc845fbd294927999da)]:
  - @pankod/refine-ui-types@0.11.5

## 3.50.5

### Patch Changes

- Fixed `providers` property empty array state in `<AuthPage />` component

## 3.50.4

### Patch Changes

- Fixed `providers` property empty array state in `<AuthPage />` component

## 3.50.3

### Patch Changes

- [#2712](https://github.com/refinedev/refine/pull/2712) [`c434055011`](https://github.com/refinedev/refine/commit/c434055011cbdd846c9f228c23987607bb828a1b) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `providers` property empty array state in `<AuthPage />` component

## 3.50.2

### Patch Changes

- Add AuthProps type export

## 3.50.1

### Patch Changes

- [#2666](https://github.com/refinedev/refine/pull/2666) [`8a562d2114`](https://github.com/refinedev/refine/commit/8a562d2114b7145707070e363981a4e31e02547a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add AuthProps type export

## 3.50.0

### Minor Changes

- - Added new <AuthPage /> component core and mantine support.
  - Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.49.0

### Minor Changes

- [#2627](https://github.com/refinedev/refine/pull/2627) [`c5fb45d61f`](https://github.com/refinedev/refine/commit/c5fb45d61fa7470a7a34762ad19d17e9f87e4421) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added new <AuthPage /> component core and mantine support.
  - Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.48.2

### Patch Changes

- fix(material-ui): fix missing `<Header />` component export

## 3.48.1

### Patch Changes

- [#2635](https://github.com/refinedev/refine/pull/2635) [`c24fb19264`](https://github.com/refinedev/refine/commit/c24fb192649abb3f1806095ce7ed69b7197b4486) Thanks [@Coinio](https://github.com/Coinio)! - fix(material-ui): fix missing `<Header />` component export

## 3.48.0

### Minor Changes

- - Added `<AuthPage>` for Material UI package of **refine**. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

  - Deprecated `LoginPage`.

  **Before**

  ```tsx
  import { LoginPage } from "@pankod/refine-mui";

  <Refine
    LoginPage={LoginPage}
    ...
  />
  ```

  **After**

  ```tsx
  import { AuthPage } from "@pankod/refine-mui";

  <Refine
    LoginPage={AuthPage}
    ...
  />
  ```

## 3.47.0

### Minor Changes

- - Added `<AuthPage>` for Material UI package of **refine**. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

  - Deprecated `LoginPage`.

  **Before**

  ```tsx
  import { LoginPage } from "@pankod/refine-mui";

  <Refine
    LoginPage={LoginPage}
    ...
  />
  ```

  **After**

  ```tsx
  import { AuthPage } from "@pankod/refine-mui";

  <Refine
    LoginPage={AuthPage}
    ...
  />
  ```

## 3.46.0

### Minor Changes

- [#2580](https://github.com/refinedev/refine/pull/2580) [`e1ab7da6b3`](https://github.com/refinedev/refine/commit/e1ab7da6b335bad62b15a537a3ed63c9f113bd01) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added `<AuthPage>` for Material UI package of **refine**. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

  - Deprecated `LoginPage`.

  **Before**

  ```tsx
  import { LoginPage } from "@pankod/refine-mui";

  <Refine
    LoginPage={LoginPage}
    ...
  />
  ```

  **After**

  ```tsx
  import { AuthPage } from "@pankod/refine-mui";

  <Refine
    LoginPage={AuthPage}
    ...
  />
  ```

## 3.45.9

### Patch Changes

- ReadyPage examples link fixed.

## 3.45.8

### Patch Changes

- [#2505](https://github.com/refinedev/refine/pull/2505) [`a4dbb63c88`](https://github.com/refinedev/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ReadyPage examples link fixed.

## 3.45.7

### Patch Changes

- Updated `disabled` attribute of buttons in CRUD components according to `isLoading` prop.

- Removed redundant type inheritance

- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.2

## 3.45.6

### Patch Changes

- [#2586](https://github.com/refinedev/refine/pull/2586) [`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b) Thanks [@necatiozmen](https://github.com/necatiozmen)! - Removed redundant type inheritance

- Updated dependencies [[`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b)]:
  - @pankod/refine-ui-types@0.11.1

## 3.45.5

### Patch Changes

- [#2585](https://github.com/refinedev/refine/pull/2585) [`e7ab42a73b`](https://github.com/refinedev/refine/commit/e7ab42a73b87625b2646864118ad25cbe31295ad) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `disabled` attribute of buttons in CRUD components according to `isLoading` prop.

## 3.45.4

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.0

## 3.45.3

### Patch Changes

- Updated dependencies [[`a65525de6f`](https://github.com/refinedev/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e)]:
  - @pankod/refine-ui-types@0.10.0

## 3.45.2

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.9.0

## 3.45.1

### Patch Changes

- Updated dependencies [[`ad99916d6d`](https://github.com/refinedev/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0)]:
  - @pankod/refine-ui-types@0.8.0

## 3.45.0

### Minor Changes

- Added `render` prop to `Sider` component. You can get `dashboard`, `logout` and `items` from `render` props to customize the `Sider` component.

### Patch Changes

- Fixed version of react-router to `6.3.0`

- Passed `collapsed` prop to `render` method in `Sider` component of `@pankod/refine-mui`.

- Updated dependencies []:
  - @pankod/refine-react-hook-form@3.33.2
  - @pankod/refine-ui-types@0.7.0

## 3.44.2

### Patch Changes

- [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

- Updated dependencies [[`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f)]:
  - @pankod/refine-react-hook-form@3.33.1

## 3.44.1

### Patch Changes

- [#2492](https://github.com/refinedev/refine/pull/2492) [`7d5bf3023d`](https://github.com/refinedev/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9) Thanks [@ozkalai](https://github.com/ozkalai)! - Passed `collapsed` prop to `render` method in `Sider` component of `@pankod/refine-mui`.

- Updated dependencies [[`7d5bf3023d`](https://github.com/refinedev/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9)]:
  - @pankod/refine-ui-types@0.6.1

## 3.44.0

### Minor Changes

- [#2454](https://github.com/refinedev/refine/pull/2454) [`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af) Thanks [@ozkalai](https://github.com/ozkalai)! - Added `render` prop to `Sider` component. You can get `dashboard`, `logout` and `items` from `render` props to customize the `Sider` component.

### Patch Changes

- Updated dependencies [[`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af)]:
  - @pankod/refine-ui-types@0.6.0

## 3.43.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

- Update `ThemeProvider` export as value instead of type.

- Updated dependencies []:
  - @pankod/refine-react-hook-form@3.33.0
  - @pankod/refine-ui-types@0.5.0

## 3.42.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update `ThemeProvider` export as value instead of type.

- Updated dependencies [[`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af)]:
  - @pankod/refine-react-hook-form@3.32.0
  - @pankod/refine-ui-types@0.4.0

## 3.41.16

### Patch Changes

- Fix: Wrap with [`<CanAccess />`](https://refine.dev/docs/core/components/accessControl/can-access/) component to parent sider items

  ```tsx
  <Refine
    accessControlProvider={{
      can: async ({ action, resource }) => {
        // console.log({ action, resource });
        // output: {action: "list", resource: "cms" }

        return { can: true };
      },
    }}
    resources={[
      {
        name: "CMS",
      },
      {
        name: "posts",
        parentName: "CMS",
        list: PostList,
      },
    ]}
  />
  ```

## 3.41.15

### Patch Changes

- [#2411](https://github.com/refinedev/refine/pull/2411) [`c61470a2e0`](https://github.com/refinedev/refine/commit/c61470a2e00df94a211395541601fd39b63e2cff) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix: Wrap with [`<CanAccess />`](https://refine.dev/docs/core/components/accessControl/can-access/) component to parent sider items

  ```tsx
  <Refine
    accessControlProvider={{
      can: async ({ action, resource }) => {
        // console.log({ action, resource });
        // output: {action: "list", resource: "cms" }

        return { can: true };
      },
    }}
    resources={[
      {
        name: "CMS",
      },
      {
        name: "posts",
        parentName: "CMS",
        list: PostList,
      },
    ]}
  />
  ```

## 3.41.14

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

## 3.41.13

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

## 3.41.12

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

## 3.41.11

### Patch Changes

- [#2366](https://github.com/refinedev/refine/pull/2366) [`de87f13dad`](https://github.com/refinedev/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - `lodash` moved to "dependencies" for CommonJS builds

## 3.41.10

### Patch Changes

- `lodash` moved to dependencies.

## 3.41.9

### Patch Changes

- [#2350](https://github.com/refinedev/refine/pull/2350) [`f8e5d99598`](https://github.com/refinedev/refine/commit/f8e5d99598265af434f25fde104fafc9b7cac792) Thanks [@ozkalai](https://github.com/ozkalai)! - `lodash` moved to dependencies.

## 3.41.8

### Patch Changes

- Added React 17 support to `peerDependencies`.

## 3.41.7

### Patch Changes

- [#2306](https://github.com/refinedev/refine/pull/2306) [`bb3183d3eb`](https://github.com/refinedev/refine/commit/bb3183d3eb4b257cafd98f0ef8949e4c0ddb9e90) Thanks [@aliemir](https://github.com/aliemir)! - Added React 17 support to `peerDependencies`.

## 3.41.6

### Patch Changes

- Fixed `StackProps` and `StackTypeMap` type exports

## 3.41.5

### Patch Changes

- [#2300](https://github.com/refinedev/refine/pull/2300) [`59f9e5eebf`](https://github.com/refinedev/refine/commit/59f9e5eebf372da36fc953d1affb04f393aac88d) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `StackProps` and `StackTypeMap` type exports

## 3.41.4

### Patch Changes

- Upgraded `react-query` version to 4.

- Updated dependencies []:
  - @pankod/refine-react-hook-form@3.31.2

## 3.41.3

### Patch Changes

- [#2260](https://github.com/refinedev/refine/pull/2260) [`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgraded `react-query` version to 4.

- Updated dependencies [[`6847672849`](https://github.com/refinedev/refine/commit/68476728494dc0fd412883de30e2c99c75a1d559)]:
  - @pankod/refine-react-hook-form@3.31.1

## 3.41.2

### Patch Changes

- Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

* Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

  Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

  Updated `@pankod/refine-ui-tests` `fields` properties.

- Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

  Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

- Updated dependencies []:
  - @pankod/refine-ui-types@0.3.0

## 3.41.1

### Patch Changes

- [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

* [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

  Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

  Updated `@pankod/refine-ui-tests` `fields` properties.

- [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

  Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

- Updated dependencies [[`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a)]:
  - @pankod/refine-ui-types@0.2.0

## 3.41.0

### Minor Changes

- Add React@18 support 🚀

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-react-hook-form@3.31.0

## 3.40.0

### Minor Changes

- [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

### Patch Changes

- Updated dependencies [[`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb)]:
  - @pankod/refine-react-hook-form@3.30.0

## 3.39.2

### Patch Changes

- Updated `console.warn`'s to trigger once.

## 3.39.1

### Patch Changes

- [#2223](https://github.com/refinedev/refine/pull/2223) [`0a215f2000`](https://github.com/refinedev/refine/commit/0a215f2000b4069618e42efda48b8864b38129fd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `console.warn`'s to trigger once.

## 3.39.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-react-hook-form@3.29.0

## 3.38.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

- Updated dependencies [[`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5)]:
  - @pankod/refine-react-hook-form@3.28.0

## 3.37.2

### Patch Changes

- Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

- Updated dependencies []:
  - @pankod/refine-core@3.38.0

## 3.37.1

### Patch Changes

- [#2106](https://github.com/refinedev/refine/pull/2106) [`10a20d8714`](https://github.com/refinedev/refine/commit/10a20d87142b694bc9c02afaee5b4fe6c5853c5a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

- Updated dependencies [[`9d77c63a92`](https://github.com/refinedev/refine/commit/9d77c63a925dca0133b3e83974dff486a2233017), [`98966b586f`](https://github.com/refinedev/refine/commit/98966b586f6febd8669065b5b453a8e441f76bc1)]:
  - @pankod/refine-core@3.37.0

## 3.37.0

### Minor Changes

- The `useDataGrid` hook required the `columns` property. Therefore, the `queryResult` could not be used in the `columns`. Now, we can define the `columns` property wherever we want since the `useDataGrid` hook does not take the `column` property.

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

## 3.36.0

### Minor Changes

- [#2072](https://github.com/refinedev/refine/pull/2072) [`bbca622ede`](https://github.com/refinedev/refine/commit/bbca622eded117271350aa178b3e757c890c5bc4) Thanks [@salihozdemir](https://github.com/salihozdemir)! - The `useDataGrid` hook required the `columns` property. Therefore, the `queryResult` could not be used in the `columns`. Now, we can define the `columns` property wherever we want since the `useDataGrid` hook does not take the `column` property.

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

## 3.34.0

### Minor Changes

- Updated `useDataGrid` hook with `hasPagination` to enable/disable pagination.

  **Implementation**

  Updated the `useDataGrid` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

  **Use Cases**

  In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

- Fixed `<Link>` usage in packages.

  ```diff
  - <Link href={route} to={route}>
  -    {label}
  - </Link>
  + <Link to={route}>{label}</Link>
  ```

  We used to have to pass `href` and `to` for Next.js and React applications, now we just need to pass `to`. **refine** router providers handle for us.

- Updated dependencies []:
  - @pankod/refine-core@3.36.0

## 3.33.0

### Minor Changes

- [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `useDataGrid` hook with `hasPagination` to enable/disable pagination.

  **Implementation**

  Updated the `useDataGrid` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

  **Use Cases**

  In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

- [#2061](https://github.com/refinedev/refine/pull/2061) [`0237725cf3`](https://github.com/refinedev/refine/commit/0237725cf32923f7d24d3f0c9a2994de30baa921) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `<Link>` usage in packages.

  ```diff
  - <Link href={route} to={route}>
  -    {label}
  - </Link>
  + <Link to={route}>{label}</Link>
  ```

  We used to have to pass `href` and `to` for Next.js and React applications, now we just need to pass `to`. **refine** router providers handle for us.

- Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
  - @pankod/refine-core@3.35.0

## 3.32.0

### Minor Changes

- - Created `<Breadcrumb>` component from [`<Breadcrumbs>`](https://mui.com/material-ui/react-breadcrumbs/#api)
  - Added `<Breadcrumb>` component to `CRUD` components. (`<List>`, `<Create>`, `<Edit>`, `<Show>`)
  - Added breadcrumb props to all `CRUD` components. We can use `breadcrumbs` prop to add custom breadcrumbs.

### Patch Changes

- Fixed missing imports (`DefaultColorScheme`, `ExtendedColorScheme` and `ThemeInput`) in `@mui/material/styles` in `@pankod/refine-mui` package.

- Updated dependencies []:
  - @pankod/refine-core@3.34.2

## 3.31.0

### Minor Changes

- [#2027](https://github.com/refinedev/refine/pull/2027) [`fe2df4b788`](https://github.com/refinedev/refine/commit/fe2df4b788ceb367db4e949507b9f6a9f8174582) Thanks [@biskuvit](https://github.com/biskuvit)! - - Created `<Breadcrumb>` component from [`<Breadcrumbs>`](https://mui.com/material-ui/react-breadcrumbs/#api)
  - Added `<Breadcrumb>` component to `CRUD` components. (`<List>`, `<Create>`, `<Edit>`, `<Show>`)
  - Added breadcrumb props to all `CRUD` components. We can use `breadcrumbs` prop to add custom breadcrumbs.

### Patch Changes

- [#2063](https://github.com/refinedev/refine/pull/2063) [`2067ac6bcb`](https://github.com/refinedev/refine/commit/2067ac6bcba93bc98c91e7e0a012e203120d42dc) Thanks [@aliemir](https://github.com/aliemir)! - Fixed missing imports (`DefaultColorScheme`, `ExtendedColorScheme` and `ThemeInput`) in `@mui/material/styles` in `@pankod/refine-mui` package.

- Updated dependencies [[`0338ce9d6b`](https://github.com/refinedev/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09)]:
  - @pankod/refine-core@3.34.1

## 3.30.9

### Patch Changes

- [#2039](https://github.com/refinedev/refine/pull/2039) [`6c8e1c9be2`](https://github.com/refinedev/refine/commit/6c8e1c9be273ade2ba918490f319880ddd4d60ed) Thanks [@ozkalai](https://github.com/ozkalai)! - Added the `description` property to the notifications

## 3.30.8

### Patch Changes

- We have fixed texts with translations of default login pages in Material UI and Headless.

* Update default variant of `<DeleteButton>` to `text` and replace overrides in the `<Edit>` crud component.

- dashboard icon changed from `<ListOutlined>` to [`<Dashboard>`](https://mui.com/material-ui/material-icons/?query=Dashboard&selected=Dashboard) in `<Sider>` for **Material UI** package

- Updated dependencies []:
  - @pankod/refine-core@3.34.0

## 3.30.7

### Patch Changes

- [#2029](https://github.com/refinedev/refine/pull/2029) [`b257d87fef`](https://github.com/refinedev/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184) Thanks [@ozkalai](https://github.com/ozkalai)! - We have fixed texts with translations of default login pages in Material UI and Headless.

* [#2033](https://github.com/refinedev/refine/pull/2033) [`14e14709ec`](https://github.com/refinedev/refine/commit/14e14709ecd8f2c5106cbcaca3a1acd966d69a07) Thanks [@ozkalai](https://github.com/ozkalai)! - Update default variant of `<DeleteButton>` to `text` and replace overrides in the `<Edit>` crud component.

- [#2022](https://github.com/refinedev/refine/pull/2022) [`01f8631953`](https://github.com/refinedev/refine/commit/01f8631953c17f7e5ef2c6b7aa20aed825b7f235) Thanks [@biskuvit](https://github.com/biskuvit)! - dashboard icon changed from `<ListOutlined>` to [`<Dashboard>`](https://mui.com/material-ui/material-icons/?query=Dashboard&selected=Dashboard) in `<Sider>` for **Material UI** package

- Updated dependencies [[`d96ba1e9c8`](https://github.com/refinedev/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d), [`b257d87fef`](https://github.com/refinedev/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184), [`12f08ae6a3`](https://github.com/refinedev/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58)]:
  - @pankod/refine-core@3.33.0

## 3.30.6

### Patch Changes

- Add Dashboard item to default `<Sider/>`

- Updated dependencies []:
  - @pankod/refine-core@3.32.0

## 3.30.5

### Patch Changes

- [#2009](https://github.com/refinedev/refine/pull/2009) [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Add Dashboard item to default `<Sider/>`

- Updated dependencies [[`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0)]:
  - @pankod/refine-core@3.31.0

## 3.30.4

### Patch Changes

- Deprecated `useMenu` from `@pankod/refine-antd` and replaced with the `useMenu` from `@pankod/refine-core`

* Remove unused `transition` property from `@pankod/refine-mui`'s `<Layout/>`

* Updated dependencies []:
  - @pankod/refine-core@3.30.0

## 3.30.4

### Patch Changes

- Fix styling for buttons in loading state

* Fix the spacing of header and footer actions in crud components and updated their snapshot tests.

* Updated dependencies []:
  - @pankod/refine-core@3.29.2

## 3.30.3

### Patch Changes

- We've updated `secondary` color to `#2A132E`

* Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

* Updated dependencies []:
  - @pankod/refine-react-hook-form@3.27.2

## 3.30.2

### Patch Changes

- [#1945](https://github.com/refinedev/refine/pull/1945) [`592a401924`](https://github.com/refinedev/refine/commit/592a40192482cf88108348ed21db437e6d304a43) Thanks [@omeraplak](https://github.com/omeraplak)! - Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

## 3.30.1

### Patch Changes

- [#1936](https://github.com/refinedev/refine/pull/1936) [`0695c6fa01`](https://github.com/refinedev/refine/commit/0695c6fa01716620dda842e1dd44222e06650d51) Thanks [@omeraplak](https://github.com/omeraplak)! - We've updated `secondary` color to `#2A132E`

- Updated dependencies [[`4012d3c4ae`](https://github.com/refinedev/refine/commit/4012d3c4aeb61a6190f7624b662cbd20ca900679)]:
  - @pankod/refine-react-hook-form@3.27.1

## 3.30.0

### Minor Changes

- Added default `sx` property for Material UI buttons.

  ```tsx
  const { sx, ...restProps } = rest;

  <Button sx={{ minWidth: 0, ...sx }} {...restProps} />;
  ```

### Patch Changes

- Fixed the `useDataGrid` filter bug that the selected filter was not displayed.

* Applied `refine`'s base theme to `@pankod/refine-mui` package with dark and light options.

- Refactor default `<Sider>` component of `@pankod/refine-mui`

- Updated dependencies []:
  - @pankod/refine-react-hook-form@3.27.0

## 3.29.0

### Minor Changes

- Added new provider. `<RefineSnackbarProvider/>` for notifications.

### Patch Changes

- We are fixed the buttons' icon fontSize when hideText prop passed

* Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

- Fixed Material UI `ReadyPage` to be responsive for any screen

* Added missing exports from `notistack` package.

- Added `svgButtonProps` property for Material UI buttons.

  ```tsx
  <CreateButton svgButtonProps={{ size: "small" }} />
  ```

* Fixed Material UI `<ErrorComponent />` to be responsive for any screen

* Updated dependencies []:
  - @pankod/refine-core@3.29.0

## 3.28.0

### Minor Changes

- Added new provider. `<RefineSnackbarProvider/>` for notifications.

### Patch Changes

- We are fixed the buttons' icon fontSize when hideText prop passed

* Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

- Fixed Material UI `ReadyPage` to be responsive for any screen

* Added missing exports from `notistack` package.

- Added `svgButtonProps` property for Material UI buttons.

  ```tsx
  <CreateButton svgButtonProps={{ size: "small" }} />
  ```

* Fixed Material UI `<ErrorComponent />` to be responsive for any screen

* Updated dependencies []:
  - @pankod/refine-core@3.28.0

## 3.27.0

### Minor Changes

- Added new provider. `<RefineSnackbarProvider/>` for notifications.

### Patch Changes

- We are fixed the buttons' icon fontSize when hideText prop passed

* Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

- Fixed Material UI `ReadyPage` to be responsive for any screen

* Added missing exports from `notistack` package.

- Added `svgButtonProps` property for Material UI buttons.

  ```tsx
  <CreateButton svgButtonProps={{ size: "small" }} />
  ```

* Fixed Material UI `<ErrorComponent />` to be responsive for any screen

* Updated dependencies []:
  - @pankod/refine-core@3.27.0

## 3.26.0

### Minor Changes

- [#1911](https://github.com/refinedev/refine/pull/1911) [`6aa09d34b8`](https://github.com/refinedev/refine/commit/6aa09d34b8756d22b76cb9804814594e730587b0) Thanks [@biskuvit](https://github.com/biskuvit)! - Added new provider. `<RefineSnackbarProvider/>` for notifications.

## 3.25.2

### Patch Changes

- [#1909](https://github.com/refinedev/refine/pull/1909) [`0170b1306d`](https://github.com/refinedev/refine/commit/0170b1306d38d20891a189e3103a7a8bddd3a3dc) Thanks [@aliemir](https://github.com/aliemir)! - Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

* [#1896](https://github.com/refinedev/refine/pull/1896) [`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746) Thanks [@aliemir](https://github.com/aliemir)! - Added missing exports from `notistack` package.

* Updated dependencies [[`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746)]:
  - @pankod/refine-core@3.26.0

## 3.25.1

### Patch Changes

- [#1898](https://github.com/refinedev/refine/pull/1898) [`906cf51eca`](https://github.com/refinedev/refine/commit/906cf51eca72201d4469a5e2f5cbd7842b9a2796) Thanks [@ozkalai](https://github.com/ozkalai)! - We are fixed the buttons' icon fontSize when hideText prop passed

* [#1889](https://github.com/refinedev/refine/pull/1889) [`683fd6f932`](https://github.com/refinedev/refine/commit/683fd6f932624e284195005c8408935a89da73d3) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed Material UI `ReadyPage` to be responsive for any screen

- [#1878](https://github.com/refinedev/refine/pull/1878) [`07a2c48157`](https://github.com/refinedev/refine/commit/07a2c481572d31bb50dbfa1160ff1759b6b50fbb) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `svgButtonProps` property for Material UI buttons.

  ```tsx
  <CreateButton svgButtonProps={{ size: "small" }} />
  ```

* [#1890](https://github.com/refinedev/refine/pull/1890) [`607de3446b`](https://github.com/refinedev/refine/commit/607de3446ba314a05e9deca88dd41a09f343e7b9) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed Material UI `<ErrorComponent />` to be responsive for any screen

## 3.18.0-next.1

### Minor Changes

- [#1877](https://github.com/refinedev/refine/pull/1877) [`5bc54c25d6`](https://github.com/refinedev/refine/commit/5bc54c25d60bce9af44ae3feb1c9e4cb38c8b866) Thanks [@aliemir](https://github.com/aliemir)! - Add `useDataGrid` hook documentation.

### Patch Changes

- [#1878](https://github.com/refinedev/refine/pull/1878) [`07a2c48157`](https://github.com/refinedev/refine/commit/07a2c481572d31bb50dbfa1160ff1759b6b50fbb) Thanks [@omeraplak](https://github.com/omeraplak)! - Passed svgButtonProps to mui buttons

## 3.17.1-next.0

### Patch Changes

- [#1755](https://github.com/refinedev/refine/pull/1755) [`a81836bc36`](https://github.com/refinedev/refine/commit/a81836bc3670fbcceb4dac7d1f6b3c006fcee9bc) Thanks [@salihozdemir](https://github.com/salihozdemir)! - [Notistack](https://github.com/iamhosseindhv/notistack) `SnackbarProvider` which is used as a notification provider (from `@pankod/refine-mui`) has been made compatible with the theme in the example of the fine food.

* [#1755](https://github.com/refinedev/refine/pull/1755) [`a81836bc36`](https://github.com/refinedev/refine/commit/a81836bc3670fbcceb4dac7d1f6b3c006fcee9bc) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Notistack toast mobile view fixed

## 3.17.0-next.0

### Minor Changes

- [#1867](https://github.com/refinedev/refine/pull/1867) [`da2e12314d`](https://github.com/refinedev/refine/commit/da2e12314de122405268d07982aa27998c127de4) Thanks [@ozkalai](https://github.com/ozkalai)! - Notistack toast mobile view fixed

### Patch Changes

- [#1850](https://github.com/refinedev/refine/pull/1850) [`40b3faca10`](https://github.com/refinedev/refine/commit/40b3faca10d420d5ac21fb9a591db86c009439b8) Thanks [@ozkalai](https://github.com/ozkalai)! - [Notistack](https://github.com/iamhosseindhv/notistack) `SnackbarProvider` which is used as a notification provider (from `@pankod/refine-mui`) has been made compatible with the theme in the example of the fine food.
