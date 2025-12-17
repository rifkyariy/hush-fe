import Image from "next/image";
import type { ArchitectureLayer } from "../lib/content";

interface ArchitectureSectionProps {
  title: string;
  layers: ArchitectureLayer[];
  variant?: 'default' | 'bento' | 'split' | 'centered' | 'immersive';
}

const ArchitectureSection = ({ title, layers, variant = 'default' }: ArchitectureSectionProps) => {

  // Bento Variant
  if (variant === 'bento') {
    return (
      <section id="architecture" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 flex items-center justify-between shadow-lg shadow-black/25">
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-300 mb-2">Tech Stack</div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
          </div>
          <div className="hidden md:block text-right text-xs text-white/40 max-w-xs">
            From perception all the way through cloud applications.
          </div>
        </div>
        {layers.map((layer, i) => (
          <div key={layer.layer_name} className="rounded-3xl border border-white/10 bg-white/8 backdrop-blur-lg p-6 hover:border-blue-500/30 transition-colors shadow-md shadow-black/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 text-xs font-bold">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-white">{layer.layer_name}</h3>
            </div>
            <p className="text-xs text-white/50 mb-4 min-h-[3em]">{layer.role}</p>
            <div className="flex flex-wrap gap-2">
              {layer.tech_stack?.slice(0, 3).map(t => (
                <span key={t} className="px-2 py-1 rounded bg-white/5 text-[0.6rem] text-white/40 border border-white/5">{t}</span>
              ))}
              {layer.hardware_specs && <span className="px-2 py-1 rounded bg-white/5 text-[0.6rem] text-white/40 border border-white/5">Hardware Specs</span>}
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Centered Variant
  if (variant === 'centered') {
    return (
      <section id="architecture" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">Built on a robust, multi-layer architecture.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {layers.map((layer, i) => (
            <div key={layer.layer_name} className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-white/10 group-hover:text-blue-500/20 transition-colors">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{layer.layer_name}</h3>
                    <p className="text-sm text-white/50">{layer.role}</p>
                  </div>
                </div>
                <div className="hidden sm:flex gap-2">
                  {layer.tech_stack?.slice(0, 2).map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-black/20 text-xs text-white/40">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Default / Split
  return (
    <section id="architecture" className="section-frame rounded-[26px] px-10 py-12">
      <div className="space-y-12 text-white">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-6">
            <div className="ornament-divider">System blueprint</div>
            <h2
              className="text-3xl text-gild-300"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {title}
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              From perception all the way through cloud applications, each layer handles a critical
              responsibility for reliable neonatal insight.
            </p>
            {/* Architecture Image */}
            <div className="aspect-[3/5] w-full rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
                alt="System Architecture"
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#071a2d]/90" />
            </div>
          </div>

          <div className="lg:w-2/3 space-y-4">
            {layers.map((layer, index) => (
              <div
                key={layer.layer_name}
                className="rounded-[22px] border border-[#15324f]/60 bg-[#071a2d] p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3 text-white/60">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-base font-semibold">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <p className="text-xs uppercase tracking-[0.35em]">Layer</p>
                  </div>
                  <h3
                    className="text-2xl text-gild-300"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {layer.layer_name}
                  </h3>
                  <p className="text-sm text-white/70">{layer.role}</p>
                </div>
                {layer.hardware_specs && (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {layer.hardware_specs.map((spec) => (
                      <div key={spec.device} className="rounded-xl border border-white/10 p-4">
                        <p className="text-xs uppercase tracking-[0.45em] text-white/50">{spec.device}</p>
                        <p className="mt-2 text-sm text-white/70">{spec.microcontroller}</p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/70">
                          {spec.sensors.map((sensor) => (
                            <li key={sensor}>{sensor}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {layer.protocols && (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {layer.protocols.map((protocol) => (
                      <div key={protocol.protocol} className="rounded-xl border border-white/10 p-4">
                        <p className="text-xs uppercase tracking-[0.45em] text-white/50">{protocol.protocol}</p>
                        <p className="mt-2 text-sm text-white/70">{protocol.function}</p>
                      </div>
                    ))}
                  </div>
                )}
                {layer.tech_stack && (
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/80">
                    {layer.tech_stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
