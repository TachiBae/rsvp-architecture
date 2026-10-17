import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export async function SiteFooter() {
  "use cache"; // static shell; the year refreshes whenever the cache revalidates
  return (
    <footer className="bg-deep text-on-deep">
      <div className="wrap border-b border-on-deep/15 pt-20 pb-16">
        <Link href="/contact" className="group inline-flex items-center gap-6">
          <span className="display text-display-l transition-colors group-hover:text-terracotta-soft">Start a project</span>
          <ArrowRight size={40} weight="light" className="transition-transform group-hover:translate-x-2" aria-hidden />
        </Link>
      </div>
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1fr_auto_auto] md:gap-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-[36ch] text-on-deep-muted">Residential architecture by Ray P. Spehar, Architect.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-terracotta-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="space-y-2 not-italic">
          <a href="tel:+18184291809" className="block transition-colors hover:text-terracotta-soft">
            818-429-1809
          </a>
          <a href="mailto:rsvparchitecture@gmail.com" className="block transition-colors hover:text-terracotta-soft">
            rsvparchitecture@gmail.com
          </a>
        </address>
      </div>
      <div className="wrap border-t border-on-deep/15 py-6 text-caption text-on-deep-muted">
        © {new Date().getFullYear()} RSVP Architecture
      </div>
    </footer>
  );
}
