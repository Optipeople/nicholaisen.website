import { cn } from "@/lib/cn";

/**
 * Small uppercase label above a heading (14px, 0.1em tracking).
 * `line` adds the 24px orange dash in front, as on statement blocks.
 */
export function Kicker({
  children,
  line = false,
  className,
}: {
  children: React.ReactNode;
  line?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-kicker flex items-center gap-3 text-[var(--color-accent-500)]",
        !line && "block",
        className,
      )}
    >
      {line ? <span aria-hidden className="block h-[2px] w-6 flex-none bg-[var(--color-spot)]" /> : null}
      {children}
    </span>
  );
}
