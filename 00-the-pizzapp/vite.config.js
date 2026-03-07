import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  server: {
    port: 1924,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
      // enabled: true
    },
    projects: ["./vitest.*.config.js"],
  },
});
