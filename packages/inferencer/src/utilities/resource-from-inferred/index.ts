import pluralize from "pluralize";
import type { IResourceItem } from "@refinedev/core";

import type { InferField } from "../../types";

import { removeRelationSuffix } from "../remove-relation-suffix";

/**
 * Checks if the given property can be relation by checking the existing resources.
 */
export const resourceFromInferred = (
  field: InferField | false | null,
  resources: IResourceItem[],
): IResourceItem | undefined => {
  if (!field) {
    return undefined;
  }

  const resource = resources.find((el) => {
    const stripped = removeRelationSuffix(field.key);

    return (
      el.name === stripped ||
      el.name ===
        (pluralize.isPlural(stripped)
          ? stripped
          : pluralize.plural(stripped)) ||
      el.name ===
        (pluralize.isSingular(stripped)
          ? stripped
          : pluralize.singular(stripped))
    );
  });

  return resource;
};
