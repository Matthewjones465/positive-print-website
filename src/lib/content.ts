// Server-only. Fetches CMS-managed content from Sanity, with safe
// fallbacks to the site's original hardcoded copy so nothing breaks
// before real content has been entered in the Studio (or before the
// NEXT_PUBLIC_SANITY_* env vars are set at all).

import { client } from "@/sanity/client";
import type { PortableTextBlock } from "sanity";

export type SiteSettings = {
  heroTag: string;
  heroHeadline: string; // "Bold ideas, brought to |life." — | marks the <em>
  heroSubtext: string;
  aboutHeadline: string;
  aboutBody: PortableTextBlock[] | null;
  phone: string;
  email: string;
  studioAddress: string;
  instagramHandle: string;
};

export type Service = {
  _id: string;
  numeral: string;
  title: string;
  description: string;
};

export type PortfolioItem = {
  _id: string;
  title: string;
  category: string;
  description?: string;
  imageUrl: string | null;
};

export type ClientLogoItem = {
  _id: string;
  name: string;
  logoUrl: string | null;
};

export type JournalPostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl: string | null;
  publishedAt: string;
};

export type JournalPost = JournalPostSummary & {
  body: PortableTextBlock[] | null;
};

const FALLBACK_SETTINGS: SiteSettings = {
  heroTag: "Durban, South Africa · 100% Woman-Owned",
  heroHeadline: "Bold ideas, brought to |life.",
  heroSubtext:
    "Positive Print & Promotion is a Durban-based branding studio turning apparel, signage, packaging and promotional ideas into work our clients are proud to put their name on — from first sketch to finished, delivered product.",
  aboutHeadline: "Studio-led, values-first",
  aboutBody: null,
  phone: "031 566 1763",
  email: "matthew@positivepp.co.za",
  studioAddress: "26 Crassula Road, Ottawa South, Blackburn, 4339",
  instagramHandle: "positive_agency_za",
};

const FALLBACK_SERVICES: Service[] = [
  { _id: "f1", numeral: "I.", title: "Apparel branding", description: "Screen print, embroidery and heat transfer for teamwear, workwear and merch runs of any size." },
  { _id: "f2", numeral: "II.", title: "Signage & vehicle wraps", description: "Fleet wraps, shopfronts and site signage — designed, printed and installed." },
  { _id: "f3", numeral: "III.", title: "Packaging & labels", description: "Structural design through to litho and digital print runs, ready for the shelf." },
  { _id: "f4", numeral: "IV.", title: "Design & print", description: "Collateral, stationery and large-format print, from concept to matched proof." },
  { _id: "f5", numeral: "V.", title: "In-store & outdoor branding", description: "Point-of-sale, activations and outdoor installs built to last through a KZN summer." },
  { _id: "f6", numeral: "VI.", title: "Promotional gifts", description: "Branded corporate gifting, sourced and decorated to match your identity." },
  { _id: "f7", numeral: "VII.", title: "Web & content", description: "Websites, social content and copywriting — the digital half of the same brand." },
];

const FALLBACK_CLIENTS: ClientLogoItem[] = [
  { _id: "c1", name: "DStv", logoUrl: "/clients/dstv.png" },
  { _id: "c2", name: "EY", logoUrl: "/clients/ey.png" },
  { _id: "c3", name: "SPAR", logoUrl: "/clients/spar.png" },
  { _id: "c4", name: "Illovo", logoUrl: "/clients/illovo.png" },
  { _id: "c5", name: "Debonairs", logoUrl: "/clients/debonairs.png" },
  { _id: "c6", name: "SA Medical", logoUrl: "/clients/sa-medical.png" },
  { _id: "c7", name: "KZN Tourism & Film Authority", logoUrl: "/clients/kzntfa.png" },
  { _id: "c8", name: "Hilton College", logoUrl: "/clients/hilton-college.png" },
  { _id: "c9", name: "Skyy Aviation Academy", logoUrl: "/clients/skyy.png" },
];

