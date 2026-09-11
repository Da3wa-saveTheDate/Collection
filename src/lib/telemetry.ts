import posthog from 'posthog-js';
import * as Sentry from '@sentry/react';

type AnalyticsEvents = {
  '$pageview': Record<string, never>;
  pricing_viewed: Record<string, never>;
  template_opened: { template: string; category: string; location: string };
  whatsapp_clicked: { template?: string; category?: string; package?: string; location: string };
};

let initialized = false;
let analyticsReady = false;

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
  'template', 'category', 'package', 'location', '$current_url', '$pathname', '$host',
]);

export function initializeTelemetry() {
  if (initialized || !telemetryEnabled()) return;
  initialized = true;

  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: 'production',
      sendDefaultPii: false,
      // No tracing, replay, or DOM/network breadcrumbs in Phase 1.
      beforeBreadcrumb: () => null,
      beforeSend(event) {
        delete event.user;
        delete event.request;
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

  const privacyOptOut = navigator.doNotTrack === '1'
    || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
  if (!import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || privacyOptOut) return;

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
      $current_url: `${window.location.origin}${window.location.pathname}`,
      $pathname: window.location.pathname,
      $host: window.location.host,
    });
  } catch {
    // Preserve the action even if a tracker is blocked or unavailable.
  }
}
