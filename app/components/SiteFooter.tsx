import Link from "next/link";

const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      id="about"
      className="pinstripe-footer border-t border-[#1e3b5d] bg-[#030d1c] py-12 text-white/60"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2 text-sm">
          <span
            className="text-lg text-gild-300"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Hush | IIoT Digital Nursery
          </span>
          <p>©{year} Hush Collective. All rights reserved.</p>
          <Link href="mailto:contact@hush.care" className="hover:text-gild-300">
            contact@hush.care
          </Link>
        </div>
        <div className="hidden lg:grid gap-6 text-xs uppercase tracking-[0.45em] lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Link href="#problem" className="hover:text-gild-300">
              Problem
            </Link>
            <Link href="#solution" className="hover:text-gild-300">
              Solution
            </Link>
            <Link href="#architecture" className="hover:text-gild-300">
              Architecture
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="#goals" className="hover:text-gild-300">
              Goals
            </Link>
            <Link href="#team" className="hover:text-gild-300">
              Team
            </Link>
            <Link href="/bom" className="hover:text-gild-300">
              BOM
            </Link>
            <Link href="#overview" className="hover:text-gild-300">
              Overview
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
