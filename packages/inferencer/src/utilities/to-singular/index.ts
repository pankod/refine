import pluralize from "pluralize";

export const toSingular = (str = "") => {
  return pluralize.isSingular(str) ? str : pluralize.singular(str);
};
