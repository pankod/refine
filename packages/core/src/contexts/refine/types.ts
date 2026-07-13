import React, { type JSX, type ReactNode } from "react";

import type { QueryClient, QueryClientConfig } from "@tanstack/react-query";

import type { RedirectAction } from "../../hooks/form/types";
import type { UseLoadingOvertimeRefineContext } from "../../hooks/useLoadingOvertime";
import type { AccessControlProvider } from "../accessControl/types";
import type { AuditLogProvider } from "../auditLog/types";
import type { AuthProvider } from "../auth/types";
import type { DataProvider, DataProviders, MutationMode } from "../data/types";
import type { I18nProvider } from "../i18n/types";
import type { LiveModeProps, LiveProvider } from "../live/types";
import type { NotificationProvider } from "../notification/types";
import type { ResourceProps } from "../resource/types";
import type { RouterProvider } from "../router/types";

export type TitleProps = {
  collapsed: boolean;
};

export type LayoutProps = {
  Sider?: React.FC<{
    Title?: React.FC<TitleProps>;
    render?: (props: {
      /**
       * menu items created depending on the `resources` defined in `<Refine>` component.
       */
      items: React.JSX.Element[];
      /**
       * logout button if you have `authProvider` defined and the current session is authenticated.
       */
      logout: React.ReactNode;
      /**
       * Whether the sider is collapsed or not.
       */
      collapsed: boolean;
    }) => React.ReactNode;
    meta?: Record<string, unknown>;
  }>;
  Header?: React.FC;
  Title?: React.FC<TitleProps>;
  Footer?: React.FC;
  OffLayoutArea?: React.FC;
  children?: ReactNode;
};

export type TextTransformers = {
  /**
   * Convert a camelized/dasherized/underscored string into a humanized one
   * @example
   * humanize("some_name") => "Some name"
   */
  humanize?: (text: string) => string;
  /**
   * Pluralize a word
   * @example
   * plural('regex') => "regexes"
   */
  plural?: (word: string) => string;
  /**
   * Singularize a word
   * @example
   * singular('singles') => "single"
   */
  singular?: (word: string) => string;
};

export interface IRefineOptions {
  breadcrumb?: ReactNode;
  mutationMode?: MutationMode;
  syncWithLocation?: boolean;
  warnWhenUnsavedChanges?: boolean;
  undoableTimeout?: number;
  liveMode?: LiveModeProps["liveMode"];
  disableTelemetry?: boolean;
  disableRouteChangeHandler?: boolean;
  redirect?: {
    afterCreate?: RedirectAction;
    afterClone?: RedirectAction;
    afterEdit?: RedirectAction;
  };
  reactQuery?: {
    clientConfig?: QueryClientConfig | InstanceType<typeof QueryClient>;
  };
  overtime?: UseLoadingOvertimeRefineContext;
  textTransformers?: TextTransformers;
  /**
   * Disables server-side validation globally for the useForm hook
   * @default false
   * @see {@link https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/}
   */
  disableServerSideValidation?: boolean;
  /**
   * The project id of your refine project. Will be set automatically. Don't modify.
   */
  projectId?: string;
  /**
   * Icon and name for the app title. These values are used as default values in the <ThemedLayout /> and <AuthPage /> components.
   * By default, `icon` is the Refine logo and `text` is "Refine Project".
   */
  title?: {
    icon?: React.ReactNode;
    text?: React.ReactNode;
  };
}

export interface IRefineContextOptions {
  breadcrumb?: ReactNode;
  mutationMode: MutationMode;
  syncWithLocation: boolean;
  warnWhenUnsavedChanges: boolean;
  undoableTimeout: number;
  liveMode: LiveModeProps["liveMode"];
  redirect: {
    afterCreate: RedirectAction;
    afterClone: RedirectAction;
    afterEdit: RedirectAction;
  };
  overtime: UseLoadingOvertimeRefineContext;
  textTransformers: Required<TextTransformers>;
  disableServerSideValidation: boolean;
  disableRouteChangeHandler: boolean;
  projectId?: string;
  title: {
    icon?: React.ReactNode;
    text?: React.ReactNode;
  };
}

