import type { ReactNode } from "react";
import { MaskLine, Ornament, Reveal, SectionChip } from "@/components/Fx";
import { cn } from "@/utils/cn";

export type Tone = "cream" | "shell" | "lav" | "peach" | "sky" | "night";

const TONES: Record<Tone, string> = {
  cream: "bg-cream/72 text-ink",
  shell: "bg-shell/78 text-ink",
  lav: "bg-gradient-to-b from-lav-soft/55 via-cream/70 to-cream/72 text-ink",
  peach: "bg-gradient-to-b from-[#FFF2E6]/75 via-cream/70 to-cream/72 text-ink",
  sky: "bg-gradient-to-b from-[#E9F2FA]/75 via-cream/70 to-cream/72 text-ink",
  night: "bg-[#221733] text-[#F6ECF8]",
};

export function Section({
  id,
  tone = "cream",
  className,
  children,
  overflow = true,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  overflow?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-20 sm:py-24 lg:py-28",
        TONES[tone],
        overflow && "overflow-hidden",
        className
      )}
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "rose",
  titleClass,
}: {
  eyebrow?: string;
  title: ReactNode[];
  lead?: ReactNode;
  align?: "center" | "left";
  tone?: "rose" | "lav" | "gold" | "sky";
  titleClass?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <Reveal>
          <div className={cn(align === "center" && "flex justify-center")}>
            <SectionChip tone={tone}>{eyebrow}</SectionChip>
          </div>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={cn(
            "mt-4 font-display text-[clamp(1.9rem,6vw,3.4rem)] font-semibold",
            titleClass
          )}
        >
          {title.map((line, i) => (
            <MaskLine key={i} delay={i * 110}>
              {line}
            </MaskLine>
          ))}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={200}>
          <p
            className={cn(
              "mt-5 text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
      {align === "center" && (
        <Reveal delay={260}>
          <Ornament className="mt-7" />
        </Reveal>
      )}
    </div>
  );
}

export function Card({
  children,
  className,
  hover = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "li" | "article" | "button";
}) {
  return (
    <Tag
      className={cn(
        "relative rounded-[1.5rem] border border-white/80 bg-white/72 p-6 shadow-[0_20px_45px_-30px_rgba(84,45,74,.55)] backdrop-blur-md",
        hover && "tilt",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Button({
  children,
  onClick,
  variant = "solid",
  className,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-all duration-400 active:scale-[0.97]",
        variant === "solid"
          ? "bg-gradient-to-r from-rose to-blush-deep text-white shadow-[0_20px_38px_-20px_rgba(207,106,140,.95)] hover:shadow-[0_26px_48px_-20px_rgba(207,106,140,1)] hover:-translate-y-0.5"
          : "border border-ink/12 bg-white/70 text-ink backdrop-blur-md hover:border-rose/40 hover:bg-white hover:-translate-y-0.5",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "solid" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </button>
  );
}
