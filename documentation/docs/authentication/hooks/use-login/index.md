---
title: "useLogin Hook | Authentication in Refine v5"
display_title: "useLogin"
sidebar_label: "useLogin"
description: "Integrate Use Login in Refine v5. Learn best practices. Explore secure patterns for OAuth, JWT for secure enterprise React apps. Real-world snippets included."
source: /packages/core/src/hooks/auth/useLogin/index.ts
---

`useLogin` calls `login` method from [`authProvider`](/core/docs/authentication/auth-provider/) under the hood.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v5/docs/react/reference/useMutation) which includes many properties, some of which being `isSuccess` and `isError`.

Data that is resolved from `login` will be returned as the `data` in the query result with the following type:

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
  - If `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values: `{ name: "Login Error", message: "Invalid credentials" }`.
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

Refine provides a default login page which handles the login flow manually.

If you want to use a custom login page however, you can use the `useLogin` hook like this:

```tsx title="pages/custom-login.tsx"
import { useLogin } from "@refinedev/core";
import { Form } from "antd";

type LoginVariables = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const { mutate: login } = useLogin<LoginVariables>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });
  };

  return (
    <Form
      // ...
      onFinish={onSubmit}
    >
      {/* ... */}
    </Form>
  );
};
```

`mutate` acquired from `useLogin` can accept any kind of object for values since `login` method from `authProvider` doesn't have a restriction on its parameters.

A type parameter for the values can be provided to `useLogin`.

```tsx
const { mutate: login } = useLogin<{ username: string; password: string }>();
```

## Redirection after login

A custom URL can be given to mutate the function from the `useLogin` hook if you want to redirect yourself to a certain URL.

```tsx
import { useLogin } from "@refinedev/core";

const { mutate: login } = useLogin();

login({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `login` method of the `authProvider`.

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ...
  login: async ({ redirectPath }) => {
    // ...
    return {
      success: true,
      redirectTo: redirectPath,
      successNotification: {
        message: "Login Successful",
        description: "You have successfully logged in.",
      },
    };
  },
};
```

## Error handling

Since the methods of `authProvider` always return a resolved promise, you can handle errors by using the `success` value in the response:

```tsx
import { useLogin } from "@refinedev/core";

const { mutate: login } = useLogin();

login(
  {
    email: "refine@example.com",
    password: "refine",
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

The `onError` callback of the `useLogin` hook will not be called if `success` is `false`. This is because the `authProvider` methods always return a resolved promise, and the callback is only triggered when the promise is rejected.

:::
