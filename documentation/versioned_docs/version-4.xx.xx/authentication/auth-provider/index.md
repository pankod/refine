---
title: "Auth Provider Guide | Refine v4 Authentication Logic"
display_title: "Auth Provider"
sidebar_label: "Auth Provider"
description: "The ultimate guide to Refine v4 Auth Provider. Learn to integrate custom login, logout, and identity check logic for secure React apps."
---

import AuthProviderExamplesLinks from "@site/src/partials/auth-provider/auth-provider-examples-links.md";

Auth provider is an object that contains methods to handle authentication and access control in your app by having Refine consume them. These methods expect to return a promise, so they can be used with async methods.

:::simple Good to know

- You can use any third-party authentication service like [Auth0, Okta, etc.](#examples) or your own custom methods while creating an auth provider from scratch.
- Auth Provider is not required for Refine to work, if it is not provided, your application will not have any authentication capabilities. As a result, you will not be able to use any of the auth hooks or components.
- To learn more about how to create your own auth provider, refer to the [Create an Auth Provider tutorial &#8594][create-auth-provider-tutorial].

:::

## Usage

To activate authentication in your app, you need to pass an ` authProvider` to the `<Refine/>` as a prop:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

// highlight-next-line
import authProvider from "./auth-provider";

const App = () => {
  // highlight-next-line
  return <Refine authProvider={authProvider} />;
};
```

## Examples

<AuthProviderExamplesLinks/>

## Methods

An `authProvider` can contain the following methods:

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
    // required methods
    login: async (params: any): AuthActionResponse,
    check: async (params: any): CheckResponse,
    logout: async (params: any): AuthActionResponse,
    onError: async (params: any): OnErrorResponse,
    // optional methods
    register: async (params: any): AuthActionResponse,
    forgotPassword: async (params: any): AuthActionResponse,
    updatePassword: async (params: any): AuthActionResponse,
    getPermissions: async (params: any): unknown,
    getIdentity: async (params: any): unknown,
};
```

All methods can have any parameters that you want to pass to them. However, the return types of the methods are fixed. You can find the details below.

## Required Methods

### login

`login` method is used to authenticate users. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

- `success`: Determines whether the operation is successful or not.
- `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
- `error`: An object containing details about any errors encountered during the operation.
- `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

<br />

As an example, let's create a simple `login` method that checks if the user exists in the mock data. If the user exists, we will save the user's data to the local storage and redirect the user to the home page. If the user doesn't exist, we will return an error.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.email === email);

    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login Error",
        name: "Invalid email or password",
      },
    };
  },
  // ---
};
```

Refine will consume this method using the `useLogin` hook which is used for login operations.

For example, if we call the `useLogin` hook's mutation like this:

```tsx
import { useLogin } from "@refinedev/core";

const { mutate } = useLogin();

mutate({ email: "john@mail.com", password: "123456" });
```

The `login` method will get the mutation's parameters as arguments.

> For more information, refer to the [`useLogin`][use-login] documentation.

**FAQ**

<details>
  <summary><strong>Can I pass any parameters to the <code>login</code> method?</strong></summary>

You can pass any parameters to the `login` method. `useLogin` hook's mutation will pass the mutation's parameters to the method without any type constraints.

```ts
const { mutate } = useLogin<{
  username: string;
  password: string;
  foo: string;
  remember: boolean;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after login?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the promise with an object that has the `redirectTo` property.

```ts
const authProvider: AuthProvider = {
  // ---
  login: async () => {
    // ---
    if (user) {
      return {
        success: true,
        redirectTo: "/custom-page",
      };
    } else {
      return {
        success: false,
        redirectTo: "/register",
      };
    }
  },
};
```

You can also use the `useLogin` hook's for this purpose:

```tsx
const { mutate } = useLogin();

mutate({ redirectPath: "/custom-page" });
```

Then use the `redirectPath` parameter in the `login` method to redirect the user to the specific page:

```ts
const authProvider: AuthProvider = {
  // ---
  login: async ({ redirectPath }) => {
    //---
    return {
      success: false,
      redirectTo: redirectPath,
    };
  },
};
```

If you don't want to redirect the user anywhere, you can resolve the `login` method's promise with `redirectTo: undefined`.

```ts
const authProvider: AuthProvider = {
  // ---
  login: async () => {
    // ---
    return {
      success: false,
      redirectTo: undefined,
    };
  },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

Refine automatically displays an error notification when the `login` method resolves the promise with `success: false`. If you want to customize the error message, you can resolve the promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    // ---
    return {
      success: false,
      error: {
        name: "Login Failed!",
        message:
          "The email or password that you've entered doesn't match any account.",
      },
    };
  },
  // ---
};
```

</details>

### check

The `check` method is used to check if the user is authenticated. It is internally called when the user navigates to a page that requires authentication. This method expects to return a resolved promise with the following type:

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
- `logout`: A boolean value indicating whether the user should be logged out.
- `error`: An Error object representing any errors that may have occurred during the check.

<br />

Since we saved the user data to the local storage in the `login` method, we will check that to determine if the user is authenticated:

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ---
  check: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },
  // ---
};
```

<br />

Refine will consume this method using the `useIsAuthenticated` hook which is used for checking if the user is authenticated.

```tsx
import { useIsAuthenticated } from "@refinedev/core";

