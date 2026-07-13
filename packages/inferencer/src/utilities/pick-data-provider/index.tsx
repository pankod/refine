import type { IResourceItem } from "@refinedev/core";

/**
 * Picks the data provider for the given resource. Which can be overridden by the resource itself.
 */
export function pickDataProvider(
  resourceName?: string,
  dataProviderName?: string,
  resources?: IResourceItem[],
) {
  if (dataProviderName) {
    return dataProviderName;
  }

  const resource = resources?.find((item) => item.name === resourceName);

  if (resource?.meta?.dataProviderName) {
    return resource.meta.dataProviderName;
  }

  return "default";
}

/**
 * Picks the data provider for the given resource. Which can be overridden by the resource itself.
 * This is a simpler version of the above function which works with the resource item instead of the resource name and additional arguments.
 */
export const dataProviderFromResource = (resource?: IResourceItem) => {
  return resource?.meta?.dataProviderName;
};
