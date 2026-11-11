import { LocaleLink as Link } from "@/components/ui/LocaleLink";

const tiles = [
  {
    key: "standalone",
    title: "Standalone machine",
    description: "One machine, properly chosen, correctly installed — the fastest way to fix a bottleneck or add capacity.",
    image: "/images/scale-standalone-cnc.jpg",
  },
  {
    key: "robotCell",
    title: "Machine + robot cell",
    description: "Automation around an existing machine to free up operators and extend its reach.",
    image: "/images/scale-robot-cell.png",
  },
  {
    key: "factory",
    title: "Complete factory",
    description: "A new facility or a full line consolidation — planned as one flow, delivered by one partner.",
    image: "/images/cd0e2bbe-815b-4ab6-adfd-8b1fd54514c3.png",
  },
];

export function ScaleTiles() {
  return (
    <section
      style={{
        background: "#fff",
        color: "var(--color-text)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "96px clamp(20px,5vw,64px) 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,360px),1fr))",
          gap: "40px clamp(40px,6vw,96px)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
            }}
          >
            <span style={{ flex: "0 0 24px", height: "2px", background: "var(--color-spot)", display: "block" }} />
            Scale of delivery
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
            The machine that pays back fastest
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.65, margin: 0 }}>
            We deliver machinery from every major brand. Our job is to find the one that makes your production most
            efficient — and earns back your investment as fast as possible.
          </p>
          <p style={{ fontSize: "18px", lineHeight: 1.65, margin: 0, color: "var(--color-accent-500)" }}>
            We bring modern technology, set it up on your floor and stay until it runs at spec.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px 40px",
            padding: "40px 0",
            borderTop: "1px solid var(--color-divider)",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          <span
            style={{
              fontWeight: 200,
              fontSize: "clamp(56px,6vw,88px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "var(--color-spot)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            2–4 yrs
          </span>
          <div style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "19px", fontWeight: 500 }}>Typical payback</span>
            <span style={{ fontSize: "16px", lineHeight: 1.55, color: "var(--color-accent-500)" }}>
              We suggest solutions that bring your investment back in two to four years — calculated on your own numbers.
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "72px clamp(20px,5vw,64px) 96px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px),1fr))",
            gap: "24px",
          }}
        >
          {tiles.map((tile) => (
            <div
              key={tile.key}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                borderRadius: "4px",
                overflow: "hidden",
                background: "var(--color-accent-200)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${tile.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,48,80,0.85) 0%, rgba(0,48,80,0.1) 60%, transparent 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "24px",
                  color: "#fff",
                }}
              >
                <h3 style={{ fontWeight: 500, fontSize: "22px", lineHeight: 1.2, letterSpacing: "-0.015em", margin: "0 0 8px" }}>
                  {tile.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.5, margin: "0 0 16px", color: "rgba(255,255,255,0.8)" }}>
                  {tile.description}
                </p>
                <Link
                  href="/contact"
                  style={{
                    alignSelf: "flex-start",
                    padding: "10px 18px",
                    background: "var(--color-spot)",
                    color: "#fff",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Get in touch →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
