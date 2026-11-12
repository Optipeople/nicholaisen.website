"use client";

import { useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { ExpandingPanels } from "@/components/ui/ExpandingPanels";

export type FeaturedCase = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  image: string;
  /** "Industry · date" line above the title. */
  meta: string;
  metrics: { label: string; value: string }[];
};

const COLLAPSED = "clamp(128px,12vw,190px)";

export function FeaturedCasesPanels({ cases, readLabel }: { cases: FeaturedCase[]; readLabel: string }) {
  const [active, setActive] = useState(0);

  const panels = cases.map((c, i) => ({
    key: c.slug,
    image: c.image,
    alt: c.title,
    short: String(i + 1).padStart(2, "0"),
    closedTitle: c.shortTitle,
    // Industry and date sit at the top of the open box.
    top: <span className="text-panel-kicker">{c.meta}</span>,
    content: (
      <>
        <h3 className="text-heading-1 m-0">{c.title}</h3>
        {/* Kept short: title and two key figures; the full story is on the case page. */}
        <div className="mt-1 flex flex-wrap gap-x-9 gap-y-3">
          {c.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span className="text-[12.5px] leading-[1.55] font-medium tracking-[0.1em] text-[var(--color-accent-300)] uppercase">
                {m.label}
              </span>
              <span className="text-[20px] leading-[1.55] font-medium tabular-nums">{m.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-6">
          <LinkButton href={`/cases/${c.slug}`} variant="pill-light" size="panel">
            {readLabel}
          </LinkButton>
        </div>
      </>
    ),
  }));

  return (
    <ExpandingPanels
      panels={panels}
      isOpen={(i) => i === active}
      onSelect={setActive}
      collapsedWidth={COLLAPSED}
      openContentWidth={`max(320px, calc(100cqw - 3 * (${COLLAPSED} + 6px)))`}
      minWidth="720px"
    />
  );
}
