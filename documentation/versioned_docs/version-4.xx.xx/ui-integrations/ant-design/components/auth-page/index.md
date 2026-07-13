---
title: "Ant Design AuthPage Component | Refine v4 UI"
display_title: "<AuthPage />"
sidebar_label: "<AuthPage />"
description: "Ready-to-use Ant Design login, register, and password reset pages. Documentation on customizing and implementing auth views in Refine v4 with ease."
swizzle: true
source: packages/antd/src/components/pages/auth/index.tsx
---

`<AuthPage>` component from Refine for **Ant Design** contains authentication pages that can be used for the login, register, forgot password, and update password actions.

Before using `<AuthPage>` component you need to add [authProvider](/core/docs/authentication/auth-provider) that will be used to handle authentication.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

```tsx live  shared
const { useNavigation: useNavigationShared, useLogout: useLogoutShared } =
  RefineCore;
const {
  Typography: { Title: SharedTitle },
  Button,
} = AntdCore;

window.__refineAuthStatus = false;

const authProvider = {
  login: () => {
    window.__refineAuthStatus = true;
    return {
      success: true,
      redirectTo: "/",
    };
  },
  register: async () => {
    return {
      success: true,
    };
  },
  forgotPassword: async () => {
    return {
      success: true,
    };
  },
  updatePassword: async () => {
    return {
      success: true,
    };
  },
  logout: async () => {
    window.__refineAuthStatus = false;
    return {
      success: true,
      redirectTo: "/",
    };
  },
  check: async () => {
    return {
      authenticated: window.__refineAuthStatus ? true : false,
      redirectTo: window.__refineAuthStatus ? undefined : "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getPermissions: async () => null,
  getIdentity: async () => null,
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

The `<AuthPage>` component can be used like this:

```tsx live url=http://localhost:3000/login previewHeight=600px
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { AuthPage, ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          routerProvider={routerProvider}
          authProvider={authProvider}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<DashboardPage />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              {/* highlight-start */}
              <Route path="/login" element={<AuthPage type="login" />} />
              {/* highlight-end */}
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
// visible-block-end
render(<App />);
```

## Types

The `<AuthPage>` component has the following types:

- [`login`](#login) - a type of login page and default type.
- [`register`](#register) - a type of registration page.
- [`forgotPassword`](#forgotpassword) - a type of forgot password page.
- [`updatePassword`](#updatepassword) - a type of update password page.

### Login

`login` will be used as the default type of the `<AuthPage>` component. The login page will be used to log in to the system.

```tsx live hideCode url=http://localhost:3000/login previewHeight=600px
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";

import { AuthPage, ThemedLayoutV2, RefineThemes } from "@refinedev/antd";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          routerProvider={routerProvider}
          authProvider={authProvider}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<DashboardPage />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              {/* highlight-next-line */}
              <Route path="/login" element={<AuthPage />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
// visible-block-end
render(<App />);
```

After form submission, the [`login`][login] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // --
  login: async ({ email, password, remember, providerName }) => {
    // You can handle the login process according to your needs.

    // If the process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Login Error",
        message: "Invalid email or password",
      },
    };
  },
  // --
};
```

### Register

The register page will be used to register new users. You can use the following props for the `<AuthPage>` component when the type is `"register"`:

```tsx live hideCode url=http://localhost:3000/register previewHeight=600px
setInitialRoutes(["/register"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";

import { AuthPage, ThemedLayoutV2, RefineThemes } from "@refinedev/antd";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          routerProvider={routerProvider}
          authProvider={authProvider}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<DashboardPage />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path="/login" element={<AuthPage />} />
              {/* highlight-next-line */}
              <Route path="/register" element={<AuthPage type="register" />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
// visible-block-end
render(<App />);
```

After form submission, the [`register`][register] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // --
  register: async ({ email, password, providerName }) => {
    // You can handle the register process according to your needs.

    // If the process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Register Error",
        message: "Invalid email or password",
      },
    };
  },
  // --
};
```

### ForgotPassword

The `forgotPassword` type is a page that allows users to reset their passwords. You can use this page to reset your password.

```tsx live hideCode url=http://localhost:3000/forgot-password previewHeight=600px
setInitialRoutes(["/forgot-password"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";

import { AuthPage, ThemedLayoutV2, RefineThemes } from "@refinedev/antd";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        routerProvider={routerProvider}
        authProvider={authProvider}
      >
        <Routes>
          <Route
            element={
              <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              </Authenticated>
            }
          >
            <Route index element={<DashboardPage />} />
          </Route>
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage type="register" />} />
            {/* highlight-next-line */}
            <Route
              path="/forgot-password"
              element={<AuthPage type="forgotPassword" />}
            />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
// visible-block-end
render(<App />);
```

After form submission, the [`forgotPassword`][forgot-password] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // --
  forgotPassword: async ({ email }) => {
    // You can handle the reset password process according to your needs.

    // If the process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Register Error",
        message: "Invalid email",
      },
    };
  },
  // --
};
```

### UpdatePassword

The `updatePassword` type is the page used to update the password of the user.

```tsx live hideCode url=http://localhost:3000/update-password previewHeight=600px
setInitialRoutes(["/update-password"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";

import { AuthPage, ThemedLayoutV2, RefineThemes } from "@refinedev/antd";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        routerProvider={routerProvider}
        authProvider={authProvider}
      >
        <Routes>
          <Route
            element={
              <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              </Authenticated>
            }
          >
            <Route index element={<DashboardPage />} />
          </Route>
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage type="register" />} />
            <Route
              path="/forgot-password"
              element={<AuthPage type="forgotPassword" />}
            />
            {/* highlight-next-line */}
            <Route
              path="/update-password"
              element={<AuthPage type="updatePassword" />}
            />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
// visible-block-end
render(<App />);
```

After form submission, the [`updatePassword`][update-password] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // --
  updatePassword: async ({ password, confirmPassword }) => {
    // You can handle the update password process according to your needs.

    // If the process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Login Error",
        message: "Invalid email or password",
      },
    };
  },
  // --
};
```

## Props

### hideForm

When you set `hideForm` to `true`, the form will be hidden. You can use this property to show only providers.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login" // or "register"
      hideForm={true}
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
  );
};
```

