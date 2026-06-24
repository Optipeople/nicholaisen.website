import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/sections/CtaBand";
import { Mdx } from "@/components/mdx/Mdx";
import { getCase, listCases, listServices } from "@/content/loader";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

type Params = { slug: string; locale: string };

export async function generateStaticParams() {
  const cases = await listCases();
  return cases.map((c) => ({ slug: c.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getCase(slug);
  if (!doc) return {};
  const fm = doc.frontmatter;
  return buildMetadata({
    title: fm.seo?.title ?? fm.title,
    description: fm.seo?.description ?? fm.excerpt,
    path: `/cases/${fm.slug}`,
    ogImage: fm.heroImage,
  });
}

export default async function CasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, locale } = await params;
  const lp = (path: string) => locale === routing.defaultLocale ? path : `/${locale}${path}`;
  const t = await getTranslations({ locale, namespace: "cases" });
  const doc = await getCase(slug, locale);
  if (!doc) notFound();
  const fm = doc.frontmatter;

  const allServices = await listServices(locale);
  const linkedServices = fm.services
    .map((s) => allServices.find((x) => x.frontmatter.slug === s))
    .filter(Boolean);

  return (
    <>
      <section className="bg-[var(--color-cream-50)] pt-10 pb-12 lg:pt-16">
        <Container size="narrow">
          <Link
            href={lp("/cases")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-500)] hover:text-[var(--color-navy-900)]"
          >
            <ArrowLeft className="size-3.5" /> {t("allCases")}
          </Link>
          <div className="mt-8">
            <Eyebrow>
              {fm.industry.replace("-", " · ")} · {formatDate(fm.publishedAt)}
            </Eyebrow>
            <h1 className="mt-5 text-display-1 text-balance">{fm.title}</h1>
            {fm.client ? (
              <p className="mt-4 text-sm text-[var(--color-ink-500)]">
                {t("client")}: {fm.client}
              </p>
            ) : null}
            <p className="mt-6 text-lede max-w-3xl">{fm.excerpt}</p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--color-paper-dark)]">
            <Image
              src={fm.heroImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section tone="cream" size="md">
        <Container size="narrow">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <div>
                <h2 className="text-eyebrow text-[var(--color-tan-500)]">{t("challenge")}</h2>
                <p className="mt-3 text-lede">{fm.challenge}</p>
              </div>
              <div className="mt-12">
                <h2 className="text-eyebrow text-[var(--color-tan-500)]">{t("approach")}</h2>
                <p className="mt-3 text-lede">{fm.approach}</p>
              </div>
              <div className="mt-12">
                <h2 className="text-eyebrow text-[var(--color-tan-500)]">{t("outcome")}</h2>
                <p className="mt-3 text-lede">{fm.outcome}</p>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-32 rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-6">
                {fm.metrics.length > 0 ? (
                  <>
                    <p className="text-eyebrow">{t("results")}</p>
                    <dl className="mt-4 space-y-5">
                      {fm.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="border-l-2 border-[var(--color-tan-500)] pl-4"
                        >
                          <dt className="text-xs uppercase tracking-wider text-[var(--color-ink-500)]">
                            {m.label}
                          </dt>
                          <dd className="text-2xl font-semibold leading-none text-[var(--color-navy-900)]">
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </>
                ) : null}
                {linkedServices.length > 0 ? (
                  <div className="mt-8 border-t border-[var(--color-ink-300)]/30 pt-6">
                    <p className="text-eyebrow">{t("servicesApplied")}</p>
                    <ul className="mt-3 space-y-1.5">
                      {linkedServices.map((d) => (
                        <li key={d!.frontmatter.slug}>
                          <Link
                            href={lp(`/services/${d!.frontmatter.slug}`)}
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-navy-900)] hover:underline"
                          >
                            {d!.frontmatter.title}
                            <ArrowRight className="size-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Mdx source={doc.body} />
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
