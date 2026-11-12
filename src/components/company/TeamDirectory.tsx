"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@/components/ui/icons";
import { departments, photoUrl } from "@/lib/team";

/** Team grid grouped by department, with a "Show" filter. */
export function TeamDirectory() {
  const t = useTranslations("team");
  const [filter, setFilter] = useState("all");
  const shown = departments.filter((d) => filter === "all" || d.key === filter);

  return (
    <section className="site-container pt-[72px] pb-28">
      <div className="mb-14 flex justify-end">
        <label className="relative flex items-center gap-4 text-[15px] text-[var(--color-accent-500)]">
          {t("show")}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="min-w-[240px] cursor-pointer appearance-none rounded-[6px] border border-[var(--color-accent-300)] bg-white py-3.5 pr-11 pl-[18px] text-[16px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
          >
            <option value="all">{t("allDepartments")}</option>
            {departments.map((d) => (
              <option key={d.key} value={d.key}>
                {t(`departments.${d.key}`)}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-4 flex text-[var(--color-accent)]">
            <ChevronDownIcon />
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-[72px]">
        {shown.map((d) => (
          <div key={d.key} className="flex flex-col gap-7">
            <h3 className="m-0 border-b border-[var(--color-divider)] pb-3.5 text-[24px] leading-[1.12] font-medium tracking-[-0.015em]">
              {t(`departments.${d.key}`)}
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-x-7 gap-y-10">
              {d.people.map((p) => (
                <div key={p.name} className="flex flex-col gap-3.5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-[var(--color-accent-200)]">
                    <Image
                      src={photoUrl(p.photo)}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1320px) 280px, (min-width: 640px) 40vw, 90vw"
                      className="object-cover"
                      style={{ objectPosition: "center 25%" }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[19px] leading-[1.55] font-medium">{p.name}</span>
                    <span className="text-[15px] leading-[1.45] text-[var(--color-accent-500)]">{t(`roles.${p.role}`)}</span>
                    {p.email ? (
                      <a
                        href={`mailto:${p.email}@nicholaisen.dk`}
                        className="mt-1.5 text-[15px] text-[var(--color-accent)] hover:text-[var(--color-spot)]"
                      >
                        {p.email}@nicholaisen.dk
                      </a>
                    ) : null}
                    {p.phone ? (
                      <a
                        href={`tel:${p.phone.replace(/\s/g, "")}`}
                        className="text-[15px] text-[var(--color-accent)] tabular-nums hover:text-[var(--color-spot)]"
                      >
                        {p.phone}
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
