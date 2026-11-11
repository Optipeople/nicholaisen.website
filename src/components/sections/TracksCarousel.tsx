"use client";

import { useState } from "react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";

type Track = {
  key: string;
  kicker: string;
  title: string;
  question: string;
  lede: string;
  image: string;
  cta: string;
  services: { title: string; copy: string; digital?: boolean }[];
  statNum: string;
  statLabel: string;
};

const tracks: Track[] = [
  {
    key: "business",
    kicker: "01 · PLAN",
    title: "Business Development",
    question: "Where should your next investment go?",
    lede: "Strategy, investments and growth — decided on your own numbers, not on standard cost and gut feeling.",
    image: "/images/service-business.jpg",
    cta: "Book a TCO review",
    services: [
      { title: "Investment cases", copy: "A one-page TCO on your last or next machine. We mark what was measured, estimated — and left out." },
      { title: "Capacity & growth plans", copy: "Where the flow stalls today, and what it takes to grow output without growing cost." },
      { title: "Factory layout & flow", copy: "From a single cell to a green-field plant, planned around the lowest unit price." },
      { title: "Sourcing strategy", copy: "Free choice of supplier for each task — we answer for the combined result." },
    ],
    statNum: "2–4 yrs",
    statLabel: "ROI — instead of the classic 8–12",
  },
  {
    key: "optimization",
    kicker: "02 · OPTIMIZE",
    title: "Production Optimization",
    question: "Is it cost — or a bottleneck?",
    lede: "Improve capacity and efficiency, and reduce TCO. We turn invisible time into a visible price.",
    image: "/images/service-opt.jpg",
    cta: "Send your list",
    services: [
      { title: "Flow & bottleneck analysis", copy: "Measured on the line, so you know whether to cut costs or remove a bottleneck.", digital: true },
      { title: "Consumables benchmark", copy: "Price and quality, item by item. Typically 10–15% saved on consumables.", digital: true },
      { title: "Spare-parts plan", copy: "Critical components mapped, with a price on lost hours." },
      { title: "Time studies", copy: "Where operator time goes — and what it is worth to get it back." },
    ],
    statNum: "10–15%",
    statLabel: "Typically saved on consumables",
  },
  {
    key: "machines",
    kicker: "03 · BUILD",
    title: "Machines",
    question: "The right machine — built around your product.",
    lede: "Standard machines, custom machines and upgrades for wood, plastics and aluminium. Every machine we deliver is connected.",
    image: "/images/service-machines.jpg",
    cta: "Find a machine",
    services: [
      { title: "Standard machines", copy: "CNC, through-feed drilling and milling, edge banding — chosen on TCO, not list price." },
      { title: "Custom machines", copy: "Built for your product and process when standard does not fit." },
      { title: "Upgrades & retrofits", copy: "More capacity from the machines you already own." },
      { title: "Connected from day 1", copy: "OptiCloud on every new machine, with your own baseline for its whole life.", digital: true },
    ],
    statNum: "Day 1",
    statLabel: "Every machine connected to OptiCloud",
  },
  {
    key: "projects",
    kicker: "04 · BUILD",
    title: "Project Solutions",
    question: "From one machine to a complete factory.",
    lede: "Production lines, automation and turnkey projects — with one partner answering for the result.",
    image: "/images/service-projects.avif",
    cta: "Talk to us",
    services: [
      { title: "Production lines", copy: "Machines, handling and software planned as one flow." },
      { title: "Automation when it pays", copy: "Robot cells and handling, added when the numbers say so." },
      { title: "Project management", copy: "From analysis and sourcing to installation, ramp-up and follow-up.", digital: true },
    ],
    statNum: "1",
    statLabel: "Partner responsible end to end",
  },
  {
    key: "digital",
    kicker: "05 · IMPROVE",
    title: "Digital Performance",
    question: "What does an hour of standstill cost you?",
    lede: "Production insights, AI and optimization. The platform delivers data — we deliver results.",
    image: "/images/61e50172-53f0-4f2c-9750-01df24c5286f.jpg",
    cta: "Map your machine",
    services: [
      { title: "OptiCloud", copy: "Running hours, component health and efficiency, per machine.", digital: true },
      { title: "Early warning", copy: "We react when efficiency starts to slide — before it becomes standstill.", digital: true },
      { title: "Low scrap", copy: "Optimisation software on every machine.", digital: true },
      { title: "AI assistant", copy: "Helps operators and technicians fix faults fast. Any language, read aloud.", digital: true },
    ],
    statNum: "Year 4+",
    statLabel: "Continued under service contract",
  },
];

