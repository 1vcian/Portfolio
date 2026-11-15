import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  /** How it arrives: sliding up (default), popping in, or from a side. */
  variant?: "up" | "pop" | "left" | "right";
  /** Delay in milliseconds, for staggering siblings. */
  delay?: number;
  children: ReactNode;
  [key: string]: unknown;
};

/**
 * Animates its content in the first time it scrolls into view. Without
 * JavaScript (or with reduced motion) the content is simply visible: see
 * `.reveal` in the CSS.
 *
 * "Has appeared" is React state, not a class added by hand: a class set
 * behind React's back is wiped whenever the component re-renders with a
 * different className, and the content would vanish for good.
 */
export default function Reveal({ as: Tag = "div", className = "", variant = "up", delay = 0, children, style, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      // any sliver counts: a card taller than the screen must still appear
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${shown ? "is-in" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...(style as CSSProperties) } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
