/**
 * Split a path to segments.
 */
export const splitToSegments = (path: string) => {
  const segments = path.split("/").filter((segment) => segment !== "");
  return segments;
};
