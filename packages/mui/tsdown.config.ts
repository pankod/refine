import { defineConfig } from "tsdown";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin.ts";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin.ts";
import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin.ts";
import { muiIconsMaterialEsmReplacePlugin } from "../shared/mui-icons-material-esm-replace-plugin.ts";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin.ts";

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
  dts: true,
  format: ["cjs", "esm"],
  outExtensions({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
  platform: "browser",
  plugins: [
    removeTestIdsPlugin,
    muiIconsMaterialEsmReplacePlugin,
    dayJsEsmReplacePlugin,
    lodashReplacePlugin,
    markAsExternalPlugin,
  ],
  loader: {
    ".svg": "dataurl",
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
