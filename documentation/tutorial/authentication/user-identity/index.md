---
title: Using User Identity
---

import { Sandpack, AddGetIdentityMethodToAuthProvider, AddUseGetIdentityToHeaderComponent } from "./sandpack.tsx";

<Sandpack>

In the previous steps, we've added login and logout functionalities and protected our content from unauthenticated users. Now, we'll be learning about the Refine's `useGetIdentity` hook to get the user's identity from our API and implement the `getIdentity` method in our auth provider.

We'll be implementing a simple component called `UserGreeting` to display a welcome message to the user.

## Implementing the `getIdentity` Method

The `getIdentity` method is used to get the user's identity from our API. It should return a `Promise` which resolves to an object. The object should contain the user's identity.

Our fake REST API requires us to send a `GET` request to `/auth/me` endpoint with the `token` in the `Authorization` header. It will return the user's identity in the response body.

Update your `src/providers/auth-provider.ts` file by adding the following lines:

```ts title="src/providers/auth-provider.ts"
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  // highlight-start
  getIdentity: async () => {
    const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
      headers: {
        Authorization: localStorage.getItem("my_access_token"),
      },
    });

    if (response.status < 200 || response.status > 299) {
      return null;
    }

    const data = await response.json();

    return data;
  },
  // highlight-end
  logout: async () => {
    /* ... */
  },
  login: async ({ email, password }) => {
    /* ... */
  },
  check: async () => {
    /* ... */
  },
  onError: async (error) => {
    /* ... */
  },
  // ...
};
```

<AddGetIdentityMethodToAuthProvider />

## Using the `useGetIdentity` Hook

After implementing the `getIdentity` method, we'll be able to call `useGetIdentity` hook and get the user's identity from our API.

Now, we'll use the `useGetIdentity` hook inside our `<Header />` component to greet the user.

Update your `src/components/header.tsx` file by adding the following lines:

```tsx title="src/components/header.tsx"
import React from "react";
import { useLogout, useGetIdentity } from "@refinedev/core";

export const Header = () => {
  const { mutate, isPending } = useLogout();
  const { data: identity } = useGetIdentity();

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      <button type="button" disabled={isPending} onClick={mutate}>
        Logout
      </button>
    </>
  );
};
```

<AddUseGetIdentityToHeaderComponent />

Now when we login, we should be able to see a welcome message with the user's name on our screen.

:::simple Note

For the purpose of demonstration, our fake REST API returns "John Doe" as the user's name, regardless of the token sent.

:::

At this point, we've set up with the basic authentication flow, in the next step, we'll be learning about how to integrate it with our data provider.

</Sandpack>
