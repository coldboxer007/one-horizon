# 1 Horizon Website Review (October 2026)

Compares three versions of the site and lists what to fix, what to add, and what to revamp.

## 1. The three versions

| Version | Where | State |
|---|---|---|
| **Live** | [1horizon-ai.com](https://1horizon-ai.com) | Same code as GitHub. Last deployed in April 2026, after Tayyab's email change. |
| **GitHub** | [coldboxer007/one-horizon](https://github.com/coldboxer007/one-horizon) | 4 commits, last one in June 2026 (full site + README). |
| **Local folder** | `OH Website/one-horizon` | GitHub plus a batch of unshipped work from July 2026. It builds without errors. |

The live site and GitHub are the same. **The newest work exists only on this laptop.** It hasn't been committed, pushed, or deployed. If the laptop is lost, that work is gone.

### Unshipped local work (July 2026)

| Change | Files | Why it matters |
|---|---|---|
| Hero particles redesigned as a tilted orbital ring (a "horizon") placed in the upper right, instead of a sphere behind the headline. Fewer particles on phones. | `ParticleField.tsx`, `Hero.tsx` | Fixes the biggest visual problem on the live site (see section 2). |
| New pinned scroll scene for Hephaestus: a floor plan draws itself, tilts, and extrudes into 3D. Pure SVG. | `HephaestusScene.tsx` (new, 475 lines), `Systems.tsx` | Showcases the strongest win much better than a card. |
| Large outlined "1 HORIZON" wordmark in the footer, with a horizon glow | `Footer.tsx` | A stronger ending to the page. |
| Social preview image, favicon, Apple icon, theme color, Twitter card | `public/og.png`, `src/app/icon.svg`, `apple-icon.png`, `favicon.ico`, `layout.tsx` | The live site has **no preview image**, so links shared on WhatsApp, LinkedIn, or X show up blank. It still uses the default Next.js favicon. |
| Headline accents changed from gradient text to solid colors with underlines. Hover accent bar on archive rows. | `Capabilities.tsx`, `Systems.tsx`, `Team.tsx`, `Archive.tsx`, `ProjectCard.tsx`, `SceneGraphic.tsx` | Cleaner and easier to read. |
| `DEPLOYMENT_GUIDE.md` | new | Handover document for collaborators. |

**Recommendation:** commit and push this work first, then deploy. It's a strict improvement and it builds.

## 2. Problems on the live site

Ordered by impact.

1. **The hero is hard to read.** The particle sphere sits directly behind the headline and the paragraph. On first load, the particles render as large blobs that cover the text completely for a moment. The local ring version fixes this.
2. **Shared links show no preview image**, and the favicon is the default Next.js icon. Fixed locally.
3. **Statuses are out of date.** The site was written in March–April 2026:
   - HawkEye, HireOn, and CutPilot still say "Submitted".
   - Momnitrix says "Submitted · Judging". MedGemma results should be out by now.
   - ECHO says "Capstone · In Progress (2025–2026)".
   - Update these to the real results, or remove the status line.
4. **The hero stats don't match the content.** "Projects 12+" is shown, but only 10 projects are listed.
5. **The main nav button "Enter the portfolio" goes to Contact**, not the portfolio. Either rename it to "Contact", or point it to `#systems`.
6. **Kumar Nikunj Sinha has no email.** Sahil and Tayyab have email buttons on their cards and in the Contact section. Nikunj only has LinkedIn.
7. **"View on GitHub" in Contact links to Tayyab's personal GitHub** (`github.com/tayyab415`), not a company profile.
8. **There are no project pages.** Everything is on one page, so Google can't index Hephaestus, HawkEye, and the others individually.
9. **There's no way to contact you without leaving the site.** There's no form or booking link, only `mailto:` links, which do nothing for visitors without a mail app set up.
10. **There are no analytics.** You can't tell who visits or what they click.

## 3. The small additions: an image and an email

Both are quick once I have the details.

| Addition | Where it goes | What I need from you |
|---|---|---|
| **Email** | Add an `email` field to the team member in `src/lib/projects.ts`, and optionally add it to `contact.team` so it also appears in the Contact section. | Whose email it is and the exact address. Nikunj is the only member without one, so I assume it's his. |
| **Image** | Depends on the image: <br>• a new team or event photo goes in `public/` and replaces or joins the Team banner in `Team.tsx` (it may need the same blue color grading); <br>• a project screenshot goes into that project's card; <br>• a headshot needs a new slot on each team card. | The image file, and where it should go. |

## 4. Revamp ideas

Ordered by value for the effort.

### A. Repositioning (the biggest change)
Right now the site reads as a **hackathon trophy case**. If 1 Horizon is now a company that wants clients or funding, the story should be about what you do for people, not what you won:
- A hero that states the offer, for example "We build production AI systems: agents, voice, vision, robotics". Keep "think, see, speak, act" as the supporting line.
- A **"What we build for you" / services** section with 3–4 offers, each with an example project.
- Recognitions stay, as proof that supports the offer rather than the headline.

### B. Show real work
The tagline is "systems, not screenshots", but visitors still want to *see* the products. Add:
- A short muted looping video or real screenshot for each featured project (HawkEye's 3D map, Hephaestus walkthroughs, Director's Cut output).
- **Live demo** buttons more prominently on the cards. Several projects already have live Cloud Run demos.

### C. Individual project pages
Pages like `/work/hephaestus` and `/work/hawkeye` with the problem, architecture, results, media, and team. This is good for SEO, makes each project easy to share, and gives recruiters or clients depth. The data in `projects.ts` already covers about 80% of what these pages need.

### D. Lead capture and trust
- A contact form or booking link (Cal.com or Google Calendar) instead of `mailto:` only.
- Testimonials or quotes from judges, mentors, YC Startup School, or collaborators, if you have any.
- A "Latest" or news strip so the site never looks frozen in time again.

### E. Housekeeping
- Analytics (Google Analytics or Plausible), `sitemap.xml`, and `robots.txt`.
- Keep stats and statuses in `projects.ts` and calculate them from the data, so counts like "12+" can't drift.
- Replace `apple-icon.png` and the Open Graph image whenever the branding changes.

## 5. Suggested order of work

1. Commit, push, and deploy the unshipped local work. This fixes the hero, the preview image, and the favicon.
2. Add the email and the image.
3. Quick fixes: statuses, the "12+" stat, the nav button target, the GitHub link.
4. Start the revamp: repositioning, then real media, then project pages, then the contact form.

Deploying needs no DNS changes. `bash deploy.sh` updates the same Cloud Run service behind `1horizon-ai.com`.
