import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * Map old WordPress URLs to new routes.
 *
 * Populate from a real WP crawl during launch prep (see plan.md §13).
 * The list below is a starter mapping based on the existing site IA — verify
 * each `source` against a real crawl before launch and add any missing slugs.
 */
export const redirects: Redirect[] = [
  // Likely WP slugs → new IA. Add/remove after the crawl confirms what exists.
  { source: "/services/optimization", destination: "/services/production-optimization", permanent: true },
  { source: "/services/optimering", destination: "/services/production-optimization", permanent: true },
  { source: "/services/projekter", destination: "/services/project-solutions", permanent: true },
  { source: "/services/maskiner", destination: "/services/project-solutions", permanent: true },
  { source: "/news", destination: "/insights", permanent: true },
  { source: "/news/:slug", destination: "/insights/:slug", permanent: true },
  { source: "/blog", destination: "/insights", permanent: true },
  { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
  { source: "/case-studies", destination: "/cases", permanent: true },
  { source: "/case-studies/:slug", destination: "/cases/:slug", permanent: true },
  { source: "/wp-content/:path*", destination: "/", permanent: true },
];
