import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function AntdAuth() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
        antd: "^5.0.5",
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

import "@refinedev/antd/dist/reset.css";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import {
    AuthPage,
    ErrorComponent,
    RefineThemes,
    ThemedLayoutV2,
} from "@refinedev/antd";
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

export default function App() {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
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
                        options={{ syncWithLocation: true }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route index element={<div>Welcome!</div>} />
                            </Route>
                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource resource="dashboard" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            wrapperProps={{
                                                style: {
                                                    paddingTop: 24,
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <AuthPage
                                            type="register"
                                            wrapperProps={{
                                                style: {
                                                    paddingTop: 24,
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/forgot-password"
                                    element={
                                        <AuthPage
                                            type="forgotPassword"
                                            wrapperProps={{
                                                style: {
                                                    paddingTop: 24,
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/update-password"
                                    element={
                                        <AuthPage
                                            type="updatePassword"
                                            wrapperProps={{
                                                style: {
                                                    paddingTop: 24,
                                                },
                                            }}
                                        />
                                    }
                                />
                            </Route>
                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
}
`.trim();
