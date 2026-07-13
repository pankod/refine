import type { LogicalFilter } from "@refinedev/core";
import { isContainsOperator, isContainssOperator } from "./isContainsOperator";
import { isSimpleOperator, simpleOperatorMapping } from "./isSimpleOperator";
import type { Formula } from "@qualifyze/airtable-formulator";

export const generateLogicalFilterFormula = (
  filter: LogicalFilter,
): Formula => {
  const { field, operator, value } = filter;

  if (isSimpleOperator(operator)) {
    return [simpleOperatorMapping[operator], { field }, value];
  }

  if (isContainssOperator(operator)) {
    const mappedOperator = {
      containss: "!=",
      ncontainss: "=",
    } as const;

    return [mappedOperator[operator], ["FIND", value, { field }], 0];
  }

  if (isContainsOperator(operator)) {
    const mappedOperator = {
      contains: "!=",
      ncontains: "=",
    } as const;

    const find = ["FIND", ["LOWER", value], ["LOWER", { field }]] as Formula;

    return [mappedOperator[operator], find, 0];
  }

  if (operator === "null") {
    return ["=", { field }, ["BLANK"]];
  }

  if (operator === "nnull") {
    return ["!=", { field }, ["BLANK"]];
  }

  throw Error(
    `Operator ${operator} is not supported for the Airtable data provider`,
  );
};
