---
title: "React Router Guide | SSR in Refine v5"
display_title: "React Router"
sidebar_label: "React Router"
description: "Implement React Router in Refine v5. Learn the key steps. Learn SSR, navigation for real-world React admin panels. Explore with code snippets."
---

Refine provides router bindings and utilities for [React Router](https://reactrouter.com/). It is built on top of the `react-router` package. This package will provide easy integration between Refine and **react-router** for both existing projects and new projects.

<InstallPackagesCommand args="@refinedev/react-router react-router"/>

We recommend using `create refine-app` to initialize your Refine projects. It gives you a good boilerplate to start with using React Router.

<CreateRefineAppCommand args="-p refine-react my-refine-app" />

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

## Usage

`@refinedev/react-router` is not restricting you to use the router in a specific way and it is up to you to decide how you want to use it.

You can define your routes the way you want, then pass the `routerProvider` prop to the `Refine` component and use the `resources` prop to define the resources and their action paths. From basic to advanced use cases and enterprise applications, you will have full control over your routes. In our examples, we've used this approach to demonstrate the flexibility of the router provider and the route handling process.

### Basic Usage

We'll pass the `routerProvider` prop to the `Refine` component to instruct Refine on how to communicate with the router. We'll also define our resources and their action paths, this will inform Refine to use these paths when generating the breadcrumbs, menus, handling redirections and inferring the current resource and action.

<Tabs
defaultValue="browser-router"
values={[
{label: 'Using <BrowserRouter>', value: 'browser-router'},
{label: 'Using <RouterProvider>', value: 'router-provider'},
]}>
<TabItem value="browser-router">

This example uses the [`<BrowserRouter>`](https://reactrouter.com/en/main/router-components/browser-router) router component.

```tsx title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
// highlight-start
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";
// highlight-end

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        // highlight-next-line
        routerProvider={routerProvider}
        resources={[
          {
            name: "posts",
            // highlight-start
            list: "/posts",
            create: "/posts/create",
            // highlight-end
          },
          {
            name: "categories",
            // highlight-start
            list: "/categories",
            show: "/categories/show/:id",
            // highlight-end
          },
        ]}
      >
        <Routes>
          {/* highlight-start */}
          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path="create" element={<PostCreate />} />
          </Route>
          <Route path="categories">
            <Route index element={<CategoryList />} />
            <Route path="show/:id" element={<CategoryShow />} />
          </Route>
          {/* highlight-end */}
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

</TabItem>
<TabItem value="router-provider">

In their v6.4, React Router introduced Data APIs Router. It uses [`<RouterProvider>`](https://reactrouter.com/en/main/routers/router-provider) component coupled with a [`createBrowserRouter()`](https://reactrouter.com/en/main/routers/create-browser-router) function that live outside the DOM.

The example below start from the `<BrowserRouter>` example and follow their [migration guide](https://reactrouter.com/en/main/upgrading/v6-data) to the `<RouterProvider>` component.

:::caution Use cases

While the basic usage of routing works out of the box, more advanced use cases of the Data APIs are not tested.

You are welcome to [contribute][contributing] to help test and support the advanced use cases of the Data APIs.

:::

```tsx title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

const router = createBrowserRouter([
  {
    Component: RefineProvider,
    children: [
      // highlight-start
      {
        path: "posts",
        children: [
          { index: true, Component: PostList },
          { path: "create", Component: PostCreate },
        ],
      },
      {
        path: "categories",
        children: [
          { index: true, Component: CategoryList },
          { path: "show/:id", Component: CategoryShow },
        ],
      },
      // highlight-end
    ],
  },
]);

const App = () => {
  /* highlight-next-line */
  return <RouterProvider router={router} />;
};

const RefineProvider = () => {
  return (
    <Refine
      dataProvider={dataProvider}
      // highlight-next-line
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          // highlight-start
          list: "/posts",
          create: "/posts/create",
          // highlight-end
        },
        {
          name: "categories",
          // highlight-start
          list: "/categories",
          show: "/categories/show/:id",
          // highlight-end
        },
      ]}
    >
      <Outlet />
    </Refine>
  );
};
```

</TabItem>
</Tabs>

### Usage with Authentication

When handling authenticated routes, we can use [`<Authenticated>`](/core/docs/authentication/components/authenticated/) to check if the user is authenticated or not. Internally, it uses the `useIsAuthenticated` hook and handles the redirection or showing the appropriate elements based on the authentication status by the `children` and `fallback` props.

Additionally, we'll use the [`<Outlet>`](https://reactrouter.com/en/main/components/outlet) component from `react-router` to render our routes inside the `<Authenticated>` component. This will allow us to create protected routes and render the routes only when the user is authenticated.

We will also need to create a `/login` route to handle the redirection when the user is not authenticated. We can use the `AuthPage` components from Refine's UI packages with `type="login"` prop to render the login page.

```tsx title=App.tsx
// highlight-next-line
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
// highlight-next-line
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { authProvider } from "src/authProvider";

