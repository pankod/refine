import { prettySpaces } from "./pretty-spaces";

describe("Pretty Spaces Helper", () => {
  it("should remove extra spaces", () => {
    const content = "const a = 1;  const b = 2;";
    const result = prettySpaces(content);
    expect(result).toBe("const a = 1; const b = 2;");
  });
  it("should remove extra new lines", () => {
    const content = ["const a = 1;", "", "", "const b = 2;"].join("\n");
    const result = prettySpaces(content);
    expect(result).toEqual(["const a = 1;", "const b = 2;"].join("\n"));
  });
  it("should remove extra spaces and new lines", () => {
    const content = [
      "const a = 1;   const b = 2;",
      "",
      "",
      "const c = 3;   const d = 4;",
    ].join("\n");
    const result = prettySpaces(content);
    expect(result).toEqual(
      ["const a = 1; const b = 2;", "const c = 3; const d = 4;"].join("\n"),
    );
  });
});
