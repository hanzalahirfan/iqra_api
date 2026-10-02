import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";

/* ============================================================
   Recurring characters: "Api" and "Bhai"
   Cute, flat, elegant — no copyrighted anything.
   ============================================================ */

const SKIN = "#F6D8C2";
const SKIN_SHADE = "#EBBFA3";
const HAIR = "#432C3B";

function ApiArt() {
  return (
    <g>
      <ellipse cx="60" cy="173" rx="31" ry="5.5" fill="#5B3A50" opacity="0.1" />
      {/* dupatta drape behind */}
      <path
        d="M60 24C41 24 28 38 27 58l-5 71c-.4 6 3.6 9.4 9 7.3l13-5v30h32v-30l13 5c5.4 2.1 9.4-1.3 9-7.3l-5-71C92 38 79 24 60 24z"
        fill="#C8B9EA"
      />
      <path
        d="M60 24C41 24 28 38 27 58l-5 71c-.4 6 3.6 9.4 9 7.3l13-5v30h32v-30l13 5c5.4 2.1 9.4-1.3 9-7.3l-5-71C92 38 79 24 60 24z"
        fill="url(#apiSheen)"
        opacity="0.5"
      />
      {/* kameez */}
      <path d="M41 108q19-11 38 0l7 55q-26 9-52 0z" fill="#F6C3D1" />
      <path d="M41 108q19-11 38 0l2 15q-21 8-42 0z" fill="#FFFFFF" opacity="0.35" />
      <path d="M35.5 158q24.5 8 49 0" stroke="#D3A35C" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M60 104v50" stroke="#E28BA6" strokeWidth="1.6" opacity="0.6" />
      {/* neck */}
      <rect x="53" y="86" width="14" height="18" rx="7" fill={SKIN_SHADE} />
      {/* head */}
      <circle cx="60" cy="64" r="27" fill={SKIN} />
      {/* hair */}
      <path d="M33 66C33 44 45 32 60 32s27 12 27 34c-3-11-12-17-27-17s-24 6-27 17z" fill={HAIR} />
      <path d="M33 62c-2 22 0 35 5 44l9-4c-5-12-6-26-5-40z" fill={HAIR} />
      <path d="M87 62c2 22 0 35-5 44l-9-4c5-12 6-26 5-40z" fill={HAIR} />
      {/* dupatta hood framing the face */}
      <path
        d="M31 74C31 42 43 27 60 27s29 15 29 47"
        stroke="#DDD2F6"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M31 74C31 42 43 27 60 27s29 15 29 47"
        stroke="#D3A35C"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* face */}
      <g stroke={HAIR} strokeWidth="2.1" strokeLinecap="round" fill="none">
        <path d="M48 64q4-4.5 8 0" />
        <path d="M64 64q4-4.5 8 0" />
        <path d="M54 76q6 5 12 0" />
      </g>
      <circle cx="45" cy="72" r="4.2" fill="#E28BA6" opacity="0.55" />
      <circle cx="75" cy="72" r="4.2" fill="#E28BA6" opacity="0.55" />
      <circle cx="34" cy="78" r="2.1" fill="#D3A35C" />
      <circle cx="86" cy="78" r="2.1" fill="#D3A35C" />
    </g>
  );
}

function BhaiArt() {
  return (
    <g>
      <ellipse cx="60" cy="173" rx="30" ry="5.5" fill="#5B3A50" opacity="0.1" />
      {/* shirt */}
      <path d="M39 110q21-12 42 0l8 53q-29 9-58 0z" fill="#BCD9F0" />
      <path d="M39 110q21-12 42 0l2 12q-23 8-46 0z" fill="#FFFFFF" opacity="0.4" />
      <path d="M60 106v56" stroke="#8FB6D6" strokeWidth="1.8" />
      <path d="M52 106l8 10 8-10" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <path d="M33.5 158q26.5 8 53 0" stroke="#8FB6D6" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* neck */}
      <rect x="53" y="86" width="14" height="18" rx="7" fill={SKIN_SHADE} />
      {/* head */}
      <circle cx="60" cy="64" r="27" fill={SKIN} />
      {/* hair */}
      <path d="M32 64C32 41 44 30 60 30s28 11 28 34c-4-13-10-18-18-18-9 0-11 4-22 6-9 1.6-13 5-16 12z" fill={HAIR} />
      <path d="M70 34c8 1 14 7 16 15-3-9-8-13-16-15z" fill="#5C3E52" />
      {/* face */}
      <g stroke={HAIR} strokeWidth="2.1" strokeLinecap="round" fill="none">
        <path d="M47 64q4-4.5 8 0" />
        <path d="M65 64q4-4.5 8 0" />
        <path d="M54 76q6 5.5 12 0" />
      </g>
      <circle cx="44" cy="72" r="4" fill="#E28BA6" opacity="0.45" />
      <circle cx="76" cy="72" r="4" fill="#E28BA6" opacity="0.45" />
    </g>
  );
}

