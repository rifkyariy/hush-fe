import { User, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import type { TeamMember } from "../lib/content";

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
  variant?: 'default' | 'bento' | 'split' | 'centered' | 'immersive';
}

const TeamSection = ({ title, members, variant = 'default' }: TeamSectionProps) => {

  // Bento Variant
  if (variant === 'bento') {
    return (
      <section id="team" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="md:col-span-2 lg:col-span-4 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 text-white flex items-center justify-between shadow-lg shadow-black/25">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
          <p className="text-sm text-white/50 uppercase tracking-widest">The Minds Behind Hush</p>
        </div>
        {members.map((member) => (
          <div key={member.name} className="group relative rounded-3xl bg-white/8 backdrop-blur-lg border border-white/10 p-6 hover:border-gild-300/50 transition-colors overflow-hidden shadow-md shadow-black/20">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <Linkedin size={16} className="text-white/60 hover:text-white cursor-pointer" />
              <Twitter size={16} className="text-white/60 hover:text-white cursor-pointer" />
            </div>
            <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 relative overflow-hidden mb-4 mx-auto">
              <Image
                src={`/images/${member.name.toLowerCase()}.jpg`}
                alt={member.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">{member.name}</h3>
              <p className="text-xs text-blue-400 uppercase tracking-wider mt-1">{member.role}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Centered Variant
  if (variant === 'centered') {
    return (
      <section id="team" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-16" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {members.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-4 group">
              <div className="h-32 w-32 rounded-full border-2 border-white/10 p-1 relative">
                <div className="h-full w-full rounded-full overflow-hidden relative">
                  <Image
                    src={`https://images.unsplash.com/photo-${member.name === 'Gerald' ? '1500648767791-00dcc994a43e' : member.name === 'Satya' ? '1472099645785-5658abf4ff4e' : member.name === 'Jade' ? '1438761681033-6461ffad8d80' : '1507003211169-0a1dd7228f2d'}?q=80&w=200&auto=format&fit=crop`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-sm text-white/50">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Default / Split
  return (
    <section id="team" className="section-frame rounded-[26px] px-10 py-12">
      <div className="space-y-6 text-white">
        <div className="ornament-divider">People</div>
        <h2
          className="text-3xl text-gild-300"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.name}
              className="rounded-[18px] border border-[#15324f]/60 bg-[#071a2d] px-6 py-5 flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 relative overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-${member.name === 'Gerald' ? '1500648767791-00dcc994a43e' : member.name === 'Satya' ? '1472099645785-5658abf4ff4e' : member.name === 'Jade' ? '1438761681033-6461ffad8d80' : '1507003211169-0a1dd7228f2d'}?q=80&w=200&auto=format&fit=crop`}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {member.name}
                </p>
                <p className="mt-1 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gild-300">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
