"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   Orbital sunrise: a planet limb seen from orbit with the sun cresting it —
   the brand name, literally. One full-screen WebGL2 fragment shader (2D
   analytic, no raymarching), so it costs a fraction of a CPU particle field.
--------------------------------------------------------------------------- */

const VS = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uRise;    // 0 = sun below the limb, 1 = cresting
uniform vec2  uLook;    // eased pointer, -1..1
uniform vec3  uPlanet;  // centre.xy in p-space, radius
uniform vec2  uSun;     // sun centre in p-space
out vec4 outColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1, 0)), u.x),
             mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return s;
}
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }

float stars(vec2 p, float scale, float t) {
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  float h = hash21(id);
  vec2 o = vec2(hash21(id + 7.1), hash21(id + 3.3)) - 0.5;
  float d = length(f - o * 0.6);
  float tw = 0.6 + 0.4 * sin(t * (0.6 + h * 2.0) + h * 40.0);
  return pow(h, 24.0) * tw * smoothstep(0.16, 0.0, d);
}

void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - uRes) / uRes.y;
  vec2 C = uPlanet.xy;
  float R = uPlanet.z;
  vec2 q = p - C;
  float d = length(q);
  float h = d - R;                       // height above the limb
  vec2 n = q / d;
  vec2 sdir = normalize(uSun - C);
  float along = acos(clamp(dot(n, sdir), -1.0, 1.0)) * R;   // arc distance to the sun

  float sunMid  = exp(-along * 2.3);
  float sunNear = exp(-along * along * 6.0);
  float rise = uRise;

  // Brand palette, linear
  vec3 azure  = vec3(0.14, 0.40, 1.00);
  vec3 violet = vec3(0.26, 0.15, 1.00);
  vec3 mint   = vec3(0.11, 0.87, 0.69);
  vec3 warm   = vec3(1.00, 0.42, 0.14);
  vec3 white  = vec3(1.00, 0.93, 0.86);

  vec3 L = vec3(0.0);                    // light, tonemapped later

  // Stars, parallax deeper than the planet
  if (h > 0.0) {
    vec2 sp = p + uLook * 0.05;
    float st = stars(sp, 46.0, uTime) + 0.55 * stars(sp + 13.7, 96.0, uTime * 1.3);
    float glare = exp(-length(p - uSun) * 2.2) * rise;
    L += vec3(0.75, 0.85, 1.0) * st * 1.6 * (1.0 - glare) * smoothstep(0.0, 0.12, h);
  }

  // Night side: clouds lit only near the terminator, sparse city lights
  if (h < 0.0) {
    float depth = -h;
    float a = atan(q.y, q.x);
    vec2 uv = vec2(a * R * 3.2 + uTime * 0.004, log(depth + 0.004) * 1.6);
    float cl = smoothstep(0.42, 0.85, fbm(uv * 2.0));
    // Phones put the text over the planet, so keep its surface dimmer there.
    float surf = mix(0.35, 1.0, step(1.1, uRes.x / uRes.y));
    float lit = sunMid * exp(-depth * 7.0) * (0.35 + 0.65 * rise) * surf;
    L += mix(azure, white, 0.55) * cl * lit * 0.55;
    L += azure * exp(-depth * 40.0) * (0.06 + 0.45 * sunMid);

    vec2 cu = vec2(a * R, depth) * 70.0;
    float ch = hash21(floor(cu));
    float city = step(0.982, ch) * smoothstep(0.3, 0.0, length(fract(cu) - 0.5));
    L += vec3(1.0, 0.58, 0.24) * city * 0.7 * surf * (1.0 - sunMid) * smoothstep(0.03, 0.2, depth) * (1.0 - cl * 0.7);
  }

  // Atmosphere: thin layered band (warm → white → azure), brightest by the sun
  float H = 0.026 + 0.05 * sunMid;
  float above = max(h, 0.0);
  float dens = exp(-above / H) * smoothstep(-0.018, 0.0, h);
  float halo = exp(-above / (H * 6.0)) * smoothstep(-0.06, 0.0, h);
  float tt = h / H;
  vec3 band = mix(warm, white, smoothstep(-0.1, 0.55, tt));
  band = mix(band, azure, smoothstep(0.45, 1.8, tt));
  band = mix(mix(azure, violet, 0.35), band, smoothstep(0.0, 0.6, sunMid));
  float lum = (0.06 + 2.6 * sunMid + 7.0 * sunNear) * mix(0.45, 1.0, rise);
  L += band * dens * lum;
  L += mix(violet, azure, sunMid) * halo * (0.03 + 0.5 * sunMid) * mix(0.6, 1.0, rise);

  // Sun: disc hidden by the planet, bloom, starburst, anamorphic streak
  vec2 dd = p - uSun;
  float sd = length(dd);
  float vis = smoothstep(-0.006, 0.01, h);
  L += white * smoothstep(0.02, 0.008, sd) * vis * 10.0 * rise;
  L += mix(warm, white, 0.6) * (0.003 / (sd * sd + 0.003)) * 0.7 * rise;
  float ra = atan(dd.y, dd.x);
  float rays = pow(abs(cos(ra * 3.0 + 0.4)), 60.0) + 0.6 * pow(abs(cos(ra * 5.0 - 0.7)), 90.0);
  L += white * rays * exp(-sd * 7.0) * 0.8 * rise * vis;
  float streak = exp(-abs(dd.y) * 120.0) * exp(-abs(dd.x) * 2.4);
  L += mix(azure, mint, 0.25) * streak * 1.6 * rise;

  // Post: tonemap → gamma → vignette, then composite over the page colour
  vec3 col = pow(aces(L * 1.1), vec3(1.0 / 2.2));
  vec2 uv01 = gl_FragCoord.xy / uRes;
  col *= mix(0.7, 1.0, smoothstep(0.95, 0.35, length((uv01 - 0.5) * vec2(1.1, 1.3))));
  vec3 bg = h < 0.0 ? vec3(0.011, 0.018, 0.04) : vec3(0.0157, 0.0235, 0.051); // planet / #04060d
  col = bg + col * (1.0 - bg);
  col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) * (1.5 / 255.0);
  outColor = vec4(col, 1.0);
}`;

type Layout = { cx: number; cy: number; r: number; sunDx: number };

// Wide: the limb sweeps up the right side and the sun crests in the open
// upper-right, clear of the headline. Narrow: the text fills the screen, so
// the limb runs just under the nav, the sun crests in the top-right corner
// and the dark planet sits behind the text.
function layoutFor(aspect: number): Layout {
  if (aspect >= 1.5) return { cx: aspect + 0.4, cy: -2.3, r: 2.75, sunDx: -0.8 };
  // 4:3-ish screens: the headline runs wider, so lift the sun above it.
  if (aspect >= 1.1) return { cx: aspect + 0.25, cy: -2.0, r: 2.75, sunDx: -0.55 };
  return { cx: 0.3, cy: 0.8 - 1.6, r: 1.6, sunDx: 0.02 };
}

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

export default function HorizonField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas.style.display = "none"; // the hero's CSS gradient stays as the fallback
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(prog);
    gl.bindVertexArray(gl.createVertexArray());
    const U = Object.fromEntries(
      ["uRes", "uTime", "uRise", "uLook", "uPlanet", "uSun"].map((n) => [n, gl.getUniformLocation(prog, n)]),
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const look = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      look.tx = (e.clientX / innerWidth) * 2 - 1;
      look.ty = 1 - (e.clientY / innerHeight) * 2;
    };

    // Adaptive resolution: capped DPR, scaled down if frames run long.
    const maxScale = Math.min(window.devicePixelRatio || 1, 1.5);
    let scale = Math.min(1, maxScale);
    let avg = 16;
    let frame = 0;
    let raf: number | null = null;
    let last = performance.now();
    const t0 = last;

    function render(now: number) {
      const dt = Math.min(now - last, 100);
      last = now;
      avg += (dt - avg) * 0.05;
      if (frame > 30 && frame % 30 === 0) {
        if (avg > 22 && scale > 0.45) scale *= 0.85;
        else if (avg < 14 && scale < maxScale) scale = Math.min(maxScale, scale * 1.08);
      }
      frame++;

      const cw = canvas!.clientWidth;
      const ch = canvas!.clientHeight;
      const w = Math.max(1, Math.round(cw * scale));
      const h = Math.max(1, Math.round(ch * scale));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, w, h);

      const k = 1 - Math.pow(0.02, dt / 1000);
      look.x += (look.tx - look.x) * k;
      look.y += (look.ty - look.y) * k;

      const time = (now - t0) / 1000;
      // Crest timed to land as the headline finishes; scrolling lifts it further.
      const scrollLift = Math.min(1, window.scrollY / Math.max(1, ch));
      const rise = reduced ? 1 : easeOut((time - 0.35) / 2.2);

      const L = layoutFor(cw / Math.max(1, ch));
      const cx = L.cx + look.x * 0.025;
      const cy = L.cy + look.y * 0.018 + scrollLift * 0.12;
      const sunH = -0.05 + 0.07 * rise + scrollLift * 0.06;
      const ang = Math.atan2(Math.sqrt(L.r * L.r - L.sunDx * L.sunDx), L.sunDx);
      const sx = cx + Math.cos(ang) * (L.r + sunH);
      const sy = cy + Math.sin(ang) * (L.r + sunH);

      gl!.uniform2f(U.uRes, w, h);
      gl!.uniform1f(U.uTime, reduced ? 0 : time % 3600);
      gl!.uniform1f(U.uRise, rise);
      gl!.uniform2f(U.uLook, look.x, look.y);
      gl!.uniform3f(U.uPlanet, cx, cy, L.r);
      gl!.uniform2f(U.uSun, sx, sy);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      if (!reduced) raf = requestAnimationFrame(render);
    }

    const start = () => {
      if (raf === null) {
        last = performance.now();
        raf = requestAnimationFrame(render);
      }
    };
    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    // rAF keeps running for off-screen elements, so only animate while visible.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    const onResize = () => reduced && requestAnimationFrame(render);
    if (reduced) requestAnimationFrame(render);
    else io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={className} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
