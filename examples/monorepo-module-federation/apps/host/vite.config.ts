import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import * as dns from "dns";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");

  return {
    plugins: [
      react(),
      federation({
        name: "host",
        dts: false,
        remotes: {
          blog_posts: {
            type: "module",
            name: "blog_posts",
            entry: "http://localhost:4001/remoteEntry.js",
            entryGlobalName: "blog_posts",
            shareScope: "default",
          },
          categories: {
            type: "module",
            name: "categories",
            entry:
              env.VITE_CATEGORIES_URL || "http://localhost:4002/remoteEntry.js",
            entryGlobalName: "categories",
            shareScope: "default",
          },
        },
        filename: "remoteEntry.js",
        shared: [
          "react",
          "react-dom",
          "react-router",
          "@refinedev/core",
          "@refinedev/antd",
          "antd",
        ],
      }),
      tsconfigPaths({ root: __dirname }),
    ],

    preview: {
      host: "localhost",
      port: 4000,
      strictPort: true,
    },
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});
