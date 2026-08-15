import { defineConfig } from "tsdown";

import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin.ts";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin.ts";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin.ts";
import { tablerCjsReplacePlugin } from "../shared/tabler-cjs-replace-plugin.ts";
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
  dts: {
    sourcemap: true,
  },
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtensions({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
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
