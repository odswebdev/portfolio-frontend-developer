import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import sanitizeEval from "./vite-plugin-sanitize-eval";

export default ({ command }) => ({
  plugins: [react(), sanitizeEval()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  server: {
    proxy: {
      "/api": {
        // Префикс для запросов
        target: "http://localhost:3000", // Адрес вашего backend-сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
    fs: {
      // Исключение директории из файловой системы
      exclude: ["node_modules"],
    },
    historyApiFallback: true, // 👈 важный момент
  },
  build: {
    sourcemap: command === "serve",
    assetsInclude: ["**/*.css"],
    rollupOptions: {
      external: [
        // Исключить модули из сборки
        "node_modules/@mui/*",
        "node_modules/three-stdlib/*",
      ],
    },
  },
});
