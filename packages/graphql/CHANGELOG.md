# @refinedev/graphql

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

## 7.1.3

### Patch Changes

📢 **Refine Community Release** 📢

- fix: issue with custom mutation #6665

  We missed passing param values for custom mutation

  [Fixes #6665](https://github.com/refinedev/refine/issues/6665)

## 7.1.2

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6678](https://github.com/refinedev/refine/pull/6678) [`989b438ae2e5441f20844fda42769378985d4284`](https://github.com/refinedev/refine/commit/989b438ae2e5441f20844fda42769378985d4284) Thanks [@shaun-ak](https://github.com/shaun-ak)! - fix: issue with custom mutation #6665

  We missed passing param values for custom mutation

  [Fixes #6665](https://github.com/refinedev/refine/issues/6665)

## 7.1.1

### Patch Changes

📢 **Refine Community Release** 📢

- Added error handler that will throw GraphQL errors via Tanstack query from urql

📢 **Refine Community Release** 📢

- chore: update package descriptions

## 7.1.0

### Minor Changes

⚡ **Refine Enterprise Release** ⚡

- [#6506](https://github.com/refinedev/refine/pull/6506) [`d8c1d385486481b1df5e7267d7624fa62df12253`](https://github.com/refinedev/refine/commit/d8c1d385486481b1df5e7267d7624fa62df12253) Thanks [@sudeepjd](https://github.com/sudeepjd)! - Added error handler that will throw GraphQL errors via Tanstack query from urql

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

## 7.0.0

### Major Changes

- [#6336](https://github.com/refinedev/refine/pull/6336) [`58e90f26248ed3d1bc92ae748f03a2cbe71721c2`](https://github.com/refinedev/refine/commit/58e90f26248ed3d1bc92ae748f03a2cbe71721c2) Thanks [@aliemir](https://github.com/aliemir)! - feat: rewrite GraphQL data provider.

  We've modernized GraphQL dataprovider to make it more flexible and strictly coupled into a specific API schema.
  You can utilize `option` parameter to change the behaviour of the data provider. You can also do it individually for a single action.
  We've removed `gql-query-builder` and `graphql-request` dependencies and now using `@urql/core` as a GraphQL client.
  This means now it's required to pass either `gqlQuery` or `gqlMutation` to the hooks, `meta.fields` usage is removed.
  `graphql-tag` package is also removed since `@urql/core` already has `gql` export to write queries & mutations.
  We are no more re-exporting other packages, just our data provider, live provider and defaultOptions.

  See the updated documentation for more details: https://refine.dev/docs/data/packages/graphql/

  [Resolves #5942](https://github.com/refinedev/refine/issues/5942)
  [Resolves #5943](https://github.com/refinedev/refine/issues/5943)

## 6.5.4

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 6.5.3

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 6.5.2

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 6.5.1

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 6.5.0

### Minor Changes

- [#5742](https://github.com/refinedev/refine/pull/5742) [`028ba6a11d0`](https://github.com/refinedev/refine/commit/028ba6a11d0f35a9ac4add54af0fdc714dc3772b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: add `gqlQuery` and `gqlMutation` support. #5743

  Previously, `@refinedev/graphql` package only supported GraphQL operations through `meta.fields`.

  Now we've added `gqlQuery` and `gqlMutation` fields in `meta` object.

  You can utilize these fields along with `graphql-tag` package to build your queries/mutations.

  See the updated documentation for more information: https://refine.dev/docs/packages/data-providers/graphql

  Query Example:

  ```tsx
  import { useList } from "@refinedev/core";
  import gql from "graphql-tag";

  const POSTS_LIST_QUERY = gql`
    query PostList($where: JSON, $sort: String) {
      posts(where: $where, sort: $sort) {
        id
        title
        content
        category {
          id
        }
      }
    }
  `;

  const { data } = useList({
    resource: "posts",
    meta: { gqlQuery: POSTS_QUERY },
  });
  ```

  Mutation Example:

  ```tsx
  import { useForm } from "@refinedev/core";
  import gql from "graphql-tag";

  const POST_CREATE_MUTATION = gql`
    mutation createPost($input: createPostInput!) {
      createPost(input: $input) {
        id
        title
        content
        category {
          id
        }
      }
    }
  `;

  const { formProps } = useForm({
    resource: "posts",
    meta: { gqlMutation: CREATE_POST_MUTATION },
  });
  ```

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 6.4.9

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 6.4.8

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 6.4.7

### Patch Changes

- [#5330](https://github.com/refinedev/refine/pull/5330) [`7c8827b43d`](https://github.com/refinedev/refine/commit/7c8827b43d9e378818be6ee23032925c97ce02d5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: upgrade nock library version to ^13.4.0

## 6.4.6

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 6.4.5

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 6.4.4

### Patch Changes

- [#4530](https://github.com/refinedev/refine/pull/4530) [`a90f14301c3`](https://github.com/refinedev/refine/commit/a90f14301c37d0a57299258c3a525fd95d6b11c1) Thanks [@hbtecRJE](https://github.com/hbtecRJE)! - fix(graphql): issue with graphql liveprovider subscription query

  For the graphql subscription, 'query' was used instead of 'subscription'.

## 6.4.3

### Patch Changes

- [#4530](https://github.com/refinedev/refine/pull/4530) [`a90f14301c3`](https://github.com/refinedev/refine/commit/a90f14301c37d0a57299258c3a525fd95d6b11c1) Thanks [@hbtecRJE](https://github.com/hbtecRJE)! - fix(graphql): issue with graphql liveprovider subscription query

  For the graphql subscription, 'query' was used instead of 'subscription'.

## 6.4.2

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.1

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.0

### Minor Changes

- [#4211](https://github.com/refinedev/refine/pull/4211) [`dca1d8b7ca8`](https://github.com/refinedev/refine/commit/dca1d8b7ca8b84184d00180af7e265c6bd12d708) Thanks [@mattbho](https://github.com/mattbho)! - Custom GraphQL data provider now allow users to provide a custom InputType via the meta field.

## 6.3.0

### Minor Changes

- [#4211](https://github.com/refinedev/refine/pull/4211) [`dca1d8b7ca8`](https://github.com/refinedev/refine/commit/dca1d8b7ca8b84184d00180af7e265c6bd12d708) Thanks [@mattbho](https://github.com/mattbho)! - Custom GraphQL data provider now allow users to provide a custom InputType via the meta field.

## 6.2.0

### Minor Changes

- [#4168](https://github.com/refinedev/refine/pull/4168) [`51ab614f75b`](https://github.com/refinedev/refine/commit/51ab614f75bb96d55ff08061e7cb63bdda5f1c8f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize graphql data provider for your needs.

  feat: tests added for utility functions.

  chore: utility functions have been moved to their own files.

## 6.1.0

### Minor Changes

- [#4168](https://github.com/refinedev/refine/pull/4168) [`51ab614f75b`](https://github.com/refinedev/refine/commit/51ab614f75bb96d55ff08061e7cb63bdda5f1c8f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize graphql data provider for your needs.

  feat: tests added for utility functions.

  chore: utility functions have been moved to their own files.

## 6.0.1

### Patch Changes

- [#4030](https://github.com/refinedev/refine/pull/4030) [`1b019280252`](https://github.com/refinedev/refine/commit/1b019280252140c251bf464426b0b072acd310fe) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Upgraded `graphql-request` dependency `4.x` to [`5.x`](https://github.com/jasonkuhrt/graphql-request/releases/tag/5.0.0).

## 6.0.0

### Major Changes

- [#4030](https://github.com/refinedev/refine/pull/4030) [`1b019280252`](https://github.com/refinedev/refine/commit/1b019280252140c251bf464426b0b072acd310fe) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Upgraded `graphql-request` dependency `4.x` to [`5.x`](https://github.com/jasonkuhrt/graphql-request/releases/tag/5.0.0).

## 5.1.0

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

## 4.15.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.14.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.13.0

### Minor Changes

- [#3597](https://github.com/refinedev/refine/pull/3597) [`69140d996ed`](https://github.com/refinedev/refine/commit/69140d996ed20a4afbed34e791082b8dd61450b1) Thanks [@aliemir](https://github.com/aliemir)! - Fix typo in variable names. Exported helper `genereteSort` is renamed to `generateSort` but the old name is still exported for backward compatibility.

## 4.12.0

### Minor Changes

- [#3597](https://github.com/refinedev/refine/pull/3597) [`69140d996ed`](https://github.com/refinedev/refine/commit/69140d996ed20a4afbed34e791082b8dd61450b1) Thanks [@aliemir](https://github.com/aliemir)! - Fix typo in variable names. Exported helper `genereteSort` is renamed to `generateSort` but the old name is still exported for backward compatibility.

## 4.11.0

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

## 4.10.0

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

## 4.9.0

### Minor Changes

- Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.8.0

### Minor Changes

- [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.7.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.6.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.5.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.4.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.3.0

### Minor Changes

- ### `@pankod/refine-core`

  - Added extra params to `useSubscription` and `useResourceSubscription`
  - `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

  ### `@pankod/refine-hasura`

  - Added `liveProvider`.

  To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

  ### `@pankod/refine-nhost`

  - Added `liveProvider`.

  To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

  ### `@pankod/refine-graphql`

  - Added `liveProvider`.

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-core@3.42.0

## 4.2.0

### Minor Changes

- [#2120](https://github.com/refinedev/refine/pull/2120) [`2aa7aace52`](https://github.com/refinedev/refine/commit/2aa7aace52b3f232327db2b0f41f793a2885e788) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ### `@pankod/refine-core`

  - Added extra params to `useSubscription` and `useResourceSubscription`
  - `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

  ### `@pankod/refine-hasura`

  - Added `liveProvider`.

  To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

  ### `@pankod/refine-nhost`

  - Added `liveProvider`.

  To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

  ### `@pankod/refine-graphql`

  - Added `liveProvider`.

### Patch Changes

- Updated dependencies [[`2aa7aace52`](https://github.com/refinedev/refine/commit/2aa7aace52b3f232327db2b0f41f793a2885e788)]:
  - @pankod/refine-core@3.41.0

## 4.1.0

### Minor Changes

- Upgraded `grapql-request` version in graphql data provider packages.

  Now the `graphql-request` and `qql-query-builder` packages are exported in these packages.

  ```diff
  - import dataProvider from "@pankod/refine-strapi-graphql";
  - import { GraphQLClient } from "graphql-request";
  - import * as qqlQueryBuilder from "gql-query-builder";
  + import dataProvider, { GraphQLClient, qqlQueryBuilder } from "@pankod/refine-strapi-graphql";
  ```

### Patch Changes

- Updated dependencies []:
  - @pankod/refine-core@3.38.2

## 4.0.0

### Major Changes

- [#2113](https://github.com/refinedev/refine/pull/2113) [`c2fb7ac0e9`](https://github.com/refinedev/refine/commit/c2fb7ac0e9b5871de76aa975b2a196ab39fa7a6b) Thanks [@omeraplak](https://github.com/omeraplak)! - Upgraded `grapql-request` version in graphql data provider packages.

  Now the `graphql-request` and `qql-query-builder` packages are exported in these packages.

  ```diff
  - import dataProvider from "@pankod/refine-strapi-graphql";
  - import { GraphQLClient } from "graphql-request";
  - import * as qqlQueryBuilder from "gql-query-builder";
  + import dataProvider, { GraphQLClient, qqlQueryBuilder } from "@pankod/refine-strapi-graphql";
  ```

### Patch Changes

- Updated dependencies [[`ee8e8bbd6c`](https://github.com/refinedev/refine/commit/ee8e8bbd6cf6ff2ab1a87883e4030205dedb16ea)]:
  - @pankod/refine-core@3.38.1

## 3.25.4

### Patch Changes

- Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

  **Implementation**

  Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

  **Use Cases**

  For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

- Updated dependencies []:
  - @pankod/refine-core@3.36.0

## 3.25.3

### Patch Changes

- [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

  **Implementation**

  Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

  **Use Cases**

  For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

- Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
  - @pankod/refine-core@3.35.0

## 3.25.2

### Patch Changes

- Added `graphql-request` dependency to peerDependencies

## 3.25.1

### Patch Changes

- [#1930](https://github.com/refinedev/refine/pull/1930) [`04572f5085`](https://github.com/refinedev/refine/commit/04572f5085f024218bd011c388c0dd06e4c4fd55) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `graphql-request` dependency to peerDependencies

## 3.22.2

### Patch Changes

- Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
  - @pankod/refine-core@3.23.2
