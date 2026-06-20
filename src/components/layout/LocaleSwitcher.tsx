"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
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

export function LocaleSwitcher({ onSelect }: { onSelect?: () => void } = {}) {
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
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-[var(--color-ink-700)] hover:bg-[var(--color-paper-dark)] transition-colors"
        aria-label="Switch language"
        aria-expanded={open}
      >
        <Globe className="size-4" />
        <span className="uppercase">{locale}</span>
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[148px] rounded-lg border border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)] shadow-lg py-1">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => handleSelect(l)}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-[var(--color-paper-dark)] ${
                l === locale
                  ? "font-semibold text-[var(--color-navy-900)]"
                  : "text-[var(--color-ink-700)]"
              }`}
            >
              <span className="w-6 text-xs uppercase font-mono text-[var(--color-ink-400)]">
                {l}
              </span>
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
