import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react()
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    },
    base: env.VITE_REPORT_URL || '/rep',
    server: {
      port: Number(env.REPORT_PORT) || 3040,
      strictPort: true,
      proxy: {
        '/auth': {
          target: 'http://localhost:' + (env.AUTH_BACK_PORT || "8090"),
          changeOrigin: true,
          secure: false,
        },
        '/logout': {
          target: 'http://localhost:' + (env.AUTH_BACK_PORT || "8090"),
          changeOrigin: true,
          secure: false,
        },
        '/api': {
          target: 'http://localhost:' + (env.REPORT_BACK_PORT || "8083"),
          changeOrigin: true,
          secure: false,
        },
      }
    }
  }
})
