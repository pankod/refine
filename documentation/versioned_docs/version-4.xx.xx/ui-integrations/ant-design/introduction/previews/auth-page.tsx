import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function AuthPage() {
  return (
    <Sandpack
      showNavigator
      //   showFiles
      initialPercentage={40}
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

import { ErrorComponent, RefineThemes, ThemedLayoutV2, useNotificationProvider, AuthPage } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider } from "antd";

import authProvider from "./auth-provider";

import "@refinedev/antd/dist/reset.css";

import { ProductList } from "./pages/products";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { ResetPasswordPage } from "./pages/reset-password";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={authProvider}
            notificationProvider={useNotificationProvider}
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
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { List, useTable } from "@refinedev/antd";
import { Space, Table } from "antd";

export const ProductList = () => {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="price" title="Price" />
      </Table>
    </List>
  );
};
`.trim();

const LoginTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/antd";

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
import { AuthPage } from "@refinedev/antd";

export const RegisterPage = () => {
    return <AuthPage type="register" />;
};
`.trim();

const ForgotPasswordTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/antd";

export const ForgotPasswordPage = () => {
    return <AuthPage type="forgotPassword" />;
};
`.trim();

const ResetPasswordTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/antd";

export const ResetPasswordPage = () => {
    return <AuthPage type="resetPassword" />;
};
`.trim();
