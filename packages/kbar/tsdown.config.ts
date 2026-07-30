import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  outputOptions: {
    codeSplitting: false,
    keepNames: true,
  },
  banner: {
    js: '"use client"',
  },
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
