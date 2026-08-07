import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { type AuthProvider, GitHubBanner, Refine } from "@refinedev/core";
import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/remix-router";

import { ConfigProvider, App as AntdApp } from "antd";
import resetStyle from "@refinedev/antd/dist/reset.css";

import { API_URL } from "./constants";
import { authenticator } from "./utils/auth.server";

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "New Remix + Refine App",
    viewport: "width=device-width,initial-scale=1",
  },
];

export default function App(): React.JSX.Element {
  const { profile, to } = useLoaderData<typeof loader>();

  const authProvider: AuthProvider = {
    login: async ({ providerName }) => {
      if (providerName) {
        window.location.href = `/auth/${providerName}?to=${to}`;
        return {
          success: true,
        };
      }

      return {
        success: true,
        redirectTo: "/",
      };
    },
    logout: async () => {
      window.location.href = "/auth/logout";
      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      return {
        authenticated: !!profile,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (profile) {
        return profile;
      }

      return null;
    },
  };

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
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const profile = await authenticator.isAuthenticated(request);
  const to = new URL(request.url).searchParams.get("to");
  return json({ profile, to });
};
