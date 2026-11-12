/**
 * The footer element: white on every page, with the newsletter in a navy box.
 * Children style themselves with `group-data-[light]:` variants, so the navy
 * version can come back by dropping `data-light`.
 */
export function FooterShell({ children }: { children: React.ReactNode }) {
  return (
    <footer
      data-light=""
      className="group bg-[var(--color-navy-900)] text-white data-[light]:border-t data-[light]:border-[var(--color-divider)] data-[light]:bg-white data-[light]:text-[var(--color-text)]"
    >
      {children}
    </footer>
  );
}
