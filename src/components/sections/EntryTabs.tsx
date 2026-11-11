"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { services, industries } from "@/lib/nav";

type Tab = "services" | "industries" | "schedule";

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export function EntryTabs() {
  const [tab, setTab] = useState<Tab>("services");
  const t = useTranslations("home.entry");
  const tn = useTranslations("nav");

  const tabs: { key: Tab; label: string }[] = [
    { key: "services", label: t("services") },
    { key: "industries", label: t("industries") },
    { key: "schedule", label: t("schedule") },
  ];

  return (
    <div
      style={{
        maxWidth: "1320px",
        width: "100%",
        margin: "-96px auto 0",
        padding: "0 clamp(20px, 5vw, 64px)",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--color-accent-200)",
          borderRadius: "12px",
          boxShadow: "0 10px 32px color-mix(in srgb, #003050 14%, transparent)",
        }}
      >
        {/* Tab bar */}
        <div
          role="tablist"
          aria-label={t("services")}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            padding: "0 28px",
            borderBottom: "1px solid var(--color-accent-200)",
          }}
        >
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              style={{
                all: "unset",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: tab === key ? 500 : 400,
                color: tab === key ? "var(--color-text)" : "var(--color-accent-500)",
                borderBottom: `3px solid ${tab === key ? "var(--color-spot)" : "transparent"}`,
                padding: "20px 14px 17px",
                marginBottom: "-1px",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: "32px clamp(20px, 4vw, 44px) 36px" }}>
          {tab === "services" && <ServicesPanel />}
          {tab === "industries" && <IndustriesPanel />}
          {tab === "schedule" && <SchedulePanel />}
        </div>
      </div>
    </div>
  );
}

function NavItem({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
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
  );
}

function ServicesPanel() {
  const t = useTranslations("home.entry");
  const tn = useTranslations("nav");
  return (
    <div>
      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-500)" }}>
        {t("findService")}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "0 40px",
          marginTop: "14px",
        }}
      >
        {services.map((s) => (
          <NavItem
            key={s.href}
            href={s.href}
            title={s.key ? tn(`servicesMenu.${s.key}.title` as any) : s.title}
            description={s.key ? tn(`servicesMenu.${s.key}.description` as any) : (s.description ?? "")}
          />
        ))}
      </div>
    </div>
  );
}

function IndustriesPanel() {
  const t = useTranslations("home.entry");
  const tn = useTranslations("nav");
  return (
    <div>
      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-500)" }}>
        {t("browseIndustry")}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "0 40px",
          marginTop: "14px",
        }}
      >
        {industries.map((i) => (
          <NavItem
            key={i.href}
            href={i.href}
            title={i.key ? tn(`industriesMenu.${i.key}.title` as any) : i.title}
            description={i.key ? tn(`industriesMenu.${i.key}.description` as any) : (i.description ?? "")}
          />
        ))}
      </div>
    </div>
  );
}

function SchedulePanel() {
  const t = useTranslations("home.entry");
  return (
    <div>
      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-500)" }}>
        {t("talkEngineer")}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "0 40px",
          marginTop: "14px",
        }}
      >
        <NavItem
          href="/contact"
          title={t("scheduleTitle")}
          description={t("scheduleBody")}
        />
      </div>
    </div>
  );
}
