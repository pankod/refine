import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
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
