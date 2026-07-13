import { useContext } from "react";

import { RefineContext } from "@contexts/refine";
import type { IRefineContextOptions } from "../../contexts/refine/types";
import type { MutationMode } from "../../contexts/data/types";

type UseMutationModeType = (
  preferredMutationMode?: MutationMode,
  preferredUndoableTimeout?: number,
) => {
  mutationMode: IRefineContextOptions["mutationMode"];
  undoableTimeout: IRefineContextOptions["undoableTimeout"];
};

/**
 * Mutation mode determines which mode the mutation runs with.
 * Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`.
 * Each mode corresponds to a different type of user experience.
 *
 * @see {@link https://refine.dev/docs/guides-and-concepts/mutation-mode} for more details.
 */
export const useMutationMode: UseMutationModeType = (
  preferredMutationMode?: MutationMode,
  preferredUndoableTimeout?: number,
) => {
  const { mutationMode, undoableTimeout } = useContext(RefineContext);

  return {
    mutationMode: preferredMutationMode ?? mutationMode,
    undoableTimeout: preferredUndoableTimeout ?? undoableTimeout,
  };
};
