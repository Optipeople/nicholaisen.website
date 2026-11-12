"use client";

import Image from "next/image";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { LinkRow } from "@/components/ui/LinkRow";
import { LinkButton } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/icons";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { companyItems } from "@/lib/nav";
import { tracks } from "@/lib/tracks";
import { cn } from "@/lib/cn";

const rowClass =
  "flex w-full cursor-pointer items-center justify-between border-b border-[var(--color-divider)] py-4 text-left text-[18px] leading-[1.55] font-medium text-[var(--color-text)]";

/**
 * Menu for narrow screens (below 900px): a white panel with the same items,
 * rows and button as the desktop header and its dropdowns.
 */
export function MobileNav({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<"solutions" | "company" | null>("solutions");
  const t = useTranslations("nav.menu");
  const tc = useTranslations("nav.companyMenu");
  const tt = useTranslations("home.tracks.items");
  const te = useTranslations("home.entry");
  const pathname = usePathname();
  const onCases = /^(\/[a-z]{2})?\/cases(\/|$)/.test(pathname);
  const onIndustries = /^(\/[a-z]{2})?\/industries(\/|$)/.test(pathname);
  const close = () => setOpen(false);
  const toggle = (s: "solutions" | "company") => setSection((cur) => (cur === s ? null : s));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={t("open")}
        className="inline-flex size-11 cursor-pointer items-center justify-center"
        style={{ color: transparent ? "#fff" : "var(--color-text)" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50" style={{ background: "color-mix(in srgb, #003050 40%, transparent)" }} />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col overflow-y-auto bg-white text-[var(--color-text)] shadow-[0_16px_40px_color-mix(in_srgb,#003050_16%,transparent)]"
        >
          <Dialog.Title className="sr-only">{t("title")}</Dialog.Title>

          {/* Same top row as the header */}
          <div className="flex items-center justify-between border-b border-[var(--color-divider)] px-[clamp(20px,5vw,32px)] py-[22px]">
            <Link href="/" onClick={close} aria-label="Nicholaisen" className="block">
              <Image src="/brand/logo-navy.png" alt="Nicholaisen" width={472} height={190} style={{ height: "48px", width: "auto" }} />
            </Link>
            <Dialog.Close aria-label={t("close")} className="inline-flex size-11 cursor-pointer items-center justify-center text-[var(--color-text)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </Dialog.Close>
          </div>

          <nav className="flex flex-col px-[clamp(20px,5vw,32px)] pt-2">
            {/* Solutions — same rows as the desktop "Find a service" dropdown */}
            <button type="button" aria-expanded={section === "solutions"} onClick={() => toggle("solutions")} className={rowClass}>
              {t("solutions")}
              <Chevron open={section === "solutions"} />
            </button>
            {section === "solutions" ? (
              <div onClick={close} className="flex flex-col gap-1 pt-5 pb-3">
                <p className="text-eyebrow m-0">{te("findService")}</p>
                <div className="flex flex-col">
                  {tracks.map((track) => (
                    <LinkRow key={track.key} href={track.href} title={tt(`${track.key}.title`)} description={tt(`${track.key}.subtitle`)} />
                  ))}
                </div>
              </div>
            ) : null}

            {[
              { href: "/industries", label: te("industries"), active: onIndustries },
              { href: "/cases", label: t("cases"), active: onCases },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className={rowClass}>
                <span className="border-b-2 pb-0.5" style={{ borderColor: item.active ? "var(--color-spot)" : "transparent" }}>
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Company — same items as the desktop dropdown */}
            <button type="button" aria-expanded={section === "company"} onClick={() => toggle("company")} className={rowClass}>
              {t("company")}
              <Chevron open={section === "company"} />
            </button>
            {section === "company" ? (
              <div className="flex flex-col gap-0.5 py-2">
                {companyItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="rounded-[6px] px-4 py-3.5 text-[16px] font-medium text-[var(--color-text)] hover:bg-[var(--color-accent-100)] hover:text-[var(--color-text)]"
                  >
                    {item.key ? tc(item.key) : item.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </nav>

          <div className="mt-auto flex items-center justify-between gap-5 border-t border-[var(--color-divider)] px-[clamp(20px,5vw,32px)] py-6">
            <LocaleSwitcher onSelect={close} dropUp />
            <LinkButton href="/contact" variant="solid" size="panel" className="px-5 text-[15px] font-medium">
              {t("contact")}
            </LinkButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span aria-hidden className={cn("flex text-[var(--color-accent)] transition-transform duration-200", open && "rotate-180")}>
      <ChevronDownIcon size={18} strokeWidth={1.75} />
    </span>
  );
}
