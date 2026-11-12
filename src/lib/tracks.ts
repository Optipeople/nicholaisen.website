/**
 * The five solution tracks from the approved design (v3), in journey order.
 * Text lives in messages under `home.tracks.items.<key>`.
 */
export const trackKeys = ["business", "optimization", "machines", "projects", "digital"] as const;
export type TrackKey = (typeof trackKeys)[number];

export type Track = {
  key: TrackKey;
  /** Landing page for the track. */
  href: string;
  image: string;
};

export const tracks: Track[] = [
  { key: "business", href: "/services/business-development", image: "/images/v3/wood-frames.jpg" },
  { key: "optimization", href: "/services/production-optimization", image: "/images/v3/line-signal.avif" },
  // No Machines page exists yet; point at the services overview until it is built.
  { key: "machines", href: "/services", image: "/images/v3/machine-nkb2812.jpg" },
  { key: "projects", href: "/services/project-solutions", image: "/images/v3/robot-line.png" },
  { key: "digital", href: "/services/digital-performance", image: "/images/v3/data-boards.avif" },
];

export const trackHref = (key: TrackKey) => tracks.find((t) => t.key === key)!.href;
