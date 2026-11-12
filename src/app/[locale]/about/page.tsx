import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { SplitFeature, FeatureText } from "@/components/ui/SplitFeature";
import { LinkButton } from "@/components/ui/Button";
import { HistoryIcon, InfoIcon, PeopleIcon } from "@/components/ui/icons";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { trackHref } from "@/lib/tracks";
import { buildMetadata } from "@/lib/seo";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  return buildMetadata({ title: t("title"), description: t("lede"), path: "/about" });
}

/** About / Company (design v3 "COMPANY"). */
export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("company");
  const principles = t.raw("values.principles") as { lead: string; text: string }[];
  const facts = t.raw("facts") as { value: string; label: string }[];

  return (
    <main>
      <PhotoHero
        image="/images/v3/complete-factory.png"
        alt={t("imageAlt")}
        objectPosition="60% 40%"
        title={t("title")}
        lede={t("lede")}
        titleMaxWidth="18ch"
        ledeMaxWidth="58ch"
      >
        <HeroIconLinks
          label={t("jumpLabel")}
          maxWidth="720px"
          items={[
            { href: "#about-us", label: t("jumps.about"), Icon: InfoIcon },
            { href: "#history", label: t("jumps.history"), Icon: HistoryIcon },
            { href: "/about/team", label: t("jumps.team"), Icon: PeopleIcon },
          ]}
        />
      </PhotoHero>

      <SplitFeature
        id="about-us"
        image="/images/v3/wood-frames.jpg"
        alt={t("about.imageAlt")}
        kicker={t("about.kicker")}
        title={t("about.title")}
        actions={
          <>
            <LinkButton href={trackHref("business")} variant="solid" size="feature">
              {t("about.solutions")}
            </LinkButton>
            <LinkButton href="/cases" variant="outline" size="feature" className="py-3">
              {t("about.cases")}
            </LinkButton>
          </>
        }
      >
        <FeatureText>{t("about.p1")}</FeatureText>
        <FeatureText>{t("about.p2")}</FeatureText>
      </SplitFeature>

      <SplitFeature
        image="/images/v3/cnc-technician.jpg"
        alt={t("values.imageAlt")}
        objectPosition="60% 50%"
        imageFirst
        kicker={t("values.kicker")}
        title={t("values.title")}
        actions={
          <LinkButton href="/contact" variant="solid" size="feature">
            {t("contact")}
          </LinkButton>
        }
      >
        {principles.map((p) => (
          <FeatureText key={p.lead}>
            <strong className="font-semibold">{p.lead}</strong> {p.text}
          </FeatureText>
        ))}
      </SplitFeature>

      <div id="history" className="scroll-mt-6">
        <TimelineSection className="mt-28" />
      </div>

      <section className="site-container section-top">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-10 border-y border-[var(--color-divider)] py-10">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-2">
              <span className="text-[clamp(40px,4vw,56px)] leading-none font-extralight tracking-[-0.04em] text-[var(--color-accent)] tabular-nums">
                {f.value}
              </span>
              <span className="text-[15px] text-[var(--color-accent-500)]">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      <SplitFeature
        href="/about/group"
        image="/images/v3/wood-frames.jpg"
        alt={t("group.imageAlt")}
        kicker={t("group.kicker")}
        title={t("group.title")}
        gap="card"
      >
        <FeatureText muted>{t("group.text")}</FeatureText>
        <span className="mt-2 self-start rounded-[4px] bg-[var(--color-accent)] px-[22px] py-[13px] text-[16px] leading-[1.55] text-white">
          {t("group.cta")} →
        </span>
      </SplitFeature>

      <SplitFeature
        href="/about/team"
        image="/images/v3/complete-factory.png"
        alt={t("team.imageAlt")}
        objectPosition="60% 40%"
        imageFirst
        kicker={t("team.kicker")}
        title={t("team.title")}
        gap="card"
        className="pb-28"
      >
        <FeatureText muted>{t("team.text")}</FeatureText>
        <span className="mt-2 self-start rounded-[4px] bg-[var(--color-accent)] px-[22px] py-[13px] text-[16px] leading-[1.55] text-white">
          {t("team.cta")} →
        </span>
      </SplitFeature>
    </main>
  );
}
