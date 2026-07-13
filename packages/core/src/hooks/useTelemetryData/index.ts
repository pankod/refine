import { useContext } from "react";

import { AccessControlContext } from "@contexts/accessControl";
import { AuditLogContext } from "@contexts/auditLog";
import { DataContext } from "@contexts/data";
import { I18nContext } from "@contexts/i18n";
import { LiveContext } from "@contexts/live";
import { NotificationContext } from "@contexts/notification";
import { RouterContext } from "@contexts/router";
import { useResourceParams } from "@hooks/use-resource-params";

import { useIsExistAuthentication, useRefineContext } from "..";
import type { ITelemetryData } from "../../components/telemetry/types";

// It reads and updates from package.json during build. ref: tsup.config.ts
const REFINE_VERSION = "1.0.0";

export const useTelemetryData = (): ITelemetryData => {
  const auth = useIsExistAuthentication();
  const auditLogContext = useContext(AuditLogContext);
  const { liveProvider } = useContext(LiveContext);
  const routerContext = useContext(RouterContext);
  const dataContext = useContext(DataContext);
  const { i18nProvider } = useContext(I18nContext);
  const notificationContext = useContext(NotificationContext);
  const accessControlContext = useContext(AccessControlContext);
  const { resources } = useResourceParams();
  const refineOptions = useRefineContext();

  const auditLog =
    !!auditLogContext.create ||
    !!auditLogContext.get ||
    !!auditLogContext.update;

  const live =
    !!liveProvider?.publish ||
    !!liveProvider?.subscribe ||
    !!liveProvider?.unsubscribe;

  const router =
    !!routerContext.Link ||
    !!routerContext.go ||
    !!routerContext.back ||
    !!routerContext.parse;

  const data = !!dataContext;

  const i18n =
    !!i18nProvider?.changeLocale ||
    !!i18nProvider?.getLocale ||
    !!i18nProvider?.translate;

  const notification =
    !!notificationContext.close || !!notificationContext.open;

  const accessControl = !!accessControlContext.can;

  const projectId = refineOptions?.options?.projectId;

  return {
    providers: {
      auth,
      auditLog,
      live,
      router,
      data,
      i18n,
      notification,
      accessControl,
    },
    version: REFINE_VERSION,
    resourceCount: resources.length,
    projectId,
  };
};
