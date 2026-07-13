# @refinedev/appwrite

## 8.0.1

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 8.0.0

### Patch Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix(test): update Jest assertions and configuration for v30 compatibility

  - Updated test infrastructure with modern Jest API usage and improved configuration.
  - Internal development dependency updates and tooling modernization - no public API changes.

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 7.0.1

### Patch Changes

- [#6256](https://github.com/refinedev/refine/pull/6256) [`7ac2fc2013c8f38741831d3b65b23abe5f6fe1b2`](https://github.com/refinedev/refine/commit/7ac2fc2013c8f38741831d3b65b23abe5f6fe1b2) Thanks [@soranoo](https://github.com/soranoo)! - feat(appwrite): add support to conditional filters and missing logical filters

  Add Support to `and`, `or`, `between`, `null`, `nnull`, `startswith` and `endswith` operators

  [Resolves #6252](https://github.com/refinedev/refine/issues/6252)

## 7.0.0

### Major Changes

- [#6138](https://github.com/refinedev/refine/pull/6138) [`d4809d6e9cfd7b311ab8ba1fa27c21cb50e1bc17`](https://github.com/refinedev/refine/commit/d4809d6e9cfd7b311ab8ba1fa27c21cb50e1bc17) Thanks [@soranoo](https://github.com/soranoo)! - feat(package/appwrite): update `Appwrite` SDK to `v15`

  Updated `appwrite` SDK version to `v15` to match latest server version. Depending on your server version upgrading to this version should be safe but may require some changes in your codebase if you are using `appwrite` SDK directly.

  If you're using the `data-provider-appwrite` example as base or created your app using the `create-refine-app` CLI, your auth provider implementation may require a small change in the `login` method:

  ```diff
  -      await account.createEmailSession(email, password);
  +      await account.createEmailPasswordSession(email, password);
  ```

  [Resolves #6090](https://github.com/refinedev/refine/issues/6090)

## 6.5.3

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 6.5.2

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 6.5.1

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 6.5.0

### Minor Changes

- [#5886](https://github.com/refinedev/refine/pull/5886) [`f3ddcce0bf5`](https://github.com/refinedev/refine/commit/f3ddcce0bf59a8847347f911e710b8d216eb2699) Thanks [@abdelrahman-essawy](https://github.com/abdelrahman-essawy)! - fix: add ability to customize default permission without explicitly passing them on each mutation

  fixing an issue which didn't allow users to override the default `readPermissions` / `writePermissions` values `Role.any()`, by passing `defaultReadPermissions` / `defaultWritePermissions` OR by passing `meta?.readPermissions` / `meta?.writePermissions`.

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 6.4.8

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 6.4.7

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 6.4.6

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 6.4.5

### Patch Changes

- [#5330](https://github.com/refinedev/refine/pull/5330) [`7c8827b43d`](https://github.com/refinedev/refine/commit/7c8827b43d9e378818be6ee23032925c97ce02d5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: upgrade nock library version to ^13.4.0

## 6.4.4

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 6.4.3

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 6.4.2

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.1

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.0

### Minor Changes

- [#4269](https://github.com/refinedev/refine/pull/4269) [`396bf067e3c`](https://github.com/refinedev/refine/commit/396bf067e3c78aaf533e368a68b3e07e0ca64d82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to appwrite

## 6.3.0

### Minor Changes

- [#4269](https://github.com/refinedev/refine/pull/4269) [`396bf067e3c`](https://github.com/refinedev/refine/commit/396bf067e3c78aaf533e368a68b3e07e0ca64d82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to appwrite

## 6.2.0

### Minor Changes

- [#4269](https://github.com/refinedev/refine/pull/4269) [`396bf067e3c`](https://github.com/refinedev/refine/commit/396bf067e3c78aaf533e368a68b3e07e0ca64d82) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added swizzle to appwrite

## 6.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `metaData` prop is now deprecated for all data provider methods. Use `meta` prop instead.

    > For backward compatibility, we still support `metaData` prop with refine v4.

    ```diff
    create: async ({
    -    metaData
    +    meta
    }) => {
        ...
    },
    ```

  - `sort`, `hasPagination`, and `metaData` parameters of `getList` method are now deprecated. Use `sorters`, `pagination`, and `meta` parameters instead.

    > For backward compatibility, we still support `sort`, `hasPagination` and `metaData` props with refine v4.

    ```diff
    getList: async ({
    -    sort
    +    sorters
    -    hasPagination
    +    pagination: { mode: "off" | "server | "client" }
    -    metaData
    +    meta
    }) => {
        ...
    },
    ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 5.7.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 5.6.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 5.5.0

### Minor Changes

- Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

  ```
  {
    operator: "or",
    value: [
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "John Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 30,
          },
        ],
      },
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "JR Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 1,
          },
        ],
      },
    ],
  }
  ```

## 5.4.0

### Minor Changes

- [#2751](https://github.com/refinedev/refine/pull/2751) [`addff64c77`](https://github.com/refinedev/refine/commit/addff64c777e4c9f044a1a109cb05453e6e9f762) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

  ```
  {
    operator: "or",
    value: [
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "John Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 30,
          },
        ],
      },
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "JR Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 1,
          },
        ],
      },
    ],
  }
  ```

## 5.3.0

### Minor Changes

- Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 5.2.0

### Minor Changes

- [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 5.1.0

### Minor Changes

- We've added [Appwrite 1.0](https://appwrite.io/1.0) support!

## 5.0.0

### Major Changes

- [#2528](https://github.com/refinedev/refine/pull/2528) [`97574b512e`](https://github.com/refinedev/refine/commit/97574b512ef458a52716d1f9b61c639622097db5) Thanks [@omeraplak](https://github.com/omeraplak)! - We've added [Appwrite 1.0](https://appwrite.io/1.0) support!

## 4.3.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.2.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.1.0

### Minor Changes

- - Added `databaseId` support. The Default value is `default` for backward compability
  - Upgraded Appwrite SDK to version 9

  ## Usage

  ```tsx
  import { Refine } from "@pankod/refine-core";
  import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

  const APPWRITE_URL = "https://YOUR_COOL_APPWRITE_URL";
  const APPWRITE_PROJECT = "YOUR_PROJECT_ID";

  const appwriteClient = new Appwrite();

  appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

  <Refine
      dataProvider={dataProvider(appwriteClient, {
          databaseId: "default",
      })}
      liveProvider={liveProvider(appwriteClient, {
          databaseId: "default",
      })}
      ...
      ...
  />
  ```

  ## Breaking changes of Appwrite SDK

  ### Usage of Storage

  ```tsx
  //old way
  import { Appwrite } from "@pankod/refine-appwrite";
  const appwriteClient = new Appwrite();

  appwriteClient.storage.createFile("BUCKET_NAME", rcFile.name, rcFile);

  //new way
  const appwriteClient = new Appwrite();
  const storage = new Storage(appwriteClient);
  const { $id } = await storage.createFile("BUCKET_NAME", rcFile.name, rcFile);
  ```

## 4.0.0

### Major Changes

- [#2270](https://github.com/refinedev/refine/pull/2270) [`d05e4bdde7`](https://github.com/refinedev/refine/commit/d05e4bdde7b558fb055759efe2fde9dba25f2600) Thanks [@omeraplak](https://github.com/omeraplak)! - - Added `databaseId` support. The Default value is `default` for backward compability

  - Upgraded Appwrite SDK to version 9

  ## Usage

  ```tsx
  import { Refine } from "@pankod/refine-core";
  import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

  const APPWRITE_URL = "https://YOUR_COOL_APPWRITE_URL";
  const APPWRITE_PROJECT = "YOUR_PROJECT_ID";

  const appwriteClient = new Appwrite();

  appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

  <Refine
      dataProvider={dataProvider(appwriteClient, {
          databaseId: "default",
      })}
      liveProvider={liveProvider(appwriteClient, {
          databaseId: "default",
      })}
      ...
      ...
  />
  ```

  ## Breaking changes of Appwrite SDK

  ### Usage of Storage

  ```tsx
  //old way
  import { Appwrite } from "@pankod/refine-appwrite";
  const appwriteClient = new Appwrite();

  appwriteClient.storage.createFile("BUCKET_NAME", rcFile.name, rcFile);

  //new way
  const appwriteClient = new Appwrite();
  const storage = new Storage(appwriteClient);
  const { $id } = await storage.createFile("BUCKET_NAME", rcFile.name, rcFile);
  ```

## 3.27.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.26.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.2

### Patch Changes

- Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

  **Implementation**

  Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

  **Use Cases**

  For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

- Updated dependencies []:
  - @pankod/refine-core@3.36.0

## 3.25.1

### Patch Changes

- [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

  **Implementation**

  Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

  **Use Cases**

  For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

- Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
  - @pankod/refine-core@3.35.0

## 3.22.2

### Patch Changes

- Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
  - @pankod/refine-core@3.23.2
