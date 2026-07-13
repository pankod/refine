# @refinedev/remix-router

## 4.0.4

### Patch Changes

- [#7245](https://github.com/refinedev/refine/pull/7245) [`bf3cc65f73a6801a5fd1e42e6162efd2e89406d3`](https://github.com/refinedev/refine/commit/bf3cc65f73a6801a5fd1e42e6162efd2e89406d3) Thanks [@harsha-cpp](https://github.com/harsha-cpp)! - fix: correctly parse deeply nested conditional filters from URL with syncWithLocation

  Increased `qs.parse` depth from default 5 to 10 to support deeply nested conditional filters (e.g., `or -> and -> {field, operator, value}`). Previously, nested filter properties were incorrectly parsed as bracket notation keys (`[field]`, `[operator]`, `[value]`) after page reload when using `syncWithLocation: true`.

## 4.0.3

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 4.0.2

### Patch Changes

- [#7078](https://github.com/refinedev/refine/pull/7078) [`5518bee265a48abf3dbb3befc7028a53643847da`](https://github.com/refinedev/refine/commit/5518bee265a48abf3dbb3befc7028a53643847da) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - feat: added `fallbackTo` prop to `NavigateToResource` component #7077

  Now with `fallbackTo` prop, you can specify a fallback route when no resource is found to navigate to. The component will navigate to the provided fallback path instead of doing nothing, providing better user experience.

  Resolves #7077

## 4.0.1

### Patch Changes

- [#7015](https://github.com/refinedev/refine/pull/7015) [`acb1e96b0d6cfddbd6115818b8f01c73d56934ff`](https://github.com/refinedev/refine/commit/acb1e96b0d6cfddbd6115818b8f01c73d56934ff) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect parseTableParams issue.

  Resolves (#7013)[https://github.com/refinedev/refine/issues/7013]

## 4.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade Remix router integration for Refine 5.0

  - Updated Remix router integration for Refine 5.0 and TanStack Query v5 compatibility.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 3.0.8

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

## 3.0.7

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

## 3.0.6

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 3.0.5

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 3.0.4

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 3.0.3

### Patch Changes

- [#5850](https://github.com/refinedev/refine/pull/5850) [`c2ef59bf82f`](https://github.com/refinedev/refine/commit/c2ef59bf82f80a1963dfc2fbbb0fb896e961cc7b) Thanks [@aliemir](https://github.com/aliemir)! - fix: replace imports of `qs` with default imports

  Updated `qs` imports and usage to prevent issues with ESM builds and to ensure correctly importing the module.

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 3.0.2

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 3.0.1

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 3.0.0

### Major Changes

- [#5355](https://github.com/refinedev/refine/pull/5355) [`5acc257f8b`](https://github.com/refinedev/refine/commit/5acc257f8bf69bff9957bdd2120eb6de0d9d04c8) Thanks [@rodbs](https://github.com/rodbs)! - **Upgrade to Remix v2**

  Upgraded `@refinedev/remix-router` to use `Remix v2`. This version change **does not** contain any breaking changes on the `@refinedev/remix-router` side.

  Depending on your project's status, if you decide to upgrade to `Remix v2`, you may or may not need to make necessary changes to your project. Please refer to the [Remix v2 upgrade guide](https://remix.run/docs/en/main/start/v2) for more information.

  If your project is created with `create-refine-app` which already initializes Remix projects using the v2 routing convention, you'll need to make the below changes to get rid of the warnings:

  ```diff
  /** @type {import('@remix-run/dev').AppConfig} */
  module.exports = {
  -  future: {
  -    v2_routeConvention: true,
  -  },
  };
  ```

  Due to the change in its default value, you may also need to set `serverModuleFormat` to `"cjs"` in your `remix.config.js` file:

  ```diff
  /** @type {import('@remix-run/dev').RemixConfig */
  module.exports = {
  +  serverModuleFormat: "cjs",
  };
  ```

  Other than the changes mentioned above, `@refinedev/remix-router` and rest of the Refine packages should work as expected without requiring any changes.

  **Migration Guide for `@refinedev/remix-router`**

  Install the latest version of `@refinedev/remix-router` and `@refinedev/cli`:

  ```bash
  npm i @refinedev/remix-router@latest @refinedev/cli@latest
  ```

  You'll also need to update your remix dependencies:

  ```bash
  npm i @remix-run/node@latest @remix-run/react@latest @remix-run/serve@latest
  ```

  Please refer to the [Remix v2 upgrade guide](https://remix.run/docs/en/main/start/v2) for more information.

  You may also receive a warning when you try to build and run your production build on your local. This is because `@remix-run/serve` requires a built path to be passed to it. `@refinedev/cli` will provide a fallback value for this which may work for your app but CLI will still warn you about it. You can either ignore the warning or provide a built path to `start` command.

  ```diff
  {
    "scripts": {
  -    "start": "refine start",
  +    "start": "refine start ./build/index.js",
    },
  }
  ```

  There should be no changes necessary regarding `@refinedev/remix-router` but your app may need to be updated according to the changes in `Remix v2`. Please refer to the [Remix v2 upgrade guide](https://remix.run/docs/en/main/start/v2) for more information.

## 2.3.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 2.3.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 2.2.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 2.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `parseTableParams` helper is added to let users parse the query params in loaders to persist `syncWithLocation` feature in tables.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  ## 🪄 Migrating your project automatically with refine-codemod ✨

  [`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

  Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

  ```sh
  npx @refinedev/codemod@latest refine3-to-refine4
  ```

  And it's done. Now your project uses `refine@4.x.x`.

  ## 📝 Changelog

  We're releasing a new way to connect your router to **refine**.

  The legacy `routerProvider` and its exports are now deprecated but accessible at `@refinedev/remix-router/legacy` path.

  The new `routerBindings` are smaller and more flexible than the previos one.

  ## New `routerBindings` export

  New `routerBindings` contains following properties;

  - `go`: Which returns a function to handle the navigation in `@remix-run/react`. It accepts a config object and navigates to the given path. Uses `useNavigate` hook under the hood.
  - `back`: Which returns a function to handle the navigation in `@remix-run/react`. It navigates back to the previous page. Uses `useNavigate` hook under the hood.
  - `parse`: Which returns a function to parse the given path and returns the `resource`, `id`, `action` and additional `params`. Uses `useParams` and `useLocation` hooks under the hood.
  - `Link`: A component that accepts `to` prop and renders a link to the given path. Uses `Link` component from `@remix-run/react` under the hood.

  ## Complemetary Components

  - `RefineRoutes` - A component that renders the routes for the resources when the actions are defined as components. This can be used to achieve the legacy behavior of `routerProvider` prop. `RefineRoutes` component accepts a render function as a child and passes `React.JSX.Element` if there's a match for the given path, `undefined` is passed otherwise. You can use this in `# @pankod/refine-remix-router splat route to render the matching action component for a resource. We're encouraging our users to use file based routing instead of `# @pankod/refine-remix-router splat route which provides more flexibility and a better development experience with its performance benefits.

  - `NavigateToResource` - A component that navigates to the first `list` action of the `resources` array of `<Refine>`. Optionally, you can pass a `resource` prop to navigate to `list` action of the resource. This can be placed at the `index` route of your app to redirect to the first resource.

  - `UnsavedChangesNotifier` - This component handles the prompt when the user tries to leave the page with unsaved changes. It can be placed under the `Refine` component.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `AuthProvider` is renamed to `LegacyAuthProvider` with refine@4. Components and functions are updated to support `LegacyAuthProvider`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 1.9.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 1.8.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 1.7.2

### Patch Changes

- [#3779](https://github.com/refinedev/refine/pull/3779) [`2acb0cd8ad6`](https://github.com/refinedev/refine/commit/2acb0cd8ad6596e3bebb3f0b3a9843f3b5321398) Thanks [@aliemir](https://github.com/aliemir)! - Updated the broken `Prompt` with `useBlocker` instead of an unsafe workaround.

## 1.7.1

### Patch Changes

- [#3779](https://github.com/refinedev/refine/pull/3779) [`2acb0cd8ad6`](https://github.com/refinedev/refine/commit/2acb0cd8ad6596e3bebb3f0b3a9843f3b5321398) Thanks [@aliemir](https://github.com/aliemir)! - Updated the broken `Prompt` with `useBlocker` instead of an unsafe workaround.

## 1.7.0

### Minor Changes

- Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RemixRouteComponent` component.

- Add splat route support to remix with `handleRefineParams` helper.

## 1.6.0

### Minor Changes

- Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RemixRouteComponent` component.

- Add splat route support to remix with `handleRefineParams` helper.

## 1.5.0

### Minor Changes

- [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RemixRouteComponent` component.

- [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Add splat route support to remix with `handleRefineParams` helper.

## 1.4.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 1.3.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 1.2.3

### Patch Changes

- Fixed default login page is `<LoginPage>`.

* 🎉 Added `AuthPage` component to the `refine` app. This page is used to login, register, forgot password and update password. Login page is default page and old `LoginPage` component is deprecated.

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

## 1.2.2

### Patch Changes

- [#2415](https://github.com/refinedev/refine/pull/2415) [`f7c98f0ef9`](https://github.com/refinedev/refine/commit/f7c98f0ef9743fbee2cc44206548cf2da3ceb01c) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed default login page is `<LoginPage>`.

## 1.2.1

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

## 1.2.0

### Minor Changes

- Add `checkAuthentication` to handle authentication processes more easily

## 1.1.0

### Minor Changes

- [#2323](https://github.com/refinedev/refine/pull/2323) [`c4157066bd`](https://github.com/refinedev/refine/commit/c4157066bd18c93af13d12b45c0e2619766361d1) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `checkAuthentication` to handle authentication processes more easily

## 1.0.2

### Patch Changes

- Our Story with Remix begins 👊

## 1.0.1

### Patch Changes

- [#2305](https://github.com/refinedev/refine/pull/2305) [`db0157671d`](https://github.com/refinedev/refine/commit/db0157671d978fb80b1f01989b1e1ee01ec5c974) Thanks [@omeraplak](https://github.com/omeraplak)! - Our Story with Remix begins 👊
