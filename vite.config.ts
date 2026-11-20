import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep the REACT_APP_ prefix so the Vercel setting (REACT_APP_API_URL) didn't have to change.
  envPrefix: ["VITE_", "REACT_APP_"],
  server: { port: 3002, strictPort: true },
  preview: { port: 3002 },
  // Same output folder as Create React App, so Vercel's settings stay as they are.
  build: { outDir: "build" },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    css: false,
  },
});
