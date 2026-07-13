import type { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators) => {
  switch (operator) {
    case "startswith":
      return "startsWith";
    case "endswith":
      return "endsWith";
    case "nin":
      return "notIn";
    case "ncontains":
      return "notContainsi";
    case "ncontainss":
      return "notContains";
    case "containss":
      return "contains";
    case "contains":
      return "containsi";
    case "nnull":
      return "notNull";
  }

  return operator;
};
