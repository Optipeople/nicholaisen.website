/**
 * White card pulled up over a page hero, with a single tab label
 * (design v3: track finder, case results, industry challenges).
 */
export function OverlapCard({ tab, children }: { tab: string; children: React.ReactNode }) {
  return (
    <section className="site-container relative z-[2] -mt-[88px]">
      <div className="rounded-[4px] bg-white shadow-[0_10px_40px_color-mix(in_srgb,#003050_14%,transparent)]">
        <div className="flex flex-wrap justify-center border-b border-[var(--color-divider)]">
          <span className="-mb-px flex items-center gap-2.5 border-b-[3px] border-[var(--color-spot)] px-7 pt-[22px] pb-[19px] text-[17px] leading-[1.55]">
            {tab}
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}
