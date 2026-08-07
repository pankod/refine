import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutReactRouterDom() {
  return (
    <Sandpack
      showNavigator
      // hidePreview
      //   showFiles
      initialPercentage={35}
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
        antd: "^5.0.5",
      }}
      startRoute="/products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
          hidden: true,
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
      // auto login at first time
      if (typeof (window as any).authenticated === "undefined") {
        (window as any).authenticated = true;
      }
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
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";

import { ErrorComponent, RefineThemes, ThemedLayoutV2, useNotificationProvider } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

import authProvider from "./auth-provider";
import { ProductList } from "./pages/products/list";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            authProvider={authProvider}
            resources={[
              {
                name: "products",
                list: "/products",
              }
            ]}
          >
            <Routes>
                <Route
                  // The layout will wrap all the pages inside this route
                  element={
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                    <Route path="/products" element={<ProductList />} />
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
