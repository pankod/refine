import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "happy-dom",
    setupFiles: ["./test/vitest.setup.ts"],
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
      // Handle .js extension mapping and CSS
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  css: {
    modules: {
      classNameStrategy: "non-scoped",
    },
  },
  esbuild: {
    target: "node22",
  },
});
