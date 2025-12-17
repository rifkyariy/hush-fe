"use client";

import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import BomSection from "../components/BomSection";
import SiteFooter from "../components/SiteFooter";
import Preloader from "../components/Preloader";

import {
  billOfMaterials,
  navigation as navData,
} from "../lib/content";
import { useHashScroll } from "../lib/hooks/useHashScroll";

export default function BomPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  useHashScroll(!isLoading);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        className={`relative flex min-h-screen flex-col bg-ember-900 text-white ${isLoading ? "hidden" : ""
          }`}
      >
        <NavigationBar
          navigation={Array.isArray(navData) ? navData : []}
        />
        <main className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 pb-32 pt-32">

          {/* Sales-forward Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1626] px-8 py-12 shadow-2xl backdrop-blur-lg">
            <div className="absolute inset-0 bg-linear-to-br from-ember-800/70 via-[#0f1e33]/80 to-ember-900/85" />
            <div className="absolute -left-10 top-0 h-64 w-64 rounded-full bg-gild-300/15 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-gild-200">NICU IoT Platform</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Deploy a hospital-ready NICU bay with proven hardware, fast.
                </h1>
                <p className="text-white/70 text-base leading-relaxed">
                  We ship a vetted bill of materials for continuous newborn monitoring—wearables, edge compute, connectivity, and safety. Start with our baseline, then tailor it to your clinical workflow.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#bom-table" className="cta-smooth inline-flex items-center justify-center rounded-full bg-white text-[#0b1626] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] hover:bg-gild-200 transition-colors">
                    See components
                  </a>
                  <a href="#contact" className="cta-smooth inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/10 transition-colors">
                    Custom requirements?
                  </a>
                </div>
              </div>
              <div className="grid w-full max-w-lg grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">Line items</p>
                  <p className="text-3xl font-bold text-white">{billOfMaterials.items.length}</p>
                  <p className="text-white/60 text-xs">Wearables, edge, enclosure, connectivity</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">Total est. budget</p>
                  <p className="text-3xl font-bold text-gild-200">{billOfMaterials.totalEstimatedBudget}</p>
                  <p className="text-white/60 text-xs">Single-bed deployment baseline</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">Lead time focus</p>
                  <p className="text-xl font-semibold text-white">4-6 weeks</p>
                  <p className="text-white/60 text-xs">Assumes mixed local + online sourcing</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">Refresh cycle</p>
                  <p className="text-xl font-semibold text-white">Quarterly</p>
                  <p className="text-white/60 text-xs">Revisit sensors & firmware bills</p>
                </div>
              </div>
            </div>
          </section>

          {/* Value prop + materials highlights */}
          <section className="grid gap-6 lg:grid-cols-[1.2fr,1.8fr] rounded-3xl border border-white/10 bg-white/5 p-6 text-sm backdrop-blur-md">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gild-300">What you get</h2>
              <p className="text-white/70">
                A proven hardware stack for NICU-grade continuous monitoring. Use it as-is for prototypes, or tweak quantities and vendors for production.
              </p>
              <ul className="grid gap-2 text-white/70">
                <li className="flex gap-2 items-start">
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-emerald-500/10 text-center text-xs text-emerald-300">✓</span>
                  <div>
                    <p className="font-medium text-white">Clinical-grade sensing</p>
                    <p>Wearable biometrics, cry/audio capture, and environmental sensing for each bed.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-sky-500/10 text-center text-xs text-sky-300">✓</span>
                  <div>
                    <p className="font-medium text-white">Reliable edge & connectivity</p>
                    <p>ESP32 + fog node with BLE/MQTT-ready pathways and room-level sharing.</p>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-amber-500/10 text-center text-xs text-amber-300">✓</span>
                  <div>
                    <p className="font-medium text-white">Certification-minded</p>
                    <p>Enclosure, safety, and pre-compliance considerations baked into the plan.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gild-300">Wearable & sensing</h3>
                <p className="text-white/70 text-sm">Bracelet, biomedical sensors, cry + ambient audio, temperature/humidity—core per-infant kit.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gild-300">Edge & connectivity</h3>
                <p className="text-white/70 text-sm">BLE uplink to fog, MQTT to cloud; edge node can serve multiple beds.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gild-300">Enclosure & safety</h3>
                <p className="text-white/70 text-sm">Cable management, ingress protection, thermal headroom; plan to meet clinical safety bars.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gild-300">Certification path</h3>
                <p className="text-white/70 text-sm">Budget for EMC/EMI and biocompatibility checks; we can guide pre-compliance.</p>
              </div>
            </div>
          </section>

          {/* Procurement & phasing */}
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-gild-300">Procurement checklist</h3>
              <ul className="list-disc space-y-2 pl-5 text-white/70 text-sm">
                <li>Lock vendors for sensors and microcontrollers; verify lead times.</li>
                <li>Confirm enclosure specs (IP rating, thermal) before bulk purchase.</li>
                <li>Order 10-15% extra for bring-up, QA, and field spares.</li>
                <li>Plan certification pre-check (EMC/EMI) before scaling orders.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-gild-300">Deployment phasing</h3>
              <div className="space-y-3 text-white/70 text-sm">
                <div>
                  <p className="text-white font-semibold">Phase 1 — Prototype (Weeks 1-2)</p>
                  <p>Assemble wearables + baby box, validate sensing + firmware bring-up.</p>
                </div>
                <div>
                  <p className="text-white font-semibold">Phase 2 — Pilot (Weeks 3-6)</p>
                  <p>Deploy 1-2 beds, test edge connectivity + dashboards, iterate enclosure.</p>
                </div>
                <div>
                  <p className="text-white font-semibold">Phase 3 — Scale (Weeks 6+)</p>
                  <p>Lock vendors, initiate pre-cert checks, and roll out to remaining bays.</p>
                </div>
              </div>
            </div>
          </section>

          {/* BOM table */}
          <section id="bom-table" className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <BomSection data={billOfMaterials} variant="centered" />
          </section>

          {/* CTA + Contact Form */}
          <section id="contact" className="rounded-3xl border border-white/10 bg-linear-to-r from-[#0f1f35] via-[#0a1728] to-[#0f1f35] p-8 shadow-xl backdrop-blur-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Have custom requirements for your hospital?
              </h3>
              <p className="text-white/70 mb-4 text-sm max-w-3xl mx-auto">
                Tell us your bed count, certification needs, or integration constraints. We’ll tailor the BOM, sourcing, and rollout plan for your NICU.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="mailto:contact@hush.care" className="cta-smooth inline-flex items-center justify-center rounded-full bg-white text-[#0b1626] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] hover:bg-gild-200 transition-colors">
                  Email us
                </a>
                <a href="#bom-table" className="cta-smooth inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/10 transition-colors">
                  Review BOM
                </a>
              </div>
            </div>

            <form className="mx-auto grid max-w-3xl gap-4 text-sm text-white/80">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/60">Name</span>
                  <input type="text" name="name" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gild-300 focus:outline-none" placeholder="Jane Doe" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/60">Email</span>
                  <input type="email" name="email" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gild-300 focus:outline-none" placeholder="you@hospital.org" />
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/60">Organization</span>
                  <input type="text" name="company" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gild-300 focus:outline-none" placeholder="City NICU Hospital" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/60">Bed count / scope</span>
                  <input type="text" name="scope" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gild-300 focus:outline-none" placeholder="e.g., 6 beds pilot, 20 beds scale" />
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.25em] text-white/60">Requirements</span>
                <textarea name="requirements" rows={4} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gild-300 focus:outline-none" placeholder="Tell us about certifications, sourcing constraints, or integration needs."></textarea>
              </label>
              <div className="flex justify-end">
                <button type="submit" className="cta-smooth inline-flex items-center justify-center rounded-full bg-white text-[#0b1626] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] hover:bg-gild-200 transition-colors">
                  Send request
                </button>
              </div>
            </form>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