const FALLBACK_PORTFOLIO: PortfolioItem[] = [
  { _id: "p1", title: "Teamwear & merch runs", category: "Apparel", imageUrl: null },
  { _id: "p2", title: "Fleet & vehicle wraps", category: "Signage", imageUrl: null },
  { _id: "p3", title: "Labels & structural print", category: "Packaging", imageUrl: null },
  { _id: "p4", title: "Collateral & stationery", category: "Print", imageUrl: null },
  { _id: "p5", title: "In-store & outdoor", category: "Activations", imageUrl: null },
  { _id: "p6", title: "Promotional products", category: "Gifting", imageUrl: null },
];

function isSanityConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured()) return FALLBACK_SETTINGS;
  try {
    const data = await client.fetch(
      `*[_type == "siteSettings"][0]{heroTag, heroHeadline, heroSubtext, aboutHeadline, aboutBody, phone, email, studioAddress, instagramHandle}`,
      {},
      { next: { revalidate: 300 } }
    );
    if (!data) return FALLBACK_SETTINGS;
    return {
      heroTag: data.heroTag || FALLBACK_SETTINGS.heroTag,
      heroHeadline: data.heroHeadline || FALLBACK_SETTINGS.heroHeadline,
      heroSubtext: data.heroSubtext || FALLBACK_SETTINGS.heroSubtext,
      aboutHeadline: data.aboutHeadline || FALLBACK_SETTINGS.aboutHeadline,
      aboutBody: data.aboutBody || null,
      phone: data.phone || FALLBACK_SETTINGS.phone,
      email: data.email || FALLBACK_SETTINGS.email,
      studioAddress: data.studioAddress || FALLBACK_SETTINGS.studioAddress,
      instagramHandle: data.instagramHandle || FALLBACK_SETTINGS.instagramHandle,
    };
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured()) return FALLBACK_SERVICES;
  try {
    const data = await client.fetch(
      `*[_type == "service"] | order(order asc){_id, numeral, title, description}`,
      {},
      { next: { revalidate: 300 } }
    );
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!isSanityConfigured()) return FALLBACK_PORTFOLIO;
  try {
    const data = await client.fetch(
      `*[_type == "portfolioItem"] | order(order asc){
        _id, title, category, description,
        "imageUrl": image.asset->url
      }`,
      {},
      { next: { revalidate: 300 } }
    );
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_PORTFOLIO;
  } catch {
    return FALLBACK_PORTFOLIO;
  }
}

export async function getClientLogos(): Promise<ClientLogoItem[]> {
  if (!isSanityConfigured()) return FALLBACK_CLIENTS;
  try {
    const data = await client.fetch(
      `*[_type == "clientLogo"] | order(order asc){_id, name, "logoUrl": logo.asset->url}`,
      {},
      { next: { revalidate: 300 } }
    );
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_CLIENTS;
  } catch {
    return FALLBACK_CLIENTS;
  }
}

export async function getJournalPosts(): Promise<JournalPostSummary[]> {
  if (!isSanityConfigured()) return [];
  try {
    const data = await client.fetch(
      `*[_type == "journalPost"] | order(publishedAt desc){
        _id, title, "slug": slug.current, excerpt, publishedAt,
        "coverImageUrl": coverImage.asset->url
      }`,
      {},
      { next: { revalidate: 300 } }
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getJournalPost(slug: string): Promise<JournalPost | null> {
  if (!isSanityConfigured()) return null;
  try {
    const data = await client.fetch(
      `*[_type == "journalPost" && slug.current == $slug][0]{
        _id, title, "slug": slug.current, excerpt, publishedAt, body,
        "coverImageUrl": coverImage.asset->url
      }`,
      { slug },
      { next: { revalidate: 300 } }
    );
    return data ?? null;
  } catch {
    return null;
  }
}
