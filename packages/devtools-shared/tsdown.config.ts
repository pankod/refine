import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  outputOptions: {
    inlineDynamicImports: true,
  },
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  banner: {
    js: '"use client"',
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
