import { camelizeKeys } from "../../src/utils";

describe("camelizeKeys", () => {
  it("should return undefined if the input is undefined", () => {
    const result = camelizeKeys(undefined);
    expect(result).toBeUndefined();
  });

  it("should return an object with camelCase keys", () => {
    const input = {
      first_key: "value1",
      second_key: "value2",
      third_key: {
        inner_key: "value3",
      },
    };

    const expectedResult = {
      firstKey: "value1",
      secondKey: "value2",
      thirdKey: {
        inner_key: "value3",
      },
    };

    const result = camelizeKeys(input);
    expect(result).toEqual(expectedResult);
  });
});
