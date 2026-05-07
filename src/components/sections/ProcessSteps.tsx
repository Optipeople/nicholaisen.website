import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Step = {
  step: number;
  title: string;
  description: string;
};

export function ProcessSteps({
  id,
  eyebrow = "How it works",
  title,
  steps,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  steps: Step[];
}) {
  return (
    <Section tone="cream" size="md" id={id}>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">{title}</h2>
        </div>
        <ol className="mt-12 grid gap-x-8 gap-y-10 lg:grid-cols-2">
          {steps.map((step) => (
            <li key={step.step} className="grid grid-cols-[auto_1fr] gap-6">
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-[var(--color-navy-900)]/20 text-base font-semibold text-[var(--color-navy-900)]">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-ink-900)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-ink-500)]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
