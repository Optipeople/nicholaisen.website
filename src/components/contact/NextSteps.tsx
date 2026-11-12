import { getTranslations } from "next-intl/server";

/** "What happens next" — three numbered steps on the navy contact page. */
export async function NextSteps() {
  const t = await getTranslations("contact.next");
  const steps = t.raw("steps") as { title: string; text: string }[];
  return (
    <section className="site-container pb-[clamp(80px,9vw,128px)]">
      <h2 className="m-0 mb-12 text-[clamp(30px,3.4vw,48px)] leading-[1.1] font-medium tracking-[-0.02em]">{t("title")}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-[clamp(32px,4vw,64px)] gap-y-10">
        {steps.map((step, i) => (
          <div key={step.title} className="flex flex-col gap-[14px] border-t-2 border-white pt-5">
            <span className="text-[13px] font-semibold text-[var(--color-spot)] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 text-[24px] leading-[1.12] font-medium tracking-[-0.015em]">{step.title}</h3>
            <p className="m-0 text-[16.5px] leading-[1.6] text-pretty text-[var(--color-accent-300)]">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
