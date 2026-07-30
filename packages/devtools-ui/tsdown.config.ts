import { defineConfig } from "tsdown";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/style.css"],
  outputOptions: {
    inlineDynamicImports: true,
  },
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  plugins: [lodashReplacePlugin, dayJsEsmReplacePlugin],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
