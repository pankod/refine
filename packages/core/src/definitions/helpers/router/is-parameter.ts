/**
 * Check if a segment is a parameter. (e.g. :id)
 */
export const isParameter = (segment: string) => {
  return segment.startsWith(":");
};
