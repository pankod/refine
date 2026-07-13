# @refinedev/nestjs-query

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

## 1.3.5

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

## 1.3.4

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

## 1.3.3

### Patch Changes

- [#6133](https://github.com/refinedev/refine/pull/6133) [`788c7d0b56617306ea1f3070f7f3aa73e1c59e59`](https://github.com/refinedev/refine/commit/788c7d0b56617306ea1f3070f7f3aa73e1c59e59) Thanks [@igordonin](https://github.com/igordonin)! - Custom requests now correctly support GET requests and makes uses of custom URL and headers.

  Resolves #6112

## 1.3.2

### Patch Changes

- [#6023](https://github.com/refinedev/refine/pull/6023) [`82170288209653b096b996cf31854434d19c01cd`](https://github.com/refinedev/refine/commit/82170288209653b096b996cf31854434d19c01cd) Thanks [@yamadayutaka](https://github.com/yamadayutaka)! - fix: can specify 0 as filter value

  The following values do not apply to the filter.

  - null
  - undefined
  - NaN
  - Infinity / -Infinity

  The following values can apply to the filter.

  - 0
  - ""

  Resolves #6022

## 1.3.0

### Minor Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat(nestjs-query): implemented getApiUrl

  resolves #5606

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: implement unimplemented operators

  The following filter operators have been implemented.

  - `containss`
  - `ncontainss`
  - `startswiths`
  - `nstartswiths`
  - `endswiths`
  - `nendswiths`
  - `nbetween`

  Resolves #6008

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 1.2.0

### Minor Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`e154d399afbfcc560ad3e349d0f76d2701ae866e`](https://github.com/refinedev/refine/commit/e154d399afbfcc560ad3e349d0f76d2701ae866e) Thanks [@aliemir](https://github.com/aliemir)! - feat(nestjs-query): implemented getApiUrl

  resolves #5606

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`216d061513b84f1b19d4a31164b2342d824a5b2d`](https://github.com/refinedev/refine/commit/216d061513b84f1b19d4a31164b2342d824a5b2d) Thanks [@aliemir](https://github.com/aliemir)! - fix: implement unimplemented operators

  The following filter operators have been implemented.

  - `containss`
  - `ncontainss`
  - `startswiths`
  - `nstartswiths`
  - `endswiths`
  - `nendswiths`
  - `nbetween`

  Resolves #6008

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 1.1.5

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 1.1.4

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 1.1.3

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `lodash-es` imports for ESM builds to access the exports properly.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 1.1.2

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 1.1.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 1.1.0

### Minor Changes

- [#5409](https://github.com/refinedev/refine/pull/5409) [`0026fe34d0`](https://github.com/refinedev/refine/commit/0026fe34d0e46209f42e40834c6942ade22f242f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: add `gqlQuery` and `gqlMutation` support.

  Previously, `@refinedev/nestjs-query` package only supported GraphQL operations through `meta.fields`.

  Now we've added `gqlQuery` and `gqlMutation` fields in `meta` object.

  You can utilize these fields along with `graphql-tag` package to build your queries/mutations.

  See the updated documentation for more information: https://refine.dev/docs/packages/data-providers/nestjs-query

  Query Example:

  ```tsx
  import { useList } from "@refinedev/core";
  import gql from "graphql-tag";

  const PRODUCTS_QUERY = gql`
    query ProductsList(
      $paging: OffsetPaging!
      $filter: BlogPostFilter
      $sorting: [BlogPostSort!]!
    ) {
      products(paging: $paging, filter: $filter, sorting: $sorting) {
        nodes {
          id
          name
        }
        totalCount
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
    mutation CreateProduct($input: CreateProductInput!) {
      createOneProduct(input: $input) {
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

## 1.0.9

### Patch Changes

- [#5330](https://github.com/refinedev/refine/pull/5330) [`7c8827b43d`](https://github.com/refinedev/refine/commit/7c8827b43d9e378818be6ee23032925c97ce02d5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: upgrade nock library version to ^13.4.0

## 1.0.8

### Patch Changes

- [#5114](https://github.com/refinedev/refine/pull/5114) [`00a9252c5de`](https://github.com/refinedev/refine/commit/00a9252c5de86aad544b0ca7d087c532c6d561fa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `dataProvider.custom` uses diffrent client istance.
  From now on, `dataProvider.custom` uses the same client istance as other `dataProvider` methods.

## 1.0.7

### Patch Changes

- [#5114](https://github.com/refinedev/refine/pull/5114) [`00a9252c5de`](https://github.com/refinedev/refine/commit/00a9252c5de86aad544b0ca7d087c532c6d561fa) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `dataProvider.custom` uses diffrent client istance.
  From now on, `dataProvider.custom` uses the same client istance as other `dataProvider` methods.

## 1.0.6

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 1.0.5

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 1.0.4

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.

## 1.0.3

### Patch Changes

- [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
  - Fix the lodash replacement plugin to skip redundant files.

## 1.0.2

### Patch Changes

- [#4824](https://github.com/refinedev/refine/pull/4824) [`0206dcb8828`](https://github.com/refinedev/refine/commit/0206dcb8828338ae5e4eef6ed74907e20dbc65ee) Thanks [@aliemir](https://github.com/aliemir)! - feat: initialize nestjs-query package.

  🎉🎉🎉 This is the initial release of our nestjs-query data provider. https://tripss.github.io/nestjs-query 🎉🎉🎉

  Supported features:

  - filters ✅
  - sorters ✅
  - offset pagination ✅
  - offset connections ✅
  - subscriptions ✅

  Usage example:

  ```tsx
  import graphqlDataProvider, {
    GraphQLClient,
    liveProvider,
  } from "@refinedev/nestjs-query";
  import { createClient } from "graphql-ws";

  const API_URL = `https://api.nestjs-query.refine.dev/graphql`;
  const WS_URL = `wss://api.nestjs-query.refine.dev/graphql`;

  const client = new GraphQLClient(API_URL);
  const wsClient = createClient(WS_URL);

  export const dataProvider = graphqlDataProvider(client);
  export const liveProvider = liveProdiver(wsClient);

  export const App = () => (
    <Refine dataProvider={dataProvider} liveProvider={liveProvider}>
      //...
    </Refine>
  );
  ```

## 1.0.1

### Patch Changes

- [#4824](https://github.com/refinedev/refine/pull/4824) [`0206dcb8828`](https://github.com/refinedev/refine/commit/0206dcb8828338ae5e4eef6ed74907e20dbc65ee) Thanks [@aliemir](https://github.com/aliemir)! - feat: initialize nestjs-query package.

  🎉🎉🎉 This is the initial release of our nestjs-query data provider. https://tripss.github.io/nestjs-query 🎉🎉🎉

  Supported features:

  - filters ✅
  - sorters ✅
  - offset pagination ✅
  - offset connections ✅
  - subscriptions ✅

  Usage example:

  ```tsx
  import graphqlDataProvider, {
    GraphQLClient,
    liveProvider,
  } from "@refinedev/nestjs-query";
  import { createClient } from "graphql-ws";

  const API_URL = `https://api.nestjs-query.refine.dev/graphql`;
  const WS_URL = `wss://api.nestjs-query.refine.dev/graphql`;

  const client = new GraphQLClient(API_URL);
  const wsClient = createClient(WS_URL);

  export const dataProvider = graphqlDataProvider(client);
  export const liveProvider = liveProdiver(wsClient);

  export const App = () => (
    <Refine dataProvider={dataProvider} liveProvider={liveProvider}>
      //...
    </Refine>
  );
  ```
