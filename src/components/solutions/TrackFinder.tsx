"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { TrackKey } from "@/lib/tracks";

const selectClass =
  "field-select w-full rounded-[4px] border border-[var(--color-accent-400)] bg-white p-4 pr-[52px] text-[16px] text-[var(--color-text)]";

/**
 * Card overlapping the hero: the track's question, two dropdowns and a CTA
 * that opens the contact form pre-filled with the choices.
 */
export function TrackFinder({ track }: { track: TrackKey }) {
  const t = useTranslations(`solutions.tracks.${track}`);
  const th = useTranslations("home.tracks.items");
  const router = useRouter();
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const options1 = t.raw("finder.options1") as string[];
  const options2 = t.raw("finder.options2") as string[];

  const submit = () => {
    const lines = [first && `${t("finder.label1")}: ${first}`, second && `${t("finder.label2")}: ${second}`].filter(Boolean);
    const query: Record<string, string | string[]> = { topic: track };
    const choices = [first, second].filter(Boolean);
    if (choices.length) query.choice = choices;
    if (lines.length) query.message = `${lines.join("\n")}\n\n`;
    router.push({ pathname: "/contact", query });
  };

  return (
    <section className="site-container relative z-[2] -mt-[88px]">
      <div className="rounded-[4px] bg-white shadow-[0_10px_40px_color-mix(in_srgb,#003050_14%,transparent)]">
        <div className="flex flex-wrap justify-center border-b border-[var(--color-divider)]">
          <span className="-mb-px flex items-center gap-2.5 border-b-[3px] border-[var(--color-spot)] px-7 pt-[22px] pb-[19px] text-[17px] leading-[1.55]">
            {t("question")}
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4 px-[clamp(20px,4vw,48px)] pt-7 pb-8">
          <select aria-label={t("finder.label1")} value={first} onChange={(e) => setFirst(e.target.value)} className={selectClass}>
            <option value="">{t("finder.label1")}</option>
            {options1.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <select aria-label={t("finder.label2")} value={second} onChange={(e) => setSecond(e.target.value)} className={selectClass}>
            <option value="">{t("finder.label2")}</option>
            {options2.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={submit}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-[4px] bg-[var(--color-accent)] px-[22px] py-4 text-[16px] leading-[1.55] font-medium text-white hover:bg-[var(--color-accent-600)]"
          >
            {th(`${track}.cta`)} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
