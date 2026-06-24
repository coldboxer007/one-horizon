"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

const sections = [
  { id: "systems", label: "Systems" },
  { id: "capabilities", label: "Capabilities" },
  { id: "archive", label: "Archive" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose center is closest to the viewport center
        const candidates = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (candidates[0]) {
          setActive(candidates[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1],
      },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl bg-[rgba(4,6,13,0.72)] border-b border-[color:var(--color-line)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group" data-cursor="link">
          <LogoMark />
          <span className="font-[family-name:var(--font-display)] tracking-tight text-[15px]">
            <span className="text-white">1 Horizon</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 text-[13px]">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-cursor="link"
                className={cn(
                  "relative rounded-full px-3.5 py-2 transition-colors",
                  isActive
                    ? "text-white"
                    : "text-white/55 hover:text-white/90",
                )}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="size-1.5 rounded-full bg-[color:var(--color-accent-3)]"
                      style={{ boxShadow: "0 0 10px rgba(94,240,216,0.8)" }}
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  )}
                  {s.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.05]"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          data-cursor="link"
          className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line-strong)] bg-white/[0.04] px-4 py-2 text-[12.5px] tracking-wide text-white hover:bg-white/[0.09] hover:border-white/25 transition-all"
        >
          <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
          Enter the portfolio
        </a>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-[2px] origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(to right, var(--color-accent), var(--color-accent-2) 45%, var(--color-accent-3))",
          boxShadow: "0 0 12px rgba(106,169,255,0.45)",
        }}
        aria-hidden
      />
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex size-7 items-center justify-center">
      <span className="absolute inset-0 rounded-md border border-white/20" />
      <span className="absolute inset-[3px] rounded-[4px] bg-gradient-to-br from-[color:var(--color-accent)] via-[color:var(--color-accent-2)] to-[color:var(--color-accent-3)] opacity-80" />
      <span className="relative font-[family-name:var(--font-display)] text-[11px] font-bold text-white">
        1H
      </span>
    </span>
  );
}
