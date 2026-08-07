import type { QueryClient, QueryClientConfig } from "@tanstack/react-query";

import { defaultRefineOptions } from "@contexts/refine";

import type { MutationMode } from "../../../contexts/data/types";
import type { LiveModeProps } from "../../../contexts/live/types";
import type {
  IRefineContextOptions,
  IRefineOptions,
} from "../../../contexts/refine/types";

type HandleRefineOptionsProps = {
  options?: IRefineOptions;
  mutationMode?: MutationMode;
  syncWithLocation?: boolean;
  warnWhenUnsavedChanges?: boolean;
  undoableTimeout?: number;
  liveMode?: LiveModeProps["liveMode"];
  disableTelemetry?: boolean;
  disableRouteChangeHandler?: boolean;
  reactQueryClientConfig?: QueryClientConfig;
  reactQueryDevtoolConfig?: any | false;
};

type HandleRefineOptionsReturnValues = {
  optionsWithDefaults: IRefineContextOptions;
  disableTelemetryWithDefault: boolean;
  reactQueryWithDefaults: {
    clientConfig: QueryClientConfig | InstanceType<typeof QueryClient>;
  };
};

export const handleRefineOptions = ({
  options,
  disableTelemetry,
  liveMode,
  mutationMode,
  reactQueryClientConfig,
  reactQueryDevtoolConfig,
  syncWithLocation,
  undoableTimeout,
  warnWhenUnsavedChanges,
  disableRouteChangeHandler,
}: HandleRefineOptionsProps = {}): HandleRefineOptionsReturnValues => {
  const optionsWithDefaults: IRefineContextOptions = {
    breadcrumb: options?.breadcrumb,
    mutationMode:
      options?.mutationMode ??
      mutationMode ??
      defaultRefineOptions.mutationMode,
    undoableTimeout:
      options?.undoableTimeout ??
      undoableTimeout ??
      defaultRefineOptions.undoableTimeout,
    syncWithLocation:
      options?.syncWithLocation ??
      syncWithLocation ??
      defaultRefineOptions.syncWithLocation,
    warnWhenUnsavedChanges:
      options?.warnWhenUnsavedChanges ??
      warnWhenUnsavedChanges ??
      defaultRefineOptions.warnWhenUnsavedChanges,
    liveMode: options?.liveMode ?? liveMode ?? defaultRefineOptions.liveMode,
    redirect: {
      afterCreate:
        options?.redirect?.afterCreate ??
        defaultRefineOptions.redirect.afterCreate,
      afterClone:
        options?.redirect?.afterClone ??
        defaultRefineOptions.redirect.afterClone,
      afterEdit:
        options?.redirect?.afterEdit ?? defaultRefineOptions.redirect.afterEdit,
    },
    overtime: options?.overtime ?? defaultRefineOptions.overtime,
    textTransformers: {
      humanize:
        options?.textTransformers?.humanize ??
        defaultRefineOptions.textTransformers.humanize,
      plural:
        options?.textTransformers?.plural ??
        defaultRefineOptions.textTransformers.plural,
      singular:
        options?.textTransformers?.singular ??
        defaultRefineOptions.textTransformers.singular,
    },
    disableServerSideValidation:
      options?.disableServerSideValidation ??
      defaultRefineOptions.disableServerSideValidation,
    projectId: options?.projectId,
    title: {
      icon:
        typeof options?.title?.icon === "undefined"
          ? defaultRefineOptions.title.icon
          : options?.title?.icon,
      text:
        typeof options?.title?.text === "undefined"
          ? defaultRefineOptions.title.text
          : options?.title?.text,
    },
    disableRouteChangeHandler:
      options?.disableRouteChangeHandler ??
      disableRouteChangeHandler ??
      defaultRefineOptions.disableRouteChangeHandler,
  };

  const disableTelemetryWithDefault =
    options?.disableTelemetry ?? disableTelemetry ?? false;

  const reactQueryWithDefaults = {
    clientConfig:
      options?.reactQuery?.clientConfig ?? reactQueryClientConfig ?? {},
    devtoolConfig: reactQueryDevtoolConfig ?? {},
  };

  return {
    optionsWithDefaults,
    disableTelemetryWithDefault,
    reactQueryWithDefaults,
  };
};
