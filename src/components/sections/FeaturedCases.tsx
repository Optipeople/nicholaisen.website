import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { listCases } from "@/content/loader";
import { LinkButton } from "@/components/ui/Button";
import { FeaturedCasesPanels, type FeaturedCase } from "@/components/sections/FeaturedCasesPanels";

/** Homepage order, with the message key for each case's short (collapsed) title. */
const featured = [
  { slug: "hardwood-drying-technology", key: "hardwood" },
  { slug: "kitchen-producer-investment-decision", key: "kitchen" },
  { slug: "million-unit-production-facility", key: "million" },
  { slug: "turnkey-factory-establishment", key: "greenfield" },
] as const;

function formatCaseDate(iso: string, locale: string) {
  // Guard: unknown segments (e.g. /favicon.ico) can reach the page as a "locale".
  const tag = locale !== "en" && hasLocale(routing.locales, locale) ? locale : "en-GB";
  return new Date(iso).toLocaleDateString(tag, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Case studies" — expanding photo panels fed by the localized case content. */
export async function FeaturedCases({ locale }: { locale: string }) {
  const t = await getTranslations("home.cases");
  const all = await listCases(locale);

  const cases: FeaturedCase[] = featured.flatMap(({ slug, key }) => {
    const doc = all.find((c) => c.frontmatter.slug === slug);
    if (!doc) return [];
    const fm = doc.frontmatter;
    return [
      {
        slug,
        title: fm.title,
        shortTitle: t(`short.${key}`),
        summary: fm.excerpt,
        image: fm.heroImage ?? "/images/v3/wood-frames.jpg",
        meta: `${t(`industries.${fm.industry}`)} · ${formatCaseDate(fm.publishedAt, locale)}`,
        metrics: (fm.metrics ?? []).slice(0, 3),
      },
    ];
  });

  return (
    <section className="py-28">
      <div className="site-container mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-display-2 m-0 min-w-[min(100%,480px)] flex-[1_1_0]">{t("title")}</h2>
        <LinkButton href="/cases" variant="pill-outline" size="pill">
          {t("all")}
        </LinkButton>
      </div>
      <div className="px-[clamp(20px,5vw,64px)]">
        <FeaturedCasesPanels cases={cases} readLabel={t("read")} />
      </div>
    </section>
  );
}
