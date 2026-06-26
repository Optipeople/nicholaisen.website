import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { AnchorSubNav } from "@/components/sections/AnchorSubNav";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CaseList } from "@/components/sections/CaseList";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CtaBand } from "@/components/sections/CtaBand";
import { Mdx } from "@/components/mdx/Mdx";
import {
  getService,
  getServicesByCategory,
  listServices,
} from "@/content/loader";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string[]; locale: string };

export async function generateStaticParams() {
  const services = await listServices();
  return services.map((s) => ({
    slug: s.frontmatter.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getService(slug.join("/"));
  if (!doc) return {};
  const fm = doc.frontmatter;
  return buildMetadata({
    title: fm.seo?.title ?? fm.title,
    description: fm.seo?.description ?? fm.lede,
    path: `/services/${fm.slug}`,
    ogImage: fm.heroImage,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, locale } = await params;
  const lp = (path: string) => locale === routing.defaultLocale ? path : `/${locale}${path}`;
  const fullSlug = slug.join("/");
  const [t, tc] = await Promise.all([
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const doc = await getService(fullSlug, locale);
  if (!doc) notFound();
  const fm = doc.frontmatter;
  const isCategory = !fm.parent;

  const subServices = isCategory ? await getServicesByCategory(fm.slug, locale) : [];

  // Beregn sibling-services og parent title til RelatedServices
  const siblingServices = !isCategory && fm.parent
    ? (await getServicesByCategory(fm.parent, locale)).filter(
        (s) => s.frontmatter.slug !== fm.slug
      )
    : [];
  const parentDoc = !isCategory && fm.parent
    ? await getService(fm.parent, locale)
    : null;

  const anchors = [
    { id: "overview", label: t("anchorOverview") },
    ...(fm.process && fm.process.length > 0
      ? [{ id: "how-it-works", label: t("anchorHowItWorks") }]
      : []),
    ...(fm.capabilities && fm.capabilities.length > 0
      ? [{ id: "capabilities", label: t("anchorCapabilities") }]
      : []),
    ...(isCategory && subServices.length > 0
      ? [{ id: "sub-services", label: t("anchorDetail") }]
      : []),
    { id: "cases", label: t("anchorCases") },
    { id: "contact", label: t("anchorContact") },
  ];

  return (
    <>
      <PageHero
        eyebrow={fm.eyebrow}
        title={fm.title}
        lede={fm.lede}
        image={fm.heroImage}
        align="split"
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/contact" size="md" withArrow>
            {t("talkToEngineer")}
          </LinkButton>
          {!isCategory && fm.parent ? (
            <LinkButton href={`/services/${fm.parent}`} variant="ghost" size="md">
              {t("backToCategory")}
            </LinkButton>
          ) : null}
        </div>
      </PageHero>

      <AnchorSubNav items={anchors} />

      <Section tone="cream" size="md" id="overview">
        <Container size="narrow">
          <div className="prose-invert mx-auto max-w-3xl">
            <Mdx source={doc.body} />
            {fm.outcomes && fm.outcomes.length > 0 ? (
              <div className="mt-12 rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-8">
                <p className="text-eyebrow">{t("whatYouGet")}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {fm.outcomes.map((o) => (
                    <li
                      key={o}
                      className="text-[0.95rem] leading-relaxed text-[var(--color-ink-700)]"
                    >
                      <span className="mr-2 text-[var(--color-tan-500)]">▸</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {fm.process && fm.process.length > 0 ? (
        <ProcessSteps
          id="how-it-works"
          eyebrow={t("anchorHowItWorks")}
          title={t("howEngagementRuns", { title: fm.title.toLowerCase() })}
          steps={fm.process}
        />
      ) : null}

      {isCategory && subServices.length > 0 ? (
        <Section tone="paper" size="md" id="sub-services">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>{t("within", { title: fm.title })}</Eyebrow>
              <h2 className="mt-4 text-display-3 text-balance">{t("threeWaysDeliver")}</h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {subServices.map(({ frontmatter: s }) => (
                <Link
                  key={s.slug}
                  href={lp(`/services/${s.slug}`)}
                  className="group flex flex-col rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)] p-7 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                >
                  <Eyebrow>{s.eyebrow}</Eyebrow>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--color-ink-500)]">{s.lede}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                    {tc("learnMore")} <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {fm.capabilities && fm.capabilities.length > 0 ? (
        <CapabilityGrid
          id="capabilities"
          eyebrow={t("anchorCapabilities")}
          title={t("whatCovers", { title: fm.title })}
          items={fm.capabilities}
        />
      ) : null}

      <CaseList
        id="cases"
        filterBySlug={fm.relatedCases}
        title={t("wherePaidOff", { title: fm.title })}
        eyebrow={t("selectedCases")}
        emptyMessage={t("casesBeingPrepared")}
        locale={locale}
      />

      {!isCategory && fm.parent ? (
        <RelatedServices
          siblings={siblingServices}
          parentTitle={parentDoc?.frontmatter.title ?? fm.parent}
          locale={locale}
        />
      ) : null}

      <CtaBand id="contact" locale={locale} />
    </>
  );
}
