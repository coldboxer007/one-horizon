"use client";

import { motion } from "framer-motion";

export type MedalVariant = "trophy" | "bronze" | "honorable";

/**
 * Medal — three cinematic, self-animating award medallions.
 * Sized 96×96 by default; all gradients/glows are inline so no external defs bleed.
 */
export function Medal({
  variant,
  size = 96,
}: {
  variant: MedalVariant;
  size?: number;
}) {
  switch (variant) {
    case "trophy":
      return <Trophy size={size} />;
    case "bronze":
      return <Bronze size={size} />;
    case "honorable":
      return <Honorable size={size} />;
  }
}

/* ---------------------------------- TROPHY --------------------------------- */
/* Azure gradient trophy with a subtle lift + a "star of merit" on the face.
   Halo glow behind, soft floating animation, a ghost reflection on the cup.  */
function Trophy({ size }: { size: number }) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Halo */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(106,169,255,0.55), rgba(106,169,255,0) 65%)",
        }}
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="relative"
        aria-hidden
        animate={{ y: [0, -3.2, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="tro-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d5e8ff" />
            <stop offset="45%" stopColor="#6aa9ff" />
            <stop offset="100%" stopColor="#2b5dbd" />
          </linearGradient>
          <linearGradient id="tro-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eaf3ff" />
            <stop offset="100%" stopColor="#5c92e0" />
          </linearGradient>
          <linearGradient id="tro-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f6fc2" />
            <stop offset="100%" stopColor="#15305f" />
          </linearGradient>
          <linearGradient id="tro-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Handles */}
        <path
          d="M30 44 Q16 44 16 58 Q16 72 32 74"
          stroke="url(#tro-body)"
          strokeWidth="3.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M90 44 Q104 44 104 58 Q104 72 88 74"
          stroke="url(#tro-body)"
          strokeWidth="3.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Cup body */}
        <path
          d="M30 30 L90 30 L84 74 Q60 84 36 74 Z"
          fill="url(#tro-body)"
        />

        {/* Rim */}
        <rect x="27" y="26" width="66" height="7" rx="1.5" fill="url(#tro-rim)" />

        {/* Star of merit */}
        <path
          d="M60 46 L63.2 55 L72.8 55 L65 60.7 L68.2 69.8 L60 64 L51.8 69.8 L55 60.7 L47.2 55 L56.8 55 Z"
          fill="rgba(255,255,255,0.9)"
        />

        {/* Specular shine sweep */}
        <motion.rect
          x="30"
          y="30"
          width="60"
          height="44"
          fill="url(#tro-shine)"
          opacity="0.7"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: [20, 90, 90], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            repeatDelay: 3.2,
            ease: "easeInOut",
          }}
          style={{ mixBlendMode: "screen" }}
        />

        {/* Stem */}
        <rect x="55" y="82" width="10" height="10" rx="1" fill="url(#tro-base)" />

        {/* Plinth */}
        <rect x="40" y="92" width="40" height="5" rx="2" fill="url(#tro-base)" />
        <rect
          x="44"
          y="97"
          width="32"
          height="9"
          rx="2"
          fill="url(#tro-base)"
          opacity="0.85"
        />

        {/* "50" engraved on plinth — micro detail */}
        <text
          x="60"
          y="104"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="700"
          fill="rgba(255,255,255,0.85)"
          letterSpacing="1.2"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          WINNER
        </text>
      </motion.svg>

      {/* Orbiting sparkles */}
      <motion.span
        aria-hidden
        className="absolute left-[12%] top-[22%] size-1.5 rounded-full bg-white"
        animate={{ opacity: [0, 1, 0], scale: [0.6, 1.3, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.span
        aria-hidden
        className="absolute right-[10%] top-[36%] size-1 rounded-full bg-white"
        animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: 1.1 }}
      />
      <motion.span
        aria-hidden
        className="absolute left-[20%] top-[58%] size-1 rounded-full bg-[color:#6aa9ff]"
        animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.2, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 1.7 }}
      />
    </motion.div>
  );
}

