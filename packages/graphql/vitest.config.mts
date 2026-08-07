import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./test/vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  esbuild: {
    target: "node22",
  },
});
