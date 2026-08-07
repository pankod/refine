import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

export default defineConfig((options) => ({
  entry: {
    index: "src/index.ts",
    "nestjsx-crud": "src/data-providers/nestjsx-crud/index.ts",
    "simple-rest": "src/data-providers/simple-rest/index.ts",
    "strapi-v4": "src/data-providers/strapi-v4/index.ts",
  },
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
  ],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
