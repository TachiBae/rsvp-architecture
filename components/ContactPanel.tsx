"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Chip } from "./ProjectGrid";

const EMAIL = "rsvparchitecture@gmail.com";
const TYPES = ["New home", "Remodel", "Addition", "ADU", "Not sure yet"];

const field =
  "w-full rounded-[2px] border-[1.5px] border-line bg-surface px-4 py-3 text-ink transition-colors placeholder:text-ink-muted hover:border-ink-muted focus-visible:border-ink aria-[invalid=true]:border-terracotta";

export function ContactPanel() {
  const [type, setType] = useState("Not sure yet");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  // shortcut: opens the visitor's mail app (mailto) because there is no backend yet;
  // swap for a server action + email service when one exists.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();
    const next: Record<string, string> = {};
    if (!name) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter an email address like name@example.com.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    const body = `${message}\n\nProject type: ${type}\nName: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Project inquiry: ${type}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[5fr_7fr] lg:gap-8">
      <div className="space-y-10 border-[1.5px] border-ink bg-surface p-6 md:p-10">
        <ContactLink label="Call" href="tel:+18184291809" text="818-429-1809" />
        <ContactLink label="Email" href={`mailto:${EMAIL}`} text={EMAIL} small />
      </div>

      <form noValidate onSubmit={onSubmit} className="border-[1.5px] border-ink bg-surface p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Field id="name" label="Name" error={errors.name}>
            <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name && "name-error"} />
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email && "email-error"} />
          </Field>
        </div>

        <fieldset className="mt-8">
          <legend className="text-[15px] font-medium">Project type</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <Chip key={t} pressed={type === t} onClick={() => setType(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </fieldset>

        <Field id="message" label="Tell us about the project" hint="Optional. Address, timeline, budget, anything that helps." className="mt-8">
          <textarea id="message" name="message" rows={5} className={`${field} resize-y`} aria-describedby="message-hint" />
        </Field>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button type="submit" variant="solid">
            Send inquiry
          </Button>
          <p className="text-caption text-ink-muted" aria-live="polite">
            {sent ? `Your email app should open with the message ready. If it didn't, write to ${EMAIL}.` : "Opens your email app with the details filled in."}
          </p>
        </div>
      </form>
    </div>
  );
}

function ContactLink({ label, href, text, small }: { label: string; href: string; text: string; small?: boolean }) {
  return (
    <div>
      <p className="text-caption text-ink-muted">{label}</p>
      <a
        href={href}
        className={`display mt-1 block break-all transition-colors hover:text-terracotta ${small ? "text-[clamp(1.5rem,3vw,2.25rem)] leading-tight" : "text-display-l"}`}
      >
        {text}
      </a>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`grid gap-2 ${className}`}>
      <label htmlFor={id} className="text-[15px] font-medium">
        {label}
      </label>
      {children}
      {hint && <p id={`${id}-hint`} className="text-caption text-ink-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="text-caption font-medium text-terracotta">{error}</p>}
    </div>
  );
}
