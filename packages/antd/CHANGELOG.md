# @refinedev/antd

## 6.0.3

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

- Updated dependencies [[`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3)]:
  - @refinedev/ui-types@2.0.1

## 6.0.2

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

## 6.0.1

### Patch Changes

- [#6972](https://github.com/refinedev/refine/pull/6972) [`535707a5653045352ca2fcfa78fb45ebbb852b6a`](https://github.com/refinedev/refine/commit/535707a5653045352ca2fcfa78fb45ebbb852b6a) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - chore: dummy update

## 6.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade Ant Design integration for Refine 5.0

  - Updated to latest Ant Design version with deprecated API cleanup and modernized components.
  - Removed legacy components and restructured hooks and componetns for better developer experience.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98), [`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/ui-types@2.0.0
  - @refinedev/core@5.0.0

## 5.47.0

### Minor Changes

- [#6880](https://github.com/refinedev/refine/pull/6880) [`2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2`](https://github.com/refinedev/refine/commit/2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2) Thanks [@arndom](https://github.com/arndom)! - - Add `siderItemsAreCollapsed` prop to all `Sider` components to set default expanded/collapsed nested sider items.

  - UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6721](https://github.com/refinedev/refine/issues/6721)

### Patch Changes

- [#6958](https://github.com/refinedev/refine/pull/6958) [`b447eb36f4e18da63493a1cbd7ad0792eea792e3`](https://github.com/refinedev/refine/commit/b447eb36f4e18da63493a1cbd7ad0792eea792e3) Thanks [@arndom](https://github.com/arndom)! - - Export `useDrawer`out of antd package.

  [Resolves #6944](https://github.com/refinedev/refine/issues/6944)

## 5.46.3

### Patch Changes

- [#6892](https://github.com/refinedev/refine/pull/6892) [`5c77cf157afdfa4406bb5832474a9d1637d5f033`](https://github.com/refinedev/refine/commit/5c77cf157afdfa4406bb5832474a9d1637d5f033) Thanks [@arndom](https://github.com/arndom)! - - Add `useDrawer` hook.

  - Refactor `useDrawerForm` to use `useDrawer`.

  [Resolves #6770](https://github.com/refinedev/refine/issues/6770)

## 5.46.2

### Patch Changes

- [#6835](https://github.com/refinedev/refine/pull/6835) [`e78213ff7fdcace9bac455861123299bfdab4452`](https://github.com/refinedev/refine/commit/e78213ff7fdcace9bac455861123299bfdab4452) Thanks [@amulyavarshney](https://github.com/amulyavarshney)! - feat: add `autoResetFormWhenClose` option to `useModalForm` hook

  Added `autoResetFormWhenClose` prop to reset form when modal closes. Default is `true`.

## 5.46.1

### Patch Changes

📢 **Refine Community Release** 📢

- Fixes event handler issue in ImportButton, ensuring Tooltip works correctly.
  Fixes #6631.

📢 **Refine Community Release** 📢

- - Add `deleteButtonProps` prop to the `Show` component of UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6692](https://github.com/refinedev/refine/issues/6692)

- Updated dependencies []:
  - @refinedev/ui-types@1.24.2

## 5.46.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6699](https://github.com/refinedev/refine/pull/6699) [`cd938b04cb004b61174d65811467469abaf2db3f`](https://github.com/refinedev/refine/commit/cd938b04cb004b61174d65811467469abaf2db3f) Thanks [@arndom](https://github.com/arndom)! - - Add `deleteButtonProps` prop to the `Show` component of UI packages: AntDesign, Manitine, Charka-UI, Material-UI

  - Add documenation for this addition

  [Resolves #6692](https://github.com/refinedev/refine/issues/6692)

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6701](https://github.com/refinedev/refine/pull/6701) [`b72c7ce83133011fa96bb81d660fbb2c23ab8acc`](https://github.com/refinedev/refine/commit/b72c7ce83133011fa96bb81d660fbb2c23ab8acc) Thanks [@mohit-2003](https://github.com/mohit-2003)! - Fixes event handler issue in ImportButton, ensuring Tooltip works correctly.
  Fixes #6631.
- Updated dependencies [[`cd938b04cb004b61174d65811467469abaf2db3f`](https://github.com/refinedev/refine/commit/cd938b04cb004b61174d65811467469abaf2db3f)]:
  - @refinedev/ui-types@1.24.0

## 5.45.3

### Patch Changes

📢 **Refine Community Release** 📢

- fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 5.45.2

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6683](https://github.com/refinedev/refine/pull/6683) [`a12a0821e3c573386c2a8eea4ac1582cc46dd26d`](https://github.com/refinedev/refine/commit/a12a0821e3c573386c2a8eea4ac1582cc46dd26d) Thanks [@aliemir](https://github.com/aliemir)! - fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 5.45.1

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

- feat: added `minItems` prop to specify the minimum number of items required for rendering breadcrumbs. #6497

  Resolves [#6497](https://github.com/refinedev/refine/issues/6497)

📢 **Refine Community Release** 📢

- Enhanced the ThemedSideV2 component with new functionality to support dynamic onSiderCollapsed handling. This allows better customization of sider collapse/expand events and improved responsiveness for mobile and desktop views. Added additional type definitions and ensured compatibility across all layout contexts. resolves #6508

- Updated dependencies []:
  - @refinedev/ui-types@1.23.1

## 5.45.0

### Minor Changes

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

- Updated dependencies [[`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706), [`29d00f8dc49485e0f5c42d208417e158118d11f2`](https://github.com/refinedev/refine/commit/29d00f8dc49485e0f5c42d208417e158118d11f2), [`1d2613381c50f438270d6a3e486595d54496ef92`](https://github.com/refinedev/refine/commit/1d2613381c50f438270d6a3e486595d54496ef92)]:
  - @refinedev/ui-types@1.23.0

## 5.44.0

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

- [#6445](https://github.com/refinedev/refine/pull/6445) [`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: update `@ant-design/icons` and `@ant-design/pro-layout` versions

  Updated previously pinned versions of `@ant-design/icons` from `5.0.1` and `@ant-design/pro-layout` from `7.17.12` to latest versions. This minor update resolves the previous issues with `React@18` types and conflicting type ranges with `@ant-design/pro-layout` package.

  After `@ant-design/icons` version `5.4.0` build issues and type issues are resolved. Following this release `@ant-design/pro-layout` also updated its dependency range to match the latest `@ant-design/icons` version.

  Previously `@ant-design/icons` were pinned to `5.0.1` and recommended to pin in projects as well. After this update, you may also need to update the `@ant-design/icons` version in your project to match the latest version. (A range above `^5.5.1` is required to match `@refinedev/antd`).

  [Resolves #6363](https://github.com/refinedev/refine/issues/6363)
  [Resolves #5931 - previously resolved by #5934](https://github.com/refinedev/refine/issues/5931)
  [Accompanies #6354 - `@ant-design/pro-layout` also depends on `express` dependency and updated its version in the latest release](https://github.com/refinedev/refine/pull/6354)

## 5.43.1

### Patch Changes

- [#6245](https://github.com/refinedev/refine/pull/6245) [`7ba4ea1ffdd2e2ed2f0ed2b1ee386dab5015dd2d`](https://github.com/refinedev/refine/commit/7ba4ea1ffdd2e2ed2f0ed2b1ee386dab5015dd2d) Thanks [@youssefsiam38](https://github.com/youssefsiam38)! - fix(antd): rtl support for mobile sider trigger and drawer placement

  `<ThemedLayoutV2 />` has RTL support but it lacks the mobile sider trigger and drawer placement. This change places the drawer depending on the preferred direction. It also adds RTL support for the styling of the mobile sider trigger.

  [Fixes #6263](https://github.com/refinedev/refine/issues/6263)

## 5.43.0

### Minor Changes

- [#6180](https://github.com/refinedev/refine/pull/6180) [`292cebc5a70f19400793292b79d1400fec114591`](https://github.com/refinedev/refine/commit/292cebc5a70f19400793292b79d1400fec114591) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useSelect`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-select/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

  ```diff
  import { useSelect } from '@refinedev/antd';

  - const { queryResult, defaultValueQueryResult } = useSelect();
  + const { query, defaultValueQuery } = useSelect();
  ```

  feat: [`useCheckboxGroup`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-checkbox-group/)'s `queryResult` is deprecated, use `query` instead.

  ```diff
  import { useCheckboxGroup } from '@refinedev/antd';

  - const { queryResult } = useCheckboxGroup();
  + const { query } = useCheckboxGroup();
  ```

  feat: [`useRadioGroup`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-radio-group/)'s `queryResult` is deprecated, use `query` instead.

  ```diff
  import { useRadioGroup } from '@refinedev/antd';

  - const { queryResult } = useRadioGroup();
  + const { query } = useRadioGroup();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

- [#6172](https://github.com/refinedev/refine/pull/6172) [`4967a51944c139d102fcfc04ada5a42c725ed7c2`](https://github.com/refinedev/refine/commit/4967a51944c139d102fcfc04ada5a42c725ed7c2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useTable`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/)'s `tableQueryResult` is deprecated, use `tableQuery` instead. #6169

  ```diff
  import { useTable } from '@refinedev/core';

  - const { tableQueryResult } = useTable();
  + const { tableQuery } = useTable();
  ```

  feat: [`useSimpleList`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-simple-list/)'s `queryResult` is deprecated, use `query` instead. #6169

  ```diff
  import { useSimpleList } from '@refinedev/antd';

  - const { queryResult } = useSimpleList();
  + const { query } = useSimpleList();
  ```

  > ✨ You can use `@refinedev/codemod` to automatically migrate your codebase. Simply run the following command in your project's root directory:
  >
  > ```bash
  > npx @refinedev/codemod@latest rename-query-and-mutation-result
  > ```

### Patch Changes

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

## 5.42.0

### Minor Changes

- [#6074](https://github.com/refinedev/refine/pull/6074) [`311dcdc454ee6914218a59198b5d423a4f8e5456`](https://github.com/refinedev/refine/commit/311dcdc454ee6914218a59198b5d423a4f8e5456) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: [`useDrawerForm`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-drawer-form/)'s `submit` and `form` props are not working (#6082).

  - `submit` prop is removed from `useDrawerForm` hook. Instead, you can use `onFinish` prop to handle the form submission.
    https://refine.dev/docs/guides-concepts/forms/#modifying-data-before-submission

  - `form` prop is removed from `useDrawerForm` hook.
    The purpose of `useDrawerForm` is to create a `form` instance. Because of that `form` instance cannot be passed as a prop.

- [#6071](https://github.com/refinedev/refine/pull/6071) [`853bef97ed7baf59e74c98fc54c0ed11624fb491`](https://github.com/refinedev/refine/commit/853bef97ed7baf59e74c98fc54c0ed11624fb491) Thanks [@Dominic-Preap](https://github.com/Dominic-Preap)! - feat: add `selectedOptionsOrder` in `useSelect`

  Now with `selectedOptionsOrder`, you can sort `selectedOptions` at the top of list when use `useSelect` with `defaultValue`.

  Resolves [#6061](https://github.com/refinedev/refine/issues/6061)

- [#6074](https://github.com/refinedev/refine/pull/6074) [`311dcdc454ee6914218a59198b5d423a4f8e5456`](https://github.com/refinedev/refine/commit/311dcdc454ee6914218a59198b5d423a4f8e5456) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `useForm`'s `defaultFormValues` prop is not working (#5727).

  From now on, `useForm`, `useDrawerForm`, and `useModalForm` hooks accept the `defaultFormValues` prop to pre-populate the form with data that needs to be displayed.

  ```tsx
  useForm({
    defaultFormValues: {
      title: "Hello World",
    },
  });
  ```

  Also, it can be provided as an async function to fetch the default values. The loading state can be tracked using the `defaultFormValuesLoading` state returned from the hook.

  > 🚨 When `action` is "edit" or "clone" a race condition with `async defaultFormValues` may occur. In this case, the form values will be the result of the last completed operation.

  ```tsx
  const { defaultFormValuesLoading } = useForm({
    defaultFormValues: async () => {
      const response = await fetch("https://my-api.com/posts/1");
      const data = await response.json();
      return data;
    },
  });
  ```

### Patch Changes

- [#6021](https://github.com/refinedev/refine/pull/6021) [`55cd0662b1e3ff8f8410eba812e80130afe75d14`](https://github.com/refinedev/refine/commit/55cd0662b1e3ff8f8410eba812e80130afe75d14) Thanks [@JayBhensdadia](https://github.com/JayBhensdadia)! - fix: ensure Sider component handles various resource name formats correctly

  Updated Sider component to correctly handle lowercase and camelcased resource names, enhancing usability and functionality.

  Fixes #6004

- [#5984](https://github.com/refinedev/refine/pull/5984) [`658891c413b1fc83b75905919eabc94f08482e61`](https://github.com/refinedev/refine/commit/658891c413b1fc83b75905919eabc94f08482e61) Thanks [@ApsMJ23](https://github.com/ApsMJ23)! - fix(antd): use appropriate icons for RTL direction layouts

  Previously CRUD components and `<ThemedSiderV2 />` component used hardcoded icons which doesn't fit well for RTL layouts. This PR uses Ant Design's `ConfigProvider` context to use `direction` to determine the appropriate icons for RTL layouts.

  **Example**

  ```tsx
  import { ConfigProvider } from 'antd';
  import { Refine } from '@refinedev/antd';

  const App = () => (
    <ConfigProvider direction="rtl">
      <Refine
          {/* ... */}
      />
    </ConfigProvider>
  );
  ```

  When any CRUD component or `<ThemedSiderV2 />` component is rendered, the icons will be rendered with respect to the `direction` prop of `ConfigProvider`.

- [#6064](https://github.com/refinedev/refine/pull/6064) [`b516c18b828ba8823561d0fefc4afe02b45ce332`](https://github.com/refinedev/refine/commit/b516c18b828ba8823561d0fefc4afe02b45ce332) Thanks [@aliemir](https://github.com/aliemir)! - fix(auto-save-indicator): replace reserved `key` prop with `translationKey` in <Message /> components

  `<AutoSaveIndicator />` components from UI libraries have been using a `<Message />` component internally that uses a `key` prop. Since `key` is a reserved prop in React, it was causing a warning in the console. This change replaces the `key` prop with `translationKey` to avoid the warning.

  Resolves [#6067](https://github.com/refinedev/refine/issues/6067)

## 5.40.0

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

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - lock the `ant-design/icons` version to `5.0.1`

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: unpin `antd` version that was causing build issues

  With `antd`'s `5.17.0` version, Next.js apps were stuck in the build process. To prevent this from breaking all Refine apps with Next.js, we've pinned the version to `5.16.5` as a workaround. Since then, the issue has been resolved by updating an internal dependency of `antd`, we no longer need to pin the version.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat(antd): search form in useTable should work with syncWithLocation

  Even though the form is managed by `useTable` hook from `@refinedev/antd`. It wasn't respecting the `syncWithLocation` prop to set values accordingly at initial render when registered fields are matching with the query params. Now it will look for matching fields and set values accordingly from synced filters.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: Filtering [`<Table />`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/) with [`<FilterDropdown />`](https://refine.dev/docs/ui-integrations/ant-design/components/filter-dropdown) and [`<DatePicker />`](https://ant.design/components/date-picker) doesn't work with `syncWithLocation`. #5933

  feat: Added [`rangePickerFilterMapper`](https://refine.dev/docs/ui-integrations/ant-design/components/filter-dropdown/#rangepickerfiltermapper) utility function to convert `selectedKeys` to satisfy both the Refine and [`<DatePicker.RangePicker />`](https://ant.design/components/date-picker).

  Usage example:

  ```tsx
  import { getDefaultFilter } from "@refinedev/core";
  import {
    DateField,
    FilterDropdown,
    rangePickerFilterMapper,
    useTable,
  } from "@refinedev/antd";
  import { Table, DatePicker } from "antd";

  export const Posts = () => {
    const { tableProps, filters } = useTable({
      filters: {
        initial: [
          {
            field: "created_at",
            value: ["2022-01-01", "2022-01-31"],
            operator: "between",
          },
        ],
      },
    });

    return (
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              mapValue={(selectedKeys, event) => {
                return rangePickerFilterMapper(selectedKeys, event);
              }}
            >
              <DatePicker.RangePicker />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter(
            "created_at",
            filters,
            "between",
          )}
        />
      </Table>
    );
  };
  ```

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046)]:
  - @refinedev/ui-types@1.22.9

## 5.39.0

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

- [#5945](https://github.com/refinedev/refine/pull/5945) [`cff950ba8b66143f5c08c3ef9f4cd112a9dc7448`](https://github.com/refinedev/refine/commit/cff950ba8b66143f5c08c3ef9f4cd112a9dc7448) Thanks [@aliemir](https://github.com/aliemir)! - lock the `ant-design/icons` version to `5.0.1`

- [#5945](https://github.com/refinedev/refine/pull/5945) [`fa31883601d3d0abd690dac62eed94487091022b`](https://github.com/refinedev/refine/commit/fa31883601d3d0abd690dac62eed94487091022b) Thanks [@aliemir](https://github.com/aliemir)! - chore: unpin `antd` version that was causing build issues

  With `antd`'s `5.17.0` version, Next.js apps were stuck in the build process. To prevent this from breaking all Refine apps with Next.js, we've pinned the version to `5.16.5` as a workaround. Since then, the issue has been resolved by updating an internal dependency of `antd`, we no longer need to pin the version.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`fc1f7d91b1aa987c29a700b5227e744b27aeddda`](https://github.com/refinedev/refine/commit/fc1f7d91b1aa987c29a700b5227e744b27aeddda) Thanks [@aliemir](https://github.com/aliemir)! - feat(antd): search form in useTable should work with syncWithLocation

  Even though the form is managed by `useTable` hook from `@refinedev/antd`. It wasn't respecting the `syncWithLocation` prop to set values accordingly at initial render when registered fields are matching with the query params. Now it will look for matching fields and set values accordingly from synced filters.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`f91bbb4a5c81cb8d22756ef05f6def9bd1a4ca12`](https://github.com/refinedev/refine/commit/f91bbb4a5c81cb8d22756ef05f6def9bd1a4ca12) Thanks [@aliemir](https://github.com/aliemir)! - fix: Filtering [`<Table />`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/) with [`<FilterDropdown />`](https://refine.dev/docs/ui-integrations/ant-design/components/filter-dropdown) and [`<DatePicker />`](https://ant.design/components/date-picker) doesn't work with `syncWithLocation`. #5933

  feat: Added [`rangePickerFilterMapper`](https://refine.dev/docs/ui-integrations/ant-design/components/filter-dropdown/#rangepickerfiltermapper) utility function to convert `selectedKeys` to satisfy both the Refine and [`<DatePicker.RangePicker />`](https://ant.design/components/date-picker).

  Usage example:

  ```tsx
  import { getDefaultFilter } from "@refinedev/core";
  import {
    DateField,
    FilterDropdown,
    rangePickerFilterMapper,
    useTable,
  } from "@refinedev/antd";
  import { Table, DatePicker } from "antd";

  export const Posts = () => {
    const { tableProps, filters } = useTable({
      filters: {
        initial: [
          {
            field: "created_at",
            value: ["2022-01-01", "2022-01-31"],
            operator: "between",
          },
        ],
      },
    });

    return (
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              mapValue={(selectedKeys, event) => {
                return rangePickerFilterMapper(selectedKeys, event);
              }}
            >
              <DatePicker.RangePicker />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter(
            "created_at",
            filters,
            "between",
          )}
        />
      </Table>
    );
  };
  ```

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`903ea231538b00ce02ddc9394c72848ec1e90772`](https://github.com/refinedev/refine/commit/903ea231538b00ce02ddc9394c72848ec1e90772), [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d)]:
  - @refinedev/ui-types@1.22.8

## 5.38.1

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

- Updated dependencies [[`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d)]:
  - @refinedev/ui-types@1.22.7

## 5.38.0

### Minor Changes

- [#5868](https://github.com/refinedev/refine/pull/5868) [`a82ef6afc15`](https://github.com/refinedev/refine/commit/a82ef6afc1512631ca3f7936818d646e4c7d0725) Thanks [@Ac-Srikanth](https://github.com/Ac-Srikanth)! - feat: add message prop for required auth input fields for the above packages.

  Now you can provide custom required messages with translate feature for all auth input fields(Login, register, forget password,update password).

  Resolves #[5855](https://github.com/refinedev/refine/issues/5855)

### Patch Changes

- [#5887](https://github.com/refinedev/refine/pull/5887) [`113c1337bf0`](https://github.com/refinedev/refine/commit/113c1337bf02ecf22b4beb459b06a6acadc0e11d) Thanks [@aliemir](https://github.com/aliemir)! - chore: remove version lock from @ant-design/icons 5.0.1 to ^5.0.1

- [#5920](https://github.com/refinedev/refine/pull/5920) [`df0dad6ca46`](https://github.com/refinedev/refine/commit/df0dad6ca46ac86574722723daa543fab849c406) Thanks [@aliemir](https://github.com/aliemir)! - fix: lock `antd` version to `5.16.5` due to broken builds in `5.17.0`

  In the latest release of `antd` package, Next.js apps are failing to build or taking extremely long time to build. Until this issue is fixed in the `antd` package, we are locking the version to `5.16.5` to prevent any build issues.

  Related issue [antd/#48758](https://github.com/ant-design/ant-design/issues/48758)

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- Updated dependencies [[`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f)]:
  - @refinedev/ui-types@1.22.6

## 5.37.6

### Patch Changes

- [#5737](https://github.com/refinedev/refine/pull/5737) [`4e8188a6652`](https://github.com/refinedev/refine/commit/4e8188a665209b0d0b77aef27c795a29b9513226) Thanks [@aliemir](https://github.com/aliemir)! - chore: updated content of `README.md` to include installation, usage and scaffolding instructions.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: `dayjs` imports in ESM bundles

  dayjs imports in ESM bundles were not being correctly resolved, this has been fixed by adding an esbuild plugin to replace the imports with the correct path for ESM bundles.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: broken eslint plugin for removing test ids from components

  Eslint plugin to remove test ids from components was broken and might miss some test ids to be included in the bundles.

- [#5808](https://github.com/refinedev/refine/pull/5808) [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39) Thanks [@aliemir](https://github.com/aliemir)! - refactor: moved internal logic of buttons to respective hooks from `@refinedev/core`

  We've moved the internal logic of buttons to their respective hooks in the `@refinedev/core` package to ensure consistency and reduce duplication. This change will make it easier to manage and maintain the buttons across different UI integrations of Refine. This will also benefit the users who want to customize the buttons via `swizzle` option or create their own buttons withouth having to duplicate the logic.

- [#5714](https://github.com/refinedev/refine/pull/5714) [`38f129f40ee`](https://github.com/refinedev/refine/commit/38f129f40eea109c9b89b23a8fd3f217964330c7) Thanks [@aliemir](https://github.com/aliemir)! - Due to the bug fix made in the `@refinedev/core`, `onFinishAutoSave`'s returned promise can now reject and should be handled accordingly. Updated `useForm`'s auto save handler to catch the rejection without breaking the application.

- [#5755](https://github.com/refinedev/refine/pull/5755) [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect type imports

- Updated dependencies [[`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927)]:
  - @refinedev/ui-types@1.22.5

## 5.37.5

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 5.37.4

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: when antd imports destructed outside react component, gives `undefined` error on ESM build.

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

## 5.37.3

### Patch Changes

- [#5564](https://github.com/refinedev/refine/pull/5564) [`1bb7d30888`](https://github.com/refinedev/refine/commit/1bb7d3088837584b19c4faba41a91817d910d493) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`<ThemedTitleV2 />'s`](https://refine.dev/docs/ui-integrations/material-ui/components/themed-layout/) default icon updated.

## 5.37.2

### Patch Changes

- [#5465](https://github.com/refinedev/refine/pull/5465) [`00e00cbd98`](https://github.com/refinedev/refine/commit/00e00cbd98c34046ab83b299ede83401ae74fec1) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the type issue between `remark-gfm` and `react-markdown`. #5463

## 5.37.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

- Updated dependencies [[`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5)]:
  - @refinedev/ui-types@1.22.4

## 5.37.0

### Minor Changes

- [#5307](https://github.com/refinedev/refine/pull/5307) [`f8e407f850`](https://github.com/refinedev/refine/commit/f8e407f85054bccf1e6ff45c84928bc01db7f5eb) Thanks [@jackprogramsjp](https://github.com/jackprogramsjp)! - feat: added `hideForm` props for `LoginPage` and `RegisterPage` for `AuthPage` feature.

  Now with the `hideForm` props feature, you can be able to hide the forms (like email/password)
  to only show the OAuth providers. This avoids having to make your own entire AuthPage.

### Patch Changes

- [#5207](https://github.com/refinedev/refine/pull/5207) [`30a2834a81`](https://github.com/refinedev/refine/commit/30a2834a819ef857506b5c932500868e458fd319) Thanks [@mjomble](https://github.com/mjomble)! - chore: updated deprecated use of antd Progress

- [#5269](https://github.com/refinedev/refine/pull/5269) [`a23a0945d3`](https://github.com/refinedev/refine/commit/a23a0945d3fe003ae081fca1c47312dd6bf8c2ee) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: add "autoComplete" field for Login pages.

- [#5325](https://github.com/refinedev/refine/pull/5325) [`7ff54b2060`](https://github.com/refinedev/refine/commit/7ff54b2060b0ce942c4170f744cbdf52d0940434) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `<AuthPage />` styling issues on mobile screens.

  chore: new tests are added to `<AuthPage />`.

## 5.36.19

### Patch Changes

- [#5259](https://github.com/refinedev/refine/pull/5259) [`eac3df87ffb`](https://github.com/refinedev/refine/commit/eac3df87ffbf61c913a6c8ea584e1d8c61e8d82e) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<AutoSaveIndicator />` component to extend the `<AutoSaveIndicator />` from `@refinedev/core` with custom elements and render appropriate element based on the state.

## 5.36.18

### Patch Changes

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Now `useSelect`, `useRadioGroup` and `useCheckboxGroup` hooks accept 4th generic type `TOption` which allows you to change the type of options. By default `TOption` will be equal to `BaseOption` type which is `{ label: any; value: any; }`. If you want to change the type of options, you can do it like this:

  ```tsx
  import { useSelect } from "@refinedev/antd";
  import { HttpError } from "@refinedev/core";

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

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Updated return types of `useSelect`, `useRadioGroup` and `useCheckboxGroup` hooks to only include properties that actually being returned from the hook. Previously, the return types included all properties of the respective components, which was not correct.

- [#5201](https://github.com/refinedev/refine/pull/5201) [`760cfbaaa2a`](https://github.com/refinedev/refine/commit/760cfbaaa2ac8b8c070ade1e174784358cc112b0) Thanks [@aliemir](https://github.com/aliemir)! - Handle nested server side validation errors properly in `useForm`

## 5.36.17

### Patch Changes

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Now `useSelect`, `useRadioGroup` and `useCheckboxGroup` hooks accept 4th generic type `TOption` which allows you to change the type of options. By default `TOption` will be equal to `BaseOption` type which is `{ label: any; value: any; }`. If you want to change the type of options, you can do it like this:

  ```tsx
  import { useSelect } from "@refinedev/antd";
  import { HttpError } from "@refinedev/core";

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

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Updated return types of `useSelect`, `useRadioGroup` and `useCheckboxGroup` hooks to only include properties that actually being returned from the hook. Previously, the return types included all properties of the respective components, which was not correct.

- [#5201](https://github.com/refinedev/refine/pull/5201) [`760cfbaaa2a`](https://github.com/refinedev/refine/commit/760cfbaaa2ac8b8c070ade1e174784358cc112b0) Thanks [@aliemir](https://github.com/aliemir)! - Handle nested server side validation errors properly in `useForm`

## 5.36.16

### Patch Changes

- [#5189](https://github.com/refinedev/refine/pull/5189) [`34b5741289f`](https://github.com/refinedev/refine/commit/34b5741289fec9f1bf1e06b101d1c0965fc5c7e7) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: bump @ant-design/pro-layout dependency to `v7.17.12`.

  Fixes https://github.com/refinedev/refine/issues/5172

## 5.36.15

### Patch Changes

- [#5189](https://github.com/refinedev/refine/pull/5189) [`34b5741289f`](https://github.com/refinedev/refine/commit/34b5741289fec9f1bf1e06b101d1c0965fc5c7e7) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: bump @ant-design/pro-layout dependency to `v7.17.12`.

  Fixes https://github.com/refinedev/refine/issues/5172

## 5.36.14

### Patch Changes

- [#5134](https://github.com/refinedev/refine/pull/5134) [`e4769b23171`](https://github.com/refinedev/refine/commit/e4769b231716c63e5814718942025044e1a213c3) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: antd default `<ThemedSiderV2 />` is not collapsing.

## 5.36.13

### Patch Changes

- [#5134](https://github.com/refinedev/refine/pull/5134) [`e4769b23171`](https://github.com/refinedev/refine/commit/e4769b231716c63e5814718942025044e1a213c3) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: antd default `<ThemedSiderV2 />` is not collapsing.

## 5.36.12

### Patch Changes

- [#5114](https://github.com/refinedev/refine/pull/5114) [`00a9252c5de`](https://github.com/refinedev/refine/commit/00a9252c5de86aad544b0ca7d087c532c6d561fa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<ThemedTitleV2 />` border-bottom removed.
  fixed: `<ThemedLayoutV2 />` glitches on first render.

## 5.36.11

### Patch Changes

- [#5114](https://github.com/refinedev/refine/pull/5114) [`00a9252c5de`](https://github.com/refinedev/refine/commit/00a9252c5de86aad544b0ca7d087c532c6d561fa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<ThemedTitleV2 />` border-bottom removed.
  fixed: `<ThemedLayoutV2 />` glitches on first render.

## 5.36.10

### Patch Changes

- [#5098](https://github.com/refinedev/refine/pull/5098) [`672f7916af7`](https://github.com/refinedev/refine/commit/672f7916af74ed0d62eb806fde35fd7e56000b23) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `undoableNotification` does not work when using `useNotificationProvider` due to a different `notification` instance.

## 5.36.9

### Patch Changes

- [#5098](https://github.com/refinedev/refine/pull/5098) [`672f7916af7`](https://github.com/refinedev/refine/commit/672f7916af74ed0d62eb806fde35fd7e56000b23) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `undoableNotification` does not work when using `useNotificationProvider` due to a different `notification` instance.

## 5.36.8

### Patch Changes

- [#4945](https://github.com/refinedev/refine/pull/4945) [`b838412f0d0`](https://github.com/refinedev/refine/commit/b838412f0d0b790ba95f3c07a899a021d3cd2c84) Thanks [@MahirMahdi](https://github.com/MahirMahdi)! - fix: antd notificationProvider issue

  Antd notification component could not access theme context, now it's fixed.

  This release provides an alternative to exported `notificationProvider` value from type `NotificationProvider` to `() => NotificationProvider`. If you previously had customizations applied to the `notificationProvider` object, you may need to update your code like the following:

  ```diff
  - import { useNotificationProvider } from "@refinedev/antd";
  + import { useNotificationProvider } from "@refinedev/antd";
  + import { App as AntdApp } from "antd";

  - const myNotificationProvider = {
  -    ...useNotificationProvider,
  -    open: (...args) => {
  -        // do some operation here
  -        notificationProvider.open(...args);
  -    },
  - }
  + const myNotificationProvider = () => {
  +     const notificationProvider = useNotificationProvider();
  +     return {
  +          ...useNotificationProvider,
  +          open: (...args) => {
  +             // do some operation here
  +             notificationProvider.open(...args);
  +          },
  +     }
  + }
  }

  const App = () => {
      return (
  +        <AntdApp>
              <Refine
                  /* ... */
  +                notificationProvider={myNotificationProvider}
              >
                  /* ... */
              </Refine>
  +        </AntdApp>
      );
  }
  ```

## 5.36.7

### Patch Changes

- [#4945](https://github.com/refinedev/refine/pull/4945) [`b838412f0d0`](https://github.com/refinedev/refine/commit/b838412f0d0b790ba95f3c07a899a021d3cd2c84) Thanks [@MahirMahdi](https://github.com/MahirMahdi)! - fix: antd notificationProvider issue

  Antd notification component could not access theme context, now it's fixed.

  This release provides an alternative to exported `notificationProvider` value from type `NotificationProvider` to `() => NotificationProvider`. If you previously had customizations applied to the `notificationProvider` object, you may need to update your code like the following:

  ```diff
  - import { useNotificationProvider } from "@refinedev/antd";
  + import { useNotificationProvider } from "@refinedev/antd";
  + import { App as AntdApp } from "antd";

  - const myNotificationProvider = {
  -    ...useNotificationProvider,
  -    open: (...args) => {
  -        // do some operation here
  -        notificationProvider.open(...args);
  -    },
  - }
  + const myNotificationProvider = () => {
  +     const notificationProvider = useNotificationProvider();
  +     return {
  +          ...useNotificationProvider,
  +          open: (...args) => {
  +             // do some operation here
  +             notificationProvider.open(...args);
  +          },
  +     }
  + }
  }

  const App = () => {
      return (
  +        <AntdApp>
              <Refine
                  /* ... */
  +                notificationProvider={myNotificationProvider}
              >
                  /* ... */
              </Refine>
  +        </AntdApp>
      );
  }
  ```

## 5.36.6

### Patch Changes

- [#5026](https://github.com/refinedev/refine/pull/5026) [`a605e4cd318`](https://github.com/refinedev/refine/commit/a605e4cd318ed5542b46e9e11a86f2c75dbb694b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
  From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

  feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.

## 5.36.5

### Patch Changes

- [#5026](https://github.com/refinedev/refine/pull/5026) [`a605e4cd318`](https://github.com/refinedev/refine/commit/a605e4cd318ed5542b46e9e11a86f2c75dbb694b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
  From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

  feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.

## 5.36.4

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 5.36.3

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 5.36.2

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

## 5.36.1

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

## 5.36.0

### Minor Changes

- [#4914](https://github.com/refinedev/refine/pull/4914) [`91a4d0da9f1`](https://github.com/refinedev/refine/commit/91a4d0da9f180ae358a448c7d187cee44f8c2299) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/#optimisticupdatemap) prop added to `useForm` hook. This prop allows you to update the data in the cache.

  ```tsx
  useForm({
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

- [#4903](https://github.com/refinedev/refine/pull/4903) [`e327cadc011`](https://github.com/refinedev/refine/commit/e327cadc011ce8696d7149252e1ad308005b1eff) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: when using [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/), `autoSave` parameters not passed to `@refinedev/core/useForm` hook.
  From now on, you can use `autoSave` parameters in [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/) hook.

  feat: add `invalidateOnUnmount` prop to [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/) hook.
  feat: add `invalidateOnUnmount` and `invalidateOnClose` prop to [`useModalForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/) and [`useDrawerForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/) hooks.
  From now on, you can use the use this props to invalidate queries upon unmount or close.

## 5.35.0

### Minor Changes

- [#4914](https://github.com/refinedev/refine/pull/4914) [`91a4d0da9f1`](https://github.com/refinedev/refine/commit/91a4d0da9f180ae358a448c7d187cee44f8c2299) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/#optimisticupdatemap) prop added to `useForm` hook. This prop allows you to update the data in the cache.

  ```tsx
  useForm({
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

- [#4903](https://github.com/refinedev/refine/pull/4903) [`e327cadc011`](https://github.com/refinedev/refine/commit/e327cadc011ce8696d7149252e1ad308005b1eff) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: when using [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/), `autoSave` parameters not passed to `@refinedev/core/useForm` hook.
  From now on, you can use `autoSave` parameters in [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/) hook.

  feat: add `invalidateOnUnmount` prop to [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/) hook.
  feat: add `invalidateOnUnmount` and `invalidateOnClose` prop to [`useModalForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/) and [`useDrawerForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/) hooks.
  From now on, you can use the use this props to invalidate queries upon unmount or close.

## 5.34.2

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 5.34.1

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 5.34.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<RefreshButton />` does not refresh content #4618.
  From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.

### Patch Changes

- [#4772](https://github.com/refinedev/refine/pull/4772) [`c9cc4398e99`](https://github.com/refinedev/refine/commit/c9cc4398e9996a49f7ee9c4c5656661a66b591ad) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: antd `useModalForm` and `useDrawerForm` sends request twice when `syncWithLocation` is true

- [#4778](https://github.com/refinedev/refine/pull/4778) [`82909db10b4`](https://github.com/refinedev/refine/commit/82909db10b4ac1705e1354bff0c0d95951497725) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: fixed the `goToStep` of `useStepsForm` hook return type

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/ui-types@1.22.0

## 5.33.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<RefreshButton />` does not refresh content #4618.
  From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.

### Patch Changes

- [#4772](https://github.com/refinedev/refine/pull/4772) [`c9cc4398e99`](https://github.com/refinedev/refine/commit/c9cc4398e9996a49f7ee9c4c5656661a66b591ad) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: antd `useModalForm` and `useDrawerForm` sends request twice when `syncWithLocation` is true

- [#4778](https://github.com/refinedev/refine/pull/4778) [`82909db10b4`](https://github.com/refinedev/refine/commit/82909db10b4ac1705e1354bff0c0d95951497725) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: fixed the `goToStep` of `useStepsForm` hook return type

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/ui-types@1.21.0

## 5.32.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects` to `package.json` to help bundlers tree-shake unused code.

### Patch Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Updated `DateField` to set `dayjs` extension in component instead of a global side effect.

## 5.31.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects` to `package.json` to help bundlers tree-shake unused code.

### Patch Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Updated `DateField` to set `dayjs` extension in component instead of a global side effect.

## 5.30.0

### Minor Changes

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/antd/components/basic-views/edit/#autosaveprops).
  [useForm](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/#autosave), [useDrawerForm](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/#autosave), [useModalForm](https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/#autosave), [useStepsForm](https://refine.dev/docs/api-reference/antd/hooks/form/useStepsForm/#autosave) hooks now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.

  ```
  const { autoSaveProps } = useForm({
      autoSave: {
          enabled: true,
          debounce: 2000, // not required, default is 1000
      },
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

  feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/antd/components/antd-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

  ```
  import { AutoSaveIndicator } from "@refinedev/antd";
  const { autoSaveProps } = useForm({
      autoSave: {
          enabled: true,
          debounce: 2000, // not required, default is 1000
      },
  });

  return (
      <div>
          <AutoSaveIndicator {...autoSaveProps}>
      </div>
  );
  ```

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: when the `dataProvider` returns rejected promise with `errors` field, `useForm` will automatically update the error state with the rejected `errors` field.

  [Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)

### Patch Changes

- Updated dependencies [[`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/ui-types@1.20.0

## 5.29.0

### Minor Changes

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/antd/components/basic-views/edit/#autosaveprops).
  [useForm](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/#autosave), [useDrawerForm](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/#autosave), [useModalForm](https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/#autosave), [useStepsForm](https://refine.dev/docs/api-reference/antd/hooks/form/useStepsForm/#autosave) hooks now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.

  ```
  const { autoSaveProps } = useForm({
      autoSave: {
          enabled: true,
          debounce: 2000, // not required, default is 1000
      },
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

  feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/antd/components/antd-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

  ```
  import { AutoSaveIndicator } from "@refinedev/antd";
  const { autoSaveProps } = useForm({
      autoSave: {
          enabled: true,
          debounce: 2000, // not required, default is 1000
      },
  });

  return (
      <div>
          <AutoSaveIndicator {...autoSaveProps}>
      </div>
  );
  ```

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: when the `dataProvider` returns rejected promise with `errors` field, `useForm` will automatically update the error state with the rejected `errors` field.

  [Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)

### Patch Changes

- Updated dependencies [[`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/ui-types@1.19.0

## 5.28.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: ability to tweak active sider items navigation

  Visiting active sider items triggers page reloads due to them being links. We can now provide activeItemDisabled prop to disable such reloads.

### Patch Changes

- [#4607](https://github.com/refinedev/refine/pull/4607) [`fed630dcc3e`](https://github.com/refinedev/refine/commit/fed630dcc3ef291efbfa96ed6f8e5c5448ac16a6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - test: added tests for `<ThemedSiderV2/>`.

- [#4609](https://github.com/refinedev/refine/pull/4609) [`48aaf739352`](https://github.com/refinedev/refine/commit/48aaf739352c6d8edc21cb111cc871de8f68549e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: `icon` and `label` alignment in `Breadcrumb` component

  Fixed the issue that the `icon` and `label` to be misaligned in the `Breadcrumb` component.

- Updated dependencies [[`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/ui-types@1.18.0

## 5.27.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: ability to tweak active sider items navigation

  Visiting active sider items triggers page reloads due to them being links. We can now provide activeItemDisabled prop to disable such reloads.

### Patch Changes

- [#4607](https://github.com/refinedev/refine/pull/4607) [`fed630dcc3e`](https://github.com/refinedev/refine/commit/fed630dcc3ef291efbfa96ed6f8e5c5448ac16a6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - test: added tests for `<ThemedSiderV2/>`.

- [#4609](https://github.com/refinedev/refine/pull/4609) [`48aaf739352`](https://github.com/refinedev/refine/commit/48aaf739352c6d8edc21cb111cc871de8f68549e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: `icon` and `label` alignment in `Breadcrumb` component

  Fixed the issue that the `icon` and `label` to be misaligned in the `Breadcrumb` component.

- Updated dependencies [[`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/ui-types@1.17.0

## 5.26.0

### Minor Changes

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: implement following hooks have `useLoadingOvertime` hook

  - [`useSelect`](https://refine.dev/docs/api-reference/antd/hooks/field/useSelect/#overtimeoptions)
  - [`useDrawerForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/#overtimeoptions)
  - [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/#overtimeoptions)
  - [`useModalForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/#overtimeoptions)
  - [`useStepsForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useStepsForm/#overtimeoptions)
  - [`useSimpleList`](https://refine.dev/docs/api-reference/antd/hooks/list/useSimpleList/#overtimeoptions)
  - [`useTable`](https://refine.dev/docs/api-reference/antd/hooks/table/useTable/#overtimeoptions)

### Patch Changes

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { DeleteButton } from "@refinedev/antd";

  <DeleteButton resource="identifier-value" recordItemId="123" />;
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

## 5.25.0

### Minor Changes

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: implement following hooks have `useLoadingOvertime` hook

  - [`useSelect`](https://refine.dev/docs/api-reference/antd/hooks/field/useSelect/#overtimeoptions)
  - [`useDrawerForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/#overtimeoptions)
  - [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/#overtimeoptions)
  - [`useModalForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/#overtimeoptions)
  - [`useStepsForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useStepsForm/#overtimeoptions)
  - [`useSimpleList`](https://refine.dev/docs/api-reference/antd/hooks/list/useSimpleList/#overtimeoptions)
  - [`useTable`](https://refine.dev/docs/api-reference/antd/hooks/table/useTable/#overtimeoptions)

### Patch Changes

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { DeleteButton } from "@refinedev/antd";

  <DeleteButton resource="identifier-value" recordItemId="123" />;
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

## 5.24.0

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

## 5.23.0

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

## 5.22.0

### Minor Changes

- [#4430](https://github.com/refinedev/refine/pull/4430) [`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527) Thanks [@aliemir](https://github.com/aliemir)! - Updated the `useForm`, `useModalForm`, `useDrawerForm` and `useStepsForm` to accept `queryMeta` and `mutationMeta` properties of the `useForm` hook of `@refinedev/core`. These properties are used to pass specific meta values to the query or mutation. This is useful when you have overlapping values in your data provider's `getOne` and `update` methods. For example, you may want to change the `method` of the mutation to `PATCH` but if you pass it in the `meta` property, you'll end up changing the method of the `getOne` request as well.

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

- [#4429](https://github.com/refinedev/refine/pull/4429) [`63daabcb703`](https://github.com/refinedev/refine/commit/63daabcb7037860bc36dff8cc417e9426e9ec027) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue of `formLoading` property in return values of `useStepsForm` hook which was not being toggled correctly when the form was submitted or the form data was being fetched.

- [#4431](https://github.com/refinedev/refine/pull/4431) [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f) Thanks [@aliemir](https://github.com/aliemir)! - Updated the TSDoc comments to fix the broken links in the documentation.

## 5.21.0

### Minor Changes

- [#4430](https://github.com/refinedev/refine/pull/4430) [`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527) Thanks [@aliemir](https://github.com/aliemir)! - Updated the `useForm`, `useModalForm`, `useDrawerForm` and `useStepsForm` to accept `queryMeta` and `mutationMeta` properties of the `useForm` hook of `@refinedev/core`. These properties are used to pass specific meta values to the query or mutation. This is useful when you have overlapping values in your data provider's `getOne` and `update` methods. For example, you may want to change the `method` of the mutation to `PATCH` but if you pass it in the `meta` property, you'll end up changing the method of the `getOne` request as well.

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

- [#4429](https://github.com/refinedev/refine/pull/4429) [`63daabcb703`](https://github.com/refinedev/refine/commit/63daabcb7037860bc36dff8cc417e9426e9ec027) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue of `formLoading` property in return values of `useStepsForm` hook which was not being toggled correctly when the form was submitted or the form data was being fetched.

- [#4431](https://github.com/refinedev/refine/pull/4431) [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f) Thanks [@aliemir](https://github.com/aliemir)! - Updated the TSDoc comments to fix the broken links in the documentation.

## 5.20.0

### Minor Changes

- [#4404](https://github.com/refinedev/refine/pull/4404) [`f67967e8c87`](https://github.com/refinedev/refine/commit/f67967e8c871b2252b4c1b827de3656bf153d1ee) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: fix name and state inconsistency in `<ThemedLayoutV2>`

  `useSiderVisible` is deprecated, instead we created a new hook `useThemedLayoutContext` for it. `useThemedLayoutContext` similar to `useSiderVisible` but it returns more meaningful state names. However, `useSiderVisible` is still available for backward compatibility.

  Updated `Sider` and `HamburgerMenu` components using `useThemedLayoutContext`.

  ```tsx
  import { useThemedLayoutContext } from "@refinedev/antd";

  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  ```

## 5.19.0

### Minor Changes

- [#4404](https://github.com/refinedev/refine/pull/4404) [`f67967e8c87`](https://github.com/refinedev/refine/commit/f67967e8c871b2252b4c1b827de3656bf153d1ee) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: fix name and state inconsistency in `<ThemedLayoutV2>`

  `useSiderVisible` is deprecated, instead we created a new hook `useThemedLayoutContext` for it. `useThemedLayoutContext` similar to `useSiderVisible` but it returns more meaningful state names. However, `useSiderVisible` is still available for backward compatibility.

  Updated `Sider` and `HamburgerMenu` components using `useThemedLayoutContext`.

  ```tsx
  import { useThemedLayoutContext } from "@refinedev/antd";

  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  ```

## 5.18.2

### Patch Changes

- [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 5.18.1

### Patch Changes

- [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 5.18.0

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
  } from "@refinedev/antd";

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

- [#4306](https://github.com/refinedev/refine/pull/4306) [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `syncWithLocation.syncId` default to `true` for `useDrawerForm` and `useModalForm`.

### Patch Changes

- [#4312](https://github.com/refinedev/refine/pull/4312) [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: added `className` for easier selection of all buttons and titles of CRUD components

- Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
  - @refinedev/ui-types@1.16.0

## 5.17.0

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
  } from "@refinedev/antd";

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

- [#4306](https://github.com/refinedev/refine/pull/4306) [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `syncWithLocation.syncId` default to `true` for `useDrawerForm` and `useModalForm`.

### Patch Changes

- [#4312](https://github.com/refinedev/refine/pull/4312) [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: added `className` for easier selection of all buttons and titles of CRUD components

- Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
  - @refinedev/ui-types@1.15.0

## 5.16.2

### Patch Changes

- [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

- Updated dependencies [[`dc62abc890f`](https://github.com/refinedev/refine/commit/dc62abc890f68be161c7035c28c0118216a9e0ec)]:
  - @refinedev/ui-types@1.14.0

## 5.16.1

### Patch Changes

- [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

## 5.16.0

### Minor Changes

- [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: added the `fixed` prop to the `<ThemedSiderV2/>` to allow the sider to be fixed

  The prop is optional and defaults to `false`. You can see the usage as follows:

  ```tsx
  import { Refine } from "@refinedev/core";
  import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

  const App: React.FC = () => {
      return (
          <Refine
           ...
          >
              <ThemedLayoutV2 Sider={() => <ThemedSiderV2 fixed />}>
                  {/* ... */}
              </ThemedLayoutV2>
          </Refine>
      );
  };
  ```

- [#4278](https://github.com/refinedev/refine/pull/4278) [`b14f2ad8a70`](https://github.com/refinedev/refine/commit/b14f2ad8a700d5ae157f437a8f610481d88ae09b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `autoSubmitClose` prop to `useEditableTable`.
  Now you can choose whether to close the table's row after submitting the form or not.

  ```tsx
  const editableTable = useEditableTable({
    autoSubmitClose: false,
  });
  ```

### Patch Changes

- [#4267](https://github.com/refinedev/refine/pull/4267) [`5e128c76c16`](https://github.com/refinedev/refine/commit/5e128c76c162cb01822c283e567003a5b6ce62f8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `onFinish` prop override on `useDrawerForm` and `useModalForm` hook

  When override `onFinish` prop using the `useDrawerForm` and `useModalForm` hooks, the modal not close after submit the form.

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

## 5.15.0

### Minor Changes

- [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: added the `fixed` prop to the `<ThemedSiderV2/>` to allow the sider to be fixed

  The prop is optional and defaults to `false`. You can see the usage as follows:

  ```tsx
  import { Refine } from "@refinedev/core";
  import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

  const App: React.FC = () => {
      return (
          <Refine
           ...
          >
              <ThemedLayoutV2 Sider={() => <ThemedSiderV2 fixed />}>
                  {/* ... */}
              </ThemedLayoutV2>
          </Refine>
      );
  };
  ```

- [#4278](https://github.com/refinedev/refine/pull/4278) [`b14f2ad8a70`](https://github.com/refinedev/refine/commit/b14f2ad8a700d5ae157f437a8f610481d88ae09b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `autoSubmitClose` prop to `useEditableTable`.
  Now you can choose whether to close the table's row after submitting the form or not.

  ```tsx
  const editableTable = useEditableTable({
    autoSubmitClose: false,
  });
  ```

### Patch Changes

- [#4267](https://github.com/refinedev/refine/pull/4267) [`5e128c76c16`](https://github.com/refinedev/refine/commit/5e128c76c162cb01822c283e567003a5b6ce62f8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `onFinish` prop override on `useDrawerForm` and `useModalForm` hook

  When override `onFinish` prop using the `useDrawerForm` and `useModalForm` hooks, the modal not close after submit the form.

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

## 5.14.0

### Minor Changes

- [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: added the `fixed` prop to the `<ThemedSiderV2/>` to allow the sider to be fixed

  The prop is optional and defaults to `false`. You can see the usage as follows:

  ```tsx
  import { Refine } from "@refinedev/core";
  import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

  const App: React.FC = () => {
      return (
          <Refine
           ...
          >
              <ThemedLayoutV2 Sider={() => <ThemedSiderV2 fixed />}>
                  {/* ... */}
              </ThemedLayoutV2>
          </Refine>
      );
  };
  ```

- [#4278](https://github.com/refinedev/refine/pull/4278) [`b14f2ad8a70`](https://github.com/refinedev/refine/commit/b14f2ad8a700d5ae157f437a8f610481d88ae09b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `autoSubmitClose` prop to `useEditableTable`.
  Now you can choose whether to close the table's row after submitting the form or not.

  ```tsx
  const editableTable = useEditableTable({
    autoSubmitClose: false,
  });
  ```

### Patch Changes

- [#4267](https://github.com/refinedev/refine/pull/4267) [`5e128c76c16`](https://github.com/refinedev/refine/commit/5e128c76c162cb01822c283e567003a5b6ce62f8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `onFinish` prop override on `useDrawerForm` and `useModalForm` hook

  When override `onFinish` prop using the `useDrawerForm` and `useModalForm` hooks, the modal not close after submit the form.

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

## 5.13.2

### Patch Changes

- [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

## 5.13.1

### Patch Changes

- [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

## 5.13.0

### Minor Changes

- [#4209](https://github.com/refinedev/refine/pull/4209) [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `isSticky` prop to `ThemedHeaderV2` component

  ```tsx
  import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/antd";

  const CustomHeader = () => <ThemedHeaderV2 isSticky={true} />;

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

- [#4232](https://github.com/refinedev/refine/pull/4232) [`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `initialSiderCollapsed` added to `RefineThemedLayoutV2Props` to control initial state of `<ThemedSiderV2>`.
  From now on, you can control the initial collapsed state of `<ThemedSiderV2>` by passing the `initialSiderCollapsed` prop to `<ThemedLayoutV2>`.

  ```tsx
  <ThemedLayoutV2
    initialSiderCollapsed={true} // This will make the sider collapsed by default
  >
    {/* .. */}
  </ThemedLayoutV2>
  ```

### Patch Changes

- Updated dependencies [[`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8), [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2)]:
  - @refinedev/ui-types@1.12.0

## 5.12.0

### Minor Changes

- [#4209](https://github.com/refinedev/refine/pull/4209) [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `isSticky` prop to `ThemedHeaderV2` component

  ```tsx
  import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/antd";

  const CustomHeader = () => <ThemedHeaderV2 isSticky={true} />;

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

- [#4232](https://github.com/refinedev/refine/pull/4232) [`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `initialSiderCollapsed` added to `RefineThemedLayoutV2Props` to control initial state of `<ThemedSiderV2>`.
  From now on, you can control the initial collapsed state of `<ThemedSiderV2>` by passing the `initialSiderCollapsed` prop to `<ThemedLayoutV2>`.

  ```tsx
  <ThemedLayoutV2
    initialSiderCollapsed={true} // This will make the sider collapsed by default
  >
    {/* .. */}
  </ThemedLayoutV2>
  ```

### Patch Changes

- Updated dependencies [[`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8), [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2)]:
  - @refinedev/ui-types@1.11.0

## 5.11.0

### Minor Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

  - **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
  - **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

  feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

  - **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
  - **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

## 5.10.0

### Minor Changes

- [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

  - **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
  - **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

  feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

  - **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
  - **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

## 5.9.0

### Minor Changes

- [#4193](https://github.com/refinedev/refine/pull/4193) [`3d28fccc1ca`](https://github.com/refinedev/refine/commit/3d28fccc1ca14cdf316d518935cb6c17500c62a4) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` component and `useSiderVisible` hook

  `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `useSiderVisible` hook, it's easier to collapse/uncollapse the `Sider`.

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/antd/components/antd-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

### Patch Changes

- Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
  - @refinedev/ui-types@1.10.0

## 5.8.0

### Minor Changes

- [#4193](https://github.com/refinedev/refine/pull/4193) [`3d28fccc1ca`](https://github.com/refinedev/refine/commit/3d28fccc1ca14cdf316d518935cb6c17500c62a4) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` component and `useSiderVisible` hook

  `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `useSiderVisible` hook, it's easier to collapse/uncollapse the `Sider`.

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/antd/components/antd-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

### Patch Changes

- Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
  - @refinedev/ui-types@1.9.0

## 5.7.0

### Minor Changes

- [#4193](https://github.com/refinedev/refine/pull/4193) [`3d28fccc1ca`](https://github.com/refinedev/refine/commit/3d28fccc1ca14cdf316d518935cb6c17500c62a4) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` component and `useSiderVisible` hook

  `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `useSiderVisible` hook, it's easier to collapse/uncollapse the `Sider`.

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/antd/components/antd-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

### Patch Changes

- Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
  - @refinedev/ui-types@1.8.0

## 5.6.0

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

## 5.5.2

### Patch Changes

- [#4120](https://github.com/refinedev/refine/pull/4120) [`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9) Thanks [@aliemir](https://github.com/aliemir)! - Fix broken `useModalForm` and `useDrawerForm` with `create` actions.

## 5.5.1

### Patch Changes

- [#4120](https://github.com/refinedev/refine/pull/4120) [`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9) Thanks [@aliemir](https://github.com/aliemir)! - Fix broken `useModalForm` and `useDrawerForm` with `create` actions.

## 5.5.0

### Minor Changes

- [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/antd/components/antd-themed-layout

### Patch Changes

- [#4114](https://github.com/refinedev/refine/pull/4114) [`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec) Thanks [@aliemir](https://github.com/aliemir)! - Updated `useModalForm` and `useDrawerForm` hook's `show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal/drawer. If not, the modal/drawer will not show. (Resolves #4062)

## 5.4.0

### Minor Changes

- [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/antd/components/antd-themed-layout

### Patch Changes

- [#4114](https://github.com/refinedev/refine/pull/4114) [`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec) Thanks [@aliemir](https://github.com/aliemir)! - Updated `useModalForm` and `useDrawerForm` hook's `show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal/drawer. If not, the modal/drawer will not show. (Resolves #4062)

## 5.3.14

### Patch Changes

- [#4035](https://github.com/refinedev/refine/pull/4035) [`e0c75450f97`](https://github.com/refinedev/refine/commit/e0c75450f970878fea0ace7db63548c7ba1a1688) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Re-extending the `SuccessErrorNotification` and `LiveProps` types removed
  - `useEditableTable`'s `successNotification` and `errorNotification` props now work according to the mutation result instead of the query result

## 5.3.13

### Patch Changes

- [#4035](https://github.com/refinedev/refine/pull/4035) [`e0c75450f97`](https://github.com/refinedev/refine/commit/e0c75450f970878fea0ace7db63548c7ba1a1688) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Re-extending the `SuccessErrorNotification` and `LiveProps` types removed
  - `useEditableTable`'s `successNotification` and `errorNotification` props now work according to the mutation result instead of the query result

## 5.3.12

### Patch Changes

- [#4024](https://github.com/refinedev/refine/pull/4024) [`dc6d2311eb7`](https://github.com/refinedev/refine/commit/dc6d2311eb76a458f828fb15fe26fae1c75bc95a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Added: `wrapperStyles` prop to `<ThemedTitle>` component to allow for custom styles to be passed in.

  - Added: `textDecoration: none` to `<ThemedTitle>` component.

## 5.3.11

### Patch Changes

- [#4024](https://github.com/refinedev/refine/pull/4024) [`dc6d2311eb7`](https://github.com/refinedev/refine/commit/dc6d2311eb76a458f828fb15fe26fae1c75bc95a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Added: `wrapperStyles` prop to `<ThemedTitle>` component to allow for custom styles to be passed in.

  - Added: `textDecoration: none` to `<ThemedTitle>` component.

## 5.3.10

### Patch Changes

- [#3997](https://github.com/refinedev/refine/pull/3997) [`f027d8a53b8`](https://github.com/refinedev/refine/commit/f027d8a53b8475f63f3557733c81b9ef040ed0ec) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 5.3.9

### Patch Changes

- [#3997](https://github.com/refinedev/refine/pull/3997) [`f027d8a53b8`](https://github.com/refinedev/refine/commit/f027d8a53b8475f63f3557733c81b9ef040ed0ec) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 5.3.8

### Patch Changes

- [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

  - `<RefineThemes>` colors updated to match the new theme colors.

- Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
  - @refinedev/ui-types@1.5.0

## 5.3.7

### Patch Changes

- [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

  - `<RefineThemes>` colors updated to match the new theme colors.

- Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
  - @refinedev/ui-types@1.4.0

## 5.3.6

### Patch Changes

- [#3967](https://github.com/refinedev/refine/pull/3967) [`67603562695`](https://github.com/refinedev/refine/commit/67603562695707e9d0bf16908d480fddf6fce7f1) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `<ThemedTitle>` font size was overridden by parent because `<Space>` has the default font size.

## 5.3.5

### Patch Changes

- [#3967](https://github.com/refinedev/refine/pull/3967) [`67603562695`](https://github.com/refinedev/refine/commit/67603562695707e9d0bf16908d480fddf6fce7f1) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `<ThemedTitle>` font size was overridden by parent because `<Space>` has the default font size.

## 5.3.4

### Patch Changes

- [#3949](https://github.com/refinedev/refine/pull/3949) [`836b06a2f67`](https://github.com/refinedev/refine/commit/836b06a2f67ec966247c422e42e11f39e6167288) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: <ThemedTitle> font size was "14px". Updated to "20px" on `<AuthPage>`, "14px" on `<ThemedSider>`.

- [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 5.3.3

### Patch Changes

- [#3949](https://github.com/refinedev/refine/pull/3949) [`836b06a2f67`](https://github.com/refinedev/refine/commit/836b06a2f67ec966247c422e42e11f39e6167288) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: <ThemedTitle> font size was "14px". Updated to "20px" on `<AuthPage>`, "14px" on `<ThemedSider>`.

- [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 5.3.2

### Patch Changes

- [#3931](https://github.com/refinedev/refine/pull/3931) [`d92c8e82868`](https://github.com/refinedev/refine/commit/d92c8e82868519ea7fd37678b74c1d6207a73bcd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added missing `autoSubmitClose`, `autoResetForm`, and `defaultVisible` props to `useDrawerForm` hook.

- [#3911](https://github.com/refinedev/refine/pull/3911) [`5f9c70ebf2f`](https://github.com/refinedev/refine/commit/5f9c70ebf2faeea21eef97286ae7391bb77abfa9) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `autoSubmitClose` and `autoResetForm` props of `useModalForm` hook to work properly.

- [#3931](https://github.com/refinedev/refine/pull/3931) [`d92c8e82868`](https://github.com/refinedev/refine/commit/d92c8e82868519ea7fd37678b74c1d6207a73bcd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `autoSubmitClose`, `autoResetForm`, and `defaultVisible` props to `useDrawerForm` hook.

- [#3948](https://github.com/refinedev/refine/pull/3948) [`b4950503334`](https://github.com/refinedev/refine/commit/b495050333464224f34851c9c57ffab457a3f120) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

  - The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
  - The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

## 5.3.1

### Patch Changes

- [#3931](https://github.com/refinedev/refine/pull/3931) [`d92c8e82868`](https://github.com/refinedev/refine/commit/d92c8e82868519ea7fd37678b74c1d6207a73bcd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added missing `autoSubmitClose`, `autoResetForm`, and `defaultVisible` props to `useDrawerForm` hook.

- [#3911](https://github.com/refinedev/refine/pull/3911) [`5f9c70ebf2f`](https://github.com/refinedev/refine/commit/5f9c70ebf2faeea21eef97286ae7391bb77abfa9) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `autoSubmitClose` and `autoResetForm` props of `useModalForm` hook to work properly.

- [#3931](https://github.com/refinedev/refine/pull/3931) [`d92c8e82868`](https://github.com/refinedev/refine/commit/d92c8e82868519ea7fd37678b74c1d6207a73bcd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `autoSubmitClose`, `autoResetForm`, and `defaultVisible` props to `useDrawerForm` hook.

- [#3948](https://github.com/refinedev/refine/pull/3948) [`b4950503334`](https://github.com/refinedev/refine/commit/b495050333464224f34851c9c57ffab457a3f120) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

  - The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
  - The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

## 5.3.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the antd components.

  ```tsx
  import { RefineThemes } from "@refinedev/antd";
  import { Refine } from "@refinedev/core";
  import dataProvider from "@refinedev/simple-rest";

  const App = () => {
    // ---

    return (
      <ConfigProvider
        theme={{
          token: RefineThemes.Magenta.token,
        }}
      >
        <Refine dataProvider={dataProvider("YOUR_API_URL")}>
          {/** your app here */}
        </Refine>
      </ConfigProvider>
    );
  };
  ```

  - default title with icon added to `AuthPage`. It uses `ThemedTitle` component from `@refinedev/antd`. You can remove it by setting `title` prop to `false`.

  ```tsx
  <AuthPage title={false} />
  ```

  - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

  ```tsx
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
  ```

  - `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

  - `<EditButton>` in `<Show>` type changed to `primary`.
  - `<CreateButton>` type changed to `primary`.

  - `<AuthPage>` component uses colors from the theme.
  - `<ThemedTitle>` added to `AuthPage`

### Patch Changes

- Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
  - @refinedev/ui-types@1.3.0

## 5.2.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the antd components.

  ```tsx
  import { RefineThemes } from "@refinedev/antd";
  import { Refine } from "@refinedev/core";
  import dataProvider from "@refinedev/simple-rest";

  const App = () => {
    // ---

    return (
      <ConfigProvider
        theme={{
          token: RefineThemes.Magenta.token,
        }}
      >
        <Refine dataProvider={dataProvider("YOUR_API_URL")}>
          {/** your app here */}
        </Refine>
      </ConfigProvider>
    );
  };
  ```

  - default title with icon added to `AuthPage`. It uses `ThemedTitle` component from `@refinedev/antd`. You can remove it by setting `title` prop to `false`.

  ```tsx
  <AuthPage title={false} />
  ```

  - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

  ```tsx
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
  ```

  - `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

  - `<EditButton>` in `<Show>` type changed to `primary`.
  - `<CreateButton>` type changed to `primary`.

  - `<AuthPage>` component uses colors from the theme.
  - `<ThemedTitle>` added to `AuthPage`

### Patch Changes

- Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
  - @refinedev/ui-types@1.2.0

## 5.1.2

### Patch Changes

- [#3885](https://github.com/refinedev/refine/pull/3885) [`5495ab7028e`](https://github.com/refinedev/refine/commit/5495ab7028e9cbd576948f2b347e6d00ddc87728) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: header text color

## 5.1.1

### Patch Changes

- [#3885](https://github.com/refinedev/refine/pull/3885) [`5495ab7028e`](https://github.com/refinedev/refine/commit/5495ab7028e9cbd576948f2b347e6d00ddc87728) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: header text color

## 5.1.0

### Minor Changes

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

  ## `syncWithLocation` support in `useDrawerForm` and `useModalForm` hooks

  `useDrawerForm` and `useModalForm` hooks now support `syncWithLocation` prop. This prop can be used to sync the visibility state of them with the location via query params.

  You can pass a boolean or an object with `key` and `syncId` properties.

  - `key` is used to define the query param key. Default value is inferred from the resource and the action. For example `posts-create` for `posts` resource and `create` action.

  - `syncId` is used to include the `id` property in the query param key. Default value is `false`. This is useful for `edit` and `clone` actions.

  ## Removed props

  `ignoreAccessControlProvider` prop is removed from buttons.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Updated buttons with `resource` property. `resourceNameOrRouteName` is now deprecated but kept working until next major version.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  All **Ant Design** components re-exported from `@refinedev/antd` have been removed. You should import them from `antd` package directly.

  If the package is not installed, you should install it with your package manager:

  ```bash
  npm install antd
  # or
  pnpm add antd
  # or
  yarn add antd
  ```

  After that, you can import components from `antd` package directly like below:

  ```diff
  -import { useTable, SaveButton, Button, Form, Input, Select } from "@refinedev/antd";

  +import { useTable, SaveButton } from "@refinedev/antd";
  +import { Button, Form, Input, Select } from "antd";
  ```

  <br />

  `Icons` are also removed from `@refinedev/antd`. So, you should import icons from `@ant-design/icons` package directly.

  If the package is not installed, you should install it with your package manager:

  ```bash
  npm install @ant-design/icons
  # or
  pnpm add @ant-design/icons
  # or
  yarn add @ant-design/icons
  ```

  After that, you can import icons from `@ant-design/icons` package directly like below:

  ```diff
  -import { Icons } from "@refinedev/antd";
  -const { EditOutlined } = Icons;

  + import { EditOutlined } from "@ant-design/icons";
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Upgrade `@ant-design/icons` to `^5.0.1` for consistency.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `useCheckboxGroup`'s `sort` prop is now deprecated. Use `sorters` prop instead.

  ```diff
  useCheckboxGroup({
  -    sort,
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

  - `useRadioGroup`'s `sort` prop is now deprecated. Use `sorters` prop instead.

  ```diff
  useRadioGroup({
  -    sort,
  +    sorters,
  })
  ```

  - `useImport`'s `resourceName` prop is now deprecated. Use `resource` prop instead.

  ```diff
  useImport({
  -    resourceName,
  +    resource,
  })
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `<ReadyPage>` isnow deprecated.
  - Created a `<WelcomePage>` component to welcome users.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added legacy auth provider and new auth provider support to all components and hooks.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  ## 🪄 Migrating your project automatically with refine-codemod ✨

  [`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

  Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

  ```sh
  npx @refinedev/codemod@latest refine3-to-refine4
  ```

  And it's done. Now your project uses `refine@4.x.x`.

  ## 📝 Changelog

  Deprecated `useMenu` removed from `@refinedev/antd` package. Use `useMenu` from `@refinedev/core` package instead.

  ```diff
  - import { useMenu } from "@refinedev/antd";
  + import { useMenu } from "@refinedev/core";
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

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

  ## `useSimpleList` hook

  - Now `useSimpleList` hook will not accept all of `<List>` component properties So, you can give their props to `<List>` component directly.

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

  - `initialCurrent` and `initialPageSize` props are now deprecated. Use `pagination` prop instead.
  - To ensure backward compatibility, `initialCurrent` and `initialPageSize` props will work as before.

  - ```diff
    useSimpleList({
    -    initialCurrent,
    -    initialPageSize,
    +    pagination: {
    +        current,
    +        pageSize,
    +    },
    })
    ```

### Patch Changes

## 4.9.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-ui-types@0.16.0

## 4.8.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-ui-types@0.15.0

## 4.7.3

### Patch Changes

- [#3606](https://github.com/refinedev/refine/pull/3606) [`00c9a5c471a`](https://github.com/refinedev/refine/commit/00c9a5c471a684169f800d65800d87cc8d6b6511) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with `disabled` state in `DeleteButton`'s still opening the popover.

## 4.7.2

### Patch Changes

- [#3606](https://github.com/refinedev/refine/pull/3606) [`00c9a5c471a`](https://github.com/refinedev/refine/commit/00c9a5c471a684169f800d65800d87cc8d6b6511) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with `disabled` state in `DeleteButton`'s still opening the popover.

## 4.7.1

### Patch Changes

- [#3399](https://github.com/refinedev/refine/pull/3399) [`22b44a857a8`](https://github.com/refinedev/refine/commit/22b44a857a8ede3473965ab6baff70fc8ae31332) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix `useTable` hook error return type.

## 4.7.0

### Minor Changes

- [#3324](https://github.com/refinedev/refine/pull/3324) [`9bfb34749bc`](https://github.com/refinedev/refine/commit/9bfb34749bc8ddaaf80ccffbd0ad6d0a4487309b) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass mutation options to `useMutation` hooks in mutation hooks:
  - `useForm`
  - `useStepsForm`
  - `useModalForm`
  - `useDrawerForm`

## 4.6.0

### Minor Changes

- [#3324](https://github.com/refinedev/refine/pull/3324) [`9bfb34749bc`](https://github.com/refinedev/refine/commit/9bfb34749bc8ddaaf80ccffbd0ad6d0a4487309b) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass mutation options to `useMutation` hooks in mutation hooks:
  - `useForm`
  - `useStepsForm`
  - `useModalForm`
  - `useDrawerForm`

## 4.5.0

### Minor Changes

- [#3294](https://github.com/refinedev/refine/pull/3294) [`3c9c8c07d21`](https://github.com/refinedev/refine/commit/3c9c8c07d2183595402d70a3a2bc49093778e183) Thanks [@aliemir](https://github.com/aliemir)! - Remove `getContainer: false` from `useModalForm` and `useDrawerForm` and let it fallback to the default value. Users wanting to override the default value can still do so by passing `getContainer` prop to the `Modal` and `Drawer` components.

## 4.4.0

### Minor Changes

- [#3294](https://github.com/refinedev/refine/pull/3294) [`3c9c8c07d21`](https://github.com/refinedev/refine/commit/3c9c8c07d2183595402d70a3a2bc49093778e183) Thanks [@aliemir](https://github.com/aliemir)! - Remove `getContainer: false` from `useModalForm` and `useDrawerForm` and let it fallback to the default value. Users wanting to override the default value can still do so by passing `getContainer` prop to the `Modal` and `Drawer` components.

## 4.3.0

### Minor Changes

- [#3285](https://github.com/refinedev/refine/pull/3285) [`cc2c1f042bf`](https://github.com/refinedev/refine/commit/cc2c1f042bf43ae20c58745cccc815c337e17ae7) Thanks [@omeraplak](https://github.com/omeraplak)! - Added exports for new [`<App />`](https://ant.design/components/app), [`<QrCode />`](https://ant.design/components/qrcode) and [`<Watermark />`](https://ant.design/components/watermark) components.

## 4.2.0

### Minor Changes

- [#3285](https://github.com/refinedev/refine/pull/3285) [`cc2c1f042bf`](https://github.com/refinedev/refine/commit/cc2c1f042bf43ae20c58745cccc815c337e17ae7) Thanks [@omeraplak](https://github.com/omeraplak)! - Added exports for new [`<App />`](https://ant.design/components/app), [`<QrCode />`](https://ant.design/components/qrcode) and [`<Watermark />`](https://ant.design/components/watermark) components.

## 4.1.5

### Patch Changes

- [#3273](https://github.com/refinedev/refine/pull/3273) [`a30ba43cce2`](https://github.com/refinedev/refine/commit/a30ba43cce27279deaab60c000dac0537552f7c7) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Set the `theme="dark"` of the `Menu` component in `Sider` by default.

- [`a8d3f648a28`](https://github.com/refinedev/refine/commit/a8d3f648a282329cac04c1dd4b736864d6fbf756) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed onClick event type of the `<Button />` component

## 4.1.4

### Patch Changes

- [`a8d3f648a28`](https://github.com/refinedev/refine/commit/a8d3f648a282329cac04c1dd4b736864d6fbf756) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed onClick event type of the `<Button />` component
- [#3273](https://github.com/refinedev/refine/pull/3273) [`a30ba43cce2`](https://github.com/refinedev/refine/commit/a30ba43cce27279deaab60c000dac0537552f7c7) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Set the `theme="dark"` of the `Menu` component in `Sider` by default.

## 4.1.3

### Patch Changes

- [#3273](https://github.com/refinedev/refine/pull/3273) [`a30ba43cce2`](https://github.com/refinedev/refine/commit/a30ba43cce27279deaab60c000dac0537552f7c7) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Set the `theme="dark"` of the `Menu` component in `Sider` by default.

## 4.1.2

### Patch Changes

- [#3269](https://github.com/refinedev/refine/pull/3269) [`8b86c0c4c45`](https://github.com/refinedev/refine/commit/8b86c0c4c4529dce9eef4d6e49958eb2c50c31f2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: Wrong import and usage after `swizzling` `<Layout>` component.

## 4.1.1

### Patch Changes

- [#3269](https://github.com/refinedev/refine/pull/3269) [`8b86c0c4c45`](https://github.com/refinedev/refine/commit/8b86c0c4c4529dce9eef4d6e49958eb2c50c31f2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: Wrong import and usage after `swizzling` `<Layout>` component.

## 4.1.0

### Minor Changes

- [#3249](https://github.com/refinedev/refine/pull/3249) [`fd2e1882e06`](https://github.com/refinedev/refine/commit/fd2e1882e060135674f53350f2fe1d22347543d7) Thanks [@rajaomariajaona](https://github.com/rajaomariajaona)! - Add ability to pass pagination values in `useTable` hook. (Resolves #3246)

  - `current`
  - `setCurrent`
  - `pageSize`
  - `setPageSize`
  - `pageCount`

- [#3121](https://github.com/refinedev/refine/pull/3121) [`214ea79c81c`](https://github.com/refinedev/refine/commit/214ea79c81c2f21573f999083612d30256be76a9) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - We've released Ant Design v5 support :tada:

  ## Upgrade

  ⚡️ You can easily update **refine** packages with **refine** CLI [`update`](https://refine.dev/docs/packages/cli/#update) command.

  ```bash
  npm run refine update
  ```

  > [How to add refine CLI to an existing project?](https://refine.dev/docs/packages/cli/#how-to-add-to-an-existing-project)

  ### 🪄 Migrating your project automatically with Codemod ✨

  `@pankod/refine-codemod` package handles the breaking changes for your project automatically, without any manual steps. It migrates your [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/next/packages/antd) version from 3.x.x to 4.x.x.

  Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

  ```sh
  npx @pankod/refine-codemod antd4-to-antd5
  ```

  And it's done. Now your project uses `@pankod/refine-antd@4.x.x`.

  ## Changes

  - `<PageHeader>` component moved into `@ant-design/pro-components`. **refine** is using `<PageHeader>` in `<List>`, `<Create>`, `<Edit>`, `<Show>` components and added as a dependency. You don't need to install `@ant-design/pro-components` package manually.
  - `<Comment>` component moved into `@ant-design/compatible`.
  - `moment.js` is replaced with `day.js`.
  - `less` is removed from `antd` package.

  > Please refer to [Ant Design Migration Guide](https://ant.design/docs/react/migration-v5) for detailed information.

  🚨 Next.js 13 Not Supported Now

  Currently `ant-design/pro-components` does not compatible with Next.js 13.
  **refine** is using `ant-design/pro-components` as a dependency for `<PageHeader/>` component.

  > [Refer to a related issue on ant-design/pro-components repository](https://github.com/ant-design/pro-components/issues/6338)

## 4.0.0

### Major Changes

- [#3121](https://github.com/refinedev/refine/pull/3121) [`214ea79c81c`](https://github.com/refinedev/refine/commit/214ea79c81c2f21573f999083612d30256be76a9) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - We've released Ant Design v5 support :tada:

  ## Upgrade

  ⚡️ You can easily update **refine** packages with **refine** CLI [`update`](https://refine.dev/docs/packages/cli/#update) command.

  ```bash
  npm run refine update
  ```

  > [How to add refine CLI to an existing project?](https://refine.dev/docs/packages/cli/#how-to-add-to-an-existing-project)

  ### 🪄 Migrating your project automatically with Codemod ✨

  `@pankod/refine-codemod` package handles the breaking changes for your project automatically, without any manual steps. It migrates your [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/next/packages/antd) version from 3.x.x to 4.x.x.

  Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

  ```sh
  npx @pankod/refine-codemod antd4-to-antd5
  ```

  And it's done. Now your project uses `@pankod/refine-antd@4.x.x`.

  ## Changes

  - `<PageHeader>` component moved into `@ant-design/pro-components`. **refine** is using `<PageHeader>` in `<List>`, `<Create>`, `<Edit>`, `<Show>` components and added as a dependency. You don't need to install `@ant-design/pro-components` package manually.
  - `<Comment>` component moved into `@ant-design/compatible`.
  - `moment.js` is replaced with `day.js`.
  - `less` is removed from `antd` package.

  > Please refer to [Ant Design Migration Guide](https://ant.design/docs/react/migration-v5) for detailed information.

  🚨 Next.js 13 Not Supported Now

  Currently `ant-design/pro-components` does not compatible with Next.js 13.
  **refine** is using `ant-design/pro-components` as a dependency for `<PageHeader/>` component.

  > [Refer to a related issue on ant-design/pro-components repository](https://github.com/ant-design/pro-components/issues/6338)

### Minor Changes

- [#3249](https://github.com/refinedev/refine/pull/3249) [`fd2e1882e06`](https://github.com/refinedev/refine/commit/fd2e1882e060135674f53350f2fe1d22347543d7) Thanks [@rajaomariajaona](https://github.com/rajaomariajaona)! - Add ability to pass pagination values in `useTable` hook. (Resolves #3246)
  - `current`
  - `setCurrent`
  - `pageSize`
  - `setPageSize`
  - `pageCount`

## 3.70.4

### Patch Changes

- [#3252](https://github.com/refinedev/refine/pull/3252) [`cf696235d0b`](https://github.com/refinedev/refine/commit/cf696235d0bdaca8554698293e8a644131522f34) Thanks [@aliemir](https://github.com/aliemir)! - Updated `esbuild` configuration to handle `antd/lib` imports in `esm` builds. (Resolves #3187)

## 3.70.3

### Patch Changes

- [#3252](https://github.com/refinedev/refine/pull/3252) [`cf696235d0b`](https://github.com/refinedev/refine/commit/cf696235d0bdaca8554698293e8a644131522f34) Thanks [@aliemir](https://github.com/aliemir)! - Updated `esbuild` configuration to handle `antd/lib` imports in `esm` builds. (Resolves #3187)

## 3.70.2

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-ui-types@0.14.2

## 3.70.1

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-ui-types@0.14.1

## 3.70.0

### Minor Changes

- [#3216](https://github.com/refinedev/refine/pull/3216) [`e09eb81588e`](https://github.com/refinedev/refine/commit/e09eb81588e985e270a7b3d49f9c5b28ffcbb134) Thanks [@leapful](https://github.com/leapful)! - Support filter dropdown on number value of single Select component

## 3.69.0

### Minor Changes

- [#3216](https://github.com/refinedev/refine/pull/3216) [`e09eb81588e`](https://github.com/refinedev/refine/commit/e09eb81588e985e270a7b3d49f9c5b28ffcbb134) Thanks [@leapful](https://github.com/leapful)! - Support filter dropdown on number value of single Select component

## 3.68.0

### Minor Changes

- [#3195](https://github.com/refinedev/refine/pull/3195) [`2fdc5c2a88e`](https://github.com/refinedev/refine/commit/2fdc5c2a88e490c7f3b6ed5b562974787863931e) Thanks [@leapful](https://github.com/leapful)! - Support Date Picker component when using with Filter Dropdown

## 3.67.0

### Minor Changes

- [#3195](https://github.com/refinedev/refine/pull/3195) [`2fdc5c2a88e`](https://github.com/refinedev/refine/commit/2fdc5c2a88e490c7f3b6ed5b562974787863931e) Thanks [@leapful](https://github.com/leapful)! - Support Date Picker component when using with Filter Dropdown

## 3.66.0

### Minor Changes

- [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 3.65.0

### Minor Changes

- [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 3.64.4

### Patch Changes

- [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 3.64.3

### Patch Changes

- [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 3.64.2

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 3.64.1

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 3.64.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.

## 3.63.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.

## 3.62.0

### Minor Changes

- [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

  > **The option set in individual CRUD components takes priority over the global option**

## 3.61.0

### Minor Changes

- [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

  > **The option set in individual CRUD components takes priority over the global option**

## 3.60.0

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

## 3.59.0

### Minor Changes

- [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

- Updated dependencies [[`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
  - @pankod/refine-ui-types@0.13.0

## 3.58.0

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

## 3.57.0

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

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.6

## 3.56.0

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

### Patch Changes

- Updated dependencies [[`19124711a7`](https://github.com/refinedev/refine/commit/19124711a7dc23c0b0e61bc845fbd294927999da)]:
  - @pankod/refine-ui-types@0.11.5

## 3.55.3

### Patch Changes

- Fixed `providers` property empty array state in `<AuthPage />` component

## 3.55.2

### Patch Changes

- Fixed `providers` property empty array state in `<AuthPage />` component

## 3.55.1

### Patch Changes

- [#2712](https://github.com/refinedev/refine/pull/2712) [`c434055011`](https://github.com/refinedev/refine/commit/c434055011cbdd846c9f228c23987607bb828a1b) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `providers` property empty array state in `<AuthPage />` component

## 3.55.0

### Minor Changes

- Added infinite loading example to antd `useSelect()`
  `useSelect()` `fetchSize` prop is deprecated. From now [`pagination`](https://refine.dev/docs/api-reference/core/interfaceReferences/#pagination) should be used

### Patch Changes

- Add AuthProps type export

## 3.54.0

### Minor Changes

- [#2629](https://github.com/refinedev/refine/pull/2629) [`bc89228e73`](https://github.com/refinedev/refine/commit/bc89228e73dbf373cbbbd0fbf5e6e4721224a7c5) Thanks [@bungambohlah](https://github.com/bungambohlah)! - Added infinite loading example to antd `useSelect()`
  `useSelect()` `fetchSize` prop is deprecated. From now [`pagination`](https://refine.dev/docs/api-reference/core/interfaceReferences/#pagination) should be used

### Patch Changes

- [#2666](https://github.com/refinedev/refine/pull/2666) [`8a562d2114`](https://github.com/refinedev/refine/commit/8a562d2114b7145707070e363981a4e31e02547a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add AuthProps type export

## 3.53.0

### Minor Changes

- - Added new <AuthPage /> component core and mantine support.
  - Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.52.0

### Minor Changes

- [#2627](https://github.com/refinedev/refine/pull/2627) [`c5fb45d61f`](https://github.com/refinedev/refine/commit/c5fb45d61fa7470a7a34762ad19d17e9f87e4421) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added new <AuthPage /> component core and mantine support.
  - Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.51.0

### Minor Changes

- Deprecated `LoginPage`.

  **Before**

  ```tsx
  import { LoginPage } from "@pankod/refine-antd";

  <Refine
    LoginPage={LoginPage}
    ...
  />
  ```

  **After**

  ```tsx
  import { AuthPage } from "@pankod/refine-antd";

  <Refine
    LoginPage={AuthPage}
    ...
  />
  ```

## 3.50.0

### Minor Changes

- Deprecated `LoginPage`.

  **Before**

  ```tsx
  import { LoginPage } from "@pankod/refine-antd";

  <Refine
    LoginPage={LoginPage}
    ...
  />
  ```

  **After**

  ```tsx
  import { AuthPage } from "@pankod/refine-antd";

  <Refine
    LoginPage={AuthPage}
    ...
  />
  ```

## 3.49.0

### Minor Changes

- [#2580](https://github.com/refinedev/refine/pull/2580) [`e1ab7da6b3`](https://github.com/refinedev/refine/commit/e1ab7da6b335bad62b15a537a3ed63c9f113bd01) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Deprecated `LoginPage`.

  **Before**

  ```tsx
  import { LoginPage } from "@pankod/refine-antd";

  <Refine
    LoginPage={LoginPage}
    ...
  />
  ```

  **After**

  ```tsx
  import { AuthPage } from "@pankod/refine-antd";

  <Refine
    LoginPage={AuthPage}
    ...
  />
  ```

## 3.48.10

### Patch Changes

- ReadyPage examples link fixed.

## 3.48.9

### Patch Changes

- [#2505](https://github.com/refinedev/refine/pull/2505) [`a4dbb63c88`](https://github.com/refinedev/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ReadyPage examples link fixed.

## 3.48.8

### Patch Changes

- Updated `disabled` attribute of buttons in CRUD components according to `isLoading` prop.

- Removed redundant type inheritance

- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.2

## 3.48.7

### Patch Changes

- [#2586](https://github.com/refinedev/refine/pull/2586) [`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b) Thanks [@necatiozmen](https://github.com/necatiozmen)! - Removed redundant type inheritance

- Updated dependencies [[`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b)]:
  - @pankod/refine-ui-types@0.11.1

## 3.48.6

### Patch Changes

- [#2585](https://github.com/refinedev/refine/pull/2585) [`e7ab42a73b`](https://github.com/refinedev/refine/commit/e7ab42a73b87625b2646864118ad25cbe31295ad) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `disabled` attribute of buttons in CRUD components according to `isLoading` prop.

## 3.48.5

### Patch Changes

- Rename `reset-password` -> `forgot-password` on docs.

## 3.48.4

### Patch Changes

- Rename `reset-password` -> `forgot-password` on docs.

## 3.48.3

### Patch Changes

- [#2568](https://github.com/refinedev/refine/pull/2568) [`efe99f7843`](https://github.com/refinedev/refine/commit/efe99f78433c46433f137fd9581f33f4d75778e0) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Rename `reset-password` -> `forgot-password` on docs.

## 3.48.2

### Patch Changes

- Fixed `useModalForm` & `useStepsForm` return type

## 3.48.1

### Patch Changes

- [#2552](https://github.com/refinedev/refine/pull/2552) [`52cd8d633e`](https://github.com/refinedev/refine/commit/52cd8d633e57f925bb51c875aab0406e3358ec45) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `useModalForm` & `useStepsForm` return type

## 3.48.0

### Minor Changes

- Add `providers` support on AuthPage register page.

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.0

## 3.47.0

### Minor Changes

- [#2551](https://github.com/refinedev/refine/pull/2551) [`a65525de6f`](https://github.com/refinedev/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add `providers` support on AuthPage register page.

### Patch Changes

- Updated dependencies [[`a65525de6f`](https://github.com/refinedev/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e)]:
  - @pankod/refine-ui-types@0.10.0

## 3.46.4

### Patch Changes

- - Auth pages background color fixed.
  - Removed unused `updatePasswordLink` prop from auth pages.
  - Removed `onSubmit` prop from auth pages. use `formProps` instead.
- Updated dependencies []:
  - @pankod/refine-ui-types@0.9.2

## 3.46.3

### Patch Changes

- [#2524](https://github.com/refinedev/refine/pull/2524) [`27bf81bebb`](https://github.com/refinedev/refine/commit/27bf81bebb217d2944e20e79a8f7618eda0e9db7) Thanks [@biskuvit](https://github.com/biskuvit)! - - Auth pages background color fixed.
  - Removed unused `updatePasswordLink` prop from auth pages.
  - Removed `onSubmit` prop from auth pages. use `formProps` instead.
- Updated dependencies [[`27bf81bebb`](https://github.com/refinedev/refine/commit/27bf81bebb217d2944e20e79a8f7618eda0e9db7)]:
  - @pankod/refine-ui-types@0.9.1

## 3.46.2

### Patch Changes

- Fixed the spacing between `icon` and `breadcrumb label` in `Breadcrumb` component.

## 3.46.1

### Patch Changes

- [#2534](https://github.com/refinedev/refine/pull/2534) [`a9676932cc`](https://github.com/refinedev/refine/commit/a9676932ccae00f364918f163e44e73032ffa029) Thanks [@ozkalai](https://github.com/ozkalai)! - Fixed the spacing between `icon` and `breadcrumb label` in `Breadcrumb` component.

## 3.46.0

### Minor Changes

- Added `formProps` property support for AuthPage component

  ## Usage

  ```tsx
  <AuthPage
    type="login"
    formProps={{
      initialValues: {
        email: "demo@refine.dev",
        password: "demo",
      },
    }}
  />
  ```

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.9.0

## 3.45.0

### Minor Changes

- [#2516](https://github.com/refinedev/refine/pull/2516) [`ad99916d6d`](https://github.com/refinedev/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `formProps` property support for AuthPage component

  ## Usage

  ```tsx
  <AuthPage
    type="login"
    formProps={{
      initialValues: {
        email: "demo@refine.dev",
        password: "demo",
      },
    }}
  />
  ```

### Patch Changes

- Updated dependencies [[`ad99916d6d`](https://github.com/refinedev/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0)]:
  - @pankod/refine-ui-types@0.8.0

## 3.44.0

### Minor Changes

- Added `render` prop to `Sider` component. You can get `dashboard`, `logout` and `items` from `render` props to customize the `Sider` component.

- Added `<AuthPage>` for Ant Design. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

### Patch Changes

- Fixed version of react-router to `6.3.0`

- Passed `collapsed` prop to `render` method in `Sider` component of `@pankod/refine-antd`.

- Updated dependencies []:
  - @pankod/refine-ui-types@0.7.0

## 3.43.1

### Patch Changes

- [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 3.43.0

### Minor Changes

- [#2447](https://github.com/refinedev/refine/pull/2447) [`628a37a675`](https://github.com/refinedev/refine/commit/628a37a6753a778cbec5c29b698981e0157caa42) Thanks [@biskuvit](https://github.com/biskuvit)! - Added `<AuthPage>` for Ant Design. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

### Patch Changes

- Updated dependencies [[`628a37a675`](https://github.com/refinedev/refine/commit/628a37a6753a778cbec5c29b698981e0157caa42)]:
  - @pankod/refine-ui-types@0.6.2

## 3.42.1

### Patch Changes

- [#2492](https://github.com/refinedev/refine/pull/2492) [`7d5bf3023d`](https://github.com/refinedev/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9) Thanks [@ozkalai](https://github.com/ozkalai)! - Passed `collapsed` prop to `render` method in `Sider` component of `@pankod/refine-antd`.

- Updated dependencies [[`7d5bf3023d`](https://github.com/refinedev/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9)]:
  - @pankod/refine-ui-types@0.6.1

## 3.42.0

### Minor Changes

- [#2454](https://github.com/refinedev/refine/pull/2454) [`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af) Thanks [@ozkalai](https://github.com/ozkalai)! - Added `render` prop to `Sider` component. You can get `dashboard`, `logout` and `items` from `render` props to customize the `Sider` component.

### Patch Changes

- Updated dependencies [[`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af)]:
  - @pankod/refine-ui-types@0.6.0

## 3.41.0

### Minor Changes

- Added support nested sorting

## 3.40.0

### Minor Changes

- [#2427](https://github.com/refinedev/refine/pull/2427) [`b21908e872`](https://github.com/refinedev/refine/commit/b21908e87209c3a8825991c6ab829f7c45c19e9b) Thanks [@geoffatsource](https://github.com/geoffatsource)! - Added support nested sorting

## 3.39.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.5.0

## 3.38.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

- Updated dependencies [[`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af)]:
  - @pankod/refine-ui-types@0.4.0

## 3.37.11

### Patch Changes

- Fix: `useStepsForm`'s `submit` function can be overridden

## 3.37.10

### Patch Changes

- Fix: `useStepsForm`'s `submit` function can be overridden

## 3.37.9

### Patch Changes

- [#2421](https://github.com/refinedev/refine/pull/2421) [`2b1c5e01b0`](https://github.com/refinedev/refine/commit/2b1c5e01b0f65b2c7558ba79539fab411480cc06) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix: `useStepsForm`'s `submit` function can be overridden

## 3.37.8

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

## 3.37.7

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

## 3.37.6

### Patch Changes

- Fix `useModalForm` hook reset issue after successful submit

## 3.37.5

### Patch Changes

- [#2403](https://github.com/refinedev/refine/pull/2403) [`ef8622cba3`](https://github.com/refinedev/refine/commit/ef8622cba32acc8f5edf9e4190fbe90d99e642c6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix `useModalForm` hook reset issue after successful submit

## 3.37.4

### Patch Changes

- Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.3

### Patch Changes

- Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.2

### Patch Changes

- Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.1

### Patch Changes

- [#2343](https://github.com/refinedev/refine/pull/2343) [`90b39d4f83`](https://github.com/refinedev/refine/commit/90b39d4f839dc97868b7126ffb2903e29b8bb51a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.0

### Minor Changes

- Separated `styles.min.css` file as `antd.min.css` and `reset.min.css` to make users able to turn off `reset` styles when needed.

## 3.36.0

### Minor Changes

- [#2312](https://github.com/refinedev/refine/pull/2312) [`ba5646c65c`](https://github.com/refinedev/refine/commit/ba5646c65cc09dee688fef1cf3a6556707754c3c) Thanks [@aliemir](https://github.com/aliemir)! - Separated `styles.min.css` file as `antd.min.css` and `reset.min.css` to make users able to turn off `reset` styles when needed.

## 3.35.4

### Patch Changes

- Upgraded `react-query` version to 4.

## 3.35.3

### Patch Changes

- [#2260](https://github.com/refinedev/refine/pull/2260) [`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgraded `react-query` version to 4.

## 3.35.2

### Patch Changes

- Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

* Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

  Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

  Updated `@pankod/refine-ui-tests` `fields` properties.

- Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

  Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

- Updated dependencies []:
  - @pankod/refine-ui-types@0.3.0

## 3.35.1

### Patch Changes

- [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

* [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

  Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

  Updated `@pankod/refine-ui-tests` `fields` properties.

- [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

  Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

- Updated dependencies [[`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a)]:
  - @pankod/refine-ui-types@0.2.0

## 3.35.0

### Minor Changes

- Add React@18 support 🚀

### Patch Changes

- Fixed `isMobile` control in `Sider` component detecting `desktop` dimensions as `mobile` on route changes

## 3.34.0

### Minor Changes

- [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

### Patch Changes

- [#2255](https://github.com/refinedev/refine/pull/2255) [`b56f43529f`](https://github.com/refinedev/refine/commit/b56f43529f387ad1801e7bc0d94dfa5679bad77e) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `isMobile` control in `Sider` component detecting `desktop` dimensions as `mobile` on route changes

## 3.33.2

### Patch Changes

- Updated `console.warn`'s to trigger once.

## 3.33.1

### Patch Changes

- [#2223](https://github.com/refinedev/refine/pull/2223) [`0a215f2000`](https://github.com/refinedev/refine/commit/0a215f2000b4069618e42efda48b8864b38129fd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `console.warn`'s to trigger once.

## 3.33.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.32.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.31.0

### Minor Changes

- **BREAKING** Updated `useStepsForm` prop `isBackValidate` with default `false` instead of `true` to achieve consistency between packages (`@pankod/refine-react-hook-form`).

### Patch Changes

- Fix `useModal` hook doesn't return `modalProps`

* Added `hasPagination` support to [`useSimpleList`](https://refine.dev/docs/ui-frameworks/antd/hooks/list/useSimpleList/) hook.

## 3.30.0

### Minor Changes

- [#2206](https://github.com/refinedev/refine/pull/2206) [`874b05af37`](https://github.com/refinedev/refine/commit/874b05af377b995c9cea6cbcde5407a19403f53d) Thanks [@aliemir](https://github.com/aliemir)! - **BREAKING** Updated `useStepsForm` prop `isBackValidate` with default `false` instead of `true` to achieve consistency between packages (`@pankod/refine-react-hook-form`).

### Patch Changes

- [#2203](https://github.com/refinedev/refine/pull/2203) [`3c80308ca1`](https://github.com/refinedev/refine/commit/3c80308ca143d11d7daeb7e9624d0138ecede42d) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix `useModal` hook doesn't return `modalProps`

* [#2201](https://github.com/refinedev/refine/pull/2201) [`62c261c2a7`](https://github.com/refinedev/refine/commit/62c261c2a7eaaec77d10440f2ec37f3697d869c9) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `hasPagination` support to [`useSimpleList`](https://refine.dev/docs/ui-frameworks/antd/hooks/list/useSimpleList/) hook.

## 3.29.0

### Minor Changes

- Added `defaultSetFilterBehavior` prop to `useTable` and `useSimpleList` hooks. Return `setFilters` and `setSorter` from `useTable` of `@pankod/refine-core`.

  This feature will let `@pankod/refine-antd` users to set filters manually and change filter setter logic (defaults to `merge`).

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-core@3.44.0

## 3.28.0

### Minor Changes

- [#2168](https://github.com/refinedev/refine/pull/2168) [`a9196ffe2d`](https://github.com/refinedev/refine/commit/a9196ffe2de8bfe266be2cac1ac05eab039d0fb7) Thanks [@aliemir](https://github.com/aliemir)! - Added `defaultSetFilterBehavior` prop to `useTable` and `useSimpleList` hooks. Return `setFilters` and `setSorter` from `useTable` of `@pankod/refine-core`.

  This feature will let `@pankod/refine-antd` users to set filters manually and change filter setter logic (defaults to `merge`).

### Patch Changes

- Updated dependencies [[`4d5f6b25e5`](https://github.com/refinedev/refine/commit/4d5f6b25e51cf773e08a0ce0b93a3680e692564a)]:
  - @pankod/refine-core@3.43.0

## 3.27.6

### Patch Changes

- Fixed the `Unhandled Promise` error on console for `useForm` with failed requests (Resolves #2156).

  This fix only catches the errors triggered by submitting the form, requests by invoking `onFinish` function should be handled by the user.

## 3.27.5

### Patch Changes

- [#2161](https://github.com/refinedev/refine/pull/2161) [`8490f3c38f`](https://github.com/refinedev/refine/commit/8490f3c38f8a7136a7dc396f3105334da8068b0b) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `Unhandled Promise` error on console for `useForm` with failed requests (Resolves #2156).

  This fix only catches the errors triggered by submitting the form, requests by invoking `onFinish` function should be handled by the user.

## 3.27.4

### Patch Changes

- Removed unused cases in `useFileUploadState` and fixed conflicting type in `antd#UploadFileStatus` interface.

- Updated dependencies []:
  - @pankod/refine-core@3.40.0

## 3.27.3

### Patch Changes

- [#2135](https://github.com/refinedev/refine/pull/2135) [`cf90324cb4`](https://github.com/refinedev/refine/commit/cf90324cb4043cb8c0fae79c15e9c17c2bda8044) Thanks [@aliemir](https://github.com/aliemir)! - Removed unused cases in `useFileUploadState` and fixed conflicting type in `antd#UploadFileStatus` interface.

- Updated dependencies [[`868bb943ad`](https://github.com/refinedev/refine/commit/868bb943adc42d80a7904e2acbd6397d097ad4e2)]:
  - @pankod/refine-core@3.39.0

## 3.27.2

### Patch Changes

- Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

- Updated dependencies []:
  - @pankod/refine-core@3.38.0

## 3.27.1

### Patch Changes

- [#2106](https://github.com/refinedev/refine/pull/2106) [`10a20d8714`](https://github.com/refinedev/refine/commit/10a20d87142b694bc9c02afaee5b4fe6c5853c5a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

- Updated dependencies [[`9d77c63a92`](https://github.com/refinedev/refine/commit/9d77c63a925dca0133b3e83974dff486a2233017), [`98966b586f`](https://github.com/refinedev/refine/commit/98966b586f6febd8669065b5b453a8e441f76bc1)]:
  - @pankod/refine-core@3.37.0

## 3.27.0

### Minor Changes

- Updated `useTable` hook with `hasPagination` to enable/disable pagination.

  **Implementation**

  Updated the `useTable` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

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

## 3.26.0

### Minor Changes

- [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `useTable` hook with `hasPagination` to enable/disable pagination.

  **Implementation**

  Updated the `useTable` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

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

## 3.25.10

### Patch Changes

- Updated the `id` parameter type to [`BaseKey`](https://refine.dev/docs/core/interfaceReferences/#basekey) for `show` function in [`useModalForm`](https://refine.dev/docs/packages/react-hook-form/useModalForm/) hook

* Updated the `id` type to `BaseKey` for `isEditing` and `editButtonProps` properties in `useEditableTable` hook.

* Updated dependencies []:
  - @pankod/refine-core@3.34.2

## 3.25.9

### Patch Changes

- [#2059](https://github.com/refinedev/refine/pull/2059) [`326341c94e`](https://github.com/refinedev/refine/commit/326341c94edb7f6a1507900506caccc60a386229) Thanks [@omeraplak](https://github.com/omeraplak)! - Updated the `id` parameter type to [`BaseKey`](https://refine.dev/docs/core/interfaceReferences/#basekey) for `show` function in [`useModalForm`](https://refine.dev/docs/packages/react-hook-form/useModalForm/) hook

* [#2052](https://github.com/refinedev/refine/pull/2052) [`cbb09e5b22`](https://github.com/refinedev/refine/commit/cbb09e5b22add54d7dccf180cd17c9019d32ed44) Thanks [@omeraplak](https://github.com/omeraplak)! - Updated the `id` type to `BaseKey` for `isEditing` and `editButtonProps` properties in `useEditableTable` hook.

* Updated dependencies [[`0338ce9d6b`](https://github.com/refinedev/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09)]:
  - @pankod/refine-core@3.34.1

## 3.25.8

### Patch Changes

- Fix missing behavior for dashboard item in _deprecated_ `useMenu`

- Updated dependencies []:
  - @pankod/refine-core@3.32.0

## 3.25.7

### Patch Changes

- [#2009](https://github.com/refinedev/refine/pull/2009) [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Fix missing behavior for dashboard item in _deprecated_ `useMenu`

- Updated dependencies [[`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0)]:
  - @pankod/refine-core@3.31.0

## 3.25.6

### Patch Changes

- Update `key`s in `<Sider/>` component to use `route`

* Deprecated `useMenu` from `@pankod/refine-antd` and replaced with the `useMenu` from `@pankod/refine-core`

* Updated dependencies []:
  - @pankod/refine-core@3.30.0

## 3.25.6

### Patch Changes

- Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

## 3.25.5

### Patch Changes

- [#1945](https://github.com/refinedev/refine/pull/1945) [`592a401924`](https://github.com/refinedev/refine/commit/592a40192482cf88108348ed21db437e6d304a43) Thanks [@omeraplak](https://github.com/omeraplak)! - Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

## 3.25.4

### Patch Changes

- `@pankod/refine-antd` Pagination with Next.js Links breaks the app

- Updated dependencies []:
  - @pankod/refine-core@3.29.0

## 3.25.3

### Patch Changes

- `@pankod/refine-antd` Pagination with Next.js Links breaks the app

- Updated dependencies []:
  - @pankod/refine-core@3.28.0

## 3.25.2

### Patch Changes

- `@pankod/refine-antd` Pagination with Next.js Links breaks the app

- Updated dependencies []:
  - @pankod/refine-core@3.27.0

## 3.25.1

### Patch Changes

- [#1897](https://github.com/refinedev/refine/pull/1897) [`b1636033fa`](https://github.com/refinedev/refine/commit/b1636033faee2b5eacbad413e2d1f975316e97cb) Thanks [@aliemir](https://github.com/aliemir)! - `@pankod/refine-antd` Pagination with Next.js Links breaks the app

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

- Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
  - @pankod/refine-core@3.23.2

## 3.23.1

### Patch Changes

- [#1865](https://github.com/refinedev/refine/pull/1865) [`5c3392ccd1`](https://github.com/refinedev/refine/commit/5c3392ccd1eff70dae1479557eede8c246b76edc) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix #1858 `useTable` creating nested `<a>` tag in Pagination component

- Updated dependencies [[`3281378b11`](https://github.com/refinedev/refine/commit/3281378b119c698be3ae4ecb3866b40b883494d8)]:
  - @pankod/refine-core@3.23.1

## 3.23.0

### Minor Changes

- [#1843](https://github.com/refinedev/refine/pull/1843) [`31850119e0`](https://github.com/refinedev/refine/commit/31850119e069b93f0b5146b039a86e736164383e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add `useBreadcrumb` hook and `Breadrumb` component for `@pankod/refine-antd` package

### Patch Changes

- Updated dependencies [[`31850119e0`](https://github.com/refinedev/refine/commit/31850119e069b93f0b5146b039a86e736164383e)]:
  - @pankod/refine-core@3.23.0
