import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function MaterialUIAuth() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/mui": "latest",
        "react-router": "^7.0.2",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "^6.4.11",
        "@mui/utils": "^7.1.0",
        "@mui/x-data-grid": "7.23.5",
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

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import { Authenticated, Refine } from "@refinedev/core";
import {
    AuthPage,
    ErrorComponent,
    RefineThemes,
    ThemedLayout,
} from "@refinedev/mui";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={RefineThemes.Blue}>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
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
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayout>
                                        <Outlet />
                                    </ThemedLayout>
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/dashboard"
                                element={<div>Welcome</div>}
                            />
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
                                                margin: "72px 0px",
                                                height: "max-content",
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
                                                margin: "72px 0px",
                                                height: "max-content",
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
                                                margin: "72px 0px",
                                                height: "max-content",
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
                                                margin: "72px 0px",
                                                height: "max-content",
                                            },
                                        }}
                                    />
                                }
                            />
                        </Route>
                        <Route
                            element={
                                <Authenticated>
                                    <ThemedLayout>
                                        <Outlet />
                                    </ThemedLayout>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ThemeProvider>
        </BrowserRouter>
    );
}

`.trim();
