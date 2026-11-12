"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LinkButton } from "@/components/ui/Button";
import { ExpandingPanels } from "@/components/ui/ExpandingPanels";
import { BuildingIcon, CompassIcon, GaugeIcon, TrendUpIcon } from "@/components/ui/icons";
import { tracks } from "@/lib/tracks";

const stages = [
  { key: "plan", track: 0, column: "1", Icon: CompassIcon },
  { key: "optimize", track: 1, column: "2", Icon: GaugeIcon },
  { key: "build", track: 2, column: "3 / span 2", Icon: BuildingIcon },
  { key: "improve", track: 4, column: "5", Icon: TrendUpIcon },
] as const;

type Stage = (typeof stages)[number];

/** Journey stage for each track, by index (Machines and Projects share "Build"). */
const stageOfTrack: Stage["key"][] = ["plan", "optimize", "build", "build", "improve"];

const COLLAPSED = "clamp(118px,11vw,170px)";

/** "Five tracks. One partner." — journey navigator above expanding photo panels. */
export function TracksCarousel() {
  const t = useTranslations("home.tracks");
  const [active, setActive] = useState(0);
  // "Build" opens Machines and Project Solutions side by side.
  const [both, setBoth] = useState(false);

  const isOpen = (i: number) => (both ? i === 2 || i === 3 : i === active);

  const selectStage = (stage: Stage) => {
    if (stage.key === "build") {
      if (!both) {
        setActive(2);
        setBoth(true);
      }
    } else if (both || stageOfTrack[active] !== stage.key) {
      setActive(stage.track);
      setBoth(false);
    }
  };

  const panels = tracks.map((track, i) => {
    const number = String(i + 1).padStart(2, "0");
    const title = t(`items.${track.key}.title`);
    return {
      key: track.key,
      image: track.image,
      alt: title,
      short: number,
      closedTitle: title,
      content: (
        <>
          <span className="text-panel-kicker">
            {number} · {t(`stages.${stageOfTrack[i] ?? "plan"}`)}
          </span>
          <h3 className="text-heading-1 m-0">{title}</h3>
          <p className="text-body m-0 max-w-[52ch] text-pretty">{t(`items.${track.key}.lede`)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <LinkButton href="/contact" variant="pill-light" size="panel">
              {t(`items.${track.key}.cta`)}
            </LinkButton>
            <LinkButton href={track.href} variant="pill-outline-light" size="panel" className="py-[10px]">
              {t("learnMore")}
            </LinkButton>
          </div>
        </>
      ),
    };
  });

  return (
    <section id="tracks" className="site-container section-top scroll-mt-6">
      <div className="mx-auto mb-14 max-w-[820px] text-center">
        <span className="text-kicker mb-4 block text-[var(--color-accent-500)]">{t("eyebrow")}</span>
        <h2 className="text-display-2 m-0">{t("title")}</h2>
        <p className="text-intro mt-5 mb-0">{t("intro")}</p>
      </div>

      {/* Journey navigator — fits the screen on phones (smaller circles), full size from 640px. */}
      <div className="no-scrollbar mb-8 overflow-x-auto">
        <div className="relative grid grid-cols-5 gap-x-1 gap-y-3 sm:min-w-[700px] sm:gap-x-4">
          <div aria-hidden className="absolute top-[23px] right-[10%] left-[10%] h-[2px] bg-[var(--color-accent-300)] sm:top-[35px]" />
          {[20, 45, 75].map((left) => (
            <svg
              key={left}
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="absolute top-[24px] block -translate-x-1/2 -translate-y-1/2 sm:top-[36px]"
              style={{ left: `${left}%` }}
            >
              <path
                d="M4 1.5 L10 7 L4 12.5"
                fill="none"
                stroke="var(--color-accent-400)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}

          {stages.map((stage) => {
            const { key, column, Icon } = stage;
            const on = stageOfTrack[active] === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={on}
                onClick={() => selectStage(stage)}
                onMouseEnter={() => selectStage(stage)}
                className="relative z-[1] row-start-1 flex min-w-0 cursor-pointer flex-col items-center gap-2 sm:gap-3"
                style={{ gridColumn: column }}
              >
                <span
                  className="flex size-12 items-center justify-center rounded-full border-2 border-[var(--color-accent)] sm:size-[72px]"
                  style={{
                    background: on ? "var(--color-accent)" : "#fff",
                    color: on ? "#fff" : "var(--color-accent)",
                    transition: "background 300ms, color 300ms",
                  }}
                >
                  <Icon />
                </span>
                <span
                  className="max-w-full text-center text-[14px] leading-[1.3] font-medium tracking-[-0.01em] [overflow-wrap:break-word] hyphens-auto sm:text-[24px] sm:leading-[1.55] sm:tracking-[-0.015em]"
                  style={{
                    color: on ? "var(--color-accent)" : "var(--color-accent-500)",
                    transition: "color 300ms",
                  }}
                >
                  {t(`stages.${key}`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ExpandingPanels
        panels={panels}
        isOpen={isOpen}
        onSelect={(i) => {
          setActive(i);
          setBoth(false);
        }}
        collapsedWidth={COLLAPSED}
        openContentWidth={
          both
            ? `max(280px, calc((100cqw - 3 * (${COLLAPSED} + 6px) - 6px) / 2))`
            : `max(300px, calc(100cqw - 4 * (${COLLAPSED} + 6px)))`
        }
        minWidth={both ? "960px" : "720px"}
      />
    </section>
  );
}
