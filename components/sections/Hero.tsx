import { site } from "../../lib/site";
import { ArrowDown, Download } from "../ui/icons";

export default function Hero() {
  return (
    <section id="top" data-scene="orbit" className="hero">
      <div className="wrap hero__inner">
        <p className="eyebrow hero__in" style={{ animationDelay: "0.1s" }}>
          {site.role}, {site.location}
        </p>

        <h1 className="hero__title">
          <span className="hero__in" style={{ animationDelay: "0.2s" }}>
            Lucian
          </span>
          <span className="hero__in" style={{ animationDelay: "0.3s" }}>
            Medrihan
          </span>
        </h1>

        <p className="hero__lead hero__in" style={{ animationDelay: "0.45s" }}>
          Code that <em>actually ships</em>, from satellite imagery pipelines to the games in your pocket.
        </p>

        <p className="hero__sub hero__in" style={{ animationDelay: "0.55s" }}>
          5+ years building GIS and AI systems that run in production. The rest of my time goes into what I love: hunting
          vulnerabilities, shipping apps and building open-source tools.
        </p>

        <div className="hero__cta hero__in" style={{ animationDelay: "0.65s" }}>
          <a className="btn btn--primary" href="#projects">
            See the work
            <ArrowDown />
          </a>
          <a className="btn" href={site.resume.en} target="_blank" rel="noreferrer">
            Résumé
            <Download />
          </a>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to the next section">
        <ArrowDown />
        scroll to come down
      </a>
    </section>
  );
}
