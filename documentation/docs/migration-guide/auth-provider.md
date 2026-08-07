---
title: "Auth Provider Migration Guide | Migration Guide in Refine v5"
display_title: "Migrating Auth Provider from 3.x.x to 4.x.x"
description: "Implement Auth Provider in Refine v5. Learn the key steps. Learn must for real-world React admin panels. Fast to follow."
sidebar_label: Migrating Auth Provider
---

## Motivation behind the changes

Our motivation for modifying the `authProvider` prop in **Refine v4** was to improve its flexibility and customization options, allowing it to handle a wider range of use cases without becoming overly complicated.

We aimed to create a more standardized interface for the `authProvider` methods that would improve transparency and enable easier debugging for developers.

Previously, developers were required to resolve the `authProvider` methods on success and reject them on failure. However, this approach had limitations, as rejected promises are typically associated with errors or unusual scenarios. Some errors, such as incorrect login credentials, aren’t actually considered failures and need to be communicated to the user. This behavior often confused developers and hindered the debugging process.

Now, the `authProvider` methods always return a resolved promise that includes an object with a success key. This key indicates whether the operation was successful or not, and in case of failure, an optional error key containing an `Error` object can be used to notify users.

Furthermore, the auth hooks no longer have default redirection paths, which had previously been a source of confusion for some developers. Instead, developers can now have more control over the redirection after a successful operation by adding a `redirectTo` property to the `authProvider` methods' return object

## Naming changes

- The `AuthPovider` interface was changed to `AuthProvider`.

  ```diff
  - import { AuthProvider } from "@refinedev/core";
  + import { AuthProvider } from "@refinedev/core";

  - const authProvider: AuthProvider = {/* ... */}
  + const authProvider: AuthProvider = {/* ... */}
  ```

- The `getUserIdentity` method of the `authProvider` was changed to `getIdentity`.
- The `checkError` method of the `authProvider`was changed to `onError`.
- The `checkAuth` method of the `authProvider` was changed to `check`.

  ```diff
  const authProvider = {
  -     getUserIdentity,
  +     getIdentity,
  -     useCheckError,
  +     useOnError,
  -     checkAuth,
  +     check,
  }
  ```

- The `useAuthenticated` hook was changed to `useIsAuthenticated`.

  ```diff
  - import { useAuthenticated } from "@refinedev/core";
  + import { useIsAuthenticated } from "@refinedev/core";
  ```

## Methods

### login

Promises must now be resolved in all cases when using the `login` method, with a return type of `AuthActionResponse`. When resolving the promise, you must always include a `success` key, and in the case of a failure, an additional `error` key.

`useLogin` no longer has default redirection, so you need to add the `redirectTo` property to the `login` method's return object.

```diff
const authProvider = {
    login: async ({ email, password }) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
-           return Promise.resolve();
+           return {
+               success: true,
+               redirectTo: "/",
+           };
        }

-       return Promise.reject();
+       return {
+           success: false,
+           error: {
+               message: "Login Error",
+               name: "Invalid email or password",
+           }
+       };
    },
}
```

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

### logout

Promises must now be resolved in all cases when using the `logout` method, with a return type of `AuthActionResponse`. When resolving the promise, you must always include a `success` key, and in the case of a failure, an additional `error` key.

`useLogout` no longer has default redirection, so you need to add the `redirectTo` property to the `logout` method's return object.

```diff
const authProvider = {
    logout: async ({ email, password }) => {
        localStorage.removeItem("auth");
-       return Promise.resolve();
+       return {
+          success: true,
+          redirectTo: "/login",
+       };
    },
}
```

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

### register

Promises must now be resolved in all cases when using the `register` method, with a return type of `AuthActionResponse`. When resolving the promise, you must always include a `success` key, and in the case of a failure, an additional `error` key.

`useRegister` no longer has default redirection, so you need to add the `redirectTo` property to the `register` method's return object.

```diff
const authProvider = {
    register: async ({ email, password }) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
-           return Promise.reject();
+           return {
+               success: false,
+               error: {
+                   name: "Register Error"",
+                   message: "User already exists",
+               },
+           };
        }

        mockUsers.push({ email });

-       return Promise.resolve();
+       return {
+           success: true,
+           redirectTo: "/",
+       };
    },
}
```

### forgotPassword

Promises must now be resolved in all cases when using the `forgotPassword` method, with a return type of `AuthActionResponse`. When resolving the promise, you must always include a `success` key, and in the case of a failure, an additional `error` key.

`useForgotPassword` no longer has default redirection, so you need to add the `redirectTo` property to the `forgotPassword` method's return object.

```diff
const authProvider = {
    forgotPassword: async ({ password }) => {
        // send password reset link to the user's email address here

        // if request is successful
-       return Promise.resolve();
+       return {
+           success: true,
+           redirectTo: "/login",
+       };

        // if request is not successful
-       return Promise.reject();
+       return {
+           success: false,
+           error: {
+               name: "Forgot Password Error",
+               message: "Email address does not exist",
+           },
+       };
    },
};
```

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

### updatePassword

Promises must now be resolved in all cases when using the `updatePassword` method, with a return type of `AuthActionResponse`. When resolving the promise, you must always include a `success` key, and in the case of a failure, an additional `error` key.

`useUpdatePassword` no longer has default redirection, so you need to add the `redirectTo` property to the `updatePassword` method's return object.

