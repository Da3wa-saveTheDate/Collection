const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function setup({ env = {}, hostname = 'ajwa2-collection.vercel.app', navigator = {}, captureThrows = false, random = 0.99 } = {}) {
  const events = [];
  const configs = {};
  const settings = { PROD: true, VITE_TELEMETRY_ENABLED: 'true', VITE_POSTHOG_PROJECT_TOKEN: 'test', VITE_SENTRY_DSN: 'test', ...env };
  const posthog = {
    init(_token, config) { configs.posthog = config; },
    capture(event, properties) {
      if (captureThrows) throw new Error('Blocked');
      events.push(configs.posthog.before_send({ event, properties }));
    },
  };
  const source = fs.readFileSync('src/lib/telemetry.ts', 'utf8').replaceAll('import.meta.env', 'testEnv');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const context = {
    exports: {}, testEnv: settings, navigator, URLSearchParams, Math: Object.assign(Object.create(Math), { random: () => random }),
    window: { location: { hostname, host: hostname, origin: `https://${hostname}`, pathname: '/', search: '?name=private', hash: '#private' } },
    require(name) {
      if (name === 'posthog-js') return posthog;
      if (name === '@sentry/react') return { init(config) { configs.sentry = config; }, browserTracingIntegration(options) { configs.tracing = options; return { name: 'BrowserTracing' }; } };
      if (name === 'web-vitals') return Object.fromEntries(['CLS', 'INP', 'LCP'].map((metric) => [`on${metric}`, (callback) => { configs[metric] = callback; }]));
      throw new Error(name);
    },
  };
  vm.runInNewContext(compiled, context);
  return { api: context.exports, events, configs, context };
}

test('production initializes once and reports only a clean page URL', () => {
  const { api, events } = setup();
  api.initializeTelemetry(); api.initializeTelemetry();
  assert.equal(events.length, 1);
  assert.equal(events[0].event, '$pageview');
  assert.equal(events[0].properties.$current_url, 'https://ajwa2-collection.vercel.app/');
  assert.ok(!JSON.stringify(events).includes('private'));
});

test('performance sampling emits each valid vital once without element metadata', () => {
  const { api, configs, events } = setup({ random: 0 });
  api.initializeTelemetry();
  configs.LCP({ name: 'LCP', value: 2300, rating: 'good', entries: [{ url: '?private' }] });
  configs.LCP({ name: 'LCP', value: 2400, rating: 'good' });
  configs.INP({ name: 'INP', value: NaN, rating: 'poor' });
  assert.equal(events.filter((event) => event.event === 'web_vital').length, 1);
  assert.equal(events[1].properties.value, 2300);
  assert.equal(events[1].properties.unit, 'ms');
  assert.ok(!JSON.stringify(events).includes('?private'));
});

test('unsampled visits register no web-vitals observers', () => {
  const { api, configs } = setup();
  api.initializeTelemetry();
  assert.equal(configs.LCP, undefined);
  assert.equal(configs.sentry.tracesSampleRate, 0.05);
});

test('privacy opt-out disables performance and trace collection', () => {
  const { api, configs } = setup({ random: 0, navigator: { doNotTrack: '1' } });
  api.initializeTelemetry();
  assert.equal(configs.LCP, undefined);
  assert.equal(configs.sentry.tracesSampleRate, 0);
  assert.equal(configs.tracing, undefined);
});

test('trace sanitizer removes URLs, request data, and span attributes', () => {
  const { api, configs } = setup();
  api.initializeTelemetry();
  const event = configs.sentry.beforeSendTransaction({
    transaction: '/?private', request: { url: '?private' }, user: { id: 'private' }, extra: { secret: 'private' },
    sdkProcessingMetadata: { normalizedRequest: { url: '?private' } },
    contexts: { trace: { trace_id: 'trace', span_id: 'span', data: { value: 'private' } }, other: { secret: 'private' } },
    spans: [{ op: 'resource.img', description: 'https://example.com/?private', data: { 'http.url': 'private' } }],
  });
  assert.ok(!JSON.stringify(event).includes('private'));
  assert.equal(event.spans[0].op, 'resource.img');
  assert.equal(configs.tracing.traceFetch, false);
  assert.equal(configs.sentry.tracePropagationTargets.length, 0);
});

