import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/vitest.setup.ts"],
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
      // Handle .js extension mapping
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  esbuild: {
    target: "node22",
  },
});
