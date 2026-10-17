import type { Metadata } from "next";
import { Jost, Oswald } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["200", "300", "400", "500"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rsvparchitect.com"),
  title: { default: "RSVP Architecture | Ray P. Spehar, Architect", template: "%s | RSVP Architecture" },
  description: "Residential architecture by Ray P. Spehar: custom homes, remodels, additions and ADUs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} ${jost.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only z-50 bg-surface px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
