import type { CrudSorting } from "@refinedev/core";
import { getAppwriteSorting } from "../../src/utils";
import { Query } from "appwrite";

describe("getAppwriteSorting", () => {
  it("should generate Appwrite sorting parameters based on the provided sorters", () => {
    const sorters: CrudSorting = [
      { field: "name", order: "asc" },
      { field: "age", order: "desc" },
    ];

    const result = getAppwriteSorting(sorters);

    expect(result).toEqual([Query.orderAsc("name"), Query.orderDesc("age")]);
  });

  it('should generate correct Appwrite sorting parameters for the "id" field', () => {
    const sorters: CrudSorting = [{ field: "id", order: "asc" }];

    const result = getAppwriteSorting(sorters);

    expect(result).toEqual([Query.orderAsc("$id")]);
  });

  it("should return an empty array when no sorters are provided", () => {
    const result = getAppwriteSorting(undefined);

    expect(result).toEqual([]);
  });
});
