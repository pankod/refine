import type { ResourceProps } from "../../../contexts/resource/types";
import { getParentResource } from "./get-parent-resource";
import { removeLeadingTrailingSlashes } from "./remove-leading-trailing-slashes";

/**
 * Returns the parent prefix for a resource
 */
export const getParentPrefixForResource = (
  resource: ResourceProps,
  resources: ResourceProps[],
): string | undefined => {
  const parents: ResourceProps[] = [];

  let parent = getParentResource(resource, resources);

  while (parent) {
    parents.push(parent);
    parent = getParentResource(parent, resources);
  }

  if (parents.length === 0) {
    return undefined;
  }

  return `/${parents
    .reverse()
    .map((parent) => {
      return removeLeadingTrailingSlashes(parent.name);
    })
    .join("/")}`;
};
