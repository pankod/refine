---
id: auth0
title: Auth0 Login
---

[Auth0](https://auth0.com/) is a flexible, drop-in solution for adding authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that comes with building your own solution to authenticate and authorize users. You can check the [Auth0 document](https://auth0.com/docs) for details.

We will show you how to use Auth0 with refine

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

### Override login page

First, we need to override the **refine** login page. In this way, we will redirect it to the Auth0 login page. We create a `login.tsx` file in the `/pages` folder.

```tsx title="/pages/login.tsx"
import { AntdLayout, Button } from "@pankod/refine-antd";
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
  // highlight-next-line
  const { loginWithRedirect } = useAuth0();

  return (
    <AntdLayout
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
        backgroundSize: "cover",
      }}
    >
      <div style={{ height: "100vh", display: "flex" }}>
        <div style={{ maxWidth: "200px", margin: "auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <img src="./refine.svg" alt="Refine" />
          </div>
          <Button
            type="primary"
            size="large"
            block
            //highlight-next-line
            onClick={() => loginWithRedirect()}
          >
            Sign in
          </Button>
        </div>
      </div>
    </AntdLayout>
  );
};
```

After clicking the `Login` button, you will be directed to the auth0 login screen.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/auth0/auth0-login.gif" alt="auth0-login" />
<br/>

## Auth Provider

In refine, authentication and authorization processes are performed with the auth provider. Let's write a provider for Auth0.

```tsx title="App.tsx"
import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useAuth0 } from "@auth0/auth0-react";

import "@pankod/refine-antd/dist/reset.css";

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
    login: () => {
      return Promise.resolve();
    },
    logout: () => {
      logout({ returnTo: window.location.origin });
      return Promise.resolve("/");
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      if (isAuthenticated) {
        return Promise.resolve();
      }

      return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => {
      if (user) {
        return Promise.resolve({
          ...user,
          avatar: user.picture,
        });
      }
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
    <Refine
      LoginPage={Login}
      routerProvider={routerProvider}
      authProvider={authProvider}
      dataProvider={dataProvider(API_URL, axios)}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={useNotificationProvider}
      catchAll={<ErrorComponent />}
      resources={[
        {
          name: "posts",
        },
      ]}
    />
  );
};

export default App;
```

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
