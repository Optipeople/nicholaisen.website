/**
 * Line icons used by the approved design (v3). All inherit `currentColor`.
 */
type IconProps = { size?: number; strokeWidth?: number; className?: string };

function Svg({
  size = 24,
  strokeWidth = 1.5,
  className,
  round = true,
  children,
}: IconProps & { round?: boolean; children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap={round ? "round" : undefined}
      strokeLinejoin={round ? "round" : undefined}
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => (
  <Svg size={20} round={false} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Svg>
);

/* Tab icons */
export const BriefcaseIcon = (p: IconProps) => (
  <Svg size={20} round={false} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="1.5" />
    <path d="M9 7V4h6v3M3 12h18" />
  </Svg>
);
export const FactoryIcon = (p: IconProps) => (
  <Svg size={20} round={false} {...p}>
    <path d="M3 21V9l6 4V9l6 4V5h6v16z" />
  </Svg>
);
export const CalendarCheckIcon = (p: IconProps) => (
  <Svg size={20} round={false} {...p}>
    <rect x="4" y="5" width="16" height="16" rx="1.5" />
    <path d="M8 3v4M16 3v4M4 10h16M9 15l2 2 4-4" />
  </Svg>
);

/* Journey stage icons */
export const CompassIcon = (p: IconProps) => (
  <Svg size={30} {...p}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </Svg>
);
export const GaugeIcon = (p: IconProps) => (
  <Svg size={30} {...p}>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </Svg>
);
export const BuildingIcon = (p: IconProps) => (
  <Svg size={30} {...p}>
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
  </Svg>
);
export const TrendUpIcon = (p: IconProps) => (
  <Svg size={30} {...p}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Svg>
);

/**
 * Timeline milestone glyphs, drawn inside the timeline's own <svg>
 * (24×24 coordinate space, positioned by the caller).
 */
export const timelineGlyphs: Record<string, React.ReactNode> = {
  flag: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </>
  ),
  factory: (
    <>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </>
  ),
  trend: (
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>
  ),
  monitor: (
    <>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </>
  ),
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
};
