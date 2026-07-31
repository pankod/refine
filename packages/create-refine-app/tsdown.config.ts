import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  outputOptions: {
    codeSplitting: false,
  },
  sourcemap: true,
  clean: false,
  platform: "node",
  format: ["cjs", "esm", "iife"],
  outExtensions({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