const { data, isSuccess, isLoading, isError } = useIsAuthenticated();
```

> For more information, refer to the [`useIsAuthenticated`][use-is-authenticated] documentation.

**FAQ**

<details>
  <summary><strong>How can I redirect the user if they are not authenticated?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthProvider = {
  // ---
  check: async () => {
    // ---
    return {
      authenticated: false,
      redirectTo: "/custom-page",
    };
  },
};
```

</details>

### logout

The `logout` method is used to log out users. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

- `success`: Determines whether the operation is successful or not.
- `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
- `error`: An object containing details about any errors encountered during the operation.
- `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

<br />

Opposite to what we did in the `login` method, we now need to remove the user data from the local storage upon log out:

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ---
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  // ---
};
```

<br />

Refine will consume this method using the `useLogout` hook which is used for logging out users.

For example, if we call the `useLogout` hook's mutation like this:

```tsx
import { useLogout } from "@refinedev/core";

const { mutate } = useLogout();

mutate({ userId: "123" });
```

The `logout` method will get the mutation's parameters as an argument.

> For more information, refer to the [`useLogout`][use-logout] documentation.

**FAQ**

<details>
  <summary><strong>Can I pass any parameters to the <code>logout</code> method?</strong></summary>

Yes, you can pass any parameters to the `logout` method. The `useLogout` hook's mutation will pass the mutation's parameters to the `logout` method without any type constraints.

```ts
const { mutate } = useLogout<{
  id: string;
  name: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the promise with an object that has the `redirectTo` property.

```ts
const authProvider: AuthProvider = {
  // ---
  logout: async () => {
    // ---
    return {
      success: true,
      redirectTo: "/login",
    };
  },
};
```

You can also use the `useLogout` hook for this purpose:

```tsx
const { mutate } = useLogout();

mutate({ redirectPath: "/custom-page" });
```

Then use the `redirectPath` parameter in the `logout` method to redirect the user to the specific page:

```ts
const authProvider: AuthProvider = {
  // ---
  logout: ({ redirectPath }) => {
    // ---
    return {
      success: true,
      redirectTo: redirectPath,
    };
  },
};
```

If you don't want to redirect the user to anywhere, you can resolve the `logout` method's Promise with `redirectTo: undefined`.

```ts
const authProvider: AuthProvider = {
  // ---
  logout: async () => {
    // ---
    return {
      success: true,
      redirectTo: undefined,
    };
  },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

Refine automatically displays an error notification when the `logout` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  logout: async () => {
    // ---
    return {
      success: false,
      error: {
        name: "Logout Failed!",
        message: "Something went wrong.",
      },
    };
  },
  // ---
};
```

</details>

### onError

`onError` method is called when you get an error response from the API. You can create your own business logic to handle the error such as refreshing the token, logging out the user, etc.

`onError` method expects to return a Promise with the following type:

```ts
type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};
```

- `redirectTo`: If has a value, the app will be redirected to the given URL.
- `logout`: If is `true`, useOnError calls the `logout` method.
- `error`: An Error object representing any errors that may have occurred during the operation.

<br />

We'll use the `onError` method to log out the user if the API returns a `401` or `403` error. If `redirectTo` is set, `logout` method will be called with the `redirectTo` value.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ---
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
  // ---
};
```

<br />

Refine will consume this method using the `useOnError` hook which is used for handling errors.

```tsx
import { useOnError } from "@refinedev/core";

