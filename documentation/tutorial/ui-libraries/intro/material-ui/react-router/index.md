---
title: Introduction
---

import { Sandpack, AddMaterialUIToApp, AddLayoutToApp } from "./sandpack.tsx";

<Sandpack>

In the previous unit, we learned about the router integrations of Refine. Now, we'll dive into its UI integrations, layouts, CRUD view components, and hooks to build a CRUD application with Refine and Material UI.

Refine provides integrations for the popular UI libraries including [Material UI](/core/docs/ui-integrations/material-ui/introduction), [Ant Design](/core/docs/ui-integrations/ant-design/introduction), [Chakra UI](/core/docs/ui-integrations/chakra-ui/introduction) and [Mantine](/core/docs/ui-integrations/mantine/introduction), offering set of components and hooks that simplify using Refine for form and table management, layouts, views, buttons, and more.

This unit will cover the following topics:

- Using layout components to add menus, headers, breadcrumbs and authentication management to your app,
- Using CRUD view components to create action pages with consistent design and common features,
- Using hooks to integrate form elements and tables with Refine's `useTable` and `useForm` hooks,
- Integrating Refine's notifications with Material UI's notification system using `notistack`,
- Using `<AuthPage />` components to easily manage authentication pages.

:::note

Material UI comes with form elements but doesn't offer a way to manage form state. In this tutorial, we'll use Refine's React Hook Form integration [`@refinedev/react-hook-form`](/core/docs/packages/react-hook-form/introduction) to manage form state. This package is an extension on top of Refine's `useForm` hook. Installation of this package will be done in the next steps when we're refactoring the form components.

:::

## Adding Material UI Dependencies

Let's get started with adding our dependencies. To use Material UI components and access Refine's integrated hooks and components, we need to install the `@refinedev/mui` package.

<InstallPackagesCommand args="@refinedev/mui @emotion/react @emotion/styled @mui/lab @mui/material @mui/x-data-grid" />

We'll wrap our app with Material UI's `<ThemeProvider />` to set the theme and mount `<CssBaseline />` and `<GlobalStyles />` components to reset the default styles of the browser.

`<ThemeProvider />` component requires a `theme` prop to be passed. We'll use the predefined themes provided by Refine with many color options and a dark mode.

:::tip

Refine provides carefully crafted themes for its UI integrations. You can use them to fasten your development process and have a consistent design across your app.

:::

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { RefineThemes } from "@refinedev/mui";

// highlight-start
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
// highlight-end

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      {/* highlight-start */}
      {/* We're using Refine's Blue theme here. You can use other variants or create your own theme without constraints. */}
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        {/* highlight-end */}
        <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "protected-products",
              list: "/products",
              show: "/products/:id",
              edit: "/products/:id/edit",
              create: "/products/create",
              meta: { label: "Products" },
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  redirectOnFail="/login"
                >
                  <Header />
                  <Outlet />
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="protected-products" />}
              />
              <Route path="/products">
                <Route index element={<ListProducts />} />
                <Route path=":id" element={<ShowProduct />} />
                <Route path=":id/edit" element={<EditProduct />} />
                <Route path="create" element={<CreateProduct />} />
              </Route>
            </Route>
            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="protected-products" />
                </Authenticated>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Refine>
        {/* highlight-start */}
      </ThemeProvider>
      {/* highlight-end */}
    </BrowserRouter>
  );
}
```

<AddMaterialUIToApp />

With our dependencies now in place, let's proceed by adding a layout into our app.

## Adding a Layout

Refine provides a [`<ThemedLayout />`](/core/docs/ui-integrations/material-ui/components/themed-layout) component has out of the box features, which we'll delve into in the next step. Now to see it in action, let's wrap our authenticated routes with it.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { RefineThemes, ThemedLayout } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "protected-products",
              list: "/products",
              show: "/products/:id",
              edit: "/products/:id/edit",
              create: "/products/create",
              meta: { label: "Products" },
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  redirectOnFail="/login"
                >
                  {/* highlight-start */}
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                  {/* highlight-end */}
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="protected-products" />}
              />
              <Route path="/products">
                <Route index element={<ListProducts />} />
                <Route path=":id" element={<ShowProduct />} />
                <Route path=":id/edit" element={<EditProduct />} />
                <Route path="create" element={<CreateProduct />} />
              </Route>
            </Route>
            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="protected-products" />
                </Authenticated>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

<AddLayoutToApp />

Now our app is wrapped with a nice layout including a sidebar and a header.

In the next step, we'll learn about the features of the layout components and how to use them.

</Sandpack>
