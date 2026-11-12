import type { ReactNode } from "react";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";

/**
 * Two columns in the solution pages' statement style: kicker and heading on
 * the left, paragraphs on the right (first one in full ink, the rest muted).
 */
export function TextSection({
  kicker,
  title,
  paragraphs,
  action,
  className,
}: {
  kicker: string;
  title: string;
  paragraphs: string[];
  /** Shown below the paragraphs, e.g. a button. */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "site-container section-top grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-[clamp(40px,6vw,96px)] gap-y-6",
        className,
      )}
    >
      <div className="flex flex-col gap-5">
        <Kicker line>{kicker}</Kicker>
        <h2 className="text-display-2 m-0 text-balance">{title}</h2>
      </div>
      <div className="flex flex-col gap-5 pt-1 lg:pt-11">
        {paragraphs.map((p, i) => (
          <p key={p.slice(0, 24)} className={cn("m-0 text-[18px] leading-[1.65] text-pretty", i > 0 && "text-[var(--color-accent-500)]")}>
            {p}
          </p>
        ))}
        {action ? <div className="mt-3 flex flex-wrap gap-3">{action}</div> : null}
      </div>
    </section>
  );
}
