// Site-wide constants. Edit here, not in the components.

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a file from /public with the base path the site is served from. */
export const asset = (path: string) => `${base}${path.startsWith("/") ? path : `/${path}`}`;

export const site = {
  name: "Lucian Medrihan",
  role: "Software Engineer",
  location: "Rome, Italy",
  url: "https://1vcian.me/Portfolio/",
  email: "medrihanlucian@gmail.com",
  repo: "https://github.com/1vcian/Portfolio",
  /** Source of the `npx 1vcian` terminal card. */
  card: "https://github.com/1vcian/npx-card",
  description:
    "Software engineer in Rome. 5+ years building production systems, from satellite imagery pipelines to mobile games on the stores.",
  socials: {
    github: "https://github.com/1vcian",
    linkedin: "https://www.linkedin.com/in/lume/",
    instagram: "https://www.instagram.com/1vcian/",
  },
  resume: {
    en: asset("/resume.pdf"),
    it: asset("/resume_it.pdf"),
    preview: asset("/resume-preview.png"),
    template: {
      tex: asset("/resume-template.tex"),
      pdf: asset("/resume-template.pdf"),
      // Overleaf opens any public .tex as a new project.
      overleaf: `https://www.overleaf.com/docs?snip_uri=${encodeURIComponent("https://1vcian.me/Portfolio/resume-template.tex")}`,
      source: "https://github.com/1vcian/Portfolio/tree/main/resume",
    },
  },
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];
