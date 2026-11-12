"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Phones stack the panels vertically: a sideways strip leaves the open panel too narrow for its text. */
function useStacked() {
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return stacked;
}



export type ExpandingPanel = {
  key: string;
  image: string;
  alt: string;
  /** Small label at the top of a collapsed panel (e.g. "01"). */
  short: string;
  /** Title at the bottom of a collapsed panel. */
  closedTitle: string;
  /** Content shown at the bottom of an open panel. */
  content: React.ReactNode;
  /** Optional line at the top of an open panel (e.g. a case's industry and date). */
  top?: React.ReactNode;
};

const EASE = "cubic-bezier(.2,.7,.2,1)";

/**
 * A row of photo panels where the open one(s) take the free width and the
 * rest collapse to narrow strips. Hover or click opens a panel.
 * Shared by the homepage tracks and featured cases. On phones they become a
 * row of cards you swipe sideways, each showing its full content.
 */
export function ExpandingPanels({
  panels,
  isOpen,
  onSelect,
  collapsedWidth,
  openContentWidth,
  minWidth,
}: {
  panels: ExpandingPanel[];
  isOpen: (index: number) => boolean;
  onSelect: (index: number) => void;
  /** CSS width of a collapsed panel. */
  collapsedWidth: string;
  /** CSS width of the open panel's content box (may use cqw of the strip). */
  openContentWidth: string;
  /** Minimum strip width before it scrolls horizontally. */
  minWidth: string;
}) {
  const stacked = useStacked();
  if (stacked) return <SwipeCards panels={panels} isOpen={isOpen} />;

  return (
    <div className="mx-auto max-w-[1320px] [container-type:inline-size]">
      <div className="no-scrollbar overflow-x-auto rounded-[4px]">
        <div className="flex h-[clamp(440px,38vw,500px)] gap-[6px]" style={{ minWidth, transition: "min-width 400ms" }}>
          {panels.map((panel, i) => {
            const open = isOpen(i);
            return (
              <div
                key={panel.key}
                onClick={() => !open && onSelect(i)}
                onMouseEnter={() => !open && onSelect(i)}
                className={cn(
                  "relative min-w-0 overflow-hidden bg-[var(--color-accent)] text-white",
                  open ? "cursor-default" : "cursor-pointer",
                )}
                style={{ flex: open ? "1 1 0px" : `0 0 ${collapsedWidth}`, transition: `flex 600ms ${EASE}` }}
              >
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(min-width: 1320px) 900px, 80vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `color-mix(in srgb, #003050 ${open ? "45%" : "62%"}, transparent)`,
                    transition: "background 400ms",
                  }}
                />

                {/* Open state: optional top line */}
                {panel.top ? (
                  <div
                    aria-hidden={!open}
                    className="absolute top-0 left-0 box-border px-[clamp(24px,3vw,44px)] pt-[clamp(28px,3vw,44px)]"
                    style={{
                      width: openContentWidth,
                      opacity: open ? 1 : 0,
                      transition: `opacity 450ms ease ${open ? "220ms" : "0ms"}`,
                    }}
                  >
                    {panel.top}
                  </div>
                ) : null}

                {/* Open state */}
                <div
                  aria-hidden={!open}
                  className="absolute bottom-0 left-0 box-border flex flex-col gap-[14px] px-[clamp(24px,3vw,44px)] py-[clamp(28px,3vw,44px)]"
                  style={{
                    width: openContentWidth,
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(24px)",
                    pointerEvents: open ? "auto" : "none",
                    transition: `opacity 450ms ease ${open ? "220ms" : "0ms"}, transform 600ms ${EASE} ${open ? "220ms" : "0ms"}`,
                  }}
                >
                  {panel.content}
                </div>

                {/* Collapsed state */}
                <div
                  aria-hidden={open}
                  className="pointer-events-none absolute top-0 bottom-0 left-0 box-border flex flex-col items-start justify-between px-4 py-6"
                  style={{
                    width: collapsedWidth,
                    opacity: open ? 0 : 1,
                    transform: open ? "translateY(16px)" : "translateY(0)",
                    transition: `opacity 350ms ease ${open ? "0ms" : "260ms"}, transform 500ms ${EASE} ${open ? "0ms" : "260ms"}`,
                  }}
                >
                  <h3 className="order-2 m-0 text-[16px] leading-[1.25] font-medium tracking-[-0.01em] [overflow-wrap:break-word] hyphens-auto">
                    {panel.closedTitle}
                  </h3>
                  <span className="order-1 text-[12px] font-medium tracking-[0.12em] text-[var(--color-accent-300)] uppercase">
                    {panel.short}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Phones: one card per panel in a sideways scroll row, the next card peeking in.
 * Every card shows its photo, top line and content. When the parent opens a
 * panel (e.g. a journey stage is tapped), the row scrolls to it.
 */
function SwipeCards({ panels, isOpen }: { panels: ExpandingPanel[]; isOpen: (index: number) => boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const openIndex = panels.findIndex((_, i) => isOpen(i));
  const first = useRef(true);
  useEffect(() => {
    // Not on first render: only follow later changes.
    if (first.current) {
      first.current = false;
      return;
    }
    const row = rowRef.current;
    const card = row?.children[openIndex] as HTMLElement | undefined;
    if (row && card) row.scrollTo({ left: card.offsetLeft - row.offsetLeft - 20, behavior: "smooth" });
  }, [openIndex]);

  return (
    <div
      ref={rowRef}
      className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5"
    >
      {panels.map((panel) => (
        <div
          key={panel.key}
          className="relative flex min-h-[380px] w-[84%] flex-none snap-start flex-col justify-between overflow-hidden rounded-[4px] bg-[var(--color-accent)] text-white"
        >
          <Image src={panel.image} alt={panel.alt} fill sizes="85vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0" style={{ background: "color-mix(in srgb, #003050 52%, transparent)" }} />
          {panel.top ? <div className="relative px-5 pt-6">{panel.top}</div> : <span />}
          {/* Compact type; long single words hyphenate instead of overflowing. */}
          <div className="relative flex flex-col gap-2.5 px-5 pt-10 pb-6 [overflow-wrap:break-word] hyphens-auto [&_a]:px-4 [&_a]:py-2 [&_a]:text-[14px] [&_h3]:text-[24px] [&_h3]:leading-[1.15] [&_p]:text-[15px] [&_p]:leading-[1.5]">
            {panel.content}
          </div>
        </div>
      ))}
    </div>
  );
}
