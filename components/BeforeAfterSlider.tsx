"use client";

import { useRef } from "react";
import { ArrowsHorizontal } from "@phosphor-icons/react";
import { Photo } from "./Photo";
import type { Photo as PhotoData } from "@/lib/projects";

// Drag (mouse/touch), click-to-jump, or arrow keys on the handle. Position is written straight
// to a CSS variable so dragging never re-renders React.
export function BeforeAfterSlider({ before, after, className = "" }: { before: PhotoData; after: PhotoData; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const pos = useRef(50);

  const set = (v: number) => {
    pos.current = Math.min(100, Math.max(0, v));
    root.current?.style.setProperty("--pos", `${pos.current}%`);
    handle.current?.setAttribute("aria-valuenow", String(Math.round(pos.current)));
  };
  // First touch ends the scroll-driven sweep; start from wherever it left the handle.
  const takeOver = () => {
    const el = root.current!;
    if (el.dataset.touched !== undefined) return;
    const live = parseFloat(getComputedStyle(el).getPropertyValue("--pos"));
    el.dataset.touched = "";
    if (!Number.isNaN(live)) set(live);
  };
  const fromPointer = (x: number) => {
    const r = root.current!.getBoundingClientRect();
    set(((x - r.left) / r.width) * 100);
  };

  return (
    <div
      ref={root}
      style={{ "--pos": "50%" } as React.CSSProperties}
      className={`sc-sweep relative aspect-[16/10] cursor-ew-resize touch-pan-y overflow-hidden select-none ${className}`}
      onPointerDown={(e) => {
        if (!e.isPrimary) return;
        takeOver();
        e.currentTarget.setPointerCapture(e.pointerId);
        fromPointer(e.clientX);
        handle.current?.focus({ preventScroll: true });
      }}
      onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && fromPointer(e.clientX)}
    >
      <Photo photo={after} label="" sizes="(min-width: 1024px) 80vw, 100vw" className="bg-surface" />
      <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}>
        <Photo photo={before} label="" sizes="(min-width: 1024px) 80vw, 100vw" />
      </div>
      <Label className="left-4">Before</Label>
      <Label className="right-4">After</Label>
      <div className="pointer-events-none absolute inset-y-0 left-[var(--pos)] w-[1.5px] -translate-x-1/2 bg-surface" />
      <div
        ref={handle}
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        aria-valuetext="Percent of before image shown"
        onKeyDown={(e) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
          takeOver();
          const step = e.shiftKey ? 10 : 2;
          const next = { ArrowLeft: pos.current - step, ArrowRight: pos.current + step, Home: 0, End: 100 }[e.key];
          if (next === undefined) return;
          e.preventDefault();
          set(next);
        }}
        className="absolute top-1/2 left-[var(--pos)] grid size-12 -translate-1/2 place-items-center rounded-full border-[1.5px] border-surface bg-terracotta text-on-accent focus-visible:outline-surface"
      >
        <ArrowsHorizontal size={22} aria-hidden />
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`pointer-events-none absolute bottom-4 bg-surface px-2.5 py-1 text-eyebrow font-medium tracking-[0.24em] text-ink uppercase ${className}`}>
      {children}
    </span>
  );
}
