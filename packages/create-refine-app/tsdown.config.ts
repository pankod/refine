import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  outputOptions: {
    inlineDynamicImports: true,
  },
  sourcemap: true,
  clean: false,
  platform: "node",
  format: ["cjs", "esm", "iife"],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
