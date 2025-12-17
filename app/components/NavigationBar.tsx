"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavItem } from "../lib/content";

interface NavigationBarProps {
  navigation: NavItem[];
  /**
   * Preferred prop for section highlighting (pass the section id / href).
   */
  activeSectionId?: string;
}

export default function NavigationBar({ navigation, activeSectionId }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname || "/";

  // Ensure navigation is always an array
  const navItems = Array.isArray(navigation) ? navigation : [];
  const isHome = currentPath === "/";
  const normalizedSectionId = activeSectionId || (isHome ? "overview" : undefined);

  return (
    <nav className="fixed top-0 lg:top-8 left-0 right-0 z-50 flex justify-center lg:px-4">
      <div className="relative flex items-center justify-between lg:justify-center gap-2 w-full lg:w-auto rounded-none lg:rounded-full border-b lg:border border-white/20 bg-[#0b1626]/80 lg:bg-white/10 px-6 py-4 lg:py-3 backdrop-blur-md shadow-lg">
        <span className="flex items-center gap-2 text-sm font-bold text-gild-300 tracking-wide mr-2 lg:mr-6">
          <Image src="/logo.svg" alt="Hush Logo" width={20} height={20} />
          Hush
        </span>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-3 text-xs uppercase tracking-[0.2em] text-white/80">
          {navItems.map((item) => {
            const linkHref = item.type === "section"
              ? (isHome ? `#${item.href}` : `/#${item.href}`)
              : item.href;

            const sectionMatch = item.type === "section" && (
              (!!normalizedSectionId && item.href === normalizedSectionId)
            );

            const pageMatch = item.type === "page" && (
              currentPath === item.href
            );

            const isItemActive = sectionMatch || pageMatch;

            return (
              <li key={item.label}>
                <Link
                  href={linkHref}
                  className={`inline-flex items-center rounded-full border border-transparent px-4 py-2 transition-all duration-200 ${isItemActive ? "border-white/30 bg-white/15 text-white" : "text-white/70 hover:text-gild-300"
                    }`}
                  aria-current={isItemActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-1 text-white/80 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full mt-4 left-4 right-4 rounded-3xl border border-white/20 bg-[#0b1626]/95 backdrop-blur-xl p-6 shadow-2xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="flex flex-col gap-2 text-sm uppercase tracking-[0.15em] text-white/80">
            {navItems.map((item) => {
              const linkHref = item.type === "section"
                ? (isHome ? `#${item.href}` : `/#${item.href}`)
                : item.href;

              const sectionMatch = item.type === "section" && (
                (!!normalizedSectionId && item.href === normalizedSectionId)
              );

              const pageMatch = item.type === "page" && (
                currentPath === item.href
              );

              const isItemActive = sectionMatch || pageMatch;

              return (
                <li key={item.label}>
                  <Link
                    href={linkHref}
                    className={`block rounded-xl border border-transparent px-4 py-3 transition-all duration-200 ${isItemActive ? "border-white/20 bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
