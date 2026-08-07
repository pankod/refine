import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/vitest.setup.ts"],
    globals: true,
  },
  esbuild: {
    target: "node22",
  },
});
