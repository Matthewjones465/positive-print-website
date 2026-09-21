import type { Metadata } from "next";
import { getJournalPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal — Positive Print & Promotion",
  description: "Recent projects and studio updates from Positive Print & Promotion.",
};

export const revalidate = 300;

const TOPBAR_HTML = `
<div class="topbar">
  <div class="wrap topbar-inner">
    <div class="brand"><a href="/"><img src="/logo.png" alt="Positive Print & Promotion"></a></div>
    <nav class="navlinks">
      <a href="/#services">Services</a>
      <a href="/catalogue">Catalogue</a>
      <a href="/journal">Journal</a>
      <a href="/#about">About</a>
      <a href="/#contact">Contact</a>
    </nav>
    <a class="cta-pill" href="/#contact">Get a quote</a>
  </div>
</div>
`;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: TOPBAR_HTML }} />

      <header className="cat-hero">
        <div className="wrap">
          <span className="hero-tag">Studio journal</span>
          <h1 className="display">From the<br />studio floor</h1>
          <p className="hero-sub">
            Recent projects, behind-the-scenes notes, and updates from the Positive Print
            & Promotion team.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          {posts.length === 0 ? (
            <div className="cat-error">
              <p>
                No journal posts yet — check back soon, or{" "}
                <a href="/#contact">get in touch</a>.
              </p>
            </div>
          ) : (
            <div className="cat-grid">
              {posts.map((post) => (
                <a key={post._id} className="cat-card" href={`/journal/${post.slug}`}>
                  <div className="cat-card-image">
                    {post.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImageUrl} alt={post.title} loading="lazy" />
                    ) : (
                      <div className="cat-card-noimage" />
                    )}
                  </div>
                  <div className="cat-card-body">
                    <span className="cat-card-category">{formatDate(post.publishedAt)}</span>
                    <h3>{post.title}</h3>
                    {post.excerpt && <span className="cat-card-code">{post.excerpt}</span>}
                    <span className="cat-card-cta">Read more →</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>© 2026 Positive Print &amp; Promotion</span>
          <span>Studio journal</span>
        </div>
      </footer>
    </>
  );
}
