import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

// latin-ext covers the Baltic letters (ā, ē, ū, ļ, ą, ė, š, ž, ų …) so Estonian,
// Latvian and Lithuanian text stays in Inter; 200 is the light weight of the big figures.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior: Next.js turns the smooth scrolling off while it changes
    // page, so a new page opens at the top instead of gliding up to it.
    <html suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
