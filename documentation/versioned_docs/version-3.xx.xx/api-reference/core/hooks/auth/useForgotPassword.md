---
id: useForgotPassword
title: useForgotPassword
siderbar_label: useForgotPassword
description: useForgotPassword data hook from refine is a modified version of react-query's useMutation for registration.
---

`useForgotPassword` calls `forgotPassword` method from [`authProvider`](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) under the hood. It forgot passwords the user if `forgotPassword` method from `authProvider` resolves and if it rejects shows an error notification.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v4/docs/framework/react/reference/useMutation).

Data that is resolved from `forgotPassword` will be returned as the `data` in the query result.

## Usage

Normally refine provides a default forgot password page. If you prefer to use this default forgot password page, there is no need to handle forgot password flow manually.
If we want to build a custom forgotPassword page instead of default one that comes with refine, `useForgotPassword` can be used like this:

```tsx title="pages/customForgotPasswordPage"
import { useForgotPassword } from "@pankod/refine-core";

type forgotPasswordVariables = {
  email: string;
};

export const forgotPasswordPage = () => {
  const { mutate: forgotPassword } =
    useForgotPassword<forgotPasswordVariables>();

  const onSubmit = (values: forgotPasswordVariables) => {
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

:::tip
`mutate` acquired from `useForgotPassword` can accept any kind of object for values since `forgotPassword` method from `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useForgotPassword`.

```tsx
const { mutate: forgotPassword } = useForgotPassword<{ email: string }>();
```

:::

## Redirection after forgotPassword

We have 2 options for redirecting the app after forgotPassword successfully .

- A custom url can be resolved from the promise returned from the `forgotPassword` method of the [authProvider](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider).

```tsx
const authProvider: AuthProvider = {
    ...
    forgotPassword: () => {
        ...
        return Promise.resolve("/custom-url");
    }
}
```

A custom url can be given to mutate function from the `useForgotPassword` hook if you want to redirect yourself to a certain url.

```tsx
import { useForgotPassword } from "@pankod/refine-core";

const { mutate: forgotPassword } = useForgotPassword();

forgotPassword({ redirectPath: "/custom-url" });
```

Then, you can handle this url in your `forgotPassword` method of the `authProvider`.

```tsx

const authProvider: AuthProvider = {
    ...
    forgotPassword: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}

```

- If the promise returned from the `forgotPassword` method of the `authProvider` gets resolved with `false` no redirection will occur.

```tsx
const authProvider: AuthProvider = {
    ...
    forgotPassword: () => {
        ...
        return Promise.resolve(false);
    }
}
```

:::tip
If the promise returned from `forgotPassword` is resolved with nothing, app won't be redirected to any route by default.
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
