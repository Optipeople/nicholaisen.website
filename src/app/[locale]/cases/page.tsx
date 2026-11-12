import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { CardLink, CardMetrics } from "@/components/ui/CardLink";
import { GridIcon, LayersIcon, LogIcon } from "@/components/ui/icons";
import { listCases } from "@/content/loader";
import { sortCases } from "@/lib/cases";
import { buildMetadata } from "@/lib/seo";

type Params = { locale: string };

/** Hero filters (design v3): all cases, or one industry via ?industry=. */
const filters = [
  { key: "all", href: "/cases", Icon: GridIcon },
  { key: "solid-wood", href: "/cases?industry=solid-wood", Icon: LogIcon },
  { key: "panel-furniture", href: "/cases?industry=panel-furniture", Icon: LayersIcon },
] as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casesPage" });
  return buildMetadata({ title: t("kicker"), description: t("lede"), path: "/cases" });
}

/** Cases (design v3 "CASES"). */
export default async function CasesPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ industry?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { industry } = await searchParams;
  const [t, th] = await Promise.all([getTranslations("casesPage"), getTranslations("home.cases")]);
  const active = filters.find((f) => f.key === industry)?.key ?? "all";
  const cases = sortCases(await listCases(locale)).filter(
    (c) => active === "all" || c.frontmatter.industry === active,
  );

  return (
    <main>
      <PhotoHero
        image="/images/v3/cnc-technician.jpg"
        alt={t("imageAlt")}
        kicker={t("kicker")}
        title={t("title")}
        lede={t("lede")}
        titleMaxWidth="16ch"
      >
        <HeroIconLinks
          label={t("filterLabel")}
          maxWidth="640px"
          gapClass="gap-4"
          underline
          items={filters.map((f) => ({ href: f.href, label: t(`filters.${f.key}`), Icon: f.Icon, current: f.key === active }))}
        />
      </PhotoHero>

      <section className="site-container pt-24 pb-28">
        <div className="mx-auto mb-14 max-w-[820px] text-center">
          <h2 className="text-display-2 m-0">{t("listTitle")}</h2>
          <p className="text-intro mt-5 mb-0">{t("listIntro")}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,460px),1fr))] gap-8">
          {cases.map(({ frontmatter: c }) => (
            <CardLink
              key={c.slug}
              href={`/cases/${c.slug}`}
              image={c.heroImage}
              alt={c.title}
              label={th(`industries.${c.industry}`)}
              title={c.title}
              text={c.excerpt}
              cta={th("read")}
              large
            >
              <CardMetrics metrics={c.metrics.slice(0, 3)} />
            </CardLink>
          ))}
        </div>
      </section>
    </main>
  );
}
