import { useContext } from "react";

import { ResourceContext } from "@contexts/resource";

import type { IResourceItem } from "../../../contexts/resource/types";
import { pickResource } from "../../../definitions/helpers/pick-resource";
import { useParsed } from "../../router/use-parsed";

/**
 * Matches the resource by identifier.
 * If not provided, the resource from the route will be returned.
 * If your resource does not explicitly define an identifier, the resource name will be used.
 */
export type UseResourceParam = string | undefined;

export type SelectReturnType<T extends boolean> = T extends true
  ? { resource: IResourceItem; identifier: string }
  : { resource: IResourceItem; identifier: string } | undefined;

export type UseResourceReturnType = {
  resources: IResourceItem[];
  resource?: IResourceItem;
  select: <T extends boolean = true>(
    resourceName: string,
    force?: T,
  ) => SelectReturnType<T>;
  identifier?: string;
};

type UseResourceReturnTypeWithResource = UseResourceReturnType & {
  resource: IResourceItem;
  identifier: string;
};

/**
 * @internal
 */
export function useResource(): UseResourceReturnType;
/**
 * @internal
 */
export function useResource<TIdentifier = UseResourceParam>(
  identifier: TIdentifier,
): TIdentifier extends NonNullable<UseResourceParam>
  ? UseResourceReturnTypeWithResource
  : UseResourceReturnType;
/**
 *
 * @internal
 *
 * `useResource` is used to get `resources` that are defined as property of the `<Refine>` component.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/resource/useResource} for more details.
 *
 */
export function useResource(args?: UseResourceParam): UseResourceReturnType {
  const { resources } = useContext(ResourceContext);

  const params = useParsed();

  const select = <T extends boolean = true>(
    resourceName: string,
    force = true,
  ): SelectReturnType<T> => {
    const pickedResource = pickResource(resourceName, resources);

    if (pickedResource) {
      return {
        resource: pickedResource,
        identifier: pickedResource.identifier ?? pickedResource.name,
      } as SelectReturnType<T>;
    }

    if (force) {
      const resource: IResourceItem = {
        name: resourceName,
        identifier: resourceName,
      };

      const identifier = resource.identifier ?? resource.name;

      return {
        resource,
        identifier,
      } as SelectReturnType<T>;
    }

    return undefined as SelectReturnType<T>;
  };

  let resource: IResourceItem | undefined = undefined;
  // we try to pick the resource from props first
  const identifier = args;
  if (identifier) {
    const pickedFromProps = pickResource(identifier, resources);
    if (pickedFromProps) {
      resource = pickedFromProps;
    } else {
      resource = {
        name: identifier,
      };
    }
  } else if (params?.resource) {
    resource = params.resource;
  }

  return {
    resources,
    resource,
    select,
    identifier: resource?.identifier ?? resource?.name,
  };
}
