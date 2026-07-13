import pluralize from "pluralize";

export const toPlural = (str = "") => {
  return pluralize.isPlural(str) ? str : pluralize.plural(str);
};
