import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const milestones = [
    { year: t("history.1972Year"), title: t("history.1972Title"), description: t("history.1972Desc") },
    { year: t("history.1990sYear"), title: t("history.1990sTitle"), description: t("history.1990sDesc") },
    { year: t("history.2010sYear"), title: t("history.2010sTitle"), description: t("history.2010sDesc") },
    { year: t("history.todayYear"), title: t("history.todayTitle"), description: t("history.todayDesc") },
  ];

  const principles = [
    { title: t("principles.dataTitle"), description: t("principles.dataDesc") },
    { title: t("principles.specificTitle"), description: t("principles.specificDesc") },
    { title: t("principles.longTitle"), description: t("principles.longDesc") },
  ];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} lede={t("hero.lede")} align="wide" />

      <Section tone="paper" size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-paper-dark)]">
              <Image src="/images/hero-mdf.jpg" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div>
              <Eyebrow>{t("what.eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-display-2 text-balance">{t("what.title")}</h2>
              <p className="mt-6 text-lede max-w-2xl">{t("what.body1")}</p>
              <p className="mt-4 text-[1rem] leading-relaxed text-[var(--color-ink-700)] max-w-2xl">{t("what.body2")}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream" size="md">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t("how.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">{t("how.title")}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-7">
                <h3 className="text-lg font-semibold text-[var(--color-ink-900)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-500)]">{p.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper" size="md">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t("history.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">{t("history.title")}</h2>
          </div>
          <ol className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
            {milestones.map((m) => (
              <li key={m.year} className="grid grid-cols-[auto_1fr] gap-6">
                <div className="text-eyebrow text-[var(--color-tan-500)]">{m.year}</div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-ink-900)]">{m.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-ink-500)]">{m.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="cream" size="md">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>{t("location.eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-display-3 text-balance">{t("location.title")}</h2>
              <address className="mt-6 not-italic text-lede leading-relaxed">
                {site.address.street}<br />
                {site.address.postal} {site.address.city}<br />
                {site.address.country}
              </address>
              <p className="mt-6 text-base text-[var(--color-ink-700)]">
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="hover:text-[var(--color-navy-900)]">{site.phone}</a>
                <br />
                <a href={`mailto:${site.email}`} className="hover:text-[var(--color-navy-900)]">{site.email}</a>
              </p>
              <p className="mt-6 text-xs text-[var(--color-ink-500)]">CVR {site.cvr}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]">
              <Image src="/images/hero-workshop.jpg" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
