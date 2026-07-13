import { idQuoteWrapper } from ".";

describe("idQuoteWrapper", () => {
  it.each([
    [
      "d1193402-1064-4b30-b1b1-0cb3042d4f93",
      `"d1193402-1064-4b30-b1b1-0cb3042d4f93"`,
    ],
    ["abc", `"abc"`],
    [123, 123],
    ["123", `"123"`],
    [-456, -456],
    [0, 0],
    ["", `""`],
    ["-789", `"-789"`],
    ["abc123", `"abc123"`],
    [undefined, undefined],
  ])("should handle different id types: %p", (id, expected) => {
    const result = idQuoteWrapper(id);
    expect(result).toBe(expected);
  });
});
