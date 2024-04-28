import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }: { mode: string }) => {
    // Construct the path to the parent directory
    const parentDir = path.resolve(process.cwd(), '../');
    
    // Load environment variables from the parent directory
    const env = loadEnv(mode, parentDir, 'VITE_');
    console.debug('env', env);

    return defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                '/api': `http://localhost:${env.VITE_BACKEND_PORT}`,
            },
            port: parseInt(env.VITE_FRONTEND_PORT || '3000'),
        },
        // Additional configurations...
    });
};
