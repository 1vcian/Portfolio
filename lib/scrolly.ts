// Scroll-linked motion for plain DOM elements (the 3D scene has its own loop).
//
// Any element with `data-scrolly` gets a CSS variable `--p` that runs from 0
// (its top edge touches the bottom of the screen) to 1 (its bottom edge leaves
// the top). The CSS decides what to do with it: tilt a screenshot, fan out
// three phones, slide a banner. `--progress` on <html> is the whole page.

export function startScrolly() {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const active = new Set<HTMLElement>();
  let raf = 0;

  const tick = () => {
    raf = 0;
    const vh = window.innerHeight;
    const max = Math.max(1, root.scrollHeight - vh);
    root.style.setProperty("--progress", Math.min(1, Math.max(0, window.scrollY / max)).toFixed(4));

    for (const el of active) {
      const rect = el.getBoundingClientRect();
      // People who asked for less motion get the resting pose.
      const p = reduce.matches ? 0.5 : Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      el.style.setProperty("--p", p.toFixed(4));
    }
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
