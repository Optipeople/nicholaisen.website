"use client";

import { usePathname } from "next/navigation";

/**
 * The footer element. On the homepage it's white (data-light), so the page
 * doesn't end dark-light-dark after the navy timeline; elsewhere it's navy.
 * Children style themselves with `group-data-[light]:` variants.
 */
export function FooterShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const home = /^\/(da|sv|et|lt|lv|en)?\/?$/.test(pathname);
  return (
    <footer
      data-light={home ? "" : undefined}
      className="group bg-[var(--color-navy-900)] text-white data-[light]:border-t data-[light]:border-[var(--color-divider)] data-[light]:bg-white data-[light]:text-[var(--color-text)]"
    >
      {children}
    </footer>
  );
}
