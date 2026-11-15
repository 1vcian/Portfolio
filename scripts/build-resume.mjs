// Builds the résumé PDFs from the LaTeX sources in resume/ and publishes
// everything the site links to into public/.
//
//   npm run resume                        compile with LaTeX, then publish
//   node scripts/build-resume.mjs --collect     publish PDFs that are already built (CI)
//   node scripts/build-resume.mjs --copy-only   only copy the .tex sources (no LaTeX needed)
//
// On every push GitHub Actions does the compiling (see .github/workflows/deploy.yml),
// so you only need LaTeX on your machine if you want to preview a change locally.

import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const at = (p) => path.join(root, p);

// source .tex → where its PDF and its .tex are published
const documents = [
  { src: "resume/resume_eng.tex", pdf: "public/resume.pdf", tex: "public/resume_eng.tex" },
  { src: "resume/resume_it.tex", pdf: "public/resume_it.pdf", tex: "public/resume_it.tex" },
  { src: "resume/template/resume_template.tex", pdf: "public/resume-template.pdf", tex: "public/resume-template.tex" },
];
const preview = { from: "public/resume.pdf", to: "public/resume-preview.png" };
const required = ["extarticle.cls", "fontawesome5.sty", "titlesec.sty", "enumitem.sty", "multirow.sty", "tikz.sty", "lmodern.sty"];

const mode = process.argv.includes("--copy-only") ? "copy" : process.argv.includes("--collect") ? "collect" : "compile";
const has = (cmd) => !spawnSync(cmd, ["--version"], { stdio: "ignore" }).error;
const builtPdf = (doc) => at(doc.src.replace(/\.tex$/, ".pdf"));

mkdirSync(at("public"), { recursive: true });

for (const doc of documents) copyFileSync(at(doc.src), at(doc.tex));
if (mode === "copy") process.exit(0);

if (mode === "compile") {
  if (!has("pdflatex")) {
    console.error("pdflatex not found. Install TeX Live (or MacTeX), or just push: GitHub Actions compiles the résumé for you.");
    process.exit(1);
  }
  const missing = required.filter((file) => spawnSync("kpsewhich", [file], { encoding: "utf8" }).stdout.trim() === "");
  if (missing.length) {
    const packages = { "extarticle.cls": "extsizes", "fontawesome5.sty": "fontawesome5", "titlesec.sty": "titlesec", "enumitem.sty": "enumitem", "multirow.sty": "multirow", "tikz.sty": "pgf", "lmodern.sty": "lm" };
    console.error(`Missing LaTeX packages: ${missing.join(", ")}`);
    console.error(`Install them with:  sudo tlmgr install ${missing.map((m) => packages[m]).join(" ")}`);
    process.exit(1);
  }

  const latexmk = has("latexmk");
  for (const doc of documents) {
    const dir = path.dirname(at(doc.src));
    const file = path.basename(doc.src);
    const flags = ["-interaction=nonstopmode", "-halt-on-error", "-file-line-error"];
    console.log(`compiling ${doc.src}`);
    try {
      if (latexmk) execFileSync("latexmk", ["-pdf", ...flags, file], { cwd: dir, stdio: "pipe" });
      else for (let pass = 0; pass < 2; pass++) execFileSync("pdflatex", [...flags, file], { cwd: dir, stdio: "pipe" });
    } catch (err) {
      const log = `${err.stdout ?? ""}`;
      console.error(log.split("\n").filter((line) => /^!|\.tex:\d+:/.test(line)).slice(0, 12).join("\n") || log.slice(-2000));
      console.error(`\nLaTeX failed on ${doc.src} (full log: ${doc.src.replace(/\.tex$/, ".log")})`);
      process.exit(1);
    }
  }
}

for (const doc of documents) {
  if (!existsSync(builtPdf(doc))) {
    console.error(`${path.relative(root, builtPdf(doc))} is missing: compile ${doc.src} first.`);
    process.exit(1);
  }
  copyFileSync(builtPdf(doc), at(doc.pdf));
  console.log(`published ${doc.pdf}`);
}

// First page of the résumé as an image, for the preview on the site.
if (has("pdftoppm")) {
  const base = at(preview.to).replace(/\.png$/, "");
  rmSync(at(preview.to), { force: true });
  execFileSync("pdftoppm", ["-r", "100", "-png", "-singlefile", at(preview.from), base]);
  console.log(`published ${preview.to}`);
} else {
  console.warn("pdftoppm not found (poppler): keeping the existing résumé preview image.");
}
