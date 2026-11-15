// The scroll-driven scene: a dotted Earth seen from orbit that closes in on
// Italy and resolves into a map of fields, then climbs back up at the end.
// Plain three.js, no React: Scene.tsx owns the DOM and hands it over.

import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Color,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Matrix4,
  Mesh,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { KIND, buildLandPoints, lonLatToVec } from "./land";
import { HALF_H, PHASES, ROME, SceneState, buildStates, mixStates } from "./states";
import {
  atmosphereFragment,
  bodyFragment,
  dotsFragment,
  dotsVertex,
  sphereVertex,
  starsFragment,
  starsVertex,
} from "./shaders";

export type SceneDom = {
  canvas: HTMLCanvasElement;
  /** The little spacecraft's caption: what it is doing and how high it is. */
  alt: HTMLElement;
  phase: HTMLElement;
  /** Labels pinned to things in the scene. */
  rome: HTMLElement;
  sentinel: HTMLElement;
  galileo: HTMLElement;
};

const DEG = Math.PI / 180;
const CAMERA_Z = 6;
const GROUND_DEPTH = 13;

const SPACE = new Color("#0a0e27");
const SOIL = new Color("#0a1a1c");

type Orbit = {
  radius: number;
  speed: number;
  phase: number;
  local: Matrix4;
  line: LineLoop;
  label: HTMLElement;
};

export class OrbitScene {
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(35, 1, 0.1, 200);

  private dots: Points;
  private dotsMaterial: ShaderMaterial;
  private stars: Points;
  private starsMaterial: ShaderMaterial;
  private body: Mesh;
  private bodyMaterial: ShaderMaterial;
  private atmosphere: Mesh;
  private atmosphereMaterial: ShaderMaterial;
  private graticule: LineSegments;
  private orbits: Orbit[] = [];

  private states = buildStates(1);
  private sections: { el: HTMLElement; state: SceneState }[] = [];
  private target: SceneState;
  private current: SceneState;
  private scratch: SceneState;
  private settled = false;

  private width = 1;
  private height = 1;
  private spin = (-ROME.lon - 28) * DEG; // start with Europe drifting into view
  private fly = 0;
  private time = 0;
  private last = 0;
  private raf = 0;
  private running = false;
  private reducedMotion: MediaQueryList;
  private pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  // Mouse: where it is (screen space, y up), whether it is on the page, and the globe being dragged.
  private mouse = { x: 0, y: 0, on: 0, seen: false };
  private drag = { active: false, moved: false, x: 0, y: 0, velocity: 0, tilt: 0, at: 0 };
  private ripple = [0, 0, 99];
  // The project currently on screen colours the fields.
  private projects: { el: HTMLElement; color: Color }[] = [];
  private activeProject: HTMLElement | null = null;
  private tint = new Color("#ffffff");
  private tintAmount = 0;
  private tintTarget = 0;
  private frames = 0;

  private mBase = new Matrix4();
  private mGlobe = new Matrix4();
  private mGround = new Matrix4();
  private mTmp = new Matrix4();
  private vTmp = new Vector3();
  private vCentre = new Vector3();
  private romeUnit = new Vector3();
  private bg = new Color();
  private hudCache: Record<string, string> = {};

