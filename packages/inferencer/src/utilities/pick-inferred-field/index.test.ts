import { pickInferredField } from ".";

describe("pickInferredField", () => {
  it("should return null if no inferred fields", () => {
    expect(pickInferredField([])).toBe(null);
  });

  it("should return null if all inferred fields are null", () => {
    expect(pickInferredField([null, null])).toBe(null);
  });

  it("should return field with highest priority", () => {
    expect(
      pickInferredField([
        { key: "name", priority: 1, type: "object" },
        { key: "title", priority: 2, type: "boolean" },
      ]),
    ).toEqual({ key: "title", priority: 2, type: "boolean" });
  });

  it("should return the first field if priorities are same", () => {
    expect(
      pickInferredField([
        { key: "name", priority: 1, type: "object" },
        { key: "title", priority: 1, type: "boolean" },
      ]),
    ).toEqual({ key: "name", priority: 1, type: "object" });
  });
});
