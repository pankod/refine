export const isContainssOperator = (
  operator: any,
): operator is "containss" | "ncontainss" =>
  ["containss", "ncontainss"].includes(operator);

export const isContainsOperator = (
  operator: any,
): operator is "contains" | "ncontains" =>
  ["contains", "ncontains"].includes(operator);
