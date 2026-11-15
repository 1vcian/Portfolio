# Lucian Medrihan · Portfolio

![Stack](https://img.shields.io/badge/Next.js%20%C2%B7%20React%20%C2%B7%20TypeScript%20%C2%B7%20three.js-0b192f)
![Résumé](https://img.shields.io/badge/r%C3%A9sum%C3%A9-compiled%20from%20LaTeX-ffb200)

My personal site: a single page that comes down from orbit to the ground as you scroll.

### [1vcian.me](https://1vcian.me)

## What it does

- **A scroll-driven three.js scene.** A dotted Earth seen from orbit closes in on Italy, lands as a map of
  fields, swings overhead for the projects, tips towards the horizon for the résumé and lifts off again at the end.
  The planet can be grabbed and spun with the mouse, and a click sends a ripple through the dots.
- **Every project has its own little animation**, tied to how far it has scrolled: radio waves and a typing
  terminal, flipping tiles, a rising moon, a scanner line, a glass that fills up. The backdrop takes each
  project's colour as it passes.
- **Projects you can step through.** Scrolling glides to rest on each project, and a small pager shows where
  you are and hops to the next one.
- **Comic-book styling.** Paper panels with ink outlines, rubber stamps for status, handwritten notes, stickers.
- **Content lives in data files.** Projects, experience and links are plain objects in `data/` and `lib/site.ts`:
  adding a project never touches a component.
- **The résumé builds itself.** The CV is LaTeX in `resume/`. Every push to `main` compiles it to PDF with
  GitHub Actions and publishes it with the site.
- **Works without the fancy parts.** No WebGL, no JavaScript or reduced motion: the page is still readable.

## 📄 Résumé template

The layout of my CV is free to use. It is a single `.tex` file with placeholder content, no custom class.

- [Open it in Overleaf](https://www.overleaf.com/docs?snip_uri=https%3A%2F%2F1vcian.me%2FPortfolio%2Fresume-template.tex)
- [Download the .tex](https://1vcian.me/Portfolio/resume-template.tex) · [Preview the PDF](https://1vcian.me/Portfolio/resume-template.pdf)
- Source and notes: [`resume/`](./resume)

## Run it locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/1vcian/Portfolio.git
cd Portfolio
npm install
npm run dev        # http://localhost:3000/Portfolio
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server. |
| `npm run build` | Static export into `out/`. |
| `npm run typecheck` | TypeScript check. |
| `npm run resume` | Compiles the résumé PDFs locally (needs LaTeX, see [`resume/`](./resume)). |
| `npm run landmask` | Regenerates the land masks the globe is drawn from. |

Do not run `npm run build` while `npm run dev` is running: they share the `.next` folder and the dev server
starts returning 404s until it is restarted.

## Editing the content

| To change | Edit |
| --- | --- |
| Projects | `data/projects.ts` (`featured` for the big rows, `more` for the cards); images go in `public/projects/`. Each featured project also picks a `tint` (backdrop colour) and an `fx` (its themed animation, defined in `components/sections/Projects.tsx`) |
| About, numbers, stack, jobs | `data/profile.ts` |
| Name, email, socials, résumé links | `lib/site.ts` |
| The CV itself | `resume/resume_eng.tex`, `resume/resume_it.tex` |
| The 3D scroll choreography | `components/scene/states.ts` |
| Scroll-linked motion of page elements | add `data-scrolly` to an element and use `var(--p)` in its CSS (`lib/scrolly.ts`) |
| How the page comes to rest on a project | `lib/snap.ts` |

In the copy, `**double asterisks**` highlight a phrase, `[text](url)` makes a link and `` `backticks` `` mark code.
Figures such as GitHub stars, versions and test counts are written by hand in `data/projects.ts` and in the CV:
update them when they change.

## Structure

```
components/
  scene/        the three.js backdrop: engine, shaders, keyframes, pinned labels
  sections/     Hero, About, Experience, Projects, Resume, Contact
  ui/           shared pieces: reveal on scroll, project pager, tape, icons, inline formatting
data/           projects and profile copy
lib/            site constants, scroll helpers, land masks for the globe
pages/          Next.js pages (static export)
public/         images, icons and the published résumé files
resume/         LaTeX sources of the CV and of the template
scripts/        résumé build, land mask generator
styles/         global CSS
```

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: it compiles the LaTeX, builds the site and publishes
`out/` to the `gh-pages` branch, which GitHub Pages serves at `1vcian.me/Portfolio`.

The PDFs committed in `public/` are only a fallback for local development; the deployed ones always come from the
`.tex` files.

Built by Lucian Medrihan.
