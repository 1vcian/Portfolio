// Every project on the site. To add one, append an object to `featured` (big
// row with media) or `more` (compact card). `**double asterisks**` highlight.

export type Tone = "live" | "active" | "wip" | "done";

export type Fx = "radio" | "tiles" | "orbit" | "moon" | "forge" | "scan" | "checks" | "satellite" | "wine" | "fix";

export type Links = {
  live?: string;
  github?: string;
  appStore?: string;
  playStore?: string;
};

export type Media =
  | { type: "wide"; src: string; alt: string }
  | { type: "phones"; srcs: string[]; alt: string }
  | { type: "milestones"; items: { id: string; label: string; state: "done" | "next" | "todo" }[] };

export type Project = {
  slug: string;
  title: string;
  /** Small line above the title: what kind of thing this is. */
  kicker: string;
  status: { label: string; tone: Tone };
  paragraphs: string[];
  tags: string[];
  links: Links;
  /** Colour the dotted backdrop takes while this project is on screen. */
  tint: string;
  /** The little themed animation that plays as the project scrolls by. */
  fx: Fx;
  /** Short facts shown as a row of figures. */
  figures?: { value: string; label: string }[];
  media: Media;
};

export type SmallProject = {
  slug: string;
  title: string;
  kicker: string;
  text: string;
  tags: string[];
  links: Links;
  image: string;
};

