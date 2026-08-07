import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
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
      // Force CommonJS build for http adapter to be available.
      // via https://github.com/axios/axios/issues/5101#issuecomment-1276572468
      "^axios$": "axios",
      // Handle .js extension mapping
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  esbuild: {
    target: "node22",
  },
});
