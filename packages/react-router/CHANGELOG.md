# @refinedev/react-router-v6

## 2.0.4

### Patch Changes

- [#7245](https://github.com/refinedev/refine/pull/7245) [`bf3cc65f73a6801a5fd1e42e6162efd2e89406d3`](https://github.com/refinedev/refine/commit/bf3cc65f73a6801a5fd1e42e6162efd2e89406d3) Thanks [@harsha-cpp](https://github.com/harsha-cpp)! - fix: correctly parse deeply nested conditional filters from URL with syncWithLocation

  Increased `qs.parse` depth from default 5 to 10 to support deeply nested conditional filters (e.g., `or -> and -> {field, operator, value}`). Previously, nested filter properties were incorrectly parsed as bracket notation keys (`[field]`, `[operator]`, `[value]`) after page reload when using `syncWithLocation: true`.

## 2.0.3

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 2.0.2

### Patch Changes

- [#7078](https://github.com/refinedev/refine/pull/7078) [`5518bee265a48abf3dbb3befc7028a53643847da`](https://github.com/refinedev/refine/commit/5518bee265a48abf3dbb3befc7028a53643847da) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - feat: added `fallbackTo` prop to `NavigateToResource` component #7077

  Now with `fallbackTo` prop, you can specify a fallback route when no resource is found to navigate to. The component will navigate to the provided fallback path instead of doing nothing, providing better user experience.

  Resolves #7077

## 2.0.1

### Patch Changes

- [#7015](https://github.com/refinedev/refine/pull/7015) [`acb1e96b0d6cfddbd6115818b8f01c73d56934ff`](https://github.com/refinedev/refine/commit/acb1e96b0d6cfddbd6115818b8f01c73d56934ff) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect parseTableParams issue.

  Resolves (#7013)[https://github.com/refinedev/refine/issues/7013]

## 2.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade core React Router integration for Refine 5.0

  - Updated React Router integration for Refine 5.0 and TanStack Query v5 compatibility.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 1.0.1

### Patch Changes

📢 **Refine Community Release** 📢

- feat: Add `@refinedev/react-router` package. #6520

  `@refinedev/react-router-v6` is renamed to `@refinedev/react-router` to support React Router v7.

  See the [migration guide React Router v6 to v7](https://refine.dev/docs/routing/integrations/react-router/migration-guide-v6-to-v7) for more information.

  Resolves [#6520](https://github.com/refinedev/refine/issues/6520)

## 1.0.0

### Major Changes

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: Add `@refinedev/react-router` package. #6520

  `@refinedev/react-router-v6` is renamed to `@refinedev/react-router` to support React Router v7.

  See the [migration guide React Router v6 to v7](https://refine.dev/docs/routing/integrations/react-router/migration-guide-v6-to-v7) for more information.

  Resolves [#6520](https://github.com/refinedev/refine/issues/6520)

## 4.6.0

### Minor Changes

- [#6159](https://github.com/refinedev/refine/pull/6159) [`ad401d52957bf831e47707e86cb1e2f8b8c20f4b`](https://github.com/refinedev/refine/commit/ad401d52957bf831e47707e86cb1e2f8b8c20f4b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`<DocumentTitleHandler/>`](https://refine.dev/docs/routing/integrations/react-router/#documenttitlehandler) should populated `resource.meta.label` field if it's not provided on the Refine's resource definition.
  From now on, users be able to use the `resource.meta.label` field to customize document title more easily.

  ```tsx
  import { BrowserRouter, DocumentTitleHandler } from "@refinedev/react-router";
  import { Refine } from "@refinedev/core";

  const App = () => {
    return (
      <BrowserRouter>
        <Refine
        /* ... */
        >
          {/* ... */}
          <DocumentTitleHandler
            handler={({ action, params, resource }) => {
              const id = params?.id ?? "";

              const actionPrefixMatcher = {
                create: "Create new ",
                clone: `#${id} Clone ${resource?.meta?.label}`,
                edit: `#${id} Edit ${resource?.meta?.label}`,
                show: `#${id} Show ${resource?.meta?.label}`,
                list: `${resource?.meta?.label}`,
              };

              const suffix = " | <Company Name>";
              const title = actionPrefixMatcher[action || "list"] + suffix;

              return title;
            }}
          />
        </Refine>
      </BrowserRouter>
    );
  };
  ```

## 4.5.11

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 4.5.10

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 4.5.9

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 4.5.8

### Patch Changes

- [#5850](https://github.com/refinedev/refine/pull/5850) [`c2ef59bf82f`](https://github.com/refinedev/refine/commit/c2ef59bf82f80a1963dfc2fbbb0fb896e961cc7b) Thanks [@aliemir](https://github.com/aliemir)! - fix: replace imports of `qs` with default imports

  Updated `qs` imports and usage to prevent issues with ESM builds and to ensure correctly importing the module.

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 4.5.7

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 4.5.6

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 4.5.5

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 4.5.4

### Patch Changes

- [#5000](https://github.com/refinedev/refine/pull/5000) [`847124858e0`](https://github.com/refinedev/refine/commit/847124858e06c2135dd7685391ae03158201b2eb) Thanks [@dzcpy](https://github.com/dzcpy)! - fix: added `types` path to export in `package.json`

## 4.5.3

### Patch Changes

- [#5000](https://github.com/refinedev/refine/pull/5000) [`847124858e0`](https://github.com/refinedev/refine/commit/847124858e06c2135dd7685391ae03158201b2eb) Thanks [@dzcpy](https://github.com/dzcpy)! - fix: added `types` path to export in `package.json`

## 4.5.2

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 4.5.1

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 4.5.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 4.4.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 4.3.2

### Patch Changes

- [#4406](https://github.com/refinedev/refine/pull/4406) [`ad1856f741f`](https://github.com/refinedev/refine/commit/ad1856f741ff9ea97832526935bcf93d1bcc3140) Thanks [@aliemir](https://github.com/aliemir)! - Fix the issue of `matchPath` when the resource action is defined as a function or an object. Switched to using matched route string instead of using the route value from the `resource` definition.

## 4.3.1

### Patch Changes

- [#4406](https://github.com/refinedev/refine/pull/4406) [`ad1856f741f`](https://github.com/refinedev/refine/commit/ad1856f741ff9ea97832526935bcf93d1bcc3140) Thanks [@aliemir](https://github.com/aliemir)! - Fix the issue of `matchPath` when the resource action is defined as a function or an object. Switched to using matched route string instead of using the route value from the `resource` definition.

## 4.3.0

### Minor Changes

- [#4313](https://github.com/refinedev/refine/pull/4313) [`28fe67047a0`](https://github.com/refinedev/refine/commit/28fe67047a084dff37fbdbee6a132f85f9413657) Thanks [@abdellah711](https://github.com/abdellah711)! - feat: dynamic window title

  This feature enables users to generate document titles for each page. To activate it, users need to include the `DocumentTitleHandler` component within the `<Refine>` component. By default, the `DocumentTitleHandler` will generate titles using the `generateDefaultDocumentTitle` exported from `@refinedev/core`.

  The `DocumentTitleHandler` component accepts an optional prop called `handler`, which is a callback function. This function is triggered whenever the `pathname` changes and receives an object with the following parameters:

  ```ts
  {
    resource, // 'posts'
      action, // 'create'
      params, // {id: 1}
      pathname, // '/posts/create'
      autoGeneratedTitle; // 'Create new Post | refine'
  }
  ```

  The `handler` callback should return the new title based on the provided parameters.
  To update the title in a child component, the user can use the `useDocumentTitle` hook. It accepts either a string representing the new title or an object with the property `i18nKey` if the app supports multiple languages.

  ```ts
  useDocumentTitle({ i18nKey: "documentTitle.default" });
  ```

## 4.2.0

### Minor Changes

- [#4313](https://github.com/refinedev/refine/pull/4313) [`28fe67047a0`](https://github.com/refinedev/refine/commit/28fe67047a084dff37fbdbee6a132f85f9413657) Thanks [@abdellah711](https://github.com/abdellah711)! - feat: dynamic window title

  This feature enables users to generate document titles for each page. To activate it, users need to include the `DocumentTitleHandler` component within the `<Refine>` component. By default, the `DocumentTitleHandler` will generate titles using the `generateDefaultDocumentTitle` exported from `@refinedev/core`.

  The `DocumentTitleHandler` component accepts an optional prop called `handler`, which is a callback function. This function is triggered whenever the `pathname` changes and receives an object with the following parameters:

  ```ts
  {
    resource, // 'posts'
      action, // 'create'
      params, // {id: 1}
      pathname, // '/posts/create'
      autoGeneratedTitle; // 'Create new Post | refine'
  }
  ```

  The `handler` callback should return the new title based on the provided parameters.
  To update the title in a child component, the user can use the `useDocumentTitle` hook. It accepts either a string representing the new title or an object with the property `i18nKey` if the app supports multiple languages.

  ```ts
  useDocumentTitle({ i18nKey: "documentTitle.default" });
  ```

## 4.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  We're releasing a new way to connect your router to **refine**.

  The legacy `routerProvider` and its exports are now deprecated but accessible at `@refinedev/react-router-v6/legacy` path.

  The new `routerBindings` are smaller and more flexible than the previos one.

  ## New `routerBindings` export

  New `routerBindings` contains following properties;

  - `go`: Which returns a function to handle the navigation in `react-router-v6`. It accepts a config object and navigates to the given path. Uses `useNavigate` hook under the hood.
  - `back`: Which returns a function to handle the navigation in `react-router-v6`. It navigates back to the previous page. Uses `useNavigate` hook under the hood.
  - `parse`: Which returns a function to parse the given path and returns the `resource`, `id`, `action` and additional `params`. Uses `useParams` and `useLocation` hooks and `qs` package under the hood.
  - `Link`: A component that accepts `to` prop and renders a link to the given path. Uses `Link` component from `react-router-dom` under the hood.

  ## Complemetary Components

  - `RefineRoutes` - A component that renders the routes for the resources when the actions are defined as components. This can be used to achieve the legacy behavior of `routerProvider` prop. `RefineRoutes` component accepts a render function as a child and passed a `React.JSX.Element` array containing `Route` components for the resource routes. You can wrap it to a `Routes` component and let it handle the route creation process for you. Additionally, If you want to add custom routes, you can place them inside the `Routes` component or you can place an another `Routes` component. Both apporaches are now valid and accepted by **refine**.

  - `NavigateToResource` - A component that navigates to the first `list` action of the `resources` array of `<Refine>`. Optionally, you can pass a `resource` prop to navigate to `list` action of the resource. This can be placed at the `index` route of your app to redirect to the first resource.

  - `UnsavedChangesNotifier` - This component handles the prompt when the user tries to leave the page with unsaved changes. It can be placed under the `Refine` component.

  ## Exported values from `react-router-dom`

  In earlier versions, we've re-exported the `react-router-dom` package. This was a bad practice and we've removed it in this version. If you're using `react-router-dom` in your project, you should install it as a dependency and import the values from it.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 3.40.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.39.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.38.0

### Minor Changes

- [#3144](https://github.com/refinedev/refine/pull/3144) [`c0aea17837c`](https://github.com/refinedev/refine/commit/c0aea17837c02a68d6be333925ff21fb24f0e4ec) Thanks [@omeraplak](https://github.com/omeraplak)! - Added react-router-dom's exports

## 3.37.0

### Minor Changes

- [#3144](https://github.com/refinedev/refine/pull/3144) [`c0aea17837c`](https://github.com/refinedev/refine/commit/c0aea17837c02a68d6be333925ff21fb24f0e4ec) Thanks [@omeraplak](https://github.com/omeraplak)! - Added react-router-dom's exports

## 3.36.6

### Patch Changes

- [#3126](https://github.com/refinedev/refine/pull/3126) [`ccaf8bde357`](https://github.com/refinedev/refine/commit/ccaf8bde35737558de69953b5b0c7de64df351cd) Thanks [@thaihuynhxyz](https://github.com/thaihuynhxyz)! - fix: react extract incorrect resource from encoded pathname

## 3.36.5

### Patch Changes

- [#3126](https://github.com/refinedev/refine/pull/3126) [`ccaf8bde357`](https://github.com/refinedev/refine/commit/ccaf8bde35737558de69953b5b0c7de64df351cd) Thanks [@thaihuynhxyz](https://github.com/thaihuynhxyz)! - fix: react extract incorrect resource from encoded pathname

## 3.36.4

### Patch Changes

- [#3039](https://github.com/refinedev/refine/pull/3039) [`54eee2911a2`](https://github.com/refinedev/refine/commit/54eee2911a2196645914b2181a05d030c528b438) Thanks [@alonp99](https://github.com/alonp99)! - Fixed TypeScript type of `useParams` hook

## 3.36.3

### Patch Changes

- [#3039](https://github.com/refinedev/refine/pull/3039) [`54eee2911a2`](https://github.com/refinedev/refine/commit/54eee2911a2196645914b2181a05d030c528b438) Thanks [@alonp99](https://github.com/alonp99)! - Fixed TypeScript type of `useParams` hook

## 3.36.2

### Patch Changes

- Add missing `BrowserRouterComponent` export to `@pankod/refine-react-router-v6` package.

## 3.36.1

### Patch Changes

- [#2780](https://github.com/refinedev/refine/pull/2780) [`0417b7bf64`](https://github.com/refinedev/refine/commit/0417b7bf64f6a2ee09a025d4dabbc7009e11ba02) Thanks [@aliemir](https://github.com/aliemir)! - Add missing `BrowserRouterComponent` export to `@pankod/refine-react-router-v6` package.

## 3.36.0

### Minor Changes

- Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RouterComponent` component.

## 3.35.0

### Minor Changes

- Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RouterComponent` component.

## 3.34.0

### Minor Changes

- [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `RouterComponent` component.

## 3.33.2

### Patch Changes

- Fixed version of react-router to `6.3.0`

## 3.33.1

### Patch Changes

- [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 3.33.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.32.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.31.3

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

## 3.31.2

### Patch Changes

- [#2415](https://github.com/refinedev/refine/pull/2415) [`f7c98f0ef9`](https://github.com/refinedev/refine/commit/f7c98f0ef9743fbee2cc44206548cf2da3ceb01c) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed default login page is `<LoginPage>`.

## 3.31.1

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

## 3.31.0

### Minor Changes

- Add React@18 support 🚀

## 3.30.0

### Minor Changes

- [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 3.29.0

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

## 3.28.0

### Minor Changes

- [`e78b181b12`](https://github.com/refinedev/refine/commit/e78b181b12adb35e516c19b5382a211e10476add) Thanks [@omeraplak](https://github.com/omeraplak)! - Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

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

## 3.27.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

- Fix adding the current path to the `to` parameter when redirecting to the login page after `logout` - #2211

## 3.26.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.3

### Patch Changes

- [#2214](https://github.com/refinedev/refine/pull/2214) [`91db05caf7`](https://github.com/refinedev/refine/commit/91db05caf796025d2ad4f64221541cc1fc5f9c5d) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix adding the current path to the `to` parameter when redirecting to the login page after `logout` - #2211

## 3.25.2

### Patch Changes

- Fixed a bug that caused `<ErrorComponent/>` to does not appear in the `404` state

## 3.25.1

### Patch Changes

- [#1918](https://github.com/refinedev/refine/pull/1918) [`b8a4093fda`](https://github.com/refinedev/refine/commit/b8a4093fdabab3d1ff821182ee5b96e2c74a9ecd) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed a bug that caused `<ErrorComponent/>` to does not appear in the `404` state

## 3.22.2

### Patch Changes

- Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
  - @pankod/refine-core@3.23.2
