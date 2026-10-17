"use client";

import { useRef, useState } from "react";
import { Photo } from "./Photo";
import { stock, type Photo as PhotoData } from "@/lib/projects";

// PLACEHOLDER copy and photos: confirm service descriptions, add one photo per service.
const SERVICES: { title: string; body: string; photo: PhotoData }[] = [
  {
    title: "Custom homes",
    body: "New houses designed around the site, the light and the way you actually live.",
    photo: stock("1613977257363-707ba9348227", "A modern custom home"),
  },
  {
    title: "Remodels & additions",
    body: "Rework the house you already have. Open the plan, add a room or add a floor.",
    photo: stock("1600607687939-ce8a6c25118c", "An opened-up living room after a remodel"),
  },
  {
    title: "Plans & permits",
    body: "Permit-ready drawings, and the back-and-forth with the city handled for you.",
    photo: stock("1503387762-592deb58ef4e", "Architectural drawings on a desk"),
  },
  {
    title: "Design consultation",
    body: "Time on site to talk through options and costs before you commit to anything.",
    photo: stock("1600566753190-17f0baa2a6c3", "A house under discussion on site"),
  },
];

// Vertical tabs (after the Flowform inspo): pick a service on the left, see it on the right.
export function ServicesPanel({ id }: { id?: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = SERVICES[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = SERVICES.length;
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + n) % n;
    setActive(i);
    tabs.current[i]?.focus();
  };

  return (
    <section id={id} className="bg-stucco py-24">
      <div className="wrap grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <div>
          <h2 className="display text-display-l">Services</h2>
          <div role="tablist" aria-orientation="vertical" aria-label="Services" onKeyDown={onKeyDown} className="mt-12 grid">
            {SERVICES.map((svc, i) => (
              <button
                key={svc.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`svc-tab-${i}`}
                aria-selected={i === active}
                aria-controls="svc-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className="border-l-[1.5px] border-line py-3.5 pl-6 text-left text-heading text-ink-muted transition-[color,border-color] hover:text-ink aria-selected:border-ink aria-selected:text-ink"
              >
                {svc.title}
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" id="svc-panel" aria-labelledby={`svc-tab-${active}`}>
          <div className="frame">
            <div className="relative aspect-[16/10]">
              <Photo photo={s.photo} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
          </div>
          <p className="mt-8 max-w-[44ch] text-body-l">{s.body}</p>
        </div>
      </div>
    </section>
  );
}
