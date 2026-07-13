import type { Plugin } from "esbuild";
import * as fs from "fs";
import path from "path";

import { getRefineCoreVersion } from "./get-refine-core-version";

export const replaceCoreVersionPlugin: Plugin = {
  name: "replaceCoreVersion",
  setup: (build) => {
    build.onLoad({ filter: /\.ts$/ }, (args) => {
      const contents = fs.readFileSync(args.path, "utf8");

      const extension = path.extname(args.path).replace(".", "");
      const loader = ["js", "cjs", "mjs"].includes(extension)
        ? "jsx"
        : (extension as any);

      const versionRegex = /const REFINE_VERSION = "\d.\d.\d";/gm;
      const hasVersion = contents.match(versionRegex);

      if (!hasVersion) {
        return;
      }

      const version = getRefineCoreVersion();

      return {
        loader,
        contents: contents.replace(
          versionRegex,
          `const REFINE_VERSION = "${version}";`,
        ),
      };
    });
  },
};
