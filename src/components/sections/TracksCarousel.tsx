"use client";

import { useState } from "react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";

type Track = {
  key: string;
  kicker: string;
  short: string;
  title: string;
  vtitle: string;
  lede: string;
  image: string;
  cta: string;
  ctaHref: string;
};

const tracks: Track[] = [
  {
    key: "business",
    kicker: "01 · PLAN",
    short: "Plan",
    title: "Business Development",
    vtitle: "Business Development",
    lede: "Strategy, investments and growth — decided on your own numbers, not on standard cost and gut feeling.",
    image: "/images/service-business.jpg",
    cta: "Book a TCO review",
    ctaHref: "/contact",
  },
  {
    key: "optimization",
    kicker: "02 · OPTIMIZE",
    short: "Optimize",
    title: "Production Optimization",
    vtitle: "Production Optimization",
    lede: "Improve capacity and efficiency, and reduce TCO. We turn invisible time into a visible price.",
    image: "/images/service-opt.jpg",
    cta: "Send your list",
    ctaHref: "/contact",
  },
  {
    key: "machines",
    kicker: "03 · BUILD",
    short: "Build",
    title: "Machines",
    vtitle: "Machines",
    lede: "Standard machines, custom machines and upgrades for wood, plastics and aluminium. Every machine we deliver is connected.",
    image: "/images/service-machines.jpg",
    cta: "Find a machine",
    ctaHref: "/contact",
  },
  {
    key: "projects",
    kicker: "04 · BUILD",
    short: "Build",
    title: "Project Solutions",
    vtitle: "Project Solutions",
    lede: "Production lines, automation and turnkey projects — with one partner answering for the result.",
    image: "/images/service-projects.avif",
    cta: "Talk to us",
    ctaHref: "/contact",
  },
  {
    key: "digital",
    kicker: "05 · IMPROVE",
    short: "Improve",
    title: "Digital Performance",
    vtitle: "Digital Performance",
    lede: "Production insights, AI and optimization. The platform delivers data — we deliver results.",
    image: "/images/61e50172-53f0-4f2c-9750-01df24c5286f.jpg",
    cta: "Map your machine",
    ctaHref: "/contact",
  },
];

type Stage = { key: string; label: string; trackIdx: number; col: string; icon: React.ReactNode };

const PlanIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const OptimizeIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </svg>
);

const BuildIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
  </svg>
);

const ImproveIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const stages: Stage[] = [
  { key: "plan", label: "Plan", trackIdx: 0, col: "1", icon: <PlanIcon /> },
  { key: "optimize", label: "Optimize", trackIdx: 1, col: "2", icon: <OptimizeIcon /> },
  { key: "build", label: "Build", trackIdx: 2, col: "3 / span 2", icon: <BuildIcon /> },
  { key: "improve", label: "Improve", trackIdx: 4, col: "5", icon: <ImproveIcon /> },
];

function getActiveStage(idx: number): string {
  if (idx === 0) return "plan";
  if (idx === 1) return "optimize";
  if (idx === 2 || idx === 3) return "build";
  return "improve";
}

const narrowW = "clamp(118px,11vw,170px)";

