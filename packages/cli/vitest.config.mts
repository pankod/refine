import { defineConfig } from "vitest/config";
import path from "path";

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
    testTimeout: 25000,
  },
  resolve: {
    alias: {
      // Path mappings from tsconfig.json
      "@definitions": path.resolve(__dirname, "./src/definitions"),
      "@definitions/*": path.resolve(__dirname, "./src/definitions/*"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@utils/*": path.resolve(__dirname, "./src/utils/*"),
      "@commands": path.resolve(__dirname, "./src/commands"),
      "@commands/*": path.resolve(__dirname, "./src/commands/*"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@components/*": path.resolve(__dirname, "./src/components/*"),
      "@telemetry": path.resolve(__dirname, "./src/telemetry"),
      "@telemetry*": path.resolve(__dirname, "./src/telemetry/*"),
      "@transformers": path.resolve(__dirname, "./src/transformers"),
      "@transformers/*": path.resolve(__dirname, "./src/transformers/*"),
      // Handle .js extension mapping
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  esbuild: {
    target: "node22",
  },
});
