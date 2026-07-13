---
id: useLogin
title: useLogin
siderbar_label: useLogin
description: useLogin data hook from refine is a modified version of react-query's useMutation for authentication.
---

`useLogin` calls `login` method from [`authProvider`](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) under the hood.
It authenticates the app if `login` method from `authProvider` resolves and if it rejects shows an error notification. After successful authentication it redirects the app to root.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v4/docs/framework/react/reference/useMutation).

Data that is resolved from `login` will be returned as the `data` in the query result.

## Usage

Normally refine provides a default login page. If you prefer to use this default login page, there is no need to handle login flow manually.
If we want to build a custom login page instead of default one that comes with refine, `useLogin` can be used like this:

```tsx title="pages/customLoginPage"
import { useLogin } from "@pankod/refine-core";
import { Form } from "@pankod/refine-antd";

type LoginVariables = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const { mutate: login } = useLogin<LoginVariables>();

  const onSubmit = (values: LoginVariables) => {
    login(values);
  };

  return <Form onFinish={onSubmit}>// rest of the login form</Form>;
};
```

:::tip
`mutate` acquired from `useLogin` can accept any kind of object for values since `login` method from `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useLogin`.

```tsx
const { mutate: login } = useLogin<{ username: string; password: string }>();
```

:::

## Redirection after login

We have 3 options for redirecting the app after login successfully .

- If promise returned from `login` is resolved with nothing, app will be redirected to the `/` route by default.

- A custom url can be resolved from the promise returned from the `login` method of the [authProvider](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider).

```tsx
const authProvider: AuthProvider = {
    ...
    login: () => {
        ...
        return Promise.resolve("/custom-url");
    }
}
```

A custom url can be given to mutate function from the `useLogin` hook if you want to redirect yourself to a certain url.

```tsx
import { useLogin } from "@pankod/refine-core";

const { mutate: login } = useLogin();

login({ redirectPath: "/custom-url" });
```

Then, you can handle this url in your `login` method of the `authProvider`.

```tsx

const authProvider: AuthProvider = {
    ...
    login: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}

```

- If promise returned from the `login` method of the `authProvider` gets resolved with `false` no redirection will occur.

```tsx
const authProvider: AuthProvider = {
    ...
    login: () => {
        ...
        return Promise.resolve(false);
    }
}
```

:::caution
This hook can only be used if `authProvider` is provided.
:::
