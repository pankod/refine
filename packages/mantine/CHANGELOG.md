# @refinedev/mantine

## 3.0.2

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

- Updated dependencies [[`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3)]:
  - @refinedev/ui-types@2.0.1

## 3.0.1

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

## 3.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade Mantine integration for Refine 5.0

  - Updated Mantine components with deprecated API cleanup and improved TypeScript support.
  - Removed legacy components and restructured hooks and components for better developer experience.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98), [`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/ui-types@2.0.0
  - @refinedev/core@5.0.0

## 2.37.0

### Minor Changes

- [#6880](https://github.com/refinedev/refine/pull/6880) [`2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2`](https://github.com/refinedev/refine/commit/2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2) Thanks [@arndom](https://github.com/arndom)! - - Add `siderItemsAreCollapsed` prop to all `Sider` components to set default expanded/collapsed nested sider items.

  - UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6721](https://github.com/refinedev/refine/issues/6721)

## 2.36.2

### Patch Changes

- [#6835](https://github.com/refinedev/refine/pull/6835) [`e78213ff7fdcace9bac455861123299bfdab4452`](https://github.com/refinedev/refine/commit/e78213ff7fdcace9bac455861123299bfdab4452) Thanks [@amulyavarshney](https://github.com/amulyavarshney)! - feat: add `autoResetFormWhenClose` option to `useModalForm` hook

  Added `autoResetFormWhenClose` prop to reset form when modal closes. Default is `true`.

## 2.36.1

### Patch Changes

📢 **Refine Community Release** 📢

- - Add `deleteButtonProps` prop to the `Show` component of UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6692](https://github.com/refinedev/refine/issues/6692)

- Updated dependencies []:
  - @refinedev/ui-types@1.24.2

## 2.36.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6699](https://github.com/refinedev/refine/pull/6699) [`cd938b04cb004b61174d65811467469abaf2db3f`](https://github.com/refinedev/refine/commit/cd938b04cb004b61174d65811467469abaf2db3f) Thanks [@arndom](https://github.com/arndom)! - - Add `deleteButtonProps` prop to the `Show` component of UI packages: AntDesign, Manitine, Charka-UI, Material-UI

  - Add documenation for this addition

  [Resolves #6692](https://github.com/refinedev/refine/issues/6692)

### Patch Changes

- Updated dependencies [[`cd938b04cb004b61174d65811467469abaf2db3f`](https://github.com/refinedev/refine/commit/cd938b04cb004b61174d65811467469abaf2db3f)]:
  - @refinedev/ui-types@1.24.0

## 2.35.3

### Patch Changes

📢 **Refine Community Release** 📢

- fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 2.35.2

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6683](https://github.com/refinedev/refine/pull/6683) [`a12a0821e3c573386c2a8eea4ac1582cc46dd26d`](https://github.com/refinedev/refine/commit/a12a0821e3c573386c2a8eea4ac1582cc46dd26d) Thanks [@aliemir](https://github.com/aliemir)! - fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 2.35.1

### Patch Changes

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

## 2.35.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6503](https://github.com/refinedev/refine/pull/6503) [`29d00f8dc49485e0f5c42d208417e158118d11f2`](https://github.com/refinedev/refine/commit/29d00f8dc49485e0f5c42d208417e158118d11f2) Thanks [@aress31](https://github.com/aress31)! - feat: added `minItems` prop to specify the minimum number of items required for rendering breadcrumbs. #6497

  Resolves [#6497](https://github.com/refinedev/refine/issues/6497)

⚡ **Refine Enterprise Release** ⚡

- [#6527](https://github.com/refinedev/refine/pull/6527) [`1d2613381c50f438270d6a3e486595d54496ef92`](https://github.com/refinedev/refine/commit/1d2613381c50f438270d6a3e486595d54496ef92) Thanks [@OmkarBansod02](https://github.com/OmkarBansod02)! - Enhanced the ThemedSideV2 component with new functionality to support dynamic onSiderCollapsed handling. This allows better customization of sider collapse/expand events and improved responsiveness for mobile and desktop views. Added additional type definitions and ensured compatibility across all layout contexts. resolves #6508

### Patch Changes

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

## 2.34.0

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

## 2.33.0

### Minor Changes

- [#6180](https://github.com/refinedev/refine/pull/6180) [`292cebc5a70f19400793292b79d1400fec114591`](https://github.com/refinedev/refine/commit/292cebc5a70f19400793292b79d1400fec114591) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`useSelect`](https://refine.dev/docs/ui-integrations/mantine/hooks/use-select/)'s `queryResult` and `defaultValueQueryResult` is deprecated, use `query` and `defaultValueQuery` instead. #6179

  ```diff
  import { useSelect } from '@refinedev/mantine';

  - const { queryResult, defaultValueQueryResult } = useSelect();
  + const { query, defaultValueQuery } = useSelect();
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

## 2.32.2

### Patch Changes

- [#6021](https://github.com/refinedev/refine/pull/6021) [`55cd0662b1e3ff8f8410eba812e80130afe75d14`](https://github.com/refinedev/refine/commit/55cd0662b1e3ff8f8410eba812e80130afe75d14) Thanks [@JayBhensdadia](https://github.com/JayBhensdadia)! - fix: ensure Sider component handles various resource name formats correctly

  Updated Sider component to correctly handle lowercase and camelcased resource names, enhancing usability and functionality.

  Fixes #6004

- [#6064](https://github.com/refinedev/refine/pull/6064) [`b516c18b828ba8823561d0fefc4afe02b45ce332`](https://github.com/refinedev/refine/commit/b516c18b828ba8823561d0fefc4afe02b45ce332) Thanks [@aliemir](https://github.com/aliemir)! - fix(auto-save-indicator): replace reserved `key` prop with `translationKey` in <Message /> components

  `<AutoSaveIndicator />` components from UI libraries have been using a `<Message />` component internally that uses a `key` prop. Since `key` is a reserved prop in React, it was causing a warning in the console. This change replaces the `key` prop with `translationKey` to avoid the warning.

  Resolves [#6067](https://github.com/refinedev/refine/issues/6067)

## 2.32.0

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

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046)]:
  - @refinedev/ui-types@1.22.9

## 2.31.0

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

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`903ea231538b00ce02ddc9394c72848ec1e90772`](https://github.com/refinedev/refine/commit/903ea231538b00ce02ddc9394c72848ec1e90772), [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d)]:
  - @refinedev/ui-types@1.22.8

## 2.30.2

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

- Updated dependencies [[`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d)]:
  - @refinedev/ui-types@1.22.7

## 2.30.1

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- Updated dependencies [[`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f)]:
  - @refinedev/ui-types@1.22.6

## 2.30.0

### Minor Changes

- [#5761](https://github.com/refinedev/refine/pull/5761) [`399911617b2`](https://github.com/refinedev/refine/commit/399911617b2bb044e4ed9a348daba5c802d790e6) Thanks [@aliemir](https://github.com/aliemir)! - Migrated from outdated `@tabler/icons@1` to `@tabler/icons-react@3` to make sure we're using the latest available version of the library without requiring users to pin to a deprecated version.

  If your project doesn't include `@tabler/icons` you won't be affected by this change. If you're using `@tabler/icons@1` in your project, you may need to update your dependency to latest version of `@tabler/icons-react` to avoid conflicting dependencies. Practically, this should not introduce any breaking changes to your project and all the icons in `@tabler/icons@1` should also be available in the latest version of `@tabler/icons-react`.

### Patch Changes

- [#5737](https://github.com/refinedev/refine/pull/5737) [`4e8188a6652`](https://github.com/refinedev/refine/commit/4e8188a665209b0d0b77aef27c795a29b9513226) Thanks [@aliemir](https://github.com/aliemir)! - chore: updated content of `README.md` to include installation, usage and scaffolding instructions.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: `@tabler/icons-react` imports in CJS builds

  imports from `@tabler/icons-react` end up requiring the ESM build in CJS environments, to prevent this we've added added an esbuild plugin to replace the imports with the correct path for CJS bundles.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: `dayjs` imports in ESM bundles

  dayjs imports in ESM bundles were not being correctly resolved, this has been fixed by adding an esbuild plugin to replace the imports with the correct path for ESM bundles.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `lodash-es` imports for ESM builds to access the exports properly.

- [#5714](https://github.com/refinedev/refine/pull/5714) [`38f129f40ee`](https://github.com/refinedev/refine/commit/38f129f40eea109c9b89b23a8fd3f217964330c7) Thanks [@aliemir](https://github.com/aliemir)! - Due to the bug fix made in the `@refinedev/core`, `onFinishAutoSave`'s returned promise can now reject and should be handled accordingly. Updated `useForm`'s auto save handler to catch the rejection without breaking the application.

  Additionally due to the same changes, `onFinish` should also be handled accordingly. Updated `useForm`'s `saveButtonProps.onClick` to catch the rejection without breaking the application.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: broken eslint plugin for removing test ids from components

  Eslint plugin to remove test ids from components was broken and might miss some test ids to be included in the bundles.

- [#5808](https://github.com/refinedev/refine/pull/5808) [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39) Thanks [@aliemir](https://github.com/aliemir)! - refactor: moved internal logic of buttons to respective hooks from `@refinedev/core`

  We've moved the internal logic of buttons to their respective hooks in the `@refinedev/core` package to ensure consistency and reduce duplication. This change will make it easier to manage and maintain the buttons across different UI integrations of Refine. This will also benefit the users who want to customize the buttons via `swizzle` option or create their own buttons withouth having to duplicate the logic.

- [#5755](https://github.com/refinedev/refine/pull/5755) [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect type imports

- Updated dependencies [[`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927)]:
  - @refinedev/ui-types@1.22.5

## 2.29.5

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 2.29.4

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

## 2.29.3

### Patch Changes

- [#5568](https://github.com/refinedev/refine/pull/5568) [`f1244819ad`](https://github.com/refinedev/refine/commit/f1244819adae9761234af697f292b4136da47503) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `notificationProvider` is deprecated due to consistent naming convention between UI libraries. Please use `useNotificationProvider` export as your notification provider. #5567

- [#5564](https://github.com/refinedev/refine/pull/5564) [`1bb7d30888`](https://github.com/refinedev/refine/commit/1bb7d3088837584b19c4faba41a91817d910d493) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`<ThemedTitleV2 />'s`](https://refine.dev/docs/ui-integrations/material-ui/components/themed-layout/) default icon updated.

## 2.29.2

### Patch Changes

- [#5429](https://github.com/refinedev/refine/pull/5429) [`3bc130e475`](https://github.com/refinedev/refine/commit/3bc130e47502c7cf994225a369b3806a570a5d7a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `useNotification.close("notification-key")` not working. Resolves [#5433](https://github.com/refinedev/refine/issues/5433)

- [#5465](https://github.com/refinedev/refine/pull/5465) [`00e00cbd98`](https://github.com/refinedev/refine/commit/00e00cbd98c34046ab83b299ede83401ae74fec1) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the type issue between `remark-gfm` and `react-markdown`. #5463

## 2.29.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

- Updated dependencies [[`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5)]:
  - @refinedev/ui-types@1.22.4

## 2.29.0

### Minor Changes

- [#5307](https://github.com/refinedev/refine/pull/5307) [`f8e407f850`](https://github.com/refinedev/refine/commit/f8e407f85054bccf1e6ff45c84928bc01db7f5eb) Thanks [@jackprogramsjp](https://github.com/jackprogramsjp)! - feat: added `hideForm` props for `LoginPage` and `RegisterPage` for `AuthPage` feature.

  Now with the `hideForm` props feature, you can be able to hide the forms (like email/password)
  to only show the OAuth providers. This avoids having to make your own entire AuthPage.

### Patch Changes

- [#5269](https://github.com/refinedev/refine/pull/5269) [`a23a0945d3`](https://github.com/refinedev/refine/commit/a23a0945d3fe003ae081fca1c47312dd6bf8c2ee) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: add "autoComplete" field for Login pages.

- [#5325](https://github.com/refinedev/refine/pull/5325) [`7ff54b2060`](https://github.com/refinedev/refine/commit/7ff54b2060b0ce942c4170f744cbdf52d0940434) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `<AuthPage />` styling issues on mobile screens.

  chore: new tests are added to `<AuthPage />`.

## 2.28.21

### Patch Changes

- [#5259](https://github.com/refinedev/refine/pull/5259) [`eac3df87ffb`](https://github.com/refinedev/refine/commit/eac3df87ffbf61c913a6c8ea584e1d8c61e8d82e) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<AutoSaveIndicator />` component to extend the `<AutoSaveIndicator />` from `@refinedev/core` with custom elements and render appropriate element based on the state.

## 2.28.20

### Patch Changes

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Updated the return type of the `useSelect` hook to only include properties that actually being returned from the hook. Previously, the return type included all properties of the `Select` component, which was not correct.

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Now `useSelect` hook accepts 4th generic type `TOption` which allows you to change the type of options. By default `TOption` will be equal to `BaseOption` type which is `{ label: any; value: any; }`. If you want to change the type of options, you can do it like this:

  In PR #5160 the type convertion of the options are tried to be resolved by string conversion. This is not correct due to the fact that the `value` property of the option can be of any type. This was breaking the connection between the forms and the select inputs.

  This change is reverted in the `@refinedev/core`, now changed the types and the logic to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook.

  Mantine's `<Select />` component only allows values to be `string`. In a case of a `value` not being `string`, you'll be able to manipulate the options via mapping the options before using them.

  Here's how to get the proper types for the options and fix the value type issue:

  ```tsx
  import { Select } from "@mantine/core";
  import { HttpError } from "@refinedev/core";
  import { useSelect } from "@refinedev/mantine";

  type IPost = {
    id: number;
    title: string;
    description: string;
  };

  type IOption = { value: IPost["id"]; label: IPost["title"] };

  const MyComponent = () => {
    const { selectProps } = useSelect<IPost, HttpError, IPost, IOption>({
      resource: "posts",
    });

    // This will result in `selectProps.data` to be of type `IOption[]`.
    // <Select /> will not accept `value` as `number` so you'll have to map the options.

    return (
      <Select
        {...selectProps}
        data={selectProps.data.map((option) => ({
          ...option,
          value: option.value.toString(),
        }))}
      />
    );
  };
  ```

- [#5201](https://github.com/refinedev/refine/pull/5201) [`760cfbaaa2a`](https://github.com/refinedev/refine/commit/760cfbaaa2ac8b8c070ade1e174784358cc112b0) Thanks [@aliemir](https://github.com/aliemir)! - Updated initial value setting logic in `useForm` to handle nested objects properly.

## 2.28.19

### Patch Changes

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Updated the return type of the `useSelect` hook to only include properties that actually being returned from the hook. Previously, the return type included all properties of the `Select` component, which was not correct.

- [#5199](https://github.com/refinedev/refine/pull/5199) [`2b8d658a17a`](https://github.com/refinedev/refine/commit/2b8d658a17a20ae347ba92b63487418f04ec255c) Thanks [@aliemir](https://github.com/aliemir)! - Now `useSelect` hook accepts 4th generic type `TOption` which allows you to change the type of options. By default `TOption` will be equal to `BaseOption` type which is `{ label: any; value: any; }`. If you want to change the type of options, you can do it like this:

  In PR #5160 the type convertion of the options are tried to be resolved by string conversion. This is not correct due to the fact that the `value` property of the option can be of any type. This was breaking the connection between the forms and the select inputs.

  This change is reverted in the `@refinedev/core`, now changed the types and the logic to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook.

  Mantine's `<Select />` component only allows values to be `string`. In a case of a `value` not being `string`, you'll be able to manipulate the options via mapping the options before using them.

  Here's how to get the proper types for the options and fix the value type issue:

  ```tsx
  import { Select } from "@mantine/core";
  import { HttpError } from "@refinedev/core";
  import { useSelect } from "@refinedev/mantine";

  type IPost = {
    id: number;
    title: string;
    description: string;
  };

  type IOption = { value: IPost["id"]; label: IPost["title"] };

  const MyComponent = () => {
    const { selectProps } = useSelect<IPost, HttpError, IPost, IOption>({
      resource: "posts",
    });

    // This will result in `selectProps.data` to be of type `IOption[]`.
    // <Select /> will not accept `value` as `number` so you'll have to map the options.

    return (
      <Select
        {...selectProps}
        data={selectProps.data.map((option) => ({
          ...option,
          value: option.value.toString(),
        }))}
      />
    );
  };
  ```

- [#5201](https://github.com/refinedev/refine/pull/5201) [`760cfbaaa2a`](https://github.com/refinedev/refine/commit/760cfbaaa2ac8b8c070ade1e174784358cc112b0) Thanks [@aliemir](https://github.com/aliemir)! - Updated initial value setting logic in `useForm` to handle nested objects properly.

## 2.28.18

### Patch Changes

- [#5188](https://github.com/refinedev/refine/pull/5188) [`fc276fe53db`](https://github.com/refinedev/refine/commit/fc276fe53dbd048915bfa9fccea836359b1e5b70) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README installation command

## 2.28.17

### Patch Changes

- [#5188](https://github.com/refinedev/refine/pull/5188) [`fc276fe53db`](https://github.com/refinedev/refine/commit/fc276fe53dbd048915bfa9fccea836359b1e5b70) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README installation command

## 2.28.16

### Patch Changes

- [#5026](https://github.com/refinedev/refine/pull/5026) [`a605e4cd318`](https://github.com/refinedev/refine/commit/a605e4cd318ed5542b46e9e11a86f2c75dbb694b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
  From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

  feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.

## 2.28.15

### Patch Changes

- [#5026](https://github.com/refinedev/refine/pull/5026) [`a605e4cd318`](https://github.com/refinedev/refine/commit/a605e4cd318ed5542b46e9e11a86f2c75dbb694b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
  From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

  feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.

## 2.28.14

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 2.28.13

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 2.28.12

### Patch Changes

- [#4975](https://github.com/refinedev/refine/pull/4975) [`ff66a862e46`](https://github.com/refinedev/refine/commit/ff66a862e46d3ae89c2f848ba71f2d8d77650d6a) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@tabler/icons` to `v1.119.0` to fix the issue of using misconfigured versions. (Fixes #4921)

## 2.28.11

### Patch Changes

- [#4975](https://github.com/refinedev/refine/pull/4975) [`ff66a862e46`](https://github.com/refinedev/refine/commit/ff66a862e46d3ae89c2f848ba71f2d8d77650d6a) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@tabler/icons` to `v1.119.0` to fix the issue of using misconfigured versions. (Fixes #4921)

## 2.28.10

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

## 2.28.9

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

## 2.28.8

### Patch Changes

- [#4903](https://github.com/refinedev/refine/pull/4903) [`e327cadc011`](https://github.com/refinedev/refine/commit/e327cadc011ce8696d7149252e1ad308005b1eff) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add [`invalidateOnUnmount`](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm/#invalidateonunmount) prop to [`useForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm) hook.
  feat: add `invalidateOnUnmount` and `invalidateOnClose` prop to [`useModalForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useModalForm/#invalidateonunmount) and [`useDrawerForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useDrawerForm/#invalidateonunmount) hooks.
  From now on, you can use the use this props to invalidate queries upon unmount or close.

## 2.28.7

### Patch Changes

- [#4903](https://github.com/refinedev/refine/pull/4903) [`e327cadc011`](https://github.com/refinedev/refine/commit/e327cadc011ce8696d7149252e1ad308005b1eff) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add [`invalidateOnUnmount`](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm/#invalidateonunmount) prop to [`useForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm) hook.
  feat: add `invalidateOnUnmount` and `invalidateOnClose` prop to [`useModalForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useModalForm/#invalidateonunmount) and [`useDrawerForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useDrawerForm/#invalidateonunmount) hooks.
  From now on, you can use the use this props to invalidate queries upon unmount or close.

## 2.28.6

### Patch Changes

- [#4953](https://github.com/refinedev/refine/pull/4953) [`07dd28d4142`](https://github.com/refinedev/refine/commit/07dd28d41421b08d73d5b2dbf9af2d4d4788c01b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: broken Mantine documentation links on JSDoc.

- Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
  - @refinedev/ui-types@1.22.2

## 2.28.5

### Patch Changes

- [#4953](https://github.com/refinedev/refine/pull/4953) [`07dd28d4142`](https://github.com/refinedev/refine/commit/07dd28d41421b08d73d5b2dbf9af2d4d4788c01b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: broken Mantine documentation links on JSDoc.

- Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
  - @refinedev/ui-types@1.22.1

## 2.28.4

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 2.28.3

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 2.28.2

### Patch Changes

- [#4788](https://github.com/refinedev/refine/pull/4788) [`38680378c7a`](https://github.com/refinedev/refine/commit/38680378c7a7b0e5481ea4136f3958a00ac4ca92) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: fix incorrect usage of collapse icon in `<HeaderV2 />`

  fix: render user avatar and name in `<HeaderV2 />` based on user data from `authProvider`.

## 2.28.1

### Patch Changes

- [#4788](https://github.com/refinedev/refine/pull/4788) [`38680378c7a`](https://github.com/refinedev/refine/commit/38680378c7a7b0e5481ea4136f3958a00ac4ca92) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: fix incorrect usage of collapse icon in `<HeaderV2 />`

  fix: render user avatar and name in `<HeaderV2 />` based on user data from `authProvider`.

## 2.28.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<RefreshButton />` does not refresh content #4618.
  From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.

### Patch Changes

- [#4773](https://github.com/refinedev/refine/pull/4773) [`2af96197629`](https://github.com/refinedev/refine/commit/2af96197629cc387c555feef9e518a2a22c80d3d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: antd `useModalForm` sends request twice when `syncWithLocation` is true

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/ui-types@1.22.0

## 2.27.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<RefreshButton />` does not refresh content #4618.
  From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.

### Patch Changes

- [#4773](https://github.com/refinedev/refine/pull/4773) [`2af96197629`](https://github.com/refinedev/refine/commit/2af96197629cc387c555feef9e518a2a22c80d3d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: antd `useModalForm` sends request twice when `syncWithLocation` is true

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/ui-types@1.21.0

## 2.26.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 2.25.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 2.24.0

### Minor Changes

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: when the `dataProvider` returns rejected promise with `errors` field, `useForm` will automatically update the error state with the rejected `errors` field.

  [Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/mantine/components/basic-views/edit/#autosaveprops).
  [useForm](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm/#autosave), [useDrawerForm](https://refine.dev/docs/api-reference/mantine/hooks/form/useDrawerForm/#autosave), [useModalForm](https://refine.dev/docs/api-reference/mantine/hooks/form/useModalForm/#autosave), [useStepsForm](https://refine.dev/docs/api-reference/mantine/hooks/form/useStepsForm/#autosave) hooks now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.

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

  feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/mantine/components/mantine-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

  ```
  import { AutoSaveIndicator } from "@refinedev/mantine";
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

- Updated dependencies [[`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/ui-types@1.20.0

## 2.23.0

### Minor Changes

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: when the `dataProvider` returns rejected promise with `errors` field, `useForm` will automatically update the error state with the rejected `errors` field.

  [Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/mantine/components/basic-views/edit/#autosaveprops).
  [useForm](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm/#autosave), [useDrawerForm](https://refine.dev/docs/api-reference/mantine/hooks/form/useDrawerForm/#autosave), [useModalForm](https://refine.dev/docs/api-reference/mantine/hooks/form/useModalForm/#autosave), [useStepsForm](https://refine.dev/docs/api-reference/mantine/hooks/form/useStepsForm/#autosave) hooks now accept `autoSave` object. `enabled` is a boolean value and `debounce` is a number value in milliseconds. `debounce` is optional and default value is `1000`.

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

  feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/mantine/components/mantine-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

  ```
  import { AutoSaveIndicator } from "@refinedev/mantine";
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

- Updated dependencies [[`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/ui-types@1.19.0

## 2.22.2

### Patch Changes

- [#4629](https://github.com/refinedev/refine/pull/4629) [`58cc48b7b8f`](https://github.com/refinedev/refine/commit/58cc48b7b8fafc46145a28ca686ce1527a737da4) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `description` prop does not show up in Mantine notification.
  With this fix, you can now use `description` prop to show a description in the notification.

  ```tsx
  import { useNotification } from "@refinedev/core";

  const { open } = useNotification();

  open?.({
    description: "This is a description",
    message: "This is a message",
    type: "progress",
  });
  ```

## 2.22.1

### Patch Changes

- [#4629](https://github.com/refinedev/refine/pull/4629) [`58cc48b7b8f`](https://github.com/refinedev/refine/commit/58cc48b7b8fafc46145a28ca686ce1527a737da4) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `description` prop does not show up in Mantine notification.
  With this fix, you can now use `description` prop to show a description in the notification.

  ```tsx
  import { useNotification } from "@refinedev/core";

  const { open } = useNotification();

  open?.({
    description: "This is a description",
    message: "This is a message",
    type: "progress",
  });
  ```

## 2.22.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: ability to tweak active sider items navigation

  Visiting active sider items triggers page reloads due to them being links. We can now provide activeItemDisabled prop to disable such reloads.

### Patch Changes

- Updated dependencies [[`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/ui-types@1.18.0

## 2.21.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: ability to tweak active sider items navigation

  Visiting active sider items triggers page reloads due to them being links. We can now provide activeItemDisabled prop to disable such reloads.

### Patch Changes

- Updated dependencies [[`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/ui-types@1.17.0

## 2.20.0

### Minor Changes

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: implement following hooks have `useLoadingOvertime` hook

  - [`useDrawerForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useDrawerForm/#overtimeoptions)
  - [`useForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm/#overtimeoptions)
  - [`useModalForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useModalForm/#overtimeoptions)
  - [`useStepsForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useStepsForm/#overtimeoptions)
  - [`useSelect`](https://refine.dev/docs/api-reference/mantine/hooks/useSelect/#overtimeoptions)

### Patch Changes

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { DeleteButton } from "@refinedev/mantine";

  <DeleteButton resource="identifier-value" recordItemId="123" />;
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

## 2.19.0

### Minor Changes

- [#4523](https://github.com/refinedev/refine/pull/4523) [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: implement following hooks have `useLoadingOvertime` hook

  - [`useDrawerForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useDrawerForm/#overtimeoptions)
  - [`useForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm/#overtimeoptions)
  - [`useModalForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useModalForm/#overtimeoptions)
  - [`useStepsForm`](https://refine.dev/docs/api-reference/mantine/hooks/form/useStepsForm/#overtimeoptions)
  - [`useSelect`](https://refine.dev/docs/api-reference/mantine/hooks/useSelect/#overtimeoptions)

### Patch Changes

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { DeleteButton } from "@refinedev/mantine";

  <DeleteButton resource="identifier-value" recordItemId="123" />;
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

## 2.18.0

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

## 2.17.0

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

## 2.16.2

### Patch Changes

- [#4431](https://github.com/refinedev/refine/pull/4431) [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f) Thanks [@aliemir](https://github.com/aliemir)! - Updated the TSDoc comments to fix the broken links in the documentation.

## 2.16.1

### Patch Changes

- [#4431](https://github.com/refinedev/refine/pull/4431) [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f) Thanks [@aliemir](https://github.com/aliemir)! - Updated the TSDoc comments to fix the broken links in the documentation.

## 2.16.0

### Minor Changes

- [#4404](https://github.com/refinedev/refine/pull/4404) [`f67967e8c87`](https://github.com/refinedev/refine/commit/f67967e8c871b2252b4c1b827de3656bf153d1ee) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: fix name and state inconsistency in `<ThemedLayoutV2>`

  `useSiderVisible` is deprecated, instead we created a new hook `useThemedLayoutContext` for it. `useThemedLayoutContext` similar to `useSiderVisible` but it returns more meaningful state names. However, `useSiderVisible` is still available for backward compatibility.

  Updated `Sider` and `HamburgerMenu` components using `useThemedLayoutContext`.

  ```tsx
  import { useThemedLayoutContext } from "@refinedev/mantine";

  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  ```

## 2.15.0

### Minor Changes

- [#4404](https://github.com/refinedev/refine/pull/4404) [`f67967e8c87`](https://github.com/refinedev/refine/commit/f67967e8c871b2252b4c1b827de3656bf153d1ee) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: fix name and state inconsistency in `<ThemedLayoutV2>`

  `useSiderVisible` is deprecated, instead we created a new hook `useThemedLayoutContext` for it. `useThemedLayoutContext` similar to `useSiderVisible` but it returns more meaningful state names. However, `useSiderVisible` is still available for backward compatibility.

  Updated `Sider` and `HamburgerMenu` components using `useThemedLayoutContext`.

  ```tsx
  import { useThemedLayoutContext } from "@refinedev/mantine";

  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  ```

## 2.14.4

### Patch Changes

- [#4391](https://github.com/refinedev/refine/pull/4391) [`5fcc36c0272`](https://github.com/refinedev/refine/commit/5fcc36c0272993897b7b074215a4228ca5bb53aa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added: name attribute to input fields in `forgotPassword`, `register` and `updatePassword` forms

## 2.14.3

### Patch Changes

- [#4391](https://github.com/refinedev/refine/pull/4391) [`5fcc36c0272`](https://github.com/refinedev/refine/commit/5fcc36c0272993897b7b074215a4228ca5bb53aa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added: name attribute to input fields in `forgotPassword`, `register` and `updatePassword` forms

## 2.14.2

### Patch Changes

- [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 2.14.1

### Patch Changes

- [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 2.14.0

### Minor Changes

- [#4306](https://github.com/refinedev/refine/pull/4306) [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `syncWithLocation.syncId` default to `true` for `useModalForm`.

- [#4303](https://github.com/refinedev/refine/pull/4303) [`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added default button props into the renderer functions `headerButtons` and `footerButtons` in CRUD components.
  Now, customization of the header and footer buttons can be achieved without losing the default functionality.

  ```tsx
  import {
    DeleteButton,
    EditButton,
    ListButton,
    RefreshButton,
    Show,
  } from "@refinedev/mantine";

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

- Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
  - @refinedev/ui-types@1.16.0

## 2.13.0

### Minor Changes

- [#4306](https://github.com/refinedev/refine/pull/4306) [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `syncWithLocation.syncId` default to `true` for `useModalForm`.

- [#4303](https://github.com/refinedev/refine/pull/4303) [`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added default button props into the renderer functions `headerButtons` and `footerButtons` in CRUD components.
  Now, customization of the header and footer buttons can be achieved without losing the default functionality.

  ```tsx
  import {
    DeleteButton,
    EditButton,
    ListButton,
    RefreshButton,
    Show,
  } from "@refinedev/mantine";

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

- Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
  - @refinedev/ui-types@1.15.0

## 2.12.9

### Patch Changes

- [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

- Updated dependencies [[`dc62abc890f`](https://github.com/refinedev/refine/commit/dc62abc890f68be161c7035c28c0118216a9e0ec)]:
  - @refinedev/ui-types@1.14.0

## 2.12.8

### Patch Changes

- [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

## 2.12.7

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

## 2.12.6

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

## 2.12.5

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

## 2.12.4

### Patch Changes

- [#4255](https://github.com/refinedev/refine/pull/4255) [`9694245718c`](https://github.com/refinedev/refine/commit/9694245718cea7812c85aefc4880d165bb4d124d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `ThemedLayoutContextProvider` import path in internal usage.

## 2.12.3

### Patch Changes

- [#4255](https://github.com/refinedev/refine/pull/4255) [`9694245718c`](https://github.com/refinedev/refine/commit/9694245718cea7812c85aefc4880d165bb4d124d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `ThemedLayoutContextProvider` import path in internal usage.

## 2.12.2

### Patch Changes

- [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

## 2.12.1

### Patch Changes

- [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

## 2.12.0

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

- [#4209](https://github.com/refinedev/refine/pull/4209) [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `isSticky` prop to `ThemedHeaderV2` component

  ```tsx
  import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/mantine";

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

### Patch Changes

- [#4223](https://github.com/refinedev/refine/pull/4223) [`c2ca3a67b22`](https://github.com/refinedev/refine/commit/c2ca3a67b22deda76e341e588c1e2baefd85ea4f) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `ErrorComponent` height overflow issue which was causing header to be unresponsive.

- Updated dependencies [[`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8), [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2)]:
  - @refinedev/ui-types@1.12.0

## 2.11.0

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

- [#4209](https://github.com/refinedev/refine/pull/4209) [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `isSticky` prop to `ThemedHeaderV2` component

  ```tsx
  import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/mantine";

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

### Patch Changes

- [#4223](https://github.com/refinedev/refine/pull/4223) [`c2ca3a67b22`](https://github.com/refinedev/refine/commit/c2ca3a67b22deda76e341e588c1e2baefd85ea4f) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `ErrorComponent` height overflow issue which was causing header to be unresponsive.

- Updated dependencies [[`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8), [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2)]:
  - @refinedev/ui-types@1.11.0

## 2.10.0

### Minor Changes

- [#4176](https://github.com/refinedev/refine/pull/4176) [`13448252cd7`](https://github.com/refinedev/refine/commit/13448252cd7b6002af1d7ef1ff65dbf984aef6de) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` and `HamburgerMenu` component

  `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `<HamburgerMenu />` component, it's easier to collapse/uncollapse the `Sider`.

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

## 2.9.0

### Minor Changes

- [#4176](https://github.com/refinedev/refine/pull/4176) [`13448252cd7`](https://github.com/refinedev/refine/commit/13448252cd7b6002af1d7ef1ff65dbf984aef6de) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` and `HamburgerMenu` component

  `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `<HamburgerMenu />` component, it's easier to collapse/uncollapse the `Sider`.

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

## 2.8.0

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

- [#4131](https://github.com/refinedev/refine/pull/4131) [`0e7ee8876df`](https://github.com/refinedev/refine/commit/0e7ee8876df46d6c17dffb9b2c4e7be2399721cd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: `<ThemedSider>` logout icon alignment. `<LogoutButton>` icon changed to `<IconPower>` from `IconLogout`.

### Patch Changes

- [#4113](https://github.com/refinedev/refine/pull/4113) [`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the generic type name of hooks that use `useQuery` to synchronize generic type names with `tanstack-query`.

## 2.7.4

### Patch Changes

- [#4122](https://github.com/refinedev/refine/pull/4122) [`a36b17e86ba`](https://github.com/refinedev/refine/commit/a36b17e86ba8f670ad77b8a53386e3bf2076cebe) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: `warnWhenUnsavedChanges` was throwing even when there were no changes.

## 2.7.3

### Patch Changes

- [#4122](https://github.com/refinedev/refine/pull/4122) [`a36b17e86ba`](https://github.com/refinedev/refine/commit/a36b17e86ba8f670ad77b8a53386e3bf2076cebe) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: `warnWhenUnsavedChanges` was throwing even when there were no changes.

## 2.7.2

### Patch Changes

- [#4120](https://github.com/refinedev/refine/pull/4120) [`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9) Thanks [@aliemir](https://github.com/aliemir)! - Fix broken `useModalForm` with `create` actions.

## 2.7.1

### Patch Changes

- [#4120](https://github.com/refinedev/refine/pull/4120) [`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9) Thanks [@aliemir](https://github.com/aliemir)! - Fix broken `useModalForm` with `create` actions.

## 2.7.0

### Minor Changes

- [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout

### Patch Changes

- [#4114](https://github.com/refinedev/refine/pull/4114) [`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec) Thanks [@aliemir](https://github.com/aliemir)! - Updated `useModalForm` hook's `modal.show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal. If not, the modal will not show. (Resolves #4062)

## 2.6.0

### Minor Changes

- [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout

### Patch Changes

- [#4114](https://github.com/refinedev/refine/pull/4114) [`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec) Thanks [@aliemir](https://github.com/aliemir)! - Updated `useModalForm` hook's `modal.show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal. If not, the modal will not show. (Resolves #4062)

## 2.5.2

### Patch Changes

- [#4076](https://github.com/refinedev/refine/pull/4076) [`0c787747f38`](https://github.com/refinedev/refine/commit/0c787747f38a8e65dec32f4c6ec337ef99ea9e01) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - The `wrapperStyles` properties of `<ThemedSider>`'s `<ThemedTitle>` have been moved to the parent component. As a result, it is now possible to pass a custom `<Title>` component to `<ThemedLayout>` that will be styled correctly.

- [#4083](https://github.com/refinedev/refine/pull/4083) [`7dbb4b0d400`](https://github.com/refinedev/refine/commit/7dbb4b0d400aaf864e74e4126d19a19739142e03) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `ThemedTitle` cursor is now a pointer when hovering over the logo.

## 2.5.1

### Patch Changes

- [#4076](https://github.com/refinedev/refine/pull/4076) [`0c787747f38`](https://github.com/refinedev/refine/commit/0c787747f38a8e65dec32f4c6ec337ef99ea9e01) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - The `wrapperStyles` properties of `<ThemedSider>`'s `<ThemedTitle>` have been moved to the parent component. As a result, it is now possible to pass a custom `<Title>` component to `<ThemedLayout>` that will be styled correctly.

- [#4083](https://github.com/refinedev/refine/pull/4083) [`7dbb4b0d400`](https://github.com/refinedev/refine/commit/7dbb4b0d400aaf864e74e4126d19a19739142e03) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `ThemedTitle` cursor is now a pointer when hovering over the logo.

## 2.5.0

### Minor Changes

- [#3996](https://github.com/refinedev/refine/pull/3996) [`327be2be623`](https://github.com/refinedev/refine/commit/327be2be623ab9a62a32974315c3d2453baf4a07) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the Mantine components.

  ```tsx
  import { Refine } from "@refinedev/core";
  import { RefineThemes } from "@refinedev/mantine";
  import dataProvider from "@refinedev/simple-rest";

  const App = () => {
    // ---
    return (
      <MantineProvider theme={RefineThemes.Magenta}>
        <Refine dataProvider={dataProvider("YOUR_API_URL")}>
          {/** your app here */}
        </Refine>
      </MantineProvider>
    );
  };
  ```

  - default title with icon added to `AuthPage`. It uses `<ThemedTitle>` component from `@refinedev/mantine`. You can remove it by setting `title` prop to `false`.

  ```tsx
  import { AuthPage, ThemedTitle } from "@refinedev/mantine";
  const MyLoginPage = () => {
    return (
      <AuthPage
        type="login"
        title={
          <ThemedTitle
            title="My Title"
            icon={<img src="https://refine.dev/img/logo.png" />}
          />
        }
      />
    );
  };
  ```

  - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

  ```tsx
  import { Box, Text } from "@mantine/core";
  import { AuthPage } from "@refinedev/mantine";

  const MyLoginPage = () => {
    return (
      <AuthPage
        contentProps={{
          style: {
            width: "400px",
          },
        }}
        renderContent={(content: React.ReactNode, title: React.ReactNode) => {
          return (
            <Box
              bg="white"
              borderRadius="md"
              px="5"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {title}
              <Text>Extra Header</Text>
              {content}
              <Text>Extra Footer</Text>
            </Box>
          );
        }}
      />
    );
  };
  ```

  - `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

  - `<EditButton>` in `<Show>` color changed to `brand`.
  - `<CreateButton>` color changed to `brand`.

  - `<AuthPage>` component uses colors from the theme.
  - `<ThemedTitle>` added to `AuthPage`

### Patch Changes

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 2.4.0

### Minor Changes

- [#3996](https://github.com/refinedev/refine/pull/3996) [`327be2be623`](https://github.com/refinedev/refine/commit/327be2be623ab9a62a32974315c3d2453baf4a07) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the Mantine components.

  ```tsx
  import { Refine } from "@refinedev/core";
  import { RefineThemes } from "@refinedev/mantine";
  import dataProvider from "@refinedev/simple-rest";

  const App = () => {
    // ---
    return (
      <MantineProvider theme={RefineThemes.Magenta}>
        <Refine dataProvider={dataProvider("YOUR_API_URL")}>
          {/** your app here */}
        </Refine>
      </MantineProvider>
    );
  };
  ```

  - default title with icon added to `AuthPage`. It uses `<ThemedTitle>` component from `@refinedev/mantine`. You can remove it by setting `title` prop to `false`.

  ```tsx
  import { AuthPage, ThemedTitle } from "@refinedev/mantine";
  const MyLoginPage = () => {
    return (
      <AuthPage
        type="login"
        title={
          <ThemedTitle
            title="My Title"
            icon={<img src="https://refine.dev/img/logo.png" />}
          />
        }
      />
    );
  };
  ```

  - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

  ```tsx
  import { Box, Text } from "@mantine/core";
  import { AuthPage } from "@refinedev/mantine";

  const MyLoginPage = () => {
    return (
      <AuthPage
        contentProps={{
          style: {
            width: "400px",
          },
        }}
        renderContent={(content: React.ReactNode, title: React.ReactNode) => {
          return (
            <Box
              bg="white"
              borderRadius="md"
              px="5"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {title}
              <Text>Extra Header</Text>
              {content}
              <Text>Extra Footer</Text>
            </Box>
          );
        }}
      />
    );
  };
  ```

  - `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

  - `<EditButton>` in `<Show>` color changed to `brand`.
  - `<CreateButton>` color changed to `brand`.

  - `<AuthPage>` component uses colors from the theme.
  - `<ThemedTitle>` added to `AuthPage`

### Patch Changes

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 2.3.7

### Patch Changes

- [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

  - `<RefineThemes>` colors updated to match the new theme colors.

- Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
  - @refinedev/ui-types@1.5.0

## 2.3.6

### Patch Changes

- [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

  - `<RefineThemes>` colors updated to match the new theme colors.

- Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
  - @refinedev/ui-types@1.4.0

## 2.3.5

### Patch Changes

- [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 2.3.4

### Patch Changes

- [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 2.3.3

### Patch Changes

- [#3954](https://github.com/refinedev/refine/pull/3954) [`7dc9686f83b`](https://github.com/refinedev/refine/commit/7dc9686f83bc142a621ca4f347c3cf0ea4320e62) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the form dirty state was not reset after setting initial values. This caused the form to be dirty even though changes were not made. For this reason, the `<UnSavedChangesNotifier>` always warned when user tried to leave page.

## 2.3.2

### Patch Changes

- [#3948](https://github.com/refinedev/refine/pull/3948) [`b4950503334`](https://github.com/refinedev/refine/commit/b495050333464224f34851c9c57ffab457a3f120) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

  - The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
  - The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

## 2.3.1

### Patch Changes

- [#3948](https://github.com/refinedev/refine/pull/3948) [`b4950503334`](https://github.com/refinedev/refine/commit/b495050333464224f34851c9c57ffab457a3f120) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

  - The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
  - The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

## 2.3.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.
  - `title` prop added to `AuthPage` to render a custom title.
    - ⚠️ These features have not been implemented yet. Only types were added. It will be implemented in the next release.

### Patch Changes

- Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
  - @refinedev/ui-types@1.3.0

## 2.2.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.
  - `title` prop added to `AuthPage` to render a custom title.
    - ⚠️ These features have not been implemented yet. Only types were added. It will be implemented in the next release.

### Patch Changes

- Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
  - @refinedev/ui-types@1.2.0

## 2.1.0

### Minor Changes

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

  ## `syncWithLocation` support in `useModalForm` hook

  `useModalForm` hook now support `syncWithLocation` prop. This prop can be used to sync the visibility state of them with the location via query params.

  You can pass a boolean or an object with `key` and `syncId` properties.

  - `key` is used to define the query param key. Default value is inferred from the resource and the action. For example `posts-create` for `posts` resource and `create` action.

  - `syncId` is used to include the `id` property in the query param key. Default value is `false`. This is useful for `edit` and `clone` actions.

  ## Removed props

  `ignoreAccessControlProvider` prop is removed from buttons.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `useSelect`'s `sort` prop is now deprecated. Use `sorters` prop instead.

  ```diff
  useSelect({
  -    sort,
  +    sorters,
  })
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `<ReadyPage>` isnow deprecated.
  - Created a `<WelcomePage>` component to welcome users.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  ## 🪄 Migrating your project automatically with refine-codemod ✨

  [`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

  Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

  ```sh
  npx @refinedev/codemod@latest refine3-to-refine4
  ```

  And it's done. Now your project uses `refine@4.x.x`.

  ## 📝 Changelog

  All **Mantine** components re-exported from `@refinedev/mantine` have been removed. You should import them from Mantine packages directly.

  If the packages are not installed, you can install them with your package manager:

  > You don't have to install all of these packages below. Only install the packages you use.

  ```bash
  npm install @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
  # or
  pnpm add @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
  # or
  yarn add @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
  ```

  After that, you can import them from related packages directly.

  ```diff
  - import {
  -    MantineProvider,
  -    NotificationsProvider,
  -    TextInput,
  -    Select,
  -    List,
  -    useSelect,
  - } from "@refinedev/mantine";

  + import { useSelect, List } from "@refinedev/mantine";
  + import { MantineProvider, TextInput, Select } from "@mantine/core";
  + import { NotificationsProvider } from "@mantine/notifications";
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added legacy auth provider and new auth provider support to all components and hooks.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Updated buttons with `resource` property. `resourceNameOrRouteName` is now deprecated but kept working until next major version.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 1.17.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-ui-types@0.16.0

## 1.16.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-ui-types@0.15.0

## 1.15.10

### Patch Changes

- [#3606](https://github.com/refinedev/refine/pull/3606) [`00c9a5c471a`](https://github.com/refinedev/refine/commit/00c9a5c471a684169f800d65800d87cc8d6b6511) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with `disabled` state in `DeleteButton`'s still opening the popover.

## 1.15.9

### Patch Changes

- [#3606](https://github.com/refinedev/refine/pull/3606) [`00c9a5c471a`](https://github.com/refinedev/refine/commit/00c9a5c471a684169f800d65800d87cc8d6b6511) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with `disabled` state in `DeleteButton`'s still opening the popover.

## 1.15.8

### Patch Changes

- [#3382](https://github.com/refinedev/refine/pull/3382) [`6604586b030`](https://github.com/refinedev/refine/commit/6604586b030576c4b582a675de97678dc63dbb10) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added: description of `StepProps` to the jsDoc of the `useStepForm` hook.

## 1.15.7

### Patch Changes

- [#3382](https://github.com/refinedev/refine/pull/3382) [`6604586b030`](https://github.com/refinedev/refine/commit/6604586b030576c4b582a675de97678dc63dbb10) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added: description of `StepProps` to the jsDoc of the `useStepForm` hook.

## 1.15.6

### Patch Changes

- [#3396](https://github.com/refinedev/refine/pull/3396) [`bb2774e3941`](https://github.com/refinedev/refine/commit/bb2774e39411c844b01f552d1cae2931d4f6b9f9) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: `onSubmit` is set to nullable on [`<AuthPage>`](https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/)

## 1.15.5

### Patch Changes

- [#3396](https://github.com/refinedev/refine/pull/3396) [`bb2774e3941`](https://github.com/refinedev/refine/commit/bb2774e39411c844b01f552d1cae2931d4f6b9f9) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: `onSubmit` is set to nullable on [`<AuthPage>`](https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/)

## 1.15.4

### Patch Changes

- [#3228](https://github.com/refinedev/refine/pull/3228) [`5aabfa19493`](https://github.com/refinedev/refine/commit/5aabfa1949374850f0f352acf842fafb01adcdcb) Thanks [@aliemir](https://github.com/aliemir)! - Fixed useForm's saveButtonProps.onClick event type

## 1.15.3

### Patch Changes

- [#3228](https://github.com/refinedev/refine/pull/3228) [`5aabfa19493`](https://github.com/refinedev/refine/commit/5aabfa1949374850f0f352acf842fafb01adcdcb) Thanks [@aliemir](https://github.com/aliemir)! - Fixed useForm's saveButtonProps.onClick event type

## 1.15.2

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-ui-types@0.14.2

## 1.15.1

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-ui-types@0.14.1

## 1.15.0

### Minor Changes

- [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 1.14.0

### Minor Changes

- [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 1.13.4

### Patch Changes

- [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 1.13.3

### Patch Changes

- [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 1.13.2

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 1.13.1

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 1.13.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.

## 1.12.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.

## 1.11.8

### Patch Changes

- [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Fix `Layout` component for `Table` overflows. `Table` was not respecting the flex layout even inside `ScrollArea` component. This was causing the table to overflow the parent container.

- [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Fixed shrink issue for Layout

- [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Added `...rest` props to `MarkdownField` component

- [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Fixed `TagField` prop types.

## 1.11.7

### Patch Changes

- [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Fix `Layout` component for `Table` overflows. `Table` was not respecting the flex layout even inside `ScrollArea` component. This was causing the table to overflow the parent container.

- [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Fixed shrink issue for Layout

- [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Added `...rest` props to `MarkdownField` component

- [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Fixed `TagField` prop types.

## 1.11.6

### Patch Changes

- [#3011](https://github.com/refinedev/refine/pull/3011) [`593531713c3`](https://github.com/refinedev/refine/commit/593531713c3f88d8bca7f6b0397f4068ebc85a04) Thanks [@aliemir](https://github.com/aliemir)! - Fixed `<NumberField />` type for missing `value` prop type, which was erroring out when using `<NumberField />`.

## 1.11.5

### Patch Changes

- [#3011](https://github.com/refinedev/refine/pull/3011) [`593531713c3`](https://github.com/refinedev/refine/commit/593531713c3f88d8bca7f6b0397f4068ebc85a04) Thanks [@aliemir](https://github.com/aliemir)! - Fixed `<NumberField />` type for missing `value` prop type, which was erroring out when using `<NumberField />`.

## 1.11.4

### Patch Changes

- [#2969](https://github.com/refinedev/refine/pull/2969) [`a9459550a4`](https://github.com/refinedev/refine/commit/a9459550a49a640c5a1e393d4f2b8e6e9cd53dc6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `transformValues` generics in `useForm`, `useModalForm` and `useStepForm` hooks.

- [#2969](https://github.com/refinedev/refine/pull/2969) [`a9459550a4`](https://github.com/refinedev/refine/commit/a9459550a49a640c5a1e393d4f2b8e6e9cd53dc6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed peerDependencies of packages

## 1.11.3

### Patch Changes

- [#2969](https://github.com/refinedev/refine/pull/2969) [`a9459550a4`](https://github.com/refinedev/refine/commit/a9459550a49a640c5a1e393d4f2b8e6e9cd53dc6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `transformValues` generics in `useForm`, `useModalForm` and `useStepForm` hooks.

- [#2969](https://github.com/refinedev/refine/pull/2969) [`a9459550a4`](https://github.com/refinedev/refine/commit/a9459550a49a640c5a1e393d4f2b8e6e9cd53dc6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed peerDependencies of packages

## 1.11.2

### Patch Changes

- [#2970](https://github.com/refinedev/refine/pull/2970) [`513c078df1`](https://github.com/refinedev/refine/commit/513c078df1aa7b694fc41e5d710eff0d9a716fed) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added padding to ReadyPage component.

## 1.11.1

### Patch Changes

- [#2970](https://github.com/refinedev/refine/pull/2970) [`513c078df1`](https://github.com/refinedev/refine/commit/513c078df1aa7b694fc41e5d710eff0d9a716fed) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added padding to ReadyPage component.

## 1.11.0

### Minor Changes

- [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

  > **The option set in individual CRUD components takes priority over the global option**

## 1.10.0

### Minor Changes

- [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

  > **The option set in individual CRUD components takes priority over the global option**

## 1.9.5

### Patch Changes

- [#2857](https://github.com/refinedev/refine/pull/2857) [`1d8b1820f4`](https://github.com/refinedev/refine/commit/1d8b1820f47118dd1e3d3dfbfc9df655056d591a) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the `<ReadyPage />` mobile view.

- [#2857](https://github.com/refinedev/refine/pull/2857) [`1d8b1820f4`](https://github.com/refinedev/refine/commit/1d8b1820f47118dd1e3d3dfbfc9df655056d591a) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the `<ErrorComponent />` responsive view.

## 1.9.4

### Patch Changes

- [#2857](https://github.com/refinedev/refine/pull/2857) [`1d8b1820f4`](https://github.com/refinedev/refine/commit/1d8b1820f47118dd1e3d3dfbfc9df655056d591a) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the `<ReadyPage />` mobile view.

- [#2857](https://github.com/refinedev/refine/pull/2857) [`1d8b1820f4`](https://github.com/refinedev/refine/commit/1d8b1820f47118dd1e3d3dfbfc9df655056d591a) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the `<ErrorComponent />` responsive view.

## 1.9.3

### Patch Changes

- [#2869](https://github.com/refinedev/refine/pull/2869) [`d64e4a02c3`](https://github.com/refinedev/refine/commit/d64e4a02c3c23f6d1386948f9e0f3666eb20188e) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: @mantine/\* package version fixed to 5.5.6 due to [useForm issue](https://github.com/mantinedev/mantine/pull/2758)

## 1.9.2

### Patch Changes

- [#2856](https://github.com/refinedev/refine/pull/2856) [`21d0f19863`](https://github.com/refinedev/refine/commit/21d0f19863fb6c3508aa92e2097cc6d9702a16f0) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: Mantine UserFormInput requires 2 type argument(s).

## 1.9.1

### Patch Changes

- [#2856](https://github.com/refinedev/refine/pull/2856) [`21d0f19863`](https://github.com/refinedev/refine/commit/21d0f19863fb6c3508aa92e2097cc6d9702a16f0) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: Mantine UserFormInput requires 2 type argument(s).

## 1.9.0

### Minor Changes

- [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - **Deprecation**

  `ignoreAccessControlProvider` prop on buttons is deprecated. Use `accessContro.enabled` instead.

  **Features**

  `accessControl.enabled` prop is added to buttons to enable/disable access control for buttons.
  `accessControl.hideIfUnauthorized` prop is added to buttons to hide the button if access is denied.

- [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

- [#2838](https://github.com/refinedev/refine/pull/2838) [`f7968fa16f`](https://github.com/refinedev/refine/commit/f7968fa16f9930442e1122fe5294e350252bdd5c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.

- [#2818](https://github.com/refinedev/refine/pull/2818) [`295fc2f773`](https://github.com/refinedev/refine/commit/295fc2f7735c05101a5dba24e3ebd73039ebd317) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added missing `Title` component export.

- Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516), [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
  - @pankod/refine-ui-types@0.14.0

## 1.8.0

### Minor Changes

- [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

- Updated dependencies [[`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
  - @pankod/refine-ui-types@0.13.0

## 1.7.0

### Minor Changes

- [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - **Deprecation**

  `ignoreAccessControlProvider` prop on buttons is deprecated. Use `accessContro.enabled` instead.

  **Features**

  `accessControl.enabled` prop is added to buttons to enable/disable access control for buttons.
  `accessControl.hideIfUnauthorized` prop is added to buttons to hide the button if access is denied.

### Patch Changes

- [#2838](https://github.com/refinedev/refine/pull/2838) [`f7968fa16f`](https://github.com/refinedev/refine/commit/f7968fa16f9930442e1122fe5294e350252bdd5c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.

- [#2818](https://github.com/refinedev/refine/pull/2818) [`295fc2f773`](https://github.com/refinedev/refine/commit/295fc2f7735c05101a5dba24e3ebd73039ebd317) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added missing `Title` component export.

- Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516)]:
  - @pankod/refine-ui-types@0.12.0

## 1.6.13

### Patch Changes

- - Updated the default false icon for the BooleanField component to be a cross instead of a minus.
  - Updated the TextField export name to be "TextField" instead of "TextFieldComponent".
  - Fixed the tsdoc links for the field components.

## 1.6.12

### Patch Changes

- [#2799](https://github.com/refinedev/refine/pull/2799) [`78b61da700`](https://github.com/refinedev/refine/commit/78b61da700ad0ee68e538c69746ddb6ed8378df8) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Updated the default false icon for the BooleanField component to be a cross instead of a minus.
  - Updated the TextField export name to be "TextField" instead of "TextFieldComponent".
  - Fixed the tsdoc links for the field components.

## 1.6.11

### Patch Changes

- Add primary color to `<SaveButton/>`'s `<ActionIcon/>` component.

## 1.6.10

### Patch Changes

- [#2758](https://github.com/refinedev/refine/pull/2758) [`3960549907`](https://github.com/refinedev/refine/commit/39605499074d73a75d73f8bfce03088f63915027) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add primary color to `<SaveButton/>`'s `<ActionIcon/>` component.

## 1.6.9

### Patch Changes

- Fixed incorrectly used hooks in AuthPage component

## 1.6.8

### Patch Changes

- [#2769](https://github.com/refinedev/refine/pull/2769) [`501aebe997`](https://github.com/refinedev/refine/commit/501aebe9974520c30093cc9cec781ee58129d053) Thanks [@dgelineau](https://github.com/dgelineau)! - Fixed incorrectly used hooks in AuthPage component

## 1.6.7

### Patch Changes

- Fixed <ErrorComponent /> responsive design for mobile devices

## 1.6.6

### Patch Changes

- [#2748](https://github.com/refinedev/refine/pull/2748) [`0eaddb65ee`](https://github.com/refinedev/refine/commit/0eaddb65ee77777fd1e6b9e5501c18d69bef4be8) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed <ErrorComponent /> responsive design for mobile devices

## 1.6.5

### Patch Changes

- - Added `<LoadingOverlay />` component to basic view components.
  - Update `goBack` prop usage, now it can be passed to `<ActionButton />`'s children.
  - Fixed the issue that when `title` prop is passed to basic views, the back button is not shown.
  - Default title size decreased from `h2` to `h3`.
- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.4

## 1.6.4

### Patch Changes

- [#2718](https://github.com/refinedev/refine/pull/2718) [`d78d2a2a99`](https://github.com/refinedev/refine/commit/d78d2a2a99adb508094069cda23deaba55c25b63) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Added `<LoadingOverlay />` component to basic view components.
  - Update `goBack` prop usage, now it can be passed to `<ActionButton />`'s children.
  - Fixed the issue that when `title` prop is passed to basic views, the back button is not shown.
  - Default title size decreased from `h2` to `h3`.
- Updated dependencies [[`d78d2a2a99`](https://github.com/refinedev/refine/commit/d78d2a2a99adb508094069cda23deaba55c25b63)]:
  - @pankod/refine-ui-types@0.11.3

## 1.6.3

### Patch Changes

- Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.2

### Patch Changes

- Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.1

### Patch Changes

- [#2712](https://github.com/refinedev/refine/pull/2712) [`c434055011`](https://github.com/refinedev/refine/commit/c434055011cbdd846c9f228c23987607bb828a1b) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.0

### Minor Changes

- Updated `formProps` property on `<AuthPage />` component

### Patch Changes

- Added `clearable` prop to `useSelect` hook that is `true` by default.

## 1.5.0

### Minor Changes

- [#2663](https://github.com/refinedev/refine/pull/2663) [`c624a52b23`](https://github.com/refinedev/refine/commit/c624a52b2310db1349ec556a7671f23779cc3622) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated `formProps` property on `<AuthPage />` component

### Patch Changes

- [#2701](https://github.com/refinedev/refine/pull/2701) [`ddd9eb3aff`](https://github.com/refinedev/refine/commit/ddd9eb3aff961fcedf354f2c77c1844131d713a1) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `clearable` prop to `useSelect` hook that is `true` by default.

## 1.4.0

### Minor Changes

- - Added new <AuthPage /> component core and mantine support.
  - Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 1.3.0

### Minor Changes

- [#2627](https://github.com/refinedev/refine/pull/2627) [`c5fb45d61f`](https://github.com/refinedev/refine/commit/c5fb45d61fa7470a7a34762ad19d17e9f87e4421) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added new <AuthPage /> component core and mantine support.
  - Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 1.2.0

### Minor Changes

- First release of `@pankod/refine-mantine` 🎉

## 1.1.0

### Minor Changes

- [#2505](https://github.com/refinedev/refine/pull/2505) [`a4dbb63c88`](https://github.com/refinedev/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - First release of `@pankod/refine-mantine` 🎉

## 1.0.6

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.0

## 1.0.5

### Patch Changes

- Updated dependencies [[`a65525de6f`](https://github.com/refinedev/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e)]:
  - @pankod/refine-ui-types@0.10.0

## 1.0.4

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.9.0

## 1.0.3

### Patch Changes

- Updated dependencies [[`ad99916d6d`](https://github.com/refinedev/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0)]:
  - @pankod/refine-ui-types@0.8.0

## 1.0.2

### Patch Changes

- Fixed version of react-router to `6.3.0`

- Updated dependencies []:
  - @pankod/refine-ui-types@0.7.0

## 1.0.1

### Patch Changes

- [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`
