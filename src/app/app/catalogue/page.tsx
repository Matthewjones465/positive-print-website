import type { Metadata } from "next";
import { getAmrodCatalogue } from "@/lib/amrod";
import CatalogueBrowser from "./CatalogueBrowser";

export const metadata: Metadata = {
  title: "Catalogue — Positive Print & Promotion",
  description:
    "Browse our full range of promotional products — apparel, gifting, signage accessories and more.",
};

// Revalidate the page itself alongside the cached Amrod fetch.
export const revalidate = 3600;

const TOPBAR_HTML = `
<div class="topbar">
  <div class="wrap topbar-inner">
    <div class="brand"><a href="/"><img src="/logo.png" alt="Positive Print & Promotion"></a></div>
    <nav class="navlinks">
      <a href="/#services">Services</a>
      <a href="/catalogue">Catalogue</a>
      <a href="/#journal">Journal</a>
      <a href="/#about">About</a>
      <a href="/#contact">Contact</a>
    </nav>
    <a class="cta-pill" href="/#contact">Get a quote</a>
  </div>
</div>
`;

export default async function CataloguePage() {
  let items: Awaited<ReturnType<typeof getAmrodCatalogue>> = [];
  let error: string | null = null;

  try {
    items = await getAmrodCatalogue();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load the catalogue.";
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: TOPBAR_HTML }} />

      <header className="cat-hero">
        <div className="wrap">
          <span className="hero-tag">Promotional products</span>
          <h1 className="display">Browse the<br />full catalogue</h1>
          <p className="hero-sub">
            Every product below can be branded to match your identity — search, filter by
            category, and enquire directly on anything that catches your eye.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          {error ? (
            <div className="cat-error">
              <p>
                The product catalogue couldn&apos;t be loaded right now ({error}). Please
                try again shortly, or{" "}
                <a href="/#contact">get in touch</a> and we&apos;ll help you find what
                you&apos;re after.
              </p>
            </div>
          ) : (
            <CatalogueBrowser items={items} />
          )}
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>© 2026 Positive Print &amp; Promotion</span>
          <span>Product data supplied by Amrod</span>
        </div>
      </footer>
    </>
  );
}
