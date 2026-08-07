import { useParsed } from "../../router/use-parsed";
import type { BaseKey } from "../../../contexts/data/types";

/**
 * Returns the id from the router.
 *
 * Additionally, if an id is provided as a parameter, it will be used instead of the inferred id.
 *
 * @internal usage only
 */
export const useId = (id?: BaseKey) => {
  const parsed = useParsed();

  return id ?? parsed.id;
};
