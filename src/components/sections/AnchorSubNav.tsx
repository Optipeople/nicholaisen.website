"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

type Anchor = { id: string; label: string };

export function AnchorSubNav({ items }: { items: Anchor[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const onIntersect: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    };
    const obs = new IntersectionObserver(onIntersect, {
      rootMargin: "-40% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    observers.push(obs);
    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [items]);

  return (
    <nav className="sticky top-20 z-20 border-y border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-cream-50)]/75">
      <Container>
        <ul className="flex gap-1 overflow-x-auto py-2">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "relative inline-flex items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-[var(--color-navy-900)]"
                      : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-2 h-0.5 rounded-full bg-[var(--color-navy-900)] transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
