import { defineConfig } from "tsdown";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  outputOptions: {
    codeSplitting: false,
  },
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  plugins: [markAsExternalPlugin],
  loader: {
    ".svg": "dataurl",
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
