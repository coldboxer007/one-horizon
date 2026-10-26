"use client";

import { featuredProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import HephaestusScene from "./HephaestusScene";
import Reveal from "./Reveal";

export default function Systems() {
  // Hephaestus gets the pinned scroll scene — it's our strongest credential
  // (Winner · Google DeepMind global hackathon). Everything else keeps order.
  const rest = featuredProjects.filter((p) => p.slug !== "hephaestus");

  return (
    <section
      id="systems"
      className="relative py-24 md:py-32"
      aria-labelledby="systems-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
            <span className="inline-block h-px w-8 bg-white/25" />
            <span>◆ 004 · Featured Systems</span>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              id="systems-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.8rem)] leading-[1.03] tracking-[-0.02em] font-medium text-balance max-w-[780px]"
            >
              A portfolio of{" "}
              <span className="relative inline-block text-[color:var(--color-accent)]">
                systems,
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-[0.18em] h-[2px] rounded-full bg-gradient-to-r from-[color:var(--color-accent)] to-transparent"
                />
              </span>{" "}
              not screenshots.
            </h2>
            <p className="max-w-[420px] text-[14.5px] text-white/55 leading-relaxed">
              Each project is a working intelligence system with its own
              logic, inputs, outputs, and visual atmosphere — engineered in
              weeks, judged at global hackathons, and deployed live.
            </p>
          </div>
        </Reveal>

      </div>

      {/* Pinned scroll scene: blueprint → 3D extrusion → project panel */}
      <HephaestusScene />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* 2×3 bento for the remaining 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
