"use client";

import Reveal from "./Reveal";
import { contact } from "@/lib/projects";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      {/* Signal constellation */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 1400 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="ctGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(106,169,255,0.22)" />
            <stop offset="100%" stopColor="rgba(106,169,255,0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#ctGlow)" />
        <g stroke="rgba(255,255,255,0.1)" fill="none">
          <path d="M120 420 L320 260 L540 380 L760 200 L960 340 L1180 220" />
          <path d="M80 200 L300 340 L520 200 L740 360 L940 220 L1220 360" />
        </g>
        {[
          [320, 260],
          [540, 380],
          [760, 200],
          [960, 340],
          [300, 340],
          [520, 200],
          [740, 360],
          [940, 220],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.5} fill="rgba(106,169,255,0.8)" />
        ))}
      </svg>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
            <span className="inline-block h-px w-8 bg-white/25" />
            <span>◆ 007 · Collaborate</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.02em] font-medium text-balance max-w-[960px]">
            Looking for a team that builds the future{" "}
            <span className="bg-gradient-to-r from-[color:var(--color-accent)] via-[color:var(--color-accent-2)] to-[color:var(--color-accent-3)] bg-clip-text text-transparent">
              before they write the brief?
            </span>
          </h2>
        </Reveal>

        <Reveal>
          <p className="mt-8 max-w-[640px] text-[15.5px] md:text-[17px] leading-relaxed text-white/65">
            1 Horizon partners with recruiters, collaborators, clients, and
            founders who are ready to build intelligence that is structural —
            not cosmetic.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-[family-name:var(--font-mono)] tracking-wide">
            <a
              href={`mailto:${contact.team.sahil}`}
              className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
              <span className="text-white/40 mr-1">Sahil</span>
              {contact.team.sahil}
            </a>
            <span className="hidden md:inline-block h-3 w-px bg-white/15" />
            <a
              href={`mailto:${contact.team.tayyab}`}
              className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <span className="size-1.5 rounded-full bg-[color:var(--color-accent-2)] animate-pulse" />
              <span className="text-white/40 mr-1">Tayyab</span>
              {contact.team.tayyab}
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-white/90 transition-colors"
            >
              Start a conversation
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="translate-x-0 group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://github.com/tayyab415"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] text-white/85 hover:bg-white/[0.08] hover:border-white/25 transition-all"
            >
              View on GitHub
            </a>
            <a
              href="#systems"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-3.5 text-[14px] text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              Revisit systems
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[color:var(--color-line)] pt-10 text-[13px] font-[family-name:var(--font-mono)] tracking-wide">
            <Platform label="Google DeepMind · Global" value="Winner · $400K pool · Nano Banana" />
            <Platform label="Anthropic × HF · Global" value="3rd place · Consumer Track · MCP" />
            <Platform label="Google Cloud × Kaggle · Global" value="Honorable Mention · Tunix" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Platform({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] tracking-[0.22em] uppercase text-white/35">
        {label}
      </span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}
