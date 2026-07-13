import { replaceImports } from ".";

describe("replaceImports", () => {
  const packages = {
    "@refinedev/core": "RefineCore",
    "@refinedev/antd": "RefineAntd",
  };

  it("should return empty string if no string is passed", () => {
    expect(replaceImports("", packages).trim()).toBe("");
  });

  it("should replace imports", () => {
    const code = `
import { useForm } from "@refinedev/core";
import { useTable } from "@refinedev/antd";
`;

    expect(replaceImports(code, packages)).toContain(
      "const { useForm } = RefineCore;",
    );
    expect(replaceImports(code, packages)).toContain(
      "const { useTable } = RefineAntd;",
    );
  });
});
