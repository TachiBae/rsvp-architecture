import type { Metadata } from "next";
import { ContactPanel } from "@/components/ContactPanel";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with RSVP Architecture. Call 818-429-1809 or email rsvparchitecture@gmail.com.",
};

export default function ContactPage() {
  return (
    <>
      <section className="wrap pt-16 pb-24">
        <h1 className="display text-display-xl">Start a project</h1>
        <p className="mt-8 max-w-[56ch] text-body-l text-ink-muted">
          Call, email or send a few details below. Ray answers every inquiry personally.
        </p>
        <div className="mt-16">
          <ContactPanel />
        </div>
      </section>

      <section className="bg-stucco py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-heading">Service area</h2>
            {/* PLACEHOLDER: confirm service area. */}
            <p className="mt-4 max-w-[40ch] text-ink-muted">
              Homes across Los Angeles and the San Fernando Valley. Outside that? Ask anyway.
            </p>
          </div>
          {/* shortcut: hatched map placeholder; swap for a static map image or embed once the area is confirmed. */}
          <div className="frame">
            <div role="img" aria-label="Map of the service area (placeholder)" className="hatch grid aspect-[16/9] place-items-center">
              <span className="bg-stucco px-2 text-caption font-medium tracking-[0.24em] text-ink-muted uppercase">Map</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
