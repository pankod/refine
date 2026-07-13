import { splitToSegments } from "./split-to-segments";
import { removeLeadingTrailingSlashes } from "./remove-leading-trailing-slashes";
import { isParameter } from "./is-parameter";

/**
 * Picks the route parameters from the given route.
 * (e.g. /users/:id/posts/:postId => ['id', 'postId'])
 */
export const pickRouteParams = (route: string) => {
  const segments = splitToSegments(removeLeadingTrailingSlashes(route));

  return segments.flatMap((s) => {
    if (isParameter(s)) {
      return [s.slice(1)];
    }

    return [];
  });
};
