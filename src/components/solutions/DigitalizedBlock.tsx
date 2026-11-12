import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";

/** "Data that keeps your line performing" — copy and a three-stage timeline beside a tall photo. */
export function DigitalizedBlock({
  kicker,
  title,
  intro,
  rows,
  contactLabel,
  aboutLabel,
  imageAlt,
}: {
  kicker: string;
  title: string;
  intro: string;
  rows: { when: string; lead: string; text: string }[];
  contactLabel: string;
  aboutLabel: string;
  imageAlt: string;
}) {
  return (
    <section className="site-container pt-6 pb-28">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-x-[clamp(32px,6vw,96px)] gap-y-12">
        <div>
          <Kicker className="mb-4">{kicker}</Kicker>
          <h2 className="text-display-2 m-0">{title}</h2>
          <p className="text-intro mt-5 mb-8">{intro}</p>
          <div className="flex flex-col">
            {rows.map((row, i) => (
              <div
                key={row.when}
                className={`grid grid-cols-[110px_1fr] gap-4 border-t border-[var(--color-divider)] py-[18px] ${
                  i === rows.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="text-[20px] leading-[1.55] font-medium">{row.when}</span>
                <span className="text-[16px] leading-[1.5]">
                  <b className="font-semibold">{row.lead}</b> {row.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/contact" variant="solid" size="card">
              {contactLabel}
            </LinkButton>
            <LinkButton href="https://optipeople.com" external variant="outline" size="card" className="py-[11px]">
              {aboutLabel} <span aria-hidden>↗</span>
            </LinkButton>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-[var(--color-accent-200)]">
          <Image
            src="/images/v3/cnc-technician.jpg"
            alt={imageAlt}
            fill
            sizes="(min-width: 1320px) 560px, 90vw"
            className="object-cover"
            style={{ objectPosition: "62% 50%" }}
          />
        </div>
      </div>
    </section>
  );
}
