import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function HeadlessAuth() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
      }}
      startRoute="/login"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";

import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Refine, AuthPage, Authenticated, ErrorComponent } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";


export default function App() {
  return (
      <BrowserRouter>
          <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              authProvider={{
                  check: async () => ({
                      authenticated: false,
                      redirectTo: "/login",
                  }),
                  login: async () => {
                      return {
                          success: false,
                      };
                  },
                  logout: async () => {
                      return {
                          success: false,
                      };
                  },
                  onError: async () => ({}),
                  getIdentity: async () => ({
                      id: 1,
                      name: "John Doe",
                      avatar: "https://i.pravatar.cc/300",
                  }),
              }}
              resources={[
                  {
                      name: "dashboard",
                      list: "/",
                  },
              ]}
          >
              <Routes>
                  <Route
                      element={
                          <Authenticated
                              fallback={<CatchAllNavigate to="/login" />}
                          >
                              <Outlet />
                          </Authenticated>
                      }
                  >
                      <Route index element={<div>Welcome!</div>} />
                  </Route>
                  <Route
                      element={
                          <Authenticated
                              fallback={
                                  <div
                                      style={{
                                          margin: "24px auto",
                                          maxWidth: "400px",
                                      }}
                                  >
                                      <Outlet />
                                  </div>
                              }
                          >
                              <NavigateToResource resource="dashboard" />
                          </Authenticated>
                      }
                  >
                      <Route
                          path="/login"
                          element={<AuthPage type="login" />}
                      />
                      <Route
                          path="/register"
                          element={<AuthPage type="register" />}
                      />
                      <Route
                          path="/forgot-password"
                          element={<AuthPage type="forgotPassword" />}
                      />
                      <Route
                          path="/update-password"
                          element={<AuthPage type="updatePassword" />}
                      />
                  </Route>
                  <Route
                      element={
                          <Authenticated>
                              <Outlet />
                          </Authenticated>
                      }
                  >
                      <Route path="*" element={<ErrorComponent />} />
                  </Route>
              </Routes>
          </Refine>
      </BrowserRouter>
  );
}
`.trim();
