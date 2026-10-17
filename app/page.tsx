import Link from "next/link";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Photo } from "@/components/Photo";
import { ProjectCard } from "@/components/ProjectCard";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { getProject, projects, type Photo as PhotoData } from "@/lib/projects";
import { STUDIO_PORTRAIT } from "@/lib/studio";
import { VILLA } from "@/lib/villa";

const link = "underline decoration-[1.5px] underline-offset-4 transition-colors";

export default function Home() {
  const villa = getProject(VILLA.slug)!;
  const more = projects.filter((p) => p.slug !== VILLA.slug).slice(0, 3);
  const [living, kitchen, suite, garden] = VILLA.spaces;

  return (
    <>
      {/* Hero: the villa, full bleed. The inset rule is the Frame used as a viewfinder. */}
      <section>
        <div className="relative overflow-hidden h-[48dvh] min-h-[300px] md:h-[min(68dvh,680px)] md:min-h-[440px]">
          <Photo photo={villa.heroImage} priority sizes="100vw" className="sc-hero-drift" />
          <div aria-hidden className="pointer-events-none absolute inset-4 border-[1.5px] border-on-deep/70 md:inset-6" />
        </div>
        <div className="wrap relative -mt-24 grid gap-10 md:-mt-44 lg:grid-cols-[minmax(0,44rem)_1fr] lg:items-end lg:gap-16">
          <div className="border-[1.5px] border-ink bg-paper p-6 md:p-10">
            <Eyebrow>A home by RSVP Architecture</Eyebrow>
            <h1 className="display mt-6 text-display-xl">{villa.name}</h1>
            <p className="mt-6 max-w-[46ch] text-body-l text-ink-muted">{VILLA.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={VILLA.bookingUrl} variant="solid">
                Check availability
              </Button>
              <Button href={`/projects/${villa.slug}#video`}>Watch the remodel</Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-2 lg:pb-2 xl:grid-cols-4">
            <Stat label="Guests">{VILLA.guests}</Stat>
            <Stat label="Bedrooms">{VILLA.bedrooms}</Stat>
            <Stat label="Baths">{VILLA.baths}</Stat>
            <Stat label="Sq ft">{villa.sqFt.toLocaleString("en-US")}</Stat>
          </dl>
        </div>
      </section>

      {/* The house, space by space: one wide, two up, one panoramic. */}
      <section id="the-house" className="wrap py-24 md:py-36">
        <h2 className="sc-reveal display text-display-l">The house</h2>
        <p className="sc-reveal mt-6 max-w-[48ch] text-body-l text-ink-muted">{VILLA.intro}</p>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Figure photo={living.photo} ratio="aspect-[4/3] lg:aspect-[16/10]" className="lg:col-span-8" sizes="(min-width: 1024px) 60vw, 100vw" />
          <Caption {...living} className="lg:col-span-4 lg:pb-4" />
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-12">
          {[kitchen, suite].map((s, i) => (
            // The second portrait drops so the pair doesn't read as a template row.
            <div key={s.name} className={i === 1 ? "md:mt-32" : ""}>
              <Figure photo={s.photo} ratio="aspect-[4/5]" sizes="(min-width: 768px) 45vw, 100vw" />
              <Caption {...s} className="mt-6" />
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Figure photo={garden.photo} ratio="aspect-[4/3] md:aspect-[21/9]" sizes="100vw" />
          <Caption {...garden} className="mt-6 md:grid md:grid-cols-[1fr_2fr] md:gap-12" />
        </div>
      </section>

      {/* The remodel */}
      {villa.beforeAfter && (
        <section className="bg-deep py-24 text-on-deep">
          <div className="wrap">
            <h2 className="sc-reveal display text-display-l">The remodel</h2>
            <p className="sc-reveal mt-6 max-w-[48ch] text-body-l text-on-deep-muted">
              Drag the handle to compare the house before and after.
            </p>
            <div className="frame mt-12 text-on-deep">
              <BeforeAfterSlider before={villa.beforeAfter.before} after={villa.beforeAfter.after} />
            </div>
            <dl className="mt-12 grid gap-8 border-t border-on-deep/20 pt-8 md:grid-cols-[2fr_1fr_1fr]">
              <Fact label="Scope">{villa.scope}</Fact>
              <Fact label="Style">{villa.style}</Fact>
              <Fact label="Services">{villa.services.join(", ")}</Fact>
            </dl>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <Link href={`/projects/${villa.slug}#video`} className={`${link} decoration-terracotta hover:text-terracotta-soft`}>
                Watch the remodel
              </Link>
              <Link href={`/projects/${villa.slug}`} className={`${link} decoration-on-deep/40 hover:text-terracotta-soft`}>
                Project details
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      <section className="bg-stucco py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
          <h2 className="sc-reveal display text-display-l">Amenities</h2>
          <ul className="grid gap-x-10 sm:grid-cols-2 xl:grid-cols-3">
            {VILLA.amenities.map((a) => (
              <li key={a} className="sc-reveal border-t border-ink/15 py-4 text-body-l">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stay: booking panel over a photo */}
      <section id="stay" className="relative overflow-hidden py-16 md:py-32">
        <Photo photo={VILLA.stayPhoto} sizes="100vw" className="sc-parallax" />
        <div className="wrap relative flex md:justify-end">
          <div className="w-full max-w-xl border-[1.5px] border-ink bg-paper p-6 md:p-10">
            <h2 className="display text-display-l">Stay at {villa.name}</h2>
            <p className="mt-6 text-body-l text-ink-muted">
              Sleeps {VILLA.guests} in {VILLA.bedrooms} bedrooms. Book through Airbnb.
            </p>
            <Button href={VILLA.bookingUrl} variant="solid" className="mt-8">
              Check availability
            </Button>
          </div>
        </div>
      </section>

      {/* The architect */}
      <section className="bg-surface py-24">
        <div className="wrap grid items-center gap-12 md:grid-cols-[2fr_3fr] lg:gap-24">
          <div className="frame max-w-md">
            <div className="relative aspect-[4/5]">
              <Photo photo={STUDIO_PORTRAIT} label="Portrait" sizes="(min-width: 768px) 35vw, 100vw" />
            </div>
          </div>
          <div>
            <h2 className="sc-reveal display text-display-l">Homes, reconsidered.</h2>
            {/* PLACEHOLDER bio */}
            <p className="mt-8 max-w-[52ch] text-body-l text-ink-muted">
              {villa.name} was designed by Ray P. Spehar, Architect. RSVP Architecture is his residential practice: custom
              homes, remodels, additions and ADUs, designed and drawn by Ray himself.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/contact">Start a project</Button>
              <Link href="/about" className={`${link} decoration-terracotta hover:text-terracotta`}>
                About the studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* More work */}
      <section className="wrap py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="sc-reveal display text-display-l">More work</h2>
          <Link href="/projects" className={`${link} decoration-terracotta hover:text-terracotta`}>
            All projects
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Figure({ photo, ratio, sizes, className = "" }: { photo: PhotoData; ratio: string; sizes: string; className?: string }) {
  return (
    <div className={`frame ${className}`}>
      <div className={`sc-wipe relative overflow-hidden ${ratio}`}>
        <Photo photo={photo} sizes={sizes} className="sc-settle" />
      </div>
    </div>
  );
}

function Caption({ name, body, className = "" }: { name: string; body: string; className?: string }) {
  return (
    <div className={`sc-reveal ${className}`}>
      <h3 className="text-heading">{name}</h3>
      <p className="mt-3 max-w-[44ch] text-ink-muted">{body}</p>
    </div>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-caption text-ink-muted">{label}</dt>
      <dd className="display mt-1 text-[2rem] leading-none">{children}</dd>
    </div>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-caption text-on-deep-muted">{label}</dt>
      <dd className="mt-2 max-w-[48ch]">{children}</dd>
    </div>
  );
}
