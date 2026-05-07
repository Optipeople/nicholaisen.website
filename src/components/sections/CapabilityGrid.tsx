import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Capability = {
  title: string;
  description: string;
};

export function CapabilityGrid({
  id,
  eyebrow = "Capabilities",
  title,
  items,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  items: Capability[];
}) {
  return (
    <Section tone="paper" size="md" id={id}>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">{title}</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)] p-7"
            >
              <h3 className="text-base font-semibold text-[var(--color-ink-900)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-500)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
