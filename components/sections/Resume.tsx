import { site } from "../../lib/site";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import { ArrowUpRight, Download, Github } from "../ui/icons";

export default function Resume() {
  const { resume } = site;
  return (
    <section id="resume" data-scene="archive" className="section">
      <div className="wrap resume">
        <div className="resume__text">
          <SectionHead index="4" label="the paperwork">
            One page, compiled from <em>source</em>.
          </SectionHead>
          <Reveal as="p" className="prose">
            My CV is a LaTeX file in this site&apos;s repository. Every push recompiles it to PDF with GitHub Actions and publishes
            it here, so this link is always the current version.
          </Reveal>

          <Reveal className="resume__actions">
            <a className="btn btn--primary" href={resume.en} target="_blank" rel="noreferrer">
              Download PDF
              <Download />
            </a>
            <a className="btn" href={resume.it} target="_blank" rel="noreferrer" hrefLang="it">
              Versione italiana
              <Download />
            </a>
          </Reveal>

          <Reveal className="template panel" variant="pop">
            <span className="burst" aria-hidden="true">
              Free!
            </span>
            <p className="kicker">Want the layout?</p>
            <h3>Take the template.</h3>
            <p className="prose">
              The same design with placeholder content: a single <code>.tex</code> file, two columns, one page, no custom class
              to install. Open it in Overleaf or compile it with <code>pdflatex</code>.
            </p>
            <p className="template__proof">
              Field-tested: as a cold application with no referral, it got past the screening at Amazon and Google.
            </p>
            <div className="links">
              <a className="chip-link chip-link--primary" href={resume.template.overleaf} target="_blank" rel="noreferrer">
                <ArrowUpRight />
                Open in Overleaf
              </a>
              <a className="chip-link" href={resume.template.tex} download="resume-template.tex">
                <Download />
                Download .tex
              </a>
              <a className="chip-link" href={resume.template.pdf} target="_blank" rel="noreferrer">
                <ArrowUpRight />
                Preview PDF
              </a>
              <a className="chip-link" href={resume.template.source} target="_blank" rel="noreferrer">
                <Github />
                Source
              </a>
            </div>
          </Reveal>
        </div>

        <div className="resume__preview" data-scrolly>
          <a href={resume.en} target="_blank" rel="noreferrer" aria-label="Open the résumé PDF">
            <img src={resume.preview} alt="Preview of Lucian Medrihan's one-page résumé" width={827} height={1170} loading="lazy" />
          </a>
        </div>
      </div>
    </section>
  );
}
