import { useEffect, useRef, useState } from "react";
import { MapPin, Satellite } from "../ui/icons";
import type { OrbitScene } from "./engine";

/**
 * The fixed 3D backdrop, the labels pinned to it and the little spacecraft
 * that rides down the right edge as you scroll. Loaded on the client only
 * (see pages/index.tsx), so three.js never weighs on the first paint.
 */
export default function SceneLayer() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const alt = useRef<HTMLElement>(null);
  const phase = useRef<HTMLSpanElement>(null);
  const rome = useRef<HTMLDivElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const galileo = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    let scene: OrbitScene | undefined;
    let cancelled = false;

    import("./engine")
      .then(({ OrbitScene }) => {
        if (cancelled) return;
        scene = new OrbitScene({
          canvas: canvas.current!,
          scrim: scrim.current!,
          alt: alt.current!,
          phase: phase.current!,
          rome: rome.current!,
          sentinel: sentinel.current!,
          galileo: galileo.current!,
        });
        scene.start();
        setState("ready");
      })
      .catch((err) => {
        // No WebGL (or it crashed): the page still works on its plain background.
        console.warn("3D scene unavailable:", err);
        if (!cancelled) setState("failed");
      });

    return () => {
      cancelled = true;
      scene?.dispose();
    };
  }, []);

  return (
    <div className={`scene scene--${state}`} aria-hidden="true">
      <canvas ref={canvas} className="scene__canvas" />
      <div ref={scrim} className="scene__scrim" />

      <div ref={rome} className="pin pin--rome">
        <MapPin />
        <span className="pin__text">
          Rome <small>home base</small>
        </span>
      </div>
      <div ref={sentinel} className="pin pin--sat">
        <Satellite />
        <span className="pin__text">Sentinel-2</span>
      </div>
      <div ref={galileo} className="pin pin--sat">
        <Satellite />
        <span className="pin__text">Galileo</span>
      </div>

      <div className="descent">
        <div className="descent__craft">
          <Satellite />
          <span className="descent__label">
            <span ref={phase}>in orbit</span>
            <small ref={alt}>786 km up</small>
          </span>
        </div>
      </div>
    </div>
  );
}
