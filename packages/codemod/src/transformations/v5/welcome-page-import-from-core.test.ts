import { welcomePageImportFromCore } from "./welcome-page-import-from-core";

import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  welcomePageImportFromCore(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("welcome-page-import-from-core", () => {
  describe("WelcomePage from UI packages", () => {
    it("should migrate WelcomePage import from @refinedev/antd to @refinedev/core", () => {
      const source = `
        import { WelcomePage, ErrorComponent } from "@refinedev/antd";
        import { useRefineContext } from "@refinedev/core";
      `;

      const expected = `
        import { ErrorComponent } from "@refinedev/antd";
        import { useRefineContext, WelcomePage } from "@refinedev/core";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should migrate WelcomePage import from @refinedev/mui to @refinedev/core", () => {
      const source = `
        import { WelcomePage, ErrorComponent } from "@refinedev/mui";
        import { useRefineContext } from "@refinedev/core";
      `;

      const expected = `
        import { ErrorComponent } from "@refinedev/mui";
        import { useRefineContext, WelcomePage } from "@refinedev/core";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should migrate WelcomePage import from @refinedev/chakra-ui to @refinedev/core", () => {
      const source = `
        import { WelcomePage, ErrorComponent } from "@refinedev/chakra-ui";
        import { useRefineContext } from "@refinedev/core";
      `;

      const expected = `
        import { ErrorComponent } from "@refinedev/chakra-ui";
        import { useRefineContext, WelcomePage } from "@refinedev/core";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should migrate WelcomePage import from @refinedev/mantine to @refinedev/core", () => {
      const source = `
        import { WelcomePage, ErrorComponent } from "@refinedev/mantine";
        import { useRefineContext } from "@refinedev/core";
      `;

      const expected = `
        import { ErrorComponent } from "@refinedev/mantine";
        import { useRefineContext, WelcomePage } from "@refinedev/core";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should remove entire UI package import if WelcomePage was the only import", () => {
      const source = `
        import { WelcomePage } from "@refinedev/antd";
        import { useRefineContext } from "@refinedev/core";
      `;

      const expected = `
        import { useRefineContext, WelcomePage } from "@refinedev/core";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should create new @refinedev/core import if none exists", () => {
      const source = `
        import { WelcomePage } from "@refinedev/antd";
        import { Button } from "antd";
      `;

      const expected = `
        import { WelcomePage } from "@refinedev/core";
        import { Button } from "antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should handle WelcomePage with alias", () => {
      const source = `
        import { WelcomePage as MyWelcomePage, ErrorComponent } from "@refinedev/antd";
        import { useRefineContext } from "@refinedev/core";
      `;

      const expected = `
        import { ErrorComponent } from "@refinedev/antd";
        import { useRefineContext, WelcomePage as MyWelcomePage } from "@refinedev/core";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should not duplicate WelcomePage if already imported from @refinedev/core", () => {
      const source = `
        import { WelcomePage, useRefineContext } from "@refinedev/core";
        import { ErrorComponent } from "@refinedev/antd";
      `;

      const expected = `
        import { WelcomePage, useRefineContext } from "@refinedev/core";
        import { ErrorComponent } from "@refinedev/antd";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should handle multiple UI packages importing WelcomePage", () => {
      const source = `
        import { WelcomePage as AntdWelcome } from "@refinedev/antd";
        import { WelcomePage as MuiWelcome } from "@refinedev/mui";
        import { useRefineContext } from "@refinedev/core";
      `;

      const expected = `
        import { useRefineContext, WelcomePage as AntdWelcome } from "@refinedev/core";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });

    it("should not affect imports that don't include WelcomePage", () => {
      const source = `
        import { ErrorComponent, Layout } from "@refinedev/antd";
        import { useRefineContext } from "@refinedev/core";
      `;

      const expected = `
        import { ErrorComponent, Layout } from "@refinedev/antd";
        import { useRefineContext } from "@refinedev/core";
      `;

      expect(transform(source).trim()).toBe(expected.trim());
    });
  });
});
