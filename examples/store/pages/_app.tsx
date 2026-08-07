import React from "react";
import type { AppProps } from "next/app";
import Script from "next/script";
import type { NextPage } from "next";

import { type GetListResponse, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider, { authProvider } from "@refinedev/medusa";
import NextNProgress from "nextjs-progressbar";
import type { ProductCollection } from "@medusajs/medusa";

import { SEO } from "@components";
import Layout from "@components/common/Layout";
import { CartProvider, ManagedUIContext } from "@lib/context";
import { useAnalytics } from "@lib/hooks";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
import clsx from "clsx";

import "@assets/main.css";
import "@assets/chrome-bug.css";
import "keen-slider/keen-slider.min.css";
// import { LayoutLayout } from "@components/layout-layout";
import { API_URL } from "src/contants";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  categories: GetListResponse<ProductCollection>;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout): React.JSX.Element {
  const { categories } = pageProps;

  useAnalytics();

  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <ManagedUIContext>
      <GitHubBanner />
      <main className={clsx(inter.variable, "font-sans", "bg-gray-lightest")}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider(API_URL)}
          options={{
            warnWhenUnsavedChanges: true,
            reactQuery: {
              clientConfig: {
                defaultOptions: {
                  queries: {
                    keepPreviousData: false,
                  },
                },
              },
            },
          }}
        >
          <CartProvider>
            <SEO />
            <NextNProgress options={{ showSpinner: false }} />
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-7BSVVDBPMB"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-7BSVVDBPMB');
                        `}
            </Script>
            {renderComponent()}
          </CartProvider>
        </Refine>
      </main>
    </ManagedUIContext>
  );
}

export default MyApp;
