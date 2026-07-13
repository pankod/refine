import type { CrudFilters } from "@refinedev/core";
import { generateFilter } from "../../src/utils";

describe("generateFilter", () => {
  it("should generate correct queryFilters", () => {
    const filters: CrudFilters = [
      { field: "name", operator: "eq", value: "John" },
    ];

    const result = generateFilter(filters);

    const expectedQueryFilters = {
      name: "John",
    };

    expect(result).toEqual(expectedQueryFilters);
  });
});
