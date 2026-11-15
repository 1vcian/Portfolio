import type { CSSProperties } from "react";
import { Fx, Links, Media, Project, SmallProject, featured, more } from "../../data/projects";
import { asset } from "../../lib/site";
import ProjectPager from "../ui/ProjectPager";
import Reveal from "../ui/Reveal";
import Rich from "../ui/Rich";
import SectionHead from "../ui/SectionHead";
import { Apple, ArrowUpRight, Github, GooglePlay, MapPin, Satellite } from "../ui/icons";

function ProjectLinks({ links, title }: { links: Links; title: string }) {
  const items = [
    links.live && { href: links.live, label: "Visit", icon: <ArrowUpRight />, primary: true },
    links.appStore && { href: links.appStore, label: "App Store", icon: <Apple /> },
    links.playStore && { href: links.playStore, label: "Google Play", icon: <GooglePlay /> },
    links.github && { href: links.github, label: "Source", icon: <Github /> },
  ].filter(Boolean) as { href: string; label: string; icon: JSX.Element; primary?: boolean }[];
  if (!items.length) return null;
  return (
    <div className="links">
      {items.map((item) => (
        <a key={item.label} className={`chip-link ${item.primary ? "chip-link--primary" : ""}`} href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.label}: ${title}`}>
          {item.icon}
          {item.label}
        </a>
      ))}
    </div>
  );
}

/**
 * A small themed animation per project, driven by how far the project has
 * scrolled (`--p`, see lib/scrolly.ts). Purely decorative.
 */
function ProjectFx({ fx }: { fx: Fx }) {
  switch (fx) {
    // Brucia: radio waves behind the phones, and a terminal that types out
    // the app's built-in demo (a synthetic handshake) as you scroll
    case "radio":
      return (
        <>
          <div className="fx fx--radio" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="fx fx--term" aria-hidden="true">
            <p className="fx--term__bar">
              <i />
              <i />
              <i />
              brucia
            </p>
            {[
              { text: "$ brucia --demo", cls: "is-cmd" },
              { text: "[+] handshake loaded (synthetic)", cls: "" },
              { text: "[*] wordlist: 401 candidates", cls: "" },
              { text: "[*] 401/401 tried · 129 keys/s", cls: "" },
              { text: "[✓] passphrase: brucia-demo-pass", cls: "is-ok" },
            ].map((line, i) => (
              <p key={i} className={line.cls} style={{ "--i": i } as CSSProperties}>
                <span>{line.text}</span>
              </p>
            ))}
            <b>Access granted</b>
          </div>
        </>
      );
    // Parolix: letter tiles flipping over one by one
    case "tiles":
      return (
        <div className="fx fx--tiles" aria-hidden="true">
          {"PAROLIX".split("").map((letter, i) => (
            <b key={i} style={{ "--i": i } as CSSProperties}>
              {letter}
            </b>
          ))}
        </div>
      );
    // im.center: profiles circling whoever is number one
    case "orbit":
      return (
        <div className="fx fx--orbit" aria-hidden="true">
          <span>
            <i />
            <i />
            <i />
          </span>
          <b>#1</b>
        </div>
      );
    // Wolf & Mafia: night falls, the moon comes up
    case "moon":
      return (
        <div className="fx fx--moon" aria-hidden="true">
          <i />
          <em>awooo!</em>
        </div>
      );
    // Forge Master: a hammer at work
    case "forge":
      return (
        <div className="fx fx--forge" aria-hidden="true">
          <svg viewBox="0 0 80 80">
            <g stroke="#0d1020" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
              <rect x="35" y="26" width="10" height="50" rx="3" fill="#c98a4b" />
              <rect x="12" y="6" width="56" height="24" rx="5" fill="#b8c0d4" />
            </g>
          </svg>
          <i />
          <i />
          <i />
        </div>
      );
    // Sentinel: a satellite passing over, looking down
    case "satellite":
      return (
        <div className="fx fx--sat" aria-hidden="true">
          <Satellite />
          <i />
        </div>
      );
    // AGEA Vinitaly: a glass that fills up
    case "wine":
      return (
        <svg className="fx fx--wine" viewBox="0 0 60 100" aria-hidden="true">
          <clipPath id="fx-bowl">
            <path d="M8 6h44c0 27-8 41-22 41S8 33 8 6z" />
          </clipPath>
          <path d="M8 6h44c0 27-8 41-22 41S8 33 8 6z" fill="#fff5dc" />
          <g clipPath="url(#fx-bowl)">
            <rect className="fx__level" x="0" y="6" width="60" height="44" fill="#b3123c" />
          </g>
          <path d="M8 6h44c0 27-8 41-22 41S8 33 8 6zM30 47v39M15 90h30" fill="none" stroke="#0d1020" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
    // EGNSS: the position fix tightening around a pin
    case "fix":
      return (
        <div className="fx fx--fix" aria-hidden="true">
          <i />
          <MapPin />
        </div>
      );
    default:
      return null; // "scan" and "checks" live inside the media itself
  }
}

function ProjectMedia({ media, title, href, fx }: { media: Media; title: string; href?: string; fx: Fx }) {
  // A roadmap, drawn as a to-do list on a sheet of ruled paper.
  if (media.type === "milestones") {
    const done = media.items.filter((m) => m.state === "done").length;
    return (
      <div className="checklist" role="img" aria-label={`${title} roadmap: ${done} of ${media.items.length} milestones done`}>
        <p className="checklist__title">
          {title} roadmap <span>{done} / {media.items.length}</span>
        </p>
        <ol>
          {media.items.map((m, i) => (
            <li key={m.id} className={`is-${m.state}`} style={{ "--i": i } as CSSProperties}>
              <i className="checklist__box" />
              <b>{m.id}</b>
              <span>{m.label}</span>
              {m.state === "next" && <em>← working on it</em>}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (media.type === "phones") {
    return (
      <div className="phones" role="img" aria-label={media.alt}>
        {media.srcs.map((src) => (
          <div className="phone" key={src}>
            <img src={asset(src)} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    );
  }

  const shot = (
    <div className="shot">
      <img src={asset(media.src)} alt={media.alt} loading="lazy" />
      {/* Card Scanner: a scan line sweeping the screenshot */}
      {fx === "scan" && (
        <div className="fx fx--scan" aria-hidden="true">
          <i />
        </div>
      )}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true" className="shot-link">
      {shot}
    </a>
  ) : (
    shot
  );
}

function Featured({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className={`project ${flip ? "project--flip" : ""}`} id={project.slug} data-tint={project.tint}>
      <div className="project__media" data-scrolly>
        <ProjectFx fx={project.fx} />
        <ProjectMedia media={project.media} title={project.title} href={project.links.live} fx={project.fx} />
      </div>
      <Reveal className="project__body panel" variant={flip ? "left" : "right"}>
        <span className="num project__num">{index + 1}</span>
        <span className={`stamp stamp--${project.status.tone}`}>{project.status.label}</span>
        <p className="kicker">{project.kicker}</p>
        <h3>{project.title}</h3>
        {project.paragraphs.map((p, i) => (
          <p key={i} className="prose">
            <Rich text={p} />
          </p>
        ))}
        {project.figures && (
          <dl className="figures">
            {project.figures.map((f) => (
              <div key={f.label}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <ProjectLinks links={project.links} title={project.title} />
      </Reveal>
    </article>
  );
}

function Card({ project, index }: { project: SmallProject; index: number }) {
  const tilt = [-1.4, 1.1, -0.7, 1.6][index % 4];
  return (
    <Reveal as="article" className="card" variant="pop" delay={(index % 4) * 70} style={{ "--r": `${tilt}deg` } as CSSProperties}>
      <div className="card__image">
        <img src={asset(project.image)} alt="" loading="lazy" />
      </div>
      <h3>{project.title}</h3>
      <p className="card__kicker">{project.kicker}</p>
      <p className="card__text">{project.text}</p>
      <ul className="tags">
        {project.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <ProjectLinks links={project.links} title={project.title} />
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" data-scene="survey" className="section">
      <div className="wrap">
        <SectionHead index="3" label="the fun part">
          Things I&apos;ve <em>built</em>.
        </SectionHead>
        <Reveal as="p" className="sec-intro">
          A few for work, most because I couldn&apos;t leave the idea alone. Apps on the stores, open-source tools, and one thing
          that is still booting.
        </Reveal>

        <div className="projects">
          {featured.map((p, i) => (
            <Featured key={p.slug} project={p} index={i} />
          ))}
        </div>

        <ProjectPager titles={featured.map((p) => p.title)} />

        <Reveal as="h3" className="sub-head">
          More from the workshop
        </Reveal>
        <div className="cards">
          {more.map((p, i) => (
            <Card key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
