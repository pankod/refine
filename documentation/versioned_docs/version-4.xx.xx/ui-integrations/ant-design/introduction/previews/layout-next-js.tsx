import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutNextjs() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/nextjs-router": "latest",
        antd: "^5.0.5",
      }}
      // template="nextjs"
      startRoute="/products"
      files={{
        "/pages/_app.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/index.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

import { RefineThemes, ThemedLayoutV2, useNotificationProvider } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

function App({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider theme={RefineThemes.Blue}>
            <AntdApp>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                    notificationProvider={useNotificationProvider}
                    resources={[
                        {
                        name: "products",
                        list: "/products",
                        },
                    ]}
                >
                  <ThemedLayoutV2>
                    <Component {...pageProps} />
                  </ThemedLayoutV2>
                </Refine>
            </AntdApp>
        </ConfigProvider>
    );
}

export default App;
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { List, useTable } from "@refinedev/antd";
import { Space, Table } from "antd";

export default function ProductList() {
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
