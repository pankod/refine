import React from "react";

import { useQuerySubscription } from "@refinedev/devtools-internal";
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { RouteChangeHandler } from "@components";
import { Telemetry } from "@components/telemetry";
import { handleRefineOptions } from "@definitions";
import { useDeepMemo } from "@hooks/deepMemo";

import { AccessControlContextProvider } from "../../../contexts/accessControl";
import { AuditLogContextProvider } from "../../../contexts/auditLog";
import { AuthProviderContextProvider } from "../../../contexts/auth";
import { DataContextProvider } from "../../../contexts/data";
import { I18nContextProvider } from "../../../contexts/i18n";
import { LiveContextProvider } from "../../../contexts/live";
import { NotificationContextProvider } from "../../../contexts/notification";
import { RefineContextProvider } from "../../../contexts/refine";
import { ResourceContextProvider } from "../../../contexts/resource";
import { RouterContextProvider } from "../../../contexts/router";
import { UndoableQueueContextProvider } from "../../../contexts/undoableQueue";
import { UnsavedWarnContextProvider } from "../../../contexts/unsavedWarn";

import type { RefineProps } from "../../../contexts/refine/types";
import { useRouterMisuseWarning } from "../../../hooks/router/use-router-misuse-warning/index";

/**
 * {@link https://refine.dev/docs/api-reference/core/components/refine-config `<Refine> component`} is the entry point of a refine app.
 * It is where the highest level of configuration of the app occurs.
 * Only a dataProvider is required to bootstrap the app. After adding a dataProvider, resources can be added as property.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/components/refine-config} for more details.
 */
export const Refine: React.FC<RefineProps> = ({
  authProvider,
  dataProvider,
  routerProvider,
  notificationProvider,
  accessControlProvider,
  auditLogProvider,
  resources,
  children,
  liveProvider,
  i18nProvider,
  onLiveEvent,
  options,
}) => {
  const {
    optionsWithDefaults,
    disableTelemetryWithDefault,
    reactQueryWithDefaults,
  } = handleRefineOptions({
    options,
  });

  const disableRouteChangeHandler =
    optionsWithDefaults.disableRouteChangeHandler;

  const queryClient = useDeepMemo(() => {
    if (reactQueryWithDefaults.clientConfig instanceof QueryClient) {
      return reactQueryWithDefaults.clientConfig;
    }

    return new QueryClient({
      ...reactQueryWithDefaults.clientConfig,
      defaultOptions: {
        ...reactQueryWithDefaults.clientConfig.defaultOptions,
        queries: {
          refetchOnWindowFocus: false,
          placeholderData: keepPreviousData,
          ...reactQueryWithDefaults.clientConfig.defaultOptions?.queries,
        },
      },
    });
  }, [reactQueryWithDefaults.clientConfig]);

  useQuerySubscription(queryClient);

  const useNotificationProviderValues = React.useMemo(() => {
    return typeof notificationProvider === "function"
      ? notificationProvider
      : () => notificationProvider;
  }, [notificationProvider]);

  const notificationProviderContextValues = useNotificationProviderValues();

  /**
   * Warn our users if they are using the old way of routing in the wrong prop.
   */
  useRouterMisuseWarning(routerProvider);
  /** */

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider {...notificationProviderContextValues}>
        <AuthProviderContextProvider
          {...(authProvider ?? {})}
          isProvided={Boolean(authProvider)}
        >
          <DataContextProvider dataProvider={dataProvider}>
            <LiveContextProvider liveProvider={liveProvider}>
              <RouterContextProvider router={routerProvider}>
                <ResourceContextProvider resources={resources ?? []}>
                  <I18nContextProvider i18nProvider={i18nProvider}>
                    <AccessControlContextProvider
                      {...(accessControlProvider ?? {})}
                    >
                      <AuditLogContextProvider {...(auditLogProvider ?? {})}>
                        <UndoableQueueContextProvider>
                          <RefineContextProvider
                            mutationMode={optionsWithDefaults.mutationMode}
                            warnWhenUnsavedChanges={
                              optionsWithDefaults.warnWhenUnsavedChanges
                            }
                            syncWithLocation={
                              optionsWithDefaults.syncWithLocation
                            }
                            undoableTimeout={
                              optionsWithDefaults.undoableTimeout
                            }
                            liveMode={optionsWithDefaults.liveMode}
                            onLiveEvent={onLiveEvent}
                            options={optionsWithDefaults}
                          >
                            <UnsavedWarnContextProvider>
                              <React.Fragment>
                                {children}
                                {!disableTelemetryWithDefault && <Telemetry />}
                                {!disableRouteChangeHandler && (
                                  <RouteChangeHandler />
                                )}
                              </React.Fragment>
                            </UnsavedWarnContextProvider>
                          </RefineContextProvider>
                        </UndoableQueueContextProvider>
                      </AuditLogContextProvider>
                    </AccessControlContextProvider>
                  </I18nContextProvider>
                </ResourceContextProvider>
              </RouterContextProvider>
            </LiveContextProvider>
          </DataContextProvider>
        </AuthProviderContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  );
};
