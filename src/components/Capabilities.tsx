"use client";

import { capabilities, type CapabilityIcon } from "@/lib/projects";
import Reveal from "./Reveal";

const tints = [
  "var(--color-accent)",
  "var(--color-accent-2)",
  "var(--color-accent-3)",
  "var(--color-accent)",
  "var(--color-accent-2)",
  "var(--color-accent-3)",
  "var(--color-accent)",
  "var(--color-accent-2)",
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative py-24 md:py-32 border-y border-[color:var(--color-line)]"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-[color:var(--color-accent-3)] to-[color:var(--color-accent)]" />
            <span>◆ 004 · Engineering Depth</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-16 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.8rem)] leading-[1.03] tracking-[-0.02em] font-medium max-w-[900px] text-balance">
            Capabilities that span{" "}
            <span className="bg-gradient-to-r from-[color:var(--color-accent-3)] via-[color:var(--color-accent)] to-[color:var(--color-accent-2)] bg-clip-text text-transparent">
              perception, reasoning, and embodiment.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)] rounded-2xl overflow-hidden">
          {capabilities.map((c, i) => {
            const tint = tints[i % tints.length];
            return (
              <Reveal
                key={c.title}
                delay={i * 0.05}
                className="group relative bg-[color:var(--color-bg)] hover:bg-[color:var(--color-bg-elev)] transition-colors p-6 md:p-7 min-h-[220px] flex flex-col justify-between overflow-hidden"
              >
                {/* Soft tint wash on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ background: tint }}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] group-hover:border-white/20 transition-colors"
                    style={{ color: tint }}
                  >
                    <CapIcon icon={c.icon} />
                  </div>
                  <span className="text-[11px] font-[family-name:var(--font-mono)] tracking-[0.22em] uppercase text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-[18px] md:text-[20px] text-white tracking-tight mb-2">
                    {c.title}
                  </h3>
                  <p className="text-[13px] md:text-[13.5px] text-white/55 leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapIcon({ icon }: { icon: CapabilityIcon }) {
  const s = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "agents":
      return (
        <svg {...s}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M12 7v4M10.5 12 6.5 16.5M13.5 12l4 4.5M7 18h10" />
        </svg>
      );
    case "multimodal":
      return (
        <svg {...s}>
          <rect x="3" y="5" width="8" height="8" rx="1.5" />
          <circle cx="17" cy="9" r="4" />
          <path d="M3 19h18M6 17l1.5 2M12 17l1.5 2M18 17l1.5 2" />
        </svg>
      );
    case "voice":
      return (
        <svg {...s}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
        </svg>
      );
    case "cube":
      return (
        <svg {...s}>
          <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
          <path d="M3 7l9 5 9-5M12 12v10" />
        </svg>
      );
    case "chip":
      return (
        <svg {...s}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    case "robot":
      return (
        <svg {...s}>
          <rect x="5" y="8" width="14" height="10" rx="2" />
          <circle cx="9" cy="13" r="1.3" />
          <circle cx="15" cy="13" r="1.3" />
          <path d="M12 5V3M10 5h4M3 12v3M21 12v3M9 18v3M15 18v3" />
        </svg>
      );
    case "orchestrate":
      return (
        <svg {...s}>
          <circle cx="12" cy="12" r="2" />
          <circle cx="4" cy="5" r="1.5" />
          <circle cx="20" cy="5" r="1.5" />
          <circle cx="4" cy="19" r="1.5" />
          <circle cx="20" cy="19" r="1.5" />
          <path d="M10.5 11 5.5 6M13.5 11l5-5M10.5 13l-5 5M13.5 13l5 5" />
        </svg>
      );
    case "realtime":
      return (
        <svg {...s}>
          <path d="M3 12h3l2-6 4 12 2-6 2 3h5" />
        </svg>
      );
  }
}
