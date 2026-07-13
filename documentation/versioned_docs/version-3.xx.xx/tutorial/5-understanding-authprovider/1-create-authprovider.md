---
id: create-authprovider
title: 2. Create Auth Provider From Scratch
tutorial:
  prev: 3.xx.xx/tutorial/understanding-authprovider/index
  next: 3.xx.xx/tutorial/understanding-authprovider/{preferredUI}/auth-pages
---

This section will show you how to create an auth provider from scratch. We'll use mock data to be able to focus on the auth provider methods. When you understand the logic of auth provider, you can easly integrate third-party authentication services or your own custom auth provider which includes many possible strategies like JWT, OAuth, etc.

## Create Mock Auth Provider

1. Create a new file named `authProvider.ts` in `src` folder and add the following code:

   ```tsx title="src/authProvider.ts"
   import { AuthProvider } from "@pankod/refine-core";

   const authProvider: AuthProvider = {
     login: () => Promise.resolve(),
     checkAuth: () => Promise.resolve(),
     logout: () => Promise.resolve(),
     checkError: () => Promise.resolve(),
   };

   export default authProvider;
   ```

   We created a mock auth provider. It has all the required methods. But, they don't do anything. We'll add the logic to these methods in the next.

2. Now, we need to pass the `authProvider` to the `<Refine/>` component. Open `App.tsx` file and add related code:

   ```tsx title="src/App.tsx"
   ...
   import authProvider from "./authProvider";

   <Refine
       ...
       authProvider={authProvider}
   />
   ```

   The `authProvider` is not required for the `<Refine/>` component. If you don't pass it, your app will work without authentication. But, you won't be able to use the auth hooks.

<br />

We created a mock auth provider and passed it to the `<Refine/>` component. Now, we'll add the logic to the auth provider methods.

## Required Methods

### login

`login` method is used to authenticate users. It expects to return a Promise.

- If the Promise resolves, the user is authenticated and pages that require authentication will be accessible.

- If the Promise rejects, the user is not authenticated and stays on the login page.

We'll use mock data to authenticate users. So, we'll create a mock user list and check if the user exists in the list. If the user exists, we'll save the user data to the local storage and resolve the Promise. Otherwise, we'll reject the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return Promise.resolve();
        }

        return Promise.reject();
    },
    ...
};
```

<br />

Invoking the `useLogin` hook's mutation will call the `login` method, passing in the mutation's parameters as arguments. This means the parameters for the `useLogin` hook's mutation must match the parameters of the login method.

[Refer to the `useLogin` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useLogin/)

For example, if we call the `useLogin` hook's mutation like this:

```tsx
import { useLogin } from "@pankod/refine-core";

const { mutate } = useLogin();

mutate({ email: "john@mail.com", password: "123456" });
```

The `login` method will get the mutation's parameters as arguments.

At this point, we can authenticate users. But, we can't check if the user is authenticated or not when the user refreshes the page or navigates to another page. We'll add the logic to the `checkAuth` method to solve this problem.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>login</code> method?</strong></summary>

Yes, you can pass any parameters to the `login` method. `useLogin` hook's mutation will pass the mutation's parameters to the `login` method without any type constraints.

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

By default, the user will be redirected to the `/` route after login. If you want to redirect the user to a specific page, you can resolve the `login` method's Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    login: () => {
        ...
        return Promise.resolve("/custom-page");
    }
}
```

Also, you can use the `useLogin` hook's for this purpose.

```tsx
const { mutate } = useLogin();

mutate({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `login` method to redirect the user to the specific page.

```ts
const authProvider: AuthProvider = {
    ...
    login: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}
```

If you don't want to redirect the user to anywhere, you can resolve the `login` method's Promise with `false`.

```ts
const authProvider: AuthProvider = {
    ...
    login: () => {
        ...
        return Promise.resolve(false);
    }
}
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `login` method rejects the Promise. If you want to customize the error message, you can reject the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        ...
        return Promise.reject({
            name: "Login Failed!",
            message: "The email or password that you've entered doesn't match any account.",
        });
    },
    ...
};
```

</details>

### checkAuth

`checkAuth` method is used to check if the user is authenticated. Internally, it is called when the user navigates to a page that requires authentication.

`checkAuth` method expects to return a Promise.

- If the Promise resolves, the user is authenticated and pages that require authentication will be accessible.

- If the Promise rejects, the user is not authenticated and pages that require authentication will not be accessible and by default, the user will be redirected to the `/login` page.

In the `login` method, we've saved the user data to the local storage when the user logs in. So, we'll check if the user data exists in the local storage to determine if the user is authenticated.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    ...
    checkAuth: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    ...
};
```

