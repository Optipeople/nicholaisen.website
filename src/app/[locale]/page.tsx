import { HeroSplit } from "@/components/sections/HeroSplit";
import { EntryTabs } from "@/components/sections/EntryTabs";
import { TracksCarousel } from "@/components/sections/TracksCarousel";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ScaleTiles } from "@/components/sections/ScaleTiles";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { TimelineSection } from "@/components/sections/TimelineSection";

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
      <TracksCarousel />
      <IndustriesSection />
      <ScaleTiles />
      <FeaturedCases />
      <TimelineSection />
    </>
  );
}
