import { useEffect, useState } from "react";
import { nav, site } from "../lib/site";
import { Close, Download, Github, Menu } from "./ui/icons";

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Highlight the section that currently crosses the middle of the viewport.
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${open ? "nav--open" : ""}`}>
      {/* A strip of paper floating over the page: logo, sections, résumé. */}
      <div className="nav__bar">
        <a href="#top" className="nav__logo" aria-label={`${site.name}, back to top`} onClick={() => setOpen(false)}>
          {/* "1v" is how the nickname 1vcian spells "Lu" */}
          <svg viewBox="0 0 64 64" aria-hidden>
            <g transform="rotate(-6 32 32) translate(3.5 3.5) scale(0.89)">
              <rect x="10" y="10" width="50" height="50" rx="14" fill="#0d1020" />
              <rect x="4" y="4" width="50" height="50" rx="14" fill="#ffb200" stroke="#0d1020" strokeWidth="4" />
              <path d="M25 15h-7l-7 6v7l7-5v20h7z" fill="#0d1020" />
              <path d="M27 23h7.5l3 11 3-11H48l-7 20h-7z" fill="#0d1020" />
            </g>
          </svg>
          <span aria-hidden>cian</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {nav.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} className={active === item.id ? "is-active" : ""}>
              <span>{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav__github" href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <Github />
        </a>
        <a className="nav__cta" href={site.resume.en} target="_blank" rel="noreferrer">
          Résumé
          <Download />
        </a>

        <button className="nav__toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <Close /> : <Menu />}
        </button>

        {/* how far down the page you are */}
        <span className="nav__progress" aria-hidden />
      </div>

      <nav className="nav__sheet" aria-label="Sections" aria-hidden={!open}>
        {nav.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            <span>{i + 1}</span>
            {item.label}
          </a>
        ))}
        <a href={site.resume.en} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="nav__sheet-cta" onClick={() => setOpen(false)}>
          Download résumé
        </a>
      </nav>
    </header>
  );
}
