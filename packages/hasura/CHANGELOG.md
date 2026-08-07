# @refinedev/hasura

## 7.0.1

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

## 7.0.0

### Patch Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix(test): update Jest assertions and configuration for v30 compatibility

  - Updated test infrastructure with modern Jest API usage and improved configuration.
  - Internal development dependency updates and tooling modernization - no public API changes.

- Updated dependencies [[`807099eecb4e8d41b1cf9ab557d71d34d12bec35`](https://github.com/refinedev/refine/commit/807099eecb4e8d41b1cf9ab557d71d34d12bec35), [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/core@5.0.0

## 6.6.14

### Patch Changes

📢 **Refine Community Release** 📢

- meta.gqlVariables now passed to createMany query for Hasura data provider

📢 **Refine Community Release** 📢

- meta.gqlVariables now passed to deleteOne query for Hasura data provider

📢 **Refine Community Release** 📢

- meta.gqlVariables now passed to update query for Hasura data provider

📢 **Refine Community Release** 📢

- Hasura live provider now uses hasura-default as default naming convention

📢 **Refine Community Release** 📢

- meta.gqlVariables now passed to create query for Hasura data provider

📢 **Refine Community Release** 📢

- meta.gqlVariables now passed to deleteMany query for Hasura data provider

📢 **Refine Community Release** 📢

- meta.gqlVariables now passed to updateMany query for Hasura data provider

📢 **Refine Community Release** 📢

- meta.gqlVariables now passed to custom query for Hasura data provider

## 6.6.13

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6783](https://github.com/refinedev/refine/pull/6783) [`cce3f5b749a174155d48932d99aabf24eb1f7558`](https://github.com/refinedev/refine/commit/cce3f5b749a174155d48932d99aabf24eb1f7558) Thanks [@thanaParis](https://github.com/thanaParis)! - meta.gqlVariables now passed to createMany query for Hasura data provider

⚡ **Refine Enterprise Release** ⚡

- [#6793](https://github.com/refinedev/refine/pull/6793) [`12977e97e68694b494112135df1234522056e1ef`](https://github.com/refinedev/refine/commit/12977e97e68694b494112135df1234522056e1ef) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - meta.gqlVariables now passed to deleteOne query for Hasura data provider

⚡ **Refine Enterprise Release** ⚡

- [#6776](https://github.com/refinedev/refine/pull/6776) [`27f626c06d2c10c4f4d41c1917dce24535bbafe5`](https://github.com/refinedev/refine/commit/27f626c06d2c10c4f4d41c1917dce24535bbafe5) Thanks [@thanaParis](https://github.com/thanaParis)! - meta.gqlVariables now passed to update query for Hasura data provider

⚡ **Refine Enterprise Release** ⚡

- [#6784](https://github.com/refinedev/refine/pull/6784) [`66ea5267d62674e35051d24dc7c6ab8f4e5f47ed`](https://github.com/refinedev/refine/commit/66ea5267d62674e35051d24dc7c6ab8f4e5f47ed) Thanks [@thanaParis](https://github.com/thanaParis)! - Hasura live provider now uses hasura-default as default naming convention

⚡ **Refine Enterprise Release** ⚡

- [#6777](https://github.com/refinedev/refine/pull/6777) [`82ea31540ea8f89b104ec0c809fcb6370ccd6f9f`](https://github.com/refinedev/refine/commit/82ea31540ea8f89b104ec0c809fcb6370ccd6f9f) Thanks [@thanaParis](https://github.com/thanaParis)! - meta.gqlVariables now passed to create query for Hasura data provider

⚡ **Refine Enterprise Release** ⚡

- [#6793](https://github.com/refinedev/refine/pull/6793) [`12977e97e68694b494112135df1234522056e1ef`](https://github.com/refinedev/refine/commit/12977e97e68694b494112135df1234522056e1ef) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - meta.gqlVariables now passed to deleteMany query for Hasura data provider

⚡ **Refine Enterprise Release** ⚡

- [#6782](https://github.com/refinedev/refine/pull/6782) [`45e47b11bd062c1eafcfb6b156e9f9b1b35c25a6`](https://github.com/refinedev/refine/commit/45e47b11bd062c1eafcfb6b156e9f9b1b35c25a6) Thanks [@thanaParis](https://github.com/thanaParis)! - meta.gqlVariables now passed to updateMany query for Hasura data provider

⚡ **Refine Enterprise Release** ⚡

- [#6779](https://github.com/refinedev/refine/pull/6779) [`272ac4f10972b29b67a9d48526f146d86ee23242`](https://github.com/refinedev/refine/commit/272ac4f10972b29b67a9d48526f146d86ee23242) Thanks [@thanaParis](https://github.com/thanaParis)! - meta.gqlVariables now passed to custom query for Hasura data provider

## 6.6.12

### Patch Changes

📢 **Refine Community Release** 📢

- refactored HasuraDataProviderOptions to extend HasuraProviderOptions in new src/types/ folder
  added HasuraLiveProviderOptions which extends HasuraProviderOptions as argument to hasura's liveProvider

📢 **Refine Community Release** 📢

- added IDTag and NamingConvention to hasura's liveProvider subscription generators

📢 **Refine Community Release** 📢

- 'camelcase' utility imported twice from camelcase, with different capitalization. refactored to only import 'camelcase' since 'camelCase' is used by lodash, which is also in the dependency tree.

## 6.6.11

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6736](https://github.com/refinedev/refine/pull/6736) [`d628a62bb61bbb21eb84040e926f37b8e7511ea2`](https://github.com/refinedev/refine/commit/d628a62bb61bbb21eb84040e926f37b8e7511ea2) Thanks [@thanaParis](https://github.com/thanaParis)! - refactored HasuraDataProviderOptions to extend HasuraProviderOptions in new src/types/ folder
  added HasuraLiveProviderOptions which extends HasuraProviderOptions as argument to hasura's liveProvider

⚡ **Refine Enterprise Release** ⚡

- [#6737](https://github.com/refinedev/refine/pull/6737) [`96693589a7a1a456a170345c246183a8f24f3281`](https://github.com/refinedev/refine/commit/96693589a7a1a456a170345c246183a8f24f3281) Thanks [@thanaParis](https://github.com/thanaParis)! - added IDTag and NamingConvention to hasura's liveProvider subscription generators

⚡ **Refine Enterprise Release** ⚡

- [#6735](https://github.com/refinedev/refine/pull/6735) [`33c93b585186fd123f7c7d7e7349bf4eafe67899`](https://github.com/refinedev/refine/commit/33c93b585186fd123f7c7d7e7349bf4eafe67899) Thanks [@thanaParis](https://github.com/thanaParis)! - 'camelcase' utility imported twice from camelcase, with different capitalization. refactored to only import 'camelcase' since 'camelCase' is used by lodash, which is also in the dependency tree.

## 6.6.10

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

## 6.6.9

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

## 6.6.8

### Patch Changes

- [#6379](https://github.com/refinedev/refine/pull/6379) [`a3fca84847b523d6ac8e7b30bebdb77010e8f7e5`](https://github.com/refinedev/refine/commit/a3fca84847b523d6ac8e7b30bebdb77010e8f7e5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix(hasura): pass meta.gqlVariables to getOne gql request.

  [Fixes #6374](https://github.com/refinedev/refine/issues/6374)

## 6.6.7

### Patch Changes

- [#6222](https://github.com/refinedev/refine/pull/6222) [`ec24fe0f37aa9b92991bf105719f6f42bb68d63c`](https://github.com/refinedev/refine/commit/ec24fe0f37aa9b92991bf105719f6f42bb68d63c) Thanks [@Sergio16T](https://github.com/Sergio16T)! - feat: added support for meta.gqlVariables to hasura dataProvider. Updated GraphQLQueryOptions to include optional field gqlVariables

  [Feat #5864](https://github.com/refinedev/refine/issues/5864)

## 6.6.6

### Patch Changes

- [#6052](https://github.com/refinedev/refine/pull/6052) [`50d21076928ca738ec54cc5bcd17fad2683653dd`](https://github.com/refinedev/refine/commit/50d21076928ca738ec54cc5bcd17fad2683653dd) Thanks [@aliemir](https://github.com/aliemir)! - fix(hasura): broken lodash import in bundle

  ESM bundle of `@refinedev/hasura` was broken due to incorrect lodash import. Import has been replaced with subdirectory import to get handled properly in the bundling process.

  Fixes [#6044](https://github.com/refinedev/refine/issues/6044)

## 6.6.4

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: [`hasuraFilters`](https://github.com/refinedev/refine/blob/master/packages/hasura/src/utils/generateFilters.ts) object type.

  All fields in the [`CrudOperators`](https://github.com/refinedev/refine/blob/master/packages/core/src/contexts/data/types.ts#L218) interface must be used in the [`hasuraFilters`](https://github.com/refinedev/refine/blob/master/packages/hasura/src/utils/generateFilters.ts) object type, but some fields may not be supported by Hasura. To resolve this, the object type has been changed to partial.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 6.6.3

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`c6f04637a890fced05adae0a2533bb554c1de428`](https://github.com/refinedev/refine/commit/c6f04637a890fced05adae0a2533bb554c1de428) Thanks [@aliemir](https://github.com/aliemir)! - fix: [`hasuraFilters`](https://github.com/refinedev/refine/blob/master/packages/hasura/src/utils/generateFilters.ts) object type.

  All fields in the [`CrudOperators`](https://github.com/refinedev/refine/blob/master/packages/core/src/contexts/data/types.ts#L218) interface must be used in the [`hasuraFilters`](https://github.com/refinedev/refine/blob/master/packages/hasura/src/utils/generateFilters.ts) object type, but some fields may not be supported by Hasura. To resolve this, the object type has been changed to partial.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 6.6.2

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 6.6.1

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 6.6.0

### Minor Changes

- [#5723](https://github.com/refinedev/refine/pull/5723) [`c498239e90a`](https://github.com/refinedev/refine/commit/c498239e90a8da6e30556bde6429358980aadaa7) Thanks [@rilrom](https://github.com/rilrom)! - feat: implement \_not operator in hasura filters #5689

  Hasura users can now use the \_not operator as a conditional filter.

  Resolves #5689

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `lodash-es` imports for ESM builds to access the exports properly.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 6.5.1

### Patch Changes

- [#5508](https://github.com/refinedev/refine/pull/5508) [`a9194b62337`](https://github.com/refinedev/refine/commit/a9194b6233756c3667a9ea8763ee8fb71bf25d01) Thanks [@Conqxeror](https://github.com/Conqxeror)! - fix(utils): handle nested fields in generateSorting #5348

  This change addresses an issue with nested fields in the generateSorting utility function. The fix ensures that sorting works correctly when dealing with nested fields in the GraphQL query generation.

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 6.5.0

### Minor Changes

- [#5478](https://github.com/refinedev/refine/pull/5478) [`24d81ca854`](https://github.com/refinedev/refine/commit/24d81ca8546997627145f5b1c35951a58db1dbc5) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: add `gqlQuery` and `gqlMutation` support. #5489

  Previously, `@refinedev/hasura` package only supported GraphQL operations through `meta.fields`.

  Now we've added `gqlQuery` and `gqlMutation` fields in `meta` object.

  You can utilize these fields along with `graphql-tag` package to build your queries/mutations.

  See the updated documentation for more information: https://refine.dev/docs/data/packages/hasura/

  Query Example:

  ```tsx
  import { useList } from "@refinedev/core";
  import gql from "graphql-tag";

  const PRODUCTS_QUERY = gql`
    query ProductsList(
      $offset: Int!
      $limit: Int!
      $order_by: [products_order_by!]
      where: $where
    ) {
      products(offset: $paging, limit: $filter, order_by: $order_by, where: $where) {
        id
        name
      }
      categories_aggregate(where: $where) {
        aggregate {
          count
        }
      }
    }
  `;

  const { data } = useList({
    resource: "products",
    meta: { gqlQuery: PRODUCTS_QUERY },
  });
  ```

  Mutation Example:

  ```tsx
  import { useForm } from "@refinedev/core";
  import gql from "graphql-tag";

  const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct($object: posts_insert_input!) {
      createOneProduct(object: $object) {
        id
        name
      }
    }
  `;

  const { formProps } = useForm({
    resource: "products",
    meta: { gqlMutation: CREATE_PRODUCT_MUTATION },
  });
  ```

## 6.4.12

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 6.4.11

### Patch Changes

- [#5330](https://github.com/refinedev/refine/pull/5330) [`7c8827b43d`](https://github.com/refinedev/refine/commit/7c8827b43d9e378818be6ee23032925c97ce02d5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: upgrade nock library version to ^13.4.0

## 6.4.10

### Patch Changes

- [#5040](https://github.com/refinedev/refine/pull/5040) [`ca57048580a`](https://github.com/refinedev/refine/commit/ca57048580a0daceae5d6071bd52517527f7db45) Thanks [@IkumaTadokoro](https://github.com/IkumaTadokoro)! - fix: issue with #4972

  When using the Hasura provider with the 'graphql-default' naming convention, snake-case graphql operators (e.g. \_is_null) were not converted to the correct case, causing query errors.
  This problem is now fixed. Now the snake_case operator is converted according to the given naming convention (e.g. hasura-default: \_is_null, graphql-default: \_isNull).

## 6.4.9

### Patch Changes

- [#5040](https://github.com/refinedev/refine/pull/5040) [`ca57048580a`](https://github.com/refinedev/refine/commit/ca57048580a0daceae5d6071bd52517527f7db45) Thanks [@IkumaTadokoro](https://github.com/IkumaTadokoro)! - fix: issue with #4972

  When using the Hasura provider with the 'graphql-default' naming convention, snake-case graphql operators (e.g. \_is_null) were not converted to the correct case, causing query errors.
  This problem is now fixed. Now the snake_case operator is converted according to the given naming convention (e.g. hasura-default: \_is_null, graphql-default: \_isNull).

## 6.4.8

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 6.4.7

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 6.4.6

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.

## 6.4.5

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.

## 6.4.4

### Patch Changes

- [#4584](https://github.com/refinedev/refine/pull/4584) [`6305f41d2a6`](https://github.com/refinedev/refine/commit/6305f41d2a6738e489ca5d500fe4d7be72d666d0) Thanks [@IkumaTadokoro](https://github.com/IkumaTadokoro)! - fix: issue with #4574

  We had a problem when using Hasura Provider with grapqhql-convention where it causes could not retrieve some response issue to happen, now it's fixed.

## 6.4.3

### Patch Changes

- [#4584](https://github.com/refinedev/refine/pull/4584) [`6305f41d2a6`](https://github.com/refinedev/refine/commit/6305f41d2a6738e489ca5d500fe4d7be72d666d0) Thanks [@IkumaTadokoro](https://github.com/IkumaTadokoro)! - fix: issue with #4574

  We had a problem when using Hasura Provider with grapqhql-convention where it causes could not retrieve some response issue to happen, now it's fixed.

## 6.4.2

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.1

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 6.4.0

### Minor Changes

- [#4174](https://github.com/refinedev/refine/pull/4174) [`d040da9a428`](https://github.com/refinedev/refine/commit/d040da9a4282f0b90385035449c38815b2287ffe) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize hasura data provider for your needs.

  feat: tests added for utility functions.

  chore: utility functions have been moved to their own files.

  chore: `genereteUseListSubscription` is deprecated and has been renamed to `generateListSubscriptionHook`.
  chore: `genereteUseManySubscription` is deprecated and has been renamed to `generateUseManySubscription`.
  chore: `genereteUseOneSubscription` is deprecated and has been renamed to `generateUseOneSubscription`.

### Patch Changes

- [#4179](https://github.com/refinedev/refine/pull/4179) [`fd808368a36`](https://github.com/refinedev/refine/commit/fd808368a363bf9f4f7ec159676b3f69beb43772) Thanks [@austin047](https://github.com/austin047)! - fix: change enum from lowercase to UPPERCASE in api request for hasura camelCase naming convention

  From the hasura documentation [here](https://hasura.io/docs/latest/schema/postgres/naming-convention/), for the graphql-default naming convention, the naming convention for enums is upper-cased. Currently the request are being made with the lowercase enum and not uppercase.

  The change mainly
  affects `sort`, desc gets changed to DESC and asc gets changed to ASC. the request from the refine client interface maintains the underscore and convertion to uppercase is only done at the API request layer.

## 6.3.0

### Minor Changes

- [#4174](https://github.com/refinedev/refine/pull/4174) [`d040da9a428`](https://github.com/refinedev/refine/commit/d040da9a4282f0b90385035449c38815b2287ffe) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize hasura data provider for your needs.

  feat: tests added for utility functions.

  chore: utility functions have been moved to their own files.

  chore: `genereteUseListSubscription` is deprecated and has been renamed to `generateListSubscriptionHook`.
  chore: `genereteUseManySubscription` is deprecated and has been renamed to `generateUseManySubscription`.
  chore: `genereteUseOneSubscription` is deprecated and has been renamed to `generateUseOneSubscription`.

### Patch Changes

- [#4179](https://github.com/refinedev/refine/pull/4179) [`fd808368a36`](https://github.com/refinedev/refine/commit/fd808368a363bf9f4f7ec159676b3f69beb43772) Thanks [@austin047](https://github.com/austin047)! - fix: change enum from lowercase to UPPERCASE in api request for hasura camelCase naming convention

  From the hasura documentation [here](https://hasura.io/docs/latest/schema/postgres/naming-convention/), for the graphql-default naming convention, the naming convention for enums is upper-cased. Currently the request are being made with the lowercase enum and not uppercase.

  The change mainly
  affects `sort`, desc gets changed to DESC and asc gets changed to ASC. the request from the refine client interface maintains the underscore and convertion to uppercase is only done at the API request layer.

## 6.2.0

### Minor Changes

- [#4144](https://github.com/refinedev/refine/pull/4144) [`06bdf9e4837`](https://github.com/refinedev/refine/commit/06bdf9e4837db83870d30461db00297195e4ecc8) Thanks [@mattbho](https://github.com/mattbho)! - feat: support camelCase graphql naming convention for Hasura

  Previously, our Hasura data provider only supported snake-case naming conventions for operations and type names.

  Hasura recently released a setting allowing for camelCase support.

  The following changes do the Hasura data provider now support the new setting.

  All methods for the Hasura Data provider now support the camelCase `graphql-default` naming convention.

  The data provider now accepts a `namingConvention` field in the options payload.

  Ex:

  ```
  const gqlDataProvider = dataProvider(client, {namingConvention: "graphql-default"});
  ```

  If the `graphql-default` naming convention is provided, all field names and variables will be camel cased. Type names will be PascalCased.

## 6.1.0

### Minor Changes

- [#4144](https://github.com/refinedev/refine/pull/4144) [`06bdf9e4837`](https://github.com/refinedev/refine/commit/06bdf9e4837db83870d30461db00297195e4ecc8) Thanks [@mattbho](https://github.com/mattbho)! - feat: support camelCase graphql naming convention for Hasura

  Previously, our Hasura data provider only supported snake-case naming conventions for operations and type names.

  Hasura recently released a setting allowing for camelCase support.

  The following changes do the Hasura data provider now support the new setting.

  All methods for the Hasura Data provider now support the camelCase `graphql-default` naming convention.

  The data provider now accepts a `namingConvention` field in the options payload.

  Ex:

  ```
  const gqlDataProvider = dataProvider(client, {namingConvention: "graphql-default"});
  ```

  If the `graphql-default` naming convention is provided, all field names and variables will be camel cased. Type names will be PascalCased.

## 6.0.1

### Patch Changes

- [#4030](https://github.com/refinedev/refine/pull/4030) [`1b019280252`](https://github.com/refinedev/refine/commit/1b019280252140c251bf464426b0b072acd310fe) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Upgraded `graphql-request` dependency `4.x` to [`5.x`](https://github.com/jasonkuhrt/graphql-request/releases/tag/5.0.0).

## 6.0.0

### Major Changes

- [#4030](https://github.com/refinedev/refine/pull/4030) [`1b019280252`](https://github.com/refinedev/refine/commit/1b019280252140c251bf464426b0b072acd310fe) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Upgraded `graphql-request` dependency `4.x` to [`5.x`](https://github.com/jasonkuhrt/graphql-request/releases/tag/5.0.0).

## 5.1.2

### Patch Changes

- [#4001](https://github.com/refinedev/refine/pull/4001) [`e9807e60510`](https://github.com/refinedev/refine/commit/e9807e60510aa689cdb5f36ce878c1398c420721) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: add missing possible id types to hasura data provider

## 5.1.1

### Patch Changes

- [#4001](https://github.com/refinedev/refine/pull/4001) [`e9807e60510`](https://github.com/refinedev/refine/commit/e9807e60510aa689cdb5f36ce878c1398c420721) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: add missing possible id types to hasura data provider

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

## 4.21.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.20.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.19.0

### Minor Changes

- [#3752](https://github.com/refinedev/refine/pull/3752) [`426386ca250`](https://github.com/refinedev/refine/commit/426386ca2506de14094ccdde767b7bede210e5e4) Thanks [@zulianrizki](https://github.com/zulianrizki)! - Allow custom ID types with `idType` property when initializing the data provider instance. `idType` can either be `Int`, `uuid` or a function returning the type by resource name.

## 4.18.0

### Minor Changes

- [#3752](https://github.com/refinedev/refine/pull/3752) [`426386ca250`](https://github.com/refinedev/refine/commit/426386ca2506de14094ccdde767b7bede210e5e4) Thanks [@zulianrizki](https://github.com/zulianrizki)! - Allow custom ID types with `idType` property when initializing the data provider instance. `idType` can either be `Int`, `uuid` or a function returning the type by resource name.

## 4.17.3

### Patch Changes

- [#3275](https://github.com/refinedev/refine/pull/3275) [`aaa499548cd`](https://github.com/refinedev/refine/commit/aaa499548cddc5365f4d7a04cc55350dc88fba7a) Thanks [@aliemir](https://github.com/aliemir)! - `contains`, `ncontains`, `containss` and `ncontainss` filters were passing the value without wrapping it to `%` characters. This caused the filters to not work as expected. Added a case to the filter value handler to wrap the value with `%` characters. (Resolves #3245)

## 4.17.2

### Patch Changes

- [#3275](https://github.com/refinedev/refine/pull/3275) [`aaa499548cd`](https://github.com/refinedev/refine/commit/aaa499548cddc5365f4d7a04cc55350dc88fba7a) Thanks [@aliemir](https://github.com/aliemir)! - `contains`, `ncontains`, `containss` and `ncontainss` filters were passing the value without wrapping it to `%` characters. This caused the filters to not work as expected. Added a case to the filter value handler to wrap the value with `%` characters. (Resolves #3245)

## 4.17.1

### Patch Changes

- [#3275](https://github.com/refinedev/refine/pull/3275) [`aaa499548cd`](https://github.com/refinedev/refine/commit/aaa499548cddc5365f4d7a04cc55350dc88fba7a) Thanks [@aliemir](https://github.com/aliemir)! - `contains`, `ncontains`, `containss` and `ncontainss` filters were passing the value without wrapping it to `%` characters. This caused the filters to not work as expected. Added a case to the filter value handler to wrap the value with `%` characters. (Resolves #3245)

## 4.17.0

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

## 4.16.0

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

## 4.15.2

### Patch Changes

- Added nested property filter support for `or` filters.

## 4.15.1

### Patch Changes

- [#2743](https://github.com/refinedev/refine/pull/2743) [`8aecb59d7b`](https://github.com/refinedev/refine/commit/8aecb59d7bf68ae8b9e2e256f1995dd9ba3a8e66) Thanks [@aliemir](https://github.com/aliemir)! - Added nested property filter support for `or` filters.

## 4.15.0

### Minor Changes

- Added missing implementations for `nnull`, `startswith`, `startswiths`, `nstartswith`, `nstartswiths`, `endswith`, `endswiths`, `nendswith` and `nendswiths` filters by `_similar`, `_nsimilar`, `_regex` and `_iregex` filters from Hasura.

## 4.14.0

### Minor Changes

- [#2728](https://github.com/refinedev/refine/pull/2728) [`585ba350f8`](https://github.com/refinedev/refine/commit/585ba350f831be93055c58c1ff660645f21bdf77) Thanks [@aliemir](https://github.com/aliemir)! - Added missing implementations for `nnull`, `startswith`, `startswiths`, `nstartswith`, `nstartswiths`, `endswith`, `endswiths`, `nendswith` and `nendswiths` filters by `_similar`, `_nsimilar`, `_regex` and `_iregex` filters from Hasura.

## 4.13.0

### Minor Changes

- Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.12.0

### Minor Changes

- [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.11.2

### Patch Changes

- Added nested sorting feature 💥

* Added new CRUD Filter Operators with undefined

## 4.11.1

### Patch Changes

- [#2427](https://github.com/refinedev/refine/pull/2427) [`b21908e872`](https://github.com/refinedev/refine/commit/b21908e87209c3a8825991c6ab829f7c45c19e9b) Thanks [@geoffatsource](https://github.com/geoffatsource)! - Added nested sorting feature 💥

* [#2456](https://github.com/refinedev/refine/pull/2456) [`f20a0ed621`](https://github.com/refinedev/refine/commit/f20a0ed621f9f038dce762e75a0a99058bcb4edb) Thanks [@workatease](https://github.com/workatease)! - Added new CRUD Filter Operators with undefined

## 4.11.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.10.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.9.4

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

## 4.9.3

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

## 4.9.2

### Patch Changes

- - `lodash` moved to "dependencies" for CommonJS builds

## 4.9.1

### Patch Changes

- [#2366](https://github.com/refinedev/refine/pull/2366) [`de87f13dad`](https://github.com/refinedev/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - `lodash` moved to "dependencies" for CommonJS builds

## 4.9.0

### Minor Changes

- Add nested filter support to `Hasura` data provider.

  Example usage:

  ```
  filters: [
      {
          field: "category.id",
          operator: "eq",
          value: "8332c138-3231-406d-9655-1328ded9d5f2",
      },
  ],
  ```

## 4.8.0

### Minor Changes

- [#2347](https://github.com/refinedev/refine/pull/2347) [`628324d950`](https://github.com/refinedev/refine/commit/628324d95090172bc5921cce251c79696183079a) Thanks [@ozkalai](https://github.com/ozkalai)! - Add nested filter support to `Hasura` data provider.

  Example usage:

  ```
  filters: [
      {
          field: "category.id",
          operator: "eq",
          value: "8332c138-3231-406d-9655-1328ded9d5f2",
      },
  ],
  ```

## 4.7.0

### Minor Changes

- Add React@18 support 🚀

## 4.6.0

### Minor Changes

- [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 4.5.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.4.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.3.2

### Patch Changes

- Add support for multiple operators on the same field - #2154

## 4.3.1

### Patch Changes

- [#2157](https://github.com/refinedev/refine/pull/2157) [`6f5ec7c32f`](https://github.com/refinedev/refine/commit/6f5ec7c32f0e1f3510774f8d95935fe5288e2c8a) Thanks [@smparekh](https://github.com/smparekh)! - Add support for multiple operators on the same field - #2154

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
