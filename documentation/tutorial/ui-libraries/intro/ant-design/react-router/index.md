---
title: Introduction
---

import { Sandpack, AddAntDesignToApp, AddLayoutToApp } from "./sandpack.tsx";

<Sandpack>

In the previous unit, we learned about the router integrations of Refine. Now, we'll dive into its UI integrations, layouts, CRUD view components, and hooks to build a CRUD application with Refine and Ant Design.

Refine provides integrations for the popular UI libraries including [Ant Design](/core/docs/ui-integrations/ant-design/introduction), [Material UI](/core/docs/ui-integrations/material-ui/introduction), [Chakra UI](/core/docs/ui-integrations/chakra-ui/introduction) and [Mantine](/core/docs/ui-integrations/mantine/introduction), offering set of components and hooks that simplify using Refine for form and table management, layouts, views, buttons, and more.

This unit will cover the following topics:

- Using layout components to add menus, headers, breadcrumbs and authentication management to your app,
- Using CRUD view components to create action pages with consistent design and common features,
- Using hooks to integrate form elements and tables with Refine's `useTable` and `useForm` hooks,
- Integrating Refine's notifications with Ant Design's notification system,
- Using `<AuthPage />` components to easily manage authentication pages.

## Adding Ant Design Dependencies

Let's get started with adding our dependencies. To use Ant Design components and access Refine's integrated hooks and components, we need to install the `@refinedev/antd package`.

<InstallPackagesCommand args="antd @refinedev/antd"/>

We'll wrap our app with Ant Design's `ConfigProvider` to set the theme and `App` component to use the theme properly. We'll also import a `reset.css` file to reset the default styles of the browser.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-start
// We'll wrap our app with Ant Design's ConfigProvider to set the theme and App component to use the theme properly.
import { ConfigProvider, App as AntdApp } from "antd";
// highlight-end

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

// highlight-start
// We're importing a reset.css file to reset the default styles of the browser.
import "antd/dist/reset.css";
// highlight-end

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      {/* highlight-start */}
      <ConfigProvider>
        <AntdApp>
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
        </AntdApp>
      </ConfigProvider>
      {/* highlight-end */}
    </BrowserRouter>
  );
}
```

<AddAntDesignToApp />

With our dependencies now in place, let's proceed by adding a layout into our app.

## Adding a Layout

Refine provides a [`<ThemedLayout />`](/core/docs/ui-integrations/ant-design/components/themed-layout) component has out of the box features, which we'll delve into in the next step. Now to see it in action, let's wrap our authenticated routes with it.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
// highlight-next-line
import { ThemedLayout } from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

import "antd/dist/reset.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
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
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

<AddLayoutToApp />

Now our app is wrapped with a nice layout including a sidebar and a header.

In the next step, we'll learn about the features of the layout components and how to use them.

</Sandpack>
