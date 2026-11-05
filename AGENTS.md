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

## Rules
- Content and settings live in `config/*.config.ts` (SEO, GEO, blog, services, team, reviews, videos). Change content there, not hardcoded in components.
- SEO is a core goal: keep metadata, canonical URLs, JSON-LD, sitemap and `app/llms.txt` correct. Meta title/description length limits matter; image alts in Hebrew.
- Public API routes (e.g. `app/api/lead`) keep rate limiting, input sanitizing, the honeypot field and allowlists from `lib/security.ts`. Admin routes stay behind the session guard in `middleware.ts` / `lib/adminAuth.ts`.
- Lead data is personal data: never log it.
- Medical content: no promises of cure or guaranteed outcomes.
- Hebrew RTL; most visitors are on phones. Check layout at phone width and keep Core Web Vitals (images sized, lazy-loaded below the fold).
- The root has many legacy *-GUIDE.md files; README.md and this file are the source of truth.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
