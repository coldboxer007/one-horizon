"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { featuredProjects } from "@/lib/projects";
import { BrandIcon, brandMeta } from "./BrandIcon";

/* ---------------------------------------------------------------------------
   Pinned scroll scene for Hephaestus: a 2D blueprint draws itself, tilts into
   perspective, extrudes into a wireframe interior, then hands off to the
   project panel. Pure SVG + projection math — no WebGL cost.
--------------------------------------------------------------------------- */

const VB_W = 800;
const VB_H = 560;
const CX = 400;
const CY = 310;

// Plan-space geometry (origin at plan center, z = up)
const OUTER: [number, number][] = [
  [-160, -110],
  [160, -110],
  [160, 110],
  [-160, 110],
];
// Interior wall segments
const INNER: [number, number][][] = [
  [
    [-20, -110],
    [-20, 20],
  ],
  [
    [-160, 20],
    [90, 20],
  ],
  [
    [90, 20],
    [90, 110],
  ],
];
// Points that grow vertical extrusion lines
const POSTS: [number, number][] = [
  [-160, -110],
  [160, -110],
  [160, 110],
  [-160, 110],
  [-20, -110],
  [-20, 20],
  [-160, 20],
  [90, 20],
  [90, 110],
];
// Rooms for the glow stage
const ROOMS: [number, number][][] = [
  [
    [-160, -110],
    [-20, -110],
    [-20, 20],
    [-160, 20],
  ],
  [
    [-20, -110],
    [160, -110],
    [160, 20],
    [-20, 20],
  ],
  [
    [-160, 20],
    [90, 20],
    [90, 110],
    [-160, 110],
  ],
  [
    [90, 20],
    [160, 20],
    [160, 110],
    [90, 110],
  ],
];

const r2 = (n: number) => Math.round(n * 100) / 100;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const ramp = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep

type Cam = { tilt: number; spin: number };

function project(x: number, y: number, z: number, cam: Cam): [number, number] {
  const cs = Math.cos(cam.spin);
  const sn = Math.sin(cam.spin);
  const rx = x * cs - y * sn;
  const ry = x * sn + y * cs;
  const ct = Math.cos(cam.tilt);
  const st = Math.sin(cam.tilt);
  const s = 1 + ry * st * 0.0009; // subtle perspective
  return [r2(CX + rx * s), r2(CY + (ry * ct - z * st) * s)];
}

function camAt(p: number): Cam {
  const tilt = ease(ramp(p, 0.3, 0.58)) * 0.98;
  // Slow orbital pan once the model is standing
  const spin = -ease(ramp(p, 0.3, 0.58)) * 0.3 - ease(ramp(p, 0.6, 1)) * 0.28;
  return { tilt, spin };
}

const liftAt = (p: number) => ease(ramp(p, 0.34, 0.62)) * 72;

function loopPath(pts: [number, number][], z: number, cam: Cam) {
  return (
    pts
      .map((pt, i) => {
        const [x, y] = project(pt[0], pt[1], z, cam);
        return `${i === 0 ? "M" : "L"}${x} ${y}`;
      })
      .join(" ") + " Z"
  );
}

function segsPath(segs: [number, number][][], z: number, cam: Cam) {
  return segs
    .map((seg) => {
      const [ax, ay] = project(seg[0][0], seg[0][1], z, cam);
      const [bx, by] = project(seg[1][0], seg[1][1], z, cam);
      return `M${ax} ${ay} L${bx} ${by}`;
    })
    .join(" ");
}

function gridPath(cam: Cam) {
  const parts: string[] = [];
  for (let x = -280; x <= 280; x += 40) {
    const [ax, ay] = project(x, -200, 0, cam);
    const [bx, by] = project(x, 200, 0, cam);
    parts.push(`M${ax} ${ay} L${bx} ${by}`);
  }
  for (let y = -200; y <= 200; y += 40) {
    const [ax, ay] = project(-280, y, 0, cam);
    const [bx, by] = project(280, y, 0, cam);
    parts.push(`M${ax} ${ay} L${bx} ${by}`);
  }
  return parts.join(" ");
}

