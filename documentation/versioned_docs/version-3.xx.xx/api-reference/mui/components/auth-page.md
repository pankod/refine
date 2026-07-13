---
id: mui-auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is an authentication page that can be used to login, register, forgot password, and update password.
swizzle: true
source: packages/mui/src/components/pages/auth/index.tsx
---

`<AuthPage>` component from **refine** for **Material UI** contains authentication pages that can be used to login, register, forgot password, and update password.

Before using `<AuthPage>` component you need to add [authProvider](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) that will be used to handle authentication.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

```tsx live shared
const { default: dataProvider } = RefineSimpleRest;
const { useNavigation: useNavigationShared, useLogout: useLogoutShared } =
  RefineCore;
const {
  Typography: { Title: SharedTitle },
  Button,
} = RefineMui;

window.__refineAuthStatus = false;

const authProvider = {
  login: () => {
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
      fill="#4285F4"
      d="m23.7 12.3-.1-2.3H12.3v4.5h6.4a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.2 3.5-8.8Z"
    />
    <path
      fill="#34A853"
      d="M12.3 24c3.2 0 6-1 7.9-3l-3.9-3a7.2 7.2 0 0 1-10.8-3.7h-4v3c2 4 6 6.7 10.8 6.7Z"
    />
    <path
      fill="#FBBC05"
      d="M5.5 14.3a7 7 0 0 1 0-4.6v-3h-4a11.9 11.9 0 0 0 0 10.7l4-3.1Z"
    />
    <path
      fill="#EA4335"
      d="M12.3 4.8c1.7 0 3.3.6 4.6 1.8L20.3 3A12 12 0 0 0 1.6 6.6l4 3.1c.9-2.8 3.5-5 6.7-5Z"
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
    <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z" />
  </svg>
);

const Wrapper = ({ children }) => {
  return (
    <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
      <RefineMui.CssBaseline />
      <RefineMui.GlobalStyles
        styles={{ html: { WebkitFontSmoothing: "auto" } }}
      />
      <RefineMui.RefineSnackbarProvider>
        {children}
      </RefineMui.RefineSnackbarProvider>
    </RefineMui.ThemeProvider>
  );
};
```

## Usage

`<AuthPage>` component can be used like this:

```tsx live url=http://localhost:3000 previewHeight=460px
setInitialRoutes(["/login"]);
// visible-block-start
import { Refine } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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
- [`updatePassword`](#updatepassword) - a type of update password page.

### Login

`login` will be used as the default type of the `<AuthPage>` component. The login page will be used to log in to the system.

```tsx hideCode live url=http://localhost:3000/login previewHeight=460px
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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

```tsx hideCode title="src/authProvider.ts"
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

```tsx hideCode live url=http://localhost:3000/register previewHeight=460px
setInitialRoutes(["/register"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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

```tsx hideCode live url=http://localhost:3000/forgot-password
setInitialRoutes(["/forgot-password"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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

```tsx hideCode live url=http://localhost:3000/update-password
setInitialRoutes(["/update-password"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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

```tsx hideCode live previewHeight=560px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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

```tsx hideCode live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import {
  AuthPage,
  Layout,
  Form,
  FormControlLabel,
  Checkbox,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import { useFormContext } from "@pankod/refine-react-hook-form";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const RememberMe = () => {
  const { register } = useFormContext();

  return (
    <FormControlLabel
      sx={{
        span: {
          fontSize: "12px",
          color: "text.secondary",
        },
      }}
      color="secondary"
      control={
        <Checkbox size="small" id="rememberMe" {...register("rememberMe")} />
      }
      label="Remember me"
    />
  );
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

`loginLink` property defines the link to the login page and also you can give a node to render. The default value is `"/login"`.

```tsx hideCode live previewHeight=500px url=http://localhost:3000/register
setInitialRoutes(["/register"]);

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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
        <span
          style={{
            border: "1px dashed cornflowerblue",
            padding: 3,
          }}
        >
          <Link to="/login">Login</Link>
        </span>
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

`registerLink` property defines the link to the registration page and also you can give a node to render. The default value is `"/register"`.

```tsx hideCode live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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

`forgotPasswordLink` property defines the link to the forgot password page and also you can give a node to render. The default value is `"/forgot-password"`.

```tsx hideCode live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx hideCode live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the card component. In the example below you can see that the title, header, and content styles are changed with `contentProps`.

```tsx hideCode live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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
            sx: {
              border: 5,
              borderColor: "primary.main",
              borderRadius: 2,
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

### `formProps`

`formProps` uses for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onSubmit` function is changed.

```tsx hideCode live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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
            onSubmit: (formValues) => {
              alert(JSON.stringify(formValues, null, 2));
            },
            defaultValues: {
              email: "test@mail.com",
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

```tsx hideCode live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage, Layout } from "@pankod/refine-mui";
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
            sx: {
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
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/AuthPage"
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
rememberMe-default="[`<Checkbox>Remember me</Checkbox>`](/core/docs/3.xx.xx/api-reference/mui/components/mui-auth-page/#rememberme)"
/>

### Interface

```tsx OAuthProvider
interface OAuthProvider {
  name: string;
  icon?: React.ReactNode;
  label?: string;
}
```

```tsx hideCode
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