<br />

Invoking the `useAuthenticated` hook will call the `checkAuth` method. If `checkAuth` method resolves a data, it will be available in the `useAuthenticated` hook's `data` property.

[Refer to the `useAuthenticated` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useAuthenticated/)

```tsx
import { useAuthenticated } from "@pankod/refine-core";

const { data, isSuccess, isLoading, isError, refetch } = useAuthenticated();
```

:::tip

The `<Authenticated>` component makes use of the `useAuthenticated` hook. It allows you to render components only if the user is authenticated.

[Refer to the `<Authenticated>` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/components/auth/authenticated/)

:::

<br />

<details>
  <summary><strong>How can I redirect the user if the user is not authenticated?</strong></summary>

By default, the user will be redirected to `/login` if the `checkAuth` method rejects the Promise. If you want to redirect the user to a specific page, you can reject the Promise with an object that has `redirectPath` property.

```ts
const authProvider: AuthProvider = {
    ...
    checkAuth: () => {
        ...
         return Promise.reject({
            redirectPath: "/custom-page",
        });
    }
}
```

</details>

### logout

`logout` method is used to log out users. It expects to return a Promise.

- If the Promise resolves, the user is logged out and pages that require authentication will not be accessible and by default, the user will be redirected to the `/login` page.

- If the Promise rejects, the user is not logged out and stays on the page.

In the `login` method, we've saved the user data to the local storage when the user logs in. So, we'll remove the user data from the local storage when the user logs out.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    ...
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    ...
};
```

<br />

Invoking the `useLogout` hook's mutation will call the `logout` method. If you need to pass any parameters to the `logout` method, you can use the `useLogout` hook's mutation.

[Refer to the `useLogout` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useLogout/)

For example, if we call the `useLogout` hook's mutation like this:

```tsx
import { useLogout } from "@pankod/refine-core";

const { mutate } = useLogout();

mutate({ id: "1" });
```

The `logout` method will get the mutation's parameters as an argument.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>logout</code> method?</strong></summary>

Yes, you can pass any parameters to the `logout` method. `useLogout` hook's mutation will pass the mutation's parameters to the `logout` method without any type constraints.

```ts
const { mutate } = useLogout<{
  id: string;
  name: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

By default, the user will be redirected to the `/login` route after logout. If you want to redirect the user to a specific page, you can resolve the `logout` method's Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    logout: () => {
        ...
        return Promise.resolve("/custom-page");
    }
}
```

Also, you can use the `useLogout` hook's for this purpose.

```tsx
const { mutate } = useLogout();

