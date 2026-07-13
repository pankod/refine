import { useContext } from "react";

import { RefineContext } from "@contexts/refine";

import type { LiveModeProps } from "../../../contexts/live/types";
import type { IRefineContext } from "../../../contexts/refine/types";

export const useLiveMode = (
  liveMode: LiveModeProps["liveMode"],
): LiveModeProps["liveMode"] => {
  const { liveMode: liveModeFromContext } =
    useContext<IRefineContext>(RefineContext);

  return liveMode ?? liveModeFromContext;
};