function postsPath(p: number) {
  const cam = camAt(p);
  const lift = liftAt(p);
  return POSTS.map((pt) => {
    const [ax, ay] = project(pt[0], pt[1], 0, cam);
    const [bx, by] = project(pt[0], pt[1], lift, cam);
    return `M${ax} ${ay} L${bx} ${by}`;
  }).join(" ");
}

function roomPoints(room: [number, number][], p: number) {
  const cam = camAt(p);
  return room.map((pt) => project(pt[0], pt[1], 0, cam).join(",")).join(" ");
}

function orbiterPos(p: number): [number, number] {
  const cam = camAt(p);
  const a = p * 10;
  return project(Math.cos(a) * 235, Math.sin(a) * 175, 40 + Math.sin(a * 2) * 24, cam);
}

/* --------------------------------- Scene --------------------------------- */

export default function HephaestusScene() {
  const project_ = featuredProjects.find((pr) => pr.slug === "hephaestus");
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // With reduced motion, freeze the scene fully assembled instead of scrubbing.
  // P is called unconditionally in the same order every render, so the hook
  // rules hold even though the call sites look like helpers.
  const P = (fn: (p: number) => string | number) =>
    useTransform(scrollYProgress, (v) => fn(reduced ? 0.9 : v));

  const gridD = P((p) => gridPath(camAt(p)));
  const floorD = P((p) => loopPath(OUTER, 0, camAt(p)));
  const innerD = P((p) => segsPath(INNER, 0, camAt(p)));
  const topOuterD = P((p) => loopPath(OUTER, liftAt(p), camAt(p)));
  const topInnerD = P((p) => segsPath(INNER, liftAt(p), camAt(p)));
  const vertsD = P((p) => postsPath(p));

  const drawOuter = P((p) => ease(ramp(p, 0.01, 0.12)));
  const drawInner = P((p) => ease(ramp(p, 0.06, 0.2)));
  const topO = P((p) => ramp(p, 0.36, 0.5) * 0.9);
  const decorO = P((p) => ease(ramp(p, 0.05, 0.16)) * (1 - ramp(p, 0.3, 0.42)));
  const gridO = P((p) => 0.55 * ease(ramp(p, 0, 0.08)));

  // Scanning beam while "Gemini reads the space"
  const scanD = P((p) => {
    const cam = camAt(p);
    const x = -170 + ramp(p, 0.3, 0.56) * 340;
    const [ax, ay] = project(x, -115, 0, cam);
    const [bx, by] = project(x, 115, 0, cam);
    return `M${ax} ${ay} L${bx} ${by}`;
  });
  const scanO = P((p) => (ramp(p, 0.3, 0.34) - ramp(p, 0.56, 0.6)) * 0.9);

  const roomPts = ROOMS.map((room) => P((p) => roomPoints(room, p)));
  const roomOs = ROOMS.map((_, i) =>
    P((p) => ease(ramp(p, 0.58 + i * 0.05, 0.68 + i * 0.05)) * 0.16),
  );

  const orbX = P((p) => orbiterPos(p)[0]);
  const orbY = P((p) => orbiterPos(p)[1]);
  const orbO = P((p) => ease(ramp(p, 0.62, 0.7)) * 0.95);

  // Captions
  const capIn = (a: number, b: number, c: number, d: number) => ({
    opacity: P((p) => ramp(p, a, b) - ramp(p, c, d)),
    y: P((p) => 18 * (1 - ramp(p, a, b)) - 12 * ramp(p, c, d)),
  });
  const cap1 = capIn(0.02, 0.08, 0.26, 0.32);
  const cap2 = capIn(0.32, 0.38, 0.54, 0.6);
  const cap3 = capIn(0.6, 0.66, 0.78, 0.84);

  // Final info panel
  const panelO = P((p) => ease(ramp(p, 0.8, 0.9)));
  const panelX = P((p) => 48 * (1 - ease(ramp(p, 0.8, 0.9))));
  const sceneX = P((p) => -ease(ramp(p, 0.8, 0.92)) * 9 + "%");
  const stageIdx = P((p) => (p < 0.32 ? 1 : p < 0.6 ? 2 : 3));
  const stageLabel = useTransform(stageIdx, (v) => `0${v}/03`);
  const railScale = P((p) => clamp01(p * 1.04));
  // Hidden panel must leave the tab order too, not just ignore the pointer.
  const [panelOn, setPanelOn] = useState(false);
  useMotionValueEvent(panelO, "change", (o) => setPanelOn((o as number) > 0.5));

  if (!project_) return null;

  return (
    <section
      ref={ref}
      className="relative h-[200vh] md:h-[340vh]"
      aria-label="Hephaestus — 2D floor plans become 3D worlds"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Ambient violet atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-25"
          style={{ background: "radial-gradient(circle, rgba(140,107,255,0.5), transparent 65%)" }}
        />

        {/* Top chrome */}
        <motion.div
          style={{ ["--panel" as string]: panelO }}
          className="pointer-events-none absolute top-20 md:top-24 inset-x-0 mx-auto max-w-[1400px] px-6 md:px-10 flex items-start justify-between max-md:opacity-[calc(1-var(--panel))]"
        >
          <div>
            <div className="flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
              <span className="inline-block h-px w-8 bg-gradient-to-r from-[#8c6bff] to-transparent" />
              <span>Featured System · Hephaestus</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#8c6bff]/40 bg-[#8c6bff]/10 px-3 py-1 text-[10.5px] tracking-[0.2em] uppercase font-[family-name:var(--font-mono)] text-[#b9a3ff]">
              <span className="size-1.5 rounded-full bg-[#b9a3ff]" style={{ boxShadow: "0 0 10px #8c6bff" }} />
              Winner · Google DeepMind · Global
            </div>
          </div>
          <div className="hidden md:block text-right text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/35">
            <div>Scene 01 · Transform</div>
            <div className="text-white/20">scroll to run pipeline</div>
          </div>
        </motion.div>

        {/* Stage rail */}
        <div className="pointer-events-none absolute left-6 md:left-10 top-1/2 hidden md:flex -translate-y-1/2 flex-col items-center gap-3" aria-hidden>
          <span className="text-[10px] font-[family-name:var(--font-mono)] tracking-[0.2em] text-white/35 [writing-mode:vertical-rl]">
            PIPELINE
          </span>
          <div className="relative h-40 w-px bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-[#8c6bff] to-[#5ef0d8]"
              style={{ scaleY: railScale, height: "100%" }}
            />
          </div>
          <motion.span className="text-[10px] font-[family-name:var(--font-mono)] text-white/45 tabular-nums">
            {stageLabel}
          </motion.span>
        </div>

        {/* The scene */}
        <motion.div style={{ x: sceneX }} className="relative mx-auto w-full max-w-[1100px] px-4">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full h-auto max-h-[62svh]"
            fill="none"
            aria-hidden
          >
            {/* Receding floor grid */}
            <motion.path d={gridD} stroke="rgba(255,255,255,0.05)" strokeWidth="1" style={{ opacity: gridO }} />

            {/* Room glow */}
            {roomPts.map((pts, i) => (
              <motion.polygon
                key={i}
                points={pts}
                fill={i % 2 ? "#6aa9ff" : "#8c6bff"}
                style={{ opacity: roomOs[i] }}
              />
            ))}

            {/* Blueprint decor: door arcs + dimension ticks (flat stage only) */}
            <motion.g style={{ opacity: decorO }} stroke="rgba(140,107,255,0.55)" strokeWidth="1">
              <path d="M380 200 A28 28 0 0 1 408 228" fill="none" strokeDasharray="3 4" />
              <path d="M240 330 A26 26 0 0 0 214 304" fill="none" strokeDasharray="3 4" />
              <g stroke="rgba(255,255,255,0.28)" strokeWidth="1">
                <path d="M240 176 L560 176" strokeDasharray="2 5" />
                <path d="M240 170 L240 182 M560 170 L560 182" />
                <path d="M216 200 L216 420" strokeDasharray="2 5" />
                <path d="M210 200 L222 200 M210 420 L222 420" />
              </g>
              <g fill="rgba(255,255,255,0.4)" stroke="none" fontSize="11" fontFamily="var(--font-mono)">
                <text x="386" y="166">9.6 m</text>
                <text x="188" y="314" transform="rotate(-90 196 314)">6.6 m</text>
              </g>
            </motion.g>

            {/* Extruded top plane */}
            <motion.path d={topOuterD} stroke="#b9a3ff" strokeWidth="1.6" style={{ opacity: topO }} />
            <motion.path d={topInnerD} stroke="rgba(185,163,255,0.65)" strokeWidth="1.1" style={{ opacity: topO }} />

            {/* Vertical extrusion posts */}
            <motion.path d={vertsD} stroke="rgba(140,107,255,0.55)" strokeWidth="1.1" style={{ opacity: topO }} />

            {/* Floor plan */}
            <motion.path
              d={floorD}
              stroke="#8c6bff"
              strokeWidth="2"
              strokeLinejoin="round"
              style={{ pathLength: drawOuter }}
            />
            <motion.path
              d={innerD}
              stroke="rgba(140,107,255,0.8)"
              strokeWidth="1.4"
              style={{ pathLength: drawInner }}
            />

            {/* Scanning beam */}
            <motion.path
              d={scanD}
              stroke="#5ef0d8"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ opacity: scanO, filter: "drop-shadow(0 0 6px rgba(94,240,216,0.8))" }}
            />

            {/* Orbiting camera dot */}
            <motion.circle
              r="4"
              fill="#5ef0d8"
              cx={orbX}
              cy={orbY}
              style={{ opacity: orbO, filter: "drop-shadow(0 0 8px rgba(94,240,216,0.9))" }}
            />
          </svg>
        </motion.div>

        {/* Captions */}
        <div className="pointer-events-none absolute bottom-10 md:bottom-14 inset-x-0 mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="relative h-[76px] max-w-[560px]">
            <Caption
              style={cap1}
              n="01"
              title="A 2D floor plan enters the system"
              body="Uploaded, normalized, and vectorized in seconds."
            />
            <Caption
              style={cap2}
              n="02"
              title="Gemini reads the space"
              body="Walls, rooms, and layout logic — interpreted, not traced."
            />
            <Caption
              style={cap3}
              n="03"
              title="Procedural 3D, rendered live"
              body="Geometry generated and lit for real-time 360° walkthroughs."
            />
          </div>
        </div>

        {/* Final project panel */}
        <motion.aside
          inert={!panelOn}
          // Centre via motion's y: a Tailwind translate class would be
          // overwritten by the transform motion writes for x.
          style={{ opacity: panelO, x: panelX, y: "-50%" }}
          className="absolute right-4 md:right-10 top-1/2 w-[calc(100%-2rem)] max-w-[400px] rounded-2xl border border-white/12 bg-[#0a0f1c]/80 backdrop-blur-md p-6 md:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
        >
          <h3 className="font-[family-name:var(--font-display)] text-[32px] md:text-[38px] font-medium tracking-[-0.02em] text-white leading-none">
            {project_.title}
          </h3>
          <p className="mt-2 text-[14px] text-white/75">{project_.subtitle}</p>
          <p className="mt-4 text-[13.5px] leading-relaxed text-white/60 [@media(max-height:680px)]:line-clamp-3">
            {project_.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project_.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60 font-[family-name:var(--font-mono)]"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4 [@media(max-height:680px)]:hidden">
            {project_.brands.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 text-[10.5px] text-white/55 font-[family-name:var(--font-mono)]">
                <BrandIcon brand={b} size={13} />
                {brandMeta[b].label}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2">
            {project_.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-black border border-white px-3.5 py-1.5 text-[12px] font-medium hover:bg-white/90 transition-colors"
              >
                {l.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
            ))}
            <span className="text-[11px] text-white/40 font-[family-name:var(--font-mono)]">
              48-hour sprint
            </span>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function Caption({
  style,
  n,
  title,
  body,
}: {
  style: {
    opacity: MotionValue<string | number>;
    y: MotionValue<string | number>;
  };
  n: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div style={style} className="absolute inset-x-0 bottom-0">
      <div className="flex items-center gap-2 text-[10.5px] tracking-[0.24em] uppercase font-[family-name:var(--font-mono)] text-[#b9a3ff]">
        <span className="inline-block h-px w-6 bg-[#8c6bff]/70" />
        Stage {n}
      </div>
      <div className="mt-1.5 font-[family-name:var(--font-display)] text-[20px] md:text-[26px] text-white tracking-tight">
        {title}
      </div>
      <div className="mt-1 text-[13px] text-white/55">{body}</div>
    </motion.div>
  );
}
