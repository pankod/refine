import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function AuthPage() {
  return (
    <Sandpack
      showNavigator
      //   showFiles
      initialPercentage={40}
      dependencies={{
        "@refinedev/mui": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/react-hook-form": "latest",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/utils": "^7.1.0",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "^6.4.11",
        "@mui/x-data-grid": "7.23.5",
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

import { ErrorComponent, RefineThemes, ThemedLayout, notificationProvider, RefineSnackbarProvider, AuthPage } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import authProvider from "./auth-provider";

import { ProductList } from "./pages/products";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { ResetPasswordPage } from "./pages/reset-password";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles
            styles={{ html: { WebkitFontSmoothing: "auto" } }}
        />
        <RefineSnackbarProvider>
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
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
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
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { List, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ProductList = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
        {
            field: "id",
            headerName: "ID",
            type: "number",
            width: 50,
        },
        { field: "name", headerName: "Name", minWidth: 300, flex: 1 },
        { field: "price", headerName: "Price", minWidth: 100, flex: 1 },
      ],
    []
  );

  return (
    <List>
        <DataGrid {...dataGridProps} columns={columns}  />
    </List>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
`.trim();

const LoginTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/mui";

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
import { AuthPage } from "@refinedev/mui";

export const RegisterPage = () => {
    return <AuthPage type="register" />;
};
`.trim();

const ForgotPasswordTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/mui";

export const ForgotPasswordPage = () => {
    return <AuthPage type="forgotPassword" />;
};
`.trim();

const ResetPasswordTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/mui";

export const ResetPasswordPage = () => {
    return <AuthPage type="resetPassword" />;
};
`.trim();
