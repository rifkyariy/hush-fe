"use client";

import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFaded, setIsFaded] = useState(false);

  useEffect(() => {
    const PRELOAD_MS = 100; // Show preloader for only 100ms
    const FADE_MS = 100; // Fade duration for opacity transitions

    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;

    const minDisplayTimeout = setTimeout(() => {
      setIsFaded(true);
      fadeTimeout = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, FADE_MS);
    }, PRELOAD_MS);

    return () => {
      if (minDisplayTimeout) clearTimeout(minDisplayTimeout);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, [onComplete]);

  // Fade in: starts at opacity-0, transitions to opacity-100
  // After video ends: transitions back to opacity-0
  const opacityClass = isVisible
    ? (isFaded ? 'opacity-0' : 'opacity-100')
    : 'opacity-0';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-100 ${opacityClass}`}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div className="text-center w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Preloader;