import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

const env = loadEnv(
    'all',
    process.cwd()
);
const frontend_port = env.VITE_FRONTEND_PORT;
const backend_port = env.BACKEND_PORT;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Setup aliases
    },

  },
  server: {
    proxy: {
      '/api': ('http://localhost:' + backend_port)
    },
    port: parseInt(frontend_port || '3000'),
  },
  build: {
    // Adjust build options
  }
});
