import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function ViteAntdLayout() {
  return (
    <Sandpack
      showNavigator
      showFiles
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
        antd: "^5.0.5",
      }}
      startRoute="/"
      files={{
        "/refine/refine-context.tsx": {
          code: RefineContextTsxCode.trim(),
          active: true,
        },
        "/App.tsx": {
          code: AppTsxCode.trim(),
        },
        "/refine/pages/products/list.tsx": {
          code: ListTsxCode.trim(),
        },
        "/pages/home.tsx": {
          code: HomeTsxCode.trim(),
        },
        "/pages/about.tsx": {
          code: AboutTsxCode.trim(),
        },
      }}
    />
  );
}

const HomeTsxCode = /* tsx */ `
export const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>This file represents your existing page.</p>
      <p>This component isn't wrapped with Refine context.</p>
      <a href="/about">Go to About page</a>
      <br />
      <a href="/refine">Go to Refine page</a>
    </>
  );
};
`;

const AboutTsxCode = /* tsx */ `
export const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <a href="/">Go to Home page</a>
    </div>
  );
};
`;

const RefineContextTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { RefineThemes, ThemedLayoutV2 } from "@refinedev/antd";

import { App as AntdApp, ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

export function RefineContext({ children }) {
  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "products",
              list: "/refine/products",
            },
          ]}
          options={{ syncWithLocation: true }}
        >
          <ThemedLayoutV2>{children}</ThemedLayoutV2>
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
`;

const AppTsxCode = /* tsx */ `
import { BrowserRouter, Route, Routes, Outlet } from "react-router";

import { ErrorComponent } from "@refinedev/antd";
import { NavigateToResource } from "@refinedev/react-router";

import { Home } from "./pages/home.tsx";
import { About } from "./pages/about.tsx";
import { ProductList } from "./refine/pages/products/list.tsx";
import { RefineContext } from "./refine/refine-context.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Refine routes */}
        <Route
          path="/refine"
          element={
            <RefineContext>
              <Outlet />
            </RefineContext>
          }
        >
          <Route index element={<NavigateToResource />} />
          <Route path="products" element={<ProductList />} />
          <Route path="*" element={<ErrorComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
`;

const ListTsxCode = `
import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

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
`;
