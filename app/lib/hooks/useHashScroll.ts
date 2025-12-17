"use client";

import { useEffect } from "react";

export function useHashScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return undefined;

    const scrollToHash = () => {
      const { hash } = window.location;
      if (!hash) return;
      const target = document.querySelector(hash) as HTMLElement | null;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Allow layout to settle before initial scroll
    const initialTimeout = setTimeout(scrollToHash, 150);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [enabled]);
}
