---
title: "useOnError Hook | Refine v4"
display_title: "useOnError"
sidebar_label: "useOnError"
description: "Learn how global authentication errors are handled in Refine v4 using the useOnError hook."
source: /packages/core/src/hooks/auth/useOnError/index.ts
---

`useOnError` calls the [`onError`][on-error] method from the [`authProvider`][auth-provider] under the hood.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v4/docs/react/reference/useMutation), which includes many properties like `isSuccess` and `isError`.

Data that is resolved from the [`onError`][on-error] will be returned as the `data` in the query result with the following type:

```ts
type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};
```

According to the `onError` method's returned values, the following process will be executed:

- `redirectTo`: If it has a value, the app will be redirected to the given URL.
- `logout`: If it is `true`, `useOnError` calls the `logout` method.
- `error`: An Error object representing any errors that may have occurred during the operation.

## Internal Usage

Refine uses `useOnError` internally in the data hooks to handle errors in a unified way.

When an error is thrown by any data hook, the `useOnError` function is triggered with the error object. Afterward, the error object is passed to the [`onError`][on-error] method of the [`authProvider`][auth-provider], which can be utilized to redirect the user or to log them out.

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ...
  // highlight-start
  onError: (error) => {
    const status = error.status;
    if (status === 418) {
      return {
        logout: true,
        redirectTo: "/login",
        error: new Error(error),
      };
    }
    return {};
  },
  // highlight-end
  // ---
};
```

> For more information about data hooks, refer to the [Data Provider documentation&#8594](/core/docs/data/data-provider#supported-hooks)

## Usage

Let's say that a payment request was declined by the API. If the error status code is `418`, the user will be logged out for security reasons:

```tsx
import { useOnError } from "@refinedev/core";

// highlight-next-line
const { mutate: onError } = useOnError();

fetch("http://example.com/payment")
  .then(() => console.log("Success"))
  // highlight-next-line
  .catch((error) => onError(error));
```

We have a logic in [`authProvider`](/core/docs/authentication/auth-provider)'s `onError` method like below.

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // highlight-start
  onError: (error) => {
    const status = error.status;
    if (status === 418) {
      return {
        logout: true,
        redirectTo: "/login",
        error: new Error(error),
      };
    }
    return {};
  },
  // highlight-end
  // ---
};
```

[on-error]: /core/docs/authentication/auth-provider#onerror-
[auth-provider]: /core/docs/authentication/auth-provider
