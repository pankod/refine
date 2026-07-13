---
title: Logging In & Out
---

import { Sandpack, AddLoginMethodToAuthProvider, CreateLoginComponentFile, AddLoginToAppTsx, AddUseLoginToLoginComponent, AddLogoutMethodToAuthProvider, CreateHeaderComponentFile, AddHeaderToAppTsx, AddUseLogoutToHeaderComponent } from "./sandpack.tsx";

<Sandpack>

In the previous step, we've added the `<Authenticated />` component to our `src/App.tsx` file to protect our content from unauthenticated users. Now, we'll be implementing the `login` and `logout` methods in our auth provider to enable our users to login and logout.

## Implementing the `login` Method

The `login` method will be used to authenticate the user and other related operations such as storing the token etc. It should return a `Promise` which resolves to an object. The object should contain `success` property to indicate whether the login operation was successful or not.

Our fake REST API requires us to send a `POST` request to `/auth/login` endpoint with the `email` and `password` parameters in the request body. It will return a `token` in the response body.

We'll also be storing the `token` in the `localStorage` for later use.

Update your `src/providers/auth-provider.ts` file by adding the following lines:

```ts title="src/providers/auth-provider.ts"
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  // highlight-start
  // login method receives an object with all the values you've provided to the useLogin hook.
  login: async ({ email, password }) => {
    const response = await fetch(
      "https://api.fake-rest.refine.dev/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
      return { success: true };
    }

    return { success: false };
  },
  // highlight-end
  check: async () => {
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
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

<AddLoginMethodToAuthProvider />

## Using the `useLogin` Hook

After implementing the `login` method, we'll be able to call `useLogin` hook and login our users. Let's create a component called `Login` and mount it inside our `<Refine />` component.

<CreateLoginComponentFile />

Then, we'll mount our `<Login />` component and pass it to the `<Authenticated />` component as the `fallback` prop in our `src/App.tsx` file.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

// highlight-next-line
import { Login } from "./pages/login";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated
        key="protected"
        // highlight-next-line
        fallback={<Login />}
      >
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
```

<AddLoginToAppTsx />

Finally, we'll import `useLogin` hook and use it inside our `Login` component to login our users.

Update your `src/pages/login.tsx` file by adding the following lines:

```tsx title="src/pages/login.tsx"
import React from "react";
// highlight-next-line
import { useLogin } from "@refinedev/core";

export const Login = () => {
  // highlight-next-line
  const {
    mutate,
    mutation: { isPending },
  } = useLogin();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries());
    // Calling mutate to submit with the data we've collected from the form.
    // highlight-next-line
    mutate(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          // We're providing default values for demo purposes.
          defaultValue="demo@demo.com"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          // We're providing default values for demo purposes.
          defaultValue="demodemo"
        />

        {isPending && <span>loading...</span>}
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
    </div>
  );
};
```

<AddUseLoginToLoginComponent />

## Implementing the `logout` Method

The `logout` method will be used to logout the user and other related operations such as removing the token etc. It should return a `Promise` which resolves to an object. The object should contain `success` property to indicate whether the logout operation was successful or not.

Our fake REST API doesn't require us to send any request to logout the user. We'll just be removing the `token` from the `localStorage`.

Update your `src/providers/auth-provider.ts` file by adding the following lines:

```ts title="src/providers/auth-provider.ts"
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  // highlight-start
  logout: async () => {
    localStorage.removeItem("my_access_token");
    // We're returning success: true to indicate that the logout operation was successful.
    return { success: true };
  },
  // highlight-end
  // login method receives an object with all the values you've provided to the useLogin hook.
  login: async ({ email, password }) => {
    const response = await fetch(
      "https://api.fake-rest.refine.dev/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
      return { success: true };
    }

    return { success: false };
  },
  check: async () => {
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
  onError: async (error) => {
    throw new Error("Not implemented");
  },
  // ...
};
```

<AddLogoutMethodToAuthProvider />

## Using the `useLogout` Hook

After implementing the `logout` method, we'll be able to call `useLogout` hook and logout our users. Let's create a component called `Header` to add a logout button and mount it inside our `<Refine />` component.

<CreateHeaderComponentFile />

Then, we'll mount our `<Header />` component and pass it to the `<Authenticated />` component as children in our `src/App.tsx` file.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
// highlight-next-line
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated key="protected" fallback={<Login />}>
        {/* highlight-next-line */}
        <Header />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
```

<AddHeaderToAppTsx />

Finally, we'll import `useLogout` hook and use it inside our `Header` component to logout our users.

Update your `src/components/header.tsx` file by adding the following lines:

```tsx title="src/components/header.tsx"
import React from "react";
// highlight-next-line
import { useLogout } from "@refinedev/core";

export const Header = () => {
  // highlight-next-line
  const {
    mutate,
    mutation: { isPending },
  } = useLogout();

  return (
    <>
      <h2>Welcome!</h2>
      <button
        type="button"
        disabled={isPending}
        // highlight-next-line
        onClick={mutate}
      >
        Logout
      </button>
    </>
  );
};
```

<AddUseLogoutToHeaderComponent />

Now, we'll be able to login and logout our users.

Notice that after logging in, the `<Authenticated />` component will render our content instead of the `fallback` prop. Same also applies to logging out. Refine will handle the invalidation of the `check` method for us, so we don't need to worry about it.

In the next step, we'll be learning about the user identity and how to use it in our application.

</Sandpack>
