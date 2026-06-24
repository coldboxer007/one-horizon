"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

type Accent = {
  from: string;
  to: string;
  glow: string;
  dot: string;
};

export default function SceneGraphic({
  type,
  accent,
}: {
  type: Project["sceneType"];
  accent: Accent;
}) {
  const common = "absolute inset-0 w-full h-full opacity-90";
  switch (type) {
    case "map":
      return <MapScene className={common} accent={accent} />;
    case "transform":
      return <TransformScene className={common} accent={accent} />;
    case "timeline":
      return <TimelineScene className={common} accent={accent} />;
    case "signal":
      return <SignalScene className={common} accent={accent} />;
    case "device":
      return <DeviceScene className={common} accent={accent} />;
    case "reason":
      return <ReasonScene className={common} accent={accent} />;
    case "radar":
      return <RadarScene className={common} accent={accent} />;
  }
}

function MapScene({ className, accent }: { className: string; accent: Accent }) {
  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent.dot} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent.dot} stopOpacity="0" />
        </radialGradient>
        <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mapGrid)" />
      <circle cx="300" cy="210" r="200" fill="url(#mapGlow)" />
      {/* Radar sweeps */}
      {[60, 110, 160, 210].map((r) => (
        <motion.circle
          key={r}
          cx="300"
          cy="210"
          r={r}
          fill="none"
          stroke={accent.dot}
          strokeOpacity="0.14"
          strokeDasharray="2 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "300px 210px" }}
        />
      ))}
      {/* Topography lines */}
      <g stroke={accent.dot} strokeOpacity="0.22" fill="none">
        <path d="M0 120 Q150 100 300 140 T600 120" />
        <path d="M0 180 Q160 160 300 190 T600 180" />
        <path d="M0 240 Q150 220 300 250 T600 230" />
        <path d="M0 300 Q160 280 300 310 T600 290" />
      </g>
      {/* Nodes */}
      {[
        [180, 160],
        [420, 180],
        [250, 260],
        [380, 280],
        [300, 210],
      ].map(([x, y], i) => (
        <g key={i}>
          <motion.circle
            cx={x}
            cy={y}
            r="6"
            fill={accent.dot}
            fillOpacity="0.15"
            animate={{ r: [6, 14, 6], opacity: [0.4, 0.05, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
          <circle cx={x} cy={y} r="2.5" fill={accent.dot} />
        </g>
      ))}
    </svg>
  );
}

function TransformScene({
  className,
  accent,
}: {
  className: string;
  accent: Accent;
}) {
  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="planGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent.dot} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent.dot} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Isometric blueprint to 3D room */}
      <g transform="translate(300 210)">
        <motion.g
          initial={{ rotate: -4 }}
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform="skewY(-18) translate(-120 -60)">
            <rect width="240" height="160" fill="url(#planGrad)" stroke={accent.dot} strokeOpacity="0.45" strokeWidth="1" />
            <line x1="0" y1="60" x2="240" y2="60" stroke={accent.dot} strokeOpacity="0.35" />
            <line x1="120" y1="0" x2="120" y2="160" stroke={accent.dot} strokeOpacity="0.35" />
            <line x1="60" y1="60" x2="60" y2="160" stroke={accent.dot} strokeOpacity="0.25" />
            <line x1="180" y1="0" x2="180" y2="60" stroke={accent.dot} strokeOpacity="0.25" />
            {/* Doors */}
            <circle cx="120" cy="60" r="3" fill={accent.dot} />
            <circle cx="60" cy="60" r="3" fill={accent.dot} />
            <circle cx="180" cy="60" r="3" fill={accent.dot} />
          </g>
        </motion.g>
        {/* Rising extrusions */}
        {[-90, -30, 30, 90].map((x, i) => (
          <motion.rect
            key={i}
            x={x - 10}
            y={-80}
            width="20"
            height="80"
            fill={accent.dot}
            fillOpacity="0.08"
            stroke={accent.dot}
            strokeOpacity="0.3"
            initial={{ height: 0, y: 0 }}
            animate={{ height: [0, 70, 30, 70], y: [0, -70, -30, -70] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>
    </svg>
  );
}

function TimelineScene({
  className,
  accent,
}: {
  className: string;
  accent: Accent;
}) {
  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="tlGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent.dot} stopOpacity="0" />
          <stop offset="50%" stopColor={accent.dot} stopOpacity="0.6" />
          <stop offset="100%" stopColor={accent.dot} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Timeline tracks */}
      {[140, 190, 240, 290].map((y, trackIdx) => (
        <g key={y}>
          <line x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.08)" />
          {Array.from({ length: 7 }).map((_, i) => {
            const w = 40 + ((i * 13) % 80);
            const x = 30 + i * 80 + (trackIdx % 2) * 20;
            return (
              <motion.rect
                key={i}
                x={x}
                y={y - 12}
                width={w}
                height="24"
                rx="3"
                fill={accent.dot}
                fillOpacity="0.12"
                stroke={accent.dot}
                strokeOpacity="0.35"
                animate={{
                  x: [x, x + 4, x],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 4 + trackIdx,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            );
          })}
        </g>
      ))}
      {/* Playhead */}
      <motion.rect
        x="0"
        y="100"
        width="4"
        height="220"
        fill="url(#tlGrad)"
        animate={{ x: [40, 560, 40] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Waveform */}
      <g stroke={accent.dot} strokeOpacity="0.45" strokeLinecap="round">
        {Array.from({ length: 80 }).map((_, i) => {
          const h = 6 + Math.abs(Math.sin(i * 0.8)) * 20;
          return (
            <line
              key={i}
              x1={10 + i * 7.3}
              y1={360 - h}
              x2={10 + i * 7.3}
              y2={360 + h}
              strokeWidth="1.5"
            />
          );
        })}
      </g>
    </svg>
  );
}

function SignalScene({
  className,
  accent,
}: {
  className: string;
  accent: Accent;
}) {
  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sigGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent.dot} stopOpacity="0" />
          <stop offset="50%" stopColor={accent.dot} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent.dot} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Horizontal grid */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={50 + i * 40}
          x2="600"
          y2={50 + i * 40}
          stroke="rgba(255,255,255,0.04)"
        />
      ))}
      {/* Pulse waveform */}
      <motion.path
        d="M0 210 L80 210 L95 180 L110 240 L125 210 L220 210 L235 160 L250 260 L265 210 L360 210 L375 150 L390 270 L405 210 L600 210"
        fill="none"
        stroke="url(#sigGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0 260 Q60 260 70 250 T140 260 T210 260 T280 260 T350 260 T420 260 T490 260 T600 260"
        fill="none"
        stroke={accent.dot}
        strokeOpacity="0.25"
        strokeWidth="1"
        initial={{ x: 0 }}
        animate={{ x: [-50, 0, -50] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      {/* Bar ticks */}
      <g>
        {Array.from({ length: 20 }).map((_, i) => {
          const h = 6 + Math.abs(Math.sin(i * 1.1)) * 18;
          return (
            <motion.rect
              key={i}
              x={40 + i * 28}
              y={340 - h}
              width="4"
              height={h * 2}
              rx="1.5"
              fill={accent.dot}
              fillOpacity="0.5"
              animate={{ height: [h * 2, h * 0.8, h * 2] }}
              transition={{ duration: 2.5, delay: i * 0.05, repeat: Infinity }}
            />
          );
        })}
      </g>
    </svg>
  );
}

function DeviceScene({
  className,
  accent,
}: {
  className: string;
  accent: Accent;
}) {
  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="devGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={accent.dot} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent.dot} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#devGlow)" />
      {/* Orbit lines */}
      <g stroke={accent.dot} strokeOpacity="0.18" fill="none">
        <ellipse cx="300" cy="210" rx="220" ry="60" />
        <ellipse cx="300" cy="210" rx="160" ry="44" />
        <ellipse cx="300" cy="210" rx="100" ry="30" />
      </g>
      {/* Eye / camera core */}
      <g transform="translate(300 210)">
        <motion.circle
          r="44"
          fill="none"
          stroke={accent.dot}
          strokeOpacity="0.4"
          animate={{ r: [44, 52, 44] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <circle r="32" fill="rgba(0,0,0,0.6)" stroke={accent.dot} strokeOpacity="0.6" />
        <motion.circle
          r="14"
          fill={accent.dot}
          fillOpacity="0.35"
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle r="5" fill={accent.dot} />
      </g>
      {/* Orbiting nodes */}
      {[0, 120, 240].map((deg, i) => (
        <motion.g
          key={deg}
          style={{ transformOrigin: "300px 210px" }}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 20 - i * 3, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="520" cy="210" r="5" fill={accent.dot} fillOpacity="0.8" />
        </motion.g>
      ))}
      {/* Signal bars at bottom */}
      <g transform="translate(0 360)">
        {Array.from({ length: 30 }).map((_, i) => {
          const h = 4 + Math.abs(Math.sin(i * 0.6)) * 16;
          return (
            <motion.rect
              key={i}
              x={i * 20 + 10}
              y={-h}
              width="3"
              height={h}
              fill={accent.dot}
              fillOpacity="0.4"
              animate={{ height: [h, h * 1.5, h] }}
              transition={{ duration: 1.4, delay: i * 0.04, repeat: Infinity }}
            />
          );
        })}
      </g>
    </svg>
  );
}

function RadarScene({
  className,
  accent,
}: {
  className: string;
  accent: Accent;
}) {
  // Pentagonal skills radar + live voice bars — unique from Signal's EKG/pulse
  const cx = 300;
  const cy = 180;
  const sides = 6;
  const rings = [40, 80, 120, 160];
  const angle = (i: number) => (Math.PI * 2 * i) / sides - Math.PI / 2;
  const polygon = (r: number) =>
    Array.from({ length: sides })
      .map((_, i) => `${cx + r * Math.cos(angle(i))},${cy + r * Math.sin(angle(i))}`)
      .join(" ");

  // Two candidate profiles (outer / inner) to animate between
  const profileA = [0.92, 0.58, 0.75, 0.4, 0.66, 0.82];
  const profileB = [0.72, 0.85, 0.55, 0.78, 0.48, 0.9];
  const toPoints = (vals: number[]) =>
    vals
      .map(
        (v, i) =>
          `${cx + 160 * v * Math.cos(angle(i))},${cy + 160 * v * Math.sin(angle(i))}`,
      )
      .join(" ");

  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={accent.dot} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent.dot} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent.dot} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accent.dot} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#radarGlow)" />

      {/* Rings */}
      {rings.map((r) => (
        <polygon
          key={r}
          points={polygon(r)}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.6"
        />
      ))}
      {/* Spokes */}
      {Array.from({ length: sides }).map((_, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + 160 * Math.cos(angle(i))}
          y2={cy + 160 * Math.sin(angle(i))}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.6"
        />
      ))}

      {/* Animated profile polygon — crossfade between two candidate profiles */}
      <motion.polygon
        points={toPoints(profileA)}
        fill="url(#radarFill)"
        stroke={accent.dot}
        strokeOpacity="0.85"
        strokeWidth="1.5"
        strokeLinejoin="round"
        animate={{ opacity: [1, 0.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.polygon
        points={toPoints(profileB)}
        fill="url(#radarFill)"
        stroke={accent.dot}
        strokeOpacity="0.65"
        strokeWidth="1.5"
        strokeLinejoin="round"
        animate={{ opacity: [0.15, 1, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vertex markers for profile A */}
      {profileA.map((v, i) => (
        <circle
          key={`a${i}`}
          r="2.5"
          cx={cx + 160 * v * Math.cos(angle(i))}
          cy={cy + 160 * v * Math.sin(angle(i))}
          fill={accent.dot}
          fillOpacity="0.8"
        />
      ))}

      {/* Sweep */}
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <path
          d={`M${cx} ${cy} L${cx + 160} ${cy} A160 160 0 0 1 ${cx + 160 * Math.cos(Math.PI / 6)} ${cy + 160 * Math.sin(Math.PI / 6)} Z`}
          fill={accent.dot}
          fillOpacity="0.12"
        />
      </motion.g>

      {/* Live voice bars — mic activity during interview */}
      <g transform="translate(0 350)">
        {Array.from({ length: 28 }).map((_, i) => {
          const base = 6 + Math.abs(Math.sin(i * 0.9)) * 14;
          return (
            <motion.rect
              key={i}
              x={60 + i * 17}
              y={-base}
              width="5"
              height={base * 2}
              rx="2.5"
              fill={accent.dot}
              fillOpacity="0.55"
              animate={{
                height: [base * 2, base * 0.6, base * 2.2, base * 2],
                y: [-base, -base * 0.3, -base * 1.1, -base],
              }}
              transition={{
                duration: 1.6,
                delay: i * 0.05,
                repeat: Infinity,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

function ReasonScene({
  className,
  accent,
}: {
  className: string;
  accent: Accent;
}) {
  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rsGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent.dot} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent.dot} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Tree / graph */}
      <g stroke={accent.dot} strokeOpacity="0.35" fill="none">
        <path d="M300 80 L150 180 L80 300" />
        <path d="M300 80 L300 180 L240 300" />
        <path d="M300 80 L300 180 L360 300" />
        <path d="M300 80 L450 180 L520 300" />
        <path d="M450 180 L420 300" />
        <path d="M150 180 L200 300" />
      </g>
      {[
        [300, 80],
        [150, 180],
        [300, 180],
        [450, 180],
        [80, 300],
        [200, 300],
        [240, 300],
        [360, 300],
        [420, 300],
        [520, 300],
      ].map(([x, y], i) => (
        <g key={i}>
          <motion.circle
            cx={x}
            cy={y}
            r={i === 0 ? 16 : 9}
            fill="url(#rsGrad)"
            stroke={accent.dot}
            strokeOpacity="0.55"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
          />
          <circle cx={x} cy={y} r="2.5" fill={accent.dot} />
        </g>
      ))}
      {/* Moving reasoning trail */}
      <motion.circle
        r="4"
        fill={accent.dot}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          offsetPath: "path('M300 80 L300 180 L360 300')",
        }}
      />
    </svg>
  );
}
