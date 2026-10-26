# 1 Horizon — Site Review (Then vs. Now)

> Reviewed 26 October 2026 against the live site at [1horizon-ai.com](https://1horizon-ai.com), GitHub commit `424d238` on `main`, and the uncommitted local working tree.
>
> This file covers status, issues, and what to do next. For how the site is built, see [`README.md`](./README.md). For how to run and deploy it, see [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md). For reusable techniques, see [`../BUILD_TECHNIQUES.md`](../BUILD_TECHNIQUES.md). For a short pickup guide, see [`HANDOFF.md`](./HANDOFF.md).

---

## 0. Update: later on 26 October 2026 (still uncommitted)

Since this review was written, the local tree has gained a redesign and most of the code fixes below. None of it is committed or deployed yet.

- **New hero.** `HorizonField.tsx` is a WebGL2 "orbital sunrise" shader: a planet limb with the sun cresting it, which is the brand name made literal. It replaces the 7,000-particle canvas, so issues 2, 3 and 8 no longer apply. The headline now rises word by word in CSS, so it plays before hydration.
- **Boot overlay removed.** It locked scroll for about 2.4 seconds and caused issue 14. The sunrise is now the intro.
- **Multiverse project cards.** On hover, halftone dots bloom around the cursor, the title misregisters in pink/cyan "on twos", and an `EARTH-1H0x` tag appears.
- **Sunrise footer.** The planet arc, sun and wordmark rise as the footer scrolls in. A faint "dawn" layer warms the page toward it.
- **Fixes:**
  - The project count is derived from the data.
  - The prize wording now reads "$400K+" everywhere.
  - Sections are renumbered 002–008.
  - Nikunj's email (`nikunjsinha@1horizon-ai.com`) is on his card and in Contact.
  - Added `robots.txt`, `sitemap.xml` and Organization JSON-LD.
  - The hero shader and the R3F canvas pause when off-screen.
  - The Hephaestus panel is `inert` while hidden.
  - The recognition cards have clear accessible names.
  - Blur-filter reveals and SVG `height` animations, which caused jank and console errors, were replaced.
  - The constellation labels no longer cover the header.
  - Removed the `public/` boilerplate.
  - Updated the README.
- **Still open:** the token in the git remote (1), the GitHub link (10), the contrast pass (12), the reduced-motion hydration in `HephaestusScene` (15), the team photo alt text (18), the project links (19), a general contact inbox, and a check on a real phone.

---

## 1. Summary

The live site is exactly GitHub commit `424d238`. A meaningful batch of polish work exists only on this machine. It adds social preview images and icons, moves the hero particles away from the headline, adds a pinned Hephaestus scroll scene, adds a footer wordmark, and makes several smaller visual fixes. That work builds cleanly (`next build` passes, with lint and types clean and 196 kB first-load JS on `/`), but it has not been committed, pushed, or deployed.

The most visible live problems are hero readability and first-frame particle blobs, both fixed locally. Next come a missing link-preview image (also fixed locally) and a "12+ projects" claim when the site lists 10. The biggest strategic gap is that the site shows the work as atmosphere rather than evidence. It has no real screenshots, no per-project pages, and no clear ask for clients or recruiters.

---

## 2. Status: Live vs. GitHub vs. Local

| Item | Live (1horizon-ai.com) | GitHub `main` (424d238) | Local working tree |
|---|---|---|---|
| Matches commit 424d238 | Yes | Yes | No (11 modified, 5 new files) |
| `og:image` / large Twitter card | No (`twitter:card` = `summary`) | No | Yes (`/og.png`, 1200×630, `summary_large_image`) |
| `metadataBase` | No | No | Yes (`NEXT_PUBLIC_SITE_URL` or `https://1horizon-ai.com`) |
| SVG icon, Apple touch icon, theme colour | No (favicon.ico only) | No | Yes |
| Hephaestus presentation | Static hero `ProjectCard` | Same | Pinned scroll scene (`HephaestusScene.tsx`) |
| Hero particle position | Centred, behind headline | Same | Upper-right on screens over 900px wide |
| Footer | One-line footer | Same | Large outline "1 HORIZON" wordmark plus the existing line |
| `robots.txt` / `sitemap.xml` | 404 | Missing | Missing |
| Builds | n/a | Yes | Yes (verified 26 Oct 2026) |

I verified the live state with `curl` against the production HTML. It has no `og:image`, no `Scene 01 · Transform` text, and no footer wordmark, and `/og.png` and `/icon.svg` return 404. I verified the local state by running `next start` on the fresh build. It renders `og:image` as `https://1horizon-ai.com/og.png`, `theme-color` as `#04060d`, and both new icons.

---

## 3. What the Site Was (GitHub / Live, Section by Section)

The site is one long page. Each section is a component in `src/components/`, assembled in `src/app/page.tsx`. Every section reads its content from `src/lib/projects.ts`.

1. **Boot sequence.** A full-screen 1.7-second intro ("BOOTING ORBITAL OBSERVATORY … 01 HORIZON — ONLINE") that locks scroll. It plays once per browser session, gated by `sessionStorage` key `1h-boot-seen`.
2. **Hero.** The headline "Building intelligent systems that think, see, speak, and act." uses a gradient on the second half, with a paragraph, two CTAs, and mono "observatory" chrome. Below it, three stats read Projects 12+, Hackathons 8, and Platforms Google · AWS · Anthropic. Behind everything, a 7,000-particle Canvas 2D sphere is centred on the viewport and periodically re-forms into the phrases "1 HORIZON", "SYSTEMS IN MOTION", and "THINK · SEE · SPEAK · ACT".
3. **Manifesto (002).** A line-by-line masked reveal of the studio philosophy, three recognition cards with animated medals, and three pillars.
4. **Platform ribbon.** An infinite marquee of platform logos.
5. **Constellation (003).** A 200vh pinned React Three Fiber scene in which seven project nodes orbit a core, headed "Seven systems. One operating core."
6. **Featured Systems (003, duplicated number).** "A portfolio of systems, not screenshots." Hephaestus appears as a full-width hero `ProjectCard`, followed by a 2×3 bento of the other six featured projects, each with an animated abstract SVG scene.
7. **Capabilities (004).** Eight capability tiles with hand-drawn icons, under a gradient headline.
8. **Archive (005).** CutPilot, CareerMatch, and ConcallIQ as table-like rows.
9. **Team (006).** A colour-graded Y Combinator Startup School India photo of Sahil and Tayyab, plus three member cards linking to LinkedIn. Only Sahil and Tayyab have email chips.
10. **Contact (007).** The headline is "Looking for a team that builds the future before they write the brief?" It shows two email links (Sahil, Tayyab), a "Start a conversation" button that mails `sahiltanna@1horizon-ai.com`, a "View on GitHub" button that goes to **Tayyab's personal profile** (`github.com/tayyab415`), and a recognition strip.
11. **Footer.** A single line.

---

## 4. What It Is Now Locally (Every Unshipped Change)

All of these changes are uncommitted. `git status` shows 11 modified files and 5 untracked files.

### New files

- **`src/components/HephaestusScene.tsx`** replaces the Hephaestus hero card in `Systems.tsx`. It is a pinned scroll scene, 260vh tall on mobile and 340vh on desktop, built from pure SVG and projection maths with no WebGL. As you scroll, it runs three stages:
  1. A 2D floor plan draws itself with dimension ticks and door arcs ("A 2D floor plan enters the system").
  2. The plan tilts into perspective while a mint scanning beam sweeps across it ("Gemini reads the space").
  3. Walls extrude into a wireframe interior, rooms glow, and a camera dot orbits ("Procedural 3D, rendered live").

  At the end, the scene slides left and a glass project panel slides in with the title, summary, stack chips, brand icons, and the Kaggle link. A vertical "PIPELINE" progress rail and a `01/03` stage counter show progress. With reduced motion enabled, the scene freezes in its assembled state. **Why it matters:** the strongest credential, the Google DeepMind win, now *demonstrates* what the product does instead of describing it. It is the best storytelling on the site.
- **`public/og.png`** is a 1200×630 social card showing the headline, the 1H mark, and the three wins. **Why it matters:** links shared on LinkedIn, X, Slack, or WhatsApp currently show no image.
- **`src/app/icon.svg`**, **`src/app/apple-icon.png`** (180×180), and a new **`src/app/favicon.ico`** (1.4 kB, replacing the 26 kB default) provide proper branded icons for tabs, bookmarks, and iOS home screens.
- **`DEPLOYMENT_GUIDE.md`** is the operational guide.

### Modified files

- **`layout.tsx`** adds `metadataBase`, `openGraph.images`, a `twitter` block with `summary_large_image`, and `viewport.themeColor = #04060d`. **Why:** without `metadataBase`, Next.js cannot build absolute OG URLs, and the theme colour stops mobile browser chrome from flashing white.
- **`ParticleField.tsx`**:
  - On screens wider than 900px, the focal point moves to 66% across and 40% down, so the particles sit in the open upper right instead of behind the headline.
  - The idle sphere becomes a tilted orbital ring with an inner dust disc (the "horizon" motif).
  - Particle size is capped at 2.2 and alpha at 0.8 (0.45 at idle). This is the fix for the first-frame "blob" problem.
  - The trail fade uses `destination-out`, so the canvas no longer paints an opaque dark slab over the grid.
  - Mobile gets 3,200 particles and no phrase cycling, and reduced motion gets 2,000.
  - Mouse repulsion now also works on the idle ring.
- **`Hero.tsx`** offsets the orbital rings to match the new particle focal point on `lg` and up, and adds a faint horizon glow plus a gradient line at the bottom of the hero.
- **`Footer.tsx`** adds a giant outline "1 HORIZON" wordmark with a fade mask and a rising glow.
- **`Capabilities.tsx`, `Systems.tsx`, `Team.tsx`** replace the gradient-clipped headline words with solid accent colours (plus a short gradient underline in Systems and Team). **Why:** gradient text was overused, since nearly every section headline had it, and it reads worse at small sizes.
- **`Archive.tsx`** adds a gradient accent bar on row hover and nudges the title 4px right.
- **`ProjectCard.tsx`** limits the 3D tilt to mouse pointers only, so cards no longer wobble while scrolling on touch screens.
- **`SceneGraphic.tsx`** rounds every computed SVG coordinate to two decimals. **Why:** server and client floating-point output differed in the last digit, which caused React hydration warnings.

---

## 5. Issues Found (Ranked)

Severity reflects impact on a first-time visitor or on the business, not effort. "Fixed locally" means the fix exists in the uncommitted work and ships with the next deploy.

| # | Severity | Area | Issue | Status |
|---|---|---|---|---|
| 1 | Critical | Security (repo) | The local git remote URL embeds a GitHub personal access token in plain text (`.git/config`, visible in `git remote -v`). | Open |
| 2 | High | Readability | On live, the particle sphere sits directly behind the headline and paragraph. | Fixed locally (hero rebuilt) |
| 3 | High | Visual bug | On live, particles render as huge blobs on the first frames. The boot overlay hides this only on a session's first visit. | Fixed locally (particles removed) |
| 4 | High | Social / SEO | Live has no `og:image` or `metadataBase`, so shared links show no preview image. | Fixed locally |
| 5 | High | Content accuracy | The hero says "Projects 12+", but the site lists 10 (7 featured plus 3 archive). | Fixed locally (derived from data) |
| 6 | High | Performance | The particle loop and the R3F canvas both run `requestAnimationFrame` for the whole session, even when scrolled far out of view. | Fixed locally |
| 7 | Medium | Performance / mobile | Pinned scroll is now 200vh (Constellation) plus 260–340vh (Hephaestus), roughly five to five and a half screens of pinned scrolling. | Partly fixed (Hephaestus 200vh on mobile) |
| 8 | Medium | Bug (local) | The particle ring renders flat on load, and stays flat forever on mobile. | Moot (ParticleField removed) |
| 9 | Medium | Content / contact | Nikunj has no email. "Start a conversation" goes to Sahil's personal inbox, and there is no general address. | Partly fixed (Nikunj added; no general inbox yet) |
| 10 | Medium | Content | "View on GitHub" points to Tayyab's personal profile, not a 1 Horizon org. | Open |
| 11 | Medium | SEO | No `robots.txt`, `sitemap.xml`, or structured data, and one page carries all content. | Fixed locally (robots, sitemap, JSON-LD) |
| 12 | Medium | Accessibility | Small mono labels at `text-white/25`–`/40` fall well below WCAG AA contrast. | Open |
| 13 | Medium | Accessibility | The Hephaestus panel links stay in the tab order while invisible. | Fixed locally |
| 14 | Low | Boot sequence | The overlay mounts only after hydration, so first-time visitors see a flash of the hero first. | Fixed locally (boot overlay removed) |
| 15 | Low | Hydration | `HephaestusScene` computes different initial SVG paths on server and client for reduced-motion users. | Open (new locally) |
| 16 | Low | Content | Section number "003" is used twice (Constellation and Featured Systems). | Fixed locally |
| 17 | Low | Content | The Contact strip says "$400K pool", while the Recognition card says "$400K+ prize pool". | Fixed locally |
| 18 | Low | Content | The team photo alt text names only Sahil and Tayyab, so Nikunj is not pictured anywhere. | Open |
| 19 | Low | Links | ECHO and ConcallIQ have no links. Four "Live Demo" links point to Cloud Run services in a different GCP project (`…1027824348124…`), which can cold-start or disappear. | Open |
| 20 | Low | Hygiene | `public/` still holds Create Next App boilerplate (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). | Fixed locally |
| 21 | Low | Docs | `README.md` still describes the centred sphere, the 2,500 reduced-motion count, the Hephaestus hero card, and the minimal footer. | Fixed locally |

### Detail on the issues that need explanation

**1. Token in the git remote.** Running `git remote -v` prints a `github_pat_…` token inside the URL. Anyone who sees this terminal, a screen share, or a copy of `.git/config` can push to the repo. Revoke the token on GitHub (Settings → Developer settings → Personal access tokens), then reset the remote to a clean URL: `git remote set-url origin https://github.com/coldboxer007/one-horizon.git`. After that, authenticate with `gh auth login` or the macOS keychain helper. This review does not reproduce the token.

**3. Why the blobs happen.** In the live code, particle size and alpha scale with speed and depth without any cap: `size = (0.4 + spd * 0.12) * scale`. At startup, particles spawn randomly across a z-range down to 100px from the camera and accelerate hard toward the sphere, so for the first second many are drawn several times their normal size. The local caps (`size ≤ 2.2`, `alpha ≤ 0.8`) remove this.

**5. Project count.** The data defines 7 featured and 3 archive projects, 10 in total. "Hackathons 8" checks out: HawkEye, Hephaestus, Director's Cut, Momnitrix, HireOn, Gemmatron, CutPilot, and CareerMatch each come from a distinct hackathon, while ECHO is a capstone and ConcallIQ is coursework research. "Seven systems" in the Constellation is also accurate, because it shows only the featured seven. The fix is to change `"12+"` to `"10"` in `src/components/Hero.tsx` (`BottomChrome`), or better, derive it from `featuredProjects.length + archiveProjects.length` so it never drifts again.

**6 and 7. Performance.** Neither `ParticleField` nor the R3F `<Canvas>` pauses when off-screen. Browsers pause `requestAnimationFrame` in background tabs, but not for elements scrolled out of view. So while a visitor reads the Team section, the browser is still simulating thousands of particles and rendering a WebGL scene, and on laptops and phones that costs battery and makes scrolling janky. The `HephaestusScene` itself is cheap (SVG only), but it adds 2.6 to 3.4 screens of pinned scrolling on top of the Constellation's 2. On a phone, that is a long stretch of scrolling with no new information. Recommended fixes, in order:
- Gate the particle loop on an `IntersectionObserver` for the hero, so it stops calling `requestAnimationFrame` when the hero is not visible.
- Pass `frameloop="demand"` to the R3F canvas, or toggle it between `"always"` and `"never"` with an `IntersectionObserver`.
- Cut `HephaestusScene` to about `h-[180vh]` on mobile.
- On mobile, consider replacing the Constellation with a static image or dropping it entirely.

**8. Flat ring (local bug).** In `ParticleField.tsx`, `resize()` calls `initSphereTargets()` before `initParticles()` has filled the `phase[]` array. The new torus uses `phase[i]` for its tube angle, so on first build every particle has phase 0 and the ring is flat. On desktop, the ring is rebuilt correctly after the first phrase cycle. On mobile, phrase cycling is disabled, so the ring never gets its thickness. The fix is to call `initParticles()` first, or to split phase and hue initialisation out of it and run that before `resize()`. Note that `initParticles` needs `W` and `H`, so it cannot simply be moved above `resize()` unchanged.

**12. Contrast.** Many labels use 10.5–11px mono text at 25–45% white on `#04060d`, which works out to roughly 2:1 to 4:1 contrast against an AA target of 4.5:1. Raising the floor to `text-white/55` for anything a reader should actually read fixes most of it. Decorative chrome such as coordinates can stay faint if it is marked `aria-hidden`.

**13. Hephaestus panel focus.** The panel is `opacity: 0` with `pointer-events: none` until the last 20% of the scroll, but its `<a>` links can still be reached with Tab, so keyboard users land on invisible links. Fix this with `inert` or `tabIndex={-1}` while `panelO < 0.5`, or by rendering the links only once the panel is visible. Also, the `aria-label` sits on a plain `<div>`, where screen readers ignore it. Use `role="region"` or a `<section>`.

**Other accessibility notes.**
- The custom cursor hides the native cursor on every interactive element, which can disorient some users. It already skips touch devices.
- The recognition cards' accessible names start with "◆ 00 1 · Win …", which screen readers announce literally. Add an `aria-label` such as "Hephaestus, Winner, Google DeepMind Nano Banana Hackathon".
- The Manifesto's 1.5-second hard reveal fallback (see HANDOFF gotchas) guarantees the text is visible, but it means the reveal animation often plays before the user scrolls to it.

**Mobile.** I could not take device screenshots in this pass because the browser screenshot tool timed out twice. From the code, the risks to check on a real phone are:
- The Hephaestus project panel (`w-[calc(100%-2rem)]`, vertically centred) sits directly on top of the floor-plan SVG.
- The captions sit at the bottom of the same 100svh frame, so the panel, the SVG, and the captions may collide on short screens.
- The footer wordmark's `whitespace-nowrap` at `clamp(3.4rem, 12.5vw, 11.5rem)` should fit, but is worth checking at 320px.

---

## 6. Where to Add the Pending Image and Email

All content lives in `src/lib/projects.ts` except the team photo, which is referenced in `src/components/Team.tsx`. Every case below needs only a data edit, plus a small render edit where a field does not exist yet.

### Case A: a new or updated team photo (most likely)

> **Update:** the banner is now a slideshow. To add or swap a photo, add an entry to the `slides` array in `src/components/Team.tsx` (`whole: true` for portrait photos) instead of editing the `<Image>` below.

Put the file in `public/`. Use a JPG of at least 2400px on the long edge, since the banner is roughly 21:9 and `next/image` handles WebP/AVIF conversion. Then update `TeamBanner` in `src/components/Team.tsx`:

```tsx
<Image
  src="/team-2026.jpg"
  alt="Sahil Tanna, Tayyab Khan and Kumar Nikunj Sinha"
  fill
  sizes="(min-width: 1024px) 1340px, 100vw"
  className="object-cover object-[center_45%]"
  style={{ filter: "contrast(1.08) brightness(1.0) saturate(0.7)" }}
/>
```

Update the alt text to name everyone who is pictured. If the new photo is brighter or warmer, retune the `filter` and the azure `color`-blend layer opacity just below it. Also fix the stale code comment above `<TeamBanner />` that mentions Y Combinator, if it no longer applies.

### Case B: individual headshots on the member cards

This field does not exist yet. Add it to the type and data in `src/lib/projects.ts`:

```ts
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  email?: string;
  photo?: string; // path under /public, e.g. "/team/nikunj.jpg"
};

// in team[]
{
  name: "Kumar Nikunj Sinha",
  // ...
  photo: "/team/nikunj.jpg",
},
```

Then render it in the member card in `src/components/Team.tsx`, above the `<h3>`:

```tsx
{m.photo && (
  <Image
    src={m.photo}
    alt={m.name}
    width={56}
    height={56}
    className="mb-4 size-14 rounded-full object-cover ring-1 ring-white/15"
  />
)}
```

### Case C: a real image for a project

This field does not exist yet either. Add an optional field to `Project` in `src/lib/projects.ts`, put the file at `public/work/<slug>.jpg`, and fill it in on the project:

```ts
export type Project = {
  // ...existing fields
  image?: { src: string; alt: string };
};

// e.g. in the hawkeye entry
image: { src: "/work/hawkeye.jpg", alt: "HawkEye 3D flood map over Jakarta" },
```

In `src/components/ProjectCard.tsx` (`StandardLayout`, and the hero layout around line 170), show the image when present and fall back to the SVG scene otherwise:

```tsx
<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
  {project.image ? (
    <Image
      src={project.image.src}
      alt=""
      fill
      sizes="(min-width: 768px) 33vw, 100vw"
      className="object-cover opacity-40 mix-blend-screen"
    />
  ) : (
    <SceneGraphic type={project.sceneType} accent={accent} />
  )}
</div>
```

`alt=""` is correct here, because the card text already describes the project and the image is decorative behind it. If the image is for Hephaestus, it belongs in the final panel of `HephaestusScene.tsx` instead, since that project no longer uses `ProjectCard`.

### Case D: Nikunj's email

In `src/lib/projects.ts`, add the `email` field to his `team[]` entry. The Team card shows the email chip automatically when the field is present.

```ts
{
  name: "Kumar Nikunj Sinha",
  role: "Research · Clinical reasoning · Data science",
  bio: "…",
  linkedin: "https://www.linkedin.com/in/kumar-nikunj-sinha-kns/",
  email: "nikunj@1horizon-ai.com", // confirm the real address
},
```

To list him in the Contact section as well, add `nikunj` to `contact.team` and add a third link in `src/components/Contact.tsx` next to the Sahil and Tayyab links, copying their markup with `bg-[color:var(--color-accent)]` for the dot.

### Case E: a general contact address (for example, hello@)

Change one field in `src/lib/projects.ts`:

```ts
export const contact = {
  email: "hello@1horizon-ai.com", // drives the "Start a conversation" button
  team: {
    sahil: "sahiltanna@1horizon-ai.com",
    tayyab: "tayyab@1horizon-ai.com",
  },
};
```

Make sure the mailbox, alias, or Google Group exists and is monitored **before** deploying, or enquiries will bounce. Consider also adding a subject line: `` href={`mailto:${contact.email}?subject=Project%20enquiry`} ``.

After any of these edits, run `npm run build`, then `bash deploy.sh` (see [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) §5).

---

## 7. Revamp Ideas

The site is visually strong and technically ambitious. Its weakness is that it optimises for atmosphere over evidence and over a clear next step. A recruiter or client who lands here learns that the team is talented, but cannot see a real product, read how something was built, or know what to ask for. The ideas below are grouped by effort, and each one includes a recommendation.

### Quick wins (under a day each)

- **Ship the local work.** *Do now.* It fixes three of the top four live issues. See HANDOFF for the exact commands.
- **Fix the content numbers and links.** *Do now.* Change "12+" to 10 (or derive it from data), make the "$400K+" wording consistent, renumber the sections, and point "View on GitHub" at an org or remove it.
- **Add the image and email.** *Do now.* See §6.
- **Add `robots.txt`, `sitemap.xml`, and structured data.** *Do.* Next's `src/app/robots.ts` and `src/app/sitemap.ts` are a few lines each, and Organization JSON-LD can go in `layout.tsx`. It is cheap and helps both search engines and AI crawlers.
- **Pause off-screen animation.** *Do.* An `IntersectionObserver` around `ParticleField` plus toggling the R3F `frameloop` is the single best performance fix.
- **Add privacy-friendly analytics.** *Do.* Plausible or Umami work without a cookie banner. Without data, every revamp decision below is a guess.
- **Make the offer explicit.** *Do.* Add one line under the hero CTAs or in Contact that says what you want, such as "Available for AI product builds, prototypes, and hackathon partnerships" or "Open to roles from mid-2026". The current Contact copy addresses "recruiters, collaborators, clients, and founders" all at once, which reads as addressed to no one in particular.

### Medium (a few days each)

- **Real screenshots or short muted video loops per project.** *Strongly recommended.* The line "systems, not screenshots" is clever, but visitors trust what they can see. Use Case C in §6, and add 6–10 second MP4/WebM loops for HawkEye, Director's Cut, and HireOn. Keep the abstract SVG scenes as the fallback.
- **Contact form.** *Recommended, once the audience is decided.* A Next.js route handler that sends mail through Resend or the Gmail API, with a honeypot field, converts better than `mailto:`, which does nothing for people without a desktop mail client. Keep the email links as well.
- **News / wins section.** *Recommended.* Wins currently live in three places (Recognition, the Contact strip, and the OG image). A short dated list ("Oct 2026 — …") shows momentum and gives the site a reason to change. Drive it from a `news[]` array in `projects.ts`.
- **Lighter mobile experience.** *Recommended.* On small screens, swap the Constellation for a static poster image, shorten `HephaestusScene`, and reduce particles further. Visitors arriving from LinkedIn are mostly on phones and are likely the largest audience.
- **Accessibility pass.** *Recommended.* Raise the contrast floor, fix the Hephaestus panel's focus handling, relabel the recognition cards, and add a "reduce motion" toggle in the nav for people who have not set the OS preference.

### Big swings (a week or more)

- **Case-study pages at `/work/[slug]`.** *The highest-value big swing.* Each project already has `summary`, `architecture`, `impact`, `stack`, and `links` in the data, which is enough to generate static pages with `generateStaticParams`. Add a problem statement, screenshots or video, a diagram, and a "what we'd do next" section. This gives search engines ten indexable pages instead of one, gives every card a real destination, and lets you share a single project with its own OG image (generated with `opengraph-image.tsx`). `HephaestusScene` makes a natural opener for `/work/hephaestus`.
- **Reposition the narrative around one audience.** *Decide before building anything big.* The site is currently half studio, half team portfolio. If the goal is client work, lead with outcomes and a "work with us" process. If the goal is jobs or funding, lead with the people and the wins. That choice changes the hero copy, the CTAs, and the section order, so it needs an owner (see HANDOFF).
- **Interactive demo embed.** *Maybe.* A small live demo, such as uploading a floor plan to Hephaestus, would be the most memorable thing on the site. It needs a backend, API spend, and abuse protection, so only do it after the case-study pages exist.
- **Lighter-weight hero.** *Maybe.* A pre-rendered video loop or a single WebGL shader could look as good as the 7,000-particle canvas at a fraction of the CPU cost. Only worth doing if analytics show slow-device visitors bouncing.

**Overall recommendation, in order:**
1. Ship the local work and the quick-win fixes this week.
2. Add analytics and real project media.
3. Decide on the primary audience.
4. Build `/work/[slug]` case studies around that decision.

The case-study pages are the change most likely to turn visitors into conversations.
