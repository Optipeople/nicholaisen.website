import { LocaleLink as Link } from "@/components/ui/LocaleLink";

const industries = [
  {
    key: "solidWood",
    title: "Solid Wood",
    description: "Drying, profiling and high-precision machining for hardwood producers.",
    image: "/images/industry-massivtrae.avif",
    href: "/industries/solid-wood",
  },
  {
    key: "panelFurniture",
    title: "Panel Furniture",
    description: "Nesting, edgebanding and drilling lines for cabinet and furniture producers.",
    image: "/images/industry-plade.avif",
    href: "/industries/panel-furniture",
  },
  {
    key: "doorsWindows",
    title: "Doors & Windows",
    description: "Assembly, profiling and automation for door and window manufacturers.",
    image: "/images/industry-vinduer.jpg",
    href: "/industries/doors-windows",
  },
  {
    key: "aluminium",
    title: "Aluminium & Plastics",
    description: "CNC machining and processing for aluminium profiles and plastic components.",
    image: "/images/industry-aluminium.avif",
    href: "/industries",
  },
];

export function IndustriesSection() {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
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
            Industries
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
            Four industries, one partner
          </h2>
        </div>
        <Link
          href="/industries"
          style={{ fontSize: "16px", fontWeight: 500, color: "var(--color-spot)", textDecoration: "none" }}
        >
          All industries →
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,240px),1fr))",
          gap: "16px",
        }}
      >
        {industries.map((ind) => (
          <Link
            key={ind.key}
            href={ind.href as "/"}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              color: "var(--color-text)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                borderRadius: "4px",
                overflow: "hidden",
                background: "var(--color-accent-200)",
              }}
            >
              <div
                role="img"
                aria-label={ind.title}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${ind.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 400ms ease",
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: "19px", fontWeight: 500, marginBottom: "4px" }}>{ind.title}</div>
              <div style={{ fontSize: "15px", lineHeight: 1.5, color: "var(--color-accent-500)" }}>{ind.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