const stageMap: Record<string, string> = {
  business: "plan",
  optimization: "optimize",
  machines: "build",
  projects: "build",
  digital: "improve",
};

export function TracksCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const narrowW = "clamp(118px,11vw,170px)";

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
      {/* Stage labels */}
      <div style={{ display: "flex", gap: "24px", marginBottom: "32px", flexWrap: "wrap" }}>
        {["plan", "optimize", "build", "improve"].map((stage) => {
          const relatedTracks = tracks.filter((t) => stageMap[t.key] === stage);
          const isActive = relatedTracks.some((_, i) => {
            const trackIdx = tracks.findIndex((t) => stageMap[t.key] === stage);
            return activeIdx === trackIdx || (stage === "build" && (activeIdx === 2 || activeIdx === 3));
          });
          const baseIdx = tracks.findIndex((t) => stageMap[t.key] === stage);
          return (
            <button
              key={stage}
              type="button"
              onClick={() => setActiveIdx(baseIdx)}
              style={{
                all: "unset",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: isActive ? "var(--color-accent)" : "var(--color-accent-500)",
                paddingBottom: "6px",
                borderBottom: `2px solid ${isActive ? "var(--color-spot)" : "transparent"}`,
                transition: "color 200ms, border-color 200ms",
              }}
            >
              {stage}
            </button>
          );
        })}
      </div>

      {/* Expandable panels */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          minWidth: "720px",
          overflowX: "auto",
          scrollbarWidth: "none",
          containerType: "inline-size",
        }}
      >
        {tracks.map((track, i) => {
          const isOpen = i === activeIdx;
          return (
            <div
              key={track.key}
              onClick={() => !isOpen && setActiveIdx(i)}
              style={{
                flex: isOpen ? "1 1 0px" : `0 0 ${narrowW}`,
                minHeight: "480px",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                cursor: isOpen ? "default" : "pointer",
                transition: "flex 350ms cubic-bezier(.2,.7,.2,1)",
                backgroundImage: `url(${track.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Tint overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `color-mix(in srgb, #003050 ${isOpen ? "45%" : "62%"}, transparent)`,
                  transition: "background 350ms",
                }}
              />

              {/* Closed state: vertical label */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "24px 20px",
                  opacity: isOpen ? 0 : 1,
                  transition: `opacity 200ms ease ${isOpen ? "0ms" : "260ms"}`,
                  transform: isOpen ? "translateY(16px)" : "translateY(0)",
                  pointerEvents: isOpen ? "none" : "auto",
                }}
              >
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "12px",
                  }}
                >
                  {(track.kicker.split("·")[0] ?? track.kicker).trim()}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#fff",
                    lineHeight: 1.3,
                  }}
                >
                  {track.title}
                </span>
              </div>

              {/* Open state: full content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "clamp(24px,4vw,48px)",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 300ms ease ${isOpen ? "220ms" : "0ms"}, transform 350ms cubic-bezier(.2,.7,.2,1) ${isOpen ? "220ms" : "0ms"}`,
                  pointerEvents: isOpen ? "auto" : "none",
                  color: "#fff",
                  overflowY: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-spot)",
                    marginBottom: "12px",
                    display: "block",
                  }}
                >
                  {track.kicker}
                </span>
                <h2
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(24px,2.4vw,36px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: "0 0 12px",
                  }}
                >
                  {track.title}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.5,
                    margin: "0 0 24px",
                    color: "rgba(255,255,255,0.8)",
                    maxWidth: "52ch",
                  }}
                >
                  {track.lede}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px),1fr))",
                    gap: "12px",
                    marginBottom: "28px",
                  }}
                >
                  {track.services.map((svc) => (
                    <div
                      key={svc.title}
                      style={{
                        padding: "14px 16px",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 500 }}>{svc.title}</span>
                        {svc.digital && (
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              letterSpacing: "0.08em",
                              padding: "2px 6px",
                              borderRadius: "3px",
                              background: "var(--color-spot)",
                              color: "#fff",
                            }}
                          >
                            DIGITAL
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "13px", lineHeight: 1.45, margin: 0, color: "rgba(255,255,255,0.7)" }}>
                        {svc.copy}
                      </p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 22px",
                      background: "var(--color-accent)",
                      color: "#fff",
                      borderRadius: "4px",
                      fontSize: "15px",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    {track.cta}
                  </Link>
                  <div>
                    <span
                      style={{
                        fontWeight: 200,
                        fontSize: "clamp(28px,3vw,42px)",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "var(--color-spot)",
                      }}
                    >
                      {track.statNum}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.65)",
                        marginTop: "4px",
                      }}
                    >
                      {track.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
