import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function ChakraUIAuth() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/chakra-ui": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/react-table": "latest",
        "react-router": "^7.0.2",
        "@tabler/icons-react": "^3.1.0",
        "@chakra-ui/react": "^2.5.1",
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

const AppTsxCode = /* tsx */ `import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import {
    AuthPage,
    ErrorComponent,
    RefineThemes,
    ThemedLayoutV2,
} from "@refinedev/chakra-ui";
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

export default function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={RefineThemes.Blue}>
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
                                                margin: "24px 0px",
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
                                                margin: "24px 0px",
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
                                                margin: "24px 0px",
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
                                                margin: "24px 0px",
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
            </ChakraProvider>
        </BrowserRouter>
    );
}
`.trim();
