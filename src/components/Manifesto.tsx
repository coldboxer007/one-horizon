"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Recognition from "./Recognition";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative pt-20 pb-10 md:pt-24 md:pb-14 overflow-hidden"
      aria-labelledby="manifesto-heading"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 grid-bg opacity-30"
        aria-hidden
      />

      {/* Ambient accent glow, kept clear of the section edges: overflow-hidden
          would otherwise clip the blur into a hard seam */}
      <div
        className="pointer-events-none absolute top-40 -left-32 size-[480px] rounded-full blur-[120px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(106,169,255,0.55), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-40 -right-32 size-[520px] rounded-full blur-[120px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(140,107,255,0.55), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-3)]" />
            <span>◆ 002 · Manifesto</span>
          </div>
        </Reveal>

        <h2
          id="manifesto-heading"
          className="font-[family-name:var(--font-display)] text-[clamp(2rem,5.4vw,4.2rem)] leading-[1.05] tracking-[-0.02em] font-medium text-balance"
        >
          <Line delay={0}>
            <span className="text-white">We don&apos;t treat AI like a feature layer</span>
          </Line>
          <Line delay={0.1}>
            <span className="text-white">pasted onto software.</span>{" "}
            <span className="text-white/45">We build products where</span>
          </Line>
          <Line delay={0.2}>
            <span className="bg-gradient-to-r from-[color:var(--color-accent)] via-[color:var(--color-accent-2)] to-[color:var(--color-accent-3)] bg-clip-text text-transparent">
              intelligence is structural
            </span>
            <span className="text-white/45"> — where</span>
          </Line>
          <Line delay={0.3}>
            <span className="text-white">vision, language, action, and interface</span>
          </Line>
          <Line delay={0.4}>
            <span className="text-white/45">operate as</span>{" "}
            <span className="bg-gradient-to-r from-[color:var(--color-accent-3)] via-[color:var(--color-accent)] to-[color:var(--color-accent-2)] bg-clip-text text-transparent">
              one continuous system.
            </span>
          </Line>
        </h2>

        {/* Recognition block — verified wins, fills the space between the
            headline and the pillars so credibility lands early. */}
        <div className="mt-14 md:mt-16">
          <Recognition />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 border-t border-[color:var(--color-line)] pt-10">
          <Pillar
            code="01"
            color="var(--color-accent)"
            title="Multi-domain"
            body="Disaster response, architecture, healthcare, creative tooling, reasoning, robotics — unified by a single systems mindset."
          />
          <Pillar
            code="02"
            color="var(--color-accent-2)"
            title="Hackathon speed · research depth"
            body="48-hour sprints that ship working products. Three-stage training curricula that end on interpretable reasoning."
          />
          <Pillar
            code="03"
            color="var(--color-accent-3)"
            title="Live · agentic · multimodal"
            body="Sub-second voice, full-duplex streaming, and specialist models fused behind safety-first orchestration."
          />
        </div>
      </div>
    </section>
  );
}

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  // Bulletproof reveal. Three layers of detection so this CANNOT silently fail
  // — which is what was leaving the manifesto h2 invisible under Lenis.
  //   1) Framer Motion's useInView (IntersectionObserver based)
  //   2) A raw scroll/resize listener that checks getBoundingClientRect()
  //   3) A 1.5s hard fallback timer that reveals unconditionally
  const ref = useRef<HTMLSpanElement>(null);
  const fmInView = useInView(ref, { once: true, amount: 0.01 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    if (fmInView) {
      setRevealed(true);
      return;
    }

    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh * 0.95 && rect.bottom > 0) {
        setRevealed(true);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const hardFallback = window.setTimeout(() => setRevealed(true), 1500);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearTimeout(hardFallback);
    };
  }, [fmInView, revealed]);

  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        initial={{ y: "105%", opacity: 0 }}
        animate={
          revealed ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }
        }
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Pillar({
  code,
  color,
  title,
  body,
}: {
  code: string;
  color: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="group relative flex flex-col gap-2.5 pl-5 md:pl-6">
      <span
        aria-hidden
        className="absolute left-0 top-1 bottom-1 w-px"
        style={{
          background: `linear-gradient(to bottom, ${color}, transparent)`,
        }}
      />
      <span
        className="text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)]"
        style={{ color }}
      >
        {code}
      </span>
      <h3 className="font-[family-name:var(--font-display)] text-[19px] md:text-[21px] text-white font-medium tracking-tight">
        {title}
      </h3>
      <p className="text-[14px] leading-relaxed text-white/60 max-w-[38ch]">
        {body}
      </p>
    </Reveal>
  );
}
