import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/vitest.setup.ts"],
    globals: true,
    testTimeout: 25000,
    coverage: {
      exclude: ["src/index.ts"],
    },
  },
  resolve: {
    alias: {
      // Path mappings from tsconfig.json
      "@": path.resolve(__dirname, "./src"),
      "@/*": path.resolve(__dirname, "./src/*"),
      "@test": path.resolve(__dirname, "./test"),
      "@test/*": path.resolve(__dirname, "./test/*"),
      // Handle .js extension mapping and CSS
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  css: {
    modules: {
      classNameStrategy: "non-scoped",
    },
  },
  // Fix for MUI X v8 ESM imports
  ssr: {
    noExternal: ["@mui/x-data-grid"],
  },
  assetsInclude: ["**/*.svg"],
  esbuild: {
    target: "node22",
  },
});
