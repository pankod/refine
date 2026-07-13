import type { CrudFilters } from "@refinedev/core";
import { generateFilter } from "../../src/utils";

describe("generateFilter", () => {
  it("should return undefined when no filters are provided", () => {
    expect(generateFilter()).toBeUndefined();
  });

  it("should return a filter formula when filters are provided", () => {
    const filters: CrudFilters = [
      { field: "name", operator: "eq", value: "John" },
      { field: "age", operator: "gte", value: 30 },
    ];
    const expected = 'AND({name}="John",{age}>=30)';
    expect(generateFilter(filters)).toBe(expected);
  });

  it("should return a complex filter formula with nested filters", () => {
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

    const expected = 'AND(OR({name}="John",{name}="Jane"),{age}>=30)';
    expect(generateFilter(filters)).toBe(expected);
  });
});
