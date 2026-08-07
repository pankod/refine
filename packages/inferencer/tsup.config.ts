import { defineConfig } from "tsup";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { prismReactRendererThemeReplacePlugin } from "../shared/prism-react-renderer-theme-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";
import { tablerCjsReplacePlugin } from "../shared/tabler-cjs-replace-plugin";

export default defineConfig((options) => ({
  entry: {
    index: "src/index.tsx",
    headless: "src/inferencers/headless/index.tsx",
    mantine: "src/inferencers/mantine/index.tsx",
    mui: "src/inferencers/mui/index.tsx",
    antd: "src/inferencers/antd/index.tsx",
    "chakra-ui": "src/inferencers/chakra-ui/index.tsx",
  },
  outDir: "dist",
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildPlugins: [
    tablerCjsReplacePlugin,
    removeTestIdsPlugin,
    lodashReplacePlugin,
    prismReactRendererThemeReplacePlugin,
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
