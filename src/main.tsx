import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@sentry/react'
import { initializeTelemetry } from './lib/telemetry'

initializeTelemetry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="text-3xl font-serif">We couldn’t load the collection</h1>
        <p>Please refresh the page to try again.</p>
        <button className="rounded-full bg-brand-dark text-white px-6 py-3" onClick={() => window.location.reload()}>Refresh page</button>
        <a href="https://wa.me/201042353785" className="underline">Contact Ajwaa on WhatsApp</a>
      </main>
    }>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
