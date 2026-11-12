import { getTranslations } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { ActivityIcon, CompassIcon, FactoryLinesIcon, GaugeIcon, GearIcon } from "@/components/ui/icons";
import { tracks, type Track, type TrackKey } from "@/lib/tracks";

const switcherIcons: Record<TrackKey, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  business: CompassIcon,
  optimization: GaugeIcon,
  machines: GearIcon,
  projects: FactoryLinesIcon,
  digital: ActivityIcon,
};

/** Track landing hero: shared photo hero plus the five-track switcher. */
export async function TrackHero({ track }: { track: Track }) {
  const t = await getTranslations("home.tracks");
  const ts = await getTranslations("solutions");
  const index = tracks.indexOf(track);
  const title = t(`items.${track.key}.title`);

  return (
    <PhotoHero
      image={track.image}
      alt={title}
      kicker={`${String(index + 1).padStart(2, "0")} · ${t(`stages.${track.stage}`)}`}
      title={title}
      lede={t(`items.${track.key}.lede`)}
      bottom="overlap"
    >
      <HeroIconLinks
        label={ts("switcherLabel")}
        maxWidth="1240px"
        minWidth="600px"
        gapClass="gap-x-6 gap-y-8"
        dim={0.72}
        underline
        tall
        items={tracks.map((tr) => ({
          href: tr.href,
          label: ts(`tracks.${tr.key}.switcherLabel`),
          Icon: switcherIcons[tr.key],
          current: tr.key === track.key,
        }))}
      />
    </PhotoHero>
  );
}
