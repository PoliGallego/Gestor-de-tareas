import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react() 
    ],
    base: env.VITE_SIGNUP_URL || '/sign-up',
    server: {
      port: Number(env.SIGNUP_PORT) || 3010,
      strictPort: true,
      proxy: {
        '/signup': {
          target: 'http://localhost:' + env.AUTH_BACK_PORT || "8090",
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
