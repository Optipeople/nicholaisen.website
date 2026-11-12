"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Variants from the approved design (v3):
 * - solid / light / outline-light: 4px-radius buttons (hero, header).
 * - pill-light / pill-outline-light: rounded buttons on image panels.
 * - pill-outline: rounded navy outline ("All cases →").
 * Legacy variants (primary/secondary/ghost/inverse) remain until the
 * remaining pages move to the new design.
 */
type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "inverse"
  | "solid"
  | "light"
  | "outline-light"
  | "pill-light"
  | "pill-outline-light"
  | "pill-outline"
  | "outline";
type Size = "sm" | "md" | "lg" | "hero" | "panel" | "pill" | "card";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-navy-900)] text-[var(--color-cream-50)] hover:bg-[var(--color-navy-700)]",
  secondary:
    "bg-transparent text-[var(--color-navy-900)] border border-[var(--color-navy-900)]/20 hover:border-[var(--color-navy-900)]/60",
  ghost: "bg-transparent text-[var(--color-navy-900)] hover:bg-[var(--color-paper-dark)]",
  inverse:
    "bg-[var(--color-cream-50)] text-[var(--color-navy-900)] hover:bg-white",
  solid:
    "rounded-[4px] bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-600)] hover:text-white",
  light:
    "rounded-[4px] bg-white text-[var(--color-accent)] hover:bg-[var(--color-accent-100)] hover:text-[var(--color-accent)]",
  "outline-light":
    "rounded-[4px] border border-white text-white font-normal hover:bg-white/12 hover:text-white",
  "pill-light":
    "rounded-full bg-white text-[var(--color-accent)] hover:bg-[var(--color-accent-100)] hover:text-[var(--color-accent)]",
  "pill-outline-light":
    "rounded-full border-[1.5px] border-white text-white hover:bg-white/14 hover:text-white",
  "pill-outline":
    "rounded-full border-[1.5px] border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white",
  outline:
    "rounded-[4px] border border-[var(--color-accent-400)] text-[var(--color-text)] hover:bg-[var(--color-accent-100)] hover:text-[var(--color-text)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
  /** 14×26, 17px — hero buttons */
  hero: "px-[26px] py-[14px] text-[17px] leading-[1.55]",
  /** 11×22, 15px — buttons on image panels (outline variants drop 1px for the border) */
  panel: "px-[22px] py-[11px] text-[15px] leading-[1.55]",
  /** 12×24, 16px — section header pill */
  pill: "px-[24px] py-[12px] text-[16px] leading-[1.55]",
  /** 12×20, 16px regular — card and section buttons (outline variant drops 1px for the border) */
  card: "px-5 py-3 text-[16px] leading-[1.55] font-normal",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", withArrow, className, children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {withArrow ? <ArrowRight className="size-4" aria-hidden /> : null}
    </button>
  );
});

type LinkButtonProps = CommonProps & {
  href: string;
  prefetch?: boolean;
  external?: boolean;
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  withArrow,
  className,
  external,
  prefetch,
  children,
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
        {withArrow ? <ArrowRight className="size-4" aria-hidden /> : null}
      </a>
    );
  }
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
        {withArrow ? <ArrowRight className="size-4" aria-hidden /> : null}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={prefetch} className={classes}>
      {children}
      {withArrow ? <ArrowRight className="size-4" aria-hidden /> : null}
    </Link>
  );
}