const DEFS = (
  <defs>
    <linearGradient id="apiSheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
    </linearGradient>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#EAF3FB" />
      <stop offset="100%" stopColor="#FFF3EA" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFE7B0" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#FFD7B8" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="cakeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FBD3DE" />
      <stop offset="100%" stopColor="#F0A9C0" />
    </linearGradient>
  </defs>
);

export function Api({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 180" className={cn("h-full w-full", className)} style={style} role="img" aria-label="Illustration of Api">
      {DEFS}
      <ApiArt />
    </svg>
  );
}

export function Bhai({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 180" className={cn("h-full w-full", className)} style={style} role="img" aria-label="Illustration of Bhai">
      {DEFS}
      <BhaiArt />
    </svg>
  );
}

/** The two of them, side by side, with a little heart in between. */
export function Siblings({ className, withHeart = true }: { className?: string; withHeart?: boolean }) {
  return (
    <svg viewBox="0 0 300 195" className={cn("h-full w-full", className)} role="img" aria-label="Illustration of Api and Bhai standing together">
      {DEFS}
      <g transform="translate(18,4) scale(0.98)">
        <ApiArt />
      </g>
      <g transform="translate(162,12) scale(0.94)">
        <BhaiArt />
      </g>
      {withHeart && (
        <g className="a-beat" style={{ transformOrigin: "150px 74px" }}>
          <path
            d="M150 88c-9-6-16-11-16-17.5 0-4.6 3.4-7.5 7.4-7.5 3.6 0 6.6 2.2 8.6 5.6 2-3.4 5-5.6 8.6-5.6 4 0 7.4 2.9 7.4 7.5C166 77 159 82 150 88z"
            fill="#E28BA6"
          />
        </g>
      )}
      <g fill="#D3A35C" opacity="0.8">
        <circle cx="120" cy="40" r="2" className="a-twinkle" />
        <circle cx="196" cy="30" r="1.6" className="a-twinkle" style={{ animationDelay: "1s" }} />
        <circle cx="160" cy="18" r="1.8" className="a-twinkle" style={{ animationDelay: "1.8s" }} />
      </g>
    </svg>
  );
}

/* ============================================================
   The Educators — a small, warm school illustration
   ============================================================ */
