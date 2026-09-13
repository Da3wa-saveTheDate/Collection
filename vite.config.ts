import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import publicTelemetry from './telemetry.public.json' with { type: 'json' }

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), 'VITE_')
  return {
  base: './',
  // These browser ingestion identifiers are public, not management API keys.
  // Hosting environment variables (including explicit blanks) take precedence.
  define: Object.fromEntries(Object.entries({ ...publicTelemetry,
    VITE_APP_RELEASE: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? 'local',
  }).map(([key, value]) => [
    `import.meta.env.${key}`,
    JSON.stringify(environment[key] ?? value),
  ])),
  build: { sourcemap: process.env.SENTRY_AUTH_TOKEN ? 'hidden' : false },
  plugins: [react(), tailwindcss(), ...(process.env.SENTRY_AUTH_TOKEN ? [sentryVitePlugin({
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    telemetry: false,
    sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] },
  })] : [])],
  }
})
