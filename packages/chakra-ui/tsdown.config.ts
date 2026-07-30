import { defineConfig } from "tsdown";

import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";
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
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  plugins: [
    markAsExternalPlugin,
    tablerCjsReplacePlugin,
    dayJsEsmReplacePlugin,
    removeTestIdsPlugin,
  ],
  loader: {
    ".svg": "dataurl",
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