export const featured: Project[] = [
  {
    slug: "brucia",
    tint: "#ff6a2b",
    fx: "radio",
    title: "Brucia",
    kicker: "Open source · Security research",
    status: { label: "Active · v0.1.15", tone: "active" },
    paragraphs: [
      "**A €50 board and the phone in your pocket, turned into a full security-research kit.** A Flipper Zero costs around €200; Brucia takes another route. A LilyGO T-Embed CC1101 handles the radios, and the phone you already own brings the compute, the storage, the GPS and the screen.",
      "**On paper the gap is wide.** A Flipper Zero runs on a 64 MHz microcontroller with 256 KB of RAM and needs an add-on board for Wi-Fi. The T-Embed alone has a dual-core 240 MHz ESP32-S3, **8 MB of RAM (32 times as much)** and Wi-Fi and Bluetooth built in. Then the heavy computing leaves the board altogether, for the phone's multi-core, gigahertz-class CPU and its gigabytes of memory.",
      "**The phone is the brain, the ESP32 is the antenna.** That is what makes room for **WPA/WPA2 dictionary checks**, a lab **HTTP/HTTPS inspection proxy**, **GPS wardriving** with WiGLE, KML and GPX export, **PCAP analysis** and an audio/DSP lab, while the board does what it is good at (Wi-Fi, BLE, Sub-GHz, infrared, NFC) over one USB cable.",
      "A native Kotlin app on top of Bruce-derived firmware, for authorized testing only. Every release ships a web flasher, a wiki and prebuilt firmware for dozens of boards.",
    ],
    figures: [
      { value: "≈ €50", label: "of hardware, plus your phone" },
      { value: "32×", label: "a Flipper Zero's RAM, on the board alone" },
      { value: "1,200", label: "automated tests in the app" },
    ],
    tags: ["Kotlin", "Jetpack Compose", "C++ on ESP32", "PlatformIO", "AGPL-3.0"],
    links: { live: "https://1vcian.me/Brucia/", github: "https://github.com/1vcian/Brucia" },
    media: {
      type: "phones",
      srcs: ["/projects/brucia-home.webp", "/projects/brucia-crack.webp", "/projects/brucia-mitm.webp"],
      alt: "Brucia Android app: tool categories, WPA dictionary screen and inspection proxy",
    },
  },
  {
    slug: "parolix",
    tint: "#f4d58d",
    fx: "tiles",
    title: "Parolix",
    kicker: "iOS & Android · Word game",
    status: { label: "On the stores", tone: "live" },
    paragraphs: [
      "A **vintage-newspaper word puzzle in 17 languages**: daily riddles, endless runs, 25 collectable editions and one world leaderboard with weekly prizes. Under the hood the backend is built to cost next to nothing: cloud saves are **signed with SHA-256** in a 10-slot ring at one read and one write per session, and the leaderboard is **static JSON that CI rebuilds every hour**, so reading it never touches the database.",
      "It also **markets itself**. A GitHub Actions pipeline scripts an episode, plays it in headless Chromium on virtual time (frame-perfect 60 fps on a runner with no GPU), edits it with ffmpeg and schedules it on **YouTube Shorts** at each language's peak hour. **100+ Shorts published** so far, hands-off.",
    ],
    figures: [
      { value: "17", label: "languages" },
      { value: "100+", label: "auto-published Shorts" },
    ],
    tags: ["React 19", "TypeScript", "Capacitor", "Firebase", "Playwright", "GitHub Actions"],
    links: {
      live: "https://1vcian.me/parolix/",
      appStore: "https://apps.apple.com/app/id6789910035",
      playStore: "https://play.google.com/store/apps/details?id=app.parolix.lucian",
    },
    media: {
      type: "phones",
      srcs: ["/projects/parolix-home.webp", "/projects/parolix-game.webp", "/projects/parolix-upgrades.webp"],
      alt: "Parolix: home screen, a game in progress and the editions shop",
    },
  },
  {
    slug: "imcenter",
    tint: "#6f7dff",
    fx: "orbit",
    title: "im.center",
    kicker: "Live product · Link-in-bio, ranked",
    status: { label: "Live", tone: "live" },
    paragraphs: [
      "**A link-in-bio page that is also a game.** Every profile is a fast page for your links at `im.center/handle`, and every profile sits on a public leaderboard where rank is openly bought, not earned. The highest total is the centre: its photo becomes the sun of the home page, each tag has a centre of its own, and a hall of fame remembers them all.",
      "It is engineered to run on **Cloudflare's free tier**: pages are pre-rendered snapshots in R2 behind the edge cache, rebuilt in cost-budgeted chunks that stay under a Worker's 10 ms of CPU. Around that sit **Stripe payments** with automated dispute evidence, cookieless stats, usage alerts over Telegram, and backups with restore drills.",
    ],
    figures: [
      { value: "€2", label: "once, for a page" },
      { value: "10 ms", label: "CPU budget per request" },
    ],
    tags: ["Cloudflare Workers", "Hono", "D1", "R2", "Stripe", "three.js", "TypeScript"],
    links: { live: "https://im.center/" },
    media: { type: "wide", src: "/projects/imcenter.webp", alt: "im.center home page: the current centre orbiting at the middle of the leaderboard" },
  },
  {
    slug: "wolfmafia",
    tint: "#c77dff",
    fx: "moon",
    title: "Wolf & Mafia",
    kicker: "iOS & Android · Party game",
    status: { label: "On the stores", tone: "live" },
    paragraphs: [
      "A **100% offline** social deduction game (Mafia, Werewolf, Lupus in Tabula) built from scratch, with **36 unique roles** and a fully guided narrator.",
      "The whole game runs on a **deterministic, seed-based state generator**: no server, no connection. Players join by **scanning a QR code**, with rollback and automatic polling so a group can play anywhere.",
    ],
    figures: [
      { value: "36", label: "unique roles" },
      { value: "0", label: "servers needed" },
    ],
    tags: ["iOS", "Android", "Offline multiplayer", "QR connect", "Game dev"],
    links: {
      live: "https://wolfmafia.app/",
      appStore: "https://apps.apple.com/us/app/wolf-mafia/id6756895478",
      playStore: "https://play.google.com/store/apps/details?id=app.wolfmafia.lucian",
    },
    media: { type: "wide", src: "/projects/wolfmafia.webp", alt: "Wolf & Mafia landing page" },
  },
  {
    slug: "fm",
    tint: "#ffb347",
    fx: "forge",
    title: "Forge Master Calculator & Wiki",
    kicker: "Open source · Community tool",
    status: { label: "Active · ★ 21", tone: "active" },
    paragraphs: [
      "The companion the Forge Master community plans its builds with: simulate every battle, compare setups, look up anything in the game. Built and maintained for the players, who send bug reports, game data and pull requests back.",
      "Nothing in it is a guess, and nothing is typed in by hand. **Every time the game ships a new version, the app updates itself**: the new config files are parsed and every calculator, simulator and wiki page follows, 29 versions so far. Battles run on a **combat engine rebuilt from the game's compiled code**: timings, collisions, skills, projectiles and damage formulas. Searches run in web workers, and screenshots are read on-device with Tesseract and an ONNX model.",
    ],
    figures: [
      { value: "29", label: "game versions followed automatically" },
      { value: "1 engine", label: "for quests, dungeons and PvP" },
      { value: "16 forks", label: "from the community" },
    ],
    tags: ["React", "TypeScript", "Vite", "Web Workers", "ONNX", "Reverse engineering"],
    links: { live: "https://1vcian.me/fm", github: "https://github.com/1vcian/fm" },
    media: { type: "wide", src: "/projects/fm.webp", alt: "Forge Master Calculator: preset builds ranked in an arena tournament" },
  },
  {
    slug: "cardscanner",
    tint: "#6fb6ff",
    fx: "scan",
    title: "Card Scanner",
    kicker: "Open source · Computer vision",
    status: { label: "Done · ★ 66", tone: "done" },
    paragraphs: [
      "An **AI card recognition system** for Pokémon TCG Pocket that identifies cards from an image and keeps working with **every new set, no retraining**. It runs entirely client-side in **under 10 MB**, combining an OBB detection model with custom perceptual image matching.",
      "It became the core scanner of the popular open-source [TCG Pocket Collection Tracker](https://github.com/marcelpanse/tcg-pocket-collection-tracker) (★ 160+), and it kept travelling: developers of other apps have written to tell me they built the same solution into theirs.",
    ],
    figures: [
      { value: "< 10 MB", label: "all in the browser" },
      { value: "0", label: "retraining for new sets" },
    ],
    tags: ["Computer vision", "OBB model", "Client-side AI", "TypeScript"],
    links: {
      live: "https://1vcian.github.io/Pokemon-TCGP-Card-Scanner/",
      github: "https://github.com/1vcian/Pokemon-TCGP-Card-Scanner",
    },
    media: { type: "wide", src: "/projects/cardscanner.webp", alt: "Card Scanner detecting Pokémon cards in a screenshot" },
  },
  {
    slug: "vetro",
    tint: "#63dc9c",
    fx: "checks",
    title: "Vetro",
    kicker: "Source-available · Emulation",
    status: { label: "Work in progress", tone: "wip" },
    paragraphs: [
      "The goal: a **complete ARM64 Android system emulated inside a browser tab**, with an analysis layer that sees everything apps do from the outside. No install, no root, no server.",
      "Android doesn't boot yet. What runs today is the foundation: an AArch64 CPU emulator in **Rust compiled to WebAssembly**, with a block JIT that emits WASM. It **boots Linux 6.18 to an interactive shell** in the browser with a boot log identical to QEMU's, and matches `qemu-aarch64` on 355 LTP syscall tests in CI. Android is the next milestone.",
    ],
    tags: ["Rust", "WebAssembly", "AArch64", "JIT", "Linux kernel"],
    links: { live: "https://1vcian.me/Vetro/", github: "https://github.com/1vcian/Vetro" },
    media: {
      type: "milestones",
      items: [
        { id: "M0", label: "Scaffolding and QEMU oracle", state: "done" },
        { id: "M1", label: "AArch64 CPU interpreter", state: "done" },
        { id: "M2", label: "Linux user-mode syscalls", state: "done" },
        { id: "M3", label: "System mode, kernel boot", state: "done" },
        { id: "M4", label: "JIT to WebAssembly", state: "done" },
        { id: "M5", label: "Android boots", state: "next" },
        { id: "M6", label: "Snapshots and APK install", state: "todo" },
        { id: "M7", label: "Network analysis and timeline", state: "todo" },
        { id: "M8", label: "Binder and privacy", state: "todo" },
        { id: "M9", label: "Code tracing and scripting", state: "todo" },
        { id: "M10", label: "Record & replay, 1.0", state: "todo" },
      ],
    },
  },
  {
    slug: "egnss",
    tint: "#58c4ff",
    fx: "fix",
    title: "EGNSS Capacitor",
    kicker: "Open source · Capacitor plugin",
    status: { label: "Done", tone: "done" },
    paragraphs: [
      "**For apps where the position is evidence, not just a blue dot.** A phone's location can be several metres off, and it can be spoofed. This plugin gives a Capacitor app one JavaScript API, identical on Android, iOS and Chromium browsers, that says where you are, **where the fix came from** and **how far you can trust it**.",
      "**From 5 metres to 1 centimetre.** On its own a phone is good to about 5 m under open sky. The plugin builds on EGNSS4ALL, the EU's open-source app for geotagged photos in agriculture: it adds Galileo's **OSNMA** (signals authenticated as really coming from the satellites), **EGNOS** corrections, which bring a receiver to about **1 m**, and EGNSS4ALL's convex-hull averaging to steady the fix. And when that is not enough it reads an **external Bluetooth antenna** instead: with an RTK receiver such as a u-blox ZED-F9P the same API returns fixes at about **1 cm**.",
      "Every fix carries its `source`, an `integrityLevel` and the OSNMA status, so the app never branches on the platform. It comes with a demo app: an OpenLayers map on satellite imagery, antenna pairing, and tap to take a geotagged photo.",
    ],
    figures: [
      { value: "5 m → 1 cm", label: "phone alone vs RTK antenna" },
      { value: "1 API", label: "Android, iOS and web" },
      { value: "4", label: "trust levels on every fix" },
    ],
    tags: ["Capacitor", "GNSS", "Galileo OSNMA", "EGNOS", "Bluetooth LE", "OpenLayers"],
    links: { live: "https://1vcian.me/egnss-capacitor/", github: "https://github.com/1vcian/egnss-capacitor" },
    media: { type: "wide", src: "/projects/egnss.webp", alt: "EGNSS Capacitor demo app: a position fix on a satellite map" },
  },
  {
    slug: "sentinel",
    tint: "#d9b27c",
    fx: "satellite",
    title: "AI Sentinel Image Pipeline",
    kicker: "At work · Satellite imagery",
    status: { label: "Done", tone: "done" },
    paragraphs: [
      "An **AI super-resolution pipeline** on Google Cloud Vertex AI that upscales 10 m Sentinel-2 photos to **1 m resolution**. I found the approach and brought it into the company.",
      "It took operational costs from about **€4M** (30 cm imagery, once every three years) down to about **€500 a month**, so users get high-quality, updated imagery every single month.",
    ],
    figures: [
      { value: "10 m → 1 m", label: "ground resolution" },
      { value: "≈ €500/mo", label: "instead of ≈ €4M per cycle" },
    ],
    tags: ["AI super-resolution", "Google Vertex AI", "Sentinel-2", "Python"],
    links: {},
    media: { type: "wide", src: "/projects/sentinel.webp", alt: "Satellite image before and after AI super-resolution" },
  },
  {
    slug: "vinitaly",
    tint: "#f0668a",
    fx: "wine",
    title: "Vinitaly 2026",
    kicker: "At work · Geospatial",
    status: { label: "Live", tone: "live" },
    paragraphs: [
      "A web application made for **Vinitaly 2026**, which I developed independently.",
      "It uses **PMTiles** to visualise an enormous geospatial dataset, rendering every agricultural plot of land across Italy with high performance.",
    ],
    tags: ["Geospatial", "PMTiles", "React"],
    links: {},
    media: { type: "wide", src: "/projects/vinitaly.webp", alt: "Vinitaly 2026 map of Italian agricultural parcels" },
  },
];

