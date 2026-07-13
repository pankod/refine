import type { Plugin } from "esbuild";

export const prismReactRendererThemeReplacePlugin: Plugin = {
  name: "prismReactRendererThemeReplace",
  setup: (build) => {
    if (build.initialOptions.format === "esm") {
      build.onEnd(async (args) => {
        const prismReactRendererThemeImportRegexp =
          /from\s?"prism-react-renderer\/themes\/(\w*?)"/g;
        const prismReactRendererThemeEsmImport =
          'from "prism-react-renderer/themes/$1/index.js"';

        const jsOutputFiles =
          args.outputFiles?.filter(
            (el) => el.path.endsWith(".mjs") || el.path.endsWith(".js"),
          ) ?? [];

        for (const jsOutputFile of jsOutputFiles) {
          const str = new TextDecoder("utf-8").decode(jsOutputFile.contents);
          const newStr = str.replace(
            prismReactRendererThemeImportRegexp,
            prismReactRendererThemeEsmImport,
          );
          jsOutputFile.contents = new TextEncoder().encode(newStr);
        }
      });
    }
  },
};
