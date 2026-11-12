import { Fragment } from "react";
import { cn } from "@/lib/cn";

/**
 * Row of large light figures with a short label under each, between two
 * hairlines — the About page facts ("1993 · Founded") and the contact page's
 * "What happens next". `dark` for navy backgrounds.
 */
export function FactStrip({
  items,
  dark = false,
  connected = false,
}: {
  items: { value: string; label: string }[];
  dark?: boolean;
  /** Steps in order: an arrow leads from each to the next (down on phones). */
  connected?: boolean;
}) {
  if (connected) return <ConnectedStrip items={items} dark={dark} />;
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-10 border-y py-10",
        dark ? "border-white/25" : "border-[var(--color-divider)]",
      )}
    >
      {items.map((f) => (
        <Fact key={f.label} value={f.value} label={f.label} dark={dark} />
      ))}
    </div>
  );
}

export function Fact({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className={cn(
          "text-[clamp(40px,4vw,56px)] leading-none font-extralight tracking-[-0.04em] tabular-nums",
          dark ? "text-white" : "text-[var(--color-accent)]",
        )}
      >
        {value}
      </span>
      <span className={cn("text-[15px]", dark ? "text-[var(--color-accent-300)]" : "text-[var(--color-accent-500)]")}>{label}</span>
    </div>
  );
}

/** Facts as a path: short line-and-arrow connectors between them, level with the figures. */
function ConnectedStrip({ items, dark }: { items: { value: string; label: string }[]; dark: boolean }) {
  return (
    <ol
      className={cn(
        "m-0 flex list-none flex-col gap-4 border-y p-0 py-10 sm:flex-row sm:items-start sm:gap-6",
        dark ? "border-white/25" : "border-[var(--color-divider)]",
      )}
    >
      {items.map((f, i) => (
        <Fragment key={f.label}>
          {i > 0 ? <StepArrow /> : null}
          <li className="min-w-0 sm:flex-1">
            <Fact value={f.value} label={f.label} dark={dark} />
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

/** Short arrow from one step to the next: right on wider screens, down on phones. */
export function StepArrow() {
  return (
    <li
      aria-hidden
      className="flex flex-none items-center text-[var(--color-spot)] sm:mt-[clamp(14px,1.4vw,22px)] sm:w-[clamp(40px,5vw,72px)]"
    >
      <span className="hidden h-px flex-1 bg-current opacity-60 sm:block" />
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="-ml-px hidden sm:block"
      >
        <path d="M1 1l9 6-9 6" />
      </svg>
      <svg width="14" height="28" viewBox="0 0 14 28" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-3 sm:hidden">
        <path d="M7 1v25M1 20l6 6 6-6" />
      </svg>
    </li>
  );
}
