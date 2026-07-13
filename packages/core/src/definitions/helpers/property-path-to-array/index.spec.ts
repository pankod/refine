import { propertyPathToArray } from ".";

describe("propertyPathToArray", () => {
  it("should return an array of strings when given a string of dot-separated property names", () => {
    const propertyPath = "foo.bar.baz";
    const result = propertyPathToArray(propertyPath);
    expect(result).toEqual(["foo", "bar", "baz"]);
  });

  it("should return an array of numbers and strings when given a string of dot-separated property names that include numbers", () => {
    const propertyPath = "foo.1.bar.2.baz";
    const result = propertyPathToArray(propertyPath);
    expect(result).toEqual(["foo", 1, "bar", 2, "baz"]);
  });

  it("should return an array with a single element when given a string with no dots", () => {
    const propertyPath = "foo";
    const result = propertyPathToArray(propertyPath);
    expect(result).toEqual(["foo"]);
  });
});
