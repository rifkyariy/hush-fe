
# Hush IIoT Digital Nursery – Frontend

Hush is an Industrial IoT (IIoT) system for Neonatal Intensive Care Units (NICU), providing 24/7 AI-powered monitoring and analytics for newborns. This frontend is built with **Next.js (App Router)**, **React 19**, **Tailwind CSS 4**, and **TypeScript**. It delivers a modern, glassmorphism-inspired UI for real-time visualization of infant health, system architecture, and business goals.

## Features
- **Hero Section:** Glassmorphism hero with animated stats and video background.
- **Problem & Solution:** Highlights NICU pain points and the Hush ecosystem (smart bracelet, baby box, edge/cloud AI).
- **Architecture:** Visualizes the 4-layer system (Perception, Network, Middleware, Application) with hardware and protocols.
- **Business Goals:** Outlines objectives for safety, efficiency, and centralized care.
- **Responsive Design:** Custom typography (Space Grotesk, IBM Plex Sans) and mobile-first layout.
- **Extensible:** Modular components for easy feature expansion.

## Tech Stack
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
- `app/page.tsx` – Main landing page with hero, problem, solution, architecture, and goals sections.
- `app/layout.tsx` – Root layout, metadata, and font setup.
- `app/globals.css` – Global styles, gradients, and glassmorphism helpers.
- `tailwind.config.ts` – Tailwind content paths and custom color palette.
- `next.config.ts` – Remote image domains for placeholder assets.
- `app/lib/content.ts` – Product content, architecture, and business logic.

## Product Overview

**Hush** is designed for NICU environments:
- **Continuous Monitoring:** 24/7 IoT-based coverage for critical newborn intervention.
- **Smart Devices:** Wearable smart bracelet and baby box with medical-grade sensors.
- **Edge & Cloud AI:** Real-time anomaly detection and analytics using TFLite, Next.js, and NestJS.
- **Business Goals:** Enhance infant safety, reduce nurse workload, and enable centralized neonatal care.

## Deployment
Deploy on Vercel, Netlify, or any Node.js server. Ensure outbound requests to remote image domains (e.g., Unsplash) are allowed.

---

Built with ❤️ by the Hush team to advance neonatal care with open, maintainable technology.
