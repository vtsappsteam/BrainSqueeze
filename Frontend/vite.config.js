import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@/": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
