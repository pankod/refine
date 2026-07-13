import { metaFieldsToGqlFields } from "../../src/utils";

describe("metaFieldsToGql", () => {
  it("returns an empty string for null input", () => {
    expect(metaFieldsToGqlFields(undefined)).toBe("");
  });

  it("returns a single line for string array input", () => {
    const input = ["field1", "field2"];
    const expectedOutput = "field1\nfield2";
    expect(metaFieldsToGqlFields(input)).toBe(expectedOutput);
  });

  it("handles nested fields correctly", () => {
    const input = ["field1", { nestedField: ["nested1", "nested2"] }];
    const expectedOutput = "field1\nnestedField { nested1\nnested2 }";
    expect(metaFieldsToGqlFields(input)).toBe(expectedOutput);
  });

  it("handles mixed input types", () => {
    const input = ["field1", { nestedField: ["nested1"] }, "field3"];
    const expectedOutput = "field1\nnestedField { nested1 }\nfield3";
    expect(metaFieldsToGqlFields(input)).toBe(expectedOutput);
  });

  it("handles complex nested input", () => {
    const input = [
      "field1",
      {
        nestedField: ["nested1", { nestedNestedField: ["nestedNested1"] }],
      },
      {
        aggregate: [
          "aggregateField1",
          {
            aggregateNestedField: [
              "aggregateNested1",
              {
                aggregateNestedNestedField: ["aggregateNestedNested1"],
              },
            ],
          },
        ],
      },
      "field3",
    ];

    const expectedOutput =
      "field1\nnestedField { nested1\nnestedNestedField { nestedNested1 } }\naggregate { aggregateField1\naggregateNestedField { aggregateNested1\naggregateNestedNestedField { aggregateNestedNested1 } } }\nfield3";
    expect(metaFieldsToGqlFields(input)).toBe(expectedOutput);
  });
});
