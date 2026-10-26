"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

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
            <span>◆ 007 · Team</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-10 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.8rem)] leading-[1.03] tracking-[-0.02em] font-medium max-w-[820px] text-balance">
            Three engineers. One{" "}
            <span className="relative inline-block text-[color:var(--color-accent-3)]">
              operating horizon.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-[0.18em] h-[2px] rounded-full bg-gradient-to-r from-[color:var(--color-accent-3)] to-transparent"
              />
            </span>
          </h2>
        </Reveal>

        {/* Field log slideshow: YC first, auto-advances, drag/swipe to move. */}
        <FieldLogCarousel />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
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

type Slide = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  sub: string;
  tag: string;
  imgPos: string;
  // Portrait photos don't survive a wide crop: show them whole on md+.
  whole?: boolean;
};

const slides: Slide[] = [
  {
    src: "/team-ycombinator.jpg",
    alt: "Sahil Tanna and Tayyab Khan at Y Combinator Startup School India",
    eyebrow: "Field log · 2026",
    title: "Y Combinator · Startup School India",
    sub: "Sahil Tanna · Tayyab Khan",
    tag: "Founders in the room",
    // x only matters in the square phone frame: keeps both founders in it
    imgPos: "object-[60%_45%]",
  },
  {
    src: "/team-echo.jpg",
    alt: "The 1 Horizon team with ECHO, their six-wheeled emotion-aware robot, at a demo table",
    eyebrow: "Hardware log · 2026",
    title: "ECHO · Our first robot, live on the demo floor",
    sub: "Emotion-aware rover · Gemini Robotics on a Raspberry Pi",
    tag: "Hardware debut",
    imgPos: "object-[center_20%] md:object-[center_30%]",
    whole: true,
  },
];

const AUTO_MS = 6000;

function FieldLogCarousel() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false); // hovered, focused or dragging
  const reduced = useReducedMotion();
  const inView = useInView(frameRef, { amount: 0.4 });
  const x = useMotionValue(0);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const settle = (i: number) =>
    animate(x, -i * width, reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 34 });

  useEffect(() => {
    const c = settle(index);
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, width]);

  // Auto-advance only while on screen and nobody is reading or dragging.
  useEffect(() => {
    if (paused || held || reduced || !inView) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, paused, held, reduced, inView]);

  return (
    <motion.section
      aria-roledescription="carousel"
      aria-label="Field log"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-bg-elev)]/40"
    >
      <div
        ref={frameRef}
        data-cursor="drag"
        className="relative aspect-[3/4] md:aspect-video lg:aspect-[21/8] w-full overflow-hidden touch-pan-y"
      >
        <motion.div
          className="flex h-full cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -(slides.length - 1) * width, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => setHeld(true)}
          onDragEnd={(_, info) => {
            setHeld(false);
            const swing = info.offset.x + info.velocity.x * 0.2;
            const next =
              swing < -width * 0.15
                ? Math.min(index + 1, slides.length - 1)
                : swing > width * 0.15
                  ? Math.max(index - 1, 0)
                  : index;
            if (next === index) settle(index);
            else setIndex(next);
          }}
        >
          {slides.map((s, i) => (
            <FieldLogSlide key={s.src} slide={s} active={i === index} n={i + 1} />
          ))}
        </motion.div>

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

        {/* Controls: progress pills double as slide buttons, plus pause (WCAG 2.2.2) */}
        <div className="absolute right-4 top-4 md:right-6 md:top-5 z-10 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show slide ${i + 1}: ${s.title}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/20"
            >
              {i === index && (
                <span
                  key={`${index}-${paused || held || reduced || !inView}`}
                  className="field-log-progress absolute inset-y-0 left-0 rounded-full bg-[color:var(--color-accent-3)]"
                  style={{
                    animationDuration: `${AUTO_MS}ms`,
                    animationPlayState: paused || held || reduced || !inView ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="ml-1 grid size-7 place-items-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur hover:text-white"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden fill="currentColor">
              {paused ? <path d="M2 1l7 4-7 4z" /> : <path d="M2 1h2v8H2zM6 1h2v8H6z" />}
            </svg>
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function FieldLogSlide({ slide: s, active, n }: { slide: Slide; active: boolean; n: number }) {
  return (
    <figure
      aria-roledescription="slide"
      aria-label={`${n} of ${slides.length}`}
      aria-hidden={!active}
      className="relative h-full w-full shrink-0"
    >
      {s.whole && (
        // Blurred, darkened copy fills the frame behind the photo panel
        <Image
          src={s.src}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 1340px, 100vw"
          draggable={false}
          className="object-cover scale-110 opacity-70"
          style={{ filter: "blur(40px) brightness(0.45) saturate(0.8)" }}
        />
      )}
      {/* A portrait photo sits in its own panel that fades into the blur:
          above the caption on phones, to the right of it on md+ */}
      <div
        className={
          s.whole
            ? "absolute inset-x-0 top-0 bottom-[28%] [mask-image:linear-gradient(to_bottom,black_86%,transparent)] md:bottom-0 md:left-auto md:w-1/2 lg:w-[40%] md:[mask-image:linear-gradient(to_right,transparent,black_22%)]"
            : "absolute inset-0"
        }
      >
        {/* Image, color-graded into the brand tonality */}
        <Image
          src={s.src}
          alt={s.alt}
          fill
          sizes={s.whole ? "(min-width: 768px) 560px, 100vw" : "(min-width: 1024px) 1340px, 100vw"}
          draggable={false}
          className={`object-cover ${s.imgPos}`}
          style={{
            // Natural color intact — light desaturation + grade so it reads
            // as part of the dark-blue page rather than sitting on top of it.
            filter: "contrast(1.08) brightness(1.0) saturate(0.7)",
          }}
        />
      </div>

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

      {/* Caption scrim so the text never sits on a busy part of the photo */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4"
        style={{ background: "linear-gradient(to top, rgba(4,6,13,0.85), rgba(4,6,13,0.35) 45%, transparent)" }}
      />

      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex flex-wrap items-end justify-between gap-4">
        <div className={s.whole ? "max-w-[560px] md:max-w-[48%] lg:max-w-[560px]" : "max-w-[560px]"}>
          <div className="flex items-center gap-2 text-[10.5px] tracking-[0.28em] uppercase font-[family-name:var(--font-mono)] text-white/55">
            <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
            {s.eyebrow}
          </div>
          <div className="mt-2 font-[family-name:var(--font-display)] text-[18px] md:text-[22px] text-white tracking-tight text-balance">
            {s.title}
          </div>
          <div className="mt-1 text-[12px] md:text-[13px] font-[family-name:var(--font-mono)] tracking-wide text-white/55">
            {s.sub}
          </div>
        </div>
        <div className="hidden lg:flex shrink-0 items-center gap-2 rounded-full border border-[color:var(--color-line-strong)] bg-black/40 px-3 py-1.5 text-[10.5px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/65 backdrop-blur">
          <span
            className="size-1 rounded-full"
            style={{
              background: "var(--color-accent-3)",
              boxShadow: "0 0 8px var(--color-accent-3)",
            }}
          />
          {s.tag}
        </div>
      </figcaption>
    </figure>
  );
}
