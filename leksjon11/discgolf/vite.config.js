import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for React app with basic test setup
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
