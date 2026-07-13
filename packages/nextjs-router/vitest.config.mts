import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    name: "nextjs-router",
    environment: "happy-dom",
    setupFiles: ["./src/test/vitest.setup.ts"],
    exclude: ["**/node_modules/**", "**/example/**", "**/dist/**"],
    logHeapUsage: true,
    globals: true,
  },
});
