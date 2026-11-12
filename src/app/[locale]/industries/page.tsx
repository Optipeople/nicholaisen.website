import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { CardLink } from "@/components/ui/CardLink";
import { listIndustries } from "@/content/loader";
import { industryPages, sortIndustries } from "@/lib/industries";
import { buildMetadata } from "@/lib/seo";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  return buildMetadata({ title: t("heroEyebrow"), description: t("heroLede"), path: "/industries" });
}

/** Industries overview in the solution-page design. */
export default async function IndustriesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("industries");
  const industries = sortIndustries(await listIndustries(locale));

  return (
    <main>
      <PhotoHero
        image="/images/v3/hero-production.png"
        alt={t("heroTitle")}
        kicker={t("heroEyebrow")}
        title={t("heroTitle")}
        lede={t("heroLede")}
        titleMaxWidth="18ch"
      >
        <HeroIconLinks
          label={t("heroEyebrow")}
          maxWidth="720px"
          items={industries.map(({ frontmatter: i }) => ({
            href: `/industries/${i.slug}`,
            label: i.title,
            Icon: industryPages.find((p) => p.slug === i.slug)!.Icon,
          }))}
        />
      </PhotoHero>

      <section className="site-container pt-24 pb-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-7">
          {industries.map(({ frontmatter: i }) => (
            <CardLink
              key={i.slug}
              href={`/industries/${i.slug}`}
              image={i.heroImage}
              alt={i.title}
              label={i.eyebrow}
              title={i.title}
              text={i.lede}
              cta={t("exploreIndustry")}
              large
            />
          ))}
        </div>
      </section>
    </main>
  );
}
