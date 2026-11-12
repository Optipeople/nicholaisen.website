import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Title + supporting line + arrow, with a hairline underneath.
 * Used in the homepage start card and the Solutions menu.
 */
export function LinkRow({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  const className =
    "group flex items-center justify-between gap-4 border-b border-[var(--color-accent-200)] py-[14px] text-[var(--color-text)] hover:text-[var(--color-accent-500)]";
  const content = (
    <>
      <span className="flex flex-col gap-1">
        <strong className="text-heading-3">{title}</strong>
        <span className="text-meta">{description}</span>
      </span>
      <ArrowRightIcon className="flex-none" />
    </>
  );
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/** Responsive two/three-column grid of LinkRows. */
export function LinkRowGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10">
      {children}
    </div>
  );
}
