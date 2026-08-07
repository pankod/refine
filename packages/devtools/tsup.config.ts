import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildOptions: (options) => {
    options.define = {
      ...options.define,
      __DEV_CONDITION__: "process.env.NODE_ENV",
      __IMPORT_META_KEY__: "import.meta",
      __PROCESS_KEY__: "process",
      __PROCESS_ENV_REFINE_DEVTOOLS_PORT_KEY__:
        "process.env.REFINE_DEVTOOLS_PORT",
      __PROCESS_ENV_NEXT_PUBLIC_REFINE_DEVTOOLS_PORT_KEY__:
        "process.env.NEXT_PUBLIC_REFINE_DEVTOOLS_PORT",
      __PROCESS_ENV_REACT_APP_REFINE_DEVTOOLS_PORT_KEY__:
        "process.env.REACT_APP_REFINE_DEVTOOLS_PORT",
      __IMPORT_META_ENV_REFINE_DEVTOOLS_PORT_KEY__:
        "import.meta.env.REFINE_DEVTOOLS_PORT",
      __IMPORT_META_ENV_VITE_REFINE_DEVTOOLS_PORT_KEY__:
        "import.meta.env.VITE_REFINE_DEVTOOLS_PORT",
    };
    options.banner = {
      js: '"use client"',
    };
  },
  esbuildPlugins: [
    lodashReplacePlugin,
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
  ],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
