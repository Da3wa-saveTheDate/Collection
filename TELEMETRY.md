# Phase 1: analytics and error tracking

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
query strings, fragments, referrers, customer details, and campaign attribution are
not sent. Coarse device type, browser, and OS are retained for mobile comparisons.
Service ingestion still receives network metadata such as IP addresses;
configure provider retention/access and the site's privacy disclosure accordingly.

Sentry collects errors without replay/tracing, request data, user context, or
breadcrumbs. Error messages are replaced with generic text to avoid customer data;
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
