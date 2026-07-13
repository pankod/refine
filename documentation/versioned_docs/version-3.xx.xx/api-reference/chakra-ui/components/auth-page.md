---
id: chakra-auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is a authentication page that can be used to login, register, forgot password and update password.
swizzle: true
source: packages/chakra-ui/src/components/pages/auth/index.tsx
---

`<AuthPage>` component from **refine** for **Chakra UI** contains authentication pages that can be used to login, register, forgot password and update password.

Before using `<AuthPage>` component you need to add [authProvider](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) that will be used to handle authentication.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

```tsx live hideCode shared
const { default: dataProvider } = RefineSimpleRest;
const { useNavigation: useNavigationShared, useLogout: useLogoutShared } =
  RefineCore;
const { Button } = RefineChakra;

window.__refineAuthStatus = false;

const authProvider = {
  login: (params) => {
    console.log("params", params);
    window.__refineAuthStatus = true;
    return Promise.resolve();
  },
  register: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  logout: () => {
    window.__refineAuthStatus = false;
  },
  checkAuth: () =>
    window.__refineAuthStatus ? Promise.resolve() : Promise.reject(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
  getUserIdentity: () => Promise.resolve(),
};

setRefineProps({ Sider: () => null, dataProvider: dataProvider("api") });

const Wrapper = ({ children }) => {
  return (
    <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </RefineChakra.ChakraProvider>
  );
};

const DashboardPage = () => {
  const { mutate } = useLogoutShared();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 level={2}>Home Page</h1>
      <br />
      <button
        onClick={() => {
          mutate();
        }}
      >
        Logout
      </button>
    </div>
  );
};

const GoogleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="m23.7 12.3-.1-2.3H12.3v4.5h6.4a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.2 3.5-8.8Z M12.3 24c3.2 0 6-1 7.9-3l-3.9-3a7.2 7.2 0 0 1-10.8-3.7h-4v3c2 4 6 6.7 10.8 6.7Z M5.5 14.3a7 7 0 0 1 0-4.6v-3h-4a11.9 11.9 0 0 0 0 10.7l4-3.1Z M12.3 4.8c1.7 0 3.3.6 4.6 1.8L20.3 3A12 12 0 0 0 1.6 6.6l4 3.1c.9-2.8 3.5-5 6.7-5Z"
    />
  </svg>
);

const GithubIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"
    />
  </svg>
);
```

## Usage

`<AuthPage>` component can be used like this:

```tsx live url=http://localhost:3000 previewHeight=460px
setInitialRoutes(["/login"]);
// visible-block-start
import { Refine } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
        routes: [
          // highlight-start
          {
            path: "/register",
            element: <AuthPage type="register" />,
          },
          {
            path: "/forgot-password",
            element: <AuthPage type="forgotPassword" />,
          },
          // highlight-end
        ],
      }}
      authProvider={authProvider}
      // highlight-next-line
      LoginPage={AuthPage}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## Types

`<AuthPage>` component has the following types:

- [`login`](#login) - a type of login page and default type.
- [`register`](#register) - a type of registration page.
- [`forgotPassword`](#forgotpassword) - a type of forgot password page.
- [`updatePassword`](#updatepassword) - type of update password page.

### Login

`login` will be used as the default type of the `<AuthPage>` component. The login page will be used to log in to the system.

```tsx live hideCode url=http://localhost:3000/login previewHeight=460px
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      authProvider={authProvider}
      // highlight-next-line
      LoginPage={AuthPage}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

After form submission, the [`login`][login] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
  // --
  login: async ({ email, password, remember, providerName }) => {
    // You can handle the login process according to your needs.

    // If the process is successful.
    return Promise.resolve();

    return Promise.reject();
  },
  // --
};
```

### Register

The register page will be used to register new users. You can use the following props for the `<AuthPage>` component when the type is `"register"`:

```tsx live hideCode url=http://localhost:3000/register previewHeight=460px
setInitialRoutes(["/register"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          // highlight-start
          {
            path: "/register",
            element: <AuthPage type="register" />,
          },
          // highlight-end
        ],
      }}
      LoginPage={AuthPage}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

