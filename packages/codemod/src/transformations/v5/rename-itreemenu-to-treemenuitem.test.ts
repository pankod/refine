import { renameITreeMenuToTreeMenuItem } from "./rename-itreemenu-to-treemenuitem";

import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  renameITreeMenuToTreeMenuItem(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("rename-itreemenu-to-treemenuitem", () => {
  it("should rename ITreeMenu to TreeMenuItem as ITreeMenu - basic case", () => {
    const source = `
      import { ITreeMenu, CanAccess, useMenu } from "@refinedev/core";
    `;

    const expected = `
      import { TreeMenuItem as ITreeMenu, CanAccess, useMenu } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename type ITreeMenu to TreeMenuItem as ITreeMenu", () => {
    const source = `
      import { type ITreeMenu, CanAccess, useMenu } from "@refinedev/core";
    `;

    const expected = `
      import { type TreeMenuItem as ITreeMenu, CanAccess, useMenu } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle multiple imports including ITreeMenu", () => {
    const source = `
      import { 
        ITreeMenu, 
        CanAccess, 
        useMenu,
        useResource,
        useOne 
      } from "@refinedev/core";
    `;

    const expected = `
      import { 
        TreeMenuItem as ITreeMenu, 
        CanAccess, 
        useMenu,
        useResource,
        useOne 
      } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not modify when TreeMenuItem already exists", () => {
    const source = `
      import { TreeMenuItem, ITreeMenu, CanAccess, useMenu } from "@refinedev/core";
    `;

    const expected = `
      import { TreeMenuItem, ITreeMenu, CanAccess, useMenu } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not affect imports from other packages", () => {
    const source = `
      import { ITreeMenu } from "some-other-package";
      import { CanAccess, useMenu } from "@refinedev/core";
    `;

    const expected = `
      import { ITreeMenu } from "some-other-package";
      import { CanAccess, useMenu } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not modify files without ITreeMenu import", () => {
    const source = `
      import { CanAccess, useMenu, useResource } from "@refinedev/core";
    `;

    const expected = `
      import { CanAccess, useMenu, useResource } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
