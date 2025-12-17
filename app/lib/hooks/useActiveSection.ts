"use client";

import { useEffect, useMemo, useState, useRef } from "react";

export function useActiveSection(sectionIds: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const observers = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  const idsKey = useMemo(() => sectionIds.join("|"), [sectionIds]);

  useEffect(() => {
    if (sectionIds.length === 0) {
      queueMicrotask(() => setActiveId(""));
      return undefined;
    }

    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!targets.length) {
      return undefined;
    }

    // Clear map on effect re-run
    observers.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          observers.current.set(entry.target.id, entry);
        });

        const visible = Array.from(observers.current.values())
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            // Sort by visible height (intersectionRect.height) to find the one occupying most of the active zone
            return b.intersectionRect.height - a.intersectionRect.height;
          });

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Focus on the upper-middle part of the screen (reading area)
        rootMargin: options?.rootMargin ?? "-20% 0px -50% 0px",
        // Use multiple thresholds to ensure we get frequent updates on intersection ratio/rect
        threshold: options?.threshold ?? [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    targets.forEach((target) => observer.observe(target));

    const handleScroll = () => {
      if (!sectionIds.length) return;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;
      if (nearBottom) {
        const lastId = sectionIds[sectionIds.length - 1];
        setActiveId((prev) => (prev === lastId ? prev : lastId));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      observers.current.clear();
    };
  }, [idsKey, options?.rootMargin, options?.threshold, sectionIds]);

  return activeId;
}
