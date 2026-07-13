export type SimpleOperators = "eq" | "ne" | "lt" | "lte" | "gt" | "gte";
import type { OperatorSymbol } from "@qualifyze/airtable-formulator";

export const simpleOperatorMapping: Record<SimpleOperators, OperatorSymbol> = {
  eq: "=",
  ne: "!=",
  lt: "<",
  lte: "<=",
  gt: ">",
  gte: ">=",
} as const;

export const isSimpleOperator = (operator: any): operator is SimpleOperators =>
  Object.keys(simpleOperatorMapping).includes(operator);
