import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { OverlapCard } from "@/components/ui/OverlapCard";
import { TextSection } from "@/components/ui/TextSection";
import { ServiceCarousel } from "@/components/solutions/ServiceCarousel";
import { RelatedCases } from "@/components/solutions/RelatedCases";
import { IndustryCta } from "@/components/solutions/IndustryCta";
import { getIndustry, getService, listCases, listIndustries } from "@/content/loader";
import { industryCtaImages, industryHref, industryTiles, splitSections } from "@/lib/industries";
import { mdxServicePages, serviceHref, servicePageBySlugs } from "@/lib/services";
import { sortCases } from "@/lib/cases";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string; locale: string };

export async function generateStaticParams() {
  const industries = await listIndustries();
  return industries.map((i) => ({ slug: i.frontmatter.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const doc = await getIndustry(slug, locale);
  if (!doc) return {};
  const fm = doc.frontmatter;
  return buildMetadata({
    title: fm.seo?.title ?? fm.title,
    description: fm.seo?.description ?? fm.lede,
    path: `/industries/${fm.slug}`,
    ogImage: fm.heroImage,
  });
}

/** Industry page in the solution-page design; all content comes from content/industries. */
export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const doc = await getIndustry(slug, locale);
  if (!doc) notFound();
  const fm = doc.frontmatter;
  const [t, ts, th] = await Promise.all([
    getTranslations("industries"),
    getTranslations("solutions"),
    getTranslations("home.industries"),
  ]);

  const [tsd, tst] = await Promise.all([getTranslations("serviceDetail"), getTranslations("solutions.tracks")]);
  const services = (
    await Promise.all(
      (fm.relevantServices ?? []).map(async (s) => {
        // Business Development design pages (text in messages).
        const [trackSlug, pageSlug] = s.split("/");
        const design = trackSlug && pageSlug ? servicePageBySlugs(trackSlug, pageSlug) : undefined;
        if (design) {
          const card = (tst.raw(`${design.track}.services`) as { title: string }[])[design.index];
          return {
            title: card?.title ?? "",
            copy: tsd(`pages.${design.key}.teaser`),
            image: design.image,
            href: serviceHref(design),
          };
        }
        // Service pages with MDX content.
        const svc = await getService(s, locale);
        return svc
          ? {
              title: svc.frontmatter.title,
              copy: svc.frontmatter.lede,
              // The service page's own hero, so card and page match.
              image: mdxServicePages.find((p) => p.mdxSlug === s)?.image ?? svc.frontmatter.heroImage,
              href: `/services/${s}`,
            }
          : null;
      }),
    )
  ).filter((s): s is NonNullable<typeof s> => !!s);
  const cases = sortCases(await listCases(locale)).filter((c) => c.frontmatter.industry === fm.slug);
  const sections = splitSections(doc.body);
  const tile = industryTiles.find((i) => i.href === `/industries/${fm.slug}`);
  const industryName = tile ? th(`items.${tile.key}.title`) : fm.title;

  return (
    <main>
      <PhotoHero
        image={fm.heroImage}
        alt={fm.title}
        kicker={fm.eyebrow}
        title={fm.title}
        lede={fm.lede}
        // Room for the "What we hear" card, when the page has one.
        bottom={fm.challenges?.length ? "overlap" : "default"}
      >
        <HeroIconLinks
          label={t("heroEyebrow")}
          maxWidth="960px"
          dim={0.72}
          underline
          items={industryTiles.map((i) => {
            const label = th(`items.${i.key}.title`);
            return {
              href: industryHref(i.href, label),
              label,
              Icon: i.Icon,
              current: i.href === `/industries/${fm.slug}`,
            };
          })}
        />
      </PhotoHero>

      {fm.challenges?.length ? (
        <OverlapCard tab={t("whatWeHear")}>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10 px-[clamp(20px,4vw,48px)] pt-5 pb-8">
            {fm.challenges.map((c, i) => (
              <li key={c} className="flex gap-4 border-b border-[var(--color-accent-200)] py-[14px] text-[16px] leading-[1.55]">
                <span className="text-[13px] leading-[1.9] font-semibold text-[var(--color-spot)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c}
              </li>
            ))}
          </ol>
        </OverlapCard>
      ) : null}

      {services.length ? (
        <section className="site-container section-top">
          <div className="mx-auto mb-14 max-w-[820px] text-center">
            <h2 className="text-display-2 m-0">{t("mostRelevantServices")}</h2>
            <p className="text-intro mt-5 mb-0">{t("whereToStart", { title: fm.title })}</p>
          </div>
          <ServiceCarousel
            cards={services}
            labels={{
              contact: ts("contactUs"),
              learnMore: ts("learnMore"),
              digitalized: ts("digitalizedBadge"),
              prev: ts("previous"),
              next: ts("next"),
              page: ts("page"),
            }}
          />
        </section>
      ) : null}

      {sections.map((s, i) => (
        <TextSection key={s.heading} kicker={String(i + 1).padStart(2, "0")} title={s.heading} paragraphs={s.paragraphs} />
      ))}

      {cases.length ? (
        <RelatedCases locale={locale} slugs={cases.map((c) => c.frontmatter.slug)} title={t("ourWork", { title: fm.title })} />
      ) : null}

      <IndustryCta
        image={industryCtaImages[fm.slug] ?? tile?.image ?? fm.heroImage}
        title={t("talkAboutLine", { title: industryName.toLowerCase() })}
        industry={industryName}
      />
    </main>
  );
}
