"use client";

import { useState } from "react";

export type FAQItem = { question: string; answer: string };

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={`faq-row${isOpen ? " is-open" : ""}`} key={item.question}>
            <button
              type="button"
              className="faq-row-head"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="faq-q">{item.question}</span>
              <span className="faq-chevron" aria-hidden="true">▾</span>
            </button>
            <div className="faq-a">{item.answer}</div>
          </div>
        );
      })}
    </div>
  );
}
