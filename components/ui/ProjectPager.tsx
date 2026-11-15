import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "./icons";

/**
 * A small pager that appears while the featured projects are on screen:
 * which one you are on, and a button to hop to the previous or next.
 */
export default function ProjectPager({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const list = document.querySelector<HTMLElement>(".projects");
    const items = Array.from(document.querySelectorAll<HTMLElement>(".projects > .project"));
    if (!list || !items.length) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const box = list.getBoundingClientRect();
      // on screen from the moment the list reaches mid-screen until its end passes it
      setVisible(box.top < vh * 0.5 && box.bottom > vh * 0.5);
      // the current project is the last one whose top has passed the upper third
      let current = 0;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top < vh * 0.4) current = i;
      });
      setIndex(current);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (to: number) => {
    const items = document.querySelectorAll<HTMLElement>(".projects > .project");
    const target = items[Math.min(items.length - 1, Math.max(0, to))];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={`pager ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <button type="button" onClick={() => go(index - 1)} disabled={index === 0} tabIndex={visible ? 0 : -1} aria-label="Previous project">
        <ArrowUp />
      </button>
      <p aria-live="polite">
        <b>
          {index + 1} / {titles.length}
        </b>
        <span>{titles[index]}</span>
      </p>
      <button type="button" onClick={() => go(index + 1)} disabled={index === titles.length - 1} tabIndex={visible ? 0 : -1} aria-label="Next project">
        <ArrowDown />
      </button>
    </div>
  );
}
