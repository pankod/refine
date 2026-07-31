import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  outputOptions: {
    codeSplitting: false,
  },
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtensions({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
  platform: "browser",
  banner: {
    js: '"use client"',
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
