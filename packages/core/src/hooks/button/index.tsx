import { useActionableButton } from "./actionable-button";
import { useNavigationButton } from "./navigation-button";

import type { NavigationButtonProps } from "./navigation-button";
import type { Prettify } from "../../contexts/data/types";

export { useDeleteButton } from "./delete-button";

export { useRefreshButton } from "./refresh-button";

export const useShowButton = (
  props: Prettify<Omit<NavigationButtonProps, "action">>,
) => useNavigationButton({ ...props, action: "show" });

export const useEditButton = (
  props: Prettify<Omit<NavigationButtonProps, "action">>,
) => useNavigationButton({ ...props, action: "edit" });

export const useCloneButton = (
  props: Prettify<Omit<NavigationButtonProps, "action">>,
) => useNavigationButton({ ...props, action: "clone" });

export const useCreateButton = (
  props: Prettify<Omit<NavigationButtonProps, "action" | "id">>,
) => useNavigationButton({ ...props, action: "create" });

export const useListButton = (
  props: Prettify<Omit<NavigationButtonProps, "action" | "id">>,
) => useNavigationButton({ ...props, action: "list" });

export const useSaveButton = () => useActionableButton({ type: "save" });

export const useExportButton = () => useActionableButton({ type: "export" });

export const useImportButton = () => useActionableButton({ type: "import" });
