import { type ComparisonOperator, CondOperator } from "@nestjsx/crud-request";
import type { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators): ComparisonOperator => {
  switch (operator) {
    case "and":
      return "$and";
    case "or":
      return "$or";
    case "eq":
      return CondOperator.EQUALS;
    case "ne":
      return CondOperator.NOT_EQUALS;
    case "lt":
      return CondOperator.LOWER_THAN;
    case "gt":
      return CondOperator.GREATER_THAN;
    case "lte":
      return CondOperator.LOWER_THAN_EQUALS;
    case "gte":
      return CondOperator.GREATER_THAN_EQUALS;
    case "in":
      return CondOperator.IN;
    case "nin":
      return CondOperator.NOT_IN;
    case "contains":
      return CondOperator.CONTAINS_LOW;
    case "ncontains":
      return CondOperator.EXCLUDES_LOW;
    case "containss":
      return CondOperator.CONTAINS;
    case "ncontainss":
      return CondOperator.EXCLUDES;
    case "null":
      return CondOperator.IS_NULL;
    case "nnull":
      return CondOperator.NOT_NULL;
    case "startswith":
      return CondOperator.STARTS_LOW;
    case "startswiths":
      return CondOperator.STARTS;
    case "endswith":
      return CondOperator.ENDS_LOW;
    case "endswiths":
      return CondOperator.ENDS;
    case "between":
      return CondOperator.BETWEEN;
  }

  return CondOperator.EQUALS;
};
