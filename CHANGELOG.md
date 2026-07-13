# @refinedev/core

## v3.97.0

## What's Changed

Features

- #### Added swizzle support for `@pankod/refine-core` package

  - The swizzle is a command in refine-cli that allows you to customize the Refine's supported components and data providers. It allows you to eject selected files from the Refine packages and modify depending on your needs.
  - [Refer to Swizzle Docs for more information](https://refine.dev/docs/packages/cli/#swizzle)

  Swizzleable components:

  - Authenticated
  - CanAccess
  - ErrorPage
  - Authentication Pages
  - Login
  - Logout
  - Register
  - ForgotPassword
  - UpdatePassword

- #### Added `@pankod/refine-inferencer` package
  - `@pankod/refine-inferencer` is a package that provides a way to automatically generate views for resources based on the data structure.
  - [Refer to Inferencer Docs for more information](https://refine.dev/docs/packages/documentation/inferencer/)

### Minor Changes

- [`0767d7a07a7`](https://github.com/refinedev/refine/commit/0767d7a07a71366946e54486ae3869499337433e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added the `useInfiniteList` hook 🥳. This hook is a modified version of react-query's [`useInfiniteQuery`](https://tanstack.com/query/latest/docs/react/guides/infinite-queries) used for retrieving items from a resource with pagination, sort, and filter configurations.

  [Refer to `useInfiniteList` docs for further information. →](https://refine.dev/docs/api-reference/core/hooks/data/useInfiniteList/)

- [#3324](https://github.com/refinedev/refine/pull/3324) [`9bfb34749bc`](https://github.com/refinedev/refine/commit/9bfb34749bc8ddaaf80ccffbd0ad6d0a4487309b) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass mutation options to `useMutation` hooks in mutation hooks:

  - `useCreate` (data)
  - `useUpdate` (data)
  - `useDelete` (data)
  - `useDeleteMany` (data)
  - `useUpdateMany` (data)
  - `useCreateMany` (data)
  - `useCustomMutation` (data)
  - `useLogin` (auth)
  - `useLogout` (auth)
  - `useRegister` (auth)
  - `useForgotPassword` (auth)
  - `useUpdatePassword` (auth)
  - `useForm` (form)

- [#3442](https://github.com/refinedev/refine/pull/3442) [`8f2954611fa`](https://github.com/refinedev/refine/commit/8f2954611fa1dd1ebcc7519c416c6ef2554ca395) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added swizzle support for `@pankod/refine-core` package.

  Swizzleable components:

  - `Authenticated`
  - `CanAccess`
  - `ErrorPage`
  - Authentication Pages
    - `Login`
    - `Logout`
    - `Register`
    - `ForgotPassword`
    - `UpdatePassword`

- [#3140](https://github.com/refinedev/refine/pull/3140) [`102bfbf3283`](https://github.com/refinedev/refine/commit/102bfbf32830febe10b99655723863ebd277aadb) Thanks [@aliemir](https://github.com/aliemir)! - - Bumped Next.js to 13

  - Added support for experimental `appDir` option in `next.config.js` to allow for the latest Next.js features.

  ## `pages` directory

  Current support for `pages` directory has not changed and will continue to work as before. It will be supported as long as `Next.js` continues to support and prompts it as the stable way of working with `Next.js`.

  ## `appDir` option

  `appDir` option is a new experimental feature in `Next.js` that introduces a bunch of new features. It is currently in beta and is not stable. It is not recommended to use it in production. But can be used alongside the current `pages` directory support.

  To use `appDir` option, you need to add it to your `next.config.js` file.

  ```js
  // next.config.js
  module.exports = {
    /* ... */
    experimental: {
      appDir: true,
    },
  };
  ```

  ## Using `appDir` with **Refine**

  We've needed to make some changes to the `@pankod/refine-nextjs-router` to make it work with the current structure of the `app` directory feature. To make sure these do not break the current support for `pages` directory, we've added a new exports at the sub path `@pankod/refine-nextjs-router/app` that can be used with the `appDir` option.

  **Note**

  To make optional catch-all routes to work with the `app` directory, you need to define them as directories unlike the option of defining them as files with `pages` directory.

  You need to use `NextRouteComponent` from `@pankod/refine-nextjs-router/app` instead of `NextRouteComponent` from `@pankod/refine-nextjs-router` when using `appDir` option.

  Inside your `layout` file, you need to bind `params` to `routerProvider` to make sure `@pankod/refine-nextjs-router` can work properly with the new structure.

  ```tsx
  // app/[[...refine]]/layout.tsx
  "use client";

  import routerProvider from "@pankod/refine-nextjs-router/app";

  const Layout = ({ children, params }) => {
    return (
      <Refine
        routerProvider={routerProvider.apply({ params })}
        /* ... */
      >
        {children}
      </Refine>
    );
  };
  ```

  **Warning**

  Please note that, unlike the `routerProvider` from the `@pankod/refine-nextjs-router`, `routerProvider` from `@pankod/refine-nextjs-router/app` is a function and you need to bind `params` to make it work properly.

  ```tsx
  // app/[[...refine]]/page.tsx

  "use client";

  import { NextRouteComponent } from "@pankod/refine-nextjs-router/app";

  export default NextRouteComponent;
  ```

  **Warning**

  You need to add `"use client";` directive to both `layout.tsx` and `page.tsx` inside `app/[[...refine]]` directory.

  **Warning**

  `checkAuthentication` does not work with `appDir`. We're aiming to release a substitute for it using middleware but for now its not included in this release.

### Patch Changes

- [#3436](https://github.com/refinedev/refine/pull/3436) [`ea74f3a8408`](https://github.com/refinedev/refine/commit/ea74f3a8408bb53097f0e4a6b3b733d515b2a4d3) Thanks [@sevkioruc](https://github.com/sevkioruc)! - Fix useList, useCustom and useCustomMutation hooks i18n issue in the error messages.
- [#3440](https://github.com/refinedev/refine/pull/3440) [`96d93eb2d71`](https://github.com/refinedev/refine/commit/96d93eb2d714d2559faf25c7eab5b4db31f1bf4c) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Made the auth provider's `usePermissions` method optional.
- [#3436](https://github.com/refinedev/refine/pull/3436) [`ea74f3a8408`](https://github.com/refinedev/refine/commit/ea74f3a8408bb53097f0e4a6b3b733d515b2a4d3) Thanks [@sevkioruc](https://github.com/sevkioruc)! - Fix useList, useCustom and useCustomMutation hooks i18n issue in the error messages.
- [#3440](https://github.com/refinedev/refine/pull/3440) [`96d93eb2d71`](https://github.com/refinedev/refine/commit/96d93eb2d714d2559faf25c7eab5b4db31f1bf4c) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Made the auth provider's `usePermissions` method optional.
- [#3324](https://github.com/refinedev/refine/pull/3324) [`9bfb34749bc`](https://github.com/refinedev/refine/commit/9bfb34749bc8ddaaf80ccffbd0ad6d0a4487309b) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass mutation options to `useMutation` hooks in mutation hooks:
  - `useForm`
  - `useStepsForm`
  - `useModalForm`
  - `useDrawerForm`

### 🪄 Migrating your project automatically with Codemod ✨

`@pankod/refine-codemod` package handles the breaking changes for your project automatically, without any manual steps. It migrates your [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/next/packages/antd) version from 3.x.x to 4.x.x.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @pankod/refine-codemod antd4-to-antd5
```

And it's done. Now your project uses `@pankod/refine-antd@4.x.x`.
