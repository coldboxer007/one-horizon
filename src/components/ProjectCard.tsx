"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

type Variant = "hero" | "standard";

export default function ProjectCard({
  project,
  index,
  variant = "standard",
}: {
  project: Project;
  index: number;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const accent = accentMap[project.accent];
  const isHero = variant === "hero";

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    rx.set((0.5 - y) * (isHero ? 4 : 8));
    ry.set((x - 0.5) * (isHero ? 6 : 10));
    mx.set(x * 100);
    my.set(y * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  const gradient = useTransform(
    [mx, my] as unknown as [typeof mx, typeof my],
    (vals) => {
      const [x, y] = vals as unknown as [number, number];
      return `radial-gradient(${isHero ? 800 : 600}px circle at ${x}% ${y}%, ${accent.glow}, transparent 45%)`;
    },
  );

  const primaryLink = project.links[0];

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]/70 backdrop-blur-sm",
        "transition-colors hover:border-white/20",
        isHero ? "min-h-[460px] md:min-h-[440px]" : "min-h-[420px]",
      )}
    >
      <motion.div
        style={{ background: gradient }}
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

      {isHero ? (
        <HeroLayout project={project} accent={accent} primaryLink={primaryLink} />
      ) : (
        <StandardLayout
          project={project}
          accent={accent}
          index={index}
          primaryLink={primaryLink}
        />
      )}
    </motion.article>
  );
}

function HeroLayout({
  project,
  accent,
  primaryLink,
}: {
  project: Project;
  accent: { from: string; to: string; glow: string; dot: string };
  primaryLink: Project["links"][number] | undefined;
}) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-[inherit]">
      {/* Scene graphic panel */}
      <div className="relative min-h-[260px] md:min-h-[440px] border-b md:border-b-0 md:border-r border-white/[0.08] overflow-hidden">
        <SceneGraphic type={project.sceneType} accent={accent} />
        <div className="absolute top-5 left-5 flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/55">
          <span
            className="size-1.5 rounded-full"
            style={{ background: accent.dot, boxShadow: `0 0 10px ${accent.dot}` }}
          />
          <span>FEATURED · {project.domain}</span>
        </div>
        {project.achievement && (
          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10.5px] tracking-[0.16em] uppercase text-white/80 font-[family-name:var(--font-mono)] backdrop-blur-sm">
              <span
                className="size-1.5 rounded-full"
                style={{ background: accent.dot }}
              />
              {project.status}
            </span>
          </div>
        )}
      </div>

      {/* Content panel */}
      <div
        className="relative z-10 flex flex-col justify-between p-6 md:p-10"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex flex-col gap-4">
          <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3.6vw,3.4rem)] font-medium tracking-[-0.02em] leading-[1.02] text-white">
            {project.title}
          </h3>
          <p className="text-[15.5px] text-white/75 max-w-[52ch]">
            {project.subtitle}
          </p>
          <p className="text-[14.5px] text-white/55 leading-relaxed max-w-[58ch]">
            {project.summary}
          </p>

          <ul className="mt-2 grid grid-cols-1 gap-y-1.5 text-[13px] text-white/55">
            {project.architecture.slice(0, 4).map((a) => (
              <li key={a} className="flex gap-2">
                <span
                  className="mt-[7px] inline-block size-1 rounded-full"
                  style={{ background: accent.dot }}
                />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((s) => (
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
                  <span className="text-white/50">{project.achievement}</span>
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
    </div>
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
            <h3 className="font-[family-name:var(--font-display)] font-medium tracking-[-0.02em] text-white text-[clamp(1.7rem,2.4vw,2.2rem)]">
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
