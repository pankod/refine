import React from "react";
import { BrowserRouter } from "react-router";

import { type AuthProvider, Refine } from "@refinedev/core";

import { MockJSONServer } from "@test";
import type {
  I18nProvider,
  AccessControlProvider,
  DataProvider,
  NotificationProvider,
  IResourceItem,
  RouterProvider,
  IRefineOptions,
} from "@refinedev/core";
import { mockRouterProvider } from "./dataMocks";

export interface ITestWrapperProps {
  dataProvider?: DataProvider;
  authProvider?: AuthProvider;
  resources?: IResourceItem[];
  notificationProvider?: NotificationProvider;
  accessControlProvider?: AccessControlProvider;
  i18nProvider?: I18nProvider;
  routerProvider?: RouterProvider;
  routerInitialEntries?: string[];
  options?: IRefineOptions;
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
  dataProvider,
  authProvider,
  resources,
  notificationProvider,
  accessControlProvider,
  routerInitialEntries,
  i18nProvider,
  routerProvider,
  options,
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

  return ({ children }: React.PropsWithChildren<{}>): React.ReactElement => {
    return (
      <BrowserRouter>
        <Refine
          options={{
            disableTelemetry: true,
            ...options,
          }}
          dataProvider={dataProvider ?? MockJSONServer}
          i18nProvider={i18nProvider}
          routerProvider={routerProvider ?? mockRouterProvider()}
          authProvider={authProvider}
          notificationProvider={notificationProvider}
          resources={resources ?? [{ name: "posts", list: "/list" }]}
          accessControlProvider={accessControlProvider}
        >
          {children}
        </Refine>
      </BrowserRouter>
    );
  };
};
export {
  MockJSONServer,
  MockAccessControlProvider,
  MockLiveProvider,
  mockRouterProvider,
  mockAuthProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
