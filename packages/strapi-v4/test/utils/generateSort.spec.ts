import type { CrudSorting } from "@refinedev/core";
import { generateSort } from "../../src/utils";

describe("generateSort", () => {
  it("should return an empty array if no sorters are provided", () => {
    expect(generateSort()).toEqual([]);
  });

  it("should generate a valid sort array when sorters are provided", () => {
    const sorters: CrudSorting = [
      { field: "name", order: "asc" },
      { field: "age", order: "desc" },
    ];
    const expectedOutput = ["name:asc", "age:desc"];
    expect(generateSort(sorters)).toEqual(expectedOutput);
  });
});
