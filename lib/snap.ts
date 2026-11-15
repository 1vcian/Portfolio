// A soft "magnet" for the featured projects: when scrolling comes to rest
// near the top of a project, the page glides the rest of the way so the
// project sits just under the floating bar.
//
// Done by hand rather than with CSS scroll-snap because the browser's own
// snap is an abrupt jump on a mouse wheel. Here it is an eased glide that
// stops the instant the user scrolls, touches or presses a key again.

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function startProjectSnap() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  let timer = 0;
  let raf = 0;
  let gliding = false;
  let touching = false;

  // where a project's top edge comes to rest: the page's scroll padding plus the card's own margin
  const restLine = () => (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 100) + 24;

  const stop = () => {
    cancelAnimationFrame(raf);
    gliding = false;
  };

  const settle = () => {
    if (gliding || touching || reduce.matches) return;
    const rest = restLine();
    // Stopping short of a project pulls it up from further away than
    // stopping just inside one pulls back: nobody reading a card gets yanked.
    const ahead = Math.min(300, window.innerHeight * 0.34);
    const behind = 110;
    let delta = 0;
    let nearest = Infinity;
    document.querySelectorAll<HTMLElement>(".projects > .project").forEach((el) => {
      const d = el.getBoundingClientRect().top - rest;
      if (Math.abs(d) < nearest && d < ahead && d > -behind) {
        nearest = Math.abs(d);
        delta = d;
      }
    });
    if (nearest === Infinity || Math.abs(delta) < 2) return;

    const from = window.scrollY;
    const duration = Math.min(760, 420 + Math.abs(delta) * 1.3);
    const started = performance.now();
    gliding = true;
    const step = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      window.scrollTo({ top: from + delta * easeOut(t), behavior: "instant" });
      if (t < 1 && gliding) raf = requestAnimationFrame(step);
      else gliding = false;
    };
    raf = requestAnimationFrame(step);
  };

  // scrolling has come to rest when no scroll event arrives for a moment
  const onScroll = () => {
    if (gliding) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(settle, 130);
  };
  const onTouchStart = () => {
    touching = true;
    stop();
  };
  const onTouchEnd = () => {
    touching = false;
    onScroll();
  };
  const onKey = (e: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) stop();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("mousedown", stop, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { passive: true });
  window.addEventListener("keydown", onKey);

  return () => {
    stop();
    window.clearTimeout(timer);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("mousedown", stop);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
    window.removeEventListener("keydown", onKey);
  };
}
