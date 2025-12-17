import React from "react";
import Image from "next/image";
import {
  Cpu,
  Activity,
  BrainCircuit,
  Database,
  Microscope,
  Network,
  ArrowUpRight,
  Layers
} from "lucide-react";

// Mock interface
export interface SolutionFeature {
  type: string;
  component: string;
  description: string;
  key_features?: string[];
  capabilities?: string[];
}

interface SolutionSectionProps {
  title: string;
  features: SolutionFeature[];
  variant?: 'default' | 'bento' | 'split' | 'centered' | 'immersive' | 'card-grid';
}

// Helper to get icons based on feature type (UX improvement for scanning)
const getIconForType = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('hardware') || t.includes('sensor')) return <Cpu className="w-4 h-4" />;
  if (t.includes('software') || t.includes('app')) return <Layers className="w-4 h-4" />;
  if (t.includes('ai') || t.includes('intelligence')) return <BrainCircuit className="w-4 h-4" />;
  if (t.includes('data')) return <Database className="w-4 h-4" />;
  if (t.includes('research') || t.includes('bio')) return <Microscope className="w-4 h-4" />;
  if (t.includes('network')) return <Network className="w-4 h-4" />;
  return <Activity className="w-4 h-4" />;
};

const SolutionSection = ({ title, features, variant = 'default' }: SolutionSectionProps) => {

  // --- REFINED UX BENTO VARIANT ---
  if (variant === 'bento') {
    const heroImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2653&auto=format&fit=crop"; // High quality medical tech abstract

    return (
      <div className="py-12">
        {/* title */}
        < div className="max-w-4xl mx-auto text-center mb-16" >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[0.65rem] uppercase tracking-widest text-white/60 mb-6">
            Our Answer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>Proposed Solution</h2>
        </div >
        <section id="solution" className="w-full ">
          {/* Main Grid Wrapper: 6 Columns for flexible spanning */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(180px,auto)]">

            {/* 2. VISUAL ANCHOR (Top Right - Spans 4) 
              UX Goal: Provide visual relief and context. "Show, don't just tell."
          */}
            <div className="md:col-span-4 relative h-64 md:h-auto rounded-3xl overflow-hidden group border border-white/10 shadow-2xl shadow-black/30">
              <Image
                src={heroImage}
                alt="Hush Ecosystem Overview"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071a2d]/90 via-[#071a2d]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-sm">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-medium text-white mb-2 inline-block">
                  Live Environment
                </span>
                <p className="text-white/80 text-sm mt-2">
                  Real-time synchronization across all hardware nodes.
                </p>
              </div>
            </div>

            {/* 1. SECTION HEADER (Top Left - Spans 2) 
              UX Goal: Set context immediately without distraction. 
          */}
            <div className="md:col-span-2 rounded-3xl p-8 flex flex-col justify-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-300">System Architecture</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {title}
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                A modular ecosystem designed for redundancy, speed, and clinical precision.
              </p>
            </div>

            {/* 3. FEATURE CARDS LOOP 
              UX Goal: Consistent card layout with visual hierarchy based on span.
          */}
            {features.map((feature, i) => {
              // Layout Logic: 
              // First 2 items = Medium emphasis (3 cols each)
              // Remaining items = Standard emphasis (2 cols each)
              const isMedium = i < 2;
              const spanClass = isMedium ? "md:col-span-3" : "md:col-span-2";

              return (
                <div
                  key={feature.component}
                  className={`${spanClass} group relative flex flex-col justify-between p-6 rounded-3xl bg-[#0b172a]/80 border border-white/5 hover:border-blue-500/30 hover:bg-[#0f2038] transition-all duration-300 shadow-lg`}
                >
                  {/* Header: Icon & Type */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors duration-300">
                        {getIconForType(feature.type)}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold group-hover:text-blue-300 transition-colors">
                        {feature.type}
                      </span>
                    </div>
                    {/* Hover Affordance Icon */}
                    <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>

                  {/* Content: Title & Desc */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                      {feature.component}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-3 group-hover:text-white/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>

                  {/* Footer: Tags (Pills) */}
                  {feature.key_features && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {feature.key_features.slice(0, isMedium ? 3 : 2).map((k) => (
                        <span
                          key={k}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] uppercase tracking-wide text-white/50 group-hover:border-white/10 group-hover:bg-white/10 transition-colors"
                        >
                          {k}
                        </span>
                      ))}
                      {feature.key_features.length > (isMedium ? 3 : 2) && (
                        <span className="px-2 py-1 text-[10px] text-white/30">+ more</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // --- CARD GRID VARIANT (Existing) ---
  if (variant === 'card-grid') {
    const cardGridImages = [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    ];

    return (
      <section id="solution" className="section-frame rounded-[26px] px-6 md:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="ornament-divider mx-auto">Hush Ecosystem</div>
            <h2 className="text-3xl md:text-4xl text-gild-300 mt-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={feature.component} className="group rounded-[22px] border border-[#15324f]/60 bg-[#071a2d] overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-blue-500/30">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={cardGridImages[index % cardGridImages.length]} alt={feature.component} fill className="object-cover opacity-80 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a2d] to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4 flex gap-2 items-center">
                    <span className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-blue-400 border border-white/10">
                      {getIconForType(feature.type)}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl text-gild-300 mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>{feature.component}</h3>
                  <p className="text-sm text-white/70 mb-6 flex-grow">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- CENTERED VARIANT (Existing) ---
  if (variant === 'centered') {
    return (
      <section id="solution" className="py-20 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">A complete ecosystem for neonatal care.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div key={feature.component} className="flex gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {getIconForType(feature.type)}
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-2">{feature.component}</h3>
                <p className="text-sm text-white/60 mb-3">{feature.description}</p>
                <div className="text-xs uppercase tracking-wider text-blue-300">{feature.type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // --- DEFAULT VARIANT (Existing) ---
  return (
    <section id="solution" className="section-frame rounded-[26px] px-10 py-12">
      <div className="space-y-12 text-white">
        <div className="flex flex-col lg:flex-row-reverse gap-12">
          <div className="lg:w-1/3 space-y-6">
            <div className="ornament-divider">Hush ecosystem</div>
            <h2 className="text-3xl text-gild-300" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Hardware, software, and AI services work together so every cry, breath, and micro-climate shift is contextualized before it becomes an emergency.
            </p>
            <div className="aspect-[3/4] w-full rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden group">
              <Image src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2670&auto=format&fit=crop" alt="Hush Ecosystem" fill className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#071a2d]/90" />
            </div>
          </div>
          <div className="lg:w-2/3 grid gap-4 md:grid-cols-2 content-start">
            {features.map((feature) => (
              <div key={feature.component} className="rounded-[22px] border border-[#15324f]/60 bg-[#071a2d] p-6 text-white/80 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-[0.45em] text-white/50">{feature.type}</p>
                  <div className="text-blue-400 opacity-50">{getIconForType(feature.type)}</div>
                </div>
                <h3 className="mt-3 text-xl text-gild-300" style={{ fontFamily: "var(--font-space-grotesk)" }}>{feature.component}</h3>
                <p className="mt-2 text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;