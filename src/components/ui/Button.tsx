import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-navy-900)] text-[var(--color-cream-50)] hover:bg-[var(--color-navy-700)]",
  secondary:
    "bg-transparent text-[var(--color-navy-900)] border border-[var(--color-navy-900)]/20 hover:border-[var(--color-navy-900)]/60",
  ghost: "bg-transparent text-[var(--color-navy-900)] hover:bg-[var(--color-paper-dark)]",
  inverse:
    "bg-[var(--color-cream-50)] text-[var(--color-navy-900)] hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
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