mutate({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `logout` method to redirect the user to the specific page.

```ts
const authProvider: AuthProvider = {
    ...
    logout: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}
```

If you don't want to redirect the user to anywhere, you can resolve the `logout` method's Promise with `false`.

```ts

const authProvider: AuthProvider = {
    ...
    logout: () => {
        ...
        return Promise.resolve(false);
    }
}
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `logout` method rejects the Promise. If you want to customize the error message, you can reject the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    logout: () => {
        ...
        return Promise.reject({
            name: "Logout Failed!",
            message: "Something went wrong.",
        });
    },
    ...
};
```

</details>

### checkError

`checkError` method is called when you get an error response from the API. You can create your own business logic to handle the error such as refreshing the token, logging out the user, etc.

`checkError` method expects to return a Promise.

- If the Promise resolves, the user is not logged out and stays on the page.

- If the Promise rejects, the `logout` method is called to log out the user and by default, the user is redirected to the `/login` route.

We'll use the `checkError` method to log out the user if the API returns a `401` or `403` error.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    ...
    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    ...
};
```

<br />

Invoking the `useCheckError` hook's mutation will call the `checkError` method, passing in the mutation's parameters as arguments.

[Refer to the `useCheckError` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useCheckError/)

For example, if you want to check the error of a fetch request, you can use the `useCheckError` hook's mutation like this:

```tsx
import { useCheckError } from "@pankod/refine-core";

const { mutate } = useCheckError();

fetch("http://example.com/payment")
  .then(() => console.log("Success"))
  .catch((error) => mutate(error));
```

<br />

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

By default, the user will be redirected to the `/login` route after rejecting the `checkError` method's Promise. If you want to redirect the user to a specific page, you can reject the Promise with an object that has `redirectPath` property.

```ts
const authProvider: AuthProvider = {
    ...
    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            return Promise.reject({
                redirectPath: "/custom-page",
            });
        }

        return Promise.resolve();
    },
    ...
}
```

</details>

## Optional Methods

### getPermissions

`getPermissions` method is used to get the user's permissions. It expects to return a Promise.

- If the Promise resolves with data, the user's permissions will be available in the `usePermissions` hook's `data` property.

- If the Promise rejects, the user's permissions will not be available and `usePermissions` hook throw an error.

We'll use the `getPermissions` method to get the user's permissions from the `localStorage`.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const mockUsers = [
    { email: "john@mail.com", roles: ["admin"] },
    { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthProvider = {
    ...
    getPermissions: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { roles } = JSON.parse(user);

            return Promise.resolve(roles);
        }

        return Promise.reject();
    },
    ...
};
```

<br />

Invoking the `usePermissions` hook will call the `getPermissions` method. If `getPermissions` method resolves a data, it will be available in the `usePermissions` hook's `data` property.

[Refer to the `usePermissions` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/usePermissions/)

For example, if you want to check if the user has a specific permission, you can use the `usePermissions` hook like this:

```tsx
import { usePermissions } from "@pankod/refine-core";

const { data } = usePermissions();

if (data?.includes("admin")) {
  console.log("User has admin permissions");
}
```

<br />

:::info
`usePermissions` hook can be used for simply authorization purposes. If you need more complex authorization logic, we recommend using the access control provider to handle the authorization logic.

[Refer to the `accessControlProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider/)
:::

### getUserIdentity

`getUserIdentity` method is used to get the user's identity. It expects to return a Promise.

- If the Promise resolves with a data, the user's identity will be available in the `useGetIdentity` hook's `data` property.

- If the Promise rejects, the user's identity will not be available and `useGetIdentity` hook throw an error.

We'll get the user's identity from the local storage and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const mockUsers = [
    { email: "john@mail.com", roles: ["admin"] },
    { email: "jane@mail.com", roles: ["editor"] },
]

const authProvider: AuthProvider = {
    ...
    getUserIdentity: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return Promise.resolve({ email, roles });
        }

        return Promise.reject();
    },
    ...
};
```

<br />

Invoking the `useGetIdentity` hook will call the `getUserIdentity` method. If `getUserIdentity` method resolves a data, it will be available in the `useGetIdentity` hook's `data` property.

[Refer to the `useGetIdentity` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useGetIdentity/)

For example, if you want to get the user's email, you can use the `useGetIdentity` hook like this:

```tsx
import { useGetIdentity } from "@pankod/refine-core";

const { data } = useGetIdentity();

if (data) {
  console.log(data.email);
}
```

:::info

Depending on the UI framework you use, if you resolve `name` and `avatar` properties in the `getUserIdentity` method, the user's name and avatar will be shown in the header in the default layout.

```ts
const authProvider: AuthProvider = {
    ...
    getUserIdentity: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return Promise.resolve({
                email,
                roles,
                // highlight-start
                name: "John Doe",
                avatar: "https://i.pravatar.cc/300",
                // highlight-end
            });
        }

        return Promise.reject();
    },
    ...
};
```

:::

### register

`register` method is used to register a new user. It is similar to the `login` method. It expects to return a Promise.

- If the Promise resolves, by default, the user will be redirected to the `/` page.

- If the Promise rejects, the `useRegister` hook will throw an error.

We'll register a new user and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthProvider = {
    ...
    register: ({ email }) => {
        const user = mockUsers.find((user) => user.email === email);

        if (user) {
            return Promise.reject();
        }

        mockUsers.push({ email });

        return Promise.resolve();
    },
    ...
};
```

<br />

Invoking the `useRegister` hook's mutation will call the `register` method, passing in the mutation's parameters as arguments.

[Refer to the `useRegister` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useRegister/)

For example, if you want to register a new user, you can use the `useRegister` hook like this:

```tsx
import { useRegister } from "@pankod/refine-core";

