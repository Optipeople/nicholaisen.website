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

/** Heights when stacked: a closed bar, and the open panel's minimum (it grows to fit its text). */
const BAR = 56;
const OPEN_MIN = 260;

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
};

const EASE = "cubic-bezier(.2,.7,.2,1)";

/**
 * A row of photo panels where the open one(s) take the free width and the
 * rest collapse to narrow strips. Hover or click opens a panel.
 * Shared by the homepage tracks and featured cases. On phones the panels stack:
 * closed ones become slim bars (number and title), the open one full width.
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
  // Stacked open panels are as tall as their text needs (measured, so the height can animate).
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  useEffect(() => {
    if (!stacked) return;
    const measure = () => setHeights(contentRefs.current.map((el) => Math.max(OPEN_MIN, el?.offsetHeight ?? 0)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [stacked, panels.length]);
  return (
    <div className="mx-auto max-w-[1320px] [container-type:inline-size]">
      <div className={cn("rounded-[4px]", !stacked && "no-scrollbar overflow-x-auto")}>
        <div
          className={cn("flex gap-[6px]", stacked ? "flex-col" : "h-[clamp(440px,38vw,500px)]")}
          style={stacked ? undefined : { minWidth, transition: "min-width 400ms" }}
        >
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
                style={
                  stacked
                    ? { flex: "none", height: open ? (heights[i] ?? OPEN_MIN) : BAR, transition: `height 600ms ${EASE}` }
                    : { flex: open ? "1 1 0px" : `0 0 ${collapsedWidth}`, transition: `flex 600ms ${EASE}` }
                }
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

                {/* Open state */}
                <div
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  aria-hidden={!open}
                  className={cn(
                    "absolute bottom-0 left-0 box-border flex flex-col",
                    stacked
                      ? // Phones: tighter padding and smaller type, so the open panel stays compact.
                        // Long single words (e.g. "Produktionsoptimering") hyphenate instead of overflowing.
                        "gap-2.5 px-5 py-6 [overflow-wrap:break-word] hyphens-auto [&_h3]:text-[24px] [&_h3]:leading-[1.15] [&_p]:text-[15px] [&_p]:leading-[1.5] [&_a]:px-4 [&_a]:py-2 [&_a]:text-[14px]"
                      : "gap-[14px] px-[clamp(24px,3vw,44px)] py-[clamp(28px,3vw,44px)]",
                  )}
                  style={{
                    width: stacked ? "100%" : openContentWidth,
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
                  className={cn(
                    "pointer-events-none absolute top-0 left-0 box-border flex px-4",
                    // Stacked: number and title side by side in the bar.
                    stacked ? "h-14 flex-row items-center gap-3" : "bottom-0 flex-col items-start justify-between py-6",
                  )}
                  style={{
                    width: stacked ? "100%" : collapsedWidth,
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
