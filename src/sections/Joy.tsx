import { useState, type MouseEvent } from "react";
import { HiddenGem, MaskLine, Reveal } from "@/components/Fx";
import { Heading, Section } from "@/components/Layout";
import { Siblings } from "@/components/Illustrations";
import { burst } from "@/lib/fx";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/utils/cn";

/* ============================================================
   OFFICIAL BHAI–API DEPARTMENT 😂
   ============================================================ */
const API_DUTIES = [
  "Guide Bhai",
  "Correct Bhai (even when it's embarrassing)",
  "Give advice Bhai didn't ask for but needed",
  "Occasionally tolerate Bhai 😂",
  "Be cute without trying",
  "Pretend she isn't tired",
  "Somehow handle absolutely everything",
];

const BHAI_DUTIES = [
  "Respect Api — always, no exceptions",
  "Annoy Api occasionally 😂",
  "Appreciate Api out loud (like right now)",
  "Make Api smile, or at least try badly",
  "Pray for Api every single day",
  "Remind Api that she's doing great",
];

function DutyList({
  items,
  title,
  emoji,
  accent,
  border,
  idPrefix,
}: {
  items: string[];
  title: string;
  emoji: string;
  accent: string;
  border: string;
  idPrefix: string;
}) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const reduced = usePrefersReducedMotion();

  const toggle = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    const next = new Set(done);
    if (next.has(i)) next.delete(i);
    else {
      next.add(i);
      if (!reduced) {
        const r = e.currentTarget.getBoundingClientRect();
        burst({
          x: r.left + 22,
          y: r.top + r.height / 2,
          count: 10,
          power: 0.42,
          gravity: 0.04,
          shapes: ["heart", "spark"],
          colors: ["#E28BA6", "#F6C3D1", "#D3A35C"],
        });
      }
    }
    setDone(next);
  };

  return (
    <div className={cn("relative overflow-hidden rounded-[1.7rem] border-2 bg-white/80 p-6 shadow-[0_26px_54px_-36px_rgba(84,45,74,.7)] backdrop-blur-md sm:p-7", border)}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-25" />
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-shell text-xl">{emoji}</span>
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-ink-faint">job description</p>
          <h3 className={cn("font-display text-xl font-semibold sm:text-2xl", accent)}>{title}</h3>
        </div>
      </div>

      <ul className="mt-5 space-y-1.5">
        {items.map((item, i) => {
          const isDone = done.has(i);
          return (
            <li key={`${idPrefix}-${item}`}>
              <button
                type="button"
                onClick={(e) => toggle(i, e)}
                aria-pressed={isDone}
                className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all duration-300 hover:bg-shell/80 active:scale-[0.99]"
              >
                <span
                  className={cn(
                    "grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 text-[0.6rem] transition-all duration-300",
                    isDone ? "border-transparent bg-rose text-white" : "border-ink/20 bg-white group-hover:border-rose/60"
                  )}
                >
                  {isDone && <span className="a-pop">✓</span>}
                </span>
                <span
                  className={cn(
                    "text-[0.95rem] leading-snug transition-colors duration-300",
                    isDone ? "text-ink-faint line-through decoration-rose/40" : "text-ink-soft group-hover:text-ink"
                  )}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
        {done.size}/{items.length} acknowledged 😂
      </p>
    </div>
  );
}

export function BhaiApiDepartment() {
  return (
    <Section tone="shell">
      <Heading
        eyebrow="official paperwork · form 14-B"
        tone="gold"
        title={["Official Bhai–Api", <span key="2" className="italic font-light">Department 😂</span>]}
        lead="Enough of the emotional stuff for a minute. Let's get the paperwork out of the way — tick the duties you accept, Api. I already ticked mine."
      />

      <div className="relative mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal variant="left">
          <DutyList
            items={API_DUTIES}
            title="Api's Responsibilities"
            emoji="🌸"
            accent="text-rose"
            border="border-blush/70"
            idPrefix="api"
          />
        </Reveal>
        <Reveal variant="right" delay={100}>
          <DutyList
            items={BHAI_DUTIES}
            title="Bhai's Responsibilities"
            emoji="💙"
            accent="text-[#4b779c]"
            border="border-sky/70"
            idPrefix="bhai"
          />
        </Reveal>

        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-28 -translate-x-1/2 -translate-y-1/2 lg:block">
          <Siblings className="w-full" />
        </div>
      </div>

      <Reveal delay={120} variant="scale">
        <div className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-[1.6rem] border-2 border-dashed border-gold/50 bg-gradient-to-br from-white/85 to-gold-soft/30 p-7 text-center sm:p-9">
          <span
            aria-hidden="true"
            className="absolute -right-6 -top-8 rotate-12 rounded-lg border-4 border-rose/50 px-4 py-1.5 font-display text-sm font-black uppercase tracking-[0.18em] text-rose/60"
          >
            approved
          </span>
          <p className="text-[0.64rem] font-black uppercase tracking-[0.24em] text-ink-faint">
            terms &amp; conditions
          </p>
          <p className="mt-3 font-display text-[clamp(1.15rem,3.6vw,1.7rem)] font-semibold leading-relaxed text-ink">
            Bhai–Api relationship is <span className="text-rose">lifetime</span>.
            <br className="hidden sm:block" /> No cancellation allowed. 😂❤️
          </p>
          <p className="hand mt-4 text-lg text-ink-soft">
            signed, sealed, and already in effect since The Educators days.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   LITTLE THINGS I REMEMBER — memory wall
   ============================================================ */
const MEMORIES = [
  { text: "Those random conversations.", note: "the ones with no topic at all", emoji: "💬", rot: "-2.2deg", span: "sm:col-span-2" },
  { text: "The advice you gave me.", note: "it landed better than you knew", emoji: "🧭", rot: "1.6deg", span: "" },
  { text: "The moments we laughed.", note: "at nothing important, mostly", emoji: "😂", rot: "-1.2deg", span: "" },
  { text: "The days that felt ordinary but became memories.", note: "funny how that works", emoji: "🕰️", rot: "2deg", span: "sm:col-span-2" },
  { text: "The times you helped me.", note: "without making it a big deal", emoji: "🤝", rot: "-1.8deg", span: "" },
  { text: "The little things you probably don't remember.", note: "I do, though", emoji: "🌷", rot: "1.2deg", span: "" },
  { text: "The moments when I realized you weren't just a colleague anymore.", note: "it happened quietly", emoji: "🤍", rot: "-2.4deg", span: "sm:col-span-2" },
  { text: "The way you carried your responsibilities without making a fuss.", note: "that's the part that taught me things", emoji: "🌟", rot: "1.8deg", span: "sm:col-span-2" },
];

export function MemoryWall() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="wall" tone="lav" className="relative">
      <Heading
        eyebrow="pinned on the wall"
        tone="rose"
        title={["Little Things", <span key="2" className="italic font-light">I Remember</span>]}
        lead="Nothing grand. No big events. Just the small pieces of those days that somehow stuck with me."
      />

      <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MEMORIES.map((m, i) => (
          <Reveal
            key={m.text}
            delay={(i % 3) * 80}
            variant="scale"
            className={cn("group relative", m.span)}
          >
            <div
              className={cn(
                "relative h-full overflow-hidden rounded-[1.4rem] border border-white/85 bg-white/80 p-6 shadow-[0_24px_48px_-32px_rgba(84,45,74,.65)] backdrop-blur-md",
                "transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_36px_64px_-32px_rgba(84,45,74,.7)]"
              )}
              style={{ transform: reduced ? undefined : `rotate(${m.rot})` }}
            >
              {/* washi tape */}
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-blush/50 opacity-80 shadow-sm"
              />
              <span aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-lav/25 blur-2xl transition-all duration-700 group-hover:scale-150" />
              <div className="relative flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-shell text-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  {m.emoji}
                </span>
                <div>
                  <p className="font-display text-[1.06rem] font-semibold leading-snug text-ink sm:text-[1.12rem]">
                    {m.text}
                  </p>
                  <p className="hand mt-1.5 text-base text-ink-faint transition-colors duration-500 group-hover:text-rose">
                    {m.note}
                  </p>
                </div>
              </div>
              <p className="relative mt-4 text-[0.6rem] font-black uppercase tracking-[0.2em] text-ink-faint/70">
                memory {String(i + 1).padStart(2, "0")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100}>
        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-4 rounded-[1.5rem] border border-white/80 bg-white/70 px-6 py-5 text-center backdrop-blur-md">
          <div className="w-24 shrink-0">
            <Siblings className="w-full" />
          </div>
          <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
            These aren't big moments. They're just… yours. And somehow that made them worth keeping.
          </p>
        </div>
      </Reveal>

      <HiddenGem
        label="A hidden flower"
        emoji="🌼"
        title="You're remembered, Api."
        body="Not just on birthdays. The little things you did are still sitting on this wall."
        className="left-1 top-14"
      />
    </Section>
  );
}

/* ============================================================
   A quiet interlude before the celebration
   ============================================================ */
export function Interlude() {
  return (
    <Section tone="cream" className="py-16 sm:py-20">
      <Reveal variant="blur" className="mx-auto max-w-3xl text-center">
        <p className="hand text-2xl text-rose">okay, one more honest thing before the cake:</p>
        <p className="mt-3 font-display text-[clamp(1.3rem,4.4vw,2.1rem)] font-semibold leading-[1.25]">
          <MaskLine>I didn't get an Api by blood.</MaskLine>
          <MaskLine delay={120}>
            <span className="italic font-light text-ink-soft">I got one by respect — and that's the version</span>
          </MaskLine>
          <MaskLine delay={240}>people usually take for granted.</MaskLine>
        </p>
        <p className="mt-4 text-ink-soft">I don't. Not for a second.</p>
      </Reveal>
    </Section>
  );
}
