import { routerBindingsTypeToProvider } from "./router-bindings-type-to-provider";

import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  routerBindingsTypeToProvider(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("router-bindings-type-to-provider", () => {
  // Basic type import scenarios
  it("should transform type RouterBindings import and preserve usage", () => {
    const source = `
      import { type RouterBindings } from "@refinedev/core";
    `;

    const expected = `
      import { type RouterProvider as RouterBindings } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should transform inline type import and preserve usage", () => {
    const source = `
      import type { RouterBindings } from "@refinedev/core";
    `;

    const expected = `
      import type { RouterProvider as RouterBindings } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  // Preserve existing aliases
  it("should preserve existing aliases in type imports", () => {
    const source = `
      import { type RouterBindings as MyRouter } from "@refinedev/core";
    `;

    const expected = `
      import { type RouterProvider as MyRouter } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve existing aliases in inline type imports", () => {
    const source = `
      import type { RouterBindings as MyRouterType } from "@refinedev/core";
    `;

    const expected = `
      import type { RouterProvider as MyRouterType } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  // Mixed imports scenarios
  it("should handle mixed imports with other types and values", () => {
    const source = `
      import { 
        Refine, 
        type RouterBindings,
        type DataProvider 
      } from "@refinedev/core";
    `;

    const expected = `
      import { 
        Refine, 
        type RouterProvider as RouterBindings,
        type DataProvider 
      } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle mixed inline and regular type imports", () => {
    const source = `
      import type { RouterBindings, DataProvider } from "@refinedev/core";
      import { Refine } from "@refinedev/core";
    `;

    const expected = `
      import type { RouterProvider as RouterBindings, DataProvider } from "@refinedev/core";
      import { Refine } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  // Usage preservation scenarios
  it("should preserve type usage in function parameters", () => {
    const source = `
      import { type RouterBindings } from "@refinedev/core";
      
      function setupRouter(router: RouterBindings) {
        return router;
      }
    `;

    const expected = `
      import { type RouterProvider as RouterBindings } from "@refinedev/core";
      
      function setupRouter(router: RouterBindings) {
        return router;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve type usage in variable declarations", () => {
    const source = `
      import type { RouterBindings } from "@refinedev/core";
      
      const myRouter: RouterBindings = {
        go: () => {},
        back: () => {},
        parse: () => ({})
      };
    `;

    const expected = `
      import type { RouterProvider as RouterBindings } from "@refinedev/core";
      
      const myRouter: RouterBindings = {
        go: () => {},
        back: () => {},
        parse: () => ({})
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve type usage in interface definitions", () => {
    const source = `
      import { type RouterBindings } from "@refinedev/core";
      
      interface AppConfig {
        router: RouterBindings;
        title: string;
      }
    `;

    const expected = `
      import { type RouterProvider as RouterBindings } from "@refinedev/core";
      
      interface AppConfig {
        router: RouterBindings;
        title: string;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve type usage in generic types", () => {
    const source = `
      import type { RouterBindings } from "@refinedev/core";
      
      type CustomRouter<T extends RouterBindings> = T & {
        custom: boolean;
      };
    `;

    const expected = `
      import type { RouterProvider as RouterBindings } from "@refinedev/core";
      
      type CustomRouter<T extends RouterBindings> = T & {
        custom: boolean;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  // Edge cases
  it("should not transform unrelated imports", () => {
    const source = `
      import { type RouterBindings } from "other-package";
      import type { SomeOtherType } from "@refinedev/core";
    `;

    const expected = `
      import { type RouterBindings } from "other-package";
      import type { SomeOtherType } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform non-type imports", () => {
    const source = `
      import { RouterBindings } from "@refinedev/core";
    `;

    const expected = `
      import { RouterBindings } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle complex mixed scenarios", () => {
    const source = `
      import React from "react";
      import { 
        Refine,
        type RouterBindings,
        type DataProvider,
        type AuthProvider
      } from "@refinedev/core";
      
      interface MyAppProps {
        router: RouterBindings;
        auth: AuthProvider;
      }
      
      function MyApp(props: MyAppProps) {
        const { router }: { router: RouterBindings } = props;
        return <Refine routerProvider={router} />;
      }
    `;

    const expected = `
      import React from "react";
      import { 
        Refine,
        type RouterProvider as RouterBindings,
        type DataProvider,
        type AuthProvider
      } from "@refinedev/core";
      
      interface MyAppProps {
        router: RouterBindings;
        auth: AuthProvider;
      }
      
      function MyApp(props: MyAppProps) {
        const { router }: { router: RouterBindings } = props;
        return <Refine routerProvider={router} />;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle multiple import statements from same module", () => {
    const source = `
      import { Refine } from "@refinedev/core";
      import type { RouterBindings, DataProvider } from "@refinedev/core";
      import { type AuthProvider } from "@refinedev/core";
    `;

    const expected = `
      import { Refine } from "@refinedev/core";
      import type { RouterProvider as RouterBindings, DataProvider } from "@refinedev/core";
      import { type AuthProvider } from "@refinedev/core";
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
