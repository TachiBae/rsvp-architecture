import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/Photo";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getProject, projects } from "@/lib/projects";

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.name, description: p.scope } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const facts = [
    ["Scope", project.scope],
    ["Style", project.style],
    ["Services", project.services.join(", ")],
    ["Location", project.location],
    ["Size", `${project.sqFt.toLocaleString("en-US")} sq ft`],
  ];

  return (
    <article>
      <div className="relative h-[min(78dvh,820px)] min-h-[420px] border-b border-line">
        <Photo photo={project.heroImage} priority />
      </div>

      <header className="wrap pt-16">
        <p className="text-eyebrow font-medium tracking-[0.24em] text-olive uppercase">{project.type}</p>
        <h1 className="display mt-4 text-display-l">{project.name}</h1>
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-line py-8 md:grid-cols-[2fr_repeat(4,1fr)]">
          {facts.map(([label, value]) => (
            <div key={label} className={label === "Scope" ? "col-span-2 md:col-span-1" : ""}>
              <dt className="text-caption text-ink-muted">{label}</dt>
              <dd className="mt-2">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="wrap grid gap-12 py-24 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-heading">About the project</h2>
        <div className="max-w-[56ch] space-y-6 text-body-l">
          {project.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {project.beforeAfter && (
        <section className="bg-deep py-24 text-on-deep" aria-labelledby="ba-title">
          <div className="wrap">
            <h2 id="ba-title" className="display text-display-l">Before & after</h2>
            <div className="frame mt-12 text-on-deep">
              <BeforeAfterSlider before={project.beforeAfter.before} after={project.beforeAfter.after} />
            </div>
          </div>
        </section>
      )}

      {project.youtubeId && (
        <section id="video" className="wrap pt-24" aria-labelledby="video-title">
          <h2 id="video-title" className="display text-display-l">Watch the remodel</h2>
          <div className="frame mt-12">
            <VideoEmbed id={project.youtubeId} title={`${project.name} remodel walkthrough`} />
          </div>
        </section>
      )}

      <section className="wrap py-24" aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="display text-display-l">Gallery</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {project.gallery.map((photo, i, all) => {
            // Every third photo runs full width; a last photo that would sit alone does too.
            const wide = i % 3 === 0 || (i === all.length - 1 && i % 3 === 1);
            return (
              <li key={i} className={`frame ${wide ? "md:col-span-2" : ""}`}>
                <div className={`sc-wipe relative ${wide ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                  <Photo photo={photo} sizes={wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <nav aria-label="Next project" className="border-t border-line bg-surface">
        <Link href={`/projects/${next.slug}`} className="group wrap flex flex-wrap items-end justify-between gap-6 py-16">
          <span>
            <span className="block text-caption text-ink-muted">Next project</span>
            <span className="display mt-2 block text-display-l transition-colors group-hover:text-terracotta">{next.name}</span>
          </span>
          <span className="text-caption text-ink-muted">{next.type}, {next.location}</span>
        </Link>
      </nav>
    </article>
  );
}
