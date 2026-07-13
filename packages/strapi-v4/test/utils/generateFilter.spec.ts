import type { CrudFilters } from "@refinedev/core";
import { generateFilter, generateNestedFilterField } from "../../src/utils";

describe("generateFilter", () => {
  it("should return an empty string when no filters are provided", () => {
    const filters = undefined;
    const expectedOutput = "";

    const result = generateFilter(filters);

    expect(result).toEqual(expectedOutput);
  });

  it("should generate a single filter query string", () => {
    const filters: CrudFilters = [
      {
        field: "testField",
        operator: "eq",
        value: "testValue",
      },
    ];
    const expectedOutput = "filters[testField][$eq]=testValue";

    const result = generateFilter(filters);

    expect(result).toEqual(expectedOutput);
  });

  it("should generate multiple filter query strings", () => {
    const filters: CrudFilters = [
      {
        field: "field1",
        operator: "ne",
        value: "value1",
      },
      {
        field: "field2",
        operator: "gt",
        value: "value2",
      },
    ];
    const expectedOutput =
      "filters[field1][$ne]=value1&filters[field2][$gt]=value2";

    const result = generateFilter(filters);

    expect(result).toEqual(expectedOutput);
  });

  it("should generate a nested filter query string", () => {
    const filters: CrudFilters = [
      {
        field: "field1.field2",
        operator: "contains",
        value: "value",
      },
    ];
    const expectedOutput = "filters[field1][field2][$containsi]=value";

    const result = generateFilter(filters);

    expect(result).toEqual(expectedOutput);
  });

  it("should generate a complex filter query string with 'or' operator", () => {
    const filters: CrudFilters = [
      {
        operator: "or",
        value: [
          {
            field: "field1",
            operator: "eq",
            value: "value1",
          },
          {
            field: "field2",
            operator: "ne",
            value: "value2",
          },
        ],
      },
    ];
    const expectedOutput =
      "filters[$or][0][field1][$eq]=value1&filters[$or][1][field2][$ne]=value2";

    const result = generateFilter(filters);

    expect(result).toEqual(expectedOutput);
  });

  it("should generate filter query strings with an array of values", () => {
    const filters: CrudFilters = [
      {
        field: "field1",
        operator: "in",
        value: ["value1", "value2", "value3"],
      },
    ];
    const expectedOutput =
      "filters[field1][$in][0]=value1&filters[field1][$in][1]=value2&filters[field1][$in][2]=value3";

    const result = generateFilter(filters);

    expect(result).toEqual(expectedOutput);
  });

  it("should generate complex queries", () => {
    const filters: CrudFilters = [
      {
        operator: "and",
        value: [
          { field: "name", operator: "eq", value: "John Doe" },
          { field: "age", operator: "gte", value: 18 },
        ],
      },
      {
        operator: "or",
        value: [
          { field: "city", operator: "contains", value: "York" },
          { field: "city", operator: "contains", value: "Angeles" },
        ],
      },
    ];

    const filterQueryString = generateFilter(filters);

    const expectedQueryString =
      "filters[$and][0][name][$eq]=John%20Doe&filters[$and][1][age][$gte]=18&filters[$or][0][city][$containsi]=York&filters[$or][1][city][$containsi]=Angeles";

    expect(filterQueryString).toEqual(expectedQueryString);
  });

  it("should generate more complex queries", () => {
    const filters: CrudFilters = [
      {
        operator: "or",
        value: [
          {
            field: "affect_global",
            operator: "eq",
            value: true,
          },
          {
            operator: "and",
            value: [
              {
                field: "studio.id",
                operator: "eq",
                value: 2,
              },
              {
                field: "is_primary",
                operator: "eq",
                value: true,
              },
            ],
          },
        ],
      },
    ];

    const filterQueryString = generateFilter(filters);

    const expectedQueryString =
      "filters[$or][0][affect_global][$eq]=true&filters[$or][1][$and][0][studio][id][$eq]=2&filters[$or][1][$and][1][is_primary][$eq]=true";

    expect(filterQueryString).toEqual(expectedQueryString);
  });
});

describe("generateNestedFilterField", () => {
  it("should return a single field when given a non-nested field", () => {
    const field = "testField";
    const expectedOutput = "[testField]";

    const result = generateNestedFilterField(field);

    expect(result).toEqual(expectedOutput);
  });

  it("should return nested fields when given a nested field", () => {
    const field = "field1.field2.field3";
    const expectedOutput = "[field1][field2][field3]";

    const result = generateNestedFilterField(field);

    expect(result).toEqual(expectedOutput);
  });

  it("should return an empty string when given an empty field", () => {
    const field = "";
    const expectedOutput = "[]";

    const result = generateNestedFilterField(field);

    expect(result).toEqual(expectedOutput);
  });
});
