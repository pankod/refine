import { propertyPathToArray } from ".";

describe("propertyPathToArray", () => {
  it("should convert a simple dot-separated path", () => {
    expect(propertyPathToArray("a.b.c")).toEqual(["a", "b", "c"]);
  });

  it("should convert numeric segments to numbers", () => {
    expect(propertyPathToArray("items.0.name")).toEqual(["items", 0, "name"]);
  });

  it("should handle a single key", () => {
    expect(propertyPathToArray("name")).toEqual(["name"]);
  });

  it("should handle a path with only numbers", () => {
    expect(propertyPathToArray("0.1.2")).toEqual([0, 1, 2]);
  });

  it("should handle deeply nested paths", () => {
    expect(propertyPathToArray("a.b.c.d.e.f")).toEqual([
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ]);
  });

  it("should handle mixed string and number segments", () => {
    expect(propertyPathToArray("users.0.address.1.city")).toEqual([
      "users",
      0,
      "address",
      1,
      "city",
    ]);
  });

  it("should not convert strings that look like floats to numbers", () => {
    // "1.5" split by '.' => ["1", "5"] => [1, 5]
    const result = propertyPathToArray("1.5");
    expect(result).toEqual([1, 5]);
  });
});
