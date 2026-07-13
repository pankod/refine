import { defineConfig } from "tsup";
import * as fs from "fs";
import path from "path";
import copyStaticFiles from "esbuild-copy-static-files";

import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";
import { dayJsEsmReplacePlugin } from "../shared/dayjs-esm-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildPlugins: [
    removeTestIdsPlugin,
    {
      name: "antd-lib-2-es-module-replacement",
      setup: (build) => {
        if (build.initialOptions.format === "cjs") {
          return;
        }
        if (build.initialOptions.format === "esm") {
          build.onLoad(
            {
              filter:
                /\/src\/components\/antd\/(antd|calendar|datePicker|timePicker).*/,
            },
            async (args) => {
              const contents = await fs.promises.readFile(args.path, "utf8");

              const extension = path.extname(args.path).replace(".", "");

              const loader = JS_EXTENSIONS.has(extension)
                ? "jsx"
                : (extension as any);

              const replacements = [
                [/antd\/lib\//g, "antd/es/"],
                [/rc-picker\/lib\//g, "rc-picker/es/"],
              ] as const;

              const newContents = replacements.reduce(
                (acc, [regex, replacement]) => acc.replace(regex, replacement),
                contents,
              );

              return {
                loader,
                contents: newContents,
              };
            },
          );
        }
      },
    },
    dayJsEsmReplacePlugin,
    copyStaticFiles({
      src: "./src/assets/styles/reset.css",
      dest: "./dist/reset.css",
    }),
    markAsExternalPlugin,
  ],
  loader: {
    ".svg": "dataurl",
  },
  esbuildOptions(options) {
    options.keepNames = true;
    options.banner = {
      js: '"use client"',
    };
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
