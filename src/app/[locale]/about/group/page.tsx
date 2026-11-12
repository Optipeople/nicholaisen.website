import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { SplitFeature, FeatureText } from "@/components/ui/SplitFeature";
import { LinkButton } from "@/components/ui/Button";
import { LocationIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

type Params = { locale: string };

/** The three companies, in page order. Anchors are linked from the footer. */
const companies = [
  { key: "denmark", name: "Nicholaisen A/S", image: "/images/v3/cnc-technician.jpg", imageFirst: true },
  { key: "sweden", name: "Nicholaisen Sweden AB", image: "/images/v3/wood-stack.jpg", imageFirst: false },
  { key: "baltics", name: "Nicholaisen Baltic OÜ", image: "/images/v3/robot-sorting.png", imageFirst: true },
] as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "group" });
  return buildMetadata({ title: t("title"), description: t("lede"), path: "/about/group" });
}

/** Nicholaisen Group (design v3 "GROUP"). */
export default async function GroupPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("group");
  const tel = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <main>
      <PhotoHero
        image="/images/v3/wood-frames.jpg"
        alt={t("imageAlt")}
        kicker={t("kicker")}
        title={t("title")}
        lede={t("lede")}
        titleMaxWidth="16ch"
      >
        <HeroIconLinks
          label={t("jumpLabel")}
          maxWidth="720px"
          items={companies.map((c) => ({ href: `#${c.key}`, label: t(`companies.${c.key}.place`), Icon: LocationIcon }))}
        />
      </PhotoHero>

      {companies.map((c) => (
        <SplitFeature
          key={c.key}
          id={c.key}
          image={c.image}
          alt={c.name}
          imageFirst={c.imageFirst}
          kicker={t(`companies.${c.key}.kicker`)}
          title={c.name}
          gap="group"
          tightActions
          actions={
            <LinkButton href="/contact" variant="solid" size="feature">
              {t("contact")}
            </LinkButton>
          }
        >
          <p className="m-0 text-[19px] leading-[1.55] font-medium">{t(`companies.${c.key}.role`)}</p>
          <FeatureText muted>{t(`companies.${c.key}.text`)}</FeatureText>
          {c.key === "denmark" ? (
            <div className="flex w-full flex-col gap-2.5 border-y border-[var(--color-divider)] py-5 text-[16px] leading-[1.5]">
              <span>
                {site.address.street}, {site.address.postal} {site.address.city}, {t("country")}
              </span>
              <span>
                <a href={tel} className="text-[var(--color-text)]">
                  {site.phone}
                </a>{" "}
                ·{" "}
                <a href={`mailto:${site.email}`} className="text-[var(--color-text)]">
                  {site.email}
                </a>
              </span>
            </div>
          ) : null}
        </SplitFeature>
      ))}
      <div className="h-28" />
    </main>
  );
}
