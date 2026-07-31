import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  entry: {
    index: "src/index.ts",
  },
  outputOptions: {
    codeSplitting: false,
  },
  outDir: "dist",
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtensions({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
  platform: "browser",
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
