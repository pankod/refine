import { defineConfig, type UserConfig } from "tsdown";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin.ts";

export default defineConfig((options) => {
  const onSuccess = [
    ...(options.watch ? ["pnpm types"] : []),
    ...(process.env.STANDALONE_DEVTOOLS_SERVER === "true" && options.watch
      ? ["pnpm start:server"]
      : []),
  ].join(" && ");

  const isDev = process.env.USE_DEV_ENV === "true" || Boolean(options.watch);

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
    platform: "node",
    define: {
      __DEVELOPMENT__: JSON.stringify(isDev),
    },
    plugins: [lodashReplacePlugin],
    onSuccess: onSuccess ? onSuccess : undefined,
  };

  return [
    {
      ...sharedConfig,
      entry: ["src/index.ts"],
    },
    {
      ...sharedConfig,
      entry: ["src/cli.ts"],
    },
  ];
});
