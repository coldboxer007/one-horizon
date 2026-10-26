"use client";

import { Fragment, type CSSProperties } from "react";
import HorizonField from "./HorizonField";
import { archiveProjects, featuredProjects } from "@/lib/projects";

const lead = ["Building", "intelligent", "systems", "that"];
const verbs = ["think,", "see,", "speak,", "and", "act."];
const words = [...lead, ...verbs];

// CSS entrance (globals.css) so it plays on first paint, before hydration.
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

// The verbs share one gradient; each word shows its own slice of it.
const slice = (i: number) => ({
  backgroundImage:
    "linear-gradient(90deg, var(--color-accent), var(--color-accent-2) 55%, var(--color-accent-3))",
  backgroundSize: `${verbs.length * 100}% 100%`,
  backgroundPosition: `${(i / (verbs.length - 1)) * 100}% 0`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

export default function Hero() {
  return (
      <section
        id="top"
        className="relative min-h-[100svh] w-full overflow-hidden noise"
      >
        <HorizonField className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_82%,transparent)]" />

        {/* Foreground chrome */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-between px-6 md:px-10 pt-28 pb-12">
          <TopChrome />

          <div className="pointer-events-none flex-1" />

          <div className="flex flex-col gap-6 md:gap-8 max-w-[860px]">
            <div
              style={delay(0.05)}
              className="fade-up inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.035] px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-white/70 font-[family-name:var(--font-mono)] backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
              An AI systems observatory
            </div>

            <h1
              aria-label={words.join(" ")}
              className="font-[family-name:var(--font-display)] text-balance text-[clamp(2.6rem,7.8vw,6.2rem)] leading-[0.98] tracking-[-0.02em] font-medium"
            >
              {words.map((w, i) => (
                <Fragment key={w}>
                  <span aria-hidden className="inline-block overflow-hidden align-top pb-[0.14em] -mb-[0.14em]">
                    <span
                      className="rise-in inline-block"
                      style={{ ...delay(0.15 + i * 0.05), ...(i >= lead.length ? slice(i - lead.length) : {}) }}
                    >
                      {w}
                    </span>
                  </span>
                  {i < words.length - 1 && " "}
                </Fragment>
              ))}
            </h1>

            <p
              style={delay(0.45)}
              className="fade-up max-w-[640px] text-[15.5px] md:text-[17px] leading-relaxed text-white/70"
            >
              1 Horizon designs AI products across multimodal interfaces,
              agentic workflows, real-time environments, and embodied systems —
              from disaster command centers to architecture, healthcare,
              creative tooling, and robotics.
            </p>

            <div
              style={delay(0.55)}
              className="fade-up flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#systems"
                className="group relative inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 text-[13.5px] font-medium tracking-wide hover:bg-white/90 active:scale-[0.97] transition-[background-color,transform] duration-150"
              >
                Enter the portfolio
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[13.5px] text-white/85 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/25 active:scale-[0.97] transition-[background-color,border-color,transform] duration-150"
              >
                See capabilities
              </a>
            </div>
          </div>

          <div className="fade-up" style={delay(0.7)}>
            <BottomChrome />
          </div>
        </div>
      </section>
  );
}

function TopChrome() {
  return (
    <div aria-hidden className="pointer-events-none absolute top-20 inset-x-0 mx-auto max-w-[1400px] px-6 md:px-10 flex justify-between items-start text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/40">
      <div />
      <div className="hidden md:flex flex-col items-end gap-1">
        <span>Long: 72.8°E · Lat: 19.1°N</span>
        <span className="text-white/30">◎ First light · acquired</span>
      </div>
    </div>
  );
}

function BottomChrome() {
  return (
    <div className="relative mt-20 flex flex-wrap items-end justify-between gap-6 text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/40">
      <div className="flex items-center gap-6">
        <Stat label="Projects" value={String(featuredProjects.length + archiveProjects.length)} />
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
