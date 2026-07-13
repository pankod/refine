export type ITelemetryData = {
  providers: {
    auth?: boolean;
    data?: boolean;
    router?: boolean;
    notification?: boolean;
    live?: boolean;
    auditLog?: boolean;
    i18n?: boolean;
    accessControl?: boolean;
  };
  version: string;
  resourceCount: number;
  projectId?: string;
};
