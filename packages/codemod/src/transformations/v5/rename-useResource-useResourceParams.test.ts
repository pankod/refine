import jscodeshift, { type JSCodeshift } from "jscodeshift";
import { renameUseResourceToUseResourceParams } from "./rename-useResource-useResourceParams";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  renameUseResourceToUseResourceParams(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
    tabWidth: 4,
    useTabs: false,
  });
};

describe("rename-useResource-useResourceParams", () => {
  it("should transform import statement from useResource to useResourceParams", () => {
    const source = `
      import { useResource } from "@refinedev/core";
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform multiple imports including useResource", () => {
    const source = `
      import { useResource, useList, useOne } from "@refinedev/core";
    `;
    const expected = `
      import { useResourceParams, useList, useOne } from "@refinedev/core";
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should add migration comment if both useResource and useResourceParams are imported", () => {
    const source = `
      import { useResource, useResourceParams } from "@refinedev/core";
      const { resource } = useResource();
    `;
    const expected = `
      // TODO: Complete migration from useResource to useResourceParams
      // See: http://localhost:3000/docs/migration-guide/4x-to-5x/#useresource--useresourceparams
      import { useResource, useResourceParams } from "@refinedev/core";
      const { resource } = useResource();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform useResource() call with no arguments", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      const { resource } = useResource();
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      const { resource } = useResourceParams();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform useResource(string) to useResourceParams({ resource: string })", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      const { resource } = useResource("posts");
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      const { resource } = useResourceParams({
          resource: "posts",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform useResource with variable argument", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      const resourceName = "posts";
      const { resource } = useResource(resourceName);
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      const resourceName = "posts";
      const { resource } = useResourceParams({
          resource: resourceName,
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform object argument with resourceNameOrRouteName property", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      const { resource } = useResource({
        resourceNameOrRouteName: "posts",
        action: "edit",
      });
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      const { resource } = useResourceParams({
          resource: "posts",
          action: "edit",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform object argument with resourceName property", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      const { resource } = useResource({
        resourceName: "posts",
        action: "show",
      });
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      const { resource } = useResourceParams({
          resource: "posts",
          action: "show",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform recordItemId to id", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      const { resource } = useResource({
        resourceName: "posts",
        recordItemId: 123,
        action: "edit",
      });
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      const { resource } = useResourceParams({
          resource: "posts",
          id: 123,
          action: "edit",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform complex object with multiple property mappings", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      const { resource, id } = useResource({
        resourceNameOrRouteName: "/posts",
        recordItemId: 456,
        action: "edit",
      });
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      const { resource, id } = useResourceParams({
          resource: "/posts",
          id: 456,
          action: "edit",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve other object properties unchanged", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      const { resource } = useResource({
        resourceName: "posts",
        action: "list",
        customProp: "value",
      });
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      const { resource } = useResourceParams({
          resource: "posts",
          action: "list",
          customProp: "value",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle multiple useResource calls in same file", () => {
    const source = `
      import { useResource } from "@refinedev/core";
      
      const Component1 = () => {
        const { resource } = useResource("posts");
        return null;
      };
      
      const Component2 = () => {
        const { resource } = useResource({
          resourceName: "users",
          action: "edit",
        });
        return null;
      };
    `;
    const expected = `
      import { useResourceParams } from "@refinedev/core";
      
      const Component1 = () => {
        const { resource } = useResourceParams({
            resource: "posts",
        });
        return null;
      };
      
      const Component2 = () => {
        const { resource } = useResourceParams({
            resource: "users",
            action: "edit",
        });
        return null;
      };
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform imports from other packages", () => {
    const source = `
      import { useResource } from "@other/package";
      const { resource } = useResource("posts");
    `;
    const expected = `
      import { useResource } from "@other/package";
      const { resource } = useResource("posts");
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle aliased imports", () => {
    const source = `
      import { useResource as useRes } from "@refinedev/core";
      const { resource } = useRes("posts");
    `;
    const expected = `
      import { useResourceParams as useRes } from "@refinedev/core";
      const { resource } = useRes({
          resource: "posts",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });
});
