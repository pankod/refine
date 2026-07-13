import { getOptionLabel } from ".";

describe("getOptionLabel", () => {
  it("should return empty string if no accessor in relation", () => {
    expect(
      getOptionLabel({
        key: "somerecord",
        type: "object",
        relationInfer: {
          accessor: undefined,
          key: "somekey",
          type: "text",
        },
      }),
    ).toBe("");
  });

  it("should return empty string if accessor is title", () => {
    expect(
      getOptionLabel({
        key: "somerecord",
        type: "object",
        relationInfer: {
          accessor: "title",
          key: "somekey",
          type: "text",
        },
      }),
    ).toBe("");
  });

  it("should return optionLabel if accessor is not title", () => {
    expect(
      getOptionLabel({
        key: "somerecord",
        type: "object",
        relationInfer: {
          accessor: "name",
          key: "somekey",
          type: "text",
        },
      }),
    ).toBe(`optionLabel: "name",`);
  });

  it("should return optionLabel if accessor is array", () => {
    expect(
      getOptionLabel({
        key: "somerecord",
        type: "object",
        relationInfer: {
          accessor: ["name", "title"],
          key: "somekey",
          type: "text",
        },
      }),
    ).toBe(`optionLabel: "name",`);
  });
});
