import { useState } from "react";
import { site } from "../../lib/site";
import Reveal from "../ui/Reveal";
import { ArrowUp, Check, Copy, Github, Instagram, Linkedin, Mail } from "../ui/icons";

const COMMAND = "npx 1vcian";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the command is right there to select */
    }
  };

  return (
    <section id="contact" data-scene="uplink" className="section contact">
      <div className="wrap contact__inner">
        <Reveal as="p" className="sec-head__label">
          <span className="num">5</span>
          <span className="hand">say hi</span>
        </Reveal>
        <Reveal as="h2" className="contact__title">
          Let&apos;s build something that <em>ships</em>.
        </Reveal>
        <Reveal as="p" className="contact__lead">
          I&apos;m always open to new opportunities. Whether you have a role, a question or just want to say hi, my inbox is open
          and I&apos;ll do my best to get back to you.
        </Reveal>

        <Reveal className="contact__actions" variant="pop">
          <a className="btn btn--primary btn--large" href={`mailto:${site.email}`}>
            <Mail />
            {site.email}
          </a>
        </Reveal>

        <Reveal className="terminal">
          <span className="terminal__hint">or get my card in your terminal</span>
          <button type="button" className="terminal__line" onClick={copy} aria-label={`Copy the command ${COMMAND}`}>
            <span className="terminal__prompt">$</span>
            <code>{COMMAND}</code>
            {copied ? <Check /> : <Copy />}
          </button>
          <span className="terminal__status" role="status">
            {copied ? "copied!" : ""}
          </span>
        </Reveal>

        <Reveal className="socials">
          <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github />
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin />
          </a>
          <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          {/* Live badge: im.center renders the current rank into the image. */}
          <a className="socials__badge" href="https://im.center/1vcian" target="_blank" rel="noreferrer">
            <img src="https://im.center/b/1vcian.svg" alt="Lucian on im.center" height={36} loading="lazy" />
          </a>
        </Reveal>
      </div>

      <footer className="footer">
        <Reveal className="footer__note panel" variant="pop">
          <p>
            That&apos;s the whole trip. Built by <strong>{site.name}</strong>.
          </p>
          <div className="links">
            <a className="chip-link chip-link--primary" href="#top">
              <ArrowUp />
              Back to orbit
            </a>
            <a className="chip-link" href={site.repo} target="_blank" rel="noreferrer">
              <Github />
              Source code
            </a>
          </div>
        </Reveal>
      </footer>
    </section>
  );
}
