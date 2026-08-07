---
title: "Router Provider Migration Guide | SSR in Refine v5"
display_title: "Migrating Router Provider from 3.x.x to 4.x.x"
description: "Learn to migrate Router Provider in Refine v5. Learn routes for real-world React admin panels. Real-world snippets included. Built for production use."
sidebar_label: Migrating Router Provider
---

## Motivation behind the changes

Our motivation behind the changes to `routerProvider` and route handling was to increase flexibility and ease of use.

By simplifying the `routerProvider` to just an interaction and connection point between **Refine** and the router, we eliminated the need for a specific way of defining routes and a `routerProvider` altogether. This means that **Refine** will meet enterprise-grade requirements. While router bindings are optional, we recommend passing them to **Refine** for optimal usage.

By making these changes, we made it so that people can integrate Refine into their existing projects without needing to modify their current routes or applications

Ultimately, our goal is to make it simple for users to handle their unique situations without enforcing a particular methodology. With the updated router provider, you can continue using routers like before while benefiting from the features that **Refine** offers.

## Important Notes

With the new router provider, the authentication checks are not handled by the routes. If your application utilizes `authProvider`, you will be responsible for performing those checks yourself. You can easily do them by using the `useIsAuthenticated` hook or the `Authenticated` component. Example implementations and more information on each router are present [further down](#using-the-new-router-providers) in the documentation and in the example apps.

Similar to authentication flow, access control checks are also not handled by the routes internally. You will need to handle them yourself using the `useCan` hook or the `CanAccess` component.

The creation and control of routes is entirely up to the user. You must manually create routes, and if desired, pass the routes to actions of your resources. Although we provide methods for generating routes from resources further down the documentation, they are optional and not recommended as they limit flexibility.

### Changes in the `<Refine>` Component

Since route handling is now detached from the `<Refine>` component, props it accepts will change. Layout related props such as `Layout`, `Sider`, `Title`, `Header`, `Footer,` and `OffLayoutArea` are deprecated and won't have any effect when using the new router providers. However, the UI components exported from the package are still well-supported and can be used inside your app while creating your routes and pages.

Similarly, the `DashboardPage`, `catchAll` and `LoginPage` components are also deprecated and won't have any affect when using the new router providers. You need to create your own routes and pages to replace them.

:::info Legacy Behavior (Dashboard Page)

Since the `DashboardPage` prop is now deprecated, you need to create your own index route for your dashboard. You can use the `resources` array to add this item to your `<Sider>` menu. `useMenu` will use the `resources` array to generate the menu items. You can also use the `useMenu` hook to create your own menu.

:::

You can now create your own error and login pages the appropriate way for your router to replace the `catchAll` and `LoginPage` props that were used for the creation of their respective pages. You can find how its done [further down](#using-the-new-router-providers) in the documentation.

### Changes in Custom `<Sider>` Components

If you have swizzled the `<Sider>` component from your UI package and customized it, you might need to update them accordingly if you're using the new `routerProvider` prop of `<Refine>`.

#### Updating `useRouterContext` Usage

With the new `routerProvider` prop, the v3 compatible router providers are now provided through the `legacyRouterProvider` prop. If you're using the `legacyRouterProvider`, `useRouterContext` will continue working as before. However, if you're using the new `routerProvider`, `useRouterContext` hook will be deprecated and useless for you but can easily be replaced with the router hooks that are `useLink`, `useGo`, `useBack` and `useParsed.`

In the `<Sider>` components, we have used the `Link` component from `useRouterContext`. You can easily replace the usage of `Link` with the `useLink` hook or just switch to the `Link` implementations from your router. (e.g. `react-router-dom`'s `Link` component or the `next/link` component)

```diff
- import { useRouterContext } from "@refinedev/core";
+ import { useLink } from "@refinedev/core";

const CustomSider = () => {
-   const { Link } = useRouterContext();
+   const Link = useLink();

    /* ... */
}
```

:::note

If you have customized the use of `useMenu` hook, you might need to check the usage of it to make sure it's working as expected. Even though the `useMenu` hook has not been changed in its return values, the way it generates the menu item keys has changed.

:::

### Behavioral Changes in Routing

Since **Refine** doesn't create routes internally anymore, you are free to create your routes according to your framework without any limitations.

This means that tasks such as `authentication` and `access control` are decoupled from **Refine** and should be handled in accordance with your framework. However, we do provide a set of helpers for you to use in your components to make these tasks easier to handle:

- The [`Authenticated`](/core/docs/authentication/components/authenticated/) component as a wrapper or the `useIsAuthenticated` hook for authentication
- The [`CanAccess`](/core/docs/authorization/components/can-access/) component as a wrapper or the `useCan` hook for access control

## Using the New Router Providers

We have created documents for each router we provide bindings for, which you can check out below:

### React Router v6

If you are using `react-router-dom` and `@refinedev/react-router-v6`, you will need to generate your routes using `Routes`, `Route`, `Outlet` and similar components, and then wrap the `<Refine>` component with your chosen router (e.g. `<BrowserRouter>`). Afterwards, you may pass the routerProvider to the `<Refine>` component from `@refinedev/react-router-v6`, and specify the paths for your resource actions in the `resources` array. Our documentation provides detailed instructions on how to create routes, associate them with your resources, and includes examples for reference.

:::caution Known Issues

Refine previously utilized `react-router-dom@6.3.0`, but it has now been updated to `react-router-dom@latest`. Since partial segment support was removed in version `6.5.0`, your custom routes may not function as intended. If you are still using partial segments in your routes, you will need to update your files like this:

```diff
  <Refine
-    routerProvider={{
-       ...routerProvider,
-        routes: [
-            {
-                element: <ProfilePage />,
-                path: "profile/@:username/:page",
            },
        ],
    }}
+    routerProvider={routerProvider}
  >
+  <Route path="profile/:username/:page" element={<ProfilePage />} />
  </Refine>
```

```diff
- <Link to="profile/@:username/:page" />
+ <Link to="profile/:username/:page" />
```

[Refer to the `react-router-dom@6.5.0` changelog for more information ->](https://github.com/remix-run/react-router/releases/tag/react-router%406.5.0)

:::

Check out the documentation for [`@refinedev/react-router-v6`](/core/docs/packages/list-of-packages/)
and [`react-router-dom`](https://reactrouter.com)

### Remix and Next.js

If you are using Remix or Next.js, you will first need to create your routes using the file system-based routing method as you would normally do. Afterwards, you can pass the `routerProvider` from `@refinedev/remix-router` or `@refinedev/nextjs-router` to the `<Refine>` component, and specify the paths for your resource actions in the `resources` array. Our documentation provides step-by-step instructions on how to create routes and associate them with your resources, complete with examples for your reference.

Check out their respective documentations:

- > [`@refinedev/remix-router`](/core/docs/packages/list-of-packages/) and [`Remix`](https://remix.run/docs/en/main) documentations for Remix
- > [`@refinedev/nextjs-router`](/core/docs/packages/list-of-packages/) and [`Next.js`](https://nextjs.org/docs/getting-started) documentations for Next.js.
