import { defineConfig } from "tsdown";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
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
  plugins: [lodashReplacePlugin],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
