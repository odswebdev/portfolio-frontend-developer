// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Вместо vite-plugin-static-copy используем простую функцию
export default defineConfig({
  plugins: [react()],
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
    
    // Копируем assets при сборке
    rollupOptions: {
      plugins: [
        {
          name: 'copy-assets-manual',
          closeBundle() {
            const fs = require('fs');
            const path = require('path');
            
            const srcDir = path.resolve(__dirname, 'src/assets');
            const destDir = path.resolve(__dirname, 'dist/assets');
            
            if (fs.existsSync(srcDir)) {
              copyDirSync(srcDir, destDir);
              console.log('✅ Assets скопированы в dist/assets');
            }
            
            function copyDirSync(src, dest) {
              if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest, { recursive: true });
              }
              
              const entries = fs.readdirSync(src, { withFileTypes: true });
              
              for (const entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);
                
                if (entry.isDirectory()) {
                  copyDirSync(srcPath, destPath);
                } else {
                  fs.copyFileSync(srcPath, destPath);
                }
              }
            }
          }
        }
      ],
      
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|ico|webp/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});