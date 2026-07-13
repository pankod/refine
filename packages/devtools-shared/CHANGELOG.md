# @refinedev/devtools-shared

## 2.0.2

### Patch Changes

- [#7248](https://github.com/refinedev/refine/pull/7248) [`a851672404703243df7ea150d0f918f002d1571d`](https://github.com/refinedev/refine/commit/a851672404703243df7ea150d0f918f002d1571d) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - feat: make devtools publicly accessible without authentication

  DevTools no longer requires authentication to use. Removed Ory client integration,
  login/logout/onboarding flows, project ID management, and related API endpoints.
  Users can now access DevTools directly without signing in.

## 2.0.1

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 2.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: update DevTools for Refine 5 compatibility

  - Updated DevTools packages to work with TanStack Query v5 and Refine 5.
  - Internal API updates and compatibility improvements for the new architecture.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

## 1.1.14

### Patch Changes

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 1.1.13

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 1.1.12

### Patch Changes

- [#6185](https://github.com/refinedev/refine/pull/6185) [`603c73eb7d376fc2357a577f5921f844a8f444e4`](https://github.com/refinedev/refine/commit/603c73eb7d376fc2357a577f5921f844a8f444e4) Thanks [@aliemir](https://github.com/aliemir)! - feat(devtools): ability to change the port of the devtools server

  Now users can change the port of the devtools server by setting the `REFINE_DEVTOOLS_PORT` environment variable. Previously, the port was hardcoded to "5001" and could not be changed.

  If you're using `@refinedev/cli`'s runner commands to start your development server, `REFINE_DEVTOOLS_PORT` will be propagated to your app with appropriate prefix. E.g. if you're using Vite, the environment variable will be `VITE_REFINE_DEVTOOLS_PORT` and it will be used by the `@refinedev/devtools`'s `<DevtoolsProvider />` component to connect to the devtools server.

  - In Next.js apps, it will be prefixed with `NEXT_PUBLIC_`
  - In Craco and Create React App apps, it will be prefixed with `REACT_APP_`
  - In Remix apps and other custom setups, the environment variable will be used as is.

  In some scenarios where the environment variables are not passed to the browser, you may need to manually set the Refine Devtools URL in the `<DevtoolsProvider />` component via the `url` prop. Remix apps do not automatically pass environment variables to the browser, so you will need to set the URL manually. If not set, the default URL will be used.

  While the port can be changed, this feature also allows users to host the devtools server on a different machine or domain and provide the `<DevtoolsProvider />` with the custom domain URL. This such case will be useful if you're dockerizing your app and devtools server separately.

  **Enterprise Edition**: Refine Devtools running on ports other than "5001" is only available in the Enterprise Edition. If you're using the Community Edition, Refine Devtools will not work if the port is changed.

  [Resolves #5111](https://github.com/refinedev/refine/issues/5111)

## 1.1.11

### Patch Changes

- [#6098](https://github.com/refinedev/refine/pull/6098) [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a) Thanks [@aliemir](https://github.com/aliemir)! - chore(devtools-shared): add login callback events

  Added new events to handle login errors on the main devtools window rather than external windows. This change is accompanied by new event handlers in the `@refinedev/devtools-ui` and `@refinedev/devtools-server` packages.

- [#6098](https://github.com/refinedev/refine/pull/6098) [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a) Thanks [@aliemir](https://github.com/aliemir)! - chore(devtools): update devtools url fallback values

  Updated fallback values for the Devtools URL and use single fallback value until its provided by the `@refinedev/devtools-server` when client is connected.

## 1.1.9

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: prevent websocket closing errors in console

  When `<DevtoolsProvider />` component is mounted in apps with React's strict mode, it will try to initialize the websocket connection twice and first one will be closed immediately before the connection is established. This PR will delay closing the websocket connection until it's established properly to prevent these errors from appearing in the console.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - refactor: use same port for ws and http servers

  This PR merges WebSocket and Http server ports into one (5001) to simplify the configuration and avoid port conflicts. Previously the WebSocket server was running on port 5002 and the Http server on port 5001. Now both servers are running on port 5001.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 1.1.8

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`bb89dc34bf6ef061d0bcdcf0cb3173fe7014ae5e`](https://github.com/refinedev/refine/commit/bb89dc34bf6ef061d0bcdcf0cb3173fe7014ae5e) Thanks [@aliemir](https://github.com/aliemir)! - chore: prevent websocket closing errors in console

  When `<DevtoolsProvider />` component is mounted in apps with React's strict mode, it will try to initialize the websocket connection twice and first one will be closed immediately before the connection is established. This PR will delay closing the websocket connection until it's established properly to prevent these errors from appearing in the console.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`6c22ece19f44ca2b99ad70543f9ee40b4b139863`](https://github.com/refinedev/refine/commit/6c22ece19f44ca2b99ad70543f9ee40b4b139863) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use same port for ws and http servers

  This PR merges WebSocket and Http server ports into one (5001) to simplify the configuration and avoid port conflicts. Previously the WebSocket server was running on port 5002 and the Http server on port 5001. Now both servers are running on port 5001.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 1.1.7

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 1.1.6

### Patch Changes

- [#5875](https://github.com/refinedev/refine/pull/5875) [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf) Thanks [@aliemir](https://github.com/aliemir)! - feat: update resource name accessing logic

  Updated resource name displaying logic to use `resourceName` from activity records to make sure `resource` is correctly displayed with custom query keys.

- [#5875](https://github.com/refinedev/refine/pull/5875) [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf) Thanks [@aliemir](https://github.com/aliemir)! - feat: add invalidate query button

  Added `Invalidate Query` button to settled queries in the devtools panel to allow users to manually invalidate queries for debugging purposes.

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 1.1.5

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 1.1.4

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 1.1.3

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

## 1.1.2

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 1.1.1

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

![refine devtools](https://github.com/refinedev/refine/assets/1110414/15ed6907-d0c8-4213-9024-2f6b0a09968f)

## 1.0.0

### Major Changes

- [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Initial beta release of refine devtools.🎉

  We're releasing refine devtools in beta. refine devtools is designed to help you debug and develop your refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating refine packages from the UI and more. 🤯

  ## Usage

  Install the dependencies using your package manager.

  ```bash
  npm i @refinedev/devtools@next @refinedev/cli@next @refinedev/core@next
  ```

  Add `<DevtoolsProvider />` and `<DevtoolsPanel />` components to your app:

  You'll need to wrap your app with `<DevtoolsProvider />` component and add `<DevtoolsPanel />` component to your app to access the devtools UI.

  ```tsx
  import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

  const App = () => {
    return (
      <DevtoolsProvider>
        <Refine
        // ...
        >
          {/* ... */}
        </Refine>
        <DevtoolsPanel />
      </DevtoolsProvider>
    );
  };
  ```

  Then you're good to go 🙌, `<DevtoolsProvider />` will tell refine to connect to the devtools server and track your queries and mutations. `<DevtoolsPanel />` will render the devtools UI in your app.

  note: Devtools only works in development mode and have no overhead on production builds. You don't need to do anything special to exclude DevTools from your bundle.

  Devtools is integrated with `@refinedev/cli` and it will be started automatically in development mode if you have `@refinedev/devtools` installed.

  If you want to start devtools manually or have a custom dev script, you can run `refine devtools` in your project directory or add the following scripts to your `package.json`:

  ```js
  {
      "scripts": {
          // If you have not customized the start script.
          "start": "refine dev", // The devtools server runs automatically; you don't need to do anything.

          // If you have customized the start script.
          "start": "my-custom-dev-script & refine devtools" // Run the devtools server manually.

          // other scripts
      }
  }
  ```

  If you don't have `@refinedev/cli` installed already, you can follow the [installation guide](https://refine.dev/docs/packages/cli/#how-to-add-to-an-existing-project) to add it to your project.

  These commands will start the devtools server. If you want to access the devtools UI outside of your app without depending on the `<DevtoolsPanel />` component, you can go to `http://localhost:5001` in your browser. 🚀
