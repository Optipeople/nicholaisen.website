import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { site } from "@/lib/site";
import { FooterCta } from "@/components/layout/FooterCta";
import { NewsletterSignup } from "@/components/layout/NewsletterSignup";

const solutions = [
  { title: "Business Development", href: "/services/business-development" },
  { title: "Production Optimization", href: "/services/production-optimization" },
  { title: "Machines", href: "/services/machines" },
  { title: "Project Solutions", href: "/services/project-solutions" },
  { title: "Digital Performance", href: "/services/digital-performance" },
];

const group = [
  { title: "Nicholaisen A/S", href: "/about/group#denmark" },
  { title: "Nicholaisen Sweden AB", href: "/about/group#sweden" },
  { title: "Nicholaisen Baltic OÜ", href: "/about/group#baltics" },
];

const company = [
  { title: "About", href: "/about" },
  { title: "People", href: "/about/team" },
  { title: "Nicholaisen group", href: "/about/group" },
  { title: "Cases", href: "/cases" },
  { title: "Contact", href: "/contact" },
  { title: "Privacy", href: "/legal/privacy" },
];

/** Round outline badge for a social icon (as the LinkedIn link). */
const socialStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textDecoration: "none",
};

export function SiteFooter({ locale }: { locale: string }) {
  return (
    <>
      <FooterCta />

      {/* Footer */}
      <footer style={{ background: "var(--color-navy-900)", color: "#fff" }}>
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "72px clamp(20px,5vw,64px) 32px",
          }}
        >
          <NewsletterSignup />

          <div
            style={{
              marginTop: "56px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px),1fr))",
              gap: "32px",
              fontSize: "15px",
              lineHeight: 2,
            }}
          >
            {/* Brand column */}
            <div>
              <Link href="/" aria-label="Nicholaisen — Home" style={{ textDecoration: "none" }}>
                <Image
                  src="/brand/logo-white.png"
                  alt="Nicholaisen"
                  width={140}
                  height={48}
                  style={{ height: "48px", width: "auto", display: "block", marginBottom: "12px" }}
                />
              </Link>
              <div style={{ color: "var(--color-accent-300)", fontSize: "14px", lineHeight: 1.7 }}>
                {site.address.street}<br />
                {site.address.postal} {site.address.city}, {site.address.country}<br />
                <a href={`mailto:${site.email}`} style={{ color: "inherit" }}>{site.email}</a><br />
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} style={{ color: "inherit" }}>{site.phone}</a>
              </div>
            </div>

            {/* Solutions */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--color-accent-400)",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                SOLUTIONS
              </span>
              {solutions.map((s) => (
                <Link key={s.href} href={s.href as "/"} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  {s.title}
                </Link>
              ))}
            </div>

            {/* Group */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--color-accent-400)",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                GROUP
              </span>
              {group.map((g) => (
                <Link key={g.title} href={g.href} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  {g.title}
                </Link>
              ))}
            </div>

            {/* Company */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--color-accent-400)",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                COMPANY
              </span>
              {company.map((c) => (
                <Link key={c.title} href={(c.href || "#") as "/"} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  {c.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginTop: "56px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              fontSize: "14px",
              color: "var(--color-accent-300)",
            }}
          >
            <span>© {new Date().getFullYear()} Nicholaisen A/S · CVR {site.cvr}</span>
            {/* Social links */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <a
                href="https://www.linkedin.com/company/nicholaisen"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
                style={socialStyle}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Instagram and Facebook: not linked yet. */}
              <span role="img" aria-label="Instagram" style={socialStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </span>
              <span role="img" aria-label="Facebook" style={socialStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
