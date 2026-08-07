import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "sq5j3e",
  retries: {
    runMode: 3,
  },
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 1,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      return {
        ...config,
        browsers: config.browsers.filter(
          (b) => b.family === "chromium" && b.name !== "electron",
        ),
      };
    },
  },
});
