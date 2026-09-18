# Going live on positivepp.co.za

## 1. Push this project to GitHub

Create a new (private) repository on GitHub and push this folder to it —
Vercel deploys straight from a GitHub repo.

## 2. Deploy to Vercel

1. Go to https://vercel.com and sign up (free tier is fine to start).
2. "Add New Project" → import the GitHub repo you just created.
3. Before deploying, add these Environment Variables (Vercel will prompt
   you, or find it under Project → Settings → Environment Variables):
   - `AMROD_USERNAME`
   - `AMROD_PASSWORD`
   - `AMROD_CUSTOMER_CODE`
   - `AMROD_PRODUCTS_URL` (once you have the real endpoint)
4. Click Deploy. Vercel gives you a working `*.vercel.app` URL immediately
   — check `/api/amrod/token` on that URL to confirm the Amrod connection
   works in production before moving on to the domain.

## 3. Point positivepp.co.za at it — the part that needs care

This is the step that can break your email if rushed, so read this fully
before changing anything.

**Do NOT touch your domain's MX records.** MX records are what route
`@positivepp.co.za` email to wherever it's hosted (Google Workspace,
Microsoft 365, or your current host's mail). Since you told me email is in
use on this domain, those records must be left exactly as they are.

**What you actually need to change** is your domain's A record and/or
CNAME record (these control where the *website* — not email — is served
from), plus possibly nothing else. In your domain's DNS management panel
(wherever positivepp.co.za is registered — this might be the same place
as your current WordPress hosting, or a separate registrar):

1. In Vercel, go to Project → Settings → Domains, and add
   `positivepp.co.za` (and `www.positivepp.co.za`).
2. Vercel will show you the exact DNS records to add — typically an `A`
   record pointing to Vercel's IP for the root domain, and a `CNAME`
   pointing `www` to `cname.vercel-dns.com`. Copy these exactly as shown.
3. In your DNS panel, add those records. **Leave every existing MX record
   untouched** — only add/change the A and CNAME records Vercel gave you.
4. DNS changes can take anywhere from a few minutes to 24-48 hours to
   fully propagate. Your email keeps working the whole time, since its
   records weren't touched.
5. Once propagated, positivepp.co.za will serve the new site, and your
   WordPress site becomes unreachable via that domain (your existing
   WordPress hosting account itself isn't deleted — just no longer
   pointed to by the domain).

**If you're not sure where your domain's DNS is managed**, or you don't
have login access to that panel, that's the one piece only you (or
whoever set up positivepp.co.za originally) can access — I can talk you
through the specific screens once you're logged in, but I can't do this
step for you.

## 4. Before you flip the switch

- Confirm the new site looks right on the `*.vercel.app` preview URL first.
- Confirm `/api/amrod/token` returns `{"ok":true,...}` in production.
- Keep your WordPress hosting account active for a few weeks after
  cutover as a fallback, rather than cancelling it immediately.
