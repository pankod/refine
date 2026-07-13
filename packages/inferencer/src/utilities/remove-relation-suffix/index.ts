import { relationRegexp } from "../../field-inferencers/relation";

/**
 * Removes the relation suffix from a string.
 * @example removeRelationSuffix("category_id") === "category"
 */
export const removeRelationSuffix = (key: string) => {
  return key.replace(relationRegexp, "");
};
