import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section className="wrap pt-16 pb-24">
      <h1 className="display text-display-l">Projects</h1>
      <p className="mt-6 max-w-[56ch] text-body-l text-ink-muted">New homes, remodels, additions and ADUs.</p>
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
