---
title: "Authentication Concepts | Refine v4 Security Guide"
display_title: "Authentication"
sidebar_label: "Authentication"
description: "Master the fundamentals of identity management in Refine v4. Learn how auth providers, hooks, and pages work together for secure apps."
---

import Register from "./register";
import Login from "./login";
import IsAuthenticated from "./is-authenticated";
import OnError from "./on-error";
import AuthProviderInterface from "./auth-provider-interface.md";
import AuthHooks from "@site/src/partials/auth-provider/auth-hooks.md";
import AuthProviderExamplesLinks from "@site/src/partials/auth-provider/auth-provider-examples-links.md";

Authentication is the process of verifying the identity of a user or client. It's a critical component of security, ensuring that only authorized users can access certain features or data within the application. Whether you are building a complex **enterprise-level** application or a simple CRUD interface, Refine's authentication system provides the necessary infrastructure to protect your pages and ensure that users interact with your application in a secure and controlled manner.

Refine's **flexible architecture** allows you to easily implement various authentication strategies:

- [Google](https://developers.google.com/identity/protocols/oauth2)
- [Amazon Cognito](https://aws.amazon.com/cognito/)
- [Okta](https://www.okta.com/) (Included in [Refine's Enterprise Edition](/core/docs/enterprise-edition/okta))
- [Auth0](https://auth0.com/)

You can implement your own authentication system or use one of the [supported auth providers](#supported-auth-providers).

> [To learn more about how to create auth provider, check out the tutorial page.][create-auth-provider-tutorial]

## Auth Provider

Refine handles authentication by [Auth Provider](#auth-provider) and consumes the auth provider methods by [auth hooks](#auth-hooks).

Auth provider is an object that contains methods to handles authentication in your app, designed to return promises for use with async methods. By offering a structured architecture it simplifies authentication implementation and management through your app.

To activate authentication in your app, you need to pass an `authProvider` to the `<Refine />` as a prop. Once you provide auth provider, you can utilize our auth hooks (useLogin, useRegister, useIsAuthenticated etc.) to easily manage your authentication.

```tsx title="App.tsx"
import { Refine, AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { status } = handleLogin(email, password);

    if (status === 200) {
      return { success: true, redirectTo: "/dashboard" };
    } else {
      return {
        success: false,
        error: { name: "Login Error", message: "Invalid credentials" },
      };
    }
  },
  check: async (params) => ({}),
  logout: async (params) => ({}),
  onError: async (params) => ({}),
  register: async (params) => ({}),
  forgotPassword: async (params) => ({}),
  updatePassword: async (params) => ({}),
  getPermissions: async (params) => ({}),
  getIdentity: async (params) => ({}),
};

const App = () => {
  // highlight-next-line
  return <Refine authProvider={authProvider}>...</Refine>;
};
```

## Handling Authentication

Refine provides a set of hooks to handle authentication. You can use these hooks to manage your authentication process. You can find the [list of hooks](#auth-hooks) below.

### Register

Let's start with registering a new user. To register a new user, we will implement `authProvider.register` method. We will call this method with `useRegister` hook when the user submits the registration form.

<Register />

### Login

After registering a new user, we will implement `authProvider.login` method to login the user. We will call this method with `useLogin` hook when the user submits the login form. This implementation is very similar to the registration process.

<Login />

### Checking Authentication

In the previous examples, the registration and login process were set up. Next, we need to check if the user is authenticated or not. This will be done by using the `authProvider.check` method together with the `useIsAuthenticated` hook.

By using `useIsAuthenticated` hook, we can easily check if the user is authenticated or not. If they are, the user's profile will be shown. If not, the `<Login />` component will appear.

Additionally, in this example, we will implement `authProvider.logout` and `authProvider.getIdentity` methods. We will call these methods with `useLogout` and `useGetIdentity` hooks. These hooks make it easy to log out users and get their identity information.

<IsAuthenticated />

Refine also provides `<Authenticated />` component to easily handle authentication state. You can use this component to protect your routes and conditionally render your components.

[To learn more about the `<Authenticated />` component, check out the reference page.](/core/docs/authentication/components/authenticated)

```tsx
import { Authenticated } from "@refinedev/core";

const Page = () => {
  return (
    <Authenticated
      loading={<div>loading...</div>}
      fallback={<div>You cannot access this section</div>}
    >
      <h1>Welcome to your dashboard</h1>
    </Authenticated>
  );
};
```

### Usage with data provider <GuideBadge id="guides-concepts/data-fetching/" />

After implementing the authentication process, we need to inform data provider about the authentication credentials. We can do this by sending the authentication credentials with the request. For example after obtaining the authentication token we can store it in cookies and sent it with on every request.

[To learn more about the how to use authentication with data provider and working example, check out data fetching guide.](/core/docs/guides-concepts/data-fetching/#authentication-)

## Error Handling

`authProvider.onError` method is used to handle errors that occur during the http request.

Under the hood, Refine utilizes the [`useOnError`][use-on-error] hook for all data hooks. This means that when a promise is rejected from the `dataProvider` or when you get an error response from the API, Refine automatically calls `authProvider.onError` by using the `useOnError` hook.

Let's say wan't to get product from the API with [`useOne`][use-one] hook. If the user is not authenticated, the API will return an error response. You can handle this error by implementing `authProvider.onError` method and Refine will automatically call this method when the error occurs.

<OnError />

Once you implement `authProvider.onError` method, you can call this method with [`useOnError`][use-on-error] hook. This will help you to handle errors in single place.

## UI Integrations

### `<AuthPage />`

While Refine itself is headless, it offers `<AuthPage />` Integrations for popular UI libraries for:

- [Headless](/core/docs/authentication/components/auth-page)
- [Ant Design](/core/docs/ui-integrations/ant-design/components/auth-page)
- [Material UI](/core/docs/ui-integrations/material-ui/components/auth-page)
- [Chakra UI](/core/docs/ui-integrations/chakra-ui/components/auth-page)
- [Mantine](/core/docs/ui-integrations/mantine/components/auth-page)

With `<AuthPage />` component you can easily handle authentication pages (login, register, update password, forgot password) and speed up your development process.

<Tabs wrapContent={false}>

<TabItem value="Headless">

import { HeadlessAuth } from './auth-pages/headless';

<HeadlessAuth/>

</TabItem>

<TabItem value="Ant Design">

import { AntdAuth } from './auth-pages/antd';

<AntdAuth/>

</TabItem>

<TabItem value="Material UI">

import { MaterialUIAuth } from './auth-pages/mui';

<MaterialUIAuth/>

</TabItem>

<TabItem value="Chakra UI">

import { ChakraUIAuth } from './auth-pages/chakra';

<ChakraUIAuth/>

</TabItem>

<TabItem value="Mantine">

import { MantineAuth } from './auth-pages/mantine';

<MantineAuth/>

</TabItem>

</Tabs>

### Notification <GuideBadge id="notification/notification-provider" />

Refine provides a automatic notification system to notify users about the authentication errors. To use this feature, you need to pass [`notificationProvider`](/core/docs/notification/notification-provider) to the `<Refine />` component.

Once you provide `notificationProvider`, Refine will automatically notify users about the authentication errors on following auth provider methods:

- register
- login
- logout
- forgotPassword
- updatePassword

For example, when you return `error` object from the `authProvider.login` method, Refine will automatically notify users about the error.

```tsx
import { Refine, AuthProvider } from "@refinedev/core";
import { handleLogin } from "./utils";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { status } = handleLogin(email, password);
    if (status === 418) {
      return {
        success: false,
        error: { name: "Login Error", message: "Invalid credentials" },
      };
    }
  },
  ...
};
```

## Router Integrations <GuideBadge id="guides-concepts/routing/" />

Refine provides a automatic routing system to redirect users to the desired page after the authentication process. To use this feature, you need to pass [`routerProvider`](/core/docs/routing/router-provider) to the `<Refine />` component.

Once you provide `routerProvider`, Refine will automatically redirect users to the desired page on following auth provider methods:

- register
- login
- logout
- onError
- forgotPassword
- updatePassword

For example, when you return `redirectTo` object from the `authProvider.register` method, Refine will automatically redirect users to the desired page.

```tsx
import { Refine, AuthProvider } from "@refinedev/core";
import { handleLogin } from "./utils";

export const authProvider: AuthProvider = {
  register: async ({ email, password }) => {
    const { status } = handleLogin(email, password);
    if (status === 418) {
      return {
        success: false,
        redirectTo: "/forgot-password",
        error: { name: "Register Error", message: "User already exists" },
      };
    }
  },
  ...
};
```

## Auth hooks

<AuthHooks />

## OAuth Integrations

Flexible architecture of auth provider allows you to integrate your **own** or [third-party authentication systems](#supported-auth-provider) into Refine.

You can use the following oAuth provider implementations as a starting point for your own auth provider or you can use them as it is.

- [Google](https://github.com/refinedev/refine/tree/main/examples/auth-google-login)
- [Auth0](https://github.com/refinedev/refine/tree/main/examples/auth-auth0)
- [Kinde](https://github.com/refinedev/refine/tree/main/examples/auth-kinde)
- [Keycloak](https://github.com/refinedev/refine/tree/main/examples/auth-keycloak)
- [supabase](https://github.com/refinedev/refine/tree/main/examples/data-provider-supabase)
- [Strapi](https://github.com/refinedev/refine/tree/main/examples/data-provider-strapi-v4)
- [Auth.js](https://github.com/refinedev/refine/tree/main/examples/with-nextjs-next-auth)

[To learn more about the `authProvider` interface, check out the reference page.](/core/docs/authentication/auth-provider)

## Supported Auth Providers

<AuthProviderExamplesLinks />

> For more information on how you can create your own auth providers, refer to the [Create a Auth Provider tutorial &#8594][create-auth-provider-tutorial]

## `authProvider` Interface

To better understand the auth provider interface, we have created an example that demonstrates how the required methods are implemented. For more comprehensive and diverse examples, you can refer to the [supported auth providers](#supported-auth-providers) section.

[To learn more about the `authProvider` interface, check out the reference page.](/core/docs/authentication/auth-provider)

<AuthProviderInterface />

[use-login]: /core/docs/authentication/hooks/use-login
[use-logout]: /core/docs/authentication/hooks/use-logout
[use-is-authenticated]: /core/docs/authentication/hooks/use-is-authenticated
[use-on-error]: /core/docs/authentication/hooks/use-on-error
[use-get-identity]: /core/docs/authentication/hooks/use-get-identity
[use-permissions]: /core/docs/authentication/hooks/use-permissions
[use-register]: /core/docs/authentication/hooks/use-register
[use-forgot-password]: /core/docs/authentication/hooks/use-forgot-password
[use-update-password]: /core/docs/authentication/hooks/use-update-password
[create-auth-provider-tutorial]: /core/docs/authentication/auth-provider
[use-one]: /core/docs/data/hooks/use-one
