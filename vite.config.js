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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/**/*', // Копируем всё из src/assets
          dest: 'assets' // В dist/assets
        }
      ]
    })
  ],
  base: '/portfolio-frontend-developer/',
  
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    copyPublicDir: false, // Отключаем копирование public если его нет
    
    rollupOptions: {
      output: {
        // JS/CS файлы
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        // Остальные assets (картинки, шрифты и т.д.)
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|ico|webp/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/woff2?|ttf|eot|otf/i.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
}));