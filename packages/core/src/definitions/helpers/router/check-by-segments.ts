import { isParameter } from "./is-parameter";
import { isSegmentCountsSame } from "./is-segment-counts-same";
import { removeLeadingTrailingSlashes } from "./remove-leading-trailing-slashes";
import { splitToSegments } from "./split-to-segments";

/**
 * This function if the route and resourceRoute match by segments.
 * - First, trailing and leading slashes are removed
 * - Then, the route and resourceRoute are split to segments and checked if they have the same number of segments
 * - Then, each segment is checked if it is a parameter or if it matches the resourceRoute segment
 * - If all segments match, the function returns true, otherwise false
 */
export const checkBySegments = (route: string, resourceRoute: string) => {
  const stdRoute = removeLeadingTrailingSlashes(route);
  const stdResourceRoute = removeLeadingTrailingSlashes(resourceRoute);
  // we need to check if the route and resourceRoute have the same number of segments
  // if not, we can't match them
  if (!isSegmentCountsSame(stdRoute, stdResourceRoute)) {
    return false;
  }

  const routeSegments = splitToSegments(stdRoute);
  const resourceRouteSegments = splitToSegments(stdResourceRoute);

  return resourceRouteSegments.every((segment, index) => {
    return isParameter(segment) || segment === routeSegments[index];
  });
};
