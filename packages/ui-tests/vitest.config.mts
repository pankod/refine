import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/vitest.setup.ts"],
    globals: true,
    include: ["src/tests/**/*.{test,spec,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      exclude: ["src/index.ts", "node_modules/**"],
    },
  },
  resolve: {
    alias: {
      "@components": resolve(__dirname, "./src/components"),
      "@components/*": resolve(__dirname, "./src/components/*"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@hooks/*": resolve(__dirname, "./src/hooks/*"),
      "@test": resolve(__dirname, "./src/test"),
      "@test/*": resolve(__dirname, "./src/test/*"),
      "@definitions": resolve(__dirname, "./src/definitions"),
      "@definitions/*": resolve(__dirname, "./src/definitions/*"),
    },
  },
  esbuild: {
    target: "node22",
  },
});