export const more: SmallProject[] = [
  {
    slug: "notex",
    title: "Notex",
    kicker: "Progressive web app",
    text: "A zero-dependency PWA Markdown editor. Notes live locally and are shared with no login: the compressed note is encoded straight into the link.",
    tags: ["PWA", "Markdown-it", "Deflate"],
    links: { live: "https://1vcian.me/notex/", github: "https://github.com/1vcian/notex" },
    image: "/projects/notex.webp",
  },
  {
    slug: "eatventure",
    title: "Eatventure Loot Predictor",
    kicker: "Reverse engineering",
    text: "Unity's RNG reverse-engineered in JavaScript, with optimised DFS searches, for a game with 10M+ installs: any high-tier item in fewer than 5 chests instead of about 200.",
    tags: ["RNG", "DFS", "Game tool"],
    links: { live: "https://eatventure-loot-predictor.vercel.app/", github: "https://github.com/1vcian/eatventure-vercel" },
    image: "/projects/eatventure.webp",
  },
  {
    slug: "amazon-bot",
    title: "Amazon Prismatic Bot",
    kicker: "Telegram automation",
    text: "A Node.js bot that watches Amazon listings for Pokémon TCG Prismatic Evolutions and alerts subscribers the moment something is listed, repriced or back in stock.",
    tags: ["Node.js", "Telegram API", "Jina AI Reader"],
    links: { github: "https://github.com/1vcian/Amazon-Prismatic-Bot" },
    image: "/projects/amazon_bot.webp",
  },
  {
    slug: "common-cast",
    title: "Common Cast",
    kicker: "Web app",
    text: "Finds the actors two movies or shows have in common, for every time a face looks familiar and you can't place it.",
    tags: ["React", "API"],
    links: { live: "https://1vcian.github.io/Common-Cast/", github: "https://github.com/1vcian/Common-Cast" },
    image: "/projects/cast.webp",
  },
  {
    slug: "openlayers",
    title: "OpenLayers Webapps",
    kicker: "At work · GIS",
    text: "Full-stack applications that manage feature layers and attributes, with massive batch processing of geographic data.",
    tags: ["GeoServer", "Angular", "SQL", "GeoPandas", "LLM", "SAM"],
    links: {},
    image: "/projects/geo.webp",
  },
  {
    slug: "univercity",
    title: "UniverCity",
    kicker: "Google Workshop winner",
    text: "A note-sharing platform for university students with intelligent ranking and automatic mashups of the best notes. Presented at Google's offices in Tel Aviv.",
    tags: ["Flutter", "Node.js", "AWS"],
    links: { github: "https://github.com/davidedc97/UniverCity" },
    image: "/projects/univercity.webp",
  },
  {
    slug: "smarthouse",
    title: "Smart House",
    kicker: "Embedded",
    text: "Home automation on an Arduino MEGA2560: 8 PWM outputs, 8 ADC inputs, a custom shell and SSH access from a phone.",
    tags: ["Arduino", "C", "PWM", "SSH"],
    links: { github: "https://github.com/LNPacio/ProgettoOS" },
    image: "/projects/smarthouse.webp",
  },
  {
    slug: "hackappatoi",
    title: "Hackappatoi",
    kicker: "CTF team",
    text: "Sapienza's ethical hacking team, which I co-founded. Reverse engineering, web exploitation and forensics in international CTFs, with write-ups of the best solves.",
    tags: ["CTF", "Reverse engineering", "Web", "Forensics"],
    links: { live: "https://hackappatoi.github.io/" },
    image: "/projects/hackappatoi.webp",
  },
];
