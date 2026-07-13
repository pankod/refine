import type { Plugin } from "esbuild";
import * as fs from "fs";
import path from "path";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

export const tablerCjsReplacePlugin: Plugin = {
  name: "replaceTablerWithTablerCjsInCjs",
  setup: (build) => {
    if (build.initialOptions.format === "cjs") {
      build.onEnd((args) => {
        const tablerRequire = 'require("@tabler/icons-react")';
        const cjsTablerRequire =
          'require("@tabler/icons-react/dist/cjs/tabler-icons-react.cjs")';

        const jsOutputFiles =
          args.outputFiles?.filter(
            (el) =>
              el.path.endsWith(".cjs") ||
              el.path.endsWith(".mjs") ||
              el.path.endsWith(".js"),
          ) ?? [];

        for (const jsOutputFile of jsOutputFiles) {
          const str = new TextDecoder("utf-8").decode(jsOutputFile.contents);
          const newStr = str.replaceAll(tablerRequire, cjsTablerRequire);
          jsOutputFile.contents = new TextEncoder().encode(newStr);
        }
      });
    }
  },
};
