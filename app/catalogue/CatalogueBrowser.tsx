"use client";

import { useMemo, useState } from "react";

export type CatalogueItem = {
  code: string;
  name: string;
  category: string;
  image: string | null;
};

const PAGE_SIZE = 24;

export default function CatalogueBrowser({ items }: { items: CatalogueItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const item of items) {
      if (item.category) set.add(item.category);
    }
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, category]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="cat-controls">
        <input
          type="text"
          className="cat-search"
          placeholder="Search products…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE);
          }}
        />
        <select
          className="cat-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setVisible(PAGE_SIZE);
          }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="cat-count">
        {filtered.length} product{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="cat-grid">
        {shown.map((item) => (
          <a
            key={item.code}
            className="cat-card"
            href={`mailto:matthew@positivepp.co.za?subject=${encodeURIComponent(
              "Enquiry: " + item.name + " (" + item.code + ")"
            )}`}
          >
            <div className="cat-card-image">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name} loading="lazy" />
              ) : (
                <div className="cat-card-noimage" />
              )}
            </div>
            <div className="cat-card-body">
              <span className="cat-card-category">{item.category || "Promotional"}</span>
              <h3>{item.name}</h3>
              <span className="cat-card-code">{item.code}</span>
              <span className="cat-card-cta">Enquire →</span>
            </div>
          </a>
        ))}
      </div>

      {shown.length < filtered.length && (
        <div className="cat-more">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Load more
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="cat-empty">No products match that search — try another term or category.</p>
      )}
    </div>
  );
}
