import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { cn } from "@/lib/cn";

/**
 * Bordered card with a 16:10 photo, small-caps label, title, text and a
 * "… →" line. Used for cases and related services.
 */
export function CardLink({
  href,
  image,
  alt,
  label,
  title,
  text,
  cta,
  large = false,
  children,
}: {
  href: string;
  image?: string;
  alt: string;
  label: string;
  title: string;
  text: string;
  cta: string;
  /** Case-list size: 28px title, 16.5px text. */
  large?: boolean;
  /** Extra content above the CTA (e.g. case metrics). */
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-[18px] rounded-[4px] border border-[var(--color-divider)] bg-white px-5 pt-5 pb-7 text-[var(--color-text)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--color-accent-400)] hover:text-[var(--color-text)] hover:shadow-[0_10px_32px_color-mix(in_srgb,#003050_10%,transparent)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[var(--color-accent-200)]">
        {image ? <Image src={image} alt={alt} fill sizes="(min-width: 1320px) 600px, 90vw" className="object-cover" /> : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-2 pt-1">
        <span className="text-label">{label}</span>
        <h3
          className={cn(
            "m-0 leading-[1.2] font-medium tracking-[-0.015em] text-pretty",
            large ? "text-[clamp(22px,2vw,28px)]" : "text-[clamp(22px,2vw,26px)]",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "m-0 flex-1 leading-[1.6] text-pretty text-[var(--color-accent-500)]",
            large ? "text-[16.5px]" : "text-[16px]",
          )}
        >
          {text}
        </p>
        {children}
        <span className={cn("flex items-center gap-2.5 text-[16px] font-medium text-[var(--color-accent)]", children ? "mt-3.5" : "mt-2.5")}>
          {cta} <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

/** Up to three label/value pairs on a case card. */
export function CardMetrics({ metrics }: { metrics: { label: string; value: string }[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-x-10 gap-y-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-medium tracking-[0.1em] text-[var(--color-accent-500)] uppercase">{m.label}</span>
          <span className="text-[24px] leading-[1.2] font-medium tracking-[-0.01em] text-[var(--color-accent)] tabular-nums">
            {m.value}
          </span>
        </div>
      ))}
    </div>
  );
}
