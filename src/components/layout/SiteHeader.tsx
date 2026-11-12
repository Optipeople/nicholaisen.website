"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { MegaNav } from "@/components/layout/MegaNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export function SiteHeader({ locale }: { locale: string }) {
  const pathname = usePathname();
  // Home page: /<locale> or / (default locale)
  const isHome = pathname === `/${locale}` || pathname === "/";
  const transparent = isHome;

  return (
    <header
      style={{
        position: transparent ? "absolute" : "sticky",
        top: 0,
        left: transparent ? 0 : undefined,
        right: transparent ? 0 : undefined,
        zIndex: 40,
        background: transparent ? "transparent" : "var(--color-offwhite)",
        borderBottom: transparent ? "none" : "1px solid var(--color-divider)",
        color: transparent ? "#fff" : "var(--color-text)",
      }}
    >
      <div className="site-header-inner">
        <Link
          href="/"
          className="site-header-logo"
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          aria-label="Nicholaisen — Home"
        >
          <Image
            src={transparent ? "/brand/logo-white.png" : "/brand/logo-navy.png"}
            alt="Nicholaisen"
            width={472}
            height={190}
            priority
            style={{ height: transparent ? "48px" : "32px", width: "auto", display: "block" }}
          />
        </Link>

        <div className="site-header-nav">
          <MegaNav transparent={transparent} />
        </div>

        <div className="site-header-desktop">
          <LocaleSwitcher transparent={transparent} />
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "11px 20px",
              background: transparent ? "#fff" : "var(--color-spot)",
              color: transparent ? "var(--color-accent)" : "#fff",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Contact us
          </Link>
        </div>

        <div className="site-header-mobile">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
