import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { cn } from "@/lib/cn";

export type Tile = { key: string; href: string; image: string; title: string; description: string; objectPosition?: string };

export const tileClass = "group flex flex-col gap-4 text-left text-[var(--color-text)] hover:text-[var(--color-accent-500)]";

/**
 * Heading, intro and a grid of 4:3 tiles with a title and line underneath —
 * "Machinery we deliver" and the industries overview.
 * `cutout`: product cut-outs, centred on white; otherwise photos fill the tile.
 */
export function TileGrid({
  title,
  intro,
  tiles,
  cutout = false,
}: {
  title: string;
  intro: string;
  tiles: Tile[];
  cutout?: boolean;
}) {
  return (
    <section className="site-container section-top">
      <h2 className="text-display-2 m-0 mb-[18px]">{title}</h2>
      <p className="text-intro mt-0 mb-14 max-w-[62ch]">{intro}</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-x-7 gap-y-10">
        {tiles.map((tile) => (
          <Link
            key={tile.key}
            href={tile.href}
            className={tileClass}
          >
            <TileContent tile={tile} cutout={cutout} />
          </Link>
        ))}
      </div>
    </section>
  );
}

/** A tile's photo and text; shared by link tiles and the machine category buttons. */
export function TileContent({ tile, cutout = false }: { tile: Omit<Tile, "href">; cutout?: boolean }) {
  return (
    <>
      <div
        className={cn(
          "box-border flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[12px] border border-[var(--color-divider)]",
          cutout ? "bg-white p-5" : "bg-[var(--color-accent-200)]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- also used for external product cut-outs */}
        <img
          src={tile.image}
          alt={tile.title}
          loading="lazy"
          style={tile.objectPosition ? { objectPosition: tile.objectPosition } : undefined}
          className={cn(
            "block",
            cutout
              ? "max-h-full max-w-full object-contain mix-blend-multiply"
              : "size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
          )}
        />
      </div>
      <div>
        <div className="text-[19px] leading-[1.55] font-medium">{tile.title}</div>
        <div className="text-meta mt-1">{tile.description}</div>
      </div>
    </>
  );
}
