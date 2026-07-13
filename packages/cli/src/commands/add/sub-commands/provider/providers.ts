export type ProviderId =
  | "auth"
  | "live"
  | "data"
  | "access-control"
  | "notification"
  | "i18n"
  | "audit-log";

export interface Provider {
  id: ProviderId;
  title: string;
  description: string;
  fileName: string;
  templateFileName: string;
}

export const availableProviders: Provider[] = [
  {
    id: "auth",
    title: "Auth provider",
    description: "Manage user authentication and authorization",
    fileName: "auth-provider.tsx",
    templateFileName: "demo-auth-provider.tsx.template",
  },
  {
    id: "live",
    title: "Live provider",
    description: "Enable real-time updates and synchronization",
    fileName: "live-provider.tsx",
    templateFileName: "demo-live-provider.tsx.template",
  },
  {
    id: "data",
    title: "Data provider",
    description: "Communicate with your API",
    fileName: "data-provider.tsx",
    templateFileName: "demo-data-provider.tsx.template",
  },
  {
    id: "access-control",
    title: "Access Control",
    description: "Manage user permissions & roles",
    fileName: "access-control-provider.tsx",
    templateFileName: "demo-access-control-provider.tsx.template",
  },
  {
    id: "notification",
    title: "Notification provider",
    description: "Display in-app alerts and messages",
    fileName: "notification-provider.tsx",
    templateFileName: "demo-notification-provider.tsx.template",
  },
  {
    id: "i18n",
    title: "I18n provider",
    description: "Support multiple languages and locales",
    fileName: "i18n-provider.tsx",
    templateFileName: "demo-i18n-provider.tsx.template",
  },
  {
    id: "audit-log",
    title: "Audit Log provider",
    description: "Display audit logs for your resources",
    fileName: "audit-log-provider.tsx",
    templateFileName: "demo-audit-log-provider.tsx.template",
  },
];
