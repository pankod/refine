import { useParsed } from "../../router/use-parsed";
import type { Action } from "../../../contexts/router/types";

/**
 * Returns the action from the router.
 *
 * Additionally, if an action is provided as a parameter, it will be used instead of the inferred action.
 *
 * @internal usage only
 */
export const useAction = (action?: Action) => {
  const parsed = useParsed();

  return action ?? parsed.action;
};
