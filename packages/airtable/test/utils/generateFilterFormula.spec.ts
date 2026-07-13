import type { CrudFilters } from "@refinedev/core";
import { generateFilterFormula } from "../../src/utils";

describe("generateFilterFormula", () => {
  it("should return an empty array when no filters are provided", () => {
    expect(generateFilterFormula([])).toEqual([]);
  });

  it("should return a formula array when filters are provided", () => {
    const filters: CrudFilters = [
      { field: "name", operator: "eq", value: "John" },
      { field: "age", operator: "gte", value: 30 },
    ];
    const expected = [
      ["=", { field: "name" }, "John"],
      [">=", { field: "age" }, 30],
    ];

    expect(generateFilterFormula(filters)).toEqual(expected);
  });

  it("should return a complex formula array with nested filters", () => {
    const filters: CrudFilters = [
      {
        operator: "or",
        value: [
          { field: "name", operator: "eq", value: "John" },
          { field: "name", operator: "eq", value: "Jane" },
        ],
      },
      { field: "age", operator: "gte", value: 30 },
    ];
    const expected = [
      [
        "OR",
        ["=", { field: "name" }, "John"],
        ["=", { field: "name" }, "Jane"],
      ],
      [">=", { field: "age" }, 30],
    ];

    expect(generateFilterFormula(filters)).toEqual(expected);
  });
});
