import { HeroSplit } from "@/components/sections/HeroSplit";
import { EntryTabs } from "@/components/sections/EntryTabs";
import { InfoCardRow } from "@/components/sections/InfoCardRow";
import { SolutionTabs } from "@/components/sections/SolutionTabs";
import { IndustryStrip } from "@/components/sections/IndustryStrip";
import { CaseSpotlight } from "@/components/sections/CaseSpotlight";
import { InsightGrid } from "@/components/sections/InsightGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSplit />
      <EntryTabs />
      <InfoCardRow />
      <SolutionTabs locale={locale} />
      <IndustryStrip locale={locale} />
      <CaseSpotlight locale={locale} />
      <InsightGrid locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}
