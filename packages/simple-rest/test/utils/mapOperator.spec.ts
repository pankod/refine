import type { CrudOperators } from "@refinedev/core";
import { mapOperator } from "../../src/utils";

describe("mapOperator", () => {
  it("should return correct mapping for given operator", () => {
    const operatorMappings: Partial<Record<CrudOperators, string>> = {
      ne: "_ne",
      gte: "_gte",
      lte: "_lte",
      contains: "_like",
      eq: "",
      and: "",
      between: "",
      containss: "",
      endswith: "",
      endswiths: "",
      gt: "",
      in: "",
      lt: "",
      ncontains: "",
      ncontainss: "",
      nendswith: "",
      nendswiths: "",
      nnull: "",
      nin: "",
      nbetween: "",
      nstartswith: "",
      nstartswiths: "",
      null: "",
      or: "",
      startswith: "",
      startswiths: "",
    };

    for (const operator in operatorMappings) {
      const expectedResult = operatorMappings[operator as CrudOperators];
      expect(mapOperator(operator as CrudOperators)).toEqual(expectedResult);
    }
  });

  it.each(["unsupported", "", undefined, null])(
    "should return empty string for %s operator ",
    (operator) => {
      expect(mapOperator(operator as CrudOperators)).toEqual("");
    },
  );
});
