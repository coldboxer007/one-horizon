# 1 Horizon — Systems in Motion

> **Live site:** [1horizon-ai.com](https://1horizon-ai.com)  
> **Deployed on:** Google Cloud Run · `us-central1`  
> **Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v3 · Framer Motion · Three.js / React Three Fiber · Lenis

---

## What Is This?

This is the portfolio website for **1 Horizon**, an AI systems studio building intelligent products across multimodal interfaces, agentic workflows, real-time environments, and embodied systems. The site is designed to feel like a cinematic lab observatory — not a typical portfolio page. Every design and engineering decision was made to communicate that *intelligence is structural*, not decorative.

The site showcases seven AI projects built across global hackathons (Google DeepMind, Anthropic, Amazon, Google Cloud), a robotics capstone, and three formally recognized achievements, displayed with a visual identity that matches the ambition of the work.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, `output: "standalone"`) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Animation | Framer Motion 12 |
| 3D | Three.js r184 · React Three Fiber v9 · Drei v10 |
| Smooth scroll | Lenis 1.3 |
| Fonts | Space Grotesk (display) · Inter (body) · JetBrains Mono (mono) |
| Deployment | Google Cloud Run (containerised via Docker multi-stage build) |
| DNS | Squarespace → Google Cloud Run domain mapping |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, global providers
│   ├── page.tsx            # Single-page composition — 9 sections in order
│   └── globals.css         # CSS variables, body gradients, noise, scrollbar, grid-bg
├── components/
│   ├── BootSequence.tsx    # Full-screen intro animation (session-gated)
│   ├── BrandIcon.tsx       # Inline SVG brand icons for all platforms
│   ├── Capabilities.tsx    # Engineering depth — 8-cell grid with icons
│   ├── Constellation.tsx   # Scroll-driven 3D R3F scene
│   ├── ConstellationMount.tsx  # Client-side dynamic import wrapper
│   ├── Contact.tsx         # Contact section with recognition signals
│   ├── Cursor.tsx          # Custom cursor: dot + ring + label
│   ├── Footer.tsx          # Minimal footer
│   ├── Hero.tsx            # Full-height hero with particle field
│   ├── Manifesto.tsx       # Animated manifesto + Recognition + pillars
│   ├── Medal.tsx           # Animated SVG award medallions (Trophy / Bronze / HM)
│   ├── Nav.tsx             # Fixed nav with scroll progress bar + active tracking
│   ├── ParticleField.tsx   # Custom Canvas 2D particle system engine
│   ├── PlatformRibbon.tsx  # Infinite-scroll platform logo marquee
│   ├── ProjectCard.tsx     # Individual project card with scene graphic
│   ├── Recognition.tsx     # Recognition cards with medal, globe, scale
│   ├── Reveal.tsx          # Reusable scroll-reveal wrapper
│   ├── SceneGraphic.tsx    # Per-project SVG scene illustrations
│   ├── SmoothScroll.tsx    # Lenis initializer (render-null client component)
│   ├── Systems.tsx         # Featured projects grid
│   └── Team.tsx            # Team section with Y Combinator photo + member cards
└── lib/
    ├── cn.ts               # clsx + tailwind-merge utility
    └── projects.ts         # All data: projects, team, capabilities, recognitions
```

---

## How the Site Is Structured (Section by Section)

The entire site is a single scrollable page. The order of sections was chosen deliberately to build trust progressively: arrival → philosophy → credentials → work → depth → team → contact.

```
Hero
  └── ParticleField (canvas engine)
Manifesto
  └── Recognition (wins block)
  └── Three pillars
PlatformRibbon (marquee)
ConstellationMount
  └── Constellation (R3F scene — pinned, scroll-driven)
