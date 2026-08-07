# @refinedev/kbar

## 2.0.1

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 2.0.0

### Patch Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix(test): update Jest assertions and configuration for v30 compatibility

  - Updated test infrastructure with modern Jest API usage and improved configuration.
  - Internal development dependency updates and tooling modernization - no public API changes.

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 1.3.17

### Patch Changes

- [#6923](https://github.com/refinedev/refine/pull/6923) [`e597ca67ef2ce48f65f39492787ba10747d52225`](https://github.com/refinedev/refine/commit/e597ca67ef2ce48f65f39492787ba10747d52225) Thanks [@erenkurnaz](https://github.com/erenkurnaz)! - fix: failed to resolve entry for package "kbar" #6902

  Fixed Vite build error in new refine projects by updating kbar dependency version.

  [Resolves #6902](https://github.com/refinedev/refine/issues/6902)

## 1.3.16

### Patch Changes

📢 **Refine Community Release** 📢

- fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 1.3.15

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6683](https://github.com/refinedev/refine/pull/6683) [`a12a0821e3c573386c2a8eea4ac1582cc46dd26d`](https://github.com/refinedev/refine/commit/a12a0821e3c573386c2a8eea4ac1582cc46dd26d) Thanks [@aliemir](https://github.com/aliemir)! - fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 1.3.14

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 1.3.13

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

## 1.3.12

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 1.3.11

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 1.3.10

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 1.3.9

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 1.3.8

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 1.3.7

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 1.3.6

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

## 1.3.5

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 1.3.4

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 1.3.3

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 1.3.2

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 1.3.1

### Patch Changes

- [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

## 1.3.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 1.2.0

### Minor Changes

- [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

## 1.1.2

### Patch Changes

- [#4626](https://github.com/refinedev/refine/pull/4626) [`03597ed8a9a`](https://github.com/refinedev/refine/commit/03597ed8a9ad1bd2a6d51e6d7181de76b16c38f9) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the action types for predefined kbar actions per resource.

- [#4626](https://github.com/refinedev/refine/pull/4626) [`03597ed8a9a`](https://github.com/refinedev/refine/commit/03597ed8a9ad1bd2a6d51e6d7181de76b16c38f9) Thanks [@aliemir](https://github.com/aliemir)! - Updated the `kbar` package to latest version and updated the re-exports of the package.

## 1.1.1

### Patch Changes

- [#4626](https://github.com/refinedev/refine/pull/4626) [`03597ed8a9a`](https://github.com/refinedev/refine/commit/03597ed8a9ad1bd2a6d51e6d7181de76b16c38f9) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the action types for predefined kbar actions per resource.

- [#4626](https://github.com/refinedev/refine/pull/4626) [`03597ed8a9a`](https://github.com/refinedev/refine/commit/03597ed8a9ad1bd2a6d51e6d7181de76b16c38f9) Thanks [@aliemir](https://github.com/aliemir)! - Updated the `kbar` package to latest version and updated the re-exports of the package.

## 1.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  `AuthProvider` is renamed to `LegacyAuthProvider` with refine@4. Components and functions are updated to support `LegacyAuthProvider`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  Updated the action creation logic to match the changes in routing system of `@refinedev/core`.

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 0.12.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 0.11.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 0.10.2

### Patch Changes

- Fixed version of react-router to `6.3.0`

## 0.10.1

### Patch Changes

- [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 0.10.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 0.9.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 0.8.0

### Minor Changes

- Add React@18 support 🚀

## 0.7.0

### Minor Changes

- [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 0.6.0

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

## 0.5.0

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

## 0.4.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 0.3.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 0.2.2

### Patch Changes

- Fixed `react-dom` dependency version

  ```diff
  - "react-dom": "^17.0.4"
  + "react-dom": "^17.0.0 || ^18.0.0"
  ```

## 0.2.1

### Patch Changes

- [#2178](https://github.com/refinedev/refine/pull/2178) [`7a8e74a0af`](https://github.com/refinedev/refine/commit/7a8e74a0afcd6c6d87630f4a5f5102808e4354e9) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed `react-dom` dependency version

  ```diff
  - "react-dom": "^17.0.4"
  + "react-dom": "^17.0.0 || ^18.0.0"
  ```

## 0.2.0

### Minor Changes

- Command palette for the refine. this package use [kbar](https://github.com/timc1/kbar) to generate the command palette.

  💡 How use the refine-kbar command palette?

  1.  Import the package

  ```tsx

  ```

  2. Wrap the `<Refine>` component with the `<RefineKbarProvider>`.

  ```tsx
  import { Refine } from "@pankod/refine-core";
  import { RefineKbarProvider } from "@pankod/refine-kbar";
  const App: React.FC = () => {
    return (
      <RefineKbarProvider>
        <Refine />
      </RefineKbarProvider>
    );
  };
  ```

  1. Create `<OffLayoutArea/>` component for the Refine component and use the `refine-kbar` command palette in `<OffLayoutArea>`

  We have the `<RefineKbar>` component to provide the command palette to the `<Refine>` component.

  ```tsx
  import { Refine } from "@pankod/refine-core";
  import { RefineKbar, RefineKbarProvider } from "@pankod/refine-kbar";

  const OffLayoutArea: React.FC = () => {
    return <RefineKbar />;
  };
  const App: React.FC = () => {
    return (
      <RefineKbarProvider>
        <Refine OffLayoutArea={OffLayoutArea} />
      </RefineKbarProvider>
    );
  };
  ```

  > **Note** 📢
  > Q: Why we need to wrap the `<Refine>` component with the `<RefineKbarProvider>`?
  > A: The `<RefineKbarProvider>` is a wrapper component that provides the command palette to the `<Refine>` component.
  > Q: Why we need to add `<OffLayoutArea>` to the `<Refine>` component?
  > A: Because we need to reach the `resources` property of the `<Refine>` component.

## 0.1.0

### Minor Changes

- [#2117](https://github.com/refinedev/refine/pull/2117) [`e941ac0f47`](https://github.com/refinedev/refine/commit/e941ac0f47c7bd3278e7563567ede3813f522988) Thanks [@biskuvit](https://github.com/biskuvit)! - Command palette for the refine. this package use [kbar](https://github.com/timc1/kbar) to generate the command palette.

  💡 How use the refine-kbar command palette?

  1.  Import the package

  ```tsx

  ```

  2. Wrap the `<Refine>` component with the `<RefineKbarProvider>`.

  ```tsx
  import { Refine } from "@pankod/refine-core";
  import { RefineKbarProvider } from "@pankod/refine-kbar";
  const App: React.FC = () => {
    return (
      <RefineKbarProvider>
        <Refine />
      </RefineKbarProvider>
    );
  };
  ```

  1. Create `<OffLayoutArea/>` component for the Refine component and use the `refine-kbar` command palette in `<OffLayoutArea>`

  We have the `<RefineKbar>` component to provide the command palette to the `<Refine>` component.

  ```tsx
  import { Refine } from "@pankod/refine-core";
  import { RefineKbar, RefineKbarProvider } from "@pankod/refine-kbar";

  const OffLayoutArea: React.FC = () => {
    return <RefineKbar />;
  };
  const App: React.FC = () => {
    return (
      <RefineKbarProvider>
        <Refine OffLayoutArea={OffLayoutArea} />
      </RefineKbarProvider>
    );
  };
  ```

  > **Note** 📢
  > Q: Why we need to wrap the `<Refine>` component with the `<RefineKbarProvider>`?
  > A: The `<RefineKbarProvider>` is a wrapper component that provides the command palette to the `<Refine>` component.
  > Q: Why we need to add `<OffLayoutArea>` to the `<Refine>` component?
  > A: Because we need to reach the `resources` property of the `<Refine>` component.
