import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    importToCDN({
      modules: [
        {
          name: "refine-min.css",
          var: "refine",
          path: "https://refine.ams3.cdn.digitaloceanspaces.com/assets/css/refine.min.css",
          css: "https://refine.ams3.cdn.digitaloceanspaces.com/assets/css/refine.min.css",
        },
      ],
    }),
  ],
});
