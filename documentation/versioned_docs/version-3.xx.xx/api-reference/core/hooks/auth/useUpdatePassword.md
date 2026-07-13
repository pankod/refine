---
id: useUpdatePassword
title: useUpdatePassword
siderbar_label: useUpdatePassword
description: useUpdatePassword data hook from refine is a modified version of react-query's useMutation for registration.
---

`useUpdatePassword` calls `updatePassword` method from [`authProvider`](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) under the hood. It update passwords the user if `updatePassword` method from `authProvider` resolves and if it rejects shows an error notification.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v4/docs/framework/react/reference/useMutation).

Data that is resolved from `updatePassword` will be returned as the `data` in the query result.

## Usage

Normally refine provides a default update password page. If you prefer to use this default update password page, there is no need to handle update password flow manually.
If we want to build a custom update password page instead of default one that comes with **refine**, `useUpdatePassword` can be used like this:

```tsx title="pages/customupdatePasswordPage"
import { useUpdatePassword } from "@pankod/refine-core";

type updatePasswordVariables = {
  password: string;
};

export const updatePasswordPage = () => {
  const { mutate: updatePassword } =
    useUpdatePassword<updatePasswordVariables>();

  const onSubmit = (values: updatePasswordVariables) => {
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

:::tip
`mutate` acquired from `useUpdatePassword` can accept any kind of object for values since the `updatePassword` method from `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useUpdatePassword`.

```tsx
const { mutate: updatePassword } = useUpdatePassword<{ newPassword: string }>();
```

:::

:::info
`useUpdatePassword` gives you query strings for the `updatePassword` method from `authProvider`. If you have a logic that sends a password regeneration email to the email address while resetting the password and proceeds through the access token. You can use `queryStrings` variable `updatePassword` method from `authProvider`. For example, your regeneration link is `YOUR_DOMAIN/update-password?token=123`. You can access the token from the parameters of the URL.

```tsx
const authProvider: AuthProvider = {
    ...
    updatePassword: (params) => {
        // you can access query strings from params.queryStrings
        console.log(params.token);
        if(param.token === "123") {
            // your logic to update the password
        }
        ...
    }
}
```

:::

## Redirection after updatePassword

We have 2 options for redirecting the app after updatePassword successfully.

- A custom url can be resolved from the promise returned from the `updatePassword` method of the [authProvider](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider).

```tsx
const authProvider: AuthProvider = {
    ...
    updatePassword: () => {
        ...
        return Promise.resolve("/custom-url");
    }
}
```

A custom url can be given to mutate the function from the `useUpdatePassword` hook if you want to redirect yourself to a certain url.

```tsx
import { useUpdatePassword } from "@pankod/refine-core";

const { mutate: updatePassword } = useUpdatePassword();

updatePassword({ redirectPath: "/custom-url" });
```

Then, you can handle this url in your `updatePassword` method of the `authProvider`.

```tsx

const authProvider: AuthProvider = {
    ...
    updatePassword: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}

```

- If the promise returned from the `updatePassword` method of the `authProvider` gets resolved with `false` no redirection will occur.

```tsx
const authProvider: AuthProvider = {
    ...
    updatePassword: () => {
        ...
        return Promise.resolve(false);
    }
}
```

:::tip
If the promise returned from `updatePassword` is resolved with nothing, app won't be redirected to any route by default.
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
