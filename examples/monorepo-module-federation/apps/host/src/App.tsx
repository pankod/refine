import React, { Suspense, useEffect } from "react";

import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  useNotificationProvider,
  ThemedLayout,
} from "@refinedev/antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import type { ExtendedWindow } from "./types";

const BlogPostList = React.lazy(() => import("blog_posts/BlogPostList"));
const BlogPostShow = React.lazy(() => import("blog_posts/BlogPostShow"));
const BlogPostEdit = React.lazy(() => import("blog_posts/BlogPostEdit"));
const BlogPostCreate = React.lazy(() => import("blog_posts/BlogPostCreate"));

const CategoryList = React.lazy(() => import("categories/CategoryList"));
const CategoryShow = React.lazy(() => import("categories/CategoryShow"));
const CategoryEdit = React.lazy(() => import("categories/CategoryEdit"));
const CategoryCreate = React.lazy(() => import("categories/CategoryCreate"));

declare let window: ExtendedWindow;

function App() {
  useEffect(() => {
    // This is not as elegant as production code as we cannot use such in production.
    // But lets assume these envs are coming from a environment handler.
    // And this is only for sample case.
    if (import.meta.env.VITE_CATEGORIES_URL) {
      // This is where we set the payment remote's URL.
      window.categoriesUrl = import.meta.env.VITE_CATEGORIES_URL;
    }
  }, []);

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            routerProvider={routerProvider}
            authProvider={authProvider}
            resources={[
              {
                name: "blog_posts",
                list: "/blog-posts",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                show: "/blog-posts/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                show: "/categories/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayout Header={Header}>
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route index element={<NavigateToResource />} />
                <Route path="/blog-posts">
                  <Route
                    index
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <BlogPostList />
                      </Suspense>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <BlogPostCreate />
                      </Suspense>
                    }
                  />
                  <Route
                    path="edit/:id"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <BlogPostEdit />
                      </Suspense>
                    }
                  />
                  <Route
                    path="show/:id"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <BlogPostShow />
                      </Suspense>
                    }
                  />
                </Route>
                <Route path="/categories">
                  <Route
                    index
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <CategoryList />
                      </Suspense>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <CategoryCreate />
                      </Suspense>
                    }
                  />
                  <Route
                    path="edit/:id"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <CategoryEdit />
                      </Suspense>
                    }
                  />
                  <Route
                    path="show/:id"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <CategoryShow />
                      </Suspense>
                    }
                  />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayout Header={Header}>
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
