import type { CrudFilter } from "@refinedev/core";
import { getRemovedFilters } from ".";

describe("getRemovedFilters", () => {
  it("should return an empty array when no filters are removed", () => {
    const nextFilters: CrudFilter[] = [
      { field: "name", value: "John", operator: "eq" },
      { field: "age", value: 30, operator: "eq" },
    ];
    const coreFilters: CrudFilter[] = [
      { field: "name", value: "John", operator: "eq" },
      { field: "age", value: 30, operator: "eq" },
    ];
    const removedFilters = getRemovedFilters({ nextFilters, coreFilters });
    expect(removedFilters).toEqual([]);
  });

  it("should return an array of removed filters", () => {
    const nextFilters: CrudFilter[] = [
      { field: "name", value: "John", operator: "eq" },
      { field: "age", value: 30, operator: "eq" },
    ];
    const coreFilters: CrudFilter[] = [
      { field: "name", value: "John", operator: "eq" },
      { field: "age", value: 30, operator: "eq" },
      { field: "city", value: "New York", operator: "eq" },
    ];
    const removedFilters = getRemovedFilters({ nextFilters, coreFilters });
    expect(removedFilters).toEqual([
      { field: "city", value: undefined, operator: "eq" },
    ]);
  });

  it("should remove and filter with empty value", () => {
    const nextFilters: CrudFilter[] = [
      { field: "name", value: "John", operator: "eq" },
    ];
    const coreFilters: CrudFilter[] = [
      { field: "name", value: "John", operator: "eq" },
      {
        key: "createdAt",
        operator: "and",
        value: [
          { field: "createdAt", operator: "gte", value: "2021-01-01" },
          { field: "createdAt", operator: "lte", value: "2021-12-31" },
        ],
      },
    ];
    const removedFilters = getRemovedFilters({ nextFilters, coreFilters });
    expect(removedFilters).toEqual([
      { key: "createdAt", operator: "and", value: [] },
    ]);
  });
});
