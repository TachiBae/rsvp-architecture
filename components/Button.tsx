import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex h-12 items-center justify-center gap-2 border-[1.5px] px-6 text-[15px] font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] active:scale-[.98] disabled:pointer-events-none disabled:opacity-50";
const variants = {
  outline: "border-ink text-ink hover:border-terracotta hover:text-terracotta",
  solid: "border-ink bg-ink text-on-deep hover:border-terracotta hover:bg-terracotta hover:text-on-accent",
};

type Props = { variant?: keyof typeof variants; href?: string; className?: string; children: ReactNode } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

export function Button({ variant = "outline", href, className = "", children, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
