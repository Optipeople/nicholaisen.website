import { getTranslations } from "next-intl/server";
import { FactStrip } from "@/components/ui/FactStrip";

/** "What happens next" — the three steps in the About page's fact-strip style, joined by arrows. */
export async function NextSteps() {
  const t = await getTranslations("contact.next");
  const steps = t.raw("steps") as { title: string; text: string }[];
  return (
    <section className="site-container pb-[clamp(80px,9vw,128px)]">
      <h2 className="text-label m-0 mb-6 text-[var(--color-accent-300)]">{t("title")}</h2>
      <FactStrip dark connected items={steps.map((step, i) => ({ value: String(i + 1).padStart(2, "0"), label: step.title }))} />
    </section>
  );
}
