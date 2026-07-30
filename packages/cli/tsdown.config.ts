import { defineConfig, type UserConfig } from "tsdown";
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

const textReplacePlugin = () => ({
  name: "textReplace",
  transform(code: string, id: string) {
    const ext = path.extname(id).replace(".", "");
    if (!JS_EXTENSIONS.has(ext)) return null;

    const packageListRegex = /const REFINE_PACKAGES = \[(.|\s)*?\];/gm;
    if (!packageListRegex.test(code)) return null;

    const packageList = getRefinePackageNames();
    const newCode = code.replace(
      packageListRegex,
      `const REFINE_PACKAGES = [${packageList
        .map((el) => `"${el}"`)
        .join(", ")}];`,
    );

    return {
      code: newCode,
      map: null,
    };
  },
});

export default defineConfig((options) => {
  const sharedConfig: UserConfig = {
    format: ["cjs", "esm"],
    platform: "node",
    sourcemap: true,
    clean: false,
    minify: false,
    plugins: [textReplacePlugin()],
    outputOptions: {
      inlineDynamicImports: true,
    },
    external: [
      ".bin/next",
      ".bin/craco",
      ".bin/react-scripts",
      ".bin/parcel",
      ".bin/remix-serve",
      ".bin/remix",
      ".bin/vite",
    ],
    onSuccess: options.watch ? "pnpm types" : undefined,
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
