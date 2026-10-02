import { useEffect, useState } from "react";
import { musicBox } from "@/lib/fx";
import { scrollToId, useActiveSection, useScrollProgress } from "@/lib/hooks";
import { cn } from "@/utils/cn";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "memories", label: "Memories" },
  { id: "admire", label: "What I Admire" },
  { id: "duas", label: "Duas" },
  { id: "birthday", label: "Birthday" },
  { id: "letter", label: "Final Letter" },
] as const;

const NAV_IDS = NAV_ITEMS.map((n) => n.id);

function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-blush via-gold to-lav"
        style={{ transform: `scaleX(${progress})`, transition: "transform .12s linear" }}
      />
    </div>
  );
}

export function TopNav() {
  const active = useActiveSection(NAV_IDS);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 180 : 0);
  };

  return (
    <>
      <ScrollProgress />

      {/* desktop pill */}
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-[60] hidden justify-center px-4 pt-4 lg:flex"
        )}
      >
        <nav
          aria-label="Story sections"
          className={cn(
            "pointer-events-auto flex items-center gap-1 rounded-full border px-2 py-2 transition-all duration-500",
            solid
              ? "border-white/70 bg-white/80 shadow-[0_18px_40px_-26px_rgba(84,45,74,.7)] backdrop-blur-xl"
              : "border-transparent bg-white/40 backdrop-blur-md"
          )}
        >
          <span className="hand mr-1 pl-3 pr-2 text-lg leading-none text-rose">for Api 🤍</span>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-[0.8rem] font-semibold transition-all duration-300",
                active === item.id
                  ? "bg-gradient-to-r from-blush/70 to-lav/60 text-ink shadow-sm"
                  : "text-ink-soft hover:bg-shell hover:text-ink"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* mobile bar */}
      <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-4 pt-4 lg:hidden">
        <span
          className={cn(
            "hand rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-lg leading-none text-rose shadow-sm backdrop-blur-md transition",
            solid ? "opacity-100" : "opacity-90"
          )}
        >
          for Iqra Api 🤍
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-white/80 shadow-[0_14px_30px_-18px_rgba(84,45,74,.8)] backdrop-blur-md transition active:scale-95"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 block h-[2px] w-5 rounded bg-ink transition-all duration-300",
                open ? "top-1.5 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 block h-[2px] w-5 rounded bg-ink transition-all duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-[2px] w-5 rounded bg-ink transition-all duration-300",
                open ? "top-1.5 -rotate-45" : "top-3"
              )}
            />
          </span>
        </button>
      </header>

      {/* mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[59] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/25 backdrop-blur-sm transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <nav
          aria-label="Story sections"
          className={cn(
            "absolute inset-x-3 top-3 rounded-[1.6rem] border border-white/80 bg-cream/97 p-4 shadow-[0_30px_60px_-30px_rgba(84,45,74,.7)] transition-all duration-400",
            open ? "translate-y-16 opacity-100" : "-translate-y-6 opacity-0"
          )}
        >
          <p className="hand px-2 pb-2 text-xl text-rose">where would you like to go, Api?</p>
          <ul className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id} className={i === NAV_ITEMS.length - 1 ? "col-span-2" : ""}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition",
                    active === item.id
                      ? "border-blush bg-blush/30 text-ink"
                      : "border-white bg-white/70 text-ink-soft active:scale-[0.98]"
                  )}
                >
                  {item.label}
                  <span className="text-xs text-ink-faint">0{i + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

/* ---------------- Music toggle ---------------- */
export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const [nudge, setNudge] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setNudge(false), 7000);
    return () => window.clearTimeout(t);
  }, []);

  const toggle = async () => {
    const next = await musicBox.toggle();
    setPlaying(next);
    setSupported(musicBox.available);
    setNudge(false);
  };

  if (!supported) {
    return (
      <div className="fixed bottom-5 right-4 z-[65] sm:bottom-7 sm:right-7">
        <span className="rounded-full border border-white/70 bg-white/85 px-3 py-2 text-[0.7rem] font-semibold text-ink-faint shadow-sm backdrop-blur-md">
          🎵 music isn't available on this device
        </span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-4 z-[65] flex items-center gap-2 sm:bottom-7 sm:right-7">
      {nudge && (
        <span className="a-fade hidden rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm backdrop-blur-md sm:block">
          soft music? 🎵
        </span>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
        title={playing ? "Pause music" : "Play music"}
        className={cn(
          "group relative grid h-13 w-13 place-items-center rounded-full border border-white/80 p-0 shadow-[0_18px_36px_-20px_rgba(84,45,74,.8)] backdrop-blur-xl transition-all duration-500 hover:scale-110 active:scale-95",
          "h-[3.25rem] w-[3.25rem]",
          playing ? "bg-gradient-to-br from-blush/80 to-lav/70" : "bg-white/80"
        )}
      >
        {playing ? (
          <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-ink"
                style={{
                  height: `${[60, 100, 45, 80][i]}%`,
                  animation: `floatYSmall ${0.7 + i * 0.16}s ease-in-out ${i * 0.09}s infinite alternate`,
                }}
              />
            ))}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink" aria-hidden="true">
            <path
              fill="currentColor"
              d="M9 18.5a2.5 2.5 0 1 1-2.5-2.5c.5 0 1 .14 1.4.4V5.2l10-2v10.3a2.5 2.5 0 1 1-2.5-2.5c.5 0 1 .14 1.4.4V6.1L9 7.7z"
            />
          </svg>
        )}
        <span className="absolute inset-0 -z-10 rounded-full bg-blush/40 blur-lg transition group-hover:bg-blush/70" />
      </button>
    </div>
  );
}
