import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

const copyStylesPlugin = {
  name: 'copy-styles',
  writeBundle() {
    try {
      if (fs.existsSync('src/styles.css')) {
        const content = fs.readFileSync('src/styles.css', 'utf-8');
        
        if (!fs.existsSync('dist')) {
          fs.mkdirSync('dist');
        }
        
        fs.writeFileSync('dist/styles.css', content);
        console.log('✅ styles.css copied to dist successfully');
      } else {
        console.warn('⚠️ src/styles.css not found');
      }
    } catch (error) {
      console.error('❌ Error copying styles.css:', error);
    }
  }
};

export default defineConfig({
  plugins: [
    react(),
    copyStylesPlugin
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'toast-x',
      fileName: (format) => `toast-x.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'framer-motion', 'markdown-it', 'uuid'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'framerMotion',
          'markdown-it': 'markdownit',
          'uuid': 'uuid'
        },
      },
    },
    copyPublicDir: false,
  },
});