---
title: "Usage with Existing Projects Guide | Guides Concepts in Refine v5"
display_title: "Usage with Existing Projects"
sidebar_label: "Usage with Existing Projects"
description: "Integrate Usage With Existing Projects in Refine v5. Learn best practices. Explore directory and page.tsx for real-world React admin panels."
---

Integrating Refine into an existing project is as simple as installing `@refinedev/core` package and importing `Refine` component into your application.

Once imported, `Refine` component provides necessary context to all children components for **Refine** hooks and components to work.

Only required prop for `Refine` component is `dataProvider`. You can read more about data provider [here](/core/docs/data/data-provider/).

## Quickstart

Only needed package for Refine to work is `@refinedev/core`. For demonstration purposes, we will also install `@refinedev/simple-rest` package to use as data provider. You can use one of our data providers or create your own.

<InstallPackagesCommand args="@refinedev/core @refinedev/simple-rest" />

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

function App() {
  return (
    <ExistingProvider>
      <Refine dataProvider={dataProvider(API_URL)}>
        {/* You can use Refine hooks inside here */}
        <ComponentWithRefineHooks />
        <ExistingComponent1>
      </Refine>
    </ExistingProvider>
  );
}
```

## Headless Examples

The following example shows how to use Refine's `useShow` hook with an existing application.

<Tabs wrapContent={false}>

<TabItem value="vite" label="Vite">

import { ViteHeadless } from './vite/headless';

As you can see in the example below, wrapping `App.tsx` file with `Refine` component is enough to use Refine hooks inside your application.

<ViteHeadless />

</TabItem>

<TabItem value="nextjs-app" label="Next.js App">

import { NextJSAppHeadless } from './nextjs/app/headless'

As you can see in the example below, wrapping `layout.tsx` file with `Refine` component is enough to use Refine hooks & components inside your application.

<NextJSAppHeadless />

</TabItem>

<TabItem value="nextjs-pages" label="Next.js Pages">

import { NextJSPagesHeadless } from './nextjs/pages/headless'

As you can see in the example below, wrapping `_app.tsx` file with `Refine` component is enough to use Refine hooks & components inside your application.

<NextJSPagesHeadless />

</TabItem>

</Tabs>

## Router Examples

In the following examples below, we will integrate Refine into `/refine` route of an existing application.

See the [Routing Guide](/core/docs/guides-concepts/routing/) for more information.

<Tabs wrapContent={false} defaultValue="react-router">

<TabItem value="react-router" label="React Router">

import { ViteRouter } from './vite/router';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/react-router @refinedev/simple-rest" />

:::simple

- We start by creating `RefineContext` component in `refine/refine-context.tsx` file.
  This file will be used to wrap `/refine` routes of our application.

- And then in `App.tsx` file, we are adding a new `Route` component with `path="/refine"` and wrapping it with `RefineContext` component.

- Finally, we create `refine/pages/products/list.tsx` file, here we can use Refine features, since it's layout is wrapped with `Refine` component.

:::

<ViteRouter />

</TabItem>

<TabItem value="nextjs-app-router" label="Next.js App">

import { NextJSAppRouter } from './nextjs/app/router';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/nextjs-router @refinedev/simple-rest" />

:::simple

- We start by creating `app/refine/layout.tsx` file, this layout will be used by all pages under `/refine` folder.
- Then we create `app/refine/products/page.tsx` file, here we can use Refine features, since it's layout is wrapped with `Refine` component.

:::

<NextJSAppRouter />

</TabItem>

<TabItem value="nextjs-pages-router" label="Next.js Pages">

import { NextJSPagesRouter } from './nextjs/pages/router';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/nextjs-router @refinedev/simple-rest" />

:::simple

- We start by creating `src/components/layout.tsx` file, this component will be conditionally rendered by `pages/_app.tsx` file.
- Then we create `pages/_app.tsx` file, here we are checking if the current file has `getLayout` function, if it does, we are rendering it by wrapping it with `getLayout` function.
- Then we create `pages/refine/products.tsx` file, here we are adding `Page.getLayout` to our component, so it will be wrapped with `Refine` context. Then we can use Refine features, since it's layout is wrapped with `Refine` component.

:::

<NextJSPagesRouter />

</TabItem>

</Tabs>

## Adding UI to Router Examples

In the following examples below, as a follow-up from the previous router examples, we will add Ant Design layout from `@refinedev/antd` package.

See the [UI Libraries guide](/core/docs/guides-concepts/ui-libraries/) for more information.

<Tabs wrapContent={false} defaultValue="vite">

<TabItem value="vite" label="Vite">

import { ViteAntdLayout } from './vite/layout/antd';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/react-router @refinedev/antd @refinedev/simple-rest" />

:::simple

- We start by modifying `refine-context.tsx` file, adding necessary imports from `@refinedev/antd` package.

- And then in `App.tsx` file, we are updating our `ErrorComponent` import from `@refinedev/core` to `@refinedev/antd`.

- Finally, in `refine/pages/products/list.tsx` file, we are importing `List` component and `useTable` hook from `@refinedev/antd` package.

:::

<ViteAntdLayout />

</TabItem>

<TabItem value="nextjs-app" label="Next.js App">

import { NextJSAppAntdLayout } from './nextjs/app/layout/antd';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/nextjs-router @refinedev/antd @refinedev/simple-rest" />

:::simple

- We start by modifying `app/refine/layout.tsx` file, adding necessary imports from `@refinedev/antd` package.
- Then we modify `app/refine/products/page.tsx` file, here we are using `List` component and `useTable` hook from `@refinedev/antd` package.

:::

<NextJSAppAntdLayout />

</TabItem>

<TabItem value="nextjs-pages" label="Next.js Pages">

import { NextJSPagesAntdLayout } from './nextjs/pages/layout/antd';

First, we need to install necessary packages:

<InstallPackagesCommand args="@refinedev/core @refinedev/nextjs-router @refinedev/antd @refinedev/simple-rest" />

:::simple

- We start by updating `src/components/layout.tsx` file, adding necessary imports from `@refinedev/antd` package.
- Then we modify `pages/refine/products.tsx` file, here we are using `List` component and `useTable` hook from `@refinedev/antd` package.

:::

<NextJSPagesAntdLayout />

</TabItem>

</Tabs>

## Authentication

If want to use Refine with your existing application, probably you already have authentication in-place. In this case, in order to enable Authentication features of `Refine`, only thing you need to do is to implement `AuthProvider`'s [check](/core/docs/authentication/auth-provider#check) method.

:::simple

If you want to handle Authentication with Refine from scratch, check the [Authentication Guide](/core/docs/guides-concepts/authentication/)

:::

### check Method

Once you provide the `check` method, you can use [Authenticated component](/core/docs/authentication/components/authenticated/) and/or [useIsAuthenticated hook](/core/docs/authentication/hooks/use-is-authenticated/) in your application. Refine will redirect user to given login page for unauthenticated users.

```tsx
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  check: async () => {
    const isAuthenticated = myCheckLogic();

    if (isAuthenticated) {
      return { authenticated: true };
    }

    return {
      authenticated: false,
      redirectTo: "/my-login-page",
      error: {
        name: "Authentication Failed.",
        message: "User not found.",
      },
    };
  },
  login: async () => {
    throw new Error("Method not implemented.");
  },
  logout: async () => {
    throw new Error("Method not implemented.");
  },
  onError: async () => {
    throw new Error("Method not implemented.");
  },
};
```

### Optional Methods

Following methods are optional, but could be useful for various use-cases.

#### getIdentity Method

[getIdentity method](/core/docs/authentication/auth-provider/#getidentity) can be used to enable [useGetIdentity hook](/core/docs/authentication/hooks/use-get-identity/).

This hook is also used to rendering current user information in the header of UI Integration layouts.

- [Ant Design Header Docs Header Section](/core/docs/ui-integrations/ant-design/components/themed-layout#header)
- [Material UI Header Docs Header Section](/core/docs/ui-integrations/material-ui/components/themed-layout#header)
- [Chakra UI Header Docs Header Section](/core/docs/ui-integrations/chakra-ui/components/themed-layout#header)
- [Mantine Header Docs Header Section](/core/docs/ui-integrations/mantine/components/themed-layout#header)

#### onError

See [Error Handling section in Authentication Guide](/core/docs/guides-concepts/authentication#error-handling) and [AuthProvider's onError documentation](/core/docs/authentication/auth-provider#onerror)

#### logout

[logout method](/core/docs/authentication/auth-provider#logout) can be used to enable [useLogout hook](/core/docs/authentication/hooks/use-logout/)

This hook is also used to render `Logout` button in the sider of UI Integration layouts.

- [Ant Design Header Docs Sider Section](/core/docs/ui-integrations/ant-design/components/themed-layout#sider)
- [Material UI Header Docs Sider Section](/core/docs/ui-integrations/material-ui/components/themed-layout#sider)
- [Chakra UI Header Docs Sider Section](/core/docs/ui-integrations/chakra-ui/components/themed-layout#sider)
- [Mantine Header Docs Sider Section](/core/docs/ui-integrations/mantine/components/themed-layout#sider)
