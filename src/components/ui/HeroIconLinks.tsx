import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { cn } from "@/lib/cn";

export type HeroIconLink = {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  /** Current page / filter: full opacity and an orange underline. */
  current?: boolean;
};

/**
 * Row of large line icons with labels under a page hero — used as section
 * jumps (about, service, group), filters (cases) and the track switcher.
 */
export function HeroIconLinks({
  items,
  label,
  maxWidth,
  dim = 0.85,
  underline = false,
  tall = false,
  minWidth,
  gapClass = "gap-6",
}: {
  items: HeroIconLink[];
  label: string;
  maxWidth: string;
  /** Opacity of links that aren't current. */
  dim?: number;
  /** Reserve an underline under every label (filters, track switcher). */
  underline?: boolean;
  /** Two-line labels with a fixed height (track switcher). */
  tall?: boolean;
  /** Below this width the row scrolls sideways instead of squeezing. */
  minWidth?: string;
  gapClass?: string;
}) {
  const grid = (
    <nav
      aria-label={label}
      className={cn("mx-auto grid", gapClass)}
      style={{ maxWidth, minWidth, gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map(({ href, label: text, Icon, current }) => (
        <Link
          key={href + text}
          href={href}
          aria-current={current ? "page" : undefined}
          className="flex min-w-0 flex-col items-center gap-[14px] text-white hover:text-white hover:!opacity-100"
          style={{ opacity: current ? 1 : dim }}
        >
          <span className="flex size-16 items-center justify-center">
            <Icon size={64} strokeWidth={1} />
          </span>
          <span
            className={cn(
              "text-[16px] [overflow-wrap:break-word] hyphens-auto",
              underline && "border-b-2 pb-1.5",
              tall && "box-content flex min-h-[2.6em] items-center justify-center text-center leading-[1.3] whitespace-pre-line",
            )}
            style={underline ? { borderColor: current ? "var(--color-spot)" : "transparent" } : undefined}
          >
            {text}
          </span>
        </Link>
      ))}
    </nav>
  );

  if (!minWidth) return <div className="mt-16">{grid}</div>;
  return (
    <div className="no-scrollbar -mx-[clamp(20px,5vw,64px)] mt-16 overflow-x-auto px-[clamp(20px,5vw,64px)]">{grid}</div>
  );
}
