import type { CrudSorting } from "@refinedev/core";
import { generateSort } from "../../src/utils";

describe("generateSort", () => {
  it("should return undefined if no sorters are provided", () => {
    expect(generateSort(undefined)).toBeUndefined();
  });

  it("should generate an array of sorting objects", () => {
    const sorters: CrudSorting = [
      { field: "name", order: "asc" },
      { field: "age", order: "desc" },
    ];

    const expected = [
      { field: "name", direction: "asc" },
      { field: "age", direction: "desc" },
    ];

    expect(generateSort(sorters)).toEqual(expected);
  });
});
