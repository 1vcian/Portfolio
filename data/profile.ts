// About + experience copy. `**double asterisks**` mark highlighted words.

export const about = {
  paragraphs: [
    "I'm Lucian, a software engineer with **5+ years building production systems for public institutions**. I care about code that actually ships and scales: GIS platforms, management systems, and machine-learning work on satellite imagery and LLMs, on projects for the **Italian Ministry of Agriculture** and **ESA**.",
    "It started at 12, poking at things with BackTrack to see how they break. That curiosity became a degree in **Computer and Automation Engineering** at Sapienza and a CTF team I co-founded, and it never switched off.",
    "My free time still goes where the fun is. I hunt bugs because I enjoy it: I've found and reported **a lot of vulnerabilities, several of them rated CVSS 10**. And I build the ideas I can't leave alone: games on the App Store and Google Play, open-source tools with their own communities, even an emulator.",
  ],
  facts: [
    { value: "5+ yrs", label: "building production systems for public institutions" },
    { value: "Bug hunter", label: "many vulnerabilities found in my free time, several of them rated CVSS 10" },
    { value: "€4M → €500/mo", label: "imagery costs, from 30 cm every three years to AI-upscaled updates every month" },
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
      "Building advanced agricultural software with the **Italian Ministry of Agriculture**.",
      "Managing and mentoring a team of **3 junior developers**, guiding them through software architecture.",
      "Independently developed the official [AGEA Vinitaly 2026](https://agea-vinitaly-2026.sian.it/) app, using **PMTiles** to show every plot of land in Italy.",
      "Found and introduced an AI pipeline on **Google Cloud Vertex AI** that generates **1 m satellite imagery from 10 m Sentinel-2** photos, cutting costs from about €4M to about **€500 a month**.",
    ],
  },
  {
    company: "Tiuke",
    role: "Full Stack Software Engineer",
    period: "Oct 2019 — Jun 2025",
    place: "Rome, Italy",
    points: [
      "Developed **5+ web and mobile applications** for the Italian Ministry of Agriculture, serving over **10,000 active users**.",
      "Refactored legacy monoliths into responsive web apps, cutting page load times by **40%**.",
      "Built automation tools for integrating mapping layers that made development **3× faster**.",
      "Wrote backend systems for automated report generation, saving about **15 hours of manual work a week**.",
      "Implemented specialised **LLM agents** for agricultural data extraction, reaching **95% accuracy**.",
      "Improved training of geospatial segmentation models, raising parcel detection precision by **20%**.",
      "Wrote batch pipelines that process **terabytes** of geospatial data, halving execution time.",
    ],
  },
];