```diff
const authProvider = {
    updatePassword: async ({ password }) => {
        // update the user's password here

        // if request is successful
-       return Promise.resolve();
+       return {
+           success: true,
+           redirectTo: "/login",
+       });

        // if request is not successful
-       return Promise.reject();
+       return {
+           success: false,
+           error: {
+               name: "Forgot Password Error",
+               message: "Email address does not exist",
+           },
+       };
    },
};
```

```ts
type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
};
```

### check

The `checkAuth` method of the `authProvider` was changed to `check`. It now requires promises to be resolved in all cases, with a return type of `CheckResponse`. When resolving the promise, you must always include a `success` key, and in the case of a failure, an additional `error` key.

The `<Authenticated>` component no longer has default redirection, so you need to add the `redirectTo` property to the `check` method's return object. The component doesn't call the `logout` method by default either, and you need to add the `logout: true` property to the `check` method's return object.

```diff
const authProvider = {
-   checkAuth: async () => {
+   check: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
-           return Promise.resolve();
+           return {
+               authenticated: true,
+           };
        }

-       return Promise.reject();
+       return {
+           authenticated: false,
+           redirectTo: "/login",
+           logout: true,
+           error: {
+               message: "Check failed",
+               name: "User not found",
+           }
+       };
    },
};
```

```ts
type CheckResponse = {
  authenticated: boolean;
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};
```

### onError

The `checkError` method of the `authProvider` was changed to `onError`. It now requires promises to be resolved in all cases, with a return type of `OnErrorResponse`. When resolving the promise, you must always include a `success` key, and in the case of a failure, an additional `error` key.

The `useOnError` component no longer has default redirection, so you need to add the `redirectTo` property to the `onError` method's return object. The component doesn't call the `logout` method by default either, so you need to add the `logout: true` property to the `onError` method's return object.

```diff
const authProvider = {
-   checkError: async (error) => {
+   onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
-           return Promise.reject();
+           return {
+               redirectTo: "/login",
+               logout: true,
+               error: error,
+           };
        }

-       return Promise.reject();
+       return {};
    },
};
```

```ts
type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};
```

### getPermissions

The `getPermissions` method now requires promises to be resolved in all cases, with a return type of `PermissionResponse`

```diff
const authProvider = {
    getPermissions: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { roles } = JSON.parse(user);

            return roles;
        }

-        return Promise.reject();
+        return null;
    },
};
```

```ts
type PermissionResponse = unknown;
```

### getIdentity

`authProvider`'s `getUserIdentity` method was renamed to `getIdentity`, which requires promises to be resolved in all cases, with a return type of `IdentityResponse`

```diff
const authProvider: AuthProvider = {
-   getUserIdentity: async () => {
+   getIdentity: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return { email, roles };
        }

-        return Promise.reject();
+        return null;
    },
};
```

```ts
type IdentityResponse = unknown;
```

## Auth hooks

:::caution

If you used `codemod` for migration, the `v3LegacyAuthProviderCompatible: true` prop was added to the auth hooks for backward compatibility. You need to remove this prop if you want to upgrade to the new auth provider.

```diff
useLogin({
-       v3LegacyAuthProviderCompatible: true,
})
```

:::

Unlike the previous version, **refine@4** requires all auth methods to resolve promises. Therefore, if you used auth hooks in your applications before, they need to be updated accordingly.

To better show the differences between the usage of auth hooks between the two versions, let's create two wrapper components that render children according to the authentication status:

Auth Provider v3:

```ts
import { useAuthenticated } from "@pankod/refine-core";

export const Authenticated: React.FC = ({ children }) => {
  const { isSuccess, isLoading, isError } = useAuthenticated();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return null;
  }

  if (isSuccess) {
    return <>{children}</>;
  }

  return null;
};
```

Auth Provider v4:

```ts
import { useIsAuthenticated } from "@refinedev/core";

export const Authenticated: React.FC = ({ children }) => {
  const { isLoading, data } = useIsAuthenticated();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (data.error) {
    return null;
  }

  if (data.authenticated) {
    return <>{children}</>;
  }

  return null;
};
```

Though auth hooks should be familiar, they need to updated according to the new system.

[Please refer to the hooks documentation for more information.](/core/docs/authentication/auth-provider#hooks-and-components)

## Backward compatibility

**Refine** still supports the `authProvider@v3` for backward compatibility. We changed its name to `legacyAuthProvider` and it will be removed in the next major version. If you want to continue using the `authProvider@v3` you can use it as `legacyAuthProvider` in your project.

```diff
- import { AuthProvider } from "@refinedev/core";
+ import { LegacyAuthProvider } from "@refinedev/core";

- const authProvider: AuthProvider = {/* ... */}
+ const authProvider: LegacyAuthProvider = {/* ... */}

const App = () => {
    return (
        <Refine
-           authProvider={authProvider}
+           legacyAuthProvider={authProvider}
        >
            <AppLayout />
        </Refine>
    );
};

```

Additionally, you need to add `v3LegacyAuthProviderCompatible: true` to your auth hooks in order to continue using `authProvider@v3` in your project.

```ts
import { useLogin } from "@refinedev/core";

const login = useLogin({
  // highlight-next-line
  v3LegacyAuthProviderCompatible: true,
});
```
