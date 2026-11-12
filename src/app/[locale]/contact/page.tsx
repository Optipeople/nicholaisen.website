import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Nicholaisen",
  description: "Schedule a call, ask a question, or find your direct contact. We reply within one business day.",
};

/** Track keys the solution pages send as `?topic=` → the matching option below. */
const topicOptions: Record<string, string> = {
  business: "Business Development",
  optimization: "Production Optimization",
  machines: "Machines",
  projects: "Project Solutions",
  digital: "Digital Performance",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; message?: string }>;
}) {
  const { topic, message } = await searchParams;
  const defaultTopic = (topic && topicOptions[topic]) || "Choose a topic";
  const defaultMessage = typeof message === "string" ? message.slice(0, 2000) : "";
  return (
    <main style={{ background: "var(--color-accent)", color: "#fff" }}>
      {/* Hero + form */}
      <section
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "clamp(56px,7vw,96px) clamp(20px,5vw,64px) clamp(72px,8vw,112px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "56px clamp(40px,6vw,96px)",
          alignItems: "start",
        }}
      >
        {/* Left: contact info */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              color: "var(--color-accent-300)",
              marginBottom: "28px",
            }}
          >
            Contact
          </span>
          <h1
            style={{
              fontWeight: 500,
              fontSize: "clamp(48px,6.4vw,96px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Let&apos;s talk about your line.
          </h1>
          <p
            style={{
              fontSize: "clamp(17px,1.5vw,21px)",
              lineHeight: 1.55,
              margin: "36px 0 0",
              maxWidth: "46ch",
              color: "#fff",
            }}
          >
            Schedule a call, ask a question, or find your direct contact. We reply within one business day.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "36px", marginTop: "64px" }}>
            {/* Phone */}
            <div style={{ display: "grid", gridTemplateColumns: "32px minmax(0, 1fr)", gap: "4px 24px", alignItems: "start" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "24px" }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--color-accent-300)" }}>Call us</span>
                <div style={{ fontSize: "18px", lineHeight: 1.5, color: "#fff" }}>
                  <a href={`tel:${site.phone.replace(/\s+/g, "")}`} style={{ color: "#fff" }}>{site.phone}</a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "grid", gridTemplateColumns: "32px minmax(0, 1fr)", gap: "4px 24px", alignItems: "start" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "24px" }}>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--color-accent-300)" }}>Email</span>
                <div style={{ fontSize: "18px", lineHeight: 1.5, color: "#fff" }}>
                  <a href={`mailto:${site.email}`} style={{ color: "#fff" }}>{site.email}</a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div style={{ display: "grid", gridTemplateColumns: "32px minmax(0, 1fr)", gap: "4px 24px", alignItems: "start" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "24px" }}>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--color-accent-300)" }}>Visit</span>
                <div style={{ fontSize: "18px", lineHeight: 1.5, color: "#fff" }}>
                  {site.address.street}<br />
                  {site.address.postal} {site.address.city}, {site.address.country}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            color: "var(--color-text)",
            padding: "clamp(28px,4vw,56px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Quick email */}
            <form style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ fontSize: "22px", fontWeight: 500, letterSpacing: "-0.01em" }}>Get started</span>
              <span style={{ fontSize: "15.5px", lineHeight: 1.5, color: "var(--color-accent-500)" }}>
                Leave your email and we&apos;ll reach out — no form required.
              </span>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
                <input
                  type="email"
                  placeholder="name@company.com"
                  style={{
                    font: "inherit",
                    fontSize: "16px",
                    padding: "16px 18px",
                    border: "1px solid var(--color-accent-300)",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "var(--color-text)",
                    outline: "none",
                    flex: "1 1 220px",
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 24px",
                    background: "var(--color-accent)",
                    color: "#fff",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Reach out to me →
                </button>
              </div>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: 1, height: "1px", background: "var(--color-divider)" }} />
              <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--color-accent-500)" }}>or send a message</span>
              <span style={{ flex: 1, height: "1px", background: "var(--color-divider)" }} />
            </div>

            {/* Full form */}
            <form style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(max(200px, calc(50% - 16px)), 1fr))", gap: "32px" }}>
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Company", name: "company", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Role", name: "role", type: "text", optional: true },
                ].map((field) => (
                  <label key={field.name} style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--color-accent-500)" }}>
                    {field.label}{field.optional && <span style={{ fontWeight: 400, color: "var(--color-accent-400)", textTransform: "none" as const, letterSpacing: "0.08em" }}>(optional)</span>}
                    <input
                      type={field.type}
                      name={field.name}
                      style={{
                        font: "inherit",
                        fontSize: "16px",
                        fontWeight: 400,
                        letterSpacing: 0,
                        textTransform: "none" as const,
                        padding: "16px 18px",
                        border: "1px solid var(--color-accent-300)",
                        borderRadius: "8px",
                        background: "#fff",
                        color: "var(--color-text)",
                        outline: "none",
                      }}
                    />
                  </label>
                ))}
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--color-accent-500)" }}>
                I&apos;m interested in
                <select
                  name="topic"
                  defaultValue={defaultTopic}
                  style={{
                    font: "inherit",
                    fontSize: "16px",
                    fontWeight: 400,
                    letterSpacing: 0,
                    textTransform: "none" as const,
                    padding: "16px 18px",
                    border: "1px solid var(--color-accent-300)",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "var(--color-text)",
                    outline: "none",
                    appearance: "auto" as const,
                  }}
                >
                  <option>Choose a topic</option>
                  <option>Business Development</option>
                  <option>Production Optimization</option>
                  <option>Machines</option>
                  <option>Project Solutions</option>
                  <option>Digital Performance</option>
                  <option>Service &amp; spare parts</option>
                  <option>Something else</option>
                </select>
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--color-accent-500)" }}>
                What are you trying to make better?
                <textarea
                  name="message"
                  defaultValue={defaultMessage}
                  rows={6}
                  placeholder="A few sentences is plenty."
                  style={{
                    font: "inherit",
                    fontSize: "16px",
                    fontWeight: 400,
                    letterSpacing: 0,
                    textTransform: "none" as const,
                    padding: "16px 18px",
                    border: "1px solid var(--color-accent-300)",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "var(--color-text)",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
                <button
                  type="submit"
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "18px 32px",
                    background: "var(--color-accent)",
                    color: "#fff",
                    borderRadius: "6px",
                    fontSize: "17px",
                    fontWeight: 500,
                  }}
                >
                  Send message →
                </button>
                <span style={{ fontSize: "14px", color: "var(--color-accent-500)" }}>We reply within one business day.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 clamp(20px,5vw,64px) clamp(80px,9vw,128px)",
        }}
      >
        <h2
          style={{
            fontWeight: 500,
            fontSize: "clamp(30px,3.4vw,48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 48px",
          }}
        >
          What happens next
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "40px clamp(32px,4vw,64px)",
          }}
        >
          {[
            {
              step: "01",
              title: "We read it the same day",
              desc: "Your message goes straight to a specialist in your area — not into a queue.",
            },
            {
              step: "02",
              title: "A short call",
              desc: "Twenty minutes on your production, your machines and what you already measure today.",
            },
            {
              step: "03",
              title: "A look at your numbers",
              desc: "We come back with a first view on your own data — TCO, capacity or the machine that worries you.",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                paddingTop: "20px",
                borderTop: "2px solid #fff",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-spot)", fontVariantNumeric: "tabular-nums" }}>{item.step}</span>
              <h3 style={{ fontWeight: 500, fontSize: "24px", letterSpacing: "-0.015em", margin: 0 }}>{item.title}</h3>
              <p style={{ fontSize: "16.5px", lineHeight: 1.6, margin: 0, color: "var(--color-accent-300)", textWrap: "pretty" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
