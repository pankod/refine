# @refinedev/react-hook-form

## 5.0.4

### Patch Changes

- [#7205](https://github.com/refinedev/refine/pull/7205) [`20af33db209246156b81bd80e025ef3bf482c7a9`](https://github.com/refinedev/refine/commit/20af33db209246156b81bd80e025ef3bf482c7a9) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: sync query values to fields that register after data loads (e.g. Controller),
  without overwriting dirty inputs.

## 5.0.3

### Patch Changes

- [#7100](https://github.com/refinedev/refine/pull/7100) [`64625bb337a222ef80727862c758cae86371fa4b`](https://github.com/refinedev/refine/commit/64625bb337a222ef80727862c758cae86371fa4b) Thanks [@AkprasadoP](https://github.com/AkprasadoP)! - Fix modal visibility issue when switching between actions in useModalForm hook. The modal now properly shows when switching from edit to create action.

## 5.0.2

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 5.0.1

### Patch Changes

- [#6957](https://github.com/refinedev/refine/pull/6957) [`3bb1d1ea3ba72f6ca24a703ccef88de29a1782f3`](https://github.com/refinedev/refine/commit/3bb1d1ea3ba72f6ca24a703ccef88de29a1782f3) Thanks [@arndom](https://github.com/arndom)! - - Add useEffect to set form values from initial query result when modal is visible.

  - Compensates for useForm not setting initial modal form values when querying the same resource id back-to-back.

  [Resolves #6904](https://github.com/refinedev/refine/issues/6904)

## 5.0.0

### Major Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: upgrade React Hook Form integration for Refine 5.0

  - Updated React Hook Form integration for Refine 5.0 and TanStack Query v5 compatibility.
  - Removed deprecated APIs and modernized form handling patterns for improved developer experience.

  > 🚨 Breaking changes require migration - check our guide at https://refine.dev/docs/migration-guide/4x-to-5x/

### Patch Changes

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 4.10.2

### Patch Changes

- [#6835](https://github.com/refinedev/refine/pull/6835) [`e78213ff7fdcace9bac455861123299bfdab4452`](https://github.com/refinedev/refine/commit/e78213ff7fdcace9bac455861123299bfdab4452) Thanks [@amulyavarshney](https://github.com/amulyavarshney)! - feat: add `autoResetFormWhenClose` option to `useModalForm` hook

  Added `autoResetFormWhenClose` prop to reset form when modal closes. Default is `true`.

## 4.10.1

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update `react-hook-form` to `7.57.0` to support new features like [`subscribe`](https://react-hook-form.com/docs/useform/subscribe).
  for more information, see [React Hook Form release notes](https://github.com/react-hook-form/react-hook-form/releases).

## 4.10.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6824](https://github.com/refinedev/refine/pull/6824) [`a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01`](https://github.com/refinedev/refine/commit/a6ff3d3e888e3a0bd61c1ddda89d2715e493fa01) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: update `react-hook-form` to `7.57.0` to support new features like [`subscribe`](https://react-hook-form.com/docs/useform/subscribe).
  for more information, see [React Hook Form release notes](https://github.com/react-hook-form/react-hook-form/releases).

## 4.9.3

### Patch Changes

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 4.9.2

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 4.9.1

### Patch Changes

- [#6445](https://github.com/refinedev/refine/pull/6445) [`4ff4335274d5689ec62127312695b76d692a125a`](https://github.com/refinedev/refine/commit/4ff4335274d5689ec62127312695b76d692a125a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: onChange handler `autoSave` check in `useForm`

  Autosave can now be explicitly disabled.

  Resolves #6458

## 4.9.0

### Minor Changes

- [#6161](https://github.com/refinedev/refine/pull/6161) [`ff975374efcc05220be4411218c2daf7c19b8995`](https://github.com/refinedev/refine/commit/ff975374efcc05220be4411218c2daf7c19b8995) Thanks [@ritute](https://github.com/ritute)! - feat(react-hook-form): update version constraint from `^7.30.0` to `^7.43.5`

  Update react-hook-form version to address runtime subscribe error

  [Fixes #6139](https://github.com/refinedev/refine/issues/6139)

### Patch Changes

- [#6233](https://github.com/refinedev/refine/pull/6233) [`a93eed09796b780557f6fecee0c2f1e7b4f9e93b`](https://github.com/refinedev/refine/commit/a93eed09796b780557f6fecee0c2f1e7b4f9e93b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: update `@refinedev/core` usage to reflect latest renamings.

  > These changes applied on internal usage of `@refinedev/core` in `@refinedev/react-hook-form` package.

  ```diff
  import { useForm } from '@refinedev/core';

  - const { queryResult, mutationResult } = useForm();
  + const { query, mutation} = useForm();
  ```

## 4.8.20

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 4.8.19

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 4.8.18

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 4.8.17

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 4.8.16

### Patch Changes

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

  fixed: Some type errors are fixed due to the TypeScript upgrade.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `lodash-es` imports for ESM builds to access the exports properly.

- [#5714](https://github.com/refinedev/refine/pull/5714) [`38f129f40ee`](https://github.com/refinedev/refine/commit/38f129f40eea109c9b89b23a8fd3f217964330c7) Thanks [@aliemir](https://github.com/aliemir)! - Due to the bug fix made in the `@refinedev/core`, `onFinishAutoSave`'s returned promise can now reject and should be handled accordingly. Updated `useForm`'s auto save handler to catch the rejection without breaking the application.

  Additionally due to the same changes, `onFinish` should also be handled accordingly. Updated `useForm`'s `saveButtonProps.onClick` to catch the rejection without breaking the application.

- [#5755](https://github.com/refinedev/refine/pull/5755) [`404b2ef5e1b`](https://github.com/refinedev/refine/commit/404b2ef5e1b8fed469eeab753bac8736ed3fe58e) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: incorrect type imports

## 4.8.15

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 4.8.14

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

## 4.8.13

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 4.8.12

### Patch Changes

- [#5201](https://github.com/refinedev/refine/pull/5201) [`760cfbaaa2a`](https://github.com/refinedev/refine/commit/760cfbaaa2ac8b8c070ade1e174784358cc112b0) Thanks [@aliemir](https://github.com/aliemir)! - Updated initial value setting logic in `useForm` to handle nested objects properly.

## 4.8.11

### Patch Changes

- [#5201](https://github.com/refinedev/refine/pull/5201) [`760cfbaaa2a`](https://github.com/refinedev/refine/commit/760cfbaaa2ac8b8c070ade1e174784358cc112b0) Thanks [@aliemir](https://github.com/aliemir)! - Updated initial value setting logic in `useForm` to handle nested objects properly.

## 4.8.10

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 4.8.9

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 4.8.8

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

## 4.8.7

### Patch Changes

- [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

## 4.8.6

### Patch Changes

- [#4903](https://github.com/refinedev/refine/pull/4903) [`e327cadc011`](https://github.com/refinedev/refine/commit/e327cadc011ce8696d7149252e1ad308005b1eff) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `invalidateOnUnmount` prop to [`useForm`](https://refine.dev/docs/packages/documentation/react-hook-form/useForm/) hook.
  feat: add `invalidateOnUnmount` and `invalidateOnClose` prop to [`useModalForm`](https://refine.dev/docs/packages/documentation/react-hook-form/useModalForm/) hook.
  From now on, you can use these props to invalidate queries upon unmount and/or close

## 4.8.5

### Patch Changes

- [#4903](https://github.com/refinedev/refine/pull/4903) [`e327cadc011`](https://github.com/refinedev/refine/commit/e327cadc011ce8696d7149252e1ad308005b1eff) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `invalidateOnUnmount` prop to [`useForm`](https://refine.dev/docs/packages/documentation/react-hook-form/useForm/) hook.
  feat: add `invalidateOnUnmount` and `invalidateOnClose` prop to [`useModalForm`](https://refine.dev/docs/packages/documentation/react-hook-form/useModalForm/) hook.
  From now on, you can use these props to invalidate queries upon unmount and/or close

## 4.8.4

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 4.8.3

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 4.8.2

### Patch Changes

- [#4767](https://github.com/refinedev/refine/pull/4767) [`c757355da60`](https://github.com/refinedev/refine/commit/c757355da6089d0e18609a1bb2d316d928412b16) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `useModalForm` sends request twice when `syncWithLocation` is true

## 4.8.1

### Patch Changes

- [#4767](https://github.com/refinedev/refine/pull/4767) [`c757355da60`](https://github.com/refinedev/refine/commit/c757355da6089d0e18609a1bb2d316d928412b16) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `useModalForm` sends request twice when `syncWithLocation` is true

## 4.8.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 4.7.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 4.6.0

### Minor Changes

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: when the `dataProvider` returns rejected promise with `errors` field, `useForm` will automatically update the error state with the rejected `errors` field.

  [Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)

## 4.5.0

### Minor Changes

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: when the `dataProvider` returns rejected promise with `errors` field, `useForm` will automatically update the error state with the rejected `errors` field.

  [Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)

## 4.4.2

### Patch Changes

- [#4576](https://github.com/refinedev/refine/pull/4576) [`9a895ea39dc`](https://github.com/refinedev/refine/commit/9a895ea39dcbb5ad73904fa29ee9fcfcf25b7ea4) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `handleSubmitReactHookForm` now returns a Promise without awaiting it.
  With this change, unhandled errors will propagate to the caller.

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { useModalForm } from "@refinedev/react-hook-form";

  useModalForm({
    refineCoreProps: {
      resource: "identifier-value",
    },
  });
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

## 4.4.1

### Patch Changes

- [#4576](https://github.com/refinedev/refine/pull/4576) [`9a895ea39dc`](https://github.com/refinedev/refine/commit/9a895ea39dcbb5ad73904fa29ee9fcfcf25b7ea4) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `handleSubmitReactHookForm` now returns a Promise without awaiting it.
  With this change, unhandled errors will propagate to the caller.

- [#4527](https://github.com/refinedev/refine/pull/4527) [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: prioritization of forgotten `identifier`

  If `identifier` is provided, it will be used instead of `name`.

  ```tsx
  import { useModalForm } from "@refinedev/react-hook-form";

  useModalForm({
    refineCoreProps: {
      resource: "identifier-value",
    },
  });
  ```

  fix: use translate keys with `identifier`

  Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.

## 4.4.0

### Minor Changes

- [#4306](https://github.com/refinedev/refine/pull/4306) [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `syncWithLocation.syncId` default to `true` for `useModalForm`.

## 4.3.0

### Minor Changes

- [#4306](https://github.com/refinedev/refine/pull/4306) [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `syncWithLocation.syncId` default to `true` for `useModalForm`.

## 4.2.4

### Patch Changes

- [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

## 4.2.3

### Patch Changes

- [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

## 4.2.2

### Patch Changes

- [#4210](https://github.com/refinedev/refine/pull/4210) [`b992e11e338`](https://github.com/refinedev/refine/commit/b992e11e3387464186d552112460aebbc18d3cc5) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: The values of the registered fields were set using the `reset()` function. This has been changed to use `getValues()` instead. This fixes an issue where the values of the registered fields' dirty state were not being set correctly.

## 4.2.1

### Patch Changes

- [#4210](https://github.com/refinedev/refine/pull/4210) [`b992e11e338`](https://github.com/refinedev/refine/commit/b992e11e3387464186d552112460aebbc18d3cc5) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: The values of the registered fields were set using the `reset()` function. This has been changed to use `getValues()` instead. This fixes an issue where the values of the registered fields' dirty state were not being set correctly.

## 4.2.0

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

## 4.1.6

### Patch Changes

- [#4120](https://github.com/refinedev/refine/pull/4120) [`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9) Thanks [@aliemir](https://github.com/aliemir)! - Fix broken `useModalForm` with `create` actions.

## 4.1.5

### Patch Changes

- [#4120](https://github.com/refinedev/refine/pull/4120) [`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9) Thanks [@aliemir](https://github.com/aliemir)! - Fix broken `useModalForm` with `create` actions.

## 4.1.4

### Patch Changes

- [#4114](https://github.com/refinedev/refine/pull/4114) [`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec) Thanks [@aliemir](https://github.com/aliemir)! - Updated `useModalForm` hook's `modal.show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal. If not, the modal will not show. (Resolves #4062)

## 4.1.3

### Patch Changes

- [#4114](https://github.com/refinedev/refine/pull/4114) [`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec) Thanks [@aliemir](https://github.com/aliemir)! - Updated `useModalForm` hook's `modal.show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal. If not, the modal will not show. (Resolves #4062)

## 4.1.2

### Patch Changes

- [#3909](https://github.com/refinedev/refine/pull/3909) [`631512e91ec`](https://github.com/refinedev/refine/commit/631512e91ecf79f12d735de6b11e4822f01cc6f5) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed a bug that the form values were not filled when the user next to steps.

## 4.1.1

### Patch Changes

- [#3909](https://github.com/refinedev/refine/pull/3909) [`631512e91ec`](https://github.com/refinedev/refine/commit/631512e91ecf79f12d735de6b11e4822f01cc6f5) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed a bug that the form values were not filled when the user next to steps.

## 4.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  All `react-hook-form` imports re-exported from `@refinedev/react-hook-form` have been removed. You should import them from the `react-hook-form` package directly.

  If the package is not installed, you can install it with your package manager:

  ```bash
  npm install react-hook-form
  # or
  pnpm add react-hook-form
  # or
  yarn add react-hook-form
  ```

  After that, you can import them from `react-hook-form` package directly.

  ```diff
  - import { useForm, Controller } from "@refinedev/react-hook-form";

  + import { useForm } from "@refinedev/react-hook-form";
  + import { Controller } from "react-hook-form";
  ```

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

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 3.39.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.38.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.37.2

### Patch Changes

- [#3307](https://github.com/refinedev/refine/pull/3307) [`1262f2c4589`](https://github.com/refinedev/refine/commit/1262f2c45897aaea7acc8bb67b825305749c220c) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed resetting values on step changes - #3290

## 3.37.1

### Patch Changes

- [#3307](https://github.com/refinedev/refine/pull/3307) [`1262f2c4589`](https://github.com/refinedev/refine/commit/1262f2c45897aaea7acc8bb67b825305749c220c) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed resetting values on step changes - #3290

## 3.37.0

### Minor Changes

- [#3209](https://github.com/refinedev/refine/pull/3209) [`e0279bce6f1`](https://github.com/refinedev/refine/commit/e0279bce6f1a743014df225ea1eacf2668f91200) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export all types.

## 3.36.0

### Minor Changes

- [#3209](https://github.com/refinedev/refine/pull/3209) [`e0279bce6f1`](https://github.com/refinedev/refine/commit/e0279bce6f1a743014df225ea1eacf2668f91200) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export all types.

## 3.35.0

### Minor Changes

- [#3196](https://github.com/refinedev/refine/pull/3196) [`78b3fd90fcf`](https://github.com/refinedev/refine/commit/78b3fd90fcf44b85a3b1d022722f047feb26f664) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export `UseFieldArrayReplace` type from `react-hook-form`.

## 3.34.0

### Minor Changes

- [#3196](https://github.com/refinedev/refine/pull/3196) [`78b3fd90fcf`](https://github.com/refinedev/refine/commit/78b3fd90fcf44b85a3b1d022722f047feb26f664) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export `UseFieldArrayReplace` type from `react-hook-form`.

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

## 3.31.4

### Patch Changes

- Added type checking to fix fields reset bug

## 3.31.3

### Patch Changes

- [#2296](https://github.com/refinedev/refine/pull/2296) [`cca5a3d0c1`](https://github.com/refinedev/refine/commit/cca5a3d0c14a20e0454c6e15cc44abdcfe6420c5) Thanks [@ozkalai](https://github.com/ozkalai)! - Added type checking to fix fields reset bug

## 3.31.2

### Patch Changes

- Fixed immediate triggering of `handleSubmit`

## 3.31.1

### Patch Changes

- [#2288](https://github.com/refinedev/refine/pull/2288) [`6847672849`](https://github.com/refinedev/refine/commit/68476728494dc0fd412883de30e2c99c75a1d559) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed immediate triggering of `handleSubmit`

## 3.31.0

### Minor Changes

- Add React@18 support 🚀

## 3.30.0

### Minor Changes

- [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 3.29.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.28.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.27.2

### Patch Changes

- Fixed a bug that prevented modal or drawer from closing after submit.

## 3.27.1

### Patch Changes

- [#1931](https://github.com/refinedev/refine/pull/1931) [`4012d3c4ae`](https://github.com/refinedev/refine/commit/4012d3c4aeb61a6190f7624b662cbd20ca900679) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed a bug that prevented modal or drawer from closing after submit.

## 3.27.0

### Minor Changes

- Removed `saveButtonProps` exported from `useModalForm` because `saveButtonProps` is already exported from `useForm` hook in `@pankod/refine-react-hook-form`.

  ```diff
   const {
     modal: {
  -    saveButtonProps
     },
  +  saveButtonProps
   } = useModalForm();
  ```

## 3.26.0

### Minor Changes

- [#1923](https://github.com/refinedev/refine/pull/1923) [`45cd1f7097`](https://github.com/refinedev/refine/commit/45cd1f7097e68604f6f2908b8befd0c61e44d419) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Removed `saveButtonProps` exported from `useModalForm` because `saveButtonProps` is already exported from `useForm` hook in `@pankod/refine-react-hook-form`.

  ```diff
   const {
     modal: {
  -    saveButtonProps
     },
  +  saveButtonProps
   } = useModalForm();
  ```

## 3.23.0

### Minor Changes

- [#1866](https://github.com/refinedev/refine/pull/1866) [`9c72dae441`](https://github.com/refinedev/refine/commit/9c72dae4418fde8792375be00a9628a0df751c6d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Change `isBackValidate` default value to `false` for [`useStepsForm`](https://refine.dev/docs/packages/react-hook-form/useStepsForm/).

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
