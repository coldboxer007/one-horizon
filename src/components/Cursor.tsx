"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type Mode = "default" | "interactive" | "link";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState<string>("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Two springs for parallax-style feel — fast dot, slower ring
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 });

  // Center offsets
  const dotLeft = useTransform(dotX, (v) => `${v - 4}px`);
  const dotTop = useTransform(dotY, (v) => `${v - 4}px`);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch / coarse pointer devices
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const resolveMode = (target: EventTarget | null): [Mode, string] => {
      if (!(target instanceof Element)) return ["default", ""];
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      );
      if (!interactive) return ["default", ""];

      const explicit = interactive.getAttribute("data-cursor");
      if (explicit === "link") return ["link", "VISIT"];
      if (explicit === "external") return ["link", "OPEN ↗"];
      if (explicit === "mail") return ["link", "EMAIL"];
      if (explicit === "drag") return ["link", "DRAG ⇄"];
      if (interactive.tagName === "A") {
        const href = interactive.getAttribute("href") || "";
        if (href.startsWith("mailto:")) return ["link", "EMAIL"];
        if (
          interactive.getAttribute("target") === "_blank" ||
          /^https?:/.test(href)
        ) {
          return ["link", "OPEN ↗"];
        }
        return ["link", "VISIT"];
      }
      return ["interactive", ""];
    };

    const onOver = (e: PointerEvent) => {
      const [next, nextLabel] = resolveMode(e.target);
      setMode((prev) => (prev === next ? prev : next));
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };

    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    // Hide default cursor globally
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize =
    mode === "link" ? 72 : mode === "interactive" ? 42 : 26;
  const ringOpacity =
    mode === "link" ? 1 : mode === "interactive" ? 0.9 : 0.55;

  return (
    <>
      {/* Dot */}
      <motion.span
        className="pointer-events-none fixed z-[9998] size-2 rounded-full bg-white mix-blend-difference"
        style={{ left: dotLeft, top: dotTop }}
        aria-hidden
      />

      {/* Ring + label */}
      <motion.span
        className="pointer-events-none fixed z-[9997] flex items-center justify-center rounded-full border"
        style={{
          left: ringX,
          top: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderColor:
            mode === "link"
              ? "rgba(94,240,216,0.9)"
              : "rgba(255,255,255,0.7)",
          background:
            mode === "link"
              ? "rgba(94,240,216,0.08)"
              : "rgba(255,255,255,0.04)",
          boxShadow:
            mode === "link"
              ? "0 0 24px rgba(94,240,216,0.35)"
              : "0 0 14px rgba(255,255,255,0.12)",
          opacity: ringOpacity,
          transition:
            "width 0.22s cubic-bezier(0.2,0.8,0.2,1), height 0.22s cubic-bezier(0.2,0.8,0.2,1), border-color 0.2s, background 0.2s, box-shadow 0.25s, opacity 0.2s",
        }}
        aria-hidden
      >
        {mode === "link" && label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-[family-name:var(--font-mono)] text-[9.5px] tracking-[0.22em] text-white/95"
          >
            {label}
          </motion.span>
        )}
      </motion.span>
    </>
  );
}
