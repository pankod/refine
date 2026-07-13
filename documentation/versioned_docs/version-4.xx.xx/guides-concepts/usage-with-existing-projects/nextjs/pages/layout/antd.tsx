import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSPagesAntdLayout() {
  return (
    <Sandpack
      template="nextjs"
      showNavigator
      showFiles
      dependencies={{
        "@refinedev/antd": "latest",
        antd: "^5.0.5",
      }}
      startRoute="/"
      files={{
        "/src/components/refine-layout.tsx": {
          code: RefineLayoutTsxCode.trim(),
          active: true,
        },
        "/pages/_app.tsx": {
          code: AppTsxCode.trim(),
        },
        "/pages/refine/products.tsx": {
          code: RefineProductsTsxCode.trim(),
        },
        "/pages/about.tsx": {
          code: AboutTsxCode.trim(),
        },
        "/pages/index.tsx": {
          code: IndexTsxCode.trim(),
        },
        "/next.config.js": {
          code: NextConfigJsCode.trim(),
        },
      }}
    />
  );
}

const NextConfigJsCode = /* js */ `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@ant-design/icons-svg",
    "@refinedev/nextjs-router",
    "@refinedev/antd",
    "antd",
    "@ant-design/pro-components",
    "@ant-design/pro-layout",
    "@ant-design/pro-utils",
    "@ant-design/pro-provider",
    "rc-pagination",
    "rc-picker",
    "rc-util",
  ],
};

module.exports = nextConfig;
`;

const AppTsxCode = /* tsx */ `
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
`;

const IndexTsxCode = /* tsx */ `
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Link href="/about">Go to About page</Link>
      <br />
      <Link href="/refine/products">Go to Refine page</Link>
    </>
  );
}
`;

const AboutTsxCode = /* tsx */ `
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <Link href="/">Go to Home page</Link>
    </div>
  );
}
`;

const RefineLayoutTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router/pages";
import { RefineThemes, ThemedLayoutV2 } from "@refinedev/antd";

import { App as AntdApp, ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

export default function RefineLayout({ children }) {
  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          routerProvider={routerProvider}
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

const RefineProductsTsxCode = /* tsx */ `
import type { ReactElement } from "react";

import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

import RefineLayout from "../../src/components/refine-layout";
import type { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
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

Page.getLayout = function getLayout(page: ReactElement) {
  return <RefineLayout>{page}</RefineLayout>;
};

export default Page;
`;
