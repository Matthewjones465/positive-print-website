// Server-side only. Never import this file from a client component —
// it reads AMROD_* secrets from the environment and talks directly to
// Amrod's API. Credentials never reach the browser this way.

const IDENTITY_URL = "https://identity.amrod.co.za/VendorLogin";

// TODO: replace with the real product-listing endpoint from Amrod's docs
// (https://newapidocs.amrod.co.za/) once you have it — the "Get data"
// request already saved in your Postman collection is a good place to
// find it, since that's presumably where Amrod's onboarding pointed you.
const PRODUCTS_URL = process.env.AMROD_PRODUCTS_URL ?? "";

type TokenCache = { token: string; expiresAt: number } | null;

// Cached in memory for the lifetime of the serverless function instance.
// This is a reasonable optimisation (Amrod tokens last 1hr) but isn't
// guaranteed to persist between invocations on every host — if you see
// more login calls than expected in Amrod's logs, that's why, and it's
// safe, just not maximally efficient.
let cache: TokenCache = null;

function readEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name} — set it in your hosting provider's environment variables (see .env.local.example).`
    );
  }
  return value;
}

async function fetchNewToken(): Promise<{ token: string; expiresAt: number }> {
  const username = readEnv("AMROD_USERNAME");
  const password = readEnv("AMROD_PASSWORD");
  const customerCode = readEnv("AMROD_CUSTOMER_CODE");

  const res = await fetch(IDENTITY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserName: username,
      Password: password,
      CustomerCode: customerCode,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Amrod login failed (${res.status}): ${body}`);
  }

  const data = await res.json();

  // Amrod's exact response field naming wasn't fully confirmed during
  // testing (a JWT string plus an "expiry": 3600 field were seen) — this
  // checks the likely field names defensively rather than assuming one.
  const token: string | undefined =
    data.token ?? data.Token ?? data.accessToken ?? data.access_token ?? data.jwt;
  const expiresInSeconds: number = data.expiry ?? data.expiresIn ?? data.expires_in ?? 3600;

  if (!token) {
    throw new Error(
      `Amrod login succeeded but no token field was recognised in the response: ${JSON.stringify(
        data
      ).slice(0, 200)}`
    );
  }

  // Refresh a little early (5 min buffer) rather than cutting it exactly at expiry.
  const expiresAt = Date.now() + (expiresInSeconds - 300) * 1000;
  return { token, expiresAt };
}

export async function getAmrodToken(): Promise<string> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.token;
  }
  const fresh = await fetchNewToken();
  cache = fresh;
  return fresh.token;
}

export type AmrodProduct = {
  code: string;
  name: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  price?: number;
};

export async function getAmrodProducts(): Promise<AmrodProduct[]> {
  if (!PRODUCTS_URL) {
    throw new Error(
      "AMROD_PRODUCTS_URL is not set yet — grab the real product-listing endpoint from Amrod's API docs or your Postman collection's 'Get data' request, then set it as an environment variable."
    );
  }

  const token = await getAmrodToken();
  const res = await fetch(PRODUCTS_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Amrod product fetch failed (${res.status}): ${body}`);
  }

  return res.json();
}
