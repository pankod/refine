---
title: Authentication
---

import { Sandpack, AddAuthenticationToApp } from "./sandpack.tsx";

<Sandpack>

Before starting to add our resources and their respective routes, we'll be moving our authentication logic to work with routing. To achieve this, we'll use the `<Authenticated />` and `<NavigateToResource />` components to redirect users to our products list page.

## `<Authenticated />` and Routing

In the previous unit, we've implemented our authentication system and protected our content from unauthenticated users by using the `<Authenticated />` component.

We've used the `children` and `fallback` props of the `<Authenticated />` component to render our content or the fallback component based on the authentication status.

Now we'll be leveraging these props to handle which routes to render based on the authentication status and handle redirects for the opposite cases.

The `<Authenticated />` component works seamlessly with the router provider when we omit the `fallback` prop and use `redirectOnFail` prop. In this case, it will redirect the user to the login page if they are not authenticated.

```tsx
import { Authenticated } from "@refinedev/core";

const MyRoute = () => {
  // If the user is not authenticated, they will be redirected to the `/login` route.
  return (
    <Authenticated key="my-routes" redirectOnFail="/login">
      <div>Authenticated</div>
    </Authenticated>
  );
};
```

## Wrapping Routes with `<Authenticated />`

Now we'll be updating our `src/App.tsx` with a wrapper route that handles the authentication and mount our `<ListProducts />` component if the user is authenticated. If the user is not authenticated, they will be redirected to the `/login` route.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
// highlight-next-line
import routerProvider from "@refinedev/react-router";

// highlight-start
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
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
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
      >
        {/* highlight-start */}
        <Routes>
          <Route
            element={
              // We're wrapping our routes with the `<Authenticated />` component
              // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
              // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            <Route index element={<ListProducts />} />
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        {/* highlight-end */}
      </Refine>
    </BrowserRouter>
  );
}
```

<AddAuthenticationToApp />

Now we've updated our routes to handle authentication, redirect to the appropriate routes depending on the authentication status and redirect to the `/` route from the index route.

In the next step, we'll be learning about how to define routes and inform Refine about the related routes per resource.

</Sandpack>
