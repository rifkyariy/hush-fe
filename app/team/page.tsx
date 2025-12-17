"use client";

import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import TeamSection from "../components/TeamSection";
import SiteFooter from "../components/SiteFooter";
import Preloader from "../components/Preloader";

import {
  navigation as navData,
  teamMembers,
  teamSectionTitle,
} from "../lib/content";
import { useHashScroll } from "../lib/hooks/useHashScroll";

const principles = [
  {
    title: "Clinical empathy",
    body: "We build alongside neonatologists, translating bedside rituals into ambient intelligence.",
  },
  {
    title: "Systems rigor",
    body: "Fog, firmware, and frontends are engineered together so every alert is trusted.",
  },
  {
    title: "Long arc vision",
    body: "Each release compounds into a Taiwan-wide neonatal nervous system by 2050.",
  },
];

export default function TeamPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  useHashScroll(!isLoading);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`relative flex min-h-screen flex-col bg-ember-900 text-white ${isLoading ? "hidden" : ""}`}>
        <NavigationBar
          navigation={Array.isArray(navData) ? navData : []}
        />
        <main className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 pb-28 pt-32">
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#0b1728] via-[#040b15] to-[#0b1728] p-10 shadow-2xl backdrop-blur-2xl">
            <div className="absolute -left-10 top-8 h-56 w-56 rounded-full bg-gild-400/20 blur-3xl" />
            <div className="absolute right-[-40px] bottom-[-40px] h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-gild-200">Hush Collective</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  A multidisciplinary team turning neonatal sensing into calm decisions.
                </h1>
                <p className="text-base text-white/70 leading-relaxed">
                  Firmware tacticians, cry linguists, and cloud engineers work in the same sprint room so NICU teams get a unified signal instead of noise.
                </p>
              </div>
              <div className="grid w-full max-w-md grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Disciplines</p>
                  <p className="text-3xl font-bold text-white">4</p>
                  <p className="text-white/60 text-xs">AI · Hardware · Cloud · Clinical</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Pilots</p>
                  <p className="text-3xl font-bold text-gild-200">7</p>
                  <p className="text-white/60 text-xs">Across Taipei & Taichung</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Languages</p>
                  <p className="text-3xl font-bold text-white">5</p>
                  <p className="text-white/60 text-xs">English · Mandarin · Bahasa</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">Coverage goal</p>
                  <p className="text-2xl font-semibold text-white">2050</p>
                  <p className="text-white/60 text-xs">All Taiwan NICUs</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="rounded-3xl border border-white/10 bg-white/8 backdrop-blur-lg p-6 shadow-md shadow-black/20">
                <p className="text-xs uppercase tracking-[0.35em] text-gild-200">Principle</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{principle.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{principle.body}</p>
              </div>
            ))}
          </section>

          <TeamSection title={teamSectionTitle} members={teamMembers} variant="bento" />

          <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 shadow-lg shadow-black/30">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Join the mission</p>
                <h2 className="mt-3 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  We partner with clinicians, founders, and makers obsessed with neonatal calm.
                </h2>
                <p className="mt-3 text-sm text-white/70">
                  Tell us how you want to plug in—pilots, research, firmware, or manufacturing. We assemble bespoke squads for every hospital network.
                </p>
              </div>
              <a href="mailto:contact@hush.care" className="cta-smooth inline-flex items-center justify-center rounded-full bg-white text-[#0b1626] px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] hover:bg-gild-200 transition-colors">
                Email the team
              </a>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
