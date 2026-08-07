import type { IResourceItem } from "../../../contexts/resource/types";

/**
 * Returns the parent resource of the given resource.
 * Uses the `resource.meta.parent` property.
 */
export const getParentResource = (
  resource: IResourceItem,
  resources: IResourceItem[],
): IResourceItem | undefined => {
  const parentName = resource.meta?.parent;

  if (!parentName) {
    return undefined;
  }

  const parentResource = resources.find(
    (resource) => (resource.identifier ?? resource.name) === parentName,
  );

  /**
   * If the parent resource is not found, we return a resource object with the name of the parent resource.
   * Because we still want to have nesting and prefixing for the resource even if the parent is not explicitly defined.
   */
  return parentResource ?? { name: parentName };
};
