import type { CrudOperators } from "@refinedev/core";
import { mapOperator } from "../../src/utils";

describe("mapOperator", () => {
  it("should map CrudOperators to the corresponding operator strings", () => {
    const inputToExpectedOutputMap = {
      startswith: "startsWith",
      endswith: "endsWith",
      nin: "notIn",
      ncontains: "notContainsi",
      ncontainss: "notContains",
      containss: "contains",
      contains: "containsi",
      nnull: "notNull",
      eq: "eq",
      gt: "gt",
    };

    for (const [input, expectedOutput] of Object.entries(
      inputToExpectedOutputMap,
    )) {
      expect(mapOperator(input as CrudOperators)).toEqual(expectedOutput);
    }
  });
});
