import React, { createContext } from "react";
import { KBarProvider, type KBarProviderProps } from "kbar";

import type { CommandBar } from "./components/index.js";

interface IKBarProviderProps extends KBarProviderProps {
  commandBarProps?: React.ComponentProps<typeof CommandBar>;
}

export const RefineKbarPropsContext = createContext<
  IKBarProviderProps["commandBarProps"]
>({});

export const RefineKbarProvider: React.FunctionComponent<
  IKBarProviderProps & { children: React.ReactNode }
> = ({ children, commandBarProps }) => {
  return (
    <RefineKbarPropsContext.Provider value={commandBarProps ?? {}}>
      <KBarProvider>{children}</KBarProvider>
    </RefineKbarPropsContext.Provider>
  );
};

export type {
  Action,
  ActionGroup,
  ActionId,
  ActionImpl,
  ActionInterface,
  ActionSection,
  ActionStore,
  ActionTree,
  History,
  HistoryItem,
  IKBarContext,
  KBarOptions,
  KBarProviderProps,
  KBarQuery,
  KBarState,
} from "kbar";

export {
  KBAR_LISTBOX,
  KBarAnimator,
  KBarContext,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  NO_GROUP,
  Priority,
  VisualState,
  createAction,
  getListboxItemId,
  useKBar,
  useMatches,
  useRegisterActions,
} from "kbar";

export { useRefineKbar } from "./hooks/index.js";
export { RefineKbar } from "./components/index.js";
