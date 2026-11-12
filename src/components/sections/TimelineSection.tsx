"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { timelineGlyphs } from "@/components/ui/icons";

const milestones = [
  { year: 1993, glyph: "flag" },
  { year: 2007, glyph: "factory" },
  { year: 2009, glyph: "trend" },
  { year: 2012, glyph: "monitor" },
  { year: 2018, glyph: "star" },
  { year: 2021, glyph: "pin" },
  { year: 2024, glyph: "globe" },
  { year: 2026, glyph: "rocket" },
] as const;

const PATH_D =
  "M 40 320 L 126 320 C 140 320 146 242 160 242 L 180 242 C 194 242 200 320 214 320 L 312 320 C 326 320 332 398 346 398 L 366 398 C 380 398 386 320 400 320 L 497 320 C 511 320 517 242 531 242 L 551 242 C 565 242 571 320 585 320 L 683 320 C 697 320 703 398 717 398 L 737 398 C 751 398 757 320 771 320 L 869 320 C 883 320 889 242 903 242 L 923 242 C 937 242 943 320 957 320 L 1055 320 C 1069 320 1075 398 1089 398 L 1109 398 C 1123 398 1129 320 1143 320 L 1240 320 C 1254 320 1260 242 1274 242 L 1294 242 C 1308 242 1314 320 1328 320 L 1426 320 C 1440 320 1446 398 1460 398 L 1480 398 C 1494 398 1500 320 1514 320 L 1600 320";

const DURATION_MS = 7000;
const nodeX = (i: number) => Math.round(170 + i * (1300 / 7));
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

/** "33 years on the customer's side" — animated path through eight milestones. Plays once when scrolled into view. */
export function TimelineSection({ className }: { className?: string }) {
  const t = useTranslations("home.timeline");
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef(0);
  const playedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const play = () => {
    cancelAnimationFrame(rafRef.current);
    playedRef.current = true;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION_MS);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !playedRef.current) play();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const e = easeInOut(progress);
  let head = { x: 40, y: 320, o: 0 };
  const pe = pathRef.current;
  if (pe) {
    const pt = pe.getPointAtLength(e * pe.getTotalLength());
    head = { x: pt.x, y: pt.y, o: e > 0 && e < 1 ? 1 : 0 };
  }

  return (
    <section
      ref={sectionRef}
      className={cn("overflow-hidden text-white", className)}
      style={{ background: "linear-gradient(160deg, var(--color-accent) 0%, var(--color-accent-900) 100%)" }}
    >
      <div className="site-container pt-14 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-4 block text-[14px] font-bold tracking-[0.14em] text-[var(--color-spot)]">
              1993 → 2026
            </span>
            <h2 className="text-display-3 m-0">{t("title")}</h2>
            <p className="mt-3.5 mb-0 text-[18px] leading-[1.6] text-[var(--color-accent-300)]">{t("intro")}</p>
          </div>
          <button
            type="button"
            onClick={play}
            className="cursor-pointer rounded-[4px] border border-[var(--color-accent-500)] px-3.5 py-2 text-[14px] leading-[1.55] text-[var(--color-accent-300)] hover:bg-[var(--color-accent-600)] hover:text-white"
          >
            ↻ {t("replay")}
          </button>
        </div>

        <div
          className="mt-2 overflow-x-auto px-[clamp(20px,5vw,64px)]"
          style={{
            marginInline: "calc(-1 * clamp(20px, 5vw, 64px))",
            scrollbarWidth: "thin",
            // Room for the labels above and below the path: they wrap onto more lines on narrower screens.
            paddingBlock: "max(92px, calc(140px - 3.5vw))",
          }}
        >
          <div
            // Only the band around the path (y 140–500 of the drawing); labels sit in the padding above and below.
            className="relative mx-auto aspect-[1640/360] w-full max-w-[1040px] min-w-[640px] [container-type:inline-size]"
          >
            <svg viewBox="0 140 1640 360" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <path d={PATH_D} fill="none" stroke="var(--color-accent-600)" strokeWidth="3" strokeLinejoin="round" />
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - e}
              />
              {milestones.map((m, i) => {
                const cx = nodeX(i);
                const cy = i % 2 === 0 ? 210 : 430;
                const on = e >= 1 || head.x >= cx - 2;
                const ring = on ? "#ffffff" : "var(--color-accent-600)";
                return (
                  <g key={m.year}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="34"
                      fill="var(--color-accent)"
                      stroke={ring}
                      strokeWidth="3"
                      style={{ transition: "stroke 300ms" }}
                    />
                    <g
                      transform={`translate(${cx - 13.2} ${cy - 13.2}) scale(1.1)`}
                      fill="none"
                      stroke={ring}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: "stroke 300ms" }}
                    >
                      {timelineGlyphs[m.glyph]}
                    </g>
                  </g>
                );
              })}
              <circle cx={head.x} cy={head.y} r="7" fill="var(--color-spot)" opacity={head.o} />
            </svg>

            {milestones.map((m, i) => {
              const cx = nodeX(i);
              const up = i % 2 === 0;
              const on = e >= 1 || head.x >= cx - 2;
              return (
                <div
                  key={m.year}
                  className="absolute w-[20cqw] text-center"
                  style={{
                    left: `${((cx / 1640) * 100).toFixed(3)}%`,
                    // Just above the upper circles / below the lower ones (y 164 and 476 of the drawing).
                    ...(up ? { bottom: "93.333%" } : { top: "93.333%" }),
                    transform: `translateX(-50%) ${on ? "translateY(0)" : up ? "translateY(10px)" : "translateY(-10px)"}`,
                    opacity: on ? 1 : 0.12,
                    transition: "opacity 500ms ease, transform 500ms ease",
                  }}
                >
                  <div className="text-[clamp(16px,1.6cqw,26px)] font-bold tracking-[-0.02em] text-[var(--color-spot)]">
                    {m.year}
                  </div>
                  <div className="my-1 text-[clamp(12px,1cqw,16px)] font-medium">{t(`milestones.y${m.year}.title`)}</div>
                  <div className="text-[clamp(10.5px,0.85cqw,13.5px)] leading-[1.45] text-[var(--color-accent-300)]">
                    {t(`milestones.y${m.year}.copy`)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
