import { defineConfig } from "tsdown";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";
import { muiIconsMaterialEsmReplacePlugin } from "../shared/mui-icons-material-esm-replace-plugin";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin";

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
  dts: true,
  format: ["cjs", "esm"],
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