Systems (featured projects)
Capabilities (engineering depth grid)
Archive (additional projects)
Team (photo + member cards)
Contact
Footer
```

---

## Design System

### Color Palette

The entire palette is defined as CSS custom properties on `:root` and aliased for use with Tailwind's arbitrary value syntax.

```css
--bg:       #04060d   /* near-black base */
--bg-elev:  #0a0f1c   /* elevated surface */
--fg:       #e7ecf5   /* primary text */
--accent:   #6aa9ff   /* azure blue */
--accent-2: #8c6bff   /* violet */
--accent-3: #5ef0d8   /* mint / cyan */
```

The body itself carries a three-node radial gradient — azure upper-right, violet upper-left, mint lower — so the background is never flat.

### Typography

Three typefaces are loaded from Google Fonts via `next/font` with `display: swap`:

- **Space Grotesk** (`--font-display`): Headers and display text. Tight tracking, slightly round — technical but human.
- **Inter** (`--font-inter`): Body copy. Neutral and legible.
- **JetBrains Mono** (`--font-mono`): Labels, section codes, metadata, chip text, all-caps identifiers.

### Grid Background

A `.grid-bg` utility class renders a 64×64px dot grid via CSS `background-image` with a radial mask so it fades at the edges. Used on the hero, manifesto, constellation, and capabilities sections to reinforce the lab / observatory aesthetic.

### Noise Overlay

The `.noise::after` utility injects a subtle SVG `feTurbulence` filter as an `::after` pseudo-element with `mix-blend-mode: overlay` at 3.5% opacity. Applied to the Hero section. Makes the background feel like printed film grain rather than flat digital black.

### Motion Accessibility

A global `@media (prefers-reduced-motion: reduce)` block forces all animation durations to `0.001ms`, effectively disabling motion for users who opt out. The `ParticleField` additionally halves its particle count for reduced-motion users.

---

## Key Features and How They Were Built

### 1. Boot Sequence (`BootSequence.tsx`)

On every fresh session (tracked via `sessionStorage`), a full-screen intro overlay plays before the page loads:

- Scroll is locked for the duration via `document.documentElement.style.overflow = "hidden"`.
- A `requestAnimationFrame` loop drives progress over 1.7 seconds, advancing through four boot lines: `BOOTING ORBITAL OBSERVATORY → ALIGNING PARTICLE LATTICE → SYSTEMS IN MOTION → 01 HORIZON — ONLINE`.
- An animated SVG draws a gradient circle (stroke-dashoffset animation), two inner rings, and a central logo mark.
- Corner ticks display observatory coordinates (LAT/LONG of Mumbai).
- On completion, the overlay fades out and scroll is re-enabled.
- **Session-gated**: plays once per browser session. Navigating between tabs or refreshing within the session skips it.

### 2. Particle Field (`ParticleField.tsx`)

A hand-written Canvas 2D engine — no library. 7,000 particles (2,500 on reduced-motion) allocated as typed `Float32Array` buffers for position, velocity, target, hue, and phase.

**State machine:**

| State | Behaviour |
|---|---|
| `0` (sphere) | Particles orbit a Fibonacci-distributed sphere, rotating on the Y axis |
| `1` (forming) | Particles spring toward sampled pixel positions of rasterised text |
| `2` (text idle) | Text shape holds, particles jitter gently |

**Text sampling:** A hidden offscreen canvas renders the phrase at large font size. Its pixel data is scanned to collect lit pixel coordinates, which become particle target positions. Fisher-Yates shuffled so particles come from random directions rather than top-left.

**Mouse repulsion:** In text states, a 120px-radius repulsion zone pushes particles away from the pointer with a proximity-scaled force, creating a "cursor parting the crowd" effect.

**Phrase cycling:** `sphere (3.2s) → phrase (4.2s) → sphere → next phrase`. Cycles through: `"1 HORIZON" → "SYSTEMS IN MOTION" → "THINK · SEE · SPEAK · ACT"`.

**Rendering:** Partial alpha clear (`rgba(4,6,13,0.28)` each frame) creates motion trails. Particle size and opacity scale with velocity and depth (`FOV / zPos`). In text state, all particles lock to `hsl(196, 90%, 82%)` — a cold blue-white.

### 3. Scroll-Driven 3D Constellation (`Constellation.tsx` + `ConstellationMount.tsx`)

A pinned `200vh` section where scrolling animates a React Three Fiber scene rather than moving the page.

**Architecture:**
- `ConstellationMount.tsx` is a client-only wrapper that uses `next/dynamic` with `ssr: false` to load the heavy R3F canvas only in the browser.
- `Constellation.tsx` uses `useScroll` from Framer Motion to derive three motion values from scroll progress: `reveal` (0→1), `lines` (0→1 with delay), and `rotate` (0→1).
- These motion values are written into a `MutableRefObject` via `useEffect` listeners. R3F's `useFrame` reads from the ref each frame — this avoids the stale prop problem that occurs when passing motion values through React props.
- The `CoreNode` renders an icosahedron with a wireframe outer shell, both continuously rotating.
- Each `ProjectNode` renders an icosahedron that starts off-screen (2.4× its target radius) and lerps to its orbit position as `reveal` increases. Orbital position is derived from an even angular distribution, with a small sinusoidal float added in `useFrame`.
- Dashed `<Line>` connections from each node to the center become opaque as `lines` increases.
- Labels fade in and slide up as each node's reveal value crosses its threshold.
- Three coloured point lights (azure, violet, mint) and two torus rings (orbital plane indicators) complete the scene.
- The whole group rotates based on `rotate` plus a slow autonomous drift (`t * 0.05`).

### 4. Custom Cursor (`Cursor.tsx`)

Enabled only on `(pointer: fine)` devices (i.e. mouse users, not touch). Uses two springs with different stiffness settings:

- **Dot** (stiffness 900, damping 50): snappy, tracks almost exactly with the pointer
- **Ring** (stiffness 220, damping 24): floaty, lags behind — creates a parallax-within-the-cursor effect

**Modes:**

| Mode | Trigger | Ring size | Color |
|---|---|---|---|
| `default` | No target | 26px | white/55 |
| `interactive` | `button`, `input`, etc. | 42px | white/70 |
| `link` | `<a>` or `data-cursor="link"` | 72px | mint (#5ef0d8) with glow |

In `link` mode the ring expands and shows a contextual label: `VISIT`, `OPEN ↗`, or `EMAIL`, driven by `data-cursor` attributes and href inspection. The system class `has-custom-cursor` on `<html>` applies `cursor: none` to every interactive element globally.

### 5. Navigation with Scroll Progress (`Nav.tsx`)

- A fixed header that becomes `backdrop-blur-xl` + a semi-transparent background after 20px of scroll.
- **Active section tracking:** `IntersectionObserver` watches all five section IDs with `rootMargin: "-30% 0px -55% 0px"` — a horizontal slice of the viewport centre. The highest-intersection-ratio candidate wins. Framer Motion's `layoutId` system animates a pill background and a mint dot between nav items with a spring transition.
- **Progress bar:** A 2px gradient bar (`azure → violet → mint`) sits at the bottom of the nav. Its `scaleX` is driven by `useSpring(scrollYProgress)` — spring parameters tuned to feel like it's physically dragging behind the scroll.

### 6. Manifesto Headline Reveal (`Manifesto.tsx`)

The manifesto headline splits into five `<Line>` components that each mask-reveal from below (`y: "105%" → 0`) with staggered delays.

**The reliability problem:** Lenis (smooth scroll) intercepts browser scroll events, which causes Framer Motion's `useInView` (IntersectionObserver-based) to occasionally mis-fire. The fix uses three layers:

1. Framer Motion's `useInView` with `amount: 0.01`
2. A raw `scroll` + `resize` event listener checking `getBoundingClientRect()` against viewport bounds
3. A hard 1.5-second fallback timer that reveals unconditionally

If any of the three triggers fires, `revealed` is set to `true` and the other listeners clean up immediately.

### 7. Recognition / Wins Block (`Recognition.tsx` + `Medal.tsx`)

Displayed within the Manifesto section to establish credibility before the projects. Each of the three recognitions gets an animated medal:

**Trophy (Winner — Hephaestus / Google DeepMind):**
- Azure gradient cup with handles, rim, star-of-merit inlay, and plinth engraved `WINNER`
- Specular shine sweep that replays every ~5.6s (motion-animated rect with `screen` blend mode)
- Floating animation (`y: 0 → -3.2 → 0` over 3.8s) + pulsing azure halo
- Orbiting sparkle dots that fade in and out

**Bronze Medal (3rd Place — Director's Cut / Anthropic × Hugging Face):**
- Violet ribbon flaps (matching the card's accent) with a centre knot
- Bronze disc with radial gradient, laurel wreath, specular highlight, and large "3"
- Pendulum sway (`rotate: -2.4 → 2.4` over 4.2s, pivot at top of ribbon)

**Honorable Mention (Gemmatron / Google Cloud):**
- 12-spoke starburst that rotates continuously (40s revolution)
- Faceted hexagonal gem with gradient facets and "HM" lettering with drop-shadow glow
- Mint ribbon tails
- Pulsing ring that expands and fades on a 2.8s loop

Each medal enters with `whileInView: { opacity: 1, y: 0, scale: 1 }` — an initial `{ y: 10, scale: 0.92 }` state creates a pop-in on first scroll into view.

Cards additionally show: a `GlobeGlyph` (animated wireframe globe — meridians rotate slowly) with a "Global" label for all three wins, and a scale caption like "Worldwide · Google DeepMind".

### 8. Platform Ribbon (`PlatformRibbon.tsx`)

A horizontal marquee of platform logos that scrolls infinitely at 42s per cycle. Implementation:

- The platform array is triplicated so the CSS animation (`translate3d(0 → -33.3%)`) always has content to scroll into.
- Edge gradient masks (`linear-gradient` from `--bg` to transparent, 160px wide on each side) make the loop feel infinite rather than starting and stopping at edges.
- `will-change: transform` and `translate3d` keep this on the GPU compositor thread.
- Logos are inline SVGs served through `BrandIcon.tsx` — no external image requests.

### 9. Team Section (`Team.tsx`)

**Photo banner:** A cinematic widescreen photo from Y Combinator Startup School India, treated to blend with the dark brand environment:

- `filter: contrast(1.08) brightness(1.0) saturate(0.7)` — reduces saturation to avoid a vivid photo clash
- A `color` blend-mode layer at `opacity: 0.38` in `#6aa3e6` (azure) tints the image blue while preserving subject detail
- A radial `screen` blend-mode gradient adds a soft key-light glow
- Edge gradients fade into the page background on all four sides
- An SVG corner-tick overlay (the same L-bracket marks used in the hero) unifies it with the lab aesthetic
- A 64×48px fine grid at 30% opacity ties it visually to the site's background grid