const { mutate } = useOnError();

fetch("http://example.com/payment")
  .then(() => console.log("Success"))
  .catch((error) => mutate(error));
```

> For more information, refer to the [`useOnError`][use-on-error] documentation.

**FAQ**

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthProvider = {
  // ---
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        redirectTo: "/custom-page",
      };
    }

    return {};
  },
  // ---
};
```

</details>

## Optional Methods

### getPermissions

`getPermissions` method is used to get the user's permissions. It expects to return a resolved promise.

We will use the `getPermissions` method to get the user's permissions from the `localStorage`.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const mockUsers = [
  { email: "john@mail.com", roles: ["admin"] },
  { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthProvider = {
  // You can also pass a parameter but it is optional
  getPermissions: (params) => {
    if (params) {
      // do some logic or make a request to server
    } else {
      const user = localStorage.getItem("auth");

      if (user) {
        const { roles } = JSON.parse(user);

        return roles;
      }
    }

    return null;
  },
  // ---
};
```

<br />

Refine will consume this method using the `usePermissions` hook which is used for getting the user's permissions.

For example, if you want to check if the user has a specific permission, you can use the `usePermissions` hook like this:

```tsx
import { usePermissions } from "@refinedev/core";

const { data } = usePermissions();

if (data?.includes("admin")) {
  console.log("User has admin permissions");
}
```

> For more information, refer to the [`usePermissions`][use-permissions] documentation.

:::info

Though `usePermissions` hook can be used for simple authorization purposes, if you need more complex authorization logic, we recommend using the access control provider.

For more information, refer to the [`accessControlProvider` documentation&#8594](/core/docs/authorization/access-control-provider)

:::

### getIdentity

`getIdentity` method is used to get the user's identity. It expects to return a resolved promise.

To get the user's identity from the local storage and resolve the promise:

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const mockUsers = [
  { email: "john@mail.com", roles: ["admin"] },
  { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthProvider = {
  // ---
  getIdentity: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { email, roles } = JSON.parse(user);

      return { email, roles };
    }

    return null;
  },
  // ---
};
```

Refine will consume this method using the `useGetIdentity` hook which is used for getting the user's identity.

For example, if you want to get the user's email, you can use the `useGetIdentity` hook like this:

```tsx
import { useGetIdentity } from "@refinedev/core";

const { data } = useGetIdentity();

if (data) {
  console.log(data.email);
}
```

> For more information, refer to the [`useGetIdentity`][use-get-identity] documentation.

### register

`register` method is used to register a new user. It is similar to the `login` method. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

- `success`: Determines whether the operation is successful or not.
- `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
- `error`: An object containing details about any errors encountered during the operation.
- `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

<br />

We'll register a new user and resolve the promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthProvider = {
  // ---
  register: async ({ email }) => {
    const user = mockUsers.find((user) => user.email === email);

    if (user) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "User already exists",
        },
      };
    }

    mockUsers.push({ email });

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  // ---
};
```

Refine will consume this method using the `useRegister` hook which is used for registering a new user.

For example, if you want to register a new user, you can use the `useRegister` hook like this:

```tsx
import { useRegister } from "@refinedev/core";

const { mutate } = useRegister();

