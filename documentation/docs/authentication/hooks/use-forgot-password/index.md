---
title: "useForgotPassword Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useForgotPassword"
sidebar_label: "useForgotPassword"
description: "Explore how to use the useForgotPassword hook in Refine v5. Learn how to secure OAuth, JWT for secure enterprise React apps. See practical code samples."
source: /packages/core/src/hooks/auth/useForgotPassword/index.ts
---

`useForgotPassword` calls the `forgotPassword` method from [`authProvider`](/core/docs/authentication/auth-provider/) under the hood.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v5/docs/react/reference/useMutation) which includes many properties, some of which being `isSuccess` and `isError`.

Data that is resolved from `forgotPassword` will be returned as the `data` in the query result with the following type:

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
  - If `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values: `{ name: "Forgot Password Error", message: "Invalid credentials" }`.
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

Refine provides a default 'forgot password' page which handles the forgot password flow manually.

If you want to use a custom 'forgot password' page however, you can use the `useForgotPassword` hook like this:

```tsx title="pages/customForgotPasswordPage"
import { useForgotPassword } from "@refinedev/core";

type forgotPasswordVariables = {
  email: string;
};

export const ForgotPasswordPage = () => {
  const { mutate: forgotPassword } =
    useForgotPassword<forgotPasswordVariables>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      email: e.currentTarget.email.value,
    };

    forgotPassword(values);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Email</label>
      <input name="email" value="test@refine.com" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

`mutate` acquired from the `useForgotPassword` hook can accept any kind of object for values because the `forgotPassword` method from `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useForgotPassword`:

```tsx
import { useForgotPassword } from "@refinedev/core";

const { mutate: forgotPassword } = useForgotPassword<{ email: string }>();
```

## Redirection after forgotPassword

A custom URL can be given to mutate the function from the `useForgotPassword` hook if you want to redirect yourself to a certain URL.

```tsx
import { useForgotPassword } from "@refinedev/core";

const { mutate: forgotPassword } = useForgotPassword();

forgotPassword({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `forgotPassword` method of the `authProvider`.

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ...
  forgotPassword: async ({ redirectPath }) => {
    // ...
    return {
      success: true,
      redirectTo: redirectPath,
      successNotification: {
        message: "Password reset successful",
        description: "Your password has been successfully reset.",
      },
    };
  },
};
```

## Error handling

Since the methods of `authProvider` always return a resolved promise, you can handle errors by using the `success` value in the response.

```tsx
import { useForgotPassword } from "@refinedev/core";

const { mutate: forgotPassword } = useForgotPassword();

forgotPassword(
  {
    email: "refine@example.com",
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

The `onError` callback of the `useForgotPassword` hook will not be called if `success` is `false`. This is because the `authProvider` methods always return a resolved promise, and the callback is only triggered when the promise is rejected.

:::
