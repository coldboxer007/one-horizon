"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  { t: 0.05, text: "BOOTING ORBITAL OBSERVATORY" },
  { t: 0.35, text: "ALIGNING PARTICLE LATTICE" },
  { t: 0.7, text: "SYSTEMS IN MOTION" },
  { t: 0.95, text: "01 HORIZON — ONLINE" },
];

export default function BootSequence() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = sessionStorage.getItem("1h-boot-seen");
      if (!seen) {
        setVisible(true);
        sessionStorage.setItem("1h-boot-seen", "1");
        // Lock scroll while the intro plays
        document.documentElement.style.overflow = "hidden";
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const totalMs = 1700;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / totalMs);
      // Advance line index
      let idx = 0;
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (t >= BOOT_LINES[i].t) idx = i;
      }
      setLineIdx(idx);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Small hold then dismiss
        setTimeout(() => {
          setVisible(false);
          document.documentElement.style.overflow = "";
        }, 180);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[color:var(--color-bg)] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 0.8, 0.2, 1] } }}
        >
          {/* Scattered noise → assembling grid backdrop */}
          <motion.div
            aria-hidden
            className="absolute inset-0 grid-bg"
            initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
            animate={{
              opacity: 0.5,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] },
            }}
          />

          {/* Ambient accent glow */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(106,169,255,0.35) 0%, rgba(140,107,255,0.25) 40%, transparent 70%)",
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 0.9,
              transition: { duration: 1.3, ease: [0.22, 0.8, 0.2, 1] },
            }}
          />

          {/* Assembling rings */}
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            width="360"
            height="360"
            viewBox="0 0 360 360"
            aria-hidden
          >
            <defs>
              <linearGradient id="boot-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(106,169,255,1)" />
                <stop offset="50%" stopColor="rgba(140,107,255,0.9)" />
                <stop offset="100%" stopColor="rgba(94,240,216,0.9)" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="180"
              cy="180"
              r="150"
              fill="none"
              stroke="url(#boot-stroke)"
              strokeWidth="1"
              strokeDasharray="942"
              initial={{ strokeDashoffset: 942, opacity: 0.3 }}
              animate={{
                strokeDashoffset: 0,
                opacity: 1,
                transition: { duration: 1.2, ease: [0.22, 0.8, 0.2, 1] },
              }}
            />
            <motion.circle
              cx="180"
              cy="180"
              r="110"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.8"
              strokeDasharray="3 6"
              initial={{ rotate: -40, opacity: 0 }}
              animate={{
                rotate: 0,
                opacity: 1,
                transition: { duration: 1.1, ease: [0.22, 0.8, 0.2, 1] },
              }}
              style={{ transformOrigin: "180px 180px" }}
            />
            <motion.circle
              cx="180"
              cy="180"
              r="70"
              fill="none"
              stroke="rgba(94,240,216,0.5)"
              strokeWidth="0.8"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 0.9,
                transition: {
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.22, 0.8, 0.2, 1],
                },
              }}
              style={{ transformOrigin: "180px 180px" }}
            />
          </svg>

          {/* Central mark */}
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="relative flex size-14 items-center justify-center rounded-xl border border-white/25"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7, delay: 0.25, ease: [0.22, 0.8, 0.2, 1] },
              }}
            >
              <span className="absolute inset-[3px] rounded-[8px] bg-gradient-to-br from-[color:var(--color-accent)] via-[color:var(--color-accent-2)] to-[color:var(--color-accent-3)] opacity-85" />
              <span className="relative font-[family-name:var(--font-display)] text-[18px] font-bold text-white">
                1H
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
              className="flex min-w-[280px] flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2 text-[10.5px] tracking-[0.32em] uppercase font-[family-name:var(--font-mono)] text-white/45">
                <span className="size-1 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
                System boot · 01H
              </div>
              <div className="h-5 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={lineIdx}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 0.8, 0.2, 1] }}
                    className="font-[family-name:var(--font-mono)] text-[11.5px] tracking-[0.25em] uppercase text-white/85"
                  >
                    {BOOT_LINES[lineIdx].text}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="relative mt-1 h-[2px] w-[220px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background:
                      "linear-gradient(to right, var(--accent), var(--accent-2), var(--accent-3))",
                    boxShadow: "0 0 10px rgba(106,169,255,0.6)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{
                    width: "100%",
                    transition: { duration: 1.55, ease: [0.22, 0.8, 0.2, 1] },
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Corner ticks */}
          <CornerTicks />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CornerTicks() {
  const ticks = [
    { className: "top-8 left-8", tx: "OBSERVATORY/01" },
    { className: "top-8 right-8 text-right", tx: "QUADRANT NW" },
    { className: "bottom-8 left-8", tx: "LAT 19.15° N" },
    { className: "bottom-8 right-8 text-right", tx: "LONG 72.99° E" },
  ];
  return (
    <>
      {ticks.map((t, i) => (
        <motion.div
          key={t.tx}
          className={`absolute ${t.className} text-[10px] tracking-[0.28em] uppercase font-[family-name:var(--font-mono)] text-white/35`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5, delay: 0.15 + i * 0.06 },
          }}
          aria-hidden
        >
          {t.tx}
        </motion.div>
      ))}
    </>
  );
}
