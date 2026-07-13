import { replaceExports } from ".";

describe("replaceExports", () => {
  it("should return empty string if no string is passed", () => {
    expect(replaceExports("")).toBe("");
  });

  it("should remove export from export const a = 1;", () => {
    expect(replaceExports("export const a = 1;")).toBe("const a = 1;");
  });

  it("should remove export default line", () => {
    expect(replaceExports("export default MyComponent")).toBe("");
  });
});
