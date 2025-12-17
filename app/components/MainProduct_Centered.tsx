import Link from "next/link";
import Image from "next/image";
import { Activity, Layers, ShieldCheck, Zap } from "lucide-react";
import type { HeroContent, HeroStat } from "../lib/content";

interface MainProductProps {
  stats: HeroStat[];
  videoSrc: string;
  posterSrc: string;
  heroCopy: HeroContent;
}

const statIcon = (label: string) => {
  if (label.toLowerCase().includes("continuous")) return <Activity className="h-5 w-5" />;
  if (label.toLowerCase().includes("high-risk")) return <ShieldCheck className="h-5 w-5" />;
  if (label.toLowerCase().includes("layer")) return <Layers className="h-5 w-5" />;
  return <Zap className="h-5 w-5" />;
};

const MainProduct_Centered = ({ stats, heroCopy }: MainProductProps) => {
  return (
    <section id="overview" className="relative flex min-h-screen w-full flex-col items-center bg-[#030d1c] overflow-hidden pt-20 md:pt-24">

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-24 w-full max-w-6xl mx-auto text-center">

        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/70">Beta Release • v1.0.1</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-10 mt-4 max-w-4xl mx-auto leading-[1.05]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {heroCopy.headline}
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-14 leading-relaxed">
          {heroCopy.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-24">
          <Link href="#solution" className="cta-smooth h-12 px-8 rounded-full bg-white text-[#030d1c] font-bold text-sm uppercase tracking-widest flex items-center justify-center hover:bg-gray-200 transition-colors min-w-[180px]">
            {heroCopy.ctaText}
          </Link>
          <Link href="#problem" className="cta-smooth h-12 px-8 rounded-full border border-white/20 text-white font-medium text-sm uppercase tracking-widest flex items-center justify-center hover:bg-white/5 transition-colors min-w-[180px]">
            Learn More
          </Link>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 gap-6">


          {/* Stats -- Start */}
          <div className="  flex-row gap-4 mb-6 hidden md:flex">
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col justify-center hover:border-blue-400/30 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-white/40">{stat.label}</span>
                  <div className="p-2 rounded-lg bg-white/5 text-blue-300 group-hover:text-white transition-colors">
                    {statIcon(stat.label)}
                  </div>
                </div>
                <div className="text-3xl text-left font-bold text-white mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/50">{stat.caption}</div>
              </div>
            ))}
          </div>

          {/* Big Screen */}
          <div className="lg:col-span-12 h-[400px] lg:h-[500px] rounded-3xl border border-white/10 bg-[#020617]/80 backdrop-blur-lg relative overflow-hidden group">
            <Image
              src="/images/bear.png"
              alt="Dashboard Preview"
              fill
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#030d1c] via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Live Monitoring Dashboard</h3>
                <p className="text-sm text-white/60 max-w-md">Real-time visualization of infant vitals, environmental metrics, and cry analysis.</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs text-white/70">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Live Demo Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainProduct_Centered;
