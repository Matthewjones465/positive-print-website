import {
  getSiteSettings,
  getServices,
  getPortfolioItems,
  getClientLogos,
  getJournalPosts,
} from "@/lib/content";
import Reveal from "./Reveal";
import CapabilitiesList from "./CapabilitiesList";
import FAQAccordion from "./FAQAccordion";

export const revalidate = 300;

const PORTFOLIO_FALLBACK_CLASS = ["p1", "p2", "p3", "p4", "p5", "p6"];

const FAQ_ITEMS = [
  {
    question: "What's the typical turnaround for a print or apparel run?",
    answer:
      "Most standard runs (apparel branding, signage, print collateral) are 5–10 working days from approved artwork, depending on quantity and finishing. Rush turnaround is available — just flag it in your brief.",
  },
  {
    question: "Do you handle both design and production?",
    answer:
      "Yes — Origin, artwork, and production happen under one roof: design, print, embroidery, signage and packaging are all coordinated by the same studio, so nothing gets lost between suppliers.",
  },
  {
    question: "Can I order promotional products directly?",
    answer:
      "Yes — browse the full live catalogue, find what you need, and hit \"Enquire\" on any product to start an order with our team directly.",
  },
  {
    question: "Do you work with brands outside Durban?",
    answer:
      "Definitely. While the studio is based in Durban, we ship nationally and regularly run projects for clients across South Africa.",
  },
];

function splitHeadline(headline: string) {
  const idx = headline.indexOf("|");
  if (idx === -1) return { before: headline, emphasis: "" };
  return { before: headline.slice(0, idx), emphasis: headline.slice(idx + 1) };
}