**Member cards:** Each card has:
- A per-operator radial tint (azure / violet / mint) that glows at 20% opacity by default and 60% on hover
- An SVG circuit trace pattern as the card background (visible on hover)
- The full card area is a LinkedIn `<a>` overlay (`z-index: 10`). Email chips sit at `z-index: 30` and are separate `<a>` elements — resolving the HTML validity issue of nested interactive elements

### 10. Animated SVG Capabilities Icons (`Capabilities.tsx`)

Eight capabilities are displayed in a 4-column grid (2 on mobile). Each capability has a hand-drawn inline SVG icon:

| Icon | Paths |
|---|---|
| Agents | Hub-and-spoke node network |
| Multimodal | Rectangle (vision) + circle (audio) + waveform |
| Voice | Microphone with stand |
| 3D viz | Isometric cube with spine |
| Edge/Chip | Processor with pins |
| Robotics | Robot face with antennae and legs |
| Orchestration | Five-node fan topology |
| Realtime | ECG waveform |

On hover, the tile background transitions from `--bg` to `--bg-elev` and the icon's tint colour radiates as a blurred circle.

---

## Data Architecture (`src/lib/projects.ts`)

All content is typed and co-located in a single file — no CMS, no external API.

```typescript
// Core types
type Project        // slug, title, summary, stack, architecture, impact, links, brands, accent, sceneType
type TeamMember     // name, role, bio, linkedin, email
type Recognition    // rank, medal, venue, partners, global, scale
type CapabilityIcon // union of icon keys
```

