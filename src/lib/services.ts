import { trackHref, type TrackKey } from "@/lib/tracks";

/**
 * Service sub-pages from the approved design (v3). The design has content
 * for the four Business Development services; text lives in messages under
 * `serviceDetail.pages.<key>`. Other services link to their track page.
 */
export type ServiceKey = "investmentCases" | "capacityGrowth" | "factoryLayout" | "sourcing";

/** A related-service card: another sub-page, or a service on a track page. */
type Related = { page: ServiceKey } | { track: TrackKey; index: number };

export type ServicePage = {
  key: ServiceKey;
  track: TrackKey;
  /** Position in the track's service list (`solutions.tracks.<track>.services`). */
  index: number;
  slug: string;
  image: string;
  image2: string;
  related: Related[];
};

const page = (key: ServiceKey, index: number, slug: string, image: string, image2: string, related: Related[]): ServicePage => ({
  key,
  track: "business",
  index,
  slug,
  image,
  image2,
  related,
});

export const servicePages: ServicePage[] = [
  page("investmentCases", 0, "investment-cases", "/images/v3/woodshop-profiles.jpg", "/images/v3/boring-panels.jpg", [
    { page: "capacityGrowth" },
    { page: "factoryLayout" },
    { page: "sourcing" },
    { track: "optimization", index: 0 },
  ]),
  page("capacityGrowth", 1, "capacity-growth-plans", "/images/v3/wood-stack.jpg", "/images/v3/edgebander.jpg", [
    { page: "investmentCases" },
    { page: "factoryLayout" },
    { page: "sourcing" },
    { track: "optimization", index: 0 },
  ]),
  page("factoryLayout", 2, "factory-layout-flow", "/images/v3/cnc-vacuum-table.jpg", "/images/v3/robot-sorting.png", [
    { page: "investmentCases" },
    { page: "capacityGrowth" },
    { page: "sourcing" },
  ]),
  page("sourcing", 3, "sourcing-strategy", "/images/v3/saw-blade-shavings.jpg", "/images/v3/cnc-tool-closeup.jpg", [
    { page: "investmentCases" },
    { page: "capacityGrowth" },
    { page: "factoryLayout" },
    { track: "optimization", index: 0 },
  ]),
];

export const serviceHref = (p: ServicePage) => `${trackHref(p.track)}/${p.slug}`;
export const servicePageByKey = (key: ServiceKey) => servicePages.find((p) => p.key === key)!;

/** Sub-page for a track's service card, if the design has one. */
export const servicePageFor = (track: TrackKey, index: number) =>
  servicePages.find((p) => p.track === track && p.index === index);

/** Sub-page addressed by /services/<track-slug>/<slug>. */
export const servicePageBySlugs = (trackSlug: string, slug: string) =>
  servicePages.find((p) => trackHref(p.track) === `/services/${trackSlug}` && p.slug === slug);

/**
 * Service sub-pages whose content comes from their MDX file (content/services)
 * rather than the design's messages — the Project Solutions and Digital
 * Performance services. They keep their existing URLs and use the same
 * template as the pages above.
 */
export type MdxServicePage = {
  track: TrackKey;
  /** Position in the track's service list. */
  index: number;
  /** URL segment after the track, e.g. "custom-production-lines". */
  slug: string;
  /** MDX slug, e.g. "project-solutions/custom-production-lines". */
  mdxSlug: string;
  /** Photo for the "What you get" block. */
  image2: string;
  /** Replaces the MDX hero photo when that file is missing. */
  image?: string;
  /** External site linked under the last text section. */
  externalLink?: string;
};

export const mdxServicePages: MdxServicePage[] = [
  // Flow & bottleneck analysis → the Flow Optimization page.
  { track: "optimization", index: 0, slug: "flow-optimization", mdxSlug: "production-optimization/flow-optimization", image2: "/images/workshop/panel-saw-2.jpg" },
  { track: "projects", index: 0, slug: "custom-production-lines", mdxSlug: "project-solutions/custom-production-lines", image2: "/images/v3/robot-line.png" },
  { track: "projects", index: 1, slug: "automation-integration", mdxSlug: "project-solutions/automation-integration", image2: "/images/v3/robot-sorting.png" },
  { track: "projects", index: 2, slug: "turnkey-projects", mdxSlug: "project-solutions/turnkey-projects", image2: "/images/v3/complete-factory.png" },
  // OptiCloud, Early warning and Low scrap → the matching Digital Performance pages.
  { track: "digital", index: 0, slug: "production-insights", mdxSlug: "digital-performance/production-insights", image2: "/images/v3/data-boards.avif", externalLink: "https://optipeople.com" },
  // Its MDX hero photo (/images/cnc-machining.jpg) doesn't exist.
  { track: "digital", index: 1, slug: "predictive-maintenance", mdxSlug: "digital-performance/predictive-maintenance", image2: "/images/v3/line-signal.avif", image: "/images/v3/cnc-spindle.jpg" },
  { track: "digital", index: 2, slug: "continuous-optimization", mdxSlug: "digital-performance/continuous-optimization", image2: "/images/v3/saw-blade.avif" },
];

export const mdxServiceHref = (p: MdxServicePage) => `${trackHref(p.track)}/${p.slug}`;

export const mdxServicePageBySlugs = (trackSlug: string, slug: string) =>
  mdxServicePages.find((p) => trackHref(p.track) === `/services/${trackSlug}` && p.slug === slug);

/** Where a track's service card links: its sub-page if one exists. */
export function subPageHref(track: TrackKey, index: number): string | undefined {
  const page = servicePageFor(track, index);
  if (page) return serviceHref(page);
  const mdx = mdxServicePages.find((p) => p.track === track && p.index === index);
  return mdx ? mdxServiceHref(mdx) : undefined;
}
