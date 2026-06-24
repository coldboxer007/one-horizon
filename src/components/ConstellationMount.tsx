"use client";

import dynamic from "next/dynamic";

const Constellation = dynamic(() => import("./Constellation"), {
  ssr: false,
  loading: () => <ConstellationSkeleton />,
});

export default function ConstellationMount() {
  return <Constellation />;
}

function ConstellationSkeleton() {
  return (
    <section className="relative h-[200vh]" aria-hidden>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(900px 600px at 20% 30%, rgba(106,169,255,0.14), transparent 60%), radial-gradient(900px 600px at 80% 70%, rgba(140,107,255,0.14), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-60" />

        {/* Static ring placeholder */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
          width="420"
          height="420"
          viewBox="0 0 420 420"
        >
          <defs>
            <linearGradient id="skel-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6aa9ff" />
              <stop offset="0.5" stopColor="#8c6bff" />
              <stop offset="1" stopColor="#5ef0d8" />
            </linearGradient>
          </defs>
          <circle
            cx="210"
            cy="210"
            r="180"
            fill="none"
            stroke="url(#skel-stroke)"
            strokeWidth="1"
          />
          <circle
            cx="210"
            cy="210"
            r="130"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.8"
            strokeDasharray="3 6"
          />
        </svg>

        <div className="pointer-events-none absolute top-0 left-0 right-0 px-6 md:px-10 pt-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-4 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
              <span className="inline-block h-px w-8 bg-white/25" />
              <span>◆ 003 · Constellation</span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.05] tracking-[-0.02em] font-medium max-w-[780px]">
              Seven systems.{" "}
              <span className="bg-gradient-to-r from-[color:var(--color-accent-3)] via-[color:var(--color-accent)] to-[color:var(--color-accent-2)] bg-clip-text text-transparent">
                One operating core.
              </span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
