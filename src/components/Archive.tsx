"use client";

import { archiveProjects } from "@/lib/projects";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { BrandIcon, brandMeta } from "./BrandIcon";

export default function Archive() {
  return (
    <section id="archive" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/45">
            <span className="inline-block h-px w-8 bg-white/25" />
            <span>◆ 006 · Archive</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-12 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.8rem)] leading-[1.03] tracking-[-0.02em] font-medium max-w-[780px] text-balance">
            More from the lab.
          </h2>
        </Reveal>

        <div className="grid gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)] rounded-2xl overflow-hidden">
          {archiveProjects.map((p, i) => (
            <ArchiveRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveRow({
  project,
  index,
}: {
  project: (typeof archiveProjects)[number];
  index: number;
}) {
  return (
    <motion.a
      href={project.links[0]?.href || "#"}
      target={project.links[0] ? "_blank" : undefined}
      rel="noreferrer noopener"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.04 }}
      className="group relative grid grid-cols-12 gap-4 md:gap-6 items-start bg-[color:var(--color-bg)] hover:bg-[color:var(--color-bg-elev)] transition-colors px-6 md:px-8 py-7 md:py-8 cursor-pointer"
    >
      {/* Accent bar on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[color:var(--color-accent)] via-[color:var(--color-accent-2)] to-[color:var(--color-accent-3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="col-span-12 md:col-span-1 text-[11px] tracking-[0.22em] uppercase font-[family-name:var(--font-mono)] text-white/35">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="col-span-12 md:col-span-4">
        <h3 className="font-[family-name:var(--font-display)] text-[22px] md:text-[26px] text-white font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>
        <p className="text-[13.5px] text-white/55 mt-1">{project.subtitle}</p>
      </div>
      <div className="col-span-12 md:col-span-5">
        <p className="text-[13.5px] text-white/60 leading-relaxed">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/55 font-[family-name:var(--font-mono)]"
            >
              {s}
            </span>
          ))}
        </div>
        {project.brands.length > 0 && (
          <div className="flex items-center gap-3 mt-3 opacity-70">
            {project.brands.map((b) => (
              <span
                key={b}
                title={brandMeta[b].label}
                className="inline-flex items-center gap-1.5"
              >
                <BrandIcon brand={b} size={12} />
                <span className="text-[10.5px] text-white/50 font-[family-name:var(--font-mono)] tracking-wide">
                  {brandMeta[b].label}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-2 flex flex-col items-start md:items-end gap-2 text-[11.5px] font-[family-name:var(--font-mono)] tracking-wide text-white/45">
        <span className="text-white/70">{project.status}</span>
        <span className="text-white/35">{project.timeline}</span>
        {project.links[0] && (
          <span className="mt-2 inline-flex items-center gap-1.5 text-white/60 group-hover:text-white transition-colors">
            {project.links[0].label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        )}
      </div>
    </motion.a>
  );
}
