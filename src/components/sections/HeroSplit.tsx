import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";

export async function HeroSplit() {
  const t = await getTranslations("home.hero");
  return (
    <section
      style={{
        position: "relative",
        minHeight: "clamp(660px, 90vh, 880px)",
        display: "flex",
        alignItems: "flex-end",
        color: "#fff",
      }}
    >
      <Image
        src="/images/hero-workshop.jpg"
        alt="Wood, furniture, windows and aluminium profiles in production"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, color-mix(in srgb, #003050 80%, transparent) 0%, color-mix(in srgb, #003050 40%, transparent) 60%, color-mix(in srgb, #003050 10%, transparent) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1320px",
          width: "100%",
          margin: "0 auto",
          padding: "clamp(180px, 20vw, 220px) clamp(20px, 5vw, 64px) 170px",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          <span
            style={{ width: "28px", height: "2px", background: "var(--color-accent)", display: "block" }}
          />
          {t("eyebrow")}
        </span>

        <h1
          style={{
            fontWeight: 500,
            fontSize: "clamp(40px, 5.4vw, 76px)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          {t("title")}
        </h1>

        <p
          style={{
            fontSize: "clamp(17px, 1.5vw, 21px)",
            lineHeight: 1.55,
            maxWidth: "46ch",
            margin: "24px 0 0",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {t("lede")}
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "36px" }}>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 26px",
              background: "#fff",
              color: "var(--color-accent)",
              borderRadius: "4px",
              fontSize: "17px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {t("primary")}
          </Link>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 26px",
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "17px",
              textDecoration: "none",
            }}
          >
            {t("secondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
