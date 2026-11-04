import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
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
