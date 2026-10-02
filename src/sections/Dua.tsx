import { useState, type MouseEvent } from "react";
import { MaskLine, Reveal } from "@/components/Fx";
import { Button, Card, Heading, Section } from "@/components/Layout";
import { Crescent, EnvelopeArt, Lantern, Siblings } from "@/components/Illustrations";
import { burst } from "@/lib/fx";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/utils/cn";

/* ============================================================
   MY DUAS FOR YOU — night sky
   ============================================================ */
const DUAS = [
  { icon: "🌙", text: "May Allah always keep you happy — the real kind of happy, the one that stays." },
  { icon: "🛡️", text: "May Allah protect you from every difficulty you cannot see coming." },
  { icon: "🌟", text: "May Allah give you success at every single stage of your life." },
  { icon: "🕰️", text: "May Allah put barakah in your work, your time and your efforts." },
  { icon: "🏡", text: "May Allah make your family's life easier and fill your home with peace." },
  { icon: "🤲", text: "May Allah reward you for everything you quietly do for the people you love." },
  { icon: "🚪", text: "May Allah open doors for you that you never even expected to exist." },
  { icon: "🌸", text: "May Allah replace every difficult chapter with something beautiful." },
  { icon: "💫", text: "May Allah give you more than what you ask for, and better than what you planned." },
  {
    icon: "🤍",
    text: "May Allah give you a future that makes you look back one day and say: “It was worth waiting for.”",
  },
];

const STARS = Array.from({ length: 34 }, (_, i) => ({
  top: `${(i * 37) % 100}%`,
  left: `${(i * 61) % 100}%`,
  size: 1.5 + ((i * 7) % 3),
  delay: `${(i % 9) * 0.42}s`,
}));

