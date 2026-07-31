import { defineConfig } from "tsdown";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin.ts";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  outputOptions: {
    codeSplitting: false,
  },
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  define: {
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
  },
  banner: {
    js: '"use client"',
  },
  plugins: [lodashReplacePlugin],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
