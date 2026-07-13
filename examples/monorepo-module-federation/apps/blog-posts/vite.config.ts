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
      name: "blog_posts",
      filename: "blog_posts.js",
      exposes: {
        "./BlogPostList": "./src/pages/blog-posts/list.tsx",
        "./BlogPostShow": "./src/pages/blog-posts/show.tsx",
        "./BlogPostEdit": "./src/pages/blog-posts/edit.tsx",
        "./BlogPostCreate": "./src/pages/blog-posts/create.tsx",
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
    port: 4001,
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
