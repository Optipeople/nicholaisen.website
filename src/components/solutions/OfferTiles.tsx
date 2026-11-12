import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { CalculatorIcon, GaugeIcon, MergeIcon } from "@/components/ui/icons";
import { trackHref } from "@/lib/tracks";

const offers = [
  { key: "investment", href: trackHref("business"), Icon: CalculatorIcon },
  { key: "runningCost", href: trackHref("optimization"), Icon: MergeIcon },
  { key: "criticalMachine", href: trackHref("digital"), Icon: GaugeIcon },
] as const;

export type OfferKey = (typeof offers)[number]["key"];

/** "Measured, not estimated" — three entry offers with large line icons. */
export function OfferTiles({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: Record<OfferKey, { title: string; description: string; cta: string }>;
}) {
  return (
    <section className="site-container pt-6 pb-28">
      <h2 className="text-display-2 m-0 mb-[18px]">{title}</h2>
      <p className="text-intro mt-0 mb-14 max-w-[62ch]">{intro}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-12">
        {offers.map(({ key, href, Icon }) => (
          <Link
            key={key}
            href={href}
            className="flex flex-col gap-[18px] text-center text-[var(--color-text)] hover:text-[var(--color-accent-500)]"
          >
            <div className="flex justify-center pt-2 pb-1 text-[var(--color-accent)]">
              <Icon size={64} strokeWidth={1} />
            </div>
            <div>
              <div className="text-heading-2">{items[key].title}</div>
              <div className="text-meta mt-1.5 text-pretty">{items[key].description}</div>
              <div className="mt-3 text-[15px] font-medium text-[var(--color-accent)]">{items[key].cta} →</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
