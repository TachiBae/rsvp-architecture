import Link from "next/link";
import { Photo } from "./Photo";
import { formatMeta, type Project } from "@/lib/projects";

export function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`group block ${className}`}>
      <div className="frame">
        <div className="sc-wipe relative aspect-[4/5] overflow-hidden">
          <Photo
            photo={project.heroImage}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="transition-transform group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-heading transition-colors group-hover:text-terracotta">{project.name}</h3>
        <span className="shrink-0 text-eyebrow font-medium tracking-[0.16em] text-olive uppercase">{project.type}</span>
      </div>
      <p className="mt-1 text-caption text-ink-muted">{formatMeta(project)}</p>
    </Link>
  );
}
