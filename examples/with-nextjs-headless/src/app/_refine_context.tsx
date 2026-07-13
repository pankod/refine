"use client";

import React, { Suspense, type PropsWithChildren } from "react";
import { GitHubBanner, type I18nProvider, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { useLocale, useTranslations } from "next-intl";
import { DevtoolsProvider } from "@providers/devtools";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { dataProvider } from "@providers/data-provider";
import { setUserLocale } from "@i18n";

export const RefineContext = ({ children }: PropsWithChildren) => {
  const t = useTranslations();

  const i18nProvider: I18nProvider = {
    translate: (key: string, options?: Record<string, string>) =>
      t(key, options),
    getLocale: useLocale,
    changeLocale: setUserLocale,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHubBanner />
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
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
      </RefineKbarProvider>
    </Suspense>
  );
};
