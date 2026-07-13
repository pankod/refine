import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import * as dns from "dns";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "categories",
      filename: "categories.js",
      exposes: {
        "./CategoryList": "./src/pages/categories/list.tsx",
        "./CategoryShow": "./src/pages/categories/show.tsx",
        "./CategoryEdit": "./src/pages/categories/edit.tsx",
        "./CategoryCreate": "./src/pages/categories/create.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "@refinedev/core",
        "@refinedev/antd",
        "antd",
      ],
    }),
    tsconfigPaths({ root: __dirname }),
  ],
  preview: {
    host: "localhost",
    port: 4002,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
