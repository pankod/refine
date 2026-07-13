import { upperCaseValues } from "../../src/utils";

describe("upperCaseValues", () => {
  it("should return undefined if the input object is undefined or null", () => {
    expect(upperCaseValues(undefined)).toBeUndefined();
    expect(upperCaseValues(null)).toBeUndefined();
  });

  it("should return an object with all its string values converted to upper case", () => {
    const input = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };

    const expectedOutput = {
      key1: "VALUE1",
      key2: "VALUE2",
      key3: "VALUE3",
    };

    expect(upperCaseValues(input)).toEqual(expectedOutput);
  });
});
