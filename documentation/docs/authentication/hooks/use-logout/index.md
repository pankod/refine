---
title: "useLogout Hook | Best Practices for Authentication in Refine v5"
display_title: "useLogout"
sidebar_label: "useLogout"
description: "Build Use Logout in Refine v5. Learn the key steps. Learn secure OAuth, JWT for secure enterprise React apps. Explore with code snippets."
source: /packages/core/src/hooks/auth/useLogout/index.ts
---

`useLogout` calls the `logout` method from the [`authProvider`](/core/docs/authentication/auth-provider/) under the hood.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v5/docs/react/reference/useMutation) which includes many properties, some of which being `isSuccess` and `isError`.

Data that is resolved from `logout` will be returned as the `data` in the query result with the following type:

```ts
type SuccessNotificationResponse = {
  message: string;
  description?: string;
};

type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
  successNotification?: SuccessNotificationResponse;
};
```

- `success`: A boolean indicating whether the operation was successful. If `success` is false, a notification will be shown.
  - If `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values: `{ name: "useLogout Error", message: "Something went wrong during logout" }`.
- `redirectTo`: If it has a value, the app will be redirected to the given URL.
- `error`: If it has a value, a notification will be shown with the error message and name.
- `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.
- `successNotification`: If provided, a success notification will be shown. The structure is as follows:

```ts
type SuccessNotificationResponse = {
  message: string;
  description?: string;
};
```

## Usage

Refine provides a default logout page which handles the logout flow manually.

If you want to use a custom logout page however, you can use the `useLogout` hook like this:

```tsx title="components/customLogoutButton"
import { useLogout } from "@refinedev/core";

export const LogoutButton = () => {
  const { mutate: logout } = useLogout();

  return <button onClick={() => logout()}>Logout</button>;
};
```

`mutate` acquired from the `useLogout` can accept any kind of object for values since the `logout` method from the `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useLogout`.

```tsx
const { mutate: logout } = useLogout<{ redirectPath: string }>();
```

## Redirection after logout

A custom URL can be given to mutate the function from the `useLogin` hook if you want to redirect yourself to a certain URL.

```tsx
import { useLogout } from "@refinedev/core";

const { mutate: logout } = useLogout();

logout({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `logout` method of the `authProvider`:

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ...
  logout: async ({ redirectPath }) => {
    // ...
    return {
      success: true,
      redirectTo: redirectPath,
      successNotification: {
        message: "Logout Successful",
        description: "You have successfully logged out.",
      },
    };
  },
};
```

## Error handling

Since the methods of `authProvider` always return a resolved promise, you can handle errors by using the `success` value in the response.

```tsx
import { useLogout } from "@refinedev/core";

const { mutate: logout } = useLogout();

logout(
  {
    redirectPath: "/custom-url",
  },
  {
    onSuccess: (data) => {
      if (!data.success) {
        // handle error
      }

      // handle success
    },
  },
);
```

:::caution

The `onError` callback of the `useLogout` hook will not be called if `success` is `false`. This is because the `authProvider` methods always return a resolved promise, and the callback is only triggered when the promise is rejected.

:::
