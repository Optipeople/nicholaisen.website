"use client";
import { useState } from "react";

type Persona = {
  id: string;
  label: string;
  problem: string;
  evidence: string;
};

type Props = {
  tabs: Persona[];
  problemLabel: string;
  evidenceLabel: string;
};

export function PersonaTabs({ tabs, problemLabel, evidenceLabel }: Props) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0]!;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActive(i)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              active === i
                ? "bg-[var(--color-navy-900)] text-[var(--color-cream-50)]"
                : "border border-[var(--color-ink-300)] text-[var(--color-ink-700)] hover:border-[var(--color-navy-900)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-7">
          <p className="text-eyebrow text-[var(--color-ink-500)] mb-4">{problemLabel}</p>
          <p className="text-[0.95rem] leading-relaxed text-[var(--color-ink-700)]">
            {current.problem}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-tan-500)]/40 bg-[var(--color-cream-50)] p-7">
          <p className="text-eyebrow text-[var(--color-tan-500)] mb-4">{evidenceLabel}</p>
          <p className="text-[0.95rem] leading-relaxed text-[var(--color-ink-700)]">
            {current.evidence}
          </p>
        </div>
      </div>
    </div>
  );
}
