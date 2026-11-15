// Scroll-linked motion for plain DOM elements (the 3D scene has its own loop).
//
// Any element with `data-scrolly` gets a CSS variable `--p` that runs from 0
// (its top edge touches the bottom of the screen) to 1 (its bottom edge leaves
// the top). The CSS decides what to do with it: tilt a screenshot, fan out
// three phones, slide a banner.
//
// Two rules keep this cheap, which matters on phones:
//  - a variable is only ever written on the element that uses it. Writing one
//    on <html> makes the browser recompute the style of the whole page;
//  - values are eased towards their target and written only when they move,
//    so a jittery scroll position does not turn into jittery motion.

const PROGRESS_USERS = ".nav__progress, .descent__craft";

export function startScrolly() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const active = new Set<HTMLElement>();
  const shown = new WeakMap<HTMLElement, number>();
  let progressEls: HTMLElement[] = [];
  let lastProgress = -1;
  let raf = 0;

  const tick = () => {
    raf = 0;
    const vh = window.innerHeight;

    // how far down the page: only the progress bar and the little spacecraft care
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    if (progressEls.length < 2) progressEls = Array.from(document.querySelectorAll<HTMLElement>(PROGRESS_USERS));
    if (Math.abs(progress - lastProgress) > 0.0004) {
      lastProgress = progress;
      for (const el of progressEls) el.style.setProperty("--progress", progress.toFixed(4));
    }

    let moving = false;
    for (const el of active) {
      const rect = el.getBoundingClientRect();
      // People who asked for less motion get the resting pose.
      const target = reduce.matches ? 0.5 : Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const current = shown.get(el);
      let next = target;
      if (current !== undefined && !reduce.matches) {
        const gap = target - current;
        next = Math.abs(gap) < 0.004 ? target : current + gap * 0.24;
      }
      if (next !== current) {
        shown.set(el, next);
        el.style.setProperty("--p", next.toFixed(3));
      }
      if (next !== target) moving = true;
    }
    // keep easing after the scroll has stopped, until everything has caught up
    if (moving) request();
  };

  const request = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.add(entry.target as HTMLElement);
        else active.delete(entry.target as HTMLElement);
      }
      request();
    },
    { rootMargin: "15% 0px" }
  );
  document.querySelectorAll<HTMLElement>("[data-scrolly]").forEach((el) => io.observe(el));

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  request();

  return () => {
    io.disconnect();
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
    cancelAnimationFrame(raf);
  };
}
