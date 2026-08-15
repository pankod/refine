import { defineConfig } from "tsdown";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin.ts";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin.ts";

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
  plugins: [markAsExternalPlugin, lodashReplacePlugin],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
