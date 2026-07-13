import { removeHiddenCode } from ".";

describe("removeHiddenCode", () => {
  it("should return empty string if no string is passed", () => {
    expect(removeHiddenCode("")).toBe("");
  });

  it("should return string if no hidden code is passed", () => {
    const code = "const MyComponent = () => null;";

    expect(removeHiddenCode(code)).toBe(code);
  });

  it("should remove hidden code", () => {
    const code = `
const MyComponent = () => null;

/* hidden-start */
const MyComponent2 = () => null;
/* hidden-end */
`;

    expect(removeHiddenCode(code)).toBe(`
const MyComponent = () => null;


`);
  });
});
