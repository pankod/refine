import type { ResourceActionRoute } from "./get-action-routes-from-resource";
import { isParameter } from "./is-parameter";
import { removeLeadingTrailingSlashes } from "./remove-leading-trailing-slashes";
import { splitToSegments } from "./split-to-segments";

/**
 * Picks the most eligible route from the given matched routes.
 * - If there's only one route, it returns it.
 * - If there's more than one route, it picks the best non-greedy match.
 */
export const pickMatchedRoute = (
  routes: ResourceActionRoute[],
): ResourceActionRoute | undefined => {
  // these routes are all matched, we should pick the least parametrized one

  // no routes, no match
  if (routes.length === 0) {
    return undefined;
  }

  // no need to calculate the route segments if there's only one route
  if (routes.length === 1) {
    return routes[0];
  }

  // remove trailing and leading slashes
  // split them to segments
  const sanitizedRoutes = routes.map((route) => ({
    ...route,
    splitted: splitToSegments(removeLeadingTrailingSlashes(route.route)),
  }));

  // at this point, before calling this function, we already checked for segment lenghts and expect all of them to be the same
  const segmentsCount = sanitizedRoutes[0]?.splitted.length ?? 0;

  let eligibleRoutes: Array<(typeof sanitizedRoutes)[number]> = [
    ...sanitizedRoutes,
  ];

  // loop through the segments
  for (let i = 0; i < segmentsCount; i++) {
    const nonParametrizedRoutes = eligibleRoutes.filter(
      (route) => !isParameter(route.splitted[i]),
    );

    if (nonParametrizedRoutes.length === 0) {
      // keep the eligible routes as they are
      continue;
    }
    if (nonParametrizedRoutes.length === 1) {
      // no need to continue, we found the route
      eligibleRoutes = nonParametrizedRoutes;
      break;
    }

    // we have more than one non-parametrized route, we need to check the next segment
    eligibleRoutes = nonParametrizedRoutes;
  }

  return eligibleRoutes[0];
};
