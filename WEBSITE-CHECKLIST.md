# Positive Print & Promotion — website roadmap to "world-class"

A running checklist of gaps and improvements. Check items off as they ship. Last updated: 2026-10-01.

## Pass 1 — Technical / SEO foundation (invisible but critical)

- [x] Fix stale metadata in `layout.tsx` ("50% Black Woman-owned" → BEE Level 2)
- [x] Add Open Graph + Twitter card metadata (so shared links on WhatsApp/LinkedIn/Slack show a proper title, description, image)
- [x] Add `sitemap.xml` and `robots.txt` for Google indexing
- [x] Add Vercel Analytics (or GA4) so there's visibility into real traffic and conversion
- [x] Convert plain `<img>` tags to `next/image` across the site for responsive sizing, lazy-loading, and modern image formats (WebP/AVIF) — done for logo, hero, about, client logos, and all journal images. Catalogue product images intentionally left as plain `<img>` since they come from Amrod's live supplier feed on an unpredictable CDN domain.
- [ ] Confirm the contact form ("Send enquiry") actually submits somewhere structured (CRM/email/Sanity) rather than just a mailto link

- [x] Add WhatsApp integration — floating button site-wide, plus chips in the contact section and footer, linking to wa.me with +27 71 609 3755

- [x] Compress oversized source images (catalogue-2.jpg was 3MB/2362px for a small swatch — now 163KB) and convert all remaining CSS background-images (portfolio grid, catalogue swatches, journal preview swatches) to next/image
- [x] Add LocalBusiness (ProfessionalService) JSON-LD structured data for local SEO
- [x] Add keyword-rich homepage-specific metadata (previously inherited only the generic site default)

## Pass 2 — Content completeness (Sanity CMS)

- [ ] Audit Portfolio Items in Sanity Studio — replace any placeholder/fallback entries with real project photography
- [ ] Audit Client Logos in Sanity Studio — confirm real client logos are populated, not fallback data
- [ ] Add more Journal Posts content in Sanity (beyond the Instagram auto-pull)
- [ ] Replace the Studio Journal "Planned feature" fallback copy if it's still showing anywhere stale

## Pass 3 — Polish & design feedback

- [ ] Mobile responsiveness pass (check all pages on a real phone, not just resize)
- [ ] General design feedback pass once the above is live and visible

## Deferred (queued, not started)

- [ ] Automated Instagram comment/DM reply system
- [ ] LinkedIn integration on the page (needs profile URL)
