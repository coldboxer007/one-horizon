# 1 Horizon — Developer & Deployment Guide

> For anyone with access to the `onehorizon-494120` Google Cloud project who needs to **update this site**, or wants to **fork it to build something similar**.
>
> This doc is operational — it tells you how to run, change, and ship things. For a full breakdown of the architecture, animations, and design system, see [`README.md`](./README.md) in this repo.

---

## 1. What This Site Is, In One Paragraph

`one-horizon` is a Next.js 15 (App Router) single-page site, styled with Tailwind CSS, animated with Framer Motion, with a Three.js/React Three Fiber 3D scene and a hand-written Canvas particle engine. It's a static-content marketing/portfolio site — there is **no database, no CMS, no auth, no backend API**. All content (projects, team, recognitions) lives in one TypeScript file: `src/lib/projects.ts`. It's packaged into a Docker container and deployed to **Google Cloud Run**, mapped to the custom domain `1horizon-ai.com` via DNS records at Squarespace.

---

## 2. Access You Need

| What | Where | Notes |
|---|---|---|
| Source code | [github.com/coldboxer007/one-horizon](https://github.com/coldboxer007/one-horizon) | Ask to be added as a collaborator, or fork it |
| Google Cloud project | `onehorizon-494120` | Ask an existing Owner/Editor to grant you `roles/run.admin`, `roles/cloudbuild.builds.editor`, `roles/artifactregistry.writer` |
| `gcloud` CLI | Local machine | `brew install --cask google-cloud-sdk` (macOS) or see [cloud.google.com/sdk](https://cloud.google.com/sdk/docs/install) |
| Domain / DNS | Squarespace account for `1horizon-ai.com` | Only needed if you're changing the domain mapping, not for routine content updates |

Authenticate once:

```bash
gcloud auth login
gcloud config set project onehorizon-494120
```

---

## 3. Running It Locally

```bash
git clone https://github.com/coldboxer007/one-horizon.git
cd one-horizon
npm install
npm run dev
```

Open `http://localhost:3000`. Node.js 20+ recommended (matches the Docker image).

Other useful commands:

```bash
npm run build   # production build — run this before deploying to catch errors early
npm start       # serve the production build locally on :3000
npm run lint    # ESLint
```

---

## 4. How to Make Common Updates

### A. Change text, add/remove/reorder a project, edit team info, edit recognitions

**Everything is in one file: `src/lib/projects.ts`.** No other file needs to change for content-only edits.

- `featuredProjects[]` — the 7 projects shown in the "Systems" section and the 3D constellation
- `archiveProjects[]` — extra projects shown in the "Archive" section
- `team[]` — team member cards (name, role, bio, LinkedIn, email) — **order in the array is the display order**
- `recognitions[]` — the 3 award cards in the Manifesto section (`medal` field controls which animated medallion renders: `"trophy" | "bronze" | "honorable"`)
- `capabilities[]` — the 8 tiles in "Engineering Depth"

Example — adding a new project to the featured list:

```typescript
export const featuredProjects: Project[] = [
  // ...existing projects...
  {
    slug: "your-new-project",
    title: "Your Project",
    subtitle: "One-line description",
    tagline: "Punchy tagline",
    domain: "Category · Sub-category",
    status: "Winner", // or "Submitted", "In Progress", etc.
    achievement: "Hackathon Name · Platform",
    timeline: "Month Year",
    platform: "Tech used",
    team: ["Person A", "Person B"],
    summary: "2-3 sentence summary of what it does.",
    stack: ["Tech 1", "Tech 2"],
    architecture: ["Step 1", "Step 2"],
    impact: ["Metric or outcome 1", "Metric or outcome 2"],
    links: [{ label: "GitHub", href: "https://..." }],
    brands: ["google", "gemini"], // must exist in BrandKey type
    accent: "azure", // azure | ember | violet | mint | rose | cyan
    sceneType: "map", // controls the SVG illustration style on the card
  },
];
```

If you use a brand not already listed in `BrandKey` (in the same file), you must also add its SVG icon in `src/components/BrandIcon.tsx`.

### B. Change colors / theme

All brand colors are CSS variables in `src/app/globals.css` at the top:

```css
--bg: #04060d;         /* page background */
--accent: #6aa9ff;     /* azure */
--accent-2: #8c6bff;   /* violet */
--accent-3: #5ef0d8;   /* mint */
```

Changing these four values re-themes almost the entire site, since every gradient, glow, and highlight references them.

### C. Change a section's layout or copy

Each section of the page is its own component in `src/components/`, and they're assembled in order in `src/app/page.tsx`:

```
Hero → Manifesto → PlatformRibbon → ConstellationMount → Systems → Capabilities → Archive → Team → Contact
```

Open the matching file (e.g. `src/components/Hero.tsx`) to edit headline copy, buttons, or layout for that section.

### D. Replace the team photo

Drop a new image into `public/` and update the `src` in `src/components/Team.tsx` (`TeamBanner` function). The image is deliberately colour-graded (desaturated + blue tint via CSS filters/blend modes) to match the dark theme — you may need to retune the `filter` and blend-mode opacity values if the new photo has very different lighting.

### E. Add a new page (not just a section)

This is a single-page site today. To add a real route (e.g. `/blog`), create a new folder under `src/app/`, e.g. `src/app/blog/page.tsx` — Next.js App Router handles routing automatically based on folder structure.

---

## 5. Deploying Your Changes

### Quick path — use the existing script

```bash
cd one-horizon
bash deploy.sh
```

This runs `gcloud run deploy` with `--source .`, which:
1. Uploads your local source to Cloud Build
2. Cloud Build builds the Docker image using the repo's `Dockerfile`
3. Deploys the new image to the existing Cloud Run service `one-horizon` in `us-central1`
4. **Does not touch DNS or domain mapping** — the live domain keeps pointing at the same service, it just now serves the new container

Takes ~3–5 minutes. At the end it prints the Cloud Run service URL for a sanity check before you check the real domain.

### Manual path, if you need more control

```bash
gcloud config set project onehorizon-494120

gcloud run deploy one-horizon \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --concurrency 80 \
  --timeout 60s \
  --set-env-vars "NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1"
```

### Before you deploy, always:

```bash
npm run build
```

If this fails locally, the Cloud Build deploy will fail too — catch it early instead of waiting for the remote build.

### Rolling back

Cloud Run keeps every revision. If a deploy breaks something:

```bash
gcloud run revisions list --service one-horizon --region us-central1
gcloud run services update-traffic one-horizon \
  --region us-central1 \
  --to-revisions REVISION_NAME=100
```

---

## 6. Forking This to Build a Similar Site

If the goal is a *new, separate* site inspired by this one (not editing 1 Horizon itself):

1. **Clone, don't fork-in-place:**
   ```bash
   git clone https://github.com/coldboxer007/one-horizon.git your-new-site
   cd your-new-site
   rm -rf .git && git init
   ```
2. **Rewrite content first.** Gut `src/lib/projects.ts` and replace with your own projects/team/recognitions — this drives 80% of what's visible on the site.
3. **Re-theme via CSS variables** (see §4B) before touching component code — a different `--accent` / `--accent-2` / `--accent-3` triplet changes the whole feel with zero component edits.
4. **Swap the hero particle phrases** in `src/components/Hero.tsx` (the `phrases` prop passed to `<ParticleField>`).
5. **Replace/remove the team photo** in `src/components/Team.tsx`.
6. **Update metadata** in `src/app/layout.tsx` (`title`, `description`, Open Graph tags).
7. **New Cloud Run service:** don't reuse `SERVICE=one-horizon` — change the `SERVICE` variable in `deploy.sh` (or pass `SERVICE=your-service bash deploy.sh`) and use a separate GCP project or a distinct service name in the same project so the two sites don't collide.
8. **New domain mapping**, if applicable — see §7 below, same process with a different domain.

---

## 7. Connecting a Custom Domain (reference — only needed once per site)

1. In Google Cloud Console, verify domain ownership via [Search Console](https://search.google.com/search-console) using the GCP account that will own the mapping.
2. Create the domain mapping:
   ```bash
   gcloud beta run domain-mappings create \
     --service one-horizon \
     --domain yourdomain.com \
     --region us-central1
   ```
3. Google will return the A/AAAA records (apex) or CNAME (subdomain) you need.
4. At your DNS registrar (Squarespace, in our case):
   - Add all 4 A records + 4 AAAA records for the apex domain
   - Add a CNAME for `www` → `ghs.googlehosted.com.`
   - **Important (Squarespace-specific):** delete the "Squarespace Defaults" block in DNS settings — it silently overrides custom A records with Squarespace's own parking-page IPs if left in place.
5. DNS propagation can take anywhere from minutes to ~48 hours. Verify with:
   ```bash
   dig yourdomain.com A +short
   dig yourdomain.com AAAA +short
   dig www.yourdomain.com CNAME +short
   ```

---

## 8. Where Things Live — Quick Reference

| I want to... | Edit this |
|---|---|
| Change a project's description, add a project | `src/lib/projects.ts` |
| Change team member info / photo | `src/lib/projects.ts` (data) + `src/components/Team.tsx` (photo/layout) |
| Change site colors | `src/app/globals.css` (`:root` variables) |
| Change hero headline / particle phrases | `src/components/Hero.tsx` |
| Change nav links / logo | `src/components/Nav.tsx` |
| Change the boot/intro sequence text | `src/components/BootSequence.tsx` |
| Add a new brand/platform logo | `src/components/BrandIcon.tsx` + `BrandKey` type in `src/lib/projects.ts` |
| Change SEO title/description | `src/app/layout.tsx` |
| Change deploy target (service name/region/memory) | `deploy.sh` |
| Change Docker build steps | `Dockerfile` |

---

## 9. Getting Help / Debugging

- **Build fails locally:** run `npm run build` and read the TypeScript error — almost always a type mismatch in `projects.ts` (e.g. an `accent` value not in the allowed union).
- **Deploy fails on Cloud Build:** run `gcloud builds log <BUILD_ID>` or check the Cloud Build history in the GCP Console for the full log.
- **Site is live but showing old content:** Cloud Run should update immediately on a successful deploy — hard refresh (`Cmd+Shift+R`) or check you're hitting the right revision with `gcloud run services describe one-horizon --region us-central1`.
- **Domain not resolving:** see the DNS section above — 90% of the time it's a leftover Squarespace default record fighting with the custom ones.

---

*Questions on the existing 1 Horizon codebase specifically → sahiltanna@1horizon-ai.com*