export function Duas() {
  const [ameen, setAmeen] = useState<Set<number>>(new Set());
  const reduced = usePrefersReducedMotion();

  const sayAmeen = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    const next = new Set(ameen);
    next.add(i);
    setAmeen(next);
    if (!reduced) {
      const r = e.currentTarget.getBoundingClientRect();
      burst({
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        count: 16,
        power: 0.5,
        gravity: 0.03,
        shapes: ["star", "spark"],
        colors: ["#F0DCA8", "#D3A35C", "#FFF6E2"],
      });
    }
  };

  return (
    <Section id="duas" tone="night" className="relative">
      {/* night sky décor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="a-twinkle absolute rounded-full bg-[#FFF3D6]"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#6b4b95]/35 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#a2566f]/25 blur-3xl" />
        <div className="absolute left-6 top-0 w-14 opacity-90 sm:left-16 sm:w-20">
          <Lantern className="w-full" />
        </div>
        <div className="absolute right-4 top-0 w-12 opacity-80 sm:right-14 sm:w-16">
          <Lantern className="w-full" />
        </div>
        <div className="absolute right-[12%] top-[6%] hidden w-16 opacity-90 lg:block">
          <Crescent className="a-float w-full" />
        </div>
      </div>

      <div className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="chip border border-gold/40 bg-gold/15 text-[#F0DCA8]">
              🤲 the part I mean the most
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,7vw,3.8rem)] font-semibold text-[#FFF6EC]">
              <MaskLine>My Duas</MaskLine>
              <MaskLine delay={110}>
                <span className="italic font-light text-[#F0DCA8]">For You</span>
              </MaskLine>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-[#D9C9DE] sm:text-lg">
              I can't do much from where I stand, Api. But I can make dua — and I do, more often than you'd
              think. These are the ones I keep repeating for you.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-gold">۞</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 gap-4 sm:columns-2 lg:columns-3">
          {DUAS.map((d, i) => (
            <Reveal key={d.text} delay={(i % 3) * 90} className="mb-4 break-inside-avoid">
              <div
                className={cn(
                  "group relative overflow-hidden rounded-[1.4rem] border p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5",
                  ameen.has(i)
                    ? "border-gold/60 bg-gradient-to-br from-gold/20 to-[#3a2a52]/70 shadow-[0_0_40px_-14px_rgba(240,220,168,.55)]"
                    : "border-white/15 bg-white/[0.07] hover:border-gold/40"
                )}
                style={!reduced ? { animation: `floatYSmall ${5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite` } : undefined}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/15 blur-2xl transition-all duration-700 group-hover:scale-150"
                />
                <div className="relative flex items-start gap-3">
                  <span className="text-xl leading-none">{d.icon}</span>
                  <p className="font-display text-[1.02rem] leading-relaxed text-[#F6ECF8] sm:text-[1.06rem]">
                    {d.text}
                  </p>
                </div>
                <div className="relative mt-4 flex items-center justify-between">
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#B9A2C9]">
                    dua {String(i + 1).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => sayAmeen(i, e)}
                    aria-pressed={ameen.has(i)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.16em] transition-all duration-300 active:scale-95",
                      ameen.has(i)
                        ? "border-gold/70 bg-gold/25 text-[#F0DCA8]"
                        : "border-white/25 text-[#D9C9DE] hover:border-gold/60 hover:text-[#F0DCA8]"
                    )}
                  >
                    {ameen.has(i) ? "✓ ameen" : "say ameen"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-xl rounded-[1.6rem] border border-gold/30 bg-white/[0.06] px-6 py-7 text-center backdrop-blur-md">
            <p className="hand text-2xl text-[#F0DCA8]">
              {ameen.size === DUAS.length ? "You said ameen to all of them. 🤍" : "Tap “say ameen” — it makes me happy to see it."}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#D9C9DE]">
              Ameen, ya Rabb. May every single one of these reach you at exactly the right time.
            </p>
            <p className="mt-4 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[#B9A2C9]">
              {ameen.size} / {DUAS.length} ameen said
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   AND ONE SPECIAL DUA…
   ============================================================ */
const SPECIAL = [
  "Someone who understands your heart — not just your words.",
  "Someone who respects your dreams instead of asking you to shrink them.",
  "Someone who appreciates your strength, and doesn't take it for granted.",
  "Someone who supports you the way you actually deserve to be supported.",
  "Someone who fits your life beautifully — your family, your work, your deen.",
];

export function SpecialDua() {
  return (
    <Section tone="peach" overflow={false}>
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <Reveal>
            <span className="chip bg-gold-soft/60 text-[#9a6f2c]">and one special dua…</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,5.4vw,3rem)] font-semibold leading-[1.07]">
              <MaskLine>A dua I make</MaskLine>
              <MaskLine delay={100}>
                <span className="italic font-light">a little shyly, but sincerely.</span>
              </MaskLine>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
              And yes, I have one more dua for you, Api. As your Bhai, this is honestly what I ask Allah for
              on your behalf:
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 max-w-xl font-display text-[1.15rem] leading-relaxed text-ink sm:text-[1.3rem]">
              May Allah bless you with a husband who is genuinely caring, respectful, understanding and kind.
            </p>
          </Reveal>

          <ul className="mt-7 space-y-3">
            {SPECIAL.map((line, i) => (
              <Reveal as="li" key={line} delay={i * 70} variant="left" className="flex items-start gap-3">
                <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blush/50 text-[0.6rem] text-rose">
                  ♥
                </span>
                <p className="leading-relaxed text-ink-soft">{line}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-9 max-w-xl rounded-[1.5rem] border border-white/80 bg-white/75 p-6 shadow-[0_22px_48px_-32px_rgba(84,45,74,.6)] backdrop-blur-md">
              <p className="hand text-xl text-rose">don't rush anything, Api.</p>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Just trust Allah's timing. Sometimes Allah makes us wait because He is preparing something
                better than what we were asking for.
              </p>
              <p className="mt-3 font-display text-lg font-semibold text-ink">
                InshaAllah, when the right time comes, Allah will give you more than enough.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal variant="right" delay={140} className="lg:sticky lg:top-28">
          <div className="relative mx-auto max-w-xs">
            <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-white/85 bg-gradient-to-b from-white/90 to-peach/40 p-6 pb-8 text-center shadow-[0_34px_66px_-40px_rgba(84,45,74,.75)]">
              <div className="mx-auto w-14">
                <Crescent className="a-float w-full" />
              </div>
              <p className="mt-4 font-display text-lg italic leading-relaxed text-ink">
                “Allah does not delay anything except to give something better.”
              </p>
              <div className="gold-line mx-auto mt-5 h-px w-28" />
              <p className="hand mt-4 text-lg text-rose">— your Bhai's dua list, page two</p>
              <div className="mx-auto mt-5 w-32">
                <Siblings className="w-full" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   FOR THE DAYS WHEN LIFE FEELS HEAVY — envelope
   ============================================================ */
const REMINDER = [
  "I know life has its problems and hurdles.",
  "I know there are things you probably don't talk about.",
  "But please remember how far you've already come.",
  "Look at everything you're doing. You're working. You're supporting your family. You're supporting your sisters. You're building yourself. You're carrying responsibilities. And you're still moving forward.",
  "You may sometimes feel that you're not doing enough. But from the outside, I can see something very different.",
  "You're giving your 100%.",
  "So please don't be too hard on yourself.",
  "Keep going. Stay strong. Trust Allah.",
  "InshaAllah, the things you're praying for will find their way to you at the right time.",
];

export function HeavyDays() {
  const [open, setOpen] = useState(false);

  return (
    <Section tone="sky">
      <Heading
        eyebrow="keep this one for later"
        tone="sky"
        title={["For The Days When", <span key="2" className="italic font-light">Life Feels Heavy</span>]}
        lead="Some days are harder than others, Api. I know that. So I sealed a reminder inside this envelope — open it on one of those days."
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal variant="left">
          <div className="relative mx-auto w-full max-w-sm">
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 -z-10 rounded-full blur-3xl transition-all duration-1000",
                open ? "bg-blush/60 scale-110" : "bg-sky/50"
              )}
            />
            <EnvelopeArt open={open} className={cn("w-full transition-transform duration-700", !open && "a-float")} />
            <div className="mt-6 text-center">
              <Button onClick={() => setOpen((v) => !v)}>
                {open ? "Fold it back for later 🤍" : "Open this when you need a reminder 🤍"}
              </Button>
              <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-faint">
                {open ? "letter opened" : "sealed with respect"}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="relative">
          {!open ? (
            <Reveal variant="right">
              <Card className="p-8 text-center sm:p-10" hover={false}>
                <p className="hand text-2xl text-rose">still sealed.</p>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  Inside there's a reminder I wrote for the version of you that feels tired. Tap the button
                  whenever you need it — it'll still be here.
                </p>
                <div className="mx-auto mt-6 flex w-24">
                  <Siblings className="w-full" />
                </div>
              </Card>
            </Reveal>
          ) : (
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/85 bg-white/85 p-7 shadow-[0_36px_70px_-42px_rgba(84,45,74,.7)] backdrop-blur-md sm:p-9">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blush via-gold to-lav" />
              <p className="hand text-2xl text-rose">Api, listen to me for a second.</p>
              <div className="mt-4 space-y-3.5">
                {REMINDER.map((line, i) => (
                  <p
                    key={line}
                    className={cn(
                      "leading-relaxed text-ink-soft",
                      i === 5 && "font-display text-xl font-semibold text-ink",
                      i === 6 && "font-semibold text-ink"
                    )}
                    style={{ animation: `popIn .6s cubic-bezier(.22,1,.36,1) ${i * 0.09}s both` }}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <div className="gold-line mt-7 h-px w-full" />
              <p className="mt-4 text-right text-sm font-bold uppercase tracking-[0.2em] text-ink-faint">
                — your Bhai
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   YOU ARE DOING ENOUGH — big type moment
   ============================================================ */
const FOR_WHOM = [
  { line: "For yourself.", note: "for the girl who had her own dreams too", tone: "text-rose" },
  { line: "For your family.", note: "for the home you keep holding together", tone: "text-[#6d5aa8]" },
  { line: "For your sisters.", note: "for the ones you support without being asked", tone: "text-[#4b779c]" },
  { line: "For the people you care about.", note: "for everyone lucky enough to be on your list", tone: "text-[#9a6f2c]" },
];

export function DoingEnough() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section tone="cream" className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-lav/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <h2 className="font-display text-[clamp(2.1rem,8.5vw,4.6rem)] font-semibold leading-[0.98]">
            <MaskLine>Api, you are doing</MaskLine>
            <MaskLine delay={110}>
              <span className="text-rose">more than you think.</span>
            </MaskLine>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-7 sm:space-y-9">
          {FOR_WHOM.map((f, i) => (
            <Reveal
              key={f.line}
              variant={i % 2 ? "right" : "left"}
              delay={i * 60}
              className={cn(i % 2 ? "sm:pl-16" : "sm:pr-16")}
            >
              <div className="group flex items-baseline gap-4">
                <span className="font-display text-sm font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p
                    className={cn(
                      "font-display text-[clamp(1.6rem,5.6vw,2.9rem)] font-semibold leading-tight transition-transform duration-500 group-hover:translate-x-1",
                      f.tone
                    )}
                  >
                    {f.line}
                  </p>
                  <p className="hand mt-1 text-lg text-ink-faint transition-colors duration-500 group-hover:text-ink-soft">
                    {f.note}
                  </p>
                </div>
              </div>
              <span
                aria-hidden="true"
                className="mt-4 block h-px w-full origin-left bg-gradient-to-r from-gold/50 to-transparent transition-transform duration-700"
                style={{ animation: reduced ? undefined : `barGrow 1.1s cubic-bezier(.22,1,.36,1) ${i * 0.1}s both` }}
              />
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale" delay={140}>
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/85 bg-gradient-to-br from-blush/30 via-white/85 to-lav/30 px-6 py-12 text-center shadow-[0_40px_80px_-48px_rgba(84,45,74,.8)] sm:px-12">
            <p className="font-display text-[clamp(1.7rem,6vw,3rem)] font-semibold leading-tight">
              And I hope you <span className="italic text-rose">never</span> forget that.
            </p>
            <p className="hand mt-4 text-xl text-ink-soft">not on your tired days, not on your doubtful days. 🤍</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
