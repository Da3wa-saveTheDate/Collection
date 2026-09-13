import { SpeedInsights } from '@vercel/speed-insights/react';
import { privacyOptOut, sampleRate, telemetryEnabled } from '../lib/telemetry';

export default function PerformanceInsights() {
  if (!telemetryEnabled() || privacyOptOut() || import.meta.env.VITE_SPEED_INSIGHTS_ENABLED !== 'true') return null;
  return <SpeedInsights sampleRate={sampleRate(import.meta.env.VITE_PERFORMANCE_SAMPLE_RATE, 0.1)} beforeSend={(event) => {
    const url = new URL(event.url);
    url.search = '';
    url.hash = '';
    return { ...event, url: url.toString() };
  }} />;
}
