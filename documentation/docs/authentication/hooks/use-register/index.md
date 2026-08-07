---
title: "useRegister Hook | Best Practices for Authentication | Refine v5"
display_title: "useRegister"
sidebar_label: "useRegister"
description: "Set up Use Register in Refine v5. Learn best practices. Learn how to secure OAuth, JWT for secure enterprise React apps. See practical code samples."
source: /packages/core/src/hooks/auth/useRegister/index.ts
---

`useRegister` calls `register` method from [`authProvider`](/core/docs/authentication/auth-provider/) under the hood.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v5/docs/react/reference/useMutation) which includes many properties, some of which being isSuccess and isError.

Data that is resolved from `register` will be returned as the `data` in the query result with the following type:

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
  - When an `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values: `{ name: "Register Error", message: "Error while registering" }`.
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

Refine provides a default registration page, page which handles the registration flow manually.
If you want to use a custom registration page however, you can use the `useRegister` hook like this:

```tsx title="pages/customRegisterPage"
import { useRegister } from "@refinedev/core";

type RegisterVariables = {
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const { mutate: register } = useRegister<RegisterVariables>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    register(values);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Email</label>
      <input name="email" value="test@refine.com" />
      <label>Password</label>
      <input name="password" value="refine" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

`mutate` acquired from the `useRegister` hook can accept any kind of object for values since the `register` method from `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useRegister`.

```tsx
const { mutate: register } = useRegister<{ email: string; password: string }>();
```

## Logged In after successful registration

If you want to log in to the user after successful registration, you can use `useLogin` hook after the `useRegister` hook's `onSuccess` callback:

```tsx title="pages/customRegisterPage"
import { useRegister, useLogin } from "@refinedev/core";

type FormVariables = {
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const { mutate: register } = useRegister<FormVariables>();
  const { mutate: login } = useLogin<FormVariables>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    register(values, {
      //highlight-start
      onSuccess: () => {
        login(values);
      },
      //highlight-end
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Email</label>
      <input name="email" value="test@refine.com" />
      <label>Password</label>
      <input name="password" value="refine" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Redirection after register

A custom URL can be given to mutate the function from the `useRegister` hook if you want to redirect yourself to a certain URL:

```tsx
import { useRegister } from "@refinedev/core";

const { mutate: register } = useRegister();

register({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `register` method of the `authProvider`:

```tsx
const authProvider: AuthProvider = {
  // ...
  register: ({ redirectPath }) => {
    // ...
    return {
      success: true,
      redirectTo: redirectPath,
      successNotification: {
        message: "Registration Successful",
        description: "You have successfully registered.",
      },
    };
  },
};
```

## Error handling

Since the methods of `authProvider` always return a resolved promise, you can handle errors by using the `success` value in the response:

```tsx
import { useRegister } from "@refinedev/core";

const { mutate: register } = useRegister();

register(
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

The `onError` callback of the `useRegister` hook will not be called if `success` is `false`. This is because the `authProvider` methods always return a resolved promise, and the callback is only triggered when the promise is rejected.

:::
