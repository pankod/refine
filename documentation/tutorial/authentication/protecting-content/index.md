---
title: Protecting Content
---

import { Sandpack, CreateAuthProviderFile, AddAuthProviderToAppTsx, AddCheckMethodToAuthProvider, AddAuthenticatedComponentToAppTsx } from "./sandpack.tsx";

<Sandpack>

In this step, we'll be implementing a basic `authProvider` with `check` method to validate the user's authentication status, allowing us to protect our content from unauthenticated users.

Refine can work with any authentication solution with its easy to implement `authProvider` interface. We'll set up an implementation for our fake REST API, which also provides a simple authentication endpoints.

To learn more about the supported auth providers, refer to the [Supported Authentication Providers](/core/docs/guides-concepts/authentication/#supported-auth-providers) section in the Authentication guide.

## Creating an Auth Provider

We'll be implementing each method one-by-one, ensuring thorough coverage of all details.

First, we'll create a `src/providers/auth-provider.ts` file in our project, which will contain all the methods we need to implement for our auth provider.

<CreateAuthProviderFile />

Then, we'll pass our auth provider to `<Refine />` component in `src/App.tsx` file with the `authProvider` prop.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
// highlight-next-line
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine
      dataProvider={dataProvider}
      // highlight-next-line
      authProvider={authProvider}
    >
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
```

<AddAuthProviderToAppTsx />

## Implementing the `check` Method

The `check` method is used by `useIsAuthenticated` hook and the `<Authenticated />` component to check the user's authentication status. It should return a `Promise` which resolves to an object.

If the user is authenticated, the object should contain `authenticated: true` property. Otherwise, it should contain `authenticated: false` property.

We'll obtain an access token through the `login` method from our API and store it inside the local storage. Now let's check if the token exists in the local storage or not.

Update your `src/providers/auth-provider.ts` file by adding the following lines:

```ts title="src/providers/auth-provider.ts"
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  // highlight-start
  check: async () => {
    // When logging in, we'll obtain an access token from our API and store it in the local storage.
    // Now let's check if the token exists in the local storage.
    // In the later steps, we'll be implementing the `login` and `logout` methods.
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
  // highlight-end
  login: async ({ email, password }) => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    throw new Error("Not implemented");
  },
  onError: async (error) => {
    throw new Error("Not implemented");
  },
  // ...
};
```

<AddCheckMethodToAuthProvider />

## Using the `<Authenticated />` Component

After implementing the `check` method, we'll be able to use the `<Authenticated />` component to protect our content from unauthenticated users.

Let's add the `<Authenticated />` component to our `src/App.tsx` file and wrap it around our content inside the `<Refine />` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
// highlight-next-line
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      {/* highlight-start */}
      <Authenticated key="protected" fallback={<div>Not authenticated</div>}>
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
      {/* highlight-end */}
    </Refine>
  );
}
```

<AddAuthenticatedComponentToAppTsx />

:::note

Notice that we've added `key` prop to our `<Authenticated />` component. This is required for the component to work properly especially when it's used multiple times in the same render tree.

:::

Now you should be able to see the `<Authenticated />` component in action. Our content will not be rendered and the `fallback` prop will be rendered instead.

:::tip

You can also use the `useIsAuthenticated` hook instead, which the `<Authenticated />` component uses under the hood. You can learn more about it in the [useIsAuthenticated](/core/docs/authentication/hooks/use-is-authenticated/) hook documentation.

:::

In the next step, we'll be implementing the login and logout functionality and make our `check` method work properly.

</Sandpack>
