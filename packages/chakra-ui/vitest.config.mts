import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      exclude: ["src/index.ts"],
    },
    globals: true,
  },
  resolve: {
    alias: {
      // Path mappings from tsconfig.json
      "@components": path.resolve(__dirname, "./src/components"),
      "@components/*": path.resolve(__dirname, "./src/components/*"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@hooks/*": path.resolve(__dirname, "./src/hooks/*"),
      "@test": path.resolve(__dirname, "./test"),
      "@test/*": path.resolve(__dirname, "./test/*"),
      "@definitions": path.resolve(__dirname, "./src/definitions"),
      "@definitions/*": path.resolve(__dirname, "./src/definitions/*"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@contexts/*": path.resolve(__dirname, "./src/contexts/*"),
      // Handle .js extension mapping
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  // Mock CSS and SVG files
  assetsInclude: ["**/*.svg"],
  esbuild: {
    target: "node22",
  },
});
