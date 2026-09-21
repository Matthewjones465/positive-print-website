"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Lightweight scroll-reveal: fades/slides an element in once it enters the
// viewport. Deliberately simple (no pinned/scroll-jacked animation) so it
// stays robust across devices — the Origin template's heavier scrollytelling
// effects aren't replicated here by design.
export default function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => el.classList.add("is-visible"), delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
