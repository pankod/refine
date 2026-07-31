import { defineConfig, type UserConfig } from "tsdown";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin.ts";
import { prismReactRendererThemeReplacePlugin } from "../shared/prism-react-renderer-theme-replace-plugin.ts";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin.ts";
import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin.ts";
import { tablerCjsReplacePlugin } from "../shared/tabler-cjs-replace-plugin.ts";

const sharedConfig: UserConfig = {
  outDir: "dist",
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
    removeTestIdsPlugin,
    lodashReplacePlugin,
    prismReactRendererThemeReplacePlugin,
    markAsExternalPlugin,
  ],
  banner: {
    js: '"use client";',
  },
  outputOptions: {
    codeSplitting: false,
    keepNames: true,
  },
};

const entries = {
  index: "src/index.tsx",
  headless: "src/inferencers/headless/index.tsx",
  mantine: "src/inferencers/mantine/index.tsx",
  mui: "src/inferencers/mui/index.tsx",
  antd: "src/inferencers/antd/index.tsx",
  "chakra-ui": "src/inferencers/chakra-ui/index.tsx",
};

export default defineConfig((options) =>
  Object.entries(entries).map(([name, entryPath], idx) => ({
    ...sharedConfig,
    entry: {
      [name]: entryPath,
    },
    onSuccess: idx === 0 && options.watch ? "pnpm types" : undefined,
  })),
);
