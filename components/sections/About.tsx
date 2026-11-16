import { about } from "../../data/profile";
import { asset, site } from "../../lib/site";
import Reveal from "../ui/Reveal";
import Rich from "../ui/Rich";
import SectionHead from "../ui/SectionHead";

export default function About() {
  return (
    <section id="about" data-scene="approach" className="section about">
      <div className="wrap">
        <div className="about__text">
          <SectionHead index="1" label="about me">
            Engineer by trade, <em>hacker</em> by origin.
          </SectionHead>

          <Reveal className="about__who" variant="pop">
            <img src={asset("/portrait.webp")} alt={`Portrait of ${site.name}`} width={160} height={213} loading="lazy" />
            <p>
              <strong>{site.name}</strong>
              <span>
                {site.role} · {site.location}
              </span>
            </p>
          </Reveal>

          {about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} className="prose" delay={i * 60}>
              <Rich text={p} />
            </Reveal>
          ))}
        </div>

        <div className="facts">
          {about.facts.map((fact, i) => (
            <Reveal key={fact.value} className="fact" variant="pop" delay={i * 90}>
              <strong>{fact.value}</strong>
              <span>
                <Rich text={fact.label} />
              </span>
            </Reveal>
          ))}
        </div>

        <div className="stack">
          {about.stack.map((group, i) => (
            <Reveal key={group.title} className="stack__group" delay={i * 70}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
