import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react()
    ],
    base: env.VITE_HOME_URL || '/',
    server: {
      port: Number(env.HOME_PORT) || 3001,
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
      }
    }
  }
}) 