import {
  type HasuraCrudFilters,
  type HasuraCrudOperators,
  generateFilters,
  handleFilterValue,
} from "../../src/utils";

describe.each(["hasura-default", "graphql-default"] as const)(
  "generateFilters with %s naming convention",
  (namingConvention) => {
    it("should generate nested filter query for given filters", () => {
      const filters: HasuraCrudFilters = [
        { field: "title", operator: "contains", value: "test" },
        { field: "published", operator: "eq", value: true },
      ];

      const result = generateFilters(filters, namingConvention);

      expect(result).toEqual({
        _and: [{ title: { _ilike: "%test%" } }, { published: { _eq: true } }],
      });
    });

    it("should return undefined for undefined filters", () => {
      const result = generateFilters(undefined);

      expect(result).toBeUndefined();
    });

    it("should generate nested filter query for nested filters", () => {
      const filters: HasuraCrudFilters = [
        {
          operator: "or",
          value: [
            { field: "title", operator: "contains", value: "test" },
            { field: "published", operator: "eq", value: true },
          ],
        },
        {
          field: "author.name",
          operator: "contains",
          value: "John",
        },
      ];

      const result = generateFilters(filters, namingConvention);

      expect(result).toEqual({
        _and: [
          {
            _or: [
              { title: { _ilike: "%test%" } },
              { published: { _eq: true } },
            ],
          },
          { author: { name: { _ilike: "%John%" } } },
        ],
      });
    });

    it("should generate nested filter query using the not operator", () => {
      const filters: HasuraCrudFilters = [
        {
          operator: "not",
          value: [{ field: "title", operator: "eq", value: "test" }],
        },
        {
          field: "published",
          operator: "eq",
          value: true,
        },
      ];

      const result = generateFilters(filters, namingConvention);

      expect(result).toEqual({
        _and: [
          { _not: [{ title: { _eq: "test" } }] },
          { published: { _eq: true } },
        ],
      });
    });

    it("should generate correct hasura operator for filter converted to snake_case operator", () => {
      const filters: HasuraCrudFilters = [
        {
          field: "title",
          operator: "null",
          value: true,
        },
        {
          field: "title",
          operator: "nnull",
          value: false,
        },
      ];

      const result = generateFilters(filters, namingConvention);
      const expected =
        namingConvention === "hasura-default"
          ? {
              _and: [
                { title: { _is_null: true } },
                { title: { _is_null: false } },
              ],
            }
          : {
              _and: [
                { title: { _isNull: true } },
                { title: { _isNull: false } },
              ],
            };

      expect(result).toEqual(expected);
    });
  },
);

describe("handleFilterValue", () => {
  const testCases: Array<[HasuraCrudOperators, any, any]> = [
    ["startswiths", "test", "test%"],
    ["nstartswiths", "test", "test%"],
    ["endswiths", "test", "%test"],
    ["nendswiths", "test", "%test"],
    ["startswith", "test", "^test"],
    ["nstartswith", "test", "^(?!test)"],
    ["endswith", "test", "test$"],
    ["nendswith", "test", "(?<!test)$"],
    ["nnull", null, false],
    ["contains", "test", "%test%"],
    ["containss", "test", "%test%"],
    ["ncontains", "test", "%test%"],
    ["ncontainss", "test", "%test%"],
    ["eq", "test", "test"],
  ];

  it.each(testCases)(
    "should return correct value for %s operator",
    (operator, value, expected) => {
      const result = handleFilterValue(operator, value);

      expect(result).toEqual(expected);
    },
  );
});
