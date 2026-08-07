import type { CrudFilter } from "@refinedev/core";
import { generateFilter, getAppwriteFilters } from "../../src/utils";

vi.mock("../../src/utils/generateFilter", () => ({
  generateFilter: vi.fn(),
}));

describe("getAppwriteFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate Appwrite filters based on the input filters", () => {
    const filters: CrudFilter[] = [
      { operator: "eq", field: "name", value: "John" },
      { operator: "lt", field: "age", value: 30 },
    ];

    getAppwriteFilters(filters);

    expect(generateFilter).toHaveBeenCalledTimes(2);
    expect(generateFilter).toHaveBeenNthCalledWith(1, {
      operator: "eq",
      field: "name",
      value: "John",
    });
    expect(generateFilter).toHaveBeenNthCalledWith(2, {
      operator: "lt",
      field: "age",
      value: 30,
    });
  });

  it('should generate Appwrite filters for "or" and "and" operators', () => {
    const filters = [
      {
        operator: "or",
        filters: [
          {
            operator: "eq",
            field: "name",
            value: "John",
          },
          {
            operator: "lt",
            field: "age",
            value: 30,
          },
        ],
      },
      {
        operator: "and",
        filters: [
          {
            operator: "eq",
            field: "name",
            value: "John",
          },
          {
            operator: "lt",
            field: "age",
            value: 30,
          },
        ],
      },
    ];

    getAppwriteFilters(filters as any);

    expect(generateFilter).toHaveBeenCalledTimes(2);
    expect(generateFilter).toHaveBeenNthCalledWith(1, {
      operator: "or",
      filters: [
        {
          operator: "eq",
          field: "name",
          value: "John",
        },
        {
          operator: "lt",
          field: "age",
          value: 30,
        },
      ],
    });
    expect(generateFilter).toHaveBeenNthCalledWith(2, {
      operator: "and",
      filters: [
        {
          operator: "eq",
          field: "name",
          value: "John",
        },
        {
          operator: "lt",
          field: "age",
          value: 30,
        },
      ],
    });
  });

  it("should return an empty array when no filters are provided", () => {
    const result = getAppwriteFilters(undefined);

    expect(result).toEqual([]);
    expect(generateFilter).toHaveBeenCalledTimes(0);
  });
});
