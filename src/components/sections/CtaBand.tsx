import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

type CtaBandProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "navy" | "beige";
};

export function CtaBand({
  id,
  eyebrow = "Engineered precision, told quietly.",
  title = "Tell us what you’re trying to make better.",
  body = "Bring us the part of the line that frustrates you. We’ll come back with what we’d look at first.",
  primary = { label: "Schedule a call", href: "/contact" },
  secondary = { label: "Explore solutions", href: "/services" },
  tone = "navy",
}: CtaBandProps = {}) {
  const isNavy = tone === "navy";
  return (
    <Section id={id} tone={isNavy ? "navy" : "beige"} size="md">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <Eyebrow className={isNavy ? "text-[var(--color-tan-300)]" : undefined}>
              {eyebrow}
            </Eyebrow>
            <h2
              className={`mt-5 text-display-2 text-balance ${
                isNavy ? "text-[var(--color-cream-50)]" : "text-[var(--color-ink-900)]"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-6 max-w-2xl text-lede ${
                isNavy ? "text-[var(--color-cream-50)]/80" : "text-[var(--color-ink-700)]"
              }`}
            >
              {body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <LinkButton
              href={primary.href}
              variant={isNavy ? "inverse" : "primary"}
              size="lg"
              withArrow
            >
              {primary.label}
            </LinkButton>
            {secondary ? (
              <LinkButton
                href={secondary.href}
                variant={isNavy ? "ghost" : "secondary"}
                size="lg"
                className={
                  isNavy
                    ? "text-[var(--color-cream-50)] hover:bg-[var(--color-navy-700)]"
                    : undefined
                }
              >
                {secondary.label}
              </LinkButton>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
