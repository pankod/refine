import { splitToSegments } from "./split-to-segments";

/**
 * Checks if the both routes have the same number of segments.
 */
export const isSegmentCountsSame = (route: string, resourceRoute: string) => {
  const routeSegments = splitToSegments(route);
  const resourceRouteSegments = splitToSegments(resourceRoute);

  return routeSegments.length === resourceRouteSegments.length;
};
