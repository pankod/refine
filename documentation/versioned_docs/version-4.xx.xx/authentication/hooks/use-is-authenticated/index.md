---
title: "useIsAuthenticated Hook | Auth State Checks in Refine v4"
display_title: "useIsAuthenticated"
sidebar_label: "useIsAuthenticated"
description: "Check user authentication status programmatically. A deep dive into using useIsAuthenticated for conditional logic in your React frontend."
source: /packages/core/src/hooks/auth/useIsAuthenticated/index.ts
---

`useIsAuthenticated` calls the `check` method from the [`authProvider`](/core/docs/authentication/auth-provider) under the hood.

It returns the result of `react-query`'s `useQuery` which includes many properties, some of which being `isSuccess` and `isError`.

Data that is resolved from the `useIsAuthenticated` will be returned as the `data` in the query result with the following type:

```ts
type CheckResponse = {
  authenticated: boolean;
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};
```

- `authenticated`: A boolean value indicating whether the user is authenticated or not.
- `redirectTo`: A string value indicating the URL to redirect to if authentication is required.
- `logout`: A boolean value indicating whether the logout method should be called.
- `error`: An Error object representing any errors that may have occurred during the check.

## Usage

`useIsAuthenticated` can be useful when you want to check for authentication and handle the result manually.

We have used this hook in Refine's [`<Authenticated>`](/core/docs/authentication/components/authenticated) component, which allows only authenticated users to access the page or any part of the code.

We will demonstrate a similar basic implementation below. Imagine that you have a public page, but you want to make some specific fields private.

We have a logic in [`authProvider`](/core/docs/authentication/auth-provider)'s `check` method like below:

```tsx
const authProvider: AuthProvider = {
  // ...
  // highlight-start
  check: () => {
    if (localStorage.getItem("email")) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Not authenticated",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  // highlight-end
};
```

<br/>

Let's create a wrapper component that renders children if `check` method returns the Promise resolved:

```tsx title="components/authenticated.tsx"
// highlight-next-line
import { useIsAuthenticated, useGo } from "@refinedev/core";

export const Authenticated: React.FC<AuthenticatedProps> = ({
  children,
  fallback,
  loading,
}) => {
  // highlight-next-line
  const { isLoading, data } = useIsAuthenticated();

  const go = useGo();

  if (isLoading) {
    return <>{loading}</> || null;
  }

  if (data.error) {
    if (!fallback) {
      go({ to: redirectTo, type: "replace" });
      return null;
    }

    return <>{fallback}</>;
  }

  if (data.authenticated) {
    return <>{children}</>;
  }

  return null;
};

type AuthenticatedProps = {
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
};
```

<br />

Now, only authenticated users can see the price field:

```tsx title="components/postShow"
// highlight-next-line
import { Authenticated } from "components/authenticated";

export const PostShow: React.FC = () => (
  <div>
    // highlight-start
    <Authenticated>
      <span>Only authenticated users can see</span>
    </Authenticated>
    // highlight-end
  </div>
);
```
