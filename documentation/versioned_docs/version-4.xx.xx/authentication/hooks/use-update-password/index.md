---
title: "useUpdatePassword Hook | Refine v4"
display_title: "useUpdatePassword"
sidebar_label: "useUpdatePassword"
description: "Learn how password update workflows are handled securely in Refine v4 using useUpdatePassword."
source: /packages/core/src/hooks/auth/useUpdatePassword/index.ts
---

`useUpdatePassword` calls `updatePassword` method from [`authProvider`](/core/docs/authentication/auth-provider) under the hood.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation).

Data that is resolved from `updatePassword` will be returned as the `data` in the query result with the following type:

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
  - When `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values: `{ name: "Update Password Error", message: "Error while resetting password" }`.
- `redirectTo`: If has a value, the app will be redirected to the given URL.
- `error`: If has a value, a notification will be shown with the error message and name.
- `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.
- `successNotification`: If provided, a success notification will be shown. The structure is as follows:

```ts
type SuccessNotificationResponse = {
  message: string;
  description?: string;
};
```

## Usage

Refine provides a default 'update password' page, page which handles the update password flow manually.
If you want to use a custom 'update password' however, you can use the `useUpdatePassword` hook like this:

```tsx title="pages/customupdatePasswordPage"
import { useUpdatePassword } from "@refinedev/core";

type updatePasswordVariables = {
  password: string;
};

export const UpdatePasswordPage = () => {
  const { mutate: updatePassword } =
    useUpdatePassword<updatePasswordVariables>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      password: e.currentTarget.password.value,
    };

    updatePassword(values);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Password</label>
      <input name="password" value="refine" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

`mutate` acquired from `useUpdatePassword` can accept any kind of object for values since the `updatePassword` method from `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useUpdatePassword`.

```tsx
const { mutate: updatePassword } = useUpdatePassword<{ newPassword: string }>();
```

`useUpdatePassword` gives you query strings for the `updatePassword` method from `authProvider`. If you have logic that sends a password regeneration email to the email address while resetting the password and proceeds through the access token, you can use the `queryStrings` variable's `updatePassword` method from `authProvider`. For example, if your regeneration link is `YOUR_DOMAIN/update-password?token=123`, you can access the token from the parameters of the URL.

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ...
  updatePassword: (params) => {
    // you can access query strings from params.queryStrings
    console.log(params.token);
    if (params.token === "123") {
      // your logic to update the password
    }
    // ...
  },
};
```

## Redirection after updatePassword

A custom URL can be given to mutate the function from the `useUpdatePassword` hook if you want to redirect yourself to a certain URL:

```tsx
import { useUpdatePassword } from "@refinedev/core";

const { mutate: updatePassword } = useUpdatePassword();

updatePassword({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `updatePassword` method of the `authProvider`:

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ...
  updatePassword: async ({ redirectPath }) => {
    // ...
    return {
      success: true,
      redirectTo: redirectPath,
      successNotification: {
        message: "Update password successful",
        description: "You have successfully updated password.",
      },
    };
  },
};
```

## Error handling

Since the methods of `authProvider` always return a resolved promise, you can handle errors by using the `success` value in the response:

```tsx
import { useUpdatePassword } from "@refinedev/core";

const { mutate: updatePassword } = useUpdatePassword();

updatePassword(
  {
    newPassword: "refine",
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

The `onError` callback of the `useUpdatePassword` hook will not be called if `success` is `false`. This is because the `authProvider` methods always return a resolved promise, and the callback is only triggered when the promise is rejected.

:::
