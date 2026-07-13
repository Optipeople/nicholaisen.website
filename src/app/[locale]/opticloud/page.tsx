import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { LinkButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { ToggleDiagram } from "@/components/opticloud/ToggleDiagram";
import { PersonaTabs } from "@/components/opticloud/PersonaTabs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "opticloud" });
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/opticloud",
  });
}

export default async function OpticloudPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "opticloud" });

  const personas = [
    {
      id: "maintenance",
      label: t("personas.tab1"),
      problem: t("personas.p1Problem"),
      evidence: t("personas.p1Evidence"),
    },
    {
      id: "quality",
      label: t("personas.tab2"),
      problem: t("personas.p2Problem"),
      evidence: t("personas.p2Evidence"),
    },
    {
      id: "operations",
      label: t("personas.tab3"),
      problem: t("personas.p3Problem"),
      evidence: t("personas.p3Evidence"),
    },
  ];

  const pipeline = [
    {
      icon: "⬡",
      title: t("pipeline.stage1Title"),
      sub: t("pipeline.stage1Sub"),
      hub: false,
    },
    {
      icon: "◱",
      title: t("pipeline.stage2Title"),
      sub: t("pipeline.stage2Sub"),
      hub: false,
    },
    {
      icon: "◈",
      title: t("pipeline.stage3Title"),
      sub: t("pipeline.stage3Sub"),
      hub: true,
    },
    {
      icon: "✺",
      title: t("pipeline.stage4Title"),
      sub: t("pipeline.stage4Sub"),
      hub: false,
    },
    {
      icon: "◉",
      title: t("pipeline.stage5Title"),
      sub: t("pipeline.stage5Sub"),
      hub: false,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lede={t("hero.lede")}
        align="wide"
      >
        <LinkButton href="/contact" size="md" withArrow>
          {t("hero.cta")}
        </LinkButton>
      </PageHero>

      {/* Toggle diagram */}
      <Section tone="cream" size="md">
        <Container size="narrow">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Eyebrow>{t("diagram.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">
              {t("diagram.title")}
            </h2>
          </div>
          <ToggleDiagram
            modeMachine={t("diagram.modeMachine")}
            modeFactory={t("diagram.modeFactory")}
            machineSub={t("diagram.machineSub")}
            factorySub={t("diagram.factorySub")}
            labels={{
              m1: t("diagram.labelSaw"),
              m2: t("diagram.labelPanel"),
              m3: t("diagram.labelRouter"),
              m4: t("diagram.labelCnc"),
              orders: t("diagram.labelOrders"),
              shifts: t("diagram.labelShifts"),
              energy: t("diagram.labelEnergy"),
              stops: t("diagram.labelStops"),
            }}
          />
        </Container>
      </Section>

      {/* Pipeline */}
      <Section tone="paper" size="md">
        <Container>
          <div className="max-w-2xl mb-12">
            <Eyebrow>{t("pipeline.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">
              {t("pipeline.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pipeline.map((stage, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center p-6 rounded-xl ${
                  stage.hub
                    ? "bg-[var(--color-tan-500)]"
                    : "bg-[var(--color-paper-dark)]"
                }`}
              >
                <div
                  className={`text-2xl mb-3 ${
                    stage.hub ? "text-white" : "text-[var(--color-navy-900)]"
                  }`}
                >
                  {stage.icon}
                </div>
                <h3
                  className={`text-sm font-semibold ${
                    stage.hub ? "text-white" : "text-[var(--color-ink-900)]"
                  }`}
                >
                  {stage.title}
                </h3>
                <p
                  className={`mt-2 text-xs leading-relaxed ${
                    stage.hub ? "text-white/80" : "text-[var(--color-ink-500)]"
                  }`}
                >
                  {stage.sub}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Persona tabs */}
      <Section tone="cream" size="md">
        <Container size="narrow">
          <div className="max-w-2xl mb-10">
            <Eyebrow>{t("personas.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">
              {t("personas.title")}
            </h2>
          </div>
          <PersonaTabs
            tabs={personas}
            problemLabel={t("personas.problemLabel")}
            evidenceLabel={t("personas.evidenceLabel")}
          />
        </Container>
      </Section>

      {/* Partnership */}
      <Section tone="navy" size="md">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-eyebrow text-[var(--color-tan-300)] mb-4">
                {t("partnership.eyebrow")}
              </p>
              <h2 className="text-display-3 text-balance text-[var(--color-cream-50)]">
                {t("partnership.title")}
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-[var(--color-slate-500)] leading-relaxed">
                {t("partnership.body")}
              </p>
              <p className="text-[var(--color-slate-500)] leading-relaxed">
                {t("partnership.body2")}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Closing quote */}
      <Section tone="cream" size="lg">
        <Container size="narrow">
          <blockquote className="text-center">
            <p className="text-display-3 text-balance text-[var(--color-navy-900)] font-light italic leading-tight">
              &ldquo;{t("quote.text")}&rdquo;
            </p>
          </blockquote>
        </Container>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
