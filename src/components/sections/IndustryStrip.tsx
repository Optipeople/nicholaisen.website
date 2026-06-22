import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

const industryData = [
  { key: "doorsWindows", slug: "doors-windows", image: "/images/industries/doors-windows.jpg" },
  { key: "panelFurniture", slug: "panel-furniture", image: "/images/industries/panel-furniture.jpg" },
  { key: "solidWood", slug: "solid-wood", image: "/images/industries/solid-wood.jpg" },
] as const;

export async function IndustryStrip({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const ti = await getTranslations({ locale, namespace: "industries" });

  return (
    <Section tone="cream" size="md">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{t("industriesStrip.eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">{ti("heroTitle")}</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {industryData.map((i) => (
            <Link
              key={i.key}
              href={`/${locale}/industries/${i.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]"
            >
              <Image
                src={i.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)]/85 via-[var(--color-navy-950)]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-eyebrow text-[var(--color-tan-300)]">{t("industriesStrip.industryLabel")}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--color-cream-50)]">
                      {tn(`industriesMenu.${i.key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-cream-50)]/80">
                      {tn(`industriesMenu.${i.key}.description`)}
                    </p>
                  </div>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-50)] text-[var(--color-navy-900)] transition-transform group-hover:rotate-12">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
