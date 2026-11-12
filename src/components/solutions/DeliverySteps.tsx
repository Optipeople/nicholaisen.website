"use client";

import { useEffect, useRef, useState } from "react";
import { ChartIcon, ChevronDownIcon, FileIcon, RefreshIcon, UsersIcon, WrenchIcon } from "@/components/ui/icons";

const icons = [ChartIcon, FileIcon, WrenchIcon, UsersIcon, RefreshIcon];
const EASE = "cubic-bezier(.2,.7,.2,1)";

/**
 * Five connected steps. They unfold one after another when scrolled into
 * view; each can then be toggled on its own.
 */
export function DeliverySteps({ title, steps }: { title: string; steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [closed, setClosed] = useState<Record<number, boolean> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="site-container section-top">
      <h2 className="text-display-2 m-0 mb-14">{title}</h2>
      <div className="no-scrollbar overflow-x-auto">
        <div ref={ref} className="relative grid min-w-[560px] grid-cols-5 items-start gap-4">
          <div aria-hidden className="absolute top-7 right-[10%] left-[10%] h-px bg-[var(--color-accent-300)]" />
          {steps.map((step, i) => {
            const Icon = icons[i] ?? ChartIcon;
            const on = shown && !closed?.[i];
            const delay = closed ? "0ms" : `${i * 180}ms`;
            const delay2 = closed ? (on ? "120ms" : "0ms") : `${i * 180 + 150}ms`;
            return (
              <button
                key={step.title}
                type="button"
                aria-expanded={on}
                onClick={() => {
                  setShown(true);
                  setClosed((c) => ({ ...(c ?? {}), [i]: on }));
                }}
                className="relative z-[1] flex cursor-pointer flex-col items-center gap-4 pb-2 text-center select-none"
              >
                <span
                  className="flex size-14 items-center justify-center rounded-full border"
                  style={{
                    background: on ? "var(--color-accent)" : "#fff",
                    borderColor: on ? "var(--color-accent)" : "var(--color-accent-300)",
                    color: on ? "#fff" : "var(--color-accent)",
                    transition: "background 250ms, border-color 250ms, color 250ms",
                  }}
                >
                  <Icon />
                </span>
                <span className="flex items-center gap-1.5 text-[18px] leading-[1.55] font-medium">
                  {step.title}
                  <span
                    aria-hidden
                    className="flex text-[var(--color-accent-400)]"
                    style={{ transform: on ? "rotate(180deg)" : "rotate(0deg)", transition: `transform 500ms ${delay}` }}
                  >
                    <ChevronDownIcon />
                  </span>
                </span>
                <span
                  className="grid w-full"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr", transition: `grid-template-rows 700ms ${EASE} ${delay}` }}
                >
                  <span className="overflow-hidden">
                    <span
                      className="mx-auto block max-w-[22ch] text-[15px] leading-[1.5] text-pretty text-[var(--color-accent-500)]"
                      style={{
                        opacity: on ? 1 : 0,
                        transform: on ? "translateY(0)" : "translateY(-16px)",
                        transition: `opacity 500ms ease ${delay2}, transform 700ms ${EASE} ${delay2}`,
                      }}
                    >
                      {step.text}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
