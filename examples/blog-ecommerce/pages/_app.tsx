import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/nextjs-router/pages";
import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "@refinedev/strapi-v4";

import { API_URL } from "src/constants";
import { Layout } from "src/components";

function MyApp({ Component, pageProps }: AppProps): React.JSX.Element {
  const dataProvider = DataProvider(`${API_URL}/api`);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
        />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"
        />
      </Head>
      <GitHubBanner />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        options={{
          reactQuery: { devtoolConfig: { position: "bottom-left" } },
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
      <div
        hidden
        id="snipcart"
        data-api-key="YWEzNDc3NGQtOGI3ZS00MzI2LTliYmUtM2M4NDg0ZTg2OTE0NjM3ODAwODQ0NzIzNDc0NTIw"
      />
    </>
  );
}

export default MyApp;
