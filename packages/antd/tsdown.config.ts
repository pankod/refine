import { defineConfig } from "tsdown";
import type { Plugin } from "rolldown";
import copy from "rollup-plugin-copy";

import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";

const ANTD_TARGET_REGEX =
  /\/src\/components\/antd\/(antd|calendar|datePicker|timePicker).*/;

/**
 * Replaces CJS imports (antd/lib/, rc-picker/lib/) with ESM equivalents (antd/es/, rc-picker/es/)
 */
const antdLibToEsPlugin = (): Plugin => ({
  name: "antd-lib-2-es-module-replacement",
  renderChunk(code, chunk, options) {
    if (options.format === "cjs") return null;

    if (!ANTD_TARGET_REGEX.test(chunk.fileName)) return null;

    return {
      code: code
        .replace(/antd\/lib\//g, "antd/es/")
        .replace(/rc-picker\/lib\//g, "rc-picker/es/"),
      map: null,
    };
  },
});

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
    removeTestIdsPlugin,
    antdLibToEsPlugin(),
    dayJsEsmReplacePlugin,
    copy({
      targets: [{ src: "src/assets/styles/reset.css", dest: "dist" }],
      hook: "writeBundle",
    }),
    markAsExternalPlugin,
  ],
  loader: {
    ".svg": "dataurl",
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
