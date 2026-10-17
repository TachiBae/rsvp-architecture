import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="wrap py-32">
      <h1 className="display text-display-l">Page not found</h1>
      <p className="mt-6 max-w-[56ch] text-body-l text-ink-muted">That page doesn&rsquo;t exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/" variant="solid">Home</Button>
        <Button href="/projects">View projects</Button>
      </div>
    </section>
  );
}
