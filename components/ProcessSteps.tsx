// PLACEHOLDER copy: confirm process descriptions.
const STEPS = [
  { title: "Consult", body: "We meet at the house, walk the site and talk through what you need and what it might cost." },
  { title: "Concept", body: "Sketches and plan options that test the big moves before any detail is drawn." },
  { title: "Drawings", body: "Construction drawings and permit sets, coordinated with engineers and the city." },
  { title: "Build", body: "Ray stays involved through construction to answer questions from the field." },
];

// Four tall frames: a callback to the four letter-frames of the R·S·V·P mark.
export function ProcessSteps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {STEPS.map((s, i) => (
        <li
          key={s.title}
          className="group flex min-h-[300px] flex-col border-[1.5px] border-ink bg-surface p-6 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-on-accent lg:min-h-[420px] lg:p-8"
        >
          <span className="display text-[64px] leading-none font-extralight">{String(i + 1).padStart(2, "0")}</span>
          <div className="mt-auto pt-10">
            <h3 className="text-heading">{s.title}</h3>
            <p className="mt-3 text-ink-muted transition-colors group-hover:text-on-accent">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
