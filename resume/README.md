# Résumé

My CV, written in LaTeX, and the template it is built on.

| File | What it is | Published as |
| --- | --- | --- |
| `resume_eng.tex` | My CV, English | [`resume.pdf`](https://1vcian.me/Portfolio/resume.pdf) |
| `resume_it.tex` | My CV, Italian | [`resume_it.pdf`](https://1vcian.me/Portfolio/resume_it.pdf) |
| `template/resume_template.tex` | The same layout with placeholder content | [`resume-template.tex`](https://1vcian.me/Portfolio/resume-template.tex), [`.pdf`](https://1vcian.me/Portfolio/resume-template.pdf) |

## Use the template

One page, two columns, a single `.tex` file with no custom class. Free to use and adapt for your own résumé.

- **Overleaf:** [open it as a new project](https://www.overleaf.com/docs?snip_uri=https%3A%2F%2F1vcian.me%2FPortfolio%2Fresume-template.tex).
- **Locally:** download the file and run `pdflatex resume_template.tex` twice.

Then search the file for `EDIT`: every placeholder is marked, and each macro (`\experienceitem`, `\projectitem`,
`\rating`, `\hl`) has a comment explaining its arguments. If the page overflows, cut content before shrinking the
font.

A note from experience: sent as a cold application, this layout opened the door at Amazon and Google, and went
through every interview round at Google.

## How the PDFs are built

You never have to compile anything by hand. On every push to `main`, the deploy workflow compiles the three `.tex`
files with [latex-action](https://github.com/xu-cheng/latex-action) (full TeX Live), copies the PDFs into the site
and renders the first page of the English CV as the preview image shown on the portfolio. If LaTeX fails, the
deploy fails, so a broken résumé never goes live.

To preview a change before pushing:

```bash
npm run resume
```

That needs `pdflatex` plus a few packages a minimal TeX install does not include. The script tells you which ones
are missing; on BasicTeX or MacTeX they install with:

```bash
sudo tlmgr install fontawesome5 titlesec enumitem multirow
```
