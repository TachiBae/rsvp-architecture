import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/projects";

// Fills its (relative, sized) parent. No src renders the hatched placeholder.
export function Photo({
  photo,
  sizes = "100vw",
  priority,
  label = "Project photo",
  className = "",
}: {
  photo: PhotoData;
  sizes?: string;
  priority?: boolean;
  label?: string;
  className?: string;
}) {
  if (photo.src)
    return (
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
    );
  return (
    <div role="img" aria-label={`${photo.alt} (placeholder)`} className={`hatch absolute inset-0 grid place-items-center ${className}`}>
      {label && <span className="bg-stucco px-2 text-caption font-medium tracking-[0.24em] text-ink-muted uppercase">{label}</span>}
    </div>
  );
}
