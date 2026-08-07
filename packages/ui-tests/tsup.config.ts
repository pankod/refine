import { defineConfig } from "tsup";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildPlugins: [markAsExternalPlugin],
  loader: {
    ".svg": "dataurl",
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
