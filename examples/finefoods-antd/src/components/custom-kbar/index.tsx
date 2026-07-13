import { RefineKbar } from "@refinedev/kbar";
import { useOrderCustomKbarActions } from "../../hooks";

export const CustomRefineKbar = () => {
  useOrderCustomKbarActions();

  return <RefineKbar />;
};
