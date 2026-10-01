# Positive Print & Promotion — website roadmap to "world-class"

A running checklist of gaps and improvements. Check items off as they ship. Last updated: 2026-10-01.

## Pass 1 — Technical / SEO foundation (invisible but critical)

- [ ] Fix stale metadata in `layout.tsx` ("50% Black Woman-owned" → BEE Level 2)
- [ ] Add Open Graph + Twitter card metadata (so shared links on WhatsApp/LinkedIn/Slack show a proper title, description, image)
- [ ] Add `sitemap.xml` and `robots.txt` for Google indexing
- [ ] Add Vercel Analytics (or GA4) so there's visibility into real traffic and conversion
- [ ] Convert plain `<img>` tags to `next/image` across the site for responsive sizing, lazy-loading, and modern image formats (WebP/AVIF) — biggest page-speed win
- [ ] Confirm the contact form ("Send enquiry") actually submits somewhere structured (CRM/email/Sanity) rather than just a mailto link

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
