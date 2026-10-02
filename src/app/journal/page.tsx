import type { Metadata } from "next";
import Image from "next/image";
import { getJournalPosts, getSiteSettings, type JournalPostSummary } from "@/lib/content";
import { getInstagramPosts, instagramPostTitle, type InstagramPost } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Journal",
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

// A single shape the grid can render regardless of where the post came
// from — a Sanity-authored journal entry (internal link, own detail page)
// or an Instagram post (external link, opens on Instagram).
type FeedItem = {
  key: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  publishedAt: string;
  href: string;
  external: boolean;
  source: "sanity" | "instagram";
};

function sanityToFeedItem(post: JournalPostSummary): FeedItem {
  return {
    key: `sanity-${post._id}`,
    title: post.title,
    excerpt: post.excerpt ?? null,
    imageUrl: post.coverImageUrl,
    publishedAt: post.publishedAt,
    href: `/journal/${post.slug}`,
    external: false,
    source: "sanity",
  };
}

function instagramToFeedItem(post: InstagramPost): FeedItem {
  return {
    key: `instagram-${post.id}`,
    title: instagramPostTitle(post),
    excerpt: null,
    imageUrl: post.mediaUrl ?? post.thumbnailUrl,
    publishedAt: post.timestamp,
    href: post.permalink,
    external: true,
    source: "instagram",
  };
}

export default async function JournalPage() {
  const [sanityPosts, instagramPosts, settings] = await Promise.all([
    getJournalPosts(),
    getInstagramPosts(),
    getSiteSettings(),
  ]);

  const feed: FeedItem[] = [
    ...sanityPosts.map(sanityToFeedItem),
    ...instagramPosts.map(instagramToFeedItem),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: TOPBAR_HTML }} />

      <header className="cat-hero">
        <div className="wrap">
          <span className="hero-tag">Studio journal</span>
          <h1 className="display">From the<br />studio floor</h1>
          <p className="hero-sub">
            A running record of print runs, brand launches, activations, and content shoots
            as they happen — no staged portfolio, just the real work in progress.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingBottom: "0" }}>
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
            Every entry here comes straight from one of our four disciplines — print, signage
            and merch production; brand and design strategy; photo and video content; or live
            events and activations. We run all four under one studio, so a single client
            engagement often moves through several of them at once. This feed is where that
            process actually gets documented, alongside our{" "}
            <a href={`https://www.instagram.com/${settings.instagramHandle.replace(/^@/, "")}`} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {feed.length === 0 ? (
            <div className="cat-error">
              <p>
                No journal posts yet — check back soon, or{" "}
                <a href="/#contact">get in touch</a>.
              </p>
            </div>
          ) : (
            <div className="cat-grid">
              {feed.map((item) => (
                <a
                  key={item.key}
                  className="cat-card"
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <div className="cat-card-image">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 700px) 50vw, 220px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="cat-card-noimage" />
                    )}
                  </div>
                  <div className="cat-card-body">
                    <span className="cat-card-category">
                      {formatDate(item.publishedAt)}
                      {item.source === "instagram" ? " · Instagram" : ""}
                    </span>
                    <h3>{item.title}</h3>
                    {item.excerpt && <span className="cat-card-code">{item.excerpt}</span>}
                    <span className="cat-card-cta">
                      {item.external ? "View on Instagram →" : "Read more →"}
                    </span>
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
