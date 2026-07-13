---
id: auth0
title: "Auth0 Integration Guide | Secure Enterprise Authentication in Refine v5"
display_title: "Auth0 Login"
description: "Implement Auth0 in Refine v5. Learn the key steps. Explore secure patterns for OIDC, SSO for secure enterprise React apps. Learn with code examples."
sidebar_label: Auth0 Login
---

[Auth0](https://auth0.com/) is a flexible, drop-in solution for adding authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that comes with building your own solution to authenticate and authorize users. You can check the [Auth0 document](https://auth0.com/docs) for details.

We will show you how to use Auth0 with Refine

### Installation

Run the following command within your project directory to install the Auth0 React SDK:

<InstallPackagesCommand args="@auth0/auth0-react"/>

#### Configure the Auth0Provider component

Wrap your root component with an Auth0Provider that you can import from the SDK.

```tsx title="index.tsx"
import React from "react";
import { createRoot } from "react-dom/client";

// highlight-next-line
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    // highlight-start
    <Auth0Provider
      domain="YOUR_DOMAIN"
      clientId="YOUR_CLIENT_ID"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
    // highlight-end
  </React.StrictMode>,
);
```

:::caution

Refer to [**Auth0 docs**](https://auth0.com/docs/quickstart/spa/react#configure-auth0) for detailed configuration.

:::

### Override `/login` page

First, we need to override the **Refine** login page. In this way, we will redirect it to the Auth0 login page. We create a `login.tsx` file in the `/pages` folder.

```tsx title="/pages/login.tsx"
import { Layout, Button, Space, Typography } from "antd";
import { ThemedTitle } from "@refinedev/antd";
// highlight-next-line
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
  // highlight-next-line
  const { loginWithRedirect } = useAuth0();

  return (
    <Layout
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space direction="vertical" align="center" size="large">
        <ThemedTitle
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
          }}
        />
        <Button
          type="primary"
          size="middle"
          // highlight-next-line
          onClick={() => loginWithRedirect()}
          style={{ width: "240px" }}
        >
          Sign in
        </Button>
        <Typography.Text type="secondary">Powered by Auth0</Typography.Text>
      </Space>
    </Layout>
  );
};
```

After clicking the `Login` button, you will be directed to the auth0 login screen.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/auth0/auth0-login-min.avif" className="border border-zinc-200 rounded" alt="auth0-login" />

## Auth Provider

In Refine, authentication and authorization processes are performed with the auth provider. Let's write a provider for Auth0.

<details>
<summary>Show Code</summary>
<p>

```tsx title="App.tsx"
import { Refine, AuthProvider, Authenticated } from "@refinedev/core";
import {
  ThemedLayout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { useAuth0 } from "@auth0/auth0-react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { Login } from "pages/login";

import axios from "axios";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  const { isLoading, isAuthenticated, user, logout, getIdTokenClaims } =
    useAuth0();

  if (isLoading) {
    return <span>loading...</span>;
  }

  const authProvider: AuthProvider = {
    login: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      logout({ returnTo: window.location.origin });
      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims();
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token.__raw}`,
          };
          return {
            authenticated: true,
          };
        } else {
          return {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Token not found",
            },
            redirectTo: "/login",
            logout: true,
          };
        }
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: "/login",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        return {
          ...user,
          avatar: user.picture,
        };
      }
      return null;
    },
  };

  getIdTokenClaims().then((token) => {
    if (token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token.__raw}`,
      };
    }
  });

  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          authProvider={authProvider}
          dataProvider={dataProvider(API_URL, axios)}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "posts",
              list: "/posts",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                </Authenticated>
              }
            >
              <Route path="/posts" element={<div>dummy list page</div>} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
```

</p>
</details>

### Methods

#### login

`loginWithRedirect` method comes from the `useAuth0` hook.

#### logout

`logout` method comes from the `useAuth0` hook.

#### checkError & getPermissions

We revert to empty promise because Auth0 does not support it.

#### checkAuth

We can use the `isAuthenticated` method, which returns the authentication status of the `useAuth0` hook.

#### getUserIdentity

We can use it with the `user` from the `useAuth0` hook.

## Example

:::caution

Auth0 example doesn't work in CodeSandbox embed mode. With [this](https://cv8k99.csb.app/) link, you can open the example in the browser and try it.

:::

<CodeSandboxExample path="auth-auth0" />