/* ---------------------------------- BRONZE --------------------------------- */
/* A classic bronze third-place medal. Violet ribbon flaps (bridging into the
   card's violet accent), bronze disc with "3", laurel accents, gentle sway.   */
function Bronze({ size }: { size: number }) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Warm halo */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 62%, rgba(214,140,80,0.5), rgba(140,107,255,0.22) 55%, transparent 75%)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="relative"
        aria-hidden
        animate={{ rotate: [-2.4, 2.4, -2.4] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 18px" }}
      >
        <defs>
          <linearGradient id="bro-outer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2c89a" />
            <stop offset="40%" stopColor="#c98a4e" />
            <stop offset="100%" stopColor="#5a3316" />
          </linearGradient>
          <radialGradient id="bro-inner" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#f9d7a9" />
            <stop offset="55%" stopColor="#b8763a" />
            <stop offset="100%" stopColor="#5a3316" />
          </radialGradient>
          <linearGradient id="bro-ribbon-l" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a98aff" />
            <stop offset="100%" stopColor="#5a48b5" />
          </linearGradient>
          <linearGradient id="bro-ribbon-r" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6f5bc9" />
            <stop offset="100%" stopColor="#a98aff" />
          </linearGradient>
        </defs>

        {/* Ribbon flap left */}
        <path
          d="M36 6 L52 34 L60 24 L52 6 Z"
          fill="url(#bro-ribbon-l)"
        />
        {/* Ribbon flap right */}
        <path
          d="M84 6 L68 34 L60 24 L68 6 Z"
          fill="url(#bro-ribbon-r)"
        />
        {/* Ribbon center knot */}
        <path
          d="M55 18 L65 18 L63 28 L57 28 Z"
          fill="#3e2a8c"
        />

        {/* Medal outer ring */}
        <circle cx="60" cy="70" r="28" fill="url(#bro-outer)" />
        {/* Bevel highlight */}
        <circle
          cx="60"
          cy="70"
          r="28"
          fill="none"
          stroke="rgba(255,220,180,0.55)"
          strokeWidth="0.8"
        />

        {/* Medal face */}
        <circle cx="60" cy="70" r="22" fill="url(#bro-inner)" />

        {/* Laurel wreath (simplified — two arcs with leaf pips) */}
        <g stroke="#5a3316" strokeWidth="1" fill="none" opacity="0.85">
          <path d="M42 70 Q38 62 44 54" />
          <path d="M42 70 Q38 78 44 86" />
          <path d="M78 70 Q82 62 76 54" />
          <path d="M78 70 Q82 78 76 86" />
        </g>
        {/* Leaf pips */}
        {[
          [41, 60],
          [43, 56],
          [41, 80],
          [43, 84],
          [79, 60],
          [77, 56],
          [79, 80],
          [77, 84],
        ].map(([cx, cy], i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="2.2"
            ry="1.2"
            fill="#7a4a22"
            opacity="0.9"
          />
        ))}

        {/* The big "3" */}
        <text
          x="60"
          y="80"
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill="#fff2dd"
          stroke="rgba(90,45,15,0.6)"
          strokeWidth="0.4"
          style={{
            fontFamily: "var(--font-display), serif",
            paintOrder: "stroke",
          }}
        >
          3
        </text>

        {/* Specular highlight on the disc */}
        <ellipse
          cx="50"
          cy="60"
          rx="10"
          ry="4"
          fill="rgba(255,255,255,0.32)"
        />
      </motion.svg>

      {/* "BRONZE" micro-caption */}
      <div
        aria-hidden
        className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 text-[8px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-[#e3a876]/90"
      >
        Bronze
      </div>
    </motion.div>
  );
}

/* --------------------------------- HONORABLE ------------------------------- */
/* A rosette badge: starburst backing + gem-cut central medallion + "HM" +
   arc text. Gentle pulse + rosette rotation.                                  */
function Honorable({ size }: { size: number }) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Mint halo */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(94,240,216,0.55), rgba(94,240,216,0) 65%)",
        }}
        animate={{ opacity: [0.5, 0.95, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="relative"
        aria-hidden
      >
        <defs>
          <linearGradient id="hm-gem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6fff4" />
            <stop offset="45%" stopColor="#5ef0d8" />
            <stop offset="100%" stopColor="#1f8f80" />
          </linearGradient>
          <linearGradient id="hm-gem-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a5e58" />
            <stop offset="100%" stopColor="#0c1f1c" />
          </linearGradient>
          <linearGradient id="hm-ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(94,240,216,0.9)" />
            <stop offset="100%" stopColor="rgba(94,240,216,0.05)" />
          </linearGradient>
        </defs>

        {/* Starburst rays (rotating slowly) */}
        <motion.g
          style={{ transformOrigin: "60px 60px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="58.5"
              y="8"
              width="3"
              height="44"
              fill="url(#hm-ray)"
              opacity={i % 2 === 0 ? 0.75 : 0.35}
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
        </motion.g>

        {/* Outer rosette ring */}
        <circle
          cx="60"
          cy="60"
          r="34"
          fill="none"
          stroke="rgba(94,240,216,0.35)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />

        {/* Gem (faceted hexagon-ish medallion) */}
        <g transform="translate(60 60)">
          {/* Outer gem border */}
          <polygon
            points="0,-26 22,-13 22,13 0,26 -22,13 -22,-13"
            fill="url(#hm-gem-dark)"
            stroke="url(#hm-gem)"
            strokeWidth="1.6"
          />
          {/* Top facet — highlight */}
          <polygon
            points="0,-26 22,-13 0,0 -22,-13"
            fill="rgba(94,240,216,0.28)"
          />
          {/* Bottom facet — darker */}
          <polygon
            points="-22,13 22,13 0,26"
            fill="rgba(0,0,0,0.35)"
          />
          {/* Inner facet edges */}
          <g
            stroke="url(#hm-gem)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.5"
          >
            <line x1="0" y1="-26" x2="0" y2="0" />
            <line x1="22" y1="-13" x2="0" y2="0" />
            <line x1="-22" y1="-13" x2="0" y2="0" />
            <line x1="0" y1="0" x2="22" y2="13" />
            <line x1="0" y1="0" x2="-22" y2="13" />
            <line x1="0" y1="0" x2="0" y2="26" />
          </g>

          {/* HM lettering */}
          <text
            x="0"
            y="6.5"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="url(#hm-gem)"
            letterSpacing="0.5"
            style={{
              fontFamily: "var(--font-display), sans-serif",
              filter: "drop-shadow(0 0 6px rgba(94,240,216,0.7))",
            }}
          >
            HM
          </text>
        </g>

        {/* Ribbon tails */}
        <path d="M42 90 L42 112 L52 106 L52 90 Z" fill="#1f8f80" />
        <path d="M42 90 L42 100 L52 94 L52 90 Z" fill="#5ef0d8" opacity="0.8" />
        <path d="M78 90 L78 112 L68 106 L68 90 Z" fill="#1f8f80" />
        <path d="M78 90 L78 100 L68 94 L68 90 Z" fill="#5ef0d8" opacity="0.8" />
      </svg>

      {/* "HONORABLE MENTION" micro caption */}
      <div
        aria-hidden
        className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[7.5px] tracking-[0.25em] uppercase font-[family-name:var(--font-mono)] text-[#9ff5e1]/90"
      >
        Honorable · Mention
      </div>

      {/* Pulse ring */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ border: "1px solid rgba(94,240,216,0.6)" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0.6, 0, 0.6], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.div>
  );
}
