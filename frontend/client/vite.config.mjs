import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base:'/',
    plugins: [react()],
    server: {
        watch: {
            usePolling:true,
        },
        host: true,
        strictPort: true,
        port:3000
    }
})