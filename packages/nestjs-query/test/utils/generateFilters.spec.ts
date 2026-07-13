import { generateFilters } from "../../src/utils/index";
import type { CrudFilter, LogicalFilter } from "@refinedev/core";

describe("generateFilters", () => {
  it("should generate filter based on the specified operator", () => {
    const testCases: { filters: CrudFilter[]; expected: any }[] = [
      {
        filters: [{ operator: "eq", field: "name", value: "John" }],
        expected: { name: { eq: "John" } },
      },
      {
        filters: [{ operator: "ne", field: "name", value: "John" }],
        expected: { name: { neq: "John" } },
      },
      {
        filters: [{ operator: "lt", field: "age", value: 20 }],
        expected: { age: { lt: 20 } },
      },
      {
        filters: [{ operator: "gt", field: "age", value: 20 }],
        expected: { age: { gt: 20 } },
      },
      {
        filters: [{ operator: "lte", field: "age", value: 20 }],
        expected: { age: { lte: 20 } },
      },
      {
        filters: [{ operator: "gte", field: "age", value: 20 }],
        expected: { age: { gte: 20 } },
      },
      {
        filters: [{ operator: "in", field: "name", value: "John" }],
        expected: { name: { in: "John" } },
      },
      {
        filters: [{ operator: "nin", field: "name", value: "John" }],
        expected: { name: { notIn: "John" } },
      },
      {
        filters: [{ operator: "contains", field: "name", value: "John" }],
        expected: { name: { iLike: "%John%" } },
      },
      {
        filters: [{ operator: "ncontains", field: "name", value: "John" }],
        expected: { name: { notILike: "%John%" } },
      },
      {
        filters: [{ operator: "containss", field: "name", value: "John" }],
        expected: { name: { like: "%John%" } },
      },
      {
        filters: [{ operator: "ncontainss", field: "name", value: "John" }],
        expected: { name: { notLike: "%John%" } },
      },
      {
        filters: [{ operator: "startswith", field: "name", value: "John" }],
        expected: { name: { iLike: "John%" } },
      },
      {
        filters: [{ operator: "nstartswith", field: "name", value: "John" }],
        expected: { name: { notILike: "John%" } },
      },
      {
        filters: [{ operator: "startswiths", field: "name", value: "John" }],
        expected: { name: { like: "John%" } },
      },
      {
        filters: [{ operator: "nstartswiths", field: "name", value: "John" }],
        expected: { name: { notLike: "John%" } },
      },
      {
        filters: [{ operator: "endswith", field: "name", value: "John" }],
        expected: { name: { iLike: "%John" } },
      },
      {
        filters: [{ operator: "nendswith", field: "name", value: "John" }],
        expected: { name: { notILike: "%John" } },
      },
      {
        filters: [{ operator: "endswiths", field: "name", value: "John" }],
        expected: { name: { like: "%John" } },
      },
      {
        filters: [{ operator: "nendswiths", field: "name", value: "John" }],
        expected: { name: { notLike: "%John" } },
      },
      {
        filters: [{ operator: "null", field: "name", value: true }],
        expected: { name: { is: null } },
      },
      {
        filters: [{ operator: "nnull", field: "name", value: true }],
        expected: { name: { isNot: null } },
      },
      {
        filters: [{ operator: "between", field: "age", value: [20, 30] }],
        expected: { age: { between: { lower: 20, upper: 30 } } },
      },
      {
        filters: [{ operator: "nbetween", field: "age", value: [20, 30] }],
        expected: { age: { notBetween: { lower: 20, upper: 30 } } },
      },
    ];

    testCases.forEach(({ filters, expected }) => {
      const result = generateFilters(filters as LogicalFilter[]);
      expect(result).toEqual(expected);
    });
  });
  it("should generate filter with conditional operator", () => {
    const testCases: { filters: CrudFilter[]; expected: any }[] = [
      {
        filters: [
          {
            operator: "and",
            value: [
              {
                field: "name",
                operator: "eq",
                value: "John",
              },
              {
                field: "age",
                operator: "eq",
                value: 20,
              },
            ],
          },
        ],
        expected: { and: [{ name: { eq: "John" }, age: { eq: 20 } }] },
      },
      {
        filters: [
          {
            operator: "or",
            value: [
              {
                field: "name",
                operator: "eq",
                value: "John",
              },
              {
                field: "age",
                operator: "eq",
                value: 20,
              },
            ],
          },
        ],
        expected: { or: [{ name: { eq: "John" }, age: { eq: 20 } }] },
      },
    ];

    testCases.forEach(({ filters, expected }) => {
      const result = generateFilters(filters as LogicalFilter[]);
      expect(result).toEqual(expected);
    });
  });
  it("should generate filter when value is valid", () => {
    const testCases: { filters: CrudFilter[]; expected: any }[] = [
      {
        filters: [{ operator: "eq", field: "name", value: "" }],
        expected: { name: { eq: "" } },
      },
      {
        filters: [{ operator: "eq", field: "name", value: null }],
        expected: {},
      },
      {
        filters: [{ operator: "eq", field: "name", value: undefined }],
        expected: {},
      },
      {
        filters: [{ operator: "eq", field: "age", value: 0 }],
        expected: { age: { eq: 0 } },
      },
      {
        filters: [{ operator: "eq", field: "age", value: Number.NaN }],
        expected: {},
      },
      {
        filters: [
          { operator: "eq", field: "age", value: Number.POSITIVE_INFINITY },
        ],
        expected: {},
      },
      {
        filters: [
          { operator: "eq", field: "age", value: Number.NEGATIVE_INFINITY },
        ],
        expected: {},
      },
      {
        filters: [{ operator: "between", field: "age", value: [] }],
        expected: {},
      },
    ];

    testCases.forEach(({ filters, expected }) => {
      const result = generateFilters(filters as LogicalFilter[]);
      expect(result).toEqual(expected);
    });
  });
});
