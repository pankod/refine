import type { IResourceItem } from "../../../contexts/resource/types";
import type { Action } from "../../../contexts/router/types";
import { useGetToPath } from "../use-get-to-path";

type UseToPathParams = {
  resource?: IResourceItem;
  action: Action;
  meta?: Record<string, unknown>;
};

/**
 * Returns the route for a given action and resource.
 * If resource is not provided, it will use the resource from the route.
 * If the resource is not found, it will return undefined.
 * If the action is not found, it will return undefined.
 * `meta` can be provided to compose the routes with parameters. (Can be used for nested routes.)
 */
export const useToPath = ({
  resource,
  action,
  meta,
}: UseToPathParams): string | undefined => {
  const getToPath = useGetToPath();

  return getToPath({ resource, action, meta });
};
