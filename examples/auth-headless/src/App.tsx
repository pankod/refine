import {
  AuthPage,
  type AuthProvider,
  GitHubBanner,
  Refine,
  Authenticated,
  ErrorComponent,
} from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostList, PostCreate, PostEdit } from "./pages/posts";
import { ExamplePage } from "./pages/example";
import { Layout } from "./components/layout";

import "./App.css";

const App: React.FC = () => {
  const authProvider: AuthProvider = {
    login: async ({ providerName, email }) => {
      if (providerName === "google") {
        window.location.href = "https://accounts.google.com/o/oauth2/v2/auth";
        return {
          success: true,
        };
      }

      if (providerName === "github") {
        window.location.href = "https://github.com/login/oauth/authorize";
        return {
          success: true,
        };
      }

      if (email) {
        localStorage.setItem("email", email);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    },
    register: async ({ email, password }) => {
      if (email && password) {
        localStorage.setItem("email", email);
        return {
          success: true,
          redirectTo: "/",
        };
      }
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    },
    updatePassword: async ({ password }) => {
      if (password) {
        //we can update password here
        return {
          success: true,
          redirectTo: "/login",
        };
      }
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: "Invalid password",
        },
      };
    },
    forgotPassword: async ({ email }) => {
      if (email) {
        //we can send email with forgot password link here
        return {
          success: true,
          redirectTo: "/login",
        };
      }
      return {
        success: false,
        error: {
          message: "Forgot password failed",
          name: "Invalid email",
        },
      };
    },
    logout: async () => {
      localStorage.removeItem("email");
      return {
        success: true,
        redirectTo: "/",
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
    check: async () => {
      return localStorage.getItem("email")
        ? { authenticated: true }
        : {
            authenticated: false,
            redirectTo: "/login",
            error: {
              message: "Check failed",
              name: "Not authenticated",
            },
          };
    },
    getPermissions: async () => ["admin"],
    getIdentity: async () => ({
      id: 1,
      name: "Jane Doe",
      avatar:
        "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
    }),
  };

  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            edit: "/posts/edit/:id",
            create: "/posts/create",
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
                <Layout>
                  <Outlet />
                </Layout>
              </Authenticated>
            }
          >
            <Route index element={<NavigateToResource resource="posts" />} />

            <Route path="/posts">
              <Route index element={<PostList />} />
              <Route path="create" element={<PostCreate />} />
              <Route path="edit/:id" element={<PostEdit />} />
            </Route>
          </Route>

          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/register" element={<AuthPage type="register" />} />
            <Route
              path="/forgot-password"
              element={<AuthPage type="forgotPassword" />}
            />
            <Route
              path="/update-password"
              element={<AuthPage type="updatePassword" />}
            />
            <Route path="/example" element={<ExamplePage />} />
          </Route>

          <Route
            element={
              <Authenticated key="catch-all">
                <Layout>
                  <Outlet />
                </Layout>
              </Authenticated>
            }
          >
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
