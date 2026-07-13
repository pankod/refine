import type { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "eq":
      return "";
    default:
      throw Error(
        `Operator ${operator} is not supported for the Medusa data provider`,
      );
  }
};
