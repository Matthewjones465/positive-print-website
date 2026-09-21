"use client";

import { useEffect, useRef, useState } from "react";

// Mirrors the Origin template's "one item highlighted as you scroll" list —
// each item brightens when it crosses the vertical centre of the viewport.
export default function CapabilitiesList({ items }: { items: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div className="cap-list">
      {items.map((item, i) => (
        <div
          key={item}
          ref={(el) => {
            refs.current[i] = el;
          }}
          data-idx={i}
          className={`cap-item${i === activeIndex ? " is-active" : ""}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
