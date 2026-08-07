/** Notistack */
/**
 * Part of the following typing and documentation is from material-ui/src/Snackbar/Snackbar.d.ts
 */
export {
  SnackbarProvider,
  withSnackbar,
  SnackbarContent as NotistackSnackbarContent,
  useSnackbar,
} from "notistack";

export type {
  WithSnackbarProps,
  SnackbarKey,
  ProviderContext,
  VariantType,
  CloseReason,
  SnackbarMessage,
  SnackbarAction,
  SnackbarContentCallback,
  TransitionCloseHandler,
  TransitionEnterHandler,
  TransitionHandler,
  ContainerClassKey as NotistackContainerClassKey,
  VariantClassKey,
  CombinedClassKey,
  SnackbarOrigin,
  IconVariant,
  TransitionHandlerProps,
  SnackbarContentProps,
  SnackbarProps,
  SharedProps,
  OptionsObject,
  SnackbarProviderProps,
} from "notistack";

export * from "./components/index.js";
export * from "./hooks/index.js";
export * from "./theme/index.js";
export * from "./providers/index.js";
export * from "./contexts/index.js";
