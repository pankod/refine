---
id: useRegister
title: useRegister
siderbar_label: useRegister
description: useRegister data hook from refine is a modified version of react-query's useMutation for registration.
---

`useRegister` calls `register` method from [`authProvider`](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) under the hood. It registers the app if `register` method from `authProvider` resolves and if it rejects shows an error notification.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v4/docs/framework/react/reference/useMutation).

Data that is resolved from `register` will be returned as the `data` in the query result.

## Usage

Normally refine provides a default register page. If you prefer to use this default register page, there is no need to handle register flow manually.
If we want to build a custom register page instead of the default one that comes with **refine**, `useRegister` can be used like this:

```tsx title="pages/customRegisterPage"
import { useRegister } from "@pankod/refine-core";

type RegisterVariables = {
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const { mutate: register } = useRegister<RegisterVariables>();

  const onSubmit = (values: RegisterVariables) => {
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

:::tip
`mutate` acquired from `useRegister` can accept any kind of object for values since `register` method from `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useRegister`.

```tsx
const { mutate: register } = useRegister<{ email: string; password: string }>();
```

:::

## Logged In after successful registration

If you want to log in the user after successful registration, you can use `useLogin` hook after `useRegister` hook `onSuccess` callback.

```tsx title="pages/customRegisterPage"
import { useRegister, useLogin } from "@pankod/refine-core";

type FormVariables = {
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const { mutate: register } = useRegister<FormVariables>();
  const { mutate: login } = useLogin<FormVariables>();

  const onSubmit = (values: FormVariables) => {
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

We have 2 options for redirecting the app after registering successfully .

- A custom url can be resolved from the promise returned from the `register` method of the [authProvider](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider).

```tsx
const authProvider: AuthProvider = {
    ...
    register: () => {
        ...
        return Promise.resolve("/custom-url");
    }
}
```

A custom url can be given to mutate the function from the `useRegister` hook if you want to redirect yourself to a certain url.

```tsx
import { useRegister } from "@pankod/refine-core";

const { mutate: register } = useRegister();

register({ redirectPath: "/custom-url" });
```

Then, you can handle this url in your `register` method of the `authProvider`.

```tsx

const authProvider: AuthProvider = {
    ...
    register: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}

```

- If the promise returned from the `register` method of the `authProvider` gets resolved with `false` no redirection will occur.

```tsx
const authProvider: AuthProvider = {
    ...
    register: () => {
        ...
        return Promise.resolve(false);
    }
}
```

:::tip
If the promise returned from `register` is resolved with nothing, app will be redirected to the `/` route by default.
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
