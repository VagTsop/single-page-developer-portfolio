# Vagelis Tsopanos — Portfolio (React recreate)

A premium recreate of [vagtsop.dev](https://vagtsop.dev) built to showcase a modern stack.
The original vanilla HTML/CSS/JS site in the repo root is **untouched** — this lives in its own folder.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`, design tokens in `src/index.css`)
- **Framer Motion** — staggered reveals, animated glow blobs, count-up stats, layout-animated filter pill
- **lucide-react** for UI icons (brand icons are custom SVGs in `src/components/icons.tsx`)
- **@emailjs/browser** for the contact form

## Design system

Generated with the **ui-ux-pro-max** skill (`Modern Dark / cinematic glassmorphism`):

- Surfaces: deep slate `#0b0f1a` → `#131a2b` (never pure black)
- Brand: indigo `#6366f1` glow + cyan `#22d3ee`, green `#22c55e` for "live" status
- Type: **Space Grotesk** (display) · **Inter** (body) · **JetBrains Mono** (labels)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build -> dist/
npm run preview  # serve the production build
```

## Contact form (EmailJS)

Uses the same public EmailJS IDs as the original site by default. To override, create `.env`:

```
VITE_EMAILJS_SERVICE=service_xxx
VITE_EMAILJS_TEMPLATE=template_xxx
VITE_EMAILJS_KEY=your_public_key
```

## Content

Project data is in `src/data/projects.json` (ported from the original). Images, fonts, and CV
live in `public/assets/`.
