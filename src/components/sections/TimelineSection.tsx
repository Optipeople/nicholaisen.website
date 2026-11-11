"use client";

import { useEffect, useRef, useState } from "react";

type Milestone = {
  year: number;
  title: string;
  copy: string;
};

const milestones: Milestone[] = [
  { year: 1993, title: "Nicholaisen A/S is founded", copy: "Starting from the customer's product, process and business." },
  { year: 2007, title: "First complete factory", copy: "From single machines to owning the entire production flow." },
  { year: 2009, title: "The business is strengthened", copy: "Focus on long-term customer relationships and business development." },
  { year: 2012, title: "Optipeople", copy: "Software, data and digitalization become part of the production perspective." },
  { year: 2018, title: "25 years of experience", copy: "Capabilities from analysis and development to sourcing and implementation." },
  { year: 2021, title: "Nicholaisen Baltic OÜ", copy: "Greater capacity and access to expertise in the Baltics." },
  { year: 2024, title: "Nordic scaling", copy: "Nicholaisen Sweden AB and NichoMachines strengthen our market presence." },
  { year: 2026, title: "The next chapter", copy: "AI and digitalization, smart sourcing and automation — all built around the customer's goals." },
];

function easeInOut(p: number) {
  return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const loopRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const playedRef = useRef(false);

  const pathD =
    "M 40 320 L 126 320 C 140 320 146 242 160 242 L 180 242 C 194 242 200 320 214 320 L 312 320 C 326 320 332 398 346 398 L 366 398 C 380 398 386 320 400 320 L 497 320 C 511 320 517 242 531 242 L 551 242 C 565 242 571 320 585 320 L 683 320 C 697 320 703 398 717 398 L 737 398 C 751 398 757 320 771 320 L 869 320 C 883 320 889 242 903 242 L 923 242 C 937 242 943 320 957 320 L 1055 320 C 1069 320 1075 398 1089 398 L 1109 398 C 1123 398 1129 320 1143 320 L 1240 320 C 1254 320 1260 242 1274 242 L 1294 242 C 1308 242 1314 320 1328 320 L 1426 320 C 1440 320 1446 398 1460 398 L 1480 398 C 1494 398 1500 320 1514 320 L 1600 320";

  const play = () => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(loopRef.current);
    playedRef.current = true;
    const duration = 7000;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        loopRef.current = setTimeout(play, 3000);
      }
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      clearTimeout(loopRef.current);
    };
  }, []);

  const e = easeInOut(progress);

  // Compute path head position
  const pe = pathRef.current;
  let head = { x: 40, y: 320, o: 0 };
  if (pe && pe.getTotalLength) {
    try {
      const pt = pe.getPointAtLength(e * pe.getTotalLength());
      head = { x: pt.x, y: pt.y, o: e > 0 && e < 1 ? 1 : 0 };
    } catch {}
  }

  // Node positions (approximately)
  const nodeXPositions = [170, 356, 541, 727, 913, 1099, 1284, 1470];
  const nodeYTop = 210;
  const nodeYBot = 430;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(160deg, var(--color-navy-900) 0%, #001e30 100%)",
        color: "#fff",
        overflow: "hidden",
        marginTop: "96px",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "72px clamp(20px,5vw,64px) 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "var(--color-spot)",
                marginBottom: "16px",
              }}
            >
              1993 → 2026
            </span>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "clamp(30px,3.4vw,46px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              33 years on the customer&apos;s side
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.6,
                margin: "14px 0 0",
                color: "var(--color-accent-300)",
              }}
            >
              With a combined view of business and competitiveness.
            </p>
          </div>
          <button
            type="button"
            onClick={play}
            style={{
              all: "unset",
              cursor: "pointer",
              fontSize: "14px",
              padding: "8px 14px",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              color: "var(--color-accent-300)",
            }}
          >
            ↻ Replay
          </button>
        </div>

        {/* Timeline SVG */}
        <div
          style={{
            overflowX: "auto",
            scrollbarWidth: "thin",
            margin: "8px calc(-1 * clamp(20px,5vw,64px)) 0",
            padding: "88px clamp(20px,5vw,64px) 40px",
          }}
        >
          <div
            style={{
              position: "relative",
              minWidth: "640px",
              width: "100%",
              maxWidth: "max(900px, 100%)",
              margin: "0 auto",
              aspectRatio: "1640/640",
            }}
          >
            <svg
              viewBox="0 0 1640 640"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            >
              {/* Background path */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Animated foreground path */}
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray="1 1"
                strokeDashoffset={String(1 - e)}
                pathLength={1}
              />

              {/* Nodes */}
              {milestones.map((m, i) => {
                const cx = nodeXPositions[i] ?? 0;
                const cy = i % 2 === 0 ? nodeYTop : nodeYBot;
                const on = e >= 1 || head.x >= cx - 2;
                return (
                  <g key={m.year}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={34}
                      fill="rgba(0,48,80,0.8)"
                      stroke={on ? "#fff" : "rgba(255,255,255,0.2)"}
                      strokeWidth="3"
                      style={{ transition: "stroke 300ms" }}
                    />
                    <text
                      x={cx}
                      y={cy + 6}
                      textAnchor="middle"
                      fill={on ? "#fff" : "rgba(255,255,255,0.3)"}
                      fontSize="11"
                      fontWeight="600"
                      style={{ transition: "fill 300ms" }}
                    >
                      {m.year}
                    </text>
                  </g>
                );
              })}

              {/* Animated head dot */}
              {head.o > 0 && (
                <circle cx={head.x} cy={head.y} r={7} fill="var(--color-spot)" opacity={head.o} />
              )}
            </svg>

            {/* Milestone labels */}
            {milestones.map((m, i) => {
              const cx = nodeXPositions[i] ?? 0;
              const isUp = i % 2 === 0;
              const on = e >= 1 || head.x >= (nodeXPositions[i] ?? 0) - 2;
              return (
                <div
                  key={m.year}
                  style={{
                    position: "absolute",
                    left: `${(cx / 1640) * 100}%`,
                    ...(isUp ? { bottom: "74.375%" } : { top: "74.375%" }),
                    width: "14cqw",
                    minWidth: "120px",
                    transform: `translateX(-50%) ${on ? "translateY(0)" : isUp ? "translateY(10px)" : "translateY(-10px)"}`,
                    opacity: on ? 1 : 0.1,
                    textAlign: "center",
                    transition: "opacity 500ms ease, transform 500ms ease",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(14px,1.4vw,22px)",
                      letterSpacing: "-0.02em",
                      color: "var(--color-spot)",
                    }}
                  >
                    {m.year}
                  </div>
                  <div
                    style={{ fontWeight: 500, fontSize: "clamp(11px,0.9vw,14px)", margin: "4px 0" }}
                  >
                    {m.title}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(9px,0.75vw,12px)",
                      lineHeight: 1.45,
                      color: "var(--color-accent-300)",
                    }}
                  >
                    {m.copy}
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
