import { defineConfig, type Options } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import { nextJsEsmReplacePlugin } from "../shared/next-js-esm-replace-plugin";

const sharedConfig: Partial<Options> = {
  outDir: "dist",
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildPlugins: [
    NodeResolvePlugin({
      extensions: [".js", "ts", "tsx", "jsx"],
      onResolved: (resolved) => {
        if (resolved.includes("node_modules")) {
          return {
            external: true,
          };
        }
        return resolved;
      },
    }),
    nextJsEsmReplacePlugin,
  ],
};

export default defineConfig((options) => [
  {
    entry: {
      index: "src/index.ts",
      app: "src/app/index.ts",
    },
    esbuildOptions(options) {
      options.banner = {
        js: '"use client"',
      };
    },
    ...sharedConfig,
    onSuccess: options.watch ? "pnpm types" : undefined,
  },
  {
    entry: {
      pages: "src/pages/index.ts",
    },
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
