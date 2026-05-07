# Nicholaisen.dk

Marketing site for [Nicholaisen A/S](https://nicholaisen.dk) — sales, engineering, and consulting for the wood, plastics and aluminum industries.

> Engineered precision, told quietly.

---

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (CSS-first `@theme` tokens, no `tailwind.config.ts`)
- **TypeScript** (strict, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`)
- **MDX** in repo for all content (services, industries, cases, insights)
- **Zod** schema validation at build time
- **Radix UI** primitives for nav, dialog, tabs (a11y baseline)
- **Resend** for the contact form (graceful no-op without API key)
- Deployed on **Vercel**

See [`plan.md`](plan.md) for the full build plan and architectural rationale.

## Getting started

```bash
npm install
npm run dev
```

The app runs at <http://localhost:3000>.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server with HMR |
| `npm run build` | Production build (validates all MDX against Zod schemas) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next.js linter |
| `npm run pagefind` | Generate static search index after build (deferred) |

## Project layout

```
src/
  app/                  # App Router routes
    api/contact/        # Contact form handler (Resend)
    services/[...slug]/ # Catch-all for category + sub-service pages
    cases/[slug]/
    industries/[slug]/
    insights/[slug]/    # + opengraph-image.tsx + rss.xml/route.ts
    sitemap.ts          # Dynamic sitemap from MDX
    robots.ts
    not-found.tsx
  components/
    layout/             # SiteHeader, SiteFooter, MegaNav, MobileNav, Container, Section
    sections/           # HeroSplit, EntryTabs, InfoCardRow, SolutionTabs, etc.
    mdx/                # Mdx renderer + custom MDX components (Callout, Figure, MetricRow, …)
    ui/                 # Button, Eyebrow primitives
  content/
    schema.ts           # Zod schemas (single source of truth)
    types.ts
    loader.ts           # PUBLIC content API — pages import from here, never directly
    adapters/
      mdx.ts            # Current implementation: reads /content
  lib/
    cn.ts               # className merger
    nav.ts              # Primary nav structure (mega-dropdown content)
    site.ts             # Company info constants
    redirects.ts        # WP → new-URL redirect map
    seo.ts              # generateMetadata helpers
    format.ts           # Date helpers
content/                # All editorial content as MDX
  services/
  industries/
  cases/
  insights/
public/
  brand/                # Logos
  images/               # Photography
scripts/
  wp-import.mts         # Stub — populated during launch prep
  check-content.mts     # Loader smoke test
```

## Content

All editorial content lives in `/content` as MDX with YAML frontmatter. Schemas in [`src/content/schema.ts`](src/content/schema.ts) are validated at build time — a malformed file fails the build, not production.

### Adding an article

1. Create `content/insights/your-slug.mdx`.
2. Add frontmatter (see existing posts for the shape).
3. Drop the hero image in `public/images/insights/your-slug.jpg`.
4. Reference it as `heroImage: /images/insights/your-slug.jpg`.
5. Run `npm run build` — schema errors will surface immediately.

### Migration boundary

All pages import from [`src/content/loader.ts`](src/content/loader.ts). When we move to a CMS (Storyblok or Sanity), implement `src/content/adapters/cms.ts` with the same `ContentSource` interface and swap the export in `loader.ts`. Pages don't change.

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://nicholaisen.dk
RESEND_API_KEY=                           # leave empty in dev — form will log + accept
CONTACT_TO_EMAIL=info@nicholaisen.dk
CONTACT_FROM_EMAIL=website@nicholaisen.dk
```

## Deployment

Push to `main`. Vercel handles the build. Preview deploys on every PR. The contact form requires `RESEND_API_KEY` set in the Vercel env to actually send mail; without it, submissions are logged server-side and the user still sees a success state (so dev/preview don't break).

## Conventions

- Server Components by default. Add `"use client"` only when interaction demands it.
- Section components are the unit of reuse. A page is a list of `<Section>` blocks.
- Design tokens in [`src/styles/globals.css`](src/styles/globals.css). Don't hard-code colors elsewhere.
- One typeface (Inter Tight). One primary action per viewport.
- Comments explain *why*, not *what*.
