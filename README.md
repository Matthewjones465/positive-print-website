# Positive Print & Promotion — website

A Next.js rebuild of the Positive Print & Promotion homepage, with a
server-side integration to Amrod's product API (the connection is tested
and confirmed working — see `src/lib/amrod.ts`).

## What's here

- `src/app/page.tsx` — the homepage (design approved in the Claude conversation).
- `src/lib/amrod.ts` — logs into Amrod and fetches an API token, server-side only.
  Credentials never reach the browser.
- `src/app/api/amrod/token` — visit this route after deploying to confirm the
  Amrod connection is working in production.
- `src/app/api/amrod/products` — will return live product data once
  `AMROD_PRODUCTS_URL` is set (see "What's still missing" below).

## Running it locally

You'll need [Node.js](https://nodejs.org) installed (v20 or newer).

```bash
npm install
cp .env.local.example .env.local
# then edit .env.local with your real (current, rotated) Amrod password
npm run dev
```

Open http://localhost:3000 to see the site, and
http://localhost:3000/api/amrod/token to confirm the API connection works.

## What's still missing before the catalogue is live

1. **The real product-listing endpoint.** Amrod's login/token flow is fully
   wired up and tested, but the actual "list products" endpoint path wasn't
   available when this was built — grab it from
   [Amrod's API docs](https://newapidocs.amrod.co.za/) (their "Get data"
   request already saved in your Postman collection is a good place to
   check first), then set it as `AMROD_PRODUCTS_URL` in your environment
   variables.
2. **A CMS for editable content** (services text, portfolio images, the
   studio journal) — not yet wired in. Recommended: Sanity (free tier).
3. **The Instagram-connected journal** — needs a Meta/Instagram Business
   API connection, not yet built.
4. **Real portfolio photography** — the portfolio section currently uses
   colour-block placeholders, not real project photos.

See `DEPLOYMENT.md` for how to put this live on positivepp.co.za.

