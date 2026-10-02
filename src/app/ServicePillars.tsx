"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    id: "01",
    title: "Print, Signage & Merch",
    tagline: "Core production engine",
    description:
      "High-volume commercial printing and architectural signage to custom vehicle fleet wraps and premium corporate gifting — precision engineered in KZN.",
    tags: ["Architectural Signage", "Fleet Wrapping", "Custom Apparel", "Corporate Gifting", "Packaging"],
  },
  {
    id: "02",
    title: "Brand & Design Strategy",
    tagline: "Visual identity & strategy",
    description:
      "Strategic corporate identity, campaign creative, packaging design and vector mockups built to give enterprise brands a distinct market advantage.",
    tags: ["Brand Identity", "Pitch Decks", "Packaging Design", "Vector Mockups", "Campaign Creative"],
  },
  {
    id: "03",
    title: "Digital, Photo & Video",
    tagline: "Commercial media production",
    description:
      "Brand films, product photography, event recaps and short-form social reels engineered for real digital conversion.",
    tags: ["Commercial Video", "Product Photography", "Social Reels", "Event Recaps", "Media Strategy"],
  },
  {
    id: "04",
    title: "Events & Live Activations",
    tagline: "Experiential marketing",
    description:
      "Turnkey corporate activations, community running events, live sound and audio setup, DJ curation, and staging production.",
    tags: ["Experiential Marketing", "Live Sound & Audio", "DJ & Live Production", "Event Collateral", "Pop-up Staging"],
  },
];

export default function ServicePillars() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {PILLARS.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 p-7 md:p-8 transition-colors hover:border-[#ffd400]"
        >
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs font-bold tracking-widest text-neutral-400">{p.id}</span>
            <span className="text-[0.7rem] font-bold uppercase tracking-wider rounded-full bg-[#ffd400]/20 text-neutral-700 dark:text-neutral-200 px-3 py-1">
              {p.tagline}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-3">{p.title}</h3>
          <p className="text-sm md:text-[0.95rem] leading-relaxed text-neutral-600 dark:text-neutral-400 mb-5">
            {p.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-1 text-neutral-500 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