const { mutate } = useRegister();

const handleRegister = (values) => {
  mutate(values);
};
```

The `register` method will get the mutation's parameters as arguments.

<br />

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

By default, the user will be redirected to the `/` route after registration. If you want to redirect the user to a specific page, you can resolve the `register` method's Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    register: () => {
        ...
        return Promise.resolve("/custom-page");
    }
}
```

Also, you can use the `useRegister` hook's for this purpose.

```tsx
const { mutate } = useRegister();

mutate({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `register` method to redirect the user to the specific page.

```ts
const authProvider: AuthProvider = {
    ...
    register: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}
```

If you don't want to redirect the user to anywhere, you can resolve the `register` method's Promise with `false`.

```ts
const authProvider: AuthProvider = {
    ...
    register: () => {
        ...
        return Promise.resolve(false);
    }
}
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `register` method rejects the Promise. If you want to customize the error message, you can reject the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"

const authProvider: AuthProvider = {
    ...
    register: () => {
        ...
        return Promise.reject({
            name: "Error",
            message: "Something went wrong!",
        });
    }
}
```

</details>

### forgotPassword

`forgotPassword` method is used to send a password reset link to the user's email address. It expects to return a Promise.

We'll show how to send a password reset link to the user's email address and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    ...
    forgotPassword: ({ email }) => {
        // send password reset link to the user's email address here
        // if request is successful, resolve the Promise, otherwise reject it
        return Promise.resolve();
    },
    ...
};
```

<br />

Invoking the `useForgotPassword` hook's mutation will call the `forgotPassword` method, passing in the mutation's parameters as arguments.

[Refer to the `useForgotPassword` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useForgotPassword/)

For example, if you want to send a password reset link to the user's email address, you can use the `useForgotPassword` hook like this:

```tsx
import { useForgotPassword } from "@pankod/refine-core";

const { mutate } = useForgotPassword();

const handleForgotPassword = (values) => {
  mutate(values);
};
```

The `forgotPassword` method will get the mutation's parameters as arguments.

<br />

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

By default, the user won't be redirected to anywhere after sending the password reset link. If you want to redirect the user to a specific page, you can resolve the `forgotPassword` method's Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    forgotPassword: () => {
        ...
        return Promise.resolve("/custom-page");
    }
}
```

Also, you can use the `useForgotPassword` hook's for this purpose.

```ts
const { mutate } = useForgotPassword();

useForgotPassword({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `forgotPassword` method to redirect the user to the specific page.

```ts
const authProvider: AuthProvider = {
    ...
    forgotPassword: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `forgotPassword` method rejects the Promise. If you want to customize the error message, you can reject the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthProvider = {
    ...
    forgotPassword: () => {
        ...
        return Promise.reject({
            name: "Error",
            message: "Something went wrong!",
        });
    }
}
```

</details>

### updatePassword

`updatePassword` method is used to update the user's password. It expects to return a Promise.

We'll show how to update the user's password and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    ...
    updatePassword: ({ password }) => {
        // update the user's password here
        // if request is successful, resolve the Promise, otherwise reject it
        return Promise.resolve();
    },
    ...
};
```

<br />

Invoking the `useUpdatePassword` hook's mutation will call the `updatePassword` method, passing in the mutation's parameters as arguments. Additionally, the `updatePassword` method will take query parameters as arguments from the URL as well.

[Refer to the `useUpdatePassword` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useUpdatePassword/)

For example, if you want to update the user's password, you can use the `useUpdatePassword` hook like this:

```tsx
import { useUpdatePassword } from "@pankod/refine-core";

const { mutate } = useUpdatePassword();

const handleUpdatePassword = ({ password, confirmPassword }) => {
    mutate({ password, confirmPassword }});
};
```

If we assume that the URL is `http://localhost:3000/reset-password?token=123`, the `updatePassword` method will get the mutation's parameters as arguments and `token` query parameter as well.

