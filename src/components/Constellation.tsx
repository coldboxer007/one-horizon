"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { featuredProjects } from "@/lib/projects";

const accentMap: Record<string, string> = {
  azure: "#6aa9ff",
  violet: "#8c6bff",
  mint: "#5ef0d8",
  rose: "#ff6ea0",
  cyan: "#69e6ff",
  ember: "#ffb26a",
};

type NodeDef = {
  title: string;
  slug: string;
  color: string;
  position: [number, number, number];
};

type ProgressRef = React.MutableRefObject<{
  reveal: number;
  lines: number;
  rotate: number;
}>;

function useProjectNodes(): NodeDef[] {
  return useMemo(() => {
    const count = featuredProjects.length;
    const radius = 4.6;
    return featuredProjects.map((p, i) => {
      const theta = (i / count) * Math.PI * 2;
      const tilt = (i % 2 === 0 ? 0.25 : -0.3) * Math.sin(i * 0.9);
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const y = tilt * radius;
      return {
        title: p.title,
        slug: p.slug,
        color: accentMap[p.accent] ?? "#6aa9ff",
        position: [x, y, z] as [number, number, number],
      };
    });
  }, []);
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CoreNode({ progress }: { progress: ProgressRef }) {
  const inner = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y = t * 0.25;
      inner.current.rotation.x = t * 0.12;
    }
    if (outer.current) {
      outer.current.rotation.y = -t * 0.1;
      const s =
        1 +
        Math.sin(t * 1.6) * 0.05 +
        progress.current.reveal * 0.12;
      outer.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#6aa9ff"
          emissiveIntensity={1.4}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial
          color="#8c6bff"
          emissive="#8c6bff"
          emissiveIntensity={0.35}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      <Html
        position={[0, -1.6, 0]}
        center
        distanceFactor={10}
        zIndexRange={[5, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div className="text-center select-none">
          <div className="text-[9px] tracking-[0.32em] uppercase font-[family-name:var(--font-mono)] text-white/55">
            Core
          </div>
          <div className="font-[family-name:var(--font-display)] text-[16px] tracking-tight text-white">
            1 Horizon
          </div>
        </div>
      </Html>
    </group>
  );
}

const band = (v: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (v - a) / (b - a)));

function ProjectNode({
  node,
  index,
  progress,
}: {
  node: NodeDef;
  index: number;
  progress: ProgressRef;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<React.ElementRef<typeof Line>>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const targetPos = useMemo(
    () => new THREE.Vector3(...node.position),
    [node.position],
  );
  const startPos = useMemo(
    () =>
      new THREE.Vector3(
        node.position[0] * 2.4,
        node.position[1] * 2.4 + (index % 2 ? 1.6 : -1.6),
        node.position[2] * 2.4,
      ),
    [node.position, index],
  );
  const currentPos = useRef(startPos.clone());
  const labelPos = useMemo(
    () =>
      new THREE.Vector3(
        node.position[0] * 1.2,
        node.position[1] * 1.2 + 0.45,
        node.position[2] * 1.2,
      ),
    [node.position],
  );
  const scratch = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const revealRaw = progress.current.reveal * 1.4 - index * 0.06;
    const reveal = Math.min(1, Math.max(0, revealRaw));

    // Position blend
    const target = new THREE.Vector3().lerpVectors(
      startPos,
      targetPos,
      easeOut(reveal),
    );
    target.x += Math.sin(t * 0.35 + index) * 0.08;
    target.y += Math.cos(t * 0.4 + index * 0.8) * 0.08;
    target.z += Math.sin(t * 0.3 + index * 1.3) * 0.08;

    currentPos.current.lerp(target, 0.09);

    if (meshRef.current) {
      meshRef.current.position.copy(currentPos.current);
      meshRef.current.rotation.x = t * 0.3 + index;
      meshRef.current.rotation.y = t * 0.22;
      const scale = 0.22 + 0.3 * reveal;
      meshRef.current.scale.setScalar(scale);

      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.7 + 1.0 * reveal;
      }
    }

    if (lineRef.current) {
      const lineRaw = progress.current.lines * 1.35 - index * 0.08;
      const lineVisible = Math.min(1, Math.max(0, lineRaw));
      const mat = (lineRef.current as unknown as { material?: THREE.Material })
        .material;
      if (mat && "opacity" in mat) {
        (mat as THREE.Material & { opacity: number }).opacity =
          0.18 + 0.62 * lineVisible;
      }
    }

    if (labelRef.current && meshRef.current?.parent) {
      // The ring rotates with scroll, so a label can swing onto the header,
      // the caption or past the screen edge: fade it out in those bands.
      const p = meshRef.current.parent.localToWorld(scratch.copy(labelPos)).project(state.camera);
      const { width: w, height: h } = state.size;
      const sx = ((p.x + 1) / 2) * w;
      const sy = ((1 - p.y) / 2) * h;
      const safe =
        band(sy, h * 0.3, h * 0.38) *
        // Phones wrap the caption to more lines, so it starts higher.
        (1 - band(sy, h * (w < 640 ? 0.62 : 0.78), h * (w < 640 ? 0.7 : 0.84))) *
        band(sx, 40, 110) *
        (1 - band(sx, w - 110, w - 40));
      labelRef.current.style.opacity = String(reveal * safe);
      labelRef.current.style.transform = `translateY(${(1 - reveal) * 10}px)`;
    }
  });

  const linePoints = useMemo<[number, number, number][]>(
    () => [
      [0, 0, 0],
      node.position,
    ],
    [node.position],
  );

  return (
    <group>
      <Line
        ref={lineRef as never}
        points={linePoints}
        color={node.color}
        lineWidth={1.3}
        transparent
        opacity={0.2}
        dashed
        dashScale={12}
        dashSize={0.2}
        gapSize={0.35}
      />

      <mesh ref={meshRef} position={startPos}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.8}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      <Html
        position={labelPos}
        center
        distanceFactor={10}
        zIndexRange={[5, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={labelRef}
          className="whitespace-nowrap select-none"
          style={{ opacity: 0, transition: "none" }}
        >
          <div
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-mono)]"
            style={{
              borderColor: `${node.color}55`,
              background: "rgba(4,6,13,0.65)",
              color: node.color,
              boxShadow: `0 0 14px ${node.color}30`,
            }}
          >
            <span
              className="inline-block size-1 rounded-full"
              style={{ background: node.color }}
            />
            {node.title}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Scene({ progress }: { progress: ProgressRef }) {
  const nodes = useProjectNodes();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y =
        progress.current.rotate * Math.PI * 0.9 + t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 6]} intensity={1.1} color="#6aa9ff" />
      <pointLight position={[-6, -4, -4]} intensity={0.9} color="#8c6bff" />
      <pointLight position={[0, 5, -6]} intensity={0.6} color="#5ef0d8" />

      <group ref={groupRef}>
        <CoreNode progress={progress} />
        {nodes.map((n, i) => (
          <ProjectNode key={n.slug} node={n} index={i} progress={progress} />
        ))}

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.2, 0.005, 8, 128]} />
          <meshBasicMaterial color="#6aa9ff" transparent opacity={0.25} />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0.4, 0]}>
          <torusGeometry args={[5.6, 0.004, 8, 128]} />
          <meshBasicMaterial color="#8c6bff" transparent opacity={0.18} />
        </mesh>
      </group>
    </>
  );
}

