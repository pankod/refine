/**
 * If the `id` is a string, it will be wrapped in quotes.
 */
export const idQuoteWrapper = (
  id: string | number | undefined,
): string | number | undefined => {
  if (id === undefined) return id;
  if (typeof id === "string") return `"${id}"`;

  return id;
};
