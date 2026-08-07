# @refinedev/supabase

## 6.0.2

### Patch Changes

- [#7281](https://github.com/refinedev/refine/pull/7281) [`e22740f7a90901bdf0089c41e7ae51678e4793a5`](https://github.com/refinedev/refine/commit/e22740f7a90901bdf0089c41e7ae51678e4793a5) Thanks [@jwild2027](https://github.com/jwild2027)! - fix(supabase): handle realtime subscriptions with multiple filters #6360

  Supabase Realtime `postgres_changes` subscriptions support a single `filter` string.
  When multiple filters are provided, `liveProvider` now uses only the first valid filter
  and logs a warning instead of generating an invalid subscription payload.

  Resolves #6360

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

## 5.9.8

### Patch Changes

📢 **Refine Community Release** 📢

- fix: fixed 'in'-filter when used inside 'or' not generating correct supabase syntax

  When using the 'in'-filter inside a Conditional 'or' Filter the syntax being pushed to supabase would be incorrect.

  This resolves #6651

## 5.9.7

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6652](https://github.com/refinedev/refine/pull/6652) [`47807b7937cf0a9e93c9ad6bac570b644f9be2e0`](https://github.com/refinedev/refine/commit/47807b7937cf0a9e93c9ad6bac570b644f9be2e0) Thanks [@jkronlachner](https://github.com/jkronlachner)! - fix: fixed 'in'-filter when used inside 'or' not generating correct supabase syntax

  When using the 'in'-filter inside a Conditional 'or' Filter the syntax being pushed to supabase would be incorrect.

  This resolves #6651

## 5.9.6

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

## 5.9.5

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

## 5.9.4

### Patch Changes

- [#6240](https://github.com/refinedev/refine/pull/6240) [`697561ba04abfb570ae978066668583096ea24c0`](https://github.com/refinedev/refine/commit/697561ba04abfb570ae978066668583096ea24c0) Thanks [@pkarc](https://github.com/pkarc)! - fix(supabase): issue with parsed values when using conditional filters

  Fixed conditional filter's parsed values while using `contains`, `containss`, `startswith` and `endswith`.

  [Fixes #6239](https://github.com/refinedev/refine/issues/6239)

## 5.9.3

### Patch Changes

- [#6206](https://github.com/refinedev/refine/pull/6206) [`399ff2f9b785a1eebf59235fe6a5663d8b943ad3`](https://github.com/refinedev/refine/commit/399ff2f9b785a1eebf59235fe6a5663d8b943ad3) Thanks [@Sergio16T](https://github.com/Sergio16T)! - feat: added support for between filter in supabase dataProvider. Maps values to gte & lte.

  [Feat #6119](https://github.com/refinedev/refine/issues/6119)

## 5.9.2

### Patch Changes

- [#6025](https://github.com/refinedev/refine/pull/6025) [`f4e61b0fae7e78d0c63c09453f4bd11b4c6f8b09`](https://github.com/refinedev/refine/commit/f4e61b0fae7e78d0c63c09453f4bd11b4c6f8b09) Thanks [@youssefsiam38](https://github.com/youssefsiam38)! - fix supabase sorting with nested embedded resources

## 5.9.0

### Minor Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - Added ina and nina CrudOperators. Added filtering by these operators to Supabase data provider
  #5902

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 5.8.0

### Minor Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`a39f1952554120893ea83db904037917fc293dc6`](https://github.com/refinedev/refine/commit/a39f1952554120893ea83db904037917fc293dc6) Thanks [@aliemir](https://github.com/aliemir)! - Added ina and nina CrudOperators. Added filtering by these operators to Supabase data provider
  #5902

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 5.7.10

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 5.7.9

### Patch Changes

- [#5841](https://github.com/refinedev/refine/pull/5841) [`7b13515b3c0`](https://github.com/refinedev/refine/commit/7b13515b3c0feba36a7f2d89cc9e8a4455a2c4ca) Thanks [@issa012](https://github.com/issa012)! - fix: in methods update, updateMany, create, createMany, meta.select changed to "\*". Resolves #5679

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 5.7.8

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 5.7.7

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 5.7.6

### Patch Changes

- [#5552](https://github.com/refinedev/refine/pull/5552) [`8c50a6bd83`](https://github.com/refinedev/refine/commit/8c50a6bd83f677f4b172a04fc5ad53b50fd476cb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `meta.schema` parameter to supabase dataprovider. #5551

  From now on, users will be able to specify the schema for queries using data hooks, allowing them to override the default schema in the supabase client.

  ```tsx title="src/pages/users/list.tsx"
  const tableProps = useTable<IUser>({
    resource: "posts",
    meta: {
      schema: "foo",
    },
  });
  ```

## 5.7.5

### Patch Changes

- [#5358](https://github.com/refinedev/refine/pull/5358) [`124a035cb7`](https://github.com/refinedev/refine/commit/124a035cb7f7e59444ac6a89f35d8616eb6189c6) Thanks [@jimsmart](https://github.com/jimsmart)! - fix: Support multiple events on Supabase's liveProvider's subscribe method. #5357

## 5.7.4

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 5.7.3

### Patch Changes

- [#5330](https://github.com/refinedev/refine/pull/5330) [`7c8827b43d`](https://github.com/refinedev/refine/commit/7c8827b43d9e378818be6ee23032925c97ce02d5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: upgrade nock library version to ^13.4.0

## 5.7.2

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 5.7.1

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 5.7.0

### Minor Changes

- [#4780](https://github.com/refinedev/refine/pull/4780) [`f73d1c0e057`](https://github.com/refinedev/refine/commit/f73d1c0e0571f12cd05f8e9840c6d6a27e78686e) Thanks [@kilimnik](https://github.com/kilimnik)! - feat: added `count` property to meta for `getList` method

## 5.6.0

### Minor Changes

- [#4780](https://github.com/refinedev/refine/pull/4780) [`f73d1c0e057`](https://github.com/refinedev/refine/commit/f73d1c0e0571f12cd05f8e9840c6d6a27e78686e) Thanks [@kilimnik](https://github.com/kilimnik)! - feat: added `count` property to meta for `getList` method

## 5.5.2

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 5.5.1

### Patch Changes

- [#4285](https://github.com/refinedev/refine/pull/4285) [`b5cd3328504`](https://github.com/refinedev/refine/commit/b5cd332850428383e8b43f997cbb0340ac7f0dc6) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: A bug that prevented data providers from being swizzled.

## 5.5.0

### Minor Changes

- [#4213](https://github.com/refinedev/refine/pull/4213) [`db3b63c1e71`](https://github.com/refinedev/refine/commit/db3b63c1e713bb1f88099a7ccec6a51d175ce930) Thanks [@02JanDal](https://github.com/02JanDal)! - feat: added select field capability to data provider mutation methods

  Now you can pass `select` field to `create`, `update` `createMany` and `updateMany` methods of data provider to get fields you need from the response.

  For example:

  ```tsx
  useCreate({
    resource: "posts",
    variables: {
      title: "Hello World",
      content: "Lorem ipsum dolor sit amet",
    },
    meta: {
      select: "title, content",
    },
  });
  ```

## 5.4.0

### Minor Changes

- [#4213](https://github.com/refinedev/refine/pull/4213) [`db3b63c1e71`](https://github.com/refinedev/refine/commit/db3b63c1e713bb1f88099a7ccec6a51d175ce930) Thanks [@02JanDal](https://github.com/02JanDal)! - feat: added select field capability to data provider mutation methods

  Now you can pass `select` field to `create`, `update` `createMany` and `updateMany` methods of data provider to get fields you need from the response.

  For example:

  ```tsx
  useCreate({
    resource: "posts",
    variables: {
      title: "Hello World",
      content: "Lorem ipsum dolor sit amet",
    },
    meta: {
      select: "title, content",
    },
  });
  ```

## 5.3.0

### Minor Changes

- [#4183](https://github.com/refinedev/refine/pull/4183) [`0c1d4944397`](https://github.com/refinedev/refine/commit/0c1d4944397569be649f71af22b367a75429ab0d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: update custom id column name on meta params

  BREAKING CHANGE: `meta.idColumnName` is used instead of `meta.id` when the primary key column name of your data table is different from `id`.

  ```diff
  useMany({
      resource: "posts",
      ids: [1, 2],
      meta: {
  -        id: "post_id",
  +        idColumnName: "post_id",
      },
  });
  ```

- [#4182](https://github.com/refinedev/refine/pull/4182) [`a58e9a0f1b0`](https://github.com/refinedev/refine/commit/a58e9a0f1b0b7da0b3c67068a87570f937199d4b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize supabase data provider for your needs.

  feat: tests added for utility functions.

  chore: utility functions have been moved to their own files.

## 5.2.0

### Minor Changes

- [#4183](https://github.com/refinedev/refine/pull/4183) [`0c1d4944397`](https://github.com/refinedev/refine/commit/0c1d4944397569be649f71af22b367a75429ab0d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: update custom id column name on meta params

  BREAKING CHANGE: `meta.idColumnName` is used instead of `meta.id` when the primary key column name of your data table is different from `id`.

  ```diff
  useMany({
      resource: "posts",
      ids: [1, 2],
      meta: {
  -        id: "post_id",
  +        idColumnName: "post_id",
      },
  });
  ```

- [#4182](https://github.com/refinedev/refine/pull/4182) [`a58e9a0f1b0`](https://github.com/refinedev/refine/commit/a58e9a0f1b0b7da0b3c67068a87570f937199d4b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added refine.config.js to support swizzling. Now with swizzle support, you can easily customize supabase data provider for your needs.

  feat: tests added for utility functions.

  chore: utility functions have been moved to their own files.

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

## 4.3.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.2.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 4.1.2

### Patch Changes

- [#3612](https://github.com/refinedev/refine/pull/3612) [`3b1a3a3dd63`](https://github.com/refinedev/refine/commit/3b1a3a3dd636ac7e525653714cf5a5d71ea586f1) Thanks [@aliemir](https://github.com/aliemir)! - - Fix realtime subscriptions without filters.
  - Remove `and` and `or` filter types in realtime subscriptions.

## 4.1.1

### Patch Changes

- [#3612](https://github.com/refinedev/refine/pull/3612) [`3b1a3a3dd63`](https://github.com/refinedev/refine/commit/3b1a3a3dd636ac7e525653714cf5a5d71ea586f1) Thanks [@aliemir](https://github.com/aliemir)! - - Fix realtime subscriptions without filters.
  - Remove `and` and `or` filter types in realtime subscriptions.

## 4.1.0

### Minor Changes

- [#3528](https://github.com/refinedev/refine/pull/3528) [`e8b34442521`](https://github.com/refinedev/refine/commit/e8b3444252146150fb7fc03a73e8926a68005194) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated `supabase-js` to v2. `supabase` has published a [migration guide](https://supabase.com/docs/reference/javascript/v1/upgrade-guide). These are some of the changes to `refine`.

  - Create Supabase client:

  Before:

  ```ts
  import { createClient } from "@supabase/supabase-js";

  export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
  ```

  After:

  ```ts
  import { createClient } from "@supabase/supabase-js";

  export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  });
  ```

  - Sign In method:

  Before:

  ```ts
  const { user, error } = await supabaseClient.auth.signIn({
    email,
    password,
    provider: providerName,
  });
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  ```

  with OAuth:

  ```ts
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: providerName,
  });
  ```

  - Sign Up method:

  Before:

  ```ts
  const { user, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  ```

  - Reset Password with Email

    Before:

    ```ts
    const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/update-password`,
      },
    );
    ```

    After:

    ```ts
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/update-password`,
      },
    );
    ```

  - Update User

  Before:

  ```ts
  const { data, error } = await supabaseClient.auth.update({
    password,
  });
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.updateUser({
    password,
  });
  ```

  - Get Sesssion

  Before:

  ```ts
  const session = supabaseClient.auth.session();
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.getSession();
  ```

  - Get User

    Before:

    ```ts
    const user = supabaseClient.auth.user();
    ```

    After:

    ```ts
    const { data, error } = await supabaseClient.auth.getUser();
    ```

## 4.0.0

### Major Changes

- [#3528](https://github.com/refinedev/refine/pull/3528) [`e8b34442521`](https://github.com/refinedev/refine/commit/e8b3444252146150fb7fc03a73e8926a68005194) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated `supabase-js` to v2. `supabase` has published a [migration guide](https://supabase.com/docs/reference/javascript/v1/upgrade-guide). These are some of the changes to `refine`.

  - Create Supabase client:

  Before:

  ```ts
  import { createClient } from "@supabase/supabase-js";

  export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
  ```

  After:

  ```ts
  import { createClient } from "@supabase/supabase-js";

  export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  });
  ```

  - Sign In method:

  Before:

  ```ts
  const { user, error } = await supabaseClient.auth.signIn({
    email,
    password,
    provider: providerName,
  });
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  ```

  with OAuth:

  ```ts
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: providerName,
  });
  ```

  - Sign Up method:

  Before:

  ```ts
  const { user, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  ```

  - Reset Password with Email

    Before:

    ```ts
    const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/update-password`,
      },
    );
    ```

    After:

    ```ts
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/update-password`,
      },
    );
    ```

  - Update User

  Before:

  ```ts
  const { data, error } = await supabaseClient.auth.update({
    password,
  });
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.updateUser({
    password,
  });
  ```

  - Get Sesssion

  Before:

  ```ts
  const session = supabaseClient.auth.session();
  ```

  After:

  ```ts
  const { data, error } = await supabaseClient.auth.getSession();
  ```

  - Get User

    Before:

    ```ts
    const user = supabaseClient.auth.user();
    ```

    After:

    ```ts
    const { data, error } = await supabaseClient.auth.getUser();
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

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.30.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.29.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.28.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.27.0

### Minor Changes

- Add `foreignTable` propery to the **supabase** order statement to access relational data. For more information, you can check the 🔗[documentation](https://supabase.com/docs/reference/javascript/order).

  What we added to the [`getlist`](https://github.com/refinedev/refine/blob/master/packages/supabase/src/index.ts) hook is the following:

  💡 How use the `foreignTable` property?

  ```tsx
  ...
  const { tableProps } = useTable({
      resource: "posts",
      initialSorter: [
          {
              field: "categories.title",
              order: "asc",
          },
      ],
  });
  ```

  📢 `field: "categories.title"` means in the `posts` table `categories` is the foreign table, `title` is the field in the foreign table, and `asc` is the order.

  🚨 If you are using **Ant Design** don't forget to pass the `sorter` and `dataIndex` property to the your `Columm` component:

  ```tsx
  ...
  <Table.Column
      dataIndex={["categories", "title"]}
      title="Categories"
      sorter
  ```

  > **Warning**
  > We have developed this feature due to an [issue here](https://github.com/refinedev/refine/issues/2066) but currently, **supabase** doesn't support it. You can follow the progress here 👇

  - [https://github.com/supabase/supabase/discussions/4255](https://github.com/supabase/supabase/discussions/4255)
  - [https://github.com/supabase/postgrest-js/issues/198](https://github.com/supabase/postgrest-js/issues/198)

## 3.26.0

### Minor Changes

- [#2087](https://github.com/refinedev/refine/pull/2087) [`62f1e6256d`](https://github.com/refinedev/refine/commit/62f1e6256dcbe39413b428744cbabe554de696fc) Thanks [@biskuvit](https://github.com/biskuvit)! - Add `foreignTable` propery to the **supabase** order statement to access relational data. For more information, you can check the 🔗[documentation](https://supabase.com/docs/reference/javascript/order).

  What we added to the [`getlist`](https://github.com/refinedev/refine/blob/master/packages/supabase/src/index.ts) hook is the following:

  💡 How use the `foreignTable` property?

  ```tsx
  ...
  const { tableProps } = useTable({
      resource: "posts",
      initialSorter: [
          {
              field: "categories.title",
              order: "asc",
          },
      ],
  });
  ```

  📢 `field: "categories.title"` means in the `posts` table `categories` is the foreign table, `title` is the field in the foreign table, and `asc` is the order.

  🚨 If you are using **Ant Design** don't forget to pass the `sorter` and `dataIndex` property to the your `Columm` component:

  ```tsx
  ...
  <Table.Column
      dataIndex={["categories", "title"]}
      title="Categories"
      sorter
  ```

  > **Warning**
  > We have developed this feature due to an [issue here](https://github.com/refinedev/refine/issues/2066) but currently, **supabase** doesn't support it. You can follow the progress here 👇

  - [https://github.com/supabase/supabase/discussions/4255](https://github.com/supabase/supabase/discussions/4255)
  - [https://github.com/supabase/postgrest-js/issues/198](https://github.com/supabase/postgrest-js/issues/198)

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
