"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services, industries, primaryNav, type NavSection } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function MegaNav() {
  const t = useTranslations("nav");
  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="flex items-center gap-1">
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
                  className="px-3 py-2 text-sm font-medium text-[var(--color-ink-700)] hover:text-[var(--color-navy-900)] transition-colors"
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

      <div className="absolute left-1/2 top-full -translate-x-1/2 flex justify-center">
        <NavigationMenu.Viewport
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "relative mt-3 origin-top overflow-hidden rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] shadow-[var(--shadow-lift)]",
            "h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] transition-[width,height] duration-200",
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}

function ServicesTrigger({ section }: { section: NavSection }) {
  const t = useTranslations("nav");
  return (
    <>
      <NavigationMenu.Trigger className="group inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-ink-700)] hover:text-[var(--color-navy-900)] transition-colors">
        {t("services")}
        <ChevronDown
          className="size-3.5 transition-transform group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="absolute left-0 top-0 w-[860px] p-8">
        <div className="grid grid-cols-[2fr_1fr] gap-10">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {section.categories?.map((cat) => (
              <div key={cat.href}>
                <Link
                  href={cat.href as "/"}
                  className="text-sm font-semibold text-[var(--color-navy-900)] hover:underline"
                >
                  {cat.key
                    ? t(`servicesMenu.${cat.key}.title` as any)
                    : cat.title}
                </Link>
                <p className="mt-1 text-xs text-[var(--color-ink-500)]">
                  {cat.key
                    ? t(`servicesMenu.${cat.key}.description` as any)
                    : cat.description}
                </p>
                <ul className="mt-3 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href as "/"}
                        className="group block rounded-md px-2 py-1.5 -mx-2 hover:bg-[var(--color-paper-dark)] transition-colors"
                      >
                        <span className="block text-sm text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                          {item.key
                            ? t(`servicesMenu.${item.key}.title` as any)
                            : item.title}
                        </span>
                        <span className="block text-xs text-[var(--color-ink-500)]">
                          {item.key
                            ? t(`servicesMenu.${item.key}.description` as any)
                            : item.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <aside className="rounded-lg bg-[var(--color-navy-900)] p-6 text-[var(--color-cream-50)]">
            <p className="text-eyebrow text-[var(--color-tan-300)]">{t("featured.label")}</p>
            <h4 className="mt-2 text-lg font-semibold leading-tight text-[var(--color-cream-50)]">
              {t("featured.title")}
            </h4>
            <p className="mt-2 text-sm text-[var(--color-cream-50)]/80">
              {t("featured.description")}
            </p>
            <Link
              href="/services/digital-performance"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2 transition-all"
            >
              {t("featured.link")} <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </aside>
        </div>
      </NavigationMenu.Content>
    </>
  );
}

function FlatTrigger({ section }: { section: NavSection }) {
  const t = useTranslations("nav");
  return (
    <>
      <NavigationMenu.Trigger className="group inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-ink-700)] hover:text-[var(--color-navy-900)] transition-colors">
        {t("industries")}
        <ChevronDown
          className="size-3.5 transition-transform group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="absolute left-0 top-0 w-[420px] p-6">
        <ul className="space-y-1">
          {section.items?.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href as "/"}
                className="group block rounded-md p-3 hover:bg-[var(--color-paper-dark)] transition-colors"
              >
                <span className="block text-sm font-medium text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                  {item.key
                    ? t(`industriesMenu.${item.key}.title` as any)
                    : item.title}
                </span>
                <span className="block text-xs text-[var(--color-ink-500)] mt-0.5">
                  {item.key
                    ? t(`industriesMenu.${item.key}.description` as any)
                    : item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenu.Content>
    </>
  );
}
