import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tempo } from "tempo-devtools/dist/vite";

const conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push("tempo-devtools/dist/babel-plugin");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [...conditionalPlugins],
      },
    }),
    tempo(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
});
