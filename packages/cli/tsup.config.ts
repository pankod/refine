import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import fs from "fs";
import path from "path";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

const getRefinePackageNames = () => {
  try {
    const ignored = [
      "live-previews",
      "cli",
      "antd-audit-log",
      "demo-sidebar",
      "create-refine-app",
      "ui-types",
      "ui-tests",
    ];

    const dirs = fs.readdirSync("../");

    const packages = dirs.filter(
      (el) => !el.startsWith(".") && el !== "cli" && !ignored.includes(el),
    );

    return packages;
  } catch (error) {
    return [];
  }
};

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/cli.ts"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "node",
  external: [
    ".bin/next",
    ".bin/craco",
    ".bin/react-scripts",
    ".bin/parcel",
    ".bin/remix-serve",
    ".bin/remix",
    ".bin/vite",
  ],
  esbuildPlugins: [
    {
      name: "textReplace",
      setup: (build) => {
        build.onLoad({ filter: /\.ts$/ }, (args) => {
          const contents = fs.readFileSync(args.path, "utf8");

          const extension = path.extname(args.path).replace(".", "");
          const loader = JS_EXTENSIONS.has(extension)
            ? "jsx"
            : (extension as any);

          const packageListRegex = /const REFINE_PACKAGES = \[(.|\s)*?\];/gm;
          const hasPackageList = contents.match(packageListRegex);

          if (!hasPackageList) {
            return {
              loader,
              contents,
            };
          }

          const packageList = getRefinePackageNames();

          return {
            loader,
            contents: contents.replace(
              packageListRegex,
              `const REFINE_PACKAGES = [${packageList
                .map((el) => `"${el}"`)
                .join(", ")}];`,
            ),
          };
        });
      },
    },
    NodeResolvePlugin({
      extensions: [".js", "ts", "tsx", "jsx"],
      onResolved: (resolved) => {
        if (resolved.includes("node_modules")) {
          return {
            external: true,
          };
        }
        return resolved;
      },
    }),
  ],
  onSuccess: options.watch ? "pnpm types" : undefined,
}));
