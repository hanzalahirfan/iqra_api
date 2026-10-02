import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { burst, ConfettiEngine, onBurst, type BurstOptions } from "@/lib/fx";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/utils/cn";

/* ---------------- Confetti canvas ---------------- */
export function ConfettiCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const engine = new ConfettiEngine();
    engine.attach(canvas);
    const off = onBurst((opts: BurstOptions) => engine.emit(opts));
    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);
    return () => {
      off();
      window.removeEventListener("resize", onResize);
      engine.detach();
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[98]"
    />
  );
}

/* ---------------- Reveal primitives ---------------- */
type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale" | "blur";
  threshold?: number;
  id?: string;
};

export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  variant = "up",
  threshold = 0.16,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const variantClass =
    variant === "left"
      ? "rv-left"
      : variant === "right"
        ? "rv-right"
        : variant === "scale"
          ? "rv-scale"
          : variant === "blur"
            ? "rv-blur"
            : "";
  return (
    <Tag
      id={id}
      ref={ref}
      className={cn("rv", variantClass, inView && "is-in", className)}
      style={{ ["--rv-d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** A single line of a display heading that slides up from behind a mask. */
export function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  return (
    <span ref={ref} className={cn("mask", inView && "is-in", className)}>
      <span style={{ ["--rv-d" as string]: `${delay}ms` }}>{children}</span>
    </span>
  );
}

/* ---------------- Ambient background ---------------- */
const PETALS = Array.from({ length: 11 }, (_, i) => ({
  left: `${(i * 9.3 + 4) % 96}%`,
  delay: `${i * 1.7}s`,
  duration: `${20 + ((i * 5) % 14)}s`,
  size: 9 + ((i * 7) % 13),
  dx: `${((i % 3) - 1) * 60}px`,
  color: ["#F6C3D1", "#C8B9EA", "#FFD7B8", "#BCD9F0", "#EFD8A8"][i % 5],
  shape: (["petal", "heart", "star"] as const)[i % 3],
}));

export function AmbientBackground({ dim = false }: { dim?: boolean }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000",
        dim ? "bg-[#1b1229]" : "bg-cream"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          dim ? "opacity-30" : "opacity-100"
        )}
        style={{
          backgroundImage: dim
            ? "radial-gradient(60% 50% at 50% 20%, rgba(207,106,140,.35), transparent 70%), radial-gradient(50% 40% at 15% 80%, rgba(120,90,190,.35), transparent 70%)"
            : "radial-gradient(55% 45% at 12% 8%, rgba(246,195,209,.55), transparent 70%), radial-gradient(45% 40% at 88% 14%, rgba(200,185,234,.5), transparent 72%), radial-gradient(60% 45% at 78% 88%, rgba(255,215,184,.5), transparent 70%), radial-gradient(45% 35% at 10% 78%, rgba(188,217,240,.42), transparent 72%)",
        }}
      />
      {!reduced &&
        !dim &&
        PETALS.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-[-8vh] block"
            style={{
              left: p.left,
              animation: `driftUp ${p.duration} linear ${p.delay} infinite`,
              ["--dx" as string]: p.dx,
            }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color} opacity="0.75">
              {p.shape === "heart" ? (
                <path d="M12 21s-7.5-4.7-9.5-9.2C1 8.3 3 5 6.3 5c2 0 3.4 1.1 4.2 2.3h3C14.3 6.1 15.7 5 17.7 5 21 5 23 8.3 21.5 11.8 19.5 16.3 12 21 12 21z" />
              ) : p.shape === "star" ? (
                <path d="M12 2l2.6 6.3 6.8.5-5.2 4.4 1.6 6.6L12 16.3 6.2 19.8l1.6-6.6L2.6 8.8l6.8-.5z" />
              ) : (
                <ellipse cx="12" cy="12" rx="6" ry="10" />
              )}
            </svg>
          </span>
        ))}
      <div className="grain absolute inset-0 opacity-[0.35]" />
    </div>
  );
}

/* ---------------- Easter-egg surprises ---------------- */
type SurpriseState = { id: number; emoji: string; title: string; body: string } | null;
type SurpriseApi = (s: { emoji: string; title: string; body: string }) => void;

const SurpriseContext = createContext<SurpriseApi>(() => {});
export const useSurprise = () => useContext(SurpriseContext);

export function SurpriseProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<SurpriseState>(null);
  const timer = useRef<number | null>(null);

  const show = useCallback<SurpriseApi>((s) => {
    if (timer.current) window.clearTimeout(timer.current);
    setItem({ id: Date.now(), ...s });
    timer.current = window.setTimeout(() => setItem(null), 5200);
  }, []);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const value = useMemo(() => show, [show]);

  return (
    <SurpriseContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4"
      >
        {item && (
          <div
            key={item.id}
            className="a-pop pointer-events-auto max-w-[min(92vw,26rem)] rounded-[1.4rem] border border-white/80 bg-white/92 px-5 py-4 text-left shadow-[0_28px_60px_-28px_rgba(84,45,74,.6)] backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <span className="a-beat text-2xl leading-none">{item.emoji}</span>
              <div>
                <p className="font-display text-[1.02rem] font-semibold text-ink">{item.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </div>
              <button
                type="button"
                onClick={() => setItem(null)}
                aria-label="Dismiss message"
                className="ml-auto rounded-full px-2 text-ink-faint transition hover:bg-shell hover:text-ink"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </SurpriseContext.Provider>
  );
}

/** A tiny clickable easter egg (heart / star / flower) hidden around the page. */
export function HiddenGem({
  emoji,
  title,
  body,
  className,
  label,
}: {
  emoji: ReactNode;
  title: string;
  body: string;
  className?: string;
  label: string;
}) {
  const surprise = useSurprise();
  const [found, setFound] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        setFound(true);
        surprise({ emoji: "🤍", title, body });
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        burst({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          count: 22,
          power: 0.62,
          shapes: ["heart", "spark", "star"],
        });
      }}
      className={cn(
        "group absolute z-20 grid h-9 w-9 place-items-center rounded-full transition-transform duration-500",
        "hover:scale-125 active:scale-95",
        found ? "opacity-100" : "opacity-70 hover:opacity-100",
        className
      )}
    >
      <span className="a-twinkle block text-[1.05rem] leading-none">{emoji}</span>
      <span className="absolute inset-0 -z-10 rounded-full bg-blush/30 blur-md transition group-hover:bg-blush/60" />
    </button>
  );
}

/* ---------------- Small shared UI ---------------- */
export function SectionChip({ children, tone = "rose" }: { children: ReactNode; tone?: "rose" | "lav" | "gold" | "sky" }) {
  const tones: Record<string, string> = {
    rose: "bg-blush/40 text-rose",
    lav: "bg-lav-soft text-[#6d5aa8]",
    gold: "bg-gold-soft/60 text-[#9a6f2c]",
    sky: "bg-sky/40 text-[#4b779c]",
  };
  return <span className={cn("chip", tones[tone])}>{children}</span>;
}

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span className="gold-line h-px w-16 sm:w-24" />
      <svg width="18" height="18" viewBox="0 0 24 24" className="text-gold">
        <path
          fill="currentColor"
          d="M12 2l1.9 5.6L19.5 9l-4.6 3.3 1.6 5.7L12 14.9 7.5 18l1.6-5.7L4.5 9l5.6-1.4z"
        />
      </svg>
      <span className="gold-line h-px w-16 sm:w-24" />
    </div>
  );
}
