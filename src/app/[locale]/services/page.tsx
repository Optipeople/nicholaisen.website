import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { listServices } from "@/content/loader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Five service tracks to take your wood, plastic or aluminum production from strategy to shop floor.",
  path: "/services",
});

export default async function ServicesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, tc] = await Promise.all([
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const all = await listServices(locale);
  const categories = all.filter((s) => !s.frontmatter.parent);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lede={t("hero.lede")}
        align="wide"
      />

      <Section tone="paper" size="md">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map(({ frontmatter: cat }) => (
              <Link
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className="group grid gap-6 rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)] p-7 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] sm:grid-cols-[1fr_1.2fr]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--color-paper-dark)]">
                  <Image
                    src={cat.heroImage}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <Eyebrow>{cat.eyebrow}</Eyebrow>
                  <h2 className="mt-3 text-xl font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                    {cat.title}
                  </h2>
                  <p className="mt-3 text-sm text-[var(--color-ink-500)]">{cat.lede}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                    {tc("learnMore")} <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
