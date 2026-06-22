import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { listIndustries } from "@/content/loader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description: "Wood production at scale: doors and windows, panel and furniture, solid wood.",
  path: "/industries",
});

export default async function IndustriesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  const industries = await listIndustries(locale);

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lede={t("heroLede")}
        align="wide"
      />

      <Section tone="paper" size="md">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {industries.map(({ frontmatter: i }) => (
              <Link
                key={i.slug}
                href={`/${locale}/industries/${i.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]"
              >
                <Image
                  src={i.heroImage}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)]/85 via-[var(--color-navy-950)]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <Eyebrow className="text-[var(--color-tan-300)]">{i.eyebrow}</Eyebrow>
                  <h2 className="mt-2 text-2xl font-semibold text-[var(--color-cream-50)]">
                    {i.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-cream-50)]/80">{i.lede}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-cream-50)]">
                    {t("exploreIndustry")} <ArrowRight className="size-3.5" aria-hidden />
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
