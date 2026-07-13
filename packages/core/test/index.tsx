import React, { type ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AccessControlContextProvider } from "@contexts/accessControl";
import { AuditLogContextProvider } from "@contexts/auditLog";
import { AuthProviderContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { I18nContextProvider } from "@contexts/i18n";
import { LiveContextProvider } from "@contexts/live";
import { NotificationContextProvider } from "@contexts/notification";
import { RefineContextProvider } from "@contexts/refine";
import type { IRefineContextProvider } from "@contexts/refine/types";
import { ResourceContextProvider } from "@contexts/resource";
import { RouterContextProvider } from "@contexts/router";
import { UndoableQueueContextProvider } from "@contexts/undoableQueue";

import type { AccessControlProvider } from "../src/contexts/accessControl/types";
import type { AuditLogProvider } from "../src/contexts/auditLog/types";
import type { AuthProvider } from "../src/contexts/auth/types";
import type { DataProvider, DataProviders } from "../src/contexts/data/types";
import type { I18nProvider } from "../src/contexts/i18n/types";
import type { LiveProvider } from "../src/contexts/live/types";
import type { NotificationProvider } from "../src/contexts/notification/types";
import type { IResourceItem } from "../src/contexts/resource/types";
import type { RouterProvider } from "../src/contexts/router/types";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
      retry: 0,
    },
  },
});

beforeEach(() => {
  queryClient.clear();
});

export interface ITestWrapperProps {
  authProvider?: AuthProvider;
  dataProvider?: DataProvider | DataProviders;
  i18nProvider?: I18nProvider;
  notificationProvider?: NotificationProvider;
  accessControlProvider?: Partial<AccessControlProvider>;
  liveProvider?: LiveProvider;
  resources?: IResourceItem[];
  children?: React.ReactNode;
  routerProvider?: RouterProvider;
  refineProvider?: IRefineContextProvider;
  auditLogProvider?: Partial<AuditLogProvider>;
}

export const TestWrapper: (
  props: ITestWrapperProps,
) => React.FC<{ children: ReactNode }> = ({
  authProvider,
  dataProvider,
  resources,
  i18nProvider,
  notificationProvider,
  accessControlProvider,
  routerProvider,
  refineProvider,
  liveProvider,
  auditLogProvider,
}) => {
  return ({ children }): React.ReactElement => {
    const withRouter = routerProvider ? (
      <RouterContextProvider router={routerProvider}>
        {children}
      </RouterContextProvider>
    ) : (
      children
    );

    const withResource = resources ? (
      <ResourceContextProvider
        resources={resources.map((r) => ({
          ...r,
          meta: {
            ...r.meta,
            route: r.meta?.route,
          },
        }))}
      >
        {withRouter}
      </ResourceContextProvider>
    ) : (
      withRouter
    );
    const withData = dataProvider ? (
      <DataContextProvider dataProvider={dataProvider}>
        {withResource}
      </DataContextProvider>
    ) : (
      withResource
    );

    const withNotificationProvider = notificationProvider ? (
      <NotificationContextProvider {...notificationProvider}>
        {withData}
      </NotificationContextProvider>
    ) : (
      withData
    );

    const withAccessControl = accessControlProvider ? (
      <AccessControlContextProvider {...accessControlProvider}>
        {withNotificationProvider}
      </AccessControlContextProvider>
    ) : (
      withNotificationProvider
    );

    const withAuditLogProvider = auditLogProvider ? (
      <AuditLogContextProvider {...auditLogProvider}>
        {withAccessControl}
      </AuditLogContextProvider>
    ) : (
      withAccessControl
    );

    const withLive = liveProvider ? (
      <LiveContextProvider liveProvider={liveProvider}>
        {withAuditLogProvider}
      </LiveContextProvider>
    ) : (
      withAuditLogProvider
    );

    const withTranslation = i18nProvider ? (
      <I18nContextProvider i18nProvider={i18nProvider}>
        {withLive}
      </I18nContextProvider>
    ) : (
      withLive
    );

    const withNotification = (
      <UndoableQueueContextProvider>
        {withTranslation}
      </UndoableQueueContextProvider>
    );

    const withAuth = authProvider ? (
      <AuthProviderContextProvider
        {...authProvider}
        isProvided={Boolean(authProvider)}
      >
        {withNotification}
      </AuthProviderContextProvider>
    ) : (
      withNotification
    );

    const withRefine = refineProvider ? (
      <RefineContextProvider {...refineProvider}>
        {withAuth}
      </RefineContextProvider>
    ) : (
      withAuth
    );

    return (
      <QueryClientProvider client={queryClient}>
        {withRefine}
      </QueryClientProvider>
    );
  };
};

export {
  MockJSONServer,
  mockRouterProvider,
  MockAccessControlProvider,
  MockLiveProvider,
  mockAuthProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";

// Export the proper act function from React instead of react-dom/test-utils
export { act } from "react";