After form submission, the [`register`][register] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
  // --
  register: async ({ email, password, providerName }) => {
    // You can handle the register process according to your needs.

    // If the process is successful.
    return Promise.resolve();

    return Promise.reject();
  },
  // --
};
```

### ForgotPassword

The `forgotPassword` type is a page that allows users to reset their passwords. You can use this page to reset your password.

```tsx live hideCode url=http://localhost:3000/forgot-password
setInitialRoutes(["/forgot-password"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          // highlight-start
          {
            path: "/forgot-password",
            element: <AuthPage type="forgotPassword" />,
          },
          // highlight-end
        ],
      }}
      LoginPage={AuthPage}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

After form submission, the [`forgotPassword`][forgot-password] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
  // --
  forgotPassword: async ({ email }) => {
    // You can handle the reset password process according to your needs.

    // If process is successful.
    return Promise.resolve();

    return Promise.reject();
  },
  // --
};
```

### UpdatePassword

The `updatePassword` type is the page used to update the password of the user.

```tsx live hideCode url=http://localhost:3000/update-password
setInitialRoutes(["/update-password"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          // highlight-start
          {
            path: "/update-password",
            element: <AuthPage type="updatePassword" />,
          },
          // highlight-end
        ],
      }}
      LoginPage={AuthPage}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

After form submission, the [`updatePassword`][update-password] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
  // --
  updatePassword: async ({ password, confirmPassword }) => {
    // You can handle the update password process according to your needs.

    // If the process is successful.
    return Promise.resolve();

    return Promise.reject();
  },
  // --
};
```

## Props

### `providers`

:::info
`providers` property is only available for types `login` and `register`.
:::

`providers` property defines the list of providers used to handle login authentication. `providers` accepts an array of `Provider` type. Check out the [Interface](#interface) section for more information.

```tsx live hideCode previewHeight=560px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerProvider}
      // highlight-start
      LoginPage={() => (
        <AuthPage
          providers={[
            {
              name: "google",
              icon: GoogleIcon,
              label: "Sign in with Google",
            },
            {
              name: "github",
              icon: GithubIcon,
              label: "Sign in with GitHub",
            },
          ]}
        />
      )}
      // highlight-end
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `rememberMe`

:::info
`rememberMe` property is only available for type `login`.
:::

`rememberMe` property defines to render your own remember me component or you can pass `false` to don't render it.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import {
  AuthPage,
  Layout,
  Form,
  FormControlLabel,
  Checkbox,
} from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import { useFormContext } from "@pankod/refine-react-hook-form";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const RememberMe = () => {
  const { register } = useFormContext();

  return <Checkbox {...register("rememberMe")}>Remember Me</Checkbox>;
};

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      authProvider={authProvider}
      // highlight-start
      LoginPage={() => <AuthPage rememberMe={<RememberMe />} />}
      // highlight-end
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `loginLink`

:::info
`loginLink` property is only available for types `register` and `forgotPassword`.
:::

`loginLink` property defines the link to the login page and also you can give a node to render. Default value is `"/login"`.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/register
setInitialRoutes(["/register"]);

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout, Box } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const Auth = (props) => {
  const { Link } = useRouterContext();

  return (
    <AuthPage
      {...props}
      // highlight-start
      loginLink={
        <Box mb="3" bg="gray.200">
          <Link to="/login">Login</Link>
        </Box>
      }
      // highlight-end
    />
  );
};

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      // highlight-start
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: "/register",
            element: <Auth type="register" />,
          },
        ],
      }}
      // highlight-end
      LoginPage={Auth}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `registerLink`

:::info
`registerLink` property is only available for type `login`.
:::

`registerLink` property defines the link to the registration page and also you can give a node to render. Default value is `"/register"`.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout, Box } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const Auth = (props) => {
  const { Link } = useRouterContext();

  return (
    <AuthPage
      {...props}
      // highlight-start
      registerLink={
        <Box mb="3" bg="gray.200">
          <Link to="/register">Register</Link>
        </Box>
      }
      // highlight-end
    />
  );
};

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [{ path: "/register", element: <Auth type="register" /> }],
      }}
      // highlight-next-line
      LoginPage={Auth}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `forgotPasswordLink`

