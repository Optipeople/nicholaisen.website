import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { cn } from "@/lib/cn";

/**
 * Centred page hero on a full-bleed photo with the navy 62% tint (design v3).
 * Used by the track, service, cases, case, about, team and group pages.
 */
export function PhotoHero({
  image,
  alt,
  objectPosition,
  back,
  kicker,
  title,
  lede,
  note,
  titleMaxWidth = "none",
  ledeMaxWidth = "56ch",
  bottom = "default",
  children,
}: {
  image: string;
  alt: string;
  objectPosition?: string;
  /** "← Label" link above the kicker (service and case pages). */
  back?: { href: string; label: string };
  kicker?: string;
  title: string;
  lede: string;
  /** Small line under the lede (e.g. "Client: …"). */
  note?: string;
  titleMaxWidth?: "none" | "16ch" | "18ch";
  ledeMaxWidth?: "56ch" | "58ch" | "60ch";
  /** "overlap" leaves room for a card pulled up over the hero. */
  bottom?: "default" | "overlap";
  /** Icon links under the lede. */
  children?: React.ReactNode;
}) {
  return (
    <section className="relative bg-[var(--color-accent)] text-center text-white">
      <div className="absolute inset-0">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition }} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "color-mix(in srgb, #003050 62%, transparent)" }}
      />
      <div
        className={cn(
          "site-container relative",
          back ? "pt-10" : "pt-[clamp(80px,11vw,150px)]",
          bottom === "overlap" ? "pb-[170px]" : "pb-[clamp(64px,7vw,96px)]",
        )}
      >
        {back ? (
          <div className="text-left">
            <Link href={back.href} className="inline-flex items-center gap-2 text-[15px] text-white hover:text-[var(--color-accent-300)]">
              <span aria-hidden>←</span> {back.label}
            </Link>
          </div>
        ) : null}
        {kicker ? (
          <span
            className={cn(
              "text-kicker mb-4 block text-[var(--color-accent-300)]",
              back && (bottom === "overlap" ? "mt-[clamp(48px,7vw,96px)]" : "mt-[clamp(40px,6vw,80px)]"),
            )}
          >
            {kicker}
          </span>
        ) : null}
        <h1
          className="text-display-page mx-auto my-0 text-balance"
          style={{ maxWidth: titleMaxWidth === "none" ? undefined : titleMaxWidth }}
        >
          {title}
        </h1>
        <p className="text-lede mx-auto mt-5 mb-0 text-pretty" style={{ maxWidth: ledeMaxWidth }}>
          {lede}
        </p>
        {note ? <p className="mt-4 mb-0 text-[15px] text-[var(--color-accent-300)]">{note}</p> : null}
        {children}
      </div>
    </section>
  );
}