```ts
const authProvider: AuthProvider = {
    ...
    updatePassword: ({ password, confirmPassword, token }) => {
        console.log(token); // 123
        return Promise.resolve();
    }
}
```

<br />

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

By default, the user won't be redirected to anywhere after updating the password. If you want to redirect the user to a specific page, you can resolve the `updatePassword` method's Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    updatePassword: () => {
        ...
        return Promise.resolve("/custom-page");
    }
}
```

Also, you can use the `useUpdatePassword` hook's for this purpose.

```ts
const { mutate } = useUpdatePassword();

useUpdatePassword({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `updatePassword` method to redirect the user to the specific page.

```ts
const authProvider: AuthProvider = {
    ...
    updatePassword: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `updatePassword` method rejects the Promise. If you want to customize the error message, you can reject the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthProvider = {
    ...
    updatePassword: () => {
        ...
        return Promise.reject({
            name: "Error",
            message: "Something went wrong!",
        });
    }
}
```

</details>

## Setting Authorization Credentials

After a user logs in, you can save the user's authorization credentials (such as a token) to the browser's `localStorage` or `sessionStorage`. This allows you to include the credentials in API calls by configuring the `dataProvider`.

Here's an example using `axios` and the `localStorage` to add a token acquired from the `login` method to the `Authorization` header of API calls.

```tsx title="App.tsx"
...
// highlight-next-line
import axios from "axios";

// highlight-next-line
const axiosInstance = axios.create();

const mockUsers = [
    { username: "admin", token: "123" },
    { username: "editor", token: "321" }
];

const App = () => {
    const authProvider: AuthProvider = {
        login: ({ username, password }) => {
                // Suppose we actually send a request to the back end here.
                const user = mockUsers.find((item) => item.username === username);

                if (user) {
                    localStorage.setItem("auth", JSON.stringify(user));
                    // This sets the authorization headers on Axios instance
                    // highlight-start
                    axiosInstance.defaults.headers.common = {
                        Authorization: `Bearer ${user.token}`,
                    };
                    // highlight-end

                    return Promise.resolve();
                }
                return Promise.reject();
            },
            ...
        };

    return (
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            // In order to use the axios instance, we need to pass it to the dataProvider
            // highlight-next-line
            dataProvider={dataProvider(API_URL, axiosInstance)}
        />
    );
}
```

:::note
We recommend using **axios** as the **HTTP** client with the **@pankod/refine-simple-rest** [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider). Other **HTTP** clients can also be preferred.
:::

<br />

You can also use `axios.interceptors.request.use` to add the token acquired from the `login` method to the `Authorization` header of API calls. It is similar to the above example, but it is more flexible for more complex use cases such as refreshing tokens when they expire.

[Refer to the axios documentation for more information about interceptors &#8594](https://axios-http.com/docs/interceptors)

```tsx title="App.tsx"
// highlight-next-line
import axios from "axios";

// highlight-next-line
const axiosInstance = axios.create();

// highlight-start
axiosInstance.interceptors.request.use((config) => {
  // Retrieve the token from local storage
  const token = JSON.parse(localStorage.getItem("auth"));
  // Check if the header property exists
  if (config.headers) {
    // Set the Authorization header if it exists
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
// highlight-end

const mockUsers = [
  { username: "admin", token: "123" },
  { username: "editor", token: "321" },
];

const App = () => {
  const authProvider: AuthProvider = {
    //highlight-start
    login: ({ username, password }) => {
      // Suppose we actually send a request to the back end here.
      const user = mockUsers.find((item) => item.username === username);

      if (user) {
        localStorage.setItem("auth", JSON.stringify(user));
        return Promise.resolve();
      }
      return Promise.reject();
    },
    //highlight-end
  };

  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerProvider}
      //highlight-next-line
      dataProvider={dataProvider(API_URL, axiosInstance)}
    />
  );
};
```

<br />
<br />

<Checklist>

<ChecklistItem id="auth-provider-create-auth-provider">
I understood how to create a auth provider.
</ChecklistItem>

</Checklist>