export function TracksCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStage = getActiveStage(activeIdx);

  return (
    <section
      style={{
        maxWidth: "1320px",
        width: "100%",
        margin: "0 auto",
        padding: "96px clamp(20px,5vw,64px) 0",
        boxSizing: "border-box",
      }}
    >
      {/* Centered header */}
      <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 56px" }}>
        <span
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: "var(--color-accent-500)",
            marginBottom: "16px",
          }}
        >
          Your customer journey
        </span>
        <h2
          style={{
            fontWeight: 500,
            fontSize: "clamp(34px,4vw,56px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Five tracks. One partner.
        </h2>
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.6,
            margin: "20px 0 0",
            color: "var(--color-accent-500)",
          }}
        >
          Wherever you are in the journey, we pick it up and answer for the result all the way through.
        </p>
      </div>

      {/* Stage navigator */}
      <div style={{ overflowX: "auto", scrollbarWidth: "none" as const, margin: "0 0 32px" }}>
        <div
          style={{
            position: "relative",
            minWidth: "700px",
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
            gap: "12px 16px",
          }}
        >
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              left: "10%",
              right: "10%",
              top: "35px",
              height: "2px",
              background: "var(--color-accent-300)",
            }}
          />
          {/* Arrow chevrons */}
          {[20, 45, 75].map((pct) => (
            <svg
              key={pct}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              style={{
                position: "absolute",
                left: `${pct}%`,
                top: "36px",
                transform: "translate(-50%,-50%)",
                display: "block",
              }}
            >
              <path d="M4 1.5 L10 7 L4 12.5" fill="none" stroke="var(--color-accent-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}

          {stages.map((stage) => {
            const isActive = activeStage === stage.key;
            return (
              <div
                key={stage.key}
                onClick={() => setActiveIdx(stage.trackIdx)}
                style={{
                  gridColumn: stage.col,
                  gridRow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  position: "relative",
                  zIndex: 1,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: isActive ? "var(--color-accent)" : "transparent",
                    color: isActive ? "#fff" : "var(--color-accent)",
                    border: "2px solid var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 300ms, color 300ms",
                  }}
                >
                  {stage.icon}
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 500,
                    letterSpacing: "-0.015em",
                    color: isActive ? "var(--color-accent)" : "var(--color-accent-400)",
                    transition: "color 300ms",
                  }}
                >
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track panels */}
      <div style={{ boxSizing: "border-box", containerType: "inline-size" as const }}>
        <div style={{ overflowX: "auto", scrollbarWidth: "none" as const, borderRadius: "4px" }}>
          <div
            style={{
              display: "flex",
              gap: "6px",
              height: "clamp(440px,38vw,500px)",
              minWidth: "680px",
            }}
          >
            {tracks.map((track, i) => {
              const isOpen = i === activeIdx;
              return (
                <div
                  key={track.key}
                  onClick={() => !isOpen && setActiveIdx(i)}
                  onMouseEnter={() => !isOpen && setActiveIdx(i)}
                  style={{
                    position: "relative",
                    flex: isOpen ? "1 1 0px" : `0 0 ${narrowW}`,
                    minWidth: 0,
                    overflow: "hidden",
                    cursor: isOpen ? "default" : "pointer",
                    color: "#fff",
                    background: "var(--color-accent)",
                    transition: "flex 600ms cubic-bezier(.2,.7,.2,1)",
                  }}
                >
                  {/* Background image */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${track.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* Tint */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `color-mix(in srgb, #003050 ${isOpen ? "45%" : "62%"}, transparent)`,
                      transition: "background 400ms",
                    }}
                  />

                  {/* Open: full content */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: isOpen ? "100%" : "0%",
                      boxSizing: "border-box",
                      padding: "clamp(28px,3vw,44px) clamp(24px,3vw,44px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(16px)",
                      pointerEvents: isOpen ? "auto" : "none",
                      transition: `opacity 450ms ease ${isOpen ? "200ms" : "0ms"}, transform 600ms cubic-bezier(.2,.7,.2,1) ${isOpen ? "200ms" : "0ms"}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase" as const,
                        color: "var(--color-accent-300)",
                      }}
                    >
                      {track.kicker}
                    </span>
                    <h3
                      style={{
                        fontWeight: 500,
                        fontSize: "clamp(28px,2.8vw,40px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        margin: 0,
                        textWrap: "balance",
                      }}
                    >
                      {track.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.55,
                        margin: 0,
                        maxWidth: "52ch",
                        textWrap: "pretty",
                      }}
                    >
                      {track.lede}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap",
                        marginTop: "8px",
                      }}
                    >
                      <Link
                        href="/contact"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "11px 22px",
                          background: "#fff",
                          color: "var(--color-accent)",
                          borderRadius: "999px",
                          fontSize: "15px",
                          fontWeight: 500,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {track.cta}
                      </Link>
                      <Link
                        href={`/services/${track.key === "business" ? "business-development" : track.key === "optimization" ? "production-optimization" : track.key === "projects" ? "project-solutions" : track.key === "digital" ? "digital-performance" : track.key}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "10px 22px",
                          border: "1.5px solid #fff",
                          color: "#fff",
                          borderRadius: "999px",
                          fontSize: "15px",
                          fontWeight: 500,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>

                  {/* Closed: vertical label */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: narrowW,
                      boxSizing: "border-box",
                      padding: "24px 16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      opacity: isOpen ? 0 : 1,
                      pointerEvents: "none",
                      transition: `opacity 350ms ease ${isOpen ? "0ms" : "260ms"}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase" as const,
                        color: "var(--color-accent-300)",
                      }}
                    >
                      {track.short}
                    </span>
                    <h3
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                        margin: 0,
                        hyphens: "auto",
                        overflowWrap: "break-word",
                      }}
                    >
                      {track.vtitle}
                    </h3>
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
