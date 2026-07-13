"use client";

import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Toaster } from "@/registry/new-york/ui/sonner";
import { Breadcrumb } from "@/registry/new-york/refine-ui/layout/breadcrumb";
import { ErrorComponent } from "@/registry/new-york/refine-ui/layout/error-component";
import {
  BellIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileIcon,
  FolderIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { authProvider } from "./providers/auth";
import { useNotificationProvider } from "./providers/notification";
import { createDataProvider } from "./providers/data";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";
import { AppLayout } from "./components/layout";
import { PostsListPage } from "./routes/posts/list";
import { UsersListPage } from "./routes/users/list";
import { API_URL } from "./constants";
import { HomePage } from "./routes/home";
import CreatePost from "./routes/posts/create";
import ShowPost from "./routes/posts/show";
import EditPost from "./routes/posts/edit";
import { ForgotPasswordForm } from "./components/forgot-password-form";

export function BaseExample() {
  return (
    <BrowserRouter basename="/base-example">
      <Refine
        dataProvider={createDataProvider(API_URL)}
        authProvider={authProvider}
        routerProvider={routerProvider}
        notificationProvider={useNotificationProvider}
        resources={[
          {
            name: "home",
            list: "/",
            meta: {
              label: "Home",
              icon: <HomeIcon />,
            },
          },
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/edit/:id",
            show: "/posts/show/:id",
            clone: "/posts/clone/:id",
            meta: {
              icon: <FileIcon />,
            },
          },
          {
            name: "users",
            list: "/users",
            meta: { icon: <UserIcon /> },
          },
          {
            name: "settings",
            meta: { icon: <SettingsIcon /> },
          },
          {
            name: "Directory",
            list: "/directory",
            meta: { icon: <FolderIcon /> },
          },
          {
            name: "profile",
            list: "/profile",
            meta: {
              parent: "settings",
            },
          },
          {
            name: "notifications",
            list: "/settings/notifications",
            edit: "/settings/notifications/:id/edit",
            meta: {
              icon: <BellIcon />,
              parent: "settings",
            },
          },
          {
            name: "finance",
            meta: {
              group: true,
            },
          },
          {
            name: "expenses",
            list: "/expenses",
            meta: {
              icon: <CreditCardIcon />,
              parent: "finance",
            },
          },
          {
            name: "income",
            list: "/income",
            meta: {
              icon: <DollarSignIcon />,
              parent: "finance",
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
              <AppLayout>
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <Outlet />
                </Authenticated>
              </AppLayout>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostsListPage />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            <Route path="/posts/show/:id" element={<ShowPost />} />
            <Route path="/users" element={<UsersListPage />} />
            <Route path="/settings" element={<div>Settings List Page</div>} />
            <Route
              path="/settings/notifications"
              element={
                <div>
                  <Breadcrumb />

                  <h1>Notifications List Page</h1>
                </div>
              }
            />
            <Route
              path="/settings/notifications/:id/edit"
              element={
                <div>
                  <Breadcrumb />

                  <h1>Notifications Edit Page</h1>
                </div>
              }
            />
            <Route path="/profile" element={<div>Profile List Page</div>} />
            <Route path="/finance" element={<div>Finance List Page</div>} />
            <Route path="/expenses" element={<div>Expenses List Page</div>} />
            <Route path="/income" element={<div>Income List Page</div>} />
            <Route path="/directory" element={<div>Directory List Page</div>} />
            <Route path="*" element={<ErrorComponent />} />
          </Route>

          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          </Route>

          <Route
            element={
              <Authenticated key="catch-all">
                <Outlet />
              </Authenticated>
            }
          >
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>

        <Toaster />
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}
