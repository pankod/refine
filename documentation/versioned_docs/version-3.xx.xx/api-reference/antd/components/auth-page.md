---
id: antd-auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is an authentication page that can be used to login, register, forgot password, and update password.
swizzle: true
source: packages/antd/src/components/pages/auth/index.tsx
---

`<AuthPage>` component from **refine** for **Ant Design** contains authentication pages that can be used to login, register, forgot password, and update password.

Before using `<AuthPage>` component you need to add [authProvider](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) that will be used to handle authentication.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

```tsx live  shared
const { useNavigation: useNavigationShared, useLogout: useLogoutShared } =
  RefineCore;
const {
  Typography: { Title: SharedTitle },
  Button,
} = RefineAntd;

window.__refineAuthStatus = false;

const authProvider = {
  login: () => {
    window.__refineAuthStatus = true;
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
      <SharedTitle level={2}>Home Page</SharedTitle>
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
```

## Usage

`<AuthPage>` component can be used like this:

```tsx live url=http://localhost:3000/login previewHeight=460px
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });
// visible-block-start
import { Refine } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
render(<App />);
```

## Types

`<AuthPage>` component has the following types:

- [`login`](#login) - a type of login page and default type.
- [`register`](#register) - a type of registration page.
- [`forgotPassword`](#forgotpassword) - a type of forgot password page.
- [`updatePassword`](#updatepassword) - a type of update password page.

### Login

`login` will be used as the default type of the `<AuthPage>` component. The login page will be used to log in to the system.

```tsx live hideCode url=http://localhost:3000/login previewHeight=460px
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
render(<App />);
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
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
render(<App />);
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
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
render(<App />);
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
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
render(<App />);
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
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout, Icons } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const { GoogleOutlined, GithubOutlined } = Icons;

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
              icon: <GoogleOutlined />,
              label: "Sign in with Google",
            },
            {
              name: "github",
              icon: <GithubOutlined />,
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
render(<App />);
```

### `rememberMe`

:::info
`rememberMe` property is only available for type `login`.
:::

`rememberMe` property defines to render your own remember me component or you can pass `false` to don't render it.

:::info
You have to wrap your remember me component with `Form.Item` component from **antd** and pass the `name` prop to it then you can access its value from the `formProps` `onFinish` function with `formValues`.
:::

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout, Form, Checkbox } from "@pankod/refine-antd";
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
          rememberMe={
            <div
              style={{
                border: "1px dashed cornflowerblue",
                padding: 3,
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Custom remember me</Checkbox>
              </Form.Item>
            </div>
          }
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
render(<App />);
```

### `loginLink`

:::info
`loginLink` property is only available for types `register` and `forgotPassword`.
:::

`loginLink` property defines the link to the login page and also you can give a node to render. The default value is `"/login"`.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/register
setInitialRoutes(["/register"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
        <div
          style={{
            border: "1px dashed cornflowerblue",
            padding: 3,
          }}
        >
          <Link to="/login">Login</Link>
        </div>
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
render(<App />);
```

### `registerLink`

:::info
`registerLink` property is only available for type `login`.
:::

`registerLink` property defines the link to the registration page and also you can give a node to render. The default value is `"/register"`.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
        <div
          style={{
            border: "1px dashed cornflowerblue",
            marginTop: 5,
            padding: 5,
          }}
        >
          <Link to="/register">Register</Link>
        </div>
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
render(<App />);
```

### `forgotPasswordLink`

:::info
`forgotPasswordLink` property is only available for type `login`.
:::

`forgotPasswordLink` property defines the link to the forgot password page and also you can give a node to render. The default value is `"/forgot-password"`.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
        <div
          style={{
            border: "1px dashed cornflowerblue",
            marginTop: 5,
            padding: 5,
          }}
        >
          <Link to="/register">Forgot Password</Link>
        </div>
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
render(<App />);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
            style: {
              background: "#331049",
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
render(<App />);
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the card component. In the example below you can see that the title, header, and content styles are changed with `contentProps`.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
            title: "Login",
            headStyle: {
              background: "cornflowerblue",
              color: "white",
            },
            bodyStyle: {
              background: "#673ab742",
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
render(<App />);
```

### `formProps`

`formProps` uses for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onFinish` function is changed.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
            initialValues: {
              email: "demo@refine.dev",
              password: "demo",
            },
            onFinish: (formValues) =>
              alert(JSON.stringify(formValues, null, 2)),
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
render(<App />);
```

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use to add some extra elements to the content.

```tsx live hideCode previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-antd";
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 style={{ color: "white" }}>Extra Header</h1>
                {content}
                <h1 style={{ color: "white" }}>Extra Footer</h1>
              </div>
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
render(<App />);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/AuthPage"
formProps-type="[`FormProps`](https://ant.design/components/form/#API)"
wrapperProps-type="[`WrapperProps`](https://ant.design/components/layout/#API)"
contentProps-type="[`CardProps`](https://ant.design/components/card/#API)"
rememberMe-default="[`<Checkbox>Remember me</Checkbox>`](/core/docs/3.xx.xx/api-reference/antd/components/antd-auth-page/#rememberme)"
/>

### Interface

```tsx
interface OAuthProvider {
  name: string;
  icon?: React.ReactNode;
  label?: string;
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
