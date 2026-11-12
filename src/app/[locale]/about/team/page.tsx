import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { TeamDirectory } from "@/components/company/TeamDirectory";
import { buildMetadata } from "@/lib/seo";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return buildMetadata({ title: t("title"), description: t("lede"), path: "/about/team" });
}

/** The team (design v3 "TEAM"). */
export default async function TeamPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");
  return (
    <main>
      <PhotoHero
        image="/images/v3/complete-factory.png"
        alt={t("imageAlt")}
        objectPosition="60% 40%"
        kicker={t("kicker")}
        title={t("title")}
        lede={t("lede")}
        titleMaxWidth="16ch"
      />
      <TeamDirectory />
    </main>
  );
}
