import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getJournalPost } from "@/lib/content";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) return { title: "Journal — Positive Print & Promotion" };
  return {
    title: `${post.title} — Positive Print & Promotion`,
    description: post.excerpt,
  };
}

export const revalidate = 300;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: TOPBAR_HTML }} />

      <header className="cat-hero">
        <div className="wrap">
          <span className="hero-tag">{formatDate(post.publishedAt)}</span>
          <h1 className="display">{post.title}</h1>
          {post.excerpt && <p className="hero-sub">{post.excerpt}</p>}
        </div>
      </header>

      <section className="section">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          {post.coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImageUrl}
              alt={post.title}
              style={{ width: "100%", borderRadius: "12px", marginBottom: "2rem" }}
            />
          )}
          {post.body && <PortableText value={post.body} />}
          <p style={{ marginTop: "3rem" }}>
            <a href="/journal">← Back to the journal</a>
          </p>
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
