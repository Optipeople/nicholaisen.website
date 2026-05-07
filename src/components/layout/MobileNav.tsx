"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ChevronDown } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { LinkButton } from "@/components/ui/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex size-10 items-center justify-center rounded-md text-[var(--color-navy-900)] hover:bg-[var(--color-paper-dark)] transition-colors"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[var(--color-navy-950)]/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-[var(--color-cream-50)] p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-[var(--color-navy-900)]">
              Menu
            </Dialog.Title>
            <Dialog.Close
              className="inline-flex size-10 items-center justify-center rounded-md text-[var(--color-navy-900)] hover:bg-[var(--color-paper-dark)]"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <nav className="mt-8 space-y-2">
            {primaryNav.map((section) => {
              const sub = section.categories
                ? section.categories.flatMap((c) => c.items)
                : section.items;

              if (!sub || sub.length === 0) {
                return (
                  <Link
                    key={section.href}
                    href={section.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-4 py-3 text-base font-medium text-[var(--color-ink-900)] hover:bg-[var(--color-paper-dark)]"
                  >
                    {section.title}
                  </Link>
                );
              }

              return (
                <details key={section.href} className="group rounded-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-4 py-3 text-base font-medium text-[var(--color-ink-900)] hover:bg-[var(--color-paper-dark)]">
                    <Link
                      href={section.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                      }}
                    >
                      {section.title}
                    </Link>
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="space-y-1 px-2 pb-2">
                    {section.categories
                      ? section.categories.map((cat) => (
                          <div key={cat.href} className="mt-2">
                            <Link
                              href={cat.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm font-semibold text-[var(--color-navy-900)]"
                            >
                              {cat.title}
                            </Link>
                            <ul className="space-y-0.5">
                              {cat.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-md px-5 py-2 text-sm text-[var(--color-ink-700)] hover:bg-[var(--color-paper-dark)]"
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      : sub.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-4 py-2 text-sm text-[var(--color-ink-700)] hover:bg-[var(--color-paper-dark)]"
                          >
                            {item.title}
                          </Link>
                        ))}
                  </div>
                </details>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-[var(--color-ink-300)]/30 pt-6">
            <LinkButton href="/contact" variant="primary" size="md" className="w-full" withArrow>
              Schedule a call
            </LinkButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