export function SchoolScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 300" className={cn("h-full w-full", className)} role="img" aria-label="Illustration of a school building">
      {DEFS}
      <rect x="0" y="0" width="520" height="300" rx="26" fill="url(#skyGrad)" />
      {/* sun */}
      <g className="a-spin-slow" style={{ transformOrigin: "440px 62px" }}>
        <circle cx="440" cy="62" r="26" fill="#F7DFA9" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={440 + Math.cos(a) * 33}
              y1={62 + Math.sin(a) * 33}
              x2={440 + Math.cos(a) * 41}
              y2={62 + Math.sin(a) * 41}
              stroke="#EBCE8F"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      {/* clouds */}
      <g fill="#FFFFFF" opacity="0.85">
        <g className="a-float-sm">
          <ellipse cx="86" cy="60" rx="30" ry="15" />
          <ellipse cx="112" cy="54" rx="22" ry="13" />
        </g>
        <g className="a-float-sm" style={{ animationDelay: "1.6s" }}>
          <ellipse cx="330" cy="44" rx="24" ry="12" />
          <ellipse cx="352" cy="40" rx="17" ry="10" />
        </g>
      </g>
      {/* ground */}
      <path d="M0 244h520v30a26 26 0 0 1-26 26H26a26 26 0 0 1-26-26z" fill="#DCEBD9" />
      <path d="M0 244h520v7H0z" fill="#C9E0C6" />
      {/* trees */}
      <g>
        <rect x="52" y="196" width="10" height="52" rx="5" fill="#B98F6B" />
        <circle cx="57" cy="184" r="30" fill="#B7DDB4" />
        <circle cx="40" cy="198" r="20" fill="#C9E6C4" />
        <circle cx="74" cy="198" r="20" fill="#A9D3A6" />
      </g>
      <g>
        <rect x="462" y="204" width="9" height="44" rx="4.5" fill="#B98F6B" />
        <circle cx="466" cy="194" r="25" fill="#B7DDB4" />
        <circle cx="450" cy="205" r="16" fill="#C9E6C4" />
      </g>
      {/* building */}
      <rect x="132" y="118" width="256" height="130" rx="8" fill="#FFF8F1" stroke="#EAD3C2" strokeWidth="2" />
      <path d="M120 122l140-56 140 56z" fill="#F6C3D1" />
      <path d="M120 122l140-56 140 56z" fill="#FFFFFF" opacity="0.18" />
      <rect x="120" y="118" width="280" height="10" rx="5" fill="#E28BA6" />
      {/* flag */}
      <line x1="260" y1="66" x2="260" y2="28" stroke="#C9A98C" strokeWidth="3" strokeLinecap="round" />
      <path d="M261 30h34l-8 9 8 9h-34z" fill="#C8B9EA" className="a-sway" style={{ transformOrigin: "261px 30px" }} />
      {/* plaque */}
      <rect x="196" y="132" width="128" height="26" rx="13" fill="#FDF0E4" stroke="#E5C9B4" strokeWidth="1.5" />
      <text
        x="260"
        y="149"
        textAnchor="middle"
        fontFamily="Manrope, sans-serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="2.4"
        fill="#A9768C"
      >
        THE EDUCATORS
      </text>
      {/* windows */}
      {[156, 196, 284, 324].map((x) => (
        <g key={x}>
          <rect x={x} y="176" width="40" height="46" rx="18" fill="#CFE4F5" stroke="#EAD3C2" strokeWidth="2" />
          <line x1={x + 20} y1="176" x2={x + 20} y2="222" stroke="#FFFFFF" strokeWidth="2" />
          <line x1={x} y1="199" x2={x + 40} y2="199" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      ))}
      {/* door */}
      <path d="M240 248v-40a20 20 0 0 1 40 0v40z" fill="#C8B9EA" stroke="#B4A2DC" strokeWidth="2" />
      <circle cx="272" cy="228" r="2.6" fill="#D3A35C" />
      {/* steps */}
      <rect x="228" y="248" width="64" height="6" rx="3" fill="#EFE0D2" />
      <rect x="220" y="254" width="80" height="6" rx="3" fill="#E6D5C6" />
      {/* bushes */}
      <ellipse cx="120" cy="248" rx="24" ry="13" fill="#B7DDB4" />
      <ellipse cx="402" cy="248" rx="22" ry="12" fill="#B7DDB4" />
      {/* birds */}
      <g stroke="#B9A2C9" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M176 44q6-6 12 0q6-6 12 0" />
        <path d="M228 30q5-5 10 0q5-5 10 0" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ============================================================
   Cake, envelope, lantern, balloon, florals
   ============================================================ */
