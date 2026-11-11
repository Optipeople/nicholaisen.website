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
        background: "var(--color-offwhite)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <div className="site-header-inner">
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
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
              fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "var(--color-text)",
              letterSpacing: "-0.015em",
            }}
          >
            Nicholaisen
          </span>
        </Link>

        <div className="site-header-nav">
          <MegaNav />
        </div>

        <div className="site-header-desktop">
          <LocaleSwitcher />
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 22px",
              background: "var(--color-spot)",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {t("cta")}
          </Link>
        </div>

        <div className="site-header-mobile">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
