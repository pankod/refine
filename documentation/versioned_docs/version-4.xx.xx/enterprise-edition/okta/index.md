---
title: "Okta SSO Integration | Refine v4 Enterprise Auth"
display_title: "Okta Auth Provider"
sidebar_label: "Okta Auth Provider"
description: "Secure your enterprise apps with Okta and Refine v4. Step-by-step guide to setting up Single Sign-On (SSO) and identity management."
---

# Okta Auth Provider

Okta is an enterprise-grade identity management service. Refine's integration of Okta's authentication services allows you to easily add Okta services to your application.

## Installation

This package is included in Refine's Enterprise Edition. To learn more about Refine's Enterprise Edition, please [contact us](https://form.typeform.com/to/IzorqxeI).

<InstallPackagesCommand args="@refinedev/okta @okta/okta-auth-js">

```yml title=".npmrc"
# A registry with the auth token should be added for the @refinedev scope
@refinedev:registry=https://registry.refine.dev/
//registry.refine.dev/:_authToken=$NPM_TOKEN
```

</InstallPackagesCommand>

## Usage

First, you'll need to create an `OktaAuth` instance, then use the `createAuthProvider` method to create an auth provider. You can then pass the auth provider to the [`<Refine />`](/core/docs/core/refine-component) component.

The example below uses [`react-router`](/core/docs/routing/integrations/react-router) for routing, but all [router integrations](/core/docs/guides-concepts/routing) of Refine will work the same way.

```tsx title="App.tsx"
import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import OktaAuth from "@okta/okta-auth-js";

import { Authenticated, AuthPage, Refine, WelcomePage } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { createAuthProvider, OktaCallback } from "@refinedev/okta";

const oktaAuth = new OktaAuth({
  issuer: "https://{yourOktaDomain}/oauth2/default",
  clientId: "{clientId}",
  // A redirect uri is set to the current host + '/login/callback'
  // We'll handle this route using the `<OktaCallback />` component.
  // It will complete the auth process and handle the redirect.
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "email", "profile", "offline_access"],
  pkce: true,
  devMode: true,
});

const authProvider = createAuthProvider(oktaAuth);

export const App = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        // We're passing the auth provider to the `<Refine />` component.
        authProvider={authProvider}
      >
        <Routes>
          <Route
            element={
              <Authenticated
                key="authenticated-inner"
                fallback={<CatchAllNavigate to="/login" />}
              >
                <Outlet />
              </Authenticated>
            }
          >
            <Route index element={<WelcomePage />} />
          </Route>
          <Route
            element={
              <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                <NavigateToResource />
              </Authenticated>
            }
          >
            <Route
              path="/login"
              element={
                <AuthPage
                  type="login"
                  hideForm
                  providers={[{ name: "Okta" }]}
                />
              }
            />
            {/* We're mounting `<OktaCallback />` at `/login/callback` route to complete our authentication process. */}
            <Route
              path="/login/callback"
              element={<OktaCallback oktaAuth={oktaAuth} />}
            />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```
