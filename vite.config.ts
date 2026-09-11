import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: { sourcemap: process.env.SENTRY_AUTH_TOKEN ? 'hidden' : false },
  plugins: [react(), tailwindcss(), ...(process.env.SENTRY_AUTH_TOKEN ? [sentryVitePlugin({
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    telemetry: false,
    sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] },
  })] : [])],
})
