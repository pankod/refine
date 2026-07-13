import type { IResourceItem } from "../../../contexts/resource/types";
import type { Action } from "../../../contexts/router/types";
import { checkBySegments } from "./check-by-segments";
import { getActionRoutesFromResource } from "./get-action-routes-from-resource";
import { pickMatchedRoute } from "./pick-matched-route";

/**
 * Match the resource from the route
 * - It will calculate all possible routes for resources and their actions
 * - It will check if the route matches any of the possible routes
 * - It will return the most eligible resource and action
 */
export const matchResourceFromRoute = (
  route: string,
  resources: IResourceItem[],
): {
  found: boolean;
  resource?: IResourceItem;
  action?: Action;
  matchedRoute?: string;
} => {
  const allActionRoutes = resources.flatMap((resource) => {
    return getActionRoutesFromResource(resource, resources);
  });

  const allFound = allActionRoutes.filter((actionRoute) => {
    return checkBySegments(route, actionRoute.route);
  });

  const mostEligible = pickMatchedRoute(allFound);

  return {
    found: !!mostEligible,
    resource: mostEligible?.resource,
    action: mostEligible?.action,
    matchedRoute: mostEligible?.route,
  };
};
