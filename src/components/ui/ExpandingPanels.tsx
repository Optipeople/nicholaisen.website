"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

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
 * Shared by the homepage tracks and featured cases.
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
  return (
    <div className="mx-auto max-w-[1320px] [container-type:inline-size]">
      <div className="no-scrollbar overflow-x-auto rounded-[4px]">
        <div
          className="flex h-[clamp(440px,38vw,500px)] gap-[6px]"
          style={{ minWidth, transition: "min-width 400ms" }}
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
                style={{
                  flex: open ? "1 1 0px" : `0 0 ${collapsedWidth}`,
                  transition: `flex 600ms ${EASE}`,
                }}
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
