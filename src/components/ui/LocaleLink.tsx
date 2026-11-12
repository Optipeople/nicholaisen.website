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
      : href === "/" || href.startsWith("/#")
        ? `/${locale}${href.slice(1)}`
        : `/${locale}${href}`;
  // Section links (e.g. /about#team): next/link appends the new hash to an
  // existing one on same-page clicks (/about#team#group), so let the browser
  // handle anchors natively.
  if (localizedHref.includes("#")) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { prefetch, replace, scroll, shallow, locale: _l, legacyBehavior, passHref, onNavigate, ...anchorProps } = props;
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    return <a href={localizedHref} {...anchorProps} />;
  }
  return <NextLink href={localizedHref} {...props} />;
}
