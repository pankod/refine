# @refinedev/chakra-ui

## 3.0.2

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

- Updated dependencies [[`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3)]:
  - @refinedev/react-hook-form@5.0.2
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

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade Chakra-UI integration for Refine 5.0

  - Updated Chakra-UI components with deprecated API cleanup and improved TypeScript support.
  - Removed legacy components and restructured hooks and components for better developer experience.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98), [`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/react-hook-form@5.0.0
  - @refinedev/ui-types@2.0.0
  - @refinedev/core@5.0.0

## 2.38.0

### Minor Changes

- [#6880](https://github.com/refinedev/refine/pull/6880) [`2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2`](https://github.com/refinedev/refine/commit/2b4c2082b2e07f6c5afa514c4beeb7abc4082ea2) Thanks [@arndom](https://github.com/arndom)! - - Add `siderItemsAreCollapsed` prop to all `Sider` components to set default expanded/collapsed nested sider items.

  - UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6721](https://github.com/refinedev/refine/issues/6721)

## 2.37.1

### Patch Changes

📢 **Refine Community Release** 📢

- - Ensure `meta` prop is passed to the `ShowButton` component of Charka-UI

  [Resolves #6707](https://github.com/refinedev/refine/issues/6707)

📢 **Refine Community Release** 📢

- chore: update `react-hook-form` to `7.57.0` to support new features like [`subscribe`](https://react-hook-form.com/docs/useform/subscribe).
  for more information, see [React Hook Form release notes](https://github.com/react-hook-form/react-hook-form/releases).
- Updated dependencies []:
  - @refinedev/react-hook-form@4.10.1

## 2.37.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6824](https://github.com/refinedev/refine/pull/6824) [`a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01`](https://github.com/refinedev/refine/commit/a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: update `react-hook-form` to `7.57.0` to support new features like [`subscribe`](https://react-hook-form.com/docs/useform/subscribe).
  for more information, see [React Hook Form release notes](https://github.com/react-hook-form/react-hook-form/releases).

### Patch Changes

- Updated dependencies [[`a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01`](https://github.com/refinedev/refine/commit/a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01)]:
  - @refinedev/react-hook-form@4.10.0

## 2.36.1

### Patch Changes

📢 **Refine Community Release** 📢

- - Ensure `meta` prop is passed to the `ShowButton` component of Charka-UI

  [Resolves #6707](https://github.com/refinedev/refine/issues/6707)

## 2.36.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6740](https://github.com/refinedev/refine/pull/6740) [`16d9fa1d5a1d265ee6ba942c46473456883b4400`](https://github.com/refinedev/refine/commit/16d9fa1d5a1d265ee6ba942c46473456883b4400) Thanks [@arndom](https://github.com/arndom)! - - Ensure `meta` prop is passed to the `ShowButton` component of Charka-UI

  [Resolves #6707](https://github.com/refinedev/refine/issues/6707)

## 2.35.1

### Patch Changes

📢 **Refine Community Release** 📢

- - Add `deleteButtonProps` prop to the `Show` component of UI packages: AntDesign, Manitine, Charka-UI, Material-UI
  - Add documentation for this addition

  [Resolves #6692](https://github.com/refinedev/refine/issues/6692)

- Updated dependencies []:
  - @refinedev/ui-types@1.24.2

## 2.35.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6699](https://github.com/refinedev/refine/pull/6699) [`cd938b04cb004b61174d65811467469abaf2db3f`](https://github.com/refinedev/refine/commit/cd938b04cb004b61174d65811467469abaf2db3f) Thanks [@arndom](https://github.com/arndom)! - - Add `deleteButtonProps` prop to the `Show` component of UI packages: AntDesign, Manitine, Charka-UI, Material-UI

  - Add documenation for this addition

  [Resolves #6692](https://github.com/refinedev/refine/issues/6692)

### Patch Changes

- Updated dependencies [[`cd938b04cb004b61174d65811467469abaf2db3f`](https://github.com/refinedev/refine/commit/cd938b04cb004b61174d65811467469abaf2db3f)]:
  - @refinedev/ui-types@1.24.0

## 2.34.1

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
  - @refinedev/react-hook-form@4.9.3

## 2.34.0

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

- Updated dependencies [[`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706), [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53), [`29d00f8dc49485e0f5c42d208417e158118d11f2`](https://github.com/refinedev/refine/commit/29d00f8dc49485e0f5c42d208417e158118d11f2), [`1d2613381c50f438270d6a3e486595d54496ef92`](https://github.com/refinedev/refine/commit/1d2613381c50f438270d6a3e486595d54496ef92)]:
  - @refinedev/ui-types@1.23.0
  - @refinedev/react-hook-form@4.9.2

## 2.33.0

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

- [#6445](https://github.com/refinedev/refine/pull/6445) [`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore(tsdoc): fix broken external documentation link

  In TSDoc description of the `<EmailField />` component, link to the official documentation of Chakra UI was broken and couldn't be opened. This PR fixes the link by updating the URL to the correct one.

- Updated dependencies [[`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a)]:
  - @refinedev/react-hook-form@4.9.1

## 2.32.0

### Minor Changes

- [#6161](https://github.com/refinedev/refine/pull/6161) [`ff975374efcc05220be4411218c2daf7c19b8995`](https://github.com/refinedev/refine/commit/ff975374efcc05220be4411218c2daf7c19b8995) Thanks [@ritute](https://github.com/ritute)! - feat(react-hook-form): update version constraint from `^7.30.0` to `^7.43.5`

  Update react-hook-form version to address runtime subscribe error

  [Fixes #6139](https://github.com/refinedev/refine/issues/6139)

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

- [#6199](https://github.com/refinedev/refine/pull/6199) [`5a8e94aa4afe0faf3ea1de93a4b00e0b44dd1ece`](https://github.com/refinedev/refine/commit/5a8e94aa4afe0faf3ea1de93a4b00e0b44dd1ece) Thanks [@aliemir](https://github.com/aliemir)! - fix(auth-page): fix wrong translation key in `type="register"`

  Previously, sign in link in Register page was using wrong translation key "pages.register.buttons.noAccount". Now it is replaced with "pages.register.buttons.haveAccount".

- Updated dependencies [[`ff975374efcc05220be4411218c2daf7c19b8995`](https://github.com/refinedev/refine/commit/ff975374efcc05220be4411218c2daf7c19b8995), [`a93eed09796b780557f6fecee0c2f1e7b4f9e93b`](https://github.com/refinedev/refine/commit/a93eed09796b780557f6fecee0c2f1e7b4f9e93b)]:
  - @refinedev/react-hook-form@4.9.0

## 2.31.2

### Patch Changes

- [#6021](https://github.com/refinedev/refine/pull/6021) [`55cd0662b1e3ff8f8410eba812e80130afe75d14`](https://github.com/refinedev/refine/commit/55cd0662b1e3ff8f8410eba812e80130afe75d14) Thanks [@JayBhensdadia](https://github.com/JayBhensdadia)! - fix: ensure Sider component handles various resource name formats correctly

  Updated Sider component to correctly handle lowercase and camelcased resource names, enhancing usability and functionality.

  Fixes #6004

- [#6064](https://github.com/refinedev/refine/pull/6064) [`b516c18b828ba8823561d0fefc4afe02b45ce332`](https://github.com/refinedev/refine/commit/b516c18b828ba8823561d0fefc4afe02b45ce332) Thanks [@aliemir](https://github.com/aliemir)! - fix(auto-save-indicator): replace reserved `key` prop with `translationKey` in <Message /> components

  `<AutoSaveIndicator />` components from UI libraries have been using a `<Message />` component internally that uses a `key` prop. Since `key` is a reserved prop in React, it was causing a warning in the console. This change replaces the `key` prop with `translationKey` to avoid the warning.

  Resolves [#6067](https://github.com/refinedev/refine/issues/6067)

## 2.31.0

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
  - @refinedev/react-hook-form@4.8.20

## 2.30.0

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
  - @refinedev/react-hook-form@4.8.19

## 2.29.1

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

- Updated dependencies [[`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d)]:
  - @refinedev/react-hook-form@4.8.18
  - @refinedev/ui-types@1.22.7

## 2.29.0

### Minor Changes

- [#5868](https://github.com/refinedev/refine/pull/5868) [`a82ef6afc15`](https://github.com/refinedev/refine/commit/a82ef6afc1512631ca3f7936818d646e4c7d0725) Thanks [@Ac-Srikanth](https://github.com/Ac-Srikanth)! - feat: add message prop for required auth input fields for the above packages.

  Now you can provide custom required messages with translate feature for all auth input fields(Login, register, forget password,update password).

  Resolves #[5855](https://github.com/refinedev/refine/issues/5855)

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- Updated dependencies [[`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f)]:
  - @refinedev/react-hook-form@4.8.17
  - @refinedev/ui-types@1.22.6

## 2.28.0

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

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - fix: broken eslint plugin for removing test ids from components

  Eslint plugin to remove test ids from components was broken and might miss some test ids to be included in the bundles.

- [#5808](https://github.com/refinedev/refine/pull/5808) [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39) Thanks [@aliemir](https://github.com/aliemir)! - refactor: moved internal logic of buttons to respective hooks from `@refinedev/core`

  We've moved the internal logic of buttons to their respective hooks in the `@refinedev/core` package to ensure consistency and reduce duplication. This change will make it easier to manage and maintain the buttons across different UI integrations of Refine. This will also benefit the users who want to customize the buttons via `swizzle` option or create their own buttons withouth having to duplicate the logic.

- Updated dependencies [[`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927), [`38f129f40ee`](https://github.com/refinedev/refine/commit/38f129f40eea109c9b89b23a8fd3f217964330c7), [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e)]:
  - @refinedev/react-hook-form@4.8.16
  - @refinedev/ui-types@1.22.5

## 2.27.5

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

- Updated dependencies [[`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f)]:
  - @refinedev/react-hook-form@4.8.15

## 2.27.4

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

- Updated dependencies [[`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563)]:
  - @refinedev/react-hook-form@4.8.14

## 2.27.3

### Patch Changes

- [#5568](https://github.com/refinedev/refine/pull/5568) [`f1244819ad`](https://github.com/refinedev/refine/commit/f1244819adae9761234af697f292b4136da47503) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `notificationProvider` is deprecated due to consistent naming convention between UI libraries. Please use `useNotificationProvider` export as your notification provider. #5567

- [#5480](https://github.com/refinedev/refine/pull/5480) [`2a2269ac70`](https://github.com/refinedev/refine/commit/2a2269ac705254e179f0bd8b7a9ffcc370571de8) Thanks [@ShivamDureja](https://github.com/ShivamDureja)! - fix: issue with Chakra-UI sider that overflows when collapsed #5475

  When we try to collapse the sider it overflows so changed overflow-x property to hidden whereas overflow-y remains auto.

- [#5564](https://github.com/refinedev/refine/pull/5564) [`1bb7d30888`](https://github.com/refinedev/refine/commit/1bb7d3088837584b19c4faba41a91817d910d493) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`<ThemedTitleV2 />'s`](https://refine.dev/docs/ui-integrations/material-ui/components/themed-layout/) default icon updated.

## 2.27.2

### Patch Changes

- [#5465](https://github.com/refinedev/refine/pull/5465) [`00e00cbd98`](https://github.com/refinedev/refine/commit/00e00cbd98c34046ab83b299ede83401ae74fec1) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the type issue between `remark-gfm` and `react-markdown`. #5463

## 2.27.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

- Updated dependencies [[`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5)]:
  - @refinedev/react-hook-form@4.8.13
  - @refinedev/ui-types@1.22.4

## 2.27.0

### Minor Changes

- [#5307](https://github.com/refinedev/refine/pull/5307) [`f8e407f850`](https://github.com/refinedev/refine/commit/f8e407f85054bccf1e6ff45c84928bc01db7f5eb) Thanks [@jackprogramsjp](https://github.com/jackprogramsjp)! - feat: added `hideForm` props for `LoginPage` and `RegisterPage` for `AuthPage` feature.

  Now with the `hideForm` props feature, you can be able to hide the forms (like email/password)
  to only show the OAuth providers. This avoids having to make your own entire AuthPage.

### Patch Changes

- [#5269](https://github.com/refinedev/refine/pull/5269) [`a23a0945d3`](https://github.com/refinedev/refine/commit/a23a0945d3fe003ae081fca1c47312dd6bf8c2ee) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: add "autoComplete" field for Login pages.

- [#5325](https://github.com/refinedev/refine/pull/5325) [`7ff54b2060`](https://github.com/refinedev/refine/commit/7ff54b2060b0ce942c4170f744cbdf52d0940434) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `<AuthPage />` styling issues on mobile screens.

  chore: new tests are added to `<AuthPage />`.

## 2.26.17

### Patch Changes

- [#5259](https://github.com/refinedev/refine/pull/5259) [`eac3df87ffb`](https://github.com/refinedev/refine/commit/eac3df87ffbf61c913a6c8ea584e1d8c61e8d82e) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<AutoSaveIndicator />` component to extend the `<AutoSaveIndicator />` from `@refinedev/core` with custom elements and render appropriate element based on the state.

## 2.26.16

### Patch Changes

- [#5026](https://github.com/refinedev/refine/pull/5026) [`a605e4cd318`](https://github.com/refinedev/refine/commit/a605e4cd318ed5542b46e9e11a86f2c75dbb694b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
  From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

  feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.

## 2.26.15

### Patch Changes

- [#5026](https://github.com/refinedev/refine/pull/5026) [`a605e4cd318`](https://github.com/refinedev/refine/commit/a605e4cd318ed5542b46e9e11a86f2c75dbb694b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
  From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

  feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.

## 2.26.14

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b)]:
  - @refinedev/react-hook-form@4.8.10

## 2.26.13

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b)]:
  - @refinedev/react-hook-form@4.8.9

## 2.26.12

### Patch Changes

- [#5003](https://github.com/refinedev/refine/pull/5003) [`6043c450432`](https://github.com/refinedev/refine/commit/6043c4504320b2b68cc1295aaaf0dfc3c14e88b1) Thanks [@adjsky](https://github.com/adjsky)! - fix(chakra-ui): use isLoading in RefreshButton

  Now the right loading prop is used.

## 2.26.11

### Patch Changes

- [#5003](https://github.com/refinedev/refine/pull/5003) [`6043c450432`](https://github.com/refinedev/refine/commit/6043c4504320b2b68cc1295aaaf0dfc3c14e88b1) Thanks [@adjsky](https://github.com/adjsky)! - fix(chakra-ui): use isLoading in RefreshButton

  Now the right loading prop is used.

## 2.26.10

### Patch Changes

- [#4975](https://github.com/refinedev/refine/pull/4975) [`ff66a862e46`](https://github.com/refinedev/refine/commit/ff66a862e46d3ae89c2f848ba71f2d8d77650d6a) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@tabler/icons` to `v1.119.0` to fix the issue of using misconfigured versions. (Fixes #4921)

## 2.26.9

### Patch Changes

- [#4975](https://github.com/refinedev/refine/pull/4975) [`ff66a862e46`](https://github.com/refinedev/refine/commit/ff66a862e46d3ae89c2f848ba71f2d8d77650d6a) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@tabler/icons` to `v1.119.0` to fix the issue of using misconfigured versions. (Fixes #4921)

## 2.26.8

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

- Updated dependencies [[`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848)]:
  - @refinedev/react-hook-form@4.8.8

## 2.26.7

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

- Updated dependencies [[`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848)]:
  - @refinedev/react-hook-form@4.8.7

## 2.26.6

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.
- Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
  - @refinedev/ui-types@1.22.2

## 2.26.5

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.
- Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
  - @refinedev/ui-types@1.22.1

## 2.26.4

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

- Updated dependencies [[`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4)]:
  - @refinedev/react-hook-form@4.8.4

## 2.26.3

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

- Updated dependencies [[`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4)]:
  - @refinedev/react-hook-form@4.8.3

## 2.26.2

### Patch Changes

- [#4788](https://github.com/refinedev/refine/pull/4788) [`38680378c7a`](https://github.com/refinedev/refine/commit/38680378c7a7b0e5481ea4136f3958a00ac4ca92) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: use `<IconButton />` in `<HeaderV2 />` instead of using icon.

## 2.26.1

### Patch Changes

- [#4788](https://github.com/refinedev/refine/pull/4788) [`38680378c7a`](https://github.com/refinedev/refine/commit/38680378c7a7b0e5481ea4136f3958a00ac4ca92) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: use `<IconButton />` in `<HeaderV2 />` instead of using icon.

## 2.26.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<RefreshButton />` does not refresh content #4618.
  From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.

### Patch Changes

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/ui-types@1.22.0

## 2.25.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `<RefreshButton />` does not refresh content #4618.
  From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.

### Patch Changes

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/ui-types@1.21.0

## 2.24.2

### Patch Changes

- [#4764](https://github.com/refinedev/refine/pull/4764) [`6aba21bfde0`](https://github.com/refinedev/refine/commit/6aba21bfde09e6efacff324bd29c37c046afb52e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: fixed a bug where the `<ThemedLayoutv2>` component was not worked with sticky header.

- Updated dependencies [[`c757355da60`](https://github.com/refinedev/refine/commit/c757355da6089d0e18609a1bb2d316d928412b16)]:
  - @refinedev/react-hook-form@4.8.2

## 2.24.1

### Patch Changes

- [#4764](https://github.com/refinedev/refine/pull/4764) [`6aba21bfde0`](https://github.com/refinedev/refine/commit/6aba21bfde09e6efacff324bd29c37c046afb52e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: fixed a bug where the `<ThemedLayoutv2>` component was not worked with sticky header.

- Updated dependencies [[`c757355da60`](https://github.com/refinedev/refine/commit/c757355da6089d0e18609a1bb2d316d928412b16)]:
  - @refinedev/react-hook-form@4.8.1

## 2.24.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

### Patch Changes

- Updated dependencies [[`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1)]:
  - @refinedev/react-hook-form@4.8.0

## 2.23.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

### Patch Changes

- Updated dependencies [[`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1)]:
  - @refinedev/react-hook-form@4.7.0

## 2.22.0

### Minor Changes

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/chakra-ui/components/basic-views/edit/#autosaveprops).
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

  feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

  ```
  import { AutoSaveIndicator } from "@refinedev/chakra-ui";
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

- [#4644](https://github.com/refinedev/refine/pull/4644) [`5da81a141bc`](https://github.com/refinedev/refine/commit/5da81a141bc5fbb6f9ce0327ee87356888df3543) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: broken layout on smaller screens. Add `overflow: auto` to layout content.

- Updated dependencies [[`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411), [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/react-hook-form@4.6.0
  - @refinedev/ui-types@1.20.0

## 2.21.0

### Minor Changes

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `autoSave` feature for [`Edit`](https://refine.dev/docs/api-reference/chakra-ui/components/basic-views/edit/#autosaveprops).
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

  feat: Add [`<AutoSaveIndicator>`](https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-auto-save-indicator/) component. It comes automatically when `autoSaveProps` is given to the `Edit` page. However, this component can be used to position it in a different place.

  ```
  import { AutoSaveIndicator } from "@refinedev/chakra-ui";
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

- [#4644](https://github.com/refinedev/refine/pull/4644) [`5da81a141bc`](https://github.com/refinedev/refine/commit/5da81a141bc5fbb6f9ce0327ee87356888df3543) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: broken layout on smaller screens. Add `overflow: auto` to layout content.

- Updated dependencies [[`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411), [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/react-hook-form@4.5.0
  - @refinedev/ui-types@1.19.0

## 2.20.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: ability to tweak active sider items navigation

  Visiting active sider items triggers page reloads due to them being links. We can now provide activeItemDisabled prop to disable such reloads.

### Patch Changes

- [#4607](https://github.com/refinedev/refine/pull/4607) [`fed630dcc3e`](https://github.com/refinedev/refine/commit/fed630dcc3ef291efbfa96ed6f8e5c5448ac16a6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: TSDoc typos.
  TSDoc descriptions texts has Mantine instead of Chakra UI.

  feat: added `ThemedLayoutV2` tests.

- [#4607](https://github.com/refinedev/refine/pull/4607) [`fed630dcc3e`](https://github.com/refinedev/refine/commit/fed630dcc3ef291efbfa96ed6f8e5c5448ac16a6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - test: added tests for `<ThemedSiderV2/>`.

- Updated dependencies [[`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/ui-types@1.18.0

## 2.19.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: ability to tweak active sider items navigation

  Visiting active sider items triggers page reloads due to them being links. We can now provide activeItemDisabled prop to disable such reloads.

### Patch Changes

- [#4607](https://github.com/refinedev/refine/pull/4607) [`fed630dcc3e`](https://github.com/refinedev/refine/commit/fed630dcc3ef291efbfa96ed6f8e5c5448ac16a6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: TSDoc typos.
  TSDoc descriptions texts has Mantine instead of Chakra UI.

  feat: added `ThemedLayoutV2` tests.

- [#4607](https://github.com/refinedev/refine/pull/4607) [`fed630dcc3e`](https://github.com/refinedev/refine/commit/fed630dcc3ef291efbfa96ed6f8e5c5448ac16a6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - test: added tests for `<ThemedSiderV2/>`.

- Updated dependencies [[`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/ui-types@1.17.0

## 2.18.2

### Patch Changes

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { DeleteButton } from "@refinedev/chakra-ui";

  <DeleteButton resource="identifier-value" recordItemId="123" />;
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

- Updated dependencies [[`9a895ea39dc`](https://github.com/refinedev/refine/commit/9a895ea39dcbb5ad73904fa29ee9fcfcf25b7ea4), [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42)]:
  - @refinedev/react-hook-form@4.4.2

## 2.18.1

### Patch Changes

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { DeleteButton } from "@refinedev/chakra-ui";

  <DeleteButton resource="identifier-value" recordItemId="123" />;
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

- Updated dependencies [[`9a895ea39dc`](https://github.com/refinedev/refine/commit/9a895ea39dcbb5ad73904fa29ee9fcfcf25b7ea4), [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42)]:
  - @refinedev/react-hook-form@4.4.1

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
  import { useThemedLayoutContext } from "@refinedev/chakra-ui";

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
  import { useThemedLayoutContext } from "@refinedev/chakra-ui";

  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  ```

## 2.14.2

### Patch Changes

- [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 2.14.1

### Patch Changes

- [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 2.14.0

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
  } from "@refinedev/chakra-ui";

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

## 2.13.0

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
  } from "@refinedev/chakra-ui";

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

## 2.12.7

### Patch Changes

- [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

- Updated dependencies [[`dc62abc890f`](https://github.com/refinedev/refine/commit/dc62abc890f68be161c7035c28c0118216a9e0ec)]:
  - @refinedev/ui-types@1.14.0

## 2.12.6

### Patch Changes

- [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

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

- [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: updated the sider styles to solve issues that occur when there are too many items in the sider

## 2.12.4

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

## 2.12.3

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

## 2.12.2

### Patch Changes

- [#4255](https://github.com/refinedev/refine/pull/4255) [`9694245718c`](https://github.com/refinedev/refine/commit/9694245718cea7812c85aefc4880d165bb4d124d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `ThemedLayoutContextProvider` import path in internal usage.

## 2.12.1

### Patch Changes

- [#4255](https://github.com/refinedev/refine/pull/4255) [`9694245718c`](https://github.com/refinedev/refine/commit/9694245718cea7812c85aefc4880d165bb4d124d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `ThemedLayoutContextProvider` import path in internal usage.

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
  import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/chakra-ui";

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
  import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/chakra-ui";

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

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

## 2.9.0

### Minor Changes

- [#4176](https://github.com/refinedev/refine/pull/4176) [`13448252cd7`](https://github.com/refinedev/refine/commit/13448252cd7b6002af1d7ef1ff65dbf984aef6de) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` and `HamburgerMenu` component

  `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `<HamburgerMenu />` component, it's easier to collapse/uncollapse the `Sider`.

  See here for detailed [migration guideline](https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

## 2.8.0

### Minor Changes

- [#4131](https://github.com/refinedev/refine/pull/4131) [`0e7ee8876df`](https://github.com/refinedev/refine/commit/0e7ee8876df46d6c17dffb9b2c4e7be2399721cd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: `<ThemedSider>` logout icon alignment. `<LogoutButton>` icon changed to `<IconPower>` from `IconLogout`.

### Patch Changes

- Updated dependencies [[`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d)]:
  - @refinedev/react-hook-form@4.2.0

## 2.7.0

### Minor Changes

- [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-themed-layout

### Patch Changes

- Updated dependencies [[`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec)]:
  - @refinedev/react-hook-form@4.1.4

## 2.6.0

### Minor Changes

- [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-themed-layout

### Patch Changes

- Updated dependencies [[`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec)]:
  - @refinedev/react-hook-form@4.1.3

## 2.5.4

### Patch Changes

- [#4024](https://github.com/refinedev/refine/pull/4024) [`dc6d2311eb7`](https://github.com/refinedev/refine/commit/dc6d2311eb76a458f828fb15fe26fae1c75bc95a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Added: `wrapperStyles` prop to `<ThemedTitle>` component to allow for custom styles to be passed in.

  - Added: `textDecoration: none` to `<ThemedTitle>` component.

## 2.5.3

### Patch Changes

- [#4024](https://github.com/refinedev/refine/pull/4024) [`dc6d2311eb7`](https://github.com/refinedev/refine/commit/dc6d2311eb76a458f828fb15fe26fae1c75bc95a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Added: `wrapperStyles` prop to `<ThemedTitle>` component to allow for custom styles to be passed in.

  - Added: `textDecoration: none` to `<ThemedTitle>` component.

## 2.5.2

### Patch Changes

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 2.5.1

### Patch Changes

- [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 2.5.0

### Minor Changes

- [#3971](https://github.com/refinedev/refine/pull/3971) [`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the chakra-UI components.

  ```tsx
  import { RefineThemes } from "@refinedev/chakra-ui";
  import { Refine } from "@refinedev/core";
  import dataProvider from "@refinedev/simple-rest";
  const App = () => {
    // ---
    return (
      <ChakraProvider theme={RefineThemes.Magenta}>
        <Refine dataProvider={dataProvider("YOUR_API_URL")}>
          {/** your app here */}
        </Refine>
      </ChakraProvider>
    );
  };
  ```

  - default title with icon added to `AuthPage`. It uses `ThemedTitle` component from `@refinedev/chakra-ui`. You can remove it by setting `title` prop to `false`.

  ```tsx
  import { AuthPage, ThemedTitle } from "@refinedev/chakra-ui";

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
  import { Box, Heading } from "@chakra-ui/react";
  import { AuthPage } from "@refinedev/chakra-ui";

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
              <Heading color="white">Extra Header</Heading>
              {content}
              <Heading color="white">Extra Footer</Heading>
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
  - `<AuthPageTitle>` added to `AuthPage`

### Patch Changes

- [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

  - `<RefineThemes>` colors updated to match the new theme colors.

- Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
  - @refinedev/ui-types@1.5.0

## 2.4.0

### Minor Changes

- [#3971](https://github.com/refinedev/refine/pull/3971) [`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the chakra-UI components.

  ```tsx
  import { RefineThemes } from "@refinedev/chakra-ui";
  import { Refine } from "@refinedev/core";
  import dataProvider from "@refinedev/simple-rest";
  const App = () => {
    // ---
    return (
      <ChakraProvider theme={RefineThemes.Magenta}>
        <Refine dataProvider={dataProvider("YOUR_API_URL")}>
          {/** your app here */}
        </Refine>
      </ChakraProvider>
    );
  };
  ```

  - default title with icon added to `AuthPage`. It uses `ThemedTitle` component from `@refinedev/chakra-ui`. You can remove it by setting `title` prop to `false`.

  ```tsx
  import { AuthPage, ThemedTitle } from "@refinedev/chakra-ui";

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
  import { Box, Heading } from "@chakra-ui/react";
  import { AuthPage } from "@refinedev/chakra-ui";

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
              <Heading color="white">Extra Header</Heading>
              {content}
              <Heading color="white">Extra Footer</Heading>
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
  - `<AuthPageTitle>` added to `AuthPage`

### Patch Changes

- [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

      -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

  - `<RefineThemes>` colors updated to match the new theme colors.

- Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
  - @refinedev/ui-types@1.4.0

## 2.3.4

### Patch Changes

- [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 2.3.3

### Patch Changes

- [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

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

## 2.1.2

### Patch Changes

- [#3919](https://github.com/refinedev/refine/pull/3919) [`dd90bf43d50`](https://github.com/refinedev/refine/commit/dd90bf43d50ffe4e78a5caa5c0831d2ba8610e0d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: When `title` prop is `false` in crud components, the default `title` was rendered. It should not render anything.

## 2.1.1

### Patch Changes

- [#3919](https://github.com/refinedev/refine/pull/3919) [`dd90bf43d50`](https://github.com/refinedev/refine/commit/dd90bf43d50ffe4e78a5caa5c0831d2ba8610e0d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: When `title` prop is `false` in crud components, the default `title` was rendered. It should not render anything.

## 2.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `meta` prop is added. To ensure backward compatibility, `metaData` prop will be used if `meta` prop is not provided.

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

  All **Chakra UI** components re-exported from `@refinedev/chakra-ui` have been removed. You should import them from `@chakra-ui/react` package directly.

  If the packages are not installed, you can install them with your package manager:

  > You don't have to install all of these packages below. Only install the packages you use.

  ```bash
  npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
  # or
  pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
  # or
  yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
  ```

  After that, you can import them from related packages directly.

  ```diff
  - import {
  -    ChakraProvider,
  -    Input,
  -    Select,
  -    ShowButton,
  -    usePagination,
  - } from "@refinedev/chakra-ui";

  + import { usePagination, ShowButton } from "@refinedev/chakra-ui";
  + import { ChakraProvider, Input, Select } from "@chakra-ui/react";
  ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `<ReadyPage>` isnow deprecated.
  - Created a `<WelcomePage>` component to welcome users.

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

  `ignoreAccessControlProvider` prop is removed from buttons.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Added legacy auth provider and new auth provider support to all components and hooks.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 1.8.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-react-hook-form@3.39.0
  - @pankod/refine-ui-types@0.16.0

## 1.7.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-react-hook-form@3.38.0
  - @pankod/refine-ui-types@0.15.0

## 1.6.6

### Patch Changes

- [`03afb3215ef`](https://github.com/refinedev/refine/commit/03afb3215ef6e2331ca4f1315905366ec3617e2e) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: button disabled states

## 1.6.5

### Patch Changes

- [`03afb3215ef`](https://github.com/refinedev/refine/commit/03afb3215ef6e2331ca4f1315905366ec3617e2e) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: button disabled states

## 1.6.4

### Patch Changes

- [`89a020942c8`](https://github.com/refinedev/refine/commit/89a020942c887e6c74f60c52ebc707774221871a) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: deleted unused chakra-ui exports

## 1.6.3

### Patch Changes

- [`89a020942c8`](https://github.com/refinedev/refine/commit/89a020942c887e6c74f60c52ebc707774221871a) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: deleted unused chakra-ui exports

## 1.6.2

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-ui-types@0.14.2

## 1.6.1

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-ui-types@0.14.1

## 1.6.0

### Minor Changes

- [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 1.5.0

### Minor Changes

- [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 1.4.4

### Patch Changes

- [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 1.4.3

### Patch Changes

- [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 1.4.2

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 1.4.1

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 1.4.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.

## 1.3.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.

## 1.2.12

### Patch Changes

- [#3011](https://github.com/refinedev/refine/pull/3011) [`593531713c3`](https://github.com/refinedev/refine/commit/593531713c3f88d8bca7f6b0397f4068ebc85a04) Thanks [@aliemir](https://github.com/aliemir)! - Fixed `<NumberField />` type for missing `value` prop type, which was erroring out when using `<NumberField />`.

## 1.2.11

### Patch Changes

- [#3011](https://github.com/refinedev/refine/pull/3011) [`593531713c3`](https://github.com/refinedev/refine/commit/593531713c3f88d8bca7f6b0397f4068ebc85a04) Thanks [@aliemir](https://github.com/aliemir)! - Fixed `<NumberField />` type for missing `value` prop type, which was erroring out when using `<NumberField />`.

## 1.2.10

### Patch Changes

- [#2969](https://github.com/refinedev/refine/pull/2969) [`a9459550a4`](https://github.com/refinedev/refine/commit/a9459550a49a640c5a1e393d4f2b8e6e9cd53dc6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed peerDependencies of packages

## 1.2.9

### Patch Changes

- [#2969](https://github.com/refinedev/refine/pull/2969) [`a9459550a4`](https://github.com/refinedev/refine/commit/a9459550a49a640c5a1e393d4f2b8e6e9cd53dc6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed peerDependencies of packages

## 1.2.8

### Patch Changes

- [#2970](https://github.com/refinedev/refine/pull/2970) [`513c078df1`](https://github.com/refinedev/refine/commit/513c078df1aa7b694fc41e5d710eff0d9a716fed) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed responsive style for error page.

## 1.2.7

### Patch Changes

- [#2970](https://github.com/refinedev/refine/pull/2970) [`513c078df1`](https://github.com/refinedev/refine/commit/513c078df1aa7b694fc41e5d710eff0d9a716fed) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed responsive style for error page.

## 1.2.6

### Patch Changes

- [#2959](https://github.com/refinedev/refine/pull/2959) [`3cd13fa5c2`](https://github.com/refinedev/refine/commit/3cd13fa5c24a38c3a14458e26a8a43567144b4ea) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Fixed error and ready pages issues that dark mode compatibility and mobile view issues.
  - Fixed crud components mobile view issues and spacing issues.
  - Update `Save` button icon button color and variant.
  - Rename `TextFieldComponent` export name to `TextField`.
  - Update `DeleteButton` color scheme.
  - Add missing props to `RefreshButton`'s `IconButton`.

## 1.2.5

### Patch Changes

- [#2959](https://github.com/refinedev/refine/pull/2959) [`3cd13fa5c2`](https://github.com/refinedev/refine/commit/3cd13fa5c24a38c3a14458e26a8a43567144b4ea) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Fixed error and ready pages issues that dark mode compatibility and mobile view issues.
  - Fixed crud components mobile view issues and spacing issues.
  - Update `Save` button icon button color and variant.
  - Rename `TextFieldComponent` export name to `TextField`.
  - Update `DeleteButton` color scheme.
  - Add missing props to `RefreshButton`'s `IconButton`.

## 1.2.4

### Patch Changes

- [#2948](https://github.com/refinedev/refine/pull/2948) [`add3da4c76`](https://github.com/refinedev/refine/commit/add3da4c76472d6c025aa3a2f0f21ecd3ab1589e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix AuthPage styles props and dark theme colors.

## 1.2.3

### Patch Changes

- [#2948](https://github.com/refinedev/refine/pull/2948) [`add3da4c76`](https://github.com/refinedev/refine/commit/add3da4c76472d6c025aa3a2f0f21ecd3ab1589e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix AuthPage styles props and dark theme colors.

## 1.2.2

### Patch Changes

- [`59d6bd5b83`](https://github.com/refinedev/refine/commit/59d6bd5b832e96304623ed8417d77a6556a41b82) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `href` property for `BreadcrumbItem` component to be able to fix the Next.js undefined `href` error.

## 1.2.1

### Patch Changes

- [`59d6bd5b83`](https://github.com/refinedev/refine/commit/59d6bd5b832e96304623ed8417d77a6556a41b82) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `href` property for `BreadcrumbItem` component to be able to fix the Next.js undefined `href` error.

## 1.2.0

### Minor Changes

- [`89f20b1da4`](https://github.com/refinedev/refine/commit/89f20b1da4301c4591341b3a39717fe0b7a587ca) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add inital release of chakra-ui package.

## 1.1.0

### Minor Changes

- [`89f20b1da4`](https://github.com/refinedev/refine/commit/89f20b1da4301c4591341b3a39717fe0b7a587ca) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add inital release of chakra-ui package.
