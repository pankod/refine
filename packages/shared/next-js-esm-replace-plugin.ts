import type { Plugin } from "esbuild";

export const nextJsEsmReplacePlugin: Plugin = {
  name: "nextJsEsmReplace",
  setup: (build) => {
    if (build.initialOptions.format === "esm") {
      build.onEnd(async (args) => {
        const nextJsImportRegexp = /from\s?"next\/(\w*?)"/g;
        const nextJsEsmImport = 'from "next/$1.js"';

        const jsOutputFiles =
          args.outputFiles?.filter(
            (el) => el.path.endsWith(".mjs") || el.path.endsWith(".js"),
          ) ?? [];

        for (const jsOutputFile of jsOutputFiles) {
          const str = new TextDecoder("utf-8").decode(jsOutputFile.contents);
          const newStr = str.replace(nextJsImportRegexp, nextJsEsmImport);
          jsOutputFile.contents = new TextEncoder().encode(newStr);
        }
      });
    }
  },
};
