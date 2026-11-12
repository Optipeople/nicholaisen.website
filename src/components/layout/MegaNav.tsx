"use client";

import { useRef, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { solutions, companyItems } from "@/lib/nav";

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

export function MegaNav({ transparent = false }: { transparent?: boolean }) {
  const ink = transparent ? "#fff" : "var(--color-text)";
  const [value, setValue] = useState("");
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  // Open each dropdown under its own trigger, 16px to the left (as in the design).
  const menuLeft = (triggers.current[value]?.offsetLeft ?? 0) - 16;

  const triggerStyle = (key: string) => ({
    all: "unset" as const,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: ink,
    fontSize: "16px",
    lineHeight: 1.55,
    padding: "8px 0",
    borderBottom: `2px solid ${value === key ? "var(--color-spot)" : "transparent"}`,
  });

  return (
    <NavigationMenu.Root value={value} onValueChange={setValue} style={{ position: "relative" }}>
      <NavigationMenu.List
        style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 2.6vw, 36px)", flexWrap: "wrap", listStyle: "none", margin: 0, padding: 0 }}
      >
        {/* Solutions */}
        <NavigationMenu.Item value="solutions">
          <NavigationMenu.Trigger
            ref={(el) => {
              triggers.current.solutions = el;
            }}
            style={triggerStyle("solutions")}
          >
            Solutions <ChevronDown />
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
              Find a service
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "0 40px" }}>
              {solutions.map((s) => (
                <NavigationMenu.Link key={s.href} asChild>
                  <Link
                    href={s.href as "/"}
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
                      <strong style={{ fontSize: "18px", fontWeight: 600 }}>{s.title}</strong>
                      <span style={{ fontSize: "15px", color: "var(--color-accent-500)" }}>{s.description}</span>
                    </span>
                    <ArrowRight />
                  </Link>
                </NavigationMenu.Link>
              ))}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Cases */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link href="/cases" style={{ color: ink, fontSize: "16px", lineHeight: 1.55, textDecoration: "none", padding: "8px 0" }}>
              Cases
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* Company */}
        <NavigationMenu.Item value="company">
          <NavigationMenu.Trigger
            ref={(el) => {
              triggers.current.company = el;
            }}
            style={triggerStyle("company")}
          >
            Company <ChevronDown />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "280px",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              boxSizing: "border-box",
            }}
          >
            {companyItems.map((item) => (
              <NavigationMenu.Link key={item.href} asChild>
                <Link
                  href={item.href as "/"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    padding: "14px 16px",
                    borderRadius: "6px",
                    color: "var(--color-text)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: 500 }}>{item.title}</span>
                </Link>
              </NavigationMenu.Link>
            ))}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div style={{ position: "absolute", left: `${menuLeft}px`, top: "100%", zIndex: 20 }}>
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