export function Cake({ className, lit = true }: { className?: string; lit?: boolean }) {
  const candles = [
    { x: 82, c: "#C8B9EA" },
    { x: 108, c: "#BCD9F0" },
    { x: 134, c: "#F6C3D1" },
  ];
  return (
    <svg viewBox="0 0 220 200" className={cn("h-full w-full", className)} role="img" aria-label="Birthday cake illustration">
      {DEFS}
      <ellipse cx="110" cy="180" rx="88" ry="11" fill="#5B3A50" opacity="0.1" />
      {/* candles */}
      {candles.map((c, i) => (
        <g key={c.x}>
          <rect x={c.x - 4} y={52} width="8" height="34" rx="4" fill={c.c} />
          <rect x={c.x - 4} y={52} width="8" height="34" rx="4" fill="#FFFFFF" opacity="0.25" />
          <line x1={c.x} y1={52} x2={c.x} y2={46} stroke="#8C6B57" strokeWidth="1.8" />
          {lit && (
            <g className="a-flicker" style={{ transformOrigin: `${c.x}px 46px`, animationDelay: `${i * 0.25}s` }}>
              <circle cx={c.x} cy={38} r="13" fill="url(#glowGrad)" />
              <path d={`M${c.x} 30c5 5 6 9 3 12-2 2-5 2-6 0-3-3-2-7 3-12z`} fill="#FFC46B" />
              <path d={`M${c.x} 36c2 2.6 2.4 4.4 1 5.6-1 1-2.4.6-2.8-.6-.8-1.8 0-3.4 1.8-5z`} fill="#FFF0C4" />
            </g>
          )}
        </g>
      ))}
      {/* top tier */}
      <rect x="58" y="84" width="104" height="46" rx="10" fill="#FFF4E9" stroke="#EAD3C2" strokeWidth="2" />
      <path
        d="M58 96q8 12 16 0t16 0 16 0 16 0 16 0 16 0v-12a10 10 0 0 0-10-10H68a10 10 0 0 0-10 10z"
        fill="#F6C3D1"
      />
      {/* bottom tier */}
      <rect x="34" y="128" width="152" height="48" rx="12" fill="url(#cakeGrad)" stroke="#E79CB6" strokeWidth="2" />
      <path
        d="M34 142q10 14 20 0t20 0 20 0 20 0 20 0 20 0 20 0v-14a12 12 0 0 0-12-12H46a12 12 0 0 0-12 12z"
        fill="#FFF6EF"
      />
      {/* sprinkles */}
      {[
        [56, 158, "#D3A35C"],
        [76, 166, "#BCD9F0"],
        [100, 156, "#FFFFFF"],
        [126, 166, "#C8B9EA"],
        [150, 158, "#D3A35C"],
        [168, 166, "#FFF6EF"],
      ].map(([x, y, c], i) => (
        <rect
          key={i}
          x={Number(x)}
          y={Number(y)}
          width="9"
          height="3.4"
          rx="1.7"
          fill={c as string}
          transform={`rotate(${(i * 37) % 90 - 40} ${x} ${y})`}
        />
      ))}
      {/* plate */}
      <ellipse cx="110" cy="178" rx="96" ry="9" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="110" cy="176" rx="96" ry="9" fill="#F3E3D6" />
    </svg>
  );
}

export function EnvelopeArt({ open, className }: { open: boolean; className?: string }) {
  const flapStyle: CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "top center",
    transform: open ? "rotateX(178deg)" : "rotateX(0deg)",
    transition: "transform 1s cubic-bezier(.22,1,.36,1)",
  };
  const letterStyle: CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "bottom center",
    transform: open ? "translateY(-46px) scale(1.02)" : "translateY(0) scale(1)",
    transition: "transform 1s cubic-bezier(.22,1,.36,1) .25s, opacity .6s ease .3s",
    opacity: open ? 1 : 0,
  };
  return (
    <svg viewBox="0 0 260 190" className={cn("h-full w-full", className)} role="img" aria-label="Envelope illustration">
      {DEFS}
      <ellipse cx="130" cy="176" rx="96" ry="10" fill="#5B3A50" opacity="0.12" />
      {/* back */}
      <rect x="34" y="52" width="192" height="118" rx="12" fill="#F0DFD1" />
      {/* letter */}
      <g style={letterStyle}>
        <rect x="56" y="40" width="148" height="106" rx="8" fill="#FFFDF9" stroke="#EAD9C9" strokeWidth="2" />
        <g stroke="#E3C9D4" strokeWidth="4" strokeLinecap="round">
          <line x1="76" y1="66" x2="184" y2="66" />
          <line x1="76" y1="84" x2="164" y2="84" />
          <line x1="76" y1="102" x2="176" y2="102" />
        </g>
        <path d="M118 124c-6-4-11-7.5-11-12 0-3.2 2.3-5.2 5-5.2 2.4 0 4.5 1.5 6 3.8 1.5-2.3 3.6-3.8 6-3.8 2.7 0 5 2 5 5.2 0 4.5-5 8-11 12z" fill="#E28BA6" />
      </g>
      {/* front pocket */}
      <path d="M34 76l96 62 96-62v82a12 12 0 0 1-12 12H46a12 12 0 0 1-12-12z" fill="#FBEEE2" stroke="#EAD9C9" strokeWidth="2" />
      <path d="M34 170l96-62 96 62" fill="none" stroke="#E5CFBD" strokeWidth="2" />
      {/* flap */}
      <g style={flapStyle}>
        <path d="M40 56a12 12 0 0 1 12-8h156a12 12 0 0 1 12 8l-90 62z" fill="#F6E2D2" stroke="#EAD9C9" strokeWidth="2" />
        {!open && (
          <g>
            <circle cx="130" cy="98" r="15" fill="#CF6A8C" />
            <circle cx="130" cy="98" r="15" fill="#FFFFFF" opacity="0.12" />
            <path d="M130 106c-5-3.4-9-6.2-9-10 0-2.7 2-4.4 4.2-4.4 2 0 3.7 1.3 4.8 3.2 1.1-1.9 2.8-3.2 4.8-3.2 2.2 0 4.2 1.7 4.2 4.4 0 3.8-4 6.6-9 10z" fill="#FFF1F4" />
          </g>
        )}
      </g>
    </svg>
  );
}

