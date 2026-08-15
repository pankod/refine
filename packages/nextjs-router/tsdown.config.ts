import { defineConfig, type UserConfig } from "tsdown";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import { nextJsEsmReplacePlugin } from "../shared/next-js-esm-replace-plugin.ts";

const sharedConfig: Partial<UserConfig> = {
  outDir: "dist",
  outputOptions: {
    codeSplitting: false,
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
  plugins: [nextJsEsmReplacePlugin],
};

export default defineConfig((options) => [
  {
    entry: { index: "src/index.ts" },
    banner: { js: '"use client"' },
    ...sharedConfig,
    onSuccess: options.watch ? "pnpm types" : undefined,
  },
  {
    entry: { app: "src/app/index.ts" },
    banner: { js: '"use client";' },
    ...sharedConfig,
    onSuccess: options.watch ? "pnpm types" : undefined,
  },
  {
    entry: { pages: "src/pages/index.ts" },
    ...sharedConfig,
  },
  {
    entry: {
      "parse-table-params": "src/common/parse-table-params.ts",
    },
    ...sharedConfig,
    onSuccess: options.watch ? "pnpm types" : undefined,
  },
]);
