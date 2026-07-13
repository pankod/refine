import type { CrudFilters } from "@refinedev/core";
import { generateFilter } from "../../src/utils/generateFilter";

describe("generateFilter", () => {
  it("returns an empty object when no filters are provided", () => {
    const result = generateFilter();
    expect(result).toEqual({});
  });

  it("creates a filter object based on the provided filters", () => {
    const filters: CrudFilters = [
      { field: "name", operator: "eq", value: "John" },
      { field: "age", operator: "gte", value: 25 },
    ];
    const result = generateFilter(filters);
    expect(result).toEqual({
      name: "John",
      age_gte: 25,
    });
  });

  it.each(["or", "and"])(
    "throws an error for unsupported '%s' operator",
    (operator) => {
      const filters: CrudFilters = [
        { operator: operator as "or" | "and", value: [] },
      ];
      expect(() => generateFilter(filters)).toThrow();
    },
  );

  it("creates a filter object with the 'q' field", () => {
    const filters: CrudFilters = [
      { field: "q", operator: "eq", value: "searchValue" },
      { field: "name", operator: "eq", value: "John" },
    ];
    const result = generateFilter(filters);
    expect(result).toEqual({
      q: "searchValue",
      name: "John",
    });
  });
});
