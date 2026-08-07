import { defineConfig } from "tsup";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildPlugins: [markAsExternalPlugin, lodashReplacePlugin],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