### providers

The `providers` property defines the list of providers used to handle login authentication. `providers` accepts an array of `Provider` type. This property is only available for types `login` and `register`.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
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
  );
};
```

> For more information, refer to the [Interface section &#8594](#interface)

### rememberMe

The `rememberMe` property defines to render your custom `<RememberMe>` component or you can pass `false` to don't render it. This property is only available for type `login`.

You have to wrap your custom `<RememberMe>` component with the `Form.Item` component from **Ant Design** and pass the `name` prop to it then you can access its value from the `formProps` `onFinish` function with `formValues`.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
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
      // highlight-end
    />
  );
};
```

### loginLink

The `loginLink` property defines the link to the login page and also you can give a node to render. The default value is `"/login"`. This property is only available for type `register` and `forgotPassword`.

```tsx
const MyRegisterPage = () => {
  return (
    <AuthPage
      type="register"
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
```

### registerLink

The `registerLink` property defines the link to the registration page and also you can give a node to render. The default value is `"/register"`. This property is only available for type `login`.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
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
```

### forgotPasswordLink

The `forgotPasswordLink` property defines the link to the forgot password page and also you can give a node to render. Its default value is `"/forgot-password"`. This property is only available for type `login`.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      forgotPasswordLink={
        <div
          style={{
            border: "1px dashed cornflowerblue",
            marginTop: 5,
            padding: 5,
          }}
        >
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      }
      // highlight-end
    />
  );
};
```

### wrapperProps

The `wrapperProps` is used for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      wrapperProps={{
        style: {
          background: "#331049",
        },
      }}
      // highlight-end
    />
  );
};
```

### contentProps

The `contentProps` is used for passing props to the content component which is the card component. In the example below, you can see that the title, header, and content styles are changed with `contentProps`.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
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
  );
};
```

### formProps

The `formProps` is used for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onFinish` function is changed.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      formProps={{
        initialValues: {
          email: "demo@refine.dev",
          password: "demo",
        },
        onFinish: (formValues) => alert(JSON.stringify(formValues, null, 2)),
      }}
      // highlight-end
    />
  );
};
```

### title

By default, `AuthPage` uses text with icon on top of page. You can use this property to change the default title.

- Default text is: Refine Project
- Default icon is: Refine Logo

```tsx
import { AuthPage, ThemedTitle } from "@refinedev/antd";

const MyLoginPage = () => {
  return <AuthPage type="login" title={<h1>My Title</h1>} />;
};
```

Or you can customize the title with the `ThemedTitle` component.

```tsx
import { AuthPage } from "@refinedev/antd";

const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          title="My Title"
          icon={<img src="https://refine.dev/img/logo.png" />}
        />
      }
    />
  );
};
```

### renderContent

`renderContent` is used to render the form content and the [title](#title). You can use this property to render your own content, or change the default content and title that it gives you.

```tsx
import { AuthPage } from "@refinedev/antd";

const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      renderContent={(content: React.ReactNode, title: React.ReactNode) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {title}
            <h1 style={{ color: "white" }}>Extra Header</h1>
            {content}
            <h1 style={{ color: "white" }}>Extra Footer</h1>
          </div>
        );
      }}
      // highlight-end
    />
  );
};
```

### mutationVariables

`mutationVariables` is used to pass additional variables to the `authProvider` methods.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login" // all other types are also supported.
      // highlight-start
      mutationVariables={{
        foo: "bar",
        xyz: "abc",
      }}
      // highlight-end
    />
  );
};

// all mutation methods are supported.
const authProvider = {
  login: async ({ foo, xyz, ...otherProps }) => {
    console.log(foo); // bar
    console.log(xyz); // abc
    // ...
  },
  register: async ({ foo, xyz, ...otherProps }) => {
    console.log(foo); // bar
    console.log(xyz); // abc
    // ...
  },
  // ...
};
```

## FAQ

### How can I remove the default title and logo ?

You can use the `renderContent` property to remove the default title and logo.

```tsx
import { AuthPage } from "@refinedev/antd";

const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      renderContent={(
        content: React.ReactNode,
        title: React.ReactNode, // not return
      ) => {
        return content;
      }}
      // highlight-end
    />
  );
};
```

Or you can give `false` to the `title` property to remove the default title.

```tsx
import { AuthPage } from "@refinedev/antd";

const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      title={false}
      // highlight-end
    />
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/AuthPage"
formProps-type="[`FormProps`](https://ant.design/components/form/#API)"
wrapperProps-type="[`WrapperProps`](https://ant.design/components/layout/#API)"
contentProps-type="[`CardProps`](https://ant.design/components/card/#API)"
rememberMe-default="[`<Checkbox>Remember me</Checkbox>`](/core/docs/ui-integrations/ant-design/components/auth-page#rememberme)"
/>

### Interface

```tsx
interface OAuthProvider {
  name: string;
  icon?: React.ReactNode;
  label?: string;
}
```

[auth-provider]: /core/docs/authentication/auth-provider
[login]: /core/docs/authentication/auth-provider#login-
[register]: /core/docs/authentication/auth-provider#register
[forgot-password]: /core/docs/authentication/auth-provider#forgotpassword
[update-password]: /core/docs/authentication/auth-provider#updatepassword
