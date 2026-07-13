import type { CrudFilter } from "@refinedev/core";

import { generateLogicalFilterFormula } from "../../src/utils";
import type { LogicalFilter } from "@refinedev/core";

describe("generateLogicalFilterFormula", () => {
  it("should generate a formula for simple operators", () => {
    const filter: CrudFilter = {
      field: "age",
      operator: "gte",
      value: 30,
    };
    const expected = [">=", { field: "age" }, 30];

    expect(generateLogicalFilterFormula(filter)).toEqual(expected);
  });

  it("should generate a formula for contains operators", () => {
    const filter: CrudFilter = {
      field: "name",
      operator: "contains",
      value: "John",
    };
    const expected = [
      "!=",
      ["FIND", ["LOWER", "John"], ["LOWER", { field: "name" }]],
      0,
    ];

    expect(generateLogicalFilterFormula(filter)).toEqual(expected);
  });

  it("should generate a formula for null operators", () => {
    const filter = { field: "email", operator: "null" } as LogicalFilter;
    const expected = ["=", { field: "email" }, ["BLANK"]];

    expect(generateLogicalFilterFormula(filter)).toEqual(expected);
  });

  it("should generate a formula for nnull operators", () => {
    const filter = { field: "email", operator: "nnull" } as LogicalFilter;
    const expected = ["!=", { field: "email" }, ["BLANK"]];

    expect(generateLogicalFilterFormula(filter)).toEqual(expected);
  });

  it("should throw an error for unsupported operators", () => {
    const filter = {
      field: "age",
      operator: "unsupported",
      value: 30,
    } as unknown as LogicalFilter;

    expect(() => generateLogicalFilterFormula(filter)).toThrow(
      "Operator unsupported is not supported for the Airtable data provider",
    );
  });
});
