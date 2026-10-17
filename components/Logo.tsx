// The R·S·V·P mark: each letter in a tall thin Frame. Uses currentColor, so it inverts on dark bands.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`} role="img" aria-label="RSVP Architecture">
      <span className="flex gap-[3px]" aria-hidden>
        {["R", "S", "V", "P"].map((l) => (
          <span
            key={l}
            className="grid h-[34px] w-[19px] place-items-center border-[1.5px] border-current font-display text-[16px] leading-none font-light"
          >
            {l}
          </span>
        ))}
      </span>
      <span aria-hidden className="ml-3 text-[11px] leading-none font-medium tracking-[0.24em] uppercase">
        Architecture
      </span>
    </span>
  );
}
