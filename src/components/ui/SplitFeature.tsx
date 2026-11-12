import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";

/**
 * Two columns: a 16:10 photo (16px radius) beside a kicker, heading and copy.
 * With `href` the whole block is one link (e.g. "Meet the team →").
 */
export function SplitFeature({
  id,
  image,
  alt,
  objectPosition,
  imageFirst = false,
  kicker,
  title,
  children,
  actions,
  href,
  gap = "default",
  tightActions = false,
  className,
}: {
  id?: string;
  image: string;
  alt: string;
  objectPosition?: string;
  imageFirst?: boolean;
  kicker: string;
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  href?: string;
  /** Column/row gaps from the design: default 96/48, group page 96/40, linked cards 96/32. */
  gap?: "default" | "group" | "card";
  /** 8px instead of 12px above the buttons (group page). */
  tightActions?: boolean;
  className?: string;
}) {
  const media = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[var(--color-accent-200)]">
      <Image src={image} alt={alt} fill sizes="(min-width: 1320px) 600px, 90vw" className="object-cover" style={{ objectPosition }} />
    </div>
  );
  const text = (
    <div className="flex flex-col items-start gap-5">
      <Kicker line>{kicker}</Kicker>
      <h2 className="text-display-2 m-0 text-balance">{title}</h2>
      {children}
      {actions ? <div className={cn("flex flex-wrap gap-3", tightActions ? "mt-2" : "mt-3")}>{actions}</div> : null}
    </div>
  );
  const grid = cn(
    "grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center",
    gap === "default" && "gap-x-[clamp(32px,5vw,96px)] gap-y-12",
    gap === "group" && "gap-x-[clamp(32px,6vw,96px)] gap-y-10",
    gap === "card" && "gap-x-[clamp(32px,6vw,96px)] gap-y-8",
  );
  const body = (
    <>
      {imageFirst ? media : text}
      {imageFirst ? text : media}
    </>
  );

  return (
    <section id={id} className={cn("site-container section-top scroll-mt-6", className)}>
      {href ? (
        <Link href={href} className={cn(grid, "text-[var(--color-text)] hover:text-[var(--color-text)]")}>
          {body}
        </Link>
      ) : (
        <div className={grid}>{body}</div>
      )}
    </section>
  );
}

/** Paragraph inside a SplitFeature (18px / 1.65). */
export function FeatureText({ muted = false, children }: { muted?: boolean; children: React.ReactNode }) {
  return (
    <p className={cn("m-0 text-[18px] leading-[1.65] text-pretty", muted && "text-[var(--color-accent-500)]")}>{children}</p>
  );
}
