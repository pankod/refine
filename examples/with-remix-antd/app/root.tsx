import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { GitHubBanner, Refine } from "@refinedev/core";
import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/remix-router";

import { ConfigProvider, App as AntdApp } from "antd";
import resetStyle from "@refinedev/antd/dist/reset.css";

import { authProvider } from "./authProvider";
import { API_URL } from "./constants";

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "New Remix + Refine App",
    viewport: "width=device-width,initial-scale=1",
  },
];

export default function App(): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <GitHubBanner />
        <ConfigProvider theme={RefineThemes.Blue}>
          <AntdApp>
            <Refine
              dataProvider={dataProvider(API_URL)}
              routerProvider={routerProvider}
              authProvider={authProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "posts",
                  list: "/posts",
                  create: "/posts/create",
                  edit: "/posts/edit/:id",
                  show: "/posts/show/:id",
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
              <Outlet />
              <UnsavedChangesNotifier />
            </Refine>
          </AntdApp>
        </ConfigProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: resetStyle }];
}
