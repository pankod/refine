import { replaceImports } from "./replace-imports";

describe("Replace Imports Helper", () => {
  it("works with default import", () => {
    const content = `import { default as RefineCore } from "@refinedev/core";`;
    const result = replaceImports(content);
    expect(result).toContain("const { default: RefineCore } = RefineCore;");
    expect(result).not.toContain(content);
  });
  it("works with named import", () => {
    const content = `import { useForm, useStepsForm } from "@refinedev/core";`;
    const result = replaceImports(content);
    expect(result).toContain("const { useForm, useStepsForm } = RefineCore;");
    expect(result).not.toContain(content);
  });
  it("works with namespace import", () => {
    const content = `import * as RefineCore from "@refinedev/core";`;
    const result = replaceImports(content);
    expect(result).toContain("const RefineCore = RefineCore;");
    expect(result).not.toContain(content);
  });
  it("removes side effect imports", () => {
    const content = `import "@refinedev/core";`;
    const result = replaceImports(content);
    expect(result).not.toContain(content);
  });
  it("works with name change", () => {
    const content = `import { useForm as useRefineForm } from "@refinedev/core";`;
    const result = replaceImports(content);
    expect(result).toContain("const { useForm: useRefineForm } = RefineCore;");
    expect(result).not.toContain(content);
  });
  it("works with @refinedev/rest root imports", () => {
    const content = `import { createSimpleRestDataProvider } from "@refinedev/rest";`;
    const result = replaceImports(content);
    expect(result).toContain(
      "const { createSimpleRestDataProvider } = RefineRest;",
    );
    expect(result).not.toContain(content);
  });
  it("works with @refinedev/rest subpath imports", () => {
    const content = `import { createNestjsxCrudDataProvider } from "@refinedev/rest/nestjsx-crud";
import { createStrapiV4DataProvider } from "@refinedev/rest/strapi-v4";`;
    const result = replaceImports(content);
    expect(result).toContain(
      "const { createNestjsxCrudDataProvider } = RefineRest;",
    );
    expect(result).toContain(
      "const { createStrapiV4DataProvider } = RefineRest;",
    );
    expect(result).not.toContain(content);
  });
  it("works with @refinedev/rest/simple-rest subpath imports", () => {
    const content = `import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";`;
    const result = replaceImports(content);
    expect(result).toContain(
      "const { createSimpleRestDataProvider } = RefineRest;",
    );
    expect(result).not.toContain(content);
  });
  it("should work with multiline code", () => {
    const content = `import { useForm, useStepsForm } from "@refinedev/core";
import { default as RefineCore } from "@refinedev/core";
import * as RefineCore from "@refinedev/core";
import "@refinedev/core";
//this should still be there`;
    const result = replaceImports(content);
    expect(result).toContain("const { useForm, useStepsForm } = RefineCore;");
    expect(result).toContain("const { default: RefineCore } = RefineCore;");
    expect(result).toContain("const RefineCore = RefineCore;");
    expect(result).not.toContain(content);
    expect(result).toContain("//this should still be there");
  });
});
