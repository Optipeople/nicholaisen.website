"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
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

export function LocaleLink({ href, ...props }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const localizedHref =
    locale === routing.defaultLocale
      ? href
      : `/${locale}${href === "/" ? "" : href}`;
  return <NextLink href={localizedHref} {...props} />;
}
