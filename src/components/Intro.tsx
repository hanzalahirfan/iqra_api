import { useCallback, useEffect, useRef, useState } from "react";
import { celebrate, burst } from "@/lib/fx";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/utils/cn";

/* ============================================================
   STEP 1 — Loading screen
   ============================================================ */
const LOADING_STEPS = [
  "Collecting memories…",
  "Adding a little magic…",
  "Packing some duas…",
  "Adding a lot of love…",
  "Almost ready…",
];

export function Loader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [final, setFinal] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const finish = useCallback(() => {
    setFinal(true);
    window.setTimeout(() => doneRef.current(), reduced ? 350 : 1250);
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(finish, 900);
      return () => window.clearTimeout(t);
    }
    const timers: number[] = [];
    LOADING_STEPS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), 260 + i * 620));
    });
    timers.push(window.setTimeout(finish, 260 + LOADING_STEPS.length * 620));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduced, finish]);

  const progress = final ? 100 : Math.round((step / LOADING_STEPS.length) * 100);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-cream px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 20% 15%, rgba(246,195,209,.6), transparent 70%), radial-gradient(45% 40% at 82% 25%, rgba(200,185,234,.55), transparent 70%), radial-gradient(55% 45% at 50% 95%, rgba(255,215,184,.6), transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-sm text-center">
        {!final ? (
          <>
            <div className="relative mx-auto mb-8 grid h-20 w-20 place-items-center">
              <span className="a-glow absolute inset-0 rounded-full bg-blush/50 blur-xl" />
              <svg viewBox="0 0 48 48" className="a-beat relative h-12 w-12" aria-hidden="true">
                <path
                  d="M24 42C13 35 5 28.5 5 19.5 5 13 9.7 8.5 15.3 8.5c3.6 0 6.8 1.9 8.7 4.9 1.9-3 5.1-4.9 8.7-4.9C38.3 8.5 43 13 43 19.5 43 28.5 35 35 24 42z"
                  fill="#E28BA6"
                />
                <path
                  d="M24 42C13 35 5 28.5 5 19.5 5 13 9.7 8.5 15.3 8.5c3.6 0 6.8 1.9 8.7 4.9 1.9-3 5.1-4.9 8.7-4.9C38.3 8.5 43 13 43 19.5 43 28.5 35 35 24 42z"
                  fill="#FFFFFF"
                  opacity="0.22"
                />
                <path d="M24 13v29M13 24h22" stroke="#FFF3F6" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
              </svg>
              {["#D3A35C", "#C8B9EA", "#FFD7B8"].map((c, i) => (
                <span
                  key={c}
                  className="a-twinkle absolute h-2 w-2 rounded-full"
                  style={{
                    background: c,
                    top: `${[4, 70, 22][i]}%`,
                    left: `${[86, 12, 4][i]}%`,
                    animationDelay: `${i * 0.7}s`,
                  }}
                />
              ))}
            </div>

            <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
              Preparing something special for <span className="text-rose">Iqra Api</span>…
            </p>

            <div className="mt-7 h-[6px] w-full overflow-hidden rounded-full bg-white/70 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blush via-gold to-lav transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex h-6 items-center justify-center">
              <p key={step} className="a-fade text-sm tracking-wide text-ink-soft">
                {LOADING_STEPS[Math.min(step, LOADING_STEPS.length - 1)]}
              </p>
            </div>

            <button
              type="button"
              onClick={finish}
              className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint transition hover:text-rose"
            >
              Skip intro
            </button>
          </>
        ) : (
          <div className="a-pop py-10">
            <p className="hand text-2xl text-rose">Made especially for</p>
            <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">Iqra Api 🤍</p>
            <div className="gold-line mx-auto mt-6 h-px w-40" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   STEP 2 — The gift box
   ============================================================ */
const SPARKLES = [
  { top: "6%", left: "12%", d: "0s", s: 16, c: "#D3A35C" },
  { top: "16%", left: "82%", d: "0.6s", s: 12, c: "#E28BA6" },
  { top: "52%", left: "2%", d: "1.2s", s: 14, c: "#C8B9EA" },
  { top: "64%", left: "92%", d: "0.3s", s: 16, c: "#FFD7B8" },
  { top: "86%", left: "22%", d: "1.6s", s: 11, c: "#D3A35C" },
  { top: "82%", left: "72%", d: "0.9s", s: 13, c: "#E28BA6" },
];

export function GiftIntro({ onOpened }: { onOpened: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"idle" | "shake" | "open">("idle");
  const boxRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const openGift = () => {
    if (phase !== "idle") return;
    const rect = boxRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    setPhase("shake");
    burst({
      x: cx,
      y: cy,
      count: reduced ? 12 : 26,
      power: 0.5,
      shapes: ["spark", "star"],
      colors: ["#D3A35C", "#FFF0C4", "#F6C3D1"],
    });

    timers.current.push(
      window.setTimeout(
        () => {
          setPhase("open");
          if (!reduced) celebrate();
          else burst({ x: cx, y: cy, count: 24, power: 0.6 });
        },
        reduced ? 60 : 780
      )
    );

    timers.current.push(window.setTimeout(onOpened, reduced ? 700 : 2450));
  };

  const opened = phase === "open";

  return (
    <div className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: opened
            ? "radial-gradient(60% 50% at 50% 45%, rgba(255,236,205,.95), transparent 70%), radial-gradient(50% 40% at 15% 20%, rgba(246,195,209,.6), transparent 70%)"
            : "radial-gradient(50% 40% at 15% 20%, rgba(246,195,209,.55), transparent 70%), radial-gradient(45% 40% at 85% 25%, rgba(200,185,234,.5), transparent 70%)",
          transition: "background-image 1.2s ease",
        }}
      />

      <div className="relative flex w-full max-w-lg flex-col items-center text-center">
        <p className="hand a-fade text-2xl text-rose sm:text-3xl">Iqra Api,</p>
        <h1 className="mt-1 font-display text-[1.65rem] font-semibold leading-tight text-ink sm:text-4xl">
          there's something waiting for you…
        </h1>

        {/* the gift */}
        <div ref={boxRef} className="relative mt-9 mb-6 h-[19rem] w-[19rem] max-w-[80vw] sm:h-[21rem] sm:w-[21rem]">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-all duration-1000",
              opened ? "bg-[radial-gradient(circle,rgba(255,240,200,.95),rgba(246,195,209,.45)_45%,transparent_70%)] scale-150" : "bg-[radial-gradient(circle,rgba(246,195,209,.6),transparent_70%)] a-glow"
            )}
          />

          {SPARKLES.map((s, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              width={s.s}
              height={s.s}
              aria-hidden="true"
              className={cn("absolute a-twinkle", opened && "opacity-0")}
              style={{ top: s.top, left: s.left, animationDelay: s.d, transition: "opacity .6s ease" }}
            >
              <path d="M12 1l2.4 8.1L22.5 12l-8.1 2.9L12 23l-2.4-8.1L1.5 12l8.1-2.9z" fill={s.c} />
            </svg>
          ))}

          <button
            type="button"
            onClick={openGift}
            aria-label="Open your birthday gift"
            className="group absolute inset-0 grid items-end justify-items-center rounded-3xl"
          >
            <span className="sr-only">Tap the gift</span>
            <div
              className={cn(
                "relative mb-6 h-[11rem] w-[15rem] transition-transform duration-500 group-hover:scale-[1.04] group-active:scale-[0.98]",
                phase === "shake" && "a-shake"
              )}
            >
              {/* light bursting from inside */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute bottom-[8.6rem] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full transition-all duration-[900ms]",
                  opened
                    ? "scale-[3.4] opacity-100 bg-[radial-gradient(circle,rgba(255,250,232,.98),rgba(255,214,160,.55)_40%,transparent_68%)]"
                    : "scale-0 opacity-0"
                )}
              />
              {/* box base */}
              <div className="absolute bottom-0 left-1/2 h-[9.4rem] w-[13.4rem] -translate-x-1/2 overflow-hidden rounded-[1rem] bg-gradient-to-b from-[#F8D2DD] to-[#E28BA6] shadow-[0_30px_55px_-25px_rgba(140,60,90,.75)]">
                <div className="absolute inset-y-0 left-1/2 w-[2.2rem] -translate-x-1/2 bg-gradient-to-b from-[#F6E4B8] to-[#D3A35C]" />
                <div className="absolute inset-x-0 top-0 h-3 bg-white/40" />
                <div className="absolute inset-x-4 bottom-3 h-px bg-white/35" />
                <div
                  className={cn(
                    "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,247,220,.95),transparent_55%)] transition-opacity duration-700",
                    opened ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
              {/* lid */}
              <div
                className={cn(
                  "absolute bottom-[9rem] left-1/2 h-[3.1rem] w-[15rem] rounded-[0.85rem] bg-gradient-to-b from-[#FBDDE6] to-[#EFA4BC] shadow-[0_14px_26px_-14px_rgba(140,60,90,.8)]",
                  opened && "opacity-0"
                )}
                style={{
                  transform: opened
                    ? "translate(-50%,-6.5rem) rotate(-18deg) scale(1.06)"
                    : "translate(-50%,0) rotate(0deg)",
                  transition: reduced
                    ? "transform .3s ease, opacity .3s ease"
                    : "transform .95s cubic-bezier(.2,.9,.25,1.2), opacity .7s ease .35s",
                }}
              >
                <div className="absolute inset-y-0 left-1/2 w-[2.2rem] -translate-x-1/2 bg-gradient-to-b from-[#F6E4B8] to-[#D3A35C]" />
                <div className="absolute inset-x-0 top-0 h-2 rounded-t-[0.85rem] bg-white/45" />
                {/* bow */}
                <div
                  className={cn("absolute -top-8 left-1/2 h-9 w-24 -translate-x-1/2", !opened && !reduced && "a-float-sm")}
                  aria-hidden="true"
                >
                  <span className="absolute left-0 top-1 h-8 w-11 rotate-[-24deg] rounded-[50%] border-[5px] border-[#D3A35C] bg-[#F0DCA8]" />
                  <span className="absolute right-0 top-1 h-8 w-11 rotate-[24deg] rounded-[50%] border-[5px] border-[#D3A35C] bg-[#F0DCA8]" />
                  <span className="absolute left-1/2 top-3 h-5 w-5 -translate-x-1/2 rounded-full bg-[#D3A35C] shadow-inner" />
                </div>
              </div>
            </div>
          </button>
        </div>

        {!opened ? (
          <div className="a-fade">
            <p className="font-display text-lg font-semibold text-ink">
              Tap the gift <span className="a-bounce inline-block">🎁</span>
            </p>
            <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-ink-faint">
              made by your Bhai · headphones recommended 🎧
            </p>
          </div>
        ) : (
          <div className="a-pop">
            <p className="font-display text-2xl font-semibold text-rose sm:text-3xl">Happy Birthday, Iqra Api 🎂</p>
            <p className="mt-1 text-sm text-ink-soft">Hold on… this little world is opening up for you.</p>
          </div>
        )}
      </div>
    </div>
  );
}