  constructor(private dom: SceneDom) {
    this.renderer = new WebGLRenderer({ canvas: dom.canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setClearColor(SPACE, 1);
    this.camera.position.set(0, 0, CAMERA_Z);
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const low = Math.min(window.innerWidth, window.innerHeight) < 700 || (navigator.hardwareConcurrency || 8) <= 4;
    const quality = low ? "low" : "high";

    const v = [0, 0, 0];
    lonLatToVec(ROME.lon, ROME.lat, v);
    this.romeUnit.set(v[0], v[1], v[2]);

    // ── stars ──────────────────────────────────────────────────────────────
    {
      const count = low ? 700 : 1500;
      const pos = new Float32Array(count * 3);
      const rand = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * 2 - 1;
        const a = Math.random() * Math.PI * 2;
        const r = 50 + Math.random() * 30;
        const s = Math.sqrt(1 - u * u);
        pos.set([r * s * Math.cos(a), r * u, r * s * Math.sin(a)], i * 3);
        rand.set([Math.pow(Math.random(), 2.2), Math.random(), Math.random()], i * 3);
      }
      const g = new BufferGeometry();
      g.setAttribute("position", new BufferAttribute(pos, 3));
      g.setAttribute("aRand", new BufferAttribute(rand, 3));
      this.starsMaterial = new ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPx: { value: 1 }, uTwinkle: { value: 1 }, uOpacity: { value: 1 } },
        vertexShader: starsVertex,
        fragmentShader: starsFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
      });
      this.stars = new Points(g, this.starsMaterial);
      this.stars.frustumCulled = false;
      this.stars.renderOrder = 0;
      this.scene.add(this.stars);
    }

    // ── planet body, atmosphere, graticule ─────────────────────────────────
    {
      const sphere = new SphereGeometry(1, 96, 64);
      this.bodyMaterial = new ShaderMaterial({
        uniforms: { uBody: { value: new Color("#0c1233") }, uRim: { value: new Color("#3d6fd6") }, uOpacity: { value: 1 } },
        vertexShader: sphereVertex,
        fragmentShader: bodyFragment,
        transparent: true,
      });
      this.body = new Mesh(sphere, this.bodyMaterial);
      this.body.matrixAutoUpdate = false;
      this.body.frustumCulled = false;
      this.body.renderOrder = 1;
      this.scene.add(this.body);

      this.atmosphereMaterial = new ShaderMaterial({
        uniforms: { uColor: { value: new Color("#4f8dff") }, uOpacity: { value: 0.55 } },
        vertexShader: sphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        side: BackSide,
        depthWrite: false,
        blending: AdditiveBlending,
      });
      this.atmosphere = new Mesh(sphere, this.atmosphereMaterial);
      this.atmosphere.matrixAutoUpdate = false;
      this.atmosphere.frustumCulled = false;
      this.atmosphere.renderOrder = 2;
      this.scene.add(this.atmosphere);

      // Parallels and meridians every 20°.
      const pts: number[] = [];
      const p = [0, 0, 0];
      const q = [0, 0, 0];
      const r = 1.002;
      for (let lat = -60; lat <= 60; lat += 20) {
        for (let lon = -180; lon < 180; lon += 3) {
          lonLatToVec(lon, lat, p);
          lonLatToVec(lon + 3, lat, q);
          pts.push(p[0] * r, p[1] * r, p[2] * r, q[0] * r, q[1] * r, q[2] * r);
        }
      }
      for (let lon = -180; lon < 180; lon += 20) {
        for (let lat = -80; lat < 80; lat += 4) {
          lonLatToVec(lon, lat, p);
          lonLatToVec(lon, lat + 4, q);
          pts.push(p[0] * r, p[1] * r, p[2] * r, q[0] * r, q[1] * r, q[2] * r);
        }
      }
      const g = new BufferGeometry();
      g.setAttribute("position", new BufferAttribute(new Float32Array(pts), 3));
      this.graticule = new LineSegments(g, new LineBasicMaterial({ color: "#7d9bd6", transparent: true, opacity: 0.1, depthWrite: false }));
      this.graticule.matrixAutoUpdate = false;
      this.graticule.frustumCulled = false;
      this.graticule.renderOrder = 3;
      this.scene.add(this.graticule);
    }

    // ── orbits ─────────────────────────────────────────────────────────────
    // Sentinel-2 flies a near-polar orbit at 786 km (true to scale here);
    // Galileo sits much higher, drawn closer in so it stays on screen.
    const addOrbit = (radius: number, inclination: number, node: number, period: number, phase: number, label: HTMLElement) => {
      const pts = new Float32Array(256 * 3);
      for (let i = 0; i < 256; i++) {
        const a = (i / 256) * Math.PI * 2;
        pts.set([Math.cos(a) * radius, 0, Math.sin(a) * radius], i * 3);
      }
      const g = new BufferGeometry();
      g.setAttribute("position", new BufferAttribute(pts, 3));
      const line = new LineLoop(g, new LineBasicMaterial({ color: "#9db4e6", transparent: true, opacity: 0.34, depthWrite: false }));
      line.matrixAutoUpdate = false;
      line.frustumCulled = false;
      line.renderOrder = 5;
      this.scene.add(line);
      const local = new Matrix4().makeRotationY(node * DEG).multiply(new Matrix4().makeRotationX(inclination * DEG));
      this.orbits.push({ radius, speed: (Math.PI * 2) / period, phase, local, line, label });
    };
    addOrbit(1 + 786 / 6371, 98.6, 20, 46, 1.9, dom.sentinel);
    addOrbit(1.62, 56, -55, 110, 4.4, dom.galileo);

    // ── the dots ───────────────────────────────────────────────────────────
    {
      const land = buildLandPoints(quality);
      const landCount = land.kinds.length;
      const total = Math.max(landCount, low ? 17000 : 36000);
      const aspect = Math.max(window.innerWidth / Math.max(window.innerHeight, 1), 0.5);
      const groundW = this.groundWidth(aspect);
      const cols = Math.max(8, Math.round(Math.sqrt((total * groundW) / GROUND_DEPTH)));
      const rows = Math.ceil(total / cols);

      // Every dot gets a random cell of the ground grid.
      const cells = new Uint32Array(cols * rows);
      for (let i = 0; i < cells.length; i++) cells[i] = i;
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = cells[i];
        cells[i] = cells[j];
        cells[j] = t;
      }

      const position = new Float32Array(total * 3);
      const kind = new Float32Array(total);
      const ground = new Float32Array(total * 2);
      const rand = new Float32Array(total * 4);
      for (let i = 0; i < total; i++) {
        // Dots without a home on the globe wait, invisible, on a random piece of land.
        const src = i < landCount ? i : Math.floor(Math.random() * landCount);
        position.set(land.positions.slice(src * 3, src * 3 + 3), i * 3);
        kind[i] = i < landCount ? land.kinds[i] : KIND.EXTRA;
        const cell = cells[i];
        const cx = cell % cols;
        const cz = Math.floor(cell / cols);
        ground[i * 2] = (cx + (cz % 2 ? 0.5 : 0)) / cols - 0.5;
        ground[i * 2 + 1] = cz / rows;
        rand.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      }

      const g = new BufferGeometry();
      g.setAttribute("position", new BufferAttribute(position, 3));
      g.setAttribute("aKind", new BufferAttribute(kind, 1));
      g.setAttribute("aGround", new BufferAttribute(ground, 2));
      g.setAttribute("aRand", new BufferAttribute(rand, 4));
      this.dotsMaterial = new ShaderMaterial({
        uniforms: {
          uGlobe: { value: this.mGlobe },
          uGround: { value: this.mGround },
          uGroundSize: { value: [groundW, GROUND_DEPTH] },
          uCam: { value: this.camera.position },
          uMorph: { value: 0 },
          uDetail: { value: 0 },
          uFade: { value: 1 },
          uTime: { value: 0 },
          uFly: { value: 0 },
          uPx: { value: 1 },
          uTwinkle: { value: 1 },
          uAspect: { value: 1 },
          uMouse: { value: [0, 0] },
          uMouseOn: { value: 0 },
          uRipple: { value: this.ripple },
          uTint: { value: this.tint },
          uTintAmount: { value: 0 },
        },
        vertexShader: dotsVertex,
        fragmentShader: dotsFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
      });
      this.dots = new Points(g, this.dotsMaterial);
      this.dots.frustumCulled = false;
      this.dots.renderOrder = 4;
      this.scene.add(this.dots);
    }

    this.target = { ...this.states.orbit };
    this.current = { ...this.states.orbit };
    this.scratch = { ...this.states.orbit };

    this.resize();
    window.addEventListener("resize", this.resize);
    window.addEventListener("pointermove", this.onPointer, { passive: true });
    window.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointerup", this.onPointerUp);
    document.documentElement.addEventListener("mouseleave", this.onPointerLeave);
    document.addEventListener("visibilitychange", this.onVisibility);
  }

  /** Wide enough to fill the far edge of the tilted ground at this aspect ratio. */
  private groundWidth(aspect: number) {
    return Math.min(26, Math.max(7, 10.6 * aspect));
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  dispose() {
    this.stop();
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("pointermove", this.onPointer);
    window.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointerup", this.onPointerUp);
    document.documentElement.removeEventListener("mouseleave", this.onPointerLeave);
    document.documentElement.classList.remove("can-grab", "is-grabbing");
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.scene.traverse((o) => {
      const mesh = o as Mesh;
      mesh.geometry?.dispose();
      const m = mesh.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    });
    this.renderer.dispose();
  }

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else this.start();
  };

  /** Only bare page background starts a drag: text stays selectable, links stay clickable. */
  private isBackdrop(target: EventTarget | null) {
    return target instanceof HTMLElement && target.matches("main, section, .wrap, .hero__inner, .contact__inner, .about__text");
  }

  /** Is this screen point (pixels) on the planet? */
  private overGlobe(clientX: number, clientY: number) {
    const s = this.current;
    if (s.morph > 0.3) return false;
    this.vTmp.set((clientX / this.width) * 2 - 1, -(clientY / this.height) * 2 + 1, 0.5).unproject(this.camera).sub(this.camera.position).normalize();
    const cam = this.camera.position;
    const ox = cam.x - this.vCentre.x, oy = cam.y - this.vCentre.y, oz = cam.z - this.vCentre.z;
    const b = ox * this.vTmp.x + oy * this.vTmp.y + oz * this.vTmp.z;
    return b * b - (ox * ox + oy * oy + oz * oz - s.gs * s.gs) > 0 && b < 0;
  }

  private onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    this.pointer.x = (e.clientX / this.width) * 2 - 1;
    this.pointer.y = (e.clientY / this.height) * 2 - 1;
    this.mouse.x = this.pointer.x;
    this.mouse.y = -this.pointer.y;
    this.mouse.seen = true;

    if (this.drag.active) {
      // The surface follows the cursor: pixels → radians on a sphere of this size.
      const perPixel = (2 * HALF_H) / this.height / this.current.gs;
      const dx = (e.clientX - this.drag.x) * perPixel;
      const dy = (e.clientY - this.drag.y) * perPixel;
      if (Math.abs(e.clientX - this.drag.x) + Math.abs(e.clientY - this.drag.y) > 0) this.drag.moved = true;
      this.drag.x = e.clientX;
      this.drag.y = e.clientY;
      this.spin += dx;
      this.drag.velocity = dx;
      this.drag.at = e.timeStamp;
      this.drag.tilt = Math.min(0.7, Math.max(-0.7, this.drag.tilt + dy));
      return;
    }
    const grabbable = this.current.lock < 0.5 && this.isBackdrop(e.target) && this.overGlobe(e.clientX, e.clientY);
    document.documentElement.classList.toggle("can-grab", grabbable);
  };

  private onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !this.isBackdrop(e.target)) return;
    this.drag.moved = false;
    if (this.current.lock < 0.5 && this.overGlobe(e.clientX, e.clientY)) {
      this.drag.active = true;
      this.drag.x = e.clientX;
      this.drag.y = e.clientY;
      this.drag.velocity = 0;
      document.documentElement.classList.add("is-grabbing");
      e.preventDefault(); // no text selection while spinning the planet
    }
  };

  private onPointerUp = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const wasDragging = this.drag.active;
    this.drag.active = false;
    // Only fling the planet if the mouse was still moving when it let go.
    if (e.timeStamp - this.drag.at > 90) this.drag.velocity = 0;
    document.documentElement.classList.remove("is-grabbing");
    // A plain click on the backdrop sends a ripple through the dots.
    if ((!wasDragging || !this.drag.moved) && this.isBackdrop(e.target)) this.sendRipple(e.clientX, e.clientY);
  };

  private onPointerLeave = () => {
    this.mouse.seen = false;
    document.documentElement.classList.remove("can-grab");
  };

  private sendRipple(clientX: number, clientY: number) {
    this.ripple[0] = (clientX / this.width) * 2 - 1;
    this.ripple[1] = -(clientY / this.height) * 2 + 1;
    this.ripple[2] = 0;
  }

  /** The featured project nearest the middle of the screen lends its colour to the fields. */
  private readProjects() {
    const vh = this.height;
    let best: (typeof this.projects)[number] | null = null;
    let bestDistance = Infinity;
    let rect: DOMRect | null = null;
    for (const project of this.projects) {
      const r = project.el.getBoundingClientRect();
      const distance = Math.abs((r.top + r.bottom) / 2 - vh / 2);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = project;
        rect = r;
      }
    }
    this.tintTarget = best ? Math.min(1, Math.max(0, 1.6 - bestDistance / (vh * 0.42))) : 0;
    if (best && rect && this.tintTarget > 0.5 && best.el !== this.activeProject) {
      this.activeProject = best.el;
      this.sendRipple((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2);
    }
    if (best && this.tintTarget > 0) this.tint.lerp(best.color, 0.2);
    if (this.tintTarget <= 0) this.activeProject = null;
  }

  private resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const aspect = this.width / Math.max(this.height, 1);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    const px = this.renderer.getPixelRatio();
    this.dotsMaterial.uniforms.uPx.value = px;
    this.starsMaterial.uniforms.uPx.value = px;
    this.dotsMaterial.uniforms.uGroundSize.value = [this.groundWidth(aspect), GROUND_DEPTH];
    this.dotsMaterial.uniforms.uAspect.value = aspect;
    this.projects = Array.from(document.querySelectorAll<HTMLElement>("[data-tint]")).map((el) => ({ el, color: new Color(el.dataset.tint) }));

    this.states = buildStates(aspect);
    this.sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]")).map((el) => ({
      el,
      state: this.states[el.dataset.scene as keyof typeof this.states] ?? this.states.orbit,
    }));
  };

  /** Where the scene should be for the current scroll position. */
  private readScroll() {
    const vh = this.height;
    const out = this.target;
    let phase = 0;
    if (!this.sections.length) this.resize();
    if (!this.sections.length) {
      Object.assign(out, this.states.orbit);
      return phase;
    }
    Object.assign(out, this.sections[0].state);
    for (let i = 1; i < this.sections.length; i++) {
      // 0 just after the section's top edge enters at the bottom, 1 once it nears the top third.
      const top = this.sections[i].el.getBoundingClientRect().top;
      const t = Math.min(1, Math.max(0, (vh * 0.9 - top) / (vh * 0.62)));
      if (t <= 0) break;
      const eased = t * t * (3 - 2 * t);
      mixStates(out, this.sections[i].state, eased, this.scratch);
      Object.assign(out, this.scratch);
      if (t > 0.5) phase = i;
    }
    return phase;
  }

  private frame = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.frame);
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const still = this.reducedMotion.matches;
    if (!still) this.time += dt;

    const phase = this.readScroll();
    const s = this.current;
    // Ease towards the target, except on the very first frame and for people
    // who asked for less motion: then the scene simply is where the scroll says.
    const k = !this.settled || still ? 1 : 1 - Math.exp(-dt * 5.5);
    mixStates(s, this.target, k, this.scratch);
    Object.assign(s, this.scratch);
    this.settled = true;

    // The page scrolls, the fields scroll with it (slower, like a far layer).
    const flyTarget = (window.scrollY / Math.max(this.height, 1)) * 1.6 + this.time * 0.06;
    this.fly += (flyTarget - this.fly) * k;

    // Spin freely, or settle on the nearest turn that puts Rome in front.
    if (!this.drag.active) {
      if (!still) this.spin += dt * 0.035 * (1 - s.lock);
      // Let go of the planet and it keeps turning for a moment, then settles.
      this.spin += this.drag.velocity;
      this.drag.velocity *= Math.exp(-dt * 3);
      this.drag.tilt *= Math.exp(-dt * 0.5);
    }
    const home = -ROME.lon * DEG;
    const locked = home + Math.round((this.spin - home) / (Math.PI * 2)) * Math.PI * 2;
    const spin = this.spin + (locked - this.spin) * s.lock;

    // A little parallax from the mouse.
    this.pointer.sx += (this.pointer.x - this.pointer.sx) * Math.min(1, dt * 3);
    this.pointer.sy += (this.pointer.y - this.pointer.sy) * Math.min(1, dt * 3);
    const sway = still ? 0 : 1;
    this.camera.position.set(this.pointer.sx * 0.2 * sway, -this.pointer.sy * 0.13 * sway, CAMERA_Z);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();

    // Globe: the front of the sphere always stays on the focus plane (z = 1).
    this.vCentre.set(s.gx, s.gy, 1 - s.gs);
    this.mBase
      .makeTranslation(s.gx, s.gy, 1 - s.gs)
      .multiply(this.mTmp.makeRotationZ(s.axial))
      .multiply(this.mTmp.makeRotationX(s.tilt + this.drag.tilt * (1 - s.lock)))
      .multiply(this.mTmp.makeScale(s.gs, s.gs, s.gs));
    this.mGlobe.copy(this.mBase).multiply(this.mTmp.makeRotationY(spin));

    // Ground: a plane the camera looks at from above, obliquely or along the horizon.
    this.mGround.makeTranslation(0, s.lift, CAMERA_Z - s.dist).multiply(this.mTmp.makeRotationX(s.pitch));

    const globe = 1 - s.morph;
    const u = this.dotsMaterial.uniforms;
    u.uMorph.value = s.morph;
    u.uDetail.value = s.detail;
    u.uFade.value = s.fade;
    u.uTime.value = this.time;
    u.uFly.value = this.fly;
    u.uTwinkle.value = still ? 0 : 1;

    // The dots under the cursor glow faintly; clicks and projects send ripples through them.
    this.mouse.on += ((this.mouse.seen && !still ? 1 : 0) - this.mouse.on) * Math.min(1, dt * 6);
    u.uMouse.value[0] += (this.mouse.x - u.uMouse.value[0]) * Math.min(1, dt * 14);
    u.uMouse.value[1] += (this.mouse.y - u.uMouse.value[1]) * Math.min(1, dt * 14);
    u.uMouseOn.value = this.mouse.on;
    this.ripple[2] += dt;
    if (this.frames++ % 6 === 0) this.readProjects();
    this.tintAmount += (this.tintTarget - this.tintAmount) * k;
    u.uTintAmount.value = this.tintAmount;

    this.body.matrix.copy(this.mBase);
    this.bodyMaterial.uniforms.uOpacity.value = Math.pow(globe, 1.5);
    this.body.visible = globe > 0.01;
    this.atmosphere.matrix.copy(this.mBase).multiply(this.mTmp.makeScale(1.16, 1.16, 1.16));
    this.atmosphereMaterial.uniforms.uOpacity.value = 0.55 * globe * globe;
    this.atmosphere.visible = globe > 0.01;
    this.graticule.matrix.copy(this.mGlobe);
    (this.graticule.material as LineBasicMaterial).opacity = 0.1 * globe * globe;
    this.graticule.visible = globe > 0.01;

    this.starsMaterial.uniforms.uTime.value = this.time;
    this.starsMaterial.uniforms.uTwinkle.value = still ? 0 : 1;
    this.starsMaterial.uniforms.uOpacity.value = 1 - s.morph * 0.9;
    this.stars.rotation.set(this.fly * 0.004, this.time * 0.004 + this.fly * 0.01, 0);

    this.bg.copy(SPACE).lerp(SOIL, s.morph);
    this.renderer.setClearColor(this.bg, 1);

    // Orbits and the satellites riding them.
    const rings = s.rings * globe;
    for (const o of this.orbits) {
      o.line.matrix.copy(this.mBase).multiply(o.local);
      (o.line.material as LineBasicMaterial).opacity = 0.34 * rings;
      o.line.visible = rings > 0.01;
      const a = o.phase + this.time * o.speed;
      this.vTmp.set(Math.cos(a) * o.radius, 0, Math.sin(a) * o.radius).applyMatrix4(o.line.matrix);
      this.place(o.label, this.vTmp, rings * (this.hiddenByGlobe(this.vTmp, s.gs) ? 0 : 1));
    }

    // Rome.
    this.vTmp.copy(this.romeUnit).applyMatrix4(this.mGlobe);
    const normal = this.vTmp.clone().sub(this.vCentre).normalize();
    const toCam = this.camera.position.clone().sub(this.vTmp).normalize();
    const facing = Math.min(1, Math.max(0, (normal.dot(toCam) - 0.08) / 0.3));
    this.place(this.dom.rome, this.vTmp, facing * globe * globe * Math.min(1, s.fade + 0.2));
    this.dom.rome.classList.toggle("is-near", s.detail > 0.5);
    this.dom.rome.classList.toggle("is-quiet", s.side < 0.5);

    this.renderer.render(this.scene, this.camera);
    this.caption(s, phase);
  };

  /** Is this point behind the planet, as seen from the camera? */
  private hiddenByGlobe(p: Vector3, radius: number) {
    const cam = this.camera.position;
    const dx = p.x - cam.x, dy = p.y - cam.y, dz = p.z - cam.z;
    const len = Math.hypot(dx, dy, dz);
    const ox = cam.x - this.vCentre.x, oy = cam.y - this.vCentre.y, oz = cam.z - this.vCentre.z;
    const b = (ox * dx + oy * dy + oz * dz) / len;
    const c = ox * ox + oy * oy + oz * oz - radius * radius;
    const disc = b * b - c;
    if (disc <= 0) return false;
    const hit = -b - Math.sqrt(disc);
    return hit > 0 && hit < len;
  }

  /** Pin a DOM label to a point in the scene. */
  private place(el: HTMLElement, world: Vector3, opacity: number) {
    const p = world.clone().project(this.camera);
    const visible = opacity > 0.02 && p.z < 1 && Math.abs(p.x) < 1.2 && Math.abs(p.y) < 1.2;
    el.style.opacity = visible ? opacity.toFixed(3) : "0";
    if (visible) {
      const x = (p.x * 0.5 + 0.5) * this.width;
      const y = (-p.y * 0.5 + 0.5) * this.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    }
  }

  private setText(key: string, el: HTMLElement, value: string) {
    if (this.hudCache[key] === value) return;
    this.hudCache[key] = value;
    el.textContent = value;
  }

  private caption(s: SceneState, phase: number) {
    const metres = Math.pow(10, s.altLog);
    const alt = metres >= 10000 ? `${(metres / 1000).toFixed(0)} km up` : metres >= 1000 ? `${(metres / 1000).toFixed(1)} km up` : metres >= 4 ? `${metres.toFixed(0)} m up` : "on the ground";
    this.setText("alt", this.dom.alt, alt);

    const key = this.sections[phase]?.el.dataset.scene;
    const index = Math.max(0, PHASES.findIndex((p) => p.key === key));
    this.setText("phase", this.dom.phase, PHASES[index].label);

    document.documentElement.style.setProperty("--side", s.side.toFixed(3));
  }
}
