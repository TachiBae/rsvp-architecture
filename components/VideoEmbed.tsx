"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";

// Click-to-load facade: no YouTube scripts until the visitor asks for the video.
export function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden bg-deep">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full" aria-label={`Play video: ${title}`}>
          {/* hqdefault is 4:3 letterboxed; object-cover in a 16:9 box crops the bars away. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="absolute inset-0 size-full object-cover opacity-85" />
          <span className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full bg-terracotta text-on-accent transition-transform group-hover:scale-[1.04] group-active:scale-[.98]">
            <Play size={28} weight="fill" />
          </span>
        </button>
      )}
    </div>
  );
}