export function Lantern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 210" className={cn("h-full w-full", className)} role="img" aria-label="Hanging lantern illustration">
      {DEFS}
      <line x1="60" y1="0" x2="60" y2="34" stroke="#C9A98C" strokeWidth="2.5" />
      <circle cx="60" cy="38" r="6" fill="#D3A35C" />
      <path d="M38 48h44l-6 12H44z" fill="#E4C58C" />
      <path d="M34 62h52l8 66c1 12-9 20-20 20H46c-11 0-21-8-20-20z" fill="#FBEFD6" stroke="#E4C58C" strokeWidth="2.5" />
      <circle cx="60" cy="106" r="34" fill="url(#glowGrad)" className="a-glow" style={{ transformOrigin: "60px 106px" }} />
      <g className="a-flicker" style={{ transformOrigin: "60px 122px" }}>
        <path d="M60 88c9 10 12 17 6 23-4 4-11 3-13-2-5-6-3-14 7-21z" fill="#FFC46B" />
        <path d="M60 100c4 5 5 9 2 12-2 2-5 1-6-2-2-4 0-7 4-10z" fill="#FFF3D2" />
      </g>
      <path d="M40 62h40M40 148h40" stroke="#E4C58C" strokeWidth="2" opacity="0.7" />
      <path d="M52 148v10M60 148v14M68 148v10" stroke="#D3A35C" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="60" cy="170" r="4" fill="#D3A35C" />
    </svg>
  );
}

export function Balloon({ color = "#F6C3D1", className, style }: { color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 60 130" className={cn("h-full w-full", className)} style={style} aria-hidden="true">
      <ellipse cx="30" cy="38" rx="24" ry="30" fill={color} />
      <ellipse cx="22" cy="28" rx="7" ry="10" fill="#FFFFFF" opacity="0.4" />
      <path d="M25 67h10l-5 8z" fill={color} />
      <path d="M30 75c6 8-6 14 0 22s-6 14 0 22" stroke="#C9A98C" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

export function FlowerSprig({ className, color = "#F6C3D1" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn("h-full w-full", className)} aria-hidden="true">
      <g>
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx="40"
            cy="26"
            rx="9"
            ry="15"
            fill={color}
            opacity="0.9"
            transform={`rotate(${i * 60} 40 40)`}
          />
        ))}
        <circle cx="40" cy="40" r="8" fill="#F0DCA8" />
        <circle cx="40" cy="40" r="4" fill="#D3A35C" />
      </g>
    </svg>
  );
}

export function Crescent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-full w-full", className)} aria-hidden="true">
      <path d="M42 6a26 26 0 1 0 16 46A28 28 0 0 1 42 6z" fill="#F0DCA8" />
      <circle cx="50" cy="16" r="2.4" fill="#D3A35C" className="a-twinkle" />
    </svg>
  );
}

export function SparkleRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)} aria-hidden="true">
      {["#D3A35C", "#E28BA6", "#C8B9EA"].map((c, i) => (
        <svg key={c} width="14" height="14" viewBox="0 0 24 24" className="a-twinkle" style={{ animationDelay: `${i * 0.5}s` }}>
          <path d="M12 2l2 7 7 3-7 3-2 7-2-7-7-3 7-3z" fill={c} />
        </svg>
      ))}
    </div>
  );
}
