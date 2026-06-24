"use client";

import { motion } from "framer-motion";
import ParticleField from "./ParticleField";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden noise"
    >
      {/* Signal grid */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />

      {/* Orbital frame */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="relative size-[78vmin] max-w-[900px] max-h-[900px]">
          <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
          <div className="absolute inset-[8%] rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[18%] rounded-full border border-white/[0.03]" />
        </div>
      </div>

      {/* Particles */}
      <ParticleField
        className="absolute inset-0 w-full h-full"
        phrases={["1 HORIZON", "SYSTEMS IN MOTION", "THINK · SEE · SPEAK · ACT"]}
      />

      {/* Foreground chrome */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-between px-6 md:px-10 pt-28 pb-12">
        <TopChrome />

        <div className="pointer-events-none flex-1" />

        <div className="flex flex-col gap-6 md:gap-8 max-w-[860px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.035] px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-white/70 font-[family-name:var(--font-mono)]"
          >
            <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
            An AI systems observatory
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-[family-name:var(--font-display)] text-balance text-[clamp(2.6rem,7.8vw,6.2rem)] leading-[0.98] tracking-[-0.02em] font-medium"
          >
            Building intelligent systems that{" "}
            <span className="bg-gradient-to-r from-[color:var(--color-accent)] via-[color:var(--color-accent-2)] to-[color:var(--color-accent-3)] bg-clip-text text-transparent">
              think, see, speak, and act.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="max-w-[640px] text-[15.5px] md:text-[17px] leading-relaxed text-white/70"
          >
            1 Horizon designs AI products across multimodal interfaces,
            agentic workflows, real-time environments, and embodied systems —
            from disaster command centers to architecture, healthcare,
            creative tooling, and robotics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#systems"
              className="group relative inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 text-[13.5px] font-medium tracking-wide hover:bg-white/90 transition-colors"
            >
              Enter the portfolio
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[13.5px] text-white/85 hover:bg-white/[0.08] hover:border-white/25 transition-all"
            >
              See capabilities
            </a>
          </motion.div>
        </div>

        <BottomChrome />
      </div>
    </section>
  );
}

function TopChrome() {
  return (
    <div className="pointer-events-none absolute top-20 inset-x-0 mx-auto max-w-[1400px] px-6 md:px-10 flex justify-between items-start text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/40">
      <div className="flex flex-col gap-1">
        <span>◇ Node 01</span>
        <span className="text-white/25">Observatory online</span>
      </div>
      <div className="hidden md:flex flex-col items-end gap-1">
        <span>Long: 72.8°E · Lat: 19.1°N</span>
        <span className="text-white/25">Uplink · stable</span>
      </div>
    </div>
  );
}

function BottomChrome() {
  return (
    <div className="relative mt-20 flex flex-wrap items-end justify-between gap-6 text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/40">
      <div className="flex items-center gap-6">
        <Stat label="Projects" value="12+" />
        <Stat label="Hackathons" value="8" />
        <Stat label="Platforms" value="Google · AWS · Anthropic" />
      </div>
      <div className="hidden md:block text-right">
        <div>Scroll</div>
        <div className="text-white/25">↓ begin sequence</div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-white/25">{label}</span>
      <span className="text-white/80 normal-case tracking-wider font-[family-name:var(--font-sans)]">
        {value}
      </span>
    </div>
  );
}
