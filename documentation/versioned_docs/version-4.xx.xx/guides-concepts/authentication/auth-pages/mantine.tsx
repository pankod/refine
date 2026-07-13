import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function MantineAuth() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/mantine": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/react-table": "latest",
        "react-router": "^7.0.2",
        "@tabler/icons-react": "^3.1.0",
        "@emotion/react": "^11.8.2",
        "@mantine/core": "^5.10.4",
        "@mantine/hooks": "^5.10.4",
        "@mantine/notifications": "^5.10.4",
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

import { Global, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import { Authenticated, Refine } from "@refinedev/core";
import {
    AuthPage,
    ErrorComponent,
    RefineThemes,
    ThemedLayoutV2,
} from "@refinedev/mantine";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

export default function App() {
    return (
        <BrowserRouter>
            <MantineProvider
                theme={RefineThemes.Blue}
                withNormalizeCSS
                withGlobalStyles
            >
                <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
                <NotificationsProvider position="top-right">
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
                                <Route index element={<div>Welcome</div>} />
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
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "100vh",
                                                    margin: "24px auto",
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
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "100vh",
                                                    margin: "24px auto",
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
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "100vh",
                                                    margin: "24px auto",
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
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "100vh",
                                                    margin: "24px auto",
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
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
}
`.trim();
