import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function AuthPage() {
  return (
    <Sandpack
      showNavigator
      //   showFiles
      initialPercentage={40}
      dependencies={{
        "@refinedev/chakra-ui": "^2.26.17",
        "@tabler/icons-react": "^3.1.0",
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router": "latest",
        "@refinedev/simple-rest": "^4.5.4",
        "@refinedev/react-table": "^5.6.4",
        "@tanstack/react-table": "^8.2.6",
        "@refinedev/react-hook-form": "^4.8.12",
        "@chakra-ui/react": "^2.5.1",
        "react-dom": "^18.0.0",
        "react-router": "^7.0.2",
        "react-hook-form": "^7.57.0",
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
import React from "react";

import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";

import { ErrorComponent, RefineThemes, ThemedLayoutV2, notificationProvider, AuthPage } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";

import authProvider from "./auth-provider";

import { ProductList } from "./pages/products";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { ResetPasswordPage } from "./pages/reset-password";

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          authProvider={authProvider}
          notificationProvider={notificationProvider}
          resources={[
            {
              name: "products",
              list: "/products",
            }
          ]}
          options={{ syncWithLocation: true }}
        >
          <Routes>
            <Route element={<Authenticated fallback={<Navigate to="/login" />}><Outlet /></Authenticated>}>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="/products" element={<ProductList />} />
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Route>
            <Route element={<Authenticated fallback={<Outlet />}><NavigateToResource resource="products" /></Authenticated>}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ChakraProvider>
    </BrowserRouter>
  );
};
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import {
    List,
} from "@refinedev/chakra-ui";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
} from "@chakra-ui/react";

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
                id: "price",
                header: "Price",
                accessorKey: "price",
            },
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
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        <Text>
                                            {flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext(),
                                            )}
                                        </Text>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </List>
    );
};
`.trim();

const LoginTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/chakra-ui";

export const LoginPage = () => {
    return (
        <AuthPage
            type="login"
            formProps={{
                defaultValues: {
                  email: "demo@refine.dev",
                  password: "demodemo",
                },
            }}
        />
    );
};
`.trim();

const RegisterTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/chakra-ui";

export const RegisterPage = () => {
    return <AuthPage type="register" />;
};
`.trim();

const ForgotPasswordTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/chakra-ui";

export const ForgotPasswordPage = () => {
    return <AuthPage type="forgotPassword" />;
};
`.trim();

const ResetPasswordTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/chakra-ui";

export const ResetPasswordPage = () => {
    return <AuthPage type="resetPassword" />;
};
`.trim();
