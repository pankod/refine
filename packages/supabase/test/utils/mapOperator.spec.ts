import { mapOperator } from "../../src/utils";
import type { CrudOperators } from "@refinedev/core";

describe("mapOperator", () => {
  it("should correctly map CrudOperators to their corresponding string values", () => {
    const testCases: Record<CrudOperators, string> = {
      eq: "eq",
      ne: "neq",
      lt: "lt",
      gt: "gt",
      lte: "lte",
      gte: "gte",
      in: "in",
      ina: "cs",
      nin: "not.in",
      nina: "not.cs",
      contains: "ilike",
      ncontains: "not.ilike",
      containss: "like",
      ncontainss: "not.like",
      null: "is",
      nnull: "not.is",
      or: "or",
      and: "and",
      between: "",
      nbetween: "",
      startswith: "startswith",
      nstartswith: "nstartswith",
      endswith: "endswith",
      nendswith: "nendswith",
      startswiths: "startswiths",
      nstartswiths: "nstartswiths",
      endswiths: "endswiths",
      nendswiths: "nendswiths",
    };

    for (const operator in testCases) {
      if (operator === "between" || operator === "nbetween") {
        expect(() => mapOperator(operator as CrudOperators)).toThrow(
          `Operator ${operator} is not supported`,
        );
      } else {
        expect(mapOperator(operator as CrudOperators)).toBe(
          testCases[operator as CrudOperators],
        );
      }
    }
  });

  it.each(["unsupported", null, undefined])(
    "should unsupported operator returns self",
    (operator) => {
      expect(mapOperator(operator as CrudOperators)).toBe(operator);
    },
  );
});
