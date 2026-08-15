import { defineConfig, type UserConfig } from "tsdown";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin.ts";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin.ts";

const sharedConfig: UserConfig = {
  outputOptions: {
    codeSplitting: false,
  },
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
