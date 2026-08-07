# @refinedev/ui-tests

## 2.0.1

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

- Updated dependencies [[`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3)]:
  - @refinedev/ui-types@2.0.1
  - @refinedev/core@5.0.5

## 2.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade UI test utilities for Refine 5.0

  - Updated test utilities for Refine 5.0 and TanStack Query v5 compatibility.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98), [`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/ui-types@2.0.0
  - @refinedev/core@5.0.0

## 1.15.1

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

📢 **Refine Community Release** 📢

- feat: added `minItems` prop to specify the minimum number of items required for rendering breadcrumbs. #6497

  Resolves [#6497](https://github.com/refinedev/refine/issues/6497)

- Updated dependencies []:
  - @refinedev/core@4.57.1
  - @refinedev/ui-types@1.23.1

## 1.15.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6503](https://github.com/refinedev/refine/pull/6503) [`29d00f8dc49485e0f5c42d208417e158118d11f2`](https://github.com/refinedev/refine/commit/29d00f8dc49485e0f5c42d208417e158118d11f2) Thanks [@aress31](https://github.com/aress31)! - feat: added `minItems` prop to specify the minimum number of items required for rendering breadcrumbs. #6497

  Resolves [#6497](https://github.com/refinedev/refine/issues/6497)

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

- Updated dependencies [[`42d730aa2908003cfb0dcf0c57e9b70793c88ddc`](https://github.com/refinedev/refine/commit/42d730aa2908003cfb0dcf0c57e9b70793c88ddc), [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706), [`8309c5690e7c49529f07d288e79896636c6ce7c2`](https://github.com/refinedev/refine/commit/8309c5690e7c49529f07d288e79896636c6ce7c2), [`29d00f8dc49485e0f5c42d208417e158118d11f2`](https://github.com/refinedev/refine/commit/29d00f8dc49485e0f5c42d208417e158118d11f2), [`1d2613381c50f438270d6a3e486595d54496ef92`](https://github.com/refinedev/refine/commit/1d2613381c50f438270d6a3e486595d54496ef92), [`f32af58283bdaf7712805520bd9feb8bfd27ba38`](https://github.com/refinedev/refine/commit/f32af58283bdaf7712805520bd9feb8bfd27ba38)]:
  - @refinedev/core@4.57.0
  - @refinedev/ui-types@1.23.0

## 1.14.9

### Patch Changes

- [#6021](https://github.com/refinedev/refine/pull/6021) [`55cd0662b1e3ff8f8410eba812e80130afe75d14`](https://github.com/refinedev/refine/commit/55cd0662b1e3ff8f8410eba812e80130afe75d14) Thanks [@JayBhensdadia](https://github.com/JayBhensdadia)! - fix: update tests to handle lowercase and camelcased resource names correctly

  This update ensures that resource names are correctly handled in both lowercase and camelcased formats, improving test coverage and accuracy.

  Fixes #6004

- Updated dependencies [[`853bef97ed7baf59e74c98fc54c0ed11624fb491`](https://github.com/refinedev/refine/commit/853bef97ed7baf59e74c98fc54c0ed11624fb491), [`b86648f42cd849a506e4c32d740de26b72681f72`](https://github.com/refinedev/refine/commit/b86648f42cd849a506e4c32d740de26b72681f72), [`4265ae2509f79af9dbca8d52daf5c2f1b4a50a51`](https://github.com/refinedev/refine/commit/4265ae2509f79af9dbca8d52daf5c2f1b4a50a51), [`b516c18b828ba8823561d0fefc4afe02b45ce332`](https://github.com/refinedev/refine/commit/b516c18b828ba8823561d0fefc4afe02b45ce332)]:
  - @refinedev/core@4.53.0

## 1.14.7

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore(ui-tests): add test case for globally passed app title and app icon to title tests

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046)]:
  - @refinedev/core@4.51.0
  - @refinedev/ui-types@1.22.9

## 1.14.6

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`903ea231538b00ce02ddc9394c72848ec1e90772`](https://github.com/refinedev/refine/commit/903ea231538b00ce02ddc9394c72848ec1e90772) Thanks [@aliemir](https://github.com/aliemir)! - chore(ui-tests): add test case for globally passed app title and app icon to title tests

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`a39f1952554120893ea83db904037917fc293dc6`](https://github.com/refinedev/refine/commit/a39f1952554120893ea83db904037917fc293dc6), [`208f77177f9821ee1860ffe031e6b2a9645d1bb6`](https://github.com/refinedev/refine/commit/208f77177f9821ee1860ffe031e6b2a9645d1bb6), [`903ea231538b00ce02ddc9394c72848ec1e90772`](https://github.com/refinedev/refine/commit/903ea231538b00ce02ddc9394c72848ec1e90772), [`84cac61b84ab872394424ebf358eeb380f40121d`](https://github.com/refinedev/refine/commit/84cac61b84ab872394424ebf358eeb380f40121d), [`903ea231538b00ce02ddc9394c72848ec1e90772`](https://github.com/refinedev/refine/commit/903ea231538b00ce02ddc9394c72848ec1e90772), [`4cc74478cbec8caa3023a50ce62f1d5b2f7158a5`](https://github.com/refinedev/refine/commit/4cc74478cbec8caa3023a50ce62f1d5b2f7158a5), [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d)]:
  - @refinedev/core@4.50.0
  - @refinedev/ui-types@1.22.8

## 1.14.5

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

- Updated dependencies [[`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d)]:
  - @refinedev/core@4.49.2
  - @refinedev/ui-types@1.22.7

## 1.14.4

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- Updated dependencies [[`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`0a76576da0f`](https://github.com/refinedev/refine/commit/0a76576da0f18c6db372e737c610ad462b56ff21), [`8d2dd4376f6`](https://github.com/refinedev/refine/commit/8d2dd4376f672786d4722d3dee09e6344f1002e4), [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f), [`9a0c1c8414a`](https://github.com/refinedev/refine/commit/9a0c1c8414a7b228378c234468396e6288cdb6f0)]:
  - @refinedev/core@4.49.1
  - @refinedev/ui-types@1.22.6

## 1.14.3

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- [#5808](https://github.com/refinedev/refine/pull/5808) [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39) Thanks [@aliemir](https://github.com/aliemir)! - chore: updated refresh button tests to be more UI focused and hand off the logic to the `@refinedev/core`'s `useRefreshButton` hook

- [#5755](https://github.com/refinedev/refine/pull/5755) [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect type imports

- Updated dependencies [[`4e8188a6652`](https://github.com/refinedev/refine/commit/4e8188a665209b0d0b77aef27c795a29b9513226), [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39), [`2b5ac6f5409`](https://github.com/refinedev/refine/commit/2b5ac6f5409b7b175c453793224a531e644f6513), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`10ba9c34490`](https://github.com/refinedev/refine/commit/10ba9c344900d0fa4af7120c24b3b007081a4c39), [`38f129f40ee`](https://github.com/refinedev/refine/commit/38f129f40eea109c9b89b23a8fd3f217964330c7), [`f32512b9042`](https://github.com/refinedev/refine/commit/f32512b90427cbb97b28e9d5445dcd343067aa7e)]:
  - @refinedev/core@4.49.0
  - @refinedev/ui-types@1.22.5

## 1.14.2

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

- Updated dependencies [[`fd38d9c71a6`](https://github.com/refinedev/refine/commit/fd38d9c71a6e03d87c5ac97f0dcd52c076bc9599), [`17c39ee2ee0`](https://github.com/refinedev/refine/commit/17c39ee2ee0146e532085761e1e9fcdc60ecb81e), [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f)]:
  - @refinedev/core@4.48.0

## 1.14.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

- Updated dependencies [[`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5)]:
  - @refinedev/ui-types@1.22.4

## 1.14.0

### Minor Changes

- [#5307](https://github.com/refinedev/refine/pull/5307) [`f8e407f850`](https://github.com/refinedev/refine/commit/f8e407f85054bccf1e6ff45c84928bc01db7f5eb) Thanks [@jackprogramsjp](https://github.com/jackprogramsjp)! - feat: added `hideForm` props for `LoginPage` and `RegisterPage` for `AuthPage` feature.

  Now with the `hideForm` props feature, you can be able to hide the forms (like email/password)
  to only show the OAuth providers. This avoids having to make your own entire AuthPage.

### Patch Changes

- [#5325](https://github.com/refinedev/refine/pull/5325) [`7ff54b2060`](https://github.com/refinedev/refine/commit/7ff54b2060b0ce942c4170f744cbdf52d0940434) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `<AuthPage />` styling issues on mobile screens.

  chore: new tests are added to `<AuthPage />`.

- Updated dependencies [[`17aa8c1cd6`](https://github.com/refinedev/refine/commit/17aa8c1cd6858c5a2b0c996c97230047e049bf3b), [`dd8f1270f6`](https://github.com/refinedev/refine/commit/dd8f1270f692d1eec279973e53fcc5a7e650b983), [`4c49ef0a06`](https://github.com/refinedev/refine/commit/4c49ef0a0660c2941c983025a187d45b521aa27c), [`3bdb9cb1cb`](https://github.com/refinedev/refine/commit/3bdb9cb1cb4cdcfaf363e7e9938737ed6f8e634e), [`f8e407f850`](https://github.com/refinedev/refine/commit/f8e407f85054bccf1e6ff45c84928bc01db7f5eb)]:
  - @refinedev/core@4.46.0

## 1.13.3

### Patch Changes

- [#5208](https://github.com/refinedev/refine/pull/5208) [`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update commit frequency branch from next to master on README.

- Updated dependencies [[`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88), [`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88)]:
  - @refinedev/ui-types@1.22.3
  - @refinedev/core@4.44.12

## 1.13.2

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - Remove redundant lodash plugin for esbuild and use the shared plugins instead

- Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea), [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
  - @refinedev/ui-types@1.22.2
  - @refinedev/core@4.38.4

## 1.13.1

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - Remove redundant lodash plugin for esbuild and use the shared plugins instead

- Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea), [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
  - @refinedev/ui-types@1.22.1
  - @refinedev/core@4.38.3

## 1.13.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: Added a new test, "should invalidates when button is clicked" to `buttonRefreshTests`.

### Patch Changes

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82), [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/core@4.34.0
  - @refinedev/ui-types@1.22.0

## 1.12.0

### Minor Changes

- [#4775](https://github.com/refinedev/refine/pull/4775) [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: Added a new test, "should invalidates when button is clicked" to `buttonRefreshTests`.

### Patch Changes

- Updated dependencies [[`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82), [`3052fb22449`](https://github.com/refinedev/refine/commit/3052fb22449c5e35c607e95c060c38ca48e00c82)]:
  - @refinedev/core@4.33.0
  - @refinedev/ui-types@1.21.0

## 1.11.0

### Minor Changes

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `autoSaveIndicatorTests` for `AutoSaveIndicator` component.

### Patch Changes

- Updated dependencies [[`3af99896101`](https://github.com/refinedev/refine/commit/3af99896101bd41a4d2878c4a9f671ca1da36a6f), [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411), [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411), [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be), [`3442f4bd00a`](https://github.com/refinedev/refine/commit/3442f4bd00ad4dbb17dcba08931fdeed3c2b1cb0), [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/core@4.28.0
  - @refinedev/ui-types@1.20.0

## 1.10.0

### Minor Changes

- [#4591](https://github.com/refinedev/refine/pull/4591) [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `autoSaveIndicatorTests` for `AutoSaveIndicator` component.

### Patch Changes

- Updated dependencies [[`3af99896101`](https://github.com/refinedev/refine/commit/3af99896101bd41a4d2878c4a9f671ca1da36a6f), [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411), [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411), [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be), [`3442f4bd00a`](https://github.com/refinedev/refine/commit/3442f4bd00ad4dbb17dcba08931fdeed3c2b1cb0), [`f8891ead2bd`](https://github.com/refinedev/refine/commit/f8891ead2bdb5f6743bbe9979230aa73ef3e69be)]:
  - @refinedev/core@4.27.0
  - @refinedev/ui-types@1.19.0

## 1.9.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: added tests for `<ThemedSiderV2/>`'s `activeItemDisabled` prop.
  When `activeItemDisabled` prop is `trye`, the active item will be disabled and not clickable.

### Patch Changes

- Updated dependencies [[`c3c0deed564`](https://github.com/refinedev/refine/commit/c3c0deed564bdbded58c615357a55e666473923a), [`8c2b3be35b0`](https://github.com/refinedev/refine/commit/8c2b3be35b0132fc9a7b79287d281a9f922424d0), [`5bb6f47a4d4`](https://github.com/refinedev/refine/commit/5bb6f47a4d4e29a7de5426879754fcd78e3fa4d5), [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/core@4.26.0
  - @refinedev/ui-types@1.18.0

## 1.8.0

### Minor Changes

- [#4502](https://github.com/refinedev/refine/pull/4502) [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38) Thanks [@Mr0nline](https://github.com/Mr0nline)! - feat: added tests for `<ThemedSiderV2/>`'s `activeItemDisabled` prop.
  When `activeItemDisabled` prop is `trye`, the active item will be disabled and not clickable.

### Patch Changes

- Updated dependencies [[`5bb6f47a4d4`](https://github.com/refinedev/refine/commit/5bb6f47a4d4e29a7de5426879754fcd78e3fa4d5), [`c7872ca621f`](https://github.com/refinedev/refine/commit/c7872ca621fdc6c0edd7ee113520bd898901ed38)]:
  - @refinedev/core@4.25.1
  - @refinedev/ui-types@1.17.0

## 1.7.2

### Patch Changes

- [#4550](https://github.com/refinedev/refine/pull/4550) [`74468063d31`](https://github.com/refinedev/refine/commit/74468063d31195f2f9b6808189d2b761b41cbb29) Thanks [@aliemir](https://github.com/aliemir)! - Updated layout header tests to fallback to `img` in case of `presentation` role is not present.c

- Updated dependencies [[`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf), [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42), [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf)]:
  - @refinedev/core@4.24.0

## 1.7.1

### Patch Changes

- [#4550](https://github.com/refinedev/refine/pull/4550) [`74468063d31`](https://github.com/refinedev/refine/commit/74468063d31195f2f9b6808189d2b761b41cbb29) Thanks [@aliemir](https://github.com/aliemir)! - Updated layout header tests to fallback to `img` in case of `presentation` role is not present.c

- Updated dependencies [[`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf), [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42), [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf)]:
  - @refinedev/core@4.23.0

## 1.7.0

### Minor Changes

- [#4449](https://github.com/refinedev/refine/pull/4449) [`cc84d61bc5c`](https://github.com/refinedev/refine/commit/cc84d61bc5c8cfc8ac7da391f965471ecad6c445) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: updated button specs to test new access control provider behaviour.

### Patch Changes

- Updated dependencies [[`a3c8d4f84c7`](https://github.com/refinedev/refine/commit/a3c8d4f84c7b20b6d30f43310f5260b2f57b801a), [`cc84d61bc5c`](https://github.com/refinedev/refine/commit/cc84d61bc5c8cfc8ac7da391f965471ecad6c445)]:
  - @refinedev/core@4.22.0

## 1.6.0

### Minor Changes

- [#4449](https://github.com/refinedev/refine/pull/4449) [`cc84d61bc5c`](https://github.com/refinedev/refine/commit/cc84d61bc5c8cfc8ac7da391f965471ecad6c445) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: updated button specs to test new access control provider behaviour.

### Patch Changes

- Updated dependencies [[`a3c8d4f84c7`](https://github.com/refinedev/refine/commit/a3c8d4f84c7b20b6d30f43310f5260b2f57b801a), [`cc84d61bc5c`](https://github.com/refinedev/refine/commit/cc84d61bc5c8cfc8ac7da391f965471ecad6c445)]:
  - @refinedev/core@4.21.0

## 1.5.0

### Minor Changes

- [#4303](https://github.com/refinedev/refine/pull/4303) [`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added: button props tests for `headerButtons` and `footerButtons` renderer functions

### Patch Changes

- Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
  - @refinedev/ui-types@1.16.0

## 1.4.0

### Minor Changes

- [#4303](https://github.com/refinedev/refine/pull/4303) [`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added: button props tests for `headerButtons` and `footerButtons` renderer functions

### Patch Changes

- Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
  - @refinedev/ui-types@1.15.0

## 1.3.2

### Patch Changes

- [#3996](https://github.com/refinedev/refine/pull/3996) [`327be2be623`](https://github.com/refinedev/refine/commit/327be2be623ab9a62a32974315c3d2453baf4a07) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed typo in `src/tests/layout/header.tsx`'s test description

- Updated dependencies [[`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2)]:
  - @refinedev/core@4.5.6

## 1.3.1

### Patch Changes

- [#3996](https://github.com/refinedev/refine/pull/3996) [`327be2be623`](https://github.com/refinedev/refine/commit/327be2be623ab9a62a32974315c3d2453baf4a07) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed typo in `src/tests/layout/header.tsx`'s test description

- Updated dependencies [[`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2)]:
  - @refinedev/core@4.5.5

## 1.3.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Add tests for the `login`, `register`, `forgotPassword`, and, `updatePassword` pages.

### Patch Changes

- Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb), [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
  - @refinedev/core@4.5.0
  - @refinedev/ui-types@1.3.0

## 1.2.0

### Minor Changes

- [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Add tests for the `login`, `register`, `forgotPassword`, and, `updatePassword` pages.

### Patch Changes

- Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb), [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
  - @refinedev/core@4.4.0
  - @refinedev/ui-types@1.2.0

## 1.1.2

### Patch Changes

- [#3919](https://github.com/refinedev/refine/pull/3919) [`dd90bf43d50`](https://github.com/refinedev/refine/commit/dd90bf43d50ffe4e78a5caa5c0831d2ba8610e0d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - New test added to crud components: - "should not render `title` when is false"

## 1.1.1

### Patch Changes

- [#3919](https://github.com/refinedev/refine/pull/3919) [`dd90bf43d50`](https://github.com/refinedev/refine/commit/dd90bf43d50ffe4e78a5caa5c0831d2ba8610e0d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - New test added to crud components: - "should not render `title` when is false"

## 1.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - Buttons and CRUD tests are updated to use `resource.meta` property instead of `resource.options` property.
  - `<TestWrapper>` updated to use `authProvider@v3` and `authProvider@v4`.
  - Header tests are updated to use `authProvider@v4`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `AuthProvider` is renamed to `LegacyAuthProvider` with refine@4. Components and functions are updated to support `LegacyAuthProvider`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 0.13.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-core@3.103.0
  - @pankod/refine-ui-types@0.16.0

## 0.12.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

- Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
  - @pankod/refine-core@3.102.0
  - @pankod/refine-ui-types@0.15.0

## 0.11.6

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- Updated dependencies [[`a47f17931a8`](https://github.com/refinedev/refine/commit/a47f17931a8cad1466c25aa7ba4f9dce16dea2de), [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b), [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-core@3.90.6
  - @pankod/refine-ui-types@0.14.2

## 0.11.5

### Patch Changes

- [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

- Updated dependencies [[`a47f17931a8`](https://github.com/refinedev/refine/commit/a47f17931a8cad1466c25aa7ba4f9dce16dea2de), [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b), [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
  - @pankod/refine-core@3.90.5
  - @pankod/refine-ui-types@0.14.1

## 0.11.4

### Patch Changes

- [#3045](https://github.com/refinedev/refine/pull/3045) [`753fda3186d`](https://github.com/refinedev/refine/commit/753fda3186d28ca608dd5b1c1ede304af46d44e9) Thanks [@aliemir](https://github.com/aliemir)! - Updated `CreateButton` tests to handle `disabled` check.

## 0.11.3

### Patch Changes

- [#3045](https://github.com/refinedev/refine/pull/3045) [`753fda3186d`](https://github.com/refinedev/refine/commit/753fda3186d28ca608dd5b1c1ede304af46d44e9) Thanks [@aliemir](https://github.com/aliemir)! - Updated `CreateButton` tests to handle `disabled` check.

## 0.11.2

### Patch Changes

- [#2835](https://github.com/refinedev/refine/pull/2835) [`e479bef562`](https://github.com/refinedev/refine/commit/e479bef5621e21595bbae81e77f25062956abf2b) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Used find by test id instead of find by text on delete button tests.

## 0.11.1

### Patch Changes

- [#2835](https://github.com/refinedev/refine/pull/2835) [`e479bef562`](https://github.com/refinedev/refine/commit/e479bef5621e21595bbae81e77f25062956abf2b) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Used find by test id instead of find by text on delete button tests.

## 0.11.0

### Minor Changes

- [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

- Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516), [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
  - @pankod/refine-ui-types@0.14.0
  - @pankod/refine-core@3.86.2

## 0.10.0

### Minor Changes

- [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

- Updated dependencies [[`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
  - @pankod/refine-ui-types@0.13.0

## 0.9.1

### Patch Changes

- Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516)]:
  - @pankod/refine-ui-types@0.12.0
  - @pankod/refine-core@3.86.1

## 0.9.0

### Minor Changes

- Removed timers from all of the tests.

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-core@3.74.6

## 0.8.0

### Minor Changes

- [#2505](https://github.com/refinedev/refine/pull/2505) [`a4dbb63c88`](https://github.com/refinedev/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Removed timers from all of the tests.

### Patch Changes

- Updated dependencies [[`a4dbb63c88`](https://github.com/refinedev/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469)]:
  - @pankod/refine-core@3.74.5

## 0.7.4

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.11.0

## 0.7.3

### Patch Changes

- Updated dependencies [[`a65525de6f`](https://github.com/refinedev/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e)]:
  - @pankod/refine-ui-types@0.10.0

## 0.7.2

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-ui-types@0.9.0

## 0.7.1

### Patch Changes

- Updated dependencies [[`ad99916d6d`](https://github.com/refinedev/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0)]:
  - @pankod/refine-ui-types@0.8.0

## 0.7.0

### Minor Changes

- Updated `Sider` test for `render` props.

### Patch Changes

- Fixed version of react-router to `6.3.0`

- Updated dependencies []:
  - @pankod/refine-core@3.69.9
  - @pankod/refine-ui-types@0.7.0

## 0.6.1

### Patch Changes

- [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

- Updated dependencies [[`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f)]:
  - @pankod/refine-core@3.69.8

## 0.6.0

### Minor Changes

- [#2454](https://github.com/refinedev/refine/pull/2454) [`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `Sider` test for `render` props.

### Patch Changes

- Updated dependencies [[`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af)]:
  - @pankod/refine-ui-types@0.6.0

## 0.5.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-core@3.67.0
  - @pankod/refine-ui-types@0.5.0

## 0.4.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

- Updated dependencies [[`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`f2faf99f25`](https://github.com/refinedev/refine/commit/f2faf99f25542f73215ee89c74b241311177b327), [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`2c428b3105`](https://github.com/refinedev/refine/commit/2c428b31057e3e7c8901fc3da2773bc810235491)]:
  - @pankod/refine-core@3.66.0
  - @pankod/refine-ui-types@0.4.0

## 0.3.2

### Patch Changes

- Fix failing tests after the upgrade of `react-query` to v4.

- Updated dependencies []:
  - @pankod/refine-core@3.56.6

## 0.3.1

### Patch Changes

- [#2260](https://github.com/refinedev/refine/pull/2260) [`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fix failing tests after the upgrade of `react-query` to v4.

- Updated dependencies [[`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e), [`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e)]:
  - @pankod/refine-core@3.56.5

## 0.3.0

### Minor Changes

- Added common tests for UI components to ensure we're expecting same outputs by same inputs in all UI framework integrations.

### Patch Changes

- Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

  Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

  Updated `@pankod/refine-ui-tests` `fields` properties.

- Updated dependencies []:
  - @pankod/refine-core@3.56.2
  - @pankod/refine-ui-types@0.3.0

## 0.2.0

### Minor Changes

- [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Added common tests for UI components to ensure we're expecting same outputs by same inputs in all UI framework integrations.

### Patch Changes

- [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

  Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

  Updated `@pankod/refine-ui-tests` `fields` properties.

- Updated dependencies [[`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a)]:
  - @pankod/refine-ui-types@0.2.0