- `featuredProjects[]` — 7 items shown in Systems + Constellation
- `archiveProjects[]` — 3 items (CutPilot, CareerMatch, ConcallIQ) in the Archive grid
- `team[]` — 3 members in order: Sahil Tanna, Tayyab Khan, Kumar Nikunj Sinha
- `recognitions[]` — 3 wins: Hephaestus (trophy), Director's Cut (bronze), Gemmatron (honorable)
- `capabilities[]` — 8 engineering disciplines
- `contact` — email addresses

The `BrandKey` union type covers `google | gemini | deepmind | aws | anthropic | huggingface | kaggle | devpost | nmims`. Every platform has an inline SVG and a display label in `BrandIcon.tsx`.

---

## Deployment

### Google Cloud Run

The site runs as a container on Cloud Run, built from a multi-stage Dockerfile:

```
Stage 1 (deps)     — alpine node:20, npm ci (production deps only)
Stage 2 (builder)  — full build, NEXT_TELEMETRY_DISABLED=1, npm run build
Stage 3 (runner)   — copies .next/standalone + .next/static + public only
                     runs as non-root user, listens on $PORT (8080)
```

Next.js `output: "standalone"` mode produces a minimal self-contained server that doesn't need `node_modules` at runtime — keeps the container image small.

### Deploy Script

