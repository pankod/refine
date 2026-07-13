import React from "react";
import { BrowserRouter } from "react-router";

import {
  Refine,
  type I18nProvider,
  type AccessControlProvider,
  type DataProvider,
  type NotificationProvider,
  type IResourceItem,
  type AuthProvider,
  type RouterProvider,
  type Action,
} from "@refinedev/core";

import { MockRouterProvider, MockJSONServer } from "@test";

const mockResources = [
  {
    name: "posts",
    list: "/list",
    create: "/create",
    show: "/show/:id",
    edit: "/edit/:id",
    meta: {
      canEdit: true,
      canShow: true,
      canDelete: true,
    },
  },
  {
    name: "categories",
    list: "/list",
    create: "/create",
    show: "/show/:id",
    edit: "/edit/:id",
    meta: {
      canEdit: true,
      canShow: true,
      canDelete: true,
    },
  },
  {
    name: "users",
    list: "/list",
    create: "/create",
    show: "/show/:id",
    edit: "/edit/:id",
    meta: {
      canEdit: true,
      canShow: true,
      canDelete: true,
    },
  },
  {
    name: "tags",
    list: "/list",
    create: "/create",
    show: "/show/:id",
    edit: "/edit/:id",
    meta: {
      canEdit: true,
      canShow: true,
      canDelete: true,
    },
  },
];

export interface ITestWrapperProps {
  dataProvider?: DataProvider;
  authProvider?: AuthProvider;
  routerProvider?: RouterProvider;
  resources?: IResourceItem[];
  notificationProvider?: NotificationProvider;
  accessControlProvider?: AccessControlProvider;
  i18nProvider?: I18nProvider;
  routerInitialEntries?: string[];
  DashboardPage?: React.FC;
}

export const TestWrapper: (
  props: ITestWrapperProps,
) => React.FC<{ children?: React.ReactNode }> = ({
  dataProvider,
  authProvider,
  routerProvider,
  resources,
  notificationProvider,
  accessControlProvider,
  routerInitialEntries,
  i18nProvider,
}) => {
  // Previously, MemoryRouter was used in this wrapper. However, the
  // recommendation by react-router developers (see
  // https://github.com/remix-run/react-router/discussions/8241#discussioncomment-159686)
  // is essentially to use the same router as your actual application. Besides
  // that, it's impossible to check for location changes with MemoryRouter if
  // needed.
  if (routerInitialEntries) {
    routerInitialEntries.forEach((route) => {
      window.history.replaceState({}, "", route);
    });
  }

  return ({ children }): React.ReactElement => {
    let action: Action | undefined = undefined;
    let id = undefined;
    let resource = undefined;

    if (routerInitialEntries) {
      // find action, id and resource from routerInitialEntries:  /posts/show/1, /posts/create, /posts/edit/11
      const [
        resourcePath = undefined,
        actionPath = undefined,
        idParam = undefined,
      ] = routerInitialEntries[0].split("/").slice(1);
      resource = resourcePath;
      action = actionPath as Action | undefined;
      if (!action && resource === "posts") {
        action = "list";
      }
      id = idParam;
    }

    const finalRouterProvider =
      routerProvider ??
      MockRouterProvider({
        pathname: routerInitialEntries?.[0],
        params: {
          id: id || undefined,
        },
        resource:
          mockResources.find((item) => item.name === resource) ?? undefined,
        action: action,
        id: id,
      });

    return (
      <BrowserRouter>
        <Refine
          dataProvider={dataProvider ?? MockJSONServer}
          i18nProvider={i18nProvider}
          authProvider={authProvider}
          routerProvider={finalRouterProvider}
          notificationProvider={notificationProvider}
          resources={resources ?? mockResources}
          accessControlProvider={accessControlProvider}
          options={{
            disableTelemetry: true,
            reactQuery: {
              clientConfig: {
                defaultOptions: {
                  queries: {
                    gcTime: 0,
                    staleTime: 0,
                    networkMode: "always",
                  },
                },
              },
            },
          }}
        >
          {children}
        </Refine>
      </BrowserRouter>
    );
  };
};
export {
  MockJSONServer,
  MockRouterProvider,
  MockAccessControlProvider,
  MockLiveProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