:::info
`forgotPasswordLink` property is only available for type `login`.
:::

`forgotPasswordLink` property defines the link to the forgot password page and also you can give a node to render. Default value is `"/forgot-password"`.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout, Box } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const Auth = (props) => {
  const { Link } = useRouterContext();

  return (
    <AuthPage
      {...props}
      // highlight-start
      forgotPasswordLink={
        <Box mb="3" bg="gray.200">
          <Link to="/register">Forgot Password</Link>
        </Box>
      }
      // highlight-end
    />
  );
};

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: "/forgot-password",
            element: <Auth type="forgotPassword" />,
          },
        ],
      }}
      // highlight-next-line
      LoginPage={Auth}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerProvider}
      LoginPage={() => (
        <AuthPage
          // highlight-start
          wrapperProps={{
            bg: "tomato",
          }}
          // highlight-end
        />
      )}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the card component. In the example below you can see that the title, header and content styles are changed with `contentProps`.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      authProvider={authProvider}
      LoginPage={() => (
        <AuthPage
          // highlight-start
          contentProps={{
            bg: "tomato",
          }}
          // highlight-end
        />
      )}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `formProps`

`formProps` uses for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onSubmit` function is changed.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      authProvider={authProvider}
      LoginPage={() => (
        <AuthPage
          // highlight-start
          formProps={{
            defaultValues: {
              email: "test@mail.com",
            },
            onSubmit: (e: any) => {
              e.preventDefault();
              console.log("e", e.target.email.value);

              const email = e.target.email.value;
              const password = e.target.password.value;

              alert(
                JSON.stringify({
                  email,
                  password,
                }),
              );
            },
          }}
          // highlight-end
        />
      )}
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use to add some extra elements to the content.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout, Box, Heading } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      authProvider={authProvider}
      // highlight-start
      LoginPage={() => (
        <AuthPage
          contentProps={{
            style: {
              width: "400px",
            },
          }}
          renderContent={(content: React.ReactNode) => {
            return (
              <Box
                bg="white"
                borderRadius="md"
                px="5"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading color="white">Extra Header</Heading>
                {content}
                <Heading color="white">Extra Footer</Heading>
              </Box>
            );
          }}
        />
      )}
      // highlight-end
      DashboardPage={DashboardPage}
      Layout={Layout}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## API Reference

### Properties

| Property           | Description                                                                         | Type                                                          |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| type               | Render `<AuthPage>` forms by `type` property.                                       | `login` \| `register` \| `forgotPassword` \| `updatePassword` |
| providers          | Render auth logins if `type` is `"login"`.                                          | [`IProvider[]`](#interface)                                   |
| registerLink       | A custom node that will be rendered as a register link to the `<AuthPage>`.         | `React.ReactNode`                                             |
| loginLink          | A custom node that will be rendered as a link to the `<AuthPage>`.                  | `React.ReactNode`                                             |
| forgotPasswordLink | A custom node that will be rendered as a forgot password link to the `<AuthPage>`.  | `React.ReactNode`                                             |
| wrapperProps       | Wrapper element props.                                                              | [`BoxProps`](https://chakra-ui.com/docs/components/box/props) |
| contentProps       | Content wrapper element props.                                                      | [`BoxProps`](https://chakra-ui.com/docs/components/box/props) |
| formProps          | Props for the form component.                                                       | [`FormPropsType`]                                             |
| renderContent      | Gives you default content you can use it to add some extra elements to the content. | `function(content: React.ReactNode) => React.ReactNode`       |

### Interface

```tsx
interface OAuthProvider {
  name: string;
  icon?: React.ReactNode;
  label?: string;
}
```

```tsx
import { UseFormProps } from "@pankod/refine-react-hook-form";

interface FormPropsType extends UseFormProps {
  onSubmit?: (values: any) => void;
}
```

[auth-provider]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider/
[login]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider/#login-
[register]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider/#register
[forgot-password]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider/#forgotpassword
[update-password]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider/#updatepassword
[get-permissions]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider/#getpermissions-
[check-auth]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider/#checkauth-
[logout]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider/#logout-
