/**
 * Remove leading and trailing slashes from a route.
 */
export const removeLeadingTrailingSlashes = (route: string) => {
  return route.replace(/^\/|\/$/g, "");
};
