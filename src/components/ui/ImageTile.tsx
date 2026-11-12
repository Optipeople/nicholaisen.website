import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";

/**
 * Square photo with a centred title (and optional supporting line) below.
 * Used for the industries and "one machine or a whole factory" grids.
 */
export function ImageTile({
  href,
  image,
  alt,
  title,
  description,
  objectPosition = "50% 50%",
  arrow = false,
}: {
  href: string;
  image: string;
  alt: string;
  title: string;
  description?: string;
  objectPosition?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-[18px] text-center text-[var(--color-text)] hover:text-[var(--color-accent-500)]"
    >
      <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[var(--color-accent-200)]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1320px) 300px, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      <div>
        <div className="text-heading-2">
          {title}
          {arrow ? <span className="text-[var(--color-accent-400)]"> →</span> : null}
        </div>
        {description ? <div className="text-meta mt-1.5">{description}</div> : null}
      </div>
    </Link>
  );
}

/** Auto-fitting grid of ImageTiles (min 240px per column). */
export function ImageTileGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-8">
      {children}
    </div>
  );
}
