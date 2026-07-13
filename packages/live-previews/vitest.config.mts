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
      "@": path.resolve(__dirname, "."),
    },
  },
  esbuild: {
    target: "node22",
  },
});
