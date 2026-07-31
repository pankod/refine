import { defineConfig, type UserConfig } from "tsdown";

const sharedConfig: UserConfig = {
  sourcemap: true,
  dts: {
    sourcemap: true,
  },
  clean: false,
  minify: false,
  format: ["cjs", "esm"],
  outExtensions({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
  platform: "browser",
  outputOptions: {
    codeSplitting: false,
  },
};

const entries = {
  index: "src/index.ts",
  "nestjsx-crud": "src/data-providers/nestjsx-crud/index.ts",
  "simple-rest": "src/data-providers/simple-rest/index.ts",
  "strapi-v4": "src/data-providers/strapi-v4/index.ts",
};

export default defineConfig((options) =>
  Object.entries(entries).map(([name, entryPath], idx) => ({
    ...sharedConfig,
    entry: {
      [name]: entryPath,
    },
    onSuccess: idx === 0 && options.watch ? "pnpm types" : undefined,
  })),
);