// highlight-next-line
import { AuthPage } from "@refinedev/antd";

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        routerProvider={routerProvider}
        // highlight-next-line
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
          },
          {
            name: "categories",
            list: "/categories",
            show: "/categories/show/:id",
          },
        ]}
      >
        <Routes>
          <Route
            // highlight-start
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
            // highlight-end
          >
            {/* highlight-next-line */}
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>
          <Route
            // highlight-start
            element={
              <Authenticated redirectOnFail="/login">
                <Outlet />
              </Authenticated>
            }
            // highlight-end
          >
            <Route path="posts">
              <Route index element={<PostList />} />
              <Route path="create" element={<PostCreate />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path="show/:id" element={<CategoryShow />} />
            </Route>
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

Notice that we've used the `fallback` property to render the `<Outlet>` component inside the wrapper `Route` of the `/login` page. This allows us to render the login page when the user is not authenticated and redirect the user to the `/posts` page when the user is authenticated.

We've also used the `<Outlet>` component inside the children of the `<Authenticated>` component in the wrapper `Route` of the resource routes. This will allow us to render the resource routes only when the user is authenticated and redirect the user to the `/login` page when the user is not authenticated.

### Usage with Layouts

When using layouts in your application, you can use the same approach as the authentication example. We'll use the [`<ThemedLayout>`](/core/docs/advanced-tutorials/custom-layout/#layout) component to wrap our routes and the [`<Outlet>`](https://reactrouter.com/en/main/components/outlet) component from `react-router` to render our routes inside the `<ThemedLayout>` component. This will allow us to define the common layout for our routes.

In the below example, we'll wrap our resource routes with the `Layout` component from `@refinedev/antd` and render the routes inside the `<Outlet>` component.

```tsx title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "src/authProvider";

// highlight-next-line
import { AuthPage, ThemedLayout } from "@refinedev/antd";

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        routerProvider={routerProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
          },
          {
            name: "categories",
            list: "/categories",
            show: "/categories/show/:id",
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>
          <Route
            element={
              <Authenticated redirectOnFail="/login">
                {/* highlight-start */}
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
                {/* highlight-end */}
              </Authenticated>
            }
          >
            <Route path="posts">
              <Route index element={<PostList />} />
              <Route path="create" element={<PostCreate />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path="show/:id" element={<CategoryShow />} />
            </Route>
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

Notice that we've wrapped the `<Outlet>` with `<ThemedLayout>` component. This way, we don't need to define the layout for each route and wrap the each route inside it with the `<ThemedLayout>` component.

### Usage with Access Control providers

If you want to protect your routes with [Access Control Provider](/core/docs/authorization/access-control-provider/), all you have to do is to wrap `Outlet` with `CanAccess` component.

`CanAccess` component will infer resource name and action based on the current route and handle the **access control** from your Access Control Provider for you.

```tsx title=App.tsx
// highlight-next-line
import { Refine, Authenticated, CanAccess } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "src/authProvider";

import { AuthPage, ThemedLayout } from "@refinedev/antd";

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        routerProvider={routerProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
          },
          {
            name: "categories",
            list: "/categories",
            show: "/categories/show/:id",
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>
          <Route
            element={
              <Authenticated redirectOnFail="/login">
                <ThemedLayout>
                  {/* highlight-start */}
                  <CanAccess fallback={<div>Unauthorized!</div>}>
                    <Outlet />
                  </CanAccess>
                  {/* highlight-end */}
                </ThemedLayout>
              </Authenticated>
            }
          >
            <Route path="posts">
              <Route index element={<PostList />} />
              <Route path="create" element={<PostCreate />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path="show/:id" element={<CategoryShow />} />
            </Route>
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

If you don't want to wrap your whole application with `CanAccess`, it's also possible to wrap certain routes individually.

```tsx title=App.tsx
<Routes>
  <Route
    element={
      <Authenticated fallback={<Outlet />}>
        <NavigateToResource resource="posts" />
      </Authenticated>
    }
  >
    <Route path="/login" element={<AuthPage type="login" />} />
  </Route>
  <Route
    element={
      <Authenticated redirectOnFail="/login">
        <ThemedLayout>
          <Outlet />
        </ThemedLayout>
      </Authenticated>
    }
  >
    <Route path="posts">
      <Route index element={<PostList />} />
      <Route
        path="create"
        element={
          // highlight-start
          <CanAccess fallback={<div>Unauthorized!</div>}>
            <PostCreate />
          </CanAccess>
          // highlight-end
        }
      />
    </Route>
    <Route path="categories">
      <Route index element={<CategoryList />} />
      <Route path="show/:id" element={<CategoryShow />} />
    </Route>
  </Route>
</Routes>
```

### Usage with an Error Page

You may also want to render an error page when the user tries to access a route that doesn't exist. To do this, we'll define a `*` route that will render the error page when there's no other route that matches the current path.

We'll place this inside the authenticated routes so that the unauthorized users will be redirected to the login page when they try to access a route that doesn't exist.

```tsx title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "src/authProvider";

// highlight-next-line
import { AuthPage, ThemedLayout, ErrorComponent } from "@refinedev/antd";

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        routerProvider={routerProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
          },
          {
            name: "categories",
            list: "/categories",
            show: "/categories/show/:id",
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>
          <Route
            element={
              <Authenticated redirectOnFail="/login">
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              </Authenticated>
            }
          >
            <Route path="posts">
              <Route index element={<PostList />} />
              <Route path="create" element={<PostCreate />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path="show/:id" element={<CategoryShow />} />
            </Route>
            {/* highlight-next-line */}
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

### Usage with a Root Route

You may notice that we didn't define an index route for our application yet. We can defina a root route that will redirect the user to the `posts` resource when they visit the root of our application.

We can achieve this by using the [`<NavigateToResource>`](#navigatetoresource) component. This component will redirect the user to the `list` page of the given resource.

We also want this route to be rendered only when the user is authenticated. We can achieve this by placing our `Route` inside the authenticated routes.

```tsx title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
// highlight-next-line
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "src/authProvider";

import { AuthPage, ThemedLayout, ErrorComponent } from "@refinedev/antd";

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        routerProvider={routerProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
          },
          {
            name: "categories",
            list: "/categories",
            show: "/categories/show/:id",
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Authenticated fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>
          <Route
            element={
              <Authenticated redirectOnFail="/login">
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              </Authenticated>
            }
          >
            {/* highlight-next-line */}
            <Route index element={<NavigateToResource resource="posts" />} />
            <Route path="posts">
              <Route index element={<PostList />} />
              <Route path="create" element={<PostCreate />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path="show/:id" element={<CategoryShow />} />
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

Refine supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

## Additional Components

`@refinedev/react-router` package also includes some additional components that can be useful in some cases.

### NavigateToResource

A basic component that extends the `Navigate` component from **react-router** to navigate to a resource page. It is useful when you want to navigate to a resource page at the index route of your app.

```tsx

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                /* ... */
                resources={[
                    {
                        name: "posts"
                        list: "/posts",
                    },
                ]}
            >
                <Routes>
                    {/* highlight-next-line */}
                    <Route path="/" element={<NavigateToResource resource="posts" />} />
                    <Route path="/posts" element={<PostList />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    )
}

```

#### Properties

`resource` (optional) - The name of the resource to navigate to. It will redirect to the first `list` route in the `resources` array if not provided.

`fallbackTo` (optional) - The path to navigate to if no resource is found. If not provided and no resource is found, no navigation will be made.

`meta` (optional) - The meta object to use if the route has parameters in it. The parameters in the current location will also be used to compose the route but `meta` will take precedence.

### UnsavedChangesNotifier

This component enables the `warnWhenUnsavedChanges` feature of Refine. It will show a warning message when user tries to navigate away from the current page without saving the changes. Also checks for `beforeunload` event to warn the user when they try to close the browser tab or window.

Place this component inside the `<Refine>` components children to enable this feature.

```tsx
const App = () => {
  return (
    <BrowserRouter>
      <Refine
        /* ... */
        options={{
          /* ... */
          warnWhenUnsavedChanges: true,
        }}
      >
        {/* ... */}
        {/* highlight-next-line */}
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};
```

#### Properties

`translationKey` (optional) - The translation key for the warning message. Default value is `warnWhenUnsavedChanges`. Useful when you use an i18n provider.

`message` (optional) - The warning message. Default value is `Are you sure you want to leave? You have unsaved changes.` Useful when you don't use an i18n provider.

### CatchAllNavigate

It will redirect to the given path and keep the current location in `to` query parameter to redirect back when needed. In some cases you may not want to use the `<Authenticated>` component's `redirectOnFail` prop to redirect and have a catch-all route to redirect to the desired page. This is useful when handling the 404 pages with authentication.

```tsx
import { Refine } from "@refinedev/core";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router";
import { AuthPage } from "@refinedev/antd";

import { BrowserRouter, Routes, Route } from "react-router";

import authProvider from "src/authProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
        ]}
      >
        <Routes>
          <Route path="/login" element={<AuthPage type="login" />} />
          {/* ... */}
          {/* highlight-next-line */}
          <Route path="*" element={<CatchAllNavigate to="/login" />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

#### Properties

`to` (required) - The path to redirect to.

### DocumentTitleHandler

This component will generate the document title for the current page.By default, it follows a set of predefined rules to generate titles based on the provided props. However, it also offers the flexibility to customize the title generation process by providing a custom `handler` function.
The default title generation rules are as follows:

- list : `Posts | Refine`
- edit : `#{id} Edit Post | Refine`
- show : `#{id} Show Post | Refine`
- create : `Create new Post | Refine`
- clone : `#{id} Clone Post | Refine`
- default : `Refine`

```tsx
const App = () => {
  return (
    <BrowserRouter>
      <Refine
      /* ... */
      >
        {/* ... */}
        {/* highlight-next-line */}
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
};
```

#### Properties

`handler` (optional) - The function that will get invoked in every location change. It will receive an object with the following properties:

- `pathname`: The current URL pathname.
- `resource`: The resource being displayed (e.g., "posts").
- `action`: The action being performed (e.g., "edit", "show", "create").
- `autoGeneratedTitle`: The default auto-generated title based on the predefined rules.
- `params`: An object containing URL parameters, including the `id` parameter if present.

Inside the handler function, you can dynamically generate the document title based on the provided properties and any additional logic required. The function should return the generated title.

```tsx
const customTitleHandler = ({ resource, action, params }) => {
  let title = "Custom default"; // Default title

  if (resource && action) {
    title = `${resource} ${action} ${params.id}`;
  }

  return title;
};

// Usage
<DocumentTitleHandler handler={customTitleHandler} />;
```

## Hooks

### useDocumentTitle

This hook allows you to set the document title for the current page. It can be used in any component that is a child of the `<Refine>` component.

```tsx
import { useDocumentTitle } from "@refinedev/react-router";

const PostList = () => {
  // highlight-next-line
  useDocumentTitle("Posts | Refine");

  return <List>{/* ... */}</List>;
};
```

This hook can take an object as an argument with `i18nKey`. This key will be used to translate the title using the i18n provider.

```tsx
import { useDocumentTitle } from "@refinedev/react-router";

const PostList = () => {
  // highlight-next-line
  useDocumentTitle({ i18nKey: "documentTitle.posts.list" });

  return <List>{/* ... */}</List>;
};
```

This hook also returns a function that can be used to set the document title dynamically.

```tsx
import { useDocumentTitle } from "@refinedev/react-router";

const PostList = () => {
  const setTitle = useDocumentTitle();

  useEffect(() => {
    setTitle("Posts | Refine");
  }, []);

  return <List>{/* ... */}</List>;
};
```

## FAQ

### How to handle optional authentication, redirects and layouts with authentication?

In the below example, you'll find different cases for route definitions, we've used `Authenticated` component to handle authentication and redirects. You can always choose to use a different approach, Refine will allow you to handle the routes however you like.

For optional authentication, in our `authProvider` implementation's `check` method, we can pass `authentication: false` and `redirectTo: undefined` to indicate that the current user is not authenticated but we don't want to redirect them to the login page. This is useful, when some pages in our app are public and don't require authentication and some pages are private and require authentication.

```tsx title=authProvider.ts
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  check: async () => {
    const isAuthenticated = await yourMethodToCheckIfUserIsAuthenticated();

    return {
      // highlight-next-line
      authentication: isAuthenticated,
      // notice that we omit the `redirectTo` property
    };
  },
  // ...
};
```

In our `App.tsx`, while defining the routes, we'll leverage the `Outlet` component from `react-router` and `Authenticated` component from `@refinedev/core`.

**Initialization of `<Refine>` component**

Let's start with initializing our `<Refine>` component with inside `<BrowserRouter>` component. We'll pass our `dataProvider` `routerProvider` and `authProvider` to the `<Refine>` component. We'll also pass our `resources` and define our action paths for each resource in `<Refine>` component.

```tsx title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes } from "react-router";

import { authProvider } from "src/authProvider";

export const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        routerProvider={routerProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
          },
        ]}
      >
        {/* ... */}
      </Refine>
    </BrowserRouter>
  );
};
```

**Defining routes**

Then, let's start adding our routes. We'll start with the `LandingPage` component at the `/` path. This will be visible for both authenticated and unauthenticated users. We need to wrap our `Route` elements with a `Routes` component.

```diff title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

+ import { BrowserRouter, Routes, Route } from "react-router";

import { authProvider } from "src/authProvider";

+ import { LandingPage } from "pages/landing";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
+               <Routes>
+                   <Route index element={<LandingPage />} />
+               </Routes>
            </Refine>
        </BrowserRouter>
    )
}
```

**Defining authenticated routes**

Now, let's create our resource actions. They will be wrapped with the `Layout` component and only visible for authenticated users. We'll use the `Authenticated` component to handle authentication and redirects. We'll also use the `Outlet` component to properly wrap and handle the authenticated routes.

```diff title=App.tsx
+ import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

+ import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "src/authProvider";

import { LandingPage } from "pages/landing";
+ import { PostList, PostCreate } from "pages/posts";

+ import { Layout } from "components/layout";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
                <Routes>
                    <Route index element={<LandingPage />} />
+                   <Route
+                       element={(
+                           <Authenticated redirectOnFail="/login">
+                               <Layout>
+                                   <Outlet />
+                               </Layout>
+                           </Authenticated>
+                       )}
+                   >
+                       <Route path="posts">
+                           <Route index element={<PostList />} />
+                           <Route path="create" element={<PostCreate />} />
+                       </Route>
+                   </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    )
}
```

Now, when we navigate to the `/posts` page we should either see the `PostList` component or be redirected to the `/login` page. If we're already authenticated, we should see the `PostList` component.

**Defining auth pages**

We can now add our `/login` and `/register` pages. We'll use the `AuthPage` component for both pages. We'll also navigate to the `/posts` page if the user is already authenticated.

```diff title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
+ import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "src/authProvider";

import { LandingPage } from "pages/landing";
import { PostList, PostCreate } from "pages/posts";
+ import { AuthPage } from "pages/auth";

import { Layout } from "components/layout";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route
                        element={(
                            <Authenticated redirectOnFail="/login">
                                <Layout>
                                    <Outlet />
                                </Layout>
                            </Authenticated>
                        )}
                    >
                        <Route path="posts">
                            <Route index element={<PostList />} />
                            <Route path="create" element={<PostCreate />} />
                        </Route>
                    </Route>
+                   <Route
+                       element={(
+                           <Authenticated fallback={<Outlet />}>
+                               <NavigateToResource resource="posts" />
+                           </Authenticated>
+                       )}
+                   >
+                       <Route path="/login" element={<AuthPage type="login" />} />
+                       <Route path="/register" element={<AuthPage type="register" />} />
+                   </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    )
}
```

Now, when we navigate to the `/login` or `/register` pages, we should either see the `AuthPage` component or be redirected to the `/posts` page. If we're already authenticated, we should be redirected to the `/posts` page.

**Defining error page**

Finally, we'll add our `ErrorComponent` component to show when user navigates to a non-existing page.

```diff title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "src/authProvider";

+ import { ErrorComponent } from "components/error";
import { LandingPage } from "pages/landing";
import { PostList, PostCreate } from "pages/posts";
import { AuthPage } from "pages/auth";

import { Layout } from "components/layout";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route
                        element={(
                            <Authenticated redirectOnFail="/login">
                                <Layout>
                                    <Outlet />
                                </Layout>
                            </Authenticated>
                        )}
                    >
                        <Route path="posts">
                            <Route index element={<PostList />} />
                            <Route path="create" element={<PostCreate />} />
                        </Route>
                    </Route>
                    <Route
                        element={(
                            <Authenticated fallback={<Outlet />}>
                                <NavigateToResource resource="posts" />
                            </Authenticated>
                        )}
                    >
                        <Route path="/login" element={<AuthPage type="login" />} />
                        <Route path="/register" element={<AuthPage type="register" />} />
                    </Route>
+                   <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};
```

**Result**

We've now added our `AuthPage` and `ErrorComponent` components to our app. We've also used the `Authenticated` component to our routes to redirect the users to the `/login` page if they're not authenticated. The index page is available for all users because we didn't wrap it with the `Authenticated` component.

### Handling 404s

In the earlier versions of Refine, if `authProvider` was defined, we've redirected the users to the `/login` route even with the 404s and 404 pages were only available to the authenticated users. Now, the routes are handled by the users, so you can handle the 404s however you like.

#### 404 Pages for both authenticated and not authenticated users

Here's an example for rendering the `ErrorComponent` for undefined routes for both authenticated and not authenticated users.

Let's start with defining the `Refine` component.

```tsx title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "providers/authProvider";

import { ErrorPage } from "pages/error";
import { AuthPage } from "pages/auth";
import { PostList, CategoryList } from "pages/posts";
import { Layout } from "components/Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
          {
            name: "categories",
            list: "/categories",
          },
        ]}
      >
        <Routes>{/* ... */}</Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

Now, we can add the routes with authentication control. We should place them inside the `Routes` component.

```tsx
<Route
  element={
    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
      <Layout>
        <Outlet />
      </Layout>
    </Authenticated>
  }
>
  <Route path="/posts" element={<PostList />} />
  <Route path="/categories" element={<CategoryList />} />
</Route>
```

This will render the `/posts` and `/categories` routes for authenticated users and apply the `Layout` when rendering. If the current visitor is not authenticated, it will redirect them to the `/login` route.

Let's add the `/login` route.

```tsx
<Route
  element={
    <Authenticated fallback={<Outlet />}>
      <NavigateToResource />
    </Authenticated>
  }
>
  <Route path="/login" element={<AuthPage type="login" />} />
</Route>
```

This will render the `/login` route for not authenticated users and redirect the authenticated users to the `/posts` route.

And finally, we will add a catch-all route (`*`) and render the `ErrorPage` component.

```tsx
<Route
  element={
    <Authenticated fallback={<Outlet />}>
      <Layout>
        <Outlet />
      </Layout>
    </Authenticated>
  }
>
  <Route path="*" element={<ErrorPage />} />
</Route>
```

We will render the `ErrorPage` component for both authenticated and not authenticated users. Only authenticated users will be able to use the sider component we have in the layout.

#### 404 Pages for authenticated users only

The difference from the previous example is in the wrapper of the `*` route. Now we will redirect the unauthenticated users to the `/login` route and show the `ErrorPage` component for authenticated users only.

```tsx
<Route
  element={
    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
      <Layout>
        <Outlet />
      </Layout>
    </Authenticated>
  }
>
  <Route path="*" element={<ErrorPage />} />
</Route>
```

We can also omit the `fallback` property and let the default redirect flow handle the unauthenticated users.

```tsx
<Route
  element={
    <Authenticated>
      <Layout>
        <Outlet />
      </Layout>
    </Authenticated>
  }
>
  <Route path="*" element={<ErrorPage />} />
</Route>
```

This means we will look for the `redirectTo` property in the `authProvider`'s `check` method. If it's defined, `<Authenticated>` component will redirect the user to the `redirectTo` route.

### `RefineRoutes` Component

This component is available but not recommended to use. While this works for the simple cases, we encourage you to define your routes using the `Route` components to have more control and flexibility over them.

This component can be used to create routes for your resources by using the `resources` prop. It will only take effect if the action properties in the resource definitions are assigned to components or objects with `component` property.

It will create the routes and pass it as a `JSX.Element[]` to the `children` function. You can use this to wrap your routes with other components like `Authenticated` or `Layout`.

```tsx title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
// highlight-start
import routerProvider, { RefineRoutes } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";
// highlight-end

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

import { Layout } from "components/Layout";
import { ErrorComponent } from "components/Error";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                // highlight-next-line
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "posts",
                        // highlight-start
                        list: PostList,
                        create: PostCreate,
                        // highlight-end
                    },
                    {
                        name: "categories",
                        // highlight-start
                        list: CategoryList,
                        show: {
                            component: CategoryShow,
                            path: "/categories/:id/details", // Notice that we can also define the path here
                        },
                        // highlight-end
                    }
                ]}
            >
                {/* highlight-start */}
                <RefineRoutes>
                    {(routes) => (
                        <Routes>
                            <Route
                                element={(
                                    <Layout>
                                        <Outlet />
                                    </Layout>
                                )}
                            >
                                <Route index element={<NavigateToResource />} />
                                {routes}
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                    )}
                </RefineRoutes>
                {/* highlight-end */}
        </BrowserRouter>
    )
}
```

We've defined our resource actions using components to let the `RefineRoutes` render them. We can also define the path for each action. If we don't define the path, the `RefineRoutes` will use the default paths for the actions.

[Refer to "Understanding the Resources" section of our tutorial for detailed information. &#8594][resources]

💡 We also defined the `show` action's path as `/categories/:id/details` which will override the default path.

The `index` route is defined with the `NavigateToResource` component which will redirect the user to the list page of the first defined resource.

We also added a catch-all route which will render the `ErrorComponent` for the routes that are not defined.

When components are used to define the resource actions, default paths will be used. You can override the default paths by assigning an object with `component` and `path` properties to the action properties.

Default paths are:

- `list`: `/resources`
- `create`: `/resources/create`
- `edit`: `/resources/edit/:id`
- `show`: `/resources/show/:id`

[routerprovider]: /core/docs/routing/router-provider
[resources]: /core/docs/guides-concepts/general-concepts/#resource-concept

### How to change the document title?

By default [`<DocumentTitleHandler/>`](#documenttitlehandler) component will generate the document title based on current resource and action with the "Refine" suffix. You can customize the title generation process by providing a custom `handler` function.

```tsx
import { BrowserRouter, DocumentTitleHandler } from "@refinedev/react-router";
import { Refine } from "@refinedev/core";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
      /* ... */
      >
        {/* ... */}
        <DocumentTitleHandler
          handler={({ action, params, resource }) => {
            const id = params?.id ?? "";

            const actionPrefixMatcher = {
              create: "Create new ",
              clone: `#${id} Clone ${resource?.meta?.label}`,
              edit: `#${id} Edit ${resource?.meta?.label}`,
              show: `#${id} Show ${resource?.meta?.label}`,
              list: `${resource?.meta?.label}`,
            };

            const suffix = " | <Company Name>";
            const title = actionPrefixMatcher[action || "list"] + suffix;

            return title;
          }}
        />
      </Refine>
    </BrowserRouter>
  );
};
```