test('source attribution only accepts known channels', () => {
  const { api, events, context } = setup();
  context.window.location.search = '?utm_source=private@example.com';
  api.initializeTelemetry();
  assert.equal(events[0].properties.traffic_source, 'other');
  context.window.location.search = '?utm_source=instagram';
  api.trackEvent('whatsapp_clicked', { location: 'hero' });
  assert.equal(events[1].properties.traffic_source, 'instagram');
});

test('preview, disabled config, and development do not initialize providers', () => {
  for (const options of [{ hostname: 'preview.vercel.app' }, { env: { PROD: false } }, { env: { VITE_TELEMETRY_ENABLED: 'false' } }]) {
    const { api, configs } = setup(options);
    api.initializeTelemetry();
    assert.deepEqual(configs, {});
  }
});

test('missing keys are safe and each provider works independently', () => {
  const missing = setup({ env: { VITE_SENTRY_DSN: '', VITE_POSTHOG_PROJECT_TOKEN: '' } });
  missing.api.initializeTelemetry();
  missing.api.trackEvent('whatsapp_clicked', { location: 'hero' });
  assert.equal(missing.events.length, 0);
  assert.deepEqual(missing.configs, {});
  const sentryOnly = setup({ env: { VITE_POSTHOG_PROJECT_TOKEN: '' } });
  sentryOnly.api.initializeTelemetry();
  assert.ok(sentryOnly.configs.sentry);
  assert.equal(sentryOnly.configs.posthog, undefined);
});

test('privacy opt-out prevents analytics', () => {
  for (const navigator of [{ doNotTrack: '1' }, { globalPrivacyControl: true }]) {
    const { api, configs, events } = setup({ navigator });
    api.initializeTelemetry();
    assert.equal(configs.posthog, undefined);
    assert.equal(events.length, 0);
  }
});

test('event allowlist removes automatically attached sensitive properties', () => {
  const { api, configs } = setup();
  api.initializeTelemetry();
  const result = configs.posthog.before_send({ properties: {
    token: 'test', distinct_id: 'anonymous-id', template: 'catalog-id',
    email: 'private@example.com', '$referrer': 'https://example.com/?name=private',
    '$initial_current_url': 'https://example.com/?name=private',
  } });
  assert.deepEqual(Object.keys(result.properties).sort(), ['distinct_id', 'template', 'token']);
  assert.equal(configs.posthog.disable_session_recording, true);
  assert.equal(configs.posthog.autocapture, false);
});

test('blocked analytics does not throw through order handlers', () => {
  const { api } = setup({ captureThrows: true });
  assert.doesNotThrow(() => api.initializeTelemetry());
  assert.doesNotThrow(() => api.trackEvent('whatsapp_clicked', { location: 'pricing' }));
});

test('Sentry scrubs customer context and preserves useful stack locations', () => {
  const { api, configs } = setup();
  api.initializeTelemetry();
  const event = configs.sentry.beforeSend({
    user: { email: 'private' }, request: { url: '?private' }, extra: { name: 'private' },
    sdkProcessingMetadata: { normalizedRequest: { url: '?private' } },
    breadcrumbs: [{ message: 'private' }], message: 'private',
    exception: { values: [{ type: 'TypeError', value: 'private', stacktrace: { frames: [{ filename: 'https://example.com/app.js?private', lineno: 42, vars: { name: 'private' } }] } }] },
  });
  assert.ok(!JSON.stringify(event).includes('private'));
  assert.equal(event.exception.values[0].stacktrace.frames[0].lineno, 42);
  assert.equal(event.exception.values[0].type, 'TypeError');
});
