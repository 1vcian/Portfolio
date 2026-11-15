import { jobs } from "../../data/profile";
import Reveal from "../ui/Reveal";
import Rich from "../ui/Rich";
import SectionHead from "../ui/SectionHead";

export default function Experience() {
  return (
    <section id="experience" data-scene="ground" className="section">
      <div className="wrap">
        <SectionHead index="2" label="the day job">
          Where I&apos;ve <em>worked</em>.
        </SectionHead>

        <ol className="jobs">
          {jobs.map((job, i) => (
            <Reveal as="li" key={job.company} className="job panel" variant={i % 2 ? "right" : "left"}>
              <p className="job__tab">
                {job.period} <span>· {job.place}</span>
              </p>
              <h3>
                {job.role} <span>@ {job.company}</span>
              </h3>
              <ul>
                {job.points.map((point, j) => (
                  <li key={j}>
                    <Rich text={point} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
