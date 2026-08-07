---
title: "useUpdateIdentity Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useUpdateIdentity"
sidebar_label: "useUpdateIdentity"
description: "Set up Use Update Identity in Refine v5. Learn how to update the current user's identity (e.g. username and email) from the auth provider with code snippets."
source: /packages/core/src/hooks/auth/useUpdateIdentity/index.ts
---

`useUpdateIdentity` calls `updateIdentity` method from [`authProvider`](/core/docs/authentication/auth-provider/) under the hood. It lets you update the current user's identity (e.g. username and/or email) natively, following the same pattern as [`useUpdatePassword`](/core/docs/authentication/hooks/use-update-password/).

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v5/docs/react/reference/useMutation).

Data that is resolved from `updateIdentity` will be returned as the `data` in the query result with the following type:

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
  - When `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values: `{ name: "Update Identity Error", message: "Error while updating identity" }`.
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

To update the current user's identity, you can use the `useUpdateIdentity` hook like this:

```tsx title="pages/customUpdateIdentityPage"
import { useUpdateIdentity } from "@refinedev/core";

type UpdateIdentityVariables = {
  name: string;
  email: string;
};

export const UpdateIdentityPage = () => {
  const { mutate: updateIdentity } =
    useUpdateIdentity<UpdateIdentityVariables>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      name: e.currentTarget.name.value,
      email: e.currentTarget.email.value,
    };

    updateIdentity(values);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input name="name" />
      <label>Email</label>
      <input name="email" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

`mutate` acquired from `useUpdateIdentity` can accept any kind of object for values since the `updateIdentity` method from `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useUpdateIdentity`.

```tsx
const { mutate: updateIdentity } = useUpdateIdentity<{ email: string }>();
```

## Redirection after updateIdentity

A custom URL can be given to mutate the function from the `useUpdateIdentity` hook if you want to redirect yourself to a certain URL:

```tsx
import { useUpdateIdentity } from "@refinedev/core";

const { mutate: updateIdentity } = useUpdateIdentity();

updateIdentity({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `updateIdentity` method of the `authProvider`:

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ...
  updateIdentity: async ({ redirectPath, ...identity }) => {
    // ...
    return {
      success: true,
      redirectTo: redirectPath,
      successNotification: {
        message: "Update identity successful",
        description: "You have successfully updated your identity.",
      },
    };
  },
};
```

## Error handling

Since the methods of `authProvider` always return a resolved promise, you can handle errors by using the `success` value in the response:

```tsx
import { useUpdateIdentity } from "@refinedev/core";

const { mutate: updateIdentity } = useUpdateIdentity();

updateIdentity(
  {
    email: "new@email.com",
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

The `onError` callback of the `useUpdateIdentity` hook will not be called if `success` is `false`. This is because the `authProvider` methods always return a resolved promise, and the callback is only triggered when the promise is rejected.

:::
