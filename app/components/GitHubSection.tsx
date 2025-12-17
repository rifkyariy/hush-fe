import Image from "next/image";
import { Github } from "lucide-react";

interface GitHubSectionProps {
  variant?: 'default' | 'bento';
}

const GitHubSection = ({ variant = 'bento' }: GitHubSectionProps) => {
  if (variant === 'bento') {
    return (
      <section id="github" className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1728]/80 via-[#040b15]/80 to-[#0b1728]/80 backdrop-blur-xl p-10 shadow-2xl overflow-hidden relative">
        {/* Background Glow Effects */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <Github className="h-4 w-4 text-white" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/70">Open Source</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Join Our GitHub Community
            </h2>

            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Scan the QR code to explore our open-source repository, contribute to the project,
              or follow our development journey. We welcome collaboration and feedback from the community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://github.com/satyaadhiyaksaardy/SI5014701-iiot-course-hush"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-[#030d1c] font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                <Github className="h-4 w-4" />
                View Repository
              </a>
              <a
                href="https://github.com/satyaadhiyaksaardy/SI5014701-iiot-course-hush/stargazers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white/20 text-white font-medium text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Star on GitHub
              </a>
            </div>
          </div>

          {/* Right Content - QR Code */}
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:border-blue-400/30 transition-colors">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                  <Image
                    src="/images/qr-code.svg"
                    alt="GitHub Repository QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-xs text-white/50 mt-4 uppercase tracking-widest">
                  Scan to Visit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section id="github" className="section-frame rounded-[26px] px-10 py-12">
      <div className="space-y-6 text-white text-center">
        <div className="ornament-divider">Open Source</div>
        <h2 className="text-3xl text-gild-300" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          GitHub Repository
        </h2>
        <div className="flex justify-center pt-6">
          <div className="relative w-64 h-64">
            <Image
              src="/images/qr-code.svg"
              alt="GitHub Repository QR Code"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