export interface IRefineContext {
  __initialized?: boolean;
  mutationMode: MutationMode;
  warnWhenUnsavedChanges: boolean;
  syncWithLocation: boolean;
  undoableTimeout: number;
  liveMode: LiveModeProps["liveMode"];
  onLiveEvent?: LiveModeProps["onLiveEvent"];
  options: IRefineContextOptions;
}

export interface IRefineContextProvider {
  __initialized?: boolean;
  mutationMode: MutationMode;
  warnWhenUnsavedChanges: boolean;
  syncWithLocation: boolean;
  undoableTimeout: number;
  liveMode: LiveModeProps["liveMode"];
  onLiveEvent?: LiveModeProps["onLiveEvent"];
  options: IRefineContextOptions;
  children?: ReactNode;
}

export interface RefineProps {
  children?: React.ReactNode;
  /**
   * `resources` is the predefined interaction points for a refine app. A resource represents an entity in an endpoint in the API.
   * While this is not a required property, it is used in resource detection and creation of routes for the app.
   * @type [`ResourceProps[]`](https://refine.dev/docs/api-reference/core/components/refine-config/#resources)
   */
  resources?: ResourceProps[];
  /**
   * Router bindings for **refine**. A simple interface for **refine** to interact with your router in a flexible way.
   * @type [`RouterProvider`](https://refine.dev/docs/routing/router-provider/)
   */
  routerProvider?: RouterProvider;
  /**
   * A `dataProvider` is the place where a refine app communicates with an API. Data providers also act as adapters for refine, making it possible for it to consume different API's and data services.
   * @type [`DataProvider` | `DataProviders`](https://refine.dev/docs/api-reference/core/providers/data-provider/)
   */
  dataProvider?: DataProvider | DataProviders;
  /**
   * `authProvider` handles authentication logic like login, logout flow and checking user credentials. It is an object with methods that refine uses when necessary.
   * @type [`AuthProvider`](https://refine.dev/docs/api-reference/core/providers/auth-provider/)
   */
  authProvider?: AuthProvider;
  /**
   * **refine** lets you add Realtime support to your app via `liveProvider`. It can be used to update and show data in Realtime throughout your app.
   * @type [`LiveProvider`](https://refine.dev/docs/api-reference/core/providers/live-provider/)
   */
  liveProvider?: LiveProvider;
  /**
   * `notificationProvider` handles notification logics. It is an object with methods that refine uses when necessary.
   * @type [`NotificationProvider` | `(() => NotificationProvider)`](https://refine.dev/docs/api-reference/core/providers/notification-provider/)
   */
  notificationProvider?: NotificationProvider | (() => NotificationProvider);
  /**
   * `accessControlProvider` is the entry point for implementing access control for refine apps.
   * @type [`AccessControlProvider`](https://refine.dev/docs/api-reference/core/providers/accessControl-provider/)
   */
  accessControlProvider?: AccessControlProvider;
  /**
   * **refine** allows you to track changes in your data and keep track of who made the changes.
   * @type [`AuditLogProvider`](https://refine.dev/docs/api-reference/core/providers/audit-log-provider#overview)
   */
  auditLogProvider?: AuditLogProvider;
  /**
   * `i18nProvider` property lets you add i18n support to your app. Making you able to use any i18n framework.
   * @type [`i18nProvider`](https://refine.dev/docs/api-reference/core/providers/i18n-provider/)
   */
  i18nProvider?: I18nProvider;
  /**
   * Callback to handle all live events.
   * @type [`(event: LiveEvent) => void`](https://refine.dev/docs/api-reference/core/providers/live-provider/#onliveevent)
   */
  onLiveEvent?: LiveModeProps["onLiveEvent"];
  /**
   * `options` is used to configure the app.
   * @type [`IRefineOptions`](https://refine.dev/docs/api-reference/core/components/refine-config/#options)
   * */
  options?: IRefineOptions;
}
