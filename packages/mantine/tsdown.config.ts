import { defineConfig } from "tsdown";

import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { tablerCjsReplacePlugin } from "../shared/tabler-cjs-replace-plugin";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin";

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
  dts: {
    sourcemap: true,
  },
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  plugins: [
    tablerCjsReplacePlugin,
    dayJsEsmReplacePlugin,
    removeTestIdsPlugin,
    lodashReplacePlugin,
    markAsExternalPlugin,
  ],
  loader: {
    ".svg": "dataurl",
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
