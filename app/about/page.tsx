import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { ServicesPanel } from "@/components/ServicesPanel";
import { ProcessSteps } from "@/components/ProcessSteps";
import { STUDIO_PORTRAIT } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Studio",
  description: "Ray P. Spehar, Architect: bio, approach, services and credentials.",
};

// PLACEHOLDER: confirm every credential before launch.
const CREDENTIALS = [
  "Licensed Architect, State of California (license no. to confirm)",
  "Degree and school to confirm",
  "Professional memberships to confirm",
];

export default function AboutPage() {
  return (
    <>
      <section className="wrap grid items-start gap-12 pt-16 pb-24 md:grid-cols-[3fr_2fr] lg:gap-24">
        <div>
          <h1 className="display text-display-xl">Ray P. Spehar, Architect</h1>
          {/* PLACEHOLDER bio */}
          <div className="mt-10 max-w-[56ch] space-y-6 text-body-l text-ink-muted">
            <p>
              RSVP Architecture is the residential practice of Ray P. Spehar. The studio is deliberately small: Ray meets every
              client, designs every project and draws every set.
            </p>
            <p>
              Most of the work is houses people already live in, reworked to fit how they live now, along with new homes and
              ADUs for families who want to stay put and build up or out.
            </p>
          </div>
        </div>
        <div className="frame md:mt-4">
          <div className="relative aspect-[4/5]">
            <Photo photo={STUDIO_PORTRAIT} label="Portrait" priority sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-display-l">Approach</h2>
          {/* PLACEHOLDER philosophy */}
          <div className="max-w-[56ch] space-y-6 text-body-l">
            <p>Start with the house and the people in it. What works stays; what doesn&rsquo;t gets rethought.</p>
            <p>
              Spend the budget where you feel it every day: light, plan and the rooms you use most. Keep the rest simple and
              well built.
            </p>
            <p>Draw it clearly, so contractors can price it honestly and build it without guessing.</p>
          </div>
        </div>
      </section>

      <ServicesPanel id="services" />

      <section id="process" className="wrap py-24">
        <h2 className="display text-display-l">Process</h2>
        <div className="mt-14">
          <ProcessSteps />
        </div>
      </section>

      <section className="wrap grid gap-12 border-t border-line py-24 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-heading">Credentials</h2>
        <div>
          <ul className="max-w-[56ch] space-y-4 text-body-l">
            {CREDENTIALS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <Button href="/contact" variant="solid" className="mt-12">
            Start a project
          </Button>
        </div>
      </section>
    </>
  );
}
