import posthog from 'posthog-js';
import * as Sentry from '@sentry/react';
import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

type AnalyticsEvents = {
  '$pageview': Record<string, never>;
  pricing_viewed: Record<string, never>;
  template_opened: { template: string; category: string; location: string };
  whatsapp_clicked: { template?: string; category?: string; package?: string; location: string };
  web_vital: { metric: string; value: number; rating: string; unit: string };
  support_opened: Record<string, never>;
  support_answer_viewed: { topic: string };
};

let initialized = false;
let analyticsReady = false;

export function privacyOptOut() {
  return navigator.doNotTrack === '1'
    || Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
}

export function sampleRate(value: string | undefined, fallback: number) {
  const parsed = value === undefined || value === '' ? fallback : Number(value);
  return Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : fallback;
}

function trafficSource() {
  const source = new URLSearchParams(window.location.search).get('utm_source')?.toLowerCase();
  // Do not send arbitrary campaign strings, referring URLs, or customer data.
  if (source) return ['instagram', 'facebook', 'google', 'tiktok', 'whatsapp'].includes(source) ? source : 'other';
  return 'unattributed';
}

function startWebVitals() {
  if (Math.random() >= sampleRate(import.meta.env.VITE_PERFORMANCE_SAMPLE_RATE, 0.1)) return;
  const sent = new Set<string>();
  const report = ({ name, value, rating }: Metric) => {
    if (sent.has(name) || !Number.isFinite(value) || value < 0) return;
    sent.add(name);
    trackEvent('web_vital', { metric: name, value, rating, unit: name === 'CLS' ? 'score' : 'ms' });
  };
  onCLS(report);
  onINP(report);
  onLCP(report);
}

export function telemetryEnabled() {
  const hosts = (import.meta.env.VITE_TELEMETRY_ALLOWED_HOSTS || 'ajwa2-collection.vercel.app')
    .split(',').map((host: string) => host.trim());
  return import.meta.env.PROD && import.meta.env.VITE_TELEMETRY_ENABLED === 'true'
    && hosts.includes(window.location.hostname);
}

// Explicitly allow only catalog metadata and anonymous SDK identifiers.
const allowedProperties = new Set([
  'token', 'distinct_id', '$device_id', '$session_id', '$window_id', '$lib', '$lib_version',
  '$insert_id', '$time', '$process_person_profile', '$is_identified',
  '$device_type', '$browser', '$os',
  'metric', 'value', 'rating', 'unit', 'traffic_source', 'release', 'topic',
  'template', 'category', 'package', 'location', '$current_url', '$pathname', '$host',
]);

export function initializeTelemetry() {
  if (initialized || !telemetryEnabled()) return;
  initialized = true;

  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: 'production',
      release: import.meta.env.VITE_APP_RELEASE || undefined,
      sendDefaultPii: false,
      tracesSampleRate: privacyOptOut() ? 0 : sampleRate(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE, 0.05),
      tracePropagationTargets: [],
      integrations: privacyOptOut() ? [] : [Sentry.browserTracingIntegration({
        instrumentNavigation: false,
        traceFetch: false,
        traceXHR: false,
        enableLongTask: false,
        enableLongAnimationFrame: false,
        enableInp: false,
        ignorePerformanceApiSpans: [/.*/],
      })],
      beforeSendSpan(span) {
        return { ...span, description: span.op || 'operation', data: {} };
      },
      beforeSendTransaction(event) {
        delete event.user;
        delete event.request;
        if (event.sdkProcessingMetadata) delete event.sdkProcessingMetadata.normalizedRequest;
        delete event.extra;
        event.breadcrumbs = [];
        event.transaction = '/';
        event.tags = {};
        event.contexts = event.contexts?.trace ? { trace: {
          trace_id: event.contexts.trace.trace_id,
          span_id: event.contexts.trace.span_id,
          op: 'pageload',
        } } : {};
        event.spans = event.spans?.map((span) => ({ ...span, description: span.op || 'operation', data: {} }));
        return event;
      },
      // No replay or DOM/network breadcrumbs.
      beforeBreadcrumb: () => null,
      beforeSend(event) {
        delete event.user;
        delete event.request;
        if (event.sdkProcessingMetadata) delete event.sdkProcessingMetadata.normalizedRequest;
        delete event.extra;
        event.breadcrumbs = [];
        // Error messages can contain user input or request URLs.
        if (event.message) event.message = 'Application error';
        for (const exception of event.exception?.values ?? []) {
          exception.value = 'Application error (message removed for privacy)';
          for (const frame of exception.stacktrace?.frames ?? []) {
            if (frame.filename) frame.filename = frame.filename.split(/[?#]/)[0];
            delete frame.vars;
          }
        }
        return event;
      },
    });
  }

  if (!import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || privacyOptOut()) return;

  try {
    posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com',
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_exceptions: false,
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_feature_flags: true,
      person_profiles: 'never',
      persistence: 'memory',
      before_send(event) {
        if (!event) return null;
        event.properties = Object.fromEntries(Object.entries(event.properties)
          .filter(([key]) => allowedProperties.has(key)));
        return event;
      },
    });
    analyticsReady = true;
    trackEvent('$pageview', {});
    startWebVitals();
  } catch {
    // Analytics must never prevent browsing or ordering.
    analyticsReady = false;
  }
}

export function trackEvent<T extends keyof AnalyticsEvents>(name: T, properties: AnalyticsEvents[T]) {
  if (!analyticsReady) return;
  try {
    posthog.capture(name, {
      ...properties,
      traffic_source: trafficSource(),
      release: import.meta.env.VITE_APP_RELEASE || 'unknown',
      $current_url: `${window.location.origin}${window.location.pathname}`,
      $pathname: window.location.pathname,
      $host: window.location.host,
    });
  } catch {
    // Preserve the action even if a tracker is blocked or unavailable.
  }
}
