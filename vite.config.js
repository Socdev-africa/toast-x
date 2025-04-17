import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
    plugins: [
        react(),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'toast-x',
            fileName: function (format) { return "toast-x.".concat(format, ".js"); },
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
    },
});
