"use client";

import { useMemo, useState } from "react";
import MainProduct from "./components/MainProduct_Centered";

import NavigationBar from "./components/NavigationBar";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import ArchitectureSection from "./components/ArchitectureSection";
import GoalsSection from "./components/GoalsSection";
import GitHubSection from "./components/GitHubSection";
import SiteFooter from "./components/SiteFooter";
import Preloader from "./components/Preloader";

import {
  architectureLayers,
  architectureTitle,
  businessGoals,
  heroContent,
  heroPosterSrc,
  heroStats,
  navigation,
  problemCards,
  problemSectionTitle,
  solutionFeatures,
  solutionSectionTitle,
} from "./lib/content";
import { useActiveSection } from "./lib/hooks/useActiveSection";
import { useHashScroll } from "./lib/hooks/useHashScroll";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const sectionIds = useMemo(() => ["overview", "problem", "solution", "architecture", "goals", "github"], []);
  const activeSectionId = useActiveSection(isLoading ? [] : sectionIds);

  useHashScroll(!isLoading);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`relative flex min-h-screen flex-col bg-ember-900 text-white ${isLoading ? 'hidden' : ''}`}>
        <NavigationBar
          navigation={Array.isArray(navigation) ? navigation : []}
          activeSectionId={activeSectionId}
        />
        <MainProduct
          stats={heroStats}
          posterSrc={heroPosterSrc}
          heroCopy={heroContent}
        />
        <main className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 pb-24 pt-14">
          <ProblemSection title={problemSectionTitle} cards={problemCards} variant="bento" />
          <SolutionSection title={solutionSectionTitle} features={solutionFeatures} variant="bento" />
          <ArchitectureSection title={architectureTitle} layers={architectureLayers} variant="bento" />
          <GoalsSection goals={businessGoals} variant="bento" />
          <GitHubSection variant="bento" />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
