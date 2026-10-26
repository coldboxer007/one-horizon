"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { recognitions, type Recognition } from "@/lib/projects";
import { BrandIcon, brandMeta } from "./BrandIcon";
import { Medal } from "./Medal";

const colorMap: Record<
  Recognition["color"],
  { stroke: string; glow: string; text: string; soft: string }
> = {
  azure: {
    stroke: "rgba(106,169,255,0.55)",
    glow: "rgba(106,169,255,0.35)",
    text: "#6aa9ff",
    soft: "rgba(106,169,255,0.08)",
  },
  violet: {
    stroke: "rgba(140,107,255,0.55)",
    glow: "rgba(140,107,255,0.35)",
    text: "#a98aff",
    soft: "rgba(140,107,255,0.08)",
  },
  mint: {
    stroke: "rgba(94,240,216,0.55)",
    glow: "rgba(94,240,216,0.35)",
    text: "#5ef0d8",
    soft: "rgba(94,240,216,0.08)",
  },
};

export default function Recognition() {
  return (
    <div className="relative">
      {/* Header ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="mb-6 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/55"
      >
        <span className="inline-block h-px w-8 bg-gradient-to-r from-[color:var(--color-accent-3)] to-[color:var(--color-accent)]" />
        <span className="text-white/80">Recognition</span>
        <span className="text-white/30">/</span>
        <span className="text-white/45">Verified wins · 2025</span>
        <span className="flex-1 h-px bg-white/10" />
        <span className="inline-flex items-center gap-1.5 text-white/45">
          <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
          Live
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {recognitions.map((r, i) => (
          <RecognitionCard key={r.projectSlug} r={r} index={i} />
        ))}
      </div>
    </div>
  );
}

function RecognitionCard({ r, index }: { r: Recognition; index: number }) {
  const c = colorMap[r.color];
  const [scanProgress, setScanProgress] = useState(0);
  const rootRef = useRef<HTMLAnchorElement>(null);

  // Tiny one-shot "scan" that sweeps across the card on reveal
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const delay = index * 140;
    const tick = (now: number) => {
      const t = Math.max(0, (now - start - delay) / duration);
      setScanProgress(Math.min(1, t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revealed, index]);

  return (
    <motion.a
      ref={rootRef}
      href={`#${r.projectSlug}`}
      aria-label={`${r.project}, ${r.rank}, ${r.venue}`}
      data-cursor="link"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]/60 p-5 md:p-6 transition-colors hover:border-white/20"
      style={{
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.02), 0 0 0 1px transparent`,
      }}
    >
      {/* Accent glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 size-60 rounded-full blur-3xl opacity-35 group-hover:opacity-80 transition-opacity duration-500"
        style={{ background: c.glow }}
      />

      {/* Animated sweep scan line */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c.soft} 45%, ${c.stroke} 50%, ${c.soft} 55%, transparent 100%)`,
          transform: `translateX(${(-1 + scanProgress * 2) * 100}%)`,
          opacity: scanProgress < 1 ? 0.8 : 0,
          transition: "opacity 0.4s",
          mixBlendMode: "screen",
        }}
      />

      {/* Corner frame ticks */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <g stroke={c.stroke} strokeWidth="0.35" fill="none">
          <path d="M1,10 L1,1 L10,1" />
          <path d="M99,10 L99,1 L90,1" />
          <path d="M1,90 L1,99 L10,99" />
          <path d="M99,90 L99,99 L90,99" />
        </g>
      </svg>

      {/* Header: status + global indicator */}
      <div className="relative flex items-center justify-between text-[10px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)]">
        <span className="inline-flex items-center gap-2 text-white/55">
          <span
            className="size-1.5 rounded-full"
            style={{
              background: c.text,
              boxShadow: `0 0 10px ${c.stroke}`,
            }}
          />
          <span>◆ 00{index + 1} · Win</span>
        </span>
        {r.global && (
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: c.text }}
          >
            <GlobeGlyph color={c.text} />
            <span className="tracking-[0.28em]">Global</span>
          </span>
        )}
      </div>

      {/* Medal + title */}
      <div className="relative mt-5 flex items-center gap-5">
        <div className="relative shrink-0">
          <Medal variant={r.medal} size={92} />
        </div>
        <div className="min-w-0">
          <div className="font-[family-name:var(--font-display)] text-[22px] md:text-[24px] text-white font-medium tracking-tight leading-tight">
            {r.project}
          </div>
          <div className="mt-1 text-[11px] tracking-[0.18em] uppercase font-[family-name:var(--font-mono)] text-white/45">
            {r.rankCaption}
          </div>
          <div
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)]"
            style={{
              borderColor: c.stroke,
              color: c.text,
              background: c.soft,
              boxShadow: `0 0 14px ${c.glow}`,
            }}
          >
            <span
              className="size-1 rounded-full"
              style={{ background: c.text }}
            />
            {r.rank}
          </div>
        </div>
      </div>

      {/* Body: venue + scale + pool */}
      <div className="relative mt-6 border-t border-[color:var(--color-line)] pt-4">
        <div className="text-[13.5px] leading-relaxed text-white/75">
          {r.venue}
        </div>
        {r.scale && (
          <div
            className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-[family-name:var(--font-mono)] tracking-wide"
            style={{ color: c.text, opacity: 0.85 }}
          >
            <GlobeGlyph color={c.text} size={11} />
            <span>{r.scale}</span>
          </div>
        )}
        {r.pool && (
          <div className="mt-1 text-[12px] font-[family-name:var(--font-mono)] tracking-wide text-white/40">
            {r.pool}
          </div>
        )}
      </div>

      {/* Footer: partners */}
      <div className="relative mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {r.partners.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.18em] uppercase font-[family-name:var(--font-mono)] text-white/55 group-hover:text-white/85 transition-colors"
            >
              <BrandIcon brand={b} size={14} />
              <span>{brandMeta[b].label}</span>
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.2em] uppercase font-[family-name:var(--font-mono)] text-white/40 group-hover:text-white/85 transition-colors">
          View
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H9M17 7V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

/** Tiny animated wireframe globe — meridians rotate slowly to signal "global". */
function GlobeGlyph({
  color,
  size = 12,
}: {
  color: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {/* Outer sphere */}
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke={color}
        strokeWidth="1.1"
        opacity="0.9"
      />
      {/* Equator */}
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.2"
        stroke={color}
        strokeWidth="0.9"
        opacity="0.7"
      />
      {/* Rotating meridians — skew wrapped around Y to imply 3D spin */}
      <motion.g
        style={{ transformOrigin: "12px 12px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <ellipse
          cx="12"
          cy="12"
          rx="3.2"
          ry="9.5"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.55"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="6.5"
          ry="9.5"
          stroke={color}
          strokeWidth="0.7"
          opacity="0.35"
        />
      </motion.g>
      {/* Soft pulse highlight */}
      <motion.circle
        cx="8"
        cy="8"
        r="1.2"
        fill={color}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
