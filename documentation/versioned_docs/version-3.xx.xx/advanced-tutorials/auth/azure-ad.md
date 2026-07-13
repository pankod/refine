---
id: azure-ad
title: Azure AD Login
---

# Azure Active Directory B2C (AAD B2C)

[Azure Active Directory B2C](https://learn.microsoft.com/en-us/azure/active-directory-b2c/overview) provides business-to-customer identity as a service. Your customers use their preferred social, enterprise, or local account identities to get single sign-on access to your applications and APIs.

The Microsoft Authentication Library (MSAL) enables developers to acquire security tokens from the Microsoft identity platform to authenticate users and access secured web APIs. It can be used to provide secure access to Microsoft Graph, other Microsoft APIs, third-party web APIs, or your own web API. MSAL supports many different application architectures and platforms including .NET, JavaScript, Java, Python, Android, and iOS.

:::tip
We use Azure AD B2C in our example but authentication with Azure AD should be very similar.
:::

### Installation

We will be using the javascript version of msal library and a helper for react. You can find more about the msal library here: [docs](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview)

To install the required dependencies, run the following command:

<InstallPackagesCommand args="@azure/msal-browser @azure/msal-react"/>

Detailed documentation for using msal with react can be found here: [docs](https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-quickstart?pivots=devlang-react)

## Configure the MsalProvider component

We've create config file in `src/config.ts` folder. This file contains the configuration for the msal library. You can find more information about the configuration options here: [docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications)

```ts title="src/config.ts"
import { Configuration, LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: "YOUR_CLIENT_ID", //`${process.env.REACT_APP_AZURE_AAD_CLIENT_ID}`,
        authority: "YOUR_AUTHORITY", //`https://${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.b2clogin.com/${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.onmicrosoft.com/${process.env.REACT_APP_AZURE_AAD_POLICY_NAME}`,
        knownAuthorities: ["YOUR_KNOWN_AUTHORITIES"], //[`${process.env.REACT_APP_AZURE_AAD_TENANT_NAME}.b2clogin.com`],
        redirectUri: "http://localhost:3000/", // Replace appropriately
        postLogoutRedirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};

export const tokenRequest = {
    scopes: [...] // Replace ... with your custom scopes
};


// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "ENTER_THE_GRAPH_ENDPOINT_HERE/v1.0/me"
};
```

:::note
We recommend to use environment variables for the configuration parameters.
:::

Wrap your root component with an `MsalProvider` that you can import from the SDK.

```tsx title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";

import {
  EventType,
  PublicClientApplication,
  AccountInfo,
  EventPayload,
  SilentRequest,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

import App, { TOKEN_KEY } from "./App";
import { msalConfig, tokenRequest } from "./config";

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback(async (event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const payload: EventPayload = event.payload;
    msalInstance.setActiveAccount(payload as AccountInfo);

    let account = msalInstance.getActiveAccount();

    const request: SilentRequest = {
      ...tokenRequest,
      account: account!,
    };
    try {
      // Silently acquires an access token which is then attached to a request for API access
      const response = await msalInstance.acquireTokenSilent(request);
      console.log("Fetching access token: success");
      console.log("Scopes", response.scopes);
      console.log("Token Type", response.tokenType);

      localStorage.setItem(TOKEN_KEY, response.accessToken);
    } catch (e) {
      msalInstance.acquireTokenPopup(request).then((response) => {
        localStorage.setItem(TOKEN_KEY, response.accessToken);
      });
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
);
```

## Override login page

First, we need to override the refine login page. In this way, we will redirect it to the Azure AD login page. We create a `login.tsx` file in the `/src` folder.

```tsx title="src/login.tsx"
import React from "react";
import { useLogin } from "@pankod/refine-core";
import { AntdLayout, Button } from "@pankod/refine-antd";

const LoginPage = () => {
  const SignInButton = () => {
    const { mutate: login } = useLogin();

    return (
      <Button type="primary" size="large" block onClick={() => login()}>
        Sign in
      </Button>
    );
  };

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
          <SignInButton />
        </div>
      </div>
    </AntdLayout>
  );
};

export default LoginPage;
```

## Auth Provider

In refine, authentication and authorization processes are performed with the auth provider. Let's write a provider for Azure AD.

```tsx title="src/App.tsx"
import { Refine, AuthProvider } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { AccountInfo, SilentRequest } from "@azure/msal-browser";
import axios from "axios";

import LoginPage from "./login";
import { tokenRequest } from "./config";

export const TOKEN_KEY = "refine-auth";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  // Here we can perform any function we'd like on the request
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem(TOKEN_KEY);

    // Check if the header property exists
    if (config.headers) {
      // Set the Authorization header if it exists
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
);

const App: React.FC = () => {
  const API_URL = "https://api.fake-rest.refine.dev";

  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress, accounts } = useMsal();

  if (inProgress === "login" || inProgress === "handleRedirect") {
    return <div>Loading...</div>;
  }

  const account: AccountInfo = accounts[0];

  const request: SilentRequest = {
    ...tokenRequest,
    account,
  };

  const authProvider: AuthProvider = {
    login: async () => {
      instance.loginRedirect(); // Pick the strategy you prefer i.e. redirect or popup
      return Promise.resolve(false);
    },
    register: async () => Promise.resolve(),
    resetPassword: async () => Promise.resolve(),
    updatePassword: async () => Promise.resolve(),
    logout: async () => Promise.resolve(),
    checkAuth: async () => {
      try {
        if (account) {
          const token = await instance.acquireTokenSilent(request);
          localStorage.setItem(TOKEN_KEY, token.accessToken);
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      } catch (e) {
        return Promise.reject();
      }
    },
    checkError: async () => Promise.resolve(),
    getPermissions: async () => Promise.resolve(),
    getUserIdentity: async (): Promise<AccountInfo> => {
      if (account === null || account === undefined) {
        return Promise.reject();
      }
      return Promise.resolve(account);
    },
  };

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL, axiosInstance)}
      authProvider={authProvider}
      LoginPage={LoginPage}
      Layout={Layout}
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
