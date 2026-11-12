import { TileGrid } from "@/components/ui/TileGrid";

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
    <TileGrid
      title={title}
      intro={intro}
      cutout
      tiles={machinery.map(({ key, image }) => ({ key, href: "/contact", image, ...items[key] }))}
    />
  );
}
