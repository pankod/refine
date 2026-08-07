# @refinedev/devtools-server

## 2.0.2

### Patch Changes

- [#7248](https://github.com/refinedev/refine/pull/7248) [`a851672404703243df7ea150d0f918f002d1571d`](https://github.com/refinedev/refine/commit/a851672404703243df7ea150d0f918f002d1571d) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - feat: make devtools publicly accessible without authentication

  DevTools no longer requires authentication to use. Removed Ory client integration,
  login/logout/onboarding flows, project ID management, and related API endpoints.
  Users can now access DevTools directly without signing in.

- Updated dependencies [[`a851672404703243df7ea150d0f918f002d1571d`](https://github.com/refinedev/refine/commit/a851672404703243df7ea150d0f918f002d1571d)]:
  - @refinedev/devtools-shared@2.0.2

## 2.0.1

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

- Updated dependencies [[`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3)]:
  - @refinedev/devtools-shared@2.0.1

## 2.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: update DevTools for Refine 5 compatibility

  - Updated DevTools packages to work with TanStack Query v5 and Refine 5.
  - Internal API updates and compatibility improvements for the new architecture.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/devtools-shared@2.0.0

## 1.1.42

### Patch Changes

📢 **Refine Community Release** 📢

- chore: vite upgraded to 5.4.15 for security patches
  https://github.com/refinedev/refine/security/dependabot/295
  https://github.com/refinedev/refine/security/dependabot/352
  https://github.com/refinedev/refine/security/dependabot/261

## 1.1.41

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6726](https://github.com/refinedev/refine/pull/6726) [`274fa2c92afdf4e5b9ee8ba057861bf9fb39cab5`](https://github.com/refinedev/refine/commit/274fa2c92afdf4e5b9ee8ba057861bf9fb39cab5) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: vite upgraded to 5.4.15 for security patches
  https://github.com/refinedev/refine/security/dependabot/295
  https://github.com/refinedev/refine/security/dependabot/352
  https://github.com/refinedev/refine/security/dependabot/261

## 1.1.40

### Patch Changes

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

- Updated dependencies []:
  - @refinedev/devtools-shared@1.1.14

## 1.1.39

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

- Updated dependencies [[`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53)]:
  - @refinedev/devtools-shared@1.1.13

## 1.1.38

### Patch Changes

- [`6f2c1c22112a19ba89a9298469158d4da6096aa8`](https://github.com/refinedev/refine/commit/6f2c1c22112a19ba89a9298469158d4da6096aa8) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update master references to main

## 1.1.37

### Patch Changes

- [#6354](https://github.com/refinedev/refine/pull/6354) [`da9da4ed1a9700c7a48db6520d683168c48b226e`](https://github.com/refinedev/refine/commit/da9da4ed1a9700c7a48db6520d683168c48b226e) Thanks [@arndom](https://github.com/arndom)! - chore: bump express version to latest

  Bump `express` dependecy to `^4.21.0` to fix vulnerability in `serve-static`.

  [Resolves #6321](https://github.com/refinedev/refine/issues/6321)

## 1.1.36

### Patch Changes

- [#6253](https://github.com/refinedev/refine/pull/6253) [`6963e591f8f307aee9362d5dfff99972eb64bf03`](https://github.com/refinedev/refine/commit/6963e591f8f307aee9362d5dfff99972eb64bf03) Thanks [@aliemir](https://github.com/aliemir)! - chore(devtools-server): replace `preferred-pm` with `package-manager-detector` #6242

  `preferred-pm` has 24 dependencies: https://npmgraph.js.org/?q=preferred-pm
  `package-manager-detector` has no dependencies: https://npmgraph.js.org/?q=package-manager-detector

## 1.1.35

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

- Updated dependencies [[`603c73eb7d376fc2357a577f5921f844a8f444e4`](https://github.com/refinedev/refine/commit/603c73eb7d376fc2357a577f5921f844a8f444e4)]:
  - @refinedev/devtools-shared@1.1.12

## 1.1.34

### Patch Changes

- [#6098](https://github.com/refinedev/refine/pull/6098) [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a) Thanks [@aliemir](https://github.com/aliemir)! - refactor(devtools): updated flow for login callbacks

  Previously, when the login flow had an error, the Devtools UI was displaying it in the secondary window, which was not user-friendly and lead to multiple clients to connect unnecessarily. This change updates the flow to display the error message in the main Devtools window.

- [#6098](https://github.com/refinedev/refine/pull/6098) [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a) Thanks [@aliemir](https://github.com/aliemir)! - refactor(devtools): updated auth flow

  Previously, a proxy in the Devtools Server was used as an auth server to handle sign-ins in the localhost (Devtools Server). This change updates the flow and moves the authentication flow to `https://auth.refine.dev` to handle sign-ins and sign-outs. Now the Devtools Server is only responsible for the connection between the auth server and the user interface while also managing the user's session.

- [#6098](https://github.com/refinedev/refine/pull/6098) [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a) Thanks [@aliemir](https://github.com/aliemir)! - refactor(devtools-server): handle project id without polluting user console

  When project ID is missing in the project, Devtools Server was returning with `400` and `404` status codes, which leads to unwanted logs in the user console. To avoid this, the server now returns a `200` status code with an error message in the response body. This change is accompanied by a new error handler in the `@refinedev/devtools-ui` package to handle the error message and display it in the user interface.

- [#6052](https://github.com/refinedev/refine/pull/6052) [`50d21076928ca738ec54cc5bcd17fad2683653dd`](https://github.com/refinedev/refine/commit/50d21076928ca738ec54cc5bcd17fad2683653dd) Thanks [@aliemir](https://github.com/aliemir)! - fix(devtools-server): lodash import from root

  `@refinedev/devtools-server` was using `lodash` imports from root which are interpreted as CJS imports in the ESM bundle. To avoid any future issues, lodash imports have been replaced with subdirectory imports.

- Updated dependencies [[`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a), [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a)]:
  - @refinedev/devtools-shared@1.1.11

## 1.1.32

### Patch Changes

- [#6059](https://github.com/refinedev/refine/pull/6059) [`ad42665ad9ccb07f6090da353377d016b67acdd0`](https://github.com/refinedev/refine/commit/ad42665ad9ccb07f6090da353377d016b67acdd0) Thanks [@aliemir](https://github.com/aliemir)! - fix(devtools-server): missing header check on auth requests

  Devtools was failing to determine the auth status and always end up redirecting to the login page regardless of the actual auth status. This was due to the missing check on the auth request that was causing all valid responses treated as unauthenticated.

  Resolves [#6047](https://github.com/refinedev/refine/issues/6047)

## 1.1.31

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: capitalize Refine

  Capitalized "Refine" in the user-facing texts

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - refactor: use same port for ws and http servers

  This PR merges WebSocket and Http server ports into one (5001) to simplify the configuration and avoid port conflicts. Previously the WebSocket server was running on port 5002 and the Http server on port 5001. Now both servers are running on port 5001.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore(devtools-server): customizable exit function

  This change allows you to customize the exit function of the devtools server when using it via API.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: remove annoying auth error at initial project loads

  When users create a new project or their devtools token expires, their console is polluted with network errors due to missing authentication. This PR removes these errors by handling auth requests in a user-friendly way.

- Updated dependencies [[`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046)]:
  - @refinedev/devtools-shared@1.1.9

## 1.1.30

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`429009db854653ab3ca00fbfb84561de38b3a255`](https://github.com/refinedev/refine/commit/429009db854653ab3ca00fbfb84561de38b3a255) Thanks [@aliemir](https://github.com/aliemir)! - fix: capitalize Refine

  Capitalized "Refine" in the user-facing texts

- [#5945](https://github.com/refinedev/refine/pull/5945) [`6c22ece19f44ca2b99ad70543f9ee40b4b139863`](https://github.com/refinedev/refine/commit/6c22ece19f44ca2b99ad70543f9ee40b4b139863) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use same port for ws and http servers

  This PR merges WebSocket and Http server ports into one (5001) to simplify the configuration and avoid port conflicts. Previously the WebSocket server was running on port 5002 and the Http server on port 5001. Now both servers are running on port 5001.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`6c22ece19f44ca2b99ad70543f9ee40b4b139863`](https://github.com/refinedev/refine/commit/6c22ece19f44ca2b99ad70543f9ee40b4b139863) Thanks [@aliemir](https://github.com/aliemir)! - chore(devtools-server): customizable exit function

  This change allows you to customize the exit function of the devtools server when using it via API.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- [#5945](https://github.com/refinedev/refine/pull/5945) [`bb89dc34bf6ef061d0bcdcf0cb3173fe7014ae5e`](https://github.com/refinedev/refine/commit/bb89dc34bf6ef061d0bcdcf0cb3173fe7014ae5e) Thanks [@aliemir](https://github.com/aliemir)! - fix: remove annoying auth error at initial project loads

  When users create a new project or their devtools token expires, their console is polluted with network errors due to missing authentication. This PR removes these errors by handling auth requests in a user-friendly way.

- Updated dependencies [[`bb89dc34bf6ef061d0bcdcf0cb3173fe7014ae5e`](https://github.com/refinedev/refine/commit/bb89dc34bf6ef061d0bcdcf0cb3173fe7014ae5e), [`6c22ece19f44ca2b99ad70543f9ee40b4b139863`](https://github.com/refinedev/refine/commit/6c22ece19f44ca2b99ad70543f9ee40b4b139863), [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d)]:
  - @refinedev/devtools-shared@1.1.8

## 1.1.29

### Patch Changes

- Updated dependencies [[`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d)]:
  - @refinedev/devtools-shared@1.1.7

## 1.1.28

### Patch Changes

- [#5875](https://github.com/refinedev/refine/pull/5875) [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf) Thanks [@aliemir](https://github.com/aliemir)! - chore: move `@refinedev/devtools-ui` dependency

  Moved `@refinedev/devtools-ui` dependency to `devDependencies` since only the `vite` output is used in the server.

- [#5875](https://github.com/refinedev/refine/pull/5875) [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf) Thanks [@aliemir](https://github.com/aliemir)! - feat: update resource name accessing logic

  Updated resource name displaying logic to use `resourceName` from activity records to make sure `resource` is correctly displayed with custom query keys.

- [#5875](https://github.com/refinedev/refine/pull/5875) [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf) Thanks [@aliemir](https://github.com/aliemir)! - feat: add invalidate query button

  Added `Invalidate Query` button to settled queries in the devtools panel to allow users to manually invalidate queries for debugging purposes.

- [#5865](https://github.com/refinedev/refine/pull/5865) [`a9dbd808782`](https://github.com/refinedev/refine/commit/a9dbd808782212ed0bf6cf4401f85b675975a744) Thanks [@aliemir](https://github.com/aliemir)! - fix: devtools authentication not working with safari

  Fixed the authentication flow and cookie handling for Safari. Now devtools users will be able to authenticate and use the devtools server using Safari.

  Resolves [#5753](https://github.com/refinedev/refine/issues/5753)

- Updated dependencies [[`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f)]:
  - @refinedev/devtools-shared@1.1.6

## 1.1.27

### Patch Changes

- [#5823](https://github.com/refinedev/refine/pull/5823) [`aedc6a2961c`](https://github.com/refinedev/refine/commit/aedc6a2961cfe69309d4e14292147a858f94e3bf) Thanks [@aliemir](https://github.com/aliemir)! - fix: broken lodash imports in ESM builds

  Fixed lodash imports in ESM builds which requires `lodash-es` imports to use `.js` extension to work properly unless the bundler is configured to handle non-fully-specified imports.

  Resolves [#5822](https://github.com/refinedev/refine/issues/5822)

- Updated dependencies [[`aedc6a2961c`](https://github.com/refinedev/refine/commit/aedc6a2961cfe69309d4e14292147a858f94e3bf)]:
  - @refinedev/devtools-ui@1.1.20

## 1.1.26

### Patch Changes

- [#5807](https://github.com/refinedev/refine/pull/5807) [`b20a18e4dfc`](https://github.com/refinedev/refine/commit/b20a18e4dfc97481be865a2a012ea1c588bd76c6) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update jscodeshift version to 0.15.2

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5749](https://github.com/refinedev/refine/pull/5749) [`51f368eab1a`](https://github.com/refinedev/refine/commit/51f368eab1a72e2134981e999dc0b3e26e2b74e8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: Vite upgraded to [v5.x.x](https://vitejs.dev/guide/migration). #5749

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- Updated dependencies [[`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927)]:
  - @refinedev/devtools-shared@1.1.5
  - @refinedev/devtools-ui@1.1.19

## 1.1.25

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

- Updated dependencies [[`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f)]:
  - @refinedev/devtools-shared@1.1.4
  - @refinedev/devtools-ui@1.1.18

## 1.1.24

### Patch Changes

- Updated dependencies [[`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563)]:
  - @refinedev/devtools-shared@1.1.3
  - @refinedev/devtools-ui@1.1.17

## 1.1.23

### Patch Changes

- [#5574](https://github.com/refinedev/refine/pull/5574) [`ee0f7867c3`](https://github.com/refinedev/refine/commit/ee0f7867c3648dcbf1e2504f430a0b5814d91019) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: upgrade @ory/client package version to 1.5.2 #5530

- Updated dependencies [[`ee0f7867c3`](https://github.com/refinedev/refine/commit/ee0f7867c3648dcbf1e2504f430a0b5814d91019)]:
  - @refinedev/devtools-ui@1.1.16

## 1.1.22

### Patch Changes

- [#5296](https://github.com/refinedev/refine/pull/5296) [`1b031a2c19`](https://github.com/refinedev/refine/commit/1b031a2c19126ec1c01a85ecfbc794dc82480776) Thanks [@aliemir](https://github.com/aliemir)! - Added error conditions on WS and HTTP servers to prevent crashing if ports are already in use. (Issue: #5215, #5294)

- Updated dependencies [[`00ac812347`](https://github.com/refinedev/refine/commit/00ac8123475748875df513a829684002677b5f43)]:
  - @refinedev/devtools-ui@1.1.15

## 1.1.21

### Patch Changes

- Updated dependencies [[`e29a3d37064`](https://github.com/refinedev/refine/commit/e29a3d37064500710dfa588ed5ca9074b93512c5)]:
  - @refinedev/devtools-ui@1.1.14

## 1.1.20

### Patch Changes

- [#5208](https://github.com/refinedev/refine/pull/5208) [`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update feed URL from next to master branch.

- Updated dependencies [[`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88)]:
  - @refinedev/devtools-ui@1.1.13

## 1.1.19

### Patch Changes

- Updated dependencies [[`be899901d0e`](https://github.com/refinedev/refine/commit/be899901d0ed7f9a336ab737b0b8a699f2e58ed3)]:
  - @refinedev/devtools-ui@1.1.12

## 1.1.18

### Patch Changes

- Updated dependencies [[`be899901d0e`](https://github.com/refinedev/refine/commit/be899901d0ed7f9a336ab737b0b8a699f2e58ed3)]:
  - @refinedev/devtools-ui@1.1.11

## 1.1.17

### Patch Changes

- [#5149](https://github.com/refinedev/refine/pull/5149) [`2bd813f62bf`](https://github.com/refinedev/refine/commit/2bd813f62bf55eb1be55ffe5b2c1c7079d7a93f0) Thanks [@aliemir](https://github.com/aliemir)! - Add ability to force fetching the installed package versions

- [#5148](https://github.com/refinedev/refine/pull/5148) [`38f2a9b2e71`](https://github.com/refinedev/refine/commit/38f2a9b2e7149ad3d5e5c2780e05ddde0285ac3c) Thanks [@aliemir](https://github.com/aliemir)! - Use `node-fetch` to make feed requests to ensure older versions of Node.js are supported.

- Updated dependencies [[`2bd813f62bf`](https://github.com/refinedev/refine/commit/2bd813f62bf55eb1be55ffe5b2c1c7079d7a93f0)]:
  - @refinedev/devtools-ui@1.1.10

## 1.1.16

### Patch Changes

- [#5149](https://github.com/refinedev/refine/pull/5149) [`2bd813f62bf`](https://github.com/refinedev/refine/commit/2bd813f62bf55eb1be55ffe5b2c1c7079d7a93f0) Thanks [@aliemir](https://github.com/aliemir)! - Add ability to force fetching the installed package versions

- [#5148](https://github.com/refinedev/refine/pull/5148) [`38f2a9b2e71`](https://github.com/refinedev/refine/commit/38f2a9b2e7149ad3d5e5c2780e05ddde0285ac3c) Thanks [@aliemir](https://github.com/aliemir)! - Use `node-fetch` to make feed requests to ensure older versions of Node.js are supported.

- Updated dependencies [[`2bd813f62bf`](https://github.com/refinedev/refine/commit/2bd813f62bf55eb1be55ffe5b2c1c7079d7a93f0)]:
  - @refinedev/devtools-ui@1.1.9

## 1.1.15

### Patch Changes

- [#5144](https://github.com/refinedev/refine/pull/5144) [`be419eb31bc`](https://github.com/refinedev/refine/commit/be419eb31bc7b7a3934f39bcfcbaaa0b9db60be8) Thanks [@aliemir](https://github.com/aliemir)! - Updated auth flows and auth management to cover wider use cases.

## 1.1.14

### Patch Changes

- [#5144](https://github.com/refinedev/refine/pull/5144) [`be419eb31bc`](https://github.com/refinedev/refine/commit/be419eb31bc7b7a3934f39bcfcbaaa0b9db60be8) Thanks [@aliemir](https://github.com/aliemir)! - Updated auth flows and auth management to cover wider use cases.

## 1.1.13

### Patch Changes

- [#5140](https://github.com/refinedev/refine/pull/5140) [`78117485899`](https://github.com/refinedev/refine/commit/781174858992bb1d077069d2858a37b44344879e) Thanks [@aliemir](https://github.com/aliemir)! - Updated the devtools running log on terminal to a less attractive one.

## 1.1.12

### Patch Changes

- [#5140](https://github.com/refinedev/refine/pull/5140) [`78117485899`](https://github.com/refinedev/refine/commit/781174858992bb1d077069d2858a37b44344879e) Thanks [@aliemir](https://github.com/aliemir)! - Updated the devtools running log on terminal to a less attractive one.

## 1.1.11

### Patch Changes

- [#5082](https://github.com/refinedev/refine/pull/5082) [`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d) Thanks [@aliemir](https://github.com/aliemir)! - Add `/open-in-editor/*` endpoint to server for opening files in vscode

- Updated dependencies [[`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d)]:
  - @refinedev/devtools-ui@1.1.8

## 1.1.10

### Patch Changes

- [#5082](https://github.com/refinedev/refine/pull/5082) [`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d) Thanks [@aliemir](https://github.com/aliemir)! - Add `/open-in-editor/*` endpoint to server for opening files in vscode

- Updated dependencies [[`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d)]:
  - @refinedev/devtools-ui@1.1.7

## 1.1.9

### Patch Changes

- [#26](https://github.com/TheRakeshPurohit/refine/pull/26) [`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17) Thanks [@pull](https://github.com/apps/pull)! - Fixed the issue with conflicting devtools port when `PORT` environment variable is set.

## 1.1.8

### Patch Changes

- [#5056](https://github.com/refinedev/refine/pull/5056) [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with conflicting devtools port when `PORT` environment variable is set.

## 1.1.7

### Patch Changes

- [#5056](https://github.com/refinedev/refine/pull/5056) [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with conflicting devtools port when `PORT` environment variable is set.

## 1.1.6

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

- [#5020](https://github.com/refinedev/refine/pull/5020) [`20f5b6128d4`](https://github.com/refinedev/refine/commit/20f5b6128d4ae85904b9b0e2845c1bb2dcae1a44) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with the anchor tags in devtools feeds not opening in a new tab.

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b), [`20f5b6128d4`](https://github.com/refinedev/refine/commit/20f5b6128d4ae85904b9b0e2845c1bb2dcae1a44)]:
  - @refinedev/devtools-shared@1.1.2
  - @refinedev/devtools-ui@1.1.6

## 1.1.5

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

- [#5020](https://github.com/refinedev/refine/pull/5020) [`20f5b6128d4`](https://github.com/refinedev/refine/commit/20f5b6128d4ae85904b9b0e2845c1bb2dcae1a44) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue with the anchor tags in devtools feeds not opening in a new tab.

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b), [`20f5b6128d4`](https://github.com/refinedev/refine/commit/20f5b6128d4ae85904b9b0e2845c1bb2dcae1a44)]:
  - @refinedev/devtools-shared@1.1.1
  - @refinedev/devtools-ui@1.1.5

## 1.1.4

### Patch Changes

- [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixing the versions of `@refinedev/devtools-ui` and `@refinedev/devtools-shared` dependencies to avoid breaking projects in mismatching releases.

- Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
  - @refinedev/devtools-ui@1.1.4

## 1.1.3

### Patch Changes

- [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixing the versions of `@refinedev/devtools-ui` and `@refinedev/devtools-shared` dependencies to avoid breaking projects in mismatching releases.

- Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
  - @refinedev/devtools-ui@1.1.3

## 1.1.2

### Patch Changes

- [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Add Project ID warning and auto-fix action for broken projects

- [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed package descriptions and usage instructions

- Updated dependencies [[`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082), [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082)]:
  - @refinedev/devtools-ui@1.1.2

## 1.1.1

### Patch Changes

- [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Add Project ID warning and auto-fix action for broken projects

- [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed package descriptions and usage instructions

- Updated dependencies [[`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082), [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082)]:
  - @refinedev/devtools-ui@1.1.1

![refine devtools](https://github.com/refinedev/refine/assets/1110414/15ed6907-d0c8-4213-9024-2f6b0a09968f)

## 1.0.2

### Patch Changes

- [#4976](https://github.com/refinedev/refine/pull/4976) [`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@refinedev/devtools-ui`

- Updated dependencies [[`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb), [`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb)]:
  - @refinedev/devtools-ui@1.0.2

## 1.0.1

### Patch Changes

- [#4968](https://github.com/refinedev/refine/pull/4968) [`246b3cb6a00`](https://github.com/refinedev/refine/commit/246b3cb6a0000a5b70557d31940cb69113e0397b) Thanks [@aliemir](https://github.com/aliemir)! - Fix feed content url with main github branch

- Updated dependencies [[`246b3cb6a00`](https://github.com/refinedev/refine/commit/246b3cb6a0000a5b70557d31940cb69113e0397b)]:
  - @refinedev/devtools-ui@1.0.1

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

### Patch Changes

- Updated dependencies [[`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3)]:
  - @refinedev/devtools-shared@1.0.0
  - @refinedev/devtools-ui@1.0.0
