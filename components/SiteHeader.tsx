"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { Button } from "./Button";

const NAV = [
  { href: "/#the-house", label: "The villa" },
  { href: "/projects", label: "Projects" },
  { href: "/about#services", label: "Services" },
  { href: "/about#process", label: "Process" },
  { href: "/about", label: "Studio" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  const links = NAV.map((n) => (
    <li key={n.href}>
      <Link
        href={n.href}
        onClick={close}
        aria-current={n.href === pathname || (n.href === "/projects" && pathname.startsWith("/projects/")) ? "page" : undefined}
        className="transition-colors hover:text-terracotta aria-[current=page]:text-terracotta"
      >
        {n.label}
      </Link>
    </li>
  ));

  return (
    <header
      className="sticky top-0 z-30 border-b border-line bg-surface"
      onKeyDown={(e) => e.key === "Escape" && close()}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-8">
        <Link href="/" onClick={close} className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-10 text-[15px]">{links}</ul>
        </nav>
        <div className="hidden lg:block">
          <Button href="/contact">Start a project</Button>
        </div>
        <button
          type="button"
          className="-mr-3 grid size-12 place-items-center transition-transform active:scale-[.98] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} weight="light" /> : <List size={26} weight="light" />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-float lg:hidden"
        >
          <ul className="wrap space-y-5 py-8 text-[19px]">{links}</ul>
          <div className="wrap pb-8">
            <Button href="/contact" variant="solid" className="w-full" onClick={close}>
              Start a project
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
