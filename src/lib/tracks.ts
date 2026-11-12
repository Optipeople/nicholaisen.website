/**
 * The five solution tracks from the approved design (v3), in journey order.
 * Text lives in messages under `home.tracks.items.<key>` (shared copy)
 * and `solutions.tracks.<key>` (landing-page copy).
 */
export const trackKeys = ["business", "optimization", "machines", "projects", "digital"] as const;
export type TrackKey = (typeof trackKeys)[number];

export type TrackService = {
  /** Photo for the service card; cards without one show the empty placeholder from the design. */
  image?: string;
  /** Shows the DIGITALIZED badge. */
  digital?: boolean;
};

export type Track = {
  key: TrackKey;
  /** URL segment under /services. */
  slug: string;
  /** Landing page for the track. */
  href: string;
  image: string;
  /** Journey stage, used for the kicker ("01 · Plan"). */
  stage: "plan" | "optimize" | "build" | "improve";
  /** Service cards, in order; titles/copy come from messages. */
  services: TrackService[];
};

const track = (
  key: TrackKey,
  slug: string,
  image: string,
  stage: Track["stage"],
  services: TrackService[],
): Track => ({
  key,
  slug,
  href: `/services/${slug}`,
  image,
  stage,
  services,
});

export const tracks: Track[] = [
  track("business", "business-development", "/images/v3/wood-frames.jpg", "plan", [
    { image: "/images/v3/woodshop-profiles.jpg" },
    { image: "/images/v3/wood-stack.jpg" },
    { image: "/images/v3/cnc-vacuum-table.jpg" },
    { image: "/images/v3/saw-blade-shavings.jpg" },
  ]),
  track("optimization", "production-optimization", "/images/v3/line-signal.avif", "optimize", [
    { image: "/images/v3/edgebander.jpg", digital: true },
  ]),
  track("machines", "machines", "/images/v3/machine-nkb2812.jpg", "build", [{}, {}, {}, { digital: true }]),
  // Photos from each service's own page (content/services/project-solutions).
  track("projects", "project-solutions", "/images/v3/robot-line.png", "build", [
    { image: "/images/workshop/cutting-machine.png" },
    { image: "/images/workshop/nesting.jpg" },
    { image: "/images/workshop/cnc-machining.jpg", digital: true },
  ]),
  track("digital", "digital-performance", "/images/v3/data-boards.avif", "improve", [
    { image: "/images/v3/data-boards.avif" },
    { image: "/images/v3/line-signal.avif" },
    { image: "/images/v3/saw-blade.avif" },
  ]),
];

export const trackHref = (key: TrackKey) => tracks.find((t) => t.key === key)!.href;
export const trackBySlug = (slug: string) => tracks.find((t) => t.slug === slug);
