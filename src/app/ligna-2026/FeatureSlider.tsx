"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

type Slide = {

  title: string;
  subtitle: string;
  description: string;
  image: string;
  href?: string;
  cta?: string;
  tone: "dark" | "light";
};

const slides: Slide[] = [
  {
    title: "Production Optimization",
    subtitle: "See more. Waste less.",
    description:
      "Where we'd look first on a wood line — bottlenecks, throughput, and the changes that pay back fastest.",
    image: "/images/workshop/cnc-machining.jpg",
    href: "/services",
    cta: "Explore solutions",
    tone: "dark",
  },
  {
    title: "Opti · Digital Performance",
    subtitle: "Real-time. All the time.",
    description:
      "Real-time visibility into the shop floor, with a path to predictive maintenance and continuous improvement.",
    image: "/images/hero-mdf.jpg",
    href: "/services/digital-performance",
    cta: "Discover Opti",
    tone: "dark",
  },
  {
    title: "Project & Machine Solutions",
    subtitle: "From station to line.",
    description:
      "From a single station to a turnkey line — engineered, integrated, and commissioned with you.",
    image: "/images/workshop/panel-saw-2.jpg",
    href: "/services",
    cta: "See capabilities",
    tone: "dark",
  },
];

export function FeatureSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const getCardCenter = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return 0;
    return card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2;
  }, []);

  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < track.children.length; i++) {
      const card = track.children[i] as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }
    setActive(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", syncActive, { passive: true });
    return () => track.removeEventListener("scroll", syncActive);
  }, [syncActive]);

  function scrollTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: getCardCenter(index), behavior: "smooth" });
  }

  return (
    <section className="bg-[var(--color-cream-50)] py-6 lg:py-10">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:px-[max(1rem,calc((100vw-90rem)/2+1rem))]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            onClick={() => scrollTo(i)}
            className="relative isolate flex aspect-[16/10] w-[85vw] max-w-[68rem] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-2xl cursor-pointer lg:aspect-[2/1] lg:w-[75vw]"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="85vw"
              className="object-cover"
            />

            {slide.tone === "dark" ? (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"
                />
              </>
            ) : (
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent"
              />
            )}

            <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-10 lg:p-14">
              <p
                className={`text-xs font-semibold uppercase tracking-widest ${
                  slide.tone === "dark"
                    ? "text-[var(--color-tan-300)]"
                    : "text-[var(--color-navy-900)]"
                }`}
              >
                {slide.title}
              </p>
              <h3
                className={`text-display-3 text-balance ${
                  slide.tone === "dark"
                    ? "text-[var(--color-cream-50)]"
                    : "text-[var(--color-ink-900)]"
                }`}
              >
                {slide.subtitle}
              </h3>
              <p
                className={`max-w-lg text-[1rem] leading-relaxed ${
                  slide.tone === "dark"
                    ? "text-[var(--color-cream-50)]/80"
                    : "text-[var(--color-ink-700)]"
                }`}
              >
                {slide.description}
              </p>
              {slide.href && slide.cta ? (
                <div className="mt-2">
                  <LinkButton
                    href={slide.href}
                    size="sm"
                    variant={slide.tone === "dark" ? "inverse" : "primary"}
                    withArrow
                  >
                    {slide.cta}
                  </LinkButton>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "w-8 bg-[var(--color-navy-900)]"
                : "w-2 bg-[var(--color-ink-300)]/50 hover:bg-[var(--color-ink-300)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
