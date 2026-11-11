"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslations } from "next-intl";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { services, industries, primaryNav, type NavSection } from "@/lib/nav";

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export function MegaNav() {
  const t = useTranslations("nav");
  return (
    <NavigationMenu.Root style={{ position: "relative" }}>
      <NavigationMenu.List
        style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 2.6vw, 36px)", flexWrap: "wrap", listStyle: "none", margin: 0, padding: 0 }}
      >
        {primaryNav.map((section) => (
          <NavigationMenu.Item key={section.href}>
            {section.categories ? (
              <ServicesTrigger section={section} />
            ) : section.items ? (
              <FlatTrigger section={section} />
            ) : (
              <NavigationMenu.Link asChild>
                <Link
                  href={section.href as "/"}
                  style={{ color: "var(--color-text)", fontSize: "16px", textDecoration: "none", padding: "8px 0", borderBottom: "2px solid transparent" }}
                >
                  {section.href === "/cases"
                    ? t("cases")
                    : section.href === "/insights"
                      ? t("insights")
                      : section.href === "/about"
                        ? t("about")
                        : section.title}
                </Link>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <div style={{ position: "absolute", left: "50%", top: "100%", transform: "translateX(-50%)", display: "flex", justifyContent: "center" }}>
        <NavigationMenu.Viewport
          style={{
            position: "relative",
            marginTop: "14px",
            overflow: "hidden",
            borderRadius: "10px",
            border: "1px solid var(--color-divider)",
            background: "#fff",
            color: "var(--color-text)",
            boxShadow: "0 16px 40px color-mix(in srgb, #003050 16%, transparent)",
            height: "var(--radix-navigation-menu-viewport-height)",
            width: "var(--radix-navigation-menu-viewport-width)",
            transition: "width 200ms, height 200ms",
          }}
        />
      </div>
    </NavigationMenu.Root>
  );
}

function NavMenuLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={href as "/"}
        style={{
          color: "var(--color-text)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          padding: "14px 0",
          borderBottom: "1px solid var(--color-accent-200)",
          textDecoration: "none",
        }}
      >
        <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <strong style={{ fontSize: "18px", fontWeight: 600 }}>{title}</strong>
          <span style={{ fontSize: "15px", color: "var(--color-accent-500)" }}>{description}</span>
        </span>
        <ArrowRight />
      </Link>
    </NavigationMenu.Link>
  );
}

function ServicesTrigger({ section }: { section: NavSection }) {
  const t = useTranslations("nav");
  return (
    <>
      <NavigationMenu.Trigger
        style={{
          all: "unset",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--color-text)",
          fontSize: "16px",
          padding: "8px 0",
          borderBottom: "2px solid transparent",
        }}
      >
        {t("services")}
        <ChevronDown />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "720px",
          maxWidth: "calc(100vw - 40px)",
          padding: "28px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          boxSizing: "border-box",
        }}
      >
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-500)" }}>
          {t("services")}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "0 40px",
          }}
        >
          {services.map((s) => (
            <NavMenuLink
              key={s.href}
              href={s.href}
              title={s.key ? t(`servicesMenu.${s.key}.title` as any) : s.title}
              description={s.key ? t(`servicesMenu.${s.key}.description` as any) : (s.description ?? "")}
            />
          ))}
        </div>
      </NavigationMenu.Content>
    </>
  );
}

function FlatTrigger({ section }: { section: NavSection }) {
  const t = useTranslations("nav");
  return (
    <>
      <NavigationMenu.Trigger
        style={{
          all: "unset",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--color-text)",
          fontSize: "16px",
          padding: "8px 0",
          borderBottom: "2px solid transparent",
        }}
      >
        {t("industries")}
        <ChevronDown />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "480px",
          maxWidth: "calc(100vw - 40px)",
          padding: "28px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          boxSizing: "border-box",
        }}
      >
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-500)" }}>
          {t("industries")}
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {section.items?.map((item) => (
            <NavMenuLink
              key={item.href}
              href={item.href}
              title={item.key ? t(`industriesMenu.${item.key}.title` as any) : item.title}
              description={item.key ? t(`industriesMenu.${item.key}.description` as any) : (item.description ?? "")}
            />
          ))}
        </div>
      </NavigationMenu.Content>
    </>
  );
}
