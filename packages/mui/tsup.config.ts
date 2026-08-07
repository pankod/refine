import { defineConfig } from "tsup";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";
import { muiIconsMaterialEsmReplacePlugin } from "../shared/mui-icons-material-esm-replace-plugin";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  dts: true,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildPlugins: [
    removeTestIdsPlugin,
    muiIconsMaterialEsmReplacePlugin,
    dayJsEsmReplacePlugin,
    lodashReplacePlugin,
    markAsExternalPlugin,
  ],
  loader: {
    ".svg": "dataurl",
  },
  esbuildOptions(options) {
    options.keepNames = true;
    options.banner = {
      js: '"use client"',
    };
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