```bash
bash deploy.sh
```

This wraps `gcloud run deploy one-horizon --source . --region us-central1` with fixed parameters: 512Mi memory, 1 CPU, 0–10 instances, 80 concurrency, 60s timeout. Cloud Build handles the container build remotely — no Docker daemon needed locally.

Redeploying with `deploy.sh` updates the running container in-place. The domain mapping (`1horizon-ai.com` and `www.1horizon-ai.com`) is untouched by subsequent deploys.

### Domain

| Record | Host | Value |
|---|---|---|
| A | `@` | Google Cloud Run IPs × 4 |
| AAAA | `@` | Google Cloud Run IPv6 IPs × 4 |
| CNAME | `www` | `ghs.googlehosted.com.` |
| TXT | `@` | `google-site-verification=...` |

DNS is managed in Squarespace under Custom Records. The Squarespace Defaults section must be removed to prevent their parking page A records from overriding the Cloud Run IPs.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev        # → http://localhost:3000

# Production build (verify before deploy)
npm run build
npm start

# Lint
npm run lint
```

**Node.js requirement:** 20+ (Tailwind v4's Oxide engine requires Node 20; this project uses Tailwind v3, so Node 18+ technically works, but 20 is the Docker target and recommended locally).

---

## Performance Considerations

- **Typed arrays in ParticleField:** Position, velocity, and target data for all 7,000 particles are `Float32Array` — avoids garbage collection pressure from JS object allocation.
- **GPU compositing in ribbon:** `translate3d` and `will-change: transform` keep the marquee off the main thread.
- **Dynamic R3F import:** The Three.js canvas is loaded client-side only via `next/dynamic` with `ssr: false`, keeping the server-rendered HTML fast.
- **DPR cap in R3F canvas:** `dpr={[1, 1.8]}` prevents 2× retina rendering overhead on high-res displays.
- **Image optimisation:** `next/image` serves the team photo as WebP/Avif (`formats: ["image/avif", "image/webp"]` in `next.config.ts`) with responsive `sizes`.
- **Font subsetting:** All three Google Fonts are loaded with `subsets: ["latin"]` and `display: swap`.
- **Particle count reduction:** `matchMedia("prefers-reduced-motion")` cuts particle count from 7,000 to 2,500 for accessibility and battery.

---

## The Projects Showcased

### Featured (Systems section)

| Project | Domain | Recognition |
|---|---|---|
| **HawkEye** | Live AI disaster command center | Gemini Live Agent Challenge |
| **Hephaestus** | AI architectural visualisation (2D→3D) | **Winner** · Google DeepMind Nano Banana Hackathon · $400K+ pool |
| **Director's Cut** | Autonomous AI video editor | **3rd Place** · MCP 1st Birthday · Anthropic × HuggingFace |
| **Momnitrix** | Maternal health triage on WatchOS | Google MedGemma Impact Challenge · $100K pool |
| **HireOn** | Live voice mock interview AI | Amazon Nova AI Hackathon |
| **Gemmatron** | Reasoning in a 2B open-source model | **Honorable Mention** · Google Tunix / Kaggle · $100K pool |
| **ECHO** | 6-wheeled emotion-aware robot | University capstone |

### Archive (additional)

| Project | Domain |
|---|---|
| **CutPilot** | 4-agent AI video editor (Gemini 3 + Veo) |
| **CareerMatch** | CV-to-job semantic matching (BigQuery ML) |
| **ConcallIQ** | Earnings-call RAG with QuIM + FIT |

---

## Team

| Name | Role |
|---|---|
| **Sahil Tanna** | Full-stack engineering · iOS & WatchOS · Product design · Interfaces |
| **Tayyab Khan** | ML engineering · Multi-agent systems · Platform |
| **Kumar Nikunj Sinha** | Research · Clinical reasoning · Data science |

**Contact:** sahiltanna@1horizon-ai.com · tayyab@1horizon-ai.com

---

*Built in Mumbai. Deployed globally.*
