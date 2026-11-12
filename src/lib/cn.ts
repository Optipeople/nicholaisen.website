import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The shared typography classes in globals.css (text-kicker, text-display-2 …)
 * look like text-colour utilities to tailwind-merge, so a colour class such as
 * `text-[var(--color-accent-500)]` would silently remove them. Registering them
 * as font-size classes keeps both.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-1",
            "display-2",
            "display-3",
            "display-page",
            "heading-1",
            "heading-2",
            "heading-3",
            "lede",
            "intro",
            "body",
            "meta",
            "eyebrow",
            "kicker",
            "panel-kicker",
            "stat",
            "stat-lg",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
