/* ------------------------------------------------------------------
   Tiny hand-rolled effects engine: confetti canvas + music box.
   No external dependencies, capped particle counts, rAF driven.
------------------------------------------------------------------- */

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  life: number;
  maxLife: number;
  color: string;
  shape: "heart" | "petal" | "spark" | "ribbon" | "star" | "circle";
  gravity: number;
};

export type BurstOptions = {
  x?: number;
  y?: number;
  count?: number;
  power?: number;
  spread?: number;
  shapes?: Particle["shape"][];
  colors?: string[];
  gravity?: number;
  origin?: "point" | "top" | "sides";
};

const PALETTE = ["#E28BA6", "#F6C3D1", "#C8B9EA", "#FFD7B8", "#D3A35C", "#BCD9F0", "#FFFFFF", "#CF6A8C"];

type Listener = (opts: BurstOptions) => void;
const listeners = new Set<Listener>();

export function onBurst(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Fire a burst of confetti. Safe to call before the canvas mounts (it is dropped). */
export function burst(opts: BurstOptions = {}) {
  listeners.forEach((fn) => fn(opts));
}

export function celebrate() {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  const h = typeof window !== "undefined" ? window.innerHeight : 800;
  burst({ x: w / 2, y: h * 0.42, count: 90, power: 1.15, origin: "point" });
  burst({ x: w * 0.12, y: h * 0.7, count: 42, power: 1, origin: "point" });
  burst({ x: w * 0.88, y: h * 0.7, count: 42, power: 1, origin: "point" });
  window.setTimeout(() => burst({ x: w / 2, y: -20, count: 60, power: 0.5, origin: "top" }), 320);
}

const MAX_PARTICLES = 260;

export class ConfettiEngine {
  particles: Particle[] = [];
  private running = false;
  private raf = 0;
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private dpr = 1;

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.resize();
  }

  detach() {
    this.stop();
    this.ctx = null;
    this.canvas = null;
  }

  resize() {
    if (!this.canvas) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(window.innerWidth * this.dpr);
    this.canvas.height = Math.floor(window.innerHeight * this.dpr);
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
  }

  emit(opts: BurstOptions) {
    const count = Math.min(opts.count ?? 60, MAX_PARTICLES - this.particles.length);
    if (count <= 0) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const origin = opts.origin ?? "point";
    const x = origin === "top" ? Math.random() * w : (opts.x ?? w / 2);
    const y = origin === "top" ? -20 : (opts.y ?? h / 2);
    const power = opts.power ?? 1;
    const spread = opts.spread ?? Math.PI * 2;
    const shapes = opts.shapes ?? ["heart", "petal", "spark", "ribbon", "star", "circle"];
    const colors = opts.colors ?? PALETTE;
    const gravity = opts.gravity ?? 0.055;

    for (let i = 0; i < count; i++) {
      const angle = origin === "top" ? Math.PI / 2 + (Math.random() - 0.5) * 0.9 : -Math.PI / 2 + (Math.random() - 0.5) * spread;
      const speed = (2.4 + Math.random() * 5.6) * power;
      const maxLife = 150 + Math.random() * 130;
      this.particles.push({
        x: x + (Math.random() - 0.5) * 26,
        y: y + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed * (origin === "top" ? 0.4 : 1),
        vy: origin === "top" ? Math.abs(Math.sin(angle)) * speed * 0.4 : Math.sin(angle) * speed,
        size: 5 + Math.random() * 9,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.24,
        life: 0,
        maxLife,
        color: colors[(Math.random() * colors.length) | 0],
        shape: shapes[(Math.random() * shapes.length) | 0],
        gravity,
      });
    }
    this.start();
  }

  private start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      this.step();
      if (this.particles.length > 0 && this.running) this.raf = requestAnimationFrame(loop);
      else this.stop();
    };
    this.raf = requestAnimationFrame(loop);
  }

  private stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.particles = [];
    const ctx = this.ctx;
    if (ctx && this.canvas) ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private step() {
    const ctx = this.ctx;
    if (!ctx || !this.canvas) return;
    const { width, height } = this.canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.scale(this.dpr, this.dpr);

    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      p.vy += p.gravity;
      p.vx *= 0.992;
      p.vy *= 0.995;
      p.x += p.vx + Math.sin((p.life + p.rot * 12) / 22) * 0.7;
      p.y += p.vy;
      p.rot += p.vr;

      const fade = Math.max(0, 1 - p.life / p.maxLife);
      if (fade <= 0.02 || p.y > h + 60 || p.x < -80 || p.x > w + 80) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = fade;
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);

      switch (p.shape) {
        case "heart":
          drawHeart(ctx, p.size);
          break;
        case "star":
          drawStar(ctx, p.size);
          break;
        case "spark":
          drawSpark(ctx, p.size);
          break;
        case "petal":
          drawPetal(ctx, p.size);
          break;
        case "ribbon":
          ctx.fillRect(-p.size * 0.28, -p.size * 0.85, p.size * 0.56, p.size * 1.7);
          break;
        default:
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.42, 0, Math.PI * 2);
          ctx.fill();
      }
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
    ctx.restore();
    void width;
    void height;
  }
}

