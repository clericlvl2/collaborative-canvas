import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: ['@emotion/styled'],
    },
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src/app'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@features': path.resolve(__dirname, './src/features'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@shared': path.resolve(__dirname, './src/shared'),
        },
    },
    plugins: [react()],
});