const handleRegister = (values) => {
  mutate(values);
};
```

The `register` method will get the mutation's parameters as arguments.

> For more information, refer to the [`useRegister`][use-register] documentation.

**FAQ**

<details>
  <summary><strong>Can I pass any parameters to the <code>register</code> method?</strong></summary>

Yes, you can pass any parameters to the `register` method. `useRegister` hook's mutation will pass the mutation's parameters to the `register` method without any type constraints.

```ts
const { mutate } = useRegister<{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after registration?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthProvider = {
  // ---
  register: async () => {
    // ---
    return {
      success: true, // or false
      redirectTo: "/custom-page",
    };
  },
};
```

You can also use the `useRegister` hook's for this purpose:

```tsx
const { mutate } = useRegister();

mutate({ redirectPath: "/custom-page" });
```

Then use the `redirectPath` parameter in the `register` method to redirect the user to the specific page:

```ts
const authProvider: AuthProvider = {
  // ---
  register: async ({ redirectPath }) => {
    // ---
    return {
      success: true, // or false
      redirectTo: redirectPath,
    };
  },
};
```

If you don't want to redirect the user to anywhere, you can resolve the `register` method's Promise with `redirectTo: undefined`.

```ts
const authProvider: AuthProvider = {
  // ---
  register: async () => {
    // ---
    return {
      success: true, // or false
      redirectTo: undefined,
    };
  },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

Refine automatically displays an error notification when the `register` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthProvider = {
  // ---
  register: async () => {
    // ---
    return {
      success: false,
      error: {
        name: "Error",
        message: "Something went wrong!",
      },
    };
  },
};
```

</details>

### forgotPassword

`forgotPassword` method is used to send a password reset link to the user's email address. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

- `success`: Determines whether the operation is successful or not.
- `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
- `error`: An object containing details about any errors encountered during the operation.
- `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

<br />

To send a password reset link to the user's email address and resolve the promise:

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ---
  forgotPassword: async ({ email }) => {
    // send password reset link to the user's email address here

    // if request is successful
    return {
      success: true,
      redirectTo: "/login",
    };

    // if request is not successful
    return {
      success: false,
      error: {
        name: "Forgot Password Error",
        message: "Email address does not exist",
      },
    };
  },
  // ---
};
```

Refine will consume this method using the `useForgotPassword` hook which is used for sending a password reset link to the user's email address.

For example, if you want to send a password reset link to the user's email address, you can use the `useForgotPassword` hook like this:

```tsx
import { useForgotPassword } from "@refinedev/core";

const { mutate } = useForgotPassword();

const handleForgotPassword = (values) => {
  mutate(values);
};
```

The `forgotPassword` method will get the mutation's parameters as arguments.

> For more information, refer to the [`useForgotPassword`][use-forgot-password] documentation.

**FAQ**

<details>
  <summary><strong>Can I pass any parameters to the <code>forgotPassword</code> method?</strong></summary>

Yes, you can pass any parameters to the `forgotPassword` method. `useForgotPassword` hook's mutation will pass the mutation's parameters to the `forgotPassword` method without any type constraints.

```ts
const { mutate } = useForgotPassword<{
  email: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after sending the password reset link?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the `forgotPassword` method's Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
  // ---
  forgotPassword: async () => {
    // ---
    return {
      success: true,
      redirectTo: "/login",
    };
  },
};
```

Also, you can use the `useForgotPassword` hook's for this purpose.

```ts
const { mutate } = useForgotPassword();

useForgotPassword({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `forgotPassword` method to redirect the user to the specific page.

```ts
const authProvider: AuthProvider = {
  // ---
  forgotPassword: async ({ redirectPath }) => {
    // ---
    return {
      success: true,
      redirectTo: redirectPath,
    };
  },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

Refine automatically displays an error notification when the `forgotPassword` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthProvider = {
  // ---
  forgotPassword: async () => {
    // ---
    return {
      success: false,
      error: {
        name: "Error",
        message: "Something went wrong!",
      },
    };
  },
};
```

</details>

### updatePassword

`updatePassword` method is used to update the user's password. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

- `success`: Determines whether the operation is successful or not.
- `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
- `error`: An object containing details about any errors encountered during the operation.
- `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

<br />

To update the user's password and resolve the promise:

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ---
  updatePassword: async ({ password }) => {
    // update the user's password here

    // if request is successful
    return {
      success: true,
      redirectTo: "/login",
    };

    // if request is not successful
    return {
      success: false,
      error: {
        name: "Forgot Password Error",
        message: "Email address does not exist",
      },
    };
  },
  // ---
};
```

Refine will consume this method using the `useUpdatePassword` hook which is used to update the user's password.

For example, if you want to update the user's password, you can use the `useUpdatePassword` hook like this:

```tsx
import { useUpdatePassword } from "@refinedev/core";

const { mutate } = useUpdatePassword();

const handleUpdatePassword = ({ password, confirmPassword }) => {
    mutate({ password, confirmPassword }});
};
```

Additionally, the `updatePassword` method will take query parameters as arguments from the URL.

If we assume that the URL is `http://localhost:3000/reset-password?token=123`, the `updatePassword` method will get the mutation's parameters as arguments and the `token` query parameter as well.

```ts
const authProvider: AuthProvider = {
  // ---
  updatePassword: async ({ password, confirmPassword, token }) => {
    console.log(token); // 123

    // if request is successful
    return {
      success: true,
      redirectTo: "/login",
    };
  },
};
```

> For more information, refer to the [`useUpdatePassword`][use-update-password] documentation.

**FAQ**

<details>
  <summary><strong>Can I pass any parameters to the <code>updatePassword</code> method?</strong></summary>

Yes, you can pass any parameters to the `updatePassword` method. `useUpdatePassword` hook's mutation will pass the mutation's parameters to the `updatePassword` method without any type constraints.

```ts
const { mutate } = useUpdatePassword<{
  password: string;
  newPassword: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after updating the password?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthProvider = {
  // ---
  updatePassword: async () => {
    // ---
    return {
      success: true,
      redirectTo: "/login",
    };
  },
};
```

You can also use the `useUpdatePassword` hook's for this purpose:

```ts
const { mutate } = useUpdatePassword();

useUpdatePassword({ redirectPath: "/custom-page" });
```

Then use the `redirectPath` parameter in the `updatePassword` method to redirect the user to the specific page:

```ts
const authProvider: AuthProvider = {
  // ---
  updatePassword: async ({ redirectPath }) => {
    // ---
    return {
      success: true,
      redirectTo: redirectPath,
    };
  },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

Refine automatically displays an error notification when the `updatePassword` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthProvider = {
  // ---
  updatePassword: async () => {
    // ---
    return {
      success: false,
      error: {
        name: "Error",
        message: "Something went wrong!",
      },
    };
  },
};
```

</details>

## Legacy Auth Provider

Refine's v4 release is backward compatible and supports legacy auth provider implementations until v5.

If you want to use a legacy auth provider, you can pass them to the `<Refine />` component using the `legacyAuthProvider` prop.

[Refer to the Migration Guide for more information. &#8594](/core/docs/migration-guide/auth-provider/)

```tsx
import { LegacyAuthProvider, Refine } from "@refinedev/core";

const legacyAuthProvider: LegacyAuthProvider = {
  /* --- */
};

const App = () => {
  return (
    <Refine
      // ---
      legacyAuthProvider={legacyAuthProvider}
    >
      {/* --- */}
    </Refine>
  );
};
```

## FAQ

### How can I create an auth provider?

[Refer to the "Create Auth Provider From Scratch" section in the tutorial for more information &#8594][create-auth-provider-tutorial]

### How can I set authorization credentials?

[Refer to the "Setting Authorization Credentials" section in the tutorial for more information &#8594](/core/docs/guides-concepts/authentication)

### How can I implement refresh token mechanism?

[Refer to the "Implementing Refresh Token Mechanism" section in the tutorial for more information &#8594](/core/docs/guides-concepts/authentication)

[use-login]: /core/docs/authentication/hooks/use-login
[use-logout]: /core/docs/authentication/hooks/use-logout
[use-is-authenticated]: /core/docs/authentication/hooks/use-is-authenticated
[use-on-error]: /core/docs/authentication/hooks/use-on-error
[use-get-identity]: /core/docs/authentication/hooks/use-get-identity
[use-permissions]: /core/docs/authentication/hooks/use-permissions
[use-register]: /core/docs/authentication/hooks/use-register
[use-forgot-password]: /core/docs/authentication/hooks/use-forgot-password
[use-update-password]: /core/docs/authentication/hooks/use-update-password
[create-auth-provider-tutorial]: /core/docs/guides-concepts/authentication
