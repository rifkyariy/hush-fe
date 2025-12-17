## Extropic.ai Marketing Clone

This project recreates the [Extropic.ai](https://extropic.ai/) marketing site using **Next.js (App Router)** and **Tailwind CSS** with a glassmorphism-inspired visual system. It focuses on replicating the hero experience, hardware/software sections, media highlights, and call-to-action blocks while remaining deployable out of the box.

### Key Features
- Glassmorphism hero with layered gradients, animated glow ring, and stats cards mirroring the original site.
- Hardware, software, media, and writing sections laid out similarly to Extropic.ai, using remote placeholder imagery where first-party assets were unavailable.
- Responsive layout with custom typography (Space Grotesk + IBM Plex Sans) set up via `next/font`.
- Tailwind utility extensions for Extropic-specific color palette and gradients.

### Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Getting Started

1. **Install dependencies**
	```bash
	npm install
	```

2. **Run the development server**
	```bash
	npm run dev
	```
	Visit [http://localhost:3000](http://localhost:3000) to preview the site.

3. **Create a production build**
	```bash
	npm run build
	npm run start
	```

## Project Structure
- `app/page.tsx` – Main landing page with all sections.
- `app/layout.tsx` – Root layout, metadata, and global font wiring.
- `app/globals.css` – Global gradient background, glassmorphism helpers, and base styles.
- `tailwind.config.ts` – Tailwind content paths and Extropic color palette.
- `next.config.ts` – Remote image domains for placeholder assets.

## Known Visual Differences
- Proprietary images, videos, and SVG assets from Extropic.ai are replaced with royalty-free placeholders (Unsplash) and text treatments.
- Interactions are limited to hover states and basic transitions; advanced scrolling effects from the original site are not replicated.

## Troubleshooting Log
- **Tailwind @apply / @theme parser errors**: Initial attempt to reuse Tailwind-specific at-rules (`@apply`, `@theme inline`) caused lint errors with the Tailwind v4 PostCSS pipeline. Resolved by hand-authoring the glassmorphism helpers in vanilla CSS (`.glass-panel`, `.glow-ring`) and removing unsupported at-rules.
- **Stale `.next` build output**: `create-next-app` left a `.next` directory in the project root. Removed it to keep the workspace clean and avoid committing compiled artifacts.

No runtime errors are currently observed with `npm run dev` or `npm run build` after applying the fixes above.

## Deployment
Deploy using your preferred Next.js hosting (Vercel, Netlify, custom Node server). Ensure the environment allows outbound requests to remote image domains (`images.unsplash.com`, `extropic.ai`, `cdn.pixabay.com`).

---

Built with ❤️ to mirror Extropic.ai's brand while keeping the implementation open and maintainable.
