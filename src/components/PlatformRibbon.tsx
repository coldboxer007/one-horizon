"use client";

import { BrandIcon, brandMeta } from "./BrandIcon";
import type { BrandKey } from "@/lib/projects";

const platforms: BrandKey[] = [
  "google",
  "gemini",
  "aws",
  "anthropic",
  "huggingface",
  "kaggle",
  "devpost",
  "nmims",
];

// Duplicate the list so the marquee loops seamlessly
const ribbon = [...platforms, ...platforms, ...platforms];

export default function PlatformRibbon() {
  return (
    <section
      aria-label="Platforms we've built on"
      className="relative py-8 md:py-10 border-b border-[color:var(--color-line)] overflow-hidden"
    >
      {/* Edge gradient masks so the loop feels infinite */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-40 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--bg) 0%, rgba(4,6,13,0.9) 40%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-40 z-10"
        style={{
          background:
            "linear-gradient(to left, var(--bg) 0%, rgba(4,6,13,0.9) 40%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="relative flex items-center gap-4 md:gap-6 px-6 md:px-10 mb-5">
        <span className="inline-block h-px w-8 bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-3)]" />
        <span className="text-[11px] tracking-[0.28em] uppercase font-[family-name:var(--font-mono)] text-white/45">
          Built across
        </span>
        <span className="flex-1 h-px bg-[color:var(--color-line)]" />
      </div>

      <div
        className="ribbon-track flex w-max items-center gap-14"
        style={{ animation: "ribbon-scroll 42s linear infinite" }}
      >
        {ribbon.map((b, i) => (
          <div
            key={`${b}-${i}`}
            className="flex items-center gap-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <BrandIcon brand={b} size={22} />
            <span className="text-[14px] md:text-[15px] font-[family-name:var(--font-display)] text-white/80 tracking-tight">
              {brandMeta[b].label}
            </span>
            <span className="text-white/20 text-[18px] ml-8 select-none">
              ◇
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes ribbon-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        .ribbon-track {
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .ribbon-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
