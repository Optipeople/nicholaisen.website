import type { ReactNode } from "react";
import { Inter_Tight } from "next/font/google";
import "@/styles/globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${interTight.variable} min-h-screen bg-[var(--color-cream-50)] text-[var(--color-ink-700)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
