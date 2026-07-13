---
title: "MUI Auth Page Component | UI Component in Refine v5"
display_title: "<AuthPage />"
sidebar_label: "<AuthPage />"
description: "Learn to integrate Auth Page in Refine v5. Learn integrate login and property for polished admin UIs. See practical code samples."
swizzle: true
source: packages/mui/src/components/pages/auth/index.tsx
---

`<AuthPage>` component from Refine for **Material UI** contains authentication pages that can be used to login, register, forgot password, and update password.

Before using the `<AuthPage>` component you need to add [authProvider](/core/docs/authentication/auth-provider/) that will be used to handle authentication.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

```tsx live shared
const { default: sharedDataProvider } = RefineSimpleRest;
const { useLogout: useLogoutShared } = RefineCore;
const { SharedTypography, Button } = MuiMaterial;

window.__refineAuthStatus = false;

const authProvider = {
  login: async () => {
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

setRefineProps({ Sider: () => null, dataProvider: sharedDataProvider("api") });

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
      <SharedTypography variant="h5">Home Page</SharedTypography>
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
  return children;
};
```

## Usage

`<AuthPage>` component can be used like this:

```tsx live url=http://localhost:3000 previewHeight=600px
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import {
  AuthPage,
  ThemedLayout,
  RefineThemes,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            authProvider={authProvider}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
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
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
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

```tsx hideCode live url=http://localhost:3000/login previewHeight=600px
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import {
  AuthPage,
  ThemedLayout,
  RefineThemes,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            authProvider={authProvider}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
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
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
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

```tsx hideCode live url=http://localhost:3000/register previewHeight=600px
setInitialRoutes(["/register"]);

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import {
  AuthPage,
  ThemedLayout,
  RefineThemes,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            authProvider={authProvider}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
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
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
              </Route>
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
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

The `forgotPassword` type is a page that allows users to reset their passwords.

```tsx hideCode live url=http://localhost:3000/forgot-password previewHeight=600px
setInitialRoutes(["/forgot-password"]);

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import {
  AuthPage,
  ThemedLayout,
  RefineThemes,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            authProvider={authProvider}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
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
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
                {/* highlight-next-line */}
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
              </Route>
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
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
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // --
  forgotPassword: async ({ email }) => {
    // You can handle the reset password process according to your needs.

    // If process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Forgot Password Error",
        message: "Invalid email or password",
      },
    };
  },
  // --
};
```

### UpdatePassword

The `updatePassword` type is the page used to update the password of the user.

```tsx hideCode live url=http://localhost:3000/update-password previewHeight=600px
setInitialRoutes(["/update-password"]);

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import {
  AuthPage,
  ThemedLayout,
  RefineThemes,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            authProvider={authProvider}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
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
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
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
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
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
        name: "Update Password Error",
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

`providers` property defines the list of providers used to handle login authentication. `providers` accepts an array of `Provider` type. Check out the [Interface](#interface) section for more information. This property is only available for types `login` and `register`.

```tsx
const MyLoginPage = () => {
  return (
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
  );
};
```

### rememberMe

`rememberMe` property defines to render your own remember me component or you can pass `false` to don't render it. This property is only available for type `login`.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
      rememberMe={
        <FormControlLabel
          sx={{
            span: {
              fontSize: "12px",
              color: "text.secondary",
            },
          }}
          color="secondary"
          control={<Checkbox size="small" id="rememberMe" />}
          label="Remember me"
        />
      }
    />
  );
};
```

### loginLink

`loginLink` property defines the link to the login page and also you can give a node to render. The default value is `"/login"`. This property is only available for types `register` and `forgotPassword`.

```tsx
const MyRegisterPage = () => {
  return (
    <AuthPage
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
```

### registerLink

`registerLink` property defines the link to the registration page and also you can give a node to render. The default value is `"/register"`. This property is only available for type `login`.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
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

`forgotPasswordLink` property defines the link to the forgot password page and also you can give a node for it to render. The default value is `"/forgot-password"`. This property is only available for type `login`.

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
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
```

### wrapperProps

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx
const MyLoginPage = () => {
  return (
    <AuthPage
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

`contentProps` uses for passing props to the content component which is the card component. In the example below you can see that the title, header, and content styles are changed with `contentProps`.

```tsx
const MyLoginPage = () => {
  return (
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
  );
};
```

### formProps

`formProps` uses for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onSubmit` function is changed.

```tsx
const MyLoginPage = () => {
  return (
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
  );
};
```

### title

By default, `AuthPage` uses text with icon on top of page. You can use this property to change the default title.

- Default text is: Refine Project
- Default icon is: Refine Logo

```tsx
import { AuthPage } from "@refinedev/mui";
const MyLoginPage = () => {
  return <AuthPage type="login" title={<h1>My Title</h1>} />;
};
```

Or you can customize the title with `ThemedTitle` component.

```tsx
import { AuthPage, ThemedTitle } from "@refinedev/antd";
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitle
          title="My Title"
          icon={<img src="https://refine.dev/img/logo.png" />}
        />
      }
    />
  );
};
```

### renderContent

`renderContent` uses to render the form content and [title](#title). You can use this property to render your own content or `renderContent` gives you default content and title you can use to add some extra elements to the content.

```tsx
import { AuthPage } from "@refinedev/mui";

const MyLoginPage = () => {
  return (
    <AuthPage
      contentProps={{
        style: {
          width: "400px",
        },
      }}
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
    />
  );
};
```

### mutationVariables

`mutationVariables` is used to pass additional variables to the `authProvider` methods.

```tsx
import { AuthPage } from "@refinedev/mui";

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

## API Reference

### Properties

<PropsTable module="@refinedev/mui/AuthPage"
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
rememberMe-default="[`<Checkbox>Remember me</Checkbox>`](/core/docs/ui-integrations/material-ui/components/auth-page#rememberme)"
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
import { UseFormProps } from "@refinedev/react-hook-form";

interface FormPropsType extends UseFormProps {
  onSubmit?: (values: any) => void;
}
```

[auth-provider]: /core/docs/authentication/auth-provider
[login]: /core/docs/authentication/auth-provider#login-
[register]: /core/docs/authentication/auth-provider#register
[forgot-password]: /core/docs/authentication/auth-provider#forgotpassword
[update-password]: /core/docs/authentication/auth-provider#updatepassword
