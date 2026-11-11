import type { Metadata } from "next";
import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { TimelineSection } from "@/components/sections/TimelineSection";

export const metadata: Metadata = {
  title: "About Nicholaisen — 33 years on the customer's side",
  description: "Independent of brands, responsible for the result. Helping manufacturers produce more for less since 1993.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", color: "#fff", textAlign: "center", minHeight: "480px", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/cd0e2bbe-815b-4ab6-adfd-8b1fd54514c3.png"
            alt="The Nicholaisen team"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "60% 40%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "color-mix(in srgb, #003050 62%, transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: "1320px",
            width: "100%",
            margin: "0 auto",
            padding: "clamp(80px,11vw,150px) clamp(20px,5vw,64px) clamp(64px,7vw,96px)",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontWeight: 500,
              fontSize: "clamp(40px,5.6vw,80px)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              margin: "0 auto",
              maxWidth: "18ch",
            }}
          >
            33 years on the customer&apos;s side
          </h1>
          <p
            style={{
              fontSize: "clamp(17px,1.5vw,21px)",
              lineHeight: 1.55,
              maxWidth: "58ch",
              margin: "20px auto 0",
            }}
          >
            Independent of brands, responsible for the result — helping manufacturers produce more for less, from the first machine to a complete factory.
          </p>
        </div>
      </section>

      {/* About us */}
      <section
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "112px clamp(20px,5vw,64px) 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))",
          gap: "48px clamp(32px,5vw,96px)",
          alignItems: "center",
          boxSizing: "border-box",
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
              textTransform: "uppercase" as const,
              color: "var(--color-accent-500)",
            }}
          >
            <span style={{ flex: "0 0 24px", height: "2px", background: "var(--color-spot)", display: "block" }} />
            About us
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
            We answer for the result — not the machine
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.65, margin: 0 }}>
            Since 1993 Nicholaisen has helped manufacturers in wood, panel furniture and doors &amp; windows produce more for less. We are not tied to one brand, so every recommendation starts from your product, your process and your business.
          </p>
          <p style={{ fontSize: "18px", lineHeight: 1.65, margin: 0 }}>
            From strategy and investment decisions to machines, complete production lines and the data that keeps them performing — one partner, responsible all the way through.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "13px 22px",
                background: "var(--color-accent)",
                color: "#fff",
                borderRadius: "4px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Our solutions
            </Link>
            <Link
              href="/cases"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 22px",
                border: "1px solid var(--color-accent-300)",
                borderRadius: "4px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              See our cases
            </Link>
          </div>
        </div>
        <div
          style={{
            aspectRatio: "16/10",
            borderRadius: "16px",
            overflow: "hidden",
            background: "var(--color-accent-200)",
            position: "relative",
          }}
        >
          <Image
            src="/images/b7866c3e-d6f5-4b27-bc78-a330425c278f.jpg"
            alt="Wood frames in production"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* Values */}
      <section
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "112px clamp(20px,5vw,64px) 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))",
          gap: "48px clamp(32px,5vw,96px)",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            aspectRatio: "16/10",
            borderRadius: "16px",
            overflow: "hidden",
            background: "var(--color-accent-200)",
            position: "relative",
          }}
        >
          <Image
            src="/images/61e50172-53f0-4f2c-9750-01df24c5286f.jpg"
            alt="Nicholaisen technician on the shop floor"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "60% 50%" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "var(--color-accent-500)",
            }}
          >
            <span style={{ flex: "0 0 24px", height: "2px", background: "var(--color-spot)", display: "block" }} />
            Our values
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
            Three principles guide every project
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.65, margin: 0 }}>
            <strong style={{ fontWeight: 600 }}>Free choice of supplier.</strong> We pick the best machine for each part of the job.
          </p>
          <p style={{ fontSize: "18px", lineHeight: 1.65, margin: 0 }}>
            <strong style={{ fontWeight: 600 }}>Measured, not estimated.</strong> Every decision rests on your own numbers.
          </p>
          <p style={{ fontSize: "18px", lineHeight: 1.65, margin: 0 }}>
            <strong style={{ fontWeight: 600 }}>One partner responsible.</strong> From the first calculation to the machine running at spec — and after.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "13px 22px",
                background: "var(--color-accent)",
                color: "#fff",
                borderRadius: "4px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection />

      {/* Stats + Group */}
      <section
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "112px clamp(20px,5vw,64px) 0",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,160px),1fr))",
            gap: "40px",
            padding: "40px 0",
            borderTop: "1px solid var(--color-divider)",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          {[
            { num: "1993", label: "Founded" },
            { num: "33 yrs", label: "On the customer's side" },
            { num: "3", label: "Companies in the group" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span
                style={{
                  fontWeight: 200,
                  fontSize: "clamp(40px,4vw,56px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "var(--color-accent)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.num}
              </span>
              <span style={{ fontSize: "15px", color: "var(--color-accent-500)" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))",
            gap: "24px clamp(32px,6vw,96px)",
            alignItems: "end",
            margin: "88px 0 40px",
          }}
        >
          <h2
            style={{
              fontWeight: 500,
              fontSize: "clamp(30px,3.4vw,48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            The Nicholaisen group
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              margin: 0,
              color: "var(--color-accent-500)",
              maxWidth: "48ch",
            }}
          >
            Three companies, one partner — close to our customers across Scandinavia and the Baltics.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,240px),1fr))",
            gap: "32px 40px",
          }}
        >
          {[
            { country: "Denmark", name: "Nicholaisen A/S", desc: "Headquarters\nSønderskovvej 17, 8362 Hørning", hq: true },
            { country: "Sweden", name: "Nicholaisen Sweden AB", desc: "Sales & service", hq: false },
            { country: "Baltics", name: "Nicholaisen Baltic OÜ", desc: "Sales & service", hq: false },
          ].map((co) => (
            <div
              key={co.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingTop: "20px",
                borderTop: `2px solid ${co.hq ? "var(--color-accent)" : "var(--color-accent-300)"}`,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "var(--color-accent-500)",
                }}
              >
                {co.country}
                {co.hq && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      padding: "3px 8px",
                      borderRadius: "3px",
                      background: "var(--color-accent)",
                      color: "#fff",
                    }}
                  >
                    HQ
                  </span>
                )}
              </span>
              <span style={{ fontSize: "22px", fontWeight: 500, letterSpacing: "-0.01em" }}>{co.name}</span>
              <span style={{ fontSize: "15.5px", lineHeight: 1.55, color: "var(--color-accent-500)", whiteSpace: "pre-line" as const }}>
                {co.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Team teaser */}
      <section
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "112px clamp(20px,5vw,64px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))",
            gap: "32px clamp(32px,6vw,96px)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              aspectRatio: "16/10",
              borderRadius: "16px",
              overflow: "hidden",
              background: "var(--color-accent-200)",
              position: "relative",
            }}
          >
            <Image
              src="/images/team-nicholaisen.png"
              alt="The Nicholaisen team"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{ objectFit: "cover", objectPosition: "60% 40%" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "var(--color-accent-500)",
              }}
            >
              <span style={{ flex: "0 0 24px", height: "2px", background: "var(--color-spot)", display: "block" }} />
              The team
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
              The team behind Nicholaisen
            </h2>
            <p style={{ fontSize: "18px", lineHeight: 1.65, margin: 0, color: "var(--color-accent-500)" }}>
              Specialists in sales, service, data and project management across Denmark, Sweden and the Baltics.
            </p>
            <Link
              href="/contact"
              style={{
                alignSelf: "flex-start",
                marginTop: "8px",
                padding: "13px 22px",
                background: "var(--color-accent)",
                color: "#fff",
                borderRadius: "4px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Meet the team →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
