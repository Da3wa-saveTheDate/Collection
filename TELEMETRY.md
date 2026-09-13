# Analytics, observability, and support

## Phase 2 dashboard

Open [Ajwaa — Conversion & Performance](https://us.posthog.com/project/605778/dashboard/2091566).
The pricing and design funnels measure sequential steps within 30 minutes and
compare device types. WhatsApp clicks are inquiry intent, not completed sales.
Historical setup visits are included; use dates after deployment for a business baseline.

Sentry's `javascript-react` project receives sampled page-load traces (5%) and
errors tagged with the deployment commit SHA. Source maps still require the
private build credentials below. No paid upgrade was enabled.

LCP, INP, and CLS are measured on 10% of page loads and sent as `web_vital` events
to PostHog. Each metric is emitted at most once per page load (up to three events).
LCP/INP values use milliseconds; CLS is a unitless score. Compare each metric's
75th percentile by device and always inspect sample counts. Collection depends on
browser support, user interaction, and page visibility; a metric may not emit.
These are first-finalized readings, not full-lifetime measurements after repeated
background/foreground transitions, and do not measure inside template iframes.
Small samples should not be used to claim an improvement.

`VITE_SENTRY_TRACES_SAMPLE_RATE` and `VITE_PERFORMANCE_SAMPLE_RATE` accept 0–1;
zero disables the corresponding collection. `VITE_APP_RELEASE` overrides the
default Vercel/GitHub commit SHA. Changes require a new build.

The optional Vercel Speed Insights component uses the same 10% rate, independently
sampled, and removes query strings/fragments. Its free dashboard provides an
overall RES score; detailed Vercel metrics require a paid tier. Enable Speed
Insights in the owning Vercel project if its script is unavailable, or set
`VITE_SPEED_INSIGHTS_ENABLED=false`. PostHog metrics work independently.

The visible Need help? panel provides three static FAQ answers, pricing navigation,
and a WhatsApp handoff. A suggestion appears after 30 seconds of visible browsing;
it never opens automatically. Dismissal is stored in sessionStorage only. There is
no AI service, subscription, message input, or transcript collection. Events
`support_opened` and `support_answer_viewed` (static `topic`) measure usage;
the handoff uses `whatsapp_clicked` with `location=support`.

## Activate in Vercel

The production browser identifiers are configured in `telemetry.public.json` for
PostHog project 605778 (US) and Sentry organization `ajwa2`, project
`javascript-react`. These are public ingestion identifiers that are already visible
in browser JavaScript, not private management credentials. Production builds use
them by default, restricted to `ajwa2-collection.vercel.app`. Vercel environment
variables or local env files override these defaults, including blank values.
Do not copy the disabled `.env.example` values into production unless intending
to disable tracking. Development and preview hostnames remain excluded.

PostHog is on the free plan. Sentry has a new/regressed-issue alert notifying the
account owner on their preferred channel, throttled to once per issue per hour.
Private source-map upload credentials are not configured in this repository.

To override the configuration or enable source maps:

1. Create a PostHog project in your chosen region and a Sentry React project.
2. Add the public values from `.env.example` to Vercel's **Production** environment:
   `VITE_POSTHOG_PROJECT_TOKEN`, `VITE_POSTHOG_HOST`, and `VITE_SENTRY_DSN`.
3. Set `VITE_TELEMETRY_ENABLED=true` and set `VITE_TELEMETRY_ALLOWED_HOSTS` to a
   comma-separated list of production hostnames (no protocol or path). The default
   is `ajwa2-collection.vercel.app`. Add any future custom domain explicitly.
4. For readable Sentry stacks, add `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and
   `SENTRY_PROJECT` to Vercel's build environment. Never expose the auth token in
   a `VITE_` variable. Source maps are uploaded during builds and deleted afterward.
5. Redeploy: Vite embeds public configuration at build time. Do not enable
   telemetry on ordinary preview deployments. Missing values leave the associated
   service inactive without blocking the site.
6. In Sentry, create an issue alert for new production errors and choose its
   notification destination. No notification destination is provisioned by code.

## Events

| Event | Trigger | Properties |
| --- | --- | --- |
| `$pageview` | Once when telemetry initializes | Clean page URL/path |
| `pricing_viewed` | First time at least 10% of pricing intersects the viewport | Clean page URL/path |
| `template_opened` | Explicit full-template link click; not hover or iframe loading | Template ID, category, CTA location |
| `whatsapp_clicked` | An order CTA click | Catalog template title, category, inferred/selected package, CTA location |
| `web_vital` | Sampled browser metric | metric, value, rating, unit |
| `support_opened` | Help panel opened | Clean URL/path |
| `support_answer_viewed` | FAQ answer expanded | Static topic ID |

The existing Meta Pixel remains unchanged. Its `Lead` event and the new WhatsApp
event represent click intent, not a confirmed message, order, or payment.
Template IDs and catalog titles are static catalog metadata, not customer names.

Create two funnels: page view → pricing viewed → WhatsApp clicked, and page view →
template opened → WhatsApp clicked. Returning from a template in a separate tab
retains the original tab's anonymous identity. Events inside the standalone public
template sites are outside this integration's scope.

## Privacy and scope

PostHog uses in-memory anonymous identity: refreshes/new tabs are new identities,
so this MVP measures in-tab journeys, not persistent unique customers. It honors
Do Not Track and Global Privacy Control. Autocapture, replay, surveys, automatic
exception capture, and feature flags are disabled. Event properties are allowlisted;
query strings, fragments, referrers, and customer details are not sent. A normalized
`traffic_source` accepts only instagram, facebook, google, tiktok, or whatsapp from
`utm_source`; other values become `other`, missing values `unattributed`. Raw
campaign strings are never sent. Coarse device type, browser, and OS are retained.
Service ingestion still receives network metadata such as IP addresses;
configure provider retention/access and the site's privacy disclosure accordingly.

Sentry collects errors and 5% of page-load traces without replay, request data, user
context, or breadcrumbs. DNT/GPC disables traces and performance analytics; basic
scrubbed errors remain enabled. Span descriptions/attributes are scrubbed and fetch/XHR
tracing and cross-origin trace propagation are disabled. Error messages are replaced with generic text to avoid customer data;
stack traces and exception types remain for diagnosis. This deliberately reduces
diagnostic detail. The React boundary offers refresh and WhatsApp contact.

## Verification before calling collection live

- Run `npm run build` and `npm run lint`.
- Run `npm run test:telemetry` and `npm run test:telemetry:browser`. The browser
  test uses fake credentials, blocks all external requests, and tests desktop and
  mobile events plus the error fallback. It requires Puppeteer's Chrome installed.
- Use a dedicated test project and production preview with localhost temporarily
  allowlisted; never place private credentials in source control.
- Confirm one page view, one pricing view after scrolling away/back, and one event
  per template/order click in PostHog. URLs must not include query strings.
- Confirm browser privacy opt-out disables PostHog and missing credentials do not
  prevent browsing or ordering.
- Verify a controlled error in the test deployment arrives in Sentry with source
  mapping and the production environment tag. Remove test triggers before release.
- Check a real production visit and configure the Sentry alert after deployment.

Passing local tests does not prove receipt by either provider without real project
credentials. The GitHub Pages workflow is separate from Vercel; it has no telemetry
credentials by default.