function drawHeart(ctx: CanvasRenderingContext2D, s: number) {
  const r = s * 0.5;
  ctx.beginPath();
  ctx.moveTo(0, r * 0.75);
  ctx.bezierCurveTo(r * 1.4, -r * 0.35, r * 0.55, -r * 1.25, 0, -r * 0.45);
  ctx.bezierCurveTo(-r * 0.55, -r * 1.25, -r * 1.4, -r * 0.35, 0, r * 0.75);
  ctx.fill();
}

function drawStar(ctx: CanvasRenderingContext2D, s: number) {
  const spikes = 5;
  const outer = s * 0.62;
  const inner = s * 0.26;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawSpark(ctx: CanvasRenderingContext2D, s: number) {
  ctx.lineWidth = Math.max(1.2, s * 0.14);
  ctx.beginPath();
  ctx.moveTo(-s * 0.7, 0);
  ctx.lineTo(s * 0.7, 0);
  ctx.moveTo(0, -s * 0.7);
  ctx.lineTo(0, s * 0.7);
  ctx.stroke();
}

function drawPetal(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.34, s * 0.72, 0, 0, Math.PI * 2);
  ctx.fill();
}

/* ------------------------------------------------------------------
   Music: tries assets/birthday-music.mp3 first, otherwise plays a
   gentle synthesised music-box loop so the button is never "dead".
------------------------------------------------------------------- */
const MUSIC_SRC = "assets/birthday-music.mp3";

type Chord = { root: number; notes: number[] };
const A4 = 440;
const noteFreq = (semi: number) => A4 * Math.pow(2, semi / 12);

// Cmaj7 → Am7 → Fmaj7 → G(add9), expressed as semitone offsets from A4
const PROGRESSION: Chord[] = [
  { root: noteFreq(-21), notes: [-9, -5, -2, 3, 7, 3, -2, -5].map(noteFreq) },
  { root: noteFreq(-24), notes: [-12, -9, -5, 0, 3, 0, -5, -9].map(noteFreq) },
  { root: noteFreq(-28), notes: [-8, -4, -1, 4, 7, 4, -1, -4].map(noteFreq) },
  { root: noteFreq(-26), notes: [-7, -2, 2, 5, 9, 5, 2, -2].map(noteFreq) },
];

export class MusicBox {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private audio: HTMLAudioElement | null = null;
  private timer: number | null = null;
  private step = 0;
  private nextTime = 0;
  private usingFile = false;
  playing = false;
  available = true;

  private ensureContext() {
    if (this.ctx) return this.ctx;
    const Ctor: typeof AudioContext =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) {
      this.available = false;
      return null;
    }
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    const delay = this.ctx.createDelay(1.2);
    delay.delayTime.value = 0.34;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.26;
    const dampen = this.ctx.createBiquadFilter();
    dampen.type = "lowpass";
    dampen.frequency.value = 2100;
    this.master.connect(dampen);
    dampen.connect(this.ctx.destination);
    dampen.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(this.ctx.destination);
    return this.ctx;
  }

  private pluck(freq: number, time: number, dur: number, gain: number) {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = "sine";
    osc2.type = "triangle";
    osc.frequency.value = freq;
    osc2.frequency.value = freq * 2.002;
    const g2 = ctx.createGain();
    g2.gain.value = 0.22;
    env.gain.setValueAtTime(0.0001, time);
    env.gain.exponentialRampToValueAtTime(gain, time + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(env);
    osc2.connect(g2);
    g2.connect(env);
    env.connect(master);
    osc.start(time);
    osc2.start(time);
    osc.stop(time + dur + 0.05);
    osc2.stop(time + dur + 0.05);
  }

  private schedule() {
    const ctx = this.ctx;
    if (!ctx || this.usingFile) return;
    const beat = 0.44; // ~68bpm eighth notes
    while (this.nextTime < ctx.currentTime + 0.8) {
      const chordIndex = Math.floor(this.step / 8) % PROGRESSION.length;
      const chord = PROGRESSION[chordIndex];
      const inBar = this.step % 8;
      const note = chord.notes[inBar];
      const octave = inBar % 2 === 0 ? 1 : 2;
      this.pluck(note * octave, this.nextTime, 2.1, inBar === 0 ? 0.17 : 0.1);
      if (inBar === 0) this.pluck(chord.root / 2, this.nextTime, 3.4, 0.12);
      this.nextTime += beat;
      this.step++;
    }
  }

  /** Returns true if playback started. */
  async play(): Promise<boolean> {
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return false;
    if (ctx.state === "suspended") await ctx.resume();

    if (!this.audio) {
      const audio = new Audio(MUSIC_SRC);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.55;
      this.audio = audio;
    }

    // Prefer the user's own mp3 if it actually exists.
    if (!this.usingFile && this.audio) {
      try {
        await this.audio.play();
        this.usingFile = true;
      } catch {
        this.usingFile = false;
        this.audio.pause();
      }
    }

    if (!this.usingFile) {
      this.step = 0;
      this.nextTime = ctx.currentTime + 0.12;
      this.schedule();
      if (this.timer === null) this.timer = window.setInterval(() => this.schedule(), 120);
    }

    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.4);
    this.playing = true;
    return true;
  }

  pause() {
    this.playing = false;
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.audio && this.usingFile) this.audio.pause();
    const ctx = this.ctx;
    if (ctx && this.master) {
      this.master.gain.cancelScheduledValues(ctx.currentTime);
      this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    }
  }

  async toggle(): Promise<boolean> {
    if (this.playing) {
      this.pause();
      return false;
    }
    return this.play();
  }
}

export const musicBox = new MusicBox();
