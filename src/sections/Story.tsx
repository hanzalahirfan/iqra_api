import { useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import { HiddenGem, MaskLine, Reveal } from "@/components/Fx";
import { Button, Card, Heading, Section } from "@/components/Layout";
import { SchoolScene, Siblings } from "@/components/Illustrations";
import { burst } from "@/lib/fx";
import { scrollToId, useCountUp, useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/utils/cn";

/* ---------------- shared: how far a section has travelled through the viewport */
function useSectionProgress<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.88;
      const total = rect.height + start - vh * 0.22;
      setProgress(Math.min(1, Math.max(0, (start - rect.top) / total)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
  return progress;
}

/* ============================================================
   HERO
   ============================================================ */
export function Hero() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const onFrameMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(950px) rotateY(${px * 7}deg) rotateX(${-py * 6}deg) translateZ(0)`;
  };
  const onFrameLeave = () => {
    const el = frameRef.current;
    if (el) el.style.transform = "perspective(950px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-lav/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-peach/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.03fr_.97fr]">
        {/* ---- left ---- */}
        <div className="relative">
          <Reveal>
            <span className="chip bg-white/70 text-rose backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-rose" /> handmade · just for you
            </span>
          </Reveal>

          <Reveal delay={90}>
            <p className="hand mt-5 text-2xl text-ink-soft sm:text-[1.7rem]">
              Fourteen months ago, I met a colleague.
            </p>
          </Reveal>

          <h1 className="mt-1 font-display text-[clamp(2.7rem,10.5vw,5.4rem)] font-semibold leading-[0.94]">
            <MaskLine delay={160}>
              <span className="italic font-light text-ink-soft">Happy Birthday,</span>
            </MaskLine>
            <MaskLine delay={280}>
              <span className="text-rose">Iqra Api</span> <span className="align-middle">🎂</span>
            </MaskLine>
          </h1>

          <Reveal delay={420}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft sm:text-[1.15rem]">
              For the sister I found unexpectedly, and the family I found along the way.
              No template, no copied wishes — just everything I actually feel, built by hand,
              line by line, for you.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3">
              <div>
                <p className="hand text-xl text-ink">A little website from your Bhai.</p>
                <svg viewBox="0 0 220 14" className="mt-1 h-3 w-52 text-gold" aria-hidden="true">
                  <path
                    d="M2 9c34-7 62 4 96-2s58 3 120-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-faint">— Hanzalah</p>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button onClick={() => scrollToId("story")}>
                Read our story
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </Button>
              <Button variant="ghost" onClick={() => scrollToId("duas")}>
                Skip to the duas 🤲
              </Button>
            </div>
          </Reveal>

          <HiddenGem
            label="A tiny hidden heart"
            emoji="❤️"
            title="You found it! ❤️"
            body="Just like I found an Api when I wasn't even looking for one."
            className="-right-1 top-16 sm:right-6"
          />
        </div>

        {/* ---- right ---- */}
        <Reveal variant="scale" delay={240} className="relative mx-auto w-full max-w-md">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-blush/45 via-white/40 to-lav/45 blur-2xl" />
            <div
              ref={frameRef}
              onMouseMove={onFrameMove}
              onMouseLeave={onFrameLeave}
              className="relative overflow-hidden rounded-t-[14rem] rounded-b-[2.4rem] border border-white/85 bg-gradient-to-b from-white/90 to-blush/20 p-5 pb-7 shadow-[0_40px_80px_-45px_rgba(84,45,74,.75)] transition-transform duration-300 ease-out sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 opacity-70">
                {[
                  { t: "12%", l: "10%", d: "0s", c: "#F6C3D1" },
                  { t: "26%", l: "84%", d: "1.4s", c: "#C8B9EA" },
                  { t: "62%", l: "6%", d: "2.2s", c: "#FFD7B8" },
                ].map((h, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="a-float absolute h-5 w-5"
                    style={{ top: h.t, left: h.l, animationDelay: h.d }}
                    aria-hidden="true"
                  >
                    <path
                      d="M12 21C5 16.3 2 12.6 2 9.2 2 6.3 4.2 4 7 4c2 0 3.7 1.1 5 3 1.3-1.9 3-3 5-3 2.8 0 5 2.3 5 5.2 0 3.4-3 7.1-10 11.8z"
                      fill={h.c}
                    />
                  </svg>
                ))}
              </div>
              <Siblings className="relative mx-auto w-full max-w-[21rem]" />
              <div className="mt-3 flex items-center justify-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ink-faint">
                <span className="rounded-full bg-blush/50 px-3 py-1 text-rose">Api 🌸</span>
                <span className="h-px w-6 bg-gold/60" />
                <span className="rounded-full bg-sky/50 px-3 py-1 text-[#4b779c]">Bhai 💙</span>
              </div>
            </div>

            {/* rotating seal */}
            <div className="absolute -bottom-6 -left-4 h-24 w-24 sm:-left-8 sm:h-28 sm:w-28">
              <div className="relative grid h-full w-full place-items-center rounded-full border border-white/80 bg-white/85 shadow-[0_18px_36px_-20px_rgba(84,45,74,.7)] backdrop-blur-md">
                <svg viewBox="0 0 120 120" className="a-spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <path id="sealPath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                  </defs>
                  <text fontFamily="Manrope, sans-serif" fontSize="9.4" letterSpacing="2.6" fill="#B07C93">
                    <textPath href="#sealPath">
                      bhai &amp; behen · since the educators · bhai &amp; behen ·
                    </textPath>
                  </text>
                </svg>
                <span className="a-beat text-xl">🤍</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={700} className="relative mt-16 flex justify-center lg:mt-20">
        <button
          type="button"
          onClick={() => scrollToId("story")}
          className="group flex flex-col items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-ink-faint transition hover:text-rose"
        >
          scroll slowly, Api
          <span className="grid h-9 w-6 place-items-start rounded-full border border-ink-faint/40 pt-1.5">
            <span className="h-2 w-1 rounded-full bg-rose transition-transform duration-500 group-hover:translate-y-2" />
          </span>
        </button>
      </Reveal>
    </section>
  );
}

/* ============================================================
   WHERE IT ALL STARTED
   ============================================================ */
const EVOLUTION = [
  {
    label: "Day 01",
    title: "A new teacher walks in",
    caption:
      "I joined The Educators as a teacher. You were already there. Honestly, I had no idea that a person I was meeting on an ordinary first day would matter this much later.",
  },
  {
    label: "Colleagues",
    title: "Salaam, work, repeat",
    caption:
      "For a while that's all it was — two colleagues doing their work, sharing the same corridors, the same timetable, the same busy days.",
  },
  {
    label: "Conversations",
    title: "Small talks that stayed",
    caption:
      "Then the small conversations started. Random ones, in-between-work ones. Those little bits of talking slowly became the good part of the day.",
  },
  {
    label: "Guidance",
    title: "You explained things patiently",
    caption:
      "You guided me more than you probably realized. You helped me understand the work, the place, and honestly — how to carry myself in it.",
  },
  {
    label: "Friendship",
    title: "'Colleague' stopped fitting",
    caption:
      "At some point the word colleague just stopped being accurate. There was care there, comfort there, and a familiarity that takes most people years to build.",
  },
  {
    label: "Trust",
    title: "No need to explain myself",
    caption:
      "The kind of trust where you can be honest, ask something silly, or say you're tired — and you don't have to justify any of it.",
  },
  {
    label: "Bhai & Behen",
    title: "We just… became that",
    caption:
      "No announcement, no ceremony. Somewhere between work, conversations and everyday moments, we became Bhai and Api. Not by blood — by respect, care and time.",
  },
];

export function WhereItAllStarted() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  useEffect(() => {
    if (!inView || touched || reduced) return;
    const t = window.setInterval(() => {
      setActive((a) => (a + 1) % EVOLUTION.length);
    }, 2800);
    return () => window.clearInterval(t);
  }, [inView, touched, reduced]);

  const fill = (active / (EVOLUTION.length - 1)) * 100;

  return (
    <Section id="story" tone="shell">
      <Heading
        eyebrow="where it all started"
        title={["A school, a job,", <span key="2" className="italic font-light">and you</span>]}
        lead={
          <>
            I was appointed as a teacher at <strong className="font-semibold text-ink">The Educators</strong> almost
            fourteen months ago. You were already working there. That's the whole beginning of this story — and
            somehow it turned into the best part of it.
          </>
        }
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.06fr_.94fr]">
        <Reveal variant="left">
          <Card className="overflow-hidden p-2.5 sm:p-3.5" hover={false}>
            <SchoolScene className="rounded-[1.1rem]" />
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-3">
              <p className="hand text-lg text-rose">the place where we met</p>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-faint">
                14 months ago · day one
              </p>
            </div>
          </Card>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <div className="relative">
            <div className="relative rounded-[1.8rem] border border-white/80 bg-white/70 p-6 shadow-[0_24px_50px_-32px_rgba(84,45,74,.6)] backdrop-blur-md sm:p-8">
              <p className="hand text-xl text-rose">I didn't know then…</p>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-soft">
                …that someone I had just met at work would end up becoming such an important person in my life.
                I didn't know that the same place would give me an Api.
              </p>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
                It happened slowly, the way real things usually do. Through work. Through guidance. Through
                conversations that had no reason to matter but did.
              </p>
              <div className="gold-line mt-6 h-px w-full" />
              <p className="mt-4 font-display text-lg italic text-ink">
                “Some people enter your life as colleagues and leave as family.”
              </p>
            </div>
            <div className="absolute -bottom-7 -right-2 w-28 rotate-6 sm:-right-6 sm:w-32">
              <div className="rounded-[1.2rem] border border-white/80 bg-white/85 p-2 shadow-[0_18px_36px_-22px_rgba(84,45,74,.8)] backdrop-blur-md">
                <Siblings className="w-full" withHeart={false} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---- evolution rail ---- */}
      <div ref={ref} className="mt-24">
        <Reveal>
          <p className="text-center text-[0.7rem] font-bold uppercase tracking-[0.26em] text-ink-faint">
            how it changed · tap a step
          </p>
        </Reveal>

        <div className="mt-7 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative mx-auto min-w-[44rem] max-w-4xl px-4 sm:min-w-0">
            <div className="absolute left-6 right-6 top-[15px] h-[3px] rounded-full bg-ink/8" />
            <div
              className="absolute left-6 top-[15px] h-[3px] rounded-full bg-gradient-to-r from-blush via-gold to-lav transition-[width] duration-700 ease-out"
              style={{ width: `calc((100% - 3rem) * ${fill / 100})` }}
            />
            <ol className="relative flex items-start justify-between">
              {EVOLUTION.map((step, i) => {
                const isActive = i === active;
                const isDone = i <= active;
                return (
                  <li key={step.label} className="flex flex-col items-center" style={{ width: `${100 / EVOLUTION.length}%` }}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(i);
                        setTouched(true);
                      }}
                      aria-label={`Step ${i + 1}: ${step.label}`}
                      aria-current={isActive}
                      className={cn(
                        "relative grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 transition-all duration-500",
                        isActive
                          ? "scale-125 border-rose bg-white text-rose shadow-[0_0_0_6px_rgba(246,195,209,.4)]"
                          : isDone
                            ? "border-gold bg-gold-soft text-[#9a6f2c]"
                            : "border-ink/15 bg-white text-ink-faint hover:border-blush-deep"
                      )}
                    >
                      <span className="text-[0.7rem] font-black">{i + 1}</span>
                      {isActive && (
                        <span className="a-glow absolute inset-0 -z-10 rounded-full bg-blush/70 blur-md" />
                      )}
                    </button>
                    <span
                      className={cn(
                        "mt-3 px-1 text-center text-[0.66rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300 sm:text-[0.72rem]",
                        isActive ? "text-ink" : "text-ink-faint"
                      )}
                    >
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <Reveal delay={80}>
          <div className="mx-auto mt-8 max-w-3xl">
            <Card className="overflow-hidden p-7 sm:p-9" hover={false}>
              <div key={active} className="a-fade">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-gold">
                  step {String(active + 1).padStart(2, "0")} · {EVOLUTION[active].label}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                  {EVOLUTION[active].title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{EVOLUTION[active].caption}</p>
                {active === EVOLUTION.length - 1 && (
                  <div className="mt-6 flex items-center gap-4 rounded-2xl bg-blush/25 p-4">
                    <div className="w-20 shrink-0 sm:w-24">
                      <Siblings className="w-full" />
                    </div>
                    <p className="hand text-lg text-rose sm:text-xl">
                      and that's how I got an Api. 🤍
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  {EVOLUTION.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === active ? "w-6 bg-rose" : "w-1.5 bg-ink/15"
                      )}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-xs"
                  onClick={() => {
                    setTouched(true);
                    setActive((a) => (a + 1) % EVOLUTION.length);
                  }}
                >
                  next →
                </Button>
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   14 MONTHS
   ============================================================ */
const COUNT_WORDS = ["days", "weeks", "months", "memories"];

export function FourteenMonths() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const months = useCountUp(14, inView, 1400);
  const days = useCountUp(426, inView, 1800);
  const weeks = useCountUp(61, inView, 1700);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = window.setInterval(() => setWordIndex((i) => (i + 1) % COUNT_WORDS.length), 1700);
    return () => window.clearInterval(t);
  }, [inView, reduced]);

  const stats = [
    { value: days, suffix: "", label: "days roughly" },
    { value: weeks, suffix: "", label: "weeks roughly" },
    { value: 1, suffix: "", label: "workplace" },
    { value: null, suffix: "∞", label: "memories" },
  ];

  return (
    <Section tone="lav">
      <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal variant="scale" className="relative">
          <div className="relative mx-auto grid max-w-xs place-items-center">
            <span
              aria-hidden="true"
              className={cn(
                "absolute h-56 w-56 rounded-full bg-gradient-to-br from-blush/50 to-lav/50 blur-2xl sm:h-64 sm:w-64",
                !reduced && "a-glow"
              )}
            />
            <span
              aria-hidden="true"
              className="absolute h-52 w-52 rounded-full border border-dashed border-gold/40 sm:h-60 sm:w-60"
              style={{ animation: reduced ? undefined : "spinSlow 40s linear infinite" }}
            />
            <p className="relative font-display text-[clamp(6rem,24vw,10.5rem)] font-semibold leading-none text-rose">
              {months}
            </p>
            <p className="hand relative -mt-2 text-3xl text-ink">months</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="chip bg-white/70 text-[#6d5aa8]">one unexpected bond</span>
          </Reveal>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,5.6vw,3.2rem)] font-semibold leading-[1.06]">
            <MaskLine>Fourteen months may not</MaskLine>
            <MaskLine delay={90}>
              <span className="italic font-light">sound like a lifetime.</span>
            </MaskLine>
          </h2>
          <Reveal delay={220}>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
              But sometimes a fairly short amount of time is enough for someone to become family. Enough for
              respect to turn into care, care into trust, and trust into a bond that doesn't need a reason
              anymore.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 font-display text-xl text-ink sm:text-2xl">
              Fourteen months is{" "}
              <span className="relative inline-block min-w-[7.5rem] text-rose">
                <span key={wordIndex} className="a-pop inline-block italic">
                  {COUNT_WORDS[wordIndex]}
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-full bg-gold/50" />
              </span>{" "}
              when I count it like this.
            </p>
          </Reveal>

          <Reveal delay={380}>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="rounded-2xl border border-white/80 bg-white/70 px-3 py-4 text-center shadow-[0_16px_34px_-26px_rgba(84,45,74,.6)] backdrop-blur-md transition hover:-translate-y-1"
                >
                  <p className="font-display text-2xl font-semibold text-ink">
                    {s.value === null ? "∞" : s.value}
                  </p>
                  <p className="mt-0.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={460} variant="scale">
            <div className="relative mt-9 overflow-hidden rounded-[1.6rem] border border-gold/40 bg-gradient-to-br from-white/90 to-gold-soft/40 p-6 shadow-[0_24px_50px_-30px_rgba(84,45,74,.65)] sm:p-7">
              <span aria-hidden="true" className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/15 blur-2xl" />
              <p className="hand text-xl text-rose">and somehow…</p>
              <p className="mt-1 font-display text-[clamp(1.5rem,4.4vw,2.2rem)] font-semibold leading-tight">
                You became family. 🤍
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   OUR LITTLE JOURNEY — 8 chapters
   ============================================================ */
const CHAPTERS = [
  {
    n: "01",
    title: "The First Meeting",
    body: "Fourteen months ago, I met you at The Educators. I was the new one. You were already part of that place.",
    icon: "🏫",
  },
  {
    n: "02",
    title: "From Colleagues",
    body: "Two people simply doing their work. Nothing more, nothing less — just the same building, the same routine.",
    icon: "📚",
  },
  {
    n: "03",
    title: "The Guidance",
    body: "You guided me more than you probably realized. You explained things, corrected things, and never made me feel like a burden for asking.",
    icon: "🧭",
  },
  {
    n: "04",
    title: "The Conversations",
    body: "Small conversations slowly became meaningful memories. The kind you don't notice while they're happening.",
    icon: "💬",
  },
  {
    n: "05",
    title: "The Bond",
    body: "Somewhere between work and everyday moments, we became Bhai and Behen. No formal announcement. It just became true.",
    icon: "🤝",
  },
  {
    n: "06",
    title: "The Memories",
    body: "Those ordinary days became some of the memories I now miss. Funny how that works — ordinary at the time, precious later.",
    icon: "🌸",
  },
  {
    n: "07",
    title: "Today",
    body: "I'm not working at The Educators anymore. Different place, different routine — but one thing I genuinely miss is having you there.",
    icon: "🕰️",
  },
  {
    n: "08",
    title: "Always Family",
    body: "Different workplace, same bond. That's the part that didn't change, and honestly, it never will.",
    icon: "🤍",
  },
];

export function Journey() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progress = useSectionProgress(trackRef);

  return (
    <Section id="memories" tone="cream">
      <Heading
        eyebrow="chapter by chapter"
        tone="lav"
        title={["Our Little Journey"]}
        lead="Not a long list of events — just the quiet stages of how a colleague slowly became an Api."
      />

      <div ref={trackRef} className="relative mt-16">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[19px] top-0 w-[3px] rounded-full bg-ink/8 md:left-1/2 md:-translate-x-1/2"
        />
        <div
          aria-hidden="true"
          className="absolute left-[19px] top-0 w-[3px] rounded-full bg-gradient-to-b from-blush via-gold to-lav md:left-1/2 md:-translate-x-1/2"
          style={{ height: `${progress * 100}%` }}
        />

        {CHAPTERS.map((c, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={c.n}
              className={cn(
                "relative pb-10 md:w-1/2 md:pb-14",
                isLeft ? "md:pr-14" : "md:ml-auto md:pl-14"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-[8px] top-3 z-10 grid h-6 w-6 place-items-center rounded-full border-[3px] border-cream bg-blush shadow-[0_0_0_4px_rgba(246,195,209,.28)]",
                  progress * CHAPTERS.length > i ? "bg-rose" : "bg-blush",
                  isLeft ? "md:-right-3 md:left-auto" : "md:-left-3"
                )}
              />
              <Reveal variant={isLeft ? "left" : "right"} className="pl-12 md:pl-0 md:pr-0">
                <Card className={cn("p-6 sm:p-7", isLeft && "md:text-right")}>
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isLeft && "md:flex-row-reverse"
                    )}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-shell text-lg">
                      {c.icon}
                    </span>
                    <p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-gold">
                      chapter {c.n}
                    </p>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold sm:text-[1.7rem]">{c.title}</h3>
                  <p className={cn("mt-2.5 leading-relaxed text-ink-soft", isLeft && "md:ml-auto")}>
                    {c.body}
                  </p>
                </Card>
              </Reveal>

              {i === 4 && (
                <HiddenGem
                  label="A hidden star"
                  emoji="⭐"
                  title="One more reason you're special."
                  body="You turned an ordinary workplace into a memory I actually miss. That's rare, Api."
                  className={cn("top-1/2", isLeft ? "-right-2 md:right-2" : "-left-2 md:left-2")}
                />
              )}
            </div>
          );
        })}
      </div>

      <Reveal delay={100}>
        <div className="mx-auto mt-4 max-w-xl rounded-[1.5rem] border border-white/80 bg-white/70 px-6 py-5 text-center shadow-[0_20px_44px_-30px_rgba(84,45,74,.6)] backdrop-blur-md">
          <p className="hand text-xl text-rose">eight chapters… and counting.</p>
          <p className="mt-1 text-sm text-ink-soft">
            This timeline doesn't end here, Api. InshaAllah there are many more chapters left.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   THE THING I MISS MOST
   ============================================================ */
const MISS_STEPS = ["The classrooms?", "The students?", "The workplace?", "Those days?"];

export function TheThingIMiss() {
  const [step, setStep] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const revealed = step > MISS_STEPS.length;

  useEffect(() => {
    if (revealed) {
      const rect = cardRef.current?.getBoundingClientRect();
      burst({
        x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
        y: rect ? rect.top + rect.height / 2 : window.innerHeight / 2,
        count: 34,
        power: 0.7,
        shapes: ["heart", "spark", "petal"],
        colors: ["#E28BA6", "#F6C3D1", "#D3A35C", "#FFFFFF"],
      });
    }
  }, [revealed]);

  return (
    <Section tone="peach">
      <Heading
        eyebrow="honest answer"
        tone="gold"
        title={["There is one thing I miss", <span key="2" className="italic font-light">about The Educators…</span>]}
      />

      <div ref={cardRef} className="mx-auto mt-12 max-w-2xl">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/85 bg-white/78 p-8 text-center shadow-[0_36px_70px_-40px_rgba(84,45,74,.75)] backdrop-blur-xl sm:p-12">
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-1000",
                revealed ? "bg-blush/60 scale-150" : "bg-peach/40"
              )}
            />

            <div className="relative min-h-[11rem] sm:min-h-[13rem]">
              {!revealed ? (
                <div key={step} className="a-pop flex h-full flex-col items-center justify-center">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-ink-faint">
                    guess {step + 1} of {MISS_STEPS.length}
                  </p>
                  <p className="mt-3 font-display text-[clamp(1.9rem,7vw,3rem)] font-semibold leading-tight">
                    {MISS_STEPS[step]}
                  </p>
                  <p className="hand mt-3 text-lg text-ink-soft">nope… not quite.</p>
                </div>
              ) : (
                <div className="a-pop">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-rose">
                    the real answer
                  </p>
                  <p className="mt-2 font-display text-[clamp(3.2rem,14vw,6rem)] font-semibold leading-none text-rose">
                    You. 🤍
                  </p>
                  <div className="gold-line mx-auto mt-6 h-px w-40" />
                  <div className="mx-auto mt-6 max-w-lg space-y-3 text-left text-[0.98rem] leading-relaxed text-ink-soft">
                    <p>
                      I'm not working at The Educators right now, and honestly, there are many things I could
                      say I miss about those days.
                    </p>
                    <p>But if you ask me what I miss the most… it's having you there.</p>
                    <p>
                      The conversations. The guidance. The little moments. The familiar presence of someone who
                      made an ordinary workplace feel like somewhere I belonged. Those are the things that made
                      those days special.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative mt-7 flex flex-col items-center gap-3">
              {!revealed ? (
                <Button onClick={() => setStep((s) => s + 1)}>
                  {step === MISS_STEPS.length - 1 ? "Okay, tell me 🤍" : "No… keep going →"}
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-faint transition hover:text-rose"
                >
                  ↺ ask me again
                </button>
              )}
              <div className="flex gap-1.5" aria-hidden="true">
                {MISS_STEPS.concat(["you"]).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === step ? "w-6 bg-rose" : "w-1.5 bg-ink/15"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
