import type { Plugin } from "esbuild";
import * as fs from "fs";
import path from "path";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

export const lodashReplacePlugin: Plugin = {
  name: "replaceLodashWithLodashEsForEsm",
  setup: (build) => {
    if (build.initialOptions.format === "esm") {
      build.onLoad({ filter: /.*/ }, (args) => {
        const contents = fs.readFileSync(args.path, "utf8");

        const extension = path.extname(args.path).replace(".", "");
        const loader = JS_EXTENSIONS.has(extension)
          ? "jsx"
          : (extension as any);

        const lodashImportRegex =
          /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)[\'\"](?:(?:lodash\/?.*?))[\'\"][\s]*?(?:;|$|)/g;

        const isExternal = !args.path.startsWith(process.cwd());

        const lodashImports = contents.match(lodashImportRegex);
        if (!lodashImports || isExternal) {
          return;
        }

        return {
          loader,
          contents: contents.replace(/"lodash\/(.*?)"/g, '"lodash-es/$1.js"'),
        };
      });
    }
  },
};
