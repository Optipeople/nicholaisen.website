import { cn } from "@/lib/cn";

type SectionProps = {
  as?: "section" | "div" | "article" | "header" | "footer";
  tone?: "cream" | "paper" | "navy" | "white" | "beige";
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
  children: React.ReactNode;
};

const tones = {
  cream: "bg-[var(--color-cream-50)] text-[var(--color-ink-700)]",
  paper: "bg-[var(--color-paper)] text-[var(--color-ink-700)]",
  beige: "bg-[var(--color-beige-200)] text-[var(--color-ink-900)]",
  navy: "bg-[var(--color-navy-900)] text-[var(--color-cream-50)]",
  white: "bg-white text-[var(--color-ink-700)]",
} as const;

const sizes = {
  sm: "py-16 lg:py-24",
  md: "py-20 lg:py-32",
  lg: "py-24 lg:py-40",
} as const;

export function Section({
  as: Tag = "section",
  tone = "cream",
  size = "md",
  className,
  id,
  children,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(tones[tone], sizes[size], className)}>
      {children}
    </Tag>
  );
}
