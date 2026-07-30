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
  platform: "browser",
  define: {
    __DEV_CONDITION__: "process.env.NODE_ENV",
  },
  banner: {
    js: '"use client"',
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
