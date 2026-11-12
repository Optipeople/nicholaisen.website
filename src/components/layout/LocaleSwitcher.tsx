"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

const localeNames: Record<string, string> = {
  en: "English",
  da: "Dansk",
  sv: "Svenska",
  et: "Eesti",
  lv: "Latviešu",
  lt: "Lietuvių",
};

function getLocaleFromPathname(pathname: string): string {
  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue;
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return routing.defaultLocale;
}

function buildLocalePath(pathname: string, nextLocale: string): string {
  const prefixes = routing.locales.filter((l) => l !== routing.defaultLocale);
  let stripped = pathname;
  for (const p of prefixes) {
    if (pathname === `/${p}` || pathname.startsWith(`/${p}/`)) {
      stripped = pathname.slice(p.length + 1) || "/";
      break;
    }
  }
  if (nextLocale === routing.defaultLocale) return stripped;
  return `/${nextLocale}${stripped === "/" ? "" : stripped}`;
}

export function LocaleSwitcher({
  onSelect,
  transparent,
  dropUp = false,
}: { onSelect?: () => void; transparent?: boolean; /** Open the list above the button (bottom of the mobile menu). */ dropUp?: boolean } = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(next: string) {
    setOpen(false);
    onSelect?.();
    router.push(buildLocalePath(pathname, next));
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: transparent ? "#fff" : "var(--color-text)",
          fontSize: "15px",
        }}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <span style={{ textTransform: "uppercase" as const }}>{locale}</span>
        <ChevronDown style={{ width: "12px", height: "12px", transition: "transform 200ms", transform: open ? "rotate(180deg)" : "none" }} />
      </button>

      {open && (
        <div className={dropUp ? "absolute bottom-full left-[-12px] z-50 pb-3" : "absolute top-full right-[-12px] z-50 pt-3"}>
          <div className="flex min-w-[180px] flex-col gap-0.5 rounded-[8px] border border-[var(--color-divider)] bg-white p-1.5 text-[var(--color-text)] shadow-[0_16px_40px_color-mix(in_srgb,#003050_16%,transparent)]">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => handleSelect(l)}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-[6px] px-3 py-2.5 text-[15px] hover:bg-[var(--color-accent-100)] ${
                  l === locale ? "font-semibold" : "font-normal"
                }`}
              >
                <span>{localeNames[l]}</span>
                <span
                  className="text-[12px] tracking-[0.08em] uppercase"
                  style={{ color: l === locale ? "var(--color-spot)" : "var(--color-accent-400)" }}
                >
                  {l}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
