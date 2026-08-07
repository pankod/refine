import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSPagesRouter() {
  return (
    <Sandpack
      template="nextjs"
      showFiles
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
      }}
    />
  );
}

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
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";

export default function RefineLayout({ children }) {
  return (
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
         {children}
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
`;

const RefineProductsTsxCode = /* tsx */ `
import type { ReactElement } from "react";
import { useList } from "@refinedev/core";

import RefineLayout from "../../src/components/refine-layout";
import type { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const { data: products } = useList();

  return (
    <div>
      <h1>Refine Products Page</h1>
      <ul>
        {products?.data?.map((record) => (
          <li key={record.id}>{record.name}</li>
        ))}
      </ul>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <RefineLayout>{page}</RefineLayout>;
};

export default Page;
`;
