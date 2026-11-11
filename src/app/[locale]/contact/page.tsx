import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Nicholaisen — Get in touch",
  description: "Tell us what you're trying to make better. We reply within one business day.",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      {/* Hero contact strip */}
      <section
        style={{
          background: "var(--color-navy-900)",
          color: "#fff",
          padding: "clamp(80px,10vw,140px) clamp(20px,5vw,64px) 0",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))",
            gap: "64px clamp(40px,7vw,112px)",
            alignItems: "start",
          }}
        >
          {/* Left: info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "80px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "var(--color-spot)",
                textTransform: "uppercase" as const,
              }}
            >
              Contact
            </span>
            <h1
              style={{
                fontWeight: 500,
                fontSize: "clamp(36px,4.5vw,64px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Let&apos;s talk about your production
            </h1>
            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.75)",
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              Tell us what you are trying to make better. We will get back to you within one business day.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "16px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    flex: "0 0 40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.53 3.47 2 2 0 0 1 3.5 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15.92z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Phone</div>
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    style={{ fontSize: "17px", color: "#fff", textDecoration: "none" }}
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    flex: "0 0 40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Email</div>
                  <a
                    href={`mailto:${site.email}`}
                    style={{ fontSize: "17px", color: "#fff", textDecoration: "none" }}
                  >
                    {site.email}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    flex: "0 0 40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Address</div>
                  <span style={{ fontSize: "17px", color: "#fff" }}>
                    {site.address.street}<br />
                    {site.address.postal} {site.address.city}, {site.address.country}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px 16px 0 0",
              padding: "40px clamp(24px,3vw,48px)",
              color: "var(--color-navy-900)",
              boxSizing: "border-box",
            }}
          >
            <h2
              style={{
                fontWeight: 500,
                fontSize: "clamp(22px,2.4vw,32px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: "0 0 6px",
              }}
            >
              Send us a message
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "var(--color-accent-500)",
                margin: "0 0 28px",
              }}
            >
              We&apos;ll reply within one business day.
            </p>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "var(--color-accent-500)" }}>
                    First name
                  </label>
                  <input
                    name="firstName"
                    placeholder="Anders"
                    style={{
                      padding: "11px 14px",
                      border: "1px solid var(--color-accent-300)",
                      borderRadius: "6px",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                      width: "100%",
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "var(--color-accent-500)" }}>
                    Last name
                  </label>
                  <input
                    name="lastName"
                    placeholder="Madsen"
                    style={{
                      padding: "11px 14px",
                      border: "1px solid var(--color-accent-300)",
                      borderRadius: "6px",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                      width: "100%",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "var(--color-accent-500)" }}>
                  Company
                </label>
                <input
                  name="company"
                  placeholder="Acme Furniture A/S"
                  style={{
                    padding: "11px 14px",
                    border: "1px solid var(--color-accent-300)",
                    borderRadius: "6px",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "var(--color-accent-500)" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="anders@acmefurniture.dk"
                  style={{
                    padding: "11px 14px",
                    border: "1px solid var(--color-accent-300)",
                    borderRadius: "6px",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "var(--color-accent-500)" }}>
                  What are you trying to improve?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Briefly describe your situation — no need to have everything figured out"
                  style={{
                    padding: "11px 14px",
                    border: "1px solid var(--color-accent-300)",
                    borderRadius: "6px",
                    fontSize: "15px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    width: "100%",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "14px 24px",
                  background: "var(--color-spot)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  marginTop: "4px",
                }}
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section
        style={{
          background: "#fff",
          padding: "96px clamp(20px,5vw,64px)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))",
              gap: "48px clamp(32px,8vw,120px)",
              alignItems: "start",
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
                  textTransform: "uppercase" as const,
                  color: "var(--color-accent-500)",
                  marginBottom: "20px",
                }}
              >
                <span style={{ flex: "0 0 24px", height: "2px", background: "var(--color-spot)", display: "block" }} />
                What happens next
              </span>
              <h2
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(30px,3.4vw,48px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "0 0 16px",
                }}
              >
                How we work together
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.65,
                  color: "var(--color-accent-500)",
                  margin: 0,
                  maxWidth: "44ch",
                }}
              >
                No long sales cycles. We start by understanding your situation, then we figure out if — and how — we can help.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {[
                {
                  step: "01",
                  title: "We review your message",
                  desc: "Within one business day, the right person at Nicholaisen will read your message and prepare a relevant response.",
                },
                {
                  step: "02",
                  title: "A short first conversation",
                  desc: "We call or write to understand your situation. No long qualification process — just a direct exchange about what you're trying to solve.",
                },
                {
                  step: "03",
                  title: "A concrete next step",
                  desc: "If there's a fit, we propose something specific: a site visit, an analysis, a machine review — whatever makes most sense for your situation.",
                },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      flex: "0 0 44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "2px solid var(--color-spot)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-spot)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontWeight: 600,
                        fontSize: "17px",
                        margin: "0 0 6px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "15.5px",
                        lineHeight: 1.6,
                        color: "var(--color-accent-500)",
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
