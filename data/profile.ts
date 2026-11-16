// About + experience copy. `**double asterisks**` mark highlighted words.

export const about = {
  paragraphs: [
    "I'm Lucian, a software engineer with **5+ years building production systems**: GIS platforms, management systems, and machine-learning work on satellite imagery and LLMs.",
    "It started at 12, poking at things with BackTrack to see how they break. That curiosity became a degree in **Computer and Automation Engineering** at Sapienza and a CTF team I co-founded, and it never switched off.",
    "My free time still goes where the fun is. I do bug bounty because I enjoy it, with **findings rated up to CVSS 10.0**, reported privately and on other platforms, and these days on [CyberDart](https://cyberdart.eu/hackers/0bee51c0-609f-4b44-ace4-2cae56bddd91). And I build the ideas I can't leave alone: [games on the App Store and Google Play](#parolix), [open-source tools with their own communities](#cardscanner), even [an emulator](#vetro).",
  ],
  facts: [
    { value: "5+ yrs", label: "building GIS and AI systems that run in production" },
    { value: "Bug hunter", label: "bug bounty in my free time, with findings up to CVSS 10.0, reported privately and on other platforms; now active on [CyberDart](https://cyberdart.eu/hackers/0bee51c0-609f-4b44-ace4-2cae56bddd91)" },
    { value: "Every month", label: "fresh 1 m satellite imagery for ≈ €500, instead of a 30 cm orthophoto every three years (≈ €4M)" },
    { value: "Google Workshop", label: "winner with UniverCity, presented at Google Tel Aviv" },
  ],
  stack: [
    { title: "Day to day", items: ["Python", "FastAPI", "Flask", "Node.js", "React", "Angular", "TypeScript", "Tailwind CSS", "OpenLayers", "GeoPandas"] },
    { title: "Infrastructure & AI", items: ["AWS", "Google Cloud Vertex AI", "Docker", "Linux", "LLM agents", "Image segmentation"] },
    { title: "In side projects", items: ["Kotlin + Compose", "Rust → WebAssembly", "C++ on ESP32", "Capacitor", "Firebase", "GitHub Actions"] },
  ],
};

export type Job = {
  company: string;
  role: string;
  period: string;
  place: string;
  points: string[];
};

export const jobs: Job[] = [
  {
    company: "PR.EL.CART. Europe Engineering",
    role: "Software Engineer",
    period: "Jun 2025 — Present",
    place: "Rome, Italy",
    points: [
      "Built **management systems for logistics and plant maintenance**, integrating **SCADA** sensor data into a **24/7 control room** that monitors production and transport.",
      "Leading **3 junior developers**: code reviews, technical guidance on architecture, and planning and delegating the work.",
      "Independently developed a web app for **Vinitaly 2026**, using **PMTiles** to show every plot of land in Italy.",
      "Built a pipeline on **Google Cloud Vertex AI** that selects the best Sentinel-2 scenes **every month** and upscales them to **1 m** with a super-resolution model: monthly imagery for about **€500**, instead of a 30 cm orthophoto every three years (about €4M per cycle).",
    ],
  },
  {
    company: "Tiuke",
    role: "Software Engineer",
    period: "Oct 2019 — Jun 2025",
    place: "Rome, Italy",
    points: [
      "Developed **5+ web and mobile applications** for agriculture, serving over **10,000 active users**.",
      "Implemented specialised **LLM agents** for agricultural data extraction, reaching **95% accuracy** on held-out validation data.",
      "Improved training of geospatial segmentation models, raising parcel detection precision by **20%** on validation data.",
      "Wrote batch pipelines that process **terabytes** of geospatial data, halving execution time.",
    ],
  },
];
