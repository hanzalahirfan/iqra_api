import { useEffect, useRef, useState } from "react";
import { MaskLine, Reveal } from "@/components/Fx";
import { Button, Heading, Section } from "@/components/Layout";
import { Balloon, Cake, Siblings } from "@/components/Illustrations";
import { burst, celebrate } from "@/lib/fx";
import { scrollToId, useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/utils/cn";

/* ============================================================
   BIRTHDAY CELEBRATION
   ============================================================ */
const BALLOONS = [
  { c: "#F6C3D1", left: "4%", d: "0s", h: "7.5rem" },
  { c: "#C8B9EA", left: "16%", d: "1.6s", h: "6rem" },
  { c: "#FFD7B8", left: "80%", d: "0.8s", h: "7rem" },
  { c: "#BCD9F0", left: "91%", d: "2.4s", h: "5.5rem" },
  { c: "#F0DCA8", left: "68%", d: "1.2s", h: "5rem" },
];

export function Celebration() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const [lit, setLit] = useState(true);
  const [wished, setWished] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!inView || firedRef.current) return;
    firedRef.current = true;
    if (!reduced) window.setTimeout(() => celebrate(), 350);
  }, [inView, reduced]);

  const throwConfetti = () => {
    celebrate();
    const w = window.innerWidth;
    window.setTimeout(() => burst({ x: w * 0.25, y: window.innerHeight * 0.3, count: 30, power: 0.9 }), 180);
    window.setTimeout(() => burst({ x: w * 0.75, y: window.innerHeight * 0.3, count: 30, power: 0.9 }), 340);
  };

  const blow = () => {
    setLit(false);
    setWished(true);
    const el = ref.current;
    const r = el?.getBoundingClientRect();
    burst({
      x: r ? r.left + r.width / 2 : window.innerWidth / 2,
      y: r ? r.top + r.height * 0.42 : window.innerHeight / 2,
      count: 44,
      power: 0.85,
      shapes: ["heart", "star", "spark"],
      colors: ["#E28BA6", "#F0DCA8", "#FFFFFF", "#C8B9EA"],
    });
  };

  return (
    <Section id="birthday" tone="peach" className="relative">
      <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {BALLOONS.map((b, i) => (
          <div
            key={i}
            className="a-balloon absolute top-6"
            style={{ left: b.left, height: b.h, width: "3.4rem", animationDelay: b.d }}
          >
            <Balloon color={b.c} className="h-full w-full" />
          </div>
        ))}
        <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-gold-soft/50 blur-3xl" />
      </div>

      <div className="relative text-center">
        <Reveal>
          <span className="chip bg-white/75 text-rose">🎉 the actual birthday part</span>
        </Reveal>
        <h2 className="mt-4 font-display text-[clamp(2.2rem,9vw,5rem)] font-semibold leading-[0.98]">
          <MaskLine delay={60}>Happy Birthday,</MaskLine>
          <MaskLine delay={180}>
            <span className="text-rose">Iqra Api!</span> 🎂
          </MaskLine>
        </h2>
        <Reveal delay={280}>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">
            May this year be kinder to you, brighter for you, and full of moments that make your heart
            genuinely happy.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={200}>
          <div className="relative mx-auto mt-12 w-full max-w-sm">
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-6 top-6 -z-10 h-40 rounded-full blur-3xl transition-all duration-1000",
                lit ? "bg-[#FFD79A]/70 a-glow" : "bg-lav/30"
              )}
            />
            <Cake lit={lit} className="w-full" />
            <p
              className={cn(
                "hand mt-2 text-xl transition-all duration-700",
                wished ? "text-rose opacity-100" : "text-ink-faint opacity-80"
              )}
            >
              {wished ? "wish noted, InshaAllah it's on its way 🤲" : "make a wish, Api…"}
            </p>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {lit ? (
              <Button onClick={blow}>Blow the candles 🕯️</Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setLit(true);
                  setWished(false);
                }}
              >
                Light them again 🕯️
              </Button>
            )}
            <Button variant="ghost" onClick={throwConfetti}>
              More confetti 🎉
            </Button>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-2xl sm:text-3xl">
            {["🎈", "✨", "🎉", "💗", "🌸", "🎂", "🤍"].map((e, i) => (
              <span
                key={e + i}
                className="a-float-sm inline-block"
                style={{ animationDelay: `${i * 0.28}s` }}
                aria-hidden="true"
              >
                {e}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   FINAL LETTER
   ============================================================ */
const LETTER = [
  "I may not be working with you anymore.",
  "We may not see each other every day. We may not be in the same workplace, the same corridor, or the same routine.",
  "But the bond doesn't disappear just because the workplace changed.",
  "You will always be someone I respect as my Api. That title isn't something I hand out easily, and it isn't something that expires when a job ends.",
  "I will always be grateful for the time we spent together. I will always remember the guidance, the patience and the support — even the parts you probably think were small.",
  "I genuinely want to see you happy and successful. Not in a general, polite way. In the way a younger brother wants it for his elder sister.",
  "I pray Allah gives you everything that is good for you, and keeps away everything that isn't — even the things you're currently holding onto tightly.",
];

export function FinalLetter() {
  return (
    <Section id="letter" tone="cream" className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <Heading
        eyebrow="one last thing…"
        tone="gold"
        title={["The Last Page"]}
        lead="Read this one slowly, Api."
      />

      <div className="relative mt-14 grid gap-8 lg:grid-cols-[1fr_auto]">
        <Reveal variant="left">
          <article
            className="relative overflow-hidden rounded-[1.4rem] border border-gold-soft/70 bg-[#FFFDF8] p-7 shadow-[0_40px_80px_-48px_rgba(84,45,74,.75)] sm:p-11"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0 33px, rgba(211,163,92,.13) 33px 34px)",
            }}
          >
            <span aria-hidden="true" className="absolute inset-y-0 left-8 w-px bg-rose/20 sm:left-10" />

            {/* stamp */}
            <div className="absolute right-5 top-5 rotate-6 rounded-md border-2 border-dashed border-rose/40 px-2.5 py-1.5 text-center sm:right-8">
              <p className="font-display text-[0.6rem] font-black uppercase tracking-[0.14em] text-rose/70">
                bhai · api
              </p>
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.16em] text-ink-faint">since 14 months</p>
            </div>

            <p className="hand relative text-2xl text-rose sm:text-3xl">Iqra Api,</p>

            <div className="relative mt-6 space-y-[1.05rem] text-[1.02rem] leading-[1.85] text-ink-soft">
              {LETTER.map((line, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className={cn(i === 2 && "font-display text-lg font-semibold text-ink sm:text-xl")}>{line}</p>
                </Reveal>
              ))}

              <Reveal delay={420} variant="scale">
                <p className="relative my-6 rounded-2xl border-l-4 border-rose bg-blush/20 px-5 py-4 font-display text-[1.15rem] font-semibold leading-relaxed text-ink sm:text-[1.35rem]">
                  “Thank you for becoming my Api without ever needing to be.”
                </p>
              </Reveal>

              <Reveal delay={480}>
                <div className="pt-2">
                  <p className="font-display text-lg font-semibold leading-relaxed text-ink sm:text-xl">
                    With lots of respect, duas &amp; sibling love,
                    <br />
                    <span className="text-rose">Your Bhai 🤍</span>
                  </p>
                  <p className="hand mt-3 text-2xl text-ink">Hanzalah</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-ink-faint">
                    written properly, not copy-pasted
                  </p>
                </div>
              </Reveal>
            </div>
          </article>
        </Reveal>

        <Reveal variant="right" delay={140} className="lg:w-44">
          <div className="flex h-full flex-col items-center justify-start gap-6">
            <div className="w-36 rounded-[1.4rem] border border-white/85 bg-white/80 p-4 shadow-[0_24px_48px_-32px_rgba(84,45,74,.65)]">
              <Siblings className="w-full" />
            </div>
            {/* wax seal */}
            <div className="relative grid h-24 w-24 place-items-center">
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-rose/25 blur-xl" />
              <svg viewBox="0 0 100 100" className="relative h-24 w-24" aria-hidden="true">
                <circle cx="50" cy="50" r="40" fill="#CF6A8C" />
                <circle cx="50" cy="50" r="40" fill="url(#sealShine)" opacity="0.25" />
                <circle cx="50" cy="50" r="33" fill="none" stroke="#FFF1F4" strokeWidth="1.4" opacity="0.7" />
                <path
                  d="M50 68c-9-6-16-11-16-18 0-4.6 3.4-7.6 7.6-7.6 3.4 0 6.3 1.9 8.4 5 2.1-3.1 5-5 8.4-5 4.2 0 7.6 3 7.6 7.6 0 7-7 12-16 18z"
                  fill="#FFF1F4"
                />
                <defs>
                  <linearGradient id="sealShine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="hand max-w-[10rem] text-center text-lg leading-snug text-ink-soft">
              sealed with duas, not wax. 🤲
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   THE SECRET SURPRISE — full screen reveal
   ============================================================ */
type SurpriseStage = 0 | 1 | 2 | 3;

export function LastSurprise() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<SurpriseStage>(0);
  const reduced = usePrefersReducedMotion();
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const start = () => {
    setOpen(true);
    setStage(0);
    timers.current.push(window.setTimeout(() => setStage(1), reduced ? 300 : 1500));
    timers.current.push(
      window.setTimeout(
        () => {
          setStage(2);
          if (!reduced) {
            celebrate();
            const w = window.innerWidth;
            const h = window.innerHeight;
            timers.current.push(window.setTimeout(() => burst({ x: w * 0.15, y: h * 0.6, count: 46, power: 1.2 }), 260));
            timers.current.push(window.setTimeout(() => burst({ x: w * 0.85, y: h * 0.6, count: 46, power: 1.2 }), 520));
            timers.current.push(window.setTimeout(() => burst({ x: w * 0.5, y: h * 0.75, count: 40, power: 1 }), 800));
          }
        },
        reduced ? 600 : 3600
      )
    );
    timers.current.push(window.setTimeout(() => setStage(3), reduced ? 900 : 5200));
  };

  const close = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setOpen(false);
    setStage(0);
  };

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 250);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  return (
    <>
      <Section tone="night" className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="a-twinkle absolute h-1 w-1 rounded-full bg-[#FFF3D6]"
              style={{ top: `${(i * 43) % 100}%`, left: `${(i * 67) % 100}%`, animationDelay: `${(i % 6) * 0.5}s` }}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-xl text-center">
          <Reveal>
            <p className="hand text-2xl text-[#F0DCA8]">wait… one more thing 👀</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,6vw,2.8rem)] font-semibold text-[#FFF6EC]">
              <MaskLine>I saved the best part</MaskLine>
              <MaskLine delay={110}>
                <span className="italic font-light text-[#D9C9DE]">for the very end.</span>
              </MaskLine>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-4 leading-relaxed text-[#D9C9DE]">
              There's one answer I've never said out loud. It's the honest one.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={start}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold/50 bg-gradient-to-r from-gold/25 to-blush/20 px-8 py-4 font-display text-lg font-semibold text-[#FFF6EC] shadow-[0_0_50px_-14px_rgba(240,220,168,.7)] transition-all duration-500 hover:-translate-y-1 hover:border-gold active:scale-95"
              >
                <span className="relative z-10">One Last Surprise</span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">🤍</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </div>
          </Reveal>
        </div>
      </Section>

      {open && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="A final surprise message"
          className="fixed inset-0 z-[96] grid place-items-center overflow-hidden px-6 outline-none"
        >
          <div className="absolute inset-0 bg-[#150E22]/97 a-fade" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(45% 40% at 50% 45%, rgba(207,106,140,.35), transparent 70%), radial-gradient(40% 35% at 20% 80%, rgba(120,90,190,.3), transparent 70%)",
            }}
          />

          <div className="relative w-full max-w-2xl text-center">
            {/* glowing heart */}
            <div
              className={cn(
                "mx-auto grid h-32 w-32 place-items-center transition-all duration-[1400ms] ease-out",
                stage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              )}
            >
              <span className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,214,225,.55),transparent_65%)] blur-xl a-glow" />
              <svg viewBox="0 0 48 48" className="relative h-20 w-20 a-beat" aria-hidden="true">
                <path
                  d="M24 43C12 35.5 4 29 4 19.5 4 12.6 9 7.5 15.3 7.5c3.9 0 7.2 2 8.7 5.2 1.5-3.2 4.8-5.2 8.7-5.2C39 7.5 44 12.6 44 19.5 44 29 36 35.5 24 43z"
                  fill="#F0A9BE"
                />
                <path
                  d="M24 43C12 35.5 4 29 4 19.5 4 12.6 9 7.5 15.3 7.5c3.9 0 7.2 2 8.7 5.2 1.5-3.2 4.8-5.2 8.7-5.2C39 7.5 44 12.6 44 19.5 44 29 36 35.5 24 43z"
                  fill="#FFFFFF"
                  opacity="0.22"
                />
              </svg>
            </div>

            <div className="mt-8 min-h-[16rem]">
              {stage >= 1 && (
                <p className="a-fade font-display text-[1.05rem] italic leading-relaxed text-[#D9C9DE] sm:text-[1.3rem]">
                  If I ever get asked what I gained from my time at The Educators…
                </p>
              )}
              {stage >= 2 && (
                <p className="a-pop mt-5 font-display text-[clamp(2.1rem,9vw,4.2rem)] font-semibold leading-[1.02] text-[#FFF6EC]">
                  I'd say I found <span className="text-[#F0A9BE]">an Api</span>.
                </p>
              )}
              {stage >= 3 && (
                <div className="a-fade mt-8">
                  <p className="font-display text-[clamp(1.3rem,5vw,2.1rem)] font-semibold text-[#F0DCA8]">
                    Happy Birthday, Iqra Api. ❤️
                  </p>
                  <p className="hand mt-3 text-xl text-[#D9C9DE]">
                    that's it. that's the whole answer. 🤍
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="ghost"
                className="border-white/30 bg-white/10 text-[#FFF6EC] hover:border-gold/60 hover:bg-white/20"
                onClick={close}
              >
                close ✕
              </Button>
              {stage >= 3 && (
                <Button
                  onClick={() => {
                    close();
                    window.setTimeout(() => scrollToId("final"), 220);
                  }}
                >
                  one more thing 🎂
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   FINAL SCREEN
   ============================================================ */
export function FinalScreen() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const fired = useRef(false);

  useEffect(() => {
    if (!inView || fired.current || reduced) return;
    fired.current = true;
    window.setTimeout(() => celebrate(), 400);
  }, [inView, reduced]);

  const KEEPS = [
    { t: "Keep smiling.", n: "it suits you, Api" },
    { t: "Keep growing.", n: "you're only getting started" },
    { t: "Keep believing.", n: "even on the heavy days" },
    { t: "Keep trusting Allah.", n: "His timing is better than ours" },
    { t: "Keep being the amazing person you are.", n: "please don't change that part" },
  ];

  return (
    <Section id="final" tone="cream" className="relative">
      <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-blush/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal variant="scale">
          <div className="mx-auto w-32 sm:w-40">
            <Cake className="w-full" />
          </div>
        </Reveal>

        <h2 className="mt-8 font-display text-[clamp(2.1rem,8.5vw,4.4rem)] font-semibold leading-[0.98]">
          <MaskLine delay={80}>Happy Birthday,</MaskLine>
          <MaskLine delay={200}>
            <span className="text-rose">Iqra Api</span>
          </MaskLine>
        </h2>

        <Reveal delay={300}>
          <p className="hand mt-4 text-2xl text-ink-soft sm:text-3xl">
            May Allah write beautiful chapters for you.
          </p>
        </Reveal>

        <ul className="mx-auto mt-12 max-w-xl space-y-4 text-left">
          {KEEPS.map((k, i) => (
            <Reveal as="li" key={k.t} delay={i * 80} variant={i % 2 ? "right" : "left"}>
              <div className="group flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 px-5 py-4 shadow-[0_18px_40px_-30px_rgba(84,45,74,.6)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-white/95">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blush/35 text-sm text-rose transition-transform duration-500 group-hover:scale-110">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-ink sm:text-xl">{k.t}</p>
                  <p className="hand text-base text-ink-faint">{k.n}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200} variant="scale">
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/85 bg-gradient-to-br from-blush/35 via-white/85 to-lav/35 px-6 py-12 shadow-[0_40px_80px_-48px_rgba(84,45,74,.8)] sm:px-12">
            <div className="mx-auto mb-6 w-40">
              <Siblings className="w-full" />
            </div>
            <p className="font-display text-[clamp(1.3rem,4.6vw,2.1rem)] font-semibold leading-snug text-ink">
              Your Bhai will always be cheering for you. <span className="text-rose">🤍</span>
            </p>
            <p className="mt-3 text-ink-soft">
              From the first day at The Educators to whatever comes next — I'm in your corner, Api.
            </p>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => scrollToId("home")}>Back to the top ↑</Button>
            <Button variant="ghost" onClick={() => celebrate()}>
              One more confetti burst 🎉
            </Button>
          </div>
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-20 max-w-4xl border-t border-ink/10 pt-8 text-center">
        <p className="text-[0.92rem] leading-relaxed text-ink-soft">
          Made with code, memories, duas &amp; a lot of respect — by your Bhai,{" "}
          <span className="font-semibold text-ink">Hanzalah</span>.
        </p>
        <p className="hand mt-2 text-lg text-rose">happy birthday, Iqra Api 🎂</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
          {["home", "story", "memories", "admire", "duas", "birthday", "letter"].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToId(id)}
              className="transition hover:text-rose"
            >
              {id}
            </button>
          ))}
        </div>
        <p className="mt-6 text-[0.66rem] uppercase tracking-[0.2em] text-ink-faint/70">
          hand-built · no templates · just for you
        </p>
      </footer>
    </Section>
  );
}