export default async function Home() {
  const [settings, services, portfolio, clients, journalPosts] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getPortfolioItems(),
    getClientLogos(),
    getJournalPosts(),
  ]);

  const { before, emphasis } = splitHeadline(settings.heroHeadline);
  const hasJournalPosts = journalPosts.length > 0;

  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">
            <img src="/logo.png" alt="Positive Print & Promotion" />
          </div>
          <nav className="navlinks">
            <a href="#services">Capabilities</a>
            <a href="/catalogue">Catalogue</a>
            <a href="#journal">Journal</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="cta-pill" href="#contact">Get a quote</a>
        </div>
      </div>

      {/* ---- hero ---- */}
      <header
        className="hero"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 0%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 55%), linear-gradient(165deg, var(--paper-2), var(--paper))",
        }}
      >
        <div className="wrap">
          <span className="hero-tag">{settings.heroTag}</span>
          <h1 className="display">
            {before}
            {emphasis && <em>{emphasis}</em>}
          </h1>
          <p className="hero-sub">{settings.heroSubtext}</p>
          <div className="hero-actions">
            <a className="seg-btn" href="#contact">
              <span className="seg-icon">→</span>
              <span className="seg-label">Start a project</span>
            </a>
            <a className="seg-btn seg-btn-light" href="#portfolio">
              <span className="seg-icon">↓</span>
              <span className="seg-label">See the work</span>
            </a>
          </div>
          <div className="hero-badges">
            <div className="hero-badge"><span className="swatch"></span>100% Woman-owned</div>
            <div className="hero-badge"><span className="swatch"></span>50% Black Woman-owned</div>
            <div className="hero-badge"><span className="swatch"></span>One studio, seven disciplines</div>
          </div>
        </div>
      </header>

      {/* ---- about ---- */}
      <section className="section" id="about">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow-mark">About us</span>
            <h2 className="display" style={{ fontSize: "clamp(1.6rem,3.4vw,2.4rem)", maxWidth: "24ch", marginBottom: "28px" }}>
              {settings.aboutHeadline}
            </h2>
            <p style={{ maxWidth: "62ch", fontSize: "1.05rem", lineHeight: 1.6, color: "var(--ink-soft)" }}>
              Positive Print &amp; Promotion exists to prove that{" "}
              <strong style={{ color: "var(--ink)" }}>bold branding and principled ownership aren&apos;t a trade-off.</strong>{" "}
              We&apos;re a 100% Woman-owned, 50% Black Woman-owned studio built on the belief
              that the people shaping South African brands should reflect the country they&apos;re
              building them in — apparel, signage, packaging and promotional print, all moving
              through one coordinated studio from first sketch to final delivery.
            </p>
            <div style={{ marginTop: "32px" }}>
              <a className="seg-btn" href="#services">
                <span className="seg-icon">↗</span>
                <span className="seg-label">Learn more</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- full-bleed statement (placeholder for real studio/event photography) ---- */}
      <section className="statement">
        <div className="statement-media" aria-hidden="true" />
        <div className="wrap statement-content">
          <Reveal>
            <h2>From concept to scaled rollout — every pixel and print run serves a purpose.</h2>
          </Reveal>
        </div>
      </section>

      {/* ---- clients strip ---- */}
      <section className="section cap-section" style={{ paddingBlock: "clamp(32px,5vw,56px)" }}>
        <div className="wrap">
          <span className="eyebrow-mark">Trusted by</span>
          <div className="clients-row">
            {clients.map((c) =>
              c.logoUrl ? (
                <img key={c._id} className="client-chip" src={c.logoUrl} alt={c.name} style={{ height: "28px", width: "auto" }} />
              ) : (
                <span className="client-chip" key={c._id} style={{ background: "transparent", borderColor: "color-mix(in srgb, var(--paper) 30%, transparent)", color: "var(--paper)" }}>
                  {c.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ---- portfolio / selected work ---- */}
      <section className="section" id="portfolio">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow-mark">Selected work</span>
            <h2 className="display" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", marginBottom: "40px", maxWidth: "18ch" }}>
              Shaping bold ideas into absolute print precision.
            </h2>
          </Reveal>
          <div className="portfolio-grid">
            {portfolio.map((p, i) => (
              <div
                className={`p-card ${p.imageUrl ? "" : PORTFOLIO_FALLBACK_CLASS[i % PORTFOLIO_FALLBACK_CLASS.length]}`}
                key={p._id}
                style={
                  p.imageUrl
                    ? { backgroundImage: `url(${p.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : undefined
                }
              >
                <div className="p-tag">{String(i + 1).padStart(2, "0")} — {p.category}</div>
                <h3>{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- catalogue / journal panels ---- */}
      <section className="section" id="catalogue">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow-mark">Promotional products</span>
            <h2 className="display" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", marginBottom: "40px" }}>
              Browse &amp; order promo products
            </h2>
          </Reveal>
          <div className="phase-grid">
            <a className="phase-card" href="/catalogue" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <span className="phase-kicker">Live now</span>
              <h3>Product catalogue</h3>
              <p>Scroll through promotional products by category, view details, and enquire directly — live from our supplier feed.</p>
              <div className="phase-mock"><div className="sw"></div><div className="sw"></div><div className="sw"></div></div>
              <div className="note">Browse the full catalogue →</div>
            </a>
            <a
              className="phase-card"
              id="journal"
              href={hasJournalPosts ? "/journal" : "#journal"}
              style={hasJournalPosts ? { textDecoration: "none", color: "inherit", display: "block" } : undefined}
            >
              <span className="phase-kicker">{hasJournalPosts ? "Live now" : "Planned feature"}</span>
              <h3>Studio journal</h3>
              <p>
                {hasJournalPosts
                  ? "Recent projects and studio updates, written straight from the floor."
                  : "An interactive blog pulling in real project imagery, connected to Instagram so the site updates as new work gets posted."}
              </p>
              <div className="phase-mock"><div className="sw"></div><div className="sw"></div><div className="sw"></div></div>
              <div className="note">
                {hasJournalPosts ? "Read the journal →" : "Needs: Instagram Business account connected via Meta's API."}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ---- capabilities (dark, scroll-highlighted list) ---- */}
      <section className="section cap-section" id="services">
        <div className="wrap">
          <div className="cap-head">
            <span className="eyebrow-mark">Core capabilities</span>
          </div>
          <CapabilitiesList items={services.map((s) => s.title)} />
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="section faq-section">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <Reveal>
            <div className="faq-intro">
              <span className="eyebrow-mark">Questions &amp; answers</span>
              <h2 className="display" style={{ fontSize: "clamp(1.6rem,3.4vw,2.2rem)" }}>Have more questions?</h2>
            </div>
            <div className="faq-contact">
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>
                <span className="ico">☎</span>{settings.phone}
              </a>
              <a href={`mailto:${settings.email}`}>
                <span className="ico">✉</span>{settings.email}
              </a>
            </div>
            <FAQAccordion items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </section>

      {/* ---- contact / CTA ---- */}
      <section className="section cta-section" id="contact">
        <div className="wrap">
          <span className="eyebrow-mark" style={{ color: "var(--accent)" }}>Start a job</span>
          <h2 className="display">Tell us what<br />you&apos;re dreaming up</h2>
          <p className="lede">Send a brief or just a rough idea — we&apos;ll come back with scope, timeline and a quote.</p>
          <div className="cta-grid">
            <div>
              <div className="contact-facts">
                <div className="row"><span className="k">Phone</span><span className="v"><a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>{settings.phone}</a></span></div>
                <div className="row"><span className="k">Email</span><span className="v"><a href={`mailto:${settings.email}`}>{settings.email}</a></span></div>
                <div className="row"><span className="k">Studio</span><span className="v">{settings.studioAddress}</span></div>
              </div>
              <div className="social-row">
                <a className="social-chip" href={`https://www.instagram.com/${settings.instagramHandle}`} target="_blank" rel="noopener" aria-label="Instagram">
                  Instagram — @{settings.instagramHandle}
                </a>
              </div>
            </div>
            <div className="form-card">
              <div className="field-row">
                <div className="field"><span className="f-label">Name</span><input type="text" id="cf-name" placeholder="Your name" /></div>
                <div className="field"><span className="f-label">Company</span><input type="text" id="cf-company" placeholder="Company" /></div>
              </div>
              <div className="field-row">
                <div className="field"><span className="f-label">Email</span><input type="email" id="cf-email" placeholder="you@company.com" /></div>
                <div className="field"><span className="f-label">Phone</span><input type="tel" id="cf-phone" placeholder="083 000 0000" /></div>
              </div>
              <div className="field">
                <span className="f-label">What do you need printed?</span>
                <textarea id="cf-brief" placeholder="Tell us about the project, timeline and quantities…"></textarea>
              </div>
              <a className="btn-primary" href={`mailto:${settings.email}`}>Send enquiry</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- expanded footer ---- */}
      <footer className="footer-expanded">
        <div className="wrap">
          <img src="/logo-mark-white.png" alt="Positive Print & Promotion" className="footer-mark" />
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-col-label">01 / Quick links</div>
              <a href="/catalogue">Catalogue</a>
              <a href={hasJournalPosts ? "/journal" : "#journal"}>Journal</a>
              <a href="#about">About</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-label">02 / Contact</div>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
              <p>{settings.studioAddress}</p>
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}>{settings.phone}</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-label">03 / Socials</div>
              <a href={`https://www.instagram.com/${settings.instagramHandle}`} target="_blank" rel="noopener">Instagram</a>
            </div>
          </div>
          <div className="footer-wordmark">
            <span className="word">POSITIVE</span>
            <span className="meta">© 2026 Positive Print &amp; Promotion — Durban, South Africa</span>
          </div>
        </div>
      </footer>
    </>
  );
}
