# 1 Horizon — Handoff

> For whoever picks this up next, person or AI agent. Last updated 26 October 2026 (after the redesign).

## Current state

The portfolio site for 1 Horizon is a single-page Next.js 15 app. It runs live at [1horizon-ai.com](https://1horizon-ai.com) on Google Cloud Run (project `onehorizon-494120`, service `one-horizon`, region `us-central1`), and the live version is exactly GitHub commit `424d238` on `main`. This machine holds a batch of **uncommitted and undeployed** work. It includes the social preview image and icons, a pinned Hephaestus scroll scene, and a redesign:
- an "orbital sunrise" WebGL hero (`HorizonField.tsx`), which replaces the particle canvas and the boot overlay
- "multiverse" hover on the project cards
- a footer where the sun and wordmark rise over a planet's edge

It also has most of the review's code fixes (see `SITE_REVIEW.md` §0). It builds cleanly (`next build`, 196 kB first-load JS on `/`). The next steps are to ship it, then add the team photo and a general inbox, and decide on the site's direction.

## Where everything lives

| What | Where |
|---|---|
| Code | [github.com/coldboxer007/one-horizon](https://github.com/coldboxer007/one-horizon), branch `main` |
| All content (projects, team, contact, wins, capabilities) | `src/lib/projects.ts` |
| Page composition (section order) | `src/app/page.tsx` |
| SEO metadata, OG image, icons | `src/app/layout.tsx`, `public/og.png`, `src/app/icon.svg`, `src/app/apple-icon.png` |
| Architecture and design deep dive | [`README.md`](./README.md) |
| How to run, edit, deploy, roll back, and set up DNS | [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) |
| Then-vs-now review, ranked issues, where the image and email go, revamp ideas | [`SITE_REVIEW.md`](./SITE_REVIEW.md) |
| Portable UI techniques used across these sites | [`../BUILD_TECHNIQUES.md`](../BUILD_TECHNIQUES.md) |
| Deploy script | `deploy.sh` (wraps `gcloud run deploy --source .`) |

`README.md` is partly out of date for the local changes. It still describes the centred particle sphere, the Hephaestus hero card, and the minimal footer, so update it in the same commit or the one after.

## Warning: uncommitted work

`git status` shows many modified, deleted and untracked files. New files include `HephaestusScene.tsx`, `HorizonField.tsx`, `robots.ts`, `sitemap.ts`, `og.png`, the icons and `DEPLOYMENT_GUIDE.md`. `ParticleField.tsx`, `BootSequence.tsx` and the `public/` boilerplate were deleted. None of it is on GitHub or live. If this folder is lost, the work is lost. `SITE_REVIEW.md` §0 and §4 describe every change.

**First, remove the token from the git remote.** The local remote URL currently embeds a GitHub personal access token in plain text. Revoke that token on GitHub (Settings → Developer settings → Personal access tokens), then run:

```bash
cd "/Users/sahiltanna/OH Website/one-horizon"
git remote set-url origin https://github.com/coldboxer007/one-horizon.git
gh auth login          # or rely on the macOS keychain credential helper
git remote -v          # confirm no token is shown
```

**Then commit, push, and deploy:**

```bash
cd "/Users/sahiltanna/OH Website/one-horizon"
npm run build                      # must pass; if it stalls, delete .next and retry
git add -A
git status                         # review: no .env files, nothing unexpected
git commit -m "Orbital sunrise redesign, Hephaestus scroll scene, OG/SEO metadata, review fixes, docs"
git push origin main
bash deploy.sh                     # ~3–5 min via Cloud Build; does not touch DNS
```

**Verify the deploy:**

```bash
curl -s https://1horizon-ai.com | grep -o 'og:image"[^>]*'      # should show /og.png
curl -s -o /dev/null -w "%{http_code}\n" https://1horizon-ai.com/og.png   # 200
```

Then paste the URL into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to refresh LinkedIn's cached preview. To roll back, follow `DEPLOYMENT_GUIDE.md` §5.

## Open to-do list (priority order)

1. **Revoke the leaked token and clean the remote** (above). Owner: Sahil.
2. **Commit, push, and deploy the local work** (above).
3. **Add the pending team photo and a general inbox.** The exact files, fields, and snippets are in `SITE_REVIEW.md` §6. Nikunj's email is already done (`nikunjsinha@1horizon-ai.com`). Create any new mailbox before shipping its address.
4. **Decide where "View on GitHub" should point.** It currently goes to Tayyab's personal profile.
5. **Raise the contrast on small labels**, which are below AA (review issue 12).
6. **Check on a real phone.** Check the hero sunrise (the sun sits just under the nav), the Hephaestus panel overlapping the scene and captions, and the footer at 320px. Also check shader frame rate on an older Android device.
7. **Make the revamp decisions, each of which needs an owner.** See `SITE_REVIEW.md` §7.
    - Who is the primary audience: clients, recruiters, or funders?
    - Should we build `/work/[slug]` case-study pages?
    - Should we use real project screenshots or video?
    - Should we add a contact form, analytics, or a news/wins section?

Done locally since the review (26 Oct 2026):
- Content fixes: project count, "$400K+", section numbers, Nikunj's email.
- Off-screen pausing.
- Robots, sitemap and JSON-LD.
- Hephaestus focus fix and recognition labels.
- The redesign above.

## Access needed

Never commit tokens, keys, or passwords to this repo or to these docs.

| Access | Who grants it | Needed for |
|---|---|---|
| GitHub collaborator (write) on `coldboxer007/one-horizon` | Repo owner (coldboxer007) | Pushing code |
| GCP project `onehorizon-494120`: `roles/run.admin`, `roles/cloudbuild.builds.editor`, `roles/artifactregistry.writer`, `roles/iam.serviceAccountUser` | A project Owner | Running `deploy.sh`. Source deploys may also need `roles/run.sourceDeveloper` and `roles/serviceusage.serviceUsageConsumer` |
| `gcloud` CLI, authenticated with `gcloud auth login` | Self | Deploying |
| Squarespace account with DNS access for `1horizon-ai.com` | Domain owner | DNS changes only, not routine deploys |
| Google Search Console owner of the domain | Domain owner | Creating new domain mappings only |
| Google Workspace admin (or whoever manages `@1horizon-ai.com` mail) | Workspace admin | Creating hello@ or Nikunj's mailbox |

## Gotchas

- **Squarespace defaults must stay deleted.** The "Squarespace Defaults" DNS block silently overrides the custom Cloud Run A/AAAA records with Squarespace's parking IPs. The apex uses four A and four AAAA records pointing to Cloud Run, and `www` is a CNAME to `ghs.googlehosted.com.`.
- **`deploy.sh` does not touch DNS or the domain mapping.** It replaces the container behind the existing service, and the domain keeps working. Use a different `SERVICE` name only if you intend to create a separate service.
- **The hero shader's composition is two constants.** `layoutFor()` in `HorizonField.tsx` places the planet and sun for wide (aspect ≥ 1.1) and narrow screens, in shader units where y runs from -1 to 1. If you change the hero copy length, check that the sun is still clear of the headline at 1440×900 and 375×812.
- **Scroll-driven CSS needs a fallback.** The footer sunrise and the dawn layer use `animation-timeline` inside `@supports`. Firefox shows the static, risen state. Keep the base styles as the final state.
- **Lenis and IntersectionObserver.** Lenis smooth scroll can make Framer Motion's `useInView` miss. The Manifesto headline therefore uses three triggers (`useInView`, a manual scroll/rect check, and a 1.5-second hard fallback), so it can never stay invisible. Keep that pattern for any new above-the-fold reveal. To scroll programmatically in testing, use `window.scrollTo`.
- **React Three Fiber must be client-only.** `Constellation.tsx` is loaded only through `ConstellationMount.tsx` using `next/dynamic` with `ssr: false`. Importing `Constellation` directly into a server component breaks the build or hydration.
- **The project uses Tailwind v3, not v4.** The config is `tailwind.config.ts`, with PostCSS. Do not follow v4 docs (`@import "tailwindcss"`, `@theme`). Note that one project *description* mentions "Tailwind 4", but that refers to CutPilot, not this site.
- **Use Node 20.** The Docker image uses Node 20. This machine currently runs Node 22, and the build passes on it, but match 20 if anything behaves differently between local and Cloud Build (`nvm use 20`).
- **A stuck build usually means a bad cache.** The first `npm run build` on 26 October stalled after a webpack cache rename error. Deleting `.next` and rebuilding fixed it.
- **The SVG hydration rule.** Any coordinate computed with `Math.sin` or `Math.cos` in an SVG must be rounded (see `r2()` in `SceneGraphic.tsx` and `HephaestusScene.tsx`), or React reports hydration mismatches.
- **Browser screenshots in `next dev` can show an empty hero** for the first few seconds while the dev bundle compiles. Check visuals on `next build && next start`.

## Contacts

- Sahil Tanna: sahiltanna@1horizon-ai.com
- Tayyab Khan: tayyab@1horizon-ai.com
