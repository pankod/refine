import { flattenObjectKeys } from ".";

describe("flattenObjectKeys", () => {
  it("should flatten a simple nested object", () => {
    const result = flattenObjectKeys({ a: { b: 1 } });
    expect(result["a.b"]).toBe(1);
  });

  it("should handle flat objects", () => {
    const result = flattenObjectKeys({ a: 1, b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("should handle deeply nested objects", () => {
    const result = flattenObjectKeys({ a: { b: { c: { d: "deep" } } } });
    expect(result["a.b.c.d"]).toBe("deep");
  });

  it("should flatten arrays with indexed keys", () => {
    const result = flattenObjectKeys({ items: ["a", "b", "c"] });
    expect(result["items.0"]).toBe("a");
    expect(result["items.1"]).toBe("b");
    expect(result["items.2"]).toBe("c");
  });

  it("should handle arrays of objects", () => {
    const result = flattenObjectKeys({
      items: [{ name: "first" }, { name: "second" }],
    });
    expect(result["items.0.name"]).toBe("first");
    expect(result["items.1.name"]).toBe("second");
  });

  it("should return non-nested values with the prefix as key", () => {
    const result = flattenObjectKeys("hello", "root");
    expect(result).toEqual({ root: "hello" });
  });

  it("should handle null values", () => {
    const result = flattenObjectKeys({ a: null });
    expect(result).toEqual({ a: null });
  });

  it("should handle empty objects", () => {
    const result = flattenObjectKeys({});
    expect(result).toEqual({});
  });

  it("should handle mixed nested and flat properties", () => {
    const result = flattenObjectKeys({
      name: "John",
      address: { city: "NYC", zip: "10001" },
    });
    expect(result["name"]).toBe("John");
    expect(result["address.city"]).toBe("NYC");
    expect(result["address.zip"]).toBe("10001");
  });

  it("should preserve parent keys for nested objects", () => {
    const obj = { a: { b: 1 } };
    const result = flattenObjectKeys(obj);
    // The parent key should also be present
    expect(result["a"]).toEqual({ b: 1 });
    expect(result["a.b"]).toBe(1);
  });

  it("should handle custom prefix", () => {
    const result = flattenObjectKeys({ x: 1 }, "prefix");
    expect(result["prefix.x"]).toBe(1);
  });

  it("should handle undefined values", () => {
    const result = flattenObjectKeys({ a: undefined });
    expect(result).toEqual({ a: undefined });
  });

  it("should handle empty arrays", () => {
    const result = flattenObjectKeys({ items: [] });
    // Empty array is a nested object with 0 keys, so it gets assigned directly
    expect(result["items"]).toEqual([]);
  });
});
