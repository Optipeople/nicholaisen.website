"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { ArrowLeftLongIcon, ArrowRightLongIcon } from "@/components/ui/icons";

export type ServiceCard = {
  title: string;
  copy: string;
  image?: string;
  digital?: boolean;
  href: string;
};

const GAP = 28;

/** Three-up scroll-snap carousel of service cards with dots and prev/next. */
export function ServiceCarousel({
  cards,
  labels,
}: {
  cards: ServiceCard[];
  labels: { contact: string; learnMore: string; digitalized: string; prev: string; next: string; page: string };
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [pages, setPages] = useState(Math.max(1, cards.length - 2));

  const step = useCallback(() => {
    const card = scroller.current?.querySelector("article");
    return card ? card.getBoundingClientRect().width + GAP : 400;
  }, []);

  // Pages = cards that can sit first in view (matches the design: n - perView + 1).
  useEffect(() => {
    const measure = () => {
      const el = scroller.current;
      if (!el) return;
      // Only whole cards count as in view, so a cut-off card keeps the controls.
      const perView = Math.max(1, Math.floor((el.clientWidth + GAP) / step() + 0.02));
      setPages(Math.max(1, cards.length - perView + 1));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cards.length, step]);

  const goTo = (i: number) => scroller.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <>
      <div
        ref={scroller}
        onScroll={(e) => {
          const i = Math.round(e.currentTarget.scrollLeft / step());
          if (i !== index) setIndex(i);
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-7 overflow-x-auto"
      >
        {cards.map((card) => (
          <article
            key={card.title}
            className="flex min-w-[280px] flex-[0_0_calc((100%-56px)/3)] snap-start flex-col gap-3"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[var(--color-accent-200)]">
              {card.image ? (
                <Image src={card.image} alt={card.title} fill sizes="(min-width: 1320px) 400px, 80vw" className="object-cover" />
              ) : null}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <h3 className="m-0 text-[24px] leading-[1.12] font-medium tracking-[-0.015em]">{card.title}</h3>
              {card.digital ? (
                <span className="rounded-[3px] bg-[var(--color-accent-100)] px-2 py-[3px] text-[11px] font-semibold tracking-[0.08em] text-[var(--color-accent-500)]">
                  {labels.digitalized}
                </span>
              ) : null}
            </div>
            <p className="m-0 flex-1 text-[17px] leading-[1.55] text-[var(--color-accent-500)]">{card.copy}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <LinkButton href="/contact" variant="solid" size="card">
                {labels.contact}
              </LinkButton>
              <LinkButton href={card.href} variant="outline" size="card" className="py-[11px]">
                {labels.learnMore}
              </LinkButton>
            </div>
          </article>
        ))}
      </div>

      {/* A single card has nothing to scroll to. */}
      {cards.length > 1 ? (
      <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center">
        <span />
        <div className="flex items-center gap-2.5">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${labels.page} ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className="h-2.5 cursor-pointer rounded-[5px]"
              style={{
                width: i === index ? 56 : 10,
                background: i === index ? "var(--color-accent)" : "var(--color-accent-200)",
                transition: "width 250ms, background 250ms",
              }}
            />
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            aria-label={labels.prev}
            onClick={() => goTo(Math.max(0, index - 1))}
            className="flex size-14 cursor-pointer items-center justify-center rounded-full border border-[var(--color-divider)] hover:bg-[var(--color-accent-100)]"
          >
            <ArrowLeftLongIcon />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            onClick={() => goTo(Math.min(pages - 1, index + 1))}
            className="flex size-14 cursor-pointer items-center justify-center rounded-full border border-[var(--color-accent-400)] hover:bg-[var(--color-accent-100)]"
          >
            <ArrowRightLongIcon />
          </button>
        </div>
      </div>
      ) : (
        // Keep the section's spacing without the controls.
        <div aria-hidden className="mt-10 h-14" />
      )}
    </>
  );
}
