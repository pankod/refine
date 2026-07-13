import { useContext } from "react";

import { RefineContext } from "@contexts/refine";

export const useRefineContext = () => {
  const {
    mutationMode,
    syncWithLocation,
    undoableTimeout,
    warnWhenUnsavedChanges,
    liveMode,
    onLiveEvent,
    options,
    __initialized,
  } = useContext(RefineContext);

  return {
    __initialized,
    mutationMode,
    syncWithLocation,
    undoableTimeout,
    warnWhenUnsavedChanges,
    liveMode,
    onLiveEvent,
    options,
  };
};