export default function Constellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // WebGL keeps rendering off-screen otherwise; pre-warm 200px early.
  const live = useInView(wrapRef, { margin: "200px" });
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  // Start everything moving immediately as the section enters so there's no
  // visual gap between the Manifesto and the first readable content here.
  const reveal = useTransform(scrollYProgress, [0.0, 0.38], [0, 1]);
  const lines = useTransform(scrollYProgress, [0.18, 0.7], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0.0, 0.9], [0, 1]);

  // Live ref into the R3F scene — children read it each frame
  const progress = useRef({ reveal: 0, lines: 0, rotate: 0 });

  useEffect(() => {
    const ur = reveal.on("change", (v) => (progress.current.reveal = v));
    const ul = lines.on("change", (v) => (progress.current.lines = v));
    const uo = rotate.on("change", (v) => (progress.current.rotate = v));
    return () => {
      ur();
      ul();
      uo();
    };
  }, [reveal, lines, rotate]);

  // Header is visible immediately (no empty-void entry) and lingers until the
  // very end so there's always something written on screen.
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.04, 0.88, 0.98],
    [1, 1, 1, 0],
  );
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.88, 0.98],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={wrapRef}
      className="relative h-[200vh]"
      aria-label="System constellation"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(900px 600px at 20% 30%, rgba(106,169,255,0.14), transparent 60%), radial-gradient(900px 600px at 80% 70%, rgba(140,107,255,0.14), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />

        <Canvas
          frameloop={live ? "always" : "never"}
          camera={{ position: [0, 1.4, 10], fov: 48 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene progress={progress} />
        </Canvas>

        <motion.div
          className="pointer-events-none absolute top-0 left-0 right-0 z-10 px-6 md:px-10 pt-28 pb-16 bg-gradient-to-b from-[#04060d] via-[#04060d]/85 to-transparent"
          style={{ opacity: headerOpacity }}
        >
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
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-10 pt-16 bg-gradient-to-t from-[#04060d] via-[#04060d]/85 to-transparent"
          style={{ opacity: captionOpacity }}
        >
          <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-8">
            <p className="max-w-[520px] text-[14px] md:text-[15px] leading-relaxed text-white/65">
              Each project is a node on the same lattice — voice pipelines, 3D
              worlds, clinical reasoning, disaster command. They connect back
              to one shared philosophy: intelligence is structural.
            </p>
            <div className="hidden md:flex items-center gap-2 text-[10.5px] tracking-[0.28em] uppercase font-[family-name:var(--font-mono)] text-white/40">
              <span className="size-1.5 rounded-full bg-[color:var(--color-accent-3)] animate-pulse" />
              Scroll to resolve lattice
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
