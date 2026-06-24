"use client";

import { useEffect, useRef } from "react";

type Props = {
  phrases?: string[];
  className?: string;
  particleCount?: number;
};

export default function ParticleField({
  phrases = ["1 HORIZON", "SYSTEMS IN MOTION", "THINK · SEE · SPEAK · ACT"],
  className,
  particleCount = 7000,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const N = reduced ? 2500 : particleCount;

    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const pz = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);
    const vz = new Float32Array(N);
    const tx = new Float32Array(N);
    const ty = new Float32Array(N);
    const tz = new Float32Array(N);
    const ox = new Float32Array(N);
    const oy = new Float32Array(N);
    const oz = new Float32Array(N);
    const hue = new Float32Array(N);
    const phase = new Float32Array(N);

    let W = 0, H = 0, CX = 0, CY = 0, dpr = 1;
    // 0 = sphere, 1 = forming text, 2 = text idle
    let state: 0 | 1 | 2 = 0;
    let t = 0;
    let rotY = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let phraseIdx = 0;

    const FOV = 550;
    const CAMERA_Z = 600;
    const PHI = Math.PI * (1 + Math.sqrt(5));
    const REPEL_RADIUS = 120;
    const REPEL_FORCE = 7;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      CX = W / 2;
      CY = H / 2;
      canvas!.width = Math.floor(W * dpr);
      canvas!.height = Math.floor(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initSphereTargets();
      if (state >= 1) formPhrase(phrases[phraseIdx], false);
    }

    function initSphereTargets() {
      const baseDim = Math.min(W, H);
      const R = baseDim > 1100 ? baseDim * 0.34 : baseDim * 0.46;
      for (let i = 0; i < N; i++) {
        const polar = Math.acos(1 - 2 * (i + 0.5) / N);
        const azim = PHI * i;
        ox[i] = Math.sin(polar) * Math.cos(azim) * R;
        oy[i] = Math.sin(polar) * Math.sin(azim) * R;
        oz[i] = Math.cos(polar) * R;
        if (state === 0) {
          tx[i] = ox[i];
          ty[i] = oy[i];
          tz[i] = oz[i];
        }
      }
    }

    function initParticles() {
      for (let i = 0; i < N; i++) {
        px[i] = (Math.random() - 0.5) * W * 1.4;
        py[i] = (Math.random() - 0.5) * H * 1.4;
        pz[i] = (Math.random() - 0.5) * 1000;
        vx[i] = vy[i] = vz[i] = 0;
        hue[i] = (i / N) * 160 + 190; // cyan → blue → violet
        phase[i] = Math.random() * Math.PI * 2;
      }
    }

    function samplePhrase(phrase: string): number[] {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(W));
      off.height = Math.max(1, Math.floor(H));
      const c2 = off.getContext("2d");
      if (!c2) return [];

      const words = phrase.split(" ");
      const lines: string[] = [];
      let cur = "";
      const maxChars = phrase.length > 22 ? 12 : 18;
      words.forEach((w) => {
        if ((cur + w).length > maxChars) {
          lines.push(cur.trim());
          cur = w + " ";
        } else {
          cur += w + " ";
        }
      });
      lines.push(cur.trim());

      let fs = Math.min(W * 0.72 / (maxChars * 0.52), H * 0.42 / lines.length, 180);
      if (phrase.length > 28) fs *= 0.85;

      c2.fillStyle = "#fff";
      c2.font = `900 ${fs}px "Space Grotesk", "Arial Black", system-ui, sans-serif`;
      c2.textAlign = "center";
      c2.textBaseline = "middle";
      const lh = fs * 1.05;
      const startY = H / 2 - ((lines.length - 1) * lh) / 2;
      lines.forEach((line, i) => c2.fillText(line, W / 2, startY + i * lh));

      const data = c2.getImageData(0, 0, off.width, off.height).data;
      const pts: number[] = [];
      const step = phrase.length > 24 ? 3 : 2;
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 130) {
            pts.push(
              x - off.width / 2 + (Math.random() - 0.5) * 0.8,
              y - off.height / 2 + (Math.random() - 0.5) * 0.8,
            );
          }
        }
      }
      // Fisher-Yates pair shuffle
      for (let i = pts.length / 2 - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const ia = i * 2, ja = j * 2;
        let tmp = pts[ia]; pts[ia] = pts[ja]; pts[ja] = tmp;
        tmp = pts[ia + 1]; pts[ia + 1] = pts[ja + 1]; pts[ja + 1] = tmp;
      }
      return pts;
    }

    function formPhrase(phrase: string, advance: boolean) {
      const pts = samplePhrase(phrase);
      if (pts.length < 4) return;
      const count = pts.length / 2;
      state = 1;
      rotY = 0;
      for (let i = 0; i < N; i++) {
        const idx = (i % count) * 2;
        tx[i] = pts[idx];
        ty[i] = pts[idx + 1];
        tz[i] = 0;
      }
      if (advance) {
        setTimeout(() => (state = 2), 1400);
      }
    }

    function update() {
      t += 0.005;
      if (state === 0) rotY += 0.005;
      const jitter = state === 0 ? 1.8 : 0;

      for (let i = 0; i < N; i++) {
        const curTx = tx[i], curTy = ty[i], curTz = tz[i];
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        let targetX = curTx * cosY - curTz * sinY;
        let targetY = curTy;
        let targetZ = curTx * sinY + curTz * cosY;

        if (state === 0) {
          targetX += Math.sin(t * 8 + phase[i]) * jitter;
          targetY += Math.cos(t * 9 + phase[i]) * jitter;
          targetZ += Math.sin(t * 7 + phase[i] * 2) * jitter;
        }

        const sp = state === 0 ? 0.019 : 0.024;
        vx[i] += (targetX - px[i]) * sp;
        vy[i] += (targetY - py[i]) * sp;
        vz[i] += (targetZ - pz[i]) * sp;

        if (state >= 1 && mouseX > 0) {
          const scale = FOV / (FOV + pz[i] + CAMERA_Z);
          const sx = px[i] * scale + CX;
          const sy = py[i] * scale + CY;
          const rdx = sx - mouseX;
          const rdy = sy - mouseY;
          const d2 = rdx * rdx + rdy * rdy;
          if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 1) {
            const d = Math.sqrt(d2);
            const mag = REPEL_FORCE * (1 - d / REPEL_RADIUS) * 4.5;
            vx[i] += (rdx / d) * mag;
            vy[i] += (rdy / d) * mag;
          }
        }

        vx[i] *= 0.83;
        vy[i] *= 0.83;
        vz[i] *= 0.83;
        px[i] += vx[i];
        py[i] += vy[i];
        pz[i] += vz[i];
      }
    }

    function draw() {
      ctx!.fillStyle = "rgba(4,6,13,0.28)";
      ctx!.fillRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        const zPos = pz[i] + CAMERA_Z;
        if (zPos < 10) continue;
        const scale = FOV / zPos;
        const sx = px[i] * scale + CX;
        const sy = py[i] * scale + CY;
        const spd = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i] + vz[i] * vz[i]);
        let a = Math.min(1, (0.14 + spd * 0.09) * (scale * 0.65));
        let size = (0.4 + spd * 0.12) * scale;
        let h: number, s: number, l: number;
        if (state >= 1) {
          h = 196;
          s = 90;
          l = 82;
          a = Math.min(1, a * 1.45);
          size *= 0.95;
        } else {
          h = (hue[i] + t * 18) % 360;
          s = 78;
          l = 68;
        }
        ctx!.beginPath();
        ctx!.arc(sx, sy, size, 0, 6.2832);
        ctx!.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`;
        ctx!.fill();
      }
    }

    function loop() {
      update();
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    // Phrase cycle: sphere → phrase 1 → sphere → phrase 2 → ...
    let phraseTimer: number | null = null;
    function schedule() {
      phraseTimer = window.setTimeout(function step() {
        if (state === 0) {
          formPhrase(phrases[phraseIdx], true);
          phraseTimer = window.setTimeout(step, 4200);
        } else {
          state = 0;
          initSphereTargets();
          phraseIdx = (phraseIdx + 1) % phrases.length;
          phraseTimer = window.setTimeout(step, 3200);
        }
      }, 2200);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };
    const onResize = () => resize();

    resize();
    initParticles();
    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    loop();
    schedule();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (phraseTimer) clearTimeout(phraseTimer);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [phrases, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
    />
  );
}
