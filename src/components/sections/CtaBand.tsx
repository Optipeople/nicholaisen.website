import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

type CtaBandProps = {
  id?: string;
  locale?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "navy" | "beige";
};

export async function CtaBand({
  id,
  locale,
  eyebrow,
  title,
  body,
  primary,
  secondary,
  tone = "navy",
}: CtaBandProps = {}) {
  const t = locale
    ? await getTranslations({ locale, namespace: "home" })
    : null;

  const resolvedEyebrow = eyebrow ?? t?.("cta.eyebrow") ?? "Engineered precision, told quietly.";
  const resolvedTitle = title ?? t?.("cta.title") ?? "Tell us what you're trying to make better.";
  const resolvedBody = body ?? t?.("cta.body") ?? "Bring us the part of the line that frustrates you. We'll come back with what we'd look at first.";
  const resolvedPrimary = primary ?? {
    label: t?.("cta.primary") ?? "Schedule a call",
    href: "/contact",
  };
  const resolvedSecondary = secondary ?? {
    label: t?.("cta.secondary") ?? "Explore solutions",
    href: "/services",
  };

  const isNavy = tone === "navy";
  return (
    <Section id={id} tone={isNavy ? "navy" : "beige"} size="md">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <Eyebrow className={isNavy ? "text-[var(--color-tan-300)]" : undefined}>
              {resolvedEyebrow}
            </Eyebrow>
            <h2
              className={`mt-5 text-display-2 text-balance ${
                isNavy ? "text-[var(--color-cream-50)]" : "text-[var(--color-ink-900)]"
              }`}
            >
              {resolvedTitle}
            </h2>
            <p
              className={`mt-6 max-w-2xl text-lede ${
                isNavy ? "text-[var(--color-cream-50)]/80" : "text-[var(--color-ink-700)]"
              }`}
            >
              {resolvedBody}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <LinkButton
              href={resolvedPrimary.href}
              variant={isNavy ? "inverse" : "primary"}
              size="lg"
              withArrow
            >
              {resolvedPrimary.label}
            </LinkButton>
            {resolvedSecondary ? (
              <LinkButton
                href={resolvedSecondary.href}
                variant={isNavy ? "ghost" : "secondary"}
                size="lg"
                className={
                  isNavy
                    ? "text-[var(--color-cream-50)] hover:bg-[var(--color-navy-700)]"
                    : undefined
                }
              >
                {resolvedSecondary.label}
              </LinkButton>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
