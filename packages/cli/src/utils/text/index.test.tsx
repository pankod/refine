import { removeANSIColors, uppercaseFirstChar } from ".";

describe("uppercaseFirstChar", () => {
  it("should return the string with the first character capitalized", () => {
    const str = "hello world";
    const result = uppercaseFirstChar(str);
    expect(result).toEqual("Hello world");
  });

  it("should return an empty string if the input is empty", () => {
    const str = "";
    const result = uppercaseFirstChar(str);
    expect(result).toEqual("");
  });
});

describe("removeANSIColors", () => {
  it("should remove ANSI color codes from the string", () => {
    const str = "\u001b[31mHello \u001b[32mworld\u001b[0m";
    const result = removeANSIColors(str);
    expect(result).toEqual("Hello world");
  });

  it("should return the original string if it does not contain any ANSI color codes", () => {
    const str = "Hello world";
    const result = removeANSIColors(str);
    expect(result).toEqual(str);
  });
});
