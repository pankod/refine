import React from "react";
import { BrowserRouter } from "react-router";

import {
  Refine,
  type I18nProvider,
  type AccessControlProvider,
  type DataProvider,
  type NotificationProvider,
  type ResourceProps,
  type AuthProvider,
  type RouterProvider,
  type RefineProps,
} from "@refinedev/core";

import { MockRouterProvider, MockJSONServer } from "@test";

export interface ITestWrapperProps {
  routerProvider?: RouterProvider;
  dataProvider?: DataProvider;
  authProvider?: AuthProvider;
  resources?: ResourceProps[];
  notificationProvider?: NotificationProvider;
  accessControlProvider?: AccessControlProvider;
  i18nProvider?: I18nProvider;
  routerInitialEntries?: string[];
  options?: RefineProps["options"];
}

export const TestWrapper: (
  props: ITestWrapperProps,
) => React.FC<{ children?: React.ReactNode }> = ({
  routerProvider,
  dataProvider,
  authProvider,
  resources,
  notificationProvider,
  accessControlProvider,
  routerInitialEntries,
  i18nProvider,
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

  return ({ children }): React.ReactElement => {
    return (
      <BrowserRouter>
        <Refine
          dataProvider={dataProvider ?? MockJSONServer}
          i18nProvider={i18nProvider}
          routerProvider={routerProvider ?? MockRouterProvider()}
          authProvider={authProvider}
          notificationProvider={notificationProvider}
          resources={resources ?? [{ name: "posts", list: "/list" }]}
          accessControlProvider={accessControlProvider}
          options={{
            ...options,
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
  MockAuthProvider,
  MockDataProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";

export { act } from "react";
