import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  entry: {
    index: "src/index.ts",
  },
  outputOptions: {
    inlineDynamicImports: true,
  },
  outDir: "dist",
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
