import React from "react";
import { BrowserRouter } from "react-router";

import { type AuthProvider, type Action, Refine } from "@refinedev/core";

import { MockRouterProvider, MockJSONServer } from "@test";
import type {
  I18nProvider,
  AccessControlProvider,
  DataProvider,
  NotificationProvider,
  IResourceItem,
  RouterProvider,
} from "@refinedev/core";

import { RefineKbarProvider } from "../src/index";

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
];

export interface ITestWrapperProps {
  dataProvider?: DataProvider;
  authProvider?: AuthProvider;
  resources?: IResourceItem[];
  routerProvider?: RouterProvider;
  notificationProvider?: NotificationProvider;
  accessControlProvider?: AccessControlProvider;
  i18nProvider?: I18nProvider;
  routerInitialEntries?: string[];
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
          (resources ?? mockResources).find((item) => item.name === resource) ??
          undefined,
        action: action,
        id: id,
      });

    return (
      <RefineKbarProvider>
        <BrowserRouter>
          <Refine
            dataProvider={dataProvider ?? MockJSONServer}
            i18nProvider={i18nProvider}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            routerProvider={finalRouterProvider}
            resources={resources ?? [{ name: "posts", list: "/list" }]}
            accessControlProvider={accessControlProvider}
            options={{ disableTelemetry: true }}
          >
            {children}
          </Refine>
        </BrowserRouter>
      </RefineKbarProvider>
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
