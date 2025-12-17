import Image from "next/image";
import type { ProblemCard } from "../lib/content";

interface ProblemSectionProps {
  title: string;
  cards: ProblemCard[];
  variant?: 'default' | 'bento' | 'split' | 'centered' | 'immersive';
}

const ProblemSection = ({ title, cards, variant = 'default' }: ProblemSectionProps) => {

  // Bento Variant
  if (variant === 'bento') {
    return (
      <div>
        {/* title */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[0.65rem] uppercase tracking-widest text-white/60 mb-6">Main Challenges</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
        </div>
        <section id="problem" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-black/30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="text-xs uppercase tracking-widest text-blue-300 mb-4">Pain Points</div>
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                4 Pain Points in Neonatal Care
              </h2>
            </div>
            <div className="mt-8 aspect-video relative rounded-xl overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2670&auto=format&fit=crop"
                alt="NICU Environment"
                fill
                className="object-cover opacity-60"
              />
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <div key={card.id} className="rounded-3xl border border-white/10 bg-white/8 backdrop-blur-lg p-6 hover:border-blue-500/30 transition-colors shadow-md shadow-black/20">
                <div className="text-xs font-bold text-blue-400 mb-2">0{i + 1}</div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Centered Variant
  if (variant === 'centered') {
    return (
      <section id="problem" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[0.65rem] uppercase tracking-widest text-white/60 mb-6">Challenges</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            4 Pain Points in Neonatal Care
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">Addressing the critical barriers so neonatal teams can focus on lifesaving care.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {cards.map((card, i) => (
            <div key={card.id} className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold mb-6 group-hover:scale-110 transition-transform">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-sm text-white/50">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Default / Split (Original)
  return (
    <section id="problem" className="section-frame rounded-[26px] px-10 py-12">
      <div className="space-y-12 text-white">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-6">
            <div className="ornament-divider">NICU pain points</div>
            <h2
              className="text-3xl text-gild-300"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {title}
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              These are the critical barriers we are addressing so neonatal teams can stay focused on
              lifesaving care instead of chasing data.
            </p>

            {/* Problem Image */}
            <div className="aspect-[4/3] w-full rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2670&auto=format&fit=crop"
                alt="Busy Hospital Environment"
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#071a2d]/90" />
            </div>
          </div>

          <div className="lg:w-2/3 grid gap-4 md:grid-cols-2 content-start">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="rounded-[22px] border border-[#15324f]/60 bg-[#071a2d] p-6 text-white/80"
              >
                <div className="flex items-center gap-3 text-white/60">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="text-xs uppercase tracking-[0.4em]">{card.id}</p>
                </div>
                <h3
                  className="mt-3 text-xl text-gild-300"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
