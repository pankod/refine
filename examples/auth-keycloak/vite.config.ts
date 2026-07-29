import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Khi dev local, frontend vẫn gọi /api giống môi trường Ingress.
      // Vite chuyển tiếp request sang backend và bỏ tiền tố /api vì Express
      // hiện khai báo các route ở /devices, /dashboards, ...
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
