// Server-side only. Never import this file from a client component —
// it reads AMROD_* secrets from the environment and talks directly to
// Amrod's API. Credentials never reach the browser this way.

const IDENTITY_URL = "https://identity.amrod.co.za/VendorLogin";

// Confirmed from Amrod's own API docs (Catalogue Vendor API > "Get
// Products without Branding Updated"). Overridable via env var in case
// Amrod changes it or you want the "with branding" variant instead.
const PRODUCTS_URL =
  process.env.AMROD_PRODUCTS_URL ?? "https://vendorapi.amrod.co.za/api/v1/Products/";

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

  const data = await res.json();
  // The exact response shape wasn't confirmed from Amrod's docs (their
  // example showed no sample response body) — this assumes a bare array.
  // If /api/amrod/products errors or looks wrong once tested live, the
  // real response is probably wrapped, e.g. { products: [...] } or
  // { data: [...] } — check the raw JSON and adjust the line below.
  return Array.isArray(data) ? data : data.products ?? data.data ?? data;
}

// Confirmed live (Sep 2026): Amrod returns a bare JSON array of raw product
// records. Each record looks roughly like:
//   {
//     simpleCode, fullCode, productName, description,
//     categories: [{ name, path, ... }],
//     images: [{ isDefault, urls: [{ url, width, height }] }],
//     ...
//   }
// This is the shape the catalogue page actually renders from — kept
// separate from getAmrodProducts() above (whose AmrodProduct type predates
// this confirmation) so neither has to guess the other's shape.
export type AmrodRawProduct = {
  simpleCode?: string;
  fullCode?: string;
  productName?: string;
  description?: string;
  categories?: { name?: string }[];
  images?: {
    isDefault?: boolean;
    urls?: { url?: string }[];
  }[];
};

export type CatalogueItem = {
  code: string;
  name: string;
  category: string;
  image: string | null;
};

function pickImage(record: AmrodRawProduct): string | null {
  const images = record.images ?? [];
  const preferred = images.find((img) => img.isDefault) ?? images[0];
  return preferred?.urls?.[0]?.url ?? null;
}

// Fetches the full catalogue and maps it into the light shape the
// catalogue page needs. Cached for an hour (Amrod's feed doesn't need to
// be checked on every page view) rather than no-store like the diagnostic
// route above.
export async function getAmrodCatalogue(): Promise<CatalogueItem[]> {
  if (!PRODUCTS_URL) {
    throw new Error("AMROD_PRODUCTS_URL is not set.");
  }

  const token = await getAmrodToken();
  const res = await fetch(PRODUCTS_URL, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Amrod product fetch failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  const raw: AmrodRawProduct[] = Array.isArray(data)
    ? data
    : data.products ?? data.data ?? [];

  return raw
    .map((record) => {
      const code = record.simpleCode ?? record.fullCode ?? "";
      const name = record.productName ?? "";
      if (!code || !name) return null;
      return {
        code,
        name,
        category: record.categories?.[0]?.name ?? "",
        image: pickImage(record),
      } satisfies CatalogueItem;
    })
    .filter((item): item is CatalogueItem => item !== null);
}
