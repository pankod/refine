---
title: Defining Resources
---

import { Sandpack, AddRoutesToApp, AddResourcesToApp } from "./sandpack.tsx";

<Sandpack>

So far, we've integrated the authentication logic into our routes. In this step, we'll be creating routes for these components and define our resources to inform Refine about their corresponding routes.

To learn more about it, please refer to the [Resource Concept](/core/docs/guides-concepts/general-concepts/#resource-concept) section in the General Concepts guide.

## Creating Routes

We've wrapped our routes with the [`<Authenticated />`](/core/docs/authentication/components/authenticated) component in the previous step. Now we'll be creating routes under the `/products` path to place our components.
We'll use the following routes to place our components:

- `/products` - `<ListProducts />`
- `/products/:id` - `<ShowProduct />`
- `/products/:id/edit` - `<EditProduct />`
- `/products/create` - `<CreateProduct />`

We'll also be defining an index route at `/` and redirecting it to `/products` using the `<Navigate />` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

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
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
      >
        <Routes>
          <Route
            element={
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            {/* highlight-start */}
            <Route index element={<Navigate to="/products" />} />
            <Route path="/products">
              <Route index element={<ListProducts />} />
              <Route path=":id" element={<ShowProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
            {/* highlight-end */}
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* highlight-start */}
                <Navigate to="/products" />
                {/* highlight-end */}
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
```

<AddRoutesToApp />

## Defining Resources

Now we've created our routes, it's time to define our resources. This will allow Refine to know about our resources and treat them accordingly.

While defining the resources and assigning appropriate routes to actions is optional, it's highly recommended to do so in order to take advantage of Refine's provided features below.

By defining our resources, we'll be unlocking the following features:

- Inferring the related parameters from the routes without the need to pass them explicitly.
- Handling redirections automatically and handling navigations between these routes easily.
- Easily creating menus and breadcrumbs for our resources.
- Ability to pass `meta` values to every data hook per resource from a single place.
- Easily managing features like access control, i18n, and more.

We'll be using the [`resources`](/core/docs/core/refine-component/#resources) prop of the `<Refine />` component to define our resources.

A resource definition consists of the following properties:

- `name`: The name of the resource. This will be passed to the data provider's methods to identify the resource.
- `identifier`: An optional identifier for the resource. If not provided, `name` will be used as the identifier. This is useful when you want to use the same resource for the data provider but have a different configuration on Refine's side.
- `list`, `create`, `edit` and `show`: These properties are used to define the routes for the corresponding actions. They will be the string values of the routes we've created in the previous step.
- `meta`: An optional object to pass meta values per resource. This is widely used in Refine's hooks and components for various purposes from data fetching, access control, i18n to UI customization.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

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
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        // highlight-start
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
        // highlight-end
      >
        <Routes>
          <Route
            element={
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            <Route
              index
              // highlight-start
              // We're also replacing the <Navigate /> component with the <NavigateToResource /> component.
              // It's tailored version of the <Navigate /> component that will redirect to the resource's list route.
              element={<NavigateToResource resource="protected-products" />}
              // highlight-end
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
                {/* highlight-start */}
                {/* We're also replacing the <Navigate /> component with the <NavigateToResource /> component. */}
                {/* It's tailored version of the <Navigate /> component that will redirect to the resource's list route. */}
                <NavigateToResource resource="protected-products" />
                {/* highlight-end */}
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
```

<AddResourcesToApp />

Now we've defined our routes and resources, we're ready to start refactoring our components to benefit from the features provided by Refine.

In the next step, we'll be learning about the navigation helpers of Refine and how to use them.

</Sandpack>
