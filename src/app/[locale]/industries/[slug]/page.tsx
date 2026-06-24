import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { CaseList } from "@/components/sections/CaseList";
import { Mdx } from "@/components/mdx/Mdx";
import { getIndustry, listIndustries, listServices } from "@/content/loader";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string; locale: string };

export async function generateStaticParams() {
  const industries = await listIndustries();
  return industries.map((i) => ({ slug: i.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getIndustry(slug);
  if (!doc) return {};
  const fm = doc.frontmatter;
  return buildMetadata({
    title: fm.seo?.title ?? fm.title,
    description: fm.seo?.description ?? fm.lede,
    path: `/industries/${fm.slug}`,
    ogImage: fm.heroImage,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, locale } = await params;
  const lp = (path: string) => locale === routing.defaultLocale ? path : `/${locale}${path}`;
  const [t, ts] = await Promise.all([
    getTranslations({ locale, namespace: "industries" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const doc = await getIndustry(slug, locale);
  if (!doc) notFound();
  const fm = doc.frontmatter;

  const services = await listServices(locale);
  const relevant = (fm.relevantServices ?? [])
    .map((s) => services.find((x) => x.frontmatter.slug === s))
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={fm.eyebrow}
        title={fm.title}
        lede={fm.lede}
        image={fm.heroImage}
      />

      <Section tone="cream" size="md">
        <Container size="narrow">
          <div className="mx-auto max-w-3xl">
            <Mdx source={doc.body} />
          </div>
        </Container>
      </Section>

      {fm.challenges && fm.challenges.length > 0 ? (
        <Section tone="paper" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>{t("whatWeHear")}</Eyebrow>
              <h2 className="mt-4 text-display-3 text-balance">
                {t("recurringProblems", { title: fm.title.toLowerCase() })}
              </h2>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {fm.challenges.map((c) => (
                <li
                  key={c}
                  className="rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)] p-6 text-[0.95rem] leading-relaxed text-[var(--color-ink-700)]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {relevant.length > 0 ? (
        <Section tone="cream" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>{t("mostRelevantServices")}</Eyebrow>
              <h2 className="mt-4 text-display-3 text-balance">
                {t("whereToStart", { title: fm.title.toLowerCase() })}
              </h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {relevant.map((d) => (
                <Link
                  key={d!.frontmatter.slug}
                  href={lp(`/services/${d!.frontmatter.slug}`)}
                  className="group flex flex-col rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                >
                  <Eyebrow>{d!.frontmatter.eyebrow}</Eyebrow>
                  <h3 className="mt-3 text-base font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                    {d!.frontmatter.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--color-ink-500)]">
                    {d!.frontmatter.lede}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                    {ts("learnMore")} <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CaseList
        filterByIndustry={fm.slug}
        title={t("ourWork", { title: fm.title.toLowerCase() })}
        eyebrow={t("casesEyebrow")}
        emptyMessage={t("casesComing")}
        locale={locale}
      />

      <CtaBand locale={locale} />
    </>
  );
}
