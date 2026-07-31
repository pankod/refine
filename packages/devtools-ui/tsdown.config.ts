import { defineConfig, type UserConfig } from "tsdown";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";

const sharedConfig: UserConfig = {
  outputOptions: {
    codeSplitting: false,
  },
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  platform: "browser",
  plugins: [lodashReplacePlugin, dayJsEsmReplacePlugin],
  css: {
    transformer: "postcss",
  },
};

export default defineConfig((options) => [
  {
    ...sharedConfig,
    entry: ["src/index.ts"],
    onSuccess: options.watch ? "pnpm types" : undefined,
  },
]);
