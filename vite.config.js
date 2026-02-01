/*import { defineConfig } from "vite";
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
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
    fs: {
      exclude: ["node_modules"],
    },
    historyApiFallback: true,
  },
  build: {
    sourcemap: command === "serve",
    assetsInclude: ["***.css"],
    rollupOptions: {
      external: [
        "node_modules/@mui/*",
        "node_modules/three-stdlib/*",
      ],
    },
  },
}); */


import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import sanitizeEval from "./vite-plugin-sanitize-eval";

// https://vitejs.dev/config/
export default ({ command }) => ({
  plugins: [react(), sanitizeEval()],
  base: '/portfolio-frontend-developer/',
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    sourcemap: command === "serve",
    assetsInclude: ["***.css"],
    rollupOptions: {
      external: [
        "node_modules/@mui/*",
        "node_modules/three-stdlib/*",
      ],
    },
  },
});