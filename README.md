# Amrut Golani — Portfolio

Premium developer portfolio for **Amrut Golani**, .NET Full Stack Developer | ASP.NET Core Developer.

Built with React 19, Vite, Bootstrap 5, Framer Motion, and Lucide icons.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/     Reusable UI (Navbar, Footer, Buttons, ProjectCard, SkillCard, Timeline, …)
  sections/       Page sections (Hero, About, Experience, Skills, Projects, Education, …)
  data/           All CV content — edit these files to update the site
  hooks/          useTheme, useScrollSpy, useScrolled, useCopyToClipboard
  utils/          Motion variants, icon resolver, helpers
  styles/         Design tokens (dark/light) and global styles
  pages/          Home and 404
scripts/
  generate-resume.mjs   Builds public/resume/Amrut_Golani_Resume.pdf from src/data
```

## Updating content

All personal, experience, skills, project, and education content lives in `src/data/`.
Components never hard-code CV details.

### Resume PDF

`npm run resume` regenerates `public/resume/Amrut_Golani_Resume.pdf` from the data files.
You can also drop your official CV at that path — the site simply links to it.

### Availability badge

In `src/data/personal.js`, set `availability.configured = true` and edit `label` to
advertise availability. While `false`, a neutral location badge is shown instead.

### Contact form

Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to a Formspree/Getform/custom
endpoint accepting a JSON POST. Without it, the form opens the visitor's email client with a
pre-filled message — it never shows a fake "sent" confirmation.

### SEO / social preview

Title, description, Open Graph, Twitter card, and JSON-LD live in `index.html`.
Update the canonical / `og:url` values to your real domain before deploying.
`public/og-image.svg` is the share image; for the widest platform support, export it to a
1200×630 PNG and update the `og:image` / `twitter:image` meta tags.

## Deployment

This is a static site. Deploy `dist/` to Vercel, Netlify, GitHub Pages, or any static host.
Because React Router is used for the 404 page, configure the host to serve `index.html` for
unknown routes (SPA fallback).
