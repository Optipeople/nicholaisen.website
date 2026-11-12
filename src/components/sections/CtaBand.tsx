import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";

type CtaBandProps = {
  id?: string;
  locale?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "navy" | "beige";
};

export async function CtaBand({
  id,
  locale,
  eyebrow,
  title,
  body,
  primary,
  secondary,
  tone = "navy",
}: CtaBandProps = {}) {
  const t = locale
    ? await getTranslations({ locale, namespace: "home" })
    : null;

  const resolvedEyebrow = eyebrow ?? t?.("cta.eyebrow") ?? "Engineered precision, told quietly.";
  const resolvedTitle = title ?? t?.("cta.title") ?? "Tell us what you're trying to make better.";
  const resolvedBody = body ?? t?.("cta.body") ?? "Bring us the part of the line that frustrates you. We'll come back with what we'd look at first.";
  const resolvedPrimary = primary ?? {
    label: t?.("cta.primary") ?? "Schedule a call",
    href: "/contact",
  };
  const resolvedSecondary = secondary ?? {
    label: t?.("cta.secondary") ?? "Explore solutions",
    href: "/#tracks",
  };

  return (
    <section
      id={id}
      style={{
        background: "linear-gradient(160deg, var(--color-navy-900) 0%, #001e30 100%)",
        color: "#fff",
        padding: "72px clamp(20px, 5vw, 64px) 72px",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          display: "grid",
          gap: "32px",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-navy-300)",
              marginBottom: "16px",
            }}
          >
            {resolvedEyebrow}
          </span>
          <h2
            style={{
              fontWeight: 500,
              fontSize: "clamp(30px, 3.4vw, 46px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              margin: "0 0 16px",
              color: "#fff",
            }}
          >
            {resolvedTitle}
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              margin: 0,
              color: "var(--color-navy-300)",
              maxWidth: "56ch",
            }}
          >
            {resolvedBody}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
          }}
        >
          <Link
            href={resolvedPrimary.href as "/"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 26px",
              background: "#fff",
              color: "var(--color-navy-900)",
              borderRadius: "4px",
              fontSize: "17px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {resolvedPrimary.label}
          </Link>
          {resolvedSecondary && (
            <Link
              href={resolvedSecondary.href as "/"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 26px",
                border: "1px solid rgba(255,255,255,0.5)",
                color: "#fff",
                borderRadius: "4px",
                fontSize: "17px",
                textDecoration: "none",
              }}
            >
              {resolvedSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
