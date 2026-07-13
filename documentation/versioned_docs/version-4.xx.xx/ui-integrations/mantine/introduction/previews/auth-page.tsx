import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function AuthPage() {
  return (
    <Sandpack
      showNavigator
      //   showFiles
      initialPercentage={40}
      dependencies={{
        "@refinedev/mantine": "^2.28.21",
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router": "latest",
        "@refinedev/simple-rest": "^4.5.4",
        "@refinedev/react-table": "^5.6.4",
        "@tanstack/react-table": "^8.2.6",
        "@tabler/icons-react": "^3.1.0",
        "@emotion/react": "^11.8.2",
        "@mantine/core": "^5.10.4",
        "@mantine/hooks": "^5.10.4",
        "@mantine/form": "^5.10.4",
        "@mantine/notifications": "^5.10.4",
        "react-router": "^7.0.2",
      }}
      startRoute="/login"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "/pages/products.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
        "/pages/login.tsx": {
          code: LoginTsxCode,
          active: true,
        },
        "/pages/register.tsx": {
          code: RegisterTsxCode,
        },
        "/pages/forgot-password.tsx": {
          code: ForgotPasswordTsxCode,
        },
        "/pages/reset-password.tsx": {
          code: ResetPasswordTsxCode,
        },
        "/auth-provider.tsx": {
          code: AuthProviderTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AuthProviderTsxCode = /* jsx */ `
const authProvider = {
    login: async ({ username, password }) => {
      (window as any).authenticated = true;
      return { success: true };
    },
    check: async () => {
      return { authenticated: Boolean((window as any).authenticated) };
    },
    logout: async () => {
      (window as any).authenticated = false;
      return { success: true };
    },
    register: async () => {
      return { success: true };
    },
    forgotPassword: async () => {
      return { success: true };
    },
    resetPassword: async () => {
      return { success: true };
    },
    getIdentity: async () => ({ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/300"})
};

export default authProvider;
`.trim();

const AppTsxCode = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    useNotificationProvider,
    AuthPage
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import authProvider from "./auth-provider";

import { ProductList } from "./pages/products";

const App: React.FC = () => {
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
                        notificationProvider={useNotificationProvider}
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        authProvider={authProvider}
                        resources={[
                            {
                                name: "products",
                                list: "/products",
                            },
                        ]}
                    >
                        <Routes>
                            <Route element={<Authenticated key="inner" fallback={<Navigate to="/login" />}><Outlet /></Authenticated>}>
                              <Route
                                  element={
                                      <ThemedLayoutV2>
                                          <Outlet />
                                      </ThemedLayoutV2>
                                  }
                              >
                                  <Route index element={<NavigateToResource resource="products" />} />
                                  <Route path="/products" element={<ProductList />} />
                                  <Route path="*" element={<ErrorComponent />} />
                              </Route>
                            </Route>
                            <Route element={<Authenticated key="outer" fallback={<Outlet />}><NavigateToResource resource="products" /></Authenticated>}>
                                <Route
                                    path="/login"
                                    element={(
                                    <AuthPage
                                        type="login"
                                        formProps={{
                                        initialValues: {
                                            email: "demo@refine.dev",
                                            password: "demodemo",
                                        },
                                        }}
                                    />
                                    )}
                                />
                                <Route path="/register" element={<AuthPage type="register" />} />
                                <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                                <Route path="/reset-password" element={<AuthPage type="resetPassword" />} />
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                    </Refine>
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List } from "@refinedev/mantine";

import { Box, Group, ScrollArea, Table, Pagination } from "@mantine/core";

export const ProductList = () => {
    const columns = React.useMemo(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "name",
                header: "Name",
                accessorKey: "name",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
              id: "material",
              header: "Material",
              accessorKey: "material",
          },
            {
                id: "price",
                header: "Price",
                accessorKey: "price",
            }
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQuery: { data: tableData },
        },
    } = useTable({
        columns,
        refineCoreProps: {
            initialSorter: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
    });

    return (
        <ScrollArea>
            <List>
                <Table highlightOnHover>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(
                                            header.column.columnDef
                                                .header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <br />
                <Pagination
                    position="right"
                    total={pageCount}
                    page={current}
                    onChange={setCurrent}
                />
            </List>
        </ScrollArea>
    );
};
`.trim();

const LoginTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/mantine";

export const LoginPage = () => {
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues: {
                  email: "demo@refine.dev",
                  password: "demodemo",
                },
            }}
        />
    );
};
`.trim();

const RegisterTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/mantine";

export const RegisterPage = () => {
    return <AuthPage type="register" />;
};
`.trim();

const ForgotPasswordTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/mantine";

export const ForgotPasswordPage = () => {
    return <AuthPage type="forgotPassword" />;
};
`.trim();

const ResetPasswordTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/mantine";

export const ResetPasswordPage = () => {
    return <AuthPage type="resetPassword" />;
};
`.trim();
