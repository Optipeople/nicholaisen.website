"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { LinkButton } from "@/components/ui/Button";
import { TileContent, tileClass } from "@/components/ui/TileGrid";
import { FileIcon } from "@/components/ui/icons";

export type CatalogMachine = {
  id: string;
  name: string;
  image: string;
  line: string;
  specs: { label: string; value: string }[];
  /** Product sheets on nichomachines.com. */
  pdfs: { href: string; label: string }[];
};
export type CatalogCategory = { key: string; image: string; title: string; description: string; machines: CatalogMachine[] };

/**
 * "Machinery we deliver": category tiles that open a white side panel (as the
 * mobile menu) listing the category's machines — name, one line, key specs and
 * a quote button to the pre-filled contact form.
 */
export function MachineCatalog({
  title,
  intro,
  categories,
  labels,
}: {
  title: string;
  intro: string;
  categories: CatalogCategory[];
  labels: { quote: string; close: string; count: string; see: string; panelIntro: string; contact: string };
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const current = categories.find((c) => c.key === openKey);

  return (
    <section className="site-container section-top">
      <h2 className="text-display-2 m-0 mb-[18px]">{title}</h2>
      <p className="text-intro mt-0 mb-14 max-w-[62ch]">{intro}</p>

      <Dialog.Root open={!!current} onOpenChange={(o) => !o && setOpenKey(null)}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-x-7 gap-y-10">
          {categories.map((c) => (
            <button key={c.key} type="button" onClick={() => setOpenKey(c.key)} className={`${tileClass} cursor-pointer`}>
              <TileContent tile={{ ...c, description: "" }} cutout />
              <span className="-mt-2 text-[15px] font-medium text-[var(--color-accent)]">
                {labels.see} ({c.machines.length}) →
              </span>
            </button>
          ))}
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50" style={{ background: "color-mix(in srgb, #003050 40%, transparent)" }} />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[520px] flex-col overflow-y-auto bg-white text-[var(--color-text)] shadow-[0_16px_40px_color-mix(in_srgb,#003050_16%,transparent)]"
          >
            {current ? (
              <>
                <div className="sticky top-0 z-[1] flex items-start justify-between gap-4 border-b border-[var(--color-divider)] bg-white px-[clamp(20px,5vw,32px)] py-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow">{labels.count.replace("{count}", String(current.machines.length))}</span>
                    <Dialog.Title className="text-heading-1 m-0">{current.title}</Dialog.Title>
                  </div>
                  <Dialog.Close
                    aria-label={labels.close}
                    className="-mr-2 inline-flex size-11 flex-none cursor-pointer items-center justify-center text-[var(--color-text)]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </Dialog.Close>
                </div>

                <p className="text-meta m-0 px-[clamp(20px,5vw,32px)] pt-5">{labels.panelIntro}</p>

                <ul className="m-0 flex list-none flex-col px-[clamp(20px,5vw,32px)] pb-4">
                  {current.machines.map((m) => (
                    <li key={m.id} className="flex flex-col gap-3 border-b border-[var(--color-divider)] py-6 last:border-b-0">
                      {/* Product cut-out on white, as on the category tiles. */}
                      <div className="box-border flex aspect-[2/1] items-center justify-center overflow-hidden rounded-[12px] border border-[var(--color-divider)] bg-white p-4">
                        {/* eslint-disable-next-line @next/next/no-img-element -- external product photos */}
                        <img src={m.image} alt={m.name} loading="lazy" className="block max-h-full max-w-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <h3 className="text-heading-3 m-0">{m.name}</h3>
                        <p className="text-meta mt-1 mb-0">{m.line}</p>
                      </div>
                      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-x-5 gap-y-3">
                        {m.specs.map((s) => (
                          <div key={s.label} className="flex flex-col gap-0.5">
                            <dt className="text-label text-[var(--color-accent-500)]">{s.label}</dt>
                            <dd className="m-0 text-[16px] leading-[1.45] font-medium tabular-nums">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <LinkButton
                          href={`/contact?topic=machines&choice=${encodeURIComponent(m.name)}`}
                          variant="outline"
                          size="card"
                          className="py-[9px]"
                        >
                          {labels.quote} →
                        </LinkButton>
                        {m.pdfs.map((pdf) => (
                          <a
                            key={pdf.href}
                            href={pdf.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
                          >
                            <FileIcon size={16} />
                            {pdf.label} <span aria-hidden>↗</span>
                          </a>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-end border-t border-[var(--color-divider)] px-[clamp(20px,5vw,32px)] py-6">
                  <LinkButton href="/contact?topic=machines" variant="solid" size="panel" className="px-5 text-[15px] font-medium">
                    {labels.contact}
                  </LinkButton>
                </div>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
