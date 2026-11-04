import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    base: env.VITE_PRIN_URL || '/board',
    server: {
      port: Number(env.PRIN_PORT) || 3020,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://localhost:' + (env.d || '8081'),
          changeOrigin: true,
          secure: false,
        }, 
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