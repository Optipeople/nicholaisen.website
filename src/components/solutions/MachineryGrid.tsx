import { LocaleLink as Link } from "@/components/ui/LocaleLink";

/** Product photos supplied by NichoMachines (loaded from their site, as in the design). */
const machinery = [
  { key: "panelSaws", image: "https://nichomachines.com/wp-content/uploads/2025/07/NPC330-scaled.webp" },
  { key: "edgebanders", image: "https://nichomachines.com/wp-content/uploads/2025/09/NB7PCG-PC.png" },
  { key: "nesting", image: "https://nichomachines.com/wp-content/uploads/2025/07/NBC332-01.png" },
  { key: "cnc", image: "https://nichomachines.com/wp-content/uploads/2025/09/NCP3312Z2.png" },
  { key: "drilling", image: "https://nichomachines.com/wp-content/uploads/2025/07/NCB612-01.png" },
  { key: "moulding", image: "https://nichomachines.com/wp-content/uploads/2026/02/UMX.png" },
  { key: "sanding", image: "https://nichomachines.com/wp-content/uploads/2026/08/Sanding-machine-Photoroom.png" },
  { key: "framePresses", image: "https://nichomachines.com/wp-content/uploads/2026/04/TITANPRESS-TX.png" },
  { key: "packaging", image: "https://nichomachines.com/wp-content/uploads/2025/10/NKP16D.png" },
  { key: "cobots", image: "https://nichomachines.com/wp-content/uploads/2025/07/Cobot.png" },
  { key: "robots", image: "https://nichomachines.com/wp-content/uploads/2025/08/image-2.png" },
  { key: "palletizing", image: "https://nichomachines.com/wp-content/uploads/2026/02/co-palletizer-12.png" },
] as const;

export type MachineryKey = (typeof machinery)[number]["key"];

/** "Machinery we deliver" — product cut-outs on white cards. */
export function MachineryGrid({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: Record<MachineryKey, { title: string; description: string }>;
}) {
  return (
    <section className="site-container section-top">
      <h2 className="text-display-2 m-0 mb-[18px]">{title}</h2>
      <p className="text-intro mt-0 mb-14 max-w-[62ch]">{intro}</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-x-7 gap-y-10">
        {machinery.map(({ key, image }) => (
          <Link
            key={key}
            href="/contact"
            className="flex flex-col gap-4 text-[var(--color-text)] hover:text-[var(--color-accent-500)]"
          >
            <div className="box-border flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[12px] border border-[var(--color-divider)] bg-white p-5">
              {/* eslint-disable-next-line @next/next/no-img-element -- external product cut-outs */}
              <img
                src={image}
                alt={items[key].title}
                loading="lazy"
                className="block max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>
            <div>
              <div className="text-[19px] leading-[1.55] font-medium">{items[key].title}</div>
              <div className="text-meta mt-1">{items[key].description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
