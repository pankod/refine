import { defineConfig } from "tsdown";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { replaceCoreVersionPlugin } from "../shared/replace-core-version-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  outputOptions: {
    inlineDynamicImports: true,
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
  plugins: [
    replaceCoreVersionPlugin,
    lodashReplacePlugin,
    markAsExternalPlugin,
  ],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
