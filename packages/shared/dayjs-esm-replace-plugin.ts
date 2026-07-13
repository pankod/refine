import type { Plugin } from "esbuild";

export const dayJsEsmReplacePlugin: Plugin = {
  name: "dayJsEsmReplace",
  setup: (build) => {
    if (build.initialOptions.format === "esm") {
      build.onEnd((args) => {
        const dayJsImportRegexp = /from\s?"dayjs\/plugin\/(\w*?)"/g;
        const dayJsEsmImport = 'from "dayjs/plugin/$1.js"';

        const jsOutputFiles =
          args.outputFiles?.filter(
            (el) => el.path.endsWith(".mjs") || el.path.endsWith(".js"),
          ) ?? [];

        for (const jsOutputFile of jsOutputFiles) {
          const str = new TextDecoder("utf-8").decode(jsOutputFile.contents);
          const newStr = str.replace(dayJsImportRegexp, dayJsEsmImport);
          jsOutputFile.contents = new TextEncoder().encode(newStr);
        }
      });
    }
  },
};
