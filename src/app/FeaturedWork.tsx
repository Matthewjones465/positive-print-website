"use client";

import { motion } from "framer-motion";

const CASE_STUDIES = [
  {
    client: "SA Medical Services",
    headline: "WebAR product visualizations & pediatric gifting activation kits",
    description:
      "3D-rendered product visualization and a custom gifting activation kit designed for pediatric brand touchpoints across the SMT portfolio.",
  },
  {
    client: "Skyy Aviation",
    headline: "Turnkey signage, brand identity rollout & corporate collateral",
    description:
      "End-to-end brand identity rollout — signage, uniforms, and corporate collateral — delivered as one coordinated studio engagement.",
  },
  {
    client: "Preview Designer Collection",
    headline: "Luxury brand collateral, print & retail display",
    description:
      "Premium print collateral and in-store retail display production built to match a luxury fashion brand's standard.",
  },
  {
    client: "Social Runners Club",
    headline: "Event branding, live audio/DJ setup, merch & video recaps",
    description:
      "Full event production — branding, live sound and DJ curation, merch runs, and high-energy video recap content.",
  },
];

export default function FeaturedWork() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {CASE_STUDIES.map((c, i) => (
        <motion.div
          key={c.client}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 p-7"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            {c.client}
          </span>
          <h3 className="text-lg md:text-xl font-semibold mt-2 mb-3 leading-snug">{c.headline}</h3>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {c.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
