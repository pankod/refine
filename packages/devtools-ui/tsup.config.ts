import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/style.css"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildPlugins: [
    lodashReplacePlugin,
    dayJsEsmReplacePlugin,
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
