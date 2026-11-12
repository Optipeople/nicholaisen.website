import { Kicker } from "@/components/ui/Kicker";

/**
 * Two columns: kicker, heading and two paragraphs on the left; a large
 * figure with its caption between hairlines on the right.
 */
export function StatementSection({
  kicker,
  title,
  body,
  note,
  figure,
  figureTitle,
  figureText,
}: {
  kicker: string;
  title: string;
  body: string;
  note: string;
  figure: string;
  figureTitle: string;
  figureText: string;
}) {
  return (
    <section className="site-container section-top grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-x-[clamp(40px,6vw,96px)] gap-y-10">
      <div className="flex flex-col gap-5">
        <Kicker line>{kicker}</Kicker>
        <h2 className="text-display-2 m-0 text-balance">{title}</h2>
        <p className="m-0 text-[18px] leading-[1.65]">{body}</p>
        <p className="m-0 text-[18px] leading-[1.65] text-[var(--color-accent-500)]">{note}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-[var(--color-divider)] py-10">
        <span className="text-stat-lg text-[var(--color-accent)]">{figure}</span>
        <div className="flex flex-[1_1_220px] flex-col gap-1.5">
          <span className="text-[19px] leading-[1.55] font-medium">{figureTitle}</span>
          <span className="text-body text-[var(--color-accent-500)]">{figureText}</span>
        </div>
      </div>
    </section>
  );
}
