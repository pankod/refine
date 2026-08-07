"use client";

import { DevtoolsProvider } from "@providers/devtools";
import { useNotificationProvider } from "@refinedev/antd";
import { GitHubBanner, type I18nProvider, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import React, { Suspense, type PropsWithChildren } from "react";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { dataProvider } from "@providers/data-provider";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { useLocale, useTranslations } from "next-intl";
import { setUserLocale } from "@i18n";

type Props = {
  themeMode?: string;
};

export const RefineContext = ({
  themeMode,
  children,
}: PropsWithChildren<Props>) => {
  const t = useTranslations();

  const i18nProvider: I18nProvider = {
    translate: (key: string, options: any) => t(key, options),
    getLocale: useLocale,
    changeLocale: setUserLocale,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider defaultMode={themeMode}>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              authProvider={authProviderClient}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              {children}
              <RefineKbar />
            </Refine>
          </DevtoolsProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </Suspense>
  );
};
