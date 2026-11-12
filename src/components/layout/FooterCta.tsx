"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LinkButton } from "@/components/ui/Button";

/**
 * Pages that already end with their own call to action, so the shared one
 * would repeat it: contact, industries, insights, the services overview,
 * every service sub-page (/services/<track>/<service>) and the LIGNA page.
 */
const OWN_CTA = [
  /^\/contact\/?$/,
  /^\/industries(\/|$)/,
  /^\/insights(\/|$)/,
  /^\/services\/?$/,
  /^\/services\/[^/]+\/[^/]+\/?$/,
  /^\/ligna-2026\/?$/,
];

/** Closing call-to-action above the footer, unless the page ends with its own. */
export function FooterCta() {
  const t = useTranslations("footerCta");
  const pathname = usePathname();
  const path = pathname.replace(/^\/(da|sv|et|lt|lv|en)(?=\/|$)/, "") || "/";
  if (OWN_CTA.some((re) => re.test(path))) return null;

  return (
    <section className="bg-white">
      <div className="site-container py-28 text-center">
        <h2 className="mx-auto my-0 max-w-[22ch] text-[clamp(32px,4vw,56px)] leading-[1.1] font-medium tracking-[-0.02em]">
          {t("title")}
        </h2>
        <p className="text-intro mx-auto mt-5 mb-9 max-w-[52ch]">{t("body")}</p>
        <LinkButton href="/contact" variant="solid" size="hero" className="px-7">
          {t("button")}
        </LinkButton>
      </div>
    </section>
  );
}
