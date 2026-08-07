# @refinedev/nestjsx-crud

## 6.0.1

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 6.0.0

### Patch Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix(test): update Jest assertions and configuration for v30 compatibility

  - Updated test infrastructure with modern Jest API usage and improved configuration.
  - Internal development dependency updates and tooling modernization - no public API changes.

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 5.0.13

### Patch Changes

- [#6894](https://github.com/refinedev/refine/pull/6894) [`783a103d4212a3a7ad70477ae96f2fb79a692dd3`](https://github.com/refinedev/refine/commit/783a103d4212a3a7ad70477ae96f2fb79a692dd3) Thanks [@arndom](https://github.com/arndom)! - - Bump `axios` dependency to `^1.11.0` to fix critical vulnerability of `form-data@v4.0.0`

  [Resolves #6888](https://github.com/refinedev/refine/issues/6888)

## 5.0.12

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

## 5.0.11

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

## 5.0.10

### Patch Changes

- [#6320](https://github.com/refinedev/refine/pull/6320) [`5c0f3d83cb424a82431c2f7ae183a94f3e59c39b`](https://github.com/refinedev/refine/commit/5c0f3d83cb424a82431c2f7ae183a94f3e59c39b) Thanks [@mehrabmp](https://github.com/mehrabmp)! - feat: add `between` filter operator

  Add between operator support to `CrudFilters`

  ```ts
  import { useTable } from "@refinedev/core";

  useTable({
    filters: {
      initial: [
        {
          field: "createdAt",
          operator: "between",
          value: [new Date().toISOString(), new Date().toISOString()],
        },
      ],
    },
  });
  ```

  [Resolves #6334](https://github.com/refinedev/refine/issues/6334)

## 5.0.9

### Patch Changes

- [#6160](https://github.com/refinedev/refine/pull/6160) [`20499cac091de94dcb4856a5253c68f216f022aa`](https://github.com/refinedev/refine/commit/20499cac091de94dcb4856a5253c68f216f022aa) Thanks [@aishuarya](https://github.com/aishuarya)! - fix: update empty filter checks

  Updated the conditions to properly check empty filters

  [Fixes #6146](https://github.com/refinedev/refine/issues/6146)

## 5.0.8

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: "mapOperator" test type error.
  Some `CrudOperators` not supported in `mapOperator` type but still extended from `CrudOperators`. To fix that we use `Partial` type for `mapOperator` function.

## 5.0.7

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- [#5945](https://github.com/refinedev/refine/pull/5945) [`61031da8217c7f0aef1f5381f55b819250006ada`](https://github.com/refinedev/refine/commit/61031da8217c7f0aef1f5381f55b819250006ada) Thanks [@aliemir](https://github.com/aliemir)! - fix: "mapOperator" test type error.
  Some `CrudOperators` not supported in `mapOperator` type but still extended from `CrudOperators`. To fix that we use `Partial` type for `mapOperator` function.

## 5.0.6

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 5.0.5

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 5.0.4

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 5.0.3

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 5.0.2

### Patch Changes

- [#5546](https://github.com/refinedev/refine/pull/5546) [`10570ec06c`](https://github.com/refinedev/refine/commit/10570ec06c4c7daf0654a6ef76a99f6445628c60) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `"nnull"` operator added for filters. #4805
  From now on, data hooks can use `"nnull"` operator to filter null values.

  ```ts
  import { useTable } from "@refinedev/core";

  useTable({
    filters: {
      permanent: [
        {
          field: "title",
          operator: "nnull",
          value: true,
        },
      ],
    },
  });
  ```

## 5.0.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 5.0.0

### Major Changes

- [#5330](https://github.com/refinedev/refine/pull/5330) [`7c8827b43d`](https://github.com/refinedev/refine/commit/7c8827b43d9e378818be6ee23032925c97ce02d5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: upgrade axios dependency to ^1.6.2

### Patch Changes

- [#5300](https://github.com/refinedev/refine/pull/5300) [`1bc21de08b`](https://github.com/refinedev/refine/commit/1bc21de08bae1dfed34651013d12d76b4ec6e875) Thanks [@ksankeerth](https://github.com/ksankeerth)! - fix: missing files in package nestjsx-crud

  There was an issue with nestjsx-crud package due to missing files(transformErrorMessages.ts and transformHttpError.ts)

## 4.5.5

### Patch Changes

- [#5054](https://github.com/refinedev/refine/pull/5054) [`6ab41f88343`](https://github.com/refinedev/refine/commit/6ab41f88343955cc0a3d3a77fc4cc641fd11f05d) Thanks [@MahirMahdi](https://github.com/MahirMahdi)! - Now `useCustomMutation` can modify headers for each individual call, without setting the default headers. Previously the default headers was included in all subsequent API calls.

## 4.5.4

### Patch Changes

- [#5054](https://github.com/refinedev/refine/pull/5054) [`6ab41f88343`](https://github.com/refinedev/refine/commit/6ab41f88343955cc0a3d3a77fc4cc641fd11f05d) Thanks [@MahirMahdi](https://github.com/MahirMahdi)! - Now `useCustomMutation` can modify headers for each individual call, without setting the default headers. Previously the default headers was included in all subsequent API calls.

## 4.5.3

### Patch Changes

- [#5054](https://github.com/refinedev/refine/pull/5054) [`6ab41f88343`](https://github.com/refinedev/refine/commit/6ab41f88343955cc0a3d3a77fc4cc641fd11f05d) Thanks [@MahirMahdi](https://github.com/MahirMahdi)! - Now `useCustomMutation` can modify headers for each individual call, without setting the default headers. Previously the default headers was included in all subsequent API calls.

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

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added error handling to support server-side validation errors.

  When the server returns default validation errors, `update`, `create`, `updateMany`, and `createMany` methods will throw an error with the validation errors. This allows the `useForm` update the error state with the validation errors.

## 4.4.0

### Minor Changes

- [#4652](https://github.com/refinedev/refine/pull/4652) [`96af6d25b7a`](https://github.com/refinedev/refine/commit/96af6d25b7a870a3c1c6fd33c30e0ca2224ed411) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added error handling to support server-side validation errors.

  When the server returns default validation errors, `update`, `create`, `updateMany`, and `createMany` methods will throw an error with the validation errors. This allows the `useForm` update the error state with the validation errors.

## 4.3.4

### Patch Changes

- [#4589](https://github.com/refinedev/refine/pull/4589) [`11241b16000`](https://github.com/refinedev/refine/commit/11241b160005cd18fcea173de17bb45847763c9c) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `getList` without pagination response

  Without the `limit` and `offset` parameters in the [`nestjsx/crud`](https://github.com/nestjsx/crud) library, the result is without paging. However, it was always expected to be paginated in the data provider. It now supports both situations.

## 4.3.3

### Patch Changes

- [#4589](https://github.com/refinedev/refine/pull/4589) [`11241b16000`](https://github.com/refinedev/refine/commit/11241b160005cd18fcea173de17bb45847763c9c) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: `getList` without pagination response

  Without the `limit` and `offset` parameters in the [`nestjsx/crud`](https://github.com/nestjsx/crud) library, the result is without paging. However, it was always expected to be paginated in the data provider. It now supports both situations.

## 4.3.2

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 4.3.1

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 4.3.0

### Minor Changes

- [#4154](https://github.com/refinedev/refine/pull/4154) [`d6cb8f67d47`](https://github.com/refinedev/refine/commit/d6cb8f67d4788bb3071742b5a950163b6e10e1b6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling.
  Now with swizzle support, you can easily customize nextjs-crud data provider for your needs.

  feat: tests added for util functions.

  chore: utility functions have been moved to their own files.

## 4.2.0

### Minor Changes

- [#4154](https://github.com/refinedev/refine/pull/4154) [`d6cb8f67d47`](https://github.com/refinedev/refine/commit/d6cb8f67d4788bb3071742b5a950163b6e10e1b6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling.
  Now with swizzle support, you can easily customize nextjs-crud data provider for your needs.

  feat: tests added for util functions.

  chore: utility functions have been moved to their own files.

## 4.1.0

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

## 3.39.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.38.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.37.0

### Minor Changes

- [#3429](https://github.com/refinedev/refine/pull/3429) [`92c3cac9a7f`](https://github.com/refinedev/refine/commit/92c3cac9a7fec15a5e28f9bc60aa182d8cb58254) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to pass `join` parameter through `metaData` to queries.

  **Example**

  ```ts
  useList({
    metaData: {
      join: {
        select: ["id", "name"],
        field: "categories",
      },
    },
  });

  useList({
    metaData: {
      join: ["categories", ["id", "name"]],
    },
  });

  useList({
    metaData: {
      join: [
        ["categories", ["id", "name"]],
        {
          select: ["id", "label"],
          field: "tags",
        },
      ],
    },
  });
  ```

## 3.36.0

### Minor Changes

- [#3429](https://github.com/refinedev/refine/pull/3429) [`92c3cac9a7f`](https://github.com/refinedev/refine/commit/92c3cac9a7fec15a5e28f9bc60aa182d8cb58254) Thanks [@aliemir](https://github.com/aliemir)! - Added ability to pass `join` parameter through `metaData` to queries.

  **Example**

  ```ts
  useList({
    metaData: {
      join: {
        select: ["id", "name"],
        field: "categories",
      },
    },
  });

  useList({
    metaData: {
      join: ["categories", ["id", "name"]],
    },
  });

  useList({
    metaData: {
      join: [
        ["categories", ["id", "name"]],
        {
          select: ["id", "label"],
          field: "tags",
        },
      ],
    },
  });
  ```

## 3.35.0

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

## 3.34.0

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

## 3.33.0

### Minor Changes

- Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 3.32.0

### Minor Changes

- [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 3.31.0

### Minor Changes

- Fixed payload data in delete on nestjsx data provider custom method.

## 3.30.0

### Minor Changes

- [#2465](https://github.com/refinedev/refine/pull/2465) [`4d07f33993`](https://github.com/refinedev/refine/commit/4d07f33993fa5a6facaf33cd651ef94892d15dae) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed payload data in delete on nestjsx data provider custom method.

## 3.29.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.28.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

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

- Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

  **Implementation**

  Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

  **Use Cases**

  For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

- Updated dependencies []:
  - @pankod/refine-core@3.36.0

## 3.25.5

### Patch Changes

- [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

  **Implementation**

  Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

  **Use Cases**

  For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

- Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
  - @pankod/refine-core@3.35.0

## 3.25.4

### Patch Changes

- Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

  ```
  // old v0.21.4
  axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

  // new v0.26.1
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
  ```

- Updated dependencies []:
  - @pankod/refine-core@3.29.0

## 3.25.3

### Patch Changes

- Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

  ```
  // old v0.21.4
  axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

  // new v0.26.1
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
  ```

- Updated dependencies []:
  - @pankod/refine-core@3.28.0

## 3.25.2

### Patch Changes

- Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

  ```
  // old v0.21.4
  axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

  // new v0.26.1
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
  ```

- Updated dependencies []:
  - @pankod/refine-core@3.27.0

## 3.25.1

### Patch Changes

- [#1899](https://github.com/refinedev/refine/pull/1899) [`fbfea418a0`](https://github.com/refinedev/refine/commit/fbfea418a024a527a2b432c634f46a96d4f70d88) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

  ```
  // old v0.21.4
  axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

  // new v0.26.1
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
  ```

- Updated dependencies [[`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746)]:
  - @pankod/refine-core@3.26.0

## 3.22.2

### Patch Changes

- Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
  - @pankod/refine-core@3.23.2
