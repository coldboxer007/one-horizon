"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { team } from "@/lib/projects";
import Reveal from "./Reveal";

const tints = [
  "rgba(106,169,255,0.55)",
  "rgba(140,107,255,0.55)",
  "rgba(94,240,216,0.55)",
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
            <span className="inline-block h-px w-8 bg-white/25" />
            <span>◆ 006 · Team</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-10 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.8rem)] leading-[1.03] tracking-[-0.02em] font-medium max-w-[820px] text-balance">
            Three engineers. One{" "}
            <span className="bg-gradient-to-r from-[color:var(--color-accent-3)] via-[color:var(--color-accent)] to-[color:var(--color-accent-2)] bg-clip-text text-transparent">
              operating horizon.
            </span>
          </h2>
        </Reveal>

        {/* Cinematic photo banner — Y Combinator Startup School India.
            Treated to blend with the dark brand environment. */}
        <TeamBanner />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <article
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]/60 p-7 min-h-[320px] hover:border-white/25 transition-colors"
              >
                {/* Per-operator tint */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: tints[i] }}
                />

                {/* Circuit backdrop */}
                <svg
                  className="pointer-events-none absolute inset-0 w-full h-full opacity-30 group-hover:opacity-55 transition-opacity"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden
                >
                  <g stroke="rgba(106,169,255,0.3)" fill="none" strokeWidth="0.5">
                    <path d="M0 60 L120 60 L140 80 L260 80 L280 60 L400 60" />
                    <path d="M0 160 L80 160 L100 180 L200 180" />
                    <path d="M200 220 L240 220 L260 240 L400 240" />
                    <circle cx="140" cy="80" r="2" fill="rgba(106,169,255,0.7)" />
                    <circle cx="260" cy="80" r="2" fill="rgba(106,169,255,0.7)" />
                    <circle cx="100" cy="180" r="2" fill="rgba(106,169,255,0.7)" />
                  </g>
                </svg>

                {/* Primary card link — LinkedIn — as an overlay so the whole
                    card is clickable while leaving room for the email chip. */}
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="external"
                  aria-label={`${m.name} on LinkedIn`}
                  className="absolute inset-0 z-10"
                />

                <div className="relative z-20 flex h-full flex-col justify-between gap-6 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/40">
                      <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)]" />
                      Operator · {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.2em] uppercase font-[family-name:var(--font-mono)] text-white/40 group-hover:text-white/80 transition-colors">
                      LinkedIn
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
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
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[26px] md:text-[30px] text-white font-medium tracking-tight">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-[13px] text-white/55 font-[family-name:var(--font-mono)] tracking-wide leading-relaxed">
                      {m.role}
                    </p>
                    {m.bio && (
                      <p className="mt-4 text-[13.5px] text-white/70 leading-relaxed">
                        {m.bio}
                      </p>
                    )}
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        data-cursor="mail"
                        className="relative z-30 mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line-strong)] bg-white/[0.04] px-3 py-1.5 text-[11.5px] font-[family-name:var(--font-mono)] tracking-wide text-white/75 hover:text-white hover:bg-white/[0.09] hover:border-white/25 transition-all pointer-events-auto"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {m.email}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamBanner() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]/40"
    >
      <div className="relative aspect-[21/9] md:aspect-[24/8] w-full">
        {/* Image, color-graded into the brand tonality */}
        <Image
          src="/team-ycombinator.jpg"
          alt="Sahil Tanna and Tayyab Khan at Y Combinator Startup School India"
          fill
          sizes="(min-width: 1024px) 1340px, 100vw"
          priority={false}
          className="object-cover object-[center_45%]"
          style={{
            // Natural color intact — light desaturation + grade so it reads
            // as part of the dark-blue page rather than sitting on top of it.
            filter:
              "contrast(1.08) brightness(1.0) saturate(0.7)",
          }}
        />

        {/* Azure wash — perceptibly blue, but still keeps the photo's
            natural tonal range readable. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundColor: "#6aa3e6",
            mixBlendMode: "color",
            opacity: 0.38,
          }}
        />

        {/* Soft azure key-light behind the subjects — adds brand glow
            and dimensionality without dominating. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 65% at 55% 55%, rgba(150,195,255,0.2) 0%, rgba(40,90,170,0.06) 40%, transparent 72%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Edge-only navy fade to blend into the page background. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,12,28,0.5) 0%, transparent 10%, transparent 90%, rgba(6,12,28,0.5) 100%), linear-gradient(180deg, rgba(6,12,28,0.35) 0%, transparent 18%, transparent 82%, rgba(6,12,28,0.5) 100%)",
          }}
        />

        {/* Edge vignette — just enough to frame the subjects, keeps the
            center fully natural. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(85% 125% at 50% 55%, transparent 55%, rgba(4,8,18,0.45) 90%, rgba(4,8,18,0.8) 100%)",
          }}
        />

        {/* Fine grid overlay to tie into the site's lab aesthetic */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            mixBlendMode: "overlay",
          }}
        />

        {/* Corner frame ticks */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.2" fill="none">
            <path d="M0.5,6 L0.5,0.5 L6,0.5" />
            <path d="M99.5,6 L99.5,0.5 L94,0.5" />
            <path d="M0.5,94 L0.5,99.5 L6,99.5" />
            <path d="M99.5,94 L99.5,99.5 L94,99.5" />
          </g>
        </svg>

        {/* Caption overlay — bottom-left */}
        <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] tracking-[0.28em] uppercase font-[family-name:var(--font-mono)] text-white/55">
              <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
              Field log · 2026
            </div>
            <div className="mt-2 font-[family-name:var(--font-display)] text-[18px] md:text-[22px] text-white tracking-tight">
              Y Combinator · Startup School India
            </div>
            <div className="mt-1 text-[12px] md:text-[13px] font-[family-name:var(--font-mono)] tracking-wide text-white/55">
              Sahil Tanna · Tayyab Khan
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full border border-[color:var(--color-line-strong)] bg-black/40 px-3 py-1.5 text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/65 backdrop-blur">
            <span
              className="size-1 rounded-full"
              style={{
                background: "var(--color-accent-3)",
                boxShadow: "0 0 8px var(--color-accent-3)",
              }}
            />
            Founders in the room
          </div>
        </figcaption>
      </div>
    </motion.figure>
  );
}
