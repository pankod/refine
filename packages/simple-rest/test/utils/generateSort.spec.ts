import type { CrudSorting } from "@refinedev/core";
import { generateSort } from "../../src/utils";

describe("generateSort", () => {
  it("should return undefined when sorters are not provided", () => {
    const result = generateSort();
    expect(result).toBeUndefined();
  });

  it("should return undefined when sorters are empty", () => {
    const result = generateSort([]);
    expect(result).toBeUndefined();
  });

  it("should generate correct _sort and _order arrays for given sorters", () => {
    const sorters: CrudSorting = [
      {
        field: "field1",
        order: "asc",
      },
      {
        field: "field2",
        order: "desc",
      },
    ];

    const result = generateSort(sorters);

    expect(result).toEqual({
      _sort: ["field1", "field2"],
      _order: ["asc", "desc"],
    });
  });
});
