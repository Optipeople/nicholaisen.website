import Image from "next/image";
import Link from "next/link";
import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className={cn("text-display-2 mt-12 mb-6 text-balance", props.className)}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={cn(
        "text-display-3 mt-14 mb-5 scroll-mt-28 text-balance",
        props.className,
      )}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className={cn("mt-10 mb-3 text-xl font-semibold scroll-mt-28", props.className)}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className={cn(
        "my-5 text-[1.0625rem] leading-[1.7] text-[var(--color-ink-700)]",
        props.className,
      )}
    />
  ),
  a: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-[var(--color-navy-900)] underline decoration-[var(--color-navy-900)]/30 underline-offset-4 hover:decoration-[var(--color-navy-900)]"
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-[var(--color-navy-900)] underline decoration-[var(--color-navy-900)]/30 underline-offset-4 hover:decoration-[var(--color-navy-900)]"
        {...props}
      />
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className={cn("my-5 list-disc space-y-2 pl-6", props.className)} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className={cn("my-5 list-decimal space-y-2 pl-6", props.className)} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className={cn("text-[1.0625rem] leading-[1.7]", props.className)} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className={cn(
        "my-8 border-l-2 border-[var(--color-tan-500)] pl-6 text-xl italic text-[var(--color-ink-900)]",
        props.className,
      )}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      {...props}
      className={cn("my-12 border-0 divider-hairline", props.className)}
    />
  ),
  img: ({ src, alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="my-10 block">
      <Image
        src={String(src)}
        alt={alt}
        width={1200}
        height={800}
        className="w-full rounded-lg object-cover"
        {...(rest as Record<string, unknown>)}
      />
    </span>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className={cn(
        "rounded bg-[var(--color-paper-dark)] px-1.5 py-0.5 font-mono text-sm",
        props.className,
      )}
    />
  ),

  // Custom MDX components
  Callout,
  Figure,
  PullQuote,
  MetricRow,
};

function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn" | "accent";
  title?: string;
  children: React.ReactNode;
}) {
  const tones = {
    info: "border-[var(--color-navy-900)]/15 bg-[var(--color-paper)]",
    warn: "border-[var(--color-tan-500)]/40 bg-[var(--color-tan-300)]/20",
    accent: "border-[var(--color-navy-900)]/40 bg-[var(--color-navy-900)] text-[var(--color-cream-50)]",
  } as const;
  return (
    <aside className={cn("my-8 rounded-lg border p-6", tones[tone])}>
      {title ? <p className="text-eyebrow mb-2">{title}</p> : null}
      <div className="text-[0.95rem] leading-relaxed">{children}</div>
    </aside>
  );
}

function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1067}
        className="w-full rounded-lg object-cover"
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-ink-500)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <figure className="my-12 border-y border-[var(--color-ink-300)]/40 py-8 text-center">
      <blockquote className="mx-auto max-w-3xl text-2xl font-medium leading-snug text-[var(--color-ink-900)] text-balance">
        “{children}”
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-sm text-[var(--color-ink-500)]">
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MetricRow({
  metrics,
}: {
  metrics: { label: string; value: string }[];
}) {
  return (
    <div className="my-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="border-l-2 border-[var(--color-tan-500)] pl-4">
          <p className="text-display-3 leading-none text-[var(--color-navy-900)]">{m.value}</p>
          <p className="mt-2 text-sm text-[var(--color-ink-500)]">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
