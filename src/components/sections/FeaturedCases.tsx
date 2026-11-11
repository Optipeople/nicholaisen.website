"use client";

import { useState } from "react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";

type Case = {
  key: string;
  industry: string;
  title: string;
  summary: string;
  image: string;
  results: [string, string][];
  slug: string;
};

const cases: Case[] = [
  {
    key: "hardwood",
    industry: "Solid Wood",
    title: "Rebuilding a hardwood drying schedule",
    summary: "A drying schedule rebuild recovered 1.6 percentage points of yield and reduced downstream rework by half.",
    image: "/images/case-koekken.jpg",
    results: [["Rework reduction", "-51%"], ["Yield recovery", "+1.6 pts"], ["Annual margin", "EUR 410k"]],
    slug: "hardwood-drying",
  },
  {
    key: "kitchen",
    industry: "Panel Furniture",
    title: "A kitchen producer chooses not to invest",
    summary: "A planned EUR 4.2M investment was deferred after a diagnostic showed 31% hidden capacity in the existing line.",
    image: "/images/case-doors.jpg",
    results: [["Throughput gain", "+31%"], ["Capex deferred", "EUR 4.2M"], ["OEE lift", "+18 pts"]],
    slug: "kitchen-capacity",
  },
  {
    key: "million",
    industry: "Panel Furniture",
    title: "A million-unit panel facility, end to end",
    summary: "A new high-volume panel furniture facility commissioned to produce more than 1.2 million units a year.",
    image: "/images/team-nicholaisen.png",
    results: [["Annual capacity", "1.2M units"], ["Project duration", "26 months"], ["OEE at month 9", "81%"]],
    slug: "million-unit-facility",
  },
  {
    key: "greenfield",
    industry: "Solid Wood",
    title: "A greenfield solid wood factory in eighteen months",
    summary: "A new hardwood components facility delivered turnkey on a greenfield site in eighteen months.",
    image: "/images/company-office.png",
    results: [["Project duration", "18 months"], ["First shipment", "On contract date"], ["Budget", "-2.4%"]],
    slug: "greenfield-factory",
  },
];

export function FeaturedCases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const narrowW = "clamp(128px,12vw,190px)";

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "32px",
        }}
      >
        <div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-accent-500)",
              marginBottom: "12px",
            }}
          >
            <span style={{ flex: "0 0 24px", height: "2px", background: "var(--color-spot)", display: "block" }} />
            Featured cases
          </span>
          <h2
            style={{
              fontWeight: 500,
              fontSize: "clamp(30px,3.4vw,48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Results for manufacturers
          </h2>
        </div>
        <Link
          href="/cases"
          style={{ fontSize: "16px", fontWeight: 500, color: "var(--color-accent)", textDecoration: "none" }}
        >
          All cases →
        </Link>
      </div>

      {/* Expandable carousel */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          minWidth: "560px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {cases.map((c, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={c.key}
              onClick={() => !isActive && setActiveIdx(i)}
              style={{
                flex: isActive ? "1 1 0px" : `0 0 ${narrowW}`,
                minHeight: "380px",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                cursor: isActive ? "default" : "pointer",
                transition: "flex 350ms cubic-bezier(.2,.7,.2,1)",
                backgroundImage: `url(${c.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Tint */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `color-mix(in srgb, #003050 ${isActive ? "50%" : "65%"}, transparent)`,
                  transition: "background 350ms",
                }}
              />

              {/* Closed: vertical index + title */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "20px 16px",
                  opacity: isActive ? 0 : 1,
                  transform: isActive ? "translateY(16px)" : "translateY(0)",
                  transition: `opacity 200ms ease ${isActive ? "0ms" : "260ms"}, transform 300ms ${isActive ? "0ms" : "260ms"}`,
                  pointerEvents: isActive ? "none" : "auto",
                  color: "#fff",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--color-spot)",
                    letterSpacing: "0.1em",
                    marginBottom: "8px",
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {c.title}
                </span>
              </div>

              {/* Open: full content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "clamp(20px,3vw,36px)",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 300ms ease ${isActive ? "220ms" : "0ms"}, transform 350ms ${isActive ? "220ms" : "0ms"}`,
                  pointerEvents: isActive ? "auto" : "none",
                  color: "#fff",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: "10px",
                    display: "block",
                  }}
                >
                  {c.industry}
                </span>
                <h3
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(20px,2vw,28px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                    margin: "0 0 10px",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.5,
                    margin: "0 0 20px",
                    color: "rgba(255,255,255,0.8)",
                    maxWidth: "52ch",
                  }}
                >
                  {c.summary}
                </p>
                <div style={{ display: "flex", gap: "24px", marginBottom: "20px", flexWrap: "wrap" }}>
                  {c.results.map(([label, value]) => (
                    <div key={label}>
                      <div
                        style={{
                          fontWeight: 200,
                          fontSize: "clamp(20px,2.4vw,32px)",
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                          color: "var(--color-spot)",
                        }}
                      >
                        {value}
                      </div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", marginTop: "4px" }}>{label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/cases/${c.slug}` as "/"}
                  style={{
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--color-spot)",
                    textDecoration: "none",
                  }}
                >
                  Read case →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => setActiveIdx((activeIdx + 1) % cases.length)}
          style={{
            all: "unset",
            cursor: "pointer",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "1px solid var(--color-divider)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Next case"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
