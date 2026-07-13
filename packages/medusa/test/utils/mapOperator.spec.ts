import type { CrudOperators } from "@refinedev/core";
import { mapOperator } from "../../src/utils";

describe("mapOperator", () => {
  it("should map 'eq' operator to an empty string", () => {
    const operator = "eq";
    const result = mapOperator(operator);
    expect(result).toEqual("");
  });

  it("should throw an error for unsupported operators", () => {
    const unsupportedOperators: CrudOperators[] = [
      "ne",
      "gt",
      "gte",
      "lt",
      "lte",
      "contains",
      "ncontains",
      "containss",
      "ncontainss",
      "null",
      "nnull",
    ];

    unsupportedOperators.forEach((operator) => {
      expect(() => mapOperator(operator)).toThrow(
        `Operator ${operator} is not supported for the Medusa data provider`,
      );
    });
  });
});
