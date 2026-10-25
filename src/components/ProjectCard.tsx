"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/cn";
import SceneGraphic from "./SceneGraphic";
import { BrandIcon, brandMeta } from "./BrandIcon";

const accentMap: Record<
  Project["accent"],
  { from: string; to: string; glow: string; dot: string }
> = {
  azure: {
    from: "rgba(106,169,255,0.55)",
    to: "rgba(140,107,255,0.30)",
    glow: "rgba(106,169,255,0.35)",
    dot: "#6aa9ff",
  },
  violet: {
    from: "rgba(140,107,255,0.55)",
    to: "rgba(94,240,216,0.25)",
    glow: "rgba(140,107,255,0.35)",
    dot: "#8c6bff",
  },
  ember: {
    from: "rgba(255,140,90,0.55)",
    to: "rgba(255,89,109,0.30)",
    glow: "rgba(255,140,90,0.32)",
    dot: "#ff8c5a",
  },
  mint: {
    from: "rgba(94,240,216,0.55)",
    to: "rgba(106,169,255,0.30)",
    glow: "rgba(94,240,216,0.32)",
    dot: "#5ef0d8",
  },
  rose: {
    from: "rgba(255,120,170,0.55)",
    to: "rgba(140,107,255,0.30)",
    glow: "rgba(255,120,170,0.32)",
    dot: "#ff78aa",
  },
  cyan: {
    from: "rgba(90,220,255,0.55)",
    to: "rgba(94,240,216,0.30)",
    glow: "rgba(90,220,255,0.32)",
    dot: "#5adcff",
  },
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const accent = accentMap[project.accent];

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    // Tilt is a hover affordance — skip it for touch so cards don't wobble
    // while scrolling on mobile.
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    rx.set((0.5 - y) * 8);
    ry.set((x - 0.5) * 10);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.06 }}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        perspective: 1200,
        ["--verse" as string]: accent.dot,
      }}
      className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]/70 backdrop-blur-sm transition-colors hover:border-white/20 min-h-[420px]"
    >
      <div
        style={{
          background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), ${accent.glow}, transparent 45%)`,
        }}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden
      />

      {/* Gradient edge */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 mix-blend-screen"
        style={{
          background: `linear-gradient(120deg, ${accent.from} 0%, transparent 40%, transparent 60%, ${accent.to} 100%)`,
        }}
        aria-hidden
      />

      {/* Each system is its own universe: halftone print blooms under the cursor */}
      <div className="verse-dots pointer-events-none absolute inset-0" aria-hidden />

      <StandardLayout
        project={project}
        accent={accent}
        index={index}
        primaryLink={project.links[0]}
      />
    </motion.article>
  );
}

function StandardLayout({
  project,
  accent,
  index,
  primaryLink,
}: {
  project: Project;
  accent: { from: string; to: string; glow: string; dot: string };
  index: number;
  primaryLink: Project["links"][number] | undefined;
}) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <SceneGraphic type={project.sceneType} accent={accent} />
      </div>

      <div
        className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden
            className="absolute right-5 top-2 md:right-6 md:top-2.5 text-[9.5px] tracking-[0.24em] font-[family-name:var(--font-mono)] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-200"
            style={{ color: accent.dot }}
          >
            EARTH-1H{String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
              <span
                className="size-1.5 rounded-full"
                style={{ background: accent.dot, boxShadow: `0 0 10px ${accent.dot}` }}
              />
              <span>
                {String(index + 1).padStart(2, "0")} · {project.domain}
              </span>
            </div>
            <h3 className="verse-title font-[family-name:var(--font-display)] font-medium tracking-[-0.02em] text-white text-[clamp(1.7rem,2.4vw,2.2rem)]">
              {project.title}
            </h3>
            <p className="text-[14px] text-white/70 max-w-[36ch]">
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-[13.5px] text-white/60 leading-relaxed max-w-[52ch]">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/60 font-[family-name:var(--font-mono)] tracking-tight"
              >
                {s}
              </span>
            ))}
          </div>

          <BrandStrip brands={project.brands} accent={accent.dot} />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-[11px] text-white/40 font-[family-name:var(--font-mono)] tracking-wide">
              <span>{project.timeline}</span>
              {project.achievement && (
                <>
                  <span className="opacity-40">·</span>
                  <span className="text-white/50 line-clamp-1">
                    {project.status}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {project.links.map((l) => (
                <LinkButton key={l.href} link={l} primary={l === primaryLink} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LinkButton({
  link,
  primary,
}: {
  link: Project["links"][number];
  primary: boolean;
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] transition-all",
        primary
          ? "bg-white text-black border-white hover:bg-white/90"
          : "border-white/15 bg-white/[0.04] text-white/80 hover:bg-white/[0.1] hover:border-white/25",
      )}
    >
      {link.label}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 17L17 7M17 7H9M17 7V15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function BrandStrip({
  brands,
  accent,
}: {
  brands: Project["brands"];
  accent: string;
}) {
  if (!brands || brands.length === 0) return null;
  return (
    <div className="flex items-center gap-3 pt-1 border-t border-[color:var(--color-line)] mt-1">
      <span
        className="text-[9.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/35 pt-3"
        style={{ textShadow: `0 0 8px ${accent}20` }}
      >
        Built on
      </span>
      <div className="flex items-center gap-3 pt-3">
        {brands.map((b) => (
          <span
            key={b}
            title={brandMeta[b].label}
            className="inline-flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity"
          >
            <BrandIcon brand={b} size={14} />
            <span className="text-[10.5px] text-white/55 font-[family-name:var(--font-mono)] tracking-wide">
              {brandMeta[b].label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
