import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { MegaNav } from "@/components/layout/MegaNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "#fff",
        borderBottom: "2px solid var(--color-divider)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 64px)",
          display: "flex",
          height: "64px",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          aria-label="Nicholaisen — Home"
        >
          <Image
            src="/brand/nicholaisen-logo.png"
            alt=""
            width={32}
            height={32}
            priority
            style={{ width: "32px", height: "32px" }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "18px",
              color: "var(--color-text)",
              letterSpacing: "-0.015em",
            }}
          >
            Nicholaisen
          </span>
        </Link>

        <div className="hidden lg:flex" style={{ flex: 1, justifyContent: "center" }}>
          <MegaNav />
        </div>

        <div className="hidden lg:flex" style={{ alignItems: "center", gap: "16px" }}>
          <LocaleSwitcher />
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 22px",
              background: "var(--color-accent)",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {t("cta")}
          </Link>
        </div>

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
