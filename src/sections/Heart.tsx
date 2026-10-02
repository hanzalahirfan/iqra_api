import { useEffect, useState } from "react";
import { HiddenGem, MaskLine, Reveal } from "@/components/Fx";
import { Card, Heading, Section } from "@/components/Layout";
import { Api, Siblings } from "@/components/Illustrations";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/utils/cn";

/* ---------------- typewriter ---------------- */
function Typewriter({ text, className, speed = 42 }: { text: string; className?: string; speed?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(text.length);
      return;
    }
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(t);
    }, speed);
    return () => window.clearInterval(t);
  }, [inView, text, speed, reduced]);

  return (
    <span ref={ref} className={className}>
      {text.slice(0, count)}
      {!reduced && count < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-rose/70 align-middle" style={{ animation: "twinkle 1s steps(2) infinite" }} />
      )}
    </span>
  );
}

/* ============================================================
   A MESSAGE FROM YOUR BHAI
   ============================================================ */
export function MessageFromBhai() {
  return (
    <Section tone="cream" overflow={false}>
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        {/* sticky side */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="chip bg-blush/40 text-rose">a message from your bhai</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,5.4vw,3rem)] font-semibold leading-[1.05]">
              <MaskLine>Things I'd say</MaskLine>
              <MaskLine delay={100}>
                <span className="italic font-light">if I said them</span>
              </MaskLine>
              <MaskLine delay={200}>out loud.</MaskLine>
            </h2>
          </Reveal>
          <Reveal delay={240} variant="scale" className="mt-8">
            <div className="relative mx-auto w-44 sm:w-52 lg:mx-0">
              <div className="absolute -inset-3 -z-10 rounded-full bg-blush/35 blur-2xl" />
              <div className="overflow-hidden rounded-[1.6rem] border border-white/85 bg-gradient-to-b from-white/90 to-lav-soft/50 p-4 shadow-[0_28px_56px_-34px_rgba(84,45,74,.7)]">
                <Api className="mx-auto w-full" />
              </div>
              <p className="hand mt-3 text-center text-lg text-rose lg:text-left">my Api 🌸</p>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft lg:max-w-xs">
              I'm better with code than with words said out loud, so I built this instead. Everything below is
              real — just written the way I actually think it.
            </p>
          </Reveal>
        </div>

        {/* the letter */}
        <Reveal variant="right" delay={120}>
          <article className="relative overflow-hidden rounded-[2rem] border border-white/85 bg-white/78 p-7 shadow-[0_36px_70px_-42px_rgba(84,45,74,.7)] backdrop-blur-md sm:p-11">
            <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-peach/40 blur-3xl" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blush via-gold to-lav" />

            <p className="hand text-2xl text-rose">Assalam o Alaikum, Api.</p>

            <div className="mt-5 space-y-5 text-[1.02rem] leading-[1.85] text-ink-soft">
              <p>
                Happy Birthday. 🎂 I could have sent a forwarded message with a picture of a cake like everyone
                else does. But you've been far too important in my life for that, so you got a whole website
                instead. Blame my profession.
              </p>
              <p>
                I want to start with something simple: <strong className="font-semibold text-ink">thank you</strong>.
                Thank you for guiding me when I was new and still figuring things out. Thank you for explaining
                things patiently instead of making me feel like I was asking too much. Thank you for the small
                corrections that actually helped me, and for the way you never made support feel like a favour.
              </p>
              <p>
                I also want you to know that I noticed things. I noticed how hard you work. I noticed that you
                don't only work for yourself — you work for your family, you support your sisters, you carry
                responsibilities that most people around you never even see. And I noticed that despite the
                hurdles life keeps throwing at you, you still show up. You still keep going. You still handle
                things with a maturity that honestly surprises me.
              </p>
              <p className="relative rounded-2xl bg-shell/80 px-5 py-4 font-display text-lg italic leading-relaxed text-ink">
                “That's the part I admire the most, Api — not just that you're strong, but that you're
                consistent about it. Even on days that clearly weren't easy.”
              </p>
              <p>
                Somewhere along the way, we stopped being just colleagues. We became Bhai and Behen. Not because
                of blood — because of respect, care, trust, and all the time we spent together. And I want you to
                know that I take that seriously. I'm genuinely proud to be your Bhai.
              </p>
              <p>
                I'm not at The Educators anymore. We don't share the same corridor or the same timetable. But
                nothing about the respect I have for you changed when the workplace did. If anything, distance
                made it clearer how much those days meant to me.
              </p>
              <p>
                On your birthday, my biggest wish is that you get to feel a little lighter this year. That the
                things you've been praying for quietly start arriving. That Allah puts barakah in your work, your
                time, your health and your rishta with your family. That you get happiness that doesn't come
                with a cost, and rest that you never feel guilty about.
              </p>
              <p>
                And please, don't be too hard on yourself. You're doing so much more than you give yourself
                credit for.
              </p>
              <p className="font-semibold text-ink">
                Happy Birthday, Iqra Api. May Allah keep you smiling — the whole year and long after it.
              </p>
            </div>

            <div className="gold-line mt-8 h-px w-full" />
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="hand text-xl text-ink">With respect, duas &amp; a lot of sibling love,</p>
                <p className="mt-1 font-display text-lg font-semibold text-rose">Your Bhai 🤍</p>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-faint">— Hanzalah</p>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   THINGS I ADMIRE ABOUT YOU — bento grid
   ============================================================ */
type AdmireItem = {
  emoji: string;
  title: string;
  body: string;
  span: string;
  accent: string;
  wash: string;
};

const ADMIRE: AdmireItem[] = [
  {
    emoji: "🌱",
    title: "Your Consistency",
    body: "Even when things aren't easy, you keep going. You keep showing up and doing what needs to be done — and that quiet consistency is rarer than any big dramatic effort.",
    span: "lg:col-span-4",
    accent: "text-[#4f7a52]",
    wash: "from-mint/45",
  },
  {
    emoji: "💪",
    title: "Your Strength",
    body: "You handle responsibilities that many people don't even see. And you handle them without turning it into a complaint.",
    span: "lg:col-span-2",
    accent: "text-[#a2566f]",
    wash: "from-blush/50",
  },
  {
    emoji: "❤️",
    title: "Your Heart",
    body: "You don't only think about yourself. You care deeply about your family and the people around you — and it shows in what you actually do, not just what you say.",
    span: "lg:col-span-2",
    accent: "text-rose",
    wash: "from-blush/45",
  },
  {
    emoji: "🌟",
    title: "Your Inspiration",
    body: "Watching you work for yourself and for your family genuinely inspires me. Some people motivate you with lectures; you do it just by living your life properly.",
    span: "lg:col-span-2",
    accent: "text-[#9a6f2c]",
    wash: "from-gold-soft/60",
  },
  {
    emoji: "🧠",
    title: "Your Maturity",
    body: "The way you understand situations and guide people is something I genuinely respect. You think before you react, and you handle things thoughtfully.",
    span: "lg:col-span-2",
    accent: "text-[#6d5aa8]",
    wash: "from-lav-soft/70",
  },
  {
    emoji: "✨",
    title: "Your Professionalism",
    body: "The way you do your work and help others is remarkable. Serious about the work, never harsh with the people.",
    span: "lg:col-span-3",
    accent: "text-[#4b779c]",
    wash: "from-sky/45",
  },
  {
    emoji: "🌸",
    title: "Your Cute Side",
    body: "Behind that strong, mature, responsible personality there's also an incredibly cute and innocent Api. That contrast is honestly what makes you, you.",
    span: "lg:col-span-3",
    accent: "text-rose",
    wash: "from-peach/60",
  },
];

export function Admire() {
  return (
    <Section id="admire" tone="lav">
      <Heading
        eyebrow="said with full respect"
        tone="lav"
        title={["Things I Admire", <span key="2" className="italic font-light">About You</span>]}
        lead="This isn't flattery, Api. This is just what I've observed over fourteen months — written down honestly."
      />

      <div className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {ADMIRE.map((item, i) => (
          <Reveal
            key={item.title}
            delay={(i % 3) * 90}
            variant={i % 2 ? "right" : "left"}
            className={cn("relative", item.span)}
          >
            <Card className="group h-full overflow-hidden p-6 sm:p-7">
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br to-transparent opacity-70 blur-2xl transition-all duration-700 group-hover:scale-150",
                  item.wash
                )}
              />
              <div className="relative flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/80 bg-white/85 text-2xl shadow-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  {item.emoji}
                </span>
                <div>
                  <h3 className={cn("font-display text-xl font-semibold sm:text-[1.4rem]", item.accent)}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}

        <Reveal delay={120} className="relative sm:col-span-2 lg:col-span-6">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-gold/35 bg-gradient-to-r from-white/85 via-gold-soft/35 to-white/85 p-6 text-center shadow-[0_24px_50px_-34px_rgba(84,45,74,.6)] sm:p-8">
            <p className="font-display text-lg leading-relaxed text-ink sm:text-xl">
              Add <em className="text-rose">caring</em>, add <em className="text-rose">responsible</em>, and add
              the fact that you're <em className="text-rose">beautiful</em> — not only in how you look, but in
              your character, your heart and your efforts.
            </p>
            <p className="hand mt-3 text-xl text-ink-soft">that's the whole list, Api. and it's a long one. 🤍</p>
          </div>
        </Reveal>

        <HiddenGem
          label="A hidden flower"
          emoji="🌷"
          title="Reminder: you're doing better than you think."
          body="From where I'm standing, Api, you're giving your 100%. Please don't be too hard on yourself."
          className="right-2 top-2"
        />
      </div>
    </Section>
  );
}

/* ============================================================
   YOU MAY NOT REALIZE…
   ============================================================ */
const REALIZE = [
  "You may not realize how much your guidance actually helped me.",
  "You may not realize how much I learned just by watching you work.",
  "You may not realize how inspiring your consistency is — especially on your hard days.",
  "You may not realize that some ordinary days became beautiful memories simply because you were there.",
  "You may not realize that somewhere along the way, you became much more than a colleague.",
];

export function YouMayNotRealize() {
  return (
    <Section tone="shell">
      <Heading
        eyebrow="quiet truths"
        tone="rose"
        title={["You May Not", <span key="2" className="italic font-light">Realize This…</span>]}
      />

      <ol className="mx-auto mt-14 max-w-3xl space-y-6">
        {REALIZE.map((line, i) => (
          <Reveal
            key={line}
            as="li"
            delay={i * 40}
            variant={i % 2 ? "right" : "left"}
            className={cn("flex items-center gap-4", i % 2 ? "md:flex-row-reverse md:text-right" : "")}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/80 bg-white/80 font-display text-sm font-semibold text-rose shadow-sm">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="flex-1 rounded-[1.3rem] border border-white/75 bg-white/65 px-5 py-4 font-display text-[1.05rem] leading-relaxed text-ink shadow-[0_18px_40px_-30px_rgba(84,45,74,.6)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/90 sm:text-[1.15rem]">
              {line}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal variant="scale" delay={120} className="relative mt-16">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-white/85 bg-gradient-to-br from-blush/35 via-white/85 to-lav/35 px-6 py-14 text-center shadow-[0_40px_80px_-46px_rgba(84,45,74,.8)] sm:px-12">
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />
          <p className="relative text-[0.68rem] font-bold uppercase tracking-[0.28em] text-ink-faint">
            the one thing you should never doubt
          </p>
          <p className="relative mt-4 font-display text-[clamp(2rem,8vw,3.4rem)] font-semibold leading-tight text-rose">
            <Typewriter text="You became my Api." /> <span className="a-beat inline-block">🤍</span>
          </p>
          <div className="relative mx-auto mt-8 w-40">
            <Siblings className="w-full" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
