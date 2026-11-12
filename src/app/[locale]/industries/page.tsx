import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { TileGrid } from "@/components/ui/TileGrid";
import { RelatedCases } from "@/components/solutions/RelatedCases";
import { IndustryCta } from "@/components/solutions/IndustryCta";
import { industryHref, industryTiles } from "@/lib/industries";
import { buildMetadata } from "@/lib/seo";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  return buildMetadata({ title: t("heroEyebrow"), description: t("heroLede"), path: "/industries" });
}

/**
 * Industries overview, laid out like the Machines landing page: photo hero
 * with an icon row, a tile grid and related cases (no finder card).
 */
export default async function IndustriesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, th] = await Promise.all([getTranslations("industries"), getTranslations("home.industries")]);

  const items = industryTiles.map((ind) => {
    const title = th(`items.${ind.key}.title`);
    return {
      ...ind,
      title,
      description: th(`items.${ind.key}.description`),
      href: industryHref(ind.href, title),
    };
  });

  return (
    <main>
      <PhotoHero image="/images/v3/hero-production.png" alt={t("heroTitle")} kicker={t("heroEyebrow")} title={t("heroTitle")} lede={t("heroLede")}>
        <HeroIconLinks
          label={t("heroEyebrow")}
          maxWidth="960px"
          minWidth="480px"
          gapClass="gap-x-6 gap-y-8"
          dim={0.72}
          tall
          items={items.map((i) => ({ href: i.href, label: i.title, Icon: i.Icon }))}
        />
      </PhotoHero>

      <TileGrid
        title={th("title")}
        intro={t("gridIntro")}
        tiles={items.map((i) => ({ key: i.key, href: i.href, image: i.image, title: i.title, description: i.description, objectPosition: i.position }))}
      />

      <RelatedCases
        locale={locale}
        slugs={["hardwood-drying-technology", "kitchen-producer-investment-decision", "million-unit-production-facility"]}
      />

      <IndustryCta image="/images/v3/complete-factory.png" title={t("ctaTitle")} />
    </main>
  );
}
