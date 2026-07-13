# @refinedev/nextjs-router

## 7.0.5

### Patch Changes

- [#7245](https://github.com/refinedev/refine/pull/7245) [`bf3cc65f73a6801a5fd1e42e6162efd2e89406d3`](https://github.com/refinedev/refine/commit/bf3cc65f73a6801a5fd1e42e6162efd2e89406d3) Thanks [@harsha-cpp](https://github.com/harsha-cpp)! - fix: correctly parse deeply nested conditional filters from URL with syncWithLocation

  Increased `qs.parse` depth from default 5 to 10 to support deeply nested conditional filters (e.g., `or -> and -> {field, operator, value}`). Previously, nested filter properties were incorrectly parsed as bracket notation keys (`[field]`, `[operator]`, `[value]`) after page reload when using `syncWithLocation: true`.

## 7.0.4

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 7.0.3

### Patch Changes

- [#7078](https://github.com/refinedev/refine/pull/7078) [`5518bee265a48abf3dbb3befc7028a53643847da`](https://github.com/refinedev/refine/commit/5518bee265a48abf3dbb3befc7028a53643847da) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - feat: added `fallbackTo` prop to `NavigateToResource` component #7077

  Now with `fallbackTo` prop, you can specify a fallback route when no resource is found to navigate to. The component will navigate to the provided fallback path instead of doing nothing, providing better user experience.

  Resolves #7077

## 7.0.2

### Patch Changes

- [#7046](https://github.com/refinedev/refine/pull/7046) [`e0ebbb0f734724da9c9eef81ec387a61ae5db66b`](https://github.com/refinedev/refine/commit/e0ebbb0f734724da9c9eef81ec387a61ae5db66b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: fixed `currentPage` URL parameter not loading correctly on page refresh #7042

  Now the `currentPage` parameter is properly read from URL search params, ensuring pagination state persists across page refreshes.

  Resolves #7042

## 7.0.1

### Patch Changes

- [#7015](https://github.com/refinedev/refine/pull/7015) [`acb1e96b0d6cfddbd6115818b8f01c73d56934ff`](https://github.com/refinedev/refine/commit/acb1e96b0d6cfddbd6115818b8f01c73d56934ff) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect parseTableParams issue.

  Resolves (#7013)[https://github.com/refinedev/refine/issues/7013]

## 7.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade Next.js router integration for Refine 5.0

  - Updated Next.js router integration for Refine 5.0 and TanStack Query v5 compatibility.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 6.2.3

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update Next.js version to 14.2.26 for security patches

  https://github.com/vercel/next.js/security/advisories/GHSA-f82v-jwr5-mffw

## 6.2.2

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6725](https://github.com/refinedev/refine/pull/6725) [`ee58004e57c2bcd53e70015486a07cd8f6118658`](https://github.com/refinedev/refine/commit/ee58004e57c2bcd53e70015486a07cd8f6118658) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: update Next.js version to 14.2.26 for security patches

  https://github.com/vercel/next.js/security/advisories/GHSA-f82v-jwr5-mffw

## 6.2.1

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

📢 **Refine Community Release** 📢

- **Feature:** Added support for Next.js 15. #6430

  To create a new example project with Next.js 15, run the following command:

  ```bash
  npm create refine-app@latest -- --example with-nextjs-headless
  ```

  You can find the source code in the [examples/with-nextjs-headless](https://github.com/refinedev/refine/tree/main/examples/with-nextjs-headless) directory.

  > 🚨 While `@refinedev/core` and `@refinedev/nextjs-router` do not introduce breaking changes, upgrading to Next.js 15 requires your project to be compatible with React 19. Please refer to the migration guides below:
  >
  > - [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
  > - [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
  >
  > 🚨 Additionally, if you're using `@refinedev/antd`, `@refinedev/chakra-ui`, `@refinedev/mantine`, or `@refinedev/mui`, make sure to check their compatibility with React 19.

  For known issues, migration guidance, and more details, please refer to issue [#6430](https://github.com/refinedev/refine/issues/6430).

## 6.2.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6551](https://github.com/refinedev/refine/pull/6551) [`6b8016a9bbb7422255711bf67f8247eb44db78a9`](https://github.com/refinedev/refine/commit/6b8016a9bbb7422255711bf67f8247eb44db78a9) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - **Feature:** Added support for Next.js 15. #6430

  To create a new example project with Next.js 15, run the following command:

  ```bash
  npm create refine-app@latest -- --example with-nextjs-headless
  ```

  You can find the source code in the [examples/with-nextjs-headless](https://github.com/refinedev/refine/tree/main/examples/with-nextjs-headless) directory.

  > 🚨 While `@refinedev/core` and `@refinedev/nextjs-router` do not introduce breaking changes, upgrading to Next.js 15 requires your project to be compatible with React 19. Please refer to the migration guides below:
  >
  > - [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
  > - [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
  >
  > 🚨 Additionally, if you're using `@refinedev/antd`, `@refinedev/chakra-ui`, `@refinedev/mantine`, or `@refinedev/mui`, make sure to check their compatibility with React 19.

  For known issues, migration guidance, and more details, please refer to issue [#6430](https://github.com/refinedev/refine/issues/6430).

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 6.1.0

### Minor Changes

- [#6159](https://github.com/refinedev/refine/pull/6159) [`ad401d52957bf831e47707e86cb1e2f8b8c20f4b`](https://github.com/refinedev/refine/commit/ad401d52957bf831e47707e86cb1e2f8b8c20f4b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: [`<DocumentTitleHandler/>`](https://refine.dev/docs/routing/integrations/next-js/#documenttitlehandler) should populated `resource.meta.label` field if it's not provided on the Refine's resource definition.
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

## 6.0.6

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 6.0.5

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 6.0.4

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 6.0.3

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: `/parse-table-params` export in node10 module resolutions

  `/parse-table-params` subpath export is not correctly resolved by `node10` module resolutions.

- [#5850](https://github.com/refinedev/refine/pull/5850) [`c2ef59bf82f`](https://github.com/refinedev/refine/commit/c2ef59bf82f80a1963dfc2fbbb0fb896e961cc7b) Thanks [@aliemir](https://github.com/aliemir)! - fix: replace imports of `qs` with default imports

  Updated `qs` imports and usage to prevent issues with ESM builds and to ensure correctly importing the module.

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- [#5849](https://github.com/refinedev/refine/pull/5849) [`8a8f88b2c30`](https://github.com/refinedev/refine/commit/8a8f88b2c30fefd4fed91ce4a378e7828524d085) Thanks [@aliemir](https://github.com/aliemir)! - fix: replace `next/*` imports with extensions in ESM builds

  Updated imports from `next/*` to `next/*.js` to prevent issues with ESM builds and to ensure correctly importing the module.

## 6.0.2

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 6.0.1

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 6.0.0

### Major Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - With this version, the `@refinedev/nextjs-router` package now starts supporting Next.js@14 and App Router by default. You can upgrade your application by following the upgrade guide.

  We recommend that projects using **Ant Design** refrain from upgrading at the moment due to the **incompatibility** between Ant Design and **Next.js 14 Pages Router**. For more detailed information, you can refer to the Known Issues document in Ant Design [here](https://refine.dev/docs/ui-integrations/ant-design/introduction/#known-issues).

  # Upgrade Guide

  ```bash
  npm i next@14 @refinedev/nextjs-router@latest
  ```

  See [Next.js 14 Upgrade Guide](https://nextjs.org/docs/pages/building-your-application/upgrading/version-14) and [Next.js 14 Codemods](https://nextjs.org/docs/pages/building-your-application/upgrading/codemods#nextjs-codemods) for more information.

  ### Changes to default export

  Default export for `@refinedev/nextjs-router` is now `App Router` instead of `Pages`.

  If you are using `Pages`, update your imports as follows:

  ```diff
  - import routerProvider from "@refinedev/nextjs-router";
  + import routerProvider from "@refinedev/nextjs-router/pages";
  ```

  If you are using `App Router`, update your imports as follows:

  ```diff
  - import routerProvider from "@refinedev/nextjs-router/app";
  + import routerProvider from "@refinedev/nextjs-router";
  ```

  ### Changes to `parseTableParams` import

  If you will use `parseTableParams` on **client side** for **App Router**, you can use the following import:

  ```tsx
  import { parseTableParams } from "@refinedev/nextjs-router";
  ```

  `parseTableParams` from `@refinedev/nextjs-router` has `"use client"` directive.

  If you want to use `parseTableParams` on **server side** for **App Router**, you can use the following import:

  ```tsx
  import parseTableParams from "@refinedev/nextjs-router/parse-table-params";
  ```

  `parseTableParams` from `@refinedev/nextjs-router/parse-table-params` doesn't have `"use client"` directive.

  ### Dropped Refine v3 router provider legacy support

  Now, `@refinedev/nextjs-router` only supports Refine v4 router provider.

  The following exports are removed:

  ```diff
  - @refinedev/nextjs-router/legacy
  - @refinedev/nextjs-router/legacy-app
  - @refinedev/nextjs-router/legacy-pages
  ```

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

## 5.5.7

### Patch Changes

- [#5597](https://github.com/refinedev/refine/pull/5597) [`1738981da0`](https://github.com/refinedev/refine/commit/1738981da0bd230efe4a0f02517ab15f5f14f0f7) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `meta` has corrupted route parameters.

  `parse` function from `@refinedev/nextjs-router` provides returns search params as following structure:

  ```json
  {
    "pageSize": "25",
    "current": "1",
    "sorters[0][field]": "status",
    "sorters[0][order]": "asc",
    "filters[0][field]": "status",
    "filters[0][value]": "draft",
    "filters[0][operator]": "contains"
  }
  ```

  This structure is not predictable and not sanitazble. So, `parse` function has been updated to provide following structure:

  ```json
  {
    "pageSize": "25",
    "current": "1",
    "sorters": [
      {
        "field": "status",
        "order": "asc"
      }
    ],
    "filters": [
      {
        "field": "status",
        "value": "draft",
        "operator": "contains"
      }
    ]
  }
  ```

  With this schema we can easily sanitize, deduplicate and predict the structure of the query parameters.

## 5.5.6

### Patch Changes

- [#5549](https://github.com/refinedev/refine/pull/5549) [`61215d3b41`](https://github.com/refinedev/refine/commit/61215d3b416b121fada8e51ef0e10e79fd9070af) Thanks [@aliemir](https://github.com/aliemir)! - Updated index exports to provide appropriate types for the exported elements. Resolves #5548

## 5.5.5

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 5.5.4

### Patch Changes

- [#5114](https://github.com/refinedev/refine/pull/5114) [`00a9252c5de`](https://github.com/refinedev/refine/commit/00a9252c5de86aad544b0ca7d087c532c6d561fa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `next` updated to latest version.

## 5.5.3

### Patch Changes

- [#5114](https://github.com/refinedev/refine/pull/5114) [`00a9252c5de`](https://github.com/refinedev/refine/commit/00a9252c5de86aad544b0ca7d087c532c6d561fa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `next` updated to latest version.

## 5.5.2

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 5.5.1

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 5.5.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 5.4.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 5.3.2

### Patch Changes

- [#4466](https://github.com/refinedev/refine/pull/4466) [`a398c19b023`](https://github.com/refinedev/refine/commit/a398c19b023e16e12f208d7972374826fc28cb8c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the unhandled nullable `pathname` issue returning from `usePathname` hook for the `appDir` router.

## 5.3.1

### Patch Changes

- [#4466](https://github.com/refinedev/refine/pull/4466) [`a398c19b023`](https://github.com/refinedev/refine/commit/a398c19b023e16e12f208d7972374826fc28cb8c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the unhandled nullable `pathname` issue returning from `usePathname` hook for the `appDir` router.

## 5.3.0

### Minor Changes

- [#4313](https://github.com/refinedev/refine/pull/4313) [`28fe67047a0`](https://github.com/refinedev/refine/commit/28fe67047a084dff37fbdbee6a132f85f9413657) Thanks [@abdellah711](https://github.com/abdellah711)! - feat: dynamic window title for NextJS `pages` directory

  This feature enables users to generate document titles for each page in NextJS `pages` directory. To activate it, users need to include the `DocumentTitleHandler` component within the `<Refine>` component. By default, the `DocumentTitleHandler` will generate titles using the `generateDefaultDocumentTitle` exported from `@refinedev/core`.

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

  Note that this hook doesn't support SSR, and it will generate the titles in the client-side only.

## 5.2.0

### Minor Changes

- [#4313](https://github.com/refinedev/refine/pull/4313) [`28fe67047a0`](https://github.com/refinedev/refine/commit/28fe67047a084dff37fbdbee6a132f85f9413657) Thanks [@abdellah711](https://github.com/abdellah711)! - feat: dynamic window title for NextJS `pages` directory

  This feature enables users to generate document titles for each page in NextJS `pages` directory. To activate it, users need to include the `DocumentTitleHandler` component within the `<Refine>` component. By default, the `DocumentTitleHandler` will generate titles using the `generateDefaultDocumentTitle` exported from `@refinedev/core`.

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

  Note that this hook doesn't support SSR, and it will generate the titles in the client-side only.

## 5.1.6

### Patch Changes

- [#4160](https://github.com/refinedev/refine/pull/4160) [`9dc8ba1dd81`](https://github.com/refinedev/refine/commit/9dc8ba1dd81c1fa21e8d9339d21d8398887deb91) Thanks [@joshbaumann](https://github.com/joshbaumann)! - fix: unsaved changes prompt not showing when the browser is refreshed.

## 5.1.5

### Patch Changes

- [#4160](https://github.com/refinedev/refine/pull/4160) [`9dc8ba1dd81`](https://github.com/refinedev/refine/commit/9dc8ba1dd81c1fa21e8d9339d21d8398887deb91) Thanks [@joshbaumann](https://github.com/joshbaumann)! - fix: unsaved changes prompt not showing when the browser is refreshed.

## 5.1.4

### Patch Changes

- [#3987](https://github.com/refinedev/refine/pull/3987) [`d7d68e3ff68`](https://github.com/refinedev/refine/commit/d7d68e3ff686dece9f58e53e02076f0ecbd91010) Thanks [@aliemir](https://github.com/aliemir)! - Add `isReady` check to `parse` method for `/pages` to wait until the correct values are returned from the `router`.

## 5.1.3

### Patch Changes

- [#3987](https://github.com/refinedev/refine/pull/3987) [`d7d68e3ff68`](https://github.com/refinedev/refine/commit/d7d68e3ff686dece9f58e53e02076f0ecbd91010) Thanks [@aliemir](https://github.com/aliemir)! - Add `isReady` check to `parse` method for `/pages` to wait until the correct values are returned from the `router`.

## 5.1.2

### Patch Changes

- [#3893](https://github.com/refinedev/refine/pull/3893) [`d8c0a2f1cd1`](https://github.com/refinedev/refine/commit/d8c0a2f1cd16831552cdaebd0907f297192d64ef) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the export of `RefineRoutes` at `/app` path. (Thanks to [@thomas-advantitge](https://github.com/thomas-advantitge) for the [#3863](https://github.com/refinedev/refine/pull/3863))

## 5.1.1

### Patch Changes

- [#3893](https://github.com/refinedev/refine/pull/3893) [`d8c0a2f1cd1`](https://github.com/refinedev/refine/commit/d8c0a2f1cd16831552cdaebd0907f297192d64ef) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the export of `RefineRoutes` at `/app` path. (Thanks to [@thomas-advantitge](https://github.com/thomas-advantitge) for the [#3863](https://github.com/refinedev/refine/pull/3863))

## 5.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  We're releasing a new way to connect your router to **refine**.

  The legacy `routerProvider` and its exports are now deprecated but accessible at `@refinedev/nextjs-router/legacy-app` and `@refinedev/nextjs-router/legacy-pages`.

  The new `routerBindings` are smaller and more flexible than the previos one.

  ## New `routerBindings` export

  New `routerBindings` contains following properties;

  - `go`: Which returns a function to handle the navigation in `next`. It accepts a config object and navigates to the given path. Uses `useRouter` hook under the hood.
  - `back`: Which returns a function to handle the navigation in `next`. It navigates back to the previous page. Uses `useRouter` hook under the hood.
  - `parse`: Which returns a function to parse the given path and returns the `resource`, `id`, `action` and additional `params`. Uses `useRouter` for `/pages` dir and `usePathname` and `useSearchParams` for `/app` dir.
  - `Link`: A component that accepts `to` prop and renders a link to the given path. Uses `Link` component from `next/link` under the hood.

  ## Complemetary Components

  - `RefineRoutes` - A component that renders the routes for the resources when the actions are defined as components. This can be used to achieve the legacy behavior of `routerProvider` prop. `RefineRoutes` component accepts a render function as a child and passes `React.JSX.Element` if there's a match for the given path, `undefined` is passed otherwise. You can use this in `[[...refine]]` route to render the matching action component for a resource. We're encouraging our users to use file based routing instead of `[[...refine]]` route which provides more flexibility and a better development experience with its performance benefits.

  - `NavigateToResource` - A component that navigates to the first `list` action of the `resources` array of `<Refine>`. Optionally, you can pass a `resource` prop to navigate to `list` action of the resource. This can be placed at the `index` route of your app to redirect to the first resource.

  - `UnsavedChangesNotifier` - This component handles the prompt when the user tries to leave the page with unsaved changes. It can be placed under the `Refine` component.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `AuthProvider` is renamed to `LegacyAuthProvider` with refine@4. Components and functions are updated to support `LegacyAuthProvider`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `parseTableParams` helper is added to let users parse the query params in SSR methods to persist `syncWithLocation` feature in tables.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 4.5.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.4.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.3.0

### Minor Changes

- [#3387](https://github.com/refinedev/refine/pull/3387) [`a4731bd8fb4`](https://github.com/refinedev/refine/commit/a4731bd8fb43c96b38e1712981067c2d8cfea5e3) Thanks [@vanflux](https://github.com/vanflux)! - Forwarding ref on RefineLink component

## 4.2.0

### Minor Changes

- [#3387](https://github.com/refinedev/refine/pull/3387) [`a4731bd8fb4`](https://github.com/refinedev/refine/commit/a4731bd8fb43c96b38e1712981067c2d8cfea5e3) Thanks [@vanflux](https://github.com/vanflux)! - Forwarding ref on RefineLink component

## 4.1.0

### Minor Changes

- [#3140](https://github.com/refinedev/refine/pull/3140) [`102bfbf3283`](https://github.com/refinedev/refine/commit/102bfbf32830febe10b99655723863ebd277aadb) Thanks [@aliemir](https://github.com/aliemir)! - - Bumped Next.js to 13

  - Added support for experimental `appDir` option in `next.config.js` to allow for the latest Next.js features.

  ## `pages` directory

  Current support for `pages` directory has not changed and will continue to work as before. It will be supported as long as `Next.js` continues to support and prompts it as the stable way of working with `Next.js`.

  ## `appDir` option

  `appDir` option is a new experimental feature in `Next.js` that introduces a bunch of new features. It is currently in beta and is not stable. It is not recommended to use it in production. But can be used alongside the current `pages` directory support.

  To use `appDir` option, you need to add it to your `next.config.js` file.

  ```js
  // next.config.js
  module.exports = {
    /* ... */
    experimental: {
      appDir: true,
    },
  };
  ```

  ## Using `appDir` with **refine**

  We've needed to make some changes to the `@pankod/refine-nextjs-router` to make it work with the current structure of the `app` directory feature. To make sure these do not break the current support for `pages` directory, we've added a new exports at the sub path `@pankod/refine-nextjs-router/app` that can be used with the `appDir` option.

  **Note**

  To make optional catch-all routes to work with the `app` directory, you need to define them as directories unlike the option of defining them as files with `pages` directory.

  You need to use `NextRouteComponent` from `@pankod/refine-nextjs-router/app` instead of `NextRouteComponent` from `@pankod/refine-nextjs-router` when using `appDir` option.

  Inside your `layout` file, you need to bind `params` to `routerProvider` to make sure `@pankod/refine-nextjs-router` can work properly with the new structure.

  ```tsx
  // app/[[...refine]]/layout.tsx
  "use client";

  import routerProvider from "@pankod/refine-nextjs-router/app";

  const Layout = ({ children, params }) => {
    return (
      <Refine
        routerProvider={routerProvider.apply({ params })}
        /* ... */
      >
        {children}
      </Refine>
    );
  };
  ```

  **Warning**

  Please note that, unlike the `routerProvider` from the `@pankod/refine-nextjs-router`, `routerProvider` from `@pankod/refine-nextjs-router/app` is a function and you need to bind `params` to make it work properly.

  ```tsx
  // app/[[...refine]]/page.tsx

  "use client";

  import { NextRouteComponent } from "@pankod/refine-nextjs-router/app";

  export default NextRouteComponent;
  ```

  **Warning**

  You need to add `"use client";` directive to both `layout.tsx` and `page.tsx` inside `app/[[...refine]]` directory.

  **Warning**

  `checkAuthentication` does not work with `appDir`. We're aiming to release a substitute for it using middleware but for now its not included in this release.

## 4.0.0

### Major Changes

- [#3140](https://github.com/refinedev/refine/pull/3140) [`102bfbf3283`](https://github.com/refinedev/refine/commit/102bfbf32830febe10b99655723863ebd277aadb) Thanks [@aliemir](https://github.com/aliemir)! - - Bumped Next.js to 13

  - Added support for experimental `appDir` option in `next.config.js` to allow for the latest Next.js features.

  ## `pages` directory

  Current support for `pages` directory has not changed and will continue to work as before. It will be supported as long as `Next.js` continues to support and prompts it as the stable way of working with `Next.js`.

  ## `appDir` option

  `appDir` option is a new experimental feature in `Next.js` that introduces a bunch of new features. It is currently in beta and is not stable. It is not recommended to use it in production. But can be used alongside the current `pages` directory support.

  To use `appDir` option, you need to add it to your `next.config.js` file.

  ```js
  // next.config.js
  module.exports = {
    /* ... */
    experimental: {
      appDir: true,
    },
  };
  ```

  ## Using `appDir` with **refine**

  We've needed to make some changes to the `@pankod/refine-nextjs-router` to make it work with the current structure of the `app` directory feature. To make sure these do not break the current support for `pages` directory, we've added a new exports at the sub path `@pankod/refine-nextjs-router/app` that can be used with the `appDir` option.

  **Note**

  To make optional catch-all routes to work with the `app` directory, you need to define them as directories unlike the option of defining them as files with `pages` directory.

  You need to use `NextRouteComponent` from `@pankod/refine-nextjs-router/app` instead of `NextRouteComponent` from `@pankod/refine-nextjs-router` when using `appDir` option.

  Inside your `layout` file, you need to bind `params` to `routerProvider` to make sure `@pankod/refine-nextjs-router` can work properly with the new structure.

  ```tsx
  // app/[[...refine]]/layout.tsx
  "use client";

  import routerProvider from "@pankod/refine-nextjs-router/app";

  const Layout = ({ children, params }) => {
    return (
      <Refine
        routerProvider={routerProvider.apply({ params })}
        /* ... */
      >
        {children}
      </Refine>
    );
  };
  ```

  **Warning**

  Please note that, unlike the `routerProvider` from the `@pankod/refine-nextjs-router`, `routerProvider` from `@pankod/refine-nextjs-router/app` is a function and you need to bind `params` to make it work properly.

  ```tsx
  // app/[[...refine]]/page.tsx

  "use client";

  import { NextRouteComponent } from "@pankod/refine-nextjs-router/app";

  export default NextRouteComponent;
  ```

  **Warning**

  You need to add `"use client";` directive to both `layout.tsx` and `page.tsx` inside `app/[[...refine]]` directory.

  **Warning**

  `checkAuthentication` does not work with `appDir`. We're aiming to release a substitute for it using middleware but for now its not included in this release.

## 3.38.0

### Minor Changes

- Added `handleRefineParams` helper function to handle catch-all refine params.

- Added ability to parse catch-all refine route in Next.js router. This way, instead of creating multiple pages, users can only create one page at the root `[[...refine]].tsx` and handle all params for the app.

- Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `NextRouteComponent` component.

## 3.37.0

### Minor Changes

- Added `handleRefineParams` helper function to handle catch-all refine params.

- Added ability to parse catch-all refine route in Next.js router. This way, instead of creating multiple pages, users can only create one page at the root `[[...refine]].tsx` and handle all params for the app.

- Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `NextRouteComponent` component.

## 3.36.0

### Minor Changes

- [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added `handleRefineParams` helper function to handle catch-all refine params.

- [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to parse catch-all refine route in Next.js router. This way, instead of creating multiple pages, users can only create one page at the root `[[...refine]].tsx` and handle all params for the app.

- [#2486](https://github.com/refinedev/refine/pull/2486) [`ee4d0d112a`](https://github.com/refinedev/refine/commit/ee4d0d112a7742fc799cd11ffe2eb3c5165d7bcb) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to manage the initial route of **refine** by binding `initialRoute` variable to `NextRouteComponent` component.

## 3.35.0

### Minor Changes

- Add `initialData` support to `DashboardPage` for `@pankod/refine-nextjs-router`.

## 3.34.0

### Minor Changes

- [#2142](https://github.com/refinedev/refine/pull/2142) [`dd00de215a`](https://github.com/refinedev/refine/commit/dd00de215a869a11076a539227de9dc1de731a55) Thanks [@ozkalai](https://github.com/ozkalai)! - Add `initialData` support to `DashboardPage` for `@pankod/refine-nextjs-router`.

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

## 3.26.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.6

### Patch Changes

- Created a wrapper `<Link>` component for handling `href` and `to` props. When using `to` the wrapper will pass it to the `href` prop.

- Updated dependencies []:
  - @pankod/refine-core@3.36.0

## 3.25.5

### Patch Changes

- [#2061](https://github.com/refinedev/refine/pull/2061) [`0237725cf3`](https://github.com/refinedev/refine/commit/0237725cf32923f7d24d3f0c9a2994de30baa921) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Created a wrapper `<Link>` component for handling `href` and `to` props. When using `to` the wrapper will pass it to the `href` prop.

- Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
  - @pankod/refine-core@3.35.0

## 3.25.4

### Patch Changes

- Add `legacyBehavior: false` to `<Link/>` component to migrate to the new Next.js Link behavior. [next.js#36436](https://github.com/vercel/next.js/pull/36436)

- Updated dependencies []:
  - @pankod/refine-core@3.34.0

## 3.25.3

### Patch Changes

- [#2021](https://github.com/refinedev/refine/pull/2021) [`a0a895cae4`](https://github.com/refinedev/refine/commit/a0a895cae42161cca0b78831f30bcc95ead0740a) Thanks [@aliemir](https://github.com/aliemir)! - Add `legacyBehavior: false` to `<Link/>` component to migrate to the new Next.js Link behavior. [next.js#36436](https://github.com/vercel/next.js/pull/36436)

- Updated dependencies [[`d96ba1e9c8`](https://github.com/refinedev/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d), [`b257d87fef`](https://github.com/refinedev/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184), [`12f08ae6a3`](https://github.com/refinedev/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58)]:
  - @pankod/refine-core@3.33.0

## 3.25.2

### Patch Changes

- We've updated Next.js version to `12.1.6`

## 3.25.1

### Patch Changes

- [#1951](https://github.com/refinedev/refine/pull/1951) [`cc5f9ae78a`](https://github.com/refinedev/refine/commit/cc5f9ae78a13e5fd89f226bf38290678cc73e422) Thanks [@omeraplak](https://github.com/omeraplak)! - We've updated Next.js version to `12.1.6`

## 3.22.2

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
