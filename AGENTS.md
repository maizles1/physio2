# physio2: physio-plus.co.il clinic website

Hebrew RTL marketing site for the physiotherapy clinic: services and landing pages (incl. Meuhedet), blog, testimonials with Google reviews, FAQ, lead form, appointment requests, small admin exercise/plan builder.

## Stack
- Next.js 16 (App Router, `app/`), React 19, TypeScript, Tailwind v4, swiper, lucide-react, react-lite-youtube-embed.
- Next.js 16 differs from training data: read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code (including `middleware.ts` conventions) and heed deprecations.
- Storage via `@vercel/blob` (`lib/*Storage.ts`, `lib/leads.ts`); email via resend / nodemailer.
- Deployed on Vercel. Daily health check in `.github/workflows/daily-site-health.yml`.

## Commands
- `npm run dev`, `npm run lint`, `npm run typecheck`, `npm test` (`lib/*.test.ts`), `npm run build`.
- `npm run seo-audit` after changes to pages, metadata or structured data.
- `npm run tag-check` (live site) or `npm run tag-check -- http://localhost:3000` (after `npm run build && npm start`): checks GTM, GA4, Google Ads conversions, Meta Pixel and consent. Must pass before and after every change.

## Rules
- Content and settings live in `config/*.config.ts` (SEO, GEO, blog, services, team, reviews, videos). Change content there, not hardcoded in components.
- SEO is a core goal: keep metadata, canonical URLs, JSON-LD, sitemap and `app/llms.txt` correct. Meta title/description length limits matter; image alts in Hebrew.
- Public API routes (e.g. `app/api/lead`) keep rate limiting, input sanitizing, the honeypot field and allowlists from `lib/security.ts`. Admin routes stay behind the session guard in `middleware.ts` / `lib/adminAuth.ts`.
- Lead data is personal data: never log it.
- Medical content: no promises of cure or guaranteed outcomes.
- Hebrew RTL; most visitors are on phones. Check layout at phone width and keep Core Web Vitals (images sized, lazy-loaded below the fold).
- The root has many legacy *-GUIDE.md files; README.md and this file are the source of truth.

## Tracking tags: do not break them
The owner's ads depend on these. Every change must keep them working.
- GTM `GTM-MK3F6SVQ` is the only tag loader. It is injected by `components/CookieConsent.tsx` (Consent Mode v2 defaults first, GTM deferred to first interaction or ~3.5s). Don't load GA4, Google Ads or Meta Pixel directly from the site, and don't remove or reorder the consent init.
- Google Ads conversions in GTM fire on link clicks to `wa.me` / `tel:` and on the `form_submit` event. Keep WhatsApp and phone CTAs as real `<a href="https://wa.me/...">` / `<a href="tel:...">` links, and keep the lead form calling `gtag.event('form_submit', ...)` and `generate_lead` after a successful submit.
- Click handlers report through `gtag.event` / `gtag.clickToCall` in `components/GoogleAnalytics.tsx` (`whatsapp_click`, `click_to_call`). New contact buttons must do the same. `googleAdsClickConversions` in `config/seo.config.ts` must match the GTM conversion labels.
- CSP in `next.config.ts` must keep allowing the Google, Meta and Web3Forms domains the tags use.
- Run `npm run tag-check` against a local build before opening a PR and against the live site after deploy. Don't merge if it fails.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
