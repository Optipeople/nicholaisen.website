import { ArrowRight, Compass, Wrench, LineChart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

export async function InfoCardRow() {
  const t = await getTranslations("home.infoCards");
  const cards = [
    { title: t("newToTitle"), description: t("newToDesc"), cta: t("newToCta"), href: "/about", icon: Compass },
    { title: t("optimizeTitle"), description: t("optimizeDesc"), cta: t("optimizeCta"), href: "/services", icon: Wrench },
    { title: t("optiTitle"), description: t("optiDesc"), cta: t("optiCta"), href: "/services/digital-performance", icon: LineChart },
  ];

  return (
    <Section tone="cream" size="md">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">{t("title")}</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map(({ title, description, cta, href, icon: Icon }) => (
            <Link
              key={href}
              href={href as "/"}
              className="group flex flex-col rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-7 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <Icon className="size-6 text-[var(--color-navy-900)]" aria-hidden />
              <h3 className="mt-6 text-lg font-semibold text-[var(--color-ink-900)]">{title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-500)]">{description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                {cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
