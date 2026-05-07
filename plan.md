# Nicholaisen.dk — Website Rebuild Plan

A complete plan for rebuilding [nicholaisen.dk](https://nicholaisen.dk) as a Next.js + Tailwind 4 site on Vercel. **English only**, **MDX in repo for all content** (no CMS in v1), with a clear adapter boundary so a headless CMS (Storyblok or Sanity) can be added later without touching pages. Design direction: **Scandinavian minimalism × Apple editorial discipline**, anchored by the moodboard.

---

## 1. Vision & positioning

- **Tagline (from moodboard):** *"Engineered precision, told quietly."*
- **Existing positioning:** *"Your Efficiency Partner"*
- **Refined v1 value prop:** *"Optimizing wood production from strategy to shop floor."* (per customer feedback brief)
- **Company description (canonical, use verbatim where appropriate):**
  > "At Nicholaisen, we provide sales, engineering and consulting of innovative machine solutions and service concepts for the wood, plastics and aluminum industries. Together with you, we analyze and illuminate your data, strengths and potentials and advise you on intelligent optimizations and profitable investments."
- **Brand tone:** Confident, specialist, restrained. Industrial credibility with Scandinavian minimalism, Apple-grade restraint. No SaaS gloss, no stock-photo "innovation" iconography.
- **Design north stars:**
  - **Scandinavian** — generous whitespace, natural materials, muted palette, quiet authority
  - **Apple-inspired** — large editorial typography, tight grid discipline, calm motion, hardware-style product photography, ruthless removal of decoration
  - **Minimal** — every element earns its place; if removing it doesn't hurt the page, remove it

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16 (App Router)** | Server Components by default; Cache Components opt-in for static marketing pages |
| Language | **TypeScript** (strict) | `noUncheckedIndexedAccess`, `verbatimModuleSyntax` |
| Styling | **Tailwind CSS v4** | CSS-first config via `@theme`, no `tailwind.config.ts` unless we need plugin escape hatches |
| Content | **MDX files in repo, parsed at build** | `gray-matter` for frontmatter, `next-mdx-remote` for rendering, Zod for schema validation. Pragmatic: no headless CMS in v1, but a clean adapter boundary so one can be added later |
| Components | Custom section components, headless primitives via **Radix UI** for nav/dialog/tabs | shadcn/ui only if we want the CLI workflow — otherwise hand-rolled to keep the bundle lean |
| Icons | **Lucide** | Tree-shakable, neutral aesthetic |
| Fonts | **next/font** (self-hosted) — geometric sans for body (Inter or General Sans), one accent display weight | No external font CDN |
| Hosting | **Vercel** | Production + preview deploys per branch |
| Analytics | **Vercel Analytics + Speed Insights** | Add Plausible later if marketing wants it |
| Forms | **Vercel Functions** route handlers + Resend for email | Hubspot/CRM webhook can be added in v1.1 |
| Search | **Pagefind** (build-time static index) | No runtime infra; fits MDX content model |
| i18n | **Out of scope** | v1 ships **English only**. Routes are flat (`/services/...`), no `[locale]` segment. If multi-language is needed later, it's a CMS-era concern |
| Testing | **Vitest** + **Playwright** for critical flows | Smoke tests on contact form + nav |

**Why these picks:**
- Tailwind 4's CSS-first config keeps theme tokens (the moodboard palette) in a single `globals.css` block.
- MDX gives editors a simple file-based workflow now and a clean migration path: every MDX file maps 1:1 to a future CMS document.
- Pagefind beats Algolia/Meilisearch for v1 — zero ops, scales fine for ~50–200 pages.

---

## 3. Information architecture

### 3.1 Top-level sitemap

```
/                              Homepage
/services                      Services overview (5 categories)
  /business-development
    /framing-workshops
    /investment-advisory
    /strategic-roadmapping
  /production-optimization
    /flow-optimization
    /capacity-improvement
    /oee-efficiency
  /project-solutions
    /custom-production-lines
    /automation-integration
    /turnkey-projects
  /digital-performance
    /production-insights
    /predictive-maintenance
    /continuous-optimization
  /partnership
    /capacity-planning
    /collaboration
    /business-development
/industries                    Industries overview
  /doors-windows
  /panel-furniture
  /solid-wood
/cases                         Case studies index
  /[slug]                      Individual case
/insights                      Blog/news index ("Insights" reads better than "Blog" for B2B)
  /[slug]                      Article
  /category/[category]         Category archive
/about                         Company story, team, history
/contact                       Contact form + offices
/legal/privacy
/legal/cookies
```

### 3.2 Primary navigation (from `dropdown-nav.docx`)

Mega-dropdown with five service columns + an "By Industry" tab. Each column shows three sub-services with a one-line value prop (already provided in the docx). Right-hand promo slot in the dropdown for a featured case study or the digital platform "Opti".

```
Services ▾
├── Business Development          Framing Workshops · Investment Advisory · Strategic Roadmapping
├── Production Optimization       Flow Optimization · Capacity Improvement · OEE & Efficiency
├── Project Solutions             Custom Production Lines · Automation & Integration · Turnkey Projects
├── Digital Performance (Opti)    Production Insights · Predictive Maintenance · Continuous Optimization
└── Partnership                   Capacity Planning · Collaboration · Business Development

Industries ▾
├── Doors & Windows
├── Panel & Furniture
└── Solid Wood

Cases    Insights    About    Contact
```

Right side of header: language switcher placeholder (disabled in v1), CTA button "Schedule a call".

---

## 4. Page templates

### 4.1 Homepage — Maersk-inspired

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | **Hero** | `<HeroSplit>` | Headline, sub, primary CTA "Explore Solutions", secondary CTA "Get in touch". Background: muted workshop imagery from `inspiration-material/images/` with a navy gradient overlay |
| 2 | **Tabbed entry bar** | `<EntryTabs>` | Tabs: *Services · Industries · Schedule a call*. Each tab swaps the input/filter UI below. Sits in a card that overlaps the hero (Maersk-style) |
| 3 | **Three info cards** | `<InfoCardRow>` | "New to Nicholaisen?" → /about · "Ready to optimize?" → /services · "Need Opti insights?" → /services/digital-performance |
| 4 | **Solution category tabs** | `<SolutionTabs>` | Horizontal scroller showing the 5 service categories with imagery, short blurb, "Learn more" link. Mirrors Maersk's "Logistics services and solutions" carousel |
| 5 | **Industries strip** | `<IndustryStrip>` | Three large cards (Doors & Windows, Panel & Furniture, Solid Wood) with workshop imagery |
| 6 | **Featured case study** | `<CaseSpotlight>` | One large card pulling latest from `/cases` |
| 7 | **Latest insights** | `<InsightGrid>` | 3 most recent posts from `/insights`, auto-populated from MDX |
| 8 | **Pre-footer CTA** | `<CtaBand>` | "Engineered precision, told quietly." with contact CTA |
| 9 | **Footer** | `<SiteFooter>` | Address, contact, nav, newsletter, social, legal |

### 4.2 Service detail page — TRUMPF-inspired

Anchored sub-navigation that sticks below the header on scroll. Sections:

1. **Page hero** — Category, H1, lede paragraph, hero image
2. **Overview** — What this service delivers, who it's for, outcomes
3. **How it works** — 3–5 step process with iconography
4. **Capabilities** — Detail cards / feature grid
5. **Case studies** — Filtered to those tagged with this service
6. **Related services** — Cross-links to sibling services
7. **Talk to an expert** — In-page contact CTA

Sub-nav: `Overview · How it works · Capabilities · Cases · Contact` — anchor links with scroll-spy active state.

### 4.3 Service category landing (e.g. `/services/production-optimization`)

Same shell as detail page but the "Capabilities" section becomes a 3-card grid linking to the three sub-services.

### 4.4 Industry pages

Lighter than service pages. Hero, who-we-help, relevant services (cross-link), 2–3 cases, contact CTA.

### 4.5 Insights (blog)

- **Index:** Card grid, filter chips by category, search box (Pagefind).
- **Article:** Centered prose column (max-w-prose), MDX with custom components (callout, image with caption, pull-quote, related-services widget). Author byline, published date, reading time, related posts.
- **Category archives:** Same card grid, filtered.

### 4.6 Cases

Similar to insights but with a fixed structure: *Challenge · Approach · Outcome · Results (metrics)*. MDX frontmatter enforces these fields.

### 4.7 About / Contact

About: company story, leadership grid, timeline, locations, certifications. Contact: form (name, company, role, message, service of interest), office addresses, map embed (lazy-loaded), direct contact lines.

---

## 5. Visual design system

Derived from `nicholaisen-moodboard.png`. Direction: **Scandinavian minimalism × Apple editorial discipline.** Cream/beige page surfaces, navy as the single anchoring brand color, wood photography as the only visual ornamentation.

### 5.1 Color tokens (Tailwind 4 `@theme`)

```css
@theme {
  /* Brand */
  --color-navy-950: #0A1A2E;   /* Deepest navy — text on cream, hero overlays */
  --color-navy-900: #0E2238;   /* Nicholaisen Navy — primary brand */
  --color-navy-700: #1B3658;   /* Hover/secondary */
  --color-slate-500: #5A7C9A;  /* Slate accent — links, subtle */

  /* Wood/material warmth */
  --color-tan-500:  #B8915A;   /* MDF tan — accent, sparingly */
  --color-tan-300:  #D9C29A;
  --color-beige-200: #E6DCC9;  /* Beige — section dividers, cards */

  /* Surfaces */
  --color-cream-50:  #F6F1E6;  /* Cream — primary page background */
  --color-paper:     #FBF8F1;  /* Slightly warmer alt surface */
  --color-white:     #FFFFFF;  /* Used sparingly — cream is the default */

  /* Ink */
  --color-ink-900:   #0F1115;  /* Headlines */
  --color-ink-700:   #2A2D33;  /* Body */
  --color-ink-500:   #6B6F77;  /* Meta, secondary */

  /* Typography */
  --font-sans:    "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-mono:    ui-monospace, "JetBrains Mono", monospace;

  /* Radius — Apple-style: subtle, never rounded-full on cards */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* Shadows — barely-there */
  --shadow-card: 0 1px 2px rgb(14 34 56 / 0.04), 0 8px 24px rgb(14 34 56 / 0.06);
  --shadow-lift: 0 2px 4px rgb(14 34 56 / 0.04), 0 16px 40px rgb(14 34 56 / 0.08);
}
```

Hex values are starting estimates; tighten against the moodboard with a color picker before locking. **One typeface only** (Inter Tight, weights 400/500/600/700) — Apple-style restraint, no display/body split.

### 5.2 Typography scale (Apple-editorial)

Large, confident headlines. Generous line-height. No decorative weights.

- **Display H1 (hero):** `clamp(3rem, 6vw, 5.5rem)`, weight 600, tracking `-0.03em`, line-height `1.05`
- **H2 (section):** `clamp(2rem, 3.5vw, 3.5rem)`, weight 600, tracking `-0.025em`, line-height `1.1`
- **H3 (block):** `1.5rem`–`1.875rem`, weight 600, tracking `-0.015em`
- **Lede paragraph:** `1.25rem`, weight 400, line-height `1.5`, max-width `60ch`
- **Body:** `1.0625rem`, weight 400, line-height `1.65`, max-width `66ch`
- **Eyebrow/label:** `0.75rem`, weight 500, uppercase, tracking `0.12em`

### 5.3 Layout primitives

- 12-column grid, max content width `1280px`, narrower `1120px` for editorial pages
- Gutter: `24px` mobile / `48px` desktop / `64px` ≥ 1440px
- Breakpoints: Tailwind defaults
- Section padding: `py-24 lg:py-40` for marketing sections — **bigger than feels right.** Whitespace is the design.
- Maximum **one** primary action per viewport. Apple discipline.

### 5.4 Imagery treatment

- All hero/feature photography pulled from [`inspiration-material/images/`](inspiration-material/images/) — wood, machinery, workshops, materials. These move to `public/images/` at scaffolding time.
- **No illustrations, no icon-driven hero graphics, no stock photography of "data."** Real material, real craft.
- Hero images: full-bleed, no overlay tint by default. If text legibility requires it: a subtle navy gradient (`from-navy-950/40 to-transparent`) only on the side carrying the headline.
- Cards: image-only or image+caption. No card chrome (no thick borders, no heavy shadows).
- Aspect ratios standardized: `16:9` for hero, `4:3` for cards, `1:1` for portraits — never mix on the same page.

### 5.5 Logo usage

Both lockups already in [`inspiration-material/images/`](inspiration-material/images/), to be moved to `public/brand/`:

- `nicholaisen-logo.png` — navy on light. Default header logo on cream/white surfaces.
- `nicholaisen-logo-white.png` — white on dark. Footer (navy background) and dark hero variants.

**Action item before launch:** request SVG versions from the user. PNGs are 3KB and will not scale crisply on retina at large sizes.

### 5.6 Motion

- All transitions `200–300ms`, easing `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind's `ease-out`)
- Hover: subtle lift (`translateY(-2px)`) + shadow change on cards. No color flashes.
- Scroll-reveal: opacity + 8px translate, used **once per page maximum** (the hero, if at all)
- Respect `prefers-reduced-motion` everywhere — disable scroll reveals, keep functional transitions

---

## 6. Content model & CMS-migration boundary

This is the most important architectural decision: **all content goes through one typed access layer so the future CMS swap is a one-file change.**

### 6.1 Folder layout

```
content/
  pages/                       # one MDX per static page (about, contact intro, etc.)
  services/
    business-development.mdx
    business-development/
      framing-workshops.mdx
      investment-advisory.mdx
      strategic-roadmapping.mdx
    production-optimization.mdx
    production-optimization/
      ...
  industries/
    doors-windows.mdx
    panel-furniture.mdx
    solid-wood.mdx
  cases/
    [slug].mdx
  insights/
    [slug].mdx
  shared/
    site.json                  # nav, footer, contact info, social links
    cta-blocks.json            # reusable CTA copy
```

### 6.2 The content access layer

```
src/content/
  schema.ts                    # Zod schemas per content type
  loader.ts                    # PUBLIC API — getService(), getInsight(), listCases(), etc.
  adapters/
    mdx.ts                     # Current implementation: reads from /content
    cms.ts                     # Future: Storyblok or Sanity client
  types.ts                     # Inferred types from schema
```

**Rule:** No page or component imports MDX directly. Everything goes through `loader.ts`. When we add a CMS, we swap the adapter — pages don't change.

### 6.3 Frontmatter schemas (sketch)

```ts
// Service
{
  title: string;
  slug: string;
  category: 'business-development' | 'production-optimization' | ...;
  eyebrow: string;
  lede: string;
  heroImage: string;
  capabilities: { title: string; description: string; icon?: string }[];
  process: { step: number; title: string; description: string }[];
  relatedCases: string[]; // slugs
  seo: { title: string; description: string; ogImage?: string };
}

// Case
{
  title: string;
  client?: string;            // anonymizable
  industry: 'doors-windows' | 'panel-furniture' | 'solid-wood';
  services: string[];         // service slugs
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  heroImage: string;
  publishedAt: string;
  seo: {...};
}

// Insight (blog)
{
  title: string;
  excerpt: string;
  category: 'industry' | 'optimization' | 'opti-platform' | 'company';
  author: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage: string;
  tags: string[];
  seo: {...};
}
```

Zod validation runs at build time — a malformed frontmatter fails the build, not production.

### 6.4 CMS migration path (v1.1+)

When the user picks Storyblok or Sanity:

1. Mirror Zod schemas as CMS document types (script can generate Sanity schema from Zod).
2. Write a one-time migration script that reads MDX, parses, and pushes to the CMS via API.
3. Implement `adapters/cms.ts` with the same function signatures as `adapters/mdx.ts`.
4. Flip a `CONTENT_SOURCE` env var. Keep the MDX adapter as a fallback for local dev.
5. Replace inline MDX rendering with portable-text (Sanity) or rich-text (Storyblok) renderer. The **custom MDX components map 1:1 to portable-text serializers** — design them with this in mind from day one.

---

## 7. Component architecture

```
src/
  app/
    layout.tsx                 # root layout, fonts, header, footer
    page.tsx                   # homepage
    services/
      page.tsx
      [category]/
        page.tsx
        [service]/
          page.tsx
    industries/...
    insights/...
    cases/...
    api/
      contact/route.ts
      newsletter/route.ts
  components/
    layout/
      SiteHeader.tsx
      SiteFooter.tsx
      MegaNav.tsx
      MobileNav.tsx
      Container.tsx
      Section.tsx
    sections/                  # Composable page sections
      HeroSplit.tsx
      EntryTabs.tsx
      InfoCardRow.tsx
      SolutionTabs.tsx
      IndustryStrip.tsx
      CaseSpotlight.tsx
      InsightGrid.tsx
      CtaBand.tsx
      ServiceHero.tsx
      AnchorSubNav.tsx
      ProcessSteps.tsx
      CapabilityGrid.tsx
      RelatedServices.tsx
    mdx/                       # Components available inside MDX
      Callout.tsx
      Figure.tsx
      PullQuote.tsx
      MetricRow.tsx
      ServiceLink.tsx
    ui/                        # Generic primitives
      Button.tsx
      Tabs.tsx
      Card.tsx
      Badge.tsx
      Tag.tsx
      Form fields...
  content/                     # See §6
  lib/
    seo.ts                     # generateMetadata helpers
    pagefind.ts                # Search wiring
    analytics.ts
  styles/
    globals.css                # Tailwind v4 @theme + base resets
```

**Section components** are the unit of reuse. A page is a list of `<Section>` blocks, each with consistent vertical rhythm, max-width, and background variants — this is what "section components" buys us when content moves to a CMS later (sections become block types in the CMS).

---

## 8. Blog setup specifics

- MDX files in `content/insights/`, slug = filename
- `generateStaticParams()` for all posts at build
- `generateMetadata()` reads frontmatter for OG/SEO
- RSS feed generated at build → `/insights/rss.xml`
- Sitemap: `app/sitemap.ts` enumerates all MDX content + static routes
- OG images: `app/insights/[slug]/opengraph-image.tsx` using `next/og` to render dynamic cards from frontmatter
- Reading time computed from MDX body
- Related posts: simple tag overlap scoring; surface 3
- Code blocks: Shiki via `rehype-pretty-code` (low priority — likely few code samples on a B2B industrial site)
- Image handling: `next/image` with explicit width/height; helper `<Figure>` MDX component takes a `src` from `/public/insights/[slug]/...`

---

## 9. SEO, performance, accessibility

- **SEO:** Per-page metadata via `generateMetadata`, structured data (`Organization`, `Article`, `BreadcrumbList`), canonical URLs, robots.txt + sitemap.xml. 301 map from old WordPress URLs (capture before launch).
- **Performance budget:** Lighthouse ≥ 95 across the board. LCP < 2.0s on 4G. JS shipped < 100kb gzipped on marketing pages. Use Server Components for all marketing content; Client Components only for nav, tabs, forms.
- **Caching:** Marketing pages fully static (default with App Router + no dynamic APIs). `revalidate` not needed for v1 — rebuilds happen on content commits. When CMS lands: ISR or Cache Components with `cacheTag` invalidation from CMS webhooks.
- **Images:** All through `next/image`. Workshop photography pre-optimized at upload (target <300kb hero, <120kb cards).
- **A11y:** WCAG 2.2 AA target. Color contrast checked against the moodboard palette (navy on cream is fine; tan-on-cream needs review). Keyboard nav for the mega-dropdown is critical — lift Radix `NavigationMenu` rather than rolling our own. Skip-to-content link, `lang` attribute, focus states visible.

---

## 10. Forms & integrations

- **Contact form:** Next.js route handler → Zod-validated → Resend email to `info@nicholaisen.dk`. Honeypot + rate limit (Upstash Redis on Vercel Marketplace, free tier).
- **Newsletter:** Defer to v1.1 once the user picks an ESP (Mailchimp, Brevo, etc.). Stub UI now, no wiring.
- **CRM:** Out of scope for v1. Note in code where the contact submission would also POST to a CRM webhook.

---

## 11. Internationalization

**Out of scope.** v1 ships English only. Routes are flat (no `[locale]` segment), copy lives directly in components and MDX. If translation becomes a requirement later, it's handled at the CMS layer — not worth the routing complexity to pre-empt now.

---

## 12. Project structure (top-level)

```
nicholaisen.website/
  src/
    app/
    components/
    content/
    lib/
    styles/
  content/                     # MDX files (kept outside src/ for editor friendliness)
  public/
    images/
    fonts/
  scripts/
    migrate-wp.ts              # one-shot WP → MDX importer (see §13)
    build-pagefind.ts
  inspiration-material/        # existing, keep until launch
  .github/workflows/           # if we want non-Vercel CI checks
  tests/
  next.config.ts
  tsconfig.json
  package.json
```

---

## 13. Content migration from current WordPress

One-time task before launch:

1. Crawl `nicholaisen.dk` (English variant) with a small Node script using `cheerio` to harvest pages, services, cases, blog posts.
2. Rewrite to MDX with frontmatter scaffolds — leave editorial polish for the user to finish.
3. Download referenced images, store under `public/images/migrated/`, rewrite `<img>` to `<Figure>` MDX components.
4. Capture every URL in `redirects.json` and wire into `next.config.ts` so old links keep working.

Estimated content volume from a quick look: ~5 service pages, ~4 case studies, a handful of news posts. Manageable in a day with a script + cleanup pass.

---

## 14. Implementation phases

| Phase | Scope | Est. duration | Exit criteria |
|---|---|---|---|
| **0. Foundation** | Repo init, Next.js + Tailwind 4 + TS scaffolding, Vercel link, design tokens, fonts, base layout, header/footer skeleton | 2–3 days | `pnpm dev` shows themed empty layout deployed to Vercel preview |
| **1. Content layer** | Zod schemas, MDX adapter, loader API, sample MDX for one service + one case + one post, schema validation in build | 2 days | Querying `getService('production-optimization')` returns typed data |
| **2. Homepage** | All 9 sections, real copy, real imagery from inspiration-material, mobile-responsive | 4–5 days | Homepage matches §4.1, passes Lighthouse ≥ 95 |
| **3. Mega-nav** | Desktop mega-dropdown + mobile drawer, full keyboard a11y, all 5 service columns + industries | 2–3 days | Nav usable on every breakpoint, axe-core clean |
| **4. Service template** | One template covering category + detail pages with anchored sub-nav, all 5 categories + 15 sub-services populated from MDX | 4–5 days | All `/services/...` routes render |
| **5. Industries, Cases, About, Contact** | Remaining static templates, contact form + Resend wiring | 3–4 days | All routes live, contact submissions arrive |
| **6. Insights (blog)** | Index, article template, MDX components, RSS, sitemap, OG images, Pagefind search | 3 days | Posts render, search works, OG cards generate |
| **7. WP migration + redirects** | Run importer, polish 10–15 pieces of content, wire redirects | 2 days | Old URLs 301 to new, content reads cleanly |
| **8. Polish + launch prep** | Lighthouse pass, a11y pass, cross-browser, copy review, analytics, GDPR cookie banner, DNS + go-live runbook | 3 days | All checks green, launch checklist signed off |

**Total: ~25–30 working days** for a solo developer. Roughly 5–6 weeks elapsed.

---

## 15. Decisions confirmed

- **Language:** English only for v1.
- **Content:** MDX in repo, no headless CMS for v1. Clear adapter boundary in place so a CMS can be added later without touching pages.
- **Imagery:** Use the assets in [`inspiration-material/images/`](inspiration-material/images/) (move to `public/images/` at scaffold time).
- **Logo:** Use `nicholaisen-logo.png` (navy) on light surfaces and `nicholaisen-logo-white.png` on the navy footer / dark heroes.
- **Design direction:** Scandinavian minimalism × Apple editorial discipline. Moodboard is canonical.

## 16. Open questions still to resolve

These can be answered during build, not before kickoff:

1. **SVG logo** — PNGs are 3KB and won't scale crisply at retina. Request vector versions before launch.
2. **Cookie/consent banner** — required for EU. Confirm vendor (Cookiebot vs. self-hosted) — affects launch checklist only.
3. **Newsletter ESP** — Mailchimp, Brevo, etc. Stub UI in v1; wire when chosen.
4. **CRM target for contact form** — HubSpot, Pipedrive, or just email-to-inbox via Resend? Default to email-only unless told otherwise.
5. **Domain & DNS cutover** — who controls `nicholaisen.dk`? Plan a low-traffic window for the switch.
6. **Case study confidentiality** — name clients or anonymize ("a leading kitchen producer")? Need per-case decision.
7. **"Opti" digital platform** — real product with screenshots, or aspirational positioning for v1? Affects how `/services/digital-performance` is built.

---

## 17. Out of scope for v1

Explicitly deferred to keep v1 shippable:

- Headless CMS integration (architecture is ready; flip later)
- Multi-language content
- Customer portal / login
- Live chat
- Advanced search (beyond Pagefind)
- A/B testing infrastructure
- Marketing automation beyond a basic newsletter signup
