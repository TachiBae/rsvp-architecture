"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { PROJECT_TYPES, type Project, type ProjectType } from "@/lib/projects";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectType | "All">("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <div role="group" aria-label="Filter by project type" className="flex flex-wrap gap-2">
        {(["All", ...PROJECT_TYPES] as const).map((t) => (
          <Chip key={t} pressed={filter === t} onClick={() => setFilter(t)}>
            {t}
          </Chip>
        ))}
      </div>
      <p className="mt-4 text-caption text-ink-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      {shown.length ? (
        <ul className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border-[1.5px] border-dashed border-line px-6 py-20 text-center">
          <p className="text-heading">Nothing here yet</p>
          <p className="mt-2 text-ink-muted">No {filter.toLowerCase()} projects to show. Try another filter.</p>
        </div>
      )}
    </>
  );
}

export function Chip({ pressed, ...props }: { pressed: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className="h-10 border-[1.5px] border-line bg-surface px-4 text-[15px] transition-[color,background-color,border-color,transform] hover:border-ink active:scale-[.98] aria-pressed:border-terracotta aria-pressed:bg-terracotta-soft aria-pressed:text-ink"
      {...props}
    />
  );
}
