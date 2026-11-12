import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ActivityIcon, CompassIcon, FactoryLinesIcon, GaugeIcon, GearIcon } from "@/components/ui/icons";
import { tracks, type Track, type TrackKey } from "@/lib/tracks";
import { cn } from "@/lib/cn";

const switcherIcons: Record<TrackKey, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  business: CompassIcon,
  optimization: GaugeIcon,
  machines: GearIcon,
  projects: FactoryLinesIcon,
  digital: ActivityIcon,
};

/** Track landing hero: photo with navy tint, centred heading and the five-track switcher. */
export async function TrackHero({ track }: { track: Track }) {
  const t = await getTranslations("home.tracks");
  const ts = await getTranslations("solutions");
  const index = tracks.indexOf(track);
  const title = t(`items.${track.key}.title`);

  return (
    <section className="relative bg-[var(--color-accent)] text-center text-white">
      <div className="absolute inset-0">
        <Image src={track.image} alt={title} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "color-mix(in srgb, #003050 62%, transparent)" }}
      />
      <div className="site-container relative pt-[clamp(80px,11vw,150px)] pb-[170px]">
        <span className="text-kicker mb-4 block text-[var(--color-accent-300)]">
          {String(index + 1).padStart(2, "0")} · {t(`stages.${track.stage}`)}
        </span>
        <h1 className="text-display-page m-0">{title}</h1>
        <p className="text-lede mx-auto mt-5 mb-0 max-w-[56ch]">{t(`items.${track.key}.lede`)}</p>

        {/* On narrow screens the five tracks scroll sideways instead of squeezing their labels. */}
        <div className="no-scrollbar -mx-[clamp(20px,5vw,64px)] mt-16 overflow-x-auto px-[clamp(20px,5vw,64px)]">
        <nav
          aria-label={ts("switcherLabel")}
          className="mx-auto grid max-w-[1240px] min-w-[600px] grid-cols-5 gap-x-6 gap-y-8"
        >
          {tracks.map((tr) => {
            const Icon = switcherIcons[tr.key];
            const current = tr.key === track.key;
            return (
              <Link
                key={tr.key}
                href={tr.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-[14px] text-white hover:text-white hover:opacity-100",
                  current ? "opacity-100" : "opacity-[0.72]",
                )}
              >
                <span className="flex size-16 items-center justify-center">
                  <Icon size={64} strokeWidth={1} />
                </span>
                <span
                  className="box-content flex min-h-[2.6em] items-center justify-center border-b-2 pb-1.5 text-center text-[16px] leading-[1.3] whitespace-pre-line"
                  style={{ borderColor: current ? "var(--color-spot)" : "transparent" }}
                >
                  {ts(`tracks.${tr.key}.switcherLabel`)}
                </span>
              </Link>
            );
          })}
        </nav>
        </div>
      </div>
    </section>
  );
}
